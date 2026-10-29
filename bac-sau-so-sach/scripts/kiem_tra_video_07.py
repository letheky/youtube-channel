"""Phép thử riêng video07; không mô phỏng sao kê của ngân hàng cụ thể."""
from decimal import Decimal as D, ROUND_HALF_UP
import json

def calculate():
    principal=D('20000000');rate=D('0.36');payment=D('1000000')
    first=principal*rate*45/365
    after=(principal-payment)*rate*15/365
    interest=first+after
    extra_after=(principal-D('2000000'))*rate*15/365
    cash=D('5000000');cash_fee=cash*D('.04')
    cash_interest=(cash+cash_fee)*rate*10/365
    money=lambda x:str(x.quantize(D('1'),rounding=ROUND_HALF_UP))
    result={
      'principal':money(principal),'annualAssumedRate':'36%',
      'minimumAssumedRate':'5%','minimumDay45':money(principal*D('.05')),
      'day0to45Interest':money(first),'day45to60Interest':money(after),
      'totalInterestAt60':money(interest),'principalAfterPayment':money(principal-payment),
      'billDay60':money(principal-payment+interest),
      'paidPlusStillOwed':money(payment+principal-payment+interest),
      'cashbackAssumed':money(principal*D('.005')),
      'interestLessCashback':money(interest-principal*D('.005')),
      'interestIfPay2mAt45':money(first+extra_after),
      'interestSavedByExtra1mAt45':money(after-extra_after),
      'merchantDiscountAssumedRate':'2%','merchantFee':money(principal*D('.02')),
      'merchantNet':money(principal*(1-D('.02'))),
      'cashAdvancePrincipal':money(cash),'cashAdvanceFee':money(cash_fee),
      'cashAdvanceInterest10days':money(cash_interest),
      'cashAdvanceTotalCost':money(cash_fee+cash_interest),
      'cashAdvanceRepayment':money(cash+cash_fee+cash_interest),
      'earlyCycleDays':45,'lateCycleDays':45-29,
    }
    assert first+after==interest
    assert principal-payment+interest+payment==principal+interest
    assert result['totalInterestAt60']=='1168767'
    assert result['billDay60']=='20168767'
    assert result['interestSavedByExtra1mAt45']=='14795'
    assert result['cashAdvanceRepayment']=='5251288'
    return result

if __name__=='__main__':
    print(json.dumps(calculate(),ensure_ascii=False,indent=2))
