# Quy trình Việt–Anh — Dấu Vết Thời Đại

## 1. Câu hỏi và phạm vi

Mỗi video giải thích một câu hỏi cụ thể gắn với quốc gia, sự kiện, nhân vật hoặc cơ chế xã hội. Các cụm nội dung: lịch sử; xã hội; kinh tế; chính trị; giáo dục; văn hóa. Gom cụm quốc gia/nhân vật khi hợp lý, không ép mọi video thành lịch sử cổ điển hoặc tin thời sự.

## 2. Nghiên cứu và kịch bản

Chủ kênh cho phép **max effort** cho nghiên cứu/viết/soát kịch bản. Khi môi trường có cấu hình effort, chọn mức cao nhất hỗ trợ cho công việc này; không tự nhận đã đổi model/effort nếu công cụ không cho đặt. Nếu sau này cấu hình automation/thread viết riêng thì lưu rõ model, effort và trạng thái thật.

Lập hồ sơ: câu hỏi trung tâm, mốc thời gian, các nhân vật/bên liên quan, nguồn sơ cấp khi có, nguồn nghiên cứu uy tín, số liệu và ngày cập nhật, phần bất đồng. Phân biệt tài liệu chứng minh gì với suy luận của người kể. Không lấy một lời kể hoặc video tham khảo làm toàn bộ chứng cứ. Với con số thương vong hoặc sự kiện còn tranh luận, nêu nguồn/phạm vi/giới hạn phù hợp, không biến ước tính thành số chắc chắn.

Khóa luận điểm rồi viết tiếng Việt, phản biện logic và kiểm từng phát biểu trọng yếu. Dịch sang tiếng Anh theo văn phong thuyết minh tự nhiên, giữ nguyên mức chắc chắn, số liệu và nội hàm; soát tên người/địa danh/thuật ngữ. Một evidence pack cho hai ngôn ngữ.

## 3. Mở đầu bắt buộc

Theo chỉ đạo chủ kênh: **đoạn nhá nội dung và câu hỏi xuất hiện trước intro**. Mốc thiết kế ban đầu20–35 giây, điều chỉnh theo nhịp thực tế, không xem đây là giới hạn cứng của nền tảng.

- Mở bằng nghịch lý/cảnh tư liệu/dữ kiện đã kiểm.
- Đặt2–3 câu hỏi liên quan trực tiếp đến tập, cho thấy điều đang bị hiểu thiếu hoặc hệ quả đáng quan tâm.
- Nhá ngắn những phần người xem sắp hiểu; không kể hết kết luận và không hứa bí mật không có bằng chứng.
- Intro nhận diện khoảng3 giây, sau đó vào bối cảnh ngay.
- Có danh sách đối chiếu các câu hỏi đầu tập và thời điểm nội dung trả lời. Không để câu hỏi treo chỉ để câu view.

## 4. Ảnh, tư liệu và ghi nguồn

Mỗi tài sản dùng một bản `templates/asset-record.json`. Điền URL **trang gốc** tại kho lưu trữ/tác giả, tên/tác giả, thời gian/bối cảnh, license/quyền/căn cứ dùng, attribution yêu cầu và shot sử dụng. Kiểm bối cảnh ảnh thật; không minh họa sai sự kiện mà không nói rõ đó chỉ là cảnh cùng thời.

Trên video hiển thị nguồn ngắn đọc được khi ảnh xuất hiện; bản tiếng Anh cũng có nguồn. Tài sản chỉnh sửa, tô màu hoặc phục dựng phải ghi rõ; minh họa AI tách biệt với bằng chứng. Ghi nguồn không thay việc có quyền sử dụng. Chưa rõ quyền thì thay tài sản khác, không để trạng thái unverified lọt bản xuất bản.

Danh mục đầy đủ theo tập lưu cục bộ và chuẩn bị trang nguồn để dẫn liên kết thật trong mô tả. Không tự đưa tài liệu riêng tư lên web. Với giấy phép bắt buộc attribution ngay trong mô tả YouTube, phải đáp ứng đúng vị trí, không thay bằng link trang nguồn; nếu vượt299 ký tự, ưu tiên đổi tài sản có điều kiện phù hợp hoặc xin chủ kênh đổi quy ước, không cắt attribution.

## 5. TTS, đồ họa và nhạc

VSP thay ElevenLabs theo lựa chọn người dùng. Chốt voice vi/en bằng mẫu và QA; voice tiếng Anh còn cần xác minh hỗ trợ, chưa tự chuyển provider. Khóa lời trước gọi, lưu job/hash/cache và audio gốc; lỗi render/căn lời không tự gọi TTS lại.

Template phim tài liệu: ảnh tư liệu với chuyển động chậm, bản đồ theo dữ kiện, timeline, đồ thị và chữ nhấn. Không tạo bản đồ ranh giới như dữ kiện chắc chắn khi đang có tranh chấp; ghi thời điểm/bối cảnh liên quan. Dữ kiện hiển thị đúng lúc lời dẫn giải thích.

Nhạc ưu tiên YouTube Audio Library, kiểm license **từng bản** ở Studio khi tải. Lưu tên, nghệ sĩ, loại giấy phép, yêu cầu attribution, ngày lấy và hash file; không lấy bản reupload làm chứng cứ giấy phép. Không coi “royalty-free” đồng nghĩa public domain. Không phân phối lại nhạc thô trong gói nhận diện chia sẻ nếu chưa có quyền đó.

Intro ngắn và outro10–15 giây là tài sản riêng, không thay đoạn nhá theo từng tập. Outro chừa vùng video tiếp theo và nút đăng ký; chỉ gắn end screen vào video thật, không vẽ nút giả hứa có thể bấm. Giữ nhạc thấp dưới lời, tránh cú tăng âm lượng cuối tập. Ghi rõ đã kiểm âm thanh bằng nghe hay mới kiểm kỹ thuật.

## 6. Xuất và đăng Việt–Anh

Ưu tiên một video với trackvi/en, subtitlevi/en, title/description dịch riêng. Bản đọc tiếng Anh phải khớp thời lượng/cảnh, không chỉ thay file có độ dài khác. Đồ họa giảm chữ trong hình khi dùng chung hình; nội dung buộc bản địa hóa thì chuẩn bị bản dựng riêng và quyết định cách đăng theo điều kiện thật của kênh.

Kiểm Advanced features/multi-language audio thực tế ở đúng kênh, không hứa có sẵn ngay sau tạo. Nếu chưa có trackdub, đăng bản Việt với phụ đề và metadata tiếng Anh trong phạm vi được giao, giữ bản audio tiếng Anh cho lúc hỗ trợ; không tự tạo kênh English thứ hai.

Mô tả mỗi ngôn ngữ tối đa299 ký tự theo quy ước kế thừa, kể cả link/attribution. Tiêu đề chính và bản dịch tự nhiên, không ghép hai tiêu đề dài vào một trường. Thumbnail phải giải thích được bằng dữ kiện trong video; không ép khuôn sốA/sốB của Chú Tư vào chủ đề lịch sử.

Kiểm hình, chữ, nguồn, subtitle, chính tả, tên riêng, nhạc/quyền, âm lượng, decode và nghe thực tế trước phát hành. Kiểm audience/AI disclosure theo từng video. Đọc lại metadata, lịch có timezone và Channel ID sau tải. Chưa có pipeline/API được kiểm thì dùng UI trong khả năng công cụ, không sao chép token kênh khác.

## Nguồn nền tảng đã kiểm 28/10/2026

- [Multi-language audio](https://support.google.com/youtube/answer/13338784?hl=en): audio do mình chuẩn bị, cần Advanced features theo hướng dẫn hiện hành.
- [Dịch tiêu đề và mô tả video](https://support.google.com/youtube/answer/6289575?hl=en).
- [Tên/mô tả kênh và bản dịch](https://support.google.com/youtube/answer/2657964?hl=en).
- [YouTube Audio Library](https://support.google.com/youtube/answer/3376882?hl=en).
