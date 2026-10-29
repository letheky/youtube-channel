import type {VideoSpec} from "../video/types";

// Giá, ngân sách, lãi, tăng giá và chi phí là giả định riêng; nguồn cơ chế kiểm 25/10/2026.
export const muaNhaHayThueVideo:VideoSpec={
 sidePanels:true,keywordPosition:"lower",
 outro:{title:"BÁC SÁU SỔ SÁCH",tagline:"“Mua hay thuê, đừng so mỗi tiền nhà; hãy so cả đường đi của tiền.”"},
 overlays:{
  1:[{type:"headline",cue:"Hiếu nói",until:"Thảo kéo ghế",text:"THUÊ LÀ MẤT TRẮNG?",sub:"VỐN BAN ĐẦU ĐANG LÀM GÌ?"},
   {type:"chips",cue:"Cùng tiền ban đầu",items:[
    {text:"Cùng vốn đầu · cùng ngân sách tháng",cue:"Cùng tiền ban đầu"},
    {text:"So tài sản, nợ và tiền tích lũy",cue:"Bác tính tới cuối"},
    {text:"Hiếu–Thảo và toàn bộ bộ số: giả định",cue:"Đây là chuyện giả định"},
    {text:"Đổi giả định thì kết luận có thể đổi",cue:"Câu trả lời còn đổi"},
   ]}],
  2:[{type:"ledger",title:"BÊN MUA · VỐN ĐẦU 1,26 TỶ · GIẢ ĐỊNH",cue:"Bên mua trả trước một tỷ hai",until:"Bên thuê vẫn phải",lines:[
    {label:"Trả trước · chuyển thành vốn trong nhà",value:"1.200.000.000đ",cue:"Bên mua trả trước"},
    {label:"Hoàn tất và chuẩn bị · đã chi hết",value:"60.000.000đ",cue:"Sáu chục triệu còn lại"},
    {label:"Phần vay · gốc đều 240 tháng",value:"1.800.000.000đ",tone:"total",cue:"Phần thiếu một tỷ tám"},
   ]},{type:"ledger",title:"BÊN THUÊ · CÙNG VỐN ĐẦU · GIẢ ĐỊNH",cue:"Bên thuê vẫn phải",until:"Mỗi tháng, hai bên",lines:[
    {label:"Vốn ban đầu",value:"1.260.000.000đ",cue:"cùng một tỷ hai trăm"},
    {label:"Cọc tách riêng · không lãi/không tăng",value:"−18.000.000đ",tone:"minus",cue:"Bác tách mười tám triệu"},
    {label:"ĐẦU TƯ NGAY TỪ ĐẦU",value:"1.242.000.000đ",tone:"total",cue:"Phần đem tích lũy"},
    {label:"Cọc hoàn đủ cuối tháng 240 · không đếm hai lần",tone:"note",cue:"Cọc chưa mất"},
   ]},{type:"chips",cue:"Mỗi tháng, hai bên",items:[
    {text:"Cùng 25 triệu/tháng cho nhà ở + tích lũy",cue:"Mỗi tháng, hai bên"},
    {text:"Sinh hoạt/thuế/dự phòng chung đã tách như nhau",cue:"sau khi đã lo sinh hoạt"},
    {text:"Không đồng nghĩa lương 25 triệu đủ mua nhà",cue:"Bác không nói lương"},
   ]}],
  3:[{type:"ledger",title:"VAY 1,8 TỶ · GỐC ĐỀU · GIẢ ĐỊNH",cue:"Khoản vay giả định",until:"Từ tháng đó",lines:[
    {label:"240 tháng · gốc mỗi tháng",value:"7.500.000đ",cue:"mỗi tháng gốc bảy"},
    {label:"APR/12 trên dư nợ đầu tháng",tone:"note",cue:"Lãi tính trên số nợ"},
    {label:"Tháng 1 · lãi 9%/năm",value:"13.500.000đ",cue:"Tháng đầu lãi"},
    {label:"GỐC + LÃI THÁNG 1",value:"21.000.000đ",tone:"total",cue:"cộng gốc thành"},
    {label:"Dư nợ đầu tháng 13",value:"1.710.000.000đ",cue:"còn nợ một tỷ"},
   ]},{type:"ledger",title:"THÁNG 13 · LÃI 11% LÀ GIẢ ĐỊNH RIÊNG",cue:"Từ tháng đó",lines:[
    {label:"11%/năm · giả định tháng 13…240",tone:"note",cue:"Bác giả định lãi lên"},
    {label:"Lãi tháng 13",value:"15.675.000đ",cue:"Lãi tháng thứ mười ba"},
    {label:"GỐC + LÃI THÁNG 13",value:"23.175.000đ",tone:"total",cue:"Cộng gốc, trả"},
    {label:"Nợ giảm · kỳ trả vẫn có thể tăng khi đổi lãi",tone:"note",cue:"Tiền nợ giảm"},
    {label:"Đọc kỳ điều chỉnh và lãi sau ưu đãi",tone:"note",cue:"Khi đi vay thật"},
   ]}],
  4:[{type:"ledger",title:"THÁNG 1 · CÙNG 25 TRIỆU · GIẢ ĐỊNH",cue:"Tháng đầu, bên mua",until:"Tiền tích lũy của cả hai",lines:[
    {label:"Mua: trả nợ / chi chủ nhà thực trả",value:"21 /1,25 triệu",cue:"Tháng đầu, bên mua"},
    {label:"Mua: phần dư góp tài khoản",value:"2.750.000đ",tone:"total",cue:"còn hai triệu bảy"},
    {label:"Thuê: tiền thuê",value:"9.000.000đ",cue:"Bên thuê trả chín"},
    {label:"Thuê: phần dư góp tài khoản",value:"16.000.000đ",tone:"total",cue:"còn mười sáu triệu"},
    {label:"CẢ HAI đều được tích lũy phần dư",tone:"note",cue:"Cả hai đều được để dành"},
   ]},{type:"chips",cue:"Tiền tích lũy của cả hai",until:"Phần góp phải là tiền thật",items:[
    {text:"Cùng lợi suất ròng giả định 5%/năm ÷ 12",cue:"năm phần trăm một năm chia mười hai"},
    {text:"Số đầu tháng hưởng lãi · góp mới CUỐI tháng",cue:"Số có từ đầu tháng"},
    {text:"Không phải sản phẩm/lợi suất được bảo đảm",cue:"Bác giả định đây là mức ròng"},
    {text:"Thuê và chi chủ nhà cùng tăng 3% mỗi năm",cue:"Tiền thuê cũng tăng"},
   ]},{type:"chips",cue:"Phần góp phải là tiền thật",items:[
    {text:"Phần góp phải thực sự đi vào tài khoản",cue:"Phần góp phải là tiền thật"},
    {text:"Tiêu khoản dư → phải tính lại kết quả",cue:"Nếu bên thuê đem khoản dư"},
   ]}],
  5:[{type:"ledger",title:"240 THÁNG · TỔNG CHI CHƯA KẾT LUẬN HƠN KÉM",cue:"Cộng hai trăm bốn chục tháng",until:"Hiếu nghe xong",lines:[
    {label:"Lãi vay",value:"1.953.075.000đ",cue:"tiền lãi vay khoảng"},
    {label:"Gốc + lãi đã trả ngân hàng",value:"3.753.075.000đ",cue:"Cộng cả gốc"},
    {label:"Tiền thuê · tăng 3% mỗi năm",value:"2.902.000.445đ",cue:"Bên thuê trả tổng"},
   ]},{type:"chips",cue:"Hiếu nghe xong",until:"Khoản chủ nhà thực chi",items:[
    {text:"Trong tiền trả ngân hàng có 1,8 tỷ gốc",cue:"Trong tiền trả ngân hàng"},
    {text:"Gốc chuyển thành vốn trong nhà · không mất trắng",cue:"Không thể gọi toàn bộ tiền gốc"},
    {text:"Trả trước không đồng thời nằm trong tài khoản",cue:"Một tỷ hai đã chuyển"},
   ]},{type:"chips",cue:"Khoản chủ nhà thực chi",items:[
    {text:"Chi chủ nhà thực trả cả kỳ: 403.055.617đ",cue:"Khoản chủ nhà thực chi"},
    {text:"Coi tài sản + nợ + tích lũy cuối kỳ",cue:"Phải coi tài sản còn lại"},
   ]}],
  6:[{type:"ledger",title:"BÊN MUA · CUỐI THÁNG 240 · GIẢ ĐỊNH",cue:"Tới cuối tháng",until:"Cộng tài khoản của người mua",lines:[
    {label:"Nợ gốc đã hết",value:"0đ",cue:"khoản vay đã hết gốc"},
    {label:"Tài khoản tích lũy",value:"2.668.492.333đ",cue:"Tài khoản tích lũy bên mua"},
    {label:"Nhà tăng đều 3%/năm · giá trước phí",value:"5.418.333.704đ",cue:"nếu tăng đều ba phần trăm"},
    {label:"Dự trù thanh lý 3% · KHÔNG phải thuế suất",tone:"note",cue:"trừ một gói dự trù"},
    {label:"NHÀ SAU DỰ TRÙ THANH LÝ",value:"5.255.783.693đ",tone:"total",cue:"Giá trị nhà còn"},
   ]},{type:"ledger",title:"CÙNG MỘT TÚI TIỀN · KẾT QUẢ MÔ HÌNH",cue:"Cộng tài khoản của người mua",lines:[
    {label:"Mua · tài khoản + nhà quy về tiền",value:"7.924.276.026đ",cue:"tổng quy về tiền"},
    {label:"Thuê · tài khoản trước hoàn cọc",value:"8.910.949.059đ",cue:"Bên thuê có tài khoản"},
    {label:"Cọc hoàn đủ đúng giả định",value:"+18.000.000đ",tone:"plus",cue:"cộng lại mười tám triệu"},
    {label:"THUÊ · GỒM CỌC HOÀN",value:"8.928.949.059đ",tone:"total",cue:"Tổng khoảng tám tỷ"},
    {label:"Chênh theo bộ số này",value:"1.004.673.033đ",cue:"phía thuê còn hơn"},
    {label:"Không bán: nhà chưa là tiền sẵn · còn nhu cầu ở sau 20 năm",tone:"note",cue:"Người mua không bán nhà"},
   ]}],
  7:[{type:"ledger",title:"CHỈ ĐỔI TĂNG GIÁ NHÀ 3% → 5%/NĂM",cue:"Bác đổi riêng tăng giá nhà",until:"Vậy mới thấy",lines:[
    {label:"Giữ các giả định khác",tone:"note",cue:"giữ nguyên mọi thứ khác"},
    {label:"Vẫn dự trù thanh lý 3%",tone:"note",cue:"Vẫn gói thanh lý"},
    {label:"MUA · QUY VỀ TIỀN",value:"10.389.588.655đ",tone:"total",cue:"Tổng phía mua lúc này"},
    {label:"Thuê không đổi · khoảng 8,929 tỷ",tone:"note",cue:"vượt phía thuê"},
   ]},{type:"ledger",title:"NGANG NHAU · DƯỚI NGUYÊN MÔ HÌNH",cue:"Vậy mới thấy",lines:[
    {label:"Giá nhà trước dự trù thanh lý cần đạt",value:"≈6,454 tỷ",cue:"giá bán trước khoản thanh lý"},
    {label:"Từ 3 tỷ · tăng đều trong 20 năm",value:"≈3,9048%/năm",tone:"total",cue:"tương đương tăng đều"},
    {label:"Không là dự báo hay mức áp mọi khu phố",tone:"note",cue:"Mốc ấy không phải lời dự báo"},
    {label:"Đổi lãi/thuê/vay → mốc cũng đổi",tone:"note",cue:"Nếu tiền tích lũy sinh lời"},
    {label:"Cả giá nhà và lợi suất đều có rủi ro",tone:"note",cue:"Tài khoản đầu tư cũng không"},
   ]}],
  8:[{type:"ledger",title:"STRESS RIÊNG THÁNG 13 · LÃI 13%/NĂM",cue:"Bác còn một phép thử",until:"Số dư tích lũy",lines:[
    {label:"Dư nợ đầu tháng 13 giữ nguyên",value:"1,71 tỷ",cue:"Giữ đúng số nợ"},
    {label:"Gốc + lãi",value:"26.025.000đ",cue:"tiền gốc cộng lãi"},
    {label:"Cộng chi chủ nhà năm thứ hai",value:"1.287.500đ",cue:"Cộng chi chủ nhà"},
    {label:"TỔNG CHI THÁNG NÀY",value:"27.312.500đ",tone:"total",cue:"tổng thành hai mươi bảy"},
    {label:"Vượt ngân sách 25 triệu",value:"2.312.500đ",tone:"minus",cue:"Nó vượt túi hai mươi lăm"},
    {label:"Không ghép vào kết quả 20 năm của nhánh 11%",tone:"note",cue:"Đây mới là thử sức chịu"},
   ]},{type:"chips",cue:"Số dư tích lũy",items:[
    {text:"Rút bù kỳ trả → phải giảm tài khoản",cue:"nhưng lấy nó bù"},
    {text:"Không vừa rút vừa giữ nguyên lãi kép",cue:"Không được vừa rút tiền"},
    {text:"Có tài sản không đồng nghĩa có tiền sẵn",cue:"Có căn nhà giá vài tỷ"},
    {text:"Kiểm lịch tiền thật và phương án hụt thu",cue:"Trước quyết định"},
   ]}],
  9:[{type:"rules",title:"ĐỌC ĐÚNG HỢP ĐỒNG · NGUỒN KIỂM 25/10/2026",cue:"Thuê còn có chuyện hợp đồng",until:"Người mua thì",items:[
    {text:"Thuê tương đương 20 năm/hoàn đủ cọc: giả định",cue:"Trong mô hình"},
    {text:"Thời hạn và giá thuê theo thỏa thuận",cue:"Pháp luật có quy định"},
    {text:"Chấm dứt có điều kiện · không tùy ý lấy lại",cue:"Không phải chủ nhà muốn"},
    {text:"Không tự có quyền gia hạn mãi",cue:"nhưng người thuê cũng không"},
   ]},{type:"rules",title:"SỔ MẪU KHÔNG THAY KIỂM TRA THỰC TẾ",cue:"Người mua thì",items:[
    {text:"Giấy tờ · tình trạng nhà · nghĩa vụ vay",cue:"Người mua thì"},
    {text:"60 triệu/3% chỉ là gói dự trù riêng",cue:"Chi phí hoàn tất"},
    {text:"Không tính trùng khoản đã nằm trong gói",cue:"Không cộng thêm một lượt"},
    {text:"Sửa lớn, chuyển việc, dọn nhà: tính lại",cue:"Mô hình cũng chưa tính"},
    {text:"Tiền bảo dưỡng chưa chi vẫn là tài sản",cue:"Nếu tiền bảo dưỡng chỉ để dành"},
   ]}],
  10:[{type:"rules",title:"BA ĐIỀU TRƯỚC KHI CHỌN",cue:"Bà con nhớ giùm Bác ba chuyện",until:"Mua có cái đáng quý",items:[
    {text:"Cùng vốn đầu/ngân sách · cả tài sản và nợ",cue:"Thứ nhất"},
    {text:"Qua nổi từng kỳ thanh toán",cue:"Thứ hai"},
    {text:"Thử thay lãi, giá thuê, giá nhà, lợi suất",cue:"Thứ ba"},
   ]},{type:"quote",cue:"Bác chốt một câu",text:"Mua hay thuê, đừng so mỗi tiền nhà;\nhãy so cả đường đi của tiền.",quoteTop:710,quoteFontSize:60,quoteWidth:1740,subscribeCue:"Bác chốt một câu",subscribeTop:570}],
 }
};
