"""Cập nhật mô tả và/hoặc thumbnail cho video ĐÃ tải (id lấy từ videos/<slug>/youtube.json).

Không đổi tiêu đề, thẻ, quyền riêng tư hay lịch. Dùng token.json như upload_youtube.py.

Ví dụ:
  python scripts/cap_nhat_youtube.py 06-gui-1-ty-nghi-huu --mo-ta --dry-run
  python scripts/cap_nhat_youtube.py 06-gui-1-ty-nghi-huu --mo-ta --thumbnail videos/06-gui-1-ty-nghi-huu/thumbnail-v2.jpg
"""

from __future__ import annotations

import argparse
import json
from pathlib import Path

import upload_youtube as U

ROOT = U.ROOT


def main() -> None:
    p = argparse.ArgumentParser(description=__doc__, formatter_class=argparse.RawDescriptionHelpFormatter)
    p.add_argument("slug")
    p.add_argument("--mo-ta", action="store_true", help="thay mô tả bằng mục ## Mô tả của dang-tai.md")
    p.add_argument("--thumbnail", type=Path, help="ảnh thumbnail mới (jpg/png ≤ 2MB)")
    p.add_argument("--dry-run", action="store_true")
    a = p.parse_args()
    if not a.mo_ta and not a.thumbnail:
        raise SystemExit("Chọn --mo-ta và/hoặc --thumbnail.")

    folder = ROOT / "videos" / a.slug
    vid = json.loads((folder / "youtube.json").read_text(encoding="utf-8"))["video"]["id"]
    meta = U.read_metadata(folder / "dang-tai.md")
    U.validate(meta)
    if a.thumbnail and not a.thumbnail.exists():
        raise SystemExit(f"Không thấy {a.thumbnail}")
    print(f"Video {vid} · mô tả {len(meta['description'])} ký tự" if a.mo_ta else f"Video {vid}")
    if a.dry_run:
        if a.mo_ta:
            print(meta["description"])
        return

    yt = U.youtube_client()
    if a.mo_ta:
        cur = yt.videos().list(part="snippet", id=vid).execute()["items"][0]["snippet"]
        snippet = {k: cur[k] for k in ("title", "categoryId", "tags", "defaultLanguage", "defaultAudioLanguage") if k in cur}
        snippet["description"] = meta["description"]
        yt.videos().update(part="snippet", body={"id": vid, "snippet": snippet}).execute()
        print("Đã cập nhật mô tả.")
    if a.thumbnail:
        from googleapiclient.http import MediaFileUpload

        yt.thumbnails().set(videoId=vid, media_body=MediaFileUpload(str(a.thumbnail))).execute()
        print("Đã thay thumbnail.")


if __name__ == "__main__":
    main()
