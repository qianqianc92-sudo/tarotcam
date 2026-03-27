"use client";

import { useEffect, useState } from "react";

type TarotCard = {
  id: number;
  name: string;
  upright: string;
  reversed: string;
};

type DrawnCard = {
  position: "过去" | "现在" | "未来";
  orientation: "正位" | "逆位";
  card: TarotCard;
};

export default function ReadingPage() {
  const [drawnCards, setDrawnCards] = useState<DrawnCard[]>([]);
  const [loadingCards, setLoadingCards] = useState(true);
  const [loadingInterpretation, setLoadingInterpretation] = useState(false);
  const [interpretation, setInterpretation] = useState("");

  useEffect(() => {
    const stored = localStorage.getItem("tarot-reading-result");

    if (stored) {
      try {
        const parsed = JSON.parse(stored);
        setDrawnCards(parsed);
      } catch (error) {
        console.error("读取抽牌结果失败", error);
      }
    }

    setLoadingCards(false);
  }, []);

  const handleInterpret = async () => {
    try {
      setLoadingInterpretation(true);
      setInterpretation("");

      const res = await fetch("/api/interpret", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          question: "我最近的状态会怎样？",
          cards: drawnCards.map((drawn) => ({
            position: drawn.position,
            name: drawn.card.name,
            orientation: drawn.orientation,
          })),
        }),
      });

      const data = await res.json();
      setInterpretation(data.interpretation || "暂时没有生成解读。");
    } catch (error) {
      setInterpretation("AI 解读生成失败，请稍后再试。");
    } finally {
      setLoadingInterpretation(false);
    }
  };

  if (loadingCards) {
    return (
      <main className="min-h-screen bg-zinc-950 text-white flex items-center justify-center">
        正在读取抽牌结果...
      </main>
    );
  }

  if (drawnCards.length !== 3) {
    return (
      <main className="min-h-screen bg-zinc-950 text-white flex flex-col items-center justify-center px-6">
        <h1 className="text-3xl font-bold mb-4">还没有抽牌结果</h1>
        <p className="text-zinc-400">请先返回选牌页选择三张牌。</p>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-zinc-950 text-white flex flex-col items-center justify-center px-6 py-12">
      <h1 className="text-4xl font-bold mb-3">你的阅读结果</h1>
      <p className="text-zinc-400 mb-10 text-center">
        这是你亲自选出的三张牌。
      </p>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8 w-full max-w-5xl">
        {drawnCards.map((drawn) => (
          <div
            key={`${drawn.position}-${drawn.card.id}`}
            className="rounded-3xl border border-zinc-800 bg-zinc-900 min-h-[300px] p-6 flex flex-col items-center justify-center text-center shadow-lg"
          >
            <div className="text-zinc-500 text-sm mb-2">{drawn.position}</div>
            <h2 className="text-2xl font-semibold mb-2">{drawn.card.name}</h2>
            <p className="text-sm tracking-widest text-zinc-400 mb-4">
              {drawn.orientation}
            </p>
          </div>
        ))}
      </div>

      <div className="flex flex-col items-center gap-4">
        <button
          onClick={handleInterpret}
          disabled={loadingInterpretation}
          className="px-6 py-3 rounded-2xl bg-white text-black font-medium hover:opacity-90 transition disabled:opacity-50"
        >
          {loadingInterpretation ? "AI 解读生成中..." : "生成 AI 解读"}
        </button>

        <button
          onClick={() => {
            localStorage.removeItem("tarot-reading-result");
            window.location.href = "/select";
          }}
          className="px-6 py-3 rounded-2xl border border-zinc-700 text-white font-medium hover:bg-zinc-900 transition"
        >
          重新选牌
        </button>
      </div>

      {interpretation && (
        <div className="mt-10 w-full max-w-3xl rounded-3xl border border-zinc-800 bg-zinc-900 p-6 whitespace-pre-line text-zinc-200 leading-8">
          {interpretation}
        </div>
      )}
    </main>
  );
}