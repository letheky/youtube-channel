// Gom giọng + ảnh + mốc thời gian của một video thành videos/<slug>/timeline.json (Remotion đọc)
// và xuất phụ đề videos/<slug>/phu-de.srt (tải lên YouTube).
//
//   node scripts/build-timeline.mjs 01-tra-sua-100-ly

import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { resolveShots } from "./shot-timeline.mjs";

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..", "..");
const slug = process.argv[2];
if (!slug) {
  console.error("Cách dùng: node scripts/build-timeline.mjs <slug-video>");
  process.exit(1);
}
if (!/^[\w-]+$/.test(slug)) throw new Error("Slug không hợp lệ");
const dir = path.join(ROOT, "videos", slug);
const GAP = 0.6; // giây lặng giữa hai cảnh
const MAX_WORDS = 11;
const SOFT_WORDS = 7;

const manifest = JSON.parse(fs.readFileSync(path.join(dir, "giong", "manifest.json"), "utf8"));
const shotFile = path.join(ROOT, "kich-ban", `${slug}.shots.json`);
const shots = fs.existsSync(shotFile) ? JSON.parse(fs.readFileSync(shotFile, "utf8")) : null;
if (shots && (new Set(shots.map((s) => s.id)).size !== shots.length || shots.some((s) => !manifest.some((m) => m.scene === s.scene)))) {
  throw new Error("shots.json có id trùng hoặc cảnh không có trong manifest");
}

// Chia lời đọc thành từng câu phụ đề ngắn
function toPhrases(words) {
  // 1) tách câu ở dấu chấm/hỏi/than hoặc chỗ ngừng dài
  const sentences = [];
  let cur = [];
  words.forEach((w, i) => {
    cur.push(i);
    const next = words[i + 1];
    if (/[.?!:;…]["”’)]*$/.test(w.word) || (next && next.start - w.end > 0.5)) {
      sentences.push(cur);
      cur = [];
    }
  });
  if (cur.length) sentences.push(cur);

  // 2) câu dài: ngắt ở dấu phẩy, rồi chia đều phần nào vẫn quá MAX_WORDS
  const chunks = [];
  for (const s of sentences) {
    let part = [];
    const parts = [];
    s.forEach((i, k) => {
      part.push(i);
      if (/[,—–]$/.test(words[i].word) && part.length >= SOFT_WORDS - 3 && s.length - k - 1 >= 3) {
        parts.push(part);
        part = [];
      }
    });
    if (part.length) parts.push(part);
    for (const p of parts) {
      const n = Math.ceil(p.length / MAX_WORDS);
      const size = Math.ceil(p.length / n);
      for (let j = 0; j < p.length; j += size) chunks.push(p.slice(j, j + size));
    }
  }
  return chunks.map((c) => ({ start: words[c[0]].start, end: words[c.at(-1)].end, from: c[0], to: c.at(-1) }));
}

let offset = 0;
const scenes = manifest.map((m) => {
  const data = JSON.parse(fs.readFileSync(path.join(dir, "giong", `${m.slug}.json`), "utf8"));
  const img = path.join(dir, "anh", `${m.slug}.png`);
  const scene = {
    n: m.scene,
    slug: m.slug,
    title: m.title,
    start: Math.round(offset * 1000) / 1000,
    duration: data.duration,
    audio: `${slug}/giong/${m.slug}.mp3`,
    image: fs.existsSync(img) ? `${slug}/anh/${m.slug}.png` : null,
    words: data.words,
    phrases: toPhrases(data.words),
    ...(shots ? { shots: resolveShots({ root: ROOT, slug, scene: m.scene, words: data.words, duration: data.duration, shots }) } : {}),
  };
  offset += data.duration + GAP;
  return scene;
});

const thumb = path.join(dir, "anh", "thumbnail.png");
const timeline = {
  slug,
  gap: GAP,
  thumbnail: fs.existsSync(thumb) ? `${slug}/anh/thumbnail.png` : null,
  duration: Math.round(offset * 1000) / 1000,
  scenes,
};
fs.writeFileSync(path.join(dir, "timeline.json"), JSON.stringify(timeline));

// SRT
const ts = (t) => {
  const ms = Math.round(t * 1000);
  const h = String(Math.floor(ms / 3600000)).padStart(2, "0");
  const mi = String(Math.floor((ms % 3600000) / 60000)).padStart(2, "0");
  const s = String(Math.floor((ms % 60000) / 1000)).padStart(2, "0");
  return `${h}:${mi}:${s},${String(ms % 1000).padStart(3, "0")}`;
};
let k = 0;
const srt = scenes
  .flatMap((sc) =>
    sc.phrases.map((p) => {
      const text = sc.words.slice(p.from, p.to + 1).map((w) => w.word).join(" ");
      return `${++k}\n${ts(sc.start + p.start)} --> ${ts(sc.start + p.end + 0.15)}\n${text}\n`;
    }),
  )
  .join("\n");
fs.writeFileSync(path.join(dir, "phu-de.srt"), srt, "utf8");

const missing = scenes.filter((s) => !s.image).map((s) => s.slug);
if (shots) {
  const all = scenes.flatMap((s) => s.shots);
  console.log(`Shot: ${all.length} · còn thiếu ảnh: ${all.filter((s) => !s.image).length} (dùng ảnh cảnh/nền giấy)`);
}
console.log(
  `timeline.json: ${scenes.length} cảnh, ${Math.floor(offset / 60)} phút ${Math.round(offset % 60)} giây · ${k} dòng phụ đề` +
    (missing.length ? ` · cảnh không có ảnh (dùng nền giấy): ${missing.join(", ")}` : ""),
);
