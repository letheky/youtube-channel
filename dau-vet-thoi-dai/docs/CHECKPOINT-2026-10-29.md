# Lượt tiếp quản — 29/10/2026

## Kênh

Đã đọc AGENTS, HANDOFF mới của session gốc, quy trình, binding và lịch sử xác nhận. Chỉ dùng Brave HWND3213608. Đã lấy ID ứng viên công khai @DauVetThoiDai: `UCgk1lZuiaobS2qNtcRlwQ1w`. Tên/ngày tham gia phù hợp nhưng chưa chứng minh quyền sở hữu. Hai danh sách quản lý của tài khoản dự kiến chỉ có Bác Sáu/Chú Tư. Không thay tên/ảnh/metadata của bất kỳ kênh nào, không tạo thêm kênh. Chủ kênh đang được hỏi về tài khoản khác hoặc handle khác. Binding dự án vẫn null; quan sát lưu riêng để tránh coi ID công khai là ID được phép upload.

## Intro/outro

Đã tạo nhạc hiệu bằng tổng hợp cộng từ sóng sin, không sample/file nhạc bên thứ ba. Xuất bản có audio mới v1, giữ nguyên master hình cũ. Full decode, FFprobe, duration/stereo/48kHz/1080p/30fps đều qua; âm lượng khoảng−20LUFS, true peak dưới−9dBTP. Đã xem frame intro/outro, chưa nghe thực tế. Manifest `config/brand-audio-v1.json` ghi SHA256 và số đo; không sửa `music-selection.json` để giả là đã có Cutscene Crush.

## Thử nội dung và bộ dựng

`episodes/01-napoleon-code-civil/episode.json` chứa lời VI/EN, 7 cảnh, 6 nguồn, description mỗi bản≤299 ký tự và mapping2 câu hỏi→cảnh trả lời. Chọn bản thử hẹp về luật dân sự/địa vị phụ nữ có chồng, không tuyên bố bao quát cả cuộc đời/di sản Napoleon. Kết luận được ghi là diễn giải biên tập. Chưa khóa lời, chưa VSP, chưa chọn giọng.

Nguồn E01 đã đọc PDF; các nguồn còn lại có trạng thái trích đoạn/index hoặc kiểm phiên bản trong JSON/SOURCES.md. Timeout/403 không bị che giấu. Trước khóa lời, cần lưu bản nguồn gốc đầy đủ; không sử dụng dữ liệu luật hiện hành năm2004 như dữ liệu năm2026. Bản thử dùng thẻ chữ/sơ đồ tự vẽ, chưa có ảnh tư liệu bên thứ ba hoặc hồ sơ quyền ảnh được duyệt.

`scripts/render_documentary_preview.py` là renderer **storyboard chưa thu giọng**: credit trên cảnh, nhãn bản thử, hook trước intro, khung chữ VI/EN có kiểm tràn. Không tải ảnh/nhạc, không gọi TTS, không upload. Xuất script-VI/EN và danh mục nguồn từ JSON chung. Cảnh được ghép với track im lặng; chỉ intro/outro có nhạc hiệu. File `visible-card-captions.srt` chứa chữ trên thẻ, không phải phụ đề căn với lời đọc. Thời lượng preview rút gọn, không phải thời lượng thuyết minh cuối.

Đã render VI `work/napoleon-preview-v1/01-napoleon-code-civil-vi-unvoiced-preview-v1.mp4`: thực đo74,233333giây, H2641080p/30fps+AAC; full decode không lỗi. Đã xuất still cả VI/EN, xem các cảnh chữ dài và contact sheet VI. EN chưa dựng MP4. `preview-manifest.json` lưu timeline/hash/probe, upload_allowed=false. 8unittest qua cho các ranh giới: nguồn thiếu/sai, hook, câu hỏi treo, shot trùng, ảnh ngoài phạm vi, bản dịch thiếu, mô tả quá dài.

## Việc tiếp

1. Nhận trả lời tài khoản/handle; xác minh Channel ID và quyền quản lý trước thiết lập Studio.
2. Nghe/duyệt nhạc hiệu; chỉ thay nếu có lỗi hoặc chỉ đạo mới. Không tải lại nhạc đã bị chặn.
3. Hoàn chỉnh bản nguồn, phản biện lời và chốt hướng tập; xây thêm layout ảnh/timeline/bản đồ thật có hồ sơ quyền khi cần. Bản dựng thẻ chữ chưa thay thế phong cách phim tài liệu giàu tư liệu.
4. Thiết lập VSP riêng, kiểm mẫu VI/EN, khóa lời trước gọi, giữ audio/cache. Sau audio thật mới căn timeline/subtitle và dựng full.
5. Kiểm tính năng multi-language audio của đúng kênh, trang nguồn công khai thật, metadata, QA hình/âm thanh trước chuẩn bị upload.

Không có worker còn chạy sau lượt, chưa tạo automation, chưa upload/publish. Không sửa repo/worker/token/automation của Bác Sáu hoặc Chú Tư.
