"""Video10: hypothetical one-person repair shop; all amounts VND, Decimal50.

No market price survey. Insurance is an explicit illustrative household outlay,
not a statutory mandatory contribution formula. Equipment reserve is retained
cash, not an additional paid bill or a second depreciation expense.
"""
from decimal import Decimal as D, getcontext, ROUND_HALF_UP
import json
from pathlib import Path

getcontext().prec = 50
ROOT = Path(__file__).resolve().parent.parent


def calculate():
    jobs = [
        dict(name='nhanh', count=D(10), price=D(50000), parts=D(20000), minutes=D(12)),
        dict(name='vua', count=D(6), price=D(140000), parts=D(85000), minutes=D(30)),
        dict(name='lau', count=D(2), price=D(320000), parts=D(190000), minutes=D(60)),
    ]
    daily = {k: sum(j['count']*j[f] for j in jobs) for k,f in [('revenue','price'),('parts','parts'),('repairMinutes','minutes')]}
    daily['gross'] = daily['revenue']-daily['parts']
    overhead = dict(rent=D(4500000), utilities=D(700000), consumables=D(450000), warrantyParts=D(350000), cleaningWaste=D(200000))
    insurance = D(1200000)
    equipment = dict(originalCost=D(60000000), months=D(60), assumedResidual=D(0))
    reserve = (equipment['originalCost']-equipment['assumedResidual'])/equipment['months']
    def month(days):
        revenue=daily['revenue']*days;parts=daily['parts']*days
        gross=revenue-parts;shopCash=gross-sum(overhead.values())
        ownerCash=shopCash-insurance;spendable=ownerCash-reserve
        return dict(days=days,tickets=D(18)*days,hours=days*D(10),revenue=revenue,partsConsumed=parts,gross=gross,shopCashBeforeOwnerInsurance=shopCash,ownerCashBeforeEquipmentReserve=ownerCash,equipmentReserve=reserve,ownerSpendableAfterReserve=spendable,hourlyOwnerAfterReserve=spendable/(days*D(10)))
    base=month(D(26));slow=month(D(20))
    annual={k:base[k]*10+slow[k]*2 for k in ['days','tickets','hours','revenue','partsConsumed','gross','ownerCashBeforeEquipmentReserve','equipmentReserve','ownerSpendableAfterReserve']}
    annual['meanMonthlySpendable']=annual['ownerSpendableAfterReserve']/12
    annual['hourlySpendable']=annual['ownerSpendableAfterReserve']/annual['hours']
    office=dict(takeHome=D(15000000),days=D(22),hoursPerDay=D(8))
    office['hours']=office['days']*office['hoursPerDay'];office['hourly']=office['takeHome']/office['hours']
    inventory=dict(opening=D(30000000),closing=D(38000000))
    inventory['increase']=inventory['closing']-inventory['opening'];inventory['purchasesPaid']=base['partsConsumed']+inventory['increase']
    inventory['ownerCashBeforeReserve']=base['ownerCashBeforeEquipmentReserve']-inventory['increase'];inventory['ownerCashAfterReserve']=inventory['ownerCashBeforeReserve']-reserve
    large=dict(price=D(600000),parts=D(480000),minutes=D(180));large['gross']=large['price']-large['parts'];large['hourlyGross']=large['gross']/(large['minutes']/60)
    quick=dict(count=large['minutes']/jobs[0]['minutes']);quick['gross']=quick['count']*(jobs[0]['price']-jobs[0]['parts']);quick['hourlyGross']=quick['gross']/(large['minutes']/60)
    capacity=dict(repairMinutes=daily['repairMinutes'],warrantyMinutes=D(30),adminProcurementMinutes=D(60),waitingMinutes=D(60),restMinutes=D(30))
    capacity['totalMinutes']=sum(capacity.values());capacity['expanded24RepairMinutes']=daily['repairMinutes']*D(24)/18
    capacity['expanded24TotalMinutes']=capacity['expanded24RepairMinutes']+D(180)
    comparisons=dict(monthlyCashMinusOffice=base['ownerCashBeforeEquipmentReserve']-office['takeHome'],monthlyAfterReserveMinusOffice=base['ownerSpendableAfterReserve']-office['takeHome'],extraPresenceHours=base['hours']-office['hours'],hourlyRatio=base['hourlyOwnerAfterReserve']/office['hourly'],lostShopGrossSixClosedDays=base['gross']-slow['gross'],baseAnnualRevenue=base['revenue']*12,annualOfficeTakeHome=office['takeHome']*12)
    assert daily==dict(revenue=D(1980000),parts=D(1090000),repairMinutes=D(420),gross=D(890000))
    assert base['ownerCashBeforeEquipmentReserve']==D(15740000)
    assert base['ownerSpendableAfterReserve']==D(14740000)
    assert capacity['totalMinutes']==600 and capacity['expanded24TotalMinutes']==740
    assert inventory['purchasesPaid']==D(36340000) and inventory['ownerCashBeforeReserve']==D(7740000)
    assert annual['ownerSpendableAfterReserve']==D(166200000) and annual['hours']==3000
    assert comparisons['baseAnnualRevenue']<D(1000000000) and annual['revenue']<D(1000000000)
    # Independent cash reconciliation: receipts - paid purchases - actual costs.
    assert base['revenue']-base['partsConsumed']-sum(overhead.values())-insurance==base['ownerCashBeforeEquipmentReserve']
    assert base['revenue']-inventory['purchasesPaid']-sum(overhead.values())-insurance==inventory['ownerCashBeforeReserve']
    for m in [base,slow]:assert m['ownerSpendableAfterReserve']+reserve+insurance+sum(overhead.values())+m['partsConsumed']==m['revenue']
    return dict(checkedOn='2026-10-26',allCommercialInputsHypothetical=True,rounding='Decimal50; no intermediate rounding; money HALF_UP to VND; spoken amounts use approximately where rounded',jobs=jobs,daily=daily,overheadPaidMonthly=overhead,ownerInsurancePaidMonthly=insurance,insuranceNotStatutoryFormula=True,equipment=equipment,capacity=capacity,baseMonth=base,closedSixDaysMonth=slow,annual10Base2ClosedMonths=annual,officeHypothesis=office,inventoryGrowthMonth=inventory,largeJobHypothesis=large,quickJobsSame180Minutes=quick,comparisons=comparisons,taxScope='VAT/PIT business income only; assumed one registered shop, no other business revenue, both annual scenarios below1bn; no above-threshold tax estimate; no taxes/fees on other activities modeled')


def serialize(o):
    if isinstance(o,D):return str(o)
    raise TypeError(type(o).__name__)


if __name__=='__main__':
    data=calculate()
    p=ROOT/'kich-ban/10-tiem-sua-xe-dau-hem.calculations.json'
    p.write_text(json.dumps(data,ensure_ascii=False,indent=2,default=serialize)+'\n',encoding='utf-8')
    for name in ['daily','baseMonth','closedSixDaysMonth','annual10Base2ClosedMonths','inventoryGrowthMonth','comparisons']:
        print(name,json.dumps(data[name],ensure_ascii=False,default=serialize))
