# AGENTS.md — Bác Sáu Sổ Sách

Kênh YouTube tài chính tiếng Việt, nhân vật hoạt hình **Bác Sáu** (kế toán về hưu, 20 năm nghề, giọng miền Nam).

## Phân công kịch bản — chủ dự án chốt 26/10/2026

- **Claude viết kịch bản từ giờ trở đi. Codex không tự viết kịch bản hoặc viết lại lời đọc.** Chỉ đạo trực tiếp: “từ giờ để claude lên kịch bản cho bạn lên kịch bản vừa bị eleven labs cảnh báo rồi”.
- Codex kiểm nguồn, tính toán bằng Python và soát bản Claude bàn giao, sau đó làm giọng trong quyền đã cấp, ảnh, dựng, QA, metadata và hẹn đăng. Nếu cần đổi lời đọc/số liệu trong lời đọc, ghi rõ góp ý để Claude sửa và bàn giao lại; không tự sửa thay Claude. Chưa có bản bàn giao thì chuẩn bị nguồn/tính toán, không tự điền kịch bản hoặc thu mới.
- Cảnh báo ElevenLabs phải được ghi nhận và xử lý theo HANDOFF; việc đổi người viết hoặc kiểm từ khóa không bảo đảm dịch vụ chấp thuận. Không gọi lại TTS để thử vượt cảnh báo. Có cảnh báo mới thì dừng thu và báo chủ dự án.
- #11 đã thu và khóa giọng: giữ nguyên lời/nguồn âm thanh, không thu lại. Việc sản xuất từ tài sản có sẵn theo trạng thái/quyền mới nhất trong HANDOFF.

Video dài 20–25 phút: giọng AI + ảnh AI + motion graphic bảng lãi lỗ. Nhiệm vụ đang làm: xem `HANDOFF.md`. **Quy trình trọn gói 10 bước (ý tưởng → hẹn giờ): `docs/QUY-TRINH.md`**; kho đề tài: `docs/Y-TUONG.md`. Quy trình shot/render: `docs/SHOTS.md`. Lịch đăng (1 video/ngày) + ngưỡng credit: `docs/LICH-DANG.md`.

## Pipeline
```
kich-ban/NN-ten.md ──tao_giong.py──▶ videos/NN-ten/giong/canh-XX.{mp3,json}   (ElevenLabs, mốc thời gian từng chữ)
                  ──tao_anh.py / Codex image_gen──▶ videos/NN-ten/anh/*.png
remotion/scripts/build-timeline.mjs ──▶ videos/NN-ten/timeline.json + phu-de.srt
remotion (Video-01) ──▶ videos/NN-ten/NN-ten.mp4
```

## Lệnh
```bash
# Python (Windows, Git Bash) — LUÔN đặt PYTHONUTF8=1
PYTHONUTF8=1 .venv/Scripts/python.exe scripts/tao_giong.py kich-ban/01-tra-sua-100-ly.md --dry-run
PYTHONUTF8=1 .venv/Scripts/python.exe scripts/tao_giong.py kich-ban/01-tra-sua-100-ly.md --chi-hau-ky   # xử lý lại giọng, KHÔNG tốn credit
PYTHONUTF8=1 .venv/Scripts/python.exe scripts/tao_anh.py  kich-ban/01-tra-sua-100-ly.md --dry-run

# Remotion (chạy trong remotion/)
node scripts/build-timeline.mjs 01-tra-sua-100-ly          # chạy lại sau MỌI thay đổi giọng/ảnh/shot
npx tsc                                                     # typecheck
npx remotion still src/index.ts Video-01 out/x.jpg --frame=1800 --scale=0.5   # kiểm tra 1 khung hình
npx remotion render src/index.ts Video-01 ../videos/01-tra-sua-100-ly/01-tra-sua-100-ly.mp4 --codec=h264 --crf=20   # ~33 phút
npx remotion still src/index.ts Thumbnail-01 ../videos/01-tra-sua-100-ly/thumbnail-final.jpg --image-format=jpeg
npm run studio                                              # xem trước tương tác
```
Sau render: chuẩn hóa âm lượng (video gốc ~ −30 dB):
`ffmpeg -i in.mp4 -c:v copy -af "loudnorm=I=-16:TP=-1.5:LRA=11" -c:a aac -b:a 192k -movflags +faststart out.mp4`

## Quy ước
- **Nhiều giọng:** kịch bản khai báo `- **Giọng phụ:** Tên=<voice_id>` ở đầu; lời thoại đánh dấu `[[Tên: …]]` trong LỜI ĐỌC. `tao_giong.py` gọi từng đoạn bằng đúng giọng rồi ghép (lặng 0,3s), mốc chữ đã dời sẵn.
- Chữ hiển thị, phụ đề, comment: **tiếng Việt có dấu**. Số theo kiểu Việt: `105,0 triệu`, `35.000đ` (`fmt()` trong `remotion/src/theme.ts`).
- Màu/font chỉ lấy từ `remotion/src/theme.ts` (giấy kem `C.paper`, đỏ `C.margin`/`C.red`, xanh `C.green`, vàng `C.gold`; Be Vietnam Pro + Patrick Hand).
- **Ảnh AI không được chứa chữ.** Mọi chữ trên hình do Remotion vẽ (AI vẽ chữ tiếng Việt hay sai dấu).
- Ảnh có Bác Sáu phải dùng ảnh tham chiếu `assets/nhan-vat/bang-nhan-vat.png` để giữ nhân vật đồng nhất (áo caro be, kính chữ nhật, bút xanh sau tai, sổ bìa đỏ, máy tính cũ).
- Overlay bảng số liệu bám theo lời đọc bằng **cue** = cụm chữ y nguyên trong lời đọc (`remotion/src/data/*.video.ts`, `remotion/src/video/cues.ts`). Cue không tìm thấy sẽ **ném lỗi khi render** — đó là cố ý.
- Mọi con số trong lời đọc phải khớp bảng giả định trong kịch bản. Đã từng có lỗi tính sai → luôn tự tính lại khi sửa số.

## Không được
> Ngoại lệ chỉ có hiệu lực khi `HANDOFF.md` ghi rõ quyền chủ dự án cấp, kèm phạm vi và thời hạn (ví dụ mục 0 của đợt 19–23/10/2026).
- Commit `.env`, `client_secret*.json`, `token*.json`, hay dán key vào code/log.
- Gọi API tốn tiền (ElevenLabs, OpenAI) khi chưa được chủ dự án đồng ý. Giọng của video #1 và #2 đã có — **không tạo lại** (dùng `--chi-hau-ky` nếu cần chỉnh tốc độ/khoảng nghỉ). Không sửa lời đọc trong kịch bản đã thu giọng.
- Đăng/công khai video lên YouTube.
- Sửa `videos/**/giong/*.goc.*` (bản gốc từ API, là nguồn để hậu kỳ lại).

## Bẫy đã gặp
- PowerShell pipe chèn BOM → dùng Git Bash + heredoc cho script Python/stdin.
- `eleven_v4` **bỏ qua** `voice_settings.speed` → làm chậm bằng ffmpeg `atempo` trong `tao_giong.py` (mặc định 0,9).
- `timeline.json` cũ sau khi sửa giọng → cue "không tìm thấy". Luôn chạy lại `build-timeline.mjs`.
- `npx remotion bundle` copy cả thư mục `videos/` vào `remotion/build/` → bundle cũ chứa timeline cũ. Ưu tiên render thẳng từ `src/index.ts`.
- `remotion.config.ts` đặt publicDir = `../videos`; trong code dùng `staticFile("01-tra-sua-100-ly/...")`.
