import type { VideoSpec } from "../video/types";

// Cô Bảy là ví dụ giả định. Số đã kiểm bằng scripts/kiem_tra_video_05.py, 21/10/2026.
export const quanCaPheMatBangVideo: VideoSpec = {
  sidePanels: true,
  keywordPosition: "lower",
  outro: { title: "BÁC SÁU SỔ SÁCH", tagline: "“Đừng chỉ đếm bàn kín. Hãy đếm tháng lấy lại tiền.”" },
  overlays: {
    1: [
      { type: "headline", cue: "Quán cà phê chiều nào", until: "Bữa nay Bác kể", text: "ĐÔNG KHÁCH…", sub: "ĐÃ LẤY LẠI VỐN CHƯA?" },
      { type: "chips", cue: "Bữa nay Bác kể", items: [
        { text: "Câu chuyện cô Bảy · giả định", cue: "một tình huống giả định" },
        { text: "Chuẩn bị 420 triệu", cue: "bốn trăm hai mươi triệu" },
        { text: "Vốn ban đầu → tháng thu hồi → hạn thuê", cue: "Bữa nay mình mở cuốn sổ khác" },
      ] },
    ],
    2: [
      { type: "ledger", title: "TIỀN CHUẨN BỊ · GIẢ ĐỊNH", cue: "Trước hết chia", until: "Bác giả định tiền thuê", lines: [
        { label: "Cải tạo, trang trí", value: "180 triệu", cue: "Cải tạo với trang trí" },
        { label: "Máy móc", value: "80 triệu", cue: "Máy móc tám chục" },
        { label: "Bàn ghế, đồ dùng", value: "40 triệu", cue: "Bàn ghế đồ dùng" },
        { label: "CẦN THU HỒI TỪ VẬN HÀNH", value: "300 triệu", tone: "total", cue: "Ba khoản này cộng lại" },
        { label: "Cọc hoàn theo điều kiện", value: "60 triệu", cue: "Còn sáu chục triệu đặt cọc" },
        { label: "Quỹ dự phòng", value: "60 triệu", cue: "và sáu chục triệu dự phòng" },
      ] },
      { type: "chips", cue: "Bác giả định tiền thuê", until: "Vậy nhớ hai con số", items: [
        { text: "Thuê 20 triệu/tháng · giả định", cue: "hai chục triệu một tháng" },
        { text: "Trả từng tháng, không trả trước", cue: "trả từng tháng" },
        { text: "Giá rao ≠ giá trung bình", cue: "vài tin rao không phải" },
      ] },
      { type: "headline", cue: "Vậy nhớ hai con số", text: "420 TRIỆU ĐỂ BẮT ĐẦU", sub: "300 TRIỆU THEO DÕI THU HỒI" },
    ],
    3: [{ type: "rules", title: "RỜI QUÁN, MANG ĐƯỢC GÌ?", cue: "Máy pha còn dùng được", items: [
      { text: "Máy móc, bàn ghế: kiểm giá bán thực", cue: "Máy pha còn dùng được" },
      { text: "Cải tạo gắn nhà: đọc thỏa thuận", cue: "Hai bên có thỏa thuận gì" },
      { text: "Giữ hóa đơn, danh sách và ảnh bàn giao", cue: "Đồ nào là của mình" },
      { text: "Ví dụ dừng quán: cải tạo thu 0", cue: "Bác giả định phần cải tạo" },
    ] }],
    4: [{ type: "ledger", title: "ĐẾM CẢ NGÀY · GIẢ ĐỊNH", cue: "Giả định quán có", lines: [
      { label: "Ghế", value: "30", cue: "ba chục ghế" },
      { label: "Lượt khách/ghế/ngày", value: "3", cue: "ba lượt khách trả tiền" },
      { label: "Hóa đơn thực thu", value: "35.000đ", cue: "Mỗi người thực trả" },
      { label: "Ngày mở/tháng", value: "26", cue: "Mở hai mươi sáu ngày" },
      { label: "DOANH THU/THÁNG", value: "81,9 triệu", tone: "total", cue: "doanh thu một tháng" },
      { label: "Thuê / doanh thu", value: "≈ 24,42%", cue: "Hai chục triệu tiền thuê chia" },
      { label: "Tỷ lệ của ví dụ, không phải ngưỡng khuyến nghị", tone: "note", cue: "Bác không lấy tỷ lệ ấy" },
    ] }],
    5: [
      { type: "chips", cue: "Bác gói phần vận hành", until: "Trừ phần biến đổi", items: [
        { text: "Biến đổi gộp: 30% · giả định", cue: "Giả định nguyên liệu" },
        { text: "Cố định khác: 26 triệu, gồm công chủ 8 triệu", cue: "những khoản chi cố định khác" },
        { text: "Vùng I: 25.500đ/giờ · HĐLĐ", cue: "Lương tối thiểu giờ vùng một" },
        { text: "Thuế GTGT/TNCN: ví dụ đủ điều kiện ≤1 tỷ/năm", cue: "Theo ngưỡng đã cập nhật" },
      ] },
      { type: "ledger", title: "TIỀN DƯ THU HỒI VỐN/THÁNG", cue: "Trừ phần biến đổi", lines: [
        { label: "Doanh thu", value: "81,90 triệu", cue: "Trừ phần biến đổi" },
        { label: "Biến đổi", value: "−24,57 triệu", tone: "minus", cue: "Trừ phần biến đổi" },
        { label: "Thuê", value: "−20 triệu", tone: "minus", cue: "tiền thuê và gói cố định" },
        { label: "Cố định khác, đã tính công chủ", value: "−26 triệu", tone: "minus", cue: "tiền thuê và gói cố định" },
        { label: "DÒNG TIỀN CÒN", value: "11,33 triệu", tone: "total", cue: "quán còn mười một triệu" },
        { label: "Không trừ khấu hao thành tiền ra lần hai", tone: "note", cue: "Máy đã mua bằng vốn" },
      ] },
    ],
    6: [
      { type: "headline", cue: "Cô Bảy lấy ba trăm triệu", until: "Mình giả định hai tháng đầu", text: "300 ÷ 11,33 ≈ 27 THÁNG", sub: "ĐÃ TÍNH THÁNG ĐẦU VẮNG KHÁCH?" },
      { type: "ledger", title: "TÍNH ĐỦ GIAI ĐOẠN ĐẦU", cue: "Mình giả định hai tháng đầu", until: "Giữ nguyên mọi giả định", lines: [
        { label: "Hai tháng đầu · mỗi tháng", value: "−17,335 triệu", tone: "minus", cue: "Mỗi tháng đầu âm" },
        { label: "Cộng hai tháng đầu", value: "−34,67 triệu", tone: "minus", cue: "Hai tháng âm" },
        { label: "Dự phòng còn", value: "25,33 triệu", cue: "Sáu chục triệu dự phòng còn" },
        { label: "Từ tháng 3 · mỗi tháng", value: "+11,33 triệu", cue: "Từ tháng thứ ba" },
        { label: "TÍCH LŨY THÁNG 12", value: "78,63 triệu", tone: "total", cue: "hết năm đầu mới tích lũy" },
      ] },
      { type: "headline", cue: "Giữ nguyên mọi giả định", text: "THÁNG 32 MỚI ĐỦ 300 TRIỆU", sub: "NẾU ĐƯỢC THUÊ TIẾP CÙNG GIÁ" },
    ],
    7: [{ type: "ledger", title: "THỬ ĐỔI MỘT GIẢ ĐỊNH", cue: "Bây giờ thử đổi", lines: [
      { label: "Thuê 20 triệu → dòng tiền", value: "11,33 triệu", cue: "tiền thuê từ hai chục" },
      { label: "Thuê 25 triệu → dòng tiền", value: "6,33 triệu", tone: "minus", cue: "còn sáu triệu" },
      { label: "Thuê 25 triệu: thu 300 triệu", value: "tháng 57", cue: "tháng thứ năm mươi bảy" },
      { label: "Tăng 5% năm hai → thuê", value: "21 triệu", cue: "Hai chục triệu thành" },
      { label: "Dòng tiền/tháng năm hai", value: "10,33 triệu", cue: "phần dư chỉ còn" },
      { label: "Chỉ 2 lượt/ghế/ngày → dòng tiền", value: "−7,78 triệu", tone: "minus", cue: "quán âm bảy triệu" },
      { label: "So sánh riêng; không mặc định được gia hạn", tone: "note", cue: "Khi dòng tiền còn âm" },
    ] }],
    8: [
      { type: "ledger", title: "VỐN VÀ HẠN THUÊ", cue: "Ví dụ cô Bảy chỉ có", until: "Bác không nói chủ nhà", lines: [
        { label: "Hạn thuê chắc chắn", value: "24 tháng", cue: "hai mươi bốn tháng thuê" },
        { label: "Thu hồi 300 triệu · có điều kiện", value: "32 tháng", cue: "cần ba mươi hai tháng" },
        { label: "Tích lũy tới hết tháng 24", value: "214,59 triệu", cue: "Hết hai mươi bốn tháng" },
        { label: "CHƯA THU HỒI TỪ VẬN HÀNH", value: "85,41 triệu", tone: "minus", cue: "Còn tám mươi lăm triệu" },
      ] },
      { type: "rules", title: "GHI RÕ TRONG HỢP ĐỒNG", cue: "Bác không nói chủ nhà", items: [
        { text: "Chấm dứt theo căn cứ, không tùy ý", cue: "Thời hạn giá thuê" },
        { text: "Mốc tăng giá và cách gia hạn", cue: "ghi rõ mốc tăng giá" },
        { text: "Báo trước, hoàn cọc, xử lý cải tạo", cue: "thời gian báo trước" },
        { text: "Đối chiếu pháp luật và giấy tờ cụ thể", cue: "trường hợp tranh chấp" },
      ] },
    ],
    9: [
      { type: "ledger", title: "DỪNG THÁNG 12 · GIẢ ĐỊNH", cue: "Tiền mang về gồm", until: "Tại sao vẫn cộng", lines: [
        { label: "Dự phòng ban đầu", value: "60 triệu", cue: "sáu chục triệu dự phòng ban đầu" },
        { label: "Dòng tiền tích lũy · gồm lỗ đầu kỳ", value: "+78,63 triệu", cue: "cộng bảy mươi tám triệu" },
        { label: "Cọc được hoàn đủ", value: "+60 triệu", cue: "cộng cọc được trả" },
        { label: "Bán đồ 80 − dọn 10", value: "+70 triệu", cue: "cộng tiền bán đồ rồi trừ dọn" },
        { label: "TIỀN CÒN MANG VỀ", value: "268,63 triệu", tone: "total", cue: "Tổng hai trăm sáu mươi tám" },
        { label: "So với 420 triệu chuẩn bị", value: "thiếu 151,37 triệu", tone: "minus", cue: "còn thiếu một trăm" },
      ] },
      { type: "chips", cue: "Tại sao vẫn cộng", items: [
        { text: "Lỗ đầu kỳ đã trong dòng tiền tích lũy", cue: "Vì phần lỗ hai tháng đầu" },
        { text: "Giá rao sang ≠ tiền đã nhận", cue: "Giá rao sang quán" },
        { text: "Cho thuê lại: cần bên cho thuê đồng ý", cue: "Nếu là cho thuê lại" },
      ] },
    ],
    10: [
      { type: "rules", title: "3 ĐIỀU TRƯỚC KHI NHẬN CHÌA KHÓA", cue: "Bà con nhớ giùm Bác ba điều", until: "Ví dụ này giữ", items: [
        { text: "Chia đúng vốn, cọc và dự phòng", cue: "Thứ nhất" },
        { text: "Tính cả tháng xấu và công của mình", cue: "Thứ hai" },
        { text: "So mốc thu hồi với hạn thuê chắc chắn", cue: "Thứ ba" },
      ] },
      { type: "quote", cue: "Nếu thấy cách coi sổ", text: "Đừng chỉ đếm bàn kín.\nHãy đếm tháng lấy lại tiền.", quoteTop: 750, subscribeCue: "bấm đăng ký kênh", subscribeTop: 80 },
    ],
  },
};
