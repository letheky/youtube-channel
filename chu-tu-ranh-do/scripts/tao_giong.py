"""Tạo giọng VSP cho kịch bản Markdown; xuất MP3 + mốc từ cho Remotion.

  python scripts/tao_giong.py kich-ban/00-thu-giong.md --dry-run
  python scripts/tao_giong.py kich-ban/00-thu-giong.md
  python scripts/tao_giong.py --list-voices
  python scripts/tao_giong.py kich-ban/00-thu-giong.md --chi-hau-ky

Không gọi ElevenLabs, không ghi đè bản gốc hoặc tự thu lại audio đã có.
"""
from __future__ import annotations

import argparse
import hashlib
import json
import math
import os
import shutil
import subprocess
import sys
from pathlib import Path

import kich_ban
from hau_ky import post_process
from vsp_tts import (BASE_URL, DEFAULT_MODEL, DEFAULT_VOICE, Aligner, cached_chunk, canonical_words,
                     concatenate, list_voices, source_hash, split_text, wav_info)


def duration(path: Path) -> float:
    p = subprocess.run(["ffprobe", "-v", "error", "-show_entries", "format=duration", "-of", "csv=p=0", str(path)],
                       capture_output=True, text=True, check=True)
    return float(p.stdout.strip())


def write_json(path: Path, data: dict | list) -> None:
    path.write_text(json.dumps(data, ensure_ascii=False, indent=2), encoding="utf-8")


def parts_for(sc, voice: str, voice_map: dict, limit: int) -> list[tuple[str, str, str]]:
    out = []
    for speaker, text in sc.segments or [("", sc.narration)]:
        if speaker and speaker not in voice_map:
            raise ValueError(f"Chưa ánh xạ giọng VSP cho nhân vật {speaker!r}; đặt VSP_VOICE_MAP_JSON.")
        selected_voice = voice_map[speaker] if speaker else voice
        out.extend((speaker, selected_voice, chunk) for chunk in split_text(text, limit))
    if " ".join(t for _, _, t in out) != " ".join(sc.narration.split()):
        raise ValueError("Chia lời nhân vật làm đổi văn bản kịch bản.")
    return out


def record_scene(sc, parts, out_dir: Path, key: str, base: str, model: str, aligner: Aligner) -> dict:
    request_id = hashlib.sha256(json.dumps(
        [source_hash(text, voice, model, base) for _, voice, text in parts],
    ).encode()).hexdigest()
    cache = out_dir / ".vsp" / sc.slug
    cache.mkdir(parents=True, exist_ok=True)
    plan = cache / "plan.json"
    if plan.exists() and json.loads(plan.read_text(encoding="utf-8"))["request_hash"] != request_id:
        raise ValueError("Kế hoạch thu khác cache hiện có; giữ bản cũ và dùng slug mới.")
    if not plan.exists():
        write_json(plan, {"request_hash": request_id, "provider": "vsp", "chunks": len(parts)})
    wavs, local_words, gaps = [], [], []
    for k, (speaker, voice, text) in enumerate(parts):
        wav = cache / f"{k:03}.wav"
        print(f"  · đoạn {k+1}/{len(parts)} · {voice} · {len(text)} ký tự", flush=True)
        cached_chunk(wav, text, voice, key, base=base, model=model)
        words_path = wav.with_suffix(".words.json")
        if words_path.exists():
            words = json.loads(words_path.read_text(encoding="utf-8"))
        else:
            try:
                words = aligner.align(wav, text)
            except ValueError as error:
                if k==0 or not str(error).startswith('Mốc từ không hợp lệ:'):
                    raise
                print('    Căn lời cục bộ với WAV trước; không gửi lại TTS.',flush=True)
                words=aligner.align_with_context(wavs[-1],parts[k-1][2],wav,text)
            write_json(words_path, words)
        words = canonical_words(text, words, wav_info(wav.read_bytes())[1])
        if [w["word"] for w in words] != text.split():
            raise ValueError("Cache mốc từ khác lời đọc; không tự thu lại.")
        wavs.append(wav); local_words.append(words)
        gaps.append(0.3 if k + 1 < len(parts) and speaker != parts[k+1][0] else 0.0)

    # Finalize only after all WAVs and all alignments passed. Failed runs resume from cache.
    tmp = cache / "assembled.wav"
    if tmp.exists():
        tmp.unlink()  # local derived assembly only, never original WAV chunks
    offsets = concatenate(wavs, gaps, tmp)
    words = [{"word": w["word"], "start": round(w["start"] + offset, 3), "end": round(w["end"] + offset, 3)}
             for offset, group in zip(offsets, local_words) for w in group]
    if [w["word"] for w in words] != sc.narration.split():
        raise ValueError("Mốc từ cả cảnh không khớp kịch bản.")
    _, secs = wav_info(tmp.read_bytes())
    mp3 = cache / "assembled.mp3"
    subprocess.run(["ffmpeg", "-y", "-v", "error", "-i", str(tmp), "-ac", "1", "-ar", "44100",
                    "-c:a", "libmp3lame", "-b:a", "128k", str(mp3)], check=True)
    goc = {"text": sc.narration, "duration": round(secs, 3), "words": words, "provider": "vsp",
           "model": model, "voices": sorted({v for _, v, _ in parts}), "request_hash": request_id,
           "alignment": "faster-whisper forced alignment; requires listening QA",
           "chunk_count": len(parts), "wav_sha256": hashlib.sha256(tmp.read_bytes()).hexdigest()}
    # A crash between these files is handled as incomplete finalization; .vsp remains resumable.
    for src, target in [(tmp, out_dir / f"{sc.slug}.goc.wav"), (mp3, out_dir / f"{sc.slug}.goc.mp3")]:
        with target.open("xb") as f:
            f.write(src.read_bytes())
    with (out_dir / f"{sc.slug}.goc.json").open("x", encoding="utf-8") as f:
        json.dump(goc, f, ensure_ascii=False, indent=2)
    return goc


def main() -> None:
    p = argparse.ArgumentParser(description=__doc__, formatter_class=argparse.RawDescriptionHelpFormatter)
    p.add_argument("kich_ban", nargs="?")
    p.add_argument("--list-voices", action="store_true")
    p.add_argument("--canh")
    p.add_argument("--dry-run", action="store_true")
    p.add_argument("--chi-hau-ky", action="store_true")
    args = p.parse_args()
    kich_ban.load_env()
    base = os.environ.get("VSP_BASE_URL") or BASE_URL
    if args.list_voices:
        for voice in list_voices(base):
            print(f"{voice['id']}: {voice.get('description', voice.get('name'))}")
        return
    if not args.kich_ban:
        p.error("Cần đường dẫn kịch bản hoặc --list-voices.")
    script = kich_ban.load(args.kich_ban)
    voice = os.environ.get("VSP_VOICE_ID") or DEFAULT_VOICE
    model = os.environ.get("VSP_MODEL") or DEFAULT_MODEL
    voice_map = json.loads(os.environ.get("VSP_VOICE_MAP_JSON") or "{}")
    limit = int(os.environ.get("VSP_CHUNK_CHARS") or 180)
    speed = float(os.environ.get("TTS_SPEED") or 0.9)
    pause = float(os.environ.get("TTS_PAUSE") or 0.7)
    if not math.isfinite(speed) or not 0.5 <= speed <= 2 or not math.isfinite(pause) or not 0 <= pause <= 3:
        raise ValueError("TTS_SPEED phải 0.5–2; TTS_PAUSE phải 0–3 giây.")
    only = kich_ban.parse_scene_filter(args.canh)
    selected = [sc for sc in script.scenes if sc.narration and (not only or sc.number in only)]
    if not selected:
        raise ValueError("Không có cảnh được chọn; kiểm định dạng hoặc --canh.")
    out_dir = script.output_dir / "giong"
    jobs = []
    for sc in selected:
        originals = [out_dir / f"{sc.slug}.goc.{ext}" for ext in ["mp3", "json", "wav"]]
        existing = [f.exists() for f in originals]
        if any(existing):
            if not all(existing[:2]):
                raise ValueError(f"{sc.slug}: bản gốc chưa hoàn chỉnh; giữ nguyên để kiểm tra/phục hồi từ .vsp.")
            goc = json.loads(originals[1].read_text(encoding="utf-8"))
            if goc.get("text") != sc.narration:
                raise ValueError(f"{sc.slug}: lời đọc đã đổi sau thu; không ghi đè bản khóa.")
            print(f"- {sc.slug}: có bản gốc, không gọi TTS.")
        elif not args.chi_hau_ky:
            jobs.append((sc, parts_for(sc, voice, voice_map, limit)))
    print(f"VSP · {voice} · {len(jobs)} cảnh mới · {sum(len(s.narration) for s, _ in jobs)} ký tự")
    print(f"Hậu kỳ: tốc độ {speed}, nghỉ đoạn {pause}s; không dùng ElevenLabs/credit ElevenLabs.")
    if args.dry_run:
        for sc, parts in jobs:
            print(f"  {sc.slug}: {len(parts)} đoạn · {len(sc.narration)} ký tự · {sc.title}")
        return
    for tool in ["ffmpeg", "ffprobe"]:
        if not shutil.which(tool):
            raise ValueError(f"Chưa có {tool} trong PATH.")
    if jobs:
        key = kich_ban.require_env("VSP_API_KEY")["VSP_API_KEY"]
        valid = {v["id"] for v in list_voices(base)}
        if {v for _, parts in jobs for _, v, _ in parts} - valid:
            raise ValueError("Voice ID không có trong /voices; không dùng ID ElevenLabs cho VSP.")
        aligner = Aligner(os.environ.get("VSP_ALIGN_MODEL") or "small", os.environ.get("VSP_ALIGN_MODEL_DIR"))
        out_dir.mkdir(parents=True, exist_ok=True)
        for sc, parts in jobs:
            record_scene(sc, parts, out_dir, key, base, model, aligner)
    for sc in selected:
        src = out_dir / f"{sc.slug}.goc.mp3"
        target = out_dir / f"{sc.slug}.mp3"
        if not src.exists():
            if args.chi_hau_ky:
                raise ValueError(f"{sc.slug}: chưa có bản gốc để hậu kỳ.")
            continue
        # Do not silently regenerate final audio from existing/legacy source.
        if target.exists() and target.with_suffix(".json").exists() and not args.chi_hau_ky:
            continue
        goc = json.loads(src.with_suffix(".json").read_text(encoding="utf-8"))
        final = post_process(src, target, goc, speed=speed, pause=pause)
        final["duration"] = round(duration(target), 3)  # measured encoded audio, not filter estimate
        final["provider"] = goc.get("provider", "legacy")
        final["source_sha256"] = hashlib.sha256(src.read_bytes()).hexdigest()
        write_json(target.with_suffix(".json"), final)
        print(f"✓ {sc.slug}: {final['duration']}s · {len(final['words'])} từ", flush=True)
    manifest = []
    for sc in script.scenes:
        path = out_dir / f"{sc.slug}.json"
        if path.exists():
            data = json.loads(path.read_text(encoding="utf-8"))
            manifest.append({"scene": sc.number, "slug": sc.slug, "title": sc.title, "duration": data["duration"]})
    if manifest:
        write_json(out_dir / "manifest.json", manifest)


if __name__ == "__main__":
    sys.stdout.reconfigure(encoding="utf-8")
    try:
        main()
    except (ValueError, RuntimeError) as e:
        raise SystemExit(str(e)) from None
