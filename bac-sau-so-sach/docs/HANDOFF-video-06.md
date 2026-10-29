# Video #6 — Gửi một tỷ nghỉ hưu

## Trạng thái 22/10/2026

- Sau đối chiếu repo/file/API: #5 xong, dài22/10 18:00 và Short23/10 11:30 đúng private/publishAt, xử lý succeeded. Khung dài **23/10 18:00** còn trống, #6 chưa có trên kênh. Mục tiêu #6 dài23/10 18:00, Short24/10 11:30 VN; hạn render/QA23/10 15:00. Quyền thu/tải hiện có tới hết23/10, chưa tự gia hạn.
- Đọc AGENTS/HANDOFF/QUY-TRINH/SHOTS/LICH-DANG/Y-TUONG. Kịch bản mới 10 cảnh, **11.832 ký tự**, Decimal tính đủ cả chuỗi, lời đọc không chữ số/%/thương hiệu; chưa thu ở mốc này. Cần commit kịch bản trước gọi TTS.
- Biểu ngân hàng gốc đọc bằng browser ngày22/10: VCB tại quầy/online12thángVND **5,4%** (trang ghi cập nhật10:01), BIDV và Agribank cá nhân tại quầy12tháng **5,4%**. Không dùng số5,9% từ trang tổng hợp. DOM/ảnh nguồn ở `D:/CodexTemp/bac-sau-video06/outputs/`.
- CPI nguồn Cục Thống kê: bình quân9th2026 +4,52% so9th2025; riêng9/2026 so9/2025 +5,08%. Không coi một trong hai là dự báo; tăng chi4% dài hạn là giả định riêng. Luật109/2025 Điều4.6 bản quét trang4 đã xem; lãi tiền gửi TCTD của cá nhân được miễn TNCN. BHTG đã đổi **350triệu** từ13/7/2026 theo công bố BHTGVN, không dùng125triệu cũ. Link/ngày/phạm vi trong kịch bản.
- Mô hình chính:1tỷ, lãi5,4%, năm đủ365ngày, nhận lãi cuối kỳ; chi5triệu/tháng,60triệu năm đầu, không thu khác trong phép thử, đã có nhà/không vay. Lãi54triệu bình quân4,5triệu nhưng không mặc định lĩnh lãi tháng. Chi cuối năm thiếu6triệu, còn994triệu.
- Giả định giá4%: gốc1tỷ giữ số dư sau10/20năm còn sức mua675,56/456,39triệu theo giá hôm nay. Giữ sức mua gốc năm đầu cần40triệu; lãi54 trừ40 còn14triệu, bình quân1,17triệu tiền danh nghĩa cuối năm. Lợi suất thực1,346% khác chênh1,4điểm%. Vốn tính ngược60triệu/(5,4%−4%)≈4,29tỷ là mô hình lý tưởng, không là ngưỡng nghỉ hưu an toàn.
- Chuỗi gom lãi/chi cuối năm, lãi5,4% cố định, chi đầu60triệu tăng4%: cuối10 còn784,40triệu, cuối19 còn104,49triệu, năm20 không đủ trả trọn chi; dừng ở thiếu16,27triệu, không tài khoản âm. Không phải dự báo thời gian thực.
- Phương án thanh khoản riêng: từ đúng1tỷ dành60triệu chi12tháng,940triệu gửi; quỹ chi giả định không lãi, khoản gửi có50,76triệu lãi; cuối năm990,76triệu sau quỹ đã tiêu. Không cộng dự phòng ngoài1tỷ hoặc trừ quỹ hai lần.
- Ông Năm:62tuổi, tóc muối tiêu chân tóc lùi, ria xám mỏng, không kính; polo xanh lam bụi, quần xám than, dép nâu; sổ xanh ngọc, giỏ tre. Ảnh dùng image_gen tích hợp và refs đúng bảng; không gọi API ảnh trả phí.
- Runtime D riêng `D:/CodexTemp/bac-sau-video06`, không copy toàn videos vào bundle; không đụng hai bundle C từng bị chặn xóa. Lượt này ổ C đã có dung lượng trở lại, vẫn dùng D cho ổn định.
- Related Short #4 đã được duyệt: gắn `_6azWKH61L8` → `F6tGyhhf1Fs`, lưu/reload xác nhận. Bằng chứng `outputs/short04-related-saved.{png,txt}` trong runtimeD. #5 chưa sửa vì heartbeat mới nhất chỉ cho sửa video cũ ở #4; đang chờ câu trả lời chủ dự án cho phép gắn #5, không chặn sản xuất #6.

## Mốc giọng và dựng ngày 22/10

- Kịch bản đã soát và commit `6749bec` trước TTS. Thu đúng một lần đủ10 cảnh; khóa42tệp nguồn gồm lời đọc, bản gốc, hậu kỳ, mốc chữ và manifest bằng SHA256 trong `D:/CodexTemp/bac-sau-video06/work/video-06-source-hashes.json`. Không thu lại video/cảnh cũ.
- Credit GET trước96.422, sau91.666/131.000; lượt này dùng4.756 (API thực tế, không lấy ước tính ký tự). Chưa chạm ngưỡng20.000.
- ASR small đủ10cảnh đã đọc đối chiếu; medium kiểm riêng số cảnh5 xác nhận1tỷ040triệu. Cụm1,11tỷ bị small/medium nhận thành1,1tỷ; ASR large-v3 độc lập, không mớm lời, đã nhận đúng1,11tỷ và1tỷ040triệu. Không có căn cứ TTS sai nên không thu lại. Kết quả `outputs/video-06-qa/asr-numbers-large-v3.json` trong runtimeD. Runtime không nghe trực tiếp bằng tai; không coi ASR là đã nghe.
- 158shot,79shot tham chiếu Bác,77keyword; 18nhóm overlay tìm đủ cue, đúng thứ tự. TypeScript,3test Node và3test Python đạt. Bảng nhân vật ông Năm đã tạo/duyệt. Toàn bộ11ảnh cảnh/thumbnail đã xem cỡ đầy đủ;9ảnh được sửa bằng image_gen để bỏ ký hiệu trên tiền/máy tính và giữ đúng một bút sau tai Bác. Prompt/refs/chỉnh sửa lưu cạnh kịch bản; chưa coi ảnh shot đang tạo là đã duyệt.
- Short cắt từ5đoạn giọng đã có,47,9giây; hook1tỷ–lãi bình quân4,5triệu, giả địnhgiá4%–bùgốc40triệu–còn14triệu–bìnhquân1,17triệu, câu chốt về sức mua. Short đã render/loudnorm hai lượt và đo lại MP4/AAC:−14,31LUFS/−1,84dBTP, không khoảng lặng dài, nguồn không đổi. Đã xem8khung MP4 thực tế, chữ/phụ đề/anatomy đạt; thumbnail1280×720 đã xem đạt. SHA256 Short `98f4a7c41a83214dfac847f8fb5780fabccd76fe60eafbb0e3740c1eaa5e1757`. Chưa tải#6; bản dài còn ảnh/render/QA.

## Còn làm

Còn **Related Short#6 → dài#6**: đã thử trong Studio, bộ chọn không nhận bản dài còn private. Tìm ID PxqG898ad1o trả “No matching results”. Theo YouTube Help, đích phải public hoặc unlisted: https://support.google.com/youtube/answer/14075157?hl=en . Không công khai sớm/đổi unlisted. Hoàn tất sau23/10 18:00 khi dài công khai, kiểm phạm vi/thời hạn quyền trước sửa; quyền hiện tại không tự gia hạn qua23/10. Lượt hằng ngày tiếp tục việc này trước khi làm video mới khi đủ điều kiện. Không tạo lịch trùng, không tải lại. Related#5 vẫn chờ chủ dự án cho phép sửa, chưa tự gắn.

## Tải/hẹn và xác nhận ngày22/10

- Dài **PxqG898ad1o**, https://youtu.be/PxqG898ad1o — **23/10/2026 18:00 VN**, publishAt2026-10-23T11:00:00Z.
- Short **1tGVt2KctnM**, https://youtube.com/shorts/1tGVt2KctnM — **24/10/2026 11:30 VN**, publishAt2026-10-24T04:30:00Z. Mô tả đã chứa URL thật bản dài trước khi tải Short; đây chưa thay cho Related có thể bấm dưới tên kênh.
- API sau tải và sau thao tác Studio xác nhận đúng kênh UCb8J1ex5t19hvQx0lsbdB6A,private,đúng publishAt,title,duration,upload processed/processing succeeded,thumbnail và phụ đề vi serving. Studio xác nhận AI=CÓ cả hai,không trẻ em,lịch GMT+0700. Token cũ,không OAuth mới,không force/tải trùng.
- Màn hình kết thúc bản dài: **#5 YbNXzIIGxUE + Đăng ký**, cả hai16:07:00–16:16:21,đã lưu/mở lại. Studio cảnh báo #5 còn private trước giờ hẹn22/10 18:00 và sẽ thay video khác nếu tới lúc xem vẫn chưa public/unlisted; không sửa lịch#5 để né cảnh báo. Dài#6 hẹn sau một ngày.
- Minh chứng `youtube-studio-check.json`, `long06-endscreen-saved.{png,txt}`, `long06-schedule.{png,txt}`, `short06-schedule.{png,txt}`, `short06-related-private.{png,txt}` trong thư mục QA runtimeD. Metadata và youtube.json lưu repo. Những đoạn “chưa thu/chưa tải” phía dưới là nhật ký từng mốc.
- Credit91.666/131.000,thu1lần dùng4.756,không phát sinh thêm. Lời đọc/42nguồn không đổi. Runtime không nghe trực tiếp bằng tai; ASR không được gọi là đã nghe.

## QA file cuối ngày22/10

- Dài `videos/06-gui-1-ty-nghi-huu/06-gui-1-ty-nghi-huu.mp4`:976,7giây (16:16,7),1920×1080/30fps,−16,23LUFS/−1,76dBTP. SHA256 `49442b4cdef3ed9a6322bf8c352a5f4807abae6fca14b95acadac7c6e85724f0`. Khoảng lặng duy nhất965,75–976,70giây ở cuối/outro.
- Short `short/short-06.mp4`:47,9giây,1080×1920,−14,31LUFS/−1,84dBTP,không lặng dài. SHA256 `98f4a7c41a83214dfac847f8fb5780fabccd76fe60eafbb0e3740c1eaa5e1757`.
- Giải mã trọn video và audio của cả hai file đạt, không lỗi. Đã xem43khung trích từ MP4 dài và9khung Short;159ảnh video và bảng nhân vật ông Năm đã duyệt,hash không đổi trong render. Bảng,keyword,câu chốt,CTA,outro và phụ đề đạt; không còn chồng bảng hoặc che mặt. 42nguồn khóa vẫn nguyên vẹn. Preview60giây−16,11LUFS/−1,55dBTP.
- ASR large-v3 trên chính AAC Short cuối nhận đủ câu/số,không mớm lời; khớp các đoạn cắt. ASR toàn10cảnh và kiểm số độc lập đã làm; runtime không nghe trực tiếp bằng tai. Bằng chứng ở `D:/CodexTemp/bac-sau-video06/outputs/video-06-qa/`, gồm final-visual-check.json,manual-encoded-review.json,stream-decode-check.json và asr-short-final.json.
- Hoàn tất render/QA ngày22/10, trước hạn23/10 15:00. Không gọi thêm TTS hoặc API ảnh trả phí; credit sau thu91.666.

## Mốc đủ ảnh, trước render dài

- Đã tạo/duyệt toàn bộ159ảnh video (158shot kể cả10ảnh cảnh dùng lại, cộngthumbnail), và bảng ông Năm:160tệp kiểm decode. Audit158shot:ảnh đủ158, thiếu0,lỗi0;42hash nguồn không đổi. `manual-asset-review.json` ghi160hash đã xem; `render-image-hashes.json` khóa159ảnh video. Prompt/chỉnh sửa trong `.images/.shots/.edits.json`; ảnh cuối ở `videos/06-gui-1-ty-nghi-huu/anh/`.
- Đã sửa bằng image_gen ba shot ngoài9ảnh cơ sở:01-02 bỏ bong bóng/dấu hỏi;04-04 bỏ tay thứ ba, xem lại còn đúng hai tay;07-10 bỏ dấu trên bìa hồ sơ. Tệp gốc của image_gen vẫn giữ trênC. Lỗi tách đường dẫn ở lần lưu01-02 đã khắc phục, dùng bản sửa đã duyệt, không tạo lại shot trùng.
- Short47,9giây đã xem9khung MP4 (thêm khung phép54−40=14); thumbnail đã đạt. Preview60giây lần đầu−16,11LUFS/−1,55dBTP, không khoảng lặng dài. 18bảng hoàn chỉnh đã xem,19still chuẩn phát hiện fade hai nhóm bảng bị chồng chữ trong vài frame ở cảnh4. Đã dời cue tắt nhóm cũ sớm ở các chuyển tiếp của riêng#6, không sửa core/video cũ, không đổi lời đọc/số. Cue18nhóm vàtypecheck sau chỉnh đạt; đang render lại bộ19still/overlay/preview cho phiên bản này. Cần xem lại trước fullrender.
- Runtime/fullrender/QA trênD, public subset177tệp. Chưa tải#6, chưa cóyoutube.json. Phải xong fullrender/loudnorm/MP4 QA trước upload, hạn23/10 15:00; mục tiêu dài23/10 18:00, Short24/10 11:30VN.

- Sau sửa chuyển bảng: đã xem lại19still chuẩn và25khung overlay/keyword/CTA, cảnh4 không còn chồng chữ; preview60giây hiện hành vẫn−16,11LUFS/−1,55dBTP, không lặng dài. Dời riêng CTA#6 xuốngtop600 để không che trán ông Năm ở shot10-14; đã xem cảCTA10-13/10-14 và câu chốt, phụ đề tách rõ. Bắt đầu fullrender với160ảnh decodeđạt,158shot đủ và42nguồn không đổi. Chưa coi fullrender/QA là xong.

## Kiểm tra cuối tối 22/10 — Studio yêu cầu chủ dự án xác minh

- Sau tải lại trang, Studio hiển thị **Standard Definition complete / High Definition complete** cho bản dài; Short cũng đã xong HD. API đối chiếu mô tả, thẻ, tiếng Việt, danh mục Giáo dục đều khớp metadata đã soát. Video đích #5 `YbNXzIIGxUE` đã **public** đúng lịch tối22/10, nên cảnh báo đích private lúc lưu phần kết đã hết điều kiện gây cảnh báo.
- Khi mở lại End screen sau lần tải lại trang, Studio hiện **“Verify it’s you”** và nút Next. Đã **dừng UI**, không bấm Next, không đăng nhập/xác minh. Màn hình kết thúc đã lưu và mở lại xác nhận trước đó (`long06-endscreen-saved.{png,txt}`); không gọi lần mở bị chặn là xác nhận mới.
- Minh chứng `studio06-verify-required.{png,txt}`. Chủ dự án cần tự hoàn tất xác minh tài khoản nếu muốn tiếp tục các thao tác Studio bị chặn; giữ tab để bàn giao. Related #6 vẫn chờ bản dài công khai sau23/10 18:00 và phiên Studio đủ quyền; không tự vượt xác minh hoặc tự gia hạn quyền.

## Sửa định dạng mô tả 24/10 theo yêu cầu kiểm tra của chủ dự án

Đã phát hiện/sửa khoảng trắng số/chữ ở phần nguồn mô tả dài `PxqG898ad1o` và mô tả Short `1tGVt2KctnM`; đồng bộ đúng hai mô tả quaAPI, GET lại khớp `dang-tai.md`. Bỏ whitespace trước/sau giống hệt: mọi số, URL, mốcchương và mãQH15 giữ nguyên. Privacy/lịch/metadata khác không đổi; không thay media, không render/TTS/tải lại, không sửa Related. Quét toànkênh16môtả lầncuối không còn lỗi tương tự đượcphát hiện,16/16 khớprepo. Chi tiết `qa.json.descriptionFormattingFix`; bảnAPI/audit ở `D:/CodexTemp/bac-sau-video08/outputs/`.
