"""Tính bằng Decimal: lãi, sức mua và chuỗi rút vốn của ví dụ ông Năm."""
import json,re
from decimal import Decimal as D
import kich_ban

def model():
    principal=D(1_000_000_000);rate=D('.054');inflation=D('.04');annual=D(60_000_000)
    interest=principal*rate
    balance=principal;expense=annual;rows=[]
    for year in range(1,21):
        available=balance*(1+rate)
        end=available-expense
        rows.append({'year':year,'opening':balance,'interest':balance*rate,'expense':expense,'available':available,'closing':max(D(0),end),'shortfall':max(D(0),-end)})
        if end<0:break
        balance=end;expense*=1+inflation
    keep=principal*inflation;spend=interest-keep
    result={'principal':principal,'rate':rate,'inflationAssumption':inflation,'interest':interest,'monthlyAverage':interest/12,'annualExpense':annual,'firstYearGap':annual-interest,'firstYearClosing':rows[0]['closing'],
        'power10':principal/(1+inflation)**10,'power20':principal/(1+inflation)**20,'monthlyCost10':D(5_000_000)*(1+inflation)**10,'monthlyCost20':D(5_000_000)*(1+inflation)**20,
        'keepPrincipalPurchasingPower':keep,'firstYearSpendable':spend,'monthlySpendableAverage':spend/12,'realReturn':(1+rate)/(1+inflation)-1,
        'nominalOnlyCapital':annual/rate,'purchasingPowerCapital':annual/(rate-inflation),'stressInterest4':principal*D('.04'),'stressInterest64':principal*D('.064'),
        'reserve':D(60_000_000),'depositAfterReserve':D(940_000_000),'reservePathInterest':D(940_000_000)*rate,'reservePathYearEnd':D(940_000_000)*(1+rate),'withdrawalYears':rows}
    assert interest==54_000_000 and result['monthlyAverage']==4_500_000
    assert rows[0]['closing']==994_000_000 and annual-interest==6_000_000
    assert keep==40_000_000 and spend==14_000_000
    assert abs(result['purchasingPowerCapital']*(rate-inflation)-annual)<D('.000001')
    assert abs(result['nominalOnlyCapital']*rate-annual)<D('.000001')
    assert round(result['power10']/1_000_000,2)==D('675.56')
    assert round(result['power20']/1_000_000,2)==D('456.39')
    assert round(result['monthlyCost10']/1_000_000,2)==D('7.40')
    assert round(result['monthlyCost20']/1_000_000,2)==D('10.96')
    assert round(rows[9]['closing']/1_000_000,2)==D('784.40')
    assert round(rows[18]['closing']/1_000_000,2)==D('104.49')
    assert rows[-1]['year']==20 and rows[-1]['closing']==0 and round(rows[-1]['shortfall']/1_000_000,2)==D('16.27')
    assert result['reservePathInterest']==50_760_000 and result['reservePathYearEnd']==990_760_000
    assert result['reserve']+result['depositAfterReserve']==principal
    return result

def main():
    result=model();script=kich_ban.load(kich_ban.ROOT/'kich-ban/06-gui-1-ty-nghi-huu.md')
    chars=sum(len(s.narration) for s in script.scenes)
    assert len(script.scenes)==10 and 11_000<=chars<=13_000,chars
    for scene in script.scenes:assert not re.search(r'[0-9%]',scene.narration),scene.slug
    narration='\n'.join(s.narration for s in script.scenes)
    for phrase in ['năm phẩy bốn phần trăm','năm mươi bốn triệu','mười bốn triệu','bốn phẩy hai chín tỷ','bốn trăm năm mươi sáu triệu ba trăm chín chục ngàn','năm thứ hai mươi','chín trăm chín mươi triệu bảy trăm sáu chục ngàn','ba trăm năm chục triệu']:
        assert phrase in narration,phrase
    assert not re.search(r'\b(?:Vietcombank|BIDV|Agribank|Vietinbank|Techcombank)\b',narration,re.I)
    result.update(scenes=len(script.scenes),narration_chars=chars,status='Đạt')
    print(json.dumps(result,default=str,ensure_ascii=False,indent=2))

if __name__=='__main__':main()
