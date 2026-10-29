# Video #11 — Vay App Lãi 1%: Nhận 4 Triệu, 30 Ngày Trả 5,05 Triệu?
- **Kênh:** Bác Sáu Sổ Sách
- **Thời lượng ước tính:** 12–14 phút; kiểm lại sau giọng thật.
- **Nhân vật phụ:** con Út, bảng có sẵn `assets/nhan-vat/con-ut.png`; tóc đen cột cao, áo sơ mi trắng ngắn tay, quần dài be, túi chéo nâu, giày trắng. Bác thuật lại, chỉ một giọng.
- **Quyền:** HANDOFF/commit 06c120c, riêng #11–#17 tới hết 4/11/2026; chưa thu tại lúc viết.
---
## Thông tin đăng tải
**Tiêu đề (chọn 1):**
1. Vay App Lãi 1%: Nhận 4 Triệu, 30 Ngày Trả 5,05 Triệu?
2. Giấy Vay 5 Triệu, Ví Chỉ Nhận 4: Dòng Phí Nào Bị Bỏ Qua?
3. “Lãi 1%” Nhưng Tốn 26,25% Trong 30 Ngày? Bác Sáu Mở Sổ
**Thumbnail:** chữ lớn “LÃI 1%?” / “TỐN 26,25%”; nhỏ “MÔ HÌNH 30 NGÀY”; chữ Remotion, không để AI vẽ.
```text
Flat 2D cartoon, thick outlines, warm colors, 16:9. [Reference: Bác Sáu character sheet] Match attached Bac Sau and Ut character sheets exactly. YouTube thumbnail background. Ut holds a blank smartphone with a startled but not terrified face, Bac Sau holds a blank red ledger, both entirely in the right sixty percent of frame. Left forty percent clean dark teal empty wall for native title overlay. Warm Vietnamese home, bold silhouettes, no borders. Plain props without any printed markings, blank currency-like paper not actual banknotes, no logos, no badges or lanyards. No text, letters, numbers, logos or watermarks.
```
**Thẻ:** vay app, chi phí khoản vay, lãi suất thực nhận, phí giải ngân, tín dụng tiêu dùng, vay online, hợp đồng vay, dòng tiền trả nợ, Bác Sáu Sổ Sách
---
## Bảng giả định — hợp đồng hư cấu, không bảng giá hoặc kết luận pháp lý về app thật
| Hạng mục | Giá trị | Phạm vi |
|---|---:|---|
| Ghi trên giấy / phí trừ ngay | 5.000.000 / 1.000.000 đ | Chỉ mô hình; không nêu nhãn hàng |
| Thực nhận ngày 0 | 4.000.000 đ | Phí đã trừ đúng một lần |
| Lãi riêng, đúng kỳ 30 ngày | 1% × 5 triệu = 50.000 đ | Không kỳ trả giữa chừng, không chi khác/chậm trả |
| Trả ngày 30 / chi phí | 5.050.000 / 1.050.000 đ | Chi phí = trả − nhận ròng = phí + lãi |
| Tỷ lệ chi phí / thực nhận | 26,25% / 30 ngày | Nếu chia sai mẫu số 5 triệu: 21% |
| Quy đổi đơn 365 ngày | 319,375%/năm, lời khoảng319,4% | Không lãi kép, không dự báo vay nối, không statutory APR |
| Nhánh trả sớm ngày15 | Lãi25.000, trả5.025.000, chi1.025.000 | Giả định phí không hoàn/không phí tất toán thêm; không luật chung |
| Lương / sinh hoạt / khả dụng | 8 triệu /6 triệu /2 triệu | Lương về ngày40, nợ ngày30; không dùng cả lương làm tiền rảnh |
| Thiếu ngân sách / lệch ngày | 3.050.000 đ /10 ngày | Hai rủi ro riêng |
| Khoản mới giống hệt | Nhận4 triệu, vẫn thiếu1.050.000 đóng nợ cũ | Không khuyến nghị đảo nợ; khoản mới hẹn trả5.050.000 |

Python: `scripts/kiem_tra_video_11.py`; Decimal50, không làm tròn giữa chuỗi. VND hiển thị tới đồng, tỷ lệ kỳ chính xác26,25%; tỷ lệ năm lời khoảng319,4%. Mở đầu có nhãn native “MÔ PHỎNG”; lời giải thích sau60giây. Cảnh1 phải ≤45giây theo giọng thật; điểm miễn trừ đầu cảnh2 kiểm ≥60giây trước khóa QA. Không thay lời sau TTS.
---

## CẢNH 1 — Bốn triệu vô ví, năm triệu hẹn trả
`[ẢNH]` Bốn triệu vô ví, năm triệu hẹn trả; theo bảng Bác/Út, không chữ trong ảnh.
```text
Flat 2D cartoon, thick outlines, warm colors, 16:9. [Reference: Bác Sáu character sheet] Match attached Bac Sau and Ut character sheets exactly. Ut in her white short sleeved collared blouse, tan high waist wide trousers, brown crossbody bag and ponytail at a small Vietnamese home tea table, looking surprised at a blank smartphone while Bac Sau holds his closed red ledger. Medium two person view, morning window light. Plain props without any printed markings, blank currency-like paper not actual banknotes, no logos, no badges or lanyards. No text, letters, numbers, logos or watermarks.
```
`[CHỮ]` Native overlay từ bảng giả định và nguồn; tách khỏi mặt/phụ đề.
**LỜI ĐỌC:**
Bốn triệu vô ví, ba mươi ngày sau phải trả năm triệu năm chục ngàn. Vậy mà trên điện thoại, con Út chỉ nhìn thấy dòng lãi một phần trăm. Nó kéo ghế ngồi xuống, hỏi Bác: “Có năm chục ngàn tiền lãi thôi, sao con thấy ví hụt dữ vậy?” Khoan, đưa sổ đây Bác coi. Bác chưa coi nút duyệt nhanh, Bác coi tiền nào thật sự tới tay con. Tới cuối cuốn sổ, bà con sẽ biết một phần trăm ấy đang bỏ sót khoản nào, và ngày lãnh lương có cứu nổi ngày hẹn trả hay không.

---

## CẢNH 2 — Giấy ghi một đằng, ví nhận một nẻo
`[ẢNH]` Giấy ghi một đằng, ví nhận một nẻo; theo bảng Bác/Út, không chữ trong ảnh.
```text
Flat 2D cartoon, thick outlines, warm colors, 16:9. [Reference: Bác Sáu character sheet] Match attached Bac Sau and Ut character sheets exactly. Bac Sau and Ut at a Vietnamese home tea table, Bac separates two entirely blank cream sheets, Ut points at a blank phone with a puzzled expression. Three quarter waist up view, tidy interior. Plain props without any printed markings, blank currency-like paper not actual banknotes, no logos, no badges or lanyards. No text, letters, numbers, logos or watermarks.
```
`[CHỮ]` Native overlay từ bảng giả định và nguồn; tách khỏi mặt/phụ đề.
**LỜI ĐỌC:**
Út đặt điện thoại bên ly nước. Chỗ nổi nhất là số tiền được duyệt, còn dòng tiền chuyển vào thì nằm phía dưới. Nó đã định dùng khoản ấy để trả một việc trong nhà. Bác kéo cuốn sổ lại gần, đặt hai tờ giấy cạnh nhau: tờ ghi tiền nhận, tờ ghi tiền phải trả. Cái nút màu sáng không đổi được hai tờ giấy này. Út muốn coi cho hết trước khi bấm, nên Bác giữ nguyên màn hình, không vội xác nhận gì cả. Nó chỉ vào lời nhắc trả trên máy rồi nhìn cuốn lịch treo tường. Bác hỏi tiền lương đã về hôm ấy chưa. Út im một nhịp, kéo ghế sát lại.

Từ đây Bác đặt một hợp đồng giả định để tính, không sao chép biểu phí hay kết luận về một ứng dụng có thật. Giấy ghi vay năm triệu, phí ban đầu một triệu bị trừ ngay, nên tiền có thể dùng chỉ bốn triệu. Lãi cho đúng ba mươi ngày là một phần trăm tính trên năm triệu, tức năm chục ngàn. Cuối ngày thứ ba mươi, trả cả năm triệu gốc và năm chục ngàn lãi. Không trả góp giữa kỳ, không phí khác, không chậm trả.

Một triệu đã bị giữ lại lúc đầu. Nó không nằm trong ví Út để trả tiền nhà, cũng không xuất hiện lần nữa trong khoản chuyển đi cuối kỳ. Bác ghi phí đúng một lần, nghen. Nếu vừa lấy tiền nhận ròng bốn triệu làm đầu vào, vừa cộng thêm một triệu vào tiền trả năm triệu năm chục ngàn, là đếm phí hai lần. Bảng của mình chỉ có hai mốc tiền: nhận bốn triệu hôm nay, trả năm triệu năm chục ngàn sau ba mươi ngày.

---

## CẢNH 3 — Kết sổ trước: tốn hơn một phần tư tiền nhận
`[ẢNH]` Kết sổ trước: tốn hơn một phần tư tiền nhận; theo bảng Bác/Út, không chữ trong ảnh.
```text
Flat 2D cartoon, thick outlines, warm colors, 16:9. Overhead still life at the same tea table: one open blank red ledger, four identical unmarked green paper rectangles next to a closed envelope, an old calculator with all keys blank. No people. Plain props without any printed markings, blank currency-like paper not actual banknotes, no logos, no badges or lanyards. No text, letters, numbers, logos or watermarks.
```
`[CHỮ]` Native overlay từ bảng giả định và nguồn; tách khỏi mặt/phụ đề.
**LỜI ĐỌC:**
Chi phí là một triệu năm chục ngàn trong ba mươi ngày, bằng hai mươi sáu phẩy hai mươi lăm phần trăm số tiền thực nhận. Lấy năm triệu năm chục ngàn phải trả, trừ bốn triệu đã nhận, còn một triệu năm chục ngàn. Trong đó một triệu là phí ban đầu, năm chục ngàn là lãi ghi riêng.

Út hỏi: “Sao không chia cho năm triệu trên giấy?” Vì câu Bác đang trả lời là: có bốn triệu dùng được, phải bỏ thêm bao nhiêu để khép khoản vay? Mẫu số phải là bốn triệu. Nếu đem cùng chi phí ấy chia năm triệu, ra hai mươi mốt phần trăm. Phép chia vẫn đúng, nhưng đang đo trên một số tiền mà Út không được cầm đủ.

Còn dòng một phần trăm? Năm chục ngàn chia năm triệu đúng là một phần trăm. Nó chỉ mô tả tiền lãi được ghi riêng trên giấy, chưa mô tả toàn bộ dòng tiền của Út. Phí gọi là xử lý, thẩm định hay tên gì, nếu bắt buộc để có khoản vay này thì Bác vẫn đưa vào phép tính tiền ra tiền vô.

---

## CẢNH 4 — Cùng khoản phí, đổi ngày là đổi phép so
`[ẢNH]` Cùng khoản phí, đổi ngày là đổi phép so; theo bảng Bác/Út, không chữ trong ảnh.
```text
Flat 2D cartoon, thick outlines, warm colors, 16:9. [Reference: Bác Sáu character sheet] Match attached Bac Sau and Ut character sheets exactly. Ut and Bac Sau comparing two unmarked calendar blocks and an open blank red ledger at their tea table, warm afternoon light, side view. Calendar surfaces and phone completely blank. Plain props without any printed markings, blank currency-like paper not actual banknotes, no logos, no badges or lanyards. No text, letters, numbers, logos or watermarks.
```
`[CHỮ]` Native overlay từ bảng giả định và nguồn; tách khỏi mặt/phụ đề.
**LỜI ĐỌC:**
Ba mươi ngày phải được giữ nguyên bên cạnh tỷ lệ hai mươi sáu phẩy hai mươi lăm phần trăm. Nếu cần một thước so theo năm, lấy tỷ lệ kỳ này nhân ba trăm sáu mươi lăm rồi chia ba mươi, được khoảng ba trăm mười chín phẩy bốn phần trăm một năm theo cách quy đổi đơn. Đây không phải số tiền chắc chắn phải trả trong một năm, không phải lãi kép, cũng không phải kết luận pháp lý về lãi suất của một sản phẩm thật. Mình không tự giả định vay nối liên tục cả năm.

Bác thử thêm một nhánh riêng. Út có tiền trả sớm ở ngày mười lăm. Trong nhánh giả định này, lãi tính theo ngày giảm còn hai mươi lăm ngàn, nhưng một triệu phí đã thu không hoàn lại, và không có phí tất toán thêm. Vậy Út trả năm triệu hai mươi lăm ngàn. Chi phí so với bốn triệu nhận ban đầu vẫn là một triệu hai mươi lăm ngàn. Trả sớm tiết kiệm hai mươi lăm ngàn, chứ không tự được hoàn nửa triệu phí.

Bác không nói hợp đồng nào cũng giữ phí như vậy. Chính vì điều khoản hoàn phí và trả trước hạn có thể khác, bà con phải hỏi bằng văn bản trước khi ký. Đừng nghe câu “trả sớm bớt lãi” rồi tưởng mọi khoản đều bớt theo. Muốn so hai nơi, đem cùng số tiền thực nhận, cùng ngày cần tiền, cùng lịch trả và đầy đủ khoản bắt buộc ra so. Khoản chia nhiều kỳ còn phải tính theo từng ngày tiền đi, không lấy công thức một lần cuối kỳ này ghép đại vào.

---

## CẢNH 5 — Có lương không có nghĩa tới ngày là đủ
`[ẢNH]` Có lương không có nghĩa tới ngày là đủ; theo bảng Bác/Út, không chữ trong ảnh.
```text
Flat 2D cartoon, thick outlines, warm colors, 16:9. [Reference: Bác Sáu character sheet] Match attached Bac Sau and Ut character sheets exactly. Ut in her modest home kitchen looking thoughtfully at a small wallet and a blank envelope, groceries and rice bowl on table; no other people. Waist up, three quarter front view, front shirt buttons and collar anatomically correct. Plain props without any printed markings, blank currency-like paper not actual banknotes, no logos, no badges or lanyards. No text, letters, numbers, logos or watermarks.
```
`[CHỮ]` Native overlay từ bảng giả định và nguồn; tách khỏi mặt/phụ đề.
**LỜI ĐỌC:**
Út vẫn thiếu ba triệu năm chục ngàn, dù có lương tám triệu. Đây là một bảng ngân sách giả định khác Bác đặt thêm: tiền lương về ngày thứ bốn mươi, sinh hoạt thiết yếu sáu triệu, còn hai triệu có thể dành trả khoản này. Khoản phải trả là năm triệu năm chục ngàn. Lấy khoản phải trả trừ hai triệu còn lại, thiếu ba triệu năm chục ngàn. Bác không lấy cả tám triệu lương làm tiền rảnh, vì tiền ăn và tiền nhà vẫn phải trả.

Còn có một lỗ hổng về ngày. Nợ hẹn ngày ba mươi, lương tới ngày bốn mươi, lệch mười ngày. Dù cuối cùng thu nhập đủ, tiền chưa về đúng ngày thì vẫn chưa có để chuyển. Một dòng tổng thu cuối tháng không xóa được chỗ trống trên lịch. Bác hỏi Út khoản tiền nào đã có sẵn ở ngày ba mươi, thay vì hỏi tháng ấy tổng cộng kiếm bao nhiêu.

Nó tính vay một khoản giống vậy ở chỗ khác để trả khoản trước. Nhưng giấy vay mới cũng năm triệu, trừ phí còn bốn triệu. Mang cả bốn triệu đó đi vẫn thiếu một triệu năm chục ngàn để đóng khoản cũ. Trong khi khoản mới lại hẹn trả năm triệu năm chục ngàn. Mình chưa tạo thêm thu nhập nào, chỉ mở thêm một ngày hẹn và một khoản phí. Đây là cảnh báo về dòng tiền, không phải cách đảo nợ. Nếu thấy không đủ trả, cần liên hệ bên cho vay qua kênh đã xác minh để hỏi phương án phù hợp, trước khi tới hạn; việc họ có chấp thuận hay không còn theo hồ sơ và quy định.

---

## CẢNH 6 — Hai câu hỏi pháp lý phải đặt riêng
`[ẢNH]` Hai câu hỏi pháp lý phải đặt riêng; theo bảng Bác/Út, không chữ trong ảnh.
```text
Flat 2D cartoon, thick outlines, warm colors, 16:9. [Reference: Bác Sáu character sheet] Match attached Bac Sau and Ut character sheets exactly. Bac Sau and Ut examining blank loan papers at a clean community advice desk with simple bookshelves, both seated facing forward. Bac points with one open hand; Ut holds her brown bag at her side. No seals or official badges. Plain props without any printed markings, blank currency-like paper not actual banknotes, no logos, no badges or lanyards. No text, letters, numbers, logos or watermarks.
```
`[CHỮ]` Native overlay từ bảng giả định và nguồn; tách khỏi mặt/phụ đề.
**LỜI ĐỌC:**
Hai mươi phần trăm một năm không phải cái thước áp một lượt cho mọi ứng dụng. Điều bốn trăm sáu mươi tám của Bộ luật Dân sự quy định giới hạn lãi suất thỏa thuận trong quan hệ thuộc phạm vi điều chỉnh, đồng thời có ngoại lệ khi luật liên quan quy định khác. Phần lãi vượt giới hạn theo điều này không có hiệu lực. Nhưng đừng từ đó tự suy mọi khoản vay cao hơn con số ấy đều là cùng một loại vi phạm, hoặc cứ thấy cao là được bỏ nghĩa vụ trả nợ.

Với tổ chức tín dụng, Luật Các tổ chức tín dụng có quy định về thỏa thuận lãi suất và phí theo pháp luật chuyên ngành. Trước hết phải biết tên pháp nhân nào là bên cho vay trong hợp đồng, không chỉ tên biểu tượng trên máy.

Bản hợp nhất quy định cho vay của Ngân hàng Nhà nước Bác kiểm có yêu cầu cung cấp thông tin lãi, cách tính và các loại phí trước khi xác lập thỏa thuận. Cho vay tiêu dùng của công ty tài chính còn có quy định riêng cần đối chiếu.

Cho vay ngang hàng cũng có cơ chế thử nghiệm có kiểm soát theo Nghị định chín mươi bốn. Có cơ chế thử nghiệm không có nghĩa mọi ứng dụng tự xưng ngang hàng đều đã được chấp thuận hay Nhà nước bảo đảm trả nợ. Phải kiểm tra đơn vị và phạm vi được phép qua thông tin chính thức, không qua huy hiệu họ tự dán.

---

## CẢNH 7 — Phí bị trừ và tiền nộp để mở khóa là hai chuyện
`[ẢNH]` Phí bị trừ và tiền nộp để mở khóa là hai chuyện; theo bảng Bác/Út, không chữ trong ảnh.
```text
Flat 2D cartoon, thick outlines, warm colors, 16:9. [Reference: Bác Sáu character sheet] Match attached Bac Sau and Ut character sheets exactly. Ut holding a blank smartphone away from her face while placing her other open palm in a calm stop gesture, Bac Sau nearby with red ledger, home doorway in warm evening light. No message symbols or lettering. Plain props without any printed markings, blank currency-like paper not actual banknotes, no logos, no badges or lanyards. No text, letters, numbers, logos or watermarks.
```
`[CHỮ]` Native overlay từ bảng giả định và nguồn; tách khỏi mặt/phụ đề.
**LỜI ĐỌC:**
Có một chuyện còn nguy hiểm hơn bảng phí đắt: chuyển tiền đi rồi không nhận được khoản vay nào. Cảnh báo của cơ quan Công an Bác kiểm nêu thủ đoạn giả đơn vị cho vay, yêu cầu nộp tiền trước với lý do hồ sơ, xác minh hoặc giải ngân. Sau lần chuyển đầu, họ có thể bày thêm lý do để đòi chuyển tiếp. Đó không phải nhánh nhận bốn triệu rồi trả nợ mà Bác vừa tính.

Phí bị trừ trong một hợp đồng cần đọc kỹ là một vấn đề. Lời nhắn “chuyển thêm để mở khóa khoản vay” từ một tài khoản lạ là dấu hiệu phải dừng và xác minh. Đừng gửi tiền tiếp chỉ vì tiếc khoản đã chuyển. Bác không cần bà con đưa thông tin riêng vào phần bình luận để tính giúp.

Nếu đã có dấu hiệu bị lừa hoặc đe dọa, giữ lại hợp đồng, sao kê, tin nhắn, số tài khoản và thời điểm giao dịch để trình báo cơ quan Công an. Đừng xóa hết bằng chứng trong lúc hoảng, cũng đừng trả tiền cho người lạ hứa lấy lại tiền. Còn khoản vay thật đang có tranh chấp thì tìm hỗ trợ pháp lý phù hợp, không tự lấy một phép chia trong video làm thông báo hủy nợ.

Út xoay màn hình về phía mình. Nó bỏ qua hình cái khiên sáng bóng, tìm tên bên cho vay, tiền thực nhận, khoản phải trả và ngày phải trả. Một màn hình nhìn đàng hoàng chưa chứng minh được người nhận tiền phía bên kia. Coi đủ thông tin trước khi bấm thường chậm hơn vài phút, nhưng đỡ phải chạy theo nhiều lời hứa sau đó.

---

## CẢNH 8 — Bấm chậm một chút, nhìn đủ hai đầu tiền
`[ẢNH]` Bấm chậm một chút, nhìn đủ hai đầu tiền; theo bảng Bác/Út, không chữ trong ảnh.
```text
Flat 2D cartoon, thick outlines, warm colors, 16:9. [Reference: Bác Sáu character sheet] Match attached Bac Sau and Ut character sheets exactly. Bac Sau and Ut smiling calmly at their tea table, closed blank phone set aside, blank red ledger open, her brown bag on chair. Front medium two person composition with faces above the middle. Plain props without any printed markings, blank currency-like paper not actual banknotes, no logos, no badges or lanyards. No text, letters, numbers, logos or watermarks.
```
`[CHỮ]` Native overlay từ bảng giả định và nguồn; tách khỏi mặt/phụ đề.
**LỜI ĐỌC:**
Nhận bốn triệu, trả năm triệu năm chục ngàn: chi phí một triệu năm chục ngàn cho ba mươi ngày. Bác quay lại đúng hai mốc ban đầu. Trong mô hình này, nó là hai mươi sáu phẩy hai mươi lăm phần trăm tiền có thể dùng, dù dòng lãi ghi riêng chỉ một phần trăm trên năm triệu. Cái ví trả lời khác cái nhãn vì cái nhãn chưa kể đủ phí.

Út chưa bấm nhận khoản vay ấy. Nó viết riêng tờ giấy có tiền nhận ròng, từng ngày phải trả, các khoản bắt buộc, điều kiện trả sớm và tên pháp nhân cho vay. Bên nào không giải thích rõ, nó chưa có đủ căn cứ để quyết định.

Bà con nhớ ba chuyện. Thứ nhất, tính từ số tiền thật tới tay, đừng chỉ nhìn con số được duyệt. Thứ hai, gắn mọi tỷ lệ với thời gian và lịch trả, đừng so phần trăm của hai kỳ khác nhau. Thứ ba, kiểm tra bên cho vay và điều khoản trước khi chuyển tiền hoặc đưa dữ liệu. Phép tính rõ vẫn phải đi cùng việc xác minh đúng người.

Nếu cần tiền gấp, một khoản vay dễ bấm không tự tạo ra khoản thu để trả. Có khó khăn thì tìm kênh hỗ trợ hợp pháp phù hợp hoàn cảnh, đừng nhận thêm khoản mới chỉ để che số thiếu ở khoản cũ. Bà con thấy dòng nào trên giấy vay dễ làm mình bỏ sót nhất? Bình luận về dòng đó thôi, đừng đăng số điện thoại, hợp đồng hoặc thông tin cá nhân. Thấy cuốn sổ này hữu ích thì gửi cho người đang cần coi và đăng ký kênh Bác Sáu Sổ Sách nghen. **Duyệt nhanh một phút. Trả bằng tiền thật.**

---

## Nguồn & mục cần kiểm tra trước khi đăng

Kiểm ngày26/10/2026. Mọi mức phí/dòng tiền/lương là giả định.

- [Bộ luật Dân sự2015 Điều468](https://datafiles.chinhphu.vn/cpp/files/vbpq/2016/01/91.signed.pdf): Giới hạn20% và ngoại lệ luật liên quan; nguồn MOJ hỏi đáp hỗ trợ khi bản PDF scan, không áp chung cho TCTD.
- [Luật Các TCTD2024 Điều100](https://xaydungchinhsach.chinhphu.vn/toan-van-luat-cac-to-chuc-tin-dung-119240405135841794.htm): Thỏa thuận lãi/phí theo pháp luật chuyên ngành, không khẳng định mọi phí hợp pháp.
- [VBHN86/NHNN30-6-2026 Điều13/16](https://datafiles.chinhphu.vn/cpp/files/vbpq/2026/7/86-vbhn-nhnn.pdf): Có cập nhật TT29/2026 hiệu lực15/8/2026; cung cấp thông tin lãi/phí. Không dùng bản06/VBHN cũ làm bản mới nhất.
- [NĐ94/2025 thử nghiệm](https://baochinhphu.vn/co-che-thu-nghiem-co-kiem-soat-trong-linh-vuc-ngan-hang-102250430145715956.htm): Có cơ chế thử nghiệm P2P, không chấp thuận toàn bộ app hoặc bảo đảm khoản vay.
- [Công an Cà Mau24/8/2026](https://congan.camau.gov.vn/ch26/1448-Canh-bao-thu-doan-lua-dao-cho-vay-tien-online.html): Cảnh báo chuyển phí trước/cung cấp dữ liệu, giữ bằng chứng; không nêu tên app hay dữ liệu cá nhân.
- [Bộ Tư pháp giải thích Điều468](https://pbgdpl.gov.vn/Pages/chi-tiet-tin.aspx?ItemID=2216&l=Nghiencuutraodoi): Kết quả tìm kiếm chính thức có nội dung20%; toàn trang mở403, không tuyên bố đã đọc toàn trang.

Không kết luận hình sự/không hướng dẫn trốn nghĩa vụ; chi phí cashflow khác lãi pháp lý. Nguồn nguồn chính thức giới hạn theo phần đã đọc. Không còn số thị trường thiếu nguồn.
