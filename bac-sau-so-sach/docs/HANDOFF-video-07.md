# Video #7 — Thẻ tín dụng: đã QA và tải hẹn giờ, còn việc Studio

## Follow-up đến muộn — 25/10 lúc 01:03 VN

Lượt follow-up dành cho tối24/10 đến chat ở `2026-10-24T18:03:48Z` = **25/10 01:03:48 giờ Việt Nam**, khi quyền riêng#7 đã hết24/10. Không thao tác Studio hoặc sửa kênh trong lượt này. **Chưa có xác nhận Related Short#7 `Z82gc7lXRts` → `mkeXFEXd5sY`**, nhãnAI UI#7 cũng chưa xác nhận; end screen#7 đã xong trước đó. Short#7 vẫn giữ lịch25/10 11:30. Chủ dự án cần tự gắn liên kết hoặc cấp quyền riêng mới nếu muốn agent làm; không tự suy gia hạn.

Không xóa phần theo dõi#8 còn hữu ích: đã cập nhật **chính automation cũ** `g-n-li-n-k-t-short-8-t-i-25-10` chỉ còn#8, giữ hai lượt dự kiến **25/10 18:05 /21:05 dự phòng**, kiểm giờVN thực tế và quyền tới hết25/10. Trước18:05 chưa thao tác; sau hạn không sửa kênh. Xóa follow-up khi#8 xong hoặc sau lượt cuối; không đụng lịch sản xuất10:00 hằng ngày. #8 vẫn còn end screen/AIUI/Related như trước; không được gọi đã hoàn tất. Chưa xác định nguyên nhân lượt đầu đến muộn.

**Mốc18:47 ngày24/10:** theo phản hồi trực tiếp chủ dự án về chữ dính, đã sửa khoảng trắng/chia đoạn mô tả bản dài và đồng bộ API `mkeXFEXd5sY`; GET lại khớp `dang-tai.md`, chỉ whitespace đổi, mọi số/URL/chapter giữ nguyên. Privacy public, lịch/nhãn/các metadata khác không đổi; không sửa media/giọng/Short. `qa.json.descriptionFormattingFix` là bằng chứng mới. Các mụcStudio/Related vẫn riêng và chưa được xác nhận mới.

Cập nhật tối 23/10/2026. Chủ dự án đã gỡ lệnh tạm dừng bằng “continue”/“tiếp đi”. Quyền riêng #7 tới hết 24/10/2026 giờ Việt Nam vẫn áp dụng; không mở rộng sang video mới khác.

## Thành phẩm và lịch đã xác nhận bằng API

- Bản dài **mkeXFEXd5sY** — https://youtu.be/mkeXFEXd5sY — **24/10/2026 18:00 VN**, publishAt `2026-10-24T11:00:00Z`.
- Short **Z82gc7lXRts** — https://youtube.com/shorts/Z82gc7lXRts — **25/10/2026 11:30 VN**, publishAt `2026-10-25T04:30:00Z`.
- API đọc lại đúng kênh `UCb8J1ex5t19hvQx0lsbdB6A`, private, đúng publishAt, tiêu đề/thời lượng/metadata; upload processed, processing succeeded. Thumbnail bản dài đã tải và có phụ đề tiếng Việt serving. Nhãn không dành cho trẻ em = false; uploader gửi nội dung AI = true. Trạng thái API chi tiết ở `qa.json`; không gọi đây là đã kiểm tra Studio.
- Mô tả Short đã chứa URL thật của bản dài trước khi tải; **URL mô tả chưa thay thế Related video** dưới tên kênh. Không tải trùng, không force, không đổi public/unlisted trước giờ hẹn. Token đã có, không OAuth/đăng nhập mới.
- `youtube.json`, `qa.json`, `dang-tai.md`, timeline, phụ đề, mốc chữ và cấu hình dựng đã lưu repo. Commit dựng/QA trước tải: `7f21450`; kịch bản được soát và commit `f61031d` trước TTS.

## Việc còn dang dở — không được ghi đã hoàn tất Studio

- **Đã đặt/lưu/mở lại xác nhận end screen24/10**: video trước `PxqG898ad1o` (#6, đã public) + Đăng ký, cả hai15:15:27→15:25:27 ở30fps,10giây cuối. Không đổi lịch/metadata để thực hiện. Nhãn AI và Related vẫn còn riêng như dưới.
- **Related Short #7 chưa gắn** tới `mkeXFEXd5sY`. Giữ bản dài private tới 24/10 18:00; chỉ gắn khi đích đủ điều kiện public/unlisted và còn quyền. Không đổi riêng tư để né bộ chọn. Quyền #7 hết 24/10, lịch lặp không gia hạn. Nếu sau hạn cần chủ dự án tự làm hoặc cho phép riêng.
- Công cụ Windows Computer Use dừng với thông báo: “could not determine the current browser URL on Windows with enough confidence to enforce policy”. Đã dừng UI, không vượt chặn, không tự xác minh. Đây là lỗi công cụ nhận biết URL, **không kết luận tài khoản đang có Verify it’s you** vì chưa đọc được trạng thái mới. Phần dựng/QA/tải API được tiếp tục độc lập trong quyền đã cấp.
- Nhãn AI đã gửi qua API; nếu API không trả trường đó thì còn bước xác nhận UI, không suy thành đã xác nhận bằng Studio. Không đổi cài đặt kênh hoặc sửa video cũ ngoài phạm vi được giao.
- Brave kênh theo bàn giao: browser ID4, window ID169035741, tab chính169035748. Runtime native mới liệt kê cửa sổ Studio app Brave HWND66974 (khác hệ ID browser); thao tác bị dừng trước khi đọc trang. Không coi HWND là thay thế ID cửa sổ browser. Không dùng cửa sổ cá nhân.

## QA bản cuối — hoàn tất tối 23/10, trước hạn 24/10 15:00

- Dài `videos/07-the-tin-dung/07-the-tin-dung.mp4`: **925,9 giây (15:25,9)**, 1920×1080/30fps; **−16,29 LUFS / −1,91 dBTP** đo trên chính AAC/MP4 cuối. SHA256 `7dd912c11c45f750aa0a0c9079b1e40cb6d040bd9dbc58bcf5fce488fccaac5a`. Khoảng lặng duy nhất 914,898–925,900 giây ở phần kết.
- Short `videos/07-the-tin-dung/short/short-07.mp4`: **49,7 giây**, 1080×1920; **−14,44 LUFS / −1,80 dBTP**, không lặng dài. SHA256 `fcad9c44b44d380fb2a9ca1a02b783ea75c8a591dee207d77ce70c77cb225dd2`. Sáu đoạn cắt từ giọng dài, không TTS riêng.
- Loudnorm hai lượt rồi đo lại thành phẩm; giải mã toàn bộ video và audio cả hai file không lỗi. Preview 60 giây đạt −16,24 LUFS / −2,16 dBTP. Đã duyệt **47 khung MP4 dài và 8 khung Short**, gồm mọi cảnh, bảng hoàn chỉnh, keyword thực sự hiển thị, chuyển ảnh, câu chốt, CTA, outro. Thumbnail 1280×720 đã duyệt; chữ không che mặt/phụ đề.
- ASR small đủ 10 cảnh nguồn và large-v3 trên AAC Short cuối đã đối chiếu lời/số. **Runtime không nghe trực tiếp bằng tai; ASR không phải đã nghe.** Các lỗi nhận dạng Út/Úc, lãi/lại, hoàn/hoàng không tự coi là TTS sai để thu lại.
- Typecheck, ba test JS và ba test Python đạt. 14 nhóm overlay tìm đủ cue, đúng thứ tự, không chồng bảng ở chuyển tiếp. Các số overlay khớp bảng giả định.
- Bằng chứng đầy đủ ở `D:/CodexTemp/bac-sau-video07/outputs/video-07-qa/`: full/short/preview-check.json, stream-decode-check.json, final-visual-check.json, encoded-final, encoded-short, ASR và các contact sheet.

## Giọng, ảnh và nguồn được bảo toàn

- Thu mới đúng **một lần**, đủ 10 cảnh; credit trước 91.217, sau **86.182/131.000**, dùng **5.035**. GET lúc 18:43 ngày23/10 vẫn 86.182; không có thêm TTS. Ngưỡng báo 20.000 chưa chạm.
- **42 file nguồn #7** khóa bằng SHA256; kiểm cuối cùng cùng 84 nguồn #5/#6 = **126 file không đổi**. Không sửa kịch bản đã thu, bản gốc hoặc video cũ. Đoạn trạng thái trước thu trong script MD là lịch sử và giữ nguyên vì đã khóa.
- **149 shot dùng 149 ảnh khác nhau**, 4,889–7,645 giây, bình quân 6,106 giây; 89 shot Bác, 72 keyword. Audit thiếu0/lỗi0. Có 151 PNG đã decode/duyệt (10 nền cảnh + thumbnail +60 bổ sung +80 riêng), loại `anh/bo-sung/canh-09-02.png` khỏi timeline vì ký hiệu máy tính quá rõ. 149 shot + thumbnail =150 ảnh được dùng; không gọi151 là151shot.
- Đợt80 ảnh riêng: khôi phục78 ảnh image_gen đã xong từ completed event chính chat bằng **prompt khớp chính xác**; chỉ tạo nốt2 ảnh chưa xong. Không tạo lại78 ảnh. Prompts/refs/provenance trong `kich-ban/07-the-tin-dung.*.json`; ảnh cuối trong `videos/07-the-tin-dung/anh/`. Giữ ảnh gốc trong Cgeneratedimages, không API ảnh trả phí.
- Short tên cũ `short-06.mp4` đã chuyển ra runtime `D:/CodexTemp/bac-sau-video07/work/short07-before-layout-fix.mp4`, không để uploader chọn nhầm; chỉ file07 đã QA được tải.

## Số liệu và nguồn kiểm 23/10/2026

- Khác #2 trả góp: #7 kể sao kê/tối thiểu/mất miễn lãi/lãi ngày và dòng phí hệ thống, không lặp chuỗi XIRR. Một giọng Bác thuật chuyện Út; giữ đúng bảng nhân vật, áo trắng, tóc đuôi ngựa cao, quần be, túi nâu, không thẻ sau lưng.
- **Hợp đồng giả định riêng**, không biểu giá thị trường: mua20triệu ngày0, sao kê30, hạn45, sao kê60;36%/365; tối thiểu5%=1triệu trả ngày45 giảm gốc còn19triệu. Kỳ trước trả đủ, không nợ/phí cũ, không giao dịch mới; giả định mất miễn lãi tính hồi từ ngày ghi nhận. Decimal: 20triệu×36%×45/365 +19triệu×36%×15/365 = **1.168.767đ**; dư nợ **20.168.767đ**, đã trả+còn nợ **21.168.767đ**. Không đếm trùng ngày45.
- Hoàn0,5%=100.000đ theo giả định đủ điều kiện → lãi trừ hoàn **1.068.767đ**. Phương án tách riêng trả2triệu ngày45 → tổng lãi **1.153.973đ**, giảm **14.795đ**. Trả đủ20triệu theo đúng điều kiện mô hình →0 lãi mua hàng. Chỉ làm tròn đầu ra HALF_UP, không cộng dồn số đã làm tròn.
- Merchant discount giả định2%=400.000đ → người bán19,6triệu trước chi phí khác; không gán hết cho bên phát hành hoặc coi400.000−100.000 là lời sạch. Tiền mặt tách riêng: nhận5triệu, phí4%=200.000đ nhập nợ5,2triệu ngay,36%/365 trong10ngày → lãi51.288đ, phí+lãi251.288đ, trả5.251.288đ. Không cộng vào ví dụ mua20triệu.
- Nguồn chính thức đã đọc: VCB mẫu điều khoản1.5/1.8 trang6–9 (đường dẫn2024, chỉ dùng cơ chế có điều kiện, không gọi hợp đồng mới nhất2026); Techcombank bài thanh toán tối thiểu; HSBC finance-charge/how-it-works/FAQ; Visa Việt Nam đoạn merchant discount/interchange. Link, ngày, phạm vi trong script và metadata. Không chép ví dụ ngân hàng có lỗi ngày/tính hoặc áp phần phụ thu thị trường khác thành luật VN. `scripts/kiem_tra_video_07.py` tính lại toàn chuỗi.

## Lượt kế tiếp

- Đọc lại API/youtube.json trước mọi upload; #7 đã có ID thì không chạy lại. Hoàn tất phần Studio còn dở khi công cụ trở lại và đủ quyền, không cắt QA hay vượt xác minh.
- #4 Related đã xác nhận; #5 chủ dự án đã gắn, Studio23/10 đọc lại đúng; #6 Related còn trạng thái chưa xác nhận mới. #6 dài hiện public, nhưng quyền riêng #7 không tự cho phép sửa #6. Không lấy yêu cầu đóng tab làm bằng chứng đã gắn hết.
- Lịch10:00 mỗi ngày vẫn là automation cũ `c-p-nh-t-v-l-m-video-4-l-c-10h`, không tạo lịch trùng. Đề tài tiếp theo **#8 Lương15triệu –300triệu**: chuẩn bị nguồn/tính toán/kịch bản/ảnh; quyền #7 không bao gồm thu/tải #8.

## Studio tối24/10 — dừng vì có thao tác đồng thời

Đã đọc đúng cửa sổBrave BácSáu HWND66974/channel đúng. Hai lần định chuyển tới Short#7 đều bị từ chối với “user input was detected in this window; call get_window_state before continuing”; sau đọc lại/activate vẫn lặp, nên dừng UI, không tiếp tục tranh điều khiển. Không lưu thay đổi Studio trong lượt này, không mở tabShorttạm, giữ nguyên tabStudiochính. Đây là lỗi thao tác đồng thời, không phải yêu cầu đăng nhập hay xác minh mới. API đọc mới xác nhận dài#7 mkeXFEXd5sY đã public, Short#7 vẫnprivate hẹn25/10 11:30. End screen#7 trước đó đã xong; Related/AIUI#7 và Studio#8 vẫn chưa có xác nhận mới.

Đã cập nhật cùng follow-up `g-n-li-n-k-t-short-8-t-i-25-10` thành **24/10 21:05 cho#7**, **25/10 18:05 cho#8**, và **25/10 21:05 dự phòng#8 nếu còn dở**. Không tạo lịch sản xuất trùng, không gia hạn quyền: #7 hết24/10, #8 hết25/10. Nếu#8 xong ở lượt18:05 thì xóa follow-up, nếu không xóa sau lượt cuối; trạng thái chờ không đổi imlặng. Không được gọi Related đã gắn chỉ vì đã lên lịch.
