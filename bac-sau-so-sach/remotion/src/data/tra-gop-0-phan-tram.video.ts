import type { VideoSpec } from "../video/types";

// Số chính xác theo bảng giả định; lời thu giọng đã làm tròn các khoản nhỏ.
export const traGop0PhanTramVideo: VideoSpec = {
  sidePanels: true,
  outro: { title: "BÁC SÁU SỔ SÁCH", tagline: "“Ở đời không có gì là không đồng.”" },
  overlays: {
    1: [{ type: "headline", cue: "không phần trăm lãi suất", until: "Chiều hôm qua con Út", text: "0% LÃI SUẤT", sub: "0Đ TRẢ TRƯỚC?" },
      { type: "headline", cue: "đưa sổ đây Bác coi", until: "Cái số không phần trăm đó", text: "ĐƯA SỔ ĐÂY", sub: "BÁC COI!" }],
    2: [{ type: "rules", title: "BỐN ĐƯỜNG BÙ TIỀN", cue: "Thường thì có bốn đường", until: "Con số không phần trăm", items: [
      { text: "Người bán chịu một phần để bán được nhiều", cue: "Đường thứ nhất" },
      { text: "Thu phí: bảo hiểm, thu hộ, hồ sơ, chuyển đổi", cue: "Đường thứ hai" },
      { text: "Giá cao hơn hoặc mất giảm giá trả thẳng", cue: "Đường thứ ba" },
      { text: "Thói quen mua nhiều, mua sớm, mua thứ không cần", cue: "Và đường thứ tư" },
    ] }],
    3: [{ type: "ledger", title: "TRẢ GÓP 0% — 6 THÁNG", cue: "Bác lấy đúng bảng tính trả góp", lines: [
      { label: "Giá máy", value: "23.490.000đ", cue: "cái máy hai mươi ba triệu bốn trăm chín chục ngàn" },
      { label: "Tiền gốc / tháng", value: "3.915.000đ", cue: "mỗi tháng tiền gốc" },
      { label: "Thu hộ × 6 tháng", value: "66.000đ", tone: "minus", cue: "Nhân sáu tháng" },
      { label: "Bảo hiểm khoản vay", value: "822.150đ", tone: "minus", cue: "phí bảo hiểm khoản vay" },
      { label: "Trả thêm", value: "888.150đ", tone: "total", cue: "Cộng lại" },
      { label: "Quy theo dòng tiền", value: "≈ 13%/năm", tone: "minus", cue: "nó tương đương lãi khoảng" },
    ] }],
    4: [{ type: "ledger", title: "SO GIÁ CHO CÔNG BẰNG", cue: "Bác lấy con số nhẹ nhàng thôi", until: "Bác không nói chỗ nào cũng như vậy", lines: [
      { label: "Trả thẳng có giảm", value: "22.490.000đ", tone: "plus", cue: "Vậy cái máy trả thẳng" },
      { label: "Trả góp cộng phí", value: "24.378.150đ", cue: "Trả góp không phần trăm" },
      { label: "Chênh lệch", value: "1.888.150đ", tone: "total", cue: "Chênh nhau gần một triệu chín" },
      { label: "Tương đương", value: "≈ 29%/năm", tone: "minus", cue: "gần hai mươi chín phần trăm một năm" },
      { label: "Giảm 1 triệu khi trả thẳng là giả định minh họa", tone: "note", cue: "Bà con nghe rõ chưa" },
    ] }],
    5: [{ type: "ledger", title: "THẺ TÍN DỤNG 0%", cue: "cái tên của khoản phí", until: "Mà với thẻ tín dụng", lines: [
      { label: "Phí chuyển đổi", value: "2,5%", cue: "Bác lấy hai phần trăm rưỡi" },
      { label: "23.490.000đ × 2,5%", value: "587.250đ", tone: "total", cue: "năm trăm tám mươi bảy ngàn" },
      { label: "Phí trên khoản vay 6 tháng", value: "≈ 9%/năm", tone: "minus", cue: "chín phần trăm một năm" },
    ] }, { type: "ledger", title: "NHỚ XÁC NHẬN CHUYỂN ĐỔI", cue: "Đó là quên đăng ký chuyển đổi", lines: [
      { label: "Chưa chuyển đổi", value: "Dư nợ cả món", cue: "tưởng là tự động trả góp" },
      { label: "Không trả hết → lãi thẻ", value: "~15–40%/năm", tone: "minus", cue: "lãi thẻ tín dụng" },
      { label: "Gọi tổng đài / xác nhận trong ứng dụng", tone: "note", cue: "quẹt xong phải gọi tổng đài" },
      { label: "Kiểm tra sao kê tháng đầu tiên", tone: "note", cue: "kiểm tra trên sao kê tháng đầu tiên" },
    ] }],
    6: [{ type: "salary", title: "LƯƠNG 12 TRIỆU", salary: 12, cue: "Bây giờ mình tính theo lương con Út", until: "Ở Sài Gòn bây giờ", payments: [
      { label: "Điện thoại", amount: 3.926, cue: "Góp điện thoại" },
      { label: "+ Xe máy", amount: 2.1, cue: "thêm hai triệu mốt" },
      { label: "+ Tủ lạnh", amount: 1.2, cue: "thêm một triệu hai" },
    ] }, { type: "headline", cue: "Thứ đắt nhất là cái thói quen", text: "CÁI BẪY CHỮ “CHỈ”", sub: "Nhìn tổng, đừng nhìn mỗi kỳ" }],
    7: [{ type: "chips", cue: "phí phạt trễ hạn", until: "Một cái điện thoại", items: [
      { text: "Phí phạt trễ hạn", cue: "phí phạt trễ hạn" },
      { text: "Lãi trên phần trả chậm", cue: "lãi trên phần trả chậm" },
      { text: "Lịch sử tín dụng", cue: "Mà là lịch sử tín dụng" },
    ] }],
    8: [{ type: "comparison", title: "MỘT CHIẾC MÁY · BỐN CÁCH MUA", cue: "Rồi, bây giờ Bác kết sổ", until: "Tiền không biết nói dối", rows: [
      { label: "Trả thẳng · có giảm giá", total: 22.49, extra: 0, cue: "Cách thứ nhất" },
      { label: "Trả thẳng · giá niêm yết", total: 23.49, extra: 1, cue: "Cách thứ hai" },
      { label: "Góp qua thẻ · phí 2,5%", total: 24.07725, extra: 1.58725, cue: "Cách thứ ba" },
      { label: "Góp qua công ty tài chính", total: 24.37815, extra: 1.88815, cue: "Cách thứ tư" },
    ], stamp: "≈ 29%/NĂM", stampCue: "tương đương gần hai mươi chín phần trăm", notes: [
      "Mốc chênh lệch: trả thẳng có giảm 1 triệu (giả định minh họa).",
      "Phí thẻ riêng ≈ 9%/năm so với giá niêm yết.",
      "≈ 29%/năm: gói tài chính, gồm phí và mất giảm giá trả thẳng.",
    ] }, { type: "quote", cue: "Tiền không biết nói dối", text: "Tiền không biết nói dối." }],
    9: [{ type: "rules", title: "KHI NÀO 0% CÓ LỢI THẬT?", cue: "ba điều kiện", until: "Còn cái điện thoại đời mới", items: [
      { text: "Giá góp bằng giá trả thẳng, không mất giảm giá", cue: "Điều kiện thứ nhất" },
      { text: "Thật sự không phí; bảo hiểm tự nguyện, được bỏ chọn", cue: "Điều kiện thứ hai" },
      { text: "Món đồ giúp làm ra tiền hoặc thật sự cần ngay", cue: "Điều kiện thứ ba" },
    ] }],
    10: [{ type: "rules", title: "NĂM CÂU HỎI TRƯỚC KHI KÝ", cue: "năm câu hỏi", until: "Và Bác cho thêm một quy tắc", items: [
      { text: "Trả thẳng hôm nay giá bao nhiêu?", cue: "Câu thứ nhất" },
      { text: "Tổng cộng phải trả bao nhiêu tiền?", cue: "Câu thứ hai" },
      { text: "Bảo hiểm bắt buộc không, có bỏ được không?", cue: "Câu thứ ba" },
      { text: "Còn phí gì nữa: hồ sơ, thu hộ, chuyển đổi?", cue: "Câu thứ tư" },
      { text: "Trễ một kỳ thì bị phạt thế nào?", cue: "Câu thứ năm" },
    ] }, { type: "ledger", title: "QUY TẮC RIÊNG CỦA BÁC", cue: "Và Bác cho thêm một quy tắc", lines: [
      { label: "Tổng góp mỗi tháng", value: "≤ 1/5 lương", tone: "total", cue: "tổng tất cả các khoản góp mỗi tháng" },
      { label: "Lương 12 triệu", value: "Góp ≤ 2,4 triệu", tone: "plus", cue: "Lương mười hai triệu" },
    ] }],
    11: [{ type: "rules", title: "BA ĐIỀU NHỚ GIÙM BÁC", cue: "Bà con nhớ giùm Bác ba điều", until: "Nếu bà con thấy video này có ích", items: [
      { text: "Hỏi tổng tiền: lãi 0% chưa chắc chi phí bằng 0", cue: "Thứ nhất" },
      { text: "So với giá trả thẳng có giảm giá", cue: "Thứ hai" },
      { text: "Nhìn tổng giá và phần lương còn lại để sống", cue: "Thứ ba" },
    ] }, { type: "quote", cue: "Ở đời không có gì là không đồng", text: "Ở đời không có gì là không đồng.", subscribeCue: "bấm đăng ký kênh" }],
  },
};
