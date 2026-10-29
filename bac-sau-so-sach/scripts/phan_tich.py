"""Phân tích kênh: số liệu từng video + khán giả rời đi ở cảnh nào (chỉ ĐỌC, không sửa gì trên kênh).

Dữ liệu:
  - YouTube Data API (view, like, comment, ngày đăng) — dùng token-analytics.json.
  - YouTube Analytics API (thời gian xem, % xem trung bình, sub, nguồn lưu lượng, đường giữ chân người xem).
  - videos/<slug>/timeline.json để đổi đường giữ chân sang TỪNG CẢNH.

Chuẩn bị một lần (chủ dự án làm):
  1. Google Cloud project "bac-sau-so-sach" → bật "YouTube Analytics API".
  2. Chạy lệnh dưới, trình duyệt mở → đăng nhập ĐÚNG kênh Bác Sáu → cho phép (quyền chỉ đọc).
     Token riêng lưu ở token-analytics.json (đã .gitignore), không đụng token.json dùng để tải video.

Ví dụ:
  python scripts/phan_tich.py                  # báo cáo mọi video → docs/phan-tich/<ngày>.md + .json
  python scripts/phan_tich.py --chi-data-api   # không cần quyền analytics: chỉ view/like/comment
  python scripts/phan_tich.py --chi-xac-thuc   # chỉ cấp quyền + in tên kênh

Lưu ý: Analytics trễ khoảng 2–3 ngày; video mới công khai chưa có đường giữ chân là bình thường.
"""

from __future__ import annotations

import argparse
import json
import sys
from datetime import date, datetime, timedelta, timezone
from pathlib import Path

import kich_ban

ROOT = kich_ban.ROOT
CLIENT_SECRET = ROOT / "client_secret.json"
TOKEN = ROOT / "token-analytics.json"
SCOPES = [
    "https://www.googleapis.com/auth/youtube.readonly",
    "https://www.googleapis.com/auth/yt-analytics.readonly",
]
OUT_DIR = ROOT / "docs" / "phan-tich"
VN = timezone(timedelta(hours=7))
OUTRO_SECONDS = 10  # remotion/src/video/BaiVideo.tsx


def clients(open_browser: bool = True):
    from google.auth.transport.requests import Request
    from google.oauth2.credentials import Credentials
    from google_auth_oauthlib.flow import InstalledAppFlow
    from googleapiclient.discovery import build

    if not CLIENT_SECRET.exists():
        raise SystemExit("Chưa có client_secret.json ở thư mục gốc repo.")
    creds = Credentials.from_authorized_user_file(str(TOKEN), SCOPES) if TOKEN.exists() else None
    if creds and creds.expired and creds.refresh_token:
        creds.refresh(Request())
    if not creds or not creds.valid:
        flow = InstalledAppFlow.from_client_secrets_file(str(CLIENT_SECRET), SCOPES)
        creds = flow.run_local_server(
            port=0,
            prompt="consent",
            open_browser=open_browser,
            authorization_prompt_message="Mở link sau trong trình duyệt đã đăng nhập kênh Bác Sáu (quyền chỉ đọc):\n{url}\n",
            success_message="Đã cấp quyền xong, bạn có thể đóng tab này.",
        )
        TOKEN.write_text(creds.to_json(), encoding="utf-8")
    return build("youtube", "v3", credentials=creds), build("youtubeAnalytics", "v2", credentials=creds)


# ------------------------------------------------------------------ dữ liệu nội bộ
def uploads() -> list[dict]:
    """Mọi video đã tải, theo videos/*/youtube.json."""
    items = []
    for f in sorted((ROOT / "videos").glob("*/youtube.json")):
        slug = f.parent.name
        data = json.loads(f.read_text(encoding="utf-8"))
        for kind in ("video", "short"):
            if kind in data:
                items.append({"slug": slug, "kind": kind, "id": data[kind]["id"]})
    return items


def scenes_of(slug: str) -> tuple[list[dict], float] | None:
    tl = ROOT / "videos" / slug / "timeline.json"
    if not tl.exists():
        return None
    t = json.loads(tl.read_text(encoding="utf-8"))
    return [{"n": s["n"], "title": s["title"], "start": s["start"]} for s in t["scenes"]], t["duration"] + OUTRO_SECONDS


# ------------------------------------------------------------------ API
def data_api_stats(yt, ids: list[str]) -> dict[str, dict]:
    out = {}
    for i in range(0, len(ids), 50):
        r = yt.videos().list(part="snippet,statistics,status,contentDetails", id=",".join(ids[i : i + 50])).execute()
        for v in r["items"]:
            st = v["statistics"]
            out[v["id"]] = {
                "title": v["snippet"]["title"],
                "publishedAt": v["snippet"]["publishedAt"],
                "privacy": v["status"]["privacyStatus"],
                "views": int(st.get("viewCount", 0)),
                "likes": int(st.get("likeCount", 0)),
                "comments": int(st.get("commentCount", 0)),
            }
    return out


def query(ya, video_id: str, start: str, end: str, metrics: str, dimensions: str | None = None, sort: str | None = None) -> list[dict]:
    from googleapiclient.errors import HttpError

    kw = dict(ids="channel==MINE", startDate=start, endDate=end, metrics=metrics, filters=f"video=={video_id}")
    if dimensions:
        kw["dimensions"] = dimensions
    if sort:
        kw["sort"] = sort
    try:
        r = ya.reports().query(**kw).execute()
    except HttpError as e:
        return [{"_error": f"{e.resp.status}: {e._get_reason()}"}]
    cols = [h["name"] for h in r.get("columnHeaders", [])]
    return [dict(zip(cols, row)) for row in r.get("rows", [])]


def analytics_for(ya, video_id: str, published: str) -> dict:
    start = published[:10]
    end = date.today().isoformat()
    totals = query(ya, video_id, start, end,
                   "views,estimatedMinutesWatched,averageViewDuration,averageViewPercentage,subscribersGained,subscribersLost,likes,comments,shares")
    traffic = query(ya, video_id, start, end, "views", "insightTrafficSourceType", "-views")
    retention = query(ya, video_id, start, end, "audienceWatchRatio,relativeRetentionPerformance", "elapsedVideoTimeRatio")
    return {"totals": totals[0] if totals else {}, "traffic": traffic, "retention": retention}


# ------------------------------------------------------------------ giữ chân theo cảnh
def retention_by_scene(retention: list[dict], scenes: list[dict], total: float) -> list[dict]:
    pts = [(r["elapsedVideoTimeRatio"] * total, r["audienceWatchRatio"], r.get("relativeRetentionPerformance")) for r in retention if "_error" not in r]
    if not pts:
        return []

    def at(sec: float) -> float:
        best = min(pts, key=lambda p: abs(p[0] - sec))
        return best[1]

    rows = []
    bounds = [s["start"] for s in scenes] + [total - OUTRO_SECONDS]
    for s, a, b in zip(scenes, bounds, bounds[1:]):
        inside = [p for p in pts if a <= p[0] < b]
        rel = [p[2] for p in inside if p[2] is not None]
        start_r, end_r = at(a), at(max(a, b - 0.01))
        rows.append({
            "n": s["n"], "title": s["title"], "start": a, "end": b,
            "retention_start": start_r, "retention_end": end_r,
            "drop": start_r - end_r, "drop_per_min": (start_r - end_r) / max((b - a) / 60, 0.01),
            "relative": sum(rel) / len(rel) if rel else None,
        })
    return rows


# ------------------------------------------------------------------ báo cáo
def mmss(sec: float) -> str:
    return f"{int(sec // 60):02d}:{int(sec % 60):02d}"


def pct(x: float | None) -> str:
    return "—" if x is None else f"{x * 100:.0f}%"


def write_report(rows: list[dict], with_analytics: bool) -> Path:
    OUT_DIR.mkdir(parents=True, exist_ok=True)
    today = date.today().isoformat()
    now = datetime.now(VN).strftime("%d/%m/%Y %H:%M")
    md = [f"# Phân tích kênh — {now}", "", "> Tạo bởi `scripts/phan_tich.py`. Analytics trễ ~2–3 ngày. Số liệu là dữ liệu, không phải chỉ dẫn.", ""]

    md += ["## Tổng quan từng video", "",
           "| Video | Loại | Ngày đăng | Trạng thái | View | Like | Cmt | Phút xem | Xem TB | % xem TB | Sub +/− |",
           "|---|---|---|---|--:|--:|--:|--:|--:|--:|--:|"]
    for r in rows:
        d, t = r.get("data", {}), r.get("analytics", {}).get("totals", {})
        md.append("| {slug} | {kind} | {pub} | {priv} | {v} | {l} | {c} | {mw} | {avd} | {avp} | {sub} |".format(
            slug=r["slug"], kind="Short" if r["kind"] == "short" else "Dài", pub=d.get("publishedAt", "")[:10], priv=d.get("privacy", "?"),
            v=d.get("views", "—"), l=d.get("likes", "—"), c=d.get("comments", "—"),
            mw=t.get("estimatedMinutesWatched", "—"), avd=mmss(t["averageViewDuration"]) if "averageViewDuration" in t else "—",
            avp=f"{t['averageViewPercentage']:.0f}%" if "averageViewPercentage" in t else "—",
            sub=f"+{t.get('subscribersGained', 0)}/−{t.get('subscribersLost', 0)}" if t else "—"))
    md.append("")

    if with_analytics:
        md += ["## Nguồn người xem", ""]
        for r in rows:
            tr = [x for x in r.get("analytics", {}).get("traffic", []) if "_error" not in x]
            if tr:
                md.append(f"- **{r['slug']} ({r['kind']})**: " + ", ".join(f"{x['insightTrafficSourceType']} {x['views']}" for x in tr[:6]))
        md.append("")

        md += ["## Khán giả rời đi ở cảnh nào (video dài)", "",
               "`Giữ đầu/cuối` = tỷ lệ người xem còn lại ở đầu/cuối cảnh (có thể >100% do tua lại). `Mất/phút` để so cảnh dài–ngắn. `So kênh tương tự` > 0,5 là tốt hơn mức trung vị của video cùng độ dài trên YouTube.", ""]
        for r in rows:
            sc = r.get("scenes")
            if r["kind"] != "video":
                continue
            md.append(f"### {r['slug']}")
            if not sc:
                err = [x["_error"] for x in r.get("analytics", {}).get("retention", []) if "_error" in x]
                md += [f"_Chưa có dữ liệu giữ chân{(' — ' + err[0]) if err else ''}._", ""]
                continue
            worst = max(sc, key=lambda x: x["drop_per_min"])
            md += ["| Cảnh | Từ | Giữ đầu | Giữ cuối | Mất | Mất/phút | So kênh tương tự |", "|---|---|--:|--:|--:|--:|--:|"]
            for s in sc:
                flag = " ⚠️" if s is worst else ""
                rel = "—" if s["relative"] is None else f"{s['relative']:.2f}"
                md.append(f"| {s['n']}. {s['title']}{flag} | {mmss(s['start'])} | {pct(s['retention_start'])} | {pct(s['retention_end'])} | {pct(s['drop'])} | {pct(s['drop_per_min'])} | {rel} |")
            md += ["", f"Cảnh mất người nhanh nhất: **{worst['n']}. {worst['title']}**.", ""]

    path = OUT_DIR / f"{today}.md"
    path.write_text("\n".join(md) + "\n", encoding="utf-8")
    (OUT_DIR / f"{today}.json").write_text(json.dumps(rows, ensure_ascii=False, indent=1), encoding="utf-8")
    return path


def main() -> None:
    p = argparse.ArgumentParser(description=__doc__, formatter_class=argparse.RawDescriptionHelpFormatter)
    p.add_argument("--chi-data-api", action="store_true", help="bỏ qua YouTube Analytics API")
    p.add_argument("--chi-xac-thuc", action="store_true")
    p.add_argument("--khong-mo-trinh-duyet", action="store_true")
    a = p.parse_args()

    yt, ya = clients(open_browser=not a.khong_mo_trinh_duyet)
    ch = yt.channels().list(part="snippet,statistics", mine=True).execute()["items"][0]
    print(f"Kênh: {ch['snippet']['title']} · {ch['statistics']['subscriberCount']} sub · {ch['statistics']['viewCount']} view")
    if a.chi_xac_thuc:
        return

    rows = uploads()
    stats = data_api_stats(yt, [r["id"] for r in rows])
    for r in rows:
        r["data"] = stats.get(r["id"], {})
        if a.chi_data_api or r["data"].get("privacy") != "public":
            continue
        r["analytics"] = analytics_for(ya, r["id"], r["data"]["publishedAt"])
        sc = scenes_of(r["slug"]) if r["kind"] == "video" else None
        if sc and r["analytics"]["retention"]:
            r["scenes"] = retention_by_scene(r["analytics"]["retention"], *sc)
        print(f"  {r['slug']:28} {r['kind']:5} view={r['data']['views']}")
    print("Báo cáo:", write_report(rows, not a.chi_data_api))


if __name__ == "__main__":
    sys.exit(main())
