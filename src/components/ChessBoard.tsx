const FILES = ["a", "b", "c", "d", "e", "f", "g", "h"] as const;

const PIECE_FILE: Record<string, string> = {
  K: "wK",
  Q: "wQ",
  R: "wR",
  B: "wB",
  N: "wN",
  P: "wP",
  k: "bK",
  q: "bQ",
  r: "bR",
  b: "bB",
  n: "bN",
  p: "bP",
};

type Cell = {
  piece: string | null;
  square: string;
  fileIndex: number;
  rank: number;
  light: boolean;
};

function cellsFromFen(fen: string): Cell[] {
  const placement = fen.split(" ")[0] ?? "";
  const ranks = placement.split("/");
  const cells: Cell[] = [];

  ranks.forEach((rankText, rankIndex) => {
    let fileIndex = 0;
    for (const char of rankText) {
      if (char >= "1" && char <= "8") {
        const empty = Number(char);
        for (let step = 0; step < empty; step += 1) {
          const rank = 8 - rankIndex;
          cells.push({
            piece: null,
            square: `${FILES[fileIndex]}${rank}`,
            fileIndex,
            rank,
            light: (fileIndex + rank) % 2 === 0,
          });
          fileIndex += 1;
        }
        continue;
      }
      const rank = 8 - rankIndex;
      cells.push({
        piece: char,
        square: `${FILES[fileIndex]}${rank}`,
        fileIndex,
        rank,
        light: (fileIndex + rank) % 2 === 0,
      });
      fileIndex += 1;
    }
  });

  return cells;
}

export function ChessBoard({
  fen,
  lastFrom,
  lastTo,
  checkSquare,
}: {
  fen: string;
  lastFrom?: string | null;
  lastTo?: string | null;
  checkSquare?: string | null;
}) {
  const cells = cellsFromFen(fen);

  return (
    <div dir="ltr" className="border border-[#1F2229] bg-[#16171B] p-1.5" aria-hidden>
      <div className="grid grid-cols-8">
        {cells.map((cell) => {
          const moved = cell.square === lastFrom || cell.square === lastTo;
          const checked = cell.square === checkSquare;
          const glyph = cell.piece ? PIECE_FILE[cell.piece] : null;
          return (
            <div
              key={cell.square}
              className={
                "relative flex aspect-square items-center justify-center " +
                (cell.light ? "bg-[#EEEED2]" : "bg-[#769656]")
              }
            >
              {moved ? <span className="absolute inset-0 bg-[#D84040]/28" /> : null}
              {checked ? (
                <span className="pointer-events-none absolute inset-0 shadow-[inset_0_0_0_3px_#D84040]" />
              ) : null}
              {glyph ? (
                <img
                  src={`/pieces/${glyph}.svg`}
                  alt=""
                  draggable={false}
                  className="relative z-[1] h-[86%] w-[86%] select-none"
                />
              ) : null}
              {cell.fileIndex === 0 ? (
                <span
                  className={
                    "absolute top-0.5 left-0.5 z-[1] font-mono text-[10px] leading-none " +
                    (cell.light ? "text-[#5C6840]" : "text-[#EEEED2]")
                  }
                >
                  {cell.rank}
                </span>
              ) : null}
              {cell.rank === 1 ? (
                <span
                  className={
                    "absolute right-0.5 bottom-0.5 z-[1] font-mono text-[10px] leading-none " +
                    (cell.light ? "text-[#5C6840]" : "text-[#EEEED2]")
                  }
                >
                  {FILES[cell.fileIndex]}
                </span>
              ) : null}
            </div>
          );
        })}
      </div>
    </div>
  );
}
