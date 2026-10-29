"""Tải video lên YouTube qua YouTube Data API v3 (kèm thumbnail + phụ đề).

Chuẩn bị một lần:
  1. Google Cloud Console → tạo project → bật "YouTube Data API v3".
  2. OAuth consent screen: User type External, thêm Gmail của kênh vào "Test users".
  3. Credentials → Create OAuth client ID → loại "Desktop app" → tải JSON,
     đổi tên thành client_secret.json, đặt ở thư mục gốc repo (đã .gitignore).
  4. Lần chạy đầu: trình duyệt mở ra → đăng nhập ĐÚNG tài khoản/kênh Bác Sáu → cho phép.
     Token lưu ở token.json (đã .gitignore), các lần sau không hỏi lại.

Ví dụ:
  python scripts/upload_youtube.py 01-tra-sua-100-ly --dry-run
  python scripts/upload_youtube.py 01-tra-sua-100-ly                          # Riêng tư
  python scripts/upload_youtube.py 01-tra-sua-100-ly --lich "2026-10-20 19:00" # hẹn giờ công khai (giờ VN)
  python scripts/upload_youtube.py 01-tra-sua-100-ly --short                  # đăng Short videos/<slug>/short/short*.mp4

Lưu ý:
  - Project Google chưa qua kiểm định (audit) của YouTube thì video tải bằng API BỊ KHÓA Ở CHẾ ĐỘ RIÊNG TƯ,
    kể cả khi chọn công khai/hẹn giờ. Khi đó vào YouTube Studio chuyển công khai bằng tay.
  - Mỗi lần tải tốn quota của project (mặc định 10.000 đơn vị/ngày).
  - Kết quả (video id, link) ghi vào videos/<slug>/youtube.json để không tải trùng.
"""

from __future__ import annotations

import argparse
import json
import re
import sys
import time
from datetime import datetime, timedelta, timezone
from pathlib import Path

import kich_ban

ROOT = kich_ban.ROOT
CLIENT_SECRET = ROOT / "client_secret.json"
TOKEN = ROOT / "token.json"
SCOPES = [
    "https://www.googleapis.com/auth/youtube.upload",
    "https://www.googleapis.com/auth/youtube.force-ssl",  # cần cho thumbnail + phụ đề
]
CATEGORY_EDUCATION = "27"
VN = timezone(timedelta(hours=7))


# ------------------------------------------------------------------ đọc dang-tai.md
def read_metadata(md_path: Path) -> dict:
    md = md_path.read_text(encoding="utf-8")

    def section(name: str) -> str:
        m = re.search(rf"^## {re.escape(name)}\s*\n(.*?)(?=^## |\Z)", md, re.S | re.M)
        if not m:
            raise SystemExit(f"{md_path.name}: thiếu mục '## {name}'")
        return m.group(1).strip()

    title = section("Tiêu đề").splitlines()[0].strip()
    desc_block = re.search(r"```[^\n]*\n(.*?)```", section("Mô tả"), re.S)
    description = desc_block.group(1).strip() if desc_block else section("Mô tả")
    tags = [t.strip() for t in section("Thẻ").replace("\n", ",").split(",") if t.strip()]
    return {"title": title, "description": description, "tags": tags}


SHORT_FALLBACK = {
    # video #1 đăng trước khi có mục "## Short" trong dang-tai.md
    "01-tra-sua-100-ly": {
        "title": "Bán 100 ly trà sữa/ngày, lời thật bao nhiêu? #shorts",
        "description": "Bác Sáu tính sổ quán trà sữa 100 ly/ngày: doanh thu 105 triệu, lời thật còn bao nhiêu?\n"
        "Xem bản đầy đủ trên kênh Bác Sáu Sổ Sách.\n\n#shorts #kinhdoanh #trasua #taichinhcanhan",
    }
}


def read_short_metadata(md_path: Path) -> dict:
    """Mục '## Short' trong dang-tai.md: dòng đầu là tiêu đề, khối ``` là mô tả."""
    md = md_path.read_text(encoding="utf-8")
    m = re.search(r"^## Short\s*\n(.*?)(?=^## |\Z)", md, re.S | re.M)
    if not m:
        fb = SHORT_FALLBACK.get(md_path.parent.name)
        if fb:
            return dict(fb)
        raise SystemExit(f"{md_path.name}: thiếu mục '## Short' (dòng đầu = tiêu đề, khối ``` = mô tả)")
    body = m.group(1).strip()
    desc = re.search(r"```[^\n]*\n(.*?)```", body, re.S)
    return {"title": body.splitlines()[0].strip(), "description": desc.group(1).strip() if desc else ""}


def validate(meta: dict) -> None:
    if len(meta["title"]) > 100:
        raise SystemExit(f"Tiêu đề dài {len(meta['title'])} ký tự (YouTube tối đa 100).")
    if len(meta["description"].encode("utf-8")) > 5000:
        raise SystemExit("Mô tả vượt 5000 byte.")
    if any(c in meta["title"] + meta["description"] for c in "<>"):
        raise SystemExit("Tiêu đề/mô tả không được chứa ký tự < hoặc >.")
    if sum(len(t) for t in meta["tags"]) + 2 * len(meta["tags"]) > 500:
        raise SystemExit("Tổng độ dài thẻ vượt 500 ký tự.")


def parse_schedule(value: str | None) -> str | None:
    if not value:
        return None
    try:
        dt = datetime.strptime(value, "%Y-%m-%d %H:%M").replace(tzinfo=VN)
    except ValueError:
        raise SystemExit('--lich phải có dạng "YYYY-MM-DD HH:MM" (giờ Việt Nam)')
    if dt < datetime.now(VN) + timedelta(minutes=15):
        raise SystemExit("--lich phải cách hiện tại ít nhất 15 phút.")
    return dt.astimezone(timezone.utc).isoformat().replace("+00:00", "Z")


# ------------------------------------------------------------------ OAuth
def youtube_client(open_browser: bool = True):
    from google.auth.transport.requests import Request
    from google.oauth2.credentials import Credentials
    from google_auth_oauthlib.flow import InstalledAppFlow
    from googleapiclient.discovery import build

    if not CLIENT_SECRET.exists():
        raise SystemExit("Chưa có client_secret.json ở thư mục gốc repo — xem hướng dẫn đầu file.")
    creds = Credentials.from_authorized_user_file(str(TOKEN), SCOPES) if TOKEN.exists() else None
    if creds and creds.expired and creds.refresh_token:
        creds.refresh(Request())
    if not creds or not creds.valid:
        flow = InstalledAppFlow.from_client_secrets_file(str(CLIENT_SECRET), SCOPES)
        print("Trình duyệt sẽ mở để cấp quyền — đăng nhập đúng tài khoản kênh Bác Sáu Sổ Sách.")
        creds = flow.run_local_server(
            port=0,
            prompt="consent",
            open_browser=open_browser,
            authorization_prompt_message="Mở link sau trong trình duyệt đã đăng nhập kênh Bác Sáu để cấp quyền:\n{url}\n",
            success_message="Đã cấp quyền xong, bạn có thể đóng tab này.",
        )
        TOKEN.write_text(creds.to_json(), encoding="utf-8")
    return build("youtube", "v3", credentials=creds)


def upload_video(yt, file: Path, body: dict) -> str:
    from googleapiclient.errors import HttpError
    from googleapiclient.http import MediaFileUpload

    media = MediaFileUpload(str(file), chunksize=16 * 1024 * 1024, resumable=True, mimetype="video/mp4")
    req = yt.videos().insert(part="snippet,status", body=body, media_body=media, notifySubscribers=True)
    response, retries = None, 0
    while response is None:
        try:
            status, response = req.next_chunk()
            if status:
                print(f"\r  Đang tải: {status.progress() * 100:5.1f}%", end="", flush=True)
            retries = 0
        except HttpError as e:
            if e.resp.status in (500, 502, 503, 504) and retries < 6:
                retries += 1
                wait = 2**retries
                print(f"\n  ! Lỗi {e.resp.status}, thử lại sau {wait}s")
                time.sleep(wait)
                continue
            raise SystemExit(f"\nYouTube từ chối: {e}")
        except (ConnectionError, TimeoutError, OSError) as e:
            if retries < 6:
                retries += 1
                wait = 2**retries
                print(f"\n  ! Mất kết nối ({e}), thử lại sau {wait}s")
                time.sleep(wait)
                continue
            raise
    print("\r  Đang tải: 100.0%")
    return response["id"]


def main() -> None:
    ap = argparse.ArgumentParser(description=__doc__, formatter_class=argparse.RawDescriptionHelpFormatter)
    ap.add_argument("slug", help="tên thư mục trong videos/, vd 01-tra-sua-100-ly")
    ap.add_argument("--short", action="store_true", help="đăng Short (videos/<slug>/short/short*.mp4, tiêu đề/mô tả ở mục ## Short của dang-tai.md)")
    ap.add_argument("--file", type=Path, help="đường dẫn video cụ thể (ghi đè mặc định)")
    ap.add_argument("--tieu-de", help="ghi đè tiêu đề")
    ap.add_argument("--lich", help='hẹn giờ công khai, giờ VN: "YYYY-MM-DD HH:MM" (video để Riêng tư tới giờ đó)')
    ap.add_argument("--che-do", choices=["private", "unlisted", "public"], default="private", help="mặc định private")
    ap.add_argument("--khong-phu-de", action="store_true")
    ap.add_argument("--khong-thumbnail", action="store_true")
    ap.add_argument("--yes", action="store_true", help="không hỏi xác nhận")
    ap.add_argument("--dry-run", action="store_true", help="chỉ in thông tin sẽ gửi, không đăng nhập, không tải")
    ap.add_argument("--force", action="store_true", help="tải dù youtube.json đã ghi là đã tải")
    ap.add_argument("--chi-xac-thuc", action="store_true", help="chỉ cấp quyền OAuth + in tên kênh, không tải gì")
    ap.add_argument("--khong-mo-trinh-duyet", action="store_true", help="in link cấp quyền thay vì tự mở trình duyệt")
    args = ap.parse_args()

    if args.chi_xac_thuc:
        yt = youtube_client(open_browser=not args.khong_mo_trinh_duyet)
        ch = yt.channels().list(part="snippet", mine=True).execute().get("items", [])
        if not ch:
            raise SystemExit("Tài khoản vừa cấp quyền không có kênh YouTube nào.")
        print(f"✓ Đã cấp quyền cho kênh: {ch[0]['snippet']['title']} ({ch[0]['id']})")
        return

    vdir = ROOT / "videos" / args.slug
    kind = "short" if args.short else "video"
    if args.file:
        file = args.file
    elif args.short:
        found = sorted((vdir / "short").glob("short*.mp4"))
        file = found[0] if found else vdir / "short" / "short.mp4"
    else:
        file = vdir / f"{args.slug}.mp4"
    if not file.exists():
        raise SystemExit(f"Không thấy file video: {file}")

    meta = read_metadata(vdir / "dang-tai.md")
    if args.short:
        meta.update(read_short_metadata(vdir / "dang-tai.md"))
        if args.tieu_de:
            meta["title"] = args.tieu_de
    elif args.tieu_de:
        meta["title"] = args.tieu_de
    validate(meta)

    publish_at = parse_schedule(args.lich)
    privacy = "private" if publish_at else args.che_do
    body = {
        "snippet": {
            "title": meta["title"],
            "description": meta["description"],
            "tags": meta["tags"],
            "categoryId": CATEGORY_EDUCATION,
            "defaultLanguage": "vi",
            "defaultAudioLanguage": "vi",
        },
        "status": {
            "privacyStatus": privacy,
            "selfDeclaredMadeForKids": False,
            "containsSyntheticMedia": True,  # giọng + hình do AI tạo
            "embeddable": True,
            **({"publishAt": publish_at} if publish_at else {}),
        },
    }
    thumb = vdir / "thumbnail-final.jpg"
    srt = vdir / "phu-de.srt"
    use_thumb = not args.short and not args.khong_thumbnail and thumb.exists()
    use_srt = not args.short and not args.khong_phu_de and srt.exists()

    record_path = vdir / "youtube.json"
    record = json.loads(record_path.read_text(encoding="utf-8")) if record_path.exists() else {}
    if kind in record and not args.force:
        raise SystemExit(f"{kind} đã tải lên trước đó: {record[kind]['url']} — dùng --force nếu thật sự muốn tải lại.")

    size_mb = file.stat().st_size / 1e6
    print(f"File      : {file.relative_to(ROOT)} ({size_mb:,.0f} MB)")
    print(f"Tiêu đề   : {meta['title']}")
    print(f"Mô tả     : {len(meta['description'])} ký tự · {meta['description'].splitlines()[0][:80]}…")
    print(f"Thẻ       : {', '.join(meta['tags'])}")
    print(f"Chế độ    : {privacy}" + (f" · hẹn công khai {args.lich} (giờ VN)" if publish_at else ""))
    print("Đánh dấu  : nội dung tổng hợp (AI) = CÓ · dành cho trẻ em = KHÔNG · danh mục Giáo dục")
    print(f"Kèm theo  : thumbnail={'có' if use_thumb else 'không'} · phụ đề tiếng Việt={'có' if use_srt else 'không'}")
    if args.dry_run:
        print("\n(dry-run: không đăng nhập, không tải)")
        return
    if not args.yes and input("\nGõ 'co' để tải lên YouTube: ").strip().lower() != "co":
        raise SystemExit("Đã huỷ.")

    yt = youtube_client(open_browser=not args.khong_mo_trinh_duyet)
    vid = upload_video(yt, file, body)
    url = f"https://youtu.be/{vid}" if not args.short else f"https://youtube.com/shorts/{vid}"
    print(f"✓ Đã tải: {url}")
    # đọc lại trước khi ghi: lần tải khác (video/short) có thể vừa ghi vào file này
    record = json.loads(record_path.read_text(encoding="utf-8")) if record_path.exists() else {}
    record[kind] = {"id": vid, "url": url, "privacy": privacy, "publishAt": publish_at, "uploadedAt": datetime.now(VN).isoformat()}
    record_path.write_text(json.dumps(record, ensure_ascii=False, indent=1), encoding="utf-8")

    from googleapiclient.errors import HttpError
    from googleapiclient.http import MediaFileUpload

    if use_thumb:
        try:
            yt.thumbnails().set(videoId=vid, media_body=MediaFileUpload(str(thumb), mimetype="image/jpeg")).execute()
            print("✓ Đã đặt thumbnail")
        except HttpError as e:
            print(f"! Không đặt được thumbnail (kênh cần xác minh số điện thoại): {e}")
    if use_srt:
        try:
            yt.captions().insert(
                part="snippet",
                body={"snippet": {"videoId": vid, "language": "vi", "name": "Tiếng Việt", "isDraft": False}},
                media_body=MediaFileUpload(str(srt), mimetype="application/octet-stream"),
            ).execute()
            print("✓ Đã tải phụ đề tiếng Việt")
        except HttpError as e:
            print(f"! Không tải được phụ đề: {e}")

    print(f"\nXong. Vào YouTube Studio kiểm tra lại trước khi công khai: https://studio.youtube.com/video/{vid}/edit")
    if args.short:
        print("Nhớ đặt 'Video có liên quan' của Short trỏ tới video dài (Studio → chi tiết Short).")


if __name__ == "__main__":
    sys.stdout.reconfigure(encoding="utf-8")
    main()
