# HANDOFF — Video #2: "Trả Góp 0%: Cái Bẫy Nằm Ở Dòng Chữ Nhỏ Nhất"

> Đọc `AGENTS.md` trước, rồi `docs/SHOTS.md` (quy trình shot, cách render trên Windows/FFmpeg 9).
> Video #1 đã xong và đã hẹn giờ đăng — tham khảo cách làm ở `docs/HANDOFF-video-01.md`.
> Bàn giao ngày 18/10/2026. Slug: **`02-tra-gop-0-phan-tram`**.

## Kết quả Codex ngày 18/10/2026 — hoàn tất

- Đã tạo `assets/nhan-vat/con-ut.png`, đủ 11 ảnh cảnh và nền thumbnail bằng image_gen tích hợp. Cảnh 02 đã thay hoàn toàn theo phản hồi: bỏ bố cục quay lưng/thẻ sai hướng, dùng ba nhân viên nhìn từ phía trước.
- Đã biên tập đủ 201 shot: 11 ảnh cảnh dùng lại + 190 prompt riêng; 109 shot có Bác Sáu, 43 shot có Út, 97 keyword. Nguồn có `refs` để gắn đúng một/hai bảng nhân vật; brief theo nhóm 25 chỉ ghi ảnh thiếu. Bộ kiểm tra Python 3 bài đã đạt, không gọi API khi xuất brief.
- Đã tạo 190/190 ảnh shot riêng. Audit đủ 201/201 shot, thiếu 0, lỗi 0; đọc được 203 ảnh gồm thumbnail/bảng Út, không file trùng. Audit cập nhật bằng `node remotion/scripts/audit-shots.mjs 02-tra-gop-0-phan-tram`.
- Đã thêm overlay cả 11 cảnh, bảng bốn cách mua và thanh góp/lương. Typecheck và 3 kiểm tra Node đạt; mọi cue tìm thấy, đúng thứ tự và nằm trong thời lượng overlay. Đã tính lại: phí 888.150đ; tổng góp 24.378.150đ; chênh tiền mặt 1.888.150đ; phí thẻ 587.250đ; tổng góp hàng tháng 7,226 triệu, còn 4,774 triệu.
- Đã thêm Video-02, Thumbnail-02 và Short-02. Short ghép 4 đoạn lời có sẵn dài 48,407s, 128 chữ, giữ hai giọng; đã có bố cục vector riêng. Đã duyệt still và khung hình trích từ MP4 cuối. Short dài 48,500s, 1080×1920/30fps, âm lượng −14,24 LUFS, peak −1,83 dBTP; đã lưu `short/short-02.mp4`.
- Đã đối chiếu hash kịch bản và 45 file giọng: cả 46 file giữ nguyên. Không sửa lời đọc, không tạo giọng mới, không gọi API trả phí, không đăng/hẹn giờ.
- Đã render và kiểm tra bản thử 60s: 1920×1080/30fps, −16,11 LUFS, peak −1,80 dBTP, không khoảng lặng dài. Đã dựng lại timeline đủ ảnh, duyệt 20 still cuối, bảng hoàn chỉnh các cảnh 6/8/10 và khung hình trích MP4 thử; 8 still Short và thumbnail đã duyệt. Bảng dùng cột riêng, ảnh thu sang trái để không che mặt.
- Video dài đã render đủ 37.484 frame, xuất MP4 1920×1080/30fps, dài **20:49,500**, H.264/AAC stereo 48 kHz. Đo file cuối: **−16,31 LUFS, −1,72 dBTP**. Chỉ có khoảng lặng cuối 1238,538–1249,500s (10,962s); không có khoảng lặng dài giữa bài. Đã xem 23 khung trích trực tiếp từ MP4 cuối, gồm giữa 11 cảnh, chuyển cảnh, keyword, bảng số và outro.
- Thumbnail cuối 1280×720. Cả ba thành phẩm đã chép vào đúng thư mục repo và đối chiếu SHA-256 với bản giao: khớp cả ba. Mã nguồn và tài liệu được commit theo bước; ảnh, giọng và video lưu cục bộ.

### Thành phẩm và bằng chứng kiểm tra

- Video dài: `videos/02-tra-gop-0-phan-tram/02-tra-gop-0-phan-tram.mp4` (636.142.741 byte).
- Short: `videos/02-tra-gop-0-phan-tram/short/short-02.mp4` (17.428.102 byte).
- Thumbnail: `videos/02-tra-gop-0-phan-tram/thumbnail-final.jpg` (139.954 byte).
- Ảnh cảnh 02 thay mới: `videos/02-tra-gop-0-phan-tram/anh/canh-02.png`. Không dùng lại các bản quay lưng/thẻ sai hướng.
- Bản giao dễ mở nằm tại `C:/Users/ADMIN/Documents/Codex/2026-10-16/ch/outputs/`: video dài, `short-02.mp4`, `02-tra-gop-0-phan-tram-thumbnail.jpg`, `canh-02-thay-moi.png`.
- Thư mục bằng chứng: `C:/Users/ADMIN/Documents/Codex/2026-10-16/ch/outputs/video-02-qa/`. Các báo cáo `asset-check.json`, `final-video-check.json`, `short-check.json`, `delivery-check.json` ghi ảnh, hash, thông số và kết quả kiểm tra. Still nguồn ở `final-stills/`, khung trích MP4 cuối ở `encoded-final-frames/`, khung Short ở `short-final-frames/`, bảng hoàn chỉnh/thumbnail ở `extras/`.
- Lưu ý chuẩn hóa: TP=−1,9 trước AAC cho bản dài này ra peak −1,43 dBTP, nên đã chuẩn hóa lại từ bản render gốc với TP=−2,3; kết quả cuối −1,72 dBTP đạt ngưỡng. Không mã hóa lại hình khi chuẩn hóa âm thanh.

## 1. Đã chuẩn bị (đã kiểm tra)

| Thành phần | Trạng thái |
|---|---|
| Kịch bản `kich-ban/02-tra-gop-0-phan-tram.md` | Xong, 11 cảnh. Số liệu đã kiểm chứng 18/10/2026 (bảng nguồn cuối file). **Không sửa lời đọc** — giọng đã thu theo đúng văn bản này |
| Giọng `videos/02-tra-gop-0-phan-tram/giong/` | Xong 11 cảnh, 20:32. **2 giọng**: Bác Sáu (Hung, `.env`) + con Út (ElevenLabs "Ân", `zIusdI28yOZPwIBus0aI`) ở cảnh 1 và 11 — đánh dấu `[[Út: …]]` trong kịch bản. **Không tạo lại** (tốn credit) |
| Shot `kich-ban/02-tra-gop-0-phan-tram.shots.json` | **201 shot** đã biên tập: 190 prompt riêng, 11 ảnh cảnh dùng lại, 97 keyword; tham chiếu nhân vật đã gắn bằng `refs` |
| Timeline + phụ đề | `videos/02-…/timeline.json`, `phu-de.srt` đã build lại đủ ảnh; MP4 cuối dài 20:49,500 gồm outro |
| Ảnh | Đủ 11 ảnh cảnh, 190 ảnh shot riêng, nền thumbnail và bảng Út; audit thiếu 0, đọc được cả 203 ảnh. Brief cảnh/thumbnail ở `kich-ban/02-tra-gop-0-phan-tram.images.json` |
| Đăng tải | `videos/02-…/dang-tai.md`: tiêu đề, mô tả **có mốc chương thật**, thẻ, mục `## Short` (script upload đọc mục này) |
| Nhân vật | `assets/nhan-vat/bang-nhan-vat.png` (Bác Sáu) và `assets/nhan-vat/con-ut.png` (Út); đã dùng đúng bảng cho từng ảnh |

## 2. Yêu cầu đã thực hiện (giữ để đối chiếu)

### Bước 1 — Bảng nhân vật con Út
Tạo `assets/nhan-vat/con-ut.png` bằng image_gen trước khi làm ảnh có Út, để Út đồng nhất giữa các shot:
> Character reference sheet, same flat 2D cartoon style as the Bác Sáu sheet (thick dark brown outlines, warm colors, simple cel shading). Út: 23-year-old Vietnamese office worker woman, long black hair in a high ponytail, white short-sleeve blouse, beige trousers, small brown crossbody bag, bright expressive eyes, friendly. Front view, 3/4 view, side view, and expressions: excited, confused, anxious, determined, happy. Plain cream background. No text.

Khi một shot có Út, dùng `con-ut.png` làm tham chiếu (cùng `bang-nhan-vat.png` nếu có cả Bác Sáu). Nếu `scripts/tao_anh.py` chỉ hỗ trợ một ảnh ref, ghi rõ trong CODEX.md ảnh nào cần ref nào.

### Bước 2 — Prompt cho 201 shot
Điền `prompt`, `ref`, `keyword` trong `shots.json` — **cùng quy tắc video #1** (`docs/HANDOFF-video-01.md` mục Bước 2): phong cách cố định; ~50% shot có Bác Sáu; còn lại minh họa/ẩn dụ; hai shot liền nhau khác bố cục; **không chữ, không logo, không thương hiệu thật** (điện thoại, ngân hàng, công ty tài chính, cửa hàng đều chung chung); `keyword` 2–5 chữ VIẾT HOA cho ~50% shot.
Gợi ý ẩn dụ riêng cho đề tài: số 0 khổng lồ bằng vàng; dòng chữ nhỏ dưới kính lúp; ô bảo hiểm đã tích sẵn; phong bì giảm giá trao cho người trả tiền mặt; cuộn biểu phí dài chạm đất; quái vật hóa đơn sau lưng Út; tờ lịch khoanh đỏ đã qua; hộp tiết kiệm có hình điện thoại.
Shot đầu mỗi cảnh (`canh-XX-01`) có thể dùng ảnh cảnh (`"image": "anh/canh-XX.png"`, để `prompt` rỗng) — khi đó **phải tạo ảnh cảnh** từ prompt `[ẢNH]` trong kịch bản.

### Bước 3 — Tạo ảnh
`PYTHONUTF8=1 .venv/Scripts/python.exe scripts/tao_anh.py kich-ban/02-tra-gop-0-phan-tram.md --xuat-codex` (ảnh cảnh + thumbnail) và `… --shots --xuat-codex` (shot) → tạo bằng image_gen tích hợp, lưu đúng đường dẫn. **Không** chạy chế độ API trả phí. Duyệt ảnh như video #1 (tay thừa, ký tự trên máy tính/điện thoại/đồng xu, sai tuổi, sai trang phục).

### Bước 4 — Overlay số liệu (`remotion/src/data/tra-gop-0-phan-tram.video.ts`)
Theo mẫu `tra-sua-100-ly.video.ts`; mọi `cue` là cụm chữ **y nguyên** trong lời đọc (đã thu). Số liệu lấy từ bảng giả định trong kịch bản. Cần tối thiểu:
| Cảnh | Overlay |
|---|---|
| 1 | `headline` "0% LÃI SUẤT" / "0Đ TRẢ TRƯỚC" |
| 2 | `rules` hoặc `chips` 4 đường bù tiền: người bán chịu · thu phí · giá · thói quen |
| 3 | `ledger` "TRẢ GÓP 0% — 6 THÁNG": giá 23.490.000đ · góp 3.915.000đ/tháng · thu hộ 66.000đ · bảo hiểm 822.150đ · **trả thêm 888.150đ** · note "≈ 13%/năm" |
| 4 | `ledger` so sánh: trả thẳng có giảm 22.490.000đ · trả góp 24.378.150đ · **chênh 1.888.150đ ≈ 29%/năm** |
| 5 | `ledger` "THẺ TÍN DỤNG 0%": phí chuyển đổi 2,5% = 587.250đ ≈ 9%/năm · note "quên chuyển đổi → lãi thẻ ~15–40%/năm" |
| 6 | biểu đồ/thanh "Lương 12 triệu": 3,93 tr (33%) → +2,1 (50%) → +1,2 = 7,23 tr (**60%**), còn 4,77 tr để sống. Có thể thêm loại overlay mới (`bar`), giữ phong cách `theme.ts` |
| 7 | `chips` "Phí phạt trễ hạn" · "Lãi phạt" · "Lịch sử tín dụng" |
| 8 | **cảnh chủ lực**: bảng 4 cách mua (22,49 / 23,49 / 24,08 / 24,38 tr; +1,00 / +1,59 / +1,89; ≈9% / ≈29%) — tái dùng hoặc biến thể `KetSo` (con dấu "≈ 29%/NĂM") |
| 9 | `rules` 3 điều kiện trả góp 0% có lợi thật |
| 10 | `rules` 5 câu hỏi trước khi ký + note "tổng góp ≤ 1/5 lương" |
| 11 | `rules` 3 điều nhớ + `quote` "Ở đời không có gì là không đồng." + nút đăng ký |
Outro: `{ title: "BÁC SÁU SỔ SÁCH", tagline: "“Ở đời không có gì là không đồng.”" }`.

### Bước 5 — Composition
Trong `Root.tsx` thêm `Video-02` (nạp `02-tra-gop-0-phan-tram/timeline.json`), `Thumbnail-02` (ảnh `anh/thumbnail.png`, big "TRẢ GÓP 0%", small "THẬT RA… 29%?") và `Short-02`.
**Short-02** (~45–55s, dọc 1080×1920, phong cách vector như `remotion/src/short/Short01.tsx`): chọn đoạn lời đọc trong `videos/02-…/short/spec.json` rồi `node scripts/build-short.mjs 02-tra-gop-0-phan-tram` (không tốn credit). Gợi ý ghép: câu Út khoe máy (cảnh 1) → "Khoan, đưa sổ đây Bác coi" → đoạn cảnh 4 từ "Bây giờ so lại cho công bằng" tới "gần hai mươi chín phần trăm một năm" → câu chốt. Cần tổng quát hóa `Short01` (hoặc viết `Short02`) — các mốc cue hiện gắn cứng cho video #1.

### Bước 6 — Kiểm tra & render
Như `docs/SHOTS.md` mục 6–8: typecheck, test, `verify-shot-frames.mjs`, render thử 60s, render toàn bộ → loudnorm (I=-16, TP=-1.9 trước AAC) → `videos/02-…/02-tra-gop-0-phan-tram.mp4`. Short → `videos/02-…/short/short-02.mp4` (loudnorm I=-14). Thumbnail → `videos/02-…/thumbnail-final.jpg`. Kiểm tra silencedetect: chỉ outro được lặng.

## 3. Định nghĩa "xong"
- [x] `con-ut.png`, 11 ảnh cảnh, thumbnail, đủ ảnh 201 shot (audit thiếu 0)
- [x] Overlay cả 11 cảnh, mọi cue tìm thấy (render không lỗi)
- [x] `02-tra-gop-0-phan-tram.mp4`, `short-02.mp4`, `thumbnail-final.jpg` đã render + chuẩn hóa âm lượng + kiểm tra
- [x] Still minh chứng: giữa mọi cảnh, cảnh 8, keyword, outro, Short
- [x] Commit theo bước; không commit ảnh/video/giọng/bí mật

## 4. Không làm (để chủ dự án / Claude)
- **Không tải lên YouTube, không hẹn giờ.** Sau khi render xong, chủ dự án sẽ nhờ tải lên bằng `scripts/upload_youtube.py` (đã đọc `dang-tai.md` + mục `## Short`).
- Không tạo lại giọng, không sửa lời đọc trong kịch bản, không gọi API trả phí.
- Lịch đăng đề xuất: video dài **18:00**, Short **11:30 hôm sau** (giờ VN) — xem kết quả nghiên cứu trong lịch sử dự án.
