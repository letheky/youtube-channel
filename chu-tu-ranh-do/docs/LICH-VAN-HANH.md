# Giờ sản xuất và thử giờ đăng — Chú Tư Rành Đồ

Chủ kênh chỉ đạo 28/10/2026. Mọi giờ dưới đây theo **Asia/Saigon (UTC+7)**.

## Sản xuất ban đêm

- **00:00 hằng ngày:** đọc HANDOFF và tiến độ, tiếp tục video đang dở trước; nếu không còn việc dở thì chuẩn bị video kế tiếp trong kế hoạch 4–5 video dài/tuần. Ngày không đăng vẫn có thể nghiên cứu và tạo dự phòng.
- **05:30 hằng ngày:** chỉ làm tiếp nếu lượt đêm còn dở. Nếu hoàn tất hoặc đang chờ cùng một việc từ chủ kênh thì im lặng, không sản xuất lặp và không gọi TTS lại.
- Hai lượt dùng cùng HANDOFF và trạng thái công việc. Trước khi chạy kiểm có tiến trình/render còn hoạt động; không chạy hai worker ghi cùng asset. Lượt sáng không mở một video mới chỉ vì video đêm đã xong.
- Nếu lỗi khiến lượt đêm kết thúc sớm, ghi checkpoint ngay; lượt 05:30 đọc checkpoint đó. Gặp xác thực, xác minh, cảnh báo dịch vụ hoặc chặn công cụ thì dừng đúng phần bị chặn và tiếp phần độc lập được phép.
- Chủ kênh đã chốt28/10: **Codex tự viết và sản xuất trọn quy trình cho kênh mới**. Tự nghiên cứu, viết, soát nguồn/phép tính và commit lời trước TTS; không thu lời chưa đạt bước4. Quyền viết này không áp sang repo Bác Sáu.
- Không cắt QA để kịp giờ. Giờ sản xuất **không phải** giờ công khai; video xong phải được hẹn riêng.

Đây là lịch wakeup trong chat hiện tại, không sửa lịch 10:00 của Bác Sáu. Máy và ứng dụng cần hoạt động để lịch cục bộ chạy; không mô tả công việc đã chạy nếu chỉ mới đặt lịch.

## Nghiên cứu và thử giờ đăng

Kênh mới chưa có dữ liệu người xem. YouTube cho biết giờ đăng không được xác nhận là yếu tố quyết định hiệu quả dài hạn; đăng khi khán giả hoạt động có thể giúp lượt xem ban đầu. Báo cáo “When your viewers are on YouTube” phản ánh 28 ngày gần nhất và sẽ là một đầu vào khi kênh đủ dữ liệu.

Nguồn kiểm 28/10/2026:

- https://support.google.com/youtube/answer/141805?hl=en
- https://support.google.com/youtube/answer/9314416?hl=en

Phương án thử do Codex chọn, **chưa phải kết quả “giờ tốt nhất”**:

- Video dài: hai khung **11:30** và **19:30**, giả thuyết tương ứng thời gian nghỉ trưa và buổi tối của nhóm người đi làm. Không có số liệu hiện tại chứng minh khung nào tốt hơn cho kênh này.
- Nhịp cơ sở: 4 video dài/tuần, dự kiến thứ Hai/Tư/Sáu/Chủ nhật. Chỉ thêm video thứ 5 nếu đủ chất lượng và ghi riêng khỏi nhóm so sánh đầu.
- Tuần 1: thứ Hai 11:30, thứ Tư 19:30, thứ Sáu 11:30, Chủ nhật 19:30.
- Tuần 2: đảo khung theo cùng thứ — thứ Hai 19:30, thứ Tư 11:30, thứ Sáu 19:30, Chủ nhật 11:30.
- Chỉ gán ngày cụ thể khi kênh tạo xong, Channel ID đã lưu và video qua QA. Không công khai video lúc 00:00/05:30 chỉ vì vừa dựng xong. Nếu chưa có video đạt, lùi sang slot phù hợp và ghi lệch kế hoạch.
- Short: khởi đầu đăng ngày sau video dài, thử riêng **12:00** hoặc **20:00**, luôn sau khi bản dài công khai/Related đủ điều kiện. Kết quả Short không gộp với video dài.

Ghi slot, ngày/giờ thật, chủ đề, độ dài, biến thể thumbnail, thời điểm A/B thay đổi và nguồn truy cập. So ở cùng tuổi video: 24 giờ, 72 giờ và 7 ngày; theo dõi impression, CTR, watch time/view, giữ chân 30/60 giây và tổng hiệu quả tuần. Không đổi giờ đã hẹn sát lúc đăng chỉ vì một video trước có ít view.

Hết 14 ngày đánh giá sơ bộ, tiếp tục chờ video cuối đủ 7 ngày. Tám video đầu là mẫu nhỏ, khác đề tài và thumbnail; đây không phải thử nghiệm ngẫu nhiên chứng minh nhân quả. Không tự gọi một khung giờ là thắng chỉ từ một clip. Khi Audience report đủ dữ liệu, điều chỉnh giả thuyết và chạy vòng tiếp theo.

## Theo dõi đúng Brave/kênh

Đọc `config/channel-binding.json` và `docs/BRAVE.md` trước khi chạm Studio. HWND chỉ là gợi ý, phải xác nhận Channel ID thật. Channel ID chưa có thì chỉ chuẩn bị; không tải/đăng bằng kênh đang hiện sẵn của Bác Sáu.

Giữ yên lặng khi không có thay đổi; báo thành phẩm, lỗi mới, cần xác thực hoặc quyết định cần chủ kênh. Không tạo lịch lặp trùng hoặc tự gia hạn quyền sang kênh khác.
