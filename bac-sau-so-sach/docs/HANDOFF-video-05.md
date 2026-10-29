# Video #5 — Quán cà phê, vốn và mặt bằng

## Kết quả cuối lượt 21/10/2026

### C — Thành phẩm #5 đã hẹn, xác nhận ngày 21/10/2026
- Dài: `videos/05-quan-ca-phe-mat-bang/05-quan-ca-phe-mat-bang.mp4`, **16:01,0**, 1920×1080/30fps, **-16.32 LUFS/-1.95 dBTP**; chỉ lặng cuối outro. SHA256 `2690cb28a21747597a552ee661f875ee8bf35f290c80cf5c54d7aa462abb6a83`.
- Short: `videos/05-quan-ca-phe-mat-bang/short/short-05.mp4`, **47.1 giây**, **-14.50 LUFS/-2.19 dBTP**, không khoảng lặng dài; thumbnail 1280×720.
- Đã xem toàn bộ 156 ảnh video, bảng nhân vật cô Bảy, 19 still chuẩn và 28 khung overlay/keyword/CTA; duyệt **46 khung MP4 dài + 8 khung Short**. Audit 155 shot thiếu/lỗi 0, cue đủ, Python/Node/typecheck đạt, 42 hash nguồn không đổi. ASR đủ 10 cảnh; runtime không nghe trực tiếp bằng tai.
- Dài **`YbNXzIIGxUE`**, https://youtu.be/YbNXzIIGxUE — **22/10/2026 18:00 VN**. Short **`wxjLe0SNtlo`**, https://youtube.com/shorts/wxjLe0SNtlo — **23/10/2026 11:30 VN**. API xác nhận đúng kênh, private/publishAt, xử lý succeeded, thumbnail và SRT vi có. Màn hình kết thúc #4 + Đăng ký đã lưu và mở lại kiểm tra.
- Related Short #5: **chờ YouTube duyệt video xác minh (in review), chưa gắn**. Short #4 vẫn chờ xác minh theo lần kiểm đầu lượt, không gửi lại xác minh.
- Credit còn **96.422/131.000** sau đúng một lượt thu #5 (5.232), không thu lại cảnh/video cũ. Không thay số hoặc lời đọc sau khóa. Trục vốn/thu hồi/hợp đồng đúng brief; nguồn kiểm ngày 21/10 trong kịch bản và mô tả.
- Thành phẩm ở repo; helper/QA runtime D tại `D:/CodexTemp/bac-sau-video05`. Dọn hai bundle lỗi trên C bị tự động xét duyệt chặn `blocked by policy`, vẫn còn nguyên; không thử xóa lại. Chi tiết `docs/HANDOFF-video-05.md`. Lượt tiếp theo #6 cho 23/10 18:00, kiểm lại nguồn và phạm vi quyền trước thu/tải.

## Nhật ký sản xuất 21/10/2026
- Mục tiêu: dài **22/10 18:00**, Short **23/10 11:30** giờ Việt Nam; chưa tải, chưa có ID. Hạn render/QA 22/10 15:00.
- Đọc brief đã duyệt `docs/BRIEF-video-05.md`; giữ #5, #6 nghỉ hưu để sau. Trục vốn trước khai trương, dòng tiền theo tháng, hoàn vốn so với hạn thuê; không lặp chuỗi chi phí từng ly của #1.
- Soát nguồn ngày 21/10: NĐ 68/2026 đã sửa bởi NĐ 141/2026 (ngưỡng 1 tỷ), NĐ 293/2025 (vùng I 25.500đ/giờ), BLDS 91/2015 (chấm dứt, thời hạn, cho thuê lại, cải tạo và trả tài sản). Bản gốc đã đối chiếu; link trong kịch bản và metadata. Menu một quán và tin thuê đã hết hạn chỉ tham khảo bối cảnh; mọi giá vận hành/hợp đồng đều là giả định riêng.
- Checklist bước 4 đạt: Python Decimal và kiểm mọi số từng cảnh; 10 cảnh, **11.892 ký tự**; không chữ số/%/tên hãng trong lời đọc, không điểm chưa kiểm dùng như sự thật. Commit trước thu **`0c675e4`**.
- Thu một lần đủ 10 cảnh, không thu lại. Lời đọc **đã khóa**. Hậu kỳ 0,9 và nghỉ đoạn 0,7 giây. Bảo vệ 42 file kịch bản/giọng bằng SHA256 ở thư mục chat `work/video-05-source-hashes.json`.
- Credit sau thu: dùng **34.578/131.000**, còn **96.422**; lần này **5.232**. Không thu lại #1–#4.
- ASR cục bộ đủ 10 cảnh đã đối chiếu các số chính và câu chốt, không cần thu lại. Runtime không nghe trực tiếp được, ASR không phải kiểm nghe bằng tai. Báo cáo ở `D:/CodexTemp/bac-sau-video05/outputs/video-05-qa/asr-canh-*.json`.
- Bảng cô Bảy `assets/nhan-vat/co-bay.png`: nữ 48 tuổi, bob nâu gợn ngắn, áo sage, tạp dề eo vàng đất buộc phía sau, quần nâu; sổ tím. Ảnh image_gen tích hợp, không API ảnh trả phí.
- **155 shot**, 145 prompt riêng + 10 ảnh cảnh, 73 shot có Bác Sáu; keyword xen kẽ, refs đúng nhân vật. Commit **`5626d55`**. Đủ bộ ảnh, đã duyệt toàn bộ qua 26 contact sheet. Bút thừa ảnh mở đầu đã sửa; đang sửa mô hình quán bị thành chùa và hai ảnh có người thừa bằng image_gen trước render cuối. Audit 155 shot thiếu/lỗi 0; rút 15 keyword dài xuống 2–5 chữ.
- Overlay có 19 nhóm, tất cả cue tìm thấy đúng thứ tự. `Video-05`, `Thumbnail-05`, `Short-05`; typecheck, 3 test shot/timeline và 3 Python test đạt. Commit **`30f7973`**.
- Short cắt 6 đoạn giọng có sẵn, **47,0 giây**, 128 chữ; không TTS riêng. Nhấn hạn thuê 24 tháng so với tháng 32 thu 300 triệu, ghi rõ điều kiện thuê tiếp cùng giá.
- Short MP4 cuối **47,1 giây, −14,50 LUFS, −2,19 dBTP**, không khoảng lặng dài; đã xem 8 khung mã hóa thực và thumbnail 1280×720. Preview dài 60 giây đạt **−16,14 LUFS, −2,26 dBTP**. Nguồn khóa 42 file không đổi.
- Ổ C gần đầy do bundle tạm copy cả video cũ; chuyển publicDir riêng #5, bundle/render/QA sang `D:/CodexTemp/bac-sau-video05`. Hai bundle C tạm chưa xóa: tự động xét duyệt chặn lệnh xóa với lý do `blocked by policy`; không thử xóa lại. Thành phẩm vẫn lưu trong repo.
- Metadata đã chuẩn bị, chương theo timeline thật, mô tả 3.154 ký tự. Chưa đánh dấu QA/render/tải đạt trước khi có bằng chứng.
- Kênh/API đã đối chiếu đầu lượt, không tải trùng. Short #4 vẫn “Video verification in review”; không gửi lại xác minh. Khi được duyệt mới gắn `_6azWKH61L8` → `F6tGyhhf1Fs`.

## Mô hình đã khóa

Ảnh đều tạo/sửa bằng **image_gen tích hợp**. File đã chọn ở `videos/05-quan-ca-phe-mat-bang/anh/`, bảng nhân vật ở `assets/nhan-vat/co-bay.png`. Bộ prompt và tham chiếu cuối ở `kich-ban/05-quan-ca-phe-mat-bang.images.json`, `.shots.json`, cùng `.edits.json` ghi rõ các sửa lỗi sau QA và nguồn ảnh sinh. Giữ bản gốc trong `.codex/generated_images`; không dùng API ảnh trả phí.

- Chuẩn bị **420 triệu** = vốn làm quán **300** (cải tạo 180 + máy 80 + bàn ghế 40) + cọc **60** + dự phòng **60**; không thuê trả trước, không vay.
- 30 ghế × 3 lượt × 35.000đ × 26 ngày = **81,9 triệu/tháng**; biến đổi 30% = 24,57; thuê20; cố định khác26 (gồm công chủ8) → **11,33 triệu/tháng**. Không trừ khấu hao lần hai trong dòng tiền.
- Hai tháng đầu doanh thu50%, âm **17,335 triệu/tháng**; dự phòng còn **25,33 triệu**. Tích lũy tháng12 **78,63**, tháng24 **214,59**, còn thiếu **85,41** của vốn300. Bỏ giai đoạn đầu ra tháng27; tính đủ mới **tháng32**, chỉ nếu được thuê tiếp và giữ giả định, vượt hạn thuê chắc chắn24.
- Thuê25 → dư6,33; có đầu kỳ yếu → tháng57. Tăng5% từ năm hai là phương án riêng: thuê21, dư10,33, tích lũy24 tháng202,59. Hai lượt/ghế → âm7,78.
- Thuê/doanh thu **24,42%**, không là ngưỡng khuyến nghị. Doanh thu năm đầu900,9; ổn định12 tháng982,8 triệu, duy nhất hoạt động này: giả định đủ điều kiện không chịu GTGT/không nộp TNCN; không miễn mọi nghĩa vụ.
- Dừng sau12 tháng là phương án hai bên đồng ý thanh lý, hoàn đủ cọc60, bán đồ80, dọn10, cải tạo thu0, không phạt/nợ/thuế khác, không tiền sang thêm. Tiền về **268,63 triệu** = dự phòng đầu60 + dòng tiền đã gồm lỗ78,63 + cọc60 + bán80 − dọn10; thiếu **151,37** so với420. Không dùng dự phòng đã trừ lỗ rồi trừ lỗ thêm lần nữa.
- Mô phỏng giữ giá/chính sách ngày soát; không dự báo tương lai, lãi cơ hội, lạm phát hoặc thay máy lớn. Không khuyên mở quán cụ thể; không nói chủ nhà được tùy ý lấy lại.

## Checklist sản xuất đã hoàn tất (nhật ký)
1. Đủ ảnh, xem từng ảnh qua contact sheet và phóng riêng lỗi; audit/timeline không thiếu ảnh, giữ nguồn giọng.
2. Duyệt Short/thumbnail và still mọi cảnh, bảng hoàn chỉnh, keyword thực hiện, quote/CTA/outro. Render thử60 giây rồi bản cuối.
3. Loudnorm hai lượt, đo lại AAC/MP4 (dài −16±0,5LUFS, Short−14±0,5, peak≤−1,5dBTP), silence và ≥20 khung bản dài thực mã hóa, ≥8 khung Short. Ghi rõ giới hạn nghe trực tiếp.
4. Chỉ khi QA đạt mới upload bằng `--lich`, token có sẵn; cần OAuth/đăng nhập thì dừng. Đọc API private/publishAt/processing, thumbnail/SRT, lưu commit youtube.json. Đặt end screen mới và Related Short nếu tính năng đã duyệt.

Bằng chứng cuối: `D:/CodexTemp/bac-sau-video05/outputs/video-05-qa/{full-check.json,short-check.json,final-visual-check.json,youtube-studio-check.json}`, API `outputs/video-05-youtube-check.json`. Mục còn chờ chỉ là Related video khi YouTube cấp tính năng.

## Việc còn chờ và lượt kế tiếp

- Khi YouTube duyệt tính năng: tiếp tục gắn Related **Short #5 `wxjLe0SNtlo` → dài #5 `YbNXzIIGxUE`**, lưu và mở lại xác nhận. Đây là phần còn lại của quy trình video mới #5 đã được giao. Short #4 vẫn cần `_6azWKH61L8` → `F6tGyhhf1Fs`. Cả hai đã kiểm chiều 21/10 vẫn “Video verification in review”; không gửi lại xác minh, không đăng sớm để vượt chặn.
- End screen #5 đã chọn #4 + Đăng ký, cả hai từ **15:51:00 tới 16:01:00** trong outro. Studio cảnh báo #4 đang private; lịch #4 công khai 21/10 18:00, trước #5 một ngày. Không đổi lịch #4.
- Nhãn AI của cả hai bản đã thấy **Yes** trong Studio. API đọc lại lượt này không trả trường `containsSyntheticMedia`, nên không dùng sự thiếu trường đó để kết luận nhãn sai; ảnh chụp UI và kết quả trong `qa.json` ghi nguồn xác nhận.
- Đã lưu `videos/05-quan-ca-phe-mat-bang/{youtube.json,qa.json}` để giữ ID, giờ hẹn, đo âm thanh, hash, API và hạn chế nghe trực tiếp cùng repo. YouTube làm tròn hiển thị 16:02/0:48, file local đo 961,0/47,1 giây.
- Lượt 22/10 làm #6 cho 23/10 18:00 và Short ngày sau theo lịch hằng ngày đang có. Đọc lại trạng thái/API trước khi làm; nguồn lãi suất/CPI cần kiểm đúng ngày, quyền thu/tải không tự gia hạn qua 23/10. Không tạo lịch trùng.

**Cập nhật23/10:** Chủ dự án đã tự gắn Related Short `wxjLe0SNtlo` → dài `YbNXzIIGxUE`; mở mới Studio trong đúng cửa sổBácSáu xác nhận đúng tiêu đề. Agent chỉ đọc,lưu trạng thái vào youtube.json,không sửa remote video. Bằng chứng `D:/CodexTemp/bac-sau-video07/outputs/short5-confirmed23.txt`. Các đoạn chờ xác minh/quyền phía trên là nhật ký trước mốc này.
