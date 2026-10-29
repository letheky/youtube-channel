import type { VideoSpec } from "../video/types";

// Giá lịch sử theo kịch bản đã thu; tỷ lệ hòa vốn tính trên giá mua vào của tiệm.
export const tiemVangKhongLoVideo: VideoSpec = {
  sidePanels: true,
  keywordPosition: "lower",
  outro: { title: "BÁC SÁU SỔ SÁCH", tagline: "“Mua vàng thì nhìn cả giá bán lại.”" },
  overlays: {
    1: [
      { type: "headline", cue: "Nghe tin giá vàng lên", until: "Bác nghe xong", text: "GIÁ VÀNG LÊN 1 TRIỆU", sub: "…MÀ VẪN LỖ 2 TRIỆU?" },
      { type: "headline", cue: "Khoan đưa sổ đây Bác coi", until: "Hôm nay Bác Sáu", text: "ĐƯA SỔ ĐÂY", sub: "BÁC COI!" },
    ],
    2: [{ type: "ledger", title: "VÀNG MIẾNG · 19/10/2026", cue: "Bác lấy giá ngày", lines: [
      { label: "Tiệm mua vào · mình bán", value: "140,6 triệu", cue: "tiệm mua vào một trăm" },
      { label: "Tiệm bán ra · mình mua", value: "143,6 triệu", cue: "bán ra một trăm" },
      { label: "Chênh lệch mỗi lượng", value: "3,0 triệu", tone: "total", cue: "Chênh nhau ba triệu đồng" },
      { label: "So với giá mình mua", value: "≈ 2,1%", tone: "minus", cue: "Khoảng hai phần trăm" },
      { label: "Giá lịch sử, đơn vị: triệu đồng/lượng", tone: "note", cue: "Ba triệu đó đi đâu" },
    ] }],
    3: [{ type: "ledger", title: "VÀNG CỦA CHỊ HAI", cue: "Giờ mình coi lại", lines: [
      { label: "Mua tuần trước · giá bán ra", value: "143,6 triệu", cue: "Chị mua thì chị trả" },
      { label: "Giá mua vào tuần này", value: "141,6 triệu", cue: "Cột mua vào lên thành" },
      { label: "Giá bán ra tuần này", value: "144,6 triệu", cue: "Cột bán ra lên thành" },
      { label: "Bán lại theo cột mua vào", value: "141,6 triệu", cue: "Chị đem vàng ra bán" },
      { label: "Lỗ dù giá tăng 1 triệu", value: "−2,0 triệu", tone: "total", cue: "Lỗ hai triệu" },
      { label: "Cần bù khoảng chênh 3 triệu (≈ 2,1%)", tone: "note", cue: "Phải lên hơn ba triệu" },
    ] }],
    4: [{ type: "ledger", title: "MỖI NƠI MỘT KHOẢNG CHÊNH", cue: "Cũng trong ngày mười chín", lines: [
      { label: "Nhẫn · thương hiệu lớn", value: "3,0 tr · ≈ 2,1%", cue: "chênh khoảng ba triệu một lượng" },
      { label: "Vàng miếng · đa số nơi", value: "3,0 tr · ≈ 2,1%", cue: "gần giống vàng miếng" },
      { label: "Nhẫn · một nơi khác", value: "4,0 tr · ≈ 2,9%", tone: "total", cue: "Chênh tới bốn triệu" },
      { label: "Tỷ lệ tăng để hòa vốn; giá ngày 19/10/2026", tone: "note", cue: "giá vàng phải tăng gần ba phần trăm" },
    ] }],
    5: [{ type: "ledger", title: "MỘT TIỆM · MỘT NGÀY", cue: "Bác lấy một tiệm vừa vừa", until: "Giờ coi chuyện giá vàng", lines: [
      { label: "Mua vào", value: "10 lượng", cue: "tiệm mua vào mười lượng" },
      { label: "Bán ra", value: "10 lượng", cue: "tiệm bán ra mười lượng" },
      { label: "Chênh mỗi lượng", value: "3 triệu", cue: "Mỗi lượng tiệm hưởng" },
      { label: "Chênh lệch GỘP", value: "30 triệu/ngày", tone: "total", cue: "ba chục triệu đồng chênh lệch" },
      { label: "Minh họa; chưa trừ chi phí, không phải lợi nhuận ròng", tone: "note", cue: "Dĩ nhiên đó là con số gộp" },
    ] }, { type: "chips", cue: "Khi giá vàng lên", until: "Bác nói cho công bằng", items: [
      { text: "Giá lên → khách đổ xô mua", cue: "Khi giá vàng lên" },
      { text: "Giá xuống → khách hoảng bán", cue: "Khi giá vàng xuống" },
      { text: "Biến động mạnh → có khi nới chênh", cue: "Lúc giá biến động mạnh" },
    ] }, { type: "headline", cue: "tiệm vàng không phải không bao giờ lỗ", text: "TIỆM VẪN CÓ THỂ LỖ", sub: "Chi phí · trộm cướp · tồn kho" }],
    6: [{ type: "ledger", title: "DÂY CHUYỀN 18K", cue: "Bác lấy con số đó làm ví dụ", lines: [
      { label: "Giá mua, gồm tiền công", value: "20 triệu", cue: "mua hai chục triệu" },
      { label: "Bán lại 70% hóa đơn", value: "14 triệu", cue: "là mười bốn triệu" },
      { label: "Mất ngay khi bán lại", value: "6 triệu · 30%", tone: "total", cue: "Mất sáu triệu" },
      { label: "Tăng để hòa vốn: 20 ÷ 14 − 1", value: "≈ 43%", tone: "minus", cue: "giá vàng phải tăng tới khoảng" },
      { label: "Ví dụ theo một ca bán lại 70%, không phải mọi tiệm", tone: "note", cue: "Cho nên Bác nói thẳng" },
    ] }],
    7: [{ type: "chips", cue: "Thứ nhất mất hóa đơn", items: [
      { text: "Mất hóa đơn", cue: "Thứ nhất mất hóa đơn" },
      { text: "Bán khác tiệm: hỏi lại giá", cue: "Thứ hai bán ở tiệm khác" },
      { text: "Trừ hao · đá/hột không tính vàng", cue: "Thứ ba trừ hao" },
      { text: "Mua lúc cả xóm đổ xô", cue: "Thứ tư cái này là thói quen" },
    ] }],
    8: [{ type: "comparison", title: "MUA XONG BÁN LIỀN, MẤT BAO NHIÊU?", subtitle: "Cất khoảng 143 triệu vào vàng · Các số đã làm tròn", columns: ["Loại vàng", "Mất khi bán lại", "Tăng để hòa vốn"], cue: "Rồi Bác kết sổ", until: "Tiền không biết nói dối", rows: [
      { label: "Vàng miếng · chênh 3 triệu", total: 3, extra: 2.1, totalText: "3,0 triệu", extraText: "≈ 2,1%", cue: "Vàng miếng ở nơi" },
      { label: "Nhẫn trơn · chênh 3 triệu", total: 3, extra: 2.1, totalText: "3,0 triệu", extraText: "≈ 2,1%", cue: "Vàng nhẫn tròn trơn" },
      { label: "Nhẫn · nơi chênh 4 triệu", total: 4, extra: 2.9, totalText: "4,0 triệu", extraText: "≈ 2,9%", cue: "Vàng nhẫn ở nơi" },
      { label: "Trang sức 18K · bán lại 70%", total: 42.9, extra: 42.857, totalText: "≈ 43 triệu", extraText: "≈ 43%", cue: "mua trang sức mười tám K" },
    ], stamp: "≈ 43%", stampCue: "Giá vàng phải tăng khoảng bốn mươi ba phần trăm", notes: [
      "Miếng/nhẫn: chênh không đổi; % tính trên giá tiệm mua vào.",
      "18K: ví dụ bán lại 70% hóa đơn; 1 ÷ 70% − 1 ≈ 42,86%.",
      "Tỷ lệ bán lại 70% không áp dụng cho mọi món hoặc mọi tiệm.",
    ] }, { type: "quote", cue: "Tiền không biết nói dối", text: "Tiền không biết nói dối.", quoteTop: 750 }],
    9: [{ type: "headline", cue: "vàng hợp với chuyện cất giữ lâu dài", until: "Hai là", text: "CẤT GIỮ LÂU DÀI", sub: "KHÔNG PHẢI LƯỚT SÓNG" },
      { type: "chips", cue: "Hai là giá vàng", items: [
        { text: "Giá có lên, cũng có xuống", cue: "Hai là giá vàng" },
        { text: "Không bỏ hết tiền vào một chỗ", cue: "đừng bỏ hết tiền vào một chỗ" },
        { text: "Không mua theo tin đồn", cue: "Ba là đừng mua theo tin đồn" },
      ] }],
    10: [{ type: "rules", title: "5 ĐIỀU TRƯỚC KHI MUA VÀNG", cue: "Bác dặn bà con năm điều", items: [
      { text: "Nhìn cả hai cột, tự tính khoảng chênh", cue: "Điều thứ nhất" },
      { text: "Hỏi giá mua vào ở vài nơi", cue: "Điều thứ hai" },
      { text: "Giữ hóa đơn cẩn thận", cue: "Điều thứ ba" },
      { text: "Để dành: nhẫn/miếng · Để đeo: trang sức", cue: "Điều thứ tư" },
      { text: "Không lướt sóng theo tin đồn", cue: "Điều thứ năm" },
    ] }],
    11: [{ type: "rules", title: "BA ĐIỀU NHỚ GIÙM BÁC", cue: "Bà con nhớ giùm Bác ba điều", until: "Nếu bà con thấy video này có ích", items: [
      { text: "Giá mình mua cao hơn giá mình bán lại", cue: "Thứ nhất" },
      { text: "Giá lên chưa chắc lời: phải bù khoảng chênh", cue: "Thứ hai" },
      { text: "Trang sức để đeo; nhẫn/miếng để dành", cue: "Thứ ba" },
    ] }, { type: "quote", cue: "Nếu bà con thấy video này có ích", text: "Mua vàng thì nhìn cả giá bán lại.", quoteTop: 750, subscribeCue: "bấm đăng ký kênh", subscribeTop: 260 }],
  },
};
