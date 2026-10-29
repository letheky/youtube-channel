# HANDOFF — Video #1: đổi sang nhịp "mỗi câu một ảnh"

> Đọc `AGENTS.md` trước. Tài liệu này mô tả **trạng thái hiện tại** và **việc cần làm tiếp**.
> Bàn giao ngày 17/10/2026.

## Hoàn tất ngày 17/10/2026

- Đã chia 236 shot, trung bình 6,05s (4,53–7,62s), phủ đủ words. Có kiểm tra giữ prompt/keyword/ref khi chạy lại và từ chối đổi ranh giới im lặng.
- Đã viết đủ 226 prompt ảnh mới; 10 shot dùng lại ảnh cảnh. 118 shot có ref Bác Sáu, 121 keyword.
- Đã thêm `--shots --xuat-codex`, xuất CODEX.md theo nhóm tối đa 25 ảnh, chỉ ảnh thiếu; kiểm tra Python xác nhận không gọi API.
- Đã nối shot vào timeline/Remotion: fallback ảnh cảnh/nền giấy, Ken Burns 1,00–1,06, crossfade sáu frame, keyword pop-in tự ẩn khi overlay hiện, thanh chương + ĐĂNG KÝ cao 48px, phụ đề bottom 88px.
- Typecheck đạt; 3 kiểm tra Node và 2 kiểm tra Python đạt. Đã render/xem lại đủ 21 still khi đã đủ ảnh: 12 khung giữa cảnh, 5 điểm ngẫu nhiên, keyword/crossfade/outro. Fallback ảnh cảnh/nền giấy đã kiểm tra riêng khi ảnh còn thiếu.
- Đã render thành công bản thử 60 giây 1920×1080, 30fps, H.264/AAC: `C:/Users/ADMIN/Documents/Codex/2026-10-16/ch/outputs/shot-qa/preview-60s.mp4`. Không có khoảng lặng >2,5s trong đoạn thử. Xem still ở `outputs/shot-qa/` của chat này.
- Bộ FFmpeg/FFprobe kèm Remotion crash trong sandbox Windows; dùng runtime FFmpeg 9 hệ thống tại `C:/Users/ADMIN/Documents/Codex/2026-10-16/ch/work/remotion-binaries` và preload `remotion/scripts/ffmpeg9-compat.cjs`. Hướng dẫn trong `remotion/scripts/SHOTS.md`.
- Đã tạo đủ 226 ảnh mới bằng image_gen tích hợp, lưu thật tại `D:/Repo/bac-sau-so-sach/videos/01-tra-sua-100-ly/anh/shots/<id>.png`. Cùng 10 ảnh dùng lại, audit xác nhận 236/236 ảnh, thiếu 0, lỗi 0; cả 236 ảnh đều giải mã được. Đã sửa các lỗi thấy khi duyệt như tay thừa, dấu góc, nhân vật quá nhỏ tuổi, sai đạo cụ và ký tự trên máy tính/đồng xu. Timeline đã build lại; CODEX.md còn 0 ảnh thiếu.
- Đã render toàn bộ từ source hiện tại: 43.331 frame, 1920×1080, 30fps, H.264/AAC stereo 48kHz, thời lượng 24:04,4. Loudnorm hai lượt; đo lại MP4 cuối: -16,18 LUFS, true peak -1,50 dBTP, LRA 4,80. Trước AAC dùng TP=-1.9 để bù đỉnh tăng sau mã hóa.
- Silencedetect -45dB/2,5s: chỉ 1 đoạn cuối từ 1433,480s đến 1444,400s (10,920s), không có khoảng lặng dài bên trong. Đã xem thêm khung trích trực tiếp MP4 ở đầu/giữa/outro. Hash 49 file giọng không đổi; thumbnail không đổi.
- Bản cuối đã thay `videos/01-tra-sua-100-ly/01-tra-sua-100-ly.mp4`; bản cũ giữ ở `01-tra-sua-100-ly-ban-cu.mp4` cùng thư mục. Hash bản repo khớp bản giao tại `C:/Users/ADMIN/Documents/Codex/2026-10-16/ch/outputs/01-tra-sua-100-ly.mp4`. Minh chứng: `outputs/shot-qa/final-pass/`, `final-video/`, `final-video-check.json`, `png-check.json`, `image-audit.json` trong chat này.
- Đã commit theo bước từ a0a218e đến f5eda42, gồm code, prompt, kiểm tra và hướng dẫn tái dùng. Các thay đổi có sẵn khác trong working tree vẫn được giữ; không commit ảnh/video/giọng hay bí mật.

Các yêu cầu và phạm vi bên dưới được giữ để tham chiếu; nhiệm vụ đổi nhịp hình đã hoàn tất. Các việc ngoài phạm vi ở mục 5 vẫn để mở.

## 1. Trạng thái hiện tại (đã kiểm tra)

| Thành phần | Trạng thái |
|---|---|
| Kịch bản `kich-ban/01-tra-sua-100-ly.md` | Xong, 12 cảnh. Đã sửa 2 lỗi số (cảnh 5: "22 ngàn", cảnh 10: "lỗ hơn 13 triệu") |
| Giọng `videos/01-tra-sua-100-ly/giong/` | Xong 12 cảnh, `eleven_v4`, giọng "Hung" (Voice ID trong `.env`), tốc độ 0,9 + nghỉ 0,7s giữa đoạn. Tổng 23:54 |
| Ảnh `videos/01-tra-sua-100-ly/anh/` | 226 ảnh shot mới + 10 ảnh cảnh dùng lại, đủ 236 shot. Nguồn prompt: `kich-ban/01-tra-sua-100-ly.shots.json`; audit không thiếu ảnh |
| Nhân vật `assets/nhan-vat/bang-nhan-vat.png` | Xong, dùng làm ảnh tham chiếu |
| Remotion `remotion/` | Composition `Video-01`, `Thumbnail-01`, `KetSo`. Ken Burns, phụ đề karaoke, 15 overlay bám cue, biểu đồ hòa vốn, outro 10s |
| Bản render | `01-tra-sua-100-ly.mp4` 24:04,4, 1080p30, −16,18 LUFS, −1,50 dBTP, đủ 236 shot; bản cũ ở `01-tra-sua-100-ly-ban-cu.mp4` |
| Đăng tải | `dang-tai.md` (tiêu đề, mô tả có chương, thẻ, checklist), `phu-de.srt`, `thumbnail-final.jpg` |

**Vấn đề chủ dự án nêu:** quá ít ảnh — 2,5 phút mới đổi ảnh. Kênh tham chiếu ([Anh Ba Tài Chính](https://www.youtube.com/@AnhBaTaiChinh-88)) đổi ảnh **mỗi 4–6 giây** (gần như mỗi câu một ảnh), ảnh tĩnh zoom nhẹ, có **chữ to tóm ý** trên ảnh ("NHU CẦU BỀN VỮNG", "KIỂM SOÁT DÒNG TIỀN"), **nhãn chương góc dưới trái** ("03: CỬA HÀNG…"), **nút ĐĂNG KÝ cố định góc dưới phải**.

## 2. Mục tiêu
Video #1 có nhịp hình giống kênh tham chiếu, giữ nguyên giọng, phụ đề, overlay số liệu:
- Mỗi **shot 5–7 giây** (≈ 230–250 shot cho 24 phút), mỗi shot một ảnh riêng khớp nội dung câu đang đọc.
- Mỗi shot có thể có **keyword** (2–5 chữ, VIẾT HOA) hiện to trên ảnh.
- Thanh dưới: nhãn chương trái + nút ĐĂNG KÝ phải, suốt video (trừ outro).
- Hệ thống phải **tái dùng cho video #2, #3…**, không hard-code riêng video 1.

## 3. Việc cần làm (theo thứ tự)

### Bước 1 — Chia shot (deterministic, lưu lại)
Tạo `remotion/scripts/build-shots.mjs <slug>`:
- Đọc `videos/<slug>/giong/canh-XX.json` (`words[]` có `start`, `end`).
- Tách câu (dấu `. ? ! : ; …` hoặc lặng > 0,5s), gộp câu ngắn tới **≥ 4s**, tách câu dài **> 8s** ở dấu phẩy gần giữa nhất. Mục tiêu trung bình 5–7s. Hằng số đặt đầu file (`SHOT_MIN=4`, `SHOT_TARGET=6`, `SHOT_MAX=8`).
- Ghi **`kich-ban/<slug>.shots.json`** (file nguồn, có commit):
  ```json
  [{ "id": "canh-04-03", "scene": 4, "from": 41, "to": 58,
     "text": "Bác tính trung bình, một ly trà sữa dùng nguyên liệu tử tế…",
     "keyword": "", "ref": false, "prompt": "" }]
  ```
  `from`/`to` = chỉ số chữ trong `words[]` của cảnh. Thời gian lấy lại từ `words` lúc build timeline (không lưu giây, vì hậu kỳ giọng có thể đổi tốc độ).
- **Chạy lại không được xóa** `prompt`/`keyword`/`ref` đã viết: merge theo `id`; nếu ranh giới shot đổi thì báo ra màn hình, không ghi đè im lặng.
- Shot đầu mỗi cảnh (`canh-XX-01`) **dùng lại ảnh cảnh hiện có** (`anh/canh-XX.png`) nếu có → để `prompt` rỗng, thêm `"image": "anh/canh-XX.png"`.

### Bước 2 — Viết prompt + keyword cho từng shot
Điền `prompt`, `ref`, `keyword` trong `shots.json` (agent tự viết, đọc `text` của shot và ngữ cảnh cảnh).
- **Phong cách cố định** (giống ảnh hiện có, xem `anh/prompts.json`): *flat 2D cartoon, thick dark brown outlines, warm colors, simple cel shading, warm Saigon atmosphere, 16:9*. Kết thúc mọi prompt bằng: *No text, letters, numbers, logos or watermarks.*
- **~50% shot có Bác Sáu** (`ref: true`) với biểu cảm/hành động đúng câu: nheo mắt nghi ngờ, bấm máy tính, chỉ tay, lắc đầu, cười hiền, ngạc nhiên, gập sổ…
- **~50% ảnh minh họa** không có Bác Sáu: đồ vật/ẩn dụ đúng câu (ly trà sữa, hũ trân châu đổ bỏ, shipper, ông chủ nhà đếm tiền, hóa đơn điện, tường hoa giả, hai ly so sánh, đồng hồ cát, ống nước thủng lỗ = doanh thu chảy mất…). Đây là thứ làm video "động" như kênh tham chiếu.
- Hai shot liền nhau **không cùng bố cục**: đổi cỡ cảnh (toàn/trung/cận), góc nhìn, nhân vật/đồ vật.
- Ẩn dụ trực quan > minh họa sát chữ. Ví dụ "doanh thu là tiền đi ngang qua tay mình" → *a stream of banknotes flowing through an old man's open hands and away, none staying*.
- Không vẽ người thật, thương hiệu thật (Grab, Shopee, Circle K…) — dùng *generic green delivery jacket*, *generic app*.
- `keyword`: 2–5 chữ tiếng Việt VIẾT HOA tóm ý câu ("100 LY MỖI NGÀY", "CHIẾT KHẤU 25%", "KẺ GIẤU MẶT"). Để rỗng nếu câu không có ý đáng nhấn, hoặc khi overlay bảng/biểu đồ đang hiện (tránh rối). Khoảng 40–60% shot có keyword.
- Không cần viết `prompt` cho shot dùng lại ảnh cảnh.

### Bước 3 — Xuất danh sách cho Codex image_gen
Mở rộng `scripts/tao_anh.py` (giữ chức năng cũ):
- `--shots` : đọc `kich-ban/<slug>.shots.json`, đích lưu `videos/<slug>/anh/shots/<id>.png`, bỏ qua ảnh đã có.
- `--shots --xuat-codex` : ghi `videos/<slug>/anh/shots/CODEX.md` — danh sách ảnh **còn thiếu**, chia **nhóm 25 ảnh** (để chạy nhiều đợt theo giới hạn gói), mỗi mục: đường dẫn đích, có/không dùng ảnh tham chiếu, prompt.
- `--shots` (không `--xuat-codex`) gọi OpenAI API như cũ — **chỉ chạy khi chủ dự án đồng ý** (tốn tiền).
- Ảnh từ Codex: PNG 16:9 bất kỳ kích thước (1672×941 OK).

### Bước 4 — Remotion: hiển thị theo shot
- `build-timeline.mjs`: nếu có `kich-ban/<slug>.shots.json`, thêm vào mỗi cảnh `shots: [{ id, start, end, image, keyword }]` (start/end tính từ `words[from].start` → `words[to+1].start` hoặc hết cảnh; `image` = file tồn tại theo thứ tự ưu tiên: `anh/shots/<id>.png` → `image` trong shots.json → `null`). In ra số shot còn thiếu ảnh.
- `Scene.tsx`: thay một `KenBurns` cho cả cảnh bằng chuỗi shot (mỗi shot một `<Sequence>`):
  - Ảnh shot thiếu → dùng ảnh cảnh → nền giấy (video luôn render được khi ảnh mới làm dở).
  - Ken Burns ngắn mỗi shot (zoom 1.00→1.06 hoặc ngược lại, đổi hướng xen kẽ), chuyển shot: **cắt + 6 frame crossfade**.
  - Keyword: chữ trắng viền đậm `C.ink`, nền nhãn đỏ/vàng xen kẽ, pop-in spring, góc trên trái, cỡ ~80px. **Ẩn** khi overlay `ledger/chart/rules/ketso/headline/chips` đang hiện.
- Thanh dưới (component mới, trong `BaiVideo`, không hiện ở outro):
  - Trái: nhãn chương `"03 · DOANH THU"` (số cảnh 2 chữ số + `title` cảnh viết hoa), nền `C.ink` 85%, chữ vàng `C.gold`.
  - Phải: nút **ĐĂNG KÝ** đỏ nhỏ cố định.
  - Cao ~48px sát đáy; **dời phụ đề lên** (hiện `bottom: 56`) để không đè.
- Overlay số liệu giữ nguyên. Panel `ledger` phủ nửa phải → ảnh vẫn đổi phía sau, giảm `dim` nếu cần cho dễ đọc.

### Bước 5 — Kiểm tra & render
1. `npx tsc` sạch.
2. Render still ở **giữa mỗi cảnh** + 5 điểm ngẫu nhiên → xem: keyword không đè bảng/phụ đề, thanh dưới không đè phụ đề, ảnh fallback hoạt động.
3. Render 60 giây thử (`--frames=0-1799`) xem nhịp đổi ảnh và crossfade.
4. Render toàn bộ (~33 phút) → `loudnorm` (lệnh trong `AGENTS.md`).
5. Kiểm tra: thời lượng ≈ 24:04, chỉ có 1 đoạn lặng (outro ~10s): `ffmpeg -i f.mp4 -vn -af silencedetect=n=-45dB:d=2.5 -f null -`.
6. Thumbnail không đổi trừ khi được yêu cầu.

## 4. Định nghĩa "xong"
- [x] `kich-ban/01-tra-sua-100-ly.shots.json` có đủ shot, mọi shot cần ảnh mới đều có `prompt`.
- [x] `anh/shots/CODEX.md` chia nhóm 25 ảnh, chỉ liệt kê ảnh còn thiếu (hiện thiếu 0).
- [x] Video render được dù thiếu ảnh shot (fallback), và đúng nhịp 5–7s khi đủ ảnh (trung bình 6,05s).
- [x] Keyword, nhãn chương, nút ĐĂNG KÝ, phụ đề, overlay không đè nhau (kèm ảnh still minh chứng).
- [x] Hệ thống dùng được cho video khác (không hard-code `01-` ngoài `Root.tsx` và file data).
- [x] Commit theo từng bước; không commit file nặng/bí mật.

## 5. Việc còn mở (không thuộc nhiệm vụ này, đừng tự làm)
- Kiểm chứng **thuế hộ kinh doanh 4,5%** (cảnh 7, ~10:49) trước khi công khai.
- Nhạc nền: chưa có file trong `assets/nhac-nen/`.
- Script upload YouTube Data API (cần `client_secret.json` do chủ dự án tạo).
- Key ElevenLabs từng xuất hiện trong một file ở Downloads và trong hội thoại → chủ dự án cân nhắc tạo key mới.

## 6. Bản đồ code
| File | Vai trò |
|---|---|
| `scripts/kich_ban.py` | Parse kịch bản (cảnh, lời đọc, prompt ảnh, thumbnail), đọc `.env` |
| `scripts/tao_giong.py` | ElevenLabs → `*.goc.*` → hậu kỳ ffmpeg (nghỉ đoạn + atempo) → `canh-XX.{mp3,json}` |
| `scripts/tao_anh.py` | OpenAI Images API / xuất brief Codex |
| `remotion/scripts/build-timeline.mjs` | `timeline.json` (cảnh, lời, câu phụ đề) + `phu-de.srt` |
| `remotion/src/Root.tsx` | Khai báo composition, nạp `timeline.json` qua `calculateMetadata` |
| `remotion/src/video/BaiVideo.tsx` | Ghép cảnh + outro |
| `remotion/src/video/Scene.tsx` | Ảnh Ken Burns, phụ đề karaoke, overlay, audio của 1 cảnh |
| `remotion/src/video/Overlays.tsx` | headline, chips, ledger, rules, chart (hòa vốn), quote, ketso |
| `remotion/src/video/cues.ts` | Dò cue trong lời đọc → giây |
| `remotion/src/data/tra-sua-100-ly.video.ts` | Overlay + cue của video #1 |
| `remotion/src/KetSo.tsx` | Template bảng lãi lỗ (dùng riêng hoặc trong video) |
| `remotion/src/theme.ts` | Màu, font, `fmt()` |
