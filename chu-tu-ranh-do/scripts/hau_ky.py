"""Hậu kỳ cục bộ; không gọi dịch vụ TTS."""
from pathlib import Path
import subprocess
SAMPLE_RATE = 44100

def paragraph_cuts(text: str, words: list[dict]) -> list[float]:
    """Thời điểm cắt (giữa khoảng lặng) sau mỗi đoạn văn, trừ đoạn cuối."""
    counts = [len(p.split()) for p in text.split("\n\n") if p.strip()]
    if sum(counts) != len(words):
        print(f"   ! số chữ lệch ({len(words)} từ API, {sum(counts)} trong kịch bản) — bỏ qua chèn khoảng nghỉ")
        return []
    cuts, idx = [], 0
    for c in counts[:-1]:
        idx += c
        cuts.append((words[idx - 1]["end"] + words[idx]["start"]) / 2)
    return cuts


def post_process(src: Path, dst: Path, goc: dict, *, speed: float, pause: float) -> dict:
    """Chèn `pause` giây ở mỗi chỗ ngắt đoạn rồi đổi tốc độ; trả về json đã dời mốc thời gian."""
    words = goc["words"]
    cuts = paragraph_cuts(goc["text"], words) if pause > 0 else []
    bounds = [0.0, *cuts, None]
    n = len(bounds) - 1

    parts = [f"[0:a]aformat=sample_rates={SAMPLE_RATE}:channel_layouts=mono,asplit={n}" + "".join(f"[i{k}]" for k in range(n))]
    chain = []
    for k in range(n):
        end = f":end={bounds[k + 1]:.3f}" if bounds[k + 1] is not None else ""
        parts.append(f"[i{k}]atrim=start={bounds[k]:.3f}{end},asetpts=PTS-STARTPTS[s{k}]")
        chain.append(f"[s{k}]")
        if k < n - 1:
            parts.append(f"anullsrc=r={SAMPLE_RATE}:cl=mono,atrim=duration={pause}[z{k}]")
            chain.append(f"[z{k}]")
    tempo = f",atempo={speed}" if abs(speed - 1.0) > 1e-6 else ""
    parts.append("".join(chain) + f"concat=n={len(chain)}:v=0:a=1{tempo}[out]")

    subprocess.run(
        ["ffmpeg", "-y", "-loglevel", "error", "-i", str(src), "-filter_complex", ";".join(parts),
         "-map", "[out]", "-c:a", "libmp3lame", "-b:a", "128k", str(dst)],
        check=True,
    )

    def shift(t: float) -> float:
        k = sum(1 for c in cuts if t >= c)
        return round((t + k * pause) / speed, 3)

    new_words = [{"word": w["word"], "start": shift(w["start"]), "end": shift(w["end"])} for w in words]
    duration = round((goc["duration"] + len(cuts) * pause) / speed, 3) if goc["duration"] else None
    return {"text": goc["text"], "duration": duration, "speed": speed, "pause": pause, "words": new_words}

