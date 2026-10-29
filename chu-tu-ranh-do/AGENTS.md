# Chú Tư Rành Đồ — vận hành kênh mới

- Dự án thực thi: `D:/Repo/chu-tu-ranh-do`; không chỉnh repo/automation/video Bác Sáu.
- Đọc `HANDOFF.md`, `docs/QUY-TRINH.md`, `docs/LICH-VAN-HANH.md`, `docs/BRAVE.md`, `config/channel-binding.json` trước mỗi lượt.
- Chủ kênh chốt sản xuất 00:00, chỉ tiếp việc dở 05:30; mọi giờ Asia/Saigon. Giờ đăng do Codex nghiên cứu/thử riêng, không đồng nhất với giờ sản xuất.
- 4–5 video dài/tuần trong vòng thử 2 tuần; cơ sở 4. Mô tả video/Short tối đa299 ký tự gồm URL/khoảng trắng.
- Thumbnail ưu tiên sốA → “THẬT RA…” → sốB đã kiểm, nhân vật biểu cảm và đồ vật cụ thể; 2–3 biến thể A/B khi đủ điều kiện.
- Chủ kênh chốt28/10: Codex viết kịch bản và sản xuất trọn quy trình cho kênh mới. Tự nghiên cứu nguồn, tính toán, viết/soát/commit trước VSP; phân công này không áp cho Bác Sáu.
- Chỉ VSP TTS, khóa trong `.env` cục bộ đã ignore; không gọi ElevenLabs/API ảnh trả phí. Thu lời đã qua kiểm, không ghi đè audio gốc; hậu kỳ/căn lời lỗi thì dùng cache, không tự gửi TTS lại.
- Ảnh dùng image_gen tích hợp; bảng nhân vật/ảnh Chú Tư riêng. Không dùng ảnh Bác Sáu làm nhận diện.
- Brave mới HWND3999536 chỉ là gợi ý. Kiểm đúng Channel ID từ binding trước mọi thao tác ghi. Channel ID null thì chưa được upload; không dùng66974/592278.
- Tập01 đã có đủ12cảnh/audio/MP4 dài/Short và QA kỹ thuật/khung hình. Chủ kênh đã nghe toàn bản dài/Short ngày29/10 và trả lời “Đã nghe cả hai, không thấy lỗi”; xem config/episodes/01-wifi-listening-approval.json. Không hỏi lại/thu lại cảnh1–12. Tiếp xuất release bỏ nhãn BẢN DUYỆT bằng cùng lời/audio/timeline đã duyệt, QA file cuối rồi mới upload đúng kênh.
- Ghi checkpoint công việc/tiến trình đang chạy; không khởi động lượt ghi cùng asset nếu worker khác còn hoạt động. Không gọi render/TTS/upload lặp để “chắc ăn”.
- Không công khai sớm, không đổi lịch video đã hẹn mà không có lý do và quyền, không sao chép OAuth/token kênh cũ. Tự theo dõi/đăng chỉ cho kênh mới sau xác nhận danh tính và trong khả năng/công cụ được phép.
- Nếu công cụ bắt buộc xác nhận ở bước tạo tài khoản hoặc xuất bản UI, chuẩn bị đủ các trường/tài sản rồi để chủ kênh xác nhận đúng bước đó. Không tự bấm qua đăng nhập, CAPTCHA, OTP hoặc xác minh.
- Full QA trước tải: cue/shot, preview, khungMP4, decode, âm lượng và nghe. ASR/căn ép không thay nghe thực tế; ghi đúng giới hạn runtime.
- Không commit bí mật hoặc media/cache nặng; không push khi chưa được giao. Lưu ảnh branding ở kho media/các đầu ra và ghi provenance.
