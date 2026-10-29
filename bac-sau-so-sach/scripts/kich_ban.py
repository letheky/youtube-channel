"""Đọc file kịch bản Markdown (kich-ban/NN-ten.md) thành danh sách cảnh.

Quy ước trong kịch bản:
  ## CẢNH N — Tiêu đề (mm:ss – mm:ss)
  `[ẢNH]` mô tả  +  khối ``` prompt ```   (có thể nhiều ảnh mỗi cảnh)
  **LỜI ĐỌC:**   đoạn văn ... cho tới dòng --- kế tiếp
  **Thumbnail:** ... + khối ``` prompt ``` trong phần "Thông tin đăng tải"
"""

from __future__ import annotations

import os
import re
from dataclasses import dataclass, field
from pathlib import Path

ROOT = Path(__file__).resolve().parent.parent
REFERENCE_TAG = "[Reference: Bác Sáu character sheet]"

_SCENE_RE = re.compile(r"^## CẢNH (\d+)\s*[—-]\s*(.+?)\s*$", re.M)
_CODE_RE = re.compile(r"```[^\n]*\n(.*?)```", re.S)
_VOICE_TAG_RE = re.compile(r"\[\[([^:\]]+):\s*(.*?)\]\]", re.S)
MAIN = ""  # người nói của giọng chính (Bác Sáu)


@dataclass
class Scene:
    number: int
    title: str
    narration: str
    image_prompts: list[str] = field(default_factory=list)
    # [(người nói, đoạn)] theo thứ tự; người nói "" = giọng chính. Nối lại = narration.
    segments: list[tuple[str, str]] = field(default_factory=list)

    @property
    def slug(self) -> str:
        return f"canh-{self.number:02d}"


@dataclass
class Script:
    path: Path
    scenes: list[Scene]
    thumbnail_prompt: str | None
    voices: dict[str, str] = field(default_factory=dict)  # người nói phụ -> voice_id

    @property
    def output_dir(self) -> Path:
        return ROOT / "videos" / self.path.stem


def _clean_narration(text: str) -> str:
    text = re.sub(r"\*\*|`", "", text)
    paragraphs = [" ".join(p.split()) for p in re.split(r"\n\s*\n", text)]
    return "\n\n".join(p for p in paragraphs if p)


def _split_voices(text: str) -> tuple[str, list[tuple[str, str]]]:
    """Tách [[Tên: ...]] -> (lời đọc đã bỏ thẻ, các đoạn theo người nói)."""
    segs: list[tuple[str, str]] = []
    pos = 0
    for m in _VOICE_TAG_RE.finditer(text):
        if m.start() > pos:
            segs.append((MAIN, text[pos : m.start()]))
        segs.append((m.group(1).strip(), m.group(2)))
        pos = m.end()
    segs.append((MAIN, text[pos:]))
    clean = "".join(t for _, t in segs)
    return clean, [(who, " ".join(t.split())) for who, t in segs if t.strip()]


def load(path: str | Path) -> Script:
    path = Path(path).resolve()
    md = path.read_text(encoding="utf-8")

    thumbnail = None
    m = re.search(r"\*\*Thumbnail:\*\*.*?```[^\n]*\n(.*?)```", md, re.S)
    if m:
        thumbnail = m.group(1).strip()

    voices: dict[str, str] = {}
    vm = re.search(r"\*\*Giọng phụ:\*\*\s*(.+)", md)
    if vm:
        for part in vm.group(1).split(","):
            name, _, vid = part.partition("=")
            if vid.strip():
                voices[name.strip()] = vid.strip().strip("`")

    heads = list(_SCENE_RE.finditer(md))
    scenes = []
    for i, h in enumerate(heads):
        body = md[h.end() : heads[i + 1].start() if i + 1 < len(heads) else len(md)]
        # cắt phần phụ lục sau cảnh cuối (vd. "## Nguồn & mục cần kiểm tra")
        body = re.split(r"^## ", body, maxsplit=1, flags=re.M)[0]

        narration, segments = "", []
        n = re.search(r"\*\*LỜI ĐỌC:\*\*\s*\n(.*?)(?=^---\s*$|\Z)", body, re.S | re.M)
        if n:
            raw, segments = _split_voices(n.group(1))
            narration = _clean_narration(raw)
            segments = [(w, _clean_narration(t)) for w, t in segments]
            unknown = {w for w, _ in segments if w and w not in voices}
            if unknown:
                raise SystemExit(f"Cảnh {h.group(1)}: người nói {unknown} chưa khai báo ở dòng **Giọng phụ:**")

        prompts = []
        for tag in re.finditer(r"`\[ẢNH\]`", body):
            code = _CODE_RE.search(body, tag.end())
            if code:
                prompts.append(code.group(1).strip())

        title = re.sub(r"\s*\(.*?\)\s*$", "", h.group(2))
        scenes.append(Scene(int(h.group(1)), title, narration, prompts, segments))

    return Script(path, scenes, thumbnail, voices)


def parse_scene_filter(value: str | None) -> set[int] | None:
    """'1,3,5-7' -> {1,3,5,6,7}"""
    if not value:
        return None
    out: set[int] = set()
    for part in value.split(","):
        a, _, b = part.strip().partition("-")
        out.update(range(int(a), int(b or a) + 1))
    return out


def load_env() -> None:
    """Nạp .env ở thư mục gốc vào os.environ (không ghi đè biến đã có)."""
    env = ROOT / ".env"
    if not env.exists():
        return
    for line in env.read_text(encoding="utf-8").splitlines():
        line = line.strip()
        if not line or line.startswith("#") or "=" not in line:
            continue
        k, v = line.split("=", 1)
        os.environ.setdefault(k.strip(), v.strip().strip('"').strip("'"))


def require_env(*names: str) -> dict[str, str]:
    missing = [n for n in names if not os.environ.get(n)]
    if missing:
        raise SystemExit(
            f"Thiếu {', '.join(missing)} trong .env (xem .env.example). "
            "Chạy với --dry-run để kiểm tra mà không cần key."
        )
    return {n: os.environ[n] for n in names}
