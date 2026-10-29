// Preload chỉ khi dùng FFmpeg 9 thay bộ FFmpeg đi kèm Remotion 4.
// NODE_OPTIONS=--require=<absolute-path>/ffmpeg9-compat.cjs
// Kèm --binaries-directory=<thư mục FFmpeg hệ thống + remotion.exe> khi render.
// Giữ nguyên file filter và ý nghĩa filter, chỉ đổi cách truyền đường dẫn.
// Cú pháp chính thức: https://ffmpeg.org/ffmpeg.html#Options (mục -/filter).
const path = require('node:path');
const modulePath = path.join(path.dirname(require.resolve('@remotion/renderer')), 'call-ffmpeg.js');
const calls = require(modulePath);
// Bản FFmpeg hệ thống có encoder AAC gốc, không có libfdk_aac của bộ Remotion.
const replace = (arg) => arg === '-filter_script:a' ? '-/filter:a' : arg === '-filter_complex_script' ? '-/filter_complex' : arg === 'libfdk_aac' ? 'aac' : arg;
for (const key of ['callFf', 'callFfNative']) {
  const original = calls[key];
  if (typeof original !== 'function') throw new Error('Remotion đã đổi API gọi FFmpeg; cần kiểm tra lại adapter');
  calls[key] = (options) => original({ ...options, args: options.bin === 'ffmpeg' ? options.args.map(replace) : options.args });
}
