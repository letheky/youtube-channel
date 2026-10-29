# Tập01 — kế hoạch hình trước thu v1

Chưa có timing audio của tập01. Các câu dưới đây là neo nguyên văn trong lời; chỉ đổi thành frame sau khi có audio đã QA. Không dùng thời gian của mẫu kỹ thuật cho tập này.

## Cảnh1 — hai vị trí, một chiếc điện thoại

- Neo “Ngoài phòng khách, coi video ngon lành.”: Chú Tư cạnh router, bố cục phòng khách; điện thoại không hiện thương hiệu hoặc số đo.
- Neo “Nhưng tiền gói cước cao hơn có làm sóng đi xuyên bức tường tốt hơn không?”: chuyển mặt bằng sang phòng ngủ, biểu cảm thắc mắc, lần lượt hiện ba câu hỏi.
- Neo “Bữa nay Tư cùng bà con tách từng chặng ra coi.”: đưa ra sơ đồ hai chặng. Nguồn S1; đây là tình huống kể chuyện hư cấu, không phải cảnh đo thật.

## Cảnh2 — đường nhà mạng và Wi-Fi

- Neo “Mình thường gọi chung tất cả là mạng.”: phóng sơ đồ Internet → router → điện thoại; đánh màu hai chặng.
- Neo “Gói cước là chuyện của đường dịch vụ.”: lần lượt highlight đường dịch vụ và đường không dây; không hiện tốc độ quảng cáo.
- Neo “Vậy nên, thấy chậm rồi kết luận ngay một bên có lỗi thì còn sớm.”: hai nhánh cần kiểm, chưa đánh dấu bên nào lỗi. Nguồn S1,S7.

## Cảnh3 — mô hình cổ chai

- Neo “Tư lấy một ví dụ giả định cho dễ hình dung, không phải số đo của nhà nào nghen.”: bật nhãn **VÍ DỤ GIẢ ĐỊNH · KHÔNG PHẢI SỐ ĐO** trước mọi con số, giữ suốt cảnh.
- Neo “Giờ mình đổi chặng đầu thành chín trăm.”: từ600 sang900 ở chặng đầu, giữ20 ở chặng sau; chỉ hiện+50% sau câu nêu phép tăng. Đơn vị Mbps được giải thích một lần.
- Neo “Tốc độ thật còn có phần hao hụt và điều kiện khác, không lấy phép tính này làm lời hứa kết quả.”: hiện giới hạn của mô hình. Nguồn mô hình do kênh tính; không gán các con số cho hãng.

## Cảnh4 — vật cản

- Neo “Đầu tiên là đường đi của tín hiệu.”: mặt bằng khác góc nhìn cảnh1, cùng vị trí router/điện thoại.
- Neo “Tài liệu của các hãng mạng đều lưu ý chuyện vật cản.”: highlight tường, tủ, kim loại; mũi tên suy yếu minh họa, không có heatmap giả định lượng.
- Neo “Cho nên hai căn nhà cùng diện tích chưa chắc có cùng vùng sóng.”: so hai bố trí nội thất, nhãn “minh họa, không đo vùng phủ”. Nguồn S2,S4.

## Cảnh5 — băng tần

- Neo “Rồi tới băng tần.”: hai thẻ2,4GHz và5GHz, không làm bảng thông số của model chưa có.
- Neo “Mỗi dải có những đánh đổi.”: hiện khoảng cách/vật cản/khả năng thiết bị, không biến thành cuộc thi thắng tuyệt đối.
- Neo “Nếu cục phát và thiết bị có hỗ trợ, mình có thể so các lựa chọn sẵn có.”: hai lựa chọn thử trên cùng thiết bị, giữ điều kiện hỗ trợ và cấu hình vùng. Nguồn S3.

## Cảnh6 — tín hiệu và đường rảnh

- Neo “Còn một điều dễ làm mình hiểu lầm: điện thoại có vạch sóng mà vẫn chậm.”: biểu tượng vạch sóng cạnh tốc độ chưa có số.
- Neo “Tài liệu của TP-Link giải thích rằng khi có nhiễu, kết nối vẫn có thể chậm đi dù mức tín hiệu thu tương tự.”: gói tin chờ theo thứ tự, không chia tốc độ đều cho từng người.
- Neo “Vậy nên tăng thêm vạch sóng chưa chắc đã xử lý tất cả.”: nhánh một ứng dụng/một thiết bị/toàn mạng. Nguồn S4,S8.

## Cảnh7 — so gần/xa

- Neo “Tới đây mình làm một việc có ích trước khi mua đồ.”: checklist cùng điện thoại/công cụ/điều kiện; không dựng giao diện speed test thương hiệu.
- Neo “Nếu gần ổn mà xa kém rõ, đó là dấu hiệu để mình chú ý chặng không dây và vị trí.”: hai nhánh khoanh vùng, kết quả để trống.
- Neo “Mình có thể so thêm một thiết bị khác.”: bổ sung thiết bị so sánh; nhãn “khoanh vùng, chưa kết luận nguyên nhân”. Nguồn S1,S8; phương pháp do kênh tổng hợp.

## Cảnh8 — vị trí

- Neo “Nếu điều kiện dây và nguồn cho phép, thử đưa cục phát ra vị trí thoáng hơn, cao khỏi sàn và gần khu vực mình thường dùng hơn.”: router trên kệ thoáng, dây gọn; nhãn điều kiện xuất hiện ngay đầu hành động.
- Neo “Nhưng gần trung tâm trên bản vẽ chưa chắc đã là nơi tốt nhất trong nhà thật.”: các điểm cần kiểm sau đổi chỗ, không đánh dấu thành công mặc định.
- Neo “Tư thích cách thử từng thay đổi một.”: vòng đổi một yếu tố → so lại → ghi nhận. Nguồn S5.

## Cảnh9 — đường nối của điểm mở rộng

- Neo “Nếu cần thêm thiết bị mở rộng vùng phủ, đừng chỉ hỏi nó phát được xa bao nhiêu.”: sơ đồ gốc/điểm mở rộng/phòng.
- Neo “Với hệ thống mesh dùng đường nối không dây, các điểm cũng cần liên lạc đủ tốt với nhau.”: highlight đường nối giữa các điểm; vị trí ở vùng chết không được vẽ như đã chữa xong.
- Neo “Mesh, bộ lặp và điểm truy cập dùng dây có cách hoạt động, điều kiện và giới hạn khác nhau.”: ba cấu trúc khác nhau, không gộp chung tính năng. Nguồn S5,S7; cần bổ sung tài liệu model nếu sau này minh họa sản phẩm cụ thể.

## Cảnh10 — thiết bị cố định

- Neo “Với máy tính hay thiết bị đặt cố định, nếu có cổng và đi dây phù hợp, kết nối bằng dây là một lựa chọn nên xem xét.”: đường Ethernet từ router tới máy tính; không biến dây thành cam kết mọi mạng luôn nhanh.
- Neo “Dây và cổng vẫn phải phù hợp với tốc độ mình cần.”: đường dây gọn cạnh chân tường, không băng lối đi.
- Neo “Nhưng mình nên biết có lựa chọn này trước khi nghĩ chỉ còn cách mua một cục phát đắt hơn.”: nhấn lựa chọn phù hợp nơi dùng, không so giá bịa. Nguồn S7.

## Cảnh11 — cấu hình

- Neo “Nếu phải chỉnh thiết lập, bà con xem tài liệu của đúng cục phát và chỉ chỉnh mạng mình có quyền quản lý.”: sổ ghi cấu hình, biểu tượng tài liệu model; không hiện mật khẩu thật.
- Neo “Các hãng có những khuyến nghị về kênh, độ rộng kênh và tương thích thiết bị.”: thẻ điều kiện, không làm hướng dẫn menu chung mọi model.
- Neo “Đặc biệt, mình không giải quyết chuyện chậm bằng cách tắt mật khẩu hay bỏ mã hóa bảo vệ.”: ổ khóa vẫn đóng, nhãn giữ bảo mật. Nguồn S6.

## Cảnh12 — trả lời câu hỏi đầu

- Neo “Vậy câu trả lời là gì?”: trở lại hai chặng, trả lời việc nâng gói chưa chắc sửa được Wi-Fi.
- Neo “Tư sẽ nhớ thứ tự này: so ở gần và xa bằng cùng thiết bị; kiểm vị trí và vật cản; xem băng tần, thiết bị và môi trường; rồi mới cân nhắc đường nối bằng dây hoặc mở rộng vùng phủ.”: checklist hiện theo mốc lời, không hiện cả bảng từ đầu.
- Neo “Không phải nhà nào cũng có cùng nguyên nhân.”: recap có điều kiện; CTA câu hỏi phòng nào chậm, chưa gắn video kế tiếp chưa tồn tại. Tổng hợp S1–S8.

## Tài sản còn phải tạo/duyệt

- Character sheet Chú Tư từ avatar đang có: toàn thân, ngạc nhiên, suy nghĩ, chỉ sơ đồ; đúng áo/kính/tóc, bàn tay và đạo cụ. Chỉ image_gen tích hợp, lưu prompt/reference/hash.
- Phòng khách/phòng ngủ và router/điện thoại minh họa sạch chữ. Không có logo, số đo hoặc chi tiết model tự bịa.
- Composition riêng cho mặt bằng, cổ chai, so điều kiện, checklist và sơ đồ mesh. Prototype ba thẻ chỉ chứng minh render, không đủ thay các cảnh trên.
- Hai thumbnail theo câu hỏi trong kịch bản, hậu kỳ chữ bằng code. Không dùng600/900/20 như số đo thực.
- Timing từng neo, timeline, SRT, Short và kiểm nghe chỉ làm sau khi có audio tập01. Chưa có nhạc nền và không cần thu/TTS chỉ để lấp thời lượng.
