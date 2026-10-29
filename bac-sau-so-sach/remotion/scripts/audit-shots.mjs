// Kiểm tra đủ lời, đủ prompt, ảnh PNG đọc được và không dùng trùng ảnh cho nhiều shot.
import fs from "node:fs";
import path from "node:path";
import crypto from "node:crypto";
import { fileURLToPath } from "node:url";
import { resolveShots } from "./shot-timeline.mjs";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "../..");
const slug = process.argv[2];
if (!slug || !/^[\w-]+$/.test(slug)) throw new Error("Cách dùng: node scripts/audit-shots.mjs <slug> [--require-images]");
const dir = path.join(root, "videos", slug);
const source = JSON.parse(fs.readFileSync(path.join(root, "kich-ban", `${slug}.shots.json`), "utf8"));
const manifest = JSON.parse(fs.readFileSync(path.join(dir, "giong/manifest.json"), "utf8"));
const errors = [], missing = [], durations = [], hashes = new Map();
if (new Set(source.map((s) => s.id)).size !== source.length) errors.push("Id shot trùng");
for (const item of manifest) {
  const data = JSON.parse(fs.readFileSync(path.join(dir, "giong", `${item.slug}.json`), "utf8"));
  const resolved = resolveShots({ root, slug, scene: item.scene, words: data.words, duration: data.duration, shots: source });
  for (const shot of resolved) {
    const original = source.find((s) => s.id === shot.id);
    if (original.text !== data.words.slice(original.from, original.to + 1).map((w) => w.word).join(" ")) errors.push(`${shot.id}: text lệch words`);
    if (!original.image && !original.prompt?.trim()) errors.push(`${shot.id}: thiếu prompt`);
    if (original.prompt && !original.prompt.endsWith("No text, letters, numbers, logos or watermarks.")) errors.push(`${shot.id}: thiếu ràng buộc không chữ`);
    if (original.keyword && (original.keyword !== original.keyword.toLocaleUpperCase("vi") || original.keyword.split(/\s+/).length < 2 || original.keyword.split(/\s+/).length > 5)) errors.push(`${shot.id}: keyword không đúng 2–5 chữ hoa`);
    durations.push(shot.end - shot.start);
    if (!shot.image) { missing.push(shot.id); continue; }
    const buffer = fs.readFileSync(path.join(root, "videos", shot.image));
    if (buffer.length < 24 || buffer.subarray(0, 8).toString("hex") !== "89504e470d0a1a0a") { errors.push(`${shot.id}: không phải PNG hợp lệ`); continue; }
    const width = buffer.readUInt32BE(16), height = buffer.readUInt32BE(20);
    if (!height || width < 1000 || Math.abs(width / height - 16 / 9) > 0.02) errors.push(`${shot.id}: kích thước/tỷ lệ ảnh ${width}×${height}`);
    const hash = crypto.createHash("sha256").update(buffer).digest("hex");
    if (hashes.has(hash)) errors.push(`${shot.id}: ảnh trùng ${hashes.get(hash)}`);
    hashes.set(hash, shot.id);
  }
}
if (source.some((s) => !manifest.some((m) => m.scene === s.scene))) errors.push("Shot thuộc cảnh ngoài manifest");
const report = {
  slug, shots: source.length, newImages: source.filter((s) => s.prompt).length,
  refs: source.filter((s) => s.ref).length, keywords: source.filter((s) => s.keyword).length,
  duration: { min: Math.min(...durations), max: Math.max(...durations), mean: durations.reduce((a, b) => a + b, 0) / durations.length },
  imagesPresent: hashes.size, missing, errors,
};
const dest = path.join(dir, "anh/shots/audit.json");
fs.mkdirSync(path.dirname(dest), { recursive: true });
fs.writeFileSync(dest, JSON.stringify(report, null, 2) + "\n");
console.log(JSON.stringify({ ...report, missing: missing.length }, null, 2));
if (errors.length || (process.argv.includes("--require-images") && missing.length)) process.exitCode = 1;
