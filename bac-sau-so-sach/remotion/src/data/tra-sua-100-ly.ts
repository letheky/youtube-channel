import type { KetSoProps } from "../KetSo";

// Số liệu Cảnh 9 — kich-ban/01-tra-sua-100-ly.md (triệu đồng/tháng)
export const traSua100Ly: KetSoProps = {
  title: "SỔ LÃI LỖ",
  subtitle: "Quán trà sữa 100 ly/ngày · Gò Vấp · 1 tháng",
  unit: "triệu",
  rows: [
    { label: "Doanh thu", value: 105.0, kind: "income" },
    { label: "Nguyên liệu & bao bì", value: 41.0, kind: "expense" },
    { label: "App giao hàng", value: 10.5, kind: "expense" },
    { label: "Mặt bằng", value: 15.0, kind: "expense" },
    { label: "Nhân viên", value: 16.2, kind: "expense" },
    { label: "Điện nước, thuế, linh tinh", value: 11.5, kind: "expense" },
    { label: "Lời trên giấy", value: 10.8, kind: "subtotal" },
    { label: "Khấu hao vốn ban đầu", value: 8.3, kind: "expense" },
  ],
  result: { label: "LỜI THẬT", value: 2.5, prefix: "≈" },
  quote: "Lời trên giấy chưa phải là lời trong túi.",
};
