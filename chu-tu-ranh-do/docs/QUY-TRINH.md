# Quy trình chuẩn sản xuất kênh YouTube mới

Phiên bản 1.2 — 28/10/2026. TTS mặc định: **VSP / VieNeu v3 Turbo**. Áp dụng từ kênh mới; giữ nguyên tài sản đã khóa ở Bác Sáu.

## Giờ làm việc chủ kênh chốt 28/10/2026

Sản xuất **00:00**, nếu còn dở thì tiếp **05:30** cùng ngày, Asia/Saigon. Hai lượt dùng cùng checkpoint, không chạy trùng và không tự thu lại. Giờ đăng do Codex nghiên cứu/thử nghiệm riêng theo `docs/LICH-VAN-HANH.md`; không phải giờ hoàn tất dựng. Dùng binding Brave/Channel ID trong `docs/BRAVE.md` và `config/channel-binding.json`.

## 0. Khởi tạo một lần cho mỗi kênh

- Chốt chủ đề, người xem, lời hứa nội dung, giọng kể, tên/handle và bộ nhân vật riêng.
- Tạo repo riêng. Tách tài khoản/kênh, token, kho media, backup và lịch đăng theo từng kênh.
- Chủ kênh chốt28/10/2026: **Codex viết kịch bản và sản xuất trọn quy trình cho kênh mới**. Codex kiểm nguồn/phép tính, tự soát lời trước thu, rồi làm giọng/ảnh/dựng/QA. Quyền này chỉ cho Chú Tư, không thay phân công ở Bác Sáu.
- Tạo theme Remotion mới: màu, font, phụ đề, bảng, thumbnail, outro. Giữ cấu trúc dữ liệu của pipeline, không sao chép nhận diện Bác Sáu.
- Nghe thử một đoạn VSP trước khi chọn giọng dài hạn; tốc độ thật quyết định thời lượng, không áp hệ số ký tự ElevenLabs cho VSP.
- Ghi quyền hiện hành trong HANDOFF: phạm vi dịch vụ, tạo giọng, tải/hẹn, video được sửa và tài khoản được dùng. Quyền cũ không chuyển sang kênh mới.

## 1. Chọn đề tài và góc giải thích

Mỗi đề tài phải có một câu hỏi cụ thể, một kết luận kiểm chứng được và một lợi ích rõ cho người xem. Đánh dấu đang làm trong kho đề tài, tạo slug `NN-ten-khong-dau` dùng thống nhất.

Kiểm video trước để tránh lặp ví dụ, mạch kể, hình và kết luận. Không lấy một khuôn thay vài danh từ rồi sản xuất hàng loạt. Chọn nguồn và cách minh họa trước khi quyết định có đủ chất liệu cho video dài hay chỉ cần Short.

## 2. Nghiên cứu nguồn và kiểm phép tính

Ưu tiên hướng dẫn nhà sản xuất, tài liệu kỹ thuật, cơ quan chính thức và nghiên cứu gốc. Ghi URL, ngày kiểm, phạm vi áp dụng và câu nguồn thực sự hỗ trợ. Thông số phụ thuộc model thiết bị hoặc điều kiện sử dụng phải nói rõ.

Tính lại bằng code mọi số dẫn xuất. Tách số đo thật, số từ nguồn và tình huống giả định. Không dựng số liệu đo đạc, không biến ảnh AI thành bằng chứng thử nghiệm. Chưa giải quyết được bất định quan trọng thì chưa chuyển sang thu.

## 3. Viết và bàn giao kịch bản

Codex soạn và chốt file Markdown theo parser `kich_ban.py`. Các tiêu đề `## CẢNH N — ...`, `**LỜI ĐỌC:**` và dòng `---` phải đúng định dạng.

Mạch đề xuất: tình huống quen thuộc → dự đoán thường gặp → giải thích bằng ví dụ/sơ đồ → kết quả → trường hợp ngoại lệ → cách áp dụng. Không ép mọi chủ đề thành cùng một mạch.

Video thử nghiệm đầu: mục tiêu 8–12 phút, điều chỉnh theo đo giọng và dữ liệu kênh mới. Mở đầu khoảng 20–40 giây, nêu câu hỏi/lợi ích sớm. Thông tin an toàn cần thiết phải xuất hiện ngay trước hành động liên quan, kể cả đầu video; quy tắc giữ chân không được làm chậm cảnh báo cần thiết.

Lời đọc dùng tiếng Việt có dấu, số bằng chữ, câu ngắn, cue overlay xuất hiện nguyên văn. Mô tả hình và chữ trên hình để ngoài LỜI ĐỌC. Nhân vật phụ dùng thẻ `[[Tên: ...]]`; khai báo nhân vật theo parser và ánh xạ ID VSP bằng `VSP_VOICE_MAP_JSON`.

Không tự nhận đã thử, đo, sửa hoặc sở hữu thiết bị khi chỉ đang giải thích từ tài liệu. Với đồ điện, tập trung thao tác sử dụng người dùng được nhà sản xuất cho phép; nội dung sửa bên trong cần chuyên môn và bằng chứng riêng.

## 4. Soát trước thu và chốt phiên bản

- Người viết đã xử lý góp ý; nguồn và phép tính đúng phạm vi.
- Tuyên bố chính có bằng chứng; giả định được nêu đúng; hình dự kiến không ngụy tạo thử nghiệm.
- Kịch bản parse được, không sót lời phụ, cue và con số thống nhất.
- Giọng chính/giọng phụ đều có ID VSP; không dùng lại voice ID ElevenLabs.
- Dry-run đủ cảnh/đoạn, kiểm độ dài và thời lượng dự kiến từ tốc độ giọng thực tế.
- Commit bản lời đọc trước thu. Không có mục quan trọng còn chờ kiểm.

## 5. VSP TTS và căn lời

Chạy `scripts/tao_giong.py` theo README. API được kiểm ở `/docs`: POST `/v1/audio/speech`, Bearer key, các trường `input`, `voice`, `model`, `response_format=wav`, `speed=1.0`.

API trả WAV, không trả timestamp. Công cụ chia đoạn ngắn giữ nguyên lời, lưu từng WAV gốc, dùng faster-whisper căn transcript đã cho vào âm thanh. Mốc từ đo theo audio, không chia đều thời lượng theo số chữ. Sau đó ghép cảnh và hậu kỳ tốc độ/khoảng nghỉ cục bộ.

Đầu ra giữ hợp đồng của Remotion: `canh-XX.mp3`, `canh-XX.json` có `text`, `duration`, `words[{word,start,end}]`; manifest ghi từng cảnh. WAV/MP3/JSON gốc bất biến sau thu. Giữ cache `.vsp` và request hash để truy vết/tiếp tục sau lỗi.

Nghe và đối chiếu **toàn bộ lời** trước sản xuất; chú ý số, tên, âm cuối, từ địa phương và chỗ nối đoạn. Kiểm mốc đầu/giữa/cuối và mọi cue con số quan trọng. Căn lời hay ASR đúng chữ không chứng minh TTS đã đọc đủ/đúng; căn ép transcript cũng có thể gắn từ vào đoạn âm thanh sai.

Không có credit ElevenLabs và không gọi endpoint ElevenLabs. Không tự thử lại khi lỗi/timeout; kiểm WAV/cache và trạng thái dịch vụ. Lỗi xác thực, cảnh báo dịch vụ hoặc lỗi căn lời phải ghi rõ; không đổi provider để tự vượt lỗi. Không áp mức ngưỡng credit cũ lên VSP.

## 6. Shot, ảnh và nhận diện

Build shot từ mốc từ đã QA. Mỗi shot phải phục vụ lời đang nói, đổi bố cục có mục đích. Tạo bảng nhân vật trước, đính đúng reference cho từng cảnh.

Dùng image_gen tích hợp cho ảnh minh họa. Ảnh không chữ; đồ họa tiếng Việt, sơ đồ và số do Remotion vẽ. Thiết bị trong minh họa phải đúng nguyên lý đang giải thích; cắt lớp chỉ dùng khi đã kiểm nguồn kỹ thuật. Không dựng logo hay model sản phẩm sai để minh họa thông số cụ thể.

Duyệt toàn bộ ảnh: nhân vật, tay, trang phục, đạo cụ, chữ nhỏ, biểu tượng gây nhầm. Lưu provenance và bản nháp; audit ảnh thiếu/lỗi phải bằng 0. Đổi ảnh/giọng/shot thì build lại timeline.

## 7. Đồ họa, phụ đề, Short và thumbnail

Một bảng/sơ đồ giải thích một ý; kết luận hiện đúng lúc lời đọc nêu. Cue khớp nguyên văn và phải tìm thấy; không sửa lời đã khóa chỉ để khớp overlay. Phụ đề, số và tiêu đề dùng tiếng Việt có dấu.

Short khoảng 35–55 giây, cắt từ lời đã thu: câu hỏi → giải thích đủ điều kiện → câu chốt. Không cắt bỏ điều kiện khiến kết luận sai. Không cần TTS riêng.

### Thumbnail theo bài học từ video #2 của Bác Sáu

Ưu tiên khuôn **con số A → “THẬT RA…” → con số B gây bất ngờ**, kèm **nhân vật có biểu cảm mạnh** (ngạc nhiên, nghi ngờ, soi kỹ) và **một đồ vật cụ thể** gắn với đề tài. Chữ ngắn, dễ đọc trên điện thoại, không che mặt/tóc. Cả hai con số phải có trong nội dung và giữ đúng điều kiện; không tạo số chỉ để vừa khuôn. Với đề tài không có cặp số phù hợp, dùng câu hỏi và bằng chứng cụ thể thay vì ép số.

Ví dụ chủ kênh đưa từ Bác Sáu để tham khảo cách đóng gói:

- #6: “GỬI 1 TỶ / LÃI 4,5 TRIỆU… CHỈ XÀI ĐƯỢC 1,2 TRIỆU?”
- #8: “LƯƠNG 15 TRIỆU / 5 NĂM 300 TRIỆU… KHÓ!”

Các ví dụ này không tự xác nhận số liệu, không phải nội dung cho kênh mới. Ý làm lại thumbnail #5–#10 được giữ như bài học cải tiến thư viện video cũ; lượt này không chỉnh thumbnail hay Studio của Bác Sáu. Kênh mới dùng nhân vật riêng, giữ cách kể kỳ vọng → kết quả đã kiểm chứng.

### Test & compare / A/B Testing trong Studio

Chuẩn bị **2–3 biến thể**. Khi chỉ muốn đánh giá thumbnail, giữ nguyên tiêu đề và chọn Thumbnail only. Biến thể cần khác biệt có ý nghĩa về cách trình bày lời hứa, bố cục hoặc đồ vật/biểu cảm; không chỉ đổi màu rất nhẹ. Đặt bản mặc định tốt nhất ở vị trí đầu.

Trong Studio trên máy tính: mở video → mục thumbnail/A/B Testing (Test & compare) → chọn thử thumbnail → tải biến thể → lưu và kiểm test đã bắt đầu. Kiểm quyền tính năng nâng cao và điều kiện video; theo tài liệu kiểm 28/10/2026, Shorts và video private không đủ điều kiện. Chờ video dài được công khai theo lịch và đủ điều kiện, không công khai sớm chỉ để test.

YouTube chấm theo **thời gian xem/watch time share**, không chỉ CTR, và thử nghiệm có thể cần vài ngày tới **2 tuần**. Không sửa tiêu đề/thumbnail ngoài bài test trong lúc chạy vì có thể dừng test. Đọc đúng kết quả Winner / Performed Same / Inconclusive; nếu không đủ dữ liệu hoặc không khác biệt rõ, không tự gọi một bản là thắng. Theo hướng dẫn hiện tại, khi có bản thắng YouTube áp dụng kết quả; nếu không có bản thắng rõ, bản đầu làm mặc định. Mở lại để xác nhận thực tế và ghi vào HANDOFF.

Nguồn: [YouTube — A/B test titles & thumbnails](https://support.google.com/youtube/answer/16391400?hl=en). Kiểm lại điều kiện khi triển khai vì tính năng có thể thay đổi.

## 8. Render và QA thành phẩm

Typecheck, kiểm cue, audit shot. Xem khung ở mọi cảnh, sơ đồ, keyword, CTA và outro; kiểm mặt, tóc và phụ đề không bị che. Render preview 60 giây trước bản đầy đủ.

Render full → loudnorm hai lượt → đo chính MP4 sau AAC. Mục tiêu sản xuất: dài khoảng −16 LUFS (±0,5), Short khoảng −14 LUFS (±0,5), true peak ≤ −1,5 dBTP. Đây là tiêu chuẩn nội bộ từ pipeline cũ, không phải điều kiện bắt buộc YouTube. Đặt TP filter thấp hơn để chừa biên mã hóa và đo lại.

Giải mã toàn file để bắt lỗi. Duyệt tối thiểu 20 khung MP4 dài và đủ khung Short, gồm mọi bảng/sơ đồ hoàn chỉnh và chuyển cảnh quan trọng; nghe thành phẩm. Kiểm khoảng lặng, âm gắt, tiếng nối và phụ đề lệch. Không ghi “đã nghe” nếu runtime chỉ làm ASR.

Nếu không kịp QA, dời lịch; không bỏ QA để giữ nhịp đăng.

## 9. Metadata và bàn giao để đăng

Hồ sơ SEO kênh và checkpoint các trường đã lưu nằm ở `docs/SEO-KENH.md` / `config/channel-seo.json`. Với mỗi video, xác định một nhu cầu tìm kiếm thật, dùng cụm chủ đề tự nhiên trong tiêu đề/câu đầu mô tả, kiểm nội dung giải đáp đúng lời hứa; không nhồi tags hoặc suy ra xếp hạng từ metadata vừa lưu.

Tạo tiêu đề chính + phương án dự phòng. **Mô tả công khai của mọi video dài và Short phải dưới 300 ký tự (tối đa 299)**, tính cả khoảng trắng, xuống dòng, URL và hashtag. Đây là quy ước chủ kênh cho bộ chuẩn, không phải giới hạn nền tảng hoặc bảo đảm SEO. Quy định này thay mức 1.200 ký tự ở bản trước.

Ưu tiên 1–2 câu hook/lợi ích đúng nội dung, sau đó một URL hoặc nguồn thiết yếu nếu cần. Không bắt buộc hashtag. Điều kiện/giả định cần thiết để người xem không hiểu sai phải được giữ; rút gọn hook hoặc bỏ phần trang trí để đủ giới hạn. Đếm chuỗi mô tả thật trước tải và sau khi đọc lại API, bao gồm URL thật thay placeholder.

Nguồn đầy đủ, chương từ timeline thật và ghi chú kiểm chứng tiếp tục lưu trong hồ sơ sản xuất. Chỉ đưa chương vào mô tả nếu toàn bộ vẫn dưới 300 ký tự; nếu không, bỏ chương khỏi mô tả thay vì cắt nguồn thành link không tồn tại. Có thể dẫn nguồn chính hoặc một trang nguồn công khai đã có; không tự xuất bản hồ sơ hoặc ghim bình luận ngoài phạm vi được giao.

Kiểm video hướng đến ai và khai báo audience đúng; hoạt hình không tự đồng nghĩa nội dung cho trẻ em. Đánh giá trường công bố AI theo video và hướng dẫn YouTube hiện hành. Hình hoạt hình rõ ràng và cảnh tổng hợp trông như thật có yêu cầu khác nhau.

Mô tả Short phải dùng URL video dài thật sau khi có ID. URL mô tả không thay cho trường Related video.

## 10. Tải, hẹn, Studio, sao lưu và đo lại

Dùng cấu hình/token đúng **kênh mới**, kiểm channel ID trước khi ghi. Chọn giờ đăng theo kế hoạch kênh mới và giữ private tới lịch; không kế thừa 18:00/11:30 hoặc quyền đăng của kênh cũ như điều kiện mặc định.

Sau tải, đọc lại API để xác nhận file/ID, xử lý HD, tiêu đề/mô tả/thẻ, thumbnail, phụ đề, privacy và publishAt. Trong Studio: end screen + đăng ký; khai báo AI theo quyết định của video; Related Short → dài khi đủ điều kiện. Save rồi mở lại để xác nhận.

Sao lưu MP4 dài, Short và thumbnail theo remote được cấu hình cho kênh mới; kiểm hash/0 differences. Không mang token Drive của Bác Sáu vào dự án mới.

### Thử nhịp 4–5 video dài/tuần trong 2 tuần

Đây là phương án thử khi khởi động kênh mới hoặc xem lại nhịp hằng ngày: **4 video dài/tuần làm cơ sở, tối đa 5 nếu vẫn đủ nghiên cứu/QA**, duy trì 14 ngày. Short cắt từ video dài, tối đa một Short tương ứng mỗi video, không tính vào số 4–5. Ghi ngày bắt đầu/kết thúc khi lịch thật được chốt; không tự sửa automation hoặc lịch của kênh cũ.

Mục đích là dành nguồn lực cho từng video, chuẩn bị biến thể thumbnail, hoàn tất QA và theo dõi thử nghiệm. Với VSP, lợi ích là giảm số lượt tạo/khối lượng xử lý và công sản xuất; không còn áp credit ElevenLabs. **Không coi “đăng thưa để YouTube thử đủ lâu” là quy luật thuật toán**: YouTube không xác nhận khoảng cách đăng lớn hơn tự làm view tăng. Nguồn: [YouTube performance FAQ](https://support.google.com/youtube/answer/141805?hl=en).

Sau 72 giờ đọc số liệu sơ bộ; so sánh ở các mốc tuổi tương đương và đánh giá thêm sau 7–28 ngày. Cuối 14 ngày chỉ tổng kết được năng lực sản xuất và dữ liệu đã đủ tuổi; video đăng cuối đợt vẫn cần theo dõi tiếp, không ép mọi A/B test kết thúc theo ngày chốt đợt. Khi có dữ liệu trước đó, so cùng cửa sổ 7 ngày/video và xét khác biệt đề tài, độ dài, nguồn người xem; khi kênh mới chưa có đối chứng, chỉ lập đường cơ sở.

Theo dõi impression/CTR, giữ chân 30/60 giây, thời lượng xem, watch time mỗi video và tổng tuần; ghi thêm thời gian sản xuất, lỗi QA và số lần sửa. Không xem tăng view/video riêng lẻ là kết luận đủ nếu tổng hiệu quả tuần giảm. Không coi một ngưỡng giữ chân cũ là chuẩn cho mọi ngách. Với mẫu ít, ghi giả thuyết; dùng A/B đồng thời để tách tác động thumbnail và tránh quy mọi thay đổi cho nhịp đăng.

## HANDOFF tối thiểu

Ghi thời điểm cập nhật, slug/phiên bản lời đã chốt, trạng thái từng bước, provider/voice/model, đường dẫn/hash nguồn, thời lượng và kết quả QA. Nếu đã tải: ID, lịch có múi giờ, số ký tự mô tả thật, bằng chứng API/Studio và backup. Với A/B: ghi biến thể, ngày bắt đầu, trạng thái/kết quả và bản đang áp dụng. Với thử nhịp đăng: ghi mốc 14 ngày và đánh giá ở cùng tuổi video. Ghi rõ phần chưa làm, lỗi cần người xử lý và quyền hiện hành.

Kết thúc lượt không nói có worker hoặc tiến trình đang tiếp tục nếu thực tế không có. Không đánh dấu một việc xong chỉ vì đã đặt lịch để làm nó.

## Quy tắc quản lý tài sản

- Git: code, cấu hình mẫu, metadata không bí mật, kịch bản và tài liệu.
- Kho media/backup: ảnh, audio, video, cache TTS và bằng chứng QA.
- Bí mật: `.env`, token, client secret; không vào Git, ZIP chia sẻ, log hay lời nhắc ảnh.
- Tài liệu ưu tiên: chỉ đạo trực tiếp mới nhất → HANDOFF mới nhất → quy trình chuẩn → ghi chú lịch sử. Quyền được ghi cho một kênh/video không suy sang kênh/video khác.

Nguồn chính sách và API: xem các link trong README. Bộ này thay các phụ thuộc ElevenLabs cho **kênh mới**, không chỉnh lại hồ sơ lịch sử hoặc tài sản Bác Sáu.
