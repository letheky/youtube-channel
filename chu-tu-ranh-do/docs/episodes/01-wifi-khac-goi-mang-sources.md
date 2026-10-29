# Tập01 — Vì sao phòng bên cạnh Wi-Fi yếu dù gói mạng vẫn nhanh?

Nghiên cứu ngày29/10/2026, lượt00:00 Asia/Saigon. Chọn từ kho đề tài README; chưa TTS, chưa đăng. Không có số đo nhà người dùng, không có thử nghiệm phần cứng thực tế.

## Nguồn chính thức và phạm vi

- **S1 Google Nest — slow internet:** https://support.google.com/googlehome/answer/6246489?hl=en . Thiết bị, khoảng cách, vật cản, băng tần và lưu lượng có thể ảnh hưởng tốc độ; kiểm đường dịch vụ từ nhà cung cấp. Không dùng trang này làm kết luận định lượng tốc độ tại mọi nhà.
- **S2 NETGEAR — performance factors:** https://kb.netgear.com/000037824/What-factors-can-affect-my-WiFi-performance . Vật cản/kim loại và thiết bị dùng chung phổ vô tuyến ảnh hưởng Wi-Fi. Không đưa phần network loop tổng quát vào lời vì cần điều kiện mạng cụ thể.
- **S3 ASUS — bands:** https://www.asus.com/uk/support/faq/1044838/ . Hai phẩy bốn/năm/sáu GHz có đánh đổi khác nhau; hỗ trợ phụ thuộc thiết bị và quy định địa phương. Không suy ra Wi-Fi5 chính là5G di động, không nêu kênh/công suất trái cấu hình vùng.
- **S4 TP-Link — range:** https://www.tp-link.com/us/support/faq/2291/ . Nhiễu có thể giảm tốc độ ngay khi mức tín hiệu tương tự; bộ thu/thiết bị và môi trường ảnh hưởng vùng phủ. Không dùng ước lượng15/20m của trang như cam kết cho nhà ở Việt Nam.
- **S5 Google Nest — placement:** https://support.google.com/googlehome/answer/7183150?hl=en . Vị trí thoáng, cao khỏi sàn, cân nhắc trung tâm vùng dùng; đường nối giữa mesh points cần mạnh. Mốc “hai phòng” là hướng dẫn sản phẩm Google, không đưa thành quy tắc mọi hãng.
- **S6 Apple — router settings:** https://support.apple.com/en-us/102766 . Khuyến nghị cho mạng dùng thiết bị Apple; Auto channel và20MHz cho2,4GHz, không suy thành mọi cấu hình công nghiệp. Kịch bản không hướng dẫn tắt mã hóa/đổi vùng/công suất.
- **S7 Ofcom — improve Wi-Fi:** https://www.ofcom.org.uk/phones-and-broadband/coverage-and-speeds/improving-your-wifi-experience . Phân biệt đường broadband và Wi-Fi, cân nhắc đường dây Ethernet cho thiết bị cố định. Bảng tốc độ tham khảo trên trang không dùng như trần tốc độ tiêu chuẩn Wi-Fi hiện đại; giá Anh/CE không áp sang người xem Việt Nam.
- **S8 Microsoft — troubleshooting:** https://support.microsoft.com/en-us/windows/experience/connectivity-networking/fix-wi-fi-connection-issues-in-windows . So thiết bị khác, đổi băng tần khi có, kiểm kết nối; các bước Windows reset/driver không nằm trong lời cho người dùng phổ thông ở tập này.

## Dẫn xuất và ví dụ

Ví dụ giả định: chặng dịch vụ600Mbps, chặng Wi-Fi20Mbps; nâng dịch vụ900Mbps vẫn còn chặng20Mbps. Phép min là mô hình cổ chai đơn giản, bỏ qua overhead/tranh chấp; không phải dự đoán speed test thật. Tăng600→900 là50%; “20” không phải phép đo, phải hiện nhãn **VÍ DỤ GIẢ ĐỊNH** cùng mọi đồ họa có số.

Không dùng con số20 làm thumbnail như kết quả thử nghiệm thực tế. Hai hướng thumb: “GÓI MẠNH / PHÒNG VẪN YẾU?” và “THÊM TIỀN MẠNG / ĐÃ ĐÚNG CHỖ?”. Nếu cần khuôn sốA→B thì chỉ dùng mô hình/đếm cấu trúc với nhãn rõ, không ngụy tạo kỳ vọng và số đo.

## Kiểm biên tập cần giữ

- Không kết luận mọi mạng chậm đều do Wi-Fi; đường nhà cung cấp hoặc dịch vụ/app cũng có thể có vấn đề.
- Không đồng nhất vạch sóng với tốc độ Internet, không hứa đổi chỗ router là luôn hết lỗi.
- Đo gần/xa bằng cùng thiết bị, cùng công cụ và điều kiện tương tự; đây là cách khoanh vùng, không kiểm định gói cước pháp lý.
- Mesh/repeater cần đường nối còn đủ tốt; không hứa một hộp cắm vào điểm chết sẽ tạo đường Internet khỏe.
- Đổi vị trí chỉ trong giới hạn dây/nguồn và hướng dẫn hãng; dây đi gọn, không tháo/lắp bên trong thiết bị.
- Không mang nhận diện, giọng hoặc token Bác Sáu sang kênh mới. Không áp yêu cầu lịch sử song ngữ mới của Dấu Vết Thời Đại sang tập Chú Tư.
