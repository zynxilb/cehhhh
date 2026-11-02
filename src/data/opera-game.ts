import { Chess, type Square } from "chess.js";
import type { MoveClassification } from "@/components/AnalysisPanel";

const PGN = `[Event "Opera Game"]
[Site "Paris"]
[Date "1858.??.??"]
[White "Paul Morphy"]
[Black "Duke of Brunswick and Count Isouard"]
[Result "1-0"]

1. e4 e5 2. Nf3 d6 3. d4 Bg4 4. dxe5 Bxf3 5. Qxf3 dxe5 6. Bc4 Nf6 7. Qb3 Qe7 8. Nc3 c6 9. Bg5 b5 10. Nxb5 cxb5 11. Bxb5+ Nbd7 12. O-O-O Rd8 13. Rxd7 Rxd7 14. Rd1 Qe6 15. Bxd7+ Nxd7 16. Qb8+ Nxb8 17. Rd8# 1-0`;

const ANNOTATIONS: { classification: MoveClassification; eval: number; note: string }[] = [
  { classification: "best", eval: 0.3, note: "سيطرة على المركز. البداية الأقوى في هذا الوضع." },
  { classification: "best", eval: 0.22, note: "رد متماثل يفتح طريق الفيل والوزير." },
  { classification: "best", eval: 0.34, note: "تطوير مع ضغط مباشر على e5." },
  { classification: "good", eval: 0.51, note: "دفاع فيليدور. صلب، لكنه يُبطئ القطع." },
  { classification: "best", eval: 0.64, note: "كسر المركز قبل أن يكتمل تطوير الأسود." },
  { classification: "good", eval: 0.4, note: "تثبيت الحصان. الفيل سيُستبدل بعد خطوات." },
  { classification: "best", eval: 0.82, note: "فتح اللعب والأبيض ما زال أسرع تطويرًا." },
  { classification: "good", eval: 0.38, note: "التبادل يمنح الأبيض زوج الفيل." },
  { classification: "best", eval: 0.96, note: "الوزير يدخل إلى اللعب مع ربح الزمن." },
  { classification: "good", eval: 0.68, note: "استعادة البيدق، والعمود d صار مفتوحًا." },
  { classification: "best", eval: 1.18, note: "التهديف نحو f7 من أول مربع نشط." },
  { classification: "good", eval: 0.9, note: "تطوير طبيعي، لكن b7 يظل مكشوفًا." },
  { classification: "brilliant", eval: 1.86, note: "الوزير يضرب b7 وf7 في الوقت نفسه." },
  { classification: "good", eval: 1.4, note: "دفاع اضطراري عن البيدق والملك." },
  { classification: "best", eval: 1.74, note: "الحصان يدخل قبل التبييت على الجانب الملكي." },
  { classification: "good", eval: 1.18, note: "محاولة سد قطر الفيل. الثمن يظهر فورًا." },
  { classification: "best", eval: 2.2, note: "تثبيت جديد على f6 يربط الدفاع كله." },
  { classification: "blunder", eval: 4.9, note: "البيدق يُقدَّم، والقلعة حول الملك تنفتح." },
  { classification: "brilliant", eval: 6.5, note: "تضحية محسوبة. الملك الأسود عالق في الوسط." },
  { classification: "blunder", eval: 8.2, note: "أخذ الحصان يفتح عمود b للفيل مع كش." },
  { classification: "best", eval: 8.8, note: "كش. الحصان على d7 صار مثبتًا." },
  { classification: "good", eval: 7.95, note: "الرد الوحيد تقريبًا، والتثبيت ما زال قائمًا." },
  { classification: "best", eval: 8.6, note: "الرخ يدخل العمود المفتوح والملك يبتعد." },
  { classification: "good", eval: 7.7, note: "حماية d7. الضغط يتضاعف ولا ينكسر." },
  { classification: "brilliant", eval: 11.4, note: "التضحية بالرخ تُبقي المبادرة كاملة." },
  { classification: "good", eval: 9.9, note: "الاستعادة لا تُخرج الملك من الشبكة." },
  { classification: "best", eval: 12.5, note: "الرخ الثاني يحل محل الأول على العمود نفسه." },
  { classification: "good", eval: 10.3, note: "فك التثبيت جاء متأخرًا. الشبكة اكتملت." },
  { classification: "best", eval: 14.8, note: "كش يجبر الحصان على أخذ الفيل." },
  { classification: "good", eval: 12.2, note: "الحصان يغادر f6 ويغطي d8 لخطوة واحدة." },
  { classification: "brilliant", eval: 99, note: "التضحية بالوزير تُخلي مربع d8." },
  { classification: "good", eval: 99, note: "أخذ الوزير إجباري، ويفرغ آخر دفاع عن d8." },
  { classification: "brilliant", eval: 100, note: "الفيل على g5 يحمي الرخ، ومربعات الملك مغلقة." },
];

export type ReviewPly = {
  san: string;
  classification: MoveClassification;
  eval: number;
  note: string;
  fen: string;
  from: Square;
  to: Square;
  checkSquare: Square | null;
  mate: boolean;
};

function kingSquare(chess: Chess, color: "w" | "b"): Square | null {
  for (const row of chess.board()) {
    for (const piece of row) {
      if (piece && piece.type === "k" && piece.color === color) return piece.square;
    }
  }
  return null;
}

function buildReview() {
  const chess = new Chess();
  chess.loadPgn(PGN);
  const history = chess.history({ verbose: true });
  if (history.length !== ANNOTATIONS.length) {
    throw new Error(`Opera game: expected ${ANNOTATIONS.length} plies, received ${history.length}`);
  }

  const plies: ReviewPly[] = history.map((move, index) => {
    const note = ANNOTATIONS[index];
    const probe = new Chess(move.after);
    const checked = probe.inCheck();
    return {
      san: move.san,
      classification: note.classification,
      eval: note.eval,
      note: note.note,
      fen: move.after,
      from: move.from,
      to: move.to,
      checkSquare: checked ? kingSquare(probe, probe.turn()) : null,
      mate: probe.isCheckmate(),
    };
  });

  if (!plies[plies.length - 1]?.mate) {
    throw new Error("Opera game did not end in checkmate");
  }

  return {
    startFen: history[0]?.before ?? new Chess().fen(),
    startEval: 0.2,
    startNote: "وضع البداية. الأبيض يفتتح، والأسود على دفاع فيليدور.",
    whiteAccuracy: 96.8,
    blackAccuracy: 61.2,
    plies,
  };
}

export const operaReview = buildReview();

export const REVIEW_START_INDEX = 17;

export function plyNotation(index: number, san: string): string {
  const moveNumber = Math.floor(index / 2) + 1;
  return index % 2 === 0 ? `${moveNumber}. ${san}` : `${moveNumber}...${san}`;
}
