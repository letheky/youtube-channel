# Intro / outro — trạng thái thực tế

## Bổ sung 29/10/2026: nhạc hiệu gốc v1

- `assets/motion/intro-original-audio-v1.mp4`:3,2 giây.
- `assets/motion/outro-original-audio-v1.mp4`:12 giây.
- Audio stereo48kHz/AAC, hình H.2641080p/30fps sao từ master không âm thanh; không dựng đè master.
- Giai điệu tổng hợp bằng code, âm chuông mềm/âm nền quanh nốtD, không dùng sample bên thứ ba và không dùng ứng viên YouTube Audio Library. Mã tại `scripts/build_brand_audio.py`; WAV gốc trong `assets/audio/`, hash và nốt nhạc tại `config/brand-audio-v1.json`.
- Đã decode toàn bộ, kiểm thời lượng/stream/hình. Âm lượng AAC đo thực tế: intro−20,01LUFS/−10,45dBTP; outro−20,00LUFS/−9,89dBTP. Các trường `input_*` trong phép đo cuối là số đo file thành phẩm; `output_*` là kết quả giả định của bộ đo loudnorm, không phải số đo file gốc.
- **Chưa nghe QA, chưa duyệt phát hành.** Không tự nhận nhạc hiệu này là Cutscene Crush, không xóa trạng thái chặn tải nhạc bên dưới.

## Master hình và nhạc thư viện từ lượt trước

Đã dựng master hình H.264,1920×1080,30fps, không âm thanh:

- `assets/motion/intro-3s-master-silent.mp4`:3,2 giây; nhận diện Việt–Anh, zoom nhẹ và fade vào/ra. Đặt **sau** đoạn nhá nội dung/câu hỏi theo từng tập.
- `assets/motion/outro-12s-master-silent.mp4`:12 giây; tên Việt–Anh, vùng đăng ký bên trái,2 ô16:9 cho video đề xuất. Các ô mới là vùng chừa bố cục, chưa phải liên kết tương tác; gắn end screen thật trong Studio khi đã có video liên quan.

Đã giải mã toàn file không lỗi và kiểm frame giữa; sửa font tiếng Việt/bố cục trước bàn giao. Chưa coi là bản có nhạc hoàn chỉnh, chưa QA nghe.

`scripts/render_brand_clips.py` tái dựng master trên Windows có FFmpeg và fonts Arial. `--outro-only` chỉ dựng lại outro khi chỉnh bố cục.

Nhạc ứng viên `Cutscene Crush — Blue Deer Studio` đã kiểm popup giấy phép trong Audio Library: dùng trong video kể cả kiếm tiền, không bắt buộc ghi công. Đã lưu ảnh bằng chứng và metadata tại `config/music-selection.json`. Hai ứng viên khác mới xét theo thông tin thể loại/tâm trạng, chưa nghe hoặc chọn cuối.

**Lượt tải MP3 tự động bị chặn bởi chính sách an toàn trang của trình duyệt đối với máy chủ googlevideo.** Không có quyền tải được cấp và không có Auto-review; không thử URL khác/shell/browser khác để lấy cùng file. Đã nhờ chủ kênh tải thủ công và cung cấp đường dẫn. Khi có file do người dùng lấy, kiểm tên/hash/thời lượng, chọn đoạn, trộn/fade/đo âm lượng rồi QA nghe trước dùng. Không gửi nhạc thô trong ZIP nhận diện chia sẻ.
