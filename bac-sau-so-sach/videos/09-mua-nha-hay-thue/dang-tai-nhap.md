# Metadata nháp #9 — chưa có giọng/timeline/ID, không dùng upload

## Tiêu đề
Mua Nhà Hay Thuê Nhà? Bác Sáu Tính Cùng Một Túi Tiền Trong 20 Năm

## Tiêu đề dự phòng
1. Thuê Nhà Là Mất Tiền? Coi Lại Khoản Vốn Ban Đầu
2. Nhà Tăng Giá Bao Nhiêu Thì Mua Hơn Thuê? Bác Sáu Tính Thử

## Mô tả
```
Hiếu và Thảo phân vân mua nhà hay thuê. Bác Sáu so cùng vốn ban đầu, cùng ngân sách mỗi tháng, tính cả nợ, tiền cọc, chi phí chủ nhà và phần tiền dư của CẢ HAI bên trong 20 năm.

Đây là mô hình giả định riêng, không phải khảo sát giá, dự báo nhà/lãi suất hay lời khuyên vay nợ/đầu tư. Nhà riêng giá 3 tỷ, trả trước 1,2 tỷ và chi phí hoàn tất giả định 60 triệu đã chi hết; vay 1,8 tỷ trong 240 tháng, gốc đều 7,5 triệu/tháng. Lãi mô hình 9% năm đầu, 11% từ tháng 13, tính dư nợ đầu tháng × lãi năm/12; không phải lịch ngày hoặc báo giá của một ngân hàng.

Cả hai bắt đầu với 1,26 tỷ và có 25 triệu/tháng cho nhà ở/tích lũy sau sinh hoạt, thuế và dự phòng riêng giống nhau. Bên thuê cọc 18 triệu không lãi, hoàn đủ cuối tháng 240; còn 1,242 tỷ đầu tư ban đầu. Thuê 9 triệu/tháng năm đầu, tăng 3% mỗi năm; chủ nhà chi thực 1,25 triệu/tháng năm đầu, cũng tăng 3% mỗi năm. Đây không phải dự phòng chưa dùng. Chi phí sinh hoạt chung gác ra cả hai bên.

Tiền dư CẢ HAI cùng hưởng phép thử lợi suất danh nghĩa ròng 5%/năm chia 12, ghép tháng, góp cuối tháng. Không bảo đảm sản phẩm/lãi tái tục 20 năm. Nhà tăng giả định 3%/năm; quy về tiền sau gói thanh lý 3% giá bán (dự trù riêng, KHÔNG thuế suất chung, không cộng thuế thêm lần hai).

Cuối kỳ: phía mua có 2.668.492.333đ tài khoản + nhà sau thanh lý 5.255.783.693đ = 7.924.276.026đ; thuê có tài khoản và hoàn cọc 8.928.949.059đ. Chênh khoảng 1,005 tỷ trong đúng bộ giả định. Chỉ đổi nhà tăng 5%/năm, tổng phía mua khoảng 10,390 tỷ và kết luận đổi bên. Hai bên ngang ở giá nhà trước phí khoảng 6,454 tỷ, tương đương tăng đều khoảng 3,9048%/năm; mốc này đổi khi thay các giả định khác.

Thử sức chịu riêng tháng 13 với lãi 13%: gốc/lãi và chi chủ nhà là 27.312.500đ, vượt ngân sách 2.312.500đ. Không ghép phép thử một tháng này vào kết quả 20 năm. Không chuyển nhà/sự cố sửa lớn ngoài mô hình; thuê tương đương luôn sẵn, cọc hoàn đủ là giả định, không bảo đảm hợp đồng gia hạn. So sau 20 năm chưa phải so cả đời; cả hai còn nhu cầu chỗ ở sau mốc đó.

Nguồn chính thức đọc 25/10/2026:
- VCB chương trình 15/10/2026: ưu đãi 12 tháng có điều kiện, không gán 11% sau ưu đãi cho ngân hàng:
https://www.vietcombank.com.vn/vi-VN/KHCN/Truy-cap-nhanh/Tin-noi-bat/Articles/2026/10/15/Nha-moi-an-cu
- Cơ chế lãi theo dư nợ giảm dần, lịch gốc theo thỏa thuận:
https://www.vietcombank.com.vn/vi-VN/KHCN/SPDV/Vay/Vay-mua-nha-dat
- Luật Nhà ở hợp nhất, phần Điều 170–173 về giá/thời hạn/chấm dứt, không suy quyền thu hồi tùy ý hoặc tự gia hạn:
https://datafiles.chinhphu.vn/cpp/files/vbpq/2025/9/132-vbhn-vpqh.pdf
- Thuế/điều kiện giao dịch có căn cứ riêng, không lấy gói dự trù 3% thay luật:
https://xaydungchinhsach.chinhphu.vn/thue-thu-nhap-ca-nhan-doi-voi-thu-nhap-tu-chuyen-nhuong-bat-dong-san-119260704103908616.htm

Python Decimal 50 chữ số, không làm tròn trung gian. Kiểm tài khoản bằng tổng giá trị tương lai độc lập; số trình bày làm tròn HALF_UP, không cộng các số đã làm tròn để suy kết quả chính xác.
```

## Thẻ
mua nhà hay thuê, vay mua nhà, thuê nhà, chi phí cơ hội, lãi vay mua nhà, ngân sách gia đình, tài sản ròng, tài chính cá nhân, kế hoạch an cư, Bác Sáu Sổ Sách

## Short
Thuê là mất tiền? Đừng quên túi tiền ban đầu #shorts
```
Mua hay thuê phải so cùng vốn ban đầu và cùng ngân sách tháng. Bác Sáu tính thử cho Hiếu–Thảo, cả người mua lẫn người thuê đều được tích lũy tiền dư. Các mức giá, lãi và tăng giá là giả định; đổi giả định có thể đổi kết luận.
```

Chưa có chương, URL dài hoặc mốc từ để cắt Short. Không bịa timestamp/ID. Chỉ thay bằng metadata cuối khi có timeline và thành phẩm đã QA.
