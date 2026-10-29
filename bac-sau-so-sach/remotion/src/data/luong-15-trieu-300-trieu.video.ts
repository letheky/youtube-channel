import type {VideoSpec} from "../video/types";

// Nguồn pháp lý24/10/2026; ngân sách và lãi là giả định riêng của Bảo.
export const luong15TrieuVideo:VideoSpec={
  sidePanels:true,keywordPosition:"lower",
  outro:{title:"BÁC SÁU SỔ SÁCH",tagline:"“Tiền để dành là phần còn lại sau một năm thật, không phải sau một tháng đẹp trời.”"},
  overlays:{
    1:[{type:"headline",cue:"Năm năm là ba trăm triệu",until:"Nó cười",text:"15 TRIỆU → 300 TRIỆU?",sub:"5 TRIỆU ĐÃ CÓ · HAY MỚI NHẨM?"},
      {type:"chips",cue:"Bảo và toàn bộ tiền sinh hoạt",until:"Tới cuối sổ",items:[
        {text:"Nhân vật và ngân sách giả định",cue:"Bảo và toàn bộ tiền sinh hoạt"},
        {text:"Bắt đầu từ 0 · không nợ/thưởng",cue:"Mình giả định nó bắt đầu"},
        {text:"Quy định đối chiếu 24/10/2026",cue:"Luật và bảo hiểm"},
      ]}],
    2:[{type:"ledger",title:"LƯƠNG VỀ TÚI · TRƯỜNG HỢP BẢO",cue:"Bác thống nhất trước",lines:[
      {label:"Lương trước khấu trừ · căn cứ BH 15 triệu",value:"15.000.000đ",cue:"mười lăm triệu là lương trước"},
      {label:"NLĐ: 8% BHXH+1,5% BHYT+1% BHTN",value:"10,5%",cue:"Phần người lao động đóng"},
      {label:"Bảo hiểm người lao động",value:"−1.575.000đ",tone:"minus",cue:"ra một triệu năm trăm"},
      {label:"Chỉ lương này · đủ điều kiện đã đặt",value:"0đ TNCN",cue:"nên theo các điều kiện"},
      {label:"THỰC NHẬN",value:"13.425.000đ",tone:"total",cue:"Vậy tiền thực nhận còn"},
      {label:"Không trừ thêm phần doanh nghiệp",tone:"note",cue:"Mình chưa mua ly nước"},
    ]}],
    3:[{type:"ledger",title:"CHI THÁNG · NGÂN SÁCH GIẢ ĐỊNH",cue:"Bác mở trang sinh hoạt",until:"Nhắc lại nghen",lines:[
      {label:"Phòng",value:"3.500.000đ",cue:"Tiền phòng"},
      {label:"Điện, nước, internet",value:"600.000đ",cue:"Điện nước internet"},
      {label:"Ăn uống",value:"2.700.000đ",cue:"Ăn uống"},
      {label:"Đi lại / điện thoại",value:"600.000 /150.000đ",cue:"Đi lại"},
      {label:"Cá nhân / giao tiếp, giải trí",value:"450.000 /900.000đ",cue:"Đồ dùng cá nhân"},
      {label:"TỔNG CHI THÁNG",value:"8.900.000đ",tone:"total",cue:"Cộng đủ"},
    ]},{type:"ledger",title:"THÁNG BÌNH THƯỜNG · GIẢ ĐỊNH",cue:"Mười ba triệu bốn trăm hai mươi lăm ngàn",until:"Bác đồng ý",lines:[
      {label:"Thực nhận",value:"13.425.000đ",cue:"Mười ba triệu bốn trăm"},
      {label:"Trừ sinh hoạt tháng",value:"−8.900.000đ",tone:"minus",cue:"trừ tám triệu chín"},
      {label:"CÒN · chưa trích chi năm",value:"4.525.000đ",tone:"total",cue:"còn bốn triệu"},
    ]}],
    4:[{type:"ledger",title:"CHI NĂM · GIẢ ĐỊNH RIÊNG",cue:"Hai bác cháu thử liệt kê",until:"Mỗi khoản này đứng ngoài",lines:[
      {label:"Tết, đi quê / gia đình, hiếu hỉ",value:"4,8 /4,8 triệu",cue:"Tết và đi quê"},
      {label:"Y tế ngoài phần được chi trả",value:"3,6 triệu",cue:"Y tế ngoài phần"},
      {label:"Sửa/thay thiết bị",value:"4,8 triệu",cue:"Sửa hoặc thay thiết bị"},
      {label:"Học hành / quần áo, giấy tờ",value:"3,6 /2,4 triệu",cue:"Học hành"},
      {label:"TỔNG · không nằm trong 8,9 triệu",value:"24 triệu/năm",tone:"total",cue:"Tổng hai chục bốn triệu"},
    ]},{type:"ledger",title:"TIỀN CÓ THỂ GÓP · GIẢ ĐỊNH",cue:"Hai chục bốn triệu chia mười hai",until:"Trích quỹ chưa phải đã tiêu",lines:[
      {label:"24 triệu÷12 → trích chi năm",value:"2.000.000đ/tháng",cue:"là hai triệu một tháng"},
      {label:"Dư sau sinh hoạt tháng",value:"4.525.000đ",cue:"Bốn triệu năm trăm"},
      {label:"GÓP MỤC TIÊU",value:"2.525.000đ/tháng",tone:"total",cue:"giờ chỉ còn"},
      {label:"Quỹ năm vẫn là tài sản · đã có việc chờ",tone:"note",cue:"Khoản hai triệu đang nằm"},
    ]}],
    5:[{type:"ledger",title:"GÓP ĐỀU 60 THÁNG · GIẢ ĐỊNH",cue:"Giữ mức góp hai triệu",until:"Bác cho thử",lines:[
      {label:"Góp mỗi tháng",value:"2.525.000đ",cue:"Giữ mức góp"},
      {label:"Chưa tính lãi ·60 lần",value:"151.500.000đ",tone:"total",cue:"là một trăm năm mươi mốt"},
      {label:"Mục tiêu ban đầu",value:"300.000.000đ",cue:"Khác xa ba trăm triệu"},
    ]},{type:"ledger",title:"MÔ HÌNH TOÁN · KHÔNG LÀ BIỂU LÃI",cue:"Bác cho thử một mô hình toán",lines:[
      {label:"Lãi giả định 4,5%/năm÷12",value:"ghép tháng",cue:"Giả định lãi bốn phẩy"},
      {label:"Góp CUỐI tháng 1…60",value:"2.525.000đ/lần",cue:"tiền góp vào cuối mỗi tháng"},
      {label:"Không phí/thuế trong phép thử",tone:"note",cue:"không phí không thuế"},
      {label:"TỔNG CUỐI KỲ",value:"169.542.519đ",tone:"total",cue:"Máy tính ra cuối kỳ"},
      {label:"Vốn / phần tăng thêm",value:"151,5 /≈18,043 triệu",cue:"Trong đó vốn mình góp"},
      {label:"Không hứa có sản phẩm/lãi cố định 5 năm",tone:"note",cue:"Đừng lấy cả ba trăm triệu"},
    ]}],
    6:[{type:"ledger",title:"QUỸ KHẨN CẤP · LỰA CHỌN MINH HỌA",cue:"Bảo chợt nhớ",until:"Ở phương án không lãi",lines:[
      {label:"3 tháng×8,9 triệu · tự chọn",value:"26,7 triệu",cue:"tức hai chục sáu triệu bảy"},
      {label:"Bắt đầu 0 · góp 2,525 triệu · chưa rút",value:"11 lần góp",cue:"cần mười một lần góp"},
      {label:"Không là mức đủ cho mọi người",tone:"note",cue:"Lúc quỹ chưa đủ"},
    ]},{type:"ledger",title:"MỘT TỔNG TIỀN · NHÁNH 0 LÃI",cue:"Ở phương án không lãi",lines:[
      {label:"Tổng sau 60 tháng",value:"151,5 triệu",cue:"tổng năm năm"},
      {label:"Trong tổng: quỹ khẩn cấp",value:"26,7 triệu",cue:"Chia thành quỹ khẩn cấp"},
      {label:"Còn cho mục tiêu khác",value:"124,8 triệu",tone:"total",cue:"tiền cho mục tiêu khác"},
      {label:"Quỹ chưa mất · không cộng thêm lần 2",tone:"note",cue:"Quỹ khẩn cấp chưa mất đi"},
      {label:"Đích 300 triệu gồm hay ngoài quỹ?",tone:"note",cue:"Nếu mục tiêu ba trăm triệu"},
    ]}],
    7:[{type:"ledger",title:"TÍNH NGƯỢC · CÙNG MÔ HÌNH LÃI",cue:"Muốn có ba trăm triệu",until:"Với thực nhận",lines:[
      {label:"Đích danh nghĩa · tháng 60 · từ 0",value:"300 triệu",cue:"Muốn có ba trăm triệu"},
      {label:"Cần≈4.467.905,77đ/tháng",value:"↑4.468.000đ",tone:"total",cue:"cần góp khoảng"},
      {label:"Mức đang có",value:"2.525.000đ/tháng",cue:"So với hai triệu"},
      {label:"THIẾU MỖI THÁNG",value:"≈1.943.000đ",tone:"minus",cue:"còn thiếu khoảng"},
    ]},{type:"ledger",title:"ĐIỀU KIỆN TOÁN · CHƯA LÀ LỜI KHUYÊN",cue:"Với thực nhận",lines:[
      {label:"Thực nhận",value:"13.425.000đ",cue:"Với thực nhận"},
      {label:"Tổng chi gồm trích năm tối đa",value:"≈8.957.000đ",cue:"chỉ được khoảng"},
      {label:"Giữ quỹ năm",value:"2.000.000đ/tháng",cue:"Nếu vẫn dành hai triệu"},
      {label:"Sinh hoạt tháng phải còn",value:"≈6.957.000đ",tone:"total",cue:"sinh hoạt tháng phải xuống"},
      {label:"Chưa chứng minh phù hợp đời sống",tone:"note",cue:"Bác không bảo Bảo"},
      {label:"Không lãi → cần 5 triệu/tháng",tone:"note",cue:"Nếu không có lãi"},
    ]}],
    8:[{type:"ledger",title:"CẢI THIỆN TỪ THÁNG 1 · GIẢ ĐỊNH",cue:"Bảo thử một phương án khác",until:"Nhưng nó hỏi",lines:[
      {label:"Tăng NET · sau khấu trừ/chi tạo thu",value:"+1.500.000đ",cue:"tăng tiền thực nhận"},
      {label:"Giảm chi",value:"600.000đ/tháng",cue:"đồng thời giảm chi"},
      {label:"Góp từ tháng 1",value:"4.625.000đ/tháng",cue:"tiền góp lên"},
      {label:"Cuối tháng 60 · cùng mô hình lãi",value:"310.548.179đ",tone:"total",cue:"cuối kỳ khoảng"},
      {label:"Không là kết quả ngân sách ban đầu",tone:"note",cue:"Đây là nhánh giả định"},
    ]},{type:"ledger",title:"CẢI THIỆN TỪ THÁNG 13 · GIẢ ĐỊNH",cue:"Mười hai tháng đầu vẫn góp",lines:[
      {label:"Tháng 1…12",value:"2.525.000đ/tháng",cue:"Mười hai tháng đầu"},
      {label:"Tháng 13…60",value:"4.625.000đ/tháng",cue:"tới tháng thứ mười ba"},
      {label:"Cuối tháng 60 · cùng mô hình lãi",value:"279.758.571đ",tone:"total",cue:"thì cuối năm năm"},
      {label:"Thời điểm thay đổi làm khác kết quả",tone:"note",cue:"Cùng mức cải thiện"},
      {label:"Không hứa tăng lương/làm thêm chắc có",tone:"note",cue:"Vậy đừng ghi tiền thưởng"},
    ]}],
    9:[{type:"rules",title:"BA NGĂN TIỀN · KHÔNG CẦN MỞ 3 TÀI KHOẢN",cue:"Bác gợi ý Bảo thử ba ngăn",until:"Ngày lương về",items:[
      {text:"Sinh hoạt tháng",cue:"Một ngăn trả sinh hoạt tháng"},
      {text:"Chờ chi trong năm",cue:"một ngăn chờ khoản chi"},
      {text:"Tích lũy: mục tiêu và khẩn cấp",cue:"một ngăn tích lũy"},
    ]},{type:"rules",title:"ĐỐI CHIẾU NGÀY TIỀN VÀO/RA",cue:"Ngày lương về",items:[
      {text:"Thực nhận so với bảng lương",cue:"đối chiếu tiền thực nhận"},
      {text:"Giữ tiền cho hóa đơn tới trước",cue:"Để riêng các hóa đơn"},
      {text:"Quỹ chưa dùng không tự thành tiền thưởng",cue:"Khoản y tế chưa dùng"},
      {text:"Sửa ngân sách theo bằng chứng",cue:"Ngân sách là tờ giấy"},
      {text:"300 triệu danh nghĩa · không hứa sức mua",cue:"Ba trăm triệu cuối năm năm"},
    ]}],
    10:[{type:"rules",title:"3 ĐIỀU NHỚ",cue:"Bác nhắc ba điều",until:"Bà con có thể sửa",items:[
      {text:"Chia từ tiền thực nhận",cue:"Thứ nhất"},
      {text:"Ngân sách phải đủ 12 tháng",cue:"Thứ hai"},
      {text:"Giải ngược đích từ mức góp làm được",cue:"Thứ ba"},
    ]},{type:"quote",cue:"Bác chốt một câu",text:"Tiền để dành là phần còn lại sau một năm thật,\nkhông phải sau một tháng đẹp trời.",quoteTop:690,quoteFontSize:54,quoteWidth:1760,subscribeCue:"Bác chốt một câu",subscribeTop:570}],
  },
};
