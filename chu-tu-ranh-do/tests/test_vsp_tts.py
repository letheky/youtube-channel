import io
import json
import os
import subprocess
import sys
import tempfile
import unittest
import wave
from pathlib import Path
from unittest.mock import Mock, patch

ROOT = Path(__file__).resolve().parent.parent
sys.path.insert(0, str(ROOT / "scripts"))
import vsp_tts as vsp
import kich_ban
import tao_giong


def wav_bytes(seconds=0.2):
    buf = io.BytesIO()
    with wave.open(buf, "wb") as f:
        f.setnchannels(1); f.setsampwidth(2); f.setframerate(16000)
        f.writeframes(b"\0\0" * round(seconds * 16000))
    return buf.getvalue()


class VspTests(unittest.TestCase):
    def test_split_preserves_words_and_paragraphs(self):
        text = "Chào bà con.\n\n" + "Đây là một câu dài có dấu phẩy, được chia nhỏ theo giới hạn. " * 8
        chunks = vsp.split_text(text, 60)
        self.assertEqual(" ".join(chunks), " ".join(text.split()))
        self.assertTrue(all(len(x) <= 60 for x in chunks))

    def test_alignment_maps_punctuation_to_exact_script(self):
        rows = [{"word": " Chào", "start": 0.1, "end": 0.4},
                {"word": ",", "start": 0.4, "end": 0.4},
                {"word": " Tư", "start": 0.5, "end": 0.7},
                {"word": "!", "start": 0.7, "end": 0.7}]
        result = vsp.canonical_words("Chào, Tư!", rows, 1)
        self.assertEqual([w["word"] for w in result], ["Chào,", "Tư!"])
        self.assertEqual(result[0]["start"], 0.1)
        self.assertEqual(result[-1]["end"], 0.7)

    def test_alignment_rejects_different_words_and_bad_timestamps(self):
        for rows in [[{"word": "khác", "start": 0, "end": 0.5}],
                     [{"word": "Chào", "start": 0.4, "end": 0.1}],
                     [{"word": "Chào", "start": 0.1, "end": 2}]]:
            with self.assertRaises(ValueError):
                vsp.canonical_words("Chào", rows, 1)

    def test_failed_http_stops_without_retry_or_exposing_response(self):
        response = Mock(status_code=401, text="secret-from-server")
        with patch.object(vsp.requests, "post", return_value=response) as post:
            with self.assertRaisesRegex(RuntimeError, "HTTP 401") as err:
                vsp.synthesize("Xin chào", "vi-thai-son", "test-key")
            self.assertNotIn("secret-from-server", str(err.exception))
            self.assertEqual(post.call_count, 1)
            self.assertFalse(post.call_args.kwargs["allow_redirects"])

    def test_cache_reuses_audio_but_rejects_changed_voice(self):
        with tempfile.TemporaryDirectory() as tmp:
            path = Path(tmp) / "000.wav"
            with patch.object(vsp, "synthesize", return_value=wav_bytes()) as synth:
                vsp.cached_chunk(path, "Chào", "vi-thai-son", "key", base=vsp.BASE_URL, model=vsp.DEFAULT_MODEL)
                before = path.read_bytes()
                vsp.cached_chunk(path, "Chào", "vi-thai-son", "key", base=vsp.BASE_URL, model=vsp.DEFAULT_MODEL)
                self.assertEqual(synth.call_count, 1)
                with self.assertRaises(ValueError):
                    vsp.cached_chunk(path, "Chào", "vi-duc-tri", "key", base=vsp.BASE_URL, model=vsp.DEFAULT_MODEL)
                self.assertEqual(path.read_bytes(), before)

    def test_pending_request_is_not_sent_again(self):
        with tempfile.TemporaryDirectory() as tmp:
            path = Path(tmp) / "000.wav"
            with patch.object(vsp, "synthesize", side_effect=RuntimeError("timeout")) as synth:
                with self.assertRaises(RuntimeError):
                    vsp.cached_chunk(path, "Chào", "vi-thai-son", "key", base=vsp.BASE_URL, model=vsp.DEFAULT_MODEL)
                with self.assertRaises(ValueError):
                    vsp.cached_chunk(path, "Chào", "vi-thai-son", "key", base=vsp.BASE_URL, model=vsp.DEFAULT_MODEL)
                self.assertEqual(synth.call_count, 1)

    def test_concatenation_shifts_using_actual_wav_duration(self):
        with tempfile.TemporaryDirectory() as tmp:
            paths = [Path(tmp) / f"{i}.wav" for i in range(2)]
            for path in paths:
                path.write_bytes(wav_bytes())
            dst = Path(tmp) / "joined.wav"
            offsets = vsp.concatenate(paths, [0.3, 0], dst)
            self.assertEqual(offsets, [0, 0.5])
            self.assertAlmostEqual(vsp.wav_info(dst.read_bytes())[1], 0.7)

    def test_legacy_voice_ids_are_not_used_for_new_tts(self):
        sc = kich_ban.Scene(1, "test", "Chào Tư", segments=[("", "Chào"), ("Tư", "Tư")])
        with self.assertRaisesRegex(ValueError, "ánh xạ"):
            tao_giong.parts_for(sc, "vi-thai-son", {}, 180)
        parts = tao_giong.parts_for(sc, "vi-thai-son", {"Tư": "vi-duc-tri"}, 180)
        self.assertEqual(parts[-1][1], "vi-duc-tri")

    def test_dry_run_is_offline_and_does_not_create_media(self):
        with tempfile.TemporaryDirectory() as tmp:
            script = Path(tmp) / "01-test.md"
            script.write_text("## CẢNH 1 — Test\n**LỜI ĐỌC:**\nXin chào bà con.\n---\n", encoding="utf-8")
            env = dict(os.environ, PYTHONUTF8="1")
            env.pop("VSP_API_KEY", None)
            result = subprocess.run([sys.executable, str(ROOT / "scripts/tao_giong.py"), str(script), "--dry-run"],
                                    capture_output=True, text=True, encoding="utf-8", env=env)
            self.assertEqual(result.returncode, 0, result.stderr)
            self.assertIn("1 cảnh mới", result.stdout)
            self.assertFalse((ROOT / "videos/01-test").exists())

    def test_existing_originals_and_finals_are_untouched(self):
        with tempfile.TemporaryDirectory() as tmp:
            root = Path(tmp)
            script = root / "01-test.md"
            script.write_text("## CẢNH 1 — Test\n**LỜI ĐỌC:**\nXin chào.\n---\n", encoding="utf-8")
            out = root / "videos/01-test/giong"
            out.mkdir(parents=True)
            files = {"canh-01.goc.mp3": b"original", "canh-01.mp3": b"final",
                     "canh-01.goc.json": json.dumps({"text": "Xin chào.", "duration": 1, "words": []}).encode(),
                     "canh-01.json": json.dumps({"text": "Xin chào.", "duration": 1, "words": []}).encode()}
            for name, data in files.items():
                (out / name).write_bytes(data)
            with patch.object(kich_ban, "ROOT", root), patch.object(kich_ban, "load_env"), \
                 patch.object(sys, "argv", ["tao_giong.py", str(script)]), \
                 patch.object(tao_giong, "record_scene") as record, \
                 patch.object(tao_giong, "post_process") as post, \
                 patch.object(tao_giong.shutil, "which", return_value="tool"):
                tao_giong.main()
                record.assert_not_called(); post.assert_not_called()
            for name, data in files.items():
                self.assertEqual((out / name).read_bytes(), data)


if __name__ == "__main__":
    unittest.main()
