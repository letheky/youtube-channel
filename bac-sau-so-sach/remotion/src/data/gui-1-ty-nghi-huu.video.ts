import type { VideoSpec } from "../video/types";

// Mô hình giả định, số đã kiểm bằng Decimal ngày 22/10/2026.
export const gui1TyNghiHuuVideo: VideoSpec = {
  sidePanels: true, keywordPosition: "lower",
  outro: {title:"BÁC SÁU SỔ SÁCH",tagline:"“Tiền đủ nghỉ bao lâu, phải tính bằng sức mua.”"},
  overlays: {
    1: [
      {type:"headline",cue:"Giả sử gửi một tỷ",until:"Cùng một tỷ đó",text:"1 TỶ TIỀN GỬI",sub:"NGHỈ LÀM ĐƯỢC CHƯA?"},
      {type:"chips",cue:"Ông Năm trong câu chuyện",items:[
        {text:"Ông Năm · nhân vật giả định",cue:"Ông Năm trong câu chuyện"},
        {text:"Đã có nhà ở · không vay",cue:"Ổng có nhà để ở"},
        {text:"Tạm gác mọi nguồn thu khác",cue:"Bác tạm gác lương hưu"},
        {text:"Dùng số chi thật của nhà mình",cue:"Bà con coi hết rồi thay số"},
      ]},
    ],
    2: [
      {type:"ledger",title:"LÃI NĂM · KIỂM 22/10/2026",cue:"Bác kiểm biểu công khai",until:"Muốn lĩnh lãi định kỳ",lines:[
        {label:"12 tháng VND · biểu tham khảo",value:"5,4%/năm",cue:"năm phẩy bốn phần trăm một năm"},
        {label:"Vốn ví dụ",value:"1 tỷ",cue:"Lấy một tỷ nhân"},
        {label:"Lãi đủ năm quy ước",value:"54 triệu",tone:"total",cue:"được năm mươi bốn triệu"},
        {label:"Bình quân chia 12",value:"4,5 triệu/tháng",cue:"Chia mười hai thì"},
        {label:"Bình quân ≠ được trả lãi mỗi tháng",tone:"note",cue:"Gửi nhận lãi cuối kỳ"},
      ]},
      {type:"rules",title:"ĐỌC ĐÚNG THỎA THUẬN",cue:"Ngân hàng còn tính",items:[
        {text:"Thực tế tính theo số ngày gửi",cue:"Ngân hàng còn tính"},
        {text:"Ví dụ: đủ 365 ngày, nhận cuối kỳ",cue:"Bác lấy một năm đủ"},
        {text:"Cá nhân: lãi tiền gửi TCTD miễn TNCN",cue:"Lãi tiền gửi của cá nhân"},
        {text:"Ngày nhận lãi · rút gốc · tái tục",cue:"Lúc hỏi gửi hỏi luôn"},
      ]},
    ],
    3: [
      {type:"ledger",title:"CHI TIÊU · GIẢ ĐỊNH RIÊNG",cue:"Bác giả định ông Năm",until:"năm đầu vốn đã nhích xuống",lines:[
        {label:"Sinh hoạt · đã có nhà",value:"5 triệu/tháng",cue:"năm triệu một tháng"},
        {label:"Chi năm đầu",value:"60 triệu",cue:"Một năm cần sáu chục triệu"},
        {label:"Lãi năm",value:"54 triệu",cue:"Lãi năm mươi bốn triệu"},
        {label:"PHẦN THIẾU",value:"6 triệu",tone:"minus",cue:"vậy thiếu sáu triệu"},
        {label:"1 tỷ + lãi − chi cuối năm",value:"994 triệu",tone:"total",cue:"còn chín trăm chín mươi bốn triệu"},
        {label:"Chưa có y tế lớn, người phụ thuộc",tone:"note",cue:"Chưa cần đợi"},
      ]},
      {type:"ledger",title:"THỬ RIÊNG · KHÔNG LÀ CHÀO GỬI",cue:"Thử riêng chuyện",lines:[
        {label:"Giả định lãi 4% · vốn 1 tỷ",value:"40 triệu/năm",cue:"Nếu chỉ được bốn phần trăm"},
        {label:"Giả định lãi 6,4% · vốn 1 tỷ",value:"64 triệu/năm",cue:"Nếu được sáu phẩy bốn"},
        {label:"Lãi tái tục có thể thay đổi",tone:"note",cue:"Đáo hạn gửi lại"},
      ]},
    ],
    4: [
      {type:"chips",cue:"Giả sử ông Năm chỉ tiêu",until:"Giỏ chi của từng nhà",items:[
        {text:"Giữ số dư ≠ giữ sức mua",cue:"Giữ nguyên con số thì đúng"},
        {text:"CPI bình quân 9th2026: +4,52% so cùng kỳ",cue:"Cục Thống kê công bố"},
        {text:"CPI 9/2026: +5,08% so 9/2025",cue:"Riêng tháng chín"},
        {text:"Số đã công bố · không là dự báo",cue:"Hai con số đo hai khoảng"},
      ]},
      {type:"ledger",title:"GIÁ TĂNG 4%/NĂM · GIẢ ĐỊNH",cue:"Để thử dài hạn",lines:[
        {label:"Gốc danh nghĩa giữ nguyên",value:"1 tỷ",cue:"Nếu cứ thế mười năm"},
        {label:"Sức mua sau 10 năm",value:"675,56 triệu",cue:"sáu trăm bảy mươi lăm triệu"},
        {label:"Sức mua sau 20 năm",value:"456,39 triệu",cue:"Hai mươi năm còn"},
        {label:"Hai số trên theo giá hôm nay",tone:"note",cue:"đây là sức mua quy đổi"},
        {label:"Giỏ 5 triệu/tháng → sau 10 năm",value:"7,40 triệu",cue:"bảy triệu bốn trăm ngàn"},
        {label:"Cùng giỏ ấy → sau 20 năm",value:"10,96 triệu",cue:"mười triệu chín trăm sáu chục"},
      ]},
    ],
    5: [
      {type:"ledger",title:"BÙ SỨC MUA GỐC · GIẢ ĐỊNH",cue:"Quay lại một năm",until:"Hai cách diễn đạt không dùng lẫn nhau",lines:[
        {label:"Giá tăng 4% → gốc cuối năm",value:"1,04 tỷ",cue:"một tỷ không trăm bốn chục triệu"},
        {label:"Giữ lại bù gốc",value:"40 triệu",cue:"Nghĩa là cần giữ lại"},
        {label:"Lãi 54 − giữ lại 40",value:"14 triệu/năm",tone:"total",cue:"còn mười bốn triệu"},
        {label:"Bình quân · tiền cuối năm",value:"≈1,17 triệu/tháng",cue:"Chia đều thì khoảng"},
        {label:"Chênh lãi − giá: 1,4 điểm %",tone:"note",cue:"Chênh lệch lãi suất"},
        {label:"Lợi suất thực: 1,054/1,04−1 ≈1,35%",tone:"note",cue:"Còn lợi suất thực"},
      ]},
      {type:"ledger",title:"TÍNH NGƯỢC · MÔ HÌNH LÝ TƯỞNG",cue:"Nếu muốn chi sáu chục",lines:[
        {label:"Chi 60 triệu + bù gốc 4%",value:"≈4,29 tỷ",cue:"bốn phẩy hai chín tỷ"},
        {label:"Chỉ giữ số gốc · chưa bù giá",value:"≈1,11 tỷ",cue:"Nếu chỉ giữ nguyên con số"},
        {label:"Không phải ngưỡng nghỉ hưu an toàn",tone:"note",cue:"không phải vé nghỉ hưu an toàn"},
        {label:"Giữ lãi 5,4%, giá 4% chỉ là giả định",tone:"note",cue:"nó còn giả sử"},
      ]},
    ],
    6: [{type:"ledger",title:"RÚT DẦN VỐN · PHÉP THỬ RIÊNG",cue:"Ông Năm nói",lines:[
      {label:"Lãi 5,4%; chi đầu 60 triệu tăng 4%",tone:"note",cue:"Bác thử cho lãi giữ nguyên"},
      {label:"Gom lãi/chi cuối năm, chưa rút tháng",tone:"note",cue:"Để dễ đối chiếu"},
      {label:"Cuối năm 10",value:"784,40 triệu",cue:"cuối năm thứ mười còn"},
      {label:"Cuối năm 19",value:"104,49 triệu",cue:"Cuối năm thứ mười chín"},
      {label:"Năm 20",value:"không đủ chi năm",tone:"minus",cue:"Sang năm thứ hai mươi"},
      {label:"Dừng khi thiếu, không tài khoản âm",tone:"note",cue:"Mô hình dừng ở chỗ thiếu"},
      {label:"Tiền danh nghĩa · không phải dự báo",tone:"note",cue:"Các số còn lại trong đoạn này"},
    ]}],
    7: [
      {type:"ledger",title:"TIỀN CHI TRƯỚC ĐÁO HẠN",cue:"Còn một chuyện",until:"không được trừ quỹ sinh hoạt",lines:[
        {label:"Tổng ban đầu · phương án riêng",value:"1 tỷ",cue:"Từ đúng một tỷ ban đầu"},
        {label:"Quỹ chi 12 tháng · không lãi",value:"60 triệu",cue:"dành sáu chục triệu"},
        {label:"Phần còn gửi lấy lãi",value:"940 triệu",cue:"chín trăm bốn chục triệu mới"},
        {label:"Lãi năm · 5,4%",value:"50,76 triệu",cue:"năm mươi triệu bảy trăm"},
        {label:"Bình quân chia 12",value:"4,23 triệu/tháng",cue:"Bình quân chỉ còn"},
        {label:"CUỐI NĂM · QUỸ CHI ĐÃ HẾT",value:"990,76 triệu",tone:"total",cue:"chín trăm chín mươi triệu"},
      ]},
      {type:"chips",cue:"Sáu chục triệu này chỉ đủ",items:[
        {text:"Quỹ chi năm ≠ quỹ y tế lớn",cue:"chưa phải quỹ chữa bệnh lớn"},
        {text:"Dự phòng nằm trong cùng tổng tiền",cue:"Nếu dành thêm dự phòng"},
        {text:"Không vừa tiêu vừa tính lãi cùng đồng tiền",cue:"một đồng đã để sẵn tiêu"},
      ]},
    ],
    8: [
      {type:"rules",title:"RÚT TRƯỚC HẠN · ĐỌC ĐIỀU KIỆN",cue:"Cần tiền gấp",until:"trước ngày ấy",items:[
        {text:"Phần rút sớm: tối đa lãi KKH thấp nhất tương ứng tại lúc rút",cue:"phần rút sớm chịu mức lãi"},
        {text:"Rút cả khoản: tính lại lãi",cue:"Nếu rút toàn bộ"},
        {text:"Rút một phần theo sản phẩm/thỏa thuận: phần còn giữ mức lãi đang có",cue:"Nếu sản phẩm và thỏa thuận"},
        {text:"Kiểm ngày đáo hạn và cách tái tục",cue:"Mình vẫn cần biết ngày đáo hạn"},
      ]},
      {type:"ledger",title:"BHTG · HIỆU LỰC 13/7/2026",cue:"Về bảo hiểm tiền gửi",lines:[
        {label:"Hạn mức cả gốc + lãi",value:"350 triệu",cue:"ba trăm năm chục triệu"},
        {label:"Một người · một tổ chức tham gia",tone:"note",cue:"cho một người tại một tổ chức"},
        {label:"Khoản đủ điều kiện, khi phát sinh chi trả",tone:"note",cue:"khi phát sinh nghĩa vụ chi trả"},
        {label:"Không tính riêng theo từng sổ",tone:"note",cue:"Không phải mỗi cuốn sổ"},
        {label:"Phần vượt không đồng nghĩa chắc mất",tone:"note",cue:"Cũng không được suy ngược"},
      ]},
    ],
    9: [{type:"rules",title:"LẤY SỐ CỦA NHÀ MÌNH",cue:"Tới đây ông Năm hỏi",items:[
      {text:"Chi thiết yếu, chi muốn có thêm",cue:"Ghi khoản chi thiết yếu riêng"},
      {text:"Nguồn thu chắc chắn và ngày nhận",cue:"Khoản chắc thu được"},
      {text:"Thử lãi thấp, chi tăng, khoản gấp",cue:"Rồi thử ít nhất"},
      {text:"Giữ vốn cho con hay dùng dần tuổi già?",cue:"Cũng nên tách chuyện"},
    ]}],
    10: [
      {type:"rules",title:"3 CÂU HỎI TRƯỚC KHI NGHỈ",cue:"Bà con nhớ ba điều thôi",until:"Những con số bữa nay",items:[
        {text:"Ngày nào thật sự nhận tiền lãi?",cue:"Thứ nhất"},
        {text:"Chi xong, gốc còn sức mua bao nhiêu?",cue:"Thứ hai"},
        {text:"Lúc cần gấp, tiền lấy ở đâu?",cue:"Thứ ba"},
      ]},
      {type:"quote",cue:"Nếu bà con có người nhà",text:"Tiền đủ nghỉ bao lâu,\nphải tính bằng sức mua.",quoteTop:750,subscribeCue:"bấm đăng ký Bác Sáu",subscribeTop:600},
    ],
  },
};
