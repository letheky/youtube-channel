"""Tạo giọng đọc Bác Sáu cho từng cảnh bằng ElevenLabs, kèm mốc thời gian từng chữ.

Hai bước:
  1. Gọi API -> bản gốc (canh-01.goc.mp3 + canh-01.goc.json). Tốn credit, chỉ làm khi chưa có.
  2. Hậu kỳ bằng ffmpeg -> canh-01.mp3 + canh-01.json: chèn khoảng nghỉ giữa các đoạn văn và
     làm chậm (atempo, giữ cao độ) — vì eleven_v4 bỏ qua tham số speed của API.
     Không tốn credit: chỉnh ELEVENLABS_SPEED / ELEVENLABS_PAUSE rồi chạy lại với --chi-hau-ky.

Ví dụ:
  python scripts/tao_giong.py kich-ban/01-tra-sua-100-ly.md --dry-run
  python scripts/tao_giong.py kich-ban/01-tra-sua-100-ly.md --canh 1
  python scripts/tao_giong.py kich-ban/01-tra-sua-100-ly.md                # mọi cảnh chưa có
  python scripts/tao_giong.py kich-ban/01-tra-sua-100-ly.md --chi-hau-ky   # xử lý lại, không gọi API

Đầu ra (videos/<tên-kịch-bản>/giong/):
  canh-01.mp3   âm thanh đã hậu kỳ
  canh-01.json  {text, duration, words: [{word, start, end}]}  -> dùng cho phụ đề & Remotion
  manifest.json thời lượng từng cảnh
"""

from __future__ import annotations

import argparse
import base64
import json
import os
import subprocess
import sys
import time
from pathlib import Path

import requests

import kich_ban

API = "https://api.elevenlabs.io/v1/text-to-speech/{voice_id}/with-timestamps"
DEFAULT_MODEL = "eleven_v4"  # model cảm xúc nhất (10.000 ký tự/request) — đổi bằng ELEVENLABS_MODEL_ID
MODEL_LIMITS = {"eleven_v4": 10_000, "eleven_v3": 5_000, "eleven_multilingual_v2": 10_000}
# Model nhận voice_settings.speed (đã thử: eleven_v4 bỏ qua). Model khác -> làm chậm bằng ffmpeg.
NATIVE_SPEED_MODELS = {"eleven_multilingual_v2", "eleven_flash_v2_5", "eleven_turbo_v2_5"}
DEFAULT_SPEED = 0.9  # Bác Sáu nói chậm rãi; 1.0 = tốc độ gốc. Đổi bằng ELEVENLABS_SPEED
DEFAULT_PAUSE = 0.7  # giây lặng thêm giữa hai đoạn văn (trước khi làm chậm). Đổi bằng ELEVENLABS_PAUSE
CONTEXT_CHARS = 400  # độ dài previous_text/next_text gửi kèm để giọng liền mạch giữa các cảnh
SAMPLE_RATE = 44100


def words_from_alignment(alignment: dict) -> list[dict]:
    chars = alignment["characters"]
    starts = alignment["character_start_times_seconds"]
    ends = alignment["character_end_times_seconds"]
    words, buf, w_start, w_end = [], "", None, None
    for ch, s, e in zip(chars, starts, ends):
        if ch.isspace():
            if buf:
                words.append({"word": buf, "start": round(w_start, 3), "end": round(w_end, 3)})
            buf, w_start = "", None
            continue
        if w_start is None:
            w_start = s
        buf += ch
        w_end = e
    if buf:
        words.append({"word": buf, "start": round(w_start, 3), "end": round(w_end, 3)})
    return words


def synthesize(text: str, prev: str, nxt: str, *, voice_id: str, api_key: str, model: str, speed: float | None) -> dict:
    body = {
        "text": text,
        "model_id": model,
        "language_code": "vi",
        "previous_text": prev or None,
        "next_text": nxt or None,
    }
    if speed is not None:
        body["voice_settings"] = {"speed": speed}
    headers = {"xi-api-key": api_key, "Content-Type": "application/json"}
    url = API.format(voice_id=voice_id)

    for attempt in range(4):
        r = requests.post(url, json=body, headers=headers, params={"output_format": "mp3_44100_128"}, timeout=300)
        if r.status_code == 200:
            return r.json()
        if r.status_code in (400, 422) and (body.get("previous_text") or body.get("next_text")):
            # một số model không nhận ngữ cảnh — thử lại không kèm
            print(f"   ! model từ chối previous/next_text ({r.status_code}), thử lại không kèm ngữ cảnh")
            body["previous_text"] = body["next_text"] = None
            continue
        if r.status_code == 429 or r.status_code >= 500:
            wait = 5 * (attempt + 1)
            print(f"   ! HTTP {r.status_code}, đợi {wait}s rồi thử lại")
            time.sleep(wait)
            continue
        raise SystemExit(f"ElevenLabs lỗi HTTP {r.status_code}: {r.text[:500]}")
    raise SystemExit("ElevenLabs: thử lại nhiều lần vẫn lỗi, dừng.")


# Credit tính trên mỗi ký tự. Đo thực tế chu kỳ 10/2026 với eleven_v4: ~0,44.
# Mặc định 1,0 cho an toàn; đặt ELEVENLABS_CREDIT_PER_CHAR=0.5 khi đã xác nhận trong tab Usage.
DEFAULT_CREDIT_PER_CHAR = 1.0


def check_credit(api_key: str, chars: int) -> None:
    """In credit còn lại; dừng nếu ước tính lần thu này vượt quá. Key thiếu quyền User thì chỉ cảnh báo."""
    from datetime import datetime, timedelta, timezone
    try:
        r = requests.get("https://api.elevenlabs.io/v1/user/subscription", headers={"xi-api-key": api_key}, timeout=30)
    except requests.RequestException as e:
        print(f"   ! Không kiểm tra được credit ({e}) — vẫn tiếp tục")
        return
    if r.status_code != 200:
        print(f"   ! Không đọc được credit (HTTP {r.status_code}; key cần quyền User → Access) — vẫn tiếp tục")
        return
    s = r.json()
    left = s["character_limit"] - s["character_count"]
    rate = float(os.environ.get("ELEVENLABS_CREDIT_PER_CHAR") or DEFAULT_CREDIT_PER_CHAR)
    need = round(chars * rate)
    reset = datetime.fromtimestamp(s["next_character_count_reset_unix"], timezone(timedelta(hours=7))).strftime("%d/%m %H:%M")
    print(f"Credit: đã dùng {s['character_count']:,}/{s['character_limit']:,} · còn {left:,} · gia hạn {reset} · "
          f"lần này ≈ {need:,} (×{rate})".replace(",", "."))
    if need > left:
        raise SystemExit("Không đủ credit cho lần thu này — dừng. Bớt cảnh (--canh) hoặc đợi gia hạn.")
    warn = int(os.environ.get("ELEVENLABS_CANH_BAO") or 20_000)
    if left - need < warn:
        print("\n" + "!" * 70)
        print(f"!!! SAU LẦN THU NÀY CÒN DƯỚI {warn:,} CREDIT — BÁO CHỦ DỰ ÁN ĐỂ CHUẨN BỊ KEY MỚI".replace(",", "."))
        print("!" * 70 + "\n")


SEG_GAP = 0.3  # giây lặng chèn giữa hai đoạn khác người nói


def audio_duration(path: Path) -> float:
    out = subprocess.run(["ffprobe", "-v", "error", "-show_entries", "format=duration", "-of", "csv=p=0", str(path)],
                         capture_output=True, text=True, check=True).stdout
    return float(out.strip())


def synthesize_multi(sc, segs, prev, nxt, out_dir: Path, *, voices, api_key, model, speed) -> dict:
    """Mỗi đoạn một lệnh gọi với giọng của người nói, ghép lại thành canh-XX.goc.mp3, dời mốc thời gian chữ."""
    tmp = out_dir / f".{sc.slug}-doan"
    tmp.mkdir(exist_ok=True)
    words, parts, t = [], [], 0.0
    for k, (who, text) in enumerate(segs):
        before = " ".join(x for _, x in segs[:k])[-CONTEXT_CHARS:] or prev
        after = " ".join(x for _, x in segs[k + 1 :])[:CONTEXT_CHARS] or nxt
        print(f"   · đoạn {k + 1}/{len(segs)} [{who or 'chính'}] {len(text)} ký tự")
        res = synthesize(text, before, after, voice_id=voices[who], api_key=api_key, model=model, speed=speed)
        f = tmp / f"{k:02d}.mp3"
        f.write_bytes(base64.b64decode(res["audio_base64"]))
        al = res.get("alignment") or res.get("normalized_alignment")
        for w in words_from_alignment(al) if al else []:
            words.append({"word": w["word"], "start": round(w["start"] + t, 3), "end": round(w["end"] + t, 3)})
        parts.append(f)
        t += audio_duration(f) + (SEG_GAP if k < len(segs) - 1 else 0)
    # ghép: đoạn + lặng SEG_GAP xen kẽ
    inputs, chain, filters = [], [], []
    for k, f in enumerate(parts):
        inputs += ["-i", str(f)]
        filters.append(f"[{k}:a]aformat=sample_rates={SAMPLE_RATE}:channel_layouts=mono[a{k}]")
        chain.append(f"[a{k}]")
        if k < len(parts) - 1:
            filters.append(f"anullsrc=r={SAMPLE_RATE}:cl=mono,atrim=duration={SEG_GAP}[g{k}]")
            chain.append(f"[g{k}]")
    filters.append("".join(chain) + f"concat=n={len(chain)}:v=0:a=1[out]")
    subprocess.run(["ffmpeg", "-y", "-loglevel", "error", *inputs, "-filter_complex", ";".join(filters),
                    "-map", "[out]", "-c:a", "libmp3lame", "-b:a", "128k", str(out_dir / f"{sc.slug}.goc.mp3")], check=True)
    for f in parts:
        f.unlink()
    tmp.rmdir()
    # mốc chữ cuối từ API có thể vượt độ dài file một chút
    duration = max(t, words[-1]["end"] + 0.05) if words else t
    return {"text": sc.narration, "duration": round(duration, 3), "words": words, "speakers": [w or "chính" for w, _ in segs]}


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


def main() -> None:
    ap = argparse.ArgumentParser(description=__doc__, formatter_class=argparse.RawDescriptionHelpFormatter)
    ap.add_argument("kich_ban", help="đường dẫn file kịch bản .md")
    ap.add_argument("--canh", help="chỉ làm các cảnh này, vd 1,3,5-7")
    ap.add_argument("--force", action="store_true", help="gọi API tạo lại cả cảnh đã có bản gốc")
    ap.add_argument("--chi-hau-ky", action="store_true", help="không gọi API, chỉ xử lý lại từ bản gốc đã có")
    ap.add_argument("--dry-run", action="store_true", help="chỉ in ra số ký tự sẽ gửi, không gọi API")
    args = ap.parse_args()

    kich_ban.load_env()
    script = kich_ban.load(args.kich_ban)
    only = kich_ban.parse_scene_filter(args.canh)
    model = os.environ.get("ELEVENLABS_MODEL_ID") or DEFAULT_MODEL
    limit = MODEL_LIMITS.get(model, 5_000)
    speed = float(os.environ.get("ELEVENLABS_SPEED") or DEFAULT_SPEED)
    pause = float(os.environ.get("ELEVENLABS_PAUSE") or DEFAULT_PAUSE)
    native = model in NATIVE_SPEED_MODELS
    post_speed = 1.0 if native else speed
    out_dir = script.output_dir / "giong"

    scenes = script.scenes
    selected = [(i, sc) for i, sc in enumerate(scenes) if (not only or sc.number in only) and sc.narration]
    todo = []
    if not args.chi_hau_ky:
        for i, sc in selected:
            if len(sc.narration) > limit:
                raise SystemExit(f"{sc.slug} dài {len(sc.narration)} ký tự, vượt giới hạn {limit} của {model}. Hãy tách cảnh.")
            if (out_dir / f"{sc.slug}.goc.mp3").exists() and not args.force:
                print(f"- {sc.slug}: đã có bản gốc, không gọi API (dùng --force để tạo lại)")
                continue
            todo.append((i, sc))

    total = sum(len(sc.narration) for _, sc in todo)
    speed_note = f"tốc độ {speed} ({'API' if native else 'ffmpeg'}) · nghỉ {pause}s giữa đoạn"
    print(f"\nModel: {model} · {speed_note} · {len(todo)} cảnh gọi API · {total:,} ký tự bị trừ credit".replace(",", "."))
    if args.dry_run:
        for _, sc in todo:
            print(f"  {sc.slug} ({len(sc.narration):>5} ký tự) {sc.title}")
        return

    if todo:
        env = kich_ban.require_env("ELEVENLABS_API_KEY", "ELEVENLABS_VOICE_ID")
        check_credit(env["ELEVENLABS_API_KEY"], total)
        out_dir.mkdir(parents=True, exist_ok=True)
    for i, sc in todo:
        prev = scenes[i - 1].narration[-CONTEXT_CHARS:] if i > 0 else ""
        nxt = scenes[i + 1].narration[:CONTEXT_CHARS] if i + 1 < len(scenes) else ""
        segs = sc.segments or [("", sc.narration)]
        who = ", ".join(sorted({w or "chính" for w, _ in segs}))
        print(f"> {sc.slug} — {sc.title} ({len(sc.narration)} ký tự · giọng: {who})")
        if len(segs) == 1 and not segs[0][0]:
            res = synthesize(sc.narration, prev, nxt, voice_id=env["ELEVENLABS_VOICE_ID"], api_key=env["ELEVENLABS_API_KEY"],
                             model=model, speed=speed if native else None)
            (out_dir / f"{sc.slug}.goc.mp3").write_bytes(base64.b64decode(res["audio_base64"]))
            alignment = res.get("alignment") or res.get("normalized_alignment")
            goc = {
                "text": sc.narration,
                "duration": alignment["character_end_times_seconds"][-1] if alignment else None,
                "words": words_from_alignment(alignment) if alignment else [],
            }
        else:
            goc = synthesize_multi(sc, segs, prev, nxt, out_dir, voices={"": env["ELEVENLABS_VOICE_ID"], **script.voices},
                                   api_key=env["ELEVENLABS_API_KEY"], model=model, speed=speed if native else None)
        (out_dir / f"{sc.slug}.goc.json").write_text(json.dumps(goc, ensure_ascii=False, indent=1), encoding="utf-8")

    # Hậu kỳ mọi cảnh đã chọn có bản gốc
    for _, sc in selected:
        src = out_dir / f"{sc.slug}.goc.mp3"
        if not src.exists():
            continue
        goc = json.loads((out_dir / f"{sc.slug}.goc.json").read_text(encoding="utf-8"))
        final = post_process(src, out_dir / f"{sc.slug}.mp3", goc, speed=post_speed, pause=pause)
        (out_dir / f"{sc.slug}.json").write_text(json.dumps(final, ensure_ascii=False, indent=1), encoding="utf-8")
        print(f"   ✓ {sc.slug}: {goc['duration']:.1f}s gốc → {final['duration']:.1f}s, {len(final['words'])} từ")

    manifest = []
    for sc in scenes:
        f = out_dir / f"{sc.slug}.json"
        if f.exists():
            manifest.append({"scene": sc.number, "slug": sc.slug, "title": sc.title, "duration": json.loads(f.read_text(encoding="utf-8"))["duration"]})
    if manifest:
        (out_dir / "manifest.json").write_text(json.dumps(manifest, ensure_ascii=False, indent=1), encoding="utf-8")
        secs = sum(m["duration"] or 0 for m in manifest)
        print(f"\nXong. Tổng thời lượng hiện có: {int(secs // 60)} phút {int(secs % 60)} giây → {out_dir}")


if __name__ == "__main__":
    sys.stdout.reconfigure(encoding="utf-8")
    main()
