# QUY TRÌNH TRỌN GÓI — từ ý tưởng tới video đã hẹn giờ

> Phân công chủ dự án chốt 26/10/2026: **Claude viết kịch bản; Codex kiểm nguồn/phép tính, soát bản bàn giao và sản xuất video.** Các hướng dẫn một agent làm hết dưới đây chỉ áp dụng phần việc đã được giao, không cho phép Codex tự viết lời đọc.
> Đọc kèm: `AGENTS.md` (luật chung), `docs/SHOTS.md` (shot/render/loudnorm chi tiết), `docs/LICH-DANG.md` (lịch + credit),
> `docs/Y-TUONG.md` (kho đề tài), và hai bản bàn giao đã làm thành công `docs/HANDOFF-video-02.md`, `docs/HANDOFF-video-03.md`.
> Kịch bản mẫu tốt nhất để bắt chước: `kich-ban/03-tiem-vang-khong-lo.md` và `kich-ban/04-tai-xe-cong-nghe.md`.

Mỗi video đi qua 10 bước. **D = ngày đăng (18:00).**

| # | Bước | Tốn tiền? | Hạn |
|---|---|---|---|
| 1 | Chọn đề tài | — | D−2 |
| 2 | Kiểm chứng số liệu + bảng giả định | — | D−2 |
| 3 | Claude viết và bàn giao kịch bản | — | D−2 |
| 4 | Soát kịch bản (checklist) | — | D−1 sáng |
| 5 | Thu giọng ElevenLabs | **Có** (~0,44 credit/ký tự) | D−1 |
| 6 | Shot + ảnh + nhân vật phụ | — (image_gen của Codex) | D−1 → D sáng |
| 7 | Overlay + composition + Short | — | D sáng |
| 8 | Render + QA | — | D trước 15:00 |
| 9 | `dang-tai.md` | — | D trước 15:00 |
| 10 | Tải lên + hẹn giờ | quota YouTube | D trước 16:00 |

---

## 1. Chọn đề tài
- Lấy đề tài **kế tiếp chưa làm** trong `docs/Y-TUONG.md`, đánh dấu "đang làm" ngay.
- Tiêu chí: người Việt bình thường gặp hằng ngày; có **con số kiểm chứng được**; có một nhân vật trong xóm để kể (chị Hai bán xôi, anh Tư chạy xe, con Út…); kết luận bất ngờ nhưng **không giật tít sai sự thật**.
- Không trùng đề tài, nhân vật, câu chốt với video trước (YouTube xét nội dung lặp khuôn).
- Slug: `NN-ten-khong-dau` (ví dụ `05-quan-ca-phe-mat-bang`). Dùng thống nhất cho `kich-ban/`, `videos/`, `remotion/src/data/`.

## 2. Kiểm chứng số liệu
- **Mọi con số ngoài đời thật** (giá, lãi suất, phí, thuế, lương tối thiểu, khảo sát) phải có nguồn web, ghi ngày. Ưu tiên văn bản pháp luật, trang chính thức, báo lớn. Số đổi theo ngày (giá vàng, giá xăng, lãi suất) ghi rõ "ngày …".
- Không tìm được nguồn → biến nó thành **giả định** và lời đọc phải nói là giả định. Không bao giờ bịa nguồn.
- Lập **Bảng giả định** đầu kịch bản (Hạng mục | Giả định | Nguồn/ghi chú) và dòng **Kết quả**.
- **Tự tính lại bằng code**, không tính nhẩm. Viết một đoạn Python ngắn tính mọi con số dẫn xuất, dán kết quả vào bảng. Đã từng có lỗi tính thuế phải thu lại 3 cảnh.
- Cuối kịch bản: bảng **Nguồn & mục cần kiểm tra trước khi đăng** (Số liệu | Nguồn (link) | Mức tin cậy). Mục chưa chắc ghi **CẦN KIỂM TRA**, và phải xử lý xong trước bước 5.
- Kiến thức nền đã kiểm chứng (dùng lại được): thuế hộ kinh doanh 2026 (NĐ 141/2026: doanh thu ≤ 1 tỷ/năm miễn; trên 1 tỷ: GTGT 3% trên toàn bộ doanh thu + TNCN 1,5% trên phần vượt 1 tỷ); lương tối thiểu giờ vùng I năm 2026: 25.500đ (NĐ 293/2025).

## 3. Viết kịch bản `kich-ban/NN-ten.md`
**Người viết: Claude (chủ dự án chốt 26/10/2026).** Codex chỉ tiếp nhận, kiểm nguồn/tính toán và soát. Nếu cần đổi lời đọc, Codex ghi cụ thể lỗi và số/nguồn đúng để Claude sửa, không tự viết lại. Chưa có bản bàn giao thì Codex chuẩn bị nguồn/phép tính và ghi việc chờ; không tự viết bù hoặc gọi TTS. Kịch bản đã thu giọng tiếp tục bị khóa.

Định dạng do `scripts/kich_ban.py` đọc, **giữ đúng tiêu đề**:

```
# Video #N — Tiêu Đề Viết Hoa Chữ Đầu
- **Kênh:** Bác Sáu Sổ Sách
- **Thời lượng ước tính:** ~17 phút (… chữ, … ký tự ElevenLabs)
- **Giọng phụ:** Út=zIusdI28yOZPwIBus0aI        ← chỉ khi có lời thoại nhân vật phụ
- **Nhân vật phụ:** mô tả ngoại hình cố định (tuổi, tóc, áo, đạo cụ) — dùng làm bảng nhân vật
---
## Thông tin đăng tải
**Tiêu đề (chọn 1):** 3 phương án
**Thumbnail:** mô tả + chữ lớn/chữ nhỏ + khối ``` prompt tiếng Anh ```
**Thẻ:** 8–10 thẻ, kết thúc bằng "Bác Sáu Sổ Sách"
---
## Bảng giả định (…)
---
## CẢNH 1 — Mở đầu (00:00 – 01:40)
`[ẢNH]` mô tả tiếng Việt
``` prompt tiếng Anh ```
`[CHỮ]` chữ hiện trên màn hình (gợi ý overlay)
**LỜI ĐỌC:**
… đoạn văn …
---
(… 9–11 cảnh …)
## Nguồn & mục cần kiểm tra trước khi đăng
```

**Độ dài (chốt lại 26/10 theo số liệu kênh):** 8.500–9.500 ký tự lời đọc → khoảng 12–14 phút. Video 16–24 phút chỉ được xem trung bình 27–35%; xem `docs/KE-HOACH.md`. Kiểm bằng `tao_giong.py … --dry-run`.

**Mạch 10–11 cảnh (đã chạy tốt ở cả 4 video):**
1. *Mở đầu* — **tối đa 45 giây (~500 ký tự)**. Đây là chỗ kênh mất 30–70% người xem (`docs/KE-HOACH.md`). Thứ tự bắt buộc:
   - **0–10 giây:** một vật/cảnh cụ thể + con số gây sốc nói ngay câu đầu ("Tờ quảng cáo ghi: không phần trăm lãi").
   - **10–30 giây:** nhân vật trong xóm nói một câu thoại ngắn; Bác Sáu: "Khoan, đưa sổ đây Bác coi."
   - **30–45 giây:** lời hứa cụ thể ("tới cuối video bà con sẽ biết cái máy này thật ra giá bao nhiêu").
   - **Cấm trong 60 giây đầu:** câu miễn trừ ("đây là tình huống giả định…"), nhắc video khác, giải thích phạm vi/phương pháp. Những câu đó dời sang cảnh 2.
2. *Thống nhất giả định* — nói rõ đâu là giả định, đâu là số có nguồn.
3–6. *Mỗi cảnh một khoản* (một khoản chi phí / một cái bẫy), mỗi cảnh có con số ra kết quả từng phần.
7. *Kết sổ* — cảnh chủ lực, ra con số cuối (bảng `ketso`/`comparison`).
8. *Những thứ không có trong con số* (sức khỏe, rủi ro, thời gian…).
9. *Vậy nên làm sao* — lời khuyên thực tế, không khuyên đầu tư cụ thể.
10–11. *Kết* — quay lại nhân vật (họ đã đổi gì), **3 điều nhớ**, kêu gọi đăng ký + gửi video cho người cần + câu hỏi để bình luận, **câu chốt in đậm** một dòng (dùng làm outro tagline).

**Giọng Bác Sáu** (kế toán về hưu 20 năm, người miền Nam, hiền, chậm rãi):
- Xưng "Bác", gọi "bà con", "anh em"; gọi nhân vật là "nó" thân mật.
- Từ miền Nam: *coi, nghen, hông, ngàn, chục, mấy cái, giùm, vô, rồi, đó, nè*. Câu ngắn, mỗi đoạn 2–5 câu.
- Kể như ngồi bàn trà: hỏi khán giả, tự trả lời, lặp lại con số quan trọng hai lần.
- Không chê bai nghề/khách hàng; không nêu **tên thương hiệu** thật (nói "một hãng", "tiệm lớn"); không hứa lợi nhuận; có câu "đây là cách tính, không phải lời khuyên đầu tư" khi đụng tới đầu tư.

**Viết cho máy đọc (TTS):**
- Trong LỜI ĐỌC, **số viết bằng chữ**: "sáu trăm sáu chục ngàn", "hai phẩy một phần trăm", "mười hai tiếng". Không dùng `%`, `đ`, `k`, `/`, `TP.HCM` (viết "thành phố Hồ Chí Minh").
- `**đậm**` và `` ` `` bị bỏ khi thu giọng, chỉ để nhấn ý cho người đọc kịch bản.
- Lời nhân vật phụ có giọng riêng: `[[Út: …]]` (khai báo ở dòng **Giọng phụ**). Nhân vật không có giọng riêng thì Bác thuật lại bằng ngoặc kép.
- Mọi cụm sẽ làm cue cho overlay phải **xuất hiện y nguyên** trong lời đọc.

**Prompt ảnh** (tiếng Anh): mở đầu `Flat 2D cartoon, thick outlines, warm colors, 16:9.`; có Bác Sáu thì thêm `[Reference: Bác Sáu character sheet]`; luôn có "no readable text" khi có màn hình/bảng/giấy. Không logo, không chữ.

**Tránh bị máy lọc ElevenLabs gắn cờ** (cảnh báo "fraudulent/predatory" ngày 26/10 sau video vay app):
- Đề tài về vay, lừa đảo, đòi nợ, hụi, bảo hiểm ép mua: lời đọc phải ở **giọng cảnh báo/giải thích** của Bác Sáu. Không để nhân vật đọc nguyên văn lời mời chào hay lời đe dọa của bên xấu ("duyệt 5 phút, không cần giấy tờ", "không trả thì…") — Bác thuật lại gián tiếp ("họ quảng cáo là duyệt rất nhanh").
- Hạn chế dồn từ nhạy cảm: *lừa, lừa đảo, đe dọa, ép, khủng bố, đòi nợ, chiếm đoạt, tín dụng đen, lãi cắt cổ*. Mỗi từ tối đa ~2 lần cả bài; dùng từ trung tính (*khoản phí phát sinh, thu hồi nợ, không minh bạch*).
- Không hướng dẫn chi tiết thủ đoạn; chỉ nói dấu hiệu nhận biết và cách tự bảo vệ.
- Kiểm trước khi thu:
  `grep -o -i -E "lừa[^ ,.]*|đe dọa|ép |khủng bố|đòi nợ|chiếm đoạt|tín dụng đen|cắt cổ" kich-ban/<slug>.md | sort | uniq -c`
- Nhận thêm bất kỳ cảnh báo nào từ ElevenLabs → dừng thu, báo chủ dự án.

## 4. Soát kịch bản (bắt buộc trước khi tốn credit)
- [ ] Kịch bản do Claude bàn giao; các góp ý ảnh hưởng lời đọc đã được Claude xử lý. Codex không tự viết/sửa lời đọc để hoàn thành bước này.
- [ ] Đọc trạng thái cảnh báo ElevenLabs mới nhất trong HANDOFF. Đổi người viết/kiểm từ khóa không bảo đảm hết cảnh báo; không gọi lại TTS để thử vượt cảnh báo. Có cảnh báo mới thì dừng thu và báo chủ dự án.
- [ ] Chạy lại script Python tính toán; **mọi số trong lời đọc khớp bảng giả định** (đọc từng cảnh, đổi số chữ ↔ số).
- [ ] Không còn mục **CẦN KIỂM TRA** chưa xử lý.
- [ ] `PYTHONUTF8=1 .venv/Scripts/python.exe scripts/tao_giong.py kich-ban/<slug>.md --dry-run` chạy không lỗi, đủ cảnh, ký tự trong khoảng 11–13k.
- [ ] Không có `%`, chữ số Ả Rập, ký hiệu lạ trong LỜI ĐỌC (`grep -n "[0-9%]"` trong các đoạn lời đọc — chỉ được phép trong `[CHỮ]`/bảng/prompt).
- [ ] Không tên thương hiệu; không câu khẳng định không có nguồn.
- [ ] Commit kịch bản (`Kịch bản video #N: …`) **trước** khi thu giọng.

## 5. Thu giọng (tốn credit)
```bash
PYTHONUTF8=1 .venv/Scripts/python.exe scripts/tao_giong.py kich-ban/<slug>.md          # in credit còn lại trước khi gọi
```
- Script tự dừng nếu không đủ credit và **cảnh báo khi còn dưới 20.000** → ghi vào HANDOFF và báo chủ dự án (họ sẽ đổi key).
- Nghe thử 2–3 cảnh (đầu, giữa, cuối): đọc sai số/tên → sửa chính tả lời đọc cảnh đó rồi `--canh N --force` (chỉ cảnh lỗi, tối đa 1 lần/cảnh).
- Chỉnh nhịp không tốn credit: `--chi-hau-ky`. Không bao giờ sửa `giong/*.goc.*`.
- **Sau khi thu, lời đọc bị khóa**: không sửa nữa.

## 6. Shot + ảnh
Theo `docs/SHOTS.md` bước 1–5 (đã làm thành công ở video #2, #3):
1. `cd remotion && node scripts/build-shots.mjs <slug>` → biên tập `kich-ban/<slug>.shots.json` (~6 giây/shot, ~180 shot; ~50% có Bác Sáu; hai shot liền nhau khác bố cục; keyword ngắn tiếng Việt có dấu cho ~half số shot; `refs` đúng bảng nhân vật).
2. Nhân vật phụ mới → tạo bảng `assets/nhan-vat/<ten>.png` cùng phong cách `bang-nhan-vat.png` **trước**.
3. `PYTHONUTF8=1 .venv/Scripts/python.exe scripts/tao_anh.py kich-ban/<slug>.md --xuat-codex` và `--shots --xuat-codex` → tạo ảnh bằng image_gen tích hợp. **Không** chạy chế độ API (không có `--xuat-codex`).
4. Duyệt ảnh: không chữ, đúng nhân vật/trang phục, không logo; `node scripts/audit-shots.mjs <slug>` thiếu 0 lỗi 0.
5. `node scripts/build-timeline.mjs <slug>`.

## 7. Overlay + composition + Short
- `remotion/src/data/<ten>.video.ts` (mẫu: `tiem-vang-khong-lo.video.ts`). Loại overlay có sẵn: `headline`, `chips`, `ledger`, `salary`, `comparison`, `ketso`, `chart`, `rules`, `quote` (xem `remotion/src/video/types.ts`). Video mới dùng `sidePanels: true`, `keywordPosition: "lower"`.
- Số trên overlay viết kiểu Việt (`fmt()` trong `theme.ts`: `105,0 triệu`, `35.000đ`) và **khớp bảng giả định**.
- Thêm `Video-NN`, `Thumbnail-NN` (big/small lấy từ mục Thumbnail của kịch bản), `Short-NN` vào `remotion/src/Root.tsx` theo mẫu Video-03.
- Short (~45–55 giây): chọn 4–6 đoạn lời **có sẵn** (hook → con số bất ngờ → câu chốt), ghi `videos/<slug>/short/spec.json` (`segments: [{scene, from, to}]` = chỉ số chữ trong `giong/canh-XX.json`, inclusive), rồi `node scripts/build-short.mjs <slug>`. Component Short mới chép từ `Short03.tsx` rồi đổi nội dung. Không thu giọng riêng cho Short.
- `npx tsc` + test (SHOTS.md bước 6) đạt; mọi cue tìm thấy.

## 8. Render + QA
Theo `docs/SHOTS.md` bước 7–8 và phần loudnorm:
- `verify-shot-frames.mjs` → xem still: giữa mọi cảnh, keyword, bảng hoàn chỉnh, câu chốt, outro. Chữ không che mặt, không đè phụ đề.
- Render thử 60 giây, rồi render toàn bộ (~35 phút) → loudnorm 2 lượt TP=−2,3 trước AAC → đo lại file cuối: **−16 ± 0,5 LUFS, peak ≤ −1,5 dBTP**, silencedetect chỉ được lặng ~10 giây cuối.
- Short: I=−14, lưu `short/short-NN.mp4`. Thumbnail: `thumbnail-final.jpg` 1280×720.
- Trích ≥ 20 khung từ MP4 cuối để duyệt.

## Thumbnail (chốt 26/10 theo số liệu kênh)
- Khuôn của #2 (video duy nhất được YouTube đẩy mạnh): **con số A → "…" → con số B gây bất ngờ**. Ví dụ "TRẢ GÓP 0%" / "THẬT RA… 29%?", "GỬI 1 TỶ / LÃI 4,5 TRIỆU" / "XÀI ĐƯỢC… 1,2 TRIỆU?".
- Không dùng câu hỏi chung chung không có số ("LÃI ĐỦ SỐNG?", "MUA HAY THUÊ?") hay cụm khó hiểu ("ĐỪNG QUÊN 12 THÁNG").
- Ảnh nền: Bác Sáu có biểu cảm mạnh (nghi ngờ, nhíu mày, soi kính lúp) + một đồ vật cụ thể của đề tài; chừa trống 40% bên trái. Chữ không chạm mặt/tóc nhân vật.
- Số trên thumbnail phải có trong lời đọc/bảng giả định.

## 9. `videos/<slug>/dang-tai.md`
Chép đúng khuôn của `videos/03-tiem-vang-khong-lo/dang-tai.md` (script upload đọc các mục `## Tiêu đề`, `## Mô tả` (khối code), `## Thẻ`, `## Short`):
- Tiêu đề: chọn 1 trong 3 phương án của kịch bản; **ghi 2 phương án còn lại** dưới mục `## Tiêu đề dự phòng` (chủ dự án dùng cho Test & compare trong Studio).
- Mô tả **≤ 1.200 ký tự**. Hai dòng đầu là hook có con số (chính là phần người xem thấy khi lướt), KHÔNG mở bằng giả định/miễn trừ. Sau đó **chương thật** lấy từ timeline:
  `node -e "const t=require('./videos/<slug>/timeline.json');for(const s of t.scenes){const m=Math.floor(s.start/60),x=Math.floor(s.start%60);console.log(String(m).padStart(2,'0')+':'+String(x).padStart(2,'0')+' '+s.title)}"`
  (cảnh 1 phải là `00:00`) + đoạn nguồn/giả định/"không phải lời khuyên đầu tư".
- Thẻ: từ kịch bản. Mục Short: dòng đầu là tiêu đề có `#shorts`, khối code là mô tả.
- Đọc lại nguyên văn mô tả trước tải: có khoảng trắng giữa số và chữ/đơn vị (`mua 20 triệu`, `ngày 45`, `5% = 1 triệu`), sau dấu câu; chia đoạn dễ đọc. Không dùng kiểu viết dính trong ghi chú nội bộ cho nội dung khán giả thấy. Giữ nguyên URL, mốc chương và dấu thập phân của số; sau tải đọc lại mô tả thật bằng API để xác nhận.

## 10. Tải lên + hẹn giờ
```bash
PYTHONUTF8=1 .venv/Scripts/python.exe scripts/upload_youtube.py <slug> --lich "YYYY-MM-DD 18:00" --dry-run   # soát tiêu đề/mô tả/file
PYTHONUTF8=1 .venv/Scripts/python.exe scripts/upload_youtube.py <slug> --lich "YYYY-MM-DD 18:00" --yes
PYTHONUTF8=1 .venv/Scripts/python.exe scripts/upload_youtube.py <slug> --short --lich "<D+1> 11:30" --yes
```
- **Luôn có `--lich`** (video ở Riêng tư tới giờ hẹn). Không bao giờ `--che-do public`.
- Script dùng `token.json` có sẵn. Nếu nó đòi đăng nhập/cấp quyền trình duyệt → **dừng, báo chủ dự án** (chỉ chủ dự án đăng nhập).
- Kết quả ghi `videos/<slug>/youtube.json` — commit file này. Không chạy `--force` nếu video đã có id (tránh đăng trùng).
- Quota: ~1.600 đơn vị/video + Short; 10.000/ngày → tối đa 2 video + 2 Short mỗi ngày.
- Cập nhật bảng lịch trong `docs/LICH-DANG.md`.

---

## Khi gặp sự cố
| Tình huống | Làm gì |
|---|---|
| Không kịp render trước 15:00 ngày D | Không cắt bớt QA. Ghi HANDOFF, dời video sang ngày sau, ngày đó **không đăng** (hoặc đăng video dự phòng nếu đã xong). |
| Credit < 20.000 | Ghi HANDOFF + báo chủ dự án; vẫn thu được nếu đủ cho video đó. |
| Credit không đủ cho 1 video | Dừng bước 5, làm tiếp ảnh/khâu khác cho video khác, báo chủ dự án. |
| OAuth hết hạn / lỗi 401–403 khi tải | Dừng, báo chủ dự án. Không tự tạo project/OAuth mới. |
| Số liệu mâu thuẫn giữa hai nguồn | Dùng số thận trọng hơn, nói "khoảng", ghi cả hai nguồn. |
| Cue không tìm thấy | Chạy lại `build-timeline.mjs`; sửa cue cho khớp **lời đọc** (không sửa lời đọc). |

## Commit
- Theo bước, tiếng Việt: kịch bản → shots.json → overlay/composition → dang-tai/youtube.json/tài liệu.
- Không commit ảnh/giọng/video (đã .gitignore) và bí mật (`.env`, `client_secret*`, `token*`). Không push nếu chủ dự án chưa dặn.

## Sao lưu thành phẩm lên Google Drive (sau bước 10)
Remote rclone `ltky-drive` (tài khoản ltky.dev@gmail.com, quyền `drive.file`), thư mục `Bac Sau So Sach - backup/<slug>/`. Chạy từ gốc repo sau khi tải lên xong:
```bash
RC="D:/CodexTemp/rclone/rclone.exe --config D:/CodexTemp/rclone/rclone.conf"   # bản chép cho Codex; file conf chứa token Drive — không commit, không in ra log
F='--include /[0-9][0-9]-*/*.mp4 --include /[0-9][0-9]-*/short/short-*.mp4 --include /[0-9][0-9]-*/thumbnail-final.jpg'
$RC copy videos "ltky-drive:Bac Sau So Sach - backup" $F --transfers 3 --drive-chunk-size 64M
$RC check videos "ltky-drive:Bac Sau So Sach - backup" $F      # phải "0 differences"
```
Không in/ghi token ra log. Nếu báo lỗi xác thực hoặc client_id hết hạn → dừng, báo chủ dự án (chỉ chủ dự án cấp lại quyền).

## Phân tích sau đăng (mỗi thứ Hai, hoặc 3 ngày sau mỗi video)
```bash
PYTHONUTF8=1 .venv/Scripts/python.exe scripts/phan_tich.py       # chỉ đọc; token riêng token-analytics.json
```
Báo cáo ở `docs/phan-tich/<ngày>.md` (commit). Đọc: % xem trung bình, giữ chân ở 30/60 giây, cảnh mất người nhanh nhất, nguồn người xem. Ghi kết luận mới vào `docs/KE-HOACH.md` và áp dụng cho kịch bản kế tiếp. Lỗi xác thực → dừng, báo chủ dự án.
