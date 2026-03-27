"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function Home() {
  const [question, setQuestion] = useState("");
  const router = useRouter();

const handleStart = () => {
  router.push("/select");
};

  return (
    <main className="min-h-screen bg-zinc-950 text-white flex items-center justify-center">
      <div className="max-w-2xl w-full text-center px-6">
        <h1 className="text-5xl font-bold mb-6">塔罗互动抽牌</h1>
        <p className="text-zinc-300 text-lg mb-8">
          一个带有仪式感的在线卡牌探索体验
        </p>

        <input
          value={question}
          onChange={(e) => setQuestion(e.target.value)}
          placeholder="输入你此刻想问的问题..."
          className="w-full px-4 py-3 rounded-2xl bg-zinc-900 border border-zinc-700 outline-none mb-4"
        />

        <button
          onClick={handleStart}
          className="px-6 py-3 rounded-2xl bg-white text-black font-medium hover:opacity-90 transition"
        >
          开始抽牌
        </button>
      </div>
    </main>
  );
}