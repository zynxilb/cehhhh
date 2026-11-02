import { useEffect, useMemo, useRef } from "react";
import { ChevronLeft, ChevronRight, SkipBack, SkipForward, X } from "lucide-react";

export type MoveClassification = "brilliant" | "best" | "blunder" | "good";

export type AnalyzedMove = {
  san: string;
  classification: MoveClassification;
};

export type AnalysisPanelProps = {
  moves: AnalyzedMove[];
  currentMoveIndex: number;
  onSelectMove: (index: number) => void;
  evalScore: number;
  accuracy: { white: number; black: number };
  onClose?: () => void;
};

export const CLASSIFICATION_META: Record<
  MoveClassification,
  { label: string; dot: string }
> = {
  brilliant: { label: "رائعة", dot: "size-1.5 rotate-45 bg-[#2EC4B6]" },
  best: { label: "أفضل نقلة", dot: "size-1.5 rounded-full bg-[#7DCE5A]" },
  good: { label: "جيدة", dot: "size-1.5 rounded-full bg-[#8E8E98]" },
  blunder: { label: "غلطة", dot: "size-1.5 rounded-full bg-[#D84040]" },
};

type MoveRow = {
  number: number;
  white?: { move: AnalyzedMove; index: number };
  black?: { move: AnalyzedMove; index: number };
};

function rowsFromMoves(moves: AnalyzedMove[]): MoveRow[] {
  const rows: MoveRow[] = [];
  for (let index = 0; index < moves.length; index += 2) {
    const black = moves[index + 1];
    rows.push({
      number: index / 2 + 1,
      white: { move: moves[index], index },
      black: black ? { move: black, index: index + 1 } : undefined,
    });
  }
  return rows;
}

export function formatEval(score: number): string {
  if (!Number.isFinite(score)) return "0.00";
  if (score >= 50) return "+M";
  if (score <= -50) return "−M";
  const digits = Math.abs(score).toFixed(2);
  if (score > 0) return `+${digits}`;
  if (score < 0) return `−${digits}`;
  return "0.00";
}

function whiteShare(score: number): number {
  if (score >= 50) return 100;
  if (score <= -50) return 0;
  const capped = Math.max(-10, Math.min(10, score));
  const share = 1 / (1 + Math.exp(-0.5 * capped));
  return Math.round(share * 100);
}

function AccuracyChip({
  tone,
  label,
  value,
}: {
  tone: "white" | "black";
  label: string;
  value: number;
}) {
  return (
    <div className="flex items-center gap-2" dir="rtl">
      <span
        className={
          tone === "white"
            ? "size-7 shrink-0 rounded-full bg-[#EEEEEE] shadow-[inset_0_0_0_1px_rgba(0,0,0,0.28)]"
            : "size-7 shrink-0 rounded-full bg-[#121316] shadow-[inset_0_0_0_1px_#3A3D46]"
        }
        aria-hidden
      />
      <span className="flex items-baseline gap-1 whitespace-nowrap">
        <span className="font-sans text-[13px] text-[#C8C8D0]">{label}</span>
        <span className="font-mono text-[13px] font-semibold tabular-nums text-white">
          {value.toFixed(1)}%
        </span>
      </span>
    </div>
  );
}

function MoveCell({
  move,
  index,
  active,
  onSelectMove,
}: {
  move: AnalyzedMove;
  index: number;
  active: boolean;
  onSelectMove: (index: number) => void;
}) {
  const ref = useRef<HTMLButtonElement>(null);
  const meta = CLASSIFICATION_META[move.classification];

  useEffect(() => {
    if (!active) return;
    ref.current?.scrollIntoView({ block: "nearest", inline: "nearest" });
  }, [active]);

  return (
    <button
      ref={ref}
      type="button"
      aria-current={active ? "true" : undefined}
      aria-label={`${move.san}، ${meta.label}`}
      onClick={() => onSelectMove(index)}
      className={
        "flex h-8 min-w-0 items-center gap-1.5 border-l-2 px-2 text-start font-mono text-sm text-white " +
        "focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-[-2px] focus-visible:outline-[#D84040] " +
        (active
          ? "border-[#D84040] bg-[#1F2229]"
          : "border-transparent hover:bg-[#1A1C22]")
      }
    >
      <span className="truncate">{move.san}</span>
      <span className={`ml-auto shrink-0 ${meta.dot}`} title={meta.label} />
    </button>
  );
}

export function AnalysisPanel({
  moves,
  currentMoveIndex,
  onSelectMove,
  evalScore,
  accuracy,
  onClose,
}: AnalysisPanelProps) {
  const rows = useMemo(() => rowsFromMoves(moves), [moves]);
  const atStart = currentMoveIndex <= -1;
  const atEnd = currentMoveIndex >= moves.length - 1;
  const share = whiteShare(evalScore);
  const scoreLabel = formatEval(evalScore);

  return (
    <aside
      dir="rtl"
      className="flex h-full min-h-0 w-full max-w-[420px] flex-col bg-[#16171B] text-white"
    >
      <header
        dir="ltr"
        className="flex h-14 shrink-0 items-center gap-2 border-b border-[#1F2229] px-3"
      >
        <button
          type="button"
          onClick={onClose}
          aria-label="إغلاق المراجعة"
          className="grid size-11 shrink-0 place-items-center text-[#A7A7B0] hover:bg-[#1F2229] hover:text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-[#D84040]"
        >
          <X className="size-4" strokeWidth={2} />
        </button>
        <div dir="rtl" className="ml-auto flex items-center gap-4">
          <AccuracyChip tone="white" label="أنت" value={accuracy.white} />
          <AccuracyChip tone="black" label="الخصم" value={accuracy.black} />
        </div>
      </header>

      <div
        className="move-scroll min-h-0 flex-1 overflow-y-auto overscroll-contain"
        dir="ltr"
        aria-label="قائمة النقلات"
      >
        {rows.length === 0 ? (
          <p className="px-4 py-8 text-center font-sans text-sm text-[#6D6D75]" dir="rtl">
            لا توجد نقلات
          </p>
        ) : (
          rows.map((row) => (
            <div
              key={row.number}
              className="grid grid-cols-[2.25rem_minmax(0,1fr)_minmax(0,1fr)]"
            >
              <div className="flex h-8 items-center justify-center font-mono text-xs text-[#6D6D75]">
                {row.number}
              </div>
              {row.white ? (
                <MoveCell
                  move={row.white.move}
                  index={row.white.index}
                  active={currentMoveIndex === row.white.index}
                  onSelectMove={onSelectMove}
                />
              ) : (
                <div className="h-8" />
              )}
              {row.black ? (
                <MoveCell
                  move={row.black.move}
                  index={row.black.index}
                  active={currentMoveIndex === row.black.index}
                  onSelectMove={onSelectMove}
                />
              ) : (
                <div className="h-8" />
              )}
            </div>
          ))
        )}
      </div>

      <div
        dir="ltr"
        className="flex shrink-0 items-center gap-3 border-t border-[#1F2229] px-3 py-2.5"
      >
        <div
          className="relative h-3 flex-1 overflow-hidden bg-[#141518]"
          role="meter"
          aria-label="تقييم الموقف"
          aria-valuemin={-10}
          aria-valuemax={10}
          aria-valuenow={Math.max(-10, Math.min(10, evalScore))}
          aria-valuetext={scoreLabel}
        >
          <div className="eval-fill absolute inset-y-0 left-0 bg-[#EEEEEE]" style={{ width: `${share}%` }} />
        </div>
        <span className="w-12 shrink-0 text-end font-mono text-[13px] font-medium tabular-nums text-[#EEEEEE]">
          {scoreLabel}
        </span>
      </div>

      <div dir="ltr" className="flex shrink-0 items-center gap-1.5 border-t border-[#1F2229] p-2.5">
        <button
          type="button"
          aria-label="البداية"
          title="البداية"
          disabled={atStart}
          onClick={() => onSelectMove(-1)}
          className="grid size-11 shrink-0 place-items-center bg-[#1F2229] text-white hover:bg-[#2A2D36] focus-visible:outline focus-visible:outline-2 focus-visible:outline-[#D84040] disabled:opacity-35"
        >
          <SkipBack className="size-4" />
        </button>
        <button
          type="button"
          aria-label="السابق"
          title="السابق"
          disabled={atStart}
          onClick={() => onSelectMove(Math.max(-1, currentMoveIndex - 1))}
          className="grid h-11 min-w-11 flex-1 place-items-center bg-[#1F2229] text-white hover:bg-[#2A2D36] focus-visible:outline focus-visible:outline-2 focus-visible:outline-[#D84040] disabled:opacity-35"
        >
          <ChevronLeft className="size-5" />
        </button>
        <button
          type="button"
          disabled={atEnd}
          onClick={() => onSelectMove(Math.min(moves.length - 1, currentMoveIndex + 1))}
          className="inline-flex h-11 w-1/2 shrink-0 items-center justify-center gap-1.5 bg-[#D84040] font-sans text-base font-semibold text-white hover:bg-[#c43434] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#EEEEEE] active:bg-[#b12e2e] disabled:opacity-35"
        >
          التالي
          <ChevronRight className="size-4" />
        </button>
        <button
          type="button"
          aria-label="النهاية"
          title="النهاية"
          disabled={atEnd || moves.length === 0}
          onClick={() => onSelectMove(moves.length - 1)}
          className="grid size-11 shrink-0 place-items-center bg-[#1F2229] text-white hover:bg-[#2A2D36] focus-visible:outline focus-visible:outline-2 focus-visible:outline-[#D84040] disabled:opacity-35"
        >
          <SkipForward className="size-4" />
        </button>
      </div>
    </aside>
  );
}
