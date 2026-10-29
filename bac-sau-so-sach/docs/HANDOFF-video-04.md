# Bàn giao video #4 — Tài xế công nghệ

Trạng thái chiều **20/10/2026**: bản dài, Short và thumbnail đã xuất, kiểm tra thành phẩm xong, đã tải và **đọc lại API xác nhận lịch**. Dài **21/10 18:00**, Short **22/10 11:30 giờ VN**. Còn duy nhất liên kết video có liên quan của Short: **21:08 ngày 20/10, Studio báo “Video verification in review”**; đã nhận video xác minh, đang chờ YouTube duyệt (hộp thoại ghi thường 24 giờ). Chưa gắn được, không yêu cầu gửi lại xác minh.

## YouTube và việc còn lại

**Cập nhật 21:08 ngày 20/10/2026 VN:** đã tải mới trang Short `_6azWKH61L8`, bấm Related video và thấy **“Video verification in review”**. Đây là trạng thái mới thay cho hộp yêu cầu ban đầu bên dưới. Chờ YouTube duyệt rồi liên kết tới `F6tGyhhf1Fs`; không gửi lại video xác minh. Bằng chứng `outputs/video-04-qa/studio-verification-in-review.jpg` trong thư mục chat. Không thay đổi lịch/video trong lần kiểm tra này.

- Dài: https://youtu.be/F6tGyhhf1Fs — ID `F6tGyhhf1Fs`, `private`, `publishAt=2026-10-21T11:00:00Z`; `uploadStatus=processed`, `processingStatus=succeeded`. Đã đặt thumbnail và tải phụ đề `vi`.
- Short: https://youtube.com/shorts/_6azWKH61L8 — ID `_6azWKH61L8`, `private`, `publishAt=2026-10-22T04:30:00Z`; xử lý `succeeded`. File gốc 45,2 giây, giao diện YouTube làm tròn lên 0:46.
- Đã dùng token hiện có và phiên kênh đã đăng nhập sẵn trong trình duyệt; không đăng nhập mới, không cấp OAuth, không công khai ngay. Metadata lưu `videos/04-tai-xe-cong-nghe/youtube.json`, tránh tải trùng.
- Studio đã lưu và mở lại xác nhận màn hình kết thúc **16:43:24–16:53:24**, gồm video #3 `oLlfPaqnK5U` + Đăng ký. Video #3 đang riêng tư theo lịch tới 20/10 18:00; sẽ công khai trước #4 một ngày. Không sửa video #1–#3.
- **Điều kiện dừng của liên kết Short:** bấm Related video trên Short #4 hiện hộp **“One-time verification needed”**, yêu cầu xác minh để mở tính năng nâng cao. Đã hủy, không đổi cài đặt kênh/không tự xác minh. Chủ kênh cần hoàn tất xác minh, rồi đặt Related video của `_6azWKH61L8` trỏ tới `F6tGyhhf1Fs`. Hai lịch đăng không bị ảnh hưởng.
- Bằng chứng trong thư mục chat: `outputs/video-04-youtube-check.json`, `outputs/video-04-qa/studio-end-screen.jpg`, `studio-related-verification.jpg`. Bước 10 đã xong tải/hẹn giờ; mục Related video còn chặn xác minh, không đánh dấu hoàn tất mục này.

## Nội dung và nguồn

- Kịch bản khóa `kich-ban/04-tai-xe-cong-nghe.md`, 10 cảnh, 11.947 ký tự. Commit trước thu `9af899c`; không sửa lời đọc sau thu.
- Kiểm sáng 20/10: kỳ Bộ Công Thương 15/10, E10 RON95 27.029đ/lít → dùng 27.000đ. Chưa thấy kỳ mới lúc kiểm. Link và ngày trong kịch bản / `dang-tai.md`.
- Mẫu báo chí 26 cuốc bike/car, nhóm hai bánh khoảng 62% chỉ tham khảo; không đại diện toàn nghề. Bỏ HIDS 8,7 triệu vì chưa rõ định nghĩa thu nhập.
- NĐ 293/2025: vùng I 25.500đ/giờ cho hợp đồng lao động, chỉ làm mốc so sánh. BHXH phải xét quan hệ thực tế, không kết luận chỉ từ nhãn đối tác.
- Giả định riêng anh Tư: 22 × 30.000 = 660.000đ; tài xế nhận 409.200 → làm tròn 410.000; khấu trừ 250.000, xăng 108.000, xe 37.000, lặt vặt 30.000 → 235.000đ/ngày. 26 ngày → 6,11 triệu/tháng; 12 tiếng gồm giờ chờ → 19.583 ≈ 19.600đ/giờ. Chưa trừ sinh hoạt, lãi vay, BHXH tự nguyện. Không trừ quỹ bỏ hũ lần hai.
- Python kiểm `scripts/kiem_tra_video_04.py` đạt. Chuỗi tháng đồng bộ theo số làm tròn ngày: 17,16 − 6,50 − 2,808 − 0,962 − 0,780 = 6,11 triệu.

## Giọng và hình

- Thu một lần đủ 10 cảnh, không thu lại: giọng hậu kỳ tổng 997,734 giây. Credit sau thu còn 101.654/131.000, tốn 5.258. Không thu lại #1–#3.
- Đối chiếu ASR cục bộ đủ 10 cảnh, số chính và câu chốt phù hợp; runtime không nghe trực tiếp. ASR không thay cho nhận xét nghe bằng tai. 42 hash nguồn bảo vệ tại thư mục chat `work/video-04-source-hashes.json`.
- 164 shot, 154 ảnh shot riêng + 10 ảnh cảnh, 82 shot có Bác, 80 keyword; 4,711–7,933 giây/shot. Đã xem mọi ảnh; audit thiếu 0/lỗi 0, giải mã 166 tài nguyên. Ảnh dùng image_gen tích hợp, không API trả phí.
- Anh Tư: `assets/nhan-vat/anh-tu.png`; prompt cảnh/shot trong `kich-ban/*.images.json`, `*.shots.json`; lịch sử sửa ở `04-tai-xe-cong-nghe.image-corrections.json`. Bản ảnh loại lưu riêng ngoài repo trong thư mục chat `work/video04-rejected`.
- Đã sửa các lỗi chữ nhỏ/tiền/nhãn xe, chạm mặt sau điện thoại, dây mũ rời và nhân vật thừa. Đặc biệt 09-10 chỉ vật thể, 08-08 chỉ Bác + mô hình tài xế.
- VideoSpec `tai-xe-cong-nghe.video.ts`, `sidePanels: true`, keyword dưới; quoteTop 750, subscribeTop 80. Cảnh 2 rút gọn bảng để không chồng phụ đề.

## QA thành phẩm

- Typecheck, 3 test Node, 3 test Python đạt; cue tìm đủ, thứ tự và khoảng thời gian hợp lệ.
- 19 still theo SHOTS và 30 khung bảng/keyword/CTA đã xem; đã kiểm lại ảnh sửa ở CTA cảnh 10. Preview 60 giây: −16,35 LUFS, −2,11 dBTP, không khoảng lặng dài; duyệt 6 khung MP4.
- Short đã hoàn tất: `videos/04-tai-xe-cong-nghe/short/short-04.mp4`, 45,2 giây, 1080×1920/30fps, −14,28 LUFS, −2,08 dBTP, không khoảng lặng dài; 8 khung mã hóa đã xem. Ghép 116 chữ từ giọng có sẵn, không TTS riêng.
- Thumbnail cuối `thumbnail-final.jpg`, 1280×720; chữ do Remotion vẽ, đã xem, không che mặt.
- Bản dài cuối: `videos/04-tai-xe-cong-nghe/04-tai-xe-cong-nghe.mp4`, **1.013,8 giây (16:53,8)**, H.264 1920×1080/30fps, AAC stereo 48kHz; **−16,32 LUFS, −1,93 dBTP** sau loudnorm hai lượt và đo lại AAC. Chỉ lặng 1.002,857–1.013,800 giây ở outro; không khoảng lặng dài trong lời đọc. SHA256 `e9b85fd5448659633e9fcb047caf416824f6efc422f350995ae92955ce651587`.
- Đã xem **48 khung trích trực tiếp từ MP4 dài cuối** (10 cảnh, 5 ngẫu nhiên, chuyển cảnh, các bảng hoàn chỉnh, keyword và CTA), 8 trang contact sheet. Chữ không đè mặt/phụ đề, số trên bảng khớp giả định. 42 hash nguồn vẫn khớp. Bằng chứng: `full-check.json`, `final-visual-check.json`, `encoded-final/frames.json` trong thư mục QA.
- Đã sao chép MP4 dài, Short và thumbnail vào `outputs` của chat; hash cả ba bản sao khớp canonical, lưu `deliverable-hashes.json`.
- Tải/hẹn giờ, xác nhận API và màn hình kết thúc đã xong. Liên kết Short còn chặn xác minh như mục đầu. Không công khai ngay, không tự OAuth.

## File và công cụ trong chat

Thư mục chat: `C:/Users/ADMIN/Documents/Codex/2026-10-16/ch`.
- `outputs/video-04-qa`: ASR, asset-check, cue-check, still, preview/Short report; báo cáo dài sẽ bổ sung sau render.
- `work/render-video04-full.cjs`, `normalize-video04.py full`, `extract-video04-final.py`: render/đo/trích khung; dùng runtime FFmpeg 9 ngoài repo cùng preload `remotion/scripts/ffmpeg9-compat.cjs`.
- `work/upload-video04-existing-auth.py`: gọi uploader gốc, bắt buộc đúng slug/lịch/hash/QA, chặn OAuth consent và kiểm đúng kênh. `verify-video04-uploads.py` đọc lại lịch/private/xử lý/phụ đề.
- Studio: màn hình kết thúc đã đặt; Related video còn chặn xác minh. Lượt hẹn giờ này chỉ làm #4; #5 và #6 chưa bắt đầu.


### Related Short #4 hoàn tất ngày 22/10/2026
- Tính năng đã được YouTube duyệt. Đã gắn `_6azWKH61L8` → `F6tGyhhf1Fs`, lưu và reload Studio xác nhận đúng tiêu đề. Không đổi lịch, lời đọc, video hoặc cài đặt kênh. Bằng chứng `D:/CodexTemp/bac-sau-video06/outputs/short04-related-saved.{png,txt}`.
- Short #5 chưa sửa: lịch tự động mới nhất chỉ cho sửa video cũ ở #4; đã hỏi chủ dự án về liên kết #5, tiếp tục #6 trong lúc chờ.
