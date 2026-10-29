"""Tính lại ví dụ anh Tư và kiểm tra lời đọc trước khi thu credit."""
import json
import re
from decimal import Decimal

import kich_ban


def main():
    script = kich_ban.load(kich_ban.ROOT / 'kich-ban/04-tai-xe-cong-nghe.md')
    gross = 22 * 30_000
    actual_share = Decimal(gross) * Decimal('0.62')
    paid = int((actual_share / 10_000).quantize(Decimal('1'))) * 10_000
    withheld = gross - paid
    fuel = 4 * 27_000
    depreciation = Decimal(30_000_000 - 10_000_000) / 36
    vehicle_exact = (Decimal(400_000) + depreciation) / 26
    vehicle = int((vehicle_exact / 1_000).quantize(Decimal('1'))) * 1_000
    net = paid - fuel - vehicle - 30_000
    month = {'khach_tra': gross * 26, 'khau_tru': withheld * 26,
             'tai_xe_nhan': paid * 26, 'xang': fuel * 26,
             'xe': vehicle * 26, 'lat_vat': 30_000 * 26, 'con_lai': net * 26}
    assert (gross, paid, withheld, fuel, vehicle, net) == (660_000, 410_000, 250_000, 108_000, 37_000, 235_000)
    assert month['khach_tra'] - month['khau_tru'] == month['tai_xe_nhan']
    assert month['tai_xe_nhan'] - month['xang'] - month['xe'] - month['lat_vat'] == 6_110_000
    assert round(net / 12 / 100) * 100 == 19_600
    assert 150 * 26 == 3_900
    chars = sum(len(s.narration) for s in script.scenes)
    assert len(script.scenes) == 10 and 11_000 <= chars <= 13_000
    for scene in script.scenes:
        assert not re.search(r'[0-9%]|\b(?:Grab|Be|Green SM|Xanh SM)\b', scene.narration, re.I), scene.slug
        assert 'tám triệu bảy' not in scene.narration
    print(json.dumps({'canh': len(script.scenes), 'ky_tu': chars,
                      'phan_nhan_truoc_lam_tron': str(actual_share),
                      'khau_hao_thang': str(depreciation), 'xe_ngay_truoc_lam_tron': str(vehicle_exact),
                      'thang': month, 'moi_gio': net / 12,
                      'ket_qua': 'Đạt phép tính và kiểm tra định dạng lời đọc'}, ensure_ascii=False, indent=2))


if __name__ == '__main__':
    main()
