"""Dòng tiền GIẢ ĐỊNH #13 (anh Tư, rút BHXH một lần hay giữ chờ lương hưu); tỷ lệ theo Luật BHXH 41/2024/QH15."""
from decimal import Decimal as D, getcontext
from pathlib import Path
import json
getcontext().prec=50
def calculate():
    avg=D(7000000);years=D(10);months=years*12  # bình quân lương đóng, đã quy về sức mua hôm nay
    lump=D(2)*years*avg                          # Điều70 k3 điểm b: 2 tháng/năm đóng từ 2014
    own=D('.08')*avg*months;employer=D('.14')*avg*months;fund=own+employer  # Điều33/34: 8% + 14% quỹ hưu trí tử tuất
    p15m=D('.40')*avg;p20m=D('.45')*avg;p20f=D('.55')*avg;p15f=D('.45')*avg  # Điều66 k1
    vol=D('.22')*avg                              # tự nguyện 22%/tháng, chưa trừ Nhà nước hỗ trợ
    vol5=vol*60;vol10=vol*120;comp5=D('.08')*avg*60
    cost15=lump+vol5;cost20=lump+vol10;cost15comp=lump+comp5
    x=dict(avgWage=avg,years=years,lump=lump,ownShare=own,employerShare=employer,fundTotal=fund,
      lumpOverOwn=lump/own,lumpOverFund=lump/fund,pension15male=p15m,pension20male=p20m,pension15female=p15f,pension20female=p20f,
      lumpInMonthsOf15=lump/p15m,volMonthly=vol,vol5years=vol5,vol10years=vol10,compulsory5yearsOwn=comp5,
      cost15=cost15,breakEven15months=cost15/p15m,cost20=cost20,breakEven20months=cost20/p20m,
      cost15compulsory=cost15comp,breakEven15compMonths=cost15comp/p15m,
      receive15to80=p15m*216,receive20to80=p20m*216,net15to80=p15m*216-cost15,net20to80=p20m*216-cost20)
    assert lump==140000000 and own==67200000 and employer==117600000 and fund==184800000
    assert p15m==2800000 and p20m==3150000 and p20f==3850000 and lump/p15m==50
    assert vol5==92400000 and cost15==232400000 and cost15/p15m==83
    assert vol10==184800000 and cost20==324800000 and comp5==33600000 and cost15comp/p15m==62
    assert x['receive15to80']==604800000 and x['net15to80']==372400000
    assert x['receive20to80']==680400000 and x['net20to80']==355600000
    return x
def serial(x):return {k:format(v,'f') for k,v in x.items()}
if __name__=='__main__':
    x=calculate()
    for k in ('lumpOverOwn','lumpOverFund','breakEven20months'):print(k,round(x[k],4))
    print('83 tháng =',divmod(83,12),'| 103,1 tháng =',divmod(float(x['breakEven20months']),12),'| 62 tháng =',divmod(62,12))
    p=Path(__file__).resolve().parent.parent/'kich-ban/13-luong-huu-bhxh.calculations.json'
    out={'assumptions':'Anh Tư nam, đóng bắt buộc 10 năm 2015–2024, bình quân lương đóng 7.000.000/tháng đã quy về sức mua hôm nay (Điều73 điều chỉnh CPI). Tuổi hưởng 62. Đóng thêm tự nguyện 22% cùng mức 7 triệu, chưa trừ Nhà nước hỗ trợ; nhánh đi làm lại chỉ tính phần 8% người lao động. Nhận tới 80 tuổi = 216 tháng là giả định minh họa. Không tính lãi tiền gửi, không chiết khấu.','rounding':'Decimal50, không làm tròn giữa chuỗi.','results':serial(x)}
    p.write_text(json.dumps(out,ensure_ascii=False,indent=2)+'\n',encoding='utf-8');print(json.dumps(out['results'],ensure_ascii=False))
