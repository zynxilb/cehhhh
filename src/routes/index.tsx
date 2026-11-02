import { useEffect, useState } from "react";
import { createFileRoute } from "@tanstack/react-router";
import { AnalysisPanel, CLASSIFICATION_META } from "@/components/AnalysisPanel";
import { ChessBoard } from "@/components/ChessBoard";
import { REVIEW_START_INDEX, operaReview, plyNotation } from "@/data/opera-game";

export const Route = createFileRoute("/")({ component: Home });

function Home() {
  const [index, setIndex] = useState(REVIEW_START_INDEX);
  const [open, setOpen] = useState(true);
  const ply = index >= 0 ? operaReview.plies[index] : undefined;
  const fen = ply?.fen ?? operaReview.startFen;
  const sideToMove = fen.split(" ")[1] === "b" ? "b" : "w";

  useEffect(() => {
    const onKey = (event: KeyboardEvent) => {
      const target = event.target;
      if (target instanceof HTMLElement && (target.tagName === "INPUT" || target.tagName === "TEXTAREA")) {
        return;
      }
      if (event.key === "ArrowRight") {
        event.preventDefault();
        setIndex((current) => Math.min(operaReview.plies.length - 1, current + 1));
      } else if (event.key === "ArrowLeft") {
        event.preventDefault();
        setIndex((current) => Math.max(-1, current - 1));
      } else if (event.key === "Home") {
        event.preventDefault();
        setIndex(-1);
      } else if (event.key === "End") {
        event.preventDefault();
        setIndex(operaReview.plies.length - 1);
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  const classification = ply ? CLASSIFICATION_META[ply.classification] : null;
  const note = ply?.note ?? operaReview.startNote;
  const moveLabel = ply ? plyNotation(index, ply.san) : "وضع البداية";

  return (
    <main className="flex h-dvh flex-col overflow-hidden bg-[#0D0E11] text-[#EEEEEE]">
      <header className="flex h-14 shrink-0 items-center gap-3 border-b border-[#1F2229] px-4">
        <div className="flex items-center gap-2">
          <span className="size-2.5 bg-[#D84040]" aria-hidden />
          <span className="text-[17px] font-bold tracking-tight">Outplay</span>
        </div>
        <div className="min-w-0 flex-1 text-center">
          <p className="truncate text-sm font-semibold">مباراة الأوبرا</p>
          <p className="hidden truncate text-[11px] text-[#6D6D75] sm:block">
            باريس 1858 · دفاع فيليدور
          </p>
        </div>
        <div className="flex items-center gap-2">
          {!open ? (
            <button
              type="button"
              onClick={() => setOpen(true)}
              className="h-9 bg-[#D84040] px-3 text-sm font-semibold text-white hover:bg-[#c43434]"
            >
              المراجعة
            </button>
          ) : null}
          <span dir="ltr" className="font-mono text-sm font-semibold tabular-nums">
            1–0
          </span>
        </div>
      </header>

      <div className="flex min-h-0 flex-1 flex-col lg:flex-row">
        <section className="order-1 flex max-h-[56dvh] shrink-0 items-center justify-center overflow-y-auto px-4 py-3 lg:order-2 lg:max-h-none lg:min-h-0 lg:flex-1 lg:overflow-visible lg:px-8">
          <div className="flex w-[min(100%,32dvh)] flex-col gap-2.5 lg:w-[min(100%,calc(100dvh-16rem))]">
            <PlayerRow
              name="الخصم"
              detail="الدوق والكونت"
              tone="black"
              active={sideToMove === "b"}
            />
            <ChessBoard
              fen={fen}
              lastFrom={ply?.from}
              lastTo={ply?.to}
              checkSquare={ply?.checkSquare}
            />
            <PlayerRow name="أنت" detail="بول مورفي" tone="white" active={sideToMove === "w"} />
            <div className="min-h-12 px-0.5">
              <div className="mb-1 flex items-center gap-2">
                {classification ? (
                  <span className={`shrink-0 ${classification.dot}`} aria-hidden />
                ) : null}
                <span className="text-xs font-semibold text-[#C8C8D0]">
                  {classification?.label ?? "البداية"}
                </span>
                {ply?.mate ? (
                  <span className="bg-[#D84040] px-1.5 py-0.5 text-[11px] font-semibold text-white">
                    كش مات
                  </span>
                ) : ply?.checkSquare ? (
                  <span className="border border-[#D84040] px-1.5 py-0.5 text-[11px] font-semibold text-[#D84040]">
                    كش
                  </span>
                ) : null}
                <span dir="ltr" className="ms-auto font-mono text-xs text-[#8E8E98]">
                  {moveLabel}
                </span>
              </div>
              <p className="text-sm leading-6 text-[#E4E4EA]">{note}</p>
            </div>
          </div>
        </section>

        {open ? (
          <div className="relative order-2 min-h-0 w-full flex-1 overflow-hidden border-t border-[#1F2229] lg:order-1 lg:w-[420px] lg:flex-none lg:self-stretch lg:border-t-0 lg:border-l">
            <div className="absolute inset-0 flex justify-center">
              <AnalysisPanel
                moves={operaReview.plies}
                currentMoveIndex={index}
                onSelectMove={setIndex}
                evalScore={ply?.eval ?? operaReview.startEval}
                accuracy={{ white: operaReview.whiteAccuracy, black: operaReview.blackAccuracy }}
                onClose={() => setOpen(false)}
              />
            </div>
          </div>
        ) : null}
      </div>

      <p className="sr-only" aria-live="polite">
        {moveLabel}. {note}
      </p>
    </main>
  );
}

function PlayerRow({
  name,
  detail,
  tone,
  active,
}: {
  name: string;
  detail: string;
  tone: "white" | "black";
  active: boolean;
}) {
  return (
    <div className={"flex items-center gap-2 px-0.5 " + (active ? "text-[#EEEEEE]" : "text-[#8A8A93]")}>
      <span
        className={
          tone === "white"
            ? "size-2.5 shrink-0 rounded-full bg-[#EEEEEE]"
            : "size-2.5 shrink-0 rounded-full bg-[#121316] ring-1 ring-[#5A5E68]"
        }
        aria-hidden
      />
      <span className={"text-sm " + (active ? "font-semibold" : "font-medium")}>{name}</span>
      <span className="truncate text-xs">{detail}</span>
    </div>
  );
}
