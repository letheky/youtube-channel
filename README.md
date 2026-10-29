# Ba dự án kênh YouTube

Kho mã nguồn, kịch bản và tài liệu vận hành của ba kênh:

- [Bác Sáu Sổ Sách](bac-sau-so-sach/README.md): kênh tài chính tiếng Việt; Python và Remotion.
- [Chú Tư Rành Đồ](chu-tu-ranh-do/README.md): kiến thức đồ dùng và công nghệ; Python, VSP TTS và Remotion.
- [Dấu Vết Thời Đại · Traces of Time](dau-vet-thoi-dai/README.md): nội dung lịch sử, xã hội và văn hóa Việt–Anh.

Mỗi dự án nằm trong một thư mục riêng, giữ nguyên tài liệu, cấu hình không bí mật, kịch bản, mã nguồn và metadata đã được commit. Các ảnh nhận diện/nhân vật đã được quản lý trong Git nguồn được giữ nếu không thuộc bộ ảnh video sinh ra.

## Bản sao ngày 29/10/2026

Dữ liệu lấy từ bản commit gần nhất của từng dự án. Xem [SNAPSHOT-MANIFEST.json](SNAPSHOT-MANIFEST.json) để biết commit nguồn, danh sách file và SHA-256. Dự án Bác Sáu đang có thay đổi chưa commit của phiên sản xuất; các thay đổi đang làm dở không nằm trong bản sao này. Không thay đổi repo nguồn hoặc phiên sản xuất đang chạy.

Lịch sử Git cũ không được nhập vào kho này. Đây là bản sao mã nguồn tại các checkpoint đã ghi trong manifest.

## Tài sản không đưa lên Git

Theo yêu cầu chủ dự án, kho này **không chứa file video**. Âm thanh, ảnh sinh ra trong `videos/`, bộ render, cache, môi trường Python/Node, file nén, `.env`, khóa API và token OAuth cũng không được đưa lên. File văn bản như timeline, phụ đề và metadata trong `videos/` có thể được giữ.

Vì tài sản media được lưu riêng, cần khôi phục chúng từ kho cục bộ và cài dependency trước khi dựng lại video. Không chạy TTS để tạo lại tài sản chỉ vì bản sao Git thiếu media. Các file `.env.example` chỉ là mẫu cấu hình, không phải khóa thật.

## Tiếp tục làm việc

Đọc `AGENTS.md`, `HANDOFF.md` và `README.md` trong thư mục của đúng dự án. Đường dẫn `D:/Repo/...`, trạng thái trình duyệt và lịch trong các tài liệu là bối cảnh vận hành của máy nguồn; khi làm việc ở checkout khác cần xác minh lại đường dẫn, kênh và quyền thao tác. Các chỉ đạo sản xuất riêng của từng kênh vẫn cần được tôn trọng.

File `.gitignore` ở thư mục gốc chặn video, audio và bí mật cho cả ba dự án. Không dùng `git add -f` để đưa các tài sản này vào kho.
