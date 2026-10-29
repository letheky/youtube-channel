# HANDOFF — Dấu Vết Thời Đại · Traces of Time

Cập nhật **29/10/2026, 11:32, Asia/Saigon (UTC+7)** theo yêu cầu chủ kênh “viết handoff”. Repo thực thi: **`D:/Repo/dau-vet-thoi-dai`**. Bản này thay thế các checkpoint cũ; lịch sử giữ tại `docs/history/`.

## 1. Kênh đã tạo thành công — KHÔNG TẠO LẠI

- Tên gốc: **Dấu Vết Thời Đại**. Tên dịch EN: **Traces of Time**.
- Handle thực tế: **@DauVetThoiDaiOfficial**.
- Channel ID: **`UCW_x25fRd3LXMAi5Nxq1y4g`**.
- Trang kênh: https://www.youtube.com/channel/UCW_x25fRd3LXMAi5Nxq1y4g
- Studio: https://studio.youtube.com/channel/UCW_x25fRd3LXMAi5Nxq1y4g/editing/profile
- Brand channel được tạo dưới **`bacsausosach@gmail.com`**. Form xác nhận rõ Gmail này quản lý; đã vào Studio đúng ID, đối chiếu Channel URL và thấy quyền Customize channel/Manage videos trên trang công khai.

Chủ kênh ban đầu đã xác nhận tạo kênh; khi handle ngắn bị chiếm, trả lời tiếp **“tạo lại để nó phụ thuộc vào gmail bacsau”**. Đã dùng handle mới còn trống ở trên. Không hỏi lại việc tạo hoặc tạo thêm bản khác chỉ vì đổi session.

**@DauVetThoiDai / `UCgk1lZuiaobS2qNtcRlwQ1w` là kênh khác, chưa xác minh chủ sở hữu, không phải binding dự án.** Không sửa/xóa kênh đó. Hai kênh Bác Sáu/Chú Tư cũng ngoài phạm vi. Binding lưu cả ba ID trong `do_not_modify_channel_ids`.

## 2. Hồ sơ đã lưu và việc ảnh bìa chưa xong

Đã Publish và kiểm lại sau tải lại Studio:

- Avatar la bàn/đồng hồ cát vàng trên nền navy, đúng file đã chuẩn bị.
- Mô tả VI **203 ký tự**.
- Ngôn ngữ gốc Vietnamese; translation English: tên **Traces of Time**, mô tả **213 ký tự**.
- **12 từ khóa**, đã Save rồi mở lại Settings đọc đủ 12; Studio báo **183/500**.

Nội dung chuẩn tại `config/channel-profile.json`. Trang công khai đã hiện avatar, handle và mô tả EN. Giao diện người xem đang dùng tiếng Anh nên tiêu đề công khai hiện **Traces of Time**; đây là bản dịch, không phải tên Việt bị thay mất.

### Ảnh bìa: chưa lưu thành công, cần tiếp đúng bước này

Chủ kênh **đã chọn** `banner-dau-vet-2560x1440.png` và bấm Open. Codex đã kiểm crop đúng: biểu tượng và tên VI/EN nằm trọn vùng “Viewable on all devices”. Đã bấm Done/Publish, nhưng **chuyển sang trang kênh trước khi có xác nhận lưu hoàn tất**. Khi kiểm lại, trang công khai không có banner và Studio vẫn hiện **Upload + hình placeholder**, không phải Change. Vì vậy **không được nhận là ảnh bìa đã công khai**.

Thao tác cuối quay lại trang Customization của đúng ID; không còn hộp Open hoặc crop đang chờ. Cần **chọn/tải lại banner**, không coi câu trả lời “Đã chọn ảnh bìa và bấm Open” trước đó là người dùng chưa làm. Nếu phải nhờ chọn lại, giải thích lượt lưu trước chưa được giữ, không quy lỗi cho người dùng.

Trình tự tiếp: Upload banner → chọn đúng file → kiểm crop → Done → đợi upload/preview xong và Publish sẵn sàng → Publish → **đợi xác nhận “Changes published”** → reload Studio đọc lại → kiểm trang công khai → lưu screenshot. Không chuyển trang ngay sau lệnh Publish như lượt trước.

### Giới hạn chọn file thực tế

- Browser filechooser `setFiles` bị từ chối vì extension Brave chưa được cấp **Allow access to file URLs**.
- Đã thử fallback native Open: hộp chọn hiện đúng thư mục nhưng helper từ chối click vì dialog con không khớp target window. Đã activate/refresh/thử lại một lần, vẫn lỗi `point ... is over brave.exe "", not target window ...`.
- Chủ kênh đã thao tác tay để tải avatar thành công và tải banner vào crop. Không tự đổi quyền extension hoặc dùng CDP/JS/URL thô để vượt hạn chế. Nếu công cụ của session mới vẫn thiếu quyền, chuẩn bị đúng picker/file rồi nhờ thao tác tay, sau đó Codex tự căn/lưu/xác minh.

## 3. Brave và trạng thái tiếp quản

- Brave extension **browser3 / Person 1**.
- Cửa sổ riêng mới: **HWND17236848**; browser window ID **169036166**.
- Tab dự án: **169036165**, một tab trong cửa sổ riêng; trang cuối là Studio Customization đúng Channel ID.
- Các ID là dấu vết, phải inventory/đọc UI mới trước thao tác. `config/channel-binding.json` và `docs/BRAVE.md` là binding hiện tại.
- HWND3213608 / tab169036153 thuộc luồng setup cũ của session gốc; không nhận làm tab hiện tại. Không điều khiển HWND66974(Bác Sáu),3999536(Chú Tư),592278(cửa sổ người dùng).
- Profile/cookie dùng chung giữa các cửa sổ. **URL/Channel ID phải khớp trước mọi lần ghi hoặc đọc analytics**, không suy từ tiêu đề cửa sổ hay avatar.
- Nếu browser connector báo tab thuộc session khác, không tranh quyền; tạo tab/cửa sổ riêng được phép rồi mở đúng URL đã biết. Không tạo lại kênh.
- Không tự động hóa đăng nhập, OTP, CAPTCHA, xác minh; không đổi quyền/bảo mật hoặc tranh input/Esc.

Feature eligibility đã đọc trực tiếp: **Standard Enabled**, **Intermediate Eligible**, **Advanced Eligible**. Eligible chưa phải đã kích hoạt/xác minh. Chưa kiểm được upload audio dub trên video thật; không hứa tính năng nhiều track đã có. Không tự mở kênh English thứ hai.

## 4. Chỉ đạo nội dung và phạm vi

Chủ kênh giao Codex nghiên cứu, viết, dịch và sản xuất **Việt–Anh**; các mảng lịch sử, xã hội, kinh tế, chính trị, giáo dục, văn hóa. Mỗi tập có một quốc gia/sự kiện/nhân vật/câu hỏi trung tâm rõ ràng. Thiên An Môn, chiến tranh Việt Nam–Mỹ, Napoleon là các ví dụ chủ kênh nêu, không phải lịch tập đã duyệt.

Cho phép **max effort khi viết kịch bản**: dùng mức cao nhất phiên hỗ trợ cho nghiên cứu/viết/phản biện; không tự nhận đã đổi model/effort khi không có cấu hình thật. Mở đầu bắt buộc **đoạn nhá + 2–3 câu hỏi trước intro**, mốc thiết kế20–35 giây; mỗi câu hỏi có mapping đến câu trả lời trong tập, không hứa bí mật thiếu chứng cứ.

Nghiên cứu bằng nguồn gốc/nguồn sơ cấp hoặc nghiên cứu uy tín; phân biệt dữ kiện, diễn giải và điều còn tranh luận. Một evidence pack dùng chung VI/EN; dịch có biên tập, giữ tên riêng, số liệu và mức chắc chắn. Mọi ảnh tư liệu có **nguồn trên cảnh + hồ sơ quyền từng file**; ghi nguồn không thay giấy phép. AI/tô màu/phục dựng phải ghi rõ, không dùng làm bằng chứng sự kiện. Không lấy Google Images/reupload làm tác giả hoặc giấy phép.

Mô tả từng ngôn ngữ **≤299 ký tự**, kể cả link/attribution. Nguồn đầy đủ cần trang nguồn công khai thật, chưa có thì không bịa URL. Attribution bắt buộc trong mô tả không được thay bằng link ngoài để ép vừa giới hạn. Thumbnail gắn với dữ kiện tập, không ép mẫu sốA/sốB của Chú Tư.

Không sửa/chạy worker/render/TTS/upload/token/automation của `D:/Repo/chu-tu-ranh-do` hoặc `D:/Repo/bac-sau-so-sach`; Chú Tư do session khác làm. Không tự gửi lệnh sang chat khác. Có thể chỉ đọc công cụ VSP generic ở Chú Tư làm tham khảo theo bàn giao cũ, nhưng phải tách code/ROOT/output riêng, không mang nhận diện/kịch bản/duyệt giọng/quyền kênh sang đây.

## 5. Nhận diện, intro/outro và nhạc

Trong `assets/branding/`:

- `avatar-dau-vet.png`:1254×1254, đúng ảnh đã Publish; SHA256 `1E45254BAF913CCE9D55B34C4EB4CF1ED4ED670166298DD929D72CCCF249B231`.
- `banner-dau-vet-2560x1440.png`:2560×1440, **file banner đúng cần tải lại**; SHA256 `8261C739131A9978B517A41A67614D20A5E24103CCB8625B248CB280720EB303`.
- `banner-original-v1.png` là bản cũ không chọn. Prompt/provenance đã có; nhận diện tổng hợp, không tư liệu lịch sử.

Trong `assets/motion/`:

- Master hình không audio: `intro-3s-master-silent.mp4`3,2 giây; `outro-12s-master-silent.mp4`12 giây, H2641080p/30fps.
- Bản ghép nhạc hiệu gốc: `intro-original-audio-v1.mp4` và `outro-original-audio-v1.mp4`, cùng thời lượng. Hình giữ từ master, audio stereo48kHz/AAC tự tổng hợp bằng code, không sample nhạc bên thứ ba.
- Đã decode toàn bộ/kiểm frame/thông số. Đo AAC: intro−20,01LUFS/−10,45dBTP; outro−20,00LUFS/−9,89dBTP. **Chưa nghe QA hoặc được chủ kênh duyệt nghe.** Outro có vùng chừa cho end screen, chưa là link tương tác.
- WAV gốc trong `assets/audio/`; nốt nhạc/hash/số đo ở `config/brand-audio-v1.json`, code `scripts/build_brand_audio.py`. Không chạy lại để kiểm hoặc ghi đè v1.

Ứng viên Audio Library **Cutscene Crush — Blue Deer Studio** đã kiểm popup license, không bắt buộc attribution, nhưng **chưa có file/hash/chưa nghe**. Download bị site-safety policy của công cụ chặn; **không lấy cùng file bằng URL thô/shell/CDP/browser khác**. Có thể nhận file người dùng tự tải và chỉ định. Nhạc hiệu tự tạo không phải Cutscene Crush; không đổi trạng thái trong `music-selection.json` để nhận là đã tải. Xem `docs/INTRO-OUTRO.md`; không chia sẻ nhạc thô bên thứ ba khi chưa có quyền.

## 6. Bản thử Napoleon và renderer

`episodes/01-napoleon-code-civil/` gồm `episode.json`, `BRIEF.md`, `script-vi.md`, `script-en.md`, `SOURCES.md`.

Đề tài Codex chọn để thử từ gợi ý Napoleon: **“Napoleon có tự viết Bộ luật Napoleon?”**. Bản thử hẹp về công trình tập thể/thống nhất luật tư/địa vị phụ nữ có chồng và thay đổi Điều213; chưa bao quát toàn bộ Napoleon, chưa phải tập đầu chủ kênh duyệt. 7 cảnh, 6 nguồn, mapping2câu hỏi. **Lời chưa khóa; chưa gọi VSP/chưa chọn giọng.**

E01 đã đọc PDF; một số nguồn khác mới đọc trích đoạn chỉ mục hoặc bản luật được chỉ mục, có timeout/403 khi mở trang. Trạng thái ghi thật trong JSON/BRIEF/SOURCES. Cần bổ sung bản nguồn sơ cấp đầy đủ trước khóa lời; nguồn năm2004 chỉ dùng cho lịch sử, không biến thông tin luật “hiện nay” của năm2004 thành thông tin2026. Chưa lấy ảnh chân dung/tranh/scan của bên thứ ba; không mặc định có quyền hình vì đã dẫn nguồn.

`scripts/render_documentary_preview.py` hiện dựng **storyboard thẻ chữ/sơ đồ đơn giản**, có nguồn trên cảnh, nhãn chưa thu giọng, hook trước intro. Chưa phải renderer phim tài liệu hoàn chỉnh với ảnh/bản đồ/chuyển động/voice alignment. Đã xuất still VI/EN; MP4 chỉ có VI:

- `work/napoleon-preview-v1/01-napoleon-code-civil-vi-unvoiced-preview-v1.mp4`: **74,233333 giây**, H2641080p/30fps+AAC, full decode qua.
- Phần thân là audio im lặng; **chỉ intro/outro có nhạc hiệu**. Không nói video đã thuyết minh.
- `visible-card-captions.srt` chép chữ trên thẻ, không phải phụ đề lời đọc đã căn. `preview-manifest.json` lưu timeline/probe/hash, upload_allowed=false.
- 8 unittest đã qua ở lượt xây dựng cho nguồn thiếu/sai, hook, câu hỏi không có trả lời, shot trùng, ảnh ngoài phạm vi, bản dịch thiếu và mô tả quá dài.

Môi trường đã dùng: Python3.12/Pillow, FFmpeg/FFprobe trên PATH, Arial Windows. Lệnh kiểm: `python -m unittest discover -s tests -v`. Xuất still vào thư mục mới: `python scripts/render_documentary_preview.py episodes/01-napoleon-code-civil/episode.json --output work/preview-new-version --stills-only`; thêm `--lang en` cho EN. Bỏ `--stills-only` mới render; không chạy lại nếu chỉ cần đọc/kiểm file đã có.

## 7. TTS, lịch và phát hành chưa làm

- **Chỉ dùng VSP**, không chuyển ElevenLabs/provider trả phí khác. Repo **chưa có `.env`** ở lượt bàn giao này, chưa có TTS pipeline riêng. Khóa VSP gốc được người dùng cấp trong `D:/Repo/free tts.txt`; không in nội dung, log, commit hoặc đưa vào gói bàn giao. Thiết lập riêng theo phạm vi đã giao, không sao chép OAuth/token YouTube/Drive kênh khác.
- Giọng VI chưa chốt cho kênh này; giọng/hỗ trợ EN chưa kiểm. Cần mẫu và nghe QA đúng khả năng, không lấy duyệt giọng Chú Tư làm duyệt giọng Dấu Vết. Khóa lời/commit trước VSP; giữ WAV/cache; lỗi căn lời/render sửa cục bộ, không tự thu lại. ASR không thay nghe.
- Chưa có video hoàn chỉnh/Video ID/upload/lịch public/API YouTube riêng được cấp. Chưa có trang nguồn công khai hoặc thư viện ảnh tư liệu đã duyệt quyền.
- **Chưa có automation riêng**.00:00/05:30 chỉ là mốc tham chiếu; lịch trong chat gốc là của Chú Tư, không nhận vơ hoặc sửa để dùng cho Dấu Vết. Chỉ tạo lịch riêng khi có yêu cầu phù hợp và ghi ID thật.
- Cần QA hình/nguồn/quyền/cue/subtitle/âm lượng/decode và nghe trước phát hành; audience/AI disclosure xét từng tập, không suy lịch sử/hoạt hình là nội dung trẻ em. Ưu tiên một video có track/subtitle/metadata VI–EN theo tính năng thật; chưa có dub thì giữ EN/subtitle, không tự mở kênh thứ hai.

## 8. Thứ tự làm tiếp và bằng chứng

1. Đọc AGENTS/HANDOFF/QUY-TRINH/BRAVE/binding; inventory mới, đối chiếu đúng Channel ID. **Không tạo lại kênh**.
2. Tải lại/lưu banner theo mục2, chờ toast lưu xong rồi mới điều hướng, readback và chụp trang công khai.
3. Nghe/duyệt nhạc hiệu; hoàn thiện evidence/kịch bản và layout tư liệu cho tập đầu. Không gọi prototype thẻ chữ là video hoàn chỉnh.
4. Thiết lập VSP riêng, kiểm VI/EN, khóa lời, giữ audio/cache, căn timeline/subtitle theo audio thật; QA rồi mới chuẩn bị upload/hẹn theo đúng kênh và quyền đã có.
5. Sau mỗi mốc lưu HANDOFF/config/hash/version, trạng thái thật và lý do chờ; không báo có worker chạy nếu không có.

Không có worker Python/FFmpeg/Node của dự án đang chạy ở lượt kiểm bàn giao. Git local/main, chưa remote/push. Các commit gần nhất: `98ebe53` (nhạc hiệu/renderer/pilot), `af3ec08` (tạo kênh và hồ sơ song ngữ); commit bàn giao mới tạo sau khi cập nhật tài liệu.

Output session này: `C:/Users/ADMIN/Documents/Codex/2026-10-29/check-repo-dau-vet-thoi-dai/outputs/dau-vet-thoi-dai-2026-10-29/`.

- `channel-created.png`: lúc mới tạo, **trước đặt avatar**, không phải ảnh hồ sơ cuối.
- `channel-keywords-saved.png`: bằng chứng12 keywords sau lưu/mở lại.
- `channel-feature-eligibility.png`: Standard Enabled/Intermediate–AdvancedEligible.
- `channel-profile-pending-avatar.png`: draft cũ, không dùng như trạng thái hiện tại.
- Các preview intro/outro/Napoleon, scriptVI/EN/nguồn vẫn ở output này. Không bao gồm token/key/.env.

Đọc `START-NEXT-SESSION.md` nếu cần prompt tiếp quản ngắn. `docs/CHECKPOINT-2026-10-29.md` và `config/channel-observation-2026-10-29.json` là hồ sơ **trước tạo kênh**, không dùng để suy Channel ID hiện vẫn null.
