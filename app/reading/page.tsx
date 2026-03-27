"use client";

import { useMemo, useState } from "react";
import { tarotDeck } from "../data/tarot";

type Position = "过去" | "呈现" | "未来";
type Orientation = "正位" | "逆位";

function shuffleArray<T>(array: T[]) {
  const copied = [...array];
  for (let i = copied.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [copied[i], copied[j]] = [copied[j], copied[i]];
  }
  return copied;
}

export default function ReadingPage() {
  const drawnCards = useMemo(() => {
    const positions: Position[] = ["过去", "呈现", "未来"];
    const selectedCards = shuffleArray(tarotDeck).slice(0, 3);

    return selectedCards.map((card, index) => ({
      position: positions[index],
      orientation: Math.random() > 0.5 ? ("正位" as Orientation) : ("逆位" as Orientation),
      card,
    }));
  }, []);

  const [revealed, setRevealed] = useState(false);

  return (
    <main className="min-h-screen bg-zinc-950 text-white flex flex-col items-center justify-center px-6 py-12">
      <h1 className="text-4xl font-bold mb-3">你的阅读</h1>
      <p className="text-zinc-400 mb-10 text-center">
        为你的过去、现在和未来抽了三张牌。
      </p>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8 w-full max-w-5xl">
        {drawnCards.map((drawn, index) => (
          <div
            key={drawn.card.id}
            className="rounded-3xl border border-zinc-800 bg-zinc-900 min-h-[300px] p-6 flex flex-col items-center justify-center text-center shadow-lg"
          >
            {!revealed ? (
              <>
                <div className="text-zinc-500 text-sm mb-4">{drawn.position}</div>
                <div className="w-24 h-36 rounded-2xl border border-zinc-700 bg-zinc-950 flex items-center justify-center text-zinc-400 text-2xl">
                  ✦
                </div>
                <p className="text-zinc-500 mt-4">背面卡牌 {index + 1}</p>
              </>
            ) : (
              <>
                <div className="text-zinc-500 text-sm mb-2">{drawn.position}</div>
                <h2 className="text-2xl font-semibold mb-2">{drawn.card.name}</h2>
                <p className="text-sm uppercase tracking-widest text-zinc-400 mb-4">
                  {drawn.orientation}
                </p>
                <p className="text-zinc-300 leading-7">
                  {drawn.orientation === "正位"
                    ? drawn.card.upright
                    : drawn.card.reversed}
                </p>
              </>
            )}
          </div>
        ))}
      </div>

      {!revealed ? (
        <button
          onClick={() => setRevealed(true)}
          className="px-6 py-3 rounded-2xl bg-white text-black font-medium hover:opacity-90 transition"
        >
          揭示卡片
        </button>
      ) : (
        <button
          onClick={() => window.location.reload()}
          className="px-6 py-3 rounded-2xl bg-white text-black font-medium hover:opacity-90 transition"
        >
          再抽一次
        </button>
      )}
    </main>
  );
}