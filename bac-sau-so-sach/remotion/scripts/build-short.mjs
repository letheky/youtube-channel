// Ghép giọng cho Short từ các đoạn lời đọc đã thu của video dài (không tốn credit ElevenLabs).
//
//   node scripts/build-short.mjs 01-tra-sua-100-ly
//
// Đọc  videos/<slug>/short/spec.json : { gap, tail, segments: [{ scene: 1, from: 105, to: 133 }] }
//        (from/to = chỉ số chữ trong videos/<slug>/giong/canh-XX.json)
// Ghi  videos/<slug>/short/short.mp3  + short.json { duration, words[], segments[] } (thời gian tính trên Short)

import fs from "node:fs";
import path from "node:path";
import { execFileSync } from "node:child_process";
import { fileURLToPath } from "node:url";

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..", "..");
const slug = process.argv[2];
if (!slug || !/^[\w-]+$/.test(slug)) {
  console.error("Cách dùng: node scripts/build-short.mjs <slug-video>");
  process.exit(1);
}
const dir = path.join(ROOT, "videos", slug);
const spec = JSON.parse(fs.readFileSync(path.join(dir, "short", "spec.json"), "utf8"));
const gap = spec.gap ?? 0.35;
const tail = spec.tail ?? 3;

const inputs = [];
const filters = [];
const words = [];
const segments = [];
let t = 0;

spec.segments.forEach((seg, k) => {
  const name = `canh-${String(seg.scene).padStart(2, "0")}`;
  const data = JSON.parse(fs.readFileSync(path.join(dir, "giong", `${name}.json`), "utf8"));
  const w = data.words;
  if (seg.to >= w.length) throw new Error(`${name}: to=${seg.to} vượt số chữ ${w.length}`);
  const start = Math.max(0, w[seg.from].start - 0.06);
  const nextStart = seg.to + 1 < w.length ? w[seg.to + 1].start : data.duration;
  const end = Math.min(nextStart - 0.05, w[seg.to].end + 0.3);

  inputs.push("-i", path.join(dir, "giong", `${name}.mp3`));
  filters.push(`[${k}:a]atrim=start=${start.toFixed(3)}:end=${end.toFixed(3)},asetpts=PTS-STARTPTS,aformat=sample_rates=44100:channel_layouts=mono[s${k}]`);
  for (const x of w.slice(seg.from, seg.to + 1)) {
    words.push({ word: x.word, start: +(t + x.start - start).toFixed(3), end: +(t + x.end - start).toFixed(3), seg: k });
  }
  segments.push({ scene: seg.scene, start: +t.toFixed(3), end: +(t + end - start).toFixed(3), text: w.slice(seg.from, seg.to + 1).map((x) => x.word).join(" ") });
  t += end - start + gap;
});

const n = spec.segments.length;
const parts = [];
for (let k = 0; k < n; k++) {
  parts.push(`[s${k}]`);
  const d = k < n - 1 ? gap : tail;
  filters.push(`anullsrc=r=44100:cl=mono,atrim=duration=${d}[z${k}]`);
  parts.push(`[z${k}]`);
}
filters.push(`${parts.join("")}concat=n=${parts.length}:v=0:a=1[out]`);
const duration = +(t - gap + tail).toFixed(3);

fs.mkdirSync(path.join(dir, "short"), { recursive: true });
execFileSync("ffmpeg", ["-y", "-loglevel", "error", ...inputs, "-filter_complex", filters.join(";"), "-map", "[out]", "-c:a", "libmp3lame", "-b:a", "160k", path.join(dir, "short", "short.mp3")]);
fs.writeFileSync(path.join(dir, "short", "short.json"), JSON.stringify({ slug, duration, words, segments }, null, 1));
console.log(`short.mp3: ${duration.toFixed(1)}s · ${segments.length} đoạn · ${words.length} chữ`);
segments.forEach((s) => console.log(`  ${s.start.toFixed(1)}–${s.end.toFixed(1)}s  ${s.text.slice(0, 70)}…`));
