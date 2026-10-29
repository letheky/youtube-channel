import type {VideoSpec} from "../video/types";

// Toàn bộ đầu vào thương mại là giả định riêng; nguồn cơ chế kiểm ngày 26/10/2026.
export const tiemSuaXeVideo:VideoSpec={
 sidePanels:true,keywordPosition:"lower",
 outro:{title:"BÁC SÁU SỔ SÁCH",tagline:"“Tay nghề nuôi tiệm. Sổ rõ giữ nghề.”"},
 overlays:{
  1:[{type:"headline",cue:"Một ngày thu gần hai triệu",until:"Có người thấy tiệm",text:"THU GẦN 2 TRIỆU/NGÀY",sub:"CHƯA PHẢI TOÀN BỘ TIỀN CÔNG"},
   {type:"chips",cue:"Tiệm trong chuyện là giả định",items:[
    {text:"Một tiệm giả định · chú Ba tự làm",cue:"Tiệm trong chuyện là giả định"},
    {text:"Không phải khảo sát thu nhập / bảng giá sửa xe",cue:"Đây không phải khảo sát"},
    {text:"Coi cả giờ làm, ngày nghỉ và tiền nằm trong kho",cue:"Bữa nay Bác muốn tìm"},
   ]}],
  2:[{type:"ledger",title:"18 CA/NGÀY · BỘ SỐ GIẢ ĐỊNH",cue:"Bác chia ngày thường",until:"Đó là ba nhóm minh họa",lines:[
    {label:"10 ca nhanh · thu / giá vốn mỗi ca",value:"50.000 / 20.000đ",cue:"Mười ca nhanh"},
    {label:"6 ca vừa · thu / giá vốn mỗi ca",value:"140.000 / 85.000đ",cue:"Sáu ca vừa"},
    {label:"2 ca lâu · thu / giá vốn mỗi ca",value:"320.000 / 190.000đ",cue:"Hai ca lâu hơn"},
   ]},{type:"ledger",title:"KHÁCH TRẢ TRỌN CA GỒM CÔNG + HÀNG",cue:"Đó là ba nhóm minh họa",until:"Thấy bán một món",lines:[
    {label:"Tiền khách trả",value:"1.980.000đ",cue:"một triệu chín trăm tám chục ngàn"},
    {label:"Phụ tùng đã dùng",value:"−1.090.000đ",tone:"minus",cue:"một triệu không trăm chín chục ngàn"},
    {label:"CHÊNH TRƯỚC CHI CHUNG / CÔNG CHỦ",value:"890.000đ",tone:"total",cue:"Phần chênh còn"},
    {label:"Không cộng tiền công thêm lên hóa đơn trọn ca",tone:"note",cue:"Không cộng tiền công"},
   ]}],
  3:[{type:"ledger",title:"MỘT NGƯỜI · NGÀY THƯỜNG GIẢ ĐỊNH",cue:"Mỗi ca nhanh",until:"Có bà con nói",lines:[
    {label:"Sửa ca có thu tiền",value:"420 phút",cue:"bảy tiếng trực tiếp sửa"},
    {label:"Bảo hành / mua hàng + sổ / chờ / nghỉ",value:"30 / 60 / 60 / 30 phút",cue:"Ngoài ra còn nửa tiếng"},
    {label:"HIỆN DIỆN Ở TIỆM",value:"600 phút = 10 giờ",tone:"total",cue:"mười tiếng hiện diện"},
    {label:"Chờ khách vẫn giữ chân · không vặn ốc cả 10 giờ",tone:"note",cue:"Nhưng Bác cũng không nói"},
   ]},{type:"ledger",title:"THỬ TĂNG 18 → 24 CA · CÙNG CƠ CẤU",cue:"Có bà con nói",lines:[
    {label:"Riêng giờ sửa",value:"560 phút",cue:"chín tiếng hai chục phút"},
    {label:"Giữ 3 giờ việc khác",value:"+180 phút",cue:"Cộng ba tiếng việc khác"},
    {label:"NGÀY LÀM THÀNH",value:"12 giờ 20 phút",tone:"total",cue:"mười hai tiếng hai chục phút"},
    {label:"Muốn thêm người phải tính công và nghĩa vụ riêng",tone:"note",cue:"Người phụ lại có"},
   ]}],
  4:[{type:"ledger",title:"CA DÀI RIÊNG · KHÔNG GHÉP VÀO NGÀY CƠ SỞ",cue:"Bác thử một ca khác",until:"Trong đúng ba tiếng ấy",lines:[
    {label:"Khách trả / phụ tùng",value:"600.000 / 480.000đ",cue:"Khách trả sáu trăm ngàn"},
    {label:"Chênh còn · mất 3 giờ",value:"120.000đ",cue:"Chênh còn một trăm"},
    {label:"TRƯỚC CHI CHUNG",value:"40.000đ/giờ",tone:"total",cue:"bốn chục ngàn một giờ"},
   ]},{type:"ledger",title:"CÙNG 180 PHÚT · CHỈ NẾU ĐỦ KHÁCH",cue:"Trong đúng ba tiếng ấy",until:"Bác không xúi tiệm",lines:[
    {label:"15 ca nhanh × 30.000đ chênh",value:"450.000đ",tone:"total",cue:"bốn trăm năm chục ngàn"},
    {label:"Phải có đủ khách · đúng việc · đúng tay nghề",tone:"note",cue:"phải thật sự có đủ khách"},
   ]},{type:"rules",title:"GHI ĐỂ HẸN ĐÚNG VÀ SỬA AN TOÀN",cue:"Chú Ba muốn biết",items:[
    {text:"Giờ nhận / xong · tiền hàng · lần coi lại",cue:"ghi lúc nhận"},
    {text:"Không rút bước kiểm tra an toàn để chạy số ca",cue:"Với xe cộ"},
    {text:"Giờ bảo hành và hàng bảo hành: hai khoản khác nhau",cue:"Nửa tiếng bảo hành"},
   ]}],
  5:[{type:"ledger",title:"THÁNG 26 NGÀY · ĐẦU VÀO GIẢ ĐỊNH",cue:"Làm hai mươi sáu ngày",until:"Trong ví dụ",lines:[
    {label:"Khách trả",value:"51.480.000đ",cue:"tháng thu năm mươi mốt"},
    {label:"Sau phụ tùng đã dùng 28,34 triệu",value:"23.140.000đ",cue:"phần chênh là"},
    {label:"Thuê + điện nước + tiêu hao + bảo hành + vệ sinh",value:"−6.200.000đ",tone:"minus",cue:"sáu triệu hai một tháng"},
   ]},{type:"chips",cue:"Trong ví dụ",until:"Bác còn đặt khoản",items:[
    {text:"Toàn hộ chỉ có tiệm này · 617,76 triệu/năm thường",cue:"Trong ví dụ"},
    {text:"Dưới 1 tỷ/năm · không chịu GTGT / không phải TNCN kinh doanh",cue:"Theo nguồn chính thức"},
    {text:"Nguồn chính thức kiểm 26/10/2026 · không miễn mọi nghĩa vụ",cue:"Không có nghĩa"},
   ]},{type:"ledger",title:"BẢO HIỂM LÀ THỰC CHI GIẢ ĐỊNH RIÊNG",cue:"Bác còn đặt khoản",lines:[
    {label:"Tổng BHXH tự nguyện + BHYT theo hồ sơ riêng",value:"−1.200.000đ",tone:"minus",cue:"một triệu hai mỗi tháng"},
    {label:"Không là mức đóng chung / công thức pháp định",tone:"note",cue:"Đây không phải mức đóng chung"},
    {label:"TIỀN CHỦ TRƯỚC GIỮ ĐỒ NGHỀ",value:"15.740.000đ",tone:"total",cue:"mười lăm triệu bảy trăm bốn chục ngàn"},
    {label:"Có công chú Ba · chưa trả lương chủ riêng",tone:"note",cue:"Chưa thuê một người làm thay"},
   ]}],
  6:[{type:"ledger",title:"TIỀN THAY ĐỒ NGHỀ · GIẢ ĐỊNH",cue:"Máy nén khí",until:"Giữ riêng không có nghĩa",lines:[
    {label:"Đã mua trước kỳ",value:"60.000.000đ",cue:"hết sáu chục triệu"},
    {label:"Dùng 5 năm · không giá trị thu hồi",value:"60 tháng",cue:"Bác giả định dùng"},
    {label:"GIỮ TIỀN MỖI THÁNG",value:"1.000.000đ",tone:"total",cue:"giữ riêng mỗi tháng một triệu"},
   ]},{type:"ledger",title:"GIỮ TIỀN MỘT LẦN · KHÔNG TRỪ KHẤU HAO THÊM",cue:"Giữ riêng không có nghĩa",lines:[
    {label:"Tiền vẫn thuộc chủ · chưa nên tiêu hết",tone:"note",cue:"Tiền vẫn còn của chú"},
    {label:"Không vừa giữ quỹ vừa trừ khấu hao lần hai",tone:"note",cue:"Bác cũng không vừa trích quỹ"},
    {label:"Sau giữ đồ nghề · trước sinh hoạt gia đình",value:"14.740.000đ",tone:"total",cue:"còn mười bốn triệu bảy trăm bốn chục ngàn"},
    {label:"Giá thay đổi / hư sớm: phải tính lại",tone:"note",cue:"Nếu thiết bị hư sớm"},
   ]}],
  7:[{type:"ledger",title:"SO VỚI MỐC VĂN PHÒNG GIẢ ĐỊNH",cue:"Giờ mới đặt cạnh",until:"Chia phần sau giữ",lines:[
    {label:"Văn phòng: tiền về túi sau khấu trừ",value:"15.000.000đ/tháng",cue:"mười lăm triệu tiền về túi"},
    {label:"Văn phòng: 22 ngày × 8 giờ",value:"176 giờ",cue:"hai mươi hai ngày"},
    {label:"Tiệm: 26 ngày × 10 giờ",value:"260 giờ",cue:"hai trăm sáu chục giờ"},
    {label:"TIỆM NHIỀU HƠN",value:"84 giờ/tháng",tone:"total",cue:"tám mươi bốn giờ"},
   ]},{type:"ledger",title:"TIỀN GIỮ LẠI / GIỜ HIỆN DIỆN · MÔ HÌNH",cue:"Chia phần sau giữ",lines:[
    {label:"Tiệm · sau giữ đồ nghề",value:"≈57.000đ/giờ",cue:"năm mươi bảy ngàn một giờ"},
    {label:"Mốc văn phòng giả định",value:"≈85.000đ/giờ",cue:"khoảng tám mươi lăm ngàn"},
    {label:"Không xếp hạng nghề từ một ví dụ",tone:"note",cue:"Không có nghĩa công người thợ"},
    {label:"Chưa quy hết phúc lợi, đi lại, vốn và ổn định",tone:"note",cue:"Cả hai chưa tính"},
   ]}],
  8:[{type:"ledger",title:"THỬ TĂNG KHO · MUA/BÁN TRẢ NGAY",cue:"Bác thử tháng thường",until:"Giả định mua trả ngay",lines:[
    {label:"Kho đầu / cuối kỳ theo giá vốn",value:"30 / 38 triệu",cue:"kho đầu kỳ ba chục triệu"},
    {label:"Phụ tùng đã dùng vẫn",value:"28.340.000đ",cue:"Phụ tùng đã dùng cho khách"},
    {label:"MUA HÀNG = ĐÃ DÙNG + TĂNG KHO",value:"36.340.000đ",tone:"total",cue:"ba mươi sáu triệu ba trăm bốn chục ngàn"},
   ]},{type:"ledger",title:"KHO TĂNG 8 TRIỆU · TIỀN CHỦ GIẢM 8 TRIỆU",cue:"Giả định mua trả ngay",lines:[
    {label:"Trước giữ đồ nghề",value:"7.740.000đ",cue:"bảy triệu bảy trăm bốn chục ngàn"},
    {label:"SAU GIỮ ĐỒ NGHỀ",value:"6.740.000đ",tone:"total",cue:"sáu triệu bảy trăm bốn chục ngàn"},
    {label:"Hàng vẫn là tài sản · không tự nhiên lỗ 8 triệu",tone:"note",cue:"Hàng vẫn là tài sản"},
    {label:"Không vừa tính hàng còn vừa tính tiền mặt nguyên",tone:"note",cue:"Nhưng cũng đừng vừa coi"},
   ]}],
  9:[{type:"ledger",title:"THỬ THÁNG CHỈ LÀM 20 NGÀY",cue:"Giờ thử chú đóng tiệm",until:"Một năm giả định",lines:[
    {label:"Nghỉ 6 ngày · giữ chi cố định / bảo hiểm / quỹ",tone:"note",cue:"Tiền thuê và các khoản"},
    {label:"Tiền chủ trước giữ đồ nghề",value:"10.400.000đ",cue:"mười triệu bốn trăm ngàn"},
    {label:"SAU GIỮ ĐỒ NGHỀ",value:"9.400.000đ",tone:"total",cue:"chín triệu bốn trăm ngàn"},
    {label:"Chênh từ tiệm giảm so tháng thường",value:"5.340.000đ",cue:"năm triệu ba trăm bốn chục ngàn"},
    {label:"Chưa tính trợ cấp đủ điều kiện hoặc chi chữa bệnh",tone:"note",cue:"Đây chỉ là sổ tiệm"},
   ]},{type:"ledger",title:"NĂM GIẢ ĐỊNH · 10 THÁNG THƯỜNG + 2 THÁNG NGẮN",cue:"Một năm giả định",lines:[
    {label:"Tổng có thể rút sau bảo hiểm và giữ đồ nghề",value:"166.200.000đ/năm",cue:"một trăm sáu mươi sáu triệu hai trăm ngàn"},
    {label:"BÌNH QUÂN THÁNG",value:"13.850.000đ",tone:"total",cue:"mười ba triệu tám trăm năm chục ngàn"},
    {label:"Hiện diện cả năm",value:"3.000 giờ",cue:"ba ngàn giờ hiện diện"},
    {label:"Phép thử · không dự báo hoặc quy luật ngành",tone:"note",cue:"Đây không phải dự báo"},
   ]}],
  10:[{type:"rules",title:"GIỮ NGHỀ BẰNG SỔ RÕ",cue:"Bác nhớ ba điều",until:"Bà con đang làm nghề nào",items:[
    {text:"Khách trả gồm tiền hàng · chưa toàn bộ tiền công",cue:"Tiền khách trả có cả tiền hàng"},
    {text:"Một người có giới hạn giờ · không tăng sức vô hạn",cue:"Một người thợ có giới hạn"},
    {text:"Kho là tài sản · chưa phải tiền mặt để tiêu",cue:"Và tiền nằm trong phụ tùng"},
   ]},{type:"quote",cue:"Tay nghề nuôi tiệm",text:"Tay nghề nuôi tiệm.\nSổ rõ giữ nghề.",quoteTop:700,quoteFontSize:60,quoteWidth:1700,subscribeCue:"Tay nghề nuôi tiệm",subscribeTop:580}],
 }
};
