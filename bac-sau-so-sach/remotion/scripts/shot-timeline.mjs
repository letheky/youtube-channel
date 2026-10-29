import fs from "node:fs";
import path from "node:path";

/** Từ chỉ số chữ (inclusive) sang giây cục bộ; từ chối mất chữ/trùng ảnh do dữ liệu sai. */
export function resolveShots({ root, slug, scene, words, duration, shots }) {
  const items = shots.filter((s) => s.scene === scene);
  if (!items.length) throw new Error(`Cảnh ${scene} không có shot trong ${slug}.shots.json`);
  const ids = new Set();
  let next = 0;
  return items.map((s, i) => {
    if (!/^[\w-]+$/.test(s.id) || ids.has(s.id) || !Number.isInteger(s.from) || !Number.isInteger(s.to) || s.from !== next || s.to < s.from || s.to >= words.length) {
      throw new Error(`Shot ${s.id}: id hoặc ranh giới chữ không hợp lệ`);
    }
    ids.add(s.id); next = s.to + 1;
    if (i === items.length - 1 && next !== words.length) throw new Error(`Shot ${s.id}: chưa phủ hết words`);
    const chooseImage = (relative) => {
      if (!relative) return null;
      const candidate = path.resolve(root, "videos", slug, relative);
      const base = path.resolve(root, "videos", slug) + path.sep;
      if (!candidate.startsWith(base)) throw new Error(`Đường dẫn ảnh ngoài video: ${relative}`);
      return fs.existsSync(candidate) ? `${slug}/${relative.replaceAll("\\", "/")}` : null;
    };
    const fallback = chooseImage(s.image);
    return {
      id: s.id,
      start: i === 0 ? 0 : words[s.from].start,
      end: words[s.to + 1]?.start ?? duration,
      image: chooseImage(`anh/shots/${s.id}.png`) ?? fallback,
      keyword: s.keyword ?? "",
    };
  });
}
