import { tarotDeck, TarotCard } from "../data/tarot";

export type Position = "过去" | "现在" | "未来";
export type Orientation = "正位" | "逆位";

export type DeckCard = {
  uid: string;
  card: TarotCard;
  orientation: Orientation;
};

export type DrawnCard = {
  position: Position;
  orientation: Orientation;
  card: TarotCard;
};

function shuffleArray<T>(array: T[]) {
  const copied = [...array];
  for (let i = copied.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [copied[i], copied[j]] = [copied[j], copied[i]];
  }
  return copied;
}

// 洗出一个带正逆位的牌阵
export function createShuffledDeck(count = 12): DeckCard[] {
  const shuffled = shuffleArray(tarotDeck).slice(0, count);

  return shuffled.map((card, index) => ({
    uid: `${card.id}-${index}-${Math.random().toString(36).slice(2, 8)}`,
    card,
    orientation: Math.random() > 0.5 ? "正位" : "逆位",
  }));
}

// 根据用户选中的三张牌，绑定过去/现在/未来位置
export function buildReadingFromSelection(selectedCards: DeckCard[]): DrawnCard[] {
  const positions: Position[] = ["过去", "现在", "未来"];

  return selectedCards.map((item, index) => ({
    position: positions[index],
    orientation: item.orientation,
    card: item.card,
  }));
}