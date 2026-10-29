import type { VideoSpec } from "../video/types";
import { traSua100Ly } from "./tra-sua-100-ly";

// Overlay của video #1. Mỗi `cue` là cụm chữ y nguyên trong lời đọc (kich-ban/01-tra-sua-100-ly.md):
// overlay / dòng sẽ hiện đúng lúc Bác Sáu nói tới chữ đó.
export const traSua100LyVideo: VideoSpec = {
  outro: { title: "BÁC SÁU SỔ SÁCH", tagline: "“Đưa sổ đây Bác coi.”" },
  overlays: {
    1: [
      { type: "headline", cue: "Một trăm ly một ngày", until: "Bác mới nói với nó", text: "100 ly/ngày", sub: "= giàu?" },
      { type: "headline", cue: "Lời trên giấy chưa phải là lời trong túi", until: "Hôm nay Bác Sáu", text: "Lời trên giấy", sub: "≠ lời trong túi" },
    ],
    2: [
      {
        type: "chips",
        cue: "Quán ở Gò Vấp",
        until: "Bác nói trước",
        items: [
          { text: "Gò Vấp", cue: "Gò Vấp" },
          { text: "30 m²", cue: "ba mươi mét vuông" },
          { text: "35.000đ/ly", cue: "ba mươi lăm ngàn một ly" },
          { text: "100 ly/ngày", cue: "một trăm ly mỗi ngày" },
          { text: "40% đơn qua app", cue: "bốn chục ly là đơn qua app" },
        ],
      },
    ],
    3: [
      {
        type: "ledger",
        title: "DOANH THU",
        cue: "Dòng đầu tiên trong cuốn sổ",
        lines: [
          { label: "100 ly × 35.000đ", value: "3.500.000đ/ngày", cue: "Một trăm ly nhân ba mươi lăm ngàn" },
          { label: "× 30 ngày", value: "105 triệu/tháng", tone: "plus", cue: "Nhân ba mươi ngày" },
          { label: "Doanh thu là tiền đi ngang qua tay, chưa phải tiền của mình", tone: "note", cue: "Doanh thu là tiền đi ngang qua tay mình" },
        ],
      },
    ],
    4: [
      {
        type: "ledger",
        title: "GIÁ VỐN 1 LY",
        cue: "Một ly trà sữa mình nhìn đơn giản vậy",
        lines: [
          { label: "Trà, sữa, đường, trân châu", value: "11.000đ", cue: "tốn khoảng mười một ngàn tiền nguyên liệu" },
          { label: "Ly, nắp, ống hút, túi", value: "2.000đ", cue: "Ly, nắp, ống hút, túi thêm khoảng hai ngàn" },
          { label: "1 ly", value: "13.000đ", tone: "total", cue: "Vị chi mười ba ngàn một ly" },
          { label: "× 3.000 ly/tháng", value: "39,0 triệu", cue: "Mười ba ngàn nhân ba ngàn ly" },
          { label: "Hao hụt 5%", value: "+2,0 triệu", tone: "minus", cue: "Bác tính nhẹ nhàng thôi, năm phần trăm" },
          { label: "Nguyên liệu & bao bì", value: "−41,0 triệu", tone: "minus", cue: "Tổng cộng nguyên liệu với bao bì" },
          { label: "Còn lại", value: "64,0 triệu", tone: "total", cue: "còn sáu mươi bốn triệu" },
        ],
      },
    ],
    5: [
      {
        type: "ledger",
        title: "APP GIAO HÀNG",
        cue: "Các app giao đồ ăn thường lấy chiết khấu",
        lines: [
          { label: "Đơn qua app", value: "1.200 ly/tháng", cue: "một tháng là một ngàn hai trăm ly" },
          { label: "× 35.000đ", value: "42,0 triệu", cue: "ra bốn mươi hai triệu" },
          { label: "Chiết khấu 25%", value: "−10,5 triệu", tone: "minus", cue: "Hai mươi lăm phần trăm của bốn mươi hai triệu" },
          { label: "Cứ 4 ly qua app, 1 ly làm không công", tone: "note", cue: "cứ bốn ly bán qua app" },
          { label: "1 ly qua app còn", value: "≈13.000đ", cue: "mình chỉ còn lại khoảng mười ba ngàn" },
          { label: "1 ly tại quán còn", value: "22.000đ", tone: "plus", cue: "ly bán tại quán còn lại tới hai mươi hai ngàn" },
          { label: "Còn lại", value: "53,5 triệu", tone: "total", cue: "còn năm mươi ba triệu rưỡi" },
        ],
      },
    ],
    6: [
      {
        type: "ledger",
        title: "MẶT BẰNG",
        cue: "Một mặt bằng khoảng ba chục mét vuông",
        until: "Kế tiếp là nhân viên",
        lines: [
          { label: "~30 m², Gò Vấp", value: "−15,0 triệu", tone: "minus", cue: "Bác lấy tròn mười lăm triệu" },
          { label: "= 14% doanh thu", tone: "note", cue: "là khoảng mười bốn phần trăm" },
          { label: "Quy tắc: tiền nhà ≤ 15% doanh thu", tone: "note", cue: "tiền mặt bằng không nên vượt quá mười lăm phần trăm" },
        ],
      },
      {
        type: "ledger",
        title: "NHÂN VIÊN",
        cue: "Kế tiếp là nhân viên",
        lines: [
          { label: "20 giờ công/ngày", cue: "khoảng hai mươi giờ công mỗi ngày" },
          { label: "× 27.000đ/giờ × 30 ngày", cue: "Bác lấy hai mươi bảy ngàn một giờ" },
          { label: "Nhân viên", value: "−16,2 triệu", tone: "minus", cue: "ra mười sáu triệu hai" },
          { label: "Còn lại", value: "22,3 triệu", tone: "total", cue: "còn hai mươi hai triệu ba" },
        ],
      },
    ],
    7: [
      {
        type: "ledger",
        title: "LỖ NHỎ GOM LẠI",
        cue: "Điện nước",
        lines: [
          { label: "Điện nước", value: "−3,5 triệu", tone: "minus", cue: "Bác tính khoảng ba triệu rưỡi" },
          { label: "Thuế (vượt ngưỡng 1 tỷ/năm)", value: "−3,5 triệu", tone: "minus", cue: "Tính ra khoảng ba triệu rưỡi" },
          { label: "Marketing", value: "−3,0 triệu", tone: "minus", cue: "Bác để ba triệu một tháng" },
          { label: "Linh tinh", value: "−1,5 triệu", tone: "minus", cue: "Một triệu rưỡi" },
          { label: "Lời trên giấy", value: "10,8 triệu", tone: "total", cue: "còn lại mười triệu tám trăm ngàn" },
        ],
      },
    ],
    8: [
      {
        type: "ledger",
        title: "VỐN BAN ĐẦU",
        cue: "Kẻ giấu mặt đó tên là",
        lines: [
          { label: "Sửa chữa, trang trí, biển hiệu", value: "100 triệu", cue: "cả trăm triệu như chơi" },
          { label: "Máy móc, tủ, quầy", value: "70 triệu", cue: "Thêm bảy chục triệu" },
          { label: "Bàn ghế, dụng cụ, hàng ban đầu", value: "30 triệu", cue: "Thêm ba chục triệu nữa" },
          { label: "Tổng vốn", value: "200 triệu", tone: "total", cue: "Tổng cộng hai trăm triệu" },
          { label: "÷ 24 tháng = khấu hao", value: "−8,3 triệu/tháng", tone: "minus", cue: "Mỗi tháng tám triệu ba" },
        ],
      },
    ],
    9: [
      {
        type: "ketso",
        cue: "Rồi. Bây giờ Bác kết sổ",
        until: "Mà đó là Bác chưa tính một thứ quan trọng nhất",
        props: traSua100Ly,
        rowCues: [
          "Doanh thu một trăm lẻ năm triệu",
          "Trừ nguyên liệu",
          "Trừ app",
          "Trừ mặt bằng",
          "Trừ nhân viên",
          "Trừ điện nước",
          "Lời trên giấy mười triệu tám",
          "Trừ khấu hao",
        ],
        resultCue: "Còn lại: hai triệu năm trăm ngàn đồng",
      },
      {
        type: "ledger",
        title: "CÔNG CỦA CHỦ QUÁN",
        cue: "Nếu cháu đi làm thuê",
        lines: [
          { label: "Lời thật", value: "2,5 triệu", tone: "plus", cue: "Nếu cháu đi làm thuê" },
          { label: "Công chủ quán 10h × 27.000đ", value: "−8,1 triệu", tone: "minus", cue: "cũng được tám triệu mốt" },
          { label: "Thực chất", value: "≈ −5,6 triệu", tone: "minus", cue: "lỗ hơn năm triệu rưỡi một tháng" },
        ],
      },
    ],
    10: [
      {
        type: "ledger",
        title: "MỖI LY CÒN LẠI",
        cue: "Mình lấy một ly trà sữa bán tại quán",
        until: "Chia ba mươi ngày",
        lines: [
          { label: "Ly bán tại quán", value: "≈ 19.800đ", tone: "plus", cue: "Còn lại khoảng mười chín ngàn tám" },
          { label: "Ly bán qua app", value: "≈ 11.000đ", cue: "còn khoảng mười một ngàn" },
          { label: "Trung bình (60/40)", value: "≈ 16.300đ/ly", tone: "total", cue: "chừng mười sáu ngàn ba" },
          { label: "Chi phí cố định", value: "47,5 triệu/tháng", tone: "minus", cue: "bốn mươi bảy triệu rưỡi một tháng" },
          { label: "Miễn thuế TNCN trên 1 tỷ đầu", value: "+1,2 triệu", tone: "plus", cue: "mỗi tháng quán bớt được khoảng một triệu hai" },
          { label: "Chi phí cần gánh", value: "≈ 46,3 triệu", tone: "total", cue: "còn chừng bốn mươi sáu triệu" },
        ],
      },
      {
        type: "chart",
        title: "ĐIỂM HÒA VỐN",
        cue: "Chia ba mươi ngày",
        until: "Cho nên câu hỏi đúng",
        marginPerCup: 17.85, // 60% tại quán 21.350đ + 40% qua app 12.600đ, trước thuế
        price: 35,
        taxFreeRevenue: 1000,
        vatRate: 0.03,
        pitRate: 0.015,
        fixedCost: 47.5,
        ownerWage: 8.1,
        days: 30,
        markers: [
          { cups: 95, cue: "chín mươi lăm ly mỗi ngày" },
          { cups: 111, cue: "một trăm mười một ly mỗi ngày" },
          { cups: 70, cue: "Bán bảy chục ly mỗi ngày" },
          { cups: 100, cue: "Bán một trăm ly" },
          { cups: 150, cue: "bán một trăm năm chục ly" },
        ],
      },
      { type: "headline", cue: "Cho nên câu hỏi đúng", text: "Phải bán bao nhiêu ly", sub: "mới KHÔNG LỖ?" },
    ],
    11: [
      {
        type: "rules",
        title: "5 ĐIỀU ĐỂ QUÁN SỐNG",
        cue: "Điều thứ nhất",
        items: [
          { text: "Tính điểm hòa vốn TRƯỚC khi ký hợp đồng thuê nhà", cue: "Điều thứ nhất" },
          { text: "Tiền nhà ≤ 15% doanh thu dự kiến", cue: "Điều thứ hai" },
          { text: "Kéo khách mua tại quán (mỗi 10% đơn rời app ≈ +2,6 triệu/tháng)", cue: "Điều thứ ba" },
          { text: "Tăng tiền lời mỗi ly: topping, size lớn, combo", cue: "Điều thứ tư" },
          { text: "Đừng đổ tiền vào trang trí: bớt 50 triệu ≈ +2 triệu lời/tháng", cue: "Điều thứ năm" },
        ],
      },
    ],
    12: [
      {
        type: "rules",
        title: "BA ĐIỀU NHỚ GIÙM BÁC",
        cue: "Bà con nhớ giùm Bác ba điều",
        until: "Nếu bà con thấy video này có ích",
        items: [
          { text: "Doanh thu chưa phải tiền của mình", cue: "Thứ nhất" },
          { text: "Đừng quên vốn ban đầu và công sức của chính mình", cue: "Thứ hai" },
          { text: "Tính xem mỗi ngày phải bán bao nhiêu mới không lỗ", cue: "Thứ ba" },
        ],
      },
      { type: "quote", cue: "Lời trên giấy chưa phải là lời trong túi", text: "Lời trên giấy chưa phải là lời trong túi.", subscribeCue: "bấm đăng ký kênh" },
    ],
  },
};
