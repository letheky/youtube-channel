"""Kiểm mô hình vốn, dòng tiền và thời gian thu hồi của ví dụ cô Bảy."""
import json
import math
import re
from decimal import Decimal as D
import kich_ban


def model():
    setup = 180_000_000 + 80_000_000 + 40_000_000
    deposit, reserve = 60_000_000, 60_000_000
    initial = setup + deposit + reserve
    revenue = D(30) * 3 * 35_000 * 26
    variable = revenue * D('.30')
    rent, fixed = D(20_000_000), D(26_000_000)
    stable = revenue - variable - rent - fixed
    ramp = revenue / 2 * D('.70') - rent - fixed
    flows = [ramp, ramp] + [stable] * 58
    cumulative = D(0)
    payback = None
    for month, amount in enumerate(flows, 1):
        cumulative += amount
        if cumulative >= setup:
            payback = month
            break
    cf12, cf24 = sum(flows[:12]), sum(flows[:24])
    # Không phân bổ cọc hay khấu hao thành tiền ra vận hành lần hai.
    closed12 = reserve + cf12 + deposit + 80_000_000 - 10_000_000
    expensive = [ramp - 5_000_000] * 2 + [stable - 5_000_000] * 58
    cum_expensive = D(0)
    expensive_payback = None
    for month, amount in enumerate(expensive, 1):
        cum_expensive += amount
        if cum_expensive >= setup:
            expensive_payback = month
            break
    increasing24 = cf12 + 12 * (stable - 1_000_000)
    assert initial == 420_000_000 and setup == 300_000_000
    assert stable == 11_330_000 and ramp == -17_335_000
    assert cf12 == 78_630_000 and cf24 == 214_590_000
    assert payback == 32 and sum(flows[:31]) < setup <= sum(flows[:32])
    assert math.ceil(D(setup) / stable) == 27
    assert reserve + 2 * ramp == 25_330_000
    assert closed12 == 268_630_000 and initial - closed12 == 151_370_000
    assert expensive_payback == 57 and increasing24 == 202_590_000
    assert revenue * 11 == 900_900_000 and revenue * 12 == 982_800_000
    assert revenue * 12 < 1_000_000_000  # duy nhất hộ này, ngưỡng NĐ 141/2026
    return dict(setup=setup, deposit=deposit, reserve=reserve, initial=initial,
                revenue=revenue, annual_first=revenue * 11, annual_stable=revenue * 12,
                variable=variable, stable_cf=stable, ramp_cf=ramp,
                reserve_after_ramp=reserve + 2 * ramp, cf12=cf12, cf24=cf24,
                setup_unrecovered24=D(setup)-cf24, simple_months=27, payback_month=payback,
                rent_share_pct=rent/revenue*100, expensive_cf=stable-5_000_000,
                expensive_payback_month=expensive_payback, increasing24=increasing24,
                closed12=closed12, loss_if_closed12=initial-closed12,
                two_turns_cf=revenue*D(2)/3*D('.70')-rent-fixed)


def main():
    result = model()
    script = kich_ban.load(kich_ban.ROOT / 'kich-ban/05-quan-ca-phe-mat-bang.md')
    chars = sum(len(s.narration) for s in script.scenes)
    assert len(script.scenes) == 10 and 11_000 <= chars <= 13_000, chars
    for scene in script.scenes:
        assert scene.narration and not re.search(r'[0-9%]', scene.narration), scene.slug
    narration = '\n'.join(s.narration for s in script.scenes)
    for phrase in ['bốn trăm hai mươi triệu', 'ba trăm triệu', 'tháng thứ ba mươi hai',
                   'hai mươi bốn tháng', 'hai trăm sáu mươi tám triệu sáu trăm ba chục ngàn']:
        assert phrase in narration, phrase
    assert not re.search(r'\b(?:May Coffee|MOSO|Grab|Highlands|Phúc Long)\b', narration, re.I)
    result.update(scenes=len(script.scenes), narration_chars=chars, status='Đạt')
    print(json.dumps(result, default=str, ensure_ascii=False, indent=2))


if __name__ == '__main__':
    main()
