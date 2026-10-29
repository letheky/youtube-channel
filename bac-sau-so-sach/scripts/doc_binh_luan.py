"""Đọc bình luận mới trên kênh (chỉ đọc) để lượt 8:00 phân loại và like trong Studio.

YouTube Data API không có lệnh like bình luận, nên script này chỉ liệt kê; việc like làm bằng tay/Brave.
Dùng token.json (scope youtube.force-ssl). Trạng thái đã xử lý: luu-tru/binh-luan-da-xu-ly.json (gitignore).

  python scripts/doc_binh_luan.py                 # in JSON các bình luận chưa xử lý
  python scripts/doc_binh_luan.py --danh-dau ID=like ID2=bo-qua   # ghi kết quả sau khi xử lý
  python scripts/doc_binh_luan.py --kiem ID ID2   # đọc lại viewerRating để xác nhận đã like
"""

from __future__ import annotations

import argparse
import json
from datetime import datetime, timezone

import upload_youtube as U

CHANNEL = "UCb8J1ex5t19hvQx0lsbdB6A"
STATE = U.ROOT / "luu-tru" / "binh-luan-da-xu-ly.json"


def load_state() -> dict:
    return json.loads(STATE.read_text(encoding="utf-8")) if STATE.exists() else {}


def all_comments(yt) -> list[dict]:
    """Bình luận gốc + trả lời, bỏ bình luận của chính kênh."""
    out, tok = [], None
    while True:
        r = yt.commentThreads().list(part="snippet,replies", allThreadsRelatedToChannelId=CHANNEL,
                                     maxResults=100, order="time", pageToken=tok, textFormat="plainText").execute()
        for it in r.get("items", []):
            top = it["snippet"]["topLevelComment"]
            cs = [top] + it.get("replies", {}).get("comments", [])
            if it["snippet"]["totalReplyCount"] > len(cs) - 1:  # replies chỉ trả tối đa 5
                cs = [top] + yt.comments().list(part="snippet", parentId=top["id"], maxResults=100,
                                                textFormat="plainText").execute().get("items", [])
            for c in cs:
                s = c["snippet"]
                if s.get("authorChannelId", {}).get("value") == CHANNEL:
                    continue
                out.append({
                    "id": c["id"], "videoId": it["snippet"]["videoId"], "laTraLoi": c is not top,
                    "tacGia": s.get("authorDisplayName"), "luc": s["publishedAt"],
                    "noiDung": s.get("textDisplay") or s.get("textOriginal"),
                    "viewerRating": s.get("viewerRating"), "canRate": s.get("canRate"),
                    "link": f"https://www.youtube.com/watch?v={it['snippet']['videoId']}&lc={c['id']}",
                })
        tok = r.get("nextPageToken")
        if not tok:
            return out


def main() -> None:
    p = argparse.ArgumentParser(description=__doc__, formatter_class=argparse.RawDescriptionHelpFormatter)
    p.add_argument("--danh-dau", nargs="+", metavar="ID=KET_QUA")
    p.add_argument("--kiem", nargs="+", metavar="ID")
    a = p.parse_args()
    state = load_state()

    if a.danh_dau:
        now = datetime.now(timezone.utc).isoformat()
        for kv in a.danh_dau:
            cid, kq = kv.split("=", 1)
            state[cid] = {"ketQua": kq, "luc": now}
        STATE.parent.mkdir(exist_ok=True)
        STATE.write_text(json.dumps(state, ensure_ascii=False, indent=1), encoding="utf-8")
        print(f"Đã ghi {len(a.danh_dau)} mục; tổng {len(state)}.")
        return

    yt = U.youtube_client()
    if a.kiem:
        for c in yt.comments().list(part="snippet", id=",".join(a.kiem)).execute().get("items", []):
            print(c["id"], c["snippet"].get("viewerRating"))
        return

    moi = [c for c in all_comments(yt) if c["id"] not in state]
    print(json.dumps(moi, ensure_ascii=False, indent=1))


if __name__ == "__main__":
    main()
