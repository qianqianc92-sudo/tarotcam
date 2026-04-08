"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function HomePage() {
  const router = useRouter();
  const [question, setQuestion] = useState("");

  const handleStart = () => {
    const finalQuestion = question.trim() || "我最近的状态会怎样？";
    localStorage.setItem("tarot-user-question", finalQuestion);
    router.push("/select");
  };

  return (
    <main
      className="min-h-screen text-white flex items-center justify-center px-6"
      style={{ background: "#1b1a2e" }}
    >
      <div className="w-full max-w-2xl text-center">
        <p
          className="text-xs mb-3"
          style={{ letterSpacing: "0.35em", color: "#d7c27a" }}
        >
          TAROT AI READING
        </p>

        <h1 className="text-5xl font-bold mb-4">塔罗互动解读</h1>

        <p className="text-zinc-300 leading-8 mb-8">
          输入你此刻最想问的问题，然后开始抽牌。
        </p>

        <div className="space-y-4">
          <textarea
            value={question}
            onChange={(e) => setQuestion(e.target.value)}
            placeholder="比如：我最近找工作的状态会怎样？"
            className="w-full min-h-[140px] rounded-2xl px-5 py-4 text-white outline-none resize-none"
            style={{
              background: "rgba(20,20,30,0.45)",
              border: "1px solid rgba(231,211,139,0.25)",
            }}
          />

          <button
            onClick={handleStart}
            className="px-6 py-3 rounded-2xl font-medium transition"
            style={{
              background: "#f4d97c",
              color: "#161616",
            }}
          >
            开始抽牌
          </button>
        </div>
      </div>
    </main>
  );
}