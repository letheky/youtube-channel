import { test } from "node:test";
import assert from "node:assert/strict";
import { splitWords, mergeShots } from "./build-shots.mjs";

test("chia liên tục, phủ hết lời đọc và giữ nhịp 4–8 giây", () => {
  const words = Array.from({ length: 120 }, (_, i) => ({ word: i % 15 === 14 ? "câu." : "chữ", start: i * 0.4, end: i * 0.4 + 0.3 }));
  const ranges = splitWords(words, 48);
  assert.deepEqual(ranges, splitWords(words, 48));
  let next = 0;
  for (const r of ranges) {
    assert.equal(r.from, next);
    const d = (words[r.to + 1]?.start ?? 48) - words[r.from].start;
    assert.ok(d >= 4 && d <= 8);
    next = r.to + 1;
  }
  assert.equal(next, words.length);
});
test("giữ prompt/keyword/ref, từ chối ghép metadata vào ranh giới khác", () => {
  const fresh = [{ id: "canh-04-01", scene: 4, from: 0, to: 12, text: "Nội dung", prompt: "", keyword: "", ref: false }];
  const edited = [{ ...fresh[0], prompt: "Cảnh đã viết", keyword: "GIÁ VỐN", ref: true }];
  assert.deepEqual(mergeShots(fresh, edited), edited);
  assert.throws(() => mergeShots([{ ...fresh[0], to: 13 }], edited), /Không ghi đè/);
  assert.throws(() => mergeShots([], edited), /Không ghi đè/);
});
