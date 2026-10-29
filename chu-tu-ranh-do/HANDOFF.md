# HANDOFF — Chú Tư Rành Đồ

Cập nhật **29/10/2026, 10:33, Asia/Saigon (UTC+7)**. Repo: `D:/Repo/chu-tu-ranh-do`. Chủ kênh yêu cầu viết bàn giao cho session tiếp theo. Lượt này ghi nhận phản hồi, kiểm hash và cập nhật hồ sơ; **không render/TTS/upload, không kiểm lại UI Brave**.

## 1. Chỉ đạo mới nhất: đã nghe cả hai, không còn chờ duyệt giọng

Chủ kênh trả lời trực tiếp **“Đã nghe cả hai, không thấy lỗi”** cho bản dài gần8phút và Short36giây được liên kết trong câu hỏi. Đây là kiểm nghe toàn bộ hai MP4, sau khi chủ kênh đã chốt giọng mở đầu “Giọng rõ, đọc đúng; tiếp tục dùng”. **Không hỏi lại cùng việc, không thu lại cảnh1–12.**

Hồ sơ: `config/episodes/01-wifi-listening-approval.json`, `config/voice-approval.json`, QA tập đã cập nhật. Người nghe là chủ kênh; agent không tự nhận đã nghe trực tiếp. Tình trạng “chờ nghe cả tập” trong tài liệu/bản xuất cũ đã hết hiệu lực. Bản package07:39 được giữ nguyên như snapshot cũ; ưu tiên HANDOFF và approval mới này.

**Còn làm:** xuất bản release bỏ nhãn BẢN DUYỆT/CHƯA ĐĂNG bằng nguyên audio/lời/timeline đã duyệt, QA file release cuối, kiểm đúng Studio rồi tải/hẹn theo quyền và công cụ. **Chưa có release master, upload, Video ID hoặc lịch công khai.** Nghe đạt không đồng nghĩa đã đăng hoặc được bỏ kiểm file cuối.

## 2. Đúng kênh, quyền và Brave

- Tên: **Chú Tư Rành Đồ**; handle **@ChuTuRanhDo**.
- Channel ID đã xác minh28/10: **UCMDWcpFr6SZ1Nk7_ffVGTVA**. URL: `https://www.youtube.com/channel/UCMDWcpFr6SZ1Nk7_ffVGTVA`.
- Tài khoản quản lý ở form: `bacsausosach@gmail.com`.
- Brave: **HWND3999536**, browserID3, Person1; tabStudio169036110, tabcôngkhai169036109. Đây là dấu vết cũ. Đọc UI mới và đối chiếu **Channel ID thật trước mọi thao tác ghi/analytics**. Không đoán qua tên cửa sổ. Cửa sổ riêng vẫn chung profile/cookie, không cô lập tài khoản.
- Không dùng HWND66974(Bác Sáu),592278(cửa sổ người dùng),3213608(Dấu Vết). Không sửa repo/tài sản/token/lịch của hai kênh khác.
- Chủ kênh giao Codex nghiên cứu, viết và sản xuất trọn quy trình Chú Tư; theo dõi và đăng đúng kênh mới trong khả năng công cụ. Nếu công cụ yêu cầu xác nhận bước xuất bản UI, chuẩn bị hoàn chỉnh rồi lấy đúng xác nhận cuối. Không hỏi lại quyền đã giao; không tự vượt yêu cầu thực tế của công cụ, đăng nhập/OTP/CAPTCHA/xác minh hoặc giành input người dùng.
- Không dùng OAuth/Drive/token kênh cũ. Không in/commit/đóng ZIP `.env`, API key hay secret. Khóa VSP đã có cục bộ, không cần lấy lại.

Hồ sơ SEO đã lưu/đọc lại28/10: avatar/banner, mô tả224ký tự,14keywords. Watermark150×150 là tùy chọn chưa upload. Trailer/playlist/Home chờ video công khai đầu; không tạo mục rỗng. Đọc `docs/SEO-KENH.md`, `config/channel-seo.json`. Picker từng thiếu fileURL permission/native không nhận input; không đổi quyền/CDP để vượt hạn chế, chỉ nhờ chọn đúng file khi thật sự mắc lại.

## 3. Tập01 đã hoàn thành phần nào?

Slug **01-wifi-khac-goi-mang**. Tiêu đề: **Gói mạng nhanh, vì sao Wi-Fi trong phòng vẫn yếu?**

- Kịch bản v1: `kich-ban/01-wifi-khac-goi-mang.md`,12cảnh,7068ký tự lời. SHA256 **0549de6b2f86ad28d6ec7d77388367cb86ca8e9e719a0b4cdc480984b7056df5**. Chốt/commit trước VSP; không thay lời hoặc số liệu đã thu chỉ để khớp hình.
- Nguồn8tài liệu chính thức Google Nest/NETGEAR/ASUS/TP-Link/Apple/Ofcom/Microsoft: `docs/episodes/01-wifi-khac-goi-mang-sources.md`. Shot plan36neo: `docs/episodes/01-wifi-khac-goi-mang-shots.md`. Đã có nguồn, không thu thập lại để làm trùng. Kiểm mới khi đổi khẳng định/phạm vi hoặc triển khai tính năng đang thay đổi.
- Ví dụ600→900Mbps/+50%, chặng Wi-Fi20Mbps là **mô hình giả định**, không phải đo thật. Nhãn giả định đã có trên hình, cue đúng thời điểm đọc; không đưa thành cam kết hay số đo thumbnail.
- Nhân vật riêng4tư thế `assets/episodes/01-wifi/character-sheet-v1.png`, nền `apartment-v1.png`; prompt/hash trong `PROMPTS.json`/`provenance.json`. Ảnh từ image_gen tích hợp, sạch chữ; sơ đồ/chữ/số do Remotion vẽ. Không dùng tài sản Bác Sáu.
- Đủ12cảnh audio, timeline, phụ đề cân câu, sơ đồ hai chặng/cổ chai/băng tần/tín hiệu/mặt bằng/router/mesh/Ethernet/bảo mật/recap; đã xem preview60giây trước full.

### Audio khóa và lỗi đã giải quyết

VSP **vi-thai-son / vieneu-v3-turbo**. Hậu kỳ speed0,9/pause0,7.100request markers đều có WAV;8request cảnh1 và92request cảnh2–12. Không có pending marker thiếu WAV. Chỉ VSP, không ElevenLabs/API ảnh trả phí.

Kho gốc: `videos/01-wifi-khac-goi-mang/giong/`: `canh-NN.goc.wav/.goc.mp3/.goc.json`, bản hậu kỳ `.mp3/.json`, cache `.vsp/canh-NN/`. WAV cảnh1 SHA256 **da0e05e7b48e383f7aed09b2da062edaf0167742cc73c73811f6775a6de51b1f**. Tất cả WAV gốc/hash và liên kết gốc→hậu kỳ→public đã được kiểm trước bản duyệt.

Lỗi DTW từ đầu đoạn có0duration/biên ở cảnh2,4 và các đoạn khác đã xử lý **cục bộ bằng WAV kề trước không chèn gap**, không thu lại/đổi chữ/bịa timing. `scripts/vsp_tts.py` giữ guard120ms, interval phải dương/không chồng; trace trong `.vsp/canh-NN/.alignment/`. Không chạy lại TTS cho “chắc”; lỗi render/căn lời dùng cache. ASR không thay kiểm nghe, nhưng chủ kênh đã nghe đạt bản hiện tại.

## 4. File đã duyệt và QA

MP4 dài: `remotion/out/wifi-long-review-v1.mp4`, **478,733giây**,1920×1080/30fps,H264/AAC48kHz stereo. SHA256 **508b53495f183af1f4f36b7ce45f9dbbcd24bb218b44e0ca8d333f78558de4f5**. MP4 sau AAC đo **−16,03LUFS / −2,26dBTP**.

Short: `remotion/out/wifi-short-review-v1.mp4`, **36,4giây**,1080×1920/30fps,H264/AAC48kHz stereo. SHA256 **74f440e1241990d45e2285a3308d597e33f87b94406adfc5c18bbd1da4faa9c5**. Đo **−14,07LUFS / −2,32dBTP**. Dùng toàn cảnh2 đã thu, đủ kết luận, không TTS riêng.

Full decode hai MP4 đạt. Duyệt64khung dài/10khung Short:12cảnh/36beat, cuối mỗi cảnh, trước/sau cue số và recap;4spotcheck nguyên cỡ. Không thấy tràn chữ/che người ở mẫu xem. Typecheck đã đạt;17test Python đạt với `PYTHONUTF8=1`. QA: `docs/qa/2026-10-29-episode01-full-review-v1.json`; ảnh/index: `remotion/out/full-qa-v1/`. Không cần render lại chỉ để kiểm những file này.

**Cả hai MP4 có nhãn BẢN DUYỆT/CHƯA ĐĂNG, không tải nhầm lên kênh.** Chủ kênh đã kiểm nghe chính hai hash trên. Mọi bản release mới phải giữ lời/audio đã duyệt và được QA file cuối; nếu thay tiếng/lời thì không tự nhận xác nhận cũ phủ phần thay đổi.

Gói xem đã có tại:
`C:/Users/ADMIN/Documents/Codex/2026-10-28/ban/outputs/chu-tu-ranh-do/2026-10-29-tap01/`

Gồm hai MP4, `wifi-long-vi.srt`, `wifi-short-vi.srt`, hai thumbnail, kịch bản/nguồn/metadata/QA/contactsheet/manifest. Snapshot này chưa ghi phản hồi nghe mới; approval kèm bàn giao cập nhật là bản ưu tiên. Không sửa package cũ khiến manifest cũ sai.

## 5. Xuất release tiếp từ đúng timeline

Renderer: `remotion/`, Remotion4.0.539/React19.3.1/TypeScript7.0.2, Node modules và lockfile sẵn. Không nâng dependency hoặc cài lại khi không cần. Máy16GB RAM; long concurrency2, Short1, render lần lượt tránh OOM.

- Long composition: **ChuTu-Wifi-Video**. Props đã kiểm: `remotion/out/wifi-review-scenes-1-2-3-4-5-6-7-8-9-10-11-12.json`; SRT/audit cùng basename.
- Short composition: **ChuTu-Wifi-Short**. Props: `remotion/out/wifi-short-review-props-v1.json`.
- Audio stage tại `remotion/public/wifi/canh-NN.mp3` khớp audio khóa. Không gọi `tao_giong.py` khi chỉ xuất release.
- Tạo **props/file output mới có phiên bản**, đặt `review:false` ở cấp gốc cho cả hai, giữ mọi scene/data/caption/cue/frame. Không chỉnh props/bản duyệt gốc.
- Dựng video release riêng bằng cùng composition/audio. Audio của render thô chưa có mức loudness đã duyệt: có thể mux **AAC đã chuẩn hóa từ chính MP4 duyệt tương ứng** vào video release để giữ âm thanh chủ kênh đã nghe, rồi kiểm timestamp/duration/decode/mức âm lượng. Hoặc hậu kỳ ra bản riêng và đối chiếu rõ audio nguồn; không chuẩn hóa chồng nhiều lần.
- Kiểm final MP4: không còn nhãn duyệt, đủ đầu/cuối/caption/cue/nguồn, full decode, âm lượng dài−16±0,5/Short−14±0,5LUFS,TP≤−1,5dBTP. Lưu hash/QA của release; giữ review và nguyên WAV/cache.

Code hỗ trợ: `scripts/build_wifi_render.py` build props từ audio có sẵn, không synthesize. Các script `work/render_full_long_short.py`, `work/finish_full_review.py`, `work/package_full_review.py` đã chạy xong, có guard file tồn tại/đường dẫn cố định; **không chạy lại nguyên xi** để xuất release. `work/normalize_opening.py` chỉ dành opening cũ, không dùng cho full.

## 6. Metadata, thumbnail và tải/hẹn

`config/episodes/01-wifi-khac-goi-mang.json` có tiêu đề chính/dự phòng, mô tả thật **201ký tự** kể cả URL, tags và đề xuất audience/AI. Release-ready vẫn false vì chưa có master cuối. Không tự đánh dấu đã tải khi chỉ chuẩn bị metadata.

Hai thumbnail1280×720 dưới2MB đã duyệt:
- A: `remotion/out/wifi-thumbnail-A-v2.png` — “GÓI MẠNH / PHÒNG VẪN YẾU?”, biểu cảm ngạc nhiên/router, đề xuất mặc định.
- B: `remotion/out/wifi-thumbnail-B-v2.png` — “THÊM TIỀN MẠNG… / ĐÃ ĐÚNG CHỖ?”, suy nghĩ/router.

Chưa Test&compare, chưa winner. Dùng câu hỏi vì không có cặp số đo thật, không ép khuôn A→B. Khi video dài công khai và đủ tính năng, thử thumbnail only, giữ tiêu đề; kiểm điều kiện mới nhất rồi ghi trạng thái thực. Không công khai sớm chỉ để chạy test.

Trước upload: đọc đúng binding/liveStudio, chỉ chọn release MP4, khai báo tiếngViệt/audience/AI đúng bản cuối và hướng dẫn hiện tại. Chuẩn bị private/scheduled; nếu UI/công cụ yêu cầu chủ kênh xác nhận publish thì dừng đúng bước cuối đã chuẩn bị. API chỉ khi credential được cấp đúng kênh, không dùng token cũ. Sau tải đọc lại ID,HD processing,metadata,thumbnail,subtitles,privacy,publishAt.

Short: tiêu đề đã có nhưng description và Related video **chờ Video ID/URL dài thật**. Điền URL thật, đếm≤299ký tự, giữ điều kiện nội dung; URL mô tả không thay trường Related. Chỉ hẹn Short sau video dài công khai theo kế hoạch. Chưa có upload nên không điền ID/URL giả.

## 7. Nhịp vận hành và tránh hai session ghi cùng tài sản

Sản xuất **00:00**, tiếp dở **05:30**; Asia/Saigon. Thử4–5dài/tuần trong2tuần, cơ sở4. Long11:30/19:30 và Short12:00/20:00 là **giả thuyết**, không phải tối ưu đã chứng minh. Theo slot trong `docs/LICH-VAN-HANH.md`, chỉ gán ngày khi releaseQA/kênh đủ; nếu trễ dời slot, không public ngay lúc render xong. So24h/72h/7ngày cùng tuổi video, chưa có dữ liệu để tuyên bố thắng.

Automation đã ghi ACTIVE trong `config/automation-binding.json`, thuộc chat gốc `01a1822b-fc56-7712-b9a9-0dd5778ef404`:
- `ch-t-s-n-xu-t-l-c-00-00`.
- `ch-t-ti-p-vi-c-d-l-c-05-30` — chỉ tiếp cùng việc dở, không mở tập mới.

Lượt này **không sửa/di chuyển/tạo lịch** và không kiểm lại scheduler trực tuyến. Session nhận bàn giao không tạo lịch trùng, không tự nhận đã sở hữu hai lịch này. Đọc state/process trước mỗi bước; chat gốc còn có thể được lịch đánh thức. Một worker cho một tài sản; ghi checkpoint ngay khi bắt đầu/kết thúc và phối hợp quyền nếu thực sự cần chuyển lịch. Không sửa automation Bác Sáu/Dấu Vết.

Theo state và inventory tiến trình kiểm lúc bàn giao: **không có worker sản xuất Chú Tư đang chạy**.70862/90734 đã hoàn tất từ trước. `work/production-state.json` đã bỏ chờ chủ kênh và chuyển sang release_pending. Đây không phải worker chạy nền.

## 8. Trình tự nhận bàn giao

1. Đọc `AGENTS.md`, HANDOFF này, quy trình, lịch, BRAVE/binding và state. Kiểm Git/process mới trước ghi. Không quay lại cổng chờ nghe đã được chủ kênh giải quyết.
2. Kiểm hash hai file duyệt so approval; giữ toàn bộ audio/lời. Tạo props release mới, render lần lượt/QA final, cập nhật config/QA/hash.
3. Xác minh Studio đúng Channel ID; chuẩn bị upload/hẹn và mọi trường thực tế; xin đúng xác nhận cuối nếu công cụ bắt buộc, không hỏi lại quyền cũ.
4. Có ID thật thì hoàn tất Short/Related, phụ đề,thumbnail,end screen phù hợp,readback/backup. Ghi lịch Asia/Saigon và kết quả xác nhận.
5. Cập nhật HANDOFF/state sau mỗi mốc; không bắt đầu tập mới trước phần dở cần thiết. Không nói còn worker chạy sau lượt nếu thực tế đã dừng.

Git trước cập nhật bàn giao: **99457f3** (renderer/QA full), **f5a109e**, **3d56330** (căn lời local), **9dfba93** (chốt giọng cảnh1); pre-TTS lời **0c832ac**. Code/config/docs ở Git, media/cache cục bộ; không đưa secret/media nặng vào commit. Lịch sử HANDOFF cũ lưu `docs/history/HANDOFF-2026-10-29-before-full-listening-approved.md`.
