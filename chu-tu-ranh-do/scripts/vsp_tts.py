"""VSP WAV synthesis + local forced alignment of the supplied Vietnamese text.

API contract checked against /openapi.json on 2026-10-28. No ElevenLabs fallback.
"""
from __future__ import annotations

import hashlib
import io
import json
import math
import os
import re
import subprocess
import unicodedata
import wave
import uuid
from pathlib import Path

import requests

BASE_URL = "https://vsp-translator.duckdns.org:9045"
DEFAULT_VOICE = "vi-thai-son"
DEFAULT_MODEL = "vieneu-v3-turbo"


def api_url(base: str) -> str:
    from urllib.parse import urlsplit
    url = urlsplit(base)
    if url.scheme != "https" or not url.hostname or url.username or url.password or url.query or url.fragment:
        raise ValueError("VSP_BASE_URL phải là HTTPS, không chứa thông tin đăng nhập/query/fragment.")
    return base.rstrip("/")


def list_voices(base: str = BASE_URL) -> list[dict]:
    r = requests.get(api_url(base) + "/voices", timeout=(15, 30), allow_redirects=False)
    if r.status_code != 200:
        raise RuntimeError(f"Không đọc được danh sách giọng VSP: HTTP {r.status_code}")
    return r.json()["voices"]


def split_text(text: str, limit: int = 180) -> list[str]:
    """Short speech units for <=30s Whisper alignment; preserve every source word."""
    if not 40 <= limit <= 220:
        raise ValueError("VSP_CHUNK_CHARS phải từ 40 tới 220 để căn lời trong cửa sổ 30 giây.")
    chunks: list[str] = []
    # Sentence/paragraph boundaries keep TTS prosody, without rewriting narration.
    units = re.split(r"(?<=[.!?…])\s+|\n\s*\n", text.strip())
    for unit in units:
        current = ""
        for word in unit.split():
            if len(word) > limit:
                raise ValueError("Có từ dài hơn giới hạn đoạn; cần soát lại văn bản.")
            if current and len(current) + len(word) + 1 > limit:
                chunks.append(current)
                current = ""
            current = (current + " " + word).strip()
        if current:
            chunks.append(current)
    if " ".join(chunks) != " ".join(text.split()):
        raise ValueError("Chia đoạn làm đổi lời đọc.")
    return chunks


def wav_info(audio: bytes) -> tuple[tuple[int, int, int], float]:
    with wave.open(io.BytesIO(audio), "rb") as f:
        if f.getcomptype() != "NONE" or not f.getnframes() or f.getsampwidth() != 2:
            raise ValueError("VSP phải trả WAV PCM 16-bit, có âm thanh.")
        return (f.getnchannels(), f.getsampwidth(), f.getframerate()), f.getnframes() / f.getframerate()


def synthesize(text: str, voice: str, key: str, *, base: str = BASE_URL, model: str = DEFAULT_MODEL) -> bytes:
    # Do not automatically resubmit timed-out/failed requests or print server responses.
    try:
        r = requests.post(
            api_url(base) + "/v1/audio/speech",
            headers={"Authorization": "Bearer " + key},
            json={"input": text, "voice": voice, "model": model, "response_format": "wav", "speed": 1.0},
            timeout=(15, 600), allow_redirects=False,
        )
    except requests.RequestException:
        raise RuntimeError("VSP lỗi kết nối/timeout; dừng, không tự gửi lại. WAV đã lưu được giữ nguyên.") from None
    if r.status_code != 200:
        raise RuntimeError(f"VSP HTTP {r.status_code}; dừng, không tự đổi dịch vụ hoặc gửi lại.")
    if "audio/wav" not in r.headers.get("Content-Type", "").lower():
        raise ValueError("VSP trả sai Content-Type, không coi là audio.")
    wav_info(r.content)
    return r.content


def source_hash(text: str, voice: str, model: str, base: str) -> str:
    value = json.dumps([text, voice, model, api_url(base), 1.0], ensure_ascii=False)
    return hashlib.sha256(value.encode("utf-8")).hexdigest()


def canonical_words(text: str, rows: list[dict], duration: float) -> list[dict]:
    """Map token/punctuation boundaries onto the exact whitespace words of the script.

    Uses measured alignment boundaries only; never spreads words evenly over audio.
    """
    def compact(s: str) -> str:
        return "".join(unicodedata.normalize("NFC", s).split())

    if compact(text) != compact("".join(r["word"] for r in rows)):
        raise ValueError("Căn lời khác văn bản gốc; dừng để kiểm tra.")
    spans, pos = [], 0
    for row in rows:
        size = len(compact(row["word"]))
        if size:
            spans.append((pos, pos + size, row))
            pos += size
    result, pos = [], 0
    for word in text.split():
        end = pos + len(compact(word))
        hits = [row for a, b, row in spans if a < end and b > pos]
        start_time = float(min(row["start"] for row in hits))
        end_time = float(max(row["end"] for row in hits))
        if not (math.isfinite(start_time) and math.isfinite(end_time) and 0 <= start_time < end_time <= duration + 0.08):
            raise ValueError(f"Mốc từ không hợp lệ: {word!r}; cần kiểm audio/căn lời.")
        start_time, end_time = round(start_time, 3), round(min(end_time, duration), 3)
        if result and start_time < result[-1]["end"] - 0.001:
            raise ValueError("Các từ chồng mốc thời gian; dừng để kiểm tra.")
        result.append({"word": word, "start": start_time, "end": end_time})
        pos = end
    return result


def context_window_words(rows: list[dict], offset: float, duration: float) -> list[dict]:
    """Intersect measured context alignment with the original WAV window.

    Up to120ms of DTW boundary drift may land before the original window.
    Never invent positive word durations or distribute timestamps uniformly.
    """
    result=[]
    for w in rows:
        start,end=w['start']-offset,w['end']-offset
        if start < -.12 or end > duration+.12:
            raise ValueError('Context alignment crosses the source audio window too far; needs review.')
        start,end=round(max(0,start),3),round(min(duration,end),3)
        if not 0<=start<end<=duration:
            raise ValueError('Context alignment has no positive measured interval in original WAV; needs review.')
        if result and start<result[-1]['end']-.001:
            raise ValueError('Context word intervals overlap; needs review.')
        result.append({'word':w['word'],'start':start,'end':end})
    return result


class Aligner:
    def __init__(self, model: str = "small", download_root: str | None = None):
        # Lazy imports: dry-run, listing voices and cached audio do not need the model.
        from faster_whisper import WhisperModel
        from faster_whisper.tokenizer import Tokenizer
        self.model = WhisperModel(model, device="cpu", compute_type="int8", cpu_threads=4,
                                  download_root=download_root)
        self.tokenizer = Tokenizer(self.model.hf_tokenizer, self.model.model.is_multilingual,
                                   task="transcribe", language="vi")

    def align(self, path: Path, text: str) -> list[dict]:
        import numpy as np
        from faster_whisper.audio import pad_or_trim
        # FFmpeg also works with runtimes whose PyAV version differs from faster-whisper.
        decoded = subprocess.run(["ffmpeg", "-v", "error", "-i", str(path), "-f", "f32le", "-ac", "1",
                                  "-ar", "16000", "-"], capture_output=True, check=True).stdout
        audio = np.frombuffer(decoded, dtype=np.float32)
        duration = len(audio) / 16000
        if not 0 < duration < 29:
            raise ValueError("Đoạn WAV phải ngắn hơn 29 giây; giảm VSP_CHUNK_CHARS rồi thu ở thư mục mới.")
        tokens = self.tokenizer.encode(" " + " ".join(text.split()))
        if len(tokens) > 400:
            raise ValueError("Đoạn có quá nhiều token để căn lời; giảm VSP_CHUNK_CHARS.")
        features = self.model.feature_extractor(audio)
        frames = min(features.shape[-1], int(np.ceil(duration * 100)))
        encoded = self.model.encode(pad_or_trim(features))
        rows = self.model.find_alignment(self.tokenizer, [tokens], encoded, frames)[0]
        return canonical_words(text, rows, duration)

    def align_with_context(self, previous: Path, previous_text: str, path: Path, text: str) -> list[dict]:
        """One local recovery attempt using already saved adjacent WAVs only."""
        previous_secs=wav_info(previous.read_bytes())[1]
        duration=wav_info(path.read_bytes())[1]
        if previous_secs+duration>=29:
            raise ValueError('Adjacent WAV context exceeds alignment window; stop for review.')
        folder=path.parent/'.alignment'
        folder.mkdir(exist_ok=True)
        derived=folder/f'{path.stem}-{uuid.uuid4().hex}.wav'
        offsets=concatenate([previous,path],[0,0],derived)
        rows=self.align(derived,previous_text+' '+text)
        selected=rows[len(previous_text.split()):]
        recovered=context_window_words(selected,offsets[1],duration)
        if [w['word'] for w in recovered]!=text.split():
            raise ValueError('Context alignment changed word sequence; stop for review.')
        report={'method':'adjacent saved WAV context + measured interval intersection',
                'previous_sha256':hashlib.sha256(previous.read_bytes()).hexdigest(),
                'source_sha256':hashlib.sha256(path.read_bytes()).hexdigest(),
                'analysis_wav':str(derived),'source_offset':offsets[1],
                'measured_context_rows':selected,'words':recovered,
                'tts_requests':0,'source_audio_changed':False,'listened':False}
        derived.with_suffix('.json').write_text(json.dumps(report,ensure_ascii=False,indent=2),encoding='utf-8')
        return recovered


def cached_chunk(path: Path, text: str, voice: str, key: str, *, base: str, model: str) -> None:
    marker = path.with_suffix(".request.json")
    digest = source_hash(text, voice, model, base)
    if marker.exists():
        info = json.loads(marker.read_text(encoding="utf-8"))
        if info["request_hash"] != digest:
            raise ValueError("Đoạn cache thuộc lời/giọng khác; giữ nguyên và dùng thư mục mới.")
        if not path.exists():
            raise ValueError("Lượt TTS đã bắt đầu nhưng chưa có WAV; kiểm tra trước khi thu lại ở thư mục mới.")
        wav_info(path.read_bytes())
        return
    if path.exists():
        raise ValueError("WAV không có thông tin nguồn; không ghi đè hoặc tự đoán.")
    path.parent.mkdir(parents=True, exist_ok=True)
    marker.write_text(json.dumps({"request_hash": digest, "text": text, "voice": voice,
                                 "model": model, "provider": "vsp"}, ensure_ascii=False, indent=2), encoding="utf-8")
    audio = synthesize(text, voice, key, base=base, model=model)
    # Exclusive creation protects original WAV even if the destination unexpectedly exists.
    with path.open("xb") as f:
        f.write(audio)


def concatenate(parts: list[Path], gaps: list[float], target: Path) -> list[float]:
    offsets, elapsed, fmt = [], 0.0, None
    with target.open("xb") as raw:
        with wave.open(raw, "wb") as out:
            for part, gap in zip(parts, gaps):
                audio = part.read_bytes()
                info, duration = wav_info(audio)
                if fmt is None:
                    fmt = info
                    out.setnchannels(fmt[0]); out.setsampwidth(fmt[1]); out.setframerate(fmt[2])
                if info != fmt:
                    raise ValueError("Các đoạn VSP khác định dạng WAV; không ghép âm thanh sai.")
                offsets.append(elapsed)
                with wave.open(io.BytesIO(audio), "rb") as src:
                    out.writeframes(src.readframes(src.getnframes()))
                silence_frames = round(gap * fmt[2])
                out.writeframes(b"\x00" * silence_frames * fmt[0] * fmt[1])
                elapsed += duration + silence_frames / fmt[2]
    return offsets
