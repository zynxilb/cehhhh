import { i as __toESM } from "../_runtime.mjs";
import { K as require_react, b as require_jsx_runtime } from "../_libs/@tanstack/react-router+[...].mjs";
import { a as ChevronRight, i as SkipBack, o as ChevronLeft, r as SkipForward, t as X } from "../_libs/lucide-react.mjs";
import { t as Chess } from "../_libs/chess.js.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/routes-vN0svxlt.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
var CLASSIFICATION_META = {
	brilliant: {
		label: "رائعة",
		dot: "size-1.5 rotate-45 bg-[#2EC4B6]"
	},
	best: {
		label: "أفضل نقلة",
		dot: "size-1.5 rounded-full bg-[#7DCE5A]"
	},
	good: {
		label: "جيدة",
		dot: "size-1.5 rounded-full bg-[#8E8E98]"
	},
	blunder: {
		label: "غلطة",
		dot: "size-1.5 rounded-full bg-[#D84040]"
	}
};
function rowsFromMoves(moves) {
	const rows = [];
	for (let index = 0; index < moves.length; index += 2) {
		const black = moves[index + 1];
		rows.push({
			number: index / 2 + 1,
			white: {
				move: moves[index],
				index
			},
			black: black ? {
				move: black,
				index: index + 1
			} : void 0
		});
	}
	return rows;
}
function formatEval(score) {
	if (!Number.isFinite(score)) return "0.00";
	if (score >= 50) return "+M";
	if (score <= -50) return "−M";
	const digits = Math.abs(score).toFixed(2);
	if (score > 0) return `+${digits}`;
	if (score < 0) return `−${digits}`;
	return "0.00";
}
function whiteShare(score) {
	if (score >= 50) return 100;
	if (score <= -50) return 0;
	const share = 1 / (1 + Math.exp(-.5 * Math.max(-10, Math.min(10, score))));
	return Math.round(share * 100);
}
function AccuracyChip({ tone, label, value }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "flex items-center gap-2",
		dir: "rtl",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
			className: tone === "white" ? "size-7 shrink-0 rounded-full bg-[#EEEEEE] shadow-[inset_0_0_0_1px_rgba(0,0,0,0.28)]" : "size-7 shrink-0 rounded-full bg-[#121316] shadow-[inset_0_0_0_1px_#3A3D46]",
			"aria-hidden": true
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
			className: "flex items-baseline gap-1 whitespace-nowrap",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
				className: "font-sans text-[13px] text-[#C8C8D0]",
				children: label
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
				className: "font-mono text-[13px] font-semibold tabular-nums text-white",
				children: [value.toFixed(1), "%"]
			})]
		})]
	});
}
function MoveCell({ move, index, active, onSelectMove }) {
	const ref = (0, import_react.useRef)(null);
	const meta = CLASSIFICATION_META[move.classification];
	(0, import_react.useEffect)(() => {
		if (!active) return;
		ref.current?.scrollIntoView({
			block: "nearest",
			inline: "nearest"
		});
	}, [active]);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
		ref,
		type: "button",
		"aria-current": active ? "true" : void 0,
		"aria-label": `${move.san}، ${meta.label}`,
		onClick: () => onSelectMove(index),
		className: "flex h-8 min-w-0 items-center gap-1.5 border-l-2 px-2 text-start font-mono text-sm text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-[-2px] focus-visible:outline-[#D84040] " + (active ? "border-[#D84040] bg-[#1F2229]" : "border-transparent hover:bg-[#1A1C22]"),
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
			className: "truncate",
			children: move.san
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
			className: `ml-auto shrink-0 ${meta.dot}`,
			title: meta.label
		})]
	});
}
function AnalysisPanel({ moves, currentMoveIndex, onSelectMove, evalScore, accuracy, onClose }) {
	const rows = (0, import_react.useMemo)(() => rowsFromMoves(moves), [moves]);
	const atStart = currentMoveIndex <= -1;
	const atEnd = currentMoveIndex >= moves.length - 1;
	const share = whiteShare(evalScore);
	const scoreLabel = formatEval(evalScore);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("aside", {
		dir: "rtl",
		className: "flex h-full min-h-0 w-full max-w-[420px] flex-col bg-[#16171B] text-white",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("header", {
				dir: "ltr",
				className: "flex h-14 shrink-0 items-center gap-2 border-b border-[#1F2229] px-3",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
					type: "button",
					onClick: onClose,
					"aria-label": "إغلاق المراجعة",
					className: "grid size-11 shrink-0 place-items-center text-[#A7A7B0] hover:bg-[#1F2229] hover:text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-[#D84040]",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(X, {
						className: "size-4",
						strokeWidth: 2
					})
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					dir: "rtl",
					className: "ml-auto flex items-center gap-4",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(AccuracyChip, {
						tone: "white",
						label: "أنت",
						value: accuracy.white
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(AccuracyChip, {
						tone: "black",
						label: "الخصم",
						value: accuracy.black
					})]
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "move-scroll min-h-0 flex-1 overflow-y-auto overscroll-contain",
				dir: "ltr",
				"aria-label": "قائمة النقلات",
				children: rows.length === 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "px-4 py-8 text-center font-sans text-sm text-[#6D6D75]",
					dir: "rtl",
					children: "لا توجد نقلات"
				}) : rows.map((row) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "grid grid-cols-[2.25rem_minmax(0,1fr)_minmax(0,1fr)]",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "flex h-8 items-center justify-center font-mono text-xs text-[#6D6D75]",
							children: row.number
						}),
						row.white ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(MoveCell, {
							move: row.white.move,
							index: row.white.index,
							active: currentMoveIndex === row.white.index,
							onSelectMove
						}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "h-8" }),
						row.black ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(MoveCell, {
							move: row.black.move,
							index: row.black.index,
							active: currentMoveIndex === row.black.index,
							onSelectMove
						}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "h-8" })
					]
				}, row.number))
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				dir: "ltr",
				className: "flex shrink-0 items-center gap-3 border-t border-[#1F2229] px-3 py-2.5",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "relative h-3 flex-1 overflow-hidden bg-[#141518]",
					role: "meter",
					"aria-label": "تقييم الموقف",
					"aria-valuemin": -10,
					"aria-valuemax": 10,
					"aria-valuenow": Math.max(-10, Math.min(10, evalScore)),
					"aria-valuetext": scoreLabel,
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "eval-fill absolute inset-y-0 left-0 bg-[#EEEEEE]",
						style: { width: `${share}%` }
					})
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
					className: "w-12 shrink-0 text-end font-mono text-[13px] font-medium tabular-nums text-[#EEEEEE]",
					children: scoreLabel
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				dir: "ltr",
				className: "flex shrink-0 items-center gap-1.5 border-t border-[#1F2229] p-2.5",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
						type: "button",
						"aria-label": "البداية",
						title: "البداية",
						disabled: atStart,
						onClick: () => onSelectMove(-1),
						className: "grid size-11 shrink-0 place-items-center bg-[#1F2229] text-white hover:bg-[#2A2D36] focus-visible:outline focus-visible:outline-2 focus-visible:outline-[#D84040] disabled:opacity-35",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SkipBack, { className: "size-4" })
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
						type: "button",
						"aria-label": "السابق",
						title: "السابق",
						disabled: atStart,
						onClick: () => onSelectMove(Math.max(-1, currentMoveIndex - 1)),
						className: "grid h-11 min-w-11 flex-1 place-items-center bg-[#1F2229] text-white hover:bg-[#2A2D36] focus-visible:outline focus-visible:outline-2 focus-visible:outline-[#D84040] disabled:opacity-35",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ChevronLeft, { className: "size-5" })
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
						type: "button",
						disabled: atEnd,
						onClick: () => onSelectMove(Math.min(moves.length - 1, currentMoveIndex + 1)),
						className: "inline-flex h-11 w-1/2 shrink-0 items-center justify-center gap-1.5 bg-[#D84040] font-sans text-base font-semibold text-white hover:bg-[#c43434] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#EEEEEE] active:bg-[#b12e2e] disabled:opacity-35",
						children: ["التالي", /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ChevronRight, { className: "size-4" })]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
						type: "button",
						"aria-label": "النهاية",
						title: "النهاية",
						disabled: atEnd || moves.length === 0,
						onClick: () => onSelectMove(moves.length - 1),
						className: "grid size-11 shrink-0 place-items-center bg-[#1F2229] text-white hover:bg-[#2A2D36] focus-visible:outline focus-visible:outline-2 focus-visible:outline-[#D84040] disabled:opacity-35",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SkipForward, { className: "size-4" })
					})
				]
			})
		]
	});
}
var FILES = [
	"a",
	"b",
	"c",
	"d",
	"e",
	"f",
	"g",
	"h"
];
var PIECE_FILE = {
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
	p: "bP"
};
function cellsFromFen(fen) {
	const ranks = (fen.split(" ")[0] ?? "").split("/");
	const cells = [];
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
						light: (fileIndex + rank) % 2 === 0
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
				light: (fileIndex + rank) % 2 === 0
			});
			fileIndex += 1;
		}
	});
	return cells;
}
function ChessBoard({ fen, lastFrom, lastTo, checkSquare }) {
	const cells = cellsFromFen(fen);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		dir: "ltr",
		className: "border border-[#1F2229] bg-[#16171B] p-1.5",
		"aria-hidden": true,
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "grid grid-cols-8",
			children: cells.map((cell) => {
				const moved = cell.square === lastFrom || cell.square === lastTo;
				const checked = cell.square === checkSquare;
				const glyph = cell.piece ? PIECE_FILE[cell.piece] : null;
				return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "relative flex aspect-square items-center justify-center " + (cell.light ? "bg-[#EEEED2]" : "bg-[#769656]"),
					children: [
						moved ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: "absolute inset-0 bg-[#D84040]/28" }) : null,
						checked ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: "pointer-events-none absolute inset-0 shadow-[inset_0_0_0_3px_#D84040]" }) : null,
						glyph ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
							src: `/pieces/${glyph}.svg`,
							alt: "",
							draggable: false,
							className: "relative z-[1] h-[86%] w-[86%] select-none"
						}) : null,
						cell.fileIndex === 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "absolute top-0.5 left-0.5 z-[1] font-mono text-[10px] leading-none " + (cell.light ? "text-[#5C6840]" : "text-[#EEEED2]"),
							children: cell.rank
						}) : null,
						cell.rank === 1 ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "absolute right-0.5 bottom-0.5 z-[1] font-mono text-[10px] leading-none " + (cell.light ? "text-[#5C6840]" : "text-[#EEEED2]"),
							children: FILES[cell.fileIndex]
						}) : null
					]
				}, cell.square);
			})
		})
	});
}
var PGN = `[Event "Opera Game"]
[Site "Paris"]
[Date "1858.??.??"]
[White "Paul Morphy"]
[Black "Duke of Brunswick and Count Isouard"]
[Result "1-0"]

1. e4 e5 2. Nf3 d6 3. d4 Bg4 4. dxe5 Bxf3 5. Qxf3 dxe5 6. Bc4 Nf6 7. Qb3 Qe7 8. Nc3 c6 9. Bg5 b5 10. Nxb5 cxb5 11. Bxb5+ Nbd7 12. O-O-O Rd8 13. Rxd7 Rxd7 14. Rd1 Qe6 15. Bxd7+ Nxd7 16. Qb8+ Nxb8 17. Rd8# 1-0`;
var ANNOTATIONS = [
	{
		classification: "best",
		eval: .3,
		note: "سيطرة على المركز. البداية الأقوى في هذا الوضع."
	},
	{
		classification: "best",
		eval: .22,
		note: "رد متماثل يفتح طريق الفيل والوزير."
	},
	{
		classification: "best",
		eval: .34,
		note: "تطوير مع ضغط مباشر على e5."
	},
	{
		classification: "good",
		eval: .51,
		note: "دفاع فيليدور. صلب، لكنه يُبطئ القطع."
	},
	{
		classification: "best",
		eval: .64,
		note: "كسر المركز قبل أن يكتمل تطوير الأسود."
	},
	{
		classification: "good",
		eval: .4,
		note: "تثبيت الحصان. الفيل سيُستبدل بعد خطوات."
	},
	{
		classification: "best",
		eval: .82,
		note: "فتح اللعب والأبيض ما زال أسرع تطويرًا."
	},
	{
		classification: "good",
		eval: .38,
		note: "التبادل يمنح الأبيض زوج الفيل."
	},
	{
		classification: "best",
		eval: .96,
		note: "الوزير يدخل إلى اللعب مع ربح الزمن."
	},
	{
		classification: "good",
		eval: .68,
		note: "استعادة البيدق، والعمود d صار مفتوحًا."
	},
	{
		classification: "best",
		eval: 1.18,
		note: "التهديف نحو f7 من أول مربع نشط."
	},
	{
		classification: "good",
		eval: .9,
		note: "تطوير طبيعي، لكن b7 يظل مكشوفًا."
	},
	{
		classification: "brilliant",
		eval: 1.86,
		note: "الوزير يضرب b7 وf7 في الوقت نفسه."
	},
	{
		classification: "good",
		eval: 1.4,
		note: "دفاع اضطراري عن البيدق والملك."
	},
	{
		classification: "best",
		eval: 1.74,
		note: "الحصان يدخل قبل التبييت على الجانب الملكي."
	},
	{
		classification: "good",
		eval: 1.18,
		note: "محاولة سد قطر الفيل. الثمن يظهر فورًا."
	},
	{
		classification: "best",
		eval: 2.2,
		note: "تثبيت جديد على f6 يربط الدفاع كله."
	},
	{
		classification: "blunder",
		eval: 4.9,
		note: "البيدق يُقدَّم، والقلعة حول الملك تنفتح."
	},
	{
		classification: "brilliant",
		eval: 6.5,
		note: "تضحية محسوبة. الملك الأسود عالق في الوسط."
	},
	{
		classification: "blunder",
		eval: 8.2,
		note: "أخذ الحصان يفتح عمود b للفيل مع كش."
	},
	{
		classification: "best",
		eval: 8.8,
		note: "كش. الحصان على d7 صار مثبتًا."
	},
	{
		classification: "good",
		eval: 7.95,
		note: "الرد الوحيد تقريبًا، والتثبيت ما زال قائمًا."
	},
	{
		classification: "best",
		eval: 8.6,
		note: "الرخ يدخل العمود المفتوح والملك يبتعد."
	},
	{
		classification: "good",
		eval: 7.7,
		note: "حماية d7. الضغط يتضاعف ولا ينكسر."
	},
	{
		classification: "brilliant",
		eval: 11.4,
		note: "التضحية بالرخ تُبقي المبادرة كاملة."
	},
	{
		classification: "good",
		eval: 9.9,
		note: "الاستعادة لا تُخرج الملك من الشبكة."
	},
	{
		classification: "best",
		eval: 12.5,
		note: "الرخ الثاني يحل محل الأول على العمود نفسه."
	},
	{
		classification: "good",
		eval: 10.3,
		note: "فك التثبيت جاء متأخرًا. الشبكة اكتملت."
	},
	{
		classification: "best",
		eval: 14.8,
		note: "كش يجبر الحصان على أخذ الفيل."
	},
	{
		classification: "good",
		eval: 12.2,
		note: "الحصان يغادر f6 ويغطي d8 لخطوة واحدة."
	},
	{
		classification: "brilliant",
		eval: 99,
		note: "التضحية بالوزير تُخلي مربع d8."
	},
	{
		classification: "good",
		eval: 99,
		note: "أخذ الوزير إجباري، ويفرغ آخر دفاع عن d8."
	},
	{
		classification: "brilliant",
		eval: 100,
		note: "الفيل على g5 يحمي الرخ، ومربعات الملك مغلقة."
	}
];
function kingSquare(chess, color) {
	for (const row of chess.board()) for (const piece of row) if (piece && piece.type === "k" && piece.color === color) return piece.square;
	return null;
}
function buildReview() {
	const chess = new Chess();
	chess.loadPgn(PGN);
	const history = chess.history({ verbose: true });
	if (history.length !== ANNOTATIONS.length) throw new Error(`Opera game: expected ${ANNOTATIONS.length} plies, received ${history.length}`);
	const plies = history.map((move, index) => {
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
			mate: probe.isCheckmate()
		};
	});
	if (!plies[plies.length - 1]?.mate) throw new Error("Opera game did not end in checkmate");
	return {
		startFen: history[0]?.before ?? new Chess().fen(),
		startEval: .2,
		startNote: "وضع البداية. الأبيض يفتتح، والأسود على دفاع فيليدور.",
		whiteAccuracy: 96.8,
		blackAccuracy: 61.2,
		plies
	};
}
var operaReview = buildReview();
function plyNotation(index, san) {
	const moveNumber = Math.floor(index / 2) + 1;
	return index % 2 === 0 ? `${moveNumber}. ${san}` : `${moveNumber}...${san}`;
}
function Home() {
	const [index, setIndex] = (0, import_react.useState)(17);
	const [open, setOpen] = (0, import_react.useState)(true);
	const ply = index >= 0 ? operaReview.plies[index] : void 0;
	const fen = ply?.fen ?? operaReview.startFen;
	const sideToMove = fen.split(" ")[1] === "b" ? "b" : "w";
	(0, import_react.useEffect)(() => {
		const onKey = (event) => {
			const target = event.target;
			if (target instanceof HTMLElement && (target.tagName === "INPUT" || target.tagName === "TEXTAREA")) return;
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
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("main", {
		className: "flex h-dvh flex-col overflow-hidden bg-[#0D0E11] text-[#EEEEEE]",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("header", {
				className: "flex h-14 shrink-0 items-center gap-3 border-b border-[#1F2229] px-4",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex items-center gap-2",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "size-2.5 bg-[#D84040]",
							"aria-hidden": true
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "text-[17px] font-bold tracking-tight",
							children: "Outplay"
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "min-w-0 flex-1 text-center",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "truncate text-sm font-semibold",
							children: "مباراة الأوبرا"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "hidden truncate text-[11px] text-[#6D6D75] sm:block",
							children: "باريس 1858 · دفاع فيليدور"
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex items-center gap-2",
						children: [!open ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
							type: "button",
							onClick: () => setOpen(true),
							className: "h-9 bg-[#D84040] px-3 text-sm font-semibold text-white hover:bg-[#c43434]",
							children: "المراجعة"
						}) : null, /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							dir: "ltr",
							className: "font-mono text-sm font-semibold tabular-nums",
							children: "1–0"
						})]
					})
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "flex min-h-0 flex-1 flex-col lg:flex-row",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("section", {
					className: "order-1 flex max-h-[56dvh] shrink-0 items-center justify-center overflow-y-auto px-4 py-3 lg:order-2 lg:max-h-none lg:min-h-0 lg:flex-1 lg:overflow-visible lg:px-8",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex w-[min(100%,32dvh)] flex-col gap-2.5 lg:w-[min(100%,calc(100dvh-16rem))]",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(PlayerRow, {
								name: "الخصم",
								detail: "الدوق والكونت",
								tone: "black",
								active: sideToMove === "b"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ChessBoard, {
								fen,
								lastFrom: ply?.from,
								lastTo: ply?.to,
								checkSquare: ply?.checkSquare
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(PlayerRow, {
								name: "أنت",
								detail: "بول مورفي",
								tone: "white",
								active: sideToMove === "w"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "min-h-12 px-0.5",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "mb-1 flex items-center gap-2",
									children: [
										classification ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
											className: `shrink-0 ${classification.dot}`,
											"aria-hidden": true
										}) : null,
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
											className: "text-xs font-semibold text-[#C8C8D0]",
											children: classification?.label ?? "البداية"
										}),
										ply?.mate ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
											className: "bg-[#D84040] px-1.5 py-0.5 text-[11px] font-semibold text-white",
											children: "كش مات"
										}) : ply?.checkSquare ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
											className: "border border-[#D84040] px-1.5 py-0.5 text-[11px] font-semibold text-[#D84040]",
											children: "كش"
										}) : null,
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
											dir: "ltr",
											className: "ms-auto font-mono text-xs text-[#8E8E98]",
											children: moveLabel
										})
									]
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
									className: "text-sm leading-6 text-[#E4E4EA]",
									children: note
								})]
							})
						]
					})
				}), open ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "relative order-2 min-h-0 w-full flex-1 overflow-hidden border-t border-[#1F2229] lg:order-1 lg:w-[420px] lg:flex-none lg:self-stretch lg:border-t-0 lg:border-l",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "absolute inset-0 flex justify-center",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(AnalysisPanel, {
							moves: operaReview.plies,
							currentMoveIndex: index,
							onSelectMove: setIndex,
							evalScore: ply?.eval ?? operaReview.startEval,
							accuracy: {
								white: operaReview.whiteAccuracy,
								black: operaReview.blackAccuracy
							},
							onClose: () => setOpen(false)
						})
					})
				}) : null]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
				className: "sr-only",
				"aria-live": "polite",
				children: [
					moveLabel,
					". ",
					note
				]
			})
		]
	});
}
function PlayerRow({ name, detail, tone, active }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "flex items-center gap-2 px-0.5 " + (active ? "text-[#EEEEEE]" : "text-[#8A8A93]"),
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
				className: tone === "white" ? "size-2.5 shrink-0 rounded-full bg-[#EEEEEE]" : "size-2.5 shrink-0 rounded-full bg-[#121316] ring-1 ring-[#5A5E68]",
				"aria-hidden": true
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
				className: "text-sm " + (active ? "font-semibold" : "font-medium"),
				children: name
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
				className: "truncate text-xs",
				children: detail
			})
		]
	});
}
//#endregion
export { Home as component };
