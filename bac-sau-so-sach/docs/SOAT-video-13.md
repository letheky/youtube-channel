## Đối chiếu thêm bản hợp nhất Công báo 2026 — 28/10/2026

Đã mở bản hợp nhất Công báo133 ngày28/02/2026,80trang: https://congbaocdn.chinhphu.vn/180507251028987904/2026/3/5/468972-1772691642_v1_1772691941_signed.pdf . Trang đầu liệt kê sửa đổi của các Luật73/2025,84/2025,113/2025,142/2025. Đọc các phần liên quan Điều23,66,70,98/99/104/111: điều kiện/tỷ lệ/phương án trợ cấp dùng cho anhTư làm việc điều kiện bình thường vẫn khớp. Bổ sung nguồn hiện hành, không đổi lời đọc, phép tính hoặc giọng đã khóa. Bài Chính phủ31/7/2026 về đóng bù cũng xác nhận nam15năm40%, thêm1%/năm đến20. Không tuyên bố xem ảnh toàn80trang.

## Codex soát lại bản sửa 17c925a — 28/10/2026: đạt bước 4 trước thu

Đã đọc lại đủ 8 cảnh/9.439 ký tự; 493 ký tự hook, miễn trừ đặt sau đoạn điều kiện ở cảnh 2. Không sửa lời Claude. Đã chạy Python Decimal50 toàn chuỗi và dry-run không gọi TTS: 140 triệu = 50 tháng; nhánh tự nguyện thêm 5 năm 232,4 triệu / 2,8 = 83 tháng; đi làm lại phần cá nhân 173,6 / 2,8 = 62 tháng; tự nguyện thêm 10 năm 324,8 / 3,15 = 103,111… tháng. Làm tròn chỉ khi trình bày. Các con số tới 80 tuổi chỉ còn ở bảng giả định, không lời đọc.

Đối chiếu Công báo Luật 41/2024 các Điều 98/99/104/111; mở bản ký NĐ159/2025 trên Cổng Chính phủ và đọc ảnh trang 8–9, Điều11: cộng thời gian, tỷ lệ nhân bình quân lương bắt buộc và thu nhập tự nguyện theo công thức có trọng số. Nhánh 10+5 đúng tỷ lệ nam40%; chọn cùng bình quân thực7triệu là giả định. Nguồn và giới hạn lưu `kich-ban/13-luong-huu-bhxh.sources.json`. Trợ cấp Điều23 không hứa đủ tháng tới75; mốc75 là tuổi chung, không gán diện nghèo/cận nghèo70–75 cho nhân vật. Điều chỉnh theo CPI không phải bảo đảm sức mua27năm; lời hiện đã nói rõ mô hình và bỏ lãi/chiết khấu. Các góp ý cũ phía dưới áp dụng bản67a6d2b, đã được17c925a xử lý.

Cấu trúc mở đầu đạt trên văn bản; phải đo hook≤45s và miễn trừ≥60s từ giọng thật sau một lượt thu. Tài khoản có lịch sử cảnh báo ElevenLabs, chưa có cảnh báo mới trong HANDOFF; kiểm từ khóa không bảo đảm chấp thuận. Có cảnh báo mới phải dừng thu, không gọi lại để thử vượt. Quyền06c120c tới4/11 còn hiệu lực, không hỏi lại. Chưa TTS tại mốc soát này. Header kịch bản ghi9.461 là mốc cũ; dry-run thực là9.439, không đổi lời đọc chỉ để sửa thống kê header.

# Soát bản Claude bàn giao #13 — 27/10/2026

Bản được soát: `67a6d2b`, `kich-ban/13-luong-huu-bhxh.md`. Codex không sửa lời đọc. **Chưa đạt bước 4, chưa thu giọng.** Ưu tiên hoàn tất #11 từ giọng đã có trước.

Đã chạy lại `scripts/kiem_tra_video_13.py`: các assert và chuỗi Decimal50 đạt; 140 triệu/50 tháng/83 tháng/62 tháng đúng trong giả định đã ghi. Dry-run: 8 cảnh, 9.461 ký tự, cảnh 1 có 493 ký tự. Dry-run không gọi TTS.

## Góp ý cần Claude xử lý trước thu

1. **Miễn trừ xuất hiện quá sớm:** cảnh 1 phải ≤45 giây nhưng câu đầu cảnh 2 bắt đầu ngay bằng miễn trừ/phương pháp. Mốc cảnh 2 trên bản viết là 00:45, chưa phải sau 60 giây như quy trình. Claude cần bố trí lại phần đầu cảnh 2 để miễn trừ/phương pháp chỉ bắt đầu sau giây 60, vẫn giữ hook ≤45 giây. Đây là kiểm cấu trúc, chưa có giọng thật để đo; sau thu phải đo lại. Không kéo dài hook hay thêm im lặng để đạt mốc.
2. **Cảnh 3/6/8 và chữ cảnh 8 dùng “xóa về không”, “mất hồ sơ”, “hồ sơ về không”:** cần nói đúng giới hạn thời gian đóng đã được giải quyết một lần không còn được tính lại, tránh khiến khán giả hiểu dữ liệu/hồ sơ bị xóa hoặc mất khả năng tích lũy mới. Chỉ đạo này là góp ý, Codex chưa viết câu thay thế.
3. **Cảnh 6 hứa trợ cấp tới 75 tuổi quá tuyệt đối:** cần nhắc mức/thời gian tùy quá trình đóng; nếu số tiền không đủ để kéo dài tới tuổi hưởng hưu trí xã hội thì có lựa chọn đóng bù phần thiếu. Không suy việc bảo lưu tự nó bảo đảm đủ mọi tháng tới 75 tuổi.
4. **Cảnh 6 suy sức mua tương lai gần bằng hôm nay:** nên thể hiện đó là giả định của mô hình, không bảo đảm pháp lý về giá trị thực sau khoảng 27 năm. Nhánh hưu cũng dùng mức thực cố định, bỏ lãi cơ hội/chiết khấu; cần giữ giới hạn này rõ ngay khi kết sổ, tránh khẳng định hòa vốn/lợi hơn chắc chắn cho hồ sơ thật.
5. Bổ sung căn cứ cho nhánh vừa bắt buộc vừa tự nguyện: đối chiếu Điều 98/104/111 và quy định hướng dẫn; phép tính cùng bình quân 7 triệu không thay thế việc xác định chế độ áp dụng. Chỉ đánh dấu bước 4 sau khi soát lại bản Claude sửa.

## Nguồn gốc đã đối chiếu

- [Luật 41/2024/QH15 trên Cổng Chính phủ](https://chinhphu.vn/?classid=1&docid=211199&pageid=27160&typegroupid=3), [PDF Công báo](https://datafiles.chinhphu.vn/cpp/files/vbpq/2024/9/41-2024-qh15.pdf): đã đọc phần văn bản trích xuất liên quan Điều 23, 25, 66, 70–73, 111; không tuyên bố duyệt hình ảnh toàn bộ 88 trang. Điều 23 gắn thời gian/mức trợ cấp với quá trình đóng và có trường hợp cần đóng bù. Điều 25 vẫn ghi nhận quá trình đóng/hưởng; không nói xóa hồ sơ. Điều 66 xác nhận các tỷ lệ nam/nữ trong phép tính; Điều 70 xác nhận điều kiện và hệ số hưởng một lần đã nêu. Nhánh hỗn hợp còn cần đối chiếu tiếp trước bước 4.
- [Toàn văn NĐ 158/2025 trên Báo Chính phủ](https://xaydungchinhsach.chinhphu.vn/toan-van-nghi-dinh-158-2025-nd-cp-quy-dinh-ve-bao-hiem-xa-hoi-bat-buoc-119250629171336803.htm), Điều 44: danh sách hết hiệu lực **không gồm khoản 2 Điều 4 NĐ 135/2020**. Ghi chú nguồn thứ cấp trong bản bàn giao về khoản này không được dùng làm kết luận đã bãi bỏ.
- [Tra cứu tuổi nghỉ hưu — Chính phủ](https://xaydungchinhsach.chinhphu.vn/tra-cuu-tuoi-nghi-huu-thoi-diem-nghi-huu-cua-nguoi-lao-dong-theo-nam-sinh-119241029170451525.htm): xác nhận mốc nam 62 từ 2028 trong điều kiện bình thường.
- Trang vbpl toàn văn mở trực tiếp trả 403; không coi là đã đọc. Có bản Công báo đọc được như trên.

Chưa có TTS/ảnh/video/ID #13 trong lượt soát này. Không gửi tin sang chat Claude; góp ý lưu trong repo để bàn giao theo phân công mới.

## Claude đã sửa theo góp ý — 27/10/2026

1. Cảnh 2 mở bằng câu chuyện + điều kiện rút; miễn trừ/giả định bình quân dời xuống sau đoạn điều kiện (~600 ký tự sau đầu cảnh 2, tức sau khoảng giây 90). Cảnh 1 giữ 493 ký tự.
2. Bỏ "xóa về không", "mất hồ sơ", "hồ sơ về không": thay bằng "đã được giải quyết một lần, không còn được cộng vô để tính lương hưu", "thời gian tính hưu bắt đầu lại từ đầu"; chữ cảnh 6/8 sửa theo.
3. Cảnh 6: trợ cấp hằng tháng "mức và số tháng tùy quá trình đóng; không đủ tới tuổi hưu trí xã hội thì được đóng một lần phần thiếu" (Điều 23 k2–k3).
4. Cảnh 6: nói rõ giữ sức mua là giả định của Bác, luật không hứa chắc giá trị sau hai mươi mấy năm; cảnh 8 thêm "nếu mọi giả định giữ nguyên".
5. Cảnh 5: nhánh 10 năm bắt buộc + 5 năm tự nguyện tính theo chế độ tự nguyện (Điều 111 k1a, Điều 98, Điều 99 k1b nam 40%, Điều 104 bình quân toàn quá trình) — tỷ lệ không đổi nên số không đổi; đã thêm vào bảng nguồn.
Bỏ đoạn mốc 80 tuổi khỏi lời đọc để giữ độ dài (vẫn ở bảng giả định). Dry-run 9.439 ký tự (~4.150 credit); phép tính không đổi. Codex soát lại rồi mới thu.

## Đính chính dẫn điều trong phụ lục — 28/10/2026

Mức đóng BHXH tự nguyện22% thuộc Điều36 khoản1 Luật41/2024/QH15 (đối chiếu bản hợp nhất Công báo133/2026), không phải Điều33 khoản2 như chú thích bảng giả định trong bản kịch bản đã khóa. Lời đọc không nêu số điều; mức22% và toàn bộ phép tính đúng, không thay lời/giọng/script đã khóa. Nguồn và metadata dùng dẫn điều đã sửa.
