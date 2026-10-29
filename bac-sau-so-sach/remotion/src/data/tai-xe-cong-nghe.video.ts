import type { VideoSpec } from "../video/types";

// Ví dụ anh Tư; chốt nguồn 20/10/2026, làm tròn theo ngày trước khi nhân tháng.
export const taiXeCongNgheVideo: VideoSpec = {
  sidePanels: true,
  keywordPosition: "lower",
  outro: { title: "BÁC SÁU SỔ SÁCH", tagline: "“Màn hình hiện doanh thu, cuốn sổ mới hiện thu nhập.”" },
  overlays: {
    1: [
      { type: "headline", cue: "khách trả tổng cộng", until: "Bác mời nó", text: "660.000đ / NGÀY", sub: "…THỰC NHẬN BAO NHIÊU?" },
      { type: "headline", cue: "Khoan đưa sổ đây Bác coi", until: "Bởi vì", text: "ĐƯA SỔ ĐÂY", sub: "BÁC COI!" },
    ],
    2: [{ type: "chips", cue: "Trước khi tính", items: [
      { text: "TP.HCM · xe máy xăng", cue: "Anh Tư chạy ở" },
      { text: "12 tiếng/ngày · 26 ngày/tháng", cue: "Mỗi ngày chạy mười hai tiếng" },
      { text: "Tháng ví dụ: 30 ngày", cue: "mỗi tháng nghỉ bốn ngày" },
      { text: "22 cuốc × ≈ 30.000đ", cue: "Một ngày được khoảng" },
      { text: "Giả định · gồm giờ chờ", cue: "mấy con số này là con số Bác giả định" },
    ] }],
    3: [{ type: "ledger", title: "PHẦN KHẤU TRỪ QUA ỨNG DỤNG", cue: "Bác lấy con số trung bình đó", lines: [
      { label: "Khách trả mỗi ngày", value: "660.000đ", cue: "Sáu trăm sáu chục ngàn" },
      { label: "Tài xế nhận · khoảng 62%", value: "≈ 410.000đ", cue: "là khoảng bốn trăm mười ngàn" },
      { label: "Khấu trừ qua ứng dụng", value: "≈ 250.000đ/ngày", tone: "minus", cue: "Tức là trong một ngày" },
      { label: "Một tháng · 26 ngày", value: "≈ 6,5 triệu", tone: "total", cue: "Một tháng hai mươi sáu ngày" },
      { label: "Có thể gồm phí/thuế; không phải lợi nhuận ứng dụng", tone: "note", cue: "đừng hiểu đây là lợi nhuận" },
    ] }],
    4: [{ type: "ledger", title: "TIỀN XĂNG · VÍ DỤ ANH TƯ", cue: "Với ngày chạy mười hai tiếng", lines: [
      { label: "Quãng đường giả định", value: "≈ 150 km/ngày", cue: "một trăm năm chục cây số" },
      { label: "Lượng xăng giả định", value: "≈ 4 lít/ngày", cue: "tốn khoảng bốn lít xăng" },
      { label: "Giá kỳ 15/10 · làm tròn", value: "≈ 27.000đ/lít", cue: "Giá xăng tháng mười này" },
      { label: "Chi phí xăng mỗi ngày", value: "≈ 108.000đ", tone: "total", cue: "Bốn lít là khoảng" },
      { label: "Một tháng · 26 ngày", value: "≈ 2,8 triệu", cue: "nhân hai mươi sáu ngày" },
      { label: "Sau khấu trừ và xăng", value: "≈ 302.000đ/ngày", tone: "minus", cue: "Bốn trăm mười ngàn trừ" },
    ] }],
    5: [{ type: "ledger", title: "CHIẾC XE CŨNG ĂN TIỀN", cue: "Với chiếc xe trong ví dụ", lines: [
      { label: "Bảo dưỡng · giả định", value: "400.000đ/tháng", cue: "Bác đặt khoản bảo dưỡng" },
      { label: "Mua 30 triệu → còn 10 triệu sau 3 năm", value: "≈ 556.000đ/tháng", cue: "mỗi tháng khoảng năm trăm" },
      { label: "Cộng bảo dưỡng + khấu hao", value: "≈ 956.000đ/tháng", cue: "Cộng lại chiếc xe ăn mất" },
      { label: "Làm tròn mỗi ngày chạy", value: "≈ 37.000đ/ngày", tone: "total", cue: "tức khoảng ba mươi bảy ngàn" },
      { label: "Sau khấu trừ, xăng và xe", value: "≈ 265.000đ/ngày", cue: "Ba trăm lẻ hai ngàn trừ" },
    ] }],
    6: [{ type: "chips", cue: "Rồi tới mấy khoản lặt vặt", until: "Bác tính nhẹ nhàng", items: [
      { text: "Mạng điện thoại", cue: "Tiền gói cước điện thoại" },
      { text: "Điện thoại · sạc dự phòng", cue: "Cái điện thoại cũng hao" },
      { text: "Áo mưa · gửi xe", cue: "Áo mưa rách" },
      { text: "Nước uống", cue: "Rồi chai nước" },
    ] }, { type: "headline", cue: "Bác tính nhẹ nhàng", text: "≈ 30.000đ / NGÀY", sub: "CÒN KHOẢNG 235.000đ" }],
    7: [{ type: "ledger", title: "KẾT SỔ MỘT NGÀY · MINH HỌA", cue: "Rồi Bác kết sổ", until: "Mà con số Bác muốn", lines: [
      { label: "Khách trả", value: "660.000đ", cue: "Khách trả sáu trăm sáu chục ngàn" },
      { label: "Khấu trừ qua ứng dụng", value: "−250.000đ", tone: "minus", cue: "Ứng dụng giữ khoảng" },
      { label: "Xăng", value: "−108.000đ", tone: "minus", cue: "Cây xăng lấy" },
      { label: "Xe", value: "−37.000đ", tone: "minus", cue: "Chiếc xe ăn" },
      { label: "Lặt vặt", value: "−30.000đ", tone: "minus", cue: "Lặt vặt ba chục ngàn" },
      { label: "CÒN LẠI MỖI NGÀY", value: "≈ 235.000đ", tone: "total", cue: "Còn lại khoảng" },
      { label: "26 ngày/tháng", value: "≈ 6,1 triệu", cue: "Một tháng hai mươi sáu ngày" },
    ] }, { type: "headline", cue: "Mà con số Bác muốn", until: "Bà con biết lương", text: "≈ 19.600đ / GIỜ", sub: "235.000đ ÷ 12 TIẾNG" },
      { type: "chips", cue: "Bà con biết lương", until: "Con số này là kết quả", items: [
        { text: "Vùng I năm 2026: 25.500đ/giờ", cue: "Hai mươi lăm ngàn rưỡi" },
        { text: "Áp dụng hợp đồng lao động", cue: "Mức đó áp dụng" },
        { text: "Mốc tham khảo · hai cách tính khác nhau", cue: "Bác đưa ra để" },
      ] },
      { type: "rules", title: "TÍNH BẰNG SỔ CỦA MÌNH", cue: "Con số này là kết quả", items: [
        { text: "Ví dụ riêng, không đại diện toàn nghề", cue: "Nó không chứng minh" },
        { text: "Cộng cả tháng, trừ đủ chi phí", cue: "Cách chắc hơn" },
        { text: "Chia cả giờ chạy và giờ chờ", cue: "kể cả giờ chờ" },
      ] },
    ],
    8: [{ type: "chips", cue: "Chưa hết", items: [
      { text: "Nghỉ chạy = giảm tiền", cue: "Anh Tư nghỉ một ngày" },
      { text: "Dành quỹ ốm đau", cue: "Anh Tư mà bị cảm" },
      { text: "Kiểm tra hợp đồng và BHXH", cue: "Anh em nên kiểm tra hợp đồng" },
      { text: "Tự chuẩn bị cho tuổi già", cue: "Nếu không thuộc diện bắt buộc" },
    ] }],
    9: [{ type: "rules", title: "5 CÁCH GIỮ LẠI NHIỀU HƠN", cue: "Bác gợi ý năm cách", items: [
      { text: "Ghi sổ thu, thực nhận và xăng mỗi ngày", cue: "Cách thứ nhất" },
      { text: "Bớt giờ chờ, chọn giờ đông khách", cue: "Cách thứ hai" },
      { text: "So sánh tỷ lệ thực nhận", cue: "Cách thứ ba" },
      { text: "Tính đủ chi phí trước khi đổi xe", cue: "Cách thứ tư" },
      { text: "Quỹ chiếc xe + quỹ sức khỏe, tuổi già", cue: "Cách thứ năm" },
    ] }],
    10: [{ type: "rules", title: "3 ĐIỀU NHỚ", cue: "Bà con nhớ giùm Bác ba điều", until: "Nếu bà con thấy video", items: [
      { text: "Doanh thu chưa phải thu nhập", cue: "Thứ nhất" },
      { text: "Trừ đủ chi phí rồi chia số giờ", cue: "Thứ hai" },
      { text: "Sức khỏe và tuổi già cũng cần quỹ", cue: "Thứ ba" },
    ] }, { type: "quote", cue: "Nếu bà con thấy video", text: "Màn hình hiện doanh thu.\nCuốn sổ mới hiện thu nhập.", quoteTop: 750, subscribeCue: "bấm đăng ký kênh", subscribeTop: 80 }],
  },
};
