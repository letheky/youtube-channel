import { test } from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";
import { resolveShots } from "./shot-timeline.mjs";

test("ưu tiên ảnh shot, ảnh dùng lại, rồi null; đọc lại thời gian theo words", () => {
  const root = fs.mkdtempSync(path.join(os.tmpdir(), "bac-sau-shot-test-"));
  const dir = path.join(root, "videos/example/anh/shots");
  fs.mkdirSync(dir, { recursive: true });
  const first = path.join(dir, "canh-01-01.png");
  const reused = path.join(root, "videos/example/anh/reused.png");
  fs.writeFileSync(first, "test"); fs.writeFileSync(reused, "test");
  const words = Array.from({ length: 3 }, (_, i) => ({ word: "chữ", start: i * 6, end: i * 6 + 1 }));
  const shots = [0, 1, 2].map((i) => ({ id: `canh-01-0${i + 1}`, scene: 1, from: i, to: i, image: "anh/reused.png", keyword: "Ý CHÍNH" }));
  const args = { root, slug: "example", scene: 1, words, duration: 18, shots };
  assert.deepEqual(resolveShots(args).map((s) => s.image), ["example/anh/shots/canh-01-01.png", "example/anh/reused.png", "example/anh/reused.png"]);
  fs.unlinkSync(reused);
  assert.equal(resolveShots(args)[1].image, null);
  assert.equal(resolveShots({ ...args, words: words.map((w) => ({ ...w, start: w.start * 2, end: w.end * 2 })), duration: 36 })[1].start, 12);
  assert.throws(() => resolveShots({ ...args, shots: shots.slice(0, 2) }), /phủ hết/);
  assert.throws(() => resolveShots({ ...args, shots: [{ ...shots[0], image: "../../outside.png" }, ...shots.slice(1)] }), /ngoài video/);
  fs.unlinkSync(first);
  fs.rmdirSync(dir); fs.rmdirSync(path.dirname(dir)); fs.rmdirSync(path.dirname(path.dirname(dir))); fs.rmdirSync(path.join(root, "videos")); fs.rmdirSync(root);
});
