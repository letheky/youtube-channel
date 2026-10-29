// Chia shot theo chỉ số chữ, giữ phần biên tập khi chạy lại.
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

export const SHOT_MIN = 4;
export const SHOT_TARGET = 6;
export const SHOT_MAX = 8;
const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "../..");
const sentenceEnd = /[.?!:;…]["”’)]*$/u;
const commaEnd = /[,—–]["”’)]*$/u;

/** Tối ưu nhịp gần 6s; ưu tiên hết câu, khoảng nghỉ, rồi dấu phẩy. */
export function splitWords(words, duration) {
  if (!words.length) throw new Error("Cảnh không có words");
  words.forEach((w, i) => {
    if (!Number.isFinite(w.start) || !Number.isFinite(w.end) || w.end < w.start || (i && w.start < words[i - 1].start)) {
      throw new Error(`Mốc chữ không hợp lệ tại ${i}`);
    }
  });
  if (!Number.isFinite(duration) || duration < words.at(-1).end) throw new Error("Thời lượng cảnh không hợp lệ");
  const time = (i) => i === words.length ? duration : i === 0 ? 0 : words[i].start;
  const costs = new Array(words.length + 1).fill(Infinity);
  const previous = new Array(words.length + 1).fill(-1);
  costs[0] = 0;
  for (let end = 1; end <= words.length; end++) {
    for (let from = end - 1; from >= 0; from--) {
      const seconds = time(end) - time(from);
      if (seconds > SHOT_MAX && from < end - 1) break;
      if (seconds < SHOT_MIN && !(from === 0 && end === words.length)) continue;
      if (!Number.isFinite(costs[from])) continue;
      const last = words[end - 1];
      const gap = end < words.length ? words[end].start - last.end : 0;
      const boundary = end === words.length || sentenceEnd.test(last.word) || gap > 0.5 ? 0 : commaEnd.test(last.word) ? 0.6 : 2.2;
      // Dấu phẩy gần giữa một câu dài tự có chi phí thấp hơn ngắt giữa cụm từ.
      const score = costs[from] + (seconds - SHOT_TARGET) ** 2 + boundary;
      if (score < costs[end]) { costs[end] = score; previous[end] = from; }
    }
  }
  if (previous[words.length] < 0) throw new Error("Không thể chia shot 4–8s; kiểm tra khoảng lặng/mốc giọng");
  const ranges = [];
  for (let end = words.length; end > 0;) {
    const from = previous[end];
    ranges.unshift({ from, to: end - 1 });
    end = from;
  }
  return ranges;
}

export function mergeShots(fresh, existing) {
  const old = new Map(existing.map((s) => [s.id, s]));
  if (old.size !== existing.length) throw new Error("shots.json có id trùng");
  const changes = fresh.filter((s) => {
    const before = old.get(s.id);
    return before && (before.scene !== s.scene || before.from !== s.from || before.to !== s.to || before.text !== s.text);
  }).map((s) => s.id);
  const removed = existing.filter((s) => !fresh.some((f) => f.id === s.id));
  if (changes.length || removed.length) {
    throw new Error(`Ranh giới/nội dung shot đã đổi: ${[...changes, ...removed.map((s) => s.id)].join(", ")}. Không ghi đè. Hãy đối chiếu và lưu bản cũ trước khi chia lại.`);
  }
  return fresh.map((s) => ({ ...s, ...old.get(s.id), from: s.from, to: s.to, text: s.text }));
}

export function buildShots(root, slug) {
  if (!/^[\w-]+$/.test(slug)) throw new Error("Slug không hợp lệ");
  const dir = path.join(root, "videos", slug);
  const manifest = JSON.parse(fs.readFileSync(path.join(dir, "giong/manifest.json"), "utf8"));
  const fresh = manifest.flatMap((m) => {
    const data = JSON.parse(fs.readFileSync(path.join(dir, "giong", `${m.slug}.json`), "utf8"));
    return splitWords(data.words, data.duration).map((r, i) => ({
      id: `${m.slug}-${String(i + 1).padStart(2, "0")}`, scene: m.scene, ...r,
      text: data.words.slice(r.from, r.to + 1).map((w) => w.word).join(" "),
      keyword: "", ref: false, prompt: "",
      ...(i === 0 && fs.existsSync(path.join(dir, "anh", `${m.slug}.png`)) ? { image: `anh/${m.slug}.png` } : {}),
    }));
  });
  const dest = path.join(root, "kich-ban", `${slug}.shots.json`);
  const existing = fs.existsSync(dest) ? JSON.parse(fs.readFileSync(dest, "utf8")) : [];
  const shots = mergeShots(fresh, existing);
  fs.writeFileSync(dest, JSON.stringify(shots, null, 2) + "\n");
  console.log(`${path.relative(root, dest)}: ${shots.length} shot, giữ ${existing.length} mục đã biên tập`);
  return shots;
}

if (process.argv[1] && path.resolve(process.argv[1]) === fileURLToPath(import.meta.url)) {
  try {
    if (!process.argv[2]) throw new Error("Cách dùng: node scripts/build-shots.mjs <slug>");
    buildShots(ROOT, process.argv[2]);
  } catch (e) { console.error(e.message); process.exitCode = 1; }
}
