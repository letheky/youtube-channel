# Phạm vi kho tổng hợp

- Kho này lưu bản sao mã nguồn của ba dự án kênh YouTube trong các thư mục riêng.
- Đọc hướng dẫn trong thư mục dự án trước khi sửa; không áp quyền vận hành của một kênh sang kênh khác.
- Không commit video, audio, file môi trường có khóa thật, token OAuth, thông tin đăng nhập, dependency hoặc cache. Giữ `.gitignore` ở gốc và từng dự án.
- `SNAPSHOT-MANIFEST.json` mô tả bản nhập ban đầu và hash file tại thời điểm nhập. Các commit phát triển sau này có thể thay đổi file; không coi manifest là trạng thái sản xuất trực tiếp.
- Tài liệu giữ bối cảnh máy nguồn `D:/Repo/...`; xác minh đường dẫn khi chạy ở checkout khác. Không tự chạy TTS, render hoặc upload YouTube trong nhiệm vụ đồng bộ mã nguồn.
