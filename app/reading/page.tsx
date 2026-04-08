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
  const [question, setQuestion] = useState("");
  const [drawnCards, setDrawnCards] = useState<DrawnCard[]>([]);
  const [loadingCards, setLoadingCards] = useState(true);
  const [loadingInterpretation, setLoadingInterpretation] = useState(false);
  const [interpretation, setInterpretation] = useState("");

  useEffect(() => {
    const storedQuestion = localStorage.getItem("tarot-user-question") || "";
    const storedReading = localStorage.getItem("tarot-reading-result");

    setQuestion(storedQuestion);

    if (storedReading) {
      try {
        const parsed = JSON.parse(storedReading);
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
          question,
          cards: drawnCards.map((drawn) => ({
            position: drawn.position,
            name: drawn.card.name,
            orientation: drawn.orientation,
          })),
        }),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.error || "解读失败");
      }

      setInterpretation(data.interpretation || "暂时没有生成解读。");
    } catch (error) {
      setInterpretation("AI 解读生成失败，请稍后再试。");
    } finally {
      setLoadingInterpretation(false);
    }
  };

  if (loadingCards) {
    return (
      <main
        className="min-h-screen text-white flex items-center justify-center"
        style={{ background: "#17152a" }}
      >
        正在读取抽牌结果...
      </main>
    );
  }

  if (drawnCards.length !== 3) {
    return (
      <main
        className="min-h-screen text-white flex flex-col items-center justify-center px-6"
        style={{ background: "#17152a" }}
      >
        <h1 className="text-3xl font-bold mb-4">还没有抽牌结果</h1>
        <p className="text-zinc-400">请先返回选牌页完成选牌。</p>
      </main>
    );
  }

  return (
    <main
      className="min-h-screen text-white"
      style={{ background: "#17152a" }}
    >
      <div className="max-w-6xl mx-auto px-4 py-10">
        <header className="text-center mb-10">
          <p
            className="text-xs mb-3"
            style={{ letterSpacing: "0.35em", color: "#d7c27a" }}
          >
            YOUR READING
          </p>

          <h1 className="text-4xl md:text-5xl font-bold mb-5">你的抽牌结果</h1>

          <p className="text-zinc-300 max-w-3xl mx-auto leading-8 text-base md:text-lg">
            <span className="font-semibold text-yellow-200">你的问题：</span>
            {question || "未提供问题"}
          </p>
        </header>

        <section className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
          {drawnCards.map((drawn) => (
            <div
              key={`${drawn.position}-${drawn.card.id}`}
              className="rounded-[28px] p-8 text-center"
              style={{
                background: "rgba(20,20,30,0.45)",
                border: "1px solid rgba(231,211,139,0.18)",
              }}
            >
              <div className="text-zinc-400 text-lg mb-4">{drawn.position}</div>

              <h2 className="text-4xl font-bold mb-5">{drawn.card.name}</h2>

              <div
                className="mx-auto max-w-[220px] px-4 py-2 rounded-full text-xl font-semibold"
                style={{
                  background: "rgba(244,217,124,0.14)",
                  color: "#f4d97c",
                }}
              >
                {drawn.orientation}
              </div>
            </div>
          ))}
        </section>

        <section className="flex justify-center mb-10">
          <button
            onClick={handleInterpret}
            disabled={loadingInterpretation}
            className="px-8 py-4 rounded-3xl text-2xl font-semibold transition disabled:opacity-50"
            style={{
              background: "#f4d97c",
              color: "#161616",
            }}
          >
            {loadingInterpretation ? "AI 解读生成中..." : "生成 AI 解读"}
          </button>
        </section>

        {interpretation && (
          <section
            className="max-w-4xl mx-auto rounded-[28px] p-8 whitespace-pre-line leading-8 text-zinc-100"
            style={{
              background: "rgba(20,20,30,0.45)",
              border: "1px solid rgba(231,211,139,0.18)",
            }}
          >
            {interpretation}
          </section>
        )}
      </div>
    </main>
  );
}