"""Toàn bộ dòng tiền GIẢ ĐỊNH #11; không xác định nghĩa vụ pháp lý của sản phẩm thật."""
from decimal import Decimal as D, getcontext, ROUND_HALF_UP
from pathlib import Path
import json
getcontext().prec=50
def calculate():
    face=D(5000000);fee=D(1000000);rate=D('.01');days=D(30);year=D(365)
    net=face-fee;interest=face*rate;due=face+interest;cost=due-net
    earlyInterest=interest*D(15)/days;earlyDue=face+earlyInterest;earlyCost=earlyDue-net
    x=dict(face=face,upfrontFee=fee,netReceived=net,days=days,interestOnlyRate=rate,interest=interest,due=due,totalCost=cost,interestShareOfCost=interest/cost,feeShareOfCost=fee/cost,costRate30days=cost/net,simpleAnnualCostRate=cost/net*year/days,wrongFaceDenominator=cost/face,earlyDays=D(15),earlyInterest=earlyInterest,earlyDue=earlyDue,earlyCost=earlyCost,earlyCostRate=earlyCost/net,earlySaving=due-earlyDue,salary=D(8000000),living=D(6000000),salaryArrivalDay=D(40),repaymentDay=D(30))
    x['available']=x['salary']-x['living'];x['budgetShortfall']=due-x['available'];x['dateGap']=x['salaryArrivalDay']-x['repaymentDay'];x['newLoanNet']=net;x['newLoanStillMissing']=due-net;x['newLoanDue']=due
    assert net==4000000 and interest==50000 and due==5050000 and cost==1050000
    assert x['costRate30days']==D('.2625') and x['simpleAnnualCostRate']==D('3.19375')
    assert x['earlyDue']==5025000 and x['earlyCostRate']==D('.25625') and x['earlySaving']==25000
    assert x['budgetShortfall']==3050000 and x['dateGap']==10 and x['newLoanStillMissing']==1050000
    assert cost==fee+interest and net+fee==face and net+cost==due
    return x
def serial(x):return {k:format(v,'f') for k,v in x.items()}
if __name__=='__main__':
    p=Path(__file__).resolve().parent.parent/'kich-ban/11-vay-app-online.calculations.json'
    x={'assumptions':'All contract cash flows fictional; 1% for exactly 30 days on face; fee deducted once at day0; no other fees/arrears; early branch15days prorated interest and fee nonrefundable by assumption only. Year simple365days, not compounding or statutory APR. Salary/living hypothetical.','rounding':'Decimal50, no intermediate rounding. Display VND nearest dong HALF_UP, simple annual percent319.4; narrative exact period26.25 and early25.625.','results':serial(calculate())}
    p.write_text(json.dumps(x,ensure_ascii=False,indent=2)+'\n',encoding='utf-8');print(json.dumps(x,ensure_ascii=False))
