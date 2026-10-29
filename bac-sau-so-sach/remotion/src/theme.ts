import { loadFont as loadBeVietnam } from "@remotion/google-fonts/BeVietnamPro";
import { loadFont as loadPatrickHand } from "@remotion/google-fonts/PatrickHand";

export const { fontFamily: sans } = loadBeVietnam("normal", {
  weights: ["500", "700", "800"],
  subsets: ["vietnamese", "latin"],
});
export const { fontFamily: hand } = loadPatrickHand("normal", {
  weights: ["400"],
  subsets: ["vietnamese", "latin"],
});

// Bảng màu "sổ sách" — dùng chung cho mọi cảnh
export const C = {
  paper: "#F4EBD9",
  rule: "#DCCBAA",
  margin: "#C4473A",
  ink: "#2B2622",
  inkSoft: "#6E6257",
  red: "#B83A2E",
  green: "#2F7A4B",
  gold: "#E3A833",
  skin: "#E9B383",
  hair: "#302721",
};

export const paperBackground = {
  backgroundColor: C.paper,
  backgroundImage: `repeating-linear-gradient(to bottom, transparent 0, transparent 73px, ${C.rule} 73px, ${C.rule} 74px)`,
} as const;

/** 105 -> "105,0" ; 19800 với digits=0 -> "19.800" */
export const fmt = (v: number, digits = 1) =>
  v.toLocaleString("vi-VN", { minimumFractionDigits: digits, maximumFractionDigits: digits });
