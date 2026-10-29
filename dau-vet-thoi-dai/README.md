# Dấu Vết Thời Đại · Traces of Time

Kênh Việt–Anh giải thích quốc gia, con người và những bước ngoặt định hình thế giới qua lịch sử, xã hội, kinh tế, chính trị, giáo dục và văn hóa. Mỗi tập bám một câu hỏi cụ thể, dùng tư liệu có nguồn và phân biệt dữ kiện, diễn giải, điều còn tranh luận.

Tên do chủ kênh chọn ngày28/10/2026. Đây là dự án riêng, không đổi tên/chủ đề của Bác Sáu Sổ Sách hoặc Chú Tư Rành Đồ. Channel ID chỉ ghi sau tạo và xác minh thực tế.

Đọc `AGENTS.md`, `HANDOFF.md`, `docs/QUY-TRINH.md`, `config/channel-binding.json`. Tài sản nhận diện tại `assets/branding/`. Chưa có renderer/video hoàn chỉnh; không gọi bộ hồ sơ khởi tạo là pipeline đã chạy thành công.

Checkpoint29/10: kênh **@DauVetThoiDaiOfficial / UCW_x25fRd3LXMAi5Nxq1y4g** đã tạo dưới Gmail Bác Sáu. Avatar, mô tả VI/translation EN/12 keywords đã lưu; **banner chưa lưu, cần tải lại và chờ xác nhận Publish**. Có nhạc hiệu gốc intro/outro v1 (chưa nghe QA), kịch bản thử Napoleon VI/EN và renderer storyboard chưa thu giọng. Đọc HANDOFF hiện tại; `docs/CHECKPOINT-2026-10-29.md` là hồ sơ trước tạo kênh.

Chạy kiểm tra bằng Python3.12/Pillow, FFmpeg/FFprobe trên PATH và fontArial của Windows:

```powershell
python -m unittest discover -s tests -v
python scripts/render_documentary_preview.py episodes/01-napoleon-code-civil/episode.json --output work/preview-new-version --stills-only
```

Bỏ `--stills-only` để render bản VI chưa thu giọng; thêm `--lang en` cho layoutEN. Dùng thư mục output mới, không ghi đè preview cũ. `scripts/build_brand_audio.py` chỉ tạo bảnv1 khi file chưa tồn tại; không chạy lại để kiểm audio đã có. Đây chưa phải pipeline TTS/phụ đề căn lời/upload.

Bàn giao session29/10/2026: đọc `START-NEXT-SESSION.md`, `HANDOFF.md` và `docs/BRAVE.md`. Không tạo lại kênh, không sửa kênh handle ngắn @DauVetThoiDai. Chưa upload video hoặc tạo automation riêng.
