import copy
import importlib.util
import json
import tempfile
import unittest
from pathlib import Path

ROOT = Path(__file__).resolve().parents[1]
SPEC = importlib.util.spec_from_file_location("preview", ROOT / "scripts/render_documentary_preview.py")
preview = importlib.util.module_from_spec(SPEC)
SPEC.loader.exec_module(preview)


class EditorialBoundaryTests(unittest.TestCase):
    def setUp(self):
        self.data = json.loads((ROOT / "episodes/01-napoleon-code-civil/episode.json").read_text(encoding="utf-8"))

    def load(self, data):
        with tempfile.TemporaryDirectory() as directory:
            path = Path(directory) / "episode.json"
            path.write_text(json.dumps(data, ensure_ascii=False), encoding="utf-8")
            return preview.load_episode(path)

    def test_checked_episode_loads(self):
        self.assertEqual(len(self.load(self.data)["scenes"]), 7)

    def test_unknown_or_missing_evidence_blocks_render(self):
        for evidence in ([], ["UNVERIFIED"]):
            data = copy.deepcopy(self.data)
            data["scenes"][2]["evidence"] = evidence
            with self.assertRaises(ValueError):
                self.load(data)

    def test_hook_must_precede_intro_in_story_order(self):
        self.data["scenes"] = self.data["scenes"][1:] + self.data["scenes"][:1]
        with self.assertRaises(ValueError):
            self.load(self.data)

    def test_unanswered_question_blocks_render(self):
        self.data["questions"][0]["answer_scenes"] = ["S99"]
        with self.assertRaises(ValueError):
            self.load(self.data)

    def test_duplicate_shot_ids_block_ambiguous_timeline(self):
        self.data["scenes"][1]["id"] = self.data["scenes"][0]["id"]
        with self.assertRaises(ValueError):
            self.load(self.data)

    def test_external_images_are_not_silently_accepted(self):
        self.data["release_gates"]["historical_image_assets"] = ["unlicensed.jpg"]
        with self.assertRaises(ValueError):
            self.load(self.data)

    def test_missing_translation_blocks_render(self):
        self.data["scenes"][0]["narration"]["en"] = " "
        with self.assertRaises(ValueError):
            self.load(self.data)

    def test_description_limit_includes_spaces(self):
        self.data["description"]["en"] = "x " * 150
        with self.assertRaises(ValueError):
            self.load(self.data)


if __name__ == "__main__":
    unittest.main()
