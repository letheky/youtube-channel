"""Stage existing Chú Tư media and aligned captions; never calls TTS."""
import json
import re
import shutil
from pathlib import Path

ROOT = Path(__file__).resolve().parents[1]


def main():
    data = json.loads((ROOT / "examples/thu-giong-thai-son.words.json").read_text(encoding="utf-8-sig"))
    words = data["words"]
    assert words and all(0 <= w["start"] < w["end"] <= data["duration"] for w in words)
    assert all(a["end"] <= b["start"] + 0.002 for a, b in zip(words, words[1:]))
    captions, group = [], []
    for word in words:
        group.append(word)
        text = " ".join(w["word"] for w in group)
        if len(text) >= 45 or re.search(r"[.!?]$", word["word"]):
            captions.append({"text": text, "start": group[0]["start"], "end": group[-1]["end"]})
            group = []
    if group:
        captions.append({"text": " ".join(w["word"] for w in group), "start": group[0]["start"], "end": group[-1]["end"]})
    assert " ".join(c["text"] for c in captions) == " ".join(w["word"] for w in words)
    public = ROOT / "remotion/public"
    for folder in ("branding", "demo"):
        (public / folder).mkdir(parents=True, exist_ok=True)
    shutil.copy2(ROOT / "assets/branding/avatar-chu-tu.png", public / "branding/avatar-chu-tu.png")
    shutil.copy2(ROOT / "examples/thu-giong-thai-son.mp3", public / "demo/thu-giong-thai-son.mp3")
    preview_path = ROOT / "remotion/src/preview.json"
    preview = json.loads(preview_path.read_text(encoding="utf-8"))
    preview["audio"] = "demo/thu-giong-thai-son.mp3"
    preview["captions"] = captions
    preview_path.write_text(json.dumps(preview, ensure_ascii=False, indent=2) + "\n", encoding="utf-8")
    print(f"Staged existing audio: {data['duration']}s, {len(words)} words, {len(captions)} captions; no TTS called")


if __name__ == "__main__":
    main()
