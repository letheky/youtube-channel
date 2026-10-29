"""Dòng tiền GIẢ ĐỊNH #14 (xe bánh mì chị Tám, 200 ổ/sáng, 15.000đ/ổ). Một người, không vay, không giọng phụ."""
from decimal import Decimal as D, getcontext
from pathlib import Path
import json
getcontext().prec=50
def calculate():
    price=D(15000);sold=D(200);days=D(26);hoursDay=D(10)
    # giá vốn một ổ (giả định; chả lụa 20g theo mốc 150.000đ/kg)
    parts=dict(phoi=D(3000),pate=D(1200),chaLua=D(20)*D(150000)/D(1000),thit=D(2000),doChua=D(700),sot=D(600),bao=D(300))
    cogs=sum(parts.values());margin=price-cogs
    waste=D(10)*parts['phoi']+D(20000)               # 10 phôi dư + 20.000 nhân bỏ mỗi ngày thường
    revDay=price*sold;cogsDay=cogs*sold;netDay=revDay-cogsDay-waste
    revMonth=revDay*days;netMonth=netDay*days
    gas=D(4)*D(560000);spot=D(1500000);power=D(400000);trash=D(100000);fixed=gas+spot+power+trash
    afterFixed=netMonth-fixed;cartReserve=D(18000000)/D(36);owner=afterFixed-cartReserve
    hours=hoursDay*days;perHour=owner/hours;minWage=D(25500)
    perLoaf=owner/(sold*days);ownerShare=owner/revMonth
    # tháng có 8 ngày mưa: vẫn đặt 210 phôi, bán 120
    rainSold=D(120);rainWasteFull=(D(210)-rainSold)*parts['phoi']+D(50000)
    rainDay=rainSold*margin-rainWasteFull;normalDays=days-8
    rainMonthNet=normalDays*netDay+D(8)*rainDay;rainOwner=rainMonthNet-fixed-cartReserve;rainLoss=owner-rainOwner
    # ngày mưa đặt 140 phôi: dư 20 phôi + 20.000 nhân
    rainWasteSmart=(D(140)-rainSold)*parts['phoi']+D(20000);rainDaySmart=rainSold*margin-rainWasteSmart
    smartGain=D(8)*(rainDaySmart-rainDay)
    # giò lụa tăng 10.000đ/kg → +200đ/ổ
    chaUp=D(20)*D(10000)/D(1000);chaUpMonth=chaUp*sold*days
    revYear=revMonth*12;threshold=D(1000000000)
    revYear17=D(17000)*sold*days*12
    x=dict(price=price,sold=sold,cogsPerLoaf=cogs,marginPerLoaf=margin,chaLuaPerLoaf=parts['chaLua'],wasteDay=waste,
      revenueDay=revDay,cogsDay=cogsDay,netDay=netDay,revenueMonth=revMonth,netMonth=netMonth,gas=gas,fixed=fixed,
      afterFixed=afterFixed,cartReserve=cartReserve,owner=owner,hours=hours,perHour=perHour,perHourOverMin=perHour/minWage,
      keptPerLoaf=perLoaf,ownerShare=ownerShare,rainDay=rainDay,rainOwner=rainOwner,rainLoss=rainLoss,
      rainDaySmart=rainDaySmart,smartGain=smartGain,rainOwnerSmart=rainOwner+smartGain,
      chaUpPerLoaf=chaUp,chaUpMonth=chaUpMonth,revenueYear=revYear,revenueYear17=revYear17)
    assert cogs==10800 and margin==4200 and parts['chaLua']==3000 and waste==50000
    assert revDay==3000000 and cogsDay==2160000 and netDay==790000
    assert revMonth==78000000 and netMonth==20540000 and fixed==4240000 and afterFixed==16300000
    assert cartReserve==500000 and owner==15800000 and hours==260
    assert rainDay==184000 and rainOwner==10952000 and rainLoss==4848000
    assert rainDaySmart==424000 and smartGain==1920000
    assert chaUp==200 and chaUpMonth==1040000
    # soát làm tròn theo góp ý Codex 28/10: 'khoảng một phần năm, nhỉnh hơn'; 'ba ngàn lẻ chút đỉnh'; 'khoảng một ngàn hai'
    assert ownerShare>D(1)/D(5) and D(3000)*sold*days==15600000 and D(3000)<perLoaf<D(3100)
    assert D(1100)<margin-perLoaf<D(1200)
    # ngày mưa đặt 140 phôi: lời đọc nói rõ làm nhân ít lại (nhân bỏ 20.000); nhánh chỉ giảm phôi chỉ để đối chiếu
    altDay=rainSold*margin-((D(140)-rainSold)*parts['phoi']+D(50000))
    assert altDay==394000 and D(8)*(altDay-rainDay)==1680000
    assert revYear==936000000 and revYear<=threshold and revYear17==1060800000 and revYear17>threshold
    return x
def serial(x):return {k:format(v,'f') for k,v in x.items()}
if __name__=='__main__':
    x=calculate()
    for k in ('perHour','perHourOverMin','keptPerLoaf','ownerShare'):print(k,round(x[k],4))
    p=Path(__file__).resolve().parent.parent/'kich-ban/14-xe-banh-mi.calculations.json'
    out={'assumptions':'Chị Tám tự làm một mình, xe bánh mì cố định một chỗ, 200 ổ/sáng × 15.000đ, 26 ngày/tháng, 10 giờ hiện diện/ngày (3 giờ chuẩn bị chiều hôm trước + 1,5 giờ sáng sớm + 5 giờ bán + 0,5 giờ dọn). Giá vốn từng ổ, hao hụt, gas 4 bình × 560.000, chỗ đặt xe, điện nước đá, rác, xe 18 triệu/36 tháng đều là giả định. Không vay, không thuê người, không tính bảo hiểm của chủ.','rounding':'Decimal50, không làm tròn giữa chuỗi.','results':serial(x)}
    p.write_text(json.dumps(out,ensure_ascii=False,indent=2)+'\n',encoding='utf-8');print(json.dumps(out['results'],ensure_ascii=False))
