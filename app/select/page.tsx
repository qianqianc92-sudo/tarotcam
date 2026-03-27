"use client";

import { useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import { buildReadingFromSelection, createShuffledDeck, DeckCard } from "../lib/draw";

export default function SelectPage() {
  const router = useRouter();
  const deck = useMemo(() => createShuffledDeck(78), []);
  const [selected, setSelected] = useState<DeckCard[]>([]);

  const handleSelectCard = (deckCard: DeckCard) => {
    const alreadySelected = selected.some((item) => item.uid === deckCard.uid);
    if (alreadySelected || selected.length >= 3) return;

    const nextSelected = [...selected, deckCard];
    setSelected(nextSelected);

    if (nextSelected.length === 3) {
      const finalReading = buildReadingFromSelection(nextSelected);
      localStorage.setItem("tarot-reading-result", JSON.stringify(finalReading));

      setTimeout(() => {
        router.push("/reading");
      }, 500);
    }
  };

  const total = deck.length;

  return (
    <main
      className="min-h-screen text-white px-4 py-8"
      style={{
        background: "#1b1a2e",
      }}
    >
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-6">
          <p
            className="text-xs mb-2"
            style={{ letterSpacing: "0.35em", color: "#d7c27a" }}
          >
            TAROT SPREAD
          </p>
          <h1 className="text-4xl md:text-5xl font-bold mb-3">选择三张牌</h1>
          <p className="text-zinc-300 max-w-2xl mx-auto leading-8 text-sm md:text-base">
            牌阵已经洗好。请凭直觉从弧形牌阵中依次选择三张牌，
            它们将分别对应过去、现在与未来。
          </p>
        </div>

        <div className="flex items-center justify-center gap-3 mb-4">
          {[0, 1, 2].map((i) => (
            <div
              key={i}
              className="h-1 w-14 rounded-full"
              style={{
                background: i < selected.length ? "#e7d38b" : "#4b4a63",
              }}
            />
          ))}
        </div>

        <div className="text-center mb-8">
          <span
            className="inline-block px-4 py-2 rounded-full text-sm"
            style={{
              border: "1px solid rgba(231,211,139,0.35)",
              background: "rgba(20,20,30,0.35)",
              color: "#e5e7eb",
            }}
          >
            已选择 {selected.length} / 3
          </span>
        </div>

        <div className="overflow-x-auto overflow-y-hidden">
          <div
            className="relative mx-auto"
            style={{
                  width: "1500px",
                   height: "520px",
            }}
          >
            {deck.map((deckCard, index) => {
              const progress = total === 1 ? 0.5 : index / (total - 1);

              // 单条弧形：从左下到右下
            const startDeg = 222;
const endDeg = 318;
const deg = startDeg + (endDeg - startDeg) * progress;
const rad = (deg * Math.PI) / 180;

const radius = 980;
const centerX = 750;
const centerY = 1100;

const x = centerX + radius * Math.cos(rad);
const y = centerY + radius * Math.sin(rad);
const rotate = deg + 90;

              const isSelected = selected.some((item) => item.uid === deckCard.uid);
              const selectedOrder = selected.findIndex((item) => item.uid === deckCard.uid);

              return (
                <button
                  key={deckCard.uid}
                  onClick={() => handleSelectCard(deckCard)}
                  disabled={selected.length >= 3 && !isSelected}
                  className="absolute transition"
                  style={{
                    left: `${x}px`,
                    top: `${y}px`,
                   width: "72px",
                    height: "124px",
                    transform: `translate(-50%, -50%) rotate(${rotate}deg) ${
                      isSelected ? "translateY(-18px)" : ""
                    }`,
                    transformOrigin: "center center",
                    zIndex: isSelected ? 300 : index + 1,
                    cursor: "pointer",
                  }}
                >
                  <div
                    style={{
                      width: "86px",
                      height: "148px",
                      borderRadius: "14px",
                      background: "#d9d9e2",
                      border: isSelected
                        ? "2px solid #f4d97c"
                        : "1.5px solid rgba(80,80,100,0.65)",
                      boxShadow: isSelected
                        ? "0 0 24px rgba(244,217,124,0.45)"
                        : "0 6px 16px rgba(0,0,0,0.22)",
                      position: "relative",
                      overflow: "hidden",
                    }}
                  >
                    <div
                      style={{
                        position: "absolute",
                        inset: "6px",
                        borderRadius: "10px",
                        border: "1px solid rgba(120,120,140,0.45)",
                      }}
                    />

                    <div
                      style={{
                        position: "absolute",
                        inset: "16px",
                        borderRadius: "8px",
                        border: "1px solid rgba(130,130,150,0.28)",
                      }}
                    />

                    <div
                      style={{
                        position: "absolute",
                        top: "12px",
                        left: "50%",
                        transform: "translateX(-50%)",
                        width: "8px",
                        height: "8px",
                        borderRadius: "999px",
                        border: "1px solid rgba(110,110,130,0.55)",
                      }}
                    />
                    <div
                      style={{
                        position: "absolute",
                        bottom: "12px",
                        left: "50%",
                        transform: "translateX(-50%)",
                        width: "8px",
                        height: "8px",
                        borderRadius: "999px",
                        border: "1px solid rgba(110,110,130,0.55)",
                      }}
                    />

                    <div
                      style={{
                        position: "absolute",
                        inset: 0,
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                      }}
                    >
                      <div
                        style={{
                          position: "relative",
                          width: "42px",
                          height: "42px",
                        }}
                      >
                        <div
                          style={{
                            position: "absolute",
                            left: "50%",
                            top: 0,
                            transform: "translateX(-50%)",
                            width: "1px",
                            height: "42px",
                            background: "rgba(90,90,110,0.55)",
                          }}
                        />
                        <div
                          style={{
                            position: "absolute",
                            top: "50%",
                            left: 0,
                            transform: "translateY(-50%)",
                            width: "42px",
                            height: "1px",
                            background: "rgba(90,90,110,0.35)",
                          }}
                        />
                        <div
                          style={{
                            position: "absolute",
                            top: "50%",
                            left: "50%",
                            transform: "translate(-50%, -50%)",
                            width: "14px",
                            height: "14px",
                            borderRadius: "999px",
                            border: "1px solid rgba(90,90,110,0.65)",
                          }}
                        />
                      </div>
                    </div>

                    {isSelected && (
                      <div
                        style={{
                          position: "absolute",
                          top: "-10px",
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
                        第 {selectedOrder + 1} 张
                      </div>
                    )}
                  </div>
                </button>
              );
            })}
          </div>
        </div>

        <div className="mt-4 text-center text-sm text-zinc-300">
          你选中的第 1、2、3 张牌将依次对应过去、现在、未来。
        </div>
      </div>
    </main>
  );
}