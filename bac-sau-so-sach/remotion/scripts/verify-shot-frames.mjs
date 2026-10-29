// Render bằng source hiện tại, bundle mới mỗi lần; không dùng remotion/build cũ.
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { bundle } from "@remotion/bundler";
import { openBrowser, selectComposition, renderStill } from "@remotion/renderer";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "../..");
const [slug, compositionId, outputDir] = process.argv.slice(2);
if (!slug || !compositionId || !outputDir) throw new Error("Cách dùng: node scripts/verify-shot-frames.mjs <slug> <composition> <thư-mục-ảnh>");
if (!/^[\w-]+$/.test(slug)) throw new Error("Slug không hợp lệ");
const timeline = JSON.parse(fs.readFileSync(path.join(root, "videos", slug, "timeline.json"), "utf8"));
const dest = path.resolve(outputDir);
fs.mkdirSync(dest, { recursive: true });
process.chdir(path.join(root, "remotion"));
const serveUrl = await bundle({ entryPoint: path.join(root, "remotion/src/index.ts"), publicDir: path.join(root, "videos"), enableCaching: true });
const browser = await openBrowser("chrome", { logLevel: "error" });
try {
  const composition = await selectComposition({ serveUrl, id: compositionId, puppeteerInstance: browser, logLevel: "error" });
  const points = timeline.scenes.map((s) => ({ id: s.slug, frame: Math.round((s.start + s.duration / 2) * composition.fps) }));
  let seed = 1701;
  for (let i = 0; i < 5; i++) {
    seed = (Math.imul(seed, 1664525) + 1013904223) >>> 0;
    points.push({ id: `random-${i + 1}`, frame: Math.round(seed / 2 ** 32 * timeline.duration * composition.fps) });
  }
  // Kiểm tra keyword, đoạn chuyển ảnh, và outro ngoài 17 điểm bắt buộc.
  const first = timeline.scenes[0];
  if (first.shots?.length > 1) {
    const boundary = Math.round((first.start + first.shots[1].start) * composition.fps);
    points.push({ id: "crossfade-before", frame: boundary - 1 }, { id: "crossfade-middle", frame: boundary + 3 }, { id: "keyword", frame: boundary + 24 });
  }
  points.push({ id: "outro", frame: composition.durationInFrames - composition.fps * 5 });
  for (const point of points) {
    await renderStill({ serveUrl, composition, puppeteerInstance: browser, frame: point.frame, output: path.join(dest, `${point.id}.jpg`), imageFormat: "jpeg", scale: 0.5, logLevel: "error" });
    console.log(`${point.id}: frame ${point.frame}`);
  }
  fs.writeFileSync(path.join(dest, "frames.json"), JSON.stringify({ slug, compositionId, points, renderedAt: new Date().toISOString() }, null, 2));
} finally {
  // Chrome trong sandbox đôi khi không xác nhận đóng dù đã ghi đủ still.
  await Promise.race([
    browser.close({ silent: true }),
    new Promise((resolve) => setTimeout(resolve, 5000)),
  ]);
}
// Webpack có thể giữ worker cache sống sau khi đã ghi xong mọi still.
process.exit(0);
