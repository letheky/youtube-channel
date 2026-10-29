import type { KetSoProps } from "../KetSo";

export type Word = { word: string; start: number; end: number };
export type Phrase = { start: number; end: number; from: number; to: number };
export type TimelineShot = { id: string; start: number; end: number; image: string | null; keyword: string };

export type TimelineScene = {
  n: number;
  slug: string;
  title: string;
  start: number;
  duration: number;
  audio: string;
  image: string | null;
  words: Word[];
  phrases: Phrase[];
  shots?: TimelineShot[];
};

export type Timeline = {
  slug: string;
  gap: number;
  thumbnail: string | null;
  duration: number;
  scenes: TimelineScene[];
};

/**
 * Mốc theo lời đọc: cụm chữ Bác Sáu nói (không phân biệt hoa thường, bỏ dấu câu).
 * Tìm lần xuất hiện kế tiếp sau mốc trước đó trong cùng cảnh; `nth` để bỏ qua vài lần.
 */
export type Cue = string | { text: string; nth?: number };

type Base = { cue: Cue; until?: Cue };

export type LedgerLine = { label: string; value?: string; tone?: "plus" | "minus" | "total" | "note"; cue: Cue };

export type Overlay =
  | (Base & { type: "headline"; text: string; sub?: string })
  | (Base & { type: "chips"; items: { text: string; cue: Cue }[] })
  | (Base & { type: "ledger"; title: string; lines: LedgerLine[] })
  | (Base & { type: "salary"; title: string; salary: number; payments: { label: string; amount: number; cue: Cue }[] })
  | (Base & { type: "comparison"; title: string; subtitle?: string; columns?: [string, string, string]; rows: { label: string; total: number; extra: number; totalText?: string; extraText?: string; cue: Cue }[]; stamp: string; stampCue: Cue; notes: string[] })
  | (Base & { type: "ketso"; props: Omit<KetSoProps, "timing">; rowCues: Cue[]; resultCue: Cue })
  | (Base & {
      type: "chart";
      title: string;
      marginPerCup: number; // nghìn đồng / ly, trước thuế
      price: number; // nghìn đồng / ly
      taxFreeRevenue: number; // triệu / năm (ngưỡng miễn thuế)
      vatRate: number; // trên toàn bộ doanh thu khi vượt ngưỡng
      pitRate: number; // trên phần doanh thu vượt ngưỡng
      fixedCost: number; // triệu
      ownerWage: number; // triệu
      days: number;
      markers: { cups: number; cue: Cue }[];
    })
  | (Base & { type: "rules"; title: string; items: { text: string; cue: Cue }[] })
  | (Base & { type: "quote"; text: string; quoteTop?: number; quoteFontSize?: number; quoteWidth?: number; subscribeCue?: Cue; subscribeTop?: number });

export type VideoSpec = {
  sidePanels?: boolean; // chừa cột riêng cho bảng để không che nhân vật
  keywordPosition?: "lower"; // dải dưới ảnh, chừa vùng mặt và phụ đề
  overlays: Record<number, Overlay[]>; // theo số cảnh
  outro: { title: string; tagline: string };
};
