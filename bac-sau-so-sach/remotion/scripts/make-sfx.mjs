// Tạo hiệu ứng âm thanh đơn giản bằng ffmpeg (tổng hợp, không cần file bản quyền) vào videos/_sfx/
//   node scripts/make-sfx.mjs
import fs from "node:fs";
import path from "node:path";
import { execFileSync } from "node:child_process";
import { fileURLToPath } from "node:url";

const OUT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..", "..", "videos", "_sfx");
fs.mkdirSync(OUT, { recursive: true });

const SFX = {
  // tiếng "pop" khi thẻ bật ra: sin quét xuống, tắt nhanh
  pop: { d: 0.12, expr: "0.6*sin(2*PI*(900-5000*t)*t)*exp(-38*t)" },
  // tiếng xu: hai nốt cao ngân
  ding: { d: 0.45, expr: "0.35*(sin(2*PI*1568*t)+0.6*sin(2*PI*2349*t))*exp(-9*t)" },
  // tiếng vút khi chuyển cảnh: nhiễu trắng to dần rồi nhỏ
  whoosh: { d: 0.32, expr: "0.25*(random(0)*2-1)*sin(PI*t/0.32)", filter: "highpass=f=600,lowpass=f=5000" },
  // tiếng đập con dấu
  thud: { d: 0.35, expr: "0.9*sin(2*PI*(95-120*t)*t)*exp(-14*t)+0.2*(random(0)*2-1)*exp(-40*t)" },
  // tiếng "tách" ngắn khi trừ tiền
  tick: { d: 0.06, expr: "0.5*sin(2*PI*2200*t)*exp(-90*t)" },
};

for (const [name, s] of Object.entries(SFX)) {
  const af = [`aevalsrc='${s.expr}':s=44100:d=${s.d}`];
  const args = ["-y", "-loglevel", "error", "-f", "lavfi", "-i", af[0]];
  if (s.filter) args.push("-af", s.filter);
  args.push(path.join(OUT, `${name}.wav`));
  execFileSync("ffmpeg", args);
}
console.log(`Đã tạo ${Object.keys(SFX).length} hiệu ứng trong ${OUT}`);
