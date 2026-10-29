Lịch10:00 hằng ngày đã cập nhật checkpoint #13 hoàn tất và #14 chờ Claude, giữ nguyên lịch/chat/phạm vi quyền; không tạo lịch trùng. Related11 kiểm29/10 10:00, Related13 kiểm30/10 10:00 trước Short.

## #13 đã QA, tải hẹn và sao lưu — 28/10/2026 16:13 VN

- Dài **q9VXq-zeXY0**, hẹn **29/10/2026 18:00 VN**: https://youtu.be/q9VXq-zeXY0
- Short **bgx3qesaD3Q**, hẹn **30/10/2026 11:30 VN**: https://youtube.com/shorts/bgx3qesaD3Q

API hậu kiểm 2026-10-28T09:12:38.276475+00:00: đúng kênh UCb8J1ex5t19hvQx0lsbdB6A, cả hai private tới lịch, processing succeeded/HD; dài thumbnail1280×720 và phụ đềvi serving, metadata nguyên văn khớp, Short có URL dài thật trước tải. Không tải trùng/force, không đổi lịch video cũ hoặc OAuth mới. Chi tiết videos/13-luong-huu-bhxh/youtube.json và qa.json.

QA trước29/10 15:00: dài 782.1s/-16.25LUFS/-2.01dBTP; Short 51.6s/-14.39/-2.44. Duyệt 42khung MP4 dài +8Short,42still/6preview, giải mã toàn bộ cả2file đạt.125bitmap shot khác nhau/126PNG chọn, audit thiếu0/lỗi0;320nguồn khóa và187runtimehash giữ nguyên. ASRsmall8cảnh/large-v3 đoạn số khó và AACShort đã kiểm; runtime **không nghe bằng tai**, ASR không thay nghe trực tiếp.

Kịch bản Claude17c925a giữ nguyên, bước4bde0931; thu đúng một lượt8cảnh28/10, dùng4153credit, còn62628/131000 lúc03:10:28UTC. Không retake; không có cảnh báo/lỗi mới trong phản hồi lượt thu, không kết luận cảnh báo tài khoản cũ đã được gỡ. Dẫn điều tự nguyện22% được đính chính ngoài script khóa thành Điều36(1), lời/số không đổi.

Studio đã Save/mở lại xác nhận end screen #6 PxqG898ad1o +Đăng ký, cả hai12:52:03–13:02:03 ở30fps, đúng10giây cuối. AI use=Yes dài/Short đã kiểm trực tiếp UI. Mở nâng cao làm biểu mẫu báo thay đổi tạm; đã Undo, không lưu trường ngoài phạm vi. Giữ Studio chính Brave66974 tại Channel content; không mở tabShort tạm hoặc sửa video khác. Related13 chờ dài public29/10 18:00, kiểm/gắn lượt30/10 10:00 trước Short11:30; không công khai sớm. Related11 kiểm29/10 10:00. #9/#10Related đã xác nhận28/10 07:33, không làm lại.

Backup3file dài/Short/thumbnail qua cấu hình rclone sẵn đã check0differences, bằng chứng D:/CodexTemp/bac-sau-video13/outputs/backup-13.json. Không commit media/bí mật, khôngpush. Quyền #11–#17 tới4/11 23:59:59VN giữ nguyên.

Kế tiếp #14: bản Claude8901cdd còn3góp ý ở docs/SOAT-video-14.md (15,8/78>20%; 3000×5200=15,6không15,8triệu; nhánh mưa140phôi cần rõ giả định nhân bỏ50k→20k hoặc đồng bộ nhánh khác). Nguồn đã đối chiếu; **chưa TTS14**, không tự sửa lời hoặc gửi chatClaude. Đọc bản bàn giao mới trước làm; lịch #14 dự kiến30/10–31/10, không cắt bước4/QA để kịp.


Ghi chú bảo trì backup: rclone báo đang dùng Google Drive client_id dùng chung có kế hoạch ngừng hỗ trợ. Lần backup này vẫn thành công3matching/0differences; chưa đổi cấu hình/client_id hoặc OAuth. Chủ dự án xử lý cấu hình khi có kế hoạch riêng.

## #13 chốt lại đạo cụ trước render — 28/10/2026 11:56 VN

Kiểm crop gốc sau sửa chữ vẫn thấy ký tự trên vài phím. Đã dừng render đầu ở4000/23461khung, không dùng file dở; image_gen bỏ hẳn8máy tính ở ảnh liên quan, duyệt8đầu ra và lưu tất cả vào repo. Công cụ đã tạo đủ8ảnh; bộ lấy đường dẫn không đọc được output_hint, đã phục hồi đúng8file mặc định, đối chiếu nội dung và hash, không gọi tạo lại. Provenance126ảnh đã cập nhật, các bản cũ giữ trong nhap. Worker đã xong hết. Audit125ảnh/thiếu0/lỗi0,320nguồn khóa nguyên vẹn. Preview60s mới−16,30/−2,13,6khung đạt; still42 tạo lại, các bảng/ảnh đổi/chuyển cảnh/CTA/outro được kiểm lại. Short không đổi. Tiếp bản dài cuối rồi QA AAC/decode/khungMP4 trước commit/tải. ChưaID13, không coi render dở là thành phẩm.

## #13 đủ ảnh, qua still/preview, chuyển render cuối — 28/10/2026 11:41 VN

125shot dùng125bitmap khác nhau,126PNG chọn kể thumbnail; audit thiếu0/lỗi0. Đã duyệt117ảnh shot mới+9nền/thumbnail,6trang crop chi tiết; sửa8bút nhầm nhân vật,6mũ và9ảnh có ký tự nhỏ bằng image_gen tích hợp, lưu bản cũ trong nhap, provenance126ảnh tại kich-ban/13-luong-huu-bhxh.shot-image-provenance.json. Tất cả worker đã hoàn tất, không tạo ảnh ngầm. Giữ nguyên320nguồn khóa.

22overlay/cue đúng;42still cuối gồm mọi cảnh/bảng/keyword hiện/quote/CTA/outro đã duyệt. Preview60s mới nhất−16,30LUFS/−2,13dBTP,6khung MP4 đạt. Short51,6s−14,39/−2,44,8khung+full decode+ASRlarge-v3 đạt; không thu riêng/không render lại Short. Runtime không nghe bằngtai. Typecheck và Python toàn chuỗi đạt. Mô tả dài có8chapter thật, dưới1200ký tự; Short còn placeholder phải thay URL dài thật trước tải Short.

Đính chính duy nhất về dẫn điều trong phụ lục nguồn: tự nguyện22% thuộc Điều36(1), không33(2); số/lời/giọng đúng và giữ nguyên hash. Bản hợp nhất Công báo133/2026 đã đối chiếu các điều liên quan; không coi luật tương lai/sức mua cố định là bảo đảm.

Bản dài cuối/đoAAC/giải mã/khung MP4/QA cuối/ID/Studio/backup chưa hoàn tất tại checkpoint này. Tiếp render→QA→commit trước tải→--lich dài29/10 18:00,Short30/10 11:30. Quyền #11–#17 tới4/11 vẫn nguyên, không TTS13 lần nữa. #11Related kiểm29/10 10:00; #13Related sau dài public, kiểm30/10 10:00. #14 còn3góp ý Claude tại SOAT-video-14, chưa TTS.

## #13 đã khóa giọng, đang tạo ảnh — 28/10/2026 10:10 VN

Bản Claude17c925a đạt bước4, commit soát bde0931. Thu đúng một lượt8cảnh, 9.439ký tự, dùng4.153credit, còn62.628/131.000 sau bộ đếm ổn định. Không lỗi/cảnh báo mới trong phản hồi API lượt này; điều đó không xác nhận cảnh báo tài khoản cũ đã được gỡ. Không TTS lại. Khóa34nguồn mới, cộng286nguồn cũ=320file, hash tại D:/CodexTemp/bac-sau-video13/work/video-13-source-hashes.json và protected-sources.json.

Hook39,689s, miễn trừ98,467s đạt45/60. Giọng12phút47s; timeline125shot, thêm10soutro khi render. Short51,6s từ4đoạn giọng sẵn, không TTSriêng. 8nền+thumbnail đã lưu;117ảnh shot mới đang tạo trong lượt hiện tại bằng image_gen, journal image-*.json trong work; không coi worker còn chạy sau khi lượt kết thúc. ASRsmall8cảnh đã có, đang đối chiếu các số khó bằnglarge-v3, runtime không nghe bằngtai. Chưa QA MP4dài/chưa tải/chưaID. Dài29/10 18:00,Short30/10 11:30VN; QA trước29/10 15:00.

#11 giữ nguyên ID/lịch tối28/10; Related11 chờ dài public rồi kiểm29/10 10:00. #9/#10Related đã xác nhận28/10 07:33, không làm lại. #14Claude8901cdd đã bàn giao, soát sau13, chưa TTS14.

# Handoff video #13 — BHXH

28/10/2026: bản Claude17c925a đã được Codex soát lại bước4; không sửa lời. Nguồn gốc và Python đầy đủ tại SOAT-video-13/sources/calculations. 8cảnh/9439ký tự, dự kiến4154credit. Chưa TTS/ảnh/render/ID. Theo quyền06c120c tới4/11, tiếp một lượt thu rồi khóa; có cảnh báo mới dừng. Dài29/10 18:00,Short30/10 11:30VN, QA trước29/10 15:00. Giữ #11 đã hẹn, #9/#10Related đã đúng.
