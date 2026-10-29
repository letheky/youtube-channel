# Tập01 — soát trước lượt thu cảnh mở đầu

29/10/2026, tiếp checkpoint00:00 vào05:30. Không đổi lời v1 đã commit `985b03d`.

- Phạm vi: giải thích từ tài liệu chính thức, không tự nhận thử/đo thiết bị. Nguồn S1–S8 và giới hạn áp dụng đã ghi, không tải lại cùng nguồn trong lượt này.
- Phép tăng600→900=50% và min(600,20)=min(900,20)=20 đã kiểm bằng Decimal ở QA00:00. Nhãn giả định hiện suốt cảnh3; không dùng các số như kết quả đo hay thumbnail đo thử.
- Parse12cảnh/7068ký tự đạt. Cảnh1 gồm463ký tự/8đoạnVSP; dry-run riêng đạt. Lời không có chữ số kỹ thuật, không có thẻ giọng phụ.
-36neo khớp nguyên văn, đúng một lần trong cảnh tương ứng. Renderer chuyển cảnh theo mốc từ thật; không dùng timing audio mẫu kỹ thuật cho tập này. Các cue số và checklist có marker riêng.
- Character sheet4tư thế từ avatar Chú Tư và căn hộ sạch chữ được tạo bằng image_gen tích hợp. Đã xem: cùng nhận diện, đầy đủ tay/chân, router/điện thoại không nhãn hiệu, không số đo giả. Sơ đồ và chữ được dựng bằng code. Không gọiAPIảnh trả phí và không lấy tài sảnBácSáu.
- Theme, bố cục và các dạng minh họa cho12cảnh đã lập trình. Kiểm từng still trước dùng; hình AI chỉ minh họa, không phải bằng chứng kỹ thuật.

## Phạm vi lượt thu này

Chỉ thu **cảnh1** bằng `vi-thai-son`, lưu nguyên WAV/cache và căn lời cục bộ. Đây là lời thật của tập01 để dựng đoạn mở đầu duyệt chất lượng; không phải thu lại mẫu00. Chưa chọn giọng dài hạn hoặc công nhận chất lượng đọc chỉ dựa trên tên giọng/ASR.

Runtime hiện chưa có kiểm nghe bằng tai. Sau khi có MP4 mở đầu cụ thể, cần người nghe kiểm cách phát âm, dấu câu, giọng và chỗ nối. Trong thời gian chờ, tiếp các phần hình/renderer/metadata độc lập; không tự coi căn ép lời là đã nghe đạt và không thu cả tập chỉ để bỏ qua bước này. Không có lỗiTTS thì không tự gửi lại bất kỳ đoạn nào.

Phiên bản lời trước thu được nhận diện bằng SHA256 trong `assets/episodes/01-wifi/provenance.json` và QA lượt00:00. Audio cảnh1 sau thu khóa theo đúng lời v1; muốn đổi lời đã thu phải dùng phiên bản riêng, giữ nguyên cache cũ.
