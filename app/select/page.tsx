"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { buildReadingFromSelection, createShuffledDeck, DeckCard } from "../lib/draw";

type Hotspot = {
  id: number;
  left: string;
  top: string;
  rotate: number;
};

const hotspots: Hotspot[] = [
  { id: 1, left: "6%", top: "78%", rotate: -28 },
  { id: 2, left: "9%", top: "72%", rotate: -25 },
  { id: 3, left: "12%", top: "66%", rotate: -22 },
  { id: 4, left: "15%", top: "61%", rotate: -19 },
  { id: 5, left: "18%", top: "56%", rotate: -16 },
  { id: 6, left: "21%", top: "52%", rotate: -13 },
  { id: 7, left: "24%", top: "49%", rotate: -10 },
  { id: 8, left: "27%", top: "46%", rotate: -8 },
  { id: 9, left: "30%", top: "43%", rotate: -6 },
  { id: 10, left: "33%", top: "41%", rotate: -4 },
  { id: 11, left: "36%", top: "39%", rotate: -2 },
  { id: 12, left: "39%", top: "38%", rotate: -1 },
  { id: 13, left: "42%", top: "37%", rotate: 0 },
  { id: 14, left: "45%", top: "36%", rotate: 1 },
  { id: 15, left: "48%", top: "36%", rotate: 2 },
  { id: 16, left: "51%", top: "36%", rotate: 4 },
  { id: 17, left: "54%", top: "37%", rotate: 6 },
  { id: 18, left: "57%", top: "38%", rotate: 8 },
  { id: 19, left: "60%", top: "40%", rotate: 10 },
  { id: 20, left: "63%", top: "42%", rotate: 12 },
  { id: 21, left: "66%", top: "45%", rotate: 15 },
  { id: 22, left: "69%", top: "48%", rotate: 18 },
  { id: 23, left: "72%", top: "52%", rotate: 21 },
  { id: 24, left: "75%", top: "57%", rotate: 24 },
];

type SelectedItem = {
  hotspotId: number;
  order: number;
  card: DeckCard;
};

export default function SelectPage() {
  const router = useRouter();
  const [deck, setDeck] = useState<DeckCard[]>([]);
  const [selected, setSelected] = useState<SelectedItem[]>([]);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    setDeck(createShuffledDeck(78));
    setReady(true);
  }, []);

  const handleSelect = (hotspotId: number) => {
    const alreadySelected = selected.some((item) => item.hotspotId === hotspotId);
    if (alreadySelected || selected.length >= 3 || deck.length < 3) return;

    const nextCard = deck[selected.length];
    const nextSelected = [
      ...selected,
      {
        hotspotId,
        order: selected.length + 1,
        card: nextCard,
      },
    ];

    setSelected(nextSelected);
  };

  const handleRemoveLast = () => {
    if (selected.length === 0) return;
    setSelected((prev) => prev.slice(0, -1));
  };

  const handleConfirm = () => {
    if (selected.length !== 3) return;

    const finalReading = buildReadingFromSelection(
      selected.map((item) => item.card)
    );

    localStorage.setItem("tarot-reading-result", JSON.stringify(finalReading));
    router.push("/reading");
  };

  if (!ready) {
    return (
      <main
        className="min-h-screen flex items-center justify-center text-white"
        style={{ background: "#17152a" }}
      >
        正在洗牌...
      </main>
    );
  }

  return (
    <main
      className="min-h-screen text-white"
      style={{ background: "#17152a" }}
    >
      <div className="max-w-6xl mx-auto px-4 py-8 md:py-10">
        <header className="text-center mb-8 md:mb-10">
          <p
            className="text-xs mb-3"
            style={{ letterSpacing: "0.35em", color: "#d7c27a" }}
          >
            TAROT SPREAD
          </p>

          <h1 className="text-4xl md:text-5xl font-bold mb-4">选择三张牌</h1>

          <p className="text-zinc-300 max-w-2xl mx-auto leading-8 text-sm md:text-base">
            牌阵已经洗好。请凭直觉依次选择三张牌，
            选好后点击确认，再进入解读页面。
          </p>

          <div className="flex items-center justify-center gap-3 mt-6 mb-4">
            {[0, 1, 2].map((i) => (
              <div
                key={i}
                className="h-1.5 w-14 rounded-full"
                style={{
                  background: i < selected.length ? "#e7d38b" : "#4b4a63",
                }}
              />
            ))}
          </div>

          <span
            className="inline-block px-4 py-2 rounded-full text-sm"
            style={{
              border: "1px solid rgba(231,211,139,0.30)",
              background: "rgba(20,20,30,0.35)",
              color: "#e5e7eb",
            }}
          >
            已选择 {selected.length} / 3
          </span>
        </header>

        <section className="mb-8">
          <div
            className="relative w-full max-w-[1100px] mx-auto rounded-[28px] overflow-hidden"
            style={{
              background: "rgba(255,255,255,0.02)",
              border: "1px solid rgba(231,211,139,0.10)",
            }}
          >
            <div className="relative w-full aspect-[16/10]">
              <Image
                src="/tarot-fan-78.png"
                alt="Tarot fan spread"
                fill
                className="object-contain select-none pointer-events-none"
                priority
              />

              {hotspots.map((spot) => {
                const picked = selected.find((item) => item.hotspotId === spot.id);

                return (
                  <button
                    key={spot.id}
                    onClick={() => handleSelect(spot.id)}
                    className="absolute"
                    style={{
                      left: spot.left,
                      top: spot.top,
                      width: "72px",
                      height: "122px",
                      transform: `translate(-50%, -50%) rotate(${spot.rotate}deg)`,
                      background: "transparent",
                      border: "none",
                      cursor: "pointer",
                    }}
                    aria-label={`选择第 ${spot.id} 个位置`}
                  >
                    {picked ? (
                      <div
                        style={{
                          width: "72px",
                          height: "122px",
                          borderRadius: "12px",
                          background: "rgba(244, 217, 124, 0.12)",
                          border: "2px solid #f4d97c",
                          boxShadow: "0 0 20px rgba(244,217,124,0.45)",
                          position: "relative",
                          transform: "translateY(-12px)",
                        }}
                      >
                        <div
                          style={{
                            position: "absolute",
                            top: "-12px",
                            left: "50%",
                            transform: "translateX(-50%)",
                            padding: "2px 8px",
                            borderRadius: "999px",
                            fontSize: "10px",
                            fontWeight: 600,
                            background: "#f4d97c",
                            color: "#161616",
                            whiteSpace: "nowrap",
                          }}
                        >
                          第 {picked.order} 张
                        </div>
                      </div>
                    ) : null}
                  </button>
                );
              })}
            </div>
          </div>
        </section>

        <section className="flex flex-col items-center gap-4">
          <div className="text-sm text-zinc-300 text-center">
            你选中的第 1、2、3 张牌将依次对应过去、现在、未来
          </div>

          <div
            className="flex items-center justify-center gap-4 px-4 py-4 rounded-3xl"
            style={{
              background: "rgba(20,20,30,0.65)",
              border: "1px solid rgba(231,211,139,0.18)",
              backdropFilter: "blur(10px)",
            }}
          >
            <button
              onClick={handleRemoveLast}
              disabled={selected.length === 0}
              className="px-5 py-3 rounded-2xl text-sm font-medium transition disabled:opacity-40"
              style={{
                border: "1px solid rgba(231,211,139,0.35)",
                background: "rgba(20,20,30,0.35)",
                color: "#e5e7eb",
              }}
            >
              撤销上一步
            </button>

            <button
              onClick={handleConfirm}
              disabled={selected.length !== 3}
              className="px-5 py-3 rounded-2xl text-sm font-medium transition disabled:opacity-40"
              style={{
                background: "#f4d97c",
                color: "#161616",
              }}
            >
              确认选牌完成
            </button>
          </div>
        </section>
      </div>
    </main>
  );
}