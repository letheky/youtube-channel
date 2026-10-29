# Bộ chuẩn làm kênh YouTube mới

Bản 1.3 — 29/10/2026. Chuyển thể từ quy trình sản xuất Bác Sáu Sổ Sách; dùng **VSP TTS thay ElevenLabs**. Repo và tài sản Bác Sáu không bị chỉnh sửa.

## Đề xuất khởi đầu: Chú Tư Rành Đồ

Một nhân vật hoạt hình miền Nam giải thích đồ dùng và những chuyện trong nhà bằng tiếng Việt dễ hiểu. Người xem dự kiến: 25–45 tuổi, đang thuê nhà hoặc có gia đình; cần hiểu đồ mình đang dùng trước khi đổi cách dùng hoặc mua món mới.

Lời hứa của kênh: **“Hiểu món mình xài, quyết định cho đáng.”**

Chủ kênh đã chốt tên và tạo **Chú Tư Rành Đồ / @ChuTuRanhDo**, Channel ID `UCMDWcpFr6SZ1Nk7_ffVGTVA`; avatar/banner/mô tả/keywords đã lưu và xác minh ngày28/10. Định vị và nhu cầu thị trường vẫn là giả thuyết để thử; chưa có video công khai ở checkpoint khởi động. Không có cam kết view, RPM hay kiếm tiền. Tạo được handle không đồng nghĩa đã kiểm quyền thương hiệu.

Chú Tư là người dẫn chuyện hư cấu khoảng 40–50 tuổi, bình dân, tò mò, giọng miền Nam. Không tự nhận là thợ điện/chuyên gia đã kiểm định hoặc từng thử sản phẩm nếu chưa có bằng chứng thực tế. Nhận diện đề xuất: áo xanh chàm, kính tròn, sổ màu xanh; dựng bảng nhân vật mới, không dùng ảnh Bác Sáu hay nhân vật phụ từ kênh cũ.

Giọng đề xuất: **Thái Sơn (`vi-thai-son`)**, API mô tả nam miền Nam, kể chuyện. Cần nghe mẫu và chốt độ hợp nhân vật; mô tả của dịch vụ không chứng minh tuổi hay chất giọng thực tế.

### Những tập có thể nghiên cứu trước

Các tiêu đề dưới đây là câu hỏi biên tập, chưa phải kết luận đã kiểm chứng:

1. Ra ngoài 15 phút: tắt máy lạnh hay để chạy?
2. Inverter tiết kiệm điện trong trường hợp nào?
3. Tủ lạnh ít đồ có chắc ít tốn điện hơn?
4. Chế độ giặt nhanh có thay được chế độ thường không?
5. Cắm sạc qua đêm: điều gì thực sự xảy ra?
6. Máy lọc nước nhiều lõi hơn có luôn tốt hơn?
7. Vì sao phòng bên cạnh bắt Wi‑Fi yếu dù mạng vẫn nhanh?
8. Robot hút bụi hợp nhà nào, không hợp nhà nào?
9. Nhãn năng lượng giúp mình biết gì trước khi mua đồ?
10. Nồi chiên không dầu có thay được lò nướng không?

Ba hướng nội dung: hiểu thiết bị; sửa hiểu lầm thường gặp; chọn cách dùng theo hoàn cảnh. Mỗi tập cần một sơ đồ/cách giải thích riêng và nguồn kiểm được. Không giả làm video đo thử thực tế bằng ảnh AI.

Đề xuất thử **4–5 video dài/tuần trong 2 tuần**, mỗi video kèm một Short nếu đủ chất liệu và QA. Lấy 4 video/tuần làm nhịp cơ sở; chỉ tăng lên 5 khi bảo đảm chất lượng. Thử độ dài 8–12 phút, rồi điều chỉnh từ giữ chân thực tế. Đây là giả thuyết sản xuất cho kênh mới; thành tích 12–14 phút hay lịch mỗi ngày ở Bác Sáu không tự chứng minh phù hợp với kênh này. Giờ sản xuất do chủ kênh chốt: 00:00 hằng ngày, 05:30 chỉ tiếp phần dở; giờ đăng nghiên cứu/thử riêng. Trạng thái lịch tự động và kênh xem HANDOFF mới nhất.

Ba yêu cầu đã bổ sung theo trao đổi:

- **Thumbnail:** ưu tiên khuôn số A → “THẬT RA…” → số B, nhân vật biểu cảm mạnh và một đồ vật cụ thể; số có căn cứ trong video. Chuẩn bị 2–3 biến thể và dùng Test & compare/A/B Testing trong Studio khi video đủ điều kiện.
- **Mô tả:** mọi video dài và Short **dưới 300 ký tự tổng cộng**, gồm khoảng trắng, xuống dòng, URL và hashtag; không còn mức 1.200 ký tự. Lưu nguồn và chương đầy đủ trong hồ sơ sản xuất, chỉ đưa nguồn/chương vào mô tả nếu vẫn đủ chỗ.
- **Nhịp đăng:** thử 4–5 video dài/tuần trong 14 ngày để dành thêm nguồn lực cho nội dung, QA và theo dõi thử nghiệm. Không xem đây là bảo đảm YouTube sẽ phân phối nhiều hơn hoặc đã “thử đủ” sau 14 ngày. Dùng VSP nên lợi ích hiện tại là giảm khối lượng xử lý, không phải tiết kiệm credit ElevenLabs.

Chi tiết cách test, ví dụ từ #6/#8 của Bác Sáu và cách đánh giá nằm ở bước 7, 9, 10 trong `docs/QUY-TRINH.md`.

## Vận hành đã yêu cầu

Dự án thực thi riêng ở `D:/Repo/chu-tu-ranh-do`. Cửa sổ Brave dành cho kênh mới có HWND **3999536**; cần xác minh Channel ID mỗi lượt vì HWND có thể đổi và profile đang dùng chung phiên. Lịch sản xuất 00:00 / lượt tiếp việc dở 05:30 theo Asia/Saigon. Kế hoạch thử giờ đăng dài **11:30 và 19:30**, Short thử riêng **12:00 và 20:00**; đây là giả thuyết ban đầu, chưa có kết quả tối ưu. Xem `docs/LICH-VAN-HANH.md` và `docs/BRAVE.md`.

## Trong bộ này có gì

- `docs/QUY-TRINH.md`: quy trình 10 bước, tiêu chuẩn QA và cách bàn giao.
- `scripts/tao_giong.py`: VSP → WAV gốc → căn lời cục bộ → MP3 + JSON từng từ, tương thích cấu trúc Remotion của quy trình gốc.
- `scripts/configure_vsp.py`: nhập khóa từ file bạn đã cung cấp, không in khóa.
- `kich-ban/00-thu-giong.md`: mẫu kỹ thuật ngắn để kiểm âm thanh; không phải nội dung đem đăng.
- `tests/test_vsp_tts.py`: kiểm bảo toàn văn bản, cache, mốc từ và việc không gọi API ngoài ý muốn.

**Kênh đã tạo; tập01 đang sản xuất.** `remotion/` có theme/composition mới, character sheet4tư thế, hình căn hộ và bố cục12cảnh. Lượt05:30 đã thu riêngcảnh1 và dựng bản mở đầu31giây cùng2thumbnail; typecheck/giải mã/âm lượng đạt, **chưa ngheQA**, chưa phải tập phát hành. Phần2–12 chưa thu. Lời v1 tại `kich-ban/01-wifi-khac-goi-mang.md`, nguồn/shot plan/soát trước thu tại `docs/episodes/`; metadata vàQA có hồ sơ riêng. Đọc HANDOFF để tiếp đúng cổng kiểm nghe, không mở thêm đề tài hoặc tự thu lại.

## Chạy công cụ TTS trên Windows

Cần Python 3.12, FFmpeg và FFprobe trong PATH. Trong thư mục bộ này, mở PowerShell:

```powershell
python -m venv .venv
.\.venv\Scripts\python.exe -m ensurepip --upgrade
.\.venv\Scripts\python.exe -m pip install -r requirements.txt
# Đọc khóa từ file cục bộ; không chép khóa vào lệnh hoặc chat.
.\.venv\Scripts\python.exe scripts/configure_vsp.py 'D:/Repo/free tts.txt'
.\.venv\Scripts\python.exe scripts/tao_giong.py --list-voices
.\.venv\Scripts\python.exe scripts/tao_giong.py kich-ban/00-thu-giong.md --dry-run
.\.venv\Scripts\python.exe scripts/tao_giong.py kich-ban/00-thu-giong.md
```

Mốc từ dùng faster-whisper `small` cục bộ, CPU int8; lần đầu cần tải model nếu chưa có. Đặt `VSP_ALIGN_MODEL_DIR` vào thư mục cache khi cần quản lý dung lượng. Không gửi audio sang dịch vụ căn lời thứ hai. Không có khóa thật trong gói chia sẻ này; `.env` sinh ở máy sử dụng được gitignore.

Đầu ra trong `videos/<slug>/giong/`: WAV/MP3 gốc, JSON gốc có mốc từ, MP3/JSON đã hậu kỳ và manifest. Mốc từ là căn lời tự động, **không thay nghe/duyệt QA**. Mọi đoạn WAV API được lưu trong `.vsp` để tiếp tục căn lời mà không gọi TTS lại khi hậu kỳ lỗi.

Không có `--force` ghi đè nguồn. Khi gặp marker request nhưng chưa có WAV, dừng kiểm tra thay vì tự gửi lại. Nếu finalization bị ngắt giữa WAV/MP3/JSON, giữ nguyên cache và phục hồi thủ công; công cụ dừng để tránh ghi đè nguồn. Thay lời hoặc giọng sau thu phải dùng phiên bản/slug mới.

Với bản đã có final, chạy lại mặc định không thu/hậu kỳ lại. Muốn đổi nhịp một cách có chủ ý: `--chi-hau-ky`. Sau đó phải dựng lại timeline/shot và QA video.

Chạy kiểm tra không gọi dịch vụ thật:

```powershell
.\.venv\Scripts\python.exe -m unittest discover -s tests -v
```

## Tài liệu tham khảo đã kiểm

- [VSP TTS — API và danh sách giọng](https://vsp-translator.duckdns.org:9045/docs): schema kiểm trực tiếp 28/10/2026, WAV PCM, Bearer key, 25 giọng, không trả timestamp. Schema mô tả không áp quota ứng dụng; không suy ra SLA hoặc giá vĩnh viễn.
- [faster-whisper v1.2.1](https://github.com/SYSTRAN/faster-whisper/blob/v1.2.1/faster_whisper/transcribe.py): căn transcript đã cho theo âm thanh bằng `find_alignment`; ghim phiên bản do dùng API này.
- [EVNHANOI — chiến dịch Hà Nội 26+](https://www.evn.com.vn/d/vi-VN/news/EVNHANOI-phat-dong-chien-dich-HA-NOI-26-60-3557-508298): ví dụ nguồn chính thức có thể nghiên cứu cho nhóm sử dụng thiết bị; không phải bằng chứng lượng tìm kiếm hay cạnh tranh ngách.
- [YouTube — chính sách kiếm tiền](https://support.google.com/youtube/answer/1311392?hl=vi): nội dung lặp lại/sản xuất hàng loạt có thể không đủ điều kiện; cần giá trị giải thích và nội dung riêng cho từng tập.
- [YouTube — công bố AI](https://support.google.com/youtube/answer/14328491?hl=vi): đánh giá theo từng video; nội dung tổng hợp trông như thật cần công bố, hoạt hình rõ ràng không tự động thuộc cùng trường hợp.
- [YouTube — A/B test tiêu đề và thumbnail](https://support.google.com/youtube/answer/16391400?hl=en): tối đa 3 biến thể, kết quả dựa trên thời gian xem, có thể cần tới 2 tuần và có thể không có bản thắng rõ ràng.
- [YouTube — tần suất đăng và hiệu quả](https://support.google.com/youtube/answer/141805?hl=en): không bắt buộc đăng hằng ngày/hằng tuần và không có bảo đảm rằng tăng khoảng cách giữa các lần đăng sẽ tăng view. Kế hoạch 4–5 video/tuần là thử nghiệm nội bộ.

Khóa API, OAuth, quyền đăng, lịch tự động và quyền của kênh cũ không được mang sang kênh mới. Trạng thái tạo kênh, lịch tự động và quyền mới xem HANDOFF; không coi tài liệu hoặc form đã điền là kênh đã tạo.
