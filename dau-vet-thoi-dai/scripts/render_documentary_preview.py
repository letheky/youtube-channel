"""Render an explicitly unvoiced documentary storyboard, never an upload.

Uses episode.json as the single bilingual editorial source. On-screen credits
are mandatory. This first template supports original typography/diagrams only;
it does not fetch or grant rights to historical images. No TTS/network calls.
"""
import argparse
import hashlib
import json
import subprocess
from pathlib import Path

from PIL import Image, ImageDraw, ImageFont

ROOT = Path(__file__).resolve().parents[1]
SIZE = (1920, 1080)
NAVY, GOLD, WHITE, MUTED = "#071222", "#E5C483", "#F1F0EB", "#BCC4D2"
FONT = Path("C:/Windows/Fonts/arial.ttf")
BOLD = Path("C:/Windows/Fonts/arialbd.ttf")


def load_episode(path):
    episode = json.loads(path.read_text(encoding="utf-8"))
    scenes = episode["scenes"]
    ids = [scene["id"] for scene in scenes]
    if len(ids) != len(set(ids)):
        raise ValueError("Duplicate scene IDs")
    if not scenes or scenes[0]["role"] != "hook":
        raise ValueError("The first scene must be the hook before the intro")
    sources = {item["id"]: item for item in episode["sources"]}
    for scene in scenes:
        if not scene["evidence"] or set(scene["evidence"]) - sources.keys():
            raise ValueError(f"Missing/unknown source in {scene['id']}")
        if not scene["visual_kind"].startswith("original_"):
            raise ValueError("This preview template supports original graphics only")
        if scene["estimated_seconds"] <= 0:
            raise ValueError("Scene duration must be positive")
        for lang in ("vi", "en"):
            if not scene["narration"][lang].strip() or not scene["display"][lang]:
                raise ValueError("Both languages require narration and display copy")
    for question in episode["questions"]:
        answers = question["answer_scenes"]
        if not answers or set(answers) - set(ids):
            raise ValueError("Every hook question must map to existing answer scenes")
        if not all(question["id"] in s["answers"] for s in scenes if s["id"] in answers):
            raise ValueError("Question/answer mapping is inconsistent")
    for lang in ("vi", "en"):
        if len(episode["description"][lang]) > 299:
            raise ValueError("Description exceeds the channel's 299-character rule")
    if episode["release_gates"].get("historical_image_assets"):
        raise ValueError("Historical image assets need a separate licensed-asset renderer")
    return episode


def font(size, bold=False):
    return ImageFont.truetype(str(BOLD if bold else FONT), size)


def wrap_pixels(draw, text, face, width):
    lines, line = [], ""
    for word in text.split():
        candidate = f"{line} {word}".strip()
        if draw.textlength(candidate, font=face) > width:
            if not line or draw.textlength(word, font=face) > width:
                raise ValueError(f"Text token will not fit: {word}")
            lines.append(line)
            line = word
        else:
            line = candidate
    if line:
        lines.append(line)
    return lines


def render_card(episode, scene, lang, path):
    canvas = Image.new("RGB", SIZE, NAVY)
    draw = ImageDraw.Draw(canvas)
    for x in range(0, SIZE[0], 120):
        draw.line((x, 0, x, SIZE[1]), fill="#101F32")
    for y in range(0, SIZE[1], 120):
        draw.line((0, y, SIZE[0], y), fill="#101F32")
    draw.rectangle((104, 112, 114, 834), fill=GOLD)
    draw.text((145, 93), "DẤU VẾT THỜI ĐẠI · TRACES OF TIME", font=font(24, True), fill=GOLD)
    badge = "BẢN THỬ · CHƯA THU GIỌNG" if lang == "vi" else "STORYBOARD · NARRATION PENDING"
    badge_face = font(21, True)
    draw.text((1780 - draw.textlength(badge, font=badge_face), 96), badge, font=badge_face, fill=MUTED)
    heading_lines = wrap_pixels(draw, scene["heading"][lang], font(46, True), 1550)
    if len(heading_lines) > 2:
        raise ValueError("Heading needs more than two lines")
    y = 210
    for line in heading_lines:
        draw.text((145, y), line, font=font(46, True), fill=MUTED)
        y += 65
    y = 370
    display = scene["display"][lang]
    body_size = 64 if len(display) <= 3 else 55
    body = font(body_size, True)
    for i, paragraph in enumerate(display):
        lines = wrap_pixels(draw, paragraph, body, 1550)
        for line in lines:
            if y + body_size > 840:
                raise ValueError(f"Body text overflow: {scene['id']} / {lang}")
            draw.text((145, y), line, font=body, fill=GOLD if i == 0 else WHITE)
            y += body_size + 14
        y += 20
    source_map = {source["id"]: source for source in episode["sources"]}
    credit = " · ".join(source_map[source]["short_credit"] for source in scene["evidence"])
    prefix = "Nguồn: " if lang == "vi" else "Sources: "
    credit_lines = wrap_pixels(draw, prefix + credit, font(25), 1615)
    if len(credit_lines) > 3:
        raise ValueError("Credits exceed safe source region")
    draw.line((145, 906, 1780, 906), fill="#715E3D", width=2)
    for i, line in enumerate(credit_lines):
        draw.text((145, 930 + i * 32), line, font=font(25), fill=MUTED)
    canvas.save(path)


def run(args):
    subprocess.run(args, check=True, capture_output=True)


def srt_time(seconds):
    millis = round(seconds * 1000)
    hours, millis = divmod(millis, 3600000)
    minutes, millis = divmod(millis, 60000)
    sec, millis = divmod(millis, 1000)
    return f"{hours:02}:{minutes:02}:{sec:02},{millis:03}"


def export_editorial(episode, directory):
    """Export narration without manufacturing aligned subtitle timestamps."""
    for lang in ("vi", "en"):
        lines = [f"# {episode['title'][lang]}", "", "DRAFT · NOT VOICE LOCKED", ""]
        for index, scene in enumerate(episode["scenes"]):
            lines += [f"## {scene['id']} — {scene['heading'][lang]}", "",
                      scene["narration"][lang], "",
                      "Sources: " + ", ".join(scene["evidence"]), ""]
            if index == 0:
                lines += ["[INTRO 3.2 seconds — after hook]", ""]
        (directory / f"script-{lang}.md").write_text("\n".join(lines), encoding="utf-8")
    sources = ["# Sources checked 2026-10-29", "", "These links support claims; they do not grant image rights.", ""]
    for source in episode["sources"]:
        sources += [f"## {source['id']} — {source['title']}", "",
                    f"[{source['title']}]({source['url']})", "", source["locator"], "",
                    "Verification: " + source["verification"], ""]
    (directory / "SOURCES.md").write_text("\n".join(sources), encoding="utf-8")


def main():
    parser = argparse.ArgumentParser(description=__doc__)
    parser.add_argument("episode", type=Path)
    parser.add_argument("--lang", choices=("vi", "en"), default="vi")
    parser.add_argument("--output", type=Path, required=True)
    parser.add_argument("--body-seconds", type=int, default=6)
    parser.add_argument("--stills-only", action="store_true")
    args = parser.parse_args()
    if args.body_seconds < 4:
        parser.error("Credits need at least four seconds per scene in the preview")
    episode = load_episode(args.episode)
    args.output.mkdir(parents=True, exist_ok=True)
    work = args.output / "stills"
    work.mkdir(exist_ok=True)
    export_editorial(episode, args.episode.parent)
    for scene in episode["scenes"]:
        render_card(episode, scene, args.lang, work / f"{scene['id']}-{args.lang}.png")
    if args.stills_only:
        print(f"Validated {len(episode['scenes'])} source-credited cards for {args.lang}")
        return
    target = args.output / f"{episode['id']}-{args.lang}-unvoiced-preview-v1.mp4"
    if target.exists():
        raise FileExistsError("Preview exists; use a new output directory/version")
    segments, cues, timeline = [], [], []
    current = 0.0
    for index, scene in enumerate(episode["scenes"]):
        duration = scene["estimated_seconds"] if index == 0 else args.body_seconds
        still = work / f"{scene['id']}-{args.lang}.png"
        segment = work / f"{scene['id']}-{args.lang}.mp4"
        run(["ffmpeg", "-hide_banner", "-loglevel", "error", "-n", "-loop", "1",
             "-framerate", "30", "-i", str(still), "-f", "lavfi", "-i",
             "anullsrc=r=48000:cl=stereo", "-t", str(duration),
             "-vf", "fade=t=in:st=0:d=0.25,fade=t=out:st=" + str(duration - .25) + ":d=0.25,format=yuv420p",
             "-c:v", "libx264", "-threads", "2", "-preset", "veryfast", "-crf", "20",
             "-c:a", "aac", "-b:a", "192k", "-shortest", str(segment)])
        segments.append(segment)
        timeline.append({"scene": scene["id"], "start": current, "duration": duration,
                         "evidence": scene["evidence"], "narration_present": False})
        # These captions repeat the visible card, not a fake transcription.
        cues.append(f"{len(cues)+1}\n{srt_time(current)} --> {srt_time(current+duration)}\n"
                    + "\n".join(scene["display"][args.lang]) + "\n")
        current += duration
        if index == 0:
            segments.append(ROOT / "assets/motion/intro-original-audio-v1.mp4")
            timeline.append({"scene": "INTRO", "start": current, "duration": 3.2})
            current += 3.2
    segments.append(ROOT / "assets/motion/outro-original-audio-v1.mp4")
    timeline.append({"scene": "OUTRO", "start": current, "duration": 12.0})
    current += 12.0
    listing = work / "concat.txt"
    # Our generated paths are escaped for FFmpeg's concat format, not a shell.
    listing.write_text("\n".join("file '" + str(p.resolve()).replace("\\", "/").replace("'", "'\\''") + "'"
                                 for p in segments), encoding="utf-8")
    run(["ffmpeg", "-hide_banner", "-loglevel", "error", "-n", "-f", "concat", "-safe", "0",
         "-i", str(listing), "-c:v", "libx264", "-threads", "2", "-preset", "veryfast",
         "-crf", "20", "-pix_fmt", "yuv420p", "-af", "aresample=async=1:first_pts=0",
         "-c:a", "aac", "-b:a", "192k", "-movflags", "+faststart", str(target)])
    run(["ffmpeg", "-hide_banner", "-loglevel", "error", "-i", str(target), "-f", "null", "-"])
    probe = json.loads(subprocess.check_output(["ffprobe", "-v", "error", "-show_format",
                                               "-show_streams", "-of", "json", str(target)], text=True))
    if abs(float(probe["format"]["duration"]) - current) > 0.15:
        raise ValueError("Rendered duration does not match timeline")
    manifest = {"episode": episode["id"], "language": args.lang, "kind": "unvoiced_storyboard_preview",
                "expected_seconds": current, "timeline": timeline, "probe": probe,
                "video_sha256": hashlib.sha256(target.read_bytes()).hexdigest(),
                "episode_sha256": hashlib.sha256(args.episode.read_bytes()).hexdigest(),
                "qa": "decode passed; still typography inspected separately; listening pending",
                "upload_allowed": False}
    (args.output / "preview-manifest.json").write_text(json.dumps(manifest, ensure_ascii=False, indent=2), encoding="utf-8")
    (args.output / "visible-card-captions.srt").write_text("\n".join(cues), encoding="utf-8")
    print(target)


if __name__ == "__main__":
    main()
