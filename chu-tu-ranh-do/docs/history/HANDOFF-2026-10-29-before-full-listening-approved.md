# Checkpoint ưu tiên — 29/10/2026: tập01 đã dựng đủ, chờ nghe cả tập

Chủ kênh đã nghe/chốt giọng cảnh1: “Giọng rõ, đọc đúng; tiếp tục dùng”. Đã thu đủ12cảnh bằng VSP/vi-thai-son, chốt nguồn WAV/cache; giữ nguyên hash/lời cảnh1.100request markers đều có WAV,92request mới cho cảnh2–12; không thu lại để sửa căn lời. Các lỗi biên DTW được sửa cục bộ từ hai WAV kề nhau không thay tiếng, trace nằm trong cache `.alignment/`.

- **Bản dài duyệt** `remotion/out/wifi-long-review-v1.mp4`:478,733giây,1920×1080/30fps, H264/AAC48kHzstereo; đo MP4 sau AAC −16,03LUFS/−2,26dBTP. **Short** `remotion/out/wifi-short-review-v1.mp4`:36,4giây,1080×1920/30fps, −14,07LUFS/−2,32dBTP; dùng toàn cảnh2 đã có, không TTS riêng.
- Full decode hai file đạt. Duyệt64khung dài/10khung Short, đủ12cảnh/36beat, mốc số600→900/20/+50%, recap và câu cuối;4khung phóng nguyên cỡ. Chữ/ảnh/nguồn không thấy tràn trong mẫu đã xem. Preview60giây đã kiểm trước full. Typecheck đạt,17test Python đạt (PYTHONUTF8=1). QA/hash: `docs/qa/2026-10-29-episode01-full-review-v1.json`.
- ThumbnailA/B v2 và SRT đã có; mô tả201ký tự. Chưa chạy A/B, chưa có videoID/lịch public. Đừng tự gọi số giả định là đo thật hoặc giờ19:30 là tối ưu.
- **Chưa nghe trực tiếp cả tập/Short.** Chủ kênh chỉ nghe cảnh1 ở lần chốt giọng; ASR không thay nghe. Chưa upload/hẹn. Bản MP4 hiện có chữ BẢN DUYỆT/CHƯA ĐĂNG; sau duyệt nghe cần xuất riêng bản release bỏ nhãn bằng cùng audio/timeline và QA file cuối, không tải nhầm bản duyệt. Không thu lại WAV hoặc render lại chỉ để kiểm.
- **Không còn worker đang chạy.**70862 render và90734 normalization/technical QA đã kết thúc; state mới `work/production-state.json` chờ nghe, không mở video mới ở lượt05:30. Hash WAV gốc/MP3/public đều đã đối chiếu. Không sửa automation.
- Gói chủ kênh xem: `C:/Users/ADMIN/Documents/Codex/2026-10-28/ban/outputs/chu-tu-ranh-do/2026-10-29-tap01/`. Dấu Vết Thời Đại đã bàn giao độc lập theo yêu cầu, repo đó commit688f7c2; không làm tiếp/chạm Brave của nó trong nhiệm vụ Chú Tư.

**Công việc tiếp:** nghe bản MP4 đầy đủ, xử lý lỗi thực có bằng cache/hậu kỳ và lưu phiên bản; nếu đạt, làm release và tiếp upload đúng Channel ID `UCMDWcpFr6SZ1Nk7_ffVGTVA` theo quy trình. Phần cũ bên dưới là lịch sử, không quay lại chờ giọng cảnh1 hoặc gọi TTS cho cảnh đã xong.

---

# Chú Tư Rành Đồ — bàn giao vận hành

Cập nhật 29/10/2026, giờ Việt Nam. Đọc mục mới nhất trước lịch sử.

## Chủ kênh đã nghe cảnh1 và chốt tiếp tục dùng giọng — 29/10

Trả lời trực tiếp: **“Giọng rõ, đọc đúng; tiếp tục dùng”**, đối với bản mở đầu31giây SHA256 `788b1d19b5f380fce5ab6dbf4c292a9a028f2ca92dd66da676ef19f418c78339`. Đã lưu `config/voice-approval.json`. Cổng chờ nhận xét giọng cảnh1 ở checkpoint05:30 **đã được giải quyết**, không hỏi lại cùng việc và không thu lại cảnh1. Tiếp thuVSP cảnh2–12 của cùng tập `01-wifi-khac-goi-mang`, lời v1 giữ nguyên, rồi dựng/QA bản dài vàShort. Chưa được coi phần chưa thu hoặc cả tập là đã nghe đạt.

### Mốc tiếp sản xuất — phục hồi căn lời cục bộ, không thu lại

Whisper small trả mốc đầu bằng0cho `Chặng` ởcảnh2/đoạn006 và `Còn` ởcảnh4/đoạn005. Các request đã có WAV; **không gửi lại**. Đã dùng WAV liền trước làm ngữ cảnh căn lời, giữ nguyên lời và audio; chỉ giao mốc đo được với cửa sổ WAV gốc, từ không có khoảng dương hoặc lệch biên>120ms vẫn bị từ chối. Trace trong `.vsp/canh-XX/.alignment/`; các WAV gốc kiểm SHAkhông đổi. Context cuối dùng đúng nối hai WAV, không chèn khoảng lặng giả; bảncontext200ms cũ chỉ là chẩn đoán lưu riêng. Không suy từ mốc/ASR rằng đã nghe đạt.17test bảo toàn cache/no-retry/timing/phụ đề đạt vớiPythonUTF8=1. Code phục hồi ởcommit `3d56330` và commit nối tiếp; kiểm tiến trình/state trước khi tiếp.

Phụ đề đã đổi cách chia: giữ nguyên từ/mốc gốc, cân câu dài để tránh phần đuôi1–2từ, xuấtSRTtheo đúng offsetframecảnh. Đang hoàn thiện thêm sơ đồ nhà/vị trí router riêng; chưa gọi các cảnh chưa cótiming là đã render/QA.

## Checkpoint 29/10 — lượt05:30, có mở đầu31giây và hai thumbnail; chờ kiểm nghe

**Tiếp cùng tập `01-wifi-khac-goi-mang`; chưa làm tập khác.** Đã tiếp phần dở00:00, không có worker còn chạy khi bàn giao. Không dùng Brave/Studio, không lấy analytics, không upload/hẹn và không sửa automation trong lượt05:30.

- Nhân vật4tư thế `assets/episodes/01-wifi/character-sheet-v1.png` (1254×1254,RGBA), căn hộ `apartment-v1.png` (1672×941), tạo bằng **image_gen tích hợp**, lưu nguyên bản trong repo media; prompt/reference/hash tại `assets/episodes/01-wifi/PROMPTS.json` / `provenance.json`. Đã xem nhận diện/tay/chân/đạo cụ/chữ/logo: chấp nhận làm minh họa bản duyệt. Không phải ảnh đo thử hay sản phẩm model cụ thể.
- Code mới `remotion/src/wifi/`: bố cục theo12cảnh, sơ đồ hai chặng, mô hình cổ chai có nhãn giả định, băng tần, tín hiệu, so gần/xa, đường nối mesh/Ethernet, cấu hình và recap.12still trong `remotion/out/designs-v2/` đã xem. Đã sửa chân/nguồn chồng và bàn tay bị panel che, tách hai mũi tên SVG, thay biểu tượng khóa bằng SVG thật. Thêm cue riêng cho số ởcảnh3 và checklistcảnh12; các cảnh chưa có audio chưa có timing thật.
- Bản lời **giữ nguyên v1/hash** từ00:00. Soát trước thu tại `docs/episodes/01-wifi-pre-tts-review-v1.md`, commit trướcVSP **`0c832ac`**. Chỉ thu **cảnh1**,8request/8WAVcache,101từ,30,962giây sau hậu kỳ0,9/nghỉ0,7. Không có timeout/lỗiTTS và không gửi lại đoạn nào. Cảnh2–12 chưa thu.
- Gốc: `videos/01-wifi-khac-goi-mang/giong/canh-01.goc.wav` SHA256 `da0e05e7b48e383f7aed09b2da062edaf0167742cc73c73811f6775a6de51b1f`; `.goc.mp3/.goc.json`, bản hậu kỳ `.mp3/.json` và `.vsp/canh-01/` đều giữ nguyên. Voice `vi-thai-son`, model `vieneu-v3-turbo`. WAV/hash đúng manifest; transcript101từ trước/sau hậu kỳ khớp.
- `scripts/build_wifi_render.py --scenes 1` chỉ đọc audio đã có, kiểm lời/timing rồi build `remotion/out/wifi-review-scenes-1.json`. Chuyển phòngframe88, biểu tượng tảiframe155, nhịp câu hỏiframe311, sơ đồframe671. Các mốc là căn lời tự động cần đối chiếu bằng nghe; không gọi là đã xác minh đồng bộ bằng tai.
- MP4 dùng duyệt **`remotion/out/wifi-opening-review-v4.mp4`**,31,000giây,1920×1080/30fps,H264/AAC48kHz. SHA256 `788b1d19b5f380fce5ab6dbf4c292a9a028f2ca92dd66da676ef19f418c78339`. Đây là **cảnh mở đầu thật**, không phải video dài hoàn chỉnh. V1/v3 là bản dựng trước hậu kỳ và thay đổi hình có chủ đích; v2/v4 là MP4 hậu kỳ riêng, không ghi đè audio gốc/cache.
- Chuẩn hóa âm lượng2lượt trên MP4 riêng, đo chính AACv4: **−16,0LUFS / truepeak−2,5dBFS**, giải mã toàn file đạt.26khungMP4/3contactsheet đã xem cùng4khung đầy đủ và khung phụ đề cuối30,2giây; không thấy chữ/cơ thể bị cắt ở mẫu duyệt. Khung cuối trống phụ đề sau khi lời đã hết, không thiếu câu cuối trong props. Hồ sơ: `docs/qa/2026-10-29-05h30-opening-v1.json`, log và ảnh tại `remotion/out/opening-qa-v4/`.
- **Chưa kiểm nghe.** ASRđộc lập `small` cục bộ (không đưa transcript) có8nhóm nhận khác, ví dụ `sóng→sống`, `Tư→tôi`, `tách từng chặng→tất cảnh chặn`; xem `remotion/out/scene1-independent-asr.json`. Có thể do ASR/giọng địa phương hoặc TTS, **chưa đủ kết luận audio đọc sai**. Không sửa lời/audio hoặc tự thu lại. Cần người nghe toàn31giây, nhất là10–18giây và22–25giây. Runtime chưa có công cụ nghe trực tiếp; không biến ASR thành “đã nghe đạt”.
- Hai thumbnail1280×720 dưới2MB: `wifi-thumbnail-A-v2.png` / `wifi-thumbnail-B-v2.png` trong `remotion/out/`; A ngạc nhiên cầmrouter, B suy nghĩ vàrouter. Đã sửa fontweight900 gây ký tự Việt lẫn kiểu chữ; bản700 đọc rõ. Dùng câu hỏi có căn cứ, không ép số giả cho khuônA→B. **Chưa chạy Test&compare**, chưa có bản thắng; A là mặc định đề xuất.
- Metadata tại `config/episodes/01-wifi-khac-goi-mang.json`, mô tả201ký tự đã kiểm, chưa cóVideoID/giờđăng. Hai khung11:30/19:30 vẫn là giả thuyết. Short chưa tạo do chưa có đoạn giải thích đủ điều kiện đã ngheQA.

**Việc chờ mới:** chủ kênh/người có khả năng nghe kiểm bản31giây cụ thể trước khi dùng giọng này cho cả tập. Khi chưa có trả lời hoặc cùng điều kiện chưa đổi, các heartbeat sau im lặng; không gọiTTS/render/upload lại và không mởvideo mới. Khi giọng được nhận xét đạt, tiếp các cảnh2–12 đúng lời/cache/phiên bản; vẫn phải kiểm nghe toàn audio/thành phẩm sau đó, không coi nhận xét cảnh1 là duyệt cả tập. Nếu người nghe báo lỗi, kiểm đúng đoạn/cache và lưu phương án trước mọi thay đổi; không tự gửi lại để vượt lỗi.

**Phần còn dở sau cổng nghe:** hoàn thiện chuyển động/hình theo36neo cho phần còn lại, thu/căn/QA11cảnh còn lại, timeline thật, preview60giây/bản dài/Short, QA đầy đủ rồi mới kiểm đúngChannelID và chuẩn bị tải/hẹn. Bố cục12still không phải12cảnh audio/video đã xong. LỗiPyAV khi chạyASR tạm đã xử lý bằngFFmpeg→PCM cục bộ, không đổi provider hay thu lại.

## Checkpoint 29/10 — lượt00:00, tập01 Wi-Fi đang sản xuất

**Tiếp đúng slug `01-wifi-khac-goi-mang` lúc05:30; không mở đề tài mới.** Không có worker/render/TTS còn chạy khi kết thúc lượt này. Không thao tác Brave/Studio hoặc đọc analytics trong lượt cục bộ này; binding vẫn theo lần xác minh28/10, phải kiểm lại Channel ID trước lần truy cập kênh kế tiếp.

- Nghiên cứu8 nguồn chính thức Google/NETGEAR/ASUS/TP-Link/Apple/Ofcom/Microsoft, ghi phạm vi tại `docs/episodes/01-wifi-khac-goi-mang-sources.md`. Không thu thập lại nguồn cũ khi tiếp tục nếu chưa cần kiểm thay đổi.
- Bản lời v1 `kich-ban/01-wifi-khac-goi-mang.md`:12cảnh,7068ký tự lời, parse/dry-run đạt; **chưa gọi VSP, chưa khóa audio**, thời lượng tập thật chưa có. Tình huống600→900Mbps/+50% và chặng20Mbps là mô hình giả định, đã kiểm bằng Decimal; không dùng làm số đo hay hứa tốc độ. Mô tả thật dự kiến201ký tự gồmURL/khoảng trắng.
- Shot plan tại `docs/episodes/01-wifi-khac-goi-mang-shots.md`:36neo câu nguyên văn, mỗi neo tìm thấy đúng một cảnh. Chưa gán thời gian giả. Còn phải tạo/duyệt nhân vật, hình nền và các composition mặt bằng/cổ chai/mesh/checklist.
- Renderer mới `remotion/`, prototype v0.1.0:Remotion4.0.539,React19.3.1,TypeScript7.0.2, lockfile đã lưu. Theme mới riêng, typecheck đạt. Chrome Headless Shell riêng dùng để dựng, không dùng phiên Brave của chủ kênh.
- `scripts/prepare_render_preview.py` stage avatar/audio mẫu **đã có**, không gọiTTS;45từ/6nhóm phụ đề lấy mốc từ14,807giây thật. Composition `ChuTu-TechnicalPreview` là15giây/450frame. Khung90/210/360 đã xem: chữ đúng dấu, không thấy tràn trong mẫu đã xem; không thay QA mọi cảnh của tập thật.
- MP4 thử tại `remotion/out/chu-tu-technical-preview-v1.mp4`:1920×1080/30fps,H264/AAC48kHzstereo,15giây,1619802bytes. Giải mã toàn file đạt. Audio đo trên MP4:−16,6LUFS,LRA1,9LU,truepeak−5,5dBFS; **chưa nghe bằng tai**, chưa đạt duyệt giọng/phát hành. Không tự loudnorm hoặc thu lại mẫu chỉ để làm đẹp kết quả thử.
- QA/hashes tại `docs/qa/2026-10-29-00h-preview-v1.json`; SHA256 lời `0549de6b2f86ad28d6ec7d77388367cb86ca8e9e719a0b4cdc480984b7056df5`, MP4 `1a4350d8109822f40574f7f32e007c64efcdc23913291f2dc19a5ea24f27a921`. Log đo tại `remotion/out/preview-audio-measure.log`. Source/code/lời được commit trước mọi lần VSP sau này; xem git log để lấy commit mới nhất.

**Lượt05:30 tiếp:** đọc `work/production-state.json`, kiểm tiến trình, hoàn thiện character sheet/ảnh sạch chữ và composition theo shot plan; duyệt cue/lời/nguồn lần cuối, ghi phiên bản/commit trước VSP. Dùng cache khi đã có audio. Sau đó mới nghe/QA audio, gắn neo vào mốc từ, still/preview60giây/fullrender/Short/thumbnail và QA thành phẩm. Giới hạn runtime về nghe phải ghi trung thực; ASR không giải quyết giới hạn này.

**Chưa có:** audio tập01, timeline thật, bộ cảnh hoàn chỉnh, thumbnail thành phẩm, MP4 phát hành, upload, videoID hoặc lịch công khai. Không hẹn đăng vì vừa xong prototype; các slot trong LICH-VAN-HANH vẫn là giả thuyết, chưa có dữ liệu thử. Không sửa automation, không mở kênh khác, không động vào Bác Sáu.

Lỗi type tuple khi import JSON đã sửa bằng kiểm đúng3nhãn; typecheck lại đạt. Máy Windows thiếu tzdata ở scriptQA tạm đã xử lý bằngUTC+7 cố định choAsia/Saigon; không phải lỗiTTS. Không còn lỗi mới cần chủ kênh xử lý.

## Checkpoint mới nhất — mô tả, keywords và banner đã lưu/xác minh

Đúng Studio Chú Tư, Channel ID `UCMDWcpFr6SZ1Nk7_ffVGTVA`. Mô tả224 ký tự đã Publish; toast Changes published / All changes saved, trở lại Profile đọc đủ đúng nội dung. Keywords đã lưu14 cụm, mở lại Settings → Channel → Basic info xác nhận đủ, bộ đếm200/500. Chi tiết tại `docs/SEO-KENH.md`, cấu hình `config/channel-seo.json`.

**Banner đã công khai.** Chủ kênh chọn file và bấm Open; Codex kiểm crop Viewable on all devices, Done và Publish. Tải lại tab công khai thấy banner đúng cùng mô tả mới; lưu ảnh `outputs/chu-tu-kenh-da-hoan-thien.jpg` của chat. Picker đã đóng, không còn chờ thao tác này. Watermark150×150 vẫn là tài sản tùy chọn cục bộ, chưa upload; không gọi đây là thiếu sót SEO bắt buộc. Extension chưa có file URLs; không tự đổi quyền, các lượt tải file khác có thể cần picker do người dùng chọn.

Browser extension xác nhận Brave **Person 1**, browserID3, tabStudio169036110; HWND3999536 là cửa sổ riêng nhưng profile dùng chung. Đã cập nhật binding/BRAVE. Các ID có thể đổi; Channel ID là kiểm tra bắt buộc. Home có0 video/Short/playlist nên trailer và playlist có nội dung còn chờ video đầu tiên. Không tạo lại kênh.

## Checkpoint mới — kênh đã tạo và trang công khai đã xác minh

Chủ kênh xác nhận “Xác nhận tạo kênh”; Create channel được bấm một lần. Sau phản hồi đầu “This channel does not exist”, tải lại đã hiện đúng **Chú Tư Rành Đồ / @ChuTuRanhDo** tại **https://www.youtube.com/channel/UCMDWcpFr6SZ1Nk7_ffVGTVA**. Đã lưu Channel ID thật vào binding. Tài khoản quản lý hiển thị cả Bác Sáu và Chú Tư; đang chuyển đúng danh tính Chú Tư để chuẩn bị Customization. Banner/mô tả chưa công khai ở checkpoint này. Các mục “chưa tạo/chưa có Channel ID” phía dưới là lịch sử đã được xác minh này thay thế; không tạo thêm kênh.

## Chỉ đạo chủ kênh

- Codex **tự viết kịch bản và sản xuất trọn quy trình cho kênh mới**. Chủ kênh đã trả lời trực tiếp; phân công này không áp sang Bác Sáu.
- Sản xuất **00:00**, nếu còn dở thì **05:30** tiếp tục. Mọi giờ Asia/Saigon (UTC+7). Giờ công khai do Codex nghiên cứu và thử riêng.
- Thumbnail ưu tiên số A → THẬT RA → số B, biểu cảm mạnh, đồ vật cụ thể và Test & compare. Mô tả mọi video dưới 300 ký tự. Thử 4–5 video dài/tuần trong 2 tuần.
- Chủ kênh giao mở Brave riêng, điền các trường tạo kênh có thể điền, làm avatar/ảnh bìa và lưu ID cửa sổ để sau này theo dõi/đăng đúng kênh.

## Dự án và lịch đã bật

- Repo cục bộ: `D:/Repo/chu-tu-ranh-do`, nhánh main, chưa có remote/push. Bản chia sẻ ở thư mục outputs của chat này.
- Khóa VSP nằm trong `.env` cục bộ được gitignore, không đưa vào ZIP/log/prompt. Đã cài requirements trong venv Python 3.12 riêng; model small tại `work/tts-models` trên D và `.env` trỏ cache đó.
- Heartbeat `ch-t-s-n-xu-t-l-c-00-00`: **ACTIVE**, mỗi ngày 00:00, cùng chat `01a1822b-fc56-7712-b9a9-0dd5778ef404`.
- Heartbeat `ch-t-ti-p-vi-c-d-l-c-05-30`: **ACTIVE**, mỗi ngày 05:30, cùng chat. Chỉ tiếp công việc dở của lượt đêm; đã xong hoặc đang chờ cùng điều kiện không đổi thì im lặng, không mở video mới.
- Đã đọc lại cấu hình lưu, kiểm đúng tên/trạng thái/giờ/chat. Không sửa lịch 10:00 Bác Sáu. Lịch mới có hiệu lực ở các mốc sắp tới sau khi tạo ngày 28/10; máy/app cần hoạt động cho lịch cục bộ.
- Chưa có video sản xuất/đăng từ hai lịch này; không nhầm “đã đặt lịch làm” với “đã làm xong”.

## Tạo kênh đã submit — chờ xác minh kết quả

- App `Brave`, cửa sổ mới **3999536**. Đã lưu `config/channel-binding.json` và `docs/BRAVE.md`.
- Form tại `https://www.youtube.com/account`, mở từ link tạo kênh. Tên **Chú Tư Rành Đồ**, handle **@ChuTuRanhDo** được đánh dấu xanh. Avatar mới đã upload, crop Done và hiển thị đúng trong form.
- Form cho biết Brand Account sẽ do **bacsausosach@gmail.com** quản lý. Chủ kênh đã xác nhận trực tiếp **“Xác nhận tạo kênh”**; Codex bấm Create channel đúng một lần. YouTube chuyển tới `UCMDWcpFr6SZ1Nk7_ffVGTVA` nhưng trang đầu báo “This channel does not exist.” Đang kiểm tra cập nhật, **chưa coi là đã xác minh thành công và không tạo lại**. `channel_id` vẫn null; ID trả về lưu ở `candidate_channel_id`.
- Đã có xác nhận ở đúng bước và submit một lần. Kiểm URL/Studio/danh sách kênh để xác định trạng thái trước khi làm tiếp; không bấm Create channel lần hai để thử.
- HWND là tạm thời; cửa sổ mới dùng chung profile/phiên với cửa sổ nguồn. Tên profile bền vững chưa xác định. Sau tạo, lưu Channel ID/URL thật và đối chiếu trước mọi upload, metadata hoặc analytics.
- Không dùng cửa sổ **66974** (Studio Bác Sáu) hay **592278** (cửa sổ người dùng xem YouTube) cho Chú Tư.
- `config/channel-profile.json` có mô tả kênh 169 ký tự và đường dẫn nhận diện. Form tạo chỉ có tên/handle/avatar; **mô tả và banner chưa được đưa lên Studio**.

## Nhận diện đã làm và kiểm

- `assets/branding/avatar-chu-tu.png`: 1254×1254, Chú Tư áo xanh chàm, kính tròn, cầm kính lúp, không chữ.
- `assets/branding/banner-chu-tu-2560x1440.png`: 2560×1440, dưới 6 MB; tên/tagline đúng dấu, cùng nhân vật. Đã xem toàn ảnh và crop giữa 1540×422; đầu nhân vật, tên và tagline đủ trong vùng an toàn.
- Dùng image_gen tích hợp cho tạo/chỉnh nội dung; FFmpeg chuẩn hóa kích thước xuất. Không gọi Image API trả phí, không dùng nhận diện Bác Sáu. Prompt set ở `assets/branding/PROMPTS.md`, nguồn/hash ở `provenance.json`.
- Avatar đã hiện trong form; banner vẫn là file cục bộ vì kênh chưa tạo.

## Kiểm tra kỹ thuật

- 10 test tự động đạt trong venv mới, dry-run đạt. Đã kiểm thêm forced alignment từ một WAV mẫu có sẵn bằng model cục bộ; không gọi TTS mới.
- Starter từng kiểm VSP thật bằng mẫu 202 ký tự/45 từ, MP3 khoảng 14,807 giây; timeline/SRT của kiến trúc gốc đọc được. Runtime chưa nghe bằng tai; cần nghe mẫu và QA thật trước sản xuất.
- **Chưa có renderer mới hoặc video hoàn chỉnh.** Cần tạo theme/composition/thumbnail/Short của Chú Tư, không coi công cụ TTS là cả hệ thống dựng.

## Việc tiếp theo

1. Sau xác nhận, tạo kênh hoặc kiểm kết quả nếu chủ kênh tự tạo. Ghi Channel ID, URL/handle thật và cập nhật binding; kiểm đúng kênh mới.
2. Mở Customization đúng kênh để điền mô tả và đặt banner đã chuẩn bị. Bước xuất bản UI tuân thủ xác nhận của công cụ; không tự động hóa đăng nhập, OTP, CAPTCHA hoặc xác minh.
3. Hoàn tất renderer Remotion mới, giữ hợp đồng dữ liệu TTS/timeline đã kiểm. Tạo bộ nhân vật đầy đủ từ avatar tham chiếu khi sản xuất cảnh.
4. Codex nghiên cứu, viết và soát kịch bản đầu trong kho đề tài README; kiểm nguồn/phép tính rồi commit trước VSP. Không tái dùng kịch bản hoặc lời đọc đã khóa của Bác Sáu.
5. Theo `docs/LICH-VAN-HANH.md`, thử dài 11:30/19:30; Short thử riêng 12:00/20:00. Chưa có ngày đăng hoặc ID video thật. Không dùng 00:00/05:30 làm giờ công khai.

Chỉ báo thành phẩm mới, thay đổi có ý nghĩa, lỗi mới hoặc cần chủ kênh; cùng trạng thái chờ thì im lặng. Lượt 05:30 không mở việc mới khi lượt đêm đã xong.
