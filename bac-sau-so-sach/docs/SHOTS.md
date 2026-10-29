# Quy trình ảnh theo shot

Hệ thống dùng slug từ tham số, không cần sửa các script khi thêm video mới. Thêm composition và VideoSpec trong Root.tsx/data cho video đó.

1. Đã có `videos/<slug>/giong/manifest.json` và từng `canh-XX.json` có words/start/end: chạy `node scripts/build-shots.mjs <slug>` trong remotion.
2. Biên tập `kich-ban/<slug>.shots.json`: prompt, ref, keyword. Ranh giới from/to là chỉ số chữ inclusive. Công cụ giữ phần biên tập và dừng nếu ranh giới/nội dung đổi; không tự gắn prompt cũ vào câu mới.
3. Chạy Python `scripts/tao_anh.py kich-ban/<slug>.md --shots --xuat-codex` từ gốc repo. CODEX.md chỉ liệt kê ảnh còn thiếu, nhóm 25 ảnh. Đây là chế độ xuất file, không gọi API. `--shots` không có `--xuat-codex` là API trả phí: chỉ chạy khi chủ dự án cho phép.
4. Dùng image_gen tích hợp, một ảnh mỗi prompt, PNG 16:9. Lưu vào đúng `videos/<slug>/anh/shots/<id>.png`. Shot dùng lại ảnh cảnh không cần tạo thêm.

Với nhiều nhân vật, shot có thể khai báo `refs` là danh sách đường dẫn tính từ gốc repo (ví dụ `assets/nhan-vat/bang-nhan-vat.png` và `assets/nhan-vat/con-ut.png`). `ref` vẫn biểu thị có Bác Sáu để tương thích nguồn cũ; `refs` liệt kê chính xác các bảng cần đính kèm. Brief ghi rõ từng bảng, không tự dùng Bác Sáu cho ảnh chỉ có Út. Có thể lưu bản biên tập ảnh cảnh/thumbnail trong `kich-ban/<slug>.images.json` với các trường `image`, `prompt`, `refs`, tránh sửa kịch bản đã thu giọng.

Khi duyệt ảnh, kiểm tra cả hướng thân người, cổ tay, trang phục và phụ kiện: dây/thẻ nhân viên phải nằm trước ngực, túi và cổ áo phải đúng hướng cơ thể; không chỉ đếm tay/ngón. Đối chiếu tuổi, kiểu tóc, trang phục với đúng bảng nhân vật và kiểm tra chữ/số nhỏ trên đạo cụ.
**Chọn bản v2:** nếu `anh/shots/<id>.png` cũ còn tồn tại, nó vẫn được ưu tiên hơn trường `image` trỏ v2. Đưa bản lỗi vào `anh/shots/nhap/` (giữ nguyên để truy vết), rồi build timeline và kiểm trực tiếp đường dẫn đã chọn. Metadata chọn v2 riêng chưa đủ.

5. Chạy lại `node scripts/build-timeline.mjs <slug>` sau khi đổi ảnh, shot hoặc hậu kỳ giọng. Ảnh ưu tiên: ảnh shot → image của shot → ảnh cảnh → nền giấy.
6. `npm run typecheck`; `node --test scripts/build-shots.test.mjs scripts/shot-timeline.test.mjs`; từ gốc repo: `PYTHONUTF8=1 .venv/Scripts/python.exe -m unittest discover -s scripts -p 'test_*.py'`.
7. `node scripts/verify-shot-frames.mjs <slug> <composition> <output-dir>` tạo still giữa mọi cảnh, 5 điểm ngẫu nhiên có seed, các điểm chuyển đầu tiên, keyword và outro. Mỗi lần bundle từ source hiện tại; xem các ảnh trước khi render cuối.

Ngoài khung giữa cảnh, kiểm tra đúng lúc keyword, câu chốt và nút đăng ký cùng hiện: chữ không được che tóc/mắt nhân vật hoặc đè phụ đề. Video-03 dùng `keywordPosition: "lower"` và `quoteTop: 750`; nút đăng ký ở vùng trên bên phải. Khi ảnh đổi, kiểm tra lại các khung này dù nội dung chữ không đổi. Điểm có tên `keyword` trong công cụ có thể đang bị overlay chặn; cần thêm một khung thực sự thấy keyword để làm bằng chứng.

8. Render thử `--frames=0-1799`, rồi render toàn bộ. Xuất bản mới vào tên tạm, chuẩn hóa loudnorm và kiểm tra trước khi thay file hoàn chỉnh cũ. Không tạo lại giọng và không đổi thumbnail.

Chuẩn hóa âm lượng hai lượt, mục tiêu I=-16 và LRA=11. Đo lại chính MP4 sau mã hóa AAC: peak có thể tăng nhẹ so với đầu ra filter. Bản Video-01 dùng TP=-1.9 trước mã hóa để giữ true peak của file cuối dưới -1.5 dBTP. Kiểm tra khoảng lặng bằng `silencedetect=n=-45dB:d=2.5`; chỉ đoạn cuối khoảng 10 giây được lặng.

Bản Video-02 cần TP=-2.3 trước AAC: TP=-1.9 cho file cuối -1.43 dBTP, vượt ngưỡng. Chuẩn hóa lại từ bản render gốc với TP=-2.3 cho kết quả đo MP4 cuối -16.31 LUFS, -1.72 dBTP. Luôn đo lại thành phẩm; không coi giá trị đặt cho filter là kết quả sau mã hóa. Short-02 dùng mục tiêu I=-14, đo được -14.24 LUFS và -1.83 dBTP.

Video-03 cũng dùng TP=-2.3 trước AAC; bản dài cuối đo -16.26 LUFS và -1.90 dBTP. Short-03 dùng I=-14, TP=-2.3, offset bổ sung +0.5 ở lượt hai, đo được -14.37 LUFS và -2.12 dBTP. Khoảng lặng dài duy nhất của bản dài là 10.901 giây ở phần kết.

## Máy Windows có FFmpeg tích hợp bị crash

Trong phiên sandbox này FFmpeg/FFprobe kèm Remotion 4.0.536 thoát 0xC0000005. FFmpeg hệ thống chạy được. Tạo một thư mục runtime riêng gồm ffmpeg.exe, ffprobe.exe và DLL đi kèm từ bộ FFmpeg hệ thống, cùng remotion.exe từ @remotion/compositor-win32-x64-msvc. Không thay file trong node_modules.

Nếu dùng FFmpeg 9: preload `scripts/ffmpeg9-compat.cjs` bằng NODE_OPTIONS=--require=<đường-dẫn-tuyệt-đối>, và truyền --binaries-directory=<runtime-dir> cho lệnh render. Adapter đổi filter_script thành cú pháp tải filter từ file, và dùng encoder AAC gốc thay libfdk_aac. Tham khảo [cú pháp FFmpeg chính thức](https://ffmpeg.org/ffmpeg.html#Options).

Adapter là tùy chọn cho runtime FFmpeg 9, không preload khi dùng bộ FFmpeg cũ bình thường.

## Dung lượng bundle trên Windows — bổ sung 21/10/2026

`publicDir = ../videos` khiến bundler sao chép cả thành phẩm video cũ vào thư mục tạm mỗi lần chạy. Lượt #5 đã làm ổ C gần đầy. Khi render nhiều video, chuẩn bị publicDir riêng chỉ chứa tài nguyên của slug đang dựng và `_sfx`, giữ nguyên đường dẫn tương đối `slug/anh`, `slug/giong`, `slug/timeline.json` và `slug/short`. Trên cùng ổ đĩa có thể dùng hard link; không đưa các MP4 cũ vào bundle.

Lượt #5 dùng `D:/CodexTemp/bac-sau-video05/public`, đặt TEMP/TMP, outDir của `bundle()` và runtime binaries trên D. Các helper ở `D:/CodexTemp/bac-sau-video05/work`; QA ở `D:/CodexTemp/bac-sau-video05/outputs/video-05-qa`. Thành phẩm cuối vẫn ở `videos/<slug>/`. Sau sửa ảnh/shot cần build timeline rồi làm mới publicDir trước render. Không thay publicDir hoặc ảnh khi render đang chạy.

Hai bundle lỗi cũ trên C còn nguyên vì lệnh xóa bị hệ thống xét duyệt tự động chặn (`blocked by policy`). Không tự thử lại việc xóa hoặc chuyển thư mục để né chặn; dùng runtime D để tiếp tục sản xuất.
