# Renderer Chú Tư — prototype v0.1.0

Theme xanh chàm/kem/hổ phách, nhận diện Chú Tư riêng. Composition hiện tại `ChuTu-TechnicalPreview` chỉ kiểm pipeline15giây, không phải tập01 hoặc template video dài hoàn thiện.

Lượt05:30 đã thêm `ChuTu-Wifi-Design` (still12bố cục), `ChuTu-Wifi-Video` (dữ liệu audio/cue thật) và `ChuTu-Wifi-Thumbnail` (A/B). Nhân vật4tư thế và căn hộ sạch chữ nằm ở `assets/episodes/01-wifi`, prompt/hash đi kèm. `scripts/build_wifi_render.py --scenes 1` chỉ đọc audioVSP đã có, kiểm lời và mốc từ rồi build props vào `out/wifi-review-scenes-1.json`; không gọi TTS. Chạy từ gốc repo. Với video:

```powershell
npx.cmd remotion render src/index.tsx ChuTu-Wifi-Video out/ten-ban-duyet-moi.mp4 --props=out/wifi-review-scenes-1.json --codec=h264 --concurrency=2 --log=error
```

Giữ `review=true` tới khi QA thật xong. Không dùng mặc định `scenes=[]` để tạo video rỗng, không lấy thời gian still/design làm timeline tập thật. Đầu ra bản mới dùng tên riêng, giữ nguyên WAV/audio gốc và mọi cache. Bố cục đủ12cảnh không đồng nghĩa cả12cảnh đã thu/render/QA.

Từ thư mục gốc repo, chạy Python venv `scripts/prepare_render_preview.py` để stage avatar và audio mẫu **đã có** vào `remotion/public` (ignored). Script chỉ đọc JSON từ thực, nhóm phụ đề và chép media; không gọi VSP. Sau đó trong thư mục `remotion`:

```powershell
npm.cmd ci --no-audit --no-fund
npm.cmd run typecheck
npx.cmd remotion still src/index.tsx ChuTu-TechnicalPreview out/preview-frame-90.png --frame=90
npx.cmd remotion render src/index.tsx ChuTu-TechnicalPreview out/chu-tu-technical-preview-v1.mp4 --codec=h264 --concurrency=2
```

Remotion tải Chrome Headless Shell vào cache riêng để dựng, không dùng phiên Brave của chủ kênh. Media/public/out không đưa lên Git. `preview.json` lưu mốc phụ đề theo audio mẫu14,807giây, không dùng nó để dự đoán timing tập dài.

Trước video thật còn cần nhân vật nhiều tư thế, cảnh minh họa, composition theo từng ý, cue chính xác từ audio, đầu/cuối, thumbnail/Short và QA hình/âm thanh đầy đủ. Đo LUFS/true peak và giải mã không thay nghe.
