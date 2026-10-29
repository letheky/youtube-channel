"""Video08: dòng tiền giả định; Decimal, không gọi API hoặc dịch vụ thu giọng."""
from decimal import Decimal as D, getcontext, ROUND_HALF_UP, ROUND_CEILING
import json
getcontext().prec = 45

def calculate():
    gross = D(15000000)
    insurance = gross * D('.105')
    taxable = max(D(0), gross - insurance - D(15500000))
    assert taxable == 0  # Cư trú, chỉ có lương mô hình; không suy ra cho mọi nguồn thu.
    net = gross - insurance
    monthly_items = [3500000, 600000, 2700000, 600000, 150000, 450000, 900000]
    annual_items = [4800000, 4800000, 3600000, 4800000, 3600000, 2400000]
    monthly = sum(map(D, monthly_items))
    annual = sum(map(D, annual_items))
    p = net - monthly - annual / 12
    r = D('.045') / 12
    factor = ((1+r)**60-1)/r
    fv = p * factor
    # Kiểm độc lập bằng cộng dồn cuối tháng.
    balance = D(0)
    delayed = D(0)
    for m in range(1,61):
        balance = balance*(1+r)+p
        delayed = delayed*(1+r)+(p if m<=12 else p+D(2100000))
    assert abs(balance-fv) < D('.00000001')
    required = D(300000000) / factor
    up_to_thousand = (required/D(1000)).to_integral_value(rounding=ROUND_CEILING)*1000
    reserve = monthly*3  # Lựa chọn minh họa của Bảo, không ngưỡng thị trường.
    result = dict(gross=gross, insurance=insurance, tax=taxable, net=net,
                  monthly=monthly, annual=annual, annualMonthly=annual/12,
                  beforeAnnual=net-monthly, monthlySaving=p,
                  noInterestFiveYears=p*60, savingsInterest=fv-p*60,
                  fv=fv, requiredMonthly=required, roundedRequiredMonthly=up_to_thousand,
                  roundedRequiredFv=up_to_thousand*factor,
                  gap=required-p, monthlyLivingCeiling=net-annual/12-required,
                  totalSpendingCeiling=net-required,
                  reserve=reserve, noInterestOtherGoals=p*60-reserve,
                  reserveMonths=(reserve/p).to_integral_value(rounding=ROUND_CEILING),
                  improvedContribution=p+D(1500000)+D(600000),
                  improvedFv=(p+D(2100000))*factor, delayedImprovedFv=delayed,
                  naiveMonthly=D(5000000), naiveFiveYears=D(5000000)*60)
    assert monthly==D(8900000) and annual==D(24000000)
    assert net==D(13425000) and p==D(2525000)
    assert result['noInterestFiveYears']==D(151500000)
    assert result['reserveMonths']==11
    return result

if __name__ == '__main__':
    result=calculate()
    print(json.dumps({k:{'exact':str(v),'roundedDong':str(v.quantize(D(1),rounding=ROUND_HALF_UP))} for k,v in result.items()},ensure_ascii=False,indent=2))
