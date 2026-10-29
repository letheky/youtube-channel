"""Compose original synthetic brand cues and mux copies of the silent masters.

No samples, music downloads, TTS requests, or network access. The existing
silent masters are inputs only. FFmpeg and FFprobe must be on PATH.
"""
import array
import hashlib
import json
import math
import re
import subprocess
import wave
from pathlib import Path

ROOT = Path(__file__).resolve().parents[1]
WORK = ROOT / "work" / "brand-audio-v1"
AUDIO = ROOT / "assets" / "audio"
MOTION = ROOT / "assets" / "motion"
RATE = 48000
TAU = math.tau


def run(args):
    return subprocess.run(args, check=True, capture_output=True, text=True).stderr


def frequency(midi):
    return 440.0 * 2 ** ((midi - 69) / 12)


def compose(path, duration, notes, pad_gain):
    """A restrained D-centred cue: soft glass notes above a warm pad."""
    stereo = array.array("h")
    partials = ((1.0, 1.0), (2.0, 0.22), (3.0, 0.07), (4.0, 0.025))
    pads = [frequency(midi) for midi in (50, 57, 60, 64)]
    for frame in range(round(duration * RATE)):
        t = frame / RATE
        fade = min(1.0, t / 0.12, max(0.0, (duration - t) / 0.8))
        left = right = 0.0
        for onset, midi, gain, pan in notes:
            age = t - onset
            if age < 0 or age > 4.0:
                continue
            envelope = (1 - math.exp(-age * 45)) * math.exp(-age * 1.65)
            f = frequency(midi)
            bell = sum(weight * math.sin(TAU * f * harmonic * age)
                       * math.exp(-age * 0.45 * (harmonic - 1))
                       for harmonic, weight in partials)
            left += gain * envelope * bell * math.sqrt((1 - pan) / 2)
            right += gain * envelope * bell * math.sqrt((1 + pan) / 2)
        pad_envelope = min(1.0, t / 0.65) * fade
        for f in pads:
            left += pad_gain * pad_envelope * math.sin(TAU * f * t)
            right += pad_gain * pad_envelope * math.sin(TAU * f * 1.0012 * t)
        for value in (left * fade, right * fade):
            stereo.append(round(max(-1, min(1, value)) * 32767))
    # WAV is little endian regardless of the host's native byte order.
    import sys
    if sys.byteorder != "little":
        stereo.byteswap()
    with wave.open(str(path), "wb") as output:
        output.setnchannels(2)
        output.setsampwidth(2)
        output.setframerate(RATE)
        output.writeframes(stereo.tobytes())


def measure(path):
    log = run(["ffmpeg", "-hide_banner", "-nostats", "-i", str(path),
               "-af", "loudnorm=I=-20:TP=-2:LRA=7:print_format=json",
               "-f", "null", "-"])
    return json.loads(re.search(r'\{\s*"input_i".*?\}', log, re.S).group())


def sha256(path):
    return hashlib.sha256(path.read_bytes()).hexdigest()


def build(name, duration, notes, pad_gain):
    source = WORK / f"{name}-composition.wav"
    final_audio = AUDIO / f"{name}-original-v1.wav"
    master = MOTION / ("intro-3s-master-silent.mp4" if name == "intro"
                       else "outro-12s-master-silent.mp4")
    final_video = MOTION / f"{name}-original-audio-v1.mp4"
    if final_audio.exists() or final_video.exists():
        raise FileExistsError("Version v1 already exists; choose a new version before rebuilding")
    compose(source, duration, notes, pad_gain)
    measured = measure(source)
    normalize = (
        "loudnorm=I=-20:TP=-2:LRA=7:linear=true:"
        f"measured_I={measured['input_i']}:measured_TP={measured['input_tp']}:"
        f"measured_LRA={measured['input_lra']}:measured_thresh={measured['input_thresh']}:"
        f"offset={measured['target_offset']}"
    )
    run(["ffmpeg", "-hide_banner", "-loglevel", "error", "-n", "-i", str(source),
         "-af", normalize, "-ar", str(RATE), "-c:a", "pcm_s16le", str(final_audio)])
    run(["ffmpeg", "-hide_banner", "-loglevel", "error", "-n", "-i", str(master),
         "-i", str(final_audio), "-map", "0:v:0", "-map", "1:a:0", "-c:v", "copy",
         "-c:a", "aac", "-b:a", "192k", "-t", str(duration), "-movflags", "+faststart",
         str(final_video)])
    run(["ffmpeg", "-hide_banner", "-loglevel", "error", "-i", str(final_video),
         "-f", "null", "-"])
    probe = json.loads(subprocess.check_output([
        "ffprobe", "-v", "error", "-show_streams", "-show_format", "-of", "json",
        str(final_video)], text=True))
    streams = probe["streams"]
    assert len([s for s in streams if s["codec_type"] == "audio"]) == 1
    assert len([s for s in streams if s["codec_type"] == "video"]) == 1
    assert abs(float(probe["format"]["duration"]) - duration) < 0.05
    audio = next(s for s in streams if s["codec_type"] == "audio")
    video = next(s for s in streams if s["codec_type"] == "video")
    assert audio["channels"] == 2 and int(audio["sample_rate"]) == RATE
    assert (video["width"], video["height"]) == (1920, 1080)
    (WORK / f"{name}-probe.json").write_text(json.dumps(probe, indent=2), encoding="utf-8")
    return {
        "cue": name, "duration_seconds": duration,
        "composition": "Original additive synthesis; D-centred glass motif; no external samples",
        "notes": [{"onset_seconds": n[0], "midi": n[1], "gain": n[2], "pan": n[3]}
                  for n in notes],
        "audio": str(final_audio.relative_to(ROOT)).replace("\\", "/"),
        "audio_sha256": sha256(final_audio),
        "video": str(final_video.relative_to(ROOT)).replace("\\", "/"),
        "video_sha256": sha256(final_video),
        "source_silent_master_sha256": sha256(master),
        "final_aac_loudness": measure(final_video),
        "technical_qa": "Full video/audio decode passed; duration, stereo 48kHz, 1080p checked",
        "listening_qa": "Pending human audition; agent has not listened",
    }


def main():
    for directory in (WORK, AUDIO, MOTION):
        directory.mkdir(parents=True, exist_ok=True)
    intro = [(0.1, 62, 0.15, -0.15), (0.48, 69, 0.12, 0.2),
             (0.86, 74, 0.11, -0.1), (1.24, 76, 0.065, 0.15),
             (1.7, 74, 0.08, 0.0)]
    outro = [(0.15 + i * 0.7, midi, 0.085 if i < 8 else 0.065,
              -0.2 if i % 2 == 0 else 0.2)
             for i, midi in enumerate((62, 65, 69, 76, 74, 69, 65, 64,
                                        62, 65, 69, 74, 76, 74))]
    cues = [build("intro", 3.2, intro, 0.01), build("outro", 12.0, outro, 0.009)]
    result = {
        "created_on": "2026-10-29", "timezone": "Asia/Saigon", "version": 1,
        "creator": "Codex procedural synthesis for Dau Vet Thoi Dai",
        "source_code": "scripts/build_brand_audio.py",
        "third_party_audio": False,
        "youtube_audio_library_candidate_used": False,
        "status": "Technically checked preview; listening QA pending",
        "cues": cues,
    }
    path = ROOT / "config" / "brand-audio-v1.json"
    path.write_text(json.dumps(result, ensure_ascii=False, indent=2) + "\n", encoding="utf-8")
    print(json.dumps(result, ensure_ascii=False, indent=2))


if __name__ == "__main__":
    main()
