"""So sánh mua/thuê cùng vốn đầu và cùng ngân sách tháng. Chỉ giả định, không API."""
from decimal import Decimal as D, getcontext, ROUND_HALF_UP
import json
getcontext().prec=50

def calculate():
    price=D(3000000000);down=D(1200000000);closing=D(60000000)
    initial=down+closing;loan=price-down;months=240;principal=loan/months
    budget=D(25000000);rent0=D(9000000);maint0=D(1250000)
    growth=D('.03');rate=D('.05')/12;deposit=rent0*2
    buyer=D(0);tenant=initial-deposit;debt=loan;rows=[]
    for m in range(1,months+1):
        year=(m-1)//12;rent=rent0*(1+growth)**year;maint=maint0*(1+growth)**year
        apr=D('.09') if m<=12 else D('.11')
        interest=debt*apr/12;payment=principal+interest
        buy_save=budget-payment-maint;rent_save=budget-rent
        assert min(buy_save,rent_save)>=0
        buyer=buyer*(1+rate)+buy_save;tenant=tenant*(1+rate)+rent_save
        debt-=principal
        rows.append(dict(month=m,debtStart=debt+principal,principal=principal,interest=interest,payment=payment,maintenance=maint,rent=rent,buyerSaving=buy_save,tenantSaving=rent_save,buyerPortfolio=buyer,tenantPortfolio=tenant,debtEnd=debt))
    assert debt==0 and sum(x['principal'] for x in rows)==loan
    # Independent weighted future-value sums, including growth of original tenant balance.
    other_buyer=sum(x['buyerSaving']*(1+rate)**(months-x['month']) for x in rows)
    other_tenant=(initial-deposit)*(1+rate)**months+sum(x['tenantSaving']*(1+rate)**(months-x['month']) for x in rows)
    assert abs(buyer-other_buyer)<D('.00000001') and abs(tenant-other_tenant)<D('.00000001')
    tenant+=deposit  # Refund at end month240, zero deposit interest, no second count.
    sell_rate=D('.03')  # Own all-in disposal provision, not a statutory tax rate.
    house=price*(1+growth)**20;net_house=house*(1-sell_rate)
    total_buyer=buyer+net_house
    equal_house=(tenant-buyer)/(1-sell_rate)
    # Solve annual house appreciation that makes liquidation wealth equal.
    lo=D(0);hi=D('.10')
    for _ in range(180):
        mid=(lo+hi)/2
        if price*(1+mid)**20<equal_house:lo=mid
        else:hi=mid
    break_growth=(lo+hi)/2
    # Cash feasibility stress at month13; not a second 20-year wealth forecast.
    stress_payment=rows[12]['debtStart']*D('.13')/12+principal
    stress_total=stress_payment+rows[12]['maintenance']
    result=dict(initial=initial,down=down,closing=closing,loan=loan,monthlyPrincipal=principal,budget=budget,deposit=deposit,tenantInitialInvestment=initial-deposit,
      month1=rows[0],month12=rows[11],month13=rows[12],month240=rows[-1],
      totalInterest=sum(x['interest'] for x in rows),totalPrincipalAndInterest=sum(x['payment'] for x in rows),
      totalRent=sum(x['rent'] for x in rows),totalMaintenance=sum(x['maintenance'] for x in rows),
      buyerPortfolio=buyer,tenantPortfolioIncludingRefund=tenant,houseGross=house,houseNet=net_house,buyerLiquidationWealth=total_buyer,
      tenantMinusBuyer=tenant-total_buyer,breakEvenHouseGross=equal_house,breakEvenHouseAnnualGrowth=break_growth,
      stressMonth13Payment=stress_payment,stressMonth13Total=stress_total,stressMonth13Shortfall=max(D(0),stress_total-budget),
      buyerWealthHouseGrowth5pct=buyer+price*D('1.05')**20*(1-sell_rate),
      sameNewCashEachSide=initial+budget*months)
    # Cash reconciliation: starting resources + recurring budgets + investment gains
    # equal ending assets + all expenses; principal/down payment are transfers to equity.
    assert sum(x['buyerSaving'] for x in rows)+sum(x['payment']+x['maintenance'] for x in rows)==budget*months
    assert sum(x['tenantSaving'] for x in rows)+sum(x['rent'] for x in rows)==budget*months
    return result

def serial(v,key=''):
    if isinstance(v,D) and key=='breakEvenHouseAnnualGrowth':
        return {'exact':str(v),'percent':str((v*100).quantize(D('.0001'),rounding=ROUND_HALF_UP))}
    if isinstance(v,D):return {'exact':str(v),'roundedDong':str(v.quantize(D(1),rounding=ROUND_HALF_UP))}
    if isinstance(v,dict):return {k:serial(x,k) for k,x in v.items()}
    return v

if __name__=='__main__':print(json.dumps(serial(calculate()),ensure_ascii=False,indent=2))
