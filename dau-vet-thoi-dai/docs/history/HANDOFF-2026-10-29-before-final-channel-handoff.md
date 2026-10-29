# HANDOFF — Dấu Vết Thời Đại · Traces of Time

## Đã tạo kênh dưới Gmail Bác Sáu — 29/10/2026, khoảng 08:30 (UTC+7)

Chủ kênh trả lời **“tạo lại để nó phụ thuộc vào gmail bacsau”**. Đã tạo Brand channel mới do **bacsausosach@gmail.com** quản lý; handle còn trống chọn **@DauVetThoiDaiOfficial**. Channel ID **UCW_x25fRd3LXMAi5Nxq1y4g**. Đã xác minh trang công khai có tên/handle và nút Customize channel/Manage videos, vào được Studio đúng ID; Channel URL trong Customization cũng khớp. **Không tạo thêm lần nữa.** ID công khai cũ UCgk1lZuiaobS2qNtcRlwQ1w / @DauVetThoiDai không thuộc binding dự án, không sửa nó.

Brave riêng mới: **HWND17236848**, browser3/Person1, browser window**169036166**, tab**169036165**. Tab cũ ở3213608 gắn với session gốc, không nhận làm tab hiện tại. Đã tạo cửa sổ riêng mới chứa duy nhất tab dự án để tránh các tab mới bị đóng cùng session khác. Xem `docs/BRAVE.md` và binding; luôn lấy inventory mới.

Chủ kênh đã chọn avatar và Open; đã kiểm đúng la bàn/đồng hồ cát, lưu **avatar + descriptionVI203ký tự + tênEN Traces of Time + descriptionEN213ký tự**, Publish rồi reload/readback mô tả và bản dịch. **12keywords đã Save và mở lại Settings đọc đủ12**, tổng183/500ký tự theo Studio. Country/audience không tự đổi. Feature eligibility: Standard **Enabled**, Intermediate/Advanced **Eligible**, chưa phải đã bật/đã xác minh, chưa kiểm uploaddub khi chưa có video.

**Hiện chỉ còn ảnh bìa:** đã mở native Open cho banner, hỏi chủ kênh chọn `banner-dau-vet-2560x1440.png` và Open; tab markHandoff. Sau khi chọn phải kiểm crop mobile rồi Done/Publish/readback. Filechooser API thiếu quyền fileURLs, native helper từ chối input vào hộp con; đã activate/refresh/thử lại đúng một lần vẫn lỗi nên nhờ người dùng chọn file, không đổi quyền extension. Bằng chứng tạo kênh ở outputs session tiếp quản `channel-created.png`; keywords đã lưu `channel-keywords-saved.png`, feature status `channel-feature-eligibility.png`. `channel-profile-pending-avatar.png` là ảnh draft cũ trước khi chọn avatar, không dùng làm trạng thái cuối.

Các mục dưới là lịch sử trước tạo kênh; trạng thái channel_id=null/đang hỏi handle đã được giải quyết bởi checkpoint này. Phần sản xuất/nhạc hiệu/kịch bản giữ như checkpoint07:45.

---

## Checkpoint tiếp quản 29/10/2026, khoảng 07:45 (UTC+7)

Session mới đã kiểm Brave riêng HWND3213608. Kênh công khai @DauVetThoiDai có ID **UCgk1lZuiaobS2qNtcRlwQ1w**, nhưng cả Switch account và All channels của `bacsausosach@gmail.com` chỉ liệt kê Bác Sáu/Chú Tư. **Đây chỉ là ID ứng viên công khai, chưa được gán vào channel_id của dự án.** Chưa xác minh quyền quản lý; đã hỏi chủ kênh có tạo bằng tài khoản khác chưa hoặc muốn đổi handle. Không tạo kênh trùng/không đoán chủ sở hữu. Lượt điều hướng trực tiếp Studio theo ID chưa trả nội dung Studio, không coi là kiểm quyền thành công hoặc thông báo từ chối quyền. Xem `config/channel-observation-2026-10-29.json`.

Đã có **intro/outro với nhạc hiệu tự tổng hợp v1**, không dùng Cutscene Crush/không tải nhạc bên thứ ba. Đã đo âm lượng khoảng −20 LUFS, kiểm decode/duration/stream và xem bố cục; **chưa nghe QA**. Master hình không âm thanh giữ nguyên. Xem `config/brand-audio-v1.json`, `scripts/build_brand_audio.py`, `docs/INTRO-OUTRO.md`.

Đã viết **bản thử biên tập Napoleon và Bộ luật Dân sự**, VI/EN, 7 cảnh, 6 nguồn và mapping 2 câu hỏi. Đây là đề tài Codex chọn để thử, chưa phải tập đầu chủ kênh duyệt. File tại `episodes/01-napoleon-code-civil/`; lời chưa khóa, chưa gọi VSP. Một số nguồn mới kiểm trích đoạn chỉ mục, cần bổ sung bản nguồn đầy đủ trước khóa lời. Bộ dựng preview `scripts/render_documentary_preview.py` đã chạy: video VI **74,233 giây**, 1080p/30fps, có credit mỗi cảnh và intro sau hook; phần thân **chưa thu giọng**, không phải video hoàn chỉnh. VI/EN đã xuất still; EN chưa render MP4. 8 kiểm tra boundary nguồn/hook/câu trả lời/bản dịch/metadata đã qua. Phụ đề trong preview chỉ chép chữ trên thẻ hình, không giả là transcript lời đọc.

Hồ sơ lượt tiếp quản: `docs/CHECKPOINT-2026-10-29.md`. Không có worker Dấu Vết còn chạy, không upload, không tạo automation. Các mục dưới là bản bàn giao trước checkpoint này; trạng thái “chưa có nhạc hiệu/renderer/kịch bản” bên dưới đã được bổ sung như trên, các phần VSP/quyền kênh vẫn còn chờ.

---

Cập nhật **29/10/2026, Asia/Saigon (UTC+7)**. Chủ kênh yêu cầu viết bản này để giao cho session khác tiếp tục **riêng kênh Dấu Vết Thời Đại**. Repo thực thi: `D:/Repo/dau-vet-thoi-dai`.

Lượt bàn giao chỉ đọc/kiểm file và media cục bộ, không mở lại Brave hay xác minh tài khoản trực tuyến. Phần UI dưới đây là quan sát cuối trong chat, cần đọc trạng thái mới trước thao tác.

## 1. Điều chủ kênh đã chốt và phạm vi được giao

- Tên thương hiệu: **Dấu Vết Thời Đại · Traces of Time**. Tên gốc trong form: **Dấu Vết Thời Đại**, bản dịch EN: **Traces of Time**, handle mong muốn **@DauVetThoiDai**. Không đổi sang tên đề xuất cũ “History Turns”.
- Form tạo kênh hiển thị tài khoản quản lý `bacsausosach@gmail.com`.
- Chủ kênh đã trả lời trực tiếp **“Xác nhận tạo kênh”** cho đúng tên/handle/tài khoản này, ở câu hỏi cuối có nêu Điều khoản YouTube. Đây là quyền thực hiện, **chưa phải bằng chứng nền tảng tạo thành công**. Không hỏi lại cùng xác nhận chỉ vì đổi session. Nếu phải đổi handle/tài khoản hoặc công cụ yêu cầu xác nhận ở bước thực tế thì hỏi đúng vấn đề mới và giải thích lý do.
- Codex nghiên cứu, viết, dịch và sản xuất. Chủ kênh cho phép **max effort khi viết kịch bản**: dùng mức cao nhất môi trường hỗ trợ cho nghiên cứu/viết/phản biện, không tự nhận đã đổi model/effort khi chưa có cấu hình thật.
- Làm song ngữ **Việt–Anh**; mở rộng từ lịch sử sang xã hội, kinh tế, chính trị, giáo dục, văn hóa. Mỗi tập vẫn có đối tượng/câu hỏi cụ thể.
- Làm intro/outro, nghiên cứu nhạc YouTube Audio Library; mỗi ảnh tư liệu ghi nguồn và kiểm quyền.
- Dùng Brave riêng để quản lý đúng kênh. Không tự động hóa đăng nhập, OTP, CAPTCHA, xác minh, vượt chặn công cụ hoặc tranh input/Esc.

**Ranh giới giữa các session:** Chú Tư đang được session gốc sản xuất. Không sửa/chạy worker/render/TTS/upload ở `D:/Repo/chu-tu-ranh-do` hoặc `D:/Repo/bac-sau-so-sach`. Không chuyển quyền, chốt giọng, OAuth/token/Drive, nhận diện hoặc lịch từ các kênh đó sang đây. Báo kết quả trong session nhận bàn giao; không tự gửi lệnh sang session Chú Tư.

## 2. Điểm đầu tiên phải giải quyết: đã có kênh hay chưa?

**Channel ID dự án vẫn null. Chưa xác minh tạo thành công. Không upload/đăng khi chưa xác định đúng kênh.**

Quan sát cuối trước khi công việc bị ngắt bởi lịch sản xuất Chú Tư:

1. Form cũ có tên, handle dấu kiểm và avatar đúng. Tab169036128 ở HWND592278 sau đó đã mất/đóng; không coi đó là form hiện tại.
2. Người dùng hỏi vì sao không mở cửa sổ riêng như Bác Sáu. Đã mở cửa sổ riêng **HWND3213608**, Brave **Person 1 / browser3**, setup tab **169036153**. Cửa sổ riêng vẫn dùng chung profile/cookie, không cách ly tài khoản.
3. Ở form gần nhất, @DauVetThoiDai không khả dụng và nút Create không cho bấm. **Không có lần submit thành công được xác minh.**
4. Tab kiểm **169036154** tại `https://www.youtube.com/@DauVetThoiDai` thấy kênh trống, avatar chữD, About ghi tham gia28/10/2026. Chưa biết đó là kênh chủ kênh đã tạo, tạo dở, tài khoản khác hoặc người khác. Không suy quyền sở hữu từ tên/ngày tham gia.
5. Danh sách kênh đã đọc trước đó chỉ có Bác Sáu/Chú Tư. Thao tác UI cuối mở **Switch account** để kiểm lại; chưa đọc xong danh sách sau tải. Không giả định menu/tab vẫn còn nguyên khi nhận bàn giao.

**Cách tiếp:** lấy inventory UI mới → tìm đúng Brave/profile/tài khoản → đọc danh sách kênh/Studio. Nếu tìm thấy đúng kênh do chủ kênh quản lý, lấy Channel ID từ URL Studio/public, đối chiếu tên/handle/tài khoản, lưu binding/evidence rồi tiếp thiết lập, **không tạo lại**. Nếu không xác minh được chủ sở hữu hoặc handle thuộc người khác, giải quyết thông tin đó trước; không tự thêm hậu tố và tạo bản trùng để vượt handle bận.

`config/channel-binding.json` được cập nhật theo dấu vết trong chat và ghi rõ chưa kiểm UI ở lượt bàn giao. ID chỉ là gợi ý. Không dùng HWND66974(Bác Sáu),3999536(Chú Tư),592278(cửa sổ người dùng) cho dự án này. Binding cũ theo tab169036128/592278 hết giá trị chọn cửa sổ. Đọc `docs/BRAVE.md`.

Avatar từng vào form cũ không chứng minh đã được lưu công khai. Filechooser extension thiếu quyền fileURLs; native Open từng không nhận input. Chủ kênh đã chọn file ở lượt cũ, Codex kiểm đúng ảnh/crop Done, nhưng form đó đã mất. Nếu thao tác mới vẫn cần người chọn file, chuẩn bị đúng đường dẫn và hỏi thao tác cụ thể; không tự đổi quyền extension/CDP để vượt hạn chế.

## 3. Hướng nội dung, song ngữ và kịch bản

Video người dùng gửi làm tham khảo phong cách: `https://www.youtube.com/watch?v=6l50wcnoC1E`. Không sao chép lời/ảnh/thumbnail hay dùng video đó làm nguồn chứng cứ duy nhất. Lượt trước mới xem hình ở một số đoạn đầu/giữa/cuối, chưa nghe/đánh giá toàn bộ.

Phạm vi gồm **lịch sử, xã hội, kinh tế, chính trị, giáo dục, văn hóa**. Tập nào cũng cần một quốc gia/sự kiện/nhân vật/câu hỏi trung tâm; sau đó gom series quốc gia/nhân vật khi hợp lý. Ví dụ chủ kênh nêu: Thiên An Môn; ảnh hưởng chiến tranh Việt Nam–Mỹ; Napoleon và nước Pháp. **Đây là ví dụ, chưa chốt tập đầu.** Session mới có thể chọn đề tài đầu từ khả năng kiểm nguồn và tìm tư liệu có quyền, không tự nhận một ví dụ đã được duyệt.

Kịch bản phải có evidence pack, mốc thời gian, số liệu/ngày cập nhật, nguồn sơ cấp/nghiên cứu gốc khi có, phần bất đồng và giới hạn chứng cứ. Phân biệt dữ kiện, diễn giải và điều còn tranh luận; không biến ước tính thành con số chắc chắn. Viết VI rồi dịch EN có biên tập, giữ đúng tên riêng, số liệu, sắc thái và mức chắc chắn; một evidence pack dùng chung hai bản.

**Mở đầu bắt buộc:** đoạn nhá nội dung với2–3 câu hỏi **trước intro**, mốc thiết kế20–35giây, linh hoạt theo nhịp thật. Lập mapping câu hỏi→phần trả lời trong tập. Không hứa “bí mật” thiếu chứng cứ hoặc để câu hỏi treo. Sau đó intro3,2giây, vào bối cảnh ngay.

Ưu tiên **một video có track audio VI/EN, subtitle VI/EN, metadata dịch**. Kiểm multi-language audio/Advanced features thực tế của đúng kênh; không hứa có sẵn, không tự tạo thêm kênh English. Nếu chưa có dub, chuẩn bị phụ đề/metadata EN và giữ audio EN cho lúc tính năng hỗ trợ. Bản EN phải khớp cảnh/timeline, không chỉ thay một file khác độ dài.

Mô tả **từng ngôn ngữ≤299 ký tự** gồm URL/khoảng trắng/attribution. Nguồn dài cần trang nguồn công khai thật được phép, không bịa URL. Attribution bắt buộc trong mô tả YouTube không được thay bằng link ngoài chỉ để vừa giới hạn; đổi tài sản hoặc giải quyết quy ước phù hợp. Thumbnail gắn với dữ kiện của tập; không ép khuôn sốA/sốB của Chú Tư lên lịch sử.

## 4. Tư liệu và nguồn ảnh

Mỗi ảnh/clip/nhạc dùng một hồ sơ `templates/asset-record.json`: trang item gốc, tác giả/kho lưu trữ, thời gian/bối cảnh, license/quyền, attribution bắt buộc, chỉnh sửa, shotIDs và hash. **Ghi nguồn ngắn trên cảnh khi ảnh xuất hiện**, cả bản VI/EN; nguồn đầy đủ trong hồ sơ theo tập.

Ghi nguồn không thay quyền sử dụng. Không dùng Google Images/reupload làm tác giả/giấy phép. Tài sản chưa rõ quyền phải thay trước phát hành. Ảnh AI, tô màu, phục dựng ghi rõ bản chất; không làm bằng chứng sự kiện. Bản đồ/ranh giới phải đúng thời điểm/bối cảnh, tranh chấp được thể hiện đúng phạm vi nguồn.

## 5. Tài sản đã có và đã kiểm

Đường dẫn dưới đây tương đối với `D:/Repo/dau-vet-thoi-dai`:

- `assets/branding/avatar-dau-vet.png`:1254×1254,2.156.554bytes, la bàn/đồng hồ cát vàng/navy. SHA256 `1E45254BAF913CCE9D55B34C4EB4CF1ED4ED670166298DD929D72CCCF249B231`.
- `assets/branding/banner-dau-vet-2560x1440.png`:2560×1440,4.872.126bytes. Đã kiểm crop giữa1540×422 đủ tên VI/EN ở vùng mobile. SHA256 `8261C739131A9978B517A41A67614D20A5E24103CCB8625B248CB280720EB303`.
- `banner-original-v1.png` là bản cũ không chọn; **không dùng thay banner cuối**.
- `assets/branding/PROMPTS.md` / `provenance.json`: prompt và hash ảnh tạo bằng image_gen tích hợp, không API ảnh trả phí. Đây là nhận diện tổng hợp, không tư liệu lịch sử.
- `assets/motion/intro-3s-master-silent.mp4`: thực đo **3,200giây**, H264,1920×1080/30fps, **không audio**.
- `assets/motion/outro-12s-master-silent.mp4`: thực đo **12,000giây**, H264,1920×1080/30fps, **không audio**. Tên VI/EN bên trái,2 vùng16:9 bên phải/chỗ đăng ký; chưa phải liên kết tương tác.

Hai MP4 đã decode toàn file/kiểm frame giữa ở lượt trước, sửa font và bố cục. Lượt bàn giao đọc FFprobe lại xác nhận thông số và không có audio stream. **Master gốc không âm thanh; đã có thêm bản nhạc hiệu tổng hợp v1 bên dưới, chưa nghe QA.** Hash/probe trong manifest của gói bàn giao.

`scripts/render_brand_clips.py` tái dựng master bằng FFmpeg/fonts Windows. Không chạy chỉ để kiểm: script có `-y`, ghi đè master. Khi chỉnh thiết kế phải giữ bản cũ/xuất phiên bản mới, QA lại. Không render lại tài sản đã có khi chưa có thay đổi.

`config/channel-profile.json` có description VI203ký tự, EN213ký tự,12keywords, avatar/banner và bản dịch tên. Đây là **metadata chuẩn bị, chưa xác minh đã lưu Studio**. Sau khi đúng kênh, lưu rồi đọc lại để xác nhận.

## 6. Nhạc: ứng viên có license nhưng chưa có file

`config/music-selection.json`: **Cutscene Crush — Blue Deer Studio**, Cinematic/Inspirational, catalog1:48. Đã đọc popup license Audio Library: dùng trong video kể cả kiếm tiền, không bắt buộc ghi công. Ảnh `music-license-cutscene-crush.jpg` đi kèm gói bàn giao; bản gốc trong outputs chat cũ.

**Chưa có MP3, hash hoặc QA nghe.** Download tự động bị **site-safety policy của công cụ trình duyệt** chặn tại máy chủ googlevideo. Không phải Auto-review, cũng không phải YouTube cấm chủ kênh tải. **Không thử lấy cùng file qua URL thô, shell, CDP, browser khác hoặc workaround.** Có thể nhận file người dùng tự tải và chỉ định, rồi kiểm tên/license/hash, cắt đoạn/fade/trộn/đo âm lượng/nghe. Không phân phối lại nhạc thô trong ZIP khi chưa có quyền.

Người dùng từng nói “bạn tự làm đi?” khi được nhờ tải; điều đó không bỏ chặn công cụ. Trong chat đã nêu phương án làm nhạc hiệu gốc độc lập cho intro/outro trước, và trong lúc chốt bàn giao đã phát hiện các file **nhạc hiệu tổng hợp v1 có sẵn trong working tree, chưa commit**. `config/brand-audio-v1.json` và `scripts/build_brand_audio.py` ghi nguồn tổng hợp additive, không sample ngoài; `assets/audio/intro-original-v1.wav`, `outro-original-v1.wav` và hai MP4 `assets/motion/*-original-audio-v1.mp4` đã có. Lượt bàn giao kiểm lại hash với config, FFprobe và decode toàn file; **chưa nghe/duyệt thẩm mỹ, chưa khẳng định ai khác đang chỉnh chúng**. Giữ nguyên bản này, kiểm working tree/process trước khi chạy lại; script chặn ghi đè v1. Nhạc này không phải bản Audio Library, không giải quyết hay vượt chặn Cutscene Crush. Session mới có thể làm phần độc lập được giao và ghi rõ nguồn tự tạo, không gọi nhạc khác là Cutscene Crush/YouTube Audio Library.

Các ứng viên khác mới xem catalog, chưa nghe: From Here on In/Everet Almond(3:08,Calm), Duty Calls/Rod Kim(1:43,Dramatic). Không gọi là đã chọn theo âm thanh.

## 7. TTS, renderer, lịch: phần chưa làm

- **VSP thay ElevenLabs**, không tự đổi provider/API ảnh trả phí. Giọng/hỗ trợ EN chưa kiểm chứng; cần mẫu và QA VI/EN, không nhận vơ chốt giọng Chú Tư là chốt giọng kênh này.
- Repo này **chưa có `.env`** ở lượt kiểm29/10, chưa cài pipeline TTS/renderer hoặc thu tập. File khóa VSP gốc người dùng đã cấp ở `D:/Repo/free tts.txt`: không in nội dung/commit/đưa ZIP. Thiết lập riêng trong repo này theo quyền đã giao; không sao chép OAuth/token YouTube/Drive kênh khác.
- Có thể **chỉ đọc** công cụ VSP/cache/alignment ở repo Chú Tư để tham khảo rồi đưa code generic sang repo riêng và đổi ROOT/kiểm test. Không chạy trực tiếp script TTS ở repo Chú Tư vì output theo ROOT của nó; không sao chép nhận diện/kịch bản/audio/binding/quyền duyệt của kênh đó.
- Chưa có template phim tài liệu/timeline/video đầu/subtitle VI–EN/audio EN/ngày đăng. Chưa có cấu hình API YouTube riêng đã kiểm, Video ID hoặc lịch public.
- **Chưa có automation riêng.**00:00/05:30 là mốc quy trình tham chiếu, không phải lịch Dấu Vết đã bật. Các automation trong chat gốc thuộc Chú Tư. Không tạo lịch trùng hoặc sửa lịch Bác Sáu/Chú Tư để dùng cho kênh này.
- Khóa lời/commit trước VSP, giữ WAV/cache; lỗi căn lời/render xử lý cục bộ, không tự thu lại. ASR không thay nghe. QA hình/nguồn/quyền/cue/chữ/âm lượng/decode và nghe đúng khả năng trước phát hành.

## 8. Thứ tự tiếp quản và bàn giao tiếp

1. Đọc AGENTS/HANDOFF/quy trình/binding; kiểm working tree và process riêng. Session gốc không khởi chạy worker Dấu Vết trong lượt bàn giao này.
2. Giải quyết **Channel ID/handle/quyền sở hữu** theo mục2. Còn null thì chỉ chuẩn bị cục bộ.
3. Khi đúng kênh: hoàn tất avatar/banner/description VI/bản dịch EN/keywords; readback mọi trường đã lưu. Không tự nhận form hoặc metadata cục bộ là kênh đã hoàn thiện.
4. Hoàn thiện âm thanh intro/outro hợp lệ, giữ master hình đã có; làm phần độc lập khi nhạc còn chặn, không sa vào vòng thử download.
5. Chọn một đề tài cụ thể đủ nguồn và quyền ảnh, lập brief/evidence/asset ledger rồi viết VI/EN với hook/câu hỏi trước intro. Không chỉ dừng ở brainstorming nếu có thể làm phần nghiên cứu/viết đã được giao.
6. Hoàn thiện pipeline riêng, TTS, cue/shot, still/preview/MP4 QA rồi mới chuẩn bị tải/hẹn. Kiểm tính năng song ngữ thật, không tuyên bố giờ tối ưu khi chưa có dữ liệu.
7. Sau mỗi mốc lưu file/hash/version, trạng thái thật, đã nghe hay chỉ ASR, Channel ID/lịch chỉ khi đã xác minh, việc dở/lý do và worker thật nếu đang chạy. Không nói có tiến trình tiếp tục sau lượt nếu thực tế không có.

Hồ sơ cần đọc: `README.md`, `AGENTS.md`, `docs/QUY-TRINH.md`, `docs/INTRO-OUTRO.md`, `docs/BRAVE.md`, các file `config/*.json`, hai template trong `templates/`. Dán `START-NEXT-SESSION.md` làm prompt mở phiên.

Repo Git local/main, chưa remote/push. Trước bản bàn giao có `3926f28` / `87e3e3c`. Gói snapshot dùng danh sách file cho phép, **không .env/token/cache/nhạc thô/banner-v1/.git**. Nếu chuyển máy, giải nén thư mục riêng và kiểm manifest, không ghi đè bản mới hơn khi chưa so sánh.

Kiểm media cục bộ lúc chốt gói: `docs/handoff-media-qa-2026-10-29.json`. Các file nhạc hiệu v1 được phát hiện cuối lượt nên ưu tiên ghi chú mới này hơn câu cũ “chưa có nhạc” trong hồ sơ lịch sử.
