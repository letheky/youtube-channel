"""Tạo ảnh cho từng cảnh (và thumbnail) từ prompt trong kịch bản, bằng OpenAI Images API.

Prompt nào có "[Reference: Bác Sáu character sheet]" sẽ gửi kèm ảnh bảng nhân vật
(assets/nhan-vat/bang-nhan-vat.png) để Bác Sáu trông giống nhau ở mọi cảnh.

Ví dụ:
  python scripts/tao_anh.py kich-ban/01-tra-sua-100-ly.md --dry-run
  python scripts/tao_anh.py kich-ban/01-tra-sua-100-ly.md --canh 1
  python scripts/tao_anh.py kich-ban/01-tra-sua-100-ly.md --thumbnail
  python scripts/tao_anh.py kich-ban/01-tra-sua-100-ly.md               # mọi ảnh chưa có
  python scripts/tao_anh.py kich-ban/01-tra-sua-100-ly.md --xuat-codex  # ghi file hướng dẫn để tạo ảnh bằng Codex

Đầu ra (videos/<tên-kịch-bản>/anh/): canh-01.png (cảnh có nhiều ảnh: canh-01-2.png ...), thumbnail.png
Ảnh đã có sẽ được bỏ qua. Dùng --force để tạo lại.
"""

from __future__ import annotations

import argparse
import base64
import json
import mimetypes
import os
import sys
import time
from pathlib import Path

import requests

import kich_ban

API = "https://api.openai.com/v1/images"
DEFAULT_MODEL = "gpt-image-2.5-sunburst"  # đổi bằng OPENAI_IMAGE_MODEL
SCENE_SIZE = "1536x864"  # 16:9, chia hết cho 16; Remotion phóng lên 1080p
THUMB_SIZE = "1280x720"  # đúng kích thước thumbnail YouTube
DEFAULT_REF = kich_ban.ROOT / "assets" / "nhan-vat" / "bang-nhan-vat.png"

REF_INSTRUCTION = (
    "Use the attached image as the exact character reference for the old accountant: "
    "same face, hair, glasses, pen behind the ear, checkered shirt, proportions and art style."
)
CHARACTER_SHEET_PROMPT = (
    "Character reference sheet, flat 2D cartoon style, thick clean outlines, warm colors. "
    "A 58-year-old Vietnamese man, retired accountant, kind but sharp eyes, salt-and-pepper short hair, "
    "black reading glasses low on his nose, a ballpoint pen tucked behind his ear, "
    "beige-and-brown checkered short-sleeve shirt, holding a red-covered ledger book and an old calculator. "
    "Show front view, 3/4 view, side view, and 6 expressions: smiling, suspicious squint, shocked, "
    "laughing, stern finger-pointing, thinking with hand on chin. Plain white background."
)
NO_TEXT = "Do not draw any text, letters, numbers, logos or watermarks."


def build_prompt(raw: str) -> tuple[str, bool]:
    uses_ref = kich_ban.REFERENCE_TAG in raw
    prompt = raw.replace(kich_ban.REFERENCE_TAG, REF_INSTRUCTION if uses_ref else "")
    return " ".join(f"{prompt} {NO_TEXT}".split()), uses_ref


def request_image(prompt: str, size: str, ref: Path | list[Path] | None, *, api_key: str, model: str, quality: str) -> bytes:
    headers = {"Authorization": f"Bearer {api_key}"}
    fields = {"model": model, "prompt": prompt, "size": size, "quality": quality, "output_format": "png", "n": "1"}

    for attempt in range(4):
        if ref:
            refs = ref if isinstance(ref, list) else [ref]
            files = [("image[]", (item.name, item.read_bytes(), mimetypes.guess_type(item.name)[0] or "image/png")) for item in refs]
            r = requests.post(f"{API}/edits", headers=headers, data=fields, files=files, timeout=600)
        else:
            r = requests.post(f"{API}/generations", headers=headers, json=fields | {"n": 1}, timeout=600)
        if r.status_code == 200:
            return base64.b64decode(r.json()["data"][0]["b64_json"])
        if r.status_code == 429 or r.status_code >= 500:
            wait = 10 * (attempt + 1)
            print(f"   ! HTTP {r.status_code}, đợi {wait}s rồi thử lại")
            time.sleep(wait)
            continue
        raise SystemExit(f"OpenAI lỗi HTTP {r.status_code}: {r.text[:500]}")
    raise SystemExit("OpenAI: thử lại nhiều lần vẫn lỗi, dừng.")


def write_codex_brief(out_dir: Path, todo: list, ref: Path, refs_by_name: dict[str, list[Path]] | None = None) -> None:
    refs_by_name = refs_by_name or {}
    rel = lambda p: p.relative_to(kich_ban.ROOT).as_posix() if p.is_relative_to(kich_ban.ROOT) else p.as_posix()
    lines = [
        "# Tạo ảnh bằng Codex",
        "",
        "Dán nguyên phần dưới đường kẻ vào Codex (mở Codex ở thư mục gốc repo này).",
        "",
        "---",
        "",
        "Generate the images below with your image generation tool and save each one as PNG at the exact path given.",
        f"Use exactly the reference image(s) listed under each image. Default REF is `{rel(ref)}` for the old accountant; con-ut.png is the young woman. When both are listed, attach both and preserve their separate identities.",
        "Keep one consistent art style for all images: flat 2D cartoon, thick clean outlines, warm colors.",
        "Do not put any text, letters, numbers, logos or watermarks in the images. Overwrite nothing that already exists unless I ask.",
        "",
    ]
    if not ref.exists():
        lines += [
            f"## Step 0 — `{rel(ref)}` (do this first, it is the reference for the others)",
            "- Size: 1536x1024 (landscape 1.50:1)",
            "",
            CHARACTER_SHEET_PROMPT,
            "",
        ]
    if not todo:
        lines += ["Không còn ảnh thiếu.", ""]
    for index, (name, prompt, uses_ref, size) in enumerate(todo):
        if index % 25 == 0:
            lines += [f"## Nhóm {index // 25 + 1} — tối đa 25 ảnh", ""]
        w, h = size.split("x")
        refs = refs_by_name.get(name, [ref] if uses_ref else [])
        reference_text = 'REF — ' + ', '.join(f'`{rel(item)}`' for item in refs) if refs else 'không dùng nhân vật tham chiếu'
        lines += [f"### `{rel(out_dir / name)}`", f"- Size gợi ý: {size}; PNG 16:9 ở kích thước gốc của Codex cũng được.", f"- Tham chiếu: {reference_text}", "", prompt, ""]
    out_dir.mkdir(parents=True, exist_ok=True)
    (out_dir / "CODEX.md").write_text("\n".join(lines), encoding="utf-8")
    print(f"Đã ghi {rel(out_dir / 'CODEX.md')} ({len(todo)} ảnh)")


def main() -> None:
    ap = argparse.ArgumentParser(description=__doc__, formatter_class=argparse.RawDescriptionHelpFormatter)
    ap.add_argument("kich_ban", help="đường dẫn file kịch bản .md")
    ap.add_argument("--canh", help="chỉ tạo các cảnh này, vd 1,3,5-7")
    ap.add_argument("--thumbnail", action="store_true", help="chỉ tạo thumbnail")
    ap.add_argument("--ref", type=Path, default=DEFAULT_REF, help="ảnh bảng nhân vật tham chiếu")
    ap.add_argument("--force", action="store_true", help="tạo lại cả ảnh đã có")
    ap.add_argument("--dry-run", action="store_true", help="chỉ in danh sách ảnh và prompt, không gọi API")
    ap.add_argument("--xuat-codex", action="store_true", help="ghi anh/CODEX.md: prompt dán vào Codex để tự tạo ảnh")
    ap.add_argument("--shots", action="store_true", help="đọc kich-ban/<slug>.shots.json, lưu ảnh vào anh/shots/")
    args = ap.parse_args()

    kich_ban.load_env()
    script = kich_ban.load(args.kich_ban)
    only = kich_ban.parse_scene_filter(args.canh)
    model = os.environ.get("OPENAI_IMAGE_MODEL") or DEFAULT_MODEL
    quality = os.environ.get("OPENAI_IMAGE_QUALITY") or "medium"
    out_dir = script.output_dir / "anh"

    jobs: list[tuple[str, str, str]] = []  # (tên file, prompt thô, kích thước)
    refs_by_name: dict[str, list[Path]] = {}

    def resolve_refs(items: list[str]) -> list[Path]:
        refs = [(kich_ban.ROOT / item).resolve() for item in items]
        if any(not item.is_relative_to(kich_ban.ROOT.resolve()) or not item.is_file() for item in refs):
            raise SystemExit('Ảnh tham chiếu phải tồn tại và nằm trong repo')
        return refs
    if args.shots:
        if args.thumbnail:
            ap.error("--shots không dùng cùng --thumbnail")
        shot_path = script.path.with_suffix(".shots.json")
        if not shot_path.exists():
            raise SystemExit(f"Chưa có {shot_path} — chạy build-shots.mjs trước")
        out_dir /= "shots"
        shots = json.loads(shot_path.read_text(encoding="utf-8"))
        seen = set()
        for shot in shots:
            sid = shot["id"]
            if not sid or any(c not in "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789_-" for c in sid) or sid in seen:
                raise SystemExit(f"Shot id không hợp lệ/trùng: {sid}")
            seen.add(sid)
            if only and shot["scene"] not in only:
                continue
            if shot.get("image") and not shot.get("prompt", "").strip():
                image = (script.output_dir / shot["image"]).resolve()
                if not image.is_relative_to(script.output_dir.resolve()) or not image.exists():
                    raise SystemExit(f"Shot {sid}: ảnh dùng lại không tồn tại/nằm ngoài video")
                continue
            raw = shot.get("prompt", "").strip()
            if not raw:
                raise SystemExit(f"Shot {sid}: chưa có prompt")
            if shot.get("ref") and kich_ban.REFERENCE_TAG not in raw:
                raw = f"{kich_ban.REFERENCE_TAG} {raw}"
            jobs.append((f"{sid}.png", raw, SCENE_SIZE))
            if "refs" in shot:
                refs_by_name[f"{sid}.png"] = resolve_refs(shot["refs"])
    elif not args.canh:
        if script.thumbnail_prompt:
            jobs.append(("thumbnail.png", script.thumbnail_prompt, THUMB_SIZE))
    if not args.shots and not args.thumbnail:
        for sc in script.scenes:
            if only and sc.number not in only:
                continue
            for k, p in enumerate(sc.image_prompts, start=1):
                name = f"{sc.slug}.png" if k == 1 else f"{sc.slug}-{k}.png"
                jobs.append((name, p, SCENE_SIZE))

    # Bản biên tập ảnh cảnh/thumbnail riêng, không sửa kịch bản đã thu giọng.
    asset_plan = script.path.with_suffix('.images.json')
    if not args.shots and asset_plan.exists():
        plan = {Path(item['image']).name: item for item in json.loads(asset_plan.read_text(encoding='utf-8'))}
        jobs = [(name, plan.get(name, {}).get('prompt', raw), size) for name, raw, size in jobs]
        refs_by_name.update({name: resolve_refs(plan[name]['refs']) for name, _, _ in jobs if name in plan and 'refs' in plan[name]})

    todo = []
    for name, raw, size in jobs:
        if (out_dir / name).exists() and not args.force:
            print(f"- {name}: đã có, bỏ qua (dùng --force để tạo lại)")
            continue
        prompt, uses_ref = build_prompt(raw)
        todo.append((name, prompt, bool(refs_by_name[name]) if name in refs_by_name else uses_ref, size))

    need_ref = any(uses_ref for _, _, uses_ref, _ in todo)
    print(f"\nModel: {model} · chất lượng {quality} · {len(todo)} ảnh ({sum(u for _, _, u, _ in todo)} ảnh dùng tham chiếu nhân vật)")
    if any(uses_ref and name not in refs_by_name for name, _, uses_ref, _ in todo) and not args.ref.exists():
        msg = f"Chưa có ảnh tham chiếu {args.ref.relative_to(kich_ban.ROOT) if args.ref.is_relative_to(kich_ban.ROOT) else args.ref}"
        if not args.dry_run:
            raise SystemExit(msg + " — hãy đặt bảng nhân vật Bác Sáu vào đó (hoặc dùng --ref).")
        print("  ! " + msg)

    if args.xuat_codex:
        write_codex_brief(out_dir, todo, args.ref, refs_by_name)
        return

    if args.dry_run or not todo:
        for name, prompt, uses_ref, size in todo:
            print(f"\n  {name} [{size}]{' +ref' if uses_ref else ''}\n    {prompt[:160]}…")
        return

    env = kich_ban.require_env("OPENAI_API_KEY")
    out_dir.mkdir(parents=True, exist_ok=True)
    for name, prompt, uses_ref, size in todo:
        print(f"> {name} [{size}]{' +ref' if uses_ref else ''}")
        png = request_image(prompt, size, refs_by_name.get(name, [args.ref] if uses_ref else []), api_key=env["OPENAI_API_KEY"], model=model, quality=quality)
        (out_dir / name).write_bytes(png)
        print(f"   ✓ {len(png) // 1024} KB")
    print(f"\nXong → {out_dir}")


if __name__ == "__main__":
    sys.stdout.reconfigure(encoding="utf-8")
    main()
