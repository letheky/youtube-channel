# Kế hoạch nội dung theo số liệu kênh

> Lập ngày 26/10/2026 từ `docs/phan-tich/2026-10-26.md` (`scripts/phan_tich.py`). Cập nhật mỗi lần chạy phân tích.
> Mẫu còn nhỏ (kênh 8 sub, ~4.000 view): kết luận là **giả thuyết để thử**, không phải quy luật.

## Số liệu chính (video dài #1–#5, đủ dữ liệu giữ chân)

| Video | Dài | View | % xem TB | Còn ở 30s | Còn ở 60s | Hết cảnh 1 | Nguồn chính |
|---|--:|--:|--:|--:|--:|--:|---|
| #1 Trà sữa | 24,5′ | 92 | 27% | 86% | 72% | 62% | Duyệt (trang chủ/đăng ký) |
| **#2 Trả góp 0%** | 20,8′ | **787** | **35%** | 83% | 66% | 59% | **Duyệt 730** |
| #3 Tiệm vàng | 18,5′ | 146 | 30% | 80% | 69% | 63% | Đề xuất 72 |
| #4 Tài xế | 16,9′ | 158 | 34% | 83% | 62% | 60% | Duyệt 73 |
| #5 Quán cà phê | 16,0′ | 38 | 17% | **56%** | **44%** | **31%** | Duyệt 13 |

Short: #1 932 view (xem 68%), **#6 1.042 view**, #7 241, #4 206 (61%), #2 195, #3 120. Short kéo view tốt hơn bản dài, nhưng nguồn của bản dài gần như không đến từ Short.
Tìm kiếm (YT_SEARCH) gần như 0 ở mọi video. ("SUBSCRIBER" trong API = *Tính năng duyệt*: trang chủ + tab đăng ký.)

## Kết luận

1. **Mở đầu là chỗ mất người lớn nhất**: 31–69% người xem bỏ trước khi hết cảnh 1 (~90 giây), ở mọi video. Từ cảnh 2 trở đi đường giữ chân khá phẳng: người ở lại thì xem tiếp.
2. **#5 rơi mạnh nhất từ giây 10–20.** Câu thứ hai của #5 là "Bữa nay Bác kể một tình huống giả định, không phải chuyện của một quán có thật", tiếp đó nhắc video trà sữa và giải thích phương pháp. #2 thì mở bằng tờ quảng cáo "không phần trăm lãi" + thoại của Út + "Khoan, đưa sổ đây Bác coi". → Câu miễn trừ/phương pháp **không được nằm trong 60 giây đầu** (vẫn nói, nhưng ở cảnh 2).
3. **Video quá dài so với mức xem**: 16–24 phút, người xem trung bình 5–7 phút. Rút xuống **12–14 phút** (8.500–9.500 ký tự); bớt credit ~25%/video.
4. **Đề tài "bẫy tài chính cá nhân có con số sốc" thắng**: #2 Trả góp 0% gấp ~5 lần mọi video khác, được YouTube đẩy lên trang chủ. Mổ xẻ mô hình kinh doanh (#1, #5) yếu hơn. Short tiết kiệm/hưu trí (#6) lại rất tốt.
5. **Cảnh kết sổ nhiều bảng làm rơi thêm** (#1 cảnh 10, #3 cảnh 3 và 8): bảng dài nhiều dòng → nói con số kết luận trước, chi tiết sau.

## Luật mới cho kịch bản (đã ghi vào `docs/QUY-TRINH.md` bước 3)
- Cảnh 1 ≤ 45 giây: vật/cảnh cụ thể + con số sốc ở câu đầu → thoại nhân vật → "Khoan, đưa sổ đây Bác coi" → lời hứa cụ thể.
- Không miễn trừ, không nhắc video khác, không giải thích phạm vi trong 60 giây đầu.
- 8.500–9.500 ký tự, 8–9 cảnh. Mỗi bảng kết sổ: con số cuối nói trước.
- Tiêu đề: một con số sốc + một nghịch lý ("0%" mà "29%"). Tránh tiêu đề mô tả phương pháp ("vốn mở quán, thời gian thu hồi và hạn thuê").

## Việc trên Studio cho chủ dự án / Codex
- **Short → bản dài**: Related video của mọi Short phải trỏ về bản dài (Short #6 1.042 view là cơ hội lớn nhất). Ghim bình luận đầu ở Short: "Bản đầy đủ Bác tính hết ở đây 👉".
- Thử *Test & compare* tiêu đề/thumbnail cho #7–#10 (đang ít view, cần CTR — API không trả số lần hiển thị; xem trong Studio → Phạm vi tiếp cận).

## Lịch video tiếp theo (đề xuất, cần quyền chủ dự án cho từng video)
Ưu tiên đề tài bẫy tài chính / con số sốc, xen một đề tài nghề hoặc kinh doanh nhỏ mỗi 3 video. Mọi con số phải kiểm chứng theo `QUY-TRINH.md` bước 2.

| Ngày đăng | # | Đề tài | Vì sao |
|---|---|---|---|
| T4 28/10 | 11 | **Vay app "duyệt 5 phút": vay 5 triệu, trả bao nhiêu?** (trần lãi 20%/năm BLDS, "phí dịch vụ" biến tướng) | Cùng dạng #2 — bẫy có con số sốc |
| T5 29/10 | 12 | **Chơi hụi: lãi thật bao nhiêu, bể hụi mất gì?** (Nghị định về họ, hụi, biêu, phường; tính lãi suất thật của hụi đầu/hụi chót) | Rất "miền Nam", hợp giọng Bác Sáu |
| T6 30/10 | 13 | **Đóng BHXH 20 năm, về hưu nhận bao nhiêu? Rút một lần thiệt gì?** | Người tìm kiếm nhiều; nối với Short #6 hưu trí đang tốt |
| T7 31/10 | 14 | Xe bánh mì 200 ổ/ngày lời bao nhiêu (đề tài cũ, mở đầu kiểu mới) | Xen đề tài nghề |
| CN 1/11 | 15 | **Đám cưới: tiền mừng có bù nổi tiền đãi?** | Đề tài đời sống dễ chia sẻ |
| T2 2/11 | 16 | **Mua bảo hiểm khoản vay bị "ép": trả thêm bao nhiêu?** | Nối #2, #7 |
| T3 3/11 | 17 | **Nuôi một đứa con tới 18 tuổi tốn bao nhiêu?** | Rộng, dễ lan |

Credit: ~4.000/video với độ dài mới → 7 video ≈ 28.000; còn đủ trước 16/11 nếu không thu lại.

**Đổi lịch 26/10 sau cảnh báo ElevenLabs:** 29/10 #13 BHXH · 30/10 #14 Bánh mì · 31/10 #15 Tiền mừng cưới · 1/11 #17 Nuôi con · 2/11 #12 Đi chợ nhà 4 người · 3/11 #16 Xe máy mới hay cũ. Chơi hụi và Bảo hiểm khoản vay **hoãn** tới khi có giọng dự phòng (kháng cáo không gỡ được cảnh báo).

## Đo lại
Chạy `scripts/phan_tich.py` vào **thứ Hai 2/11**: so % xem TB và mức còn ở 60 giây của #11–#13 (mở đầu mới) với #1–#5. Nếu 60s tăng từ ~65% lên ≥ 75% thì giữ luật mới.
