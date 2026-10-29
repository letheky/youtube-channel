import type {VideoSpec} from "../video/types";

// Hợp đồng và trục ngày GIẢ ĐỊNH RIÊNG; Decimal kiểm 23/10/2026.
export const theTinDungVideo:VideoSpec={
  sidePanels:true,keywordPosition:"lower",
  outro:{title:"BÁC SÁU SỔ SÁCH",tagline:"“Hạn mức là tiền được mượn, không phải tiền đã kiếm.”"},
  overlays:{
    1:[{type:"headline",cue:"Con Út khoe với Bác",until:"Bữa nay mình không mua xe trả góp",text:"HOÀN 100.000đ",sub:"TRẢ TỐI THIỂU · VẪN CÓ LÃI?"}],
    2:[
      {type:"chips",cue:"Trên sao kê thường có số dư",until:"tháng nào một cục nhỏ",items:[
        {text:"Tối thiểu ≠ trả đủ để miễn lãi",cue:"Nó không hứa rằng"},
        {text:"Không phải lịch trả góp",cue:"Cũng đừng hiểu đó"},
      ]},
      {type:"ledger",title:"KỲ ĐẦU · GIẢ ĐỊNH RIÊNG",cue:"Giả sử Út mua hàng",lines:[
        {label:"Mua hàng · chưa có khoản khác",value:"20 triệu",cue:"hết hai chục triệu"},
        {label:"Tỷ lệ tối thiểu tự đặt",value:"5%",cue:"năm phần trăm"},
        {label:"Tối thiểu kỳ đầu",value:"1 triệu",tone:"total",cue:"vậy kỳ đầu phải trả"},
        {label:"Thẻ thật: đọc đúng công thức sản phẩm",tone:"note",cue:"Thẻ thật có thể cộng"},
        {label:"Trả tối thiểu vẫn có thể mất miễn lãi",tone:"note",cue:"Nếu trả đủ khoản tối thiểu"},
      ]},
    ],
    3:[{type:"ledger",title:"CHIẾC LỊCH · GIẢ ĐỊNH",cue:"Mình dựng một chiếc lịch riêng",until:"Đây là lịch minh họa",lines:[
      {label:"Mua hàng và ghi nhận",value:"ngày 0",cue:"Bác gọi là ngày không"},
      {label:"Chốt sao kê",value:"ngày 30",cue:"Ngày ba mươi"},
      {label:"Hạn trả",value:"ngày 45",cue:"ngày bốn mươi lăm là hạn"},
      {label:"Mua ngày 0 → hạn trả",value:"45 ngày",cue:"Món mua ở ngày không"},
      {label:"Mua ngày 29 → cùng hạn",value:"16 ngày",cue:"chỉ còn mười sáu ngày"},
      {label:"“Tối đa” không dành cho mọi món mua",tone:"note",cue:"Vậy chữ tối đa"},
    ]}],
    4:[{type:"ledger",title:"LÃI THEO NGÀY · GIẢ ĐỊNH",cue:"Giờ mới tới con số chính",lines:[
      {label:"Tự đặt cho phép thử",value:"36%/năm · 365 ngày",cue:"Mình giả định lãi suất"},
      {label:"Ngày 0–45: 20 triệu × 36% × 45/365",value:"887.671đ",cue:"Tiền lãi của đoạn này"},
      {label:"Trả 1 triệu → gốc còn",value:"19 triệu",cue:"Sau khoản trả"},
      {label:"Ngày 45–60: 19 triệu × 36% × 15/365",value:"281.096đ",cue:"Lãi phần mười chín triệu"},
      {label:"TỔNG LÃI · số đầy đủ rồi làm tròn",value:"1.168.767đ",tone:"total",cue:"Cộng hai đoạn"},
      {label:"Ngày trả là ranh giới, không tính hai lần",tone:"note",cue:"Mốc trả là ranh giới"},
    ]}],
    5:[
      {type:"ledger",title:"SAO KÊ SAU · GIẢ ĐỊNH",cue:"Ở sao kê sau",until:"Đừng nhìn một vế",lines:[
        {label:"Gốc còn",value:"19 triệu",cue:"còn mười chín triệu tiền gốc"},
        {label:"Cộng lãi → ĐANG NỢ",value:"≈20,169 triệu",tone:"total",cue:"Thành ra số đang nợ"},
        {label:"ĐÃ TRẢ + CÒN NỢ",value:"≈21,169 triệu",cue:"hai vế cộng lại"},
        {label:"Chưa có phí khác",tone:"note",cue:"chưa có phí khác"},
      ]},
      {type:"ledger",title:"HOÀN TIỀN · GIẢ ĐỊNH RIÊNG",cue:"Bây giờ cho Út được hoàn tiền",until:"Ưu đãi thật còn có trần",lines:[
        {label:"0,5% × 20 triệu · đủ điều kiện",value:"100.000đ",cue:"tức một trăm ngàn"},
        {label:"Lãi 1.168.767 − hoàn 100.000",value:"1.068.767đ",tone:"minus",cue:"Út vẫn tốn ròng"},
        {label:"Chưa có phí khác · không là biểu giá",tone:"note",cue:"Một thông báo được tặng tiền"},
      ]},
    ],
    6:[{type:"ledger",title:"TRẢ THÊM · TÍNH LẠI CẢ CHUỖI",cue:"Út hỏi vậy con trả hai triệu",lines:[
      {label:"Giả định cùng ngày 45, trả 2 triệu",value:"gốc còn 18 triệu",cue:"Đoạn sau mới còn"},
      {label:"Tổng lãi hai đoạn",value:"1.153.973đ",cue:"Lãi cả hai đoạn"},
      {label:"So với trả 1 triệu · lãi giảm",value:"14.795đ",tone:"plus",cue:"tiền lãi giảm chừng"},
      {label:"Trả ĐỦ 20 triệu · đủ điều kiện",value:"0đ lãi mua hàng",tone:"total",cue:"Nếu trả đủ hai chục triệu"},
      {label:"Trả gấp đôi không có nghĩa lãi giảm nửa",tone:"note",cue:"Vì vậy đừng lấy đường thẳng"},
      {label:"Thiếu tiền: hỏi ngân hàng phương án hợp lệ",tone:"note",cue:"Nếu thấy không xoay đủ"},
    ]}],
    7:[
      {type:"ledger",title:"PHÍA CỬA HÀNG · GIẢ ĐỊNH",cue:"Giả sử riêng giao dịch hai chục triệu",until:"không phải biểu phí thị trường",lines:[
        {label:"Khách thanh toán",value:"20 triệu",cue:"Giả sử riêng giao dịch"},
        {label:"Phí tổng tự đặt · 2%",value:"400.000đ",cue:"Khi ấy phí là"},
        {label:"Người bán nhận trước chi phí khác",value:"19,6 triệu",tone:"total",cue:"cửa hàng nhận"},
        {label:"Không phải mức phí chung thị trường",tone:"note",cue:"Hai phần trăm là con số"},
      ]},
      {type:"chips",cue:"Phí cửa hàng thỏa thuận",items:[
        {text:"Merchant discount ≠ interchange",cue:"không đồng nhất với khoản phí trao đổi"},
        {text:"400.000đ không thuộc hết bên phát hành",cue:"Nhưng không được lấy cả"},
        {text:"Doanh thu còn phải trừ nhiều chi phí",cue:"Còn chi phí vốn"},
        {text:"Không có dữ liệu để tính lời một chiếc thẻ",cue:"Bác không có cơ cấu"},
      ]},
    ],
    8:[{type:"ledger",title:"TIỀN MẶT · VÍ DỤ TÁCH RIÊNG",cue:"Bác tách hẳn một ví dụ khác",lines:[
      {label:"Nhận tiền mặt",value:"5 triệu",cue:"Út nhận năm triệu"},
      {label:"Phí tự đặt 4% · nhập nợ ngay",value:"200.000đ",cue:"phí giả định bốn phần trăm"},
      {label:"Giả định lãi 36% × 10/365 trên",value:"5,2 triệu",cue:"cả năm triệu hai trăm ngàn"},
      {label:"Lãi 10 ngày",value:"51.288đ",cue:"tiền lãi khoảng"},
      {label:"Phí + lãi",value:"251.288đ",tone:"minus",cue:"Cộng phí chi phí khoảng"},
      {label:"Số trả hết",value:"5.251.288đ",tone:"total",cue:"số trả hết khoảng"},
      {label:"Không cộng vào ví dụ mua 20 triệu",tone:"note",cue:"Cách đưa phí vào dư nợ"},
    ]}],
    9:[{type:"rules",title:"ĐỐI CHIẾU TRÊN SAO KÊ THẬT",cue:"Út mở ứng dụng",items:[
      {text:"Tài khoản có tiền ≠ đã trả nợ thẻ",cue:"Tiền đang nằm trong tài khoản"},
      {text:"Tự động: đăng ký gì, đủ tiền, đã trích chưa?",cue:"Ngay cả khi đã đăng ký"},
      {text:"Dư nợ · tối thiểu · hạn trả · tiền đã nhận",cue:"Bác bảo Út giữ lại bốn chỗ"},
      {text:"Hỏi số thanh toán hết tới đúng ngày trả",cue:"và muốn thanh toán hết"},
      {text:"Không gửi số thẻ, mã bảo mật, OTP cho lạ",cue:"Đừng gửi số thẻ"},
    ]}],
    10:[
      {type:"rules",title:"3 ĐIỀU TRƯỚC KHI QUẸT THẺ",cue:"Bác nhắc ba điều",until:"Tấm thẻ có thể tiện",items:[
        {text:"Tối thiểu ≠ đủ để miễn lãi",cue:"Thứ nhất"},
        {text:"Đọc ngày tính lãi và loại giao dịch",cue:"Thứ hai"},
        {text:"Phí hệ thống ≠ lãi ròng một ngân hàng",cue:"Thứ ba"},
      ]},
      {type:"quote",cue:"Bác chốt một câu",text:"Hạn mức là tiền được mượn,\nkhông phải tiền đã kiếm.",quoteTop:750,subscribeCue:"bấm đăng ký Bác Sáu",subscribeTop:600},
    ],
  },
};
