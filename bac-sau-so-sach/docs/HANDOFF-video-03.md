# HANDOFF — Video #3: "Vì Sao Tiệm Vàng KHÔNG BAO GIỜ Lỗ?"

> Đọc `AGENTS.md`, `docs/SHOTS.md`. Làm **giống hệt video #2** — xem cách làm và kết quả ở `docs/HANDOFF-video-02.md`.
> Bàn giao 19/10/2026. Slug: **`03-tiem-vang-khong-lo`**.
> ⏰ **Lịch đăng: thứ Ba 20/10/2026, 18:00** (Short: 21/10 11:30). Cần render xong **trước 15:00 ngày 20/10** để còn tải lên và YouTube xử lý.

## Kết quả Codex ngày 19/10/2026 — hoàn tất

- Đã đọc bản handoff có bước 0 tùy chọn cài Remotion skill; chọn tiếp tục bằng pipeline đã kiểm tra của video #2.
- Đã tạo bảng nhân vật `assets/nhan-vat/chi-hai.png`. Đã biên tập 182 shot: 11 ảnh cảnh dùng lại, 171 prompt riêng, 92 shot có Bác Sáu, 22 shot có chị Hai, 92 keyword; tham chiếu đúng từng nhân vật bằng `refs`.
- Đã tạo và duyệt đủ 171 ảnh shot riêng, 11 ảnh cảnh, nền thumbnail và bảng chị Hai bằng image_gen tích hợp. Audit đủ 182/182 shot, thiếu 0, lỗi 0; đọc được 184 ảnh, không trùng đường dẫn. Cảnh 1 đã sửa còn đúng một chị Hai; shot 02-06 đã sửa thành Bác bán vàng cho tiệm, nhận tiền về. Đã làm sạch ký tự trên máy tính ở 02-06 và 11-14.
- Đã thêm `Video-03`, `Thumbnail-03`, `Short-03`, 17 overlay cho 11 cảnh. Mọi cue tìm thấy, đúng thứ tự và nằm trong cửa sổ overlay; typecheck, 3 test Node và 3 test Python đạt. Bảng so sánh hỗ trợ nhãn cột/giá trị riêng, giữ mặc định video #2.
- Short ghép 6 đoạn giọng có sẵn, 123 chữ; MP4 cuối dài 48,200s, 1080×1920/30fps. Đã duyệt 8 still và các khung trích MP4; con dấu không che mặt, các mức giá xuất hiện đúng cue. Âm thanh −14,37 LUFS, peak −2,12 dBTP, không khoảng lặng dài. Đã lưu `short/short-03.mp4`; không tạo giọng mới.
- Đã tính lại: chênh 3 triệu, lỗ 2 triệu, gộp 30 triệu/ngày; dây chuyền 20 triệu bán lại 14 triệu, mất 6 triệu; tăng để hòa vốn 42,857%; 143 triệu × 30% = 42,9 triệu. Giá lịch sử theo kịch bản 19/10/2026, không cập nhật sang giá khác.
- Bản hash bảo vệ kịch bản/giọng ở `C:/Users/ADMIN/Documents/Codex/2026-10-16/ch/work/video-03-source-hashes.json`. Chưa sửa các nguồn này. Không gọi API trả phí, không tải lên/hẹn giờ.
- Timeline đã build lại đủ 182 ảnh. Đã xuất và duyệt thumbnail 1280×720. Bản thử 60s cuối 1920×1080/30fps đạt −16,15 LUFS, peak −2,13 dBTP, không khoảng lặng dài; đã xem 6 khung trích MP4. Riêng video #3 dùng keyword ở dải dưới ảnh để tránh che tóc/mặt, chừa khoảng với phụ đề; bảng dùng cột riêng. Câu chốt cảnh 8/11 nằm phía dưới, nút đăng ký tách sang vùng trên bên phải. Các video trước giữ mặc định cũ.
- Đã duyệt 20 still toàn bài và 11 khung bổ sung (8 bảng hoàn chỉnh, keyword thật, câu chốt/đăng ký và câu chốt cảnh 8). Typecheck và test sau thay đổi bố cục đã đạt. Video dài đã render đủ **33.345 frame**, xuất MP4 **18:31,500**, **1920×1080/30fps**, H.264/AAC stereo 48 kHz; đo file cuối **−16,26 LUFS, −1,90 dBTP**, LRA 4,9. Khoảng lặng duy nhất ở cuối 1100,599–1111,500s (10,901s), không có khoảng lặng dài giữa bài.
- Đã xem **31 khung trích trực tiếp từ MP4 cuối**, gồm giữa mọi cảnh, 5 điểm ngẫu nhiên, chuyển cảnh, các bảng hoàn chỉnh, keyword, câu chốt/CTA và outro. Đã lưu đủ video dài, Short, thumbnail vào repo; SHA-256 khớp cả ba bản giao. Cả 46 file kịch bản/giọng giữ nguyên hash. Mã nguồn và tài liệu được commit theo bước; ảnh/giọng/video lưu cục bộ.

### Thành phẩm và bằng chứng kiểm tra

- Video dài: `videos/03-tiem-vang-khong-lo/03-tiem-vang-khong-lo.mp4` (626.109.310 byte).
- Short: `videos/03-tiem-vang-khong-lo/short/short-03.mp4` (12.966.906 byte).
- Thumbnail: `videos/03-tiem-vang-khong-lo/thumbnail-final.jpg` (153.885 byte).
- Ảnh: `videos/03-tiem-vang-khong-lo/anh/` và `anh/shots/`; bảng nhân vật `assets/nhan-vat/chi-hai.png`. Prompt cuối ở `kich-ban/03-tiem-vang-khong-lo.images.json` và `.shots.json`.
- Bản giao dễ mở tại `C:/Users/ADMIN/Documents/Codex/2026-10-16/ch/outputs/`: `03-tiem-vang-khong-lo.mp4`, `short-03.mp4`, `03-tiem-vang-khong-lo-thumbnail.jpg`, `chi-hai.png`, `video-03-prompts.json`.
- Bằng chứng ở `C:/Users/ADMIN/Documents/Codex/2026-10-16/ch/outputs/video-03-qa/`: `asset-check.json`, `shot-audit.json`, `cue-check.json`, `final-video-check.json`, `short-check.json`, `preview-check.json`, `delivery-check.json`, `visual-review.json`.
- Still nguồn: `final-stills/`; bảng/câu chốt đã duyệt: `extras/video03-panels-final-*.png`; 31 khung MP4 dài cuối: `encoded-final-frames/video03-encoded-final-*.png`; 8 khung Short cuối: `short-final-v3/`; 6 khung bản thử mới: `preview-final-frames/`.
- Chuẩn hóa từ bản render gốc, hai lượt loudnorm, video copy: bản dài mục tiêu I=−16, TP=−2,3 trước AAC; Short I=−14, TP=−2,3 và offset bổ sung +0,5 để đạt −14,37 LUFS. Chỉ số báo cáo là đo chính MP4 sau AAC.

## 1. Đã chuẩn bị (đã kiểm tra)

| Thành phần | Trạng thái |
|---|---|
| Kịch bản `kich-ban/03-tiem-vang-khong-lo.md` | Xong, 11 cảnh. Giá vàng **ngày 19/10/2026** đã kiểm chứng (bảng nguồn cuối file). **Không sửa lời đọc** |
| Giọng `videos/03-…/giong/` | Xong 11 cảnh, 18:14, **một giọng** (Bác Sáu). **Không tạo lại** |
| Shot `kich-ban/03-tiem-vang-khong-lo.shots.json` | **182 shot** đã biên tập: 171 prompt riêng, 11 ảnh cảnh dùng lại, 92 keyword, 92 shot có Bác Sáu, 22 shot có chị Hai; tham chiếu đúng bảng bằng `refs` |
| Timeline + phụ đề | `timeline.json`, `phu-de.srt` (421 dòng) đã build lại đủ 182 ảnh; MP4 cuối 18:31,500 gồm outro |
| Ảnh | Đủ 11 ảnh cảnh, 171 ảnh shot riêng, nền thumbnail và bảng chị Hai; audit thiếu 0, lỗi 0, đọc được 184 ảnh |
| Đăng tải | `videos/03-…/dang-tai.md`: tiêu đề, mô tả có chương thật, thẻ, mục `## Short` |

## 2. Nhân vật & bối cảnh
- **Bác Sáu:** `assets/nhan-vat/bang-nhan-vat.png` như các video trước.
- **Chị Hai (mới):** bán xôi đầu hẻm, ~45 tuổi, tóc búi, **áo bà ba nâu nhạt**, tạp dề, nón lá đeo sau lưng, túi vải nhỏ đựng vàng. Tạo `assets/nhan-vat/chi-hai.png` (bảng nhân vật, cùng phong cách Bác Sáu và `con-ut.png`) **trước** khi làm ảnh có chị Hai; dùng làm ref.
- **Ông chủ tiệm vàng** (cảnh 5): đàn ông trung niên bụng phệ, vui vẻ — chỉ xuất hiện vài shot, không cần bảng nhân vật.
- **Không vẽ tên/logo thương hiệu vàng thật**, không chữ/số trên bảng giá (chỉ khối màu hai cột), không ký tự trên thỏi vàng, đồng xu, hóa đơn.
- Ẩn dụ gợi ý: bảng giá hai cột như **trạm thu phí cầu**; đồng xu chảy vào cột trái ra cột phải; cái thước dây đo khoảng chênh; hóa đơn bị kéo cắt mất một phần ba (trang sức 18K); cây non mọc từ chậu có đồng vàng (cất giữ lâu dài); tin đồn như loa phường; két sắt; hai hàng khách mua/bán.

## 3. Yêu cầu đã thực hiện (giữ để đối chiếu)
0. **(Tùy chọn, làm một lần) Cài skill Remotion chính thức** [`remotion-dev/skills`](https://github.com/remotion-dev/skills) — 12 skill giúp viết composition/animation Remotion đúng cách (theo ghi chú `letheky/ai-collections`, cài thử ngày 19/10/2026).
   - **Trước khi cài:** đọc hết các `SKILL.md` trong repo (skill chạy với toàn quyền của agent). Repo **không có file LICENSE** — chỉ dùng làm hướng dẫn cho agent, **không chép code của repo vào dự án**.
   - Cài bằng skills CLI (`npx skills add remotion-dev/skills`, chọn agent Codex); nếu CLI không hỗ trợ Codex thì clone repo ra ngoài dự án và đọc `SKILL.md` khi cần.
   - Không cài thì vẫn làm được như video #2 — đừng để bước này làm trễ hạn 15:00.
1. Bảng nhân vật chị Hai (mục 2).
2. Prompt + keyword cho 182 shot — quy tắc như video #2 (~50% có Bác Sáu, hai shot liền nhau khác bố cục, không chữ/logo).
3. Ảnh cảnh + thumbnail + shot bằng image_gen (`tao_anh.py … --xuat-codex`, `--shots --xuat-codex`; **không** chạy chế độ API trả phí).
4. Overlay `remotion/src/data/tiem-vang-khong-lo.video.ts` — cue là cụm chữ y nguyên trong lời đọc; số liệu từ bảng giả định của kịch bản:

| Cảnh | Overlay |
|---|---|
| 1 | `headline` "GIÁ VÀNG LÊN 1 TRIỆU" / "…MÀ VẪN LỖ 2 TRIỆU?" |
| 2 | `ledger` "VÀNG MIẾNG — 19/10/2026": mua vào 140,6 · bán ra 143,6 · **chênh 3,0 triệu ≈ 2,1%** |
| 3 | `ledger` "VÀNG CỦA CHỊ HAI": mua 143,6 → giá lên 1 triệu (141,6 / 144,6) → bán 141,6 → **lỗ 2,0 triệu**; note "phải lên > 3 triệu mới hòa vốn" |
| 4 | `ledger` so sánh khoảng chênh: miếng 3,0 (≈2,1%) · nhẫn thương hiệu lớn 3,0 (≈2,1%) · nhẫn nơi khác **4,0 (≈2,9%)** |
| 5 | `ledger` "MỘT TIỆM — MỘT NGÀY (minh họa)": mua 10 lượng · bán 10 lượng · ×3 triệu = **30 triệu chênh lệch gộp** + `chips` "Giá lên → khách đổ xô MUA" / "Giá xuống → khách hoảng BÁN" |
| 6 | `ledger` "DÂY CHUYỀN 18K": mua 20 tr · bán lại 70% = 14 tr · **mất 6 tr (30%)** · note "cần giá tăng ≈ 43%" |
| 7 | `chips` "Mất hóa đơn" · "Bán khác tiệm" · "Trừ hao" · "Mua lúc cả xóm đổ xô" |
| 8 | **cảnh chủ lực** — `comparison` (đã có từ video #2): miếng 3,0 tr / ≈2,1% · nhẫn 3,0 / ≈2,1% · nhẫn chênh 4,0 / ≈2,9% · trang sức 18K ≈43 tr / **≈43%** — con dấu "≈ 43%" |
| 9 | `headline` "VÀNG = CẤT GIỮ LÂU DÀI" / "KHÔNG PHẢI LƯỚT SÓNG" |
| 10 | `rules` "5 ĐIỀU TRƯỚC KHI MUA VÀNG" (5 dòng trong kịch bản) |
| 11 | `rules` 3 điều nhớ + `quote` "Mua vàng thì nhìn cả giá bán lại." + nút đăng ký |

Outro: `{ title: "BÁC SÁU SỔ SÁCH", tagline: "“Mua vàng thì nhìn cả giá bán lại.”" }`.

5. Composition `Video-03`, `Thumbnail-03` (big "TIỆM VÀNG", small "KHÔNG BAO GIỜ LỖ?"), `Short-03` (~45–55s, phong cách vector như Short-02). Gợi ý đoạn Short trong `videos/03-…/short/spec.json`: câu chị Hai hỏi (cảnh 1) → "Khoan, đưa sổ đây Bác coi" → cảnh 3 từ "Giờ mình coi lại cái lượng vàng của chị Hai" tới "Lỗ hai triệu, dù giá vàng đã tăng một triệu thật" → câu chốt cảnh 11. Chạy `node scripts/build-short.mjs 03-tiem-vang-khong-lo`.
6. Kiểm tra & render như `docs/SHOTS.md` → `videos/03-…/03-tiem-vang-khong-lo.mp4` (loudnorm I=-16, TP=-1.9), `short/short-03.mp4` (I=-14), `thumbnail-final.jpg`.

## 4. Định nghĩa "xong"
- [x] `chi-hai.png`, 11 ảnh cảnh, thumbnail, đủ ảnh 182 shot (audit thiếu 0)
- [x] Overlay 11 cảnh, mọi cue tìm thấy
- [x] Video, Short, thumbnail đã render + loudnorm + kiểm tra silencedetect
- [x] Still minh chứng: giữa mọi cảnh, cảnh 8, keyword, outro, Short
- [x] Commit theo bước; không commit ảnh/video/giọng/bí mật

## 5. Không làm
- **Không tải lên YouTube, không hẹn giờ** — chủ dự án nhờ Claude tải bằng `scripts/upload_youtube.py`.
- Không tạo lại giọng, không sửa lời đọc, không gọi API trả phí.
- Nếu không kịp trước 15:00 ngày 20/10: báo lại để dời lịch, **không** cắt bớt bước kiểm tra.
