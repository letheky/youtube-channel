# Kết quả kiểm tra bản starter — 28/10/2026

Cập nhật tài liệu 1.1: bổ sung khuôn thumbnail A → “THẬT RA…” → B, A/B Testing, mô tả tối đa 299 ký tự và thử nhịp 4–5 video dài/tuần trong 14 ngày. Đã đối chiếu điều kiện A/B và phát biểu về nhịp đăng với YouTube Help; cập nhật này không đổi mã TTS, không phải một lượt chạy A/B/đăng video thật. ZIP được đóng gói lại từ cùng bộ tài liệu.

- Đọc trực tiếp OpenAPI VSP 1.1.0, `/health` và 25 giọng `/voices`.
- Gọi thật VSP cho đoạn thử kỹ thuật 202 ký tự, 4 đoạn, giọng `vi-thai-son`.
- Xuất MP3 hậu kỳ 14,807 giây, 45 từ có mốc căn lời; kiểm mốc nằm trong thời lượng audio.
- Chạy bản `build-timeline.mjs` của quy trình nguồn trên bản sao scratch: 1 cảnh, đủ 45 từ, tạo 7 dòng SRT. Không chạy trong repo Bác Sáu.
- 10 test tự động đạt: bảo toàn lời khi chia đoạn, ánh xạ dấu câu, từ/mốc sai, HTTP lỗi không retry, cache audio không thu lại, marker timeout không gửi lại, ghép audio theo thời lượng thật, voice phụ cần ánh xạ, dry-run không tạo media và nguồn/final cũ không bị sửa.
- Giải mã đầy đủ MP3 mẫu đạt. Mẫu để nghe được chuẩn hóa âm lượng cục bộ; không sửa WAV gốc.

Giới hạn: chưa nghe bằng tai, chưa chốt giọng nhân vật. ASR `small` đọc khác một số từ, gồm vị trí “Chào”, “Khoan”, “nghen”; điều này chưa xác định lỗi nằm ở TTS hay ASR. Cần nghe mẫu trước khi dùng sản xuất. Căn ép lời đúng 45 từ không tự chứng minh audio đọc đúng từng từ.

Đây là kiểm thử một mẫu ngắn và hợp đồng dữ liệu, chưa phải QA một video dài/đa giọng hoặc bằng chứng mọi đề tài đọc tốt. Không có video đăng mới, kênh mới hay thay đổi repo Bác Sáu trong lượt này. Khóa thật không nằm trong ZIP.

Runtime kiểm thử: Python 3.12, FFmpeg hệ thống, faster-whisper 1.2.1 CPU int8, model small đã cache. Dùng FFmpeg giải mã audio đầu vào để tránh lệ thuộc tương thích PyAV của runtime. Cài mới vẫn làm theo requirements và kiểm lại mẫu trên máy sử dụng.

Cập nhật 1.2 ngày 28/10: thêm giờ sản xuất 00:00/lượt tiếp 05:30, Codex viết và sản xuất trọn quy trình, HWND Brave3999536 và nhận diện mới. Hai heartbeat ACTIVE đã đọc lại đúng chat/giờ. Venv mới cài requirements, cache small trên D; 10 test, dry-run và thử căn lời từ WAV có sẵn đều đạt, không gọi TTS mới. Không có video đăng mới; form tạo kênh chưa submit tại checkpoint này.
