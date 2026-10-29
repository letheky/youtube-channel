# Bác Sáu Sổ Sách

Hệ thống sản xuất video cho kênh YouTube [@BacSauSoSach](https://www.youtube.com/@BacSauSoSach).

## Quy trình
1. **Kịch bản** — `kich-ban/NN-ten-video.md` (lời đọc, prompt ảnh từng cảnh, ghi chú motion graphic)
2. **Ảnh** — OpenAI, dùng ảnh tham chiếu trong `assets/nhan-vat/`
3. **Giọng** — ElevenLabs, kèm mốc thời gian từng chữ để làm phụ đề
4. **Dựng video** — Remotion (`remotion/`)
5. **Đăng** — YouTube Data API, mặc định Riêng tư

## Cấu trúc
| Thư mục | Nội dung |
|---|---|
| `kich-ban/` | Kịch bản từng video |
| `assets/nhan-vat/` | Bảng nhân vật Bác Sáu, avatar, banner |
| `assets/nhac-nen/` | Nhạc nền (chỉ dùng nhạc có quyền sử dụng) |
| `videos/NN-ten-video/` | Ảnh cảnh, file giọng, video xuất ra (không commit file nặng) |
| `remotion/` | Template motion graphic |
| `scripts/` | Script gọi API |

## Cài đặt
Sao chép `.env.example` thành `.env` và điền key. Không bao giờ commit `.env` hay `client_secret.json`.

## Chạy script
Cài một lần:
```bash
python -m uv venv .venv
python -m uv pip install --python .venv/Scripts/python.exe -r scripts/requirements.txt
```

Luôn chạy `--dry-run` trước để xem sẽ tốn bao nhiêu ký tự / bao nhiêu ảnh:
```bash
.venv/Scripts/python scripts/tao_giong.py kich-ban/01-tra-sua-100-ly.md --dry-run
.venv/Scripts/python scripts/tao_anh.py kich-ban/01-tra-sua-100-ly.md --dry-run
```

Bỏ `--dry-run` để chạy thật. `--canh 1,3-5` chỉ làm vài cảnh, `--force` tạo lại file đã có.
Ảnh tham chiếu nhân vật đặt tại `assets/nhan-vat/bang-nhan-vat.png`.
Kết quả nằm trong `videos/<tên-kịch-bản>/giong/` và `videos/<tên-kịch-bản>/anh/`.

## Tải lên YouTube
Chuẩn bị một lần: tạo OAuth client "Desktop app" trên Google Cloud (bật YouTube Data API v3), lưu thành `client_secret.json` ở thư mục gốc — xem hướng dẫn đầu file `scripts/upload_youtube.py`.
```bash
.venv/Scripts/python scripts/upload_youtube.py 01-tra-sua-100-ly --dry-run     # xem trước
.venv/Scripts/python scripts/upload_youtube.py 01-tra-sua-100-ly               # video dài, Riêng tư + thumbnail + phụ đề
.venv/Scripts/python scripts/upload_youtube.py 01-tra-sua-100-ly --short       # Short
```
Project chưa được YouTube kiểm định thì video tải qua API luôn ở chế độ Riêng tư — chuyển công khai trong YouTube Studio.
