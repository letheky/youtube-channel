"""Kiểm tra xuất brief không gọi API, chỉ gồm ảnh còn thiếu và giữ chế độ cũ."""
import contextlib
import io
import json
import tempfile
import unittest
from pathlib import Path
from unittest.mock import patch

import tao_anh


class BriefTests(unittest.TestCase):
    def test_shot_export_filters_existing_and_reused_and_groups_25(self):
        with tempfile.TemporaryDirectory(prefix="bac-sau-brief-") as td:
            root = Path(td)
            (root / "kich-ban").mkdir()
            md = root / "kich-ban" / "example.md"
            md.write_text("# Kịch bản thử\n", encoding="utf-8")
            images = root / "videos/example/anh/shots"
            images.mkdir(parents=True)
            (images.parent / "canh-01.png").write_bytes(b"fixture")
            (images / "canh-01-02.png").write_bytes(b"fixture")
            ref = root / "character.png"
            ref.write_bytes(b"fixture")
            shots = [{"id": "canh-01-01", "scene": 1, "image": "anh/canh-01.png", "prompt": ""}]
            shots += [{"id": f"canh-01-{i:02}", "scene": 1, "ref": i % 2 == 0, "prompt": "A cup. No text."} for i in range(2, 30)]
            md.with_suffix(".shots.json").write_text(json.dumps(shots), encoding="utf-8")
            with patch.object(tao_anh.kich_ban, "ROOT", root), patch.object(tao_anh.kich_ban, "require_env") as require, patch.object(tao_anh, "request_image") as request, patch("sys.argv", ["tao_anh.py", str(md), "--shots", "--xuat-codex", "--ref", str(ref)]), contextlib.redirect_stdout(io.StringIO()):
                tao_anh.main()
            brief = (images / "CODEX.md").read_text(encoding="utf-8")
            self.assertEqual(brief.count("## Nhóm "), 2)
            self.assertEqual(brief.count("### `"), 27)
            self.assertNotIn("shots/canh-01-01.png", brief)
            self.assertNotIn("shots/canh-01-02.png", brief)
            self.assertIn("Tham chiếu: REF", brief)
            request.assert_not_called()
            require.assert_not_called()

    def test_legacy_prompt_still_attaches_character_reference(self):
        prompt, ref = tao_anh.build_prompt(tao_anh.kich_ban.REFERENCE_TAG + " A tea cup.")
        self.assertTrue(ref)
        self.assertIn(tao_anh.REF_INSTRUCTION, prompt)
        self.assertTrue(prompt.endswith(tao_anh.NO_TEXT))

    def test_brief_preserves_two_separate_character_references(self):
        with tempfile.TemporaryDirectory(prefix="bac-sau-two-refs-") as td:
            root = Path(td)
            first, second = root / 'bac.png', root / 'con-ut.png'
            first.write_bytes(b'fixture')
            second.write_bytes(b'fixture')
            with patch.object(tao_anh.kich_ban, 'ROOT', root), contextlib.redirect_stdout(io.StringIO()):
                tao_anh.write_codex_brief(root / 'shots', [('both.png', 'Two adults. No text.', True, '1536x864')], first, {'both.png': [first, second]})
            brief = (root / 'shots/CODEX.md').read_text(encoding='utf-8')
            self.assertIn('Tham chiếu: REF — `bac.png`, `con-ut.png`', brief)
            self.assertIn('attach both', brief)


if __name__ == "__main__":
    unittest.main()
