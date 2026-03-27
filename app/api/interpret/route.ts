import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { question, cards } = body;

    const summary = cards
      .map(
        (card: { position: string; name: string; orientation: string }) =>
          `${card.position}：${card.name}（${card.orientation}）`
      )
      .join("\n");

    const fakeInterpretation = `总体解读：
你当前正处在一个需要重新梳理内在状态与外部选择的阶段。这组三张牌更像是在提示你，过去的经验正在影响你此刻的判断，而未来的关键在于你是否愿意更清楚地面对真正的问题。

分位置解读：
过去：这张牌说明你的过往经历对现在的心态有明显影响，可能留下了某种习惯、情绪或判断模式。
现在：你此刻最重要的主题，是认真看待自己正在面对的局面，并且停止模糊化处理。
未来：未来并不是被固定决定的，而是在提醒你，只要你愿意调整思路，局面会出现新的理解方式。

建议：
不要急着追求一个立刻的答案，先把注意力放回你真正想问的核心问题上。

用户问题：
${question || "未提供"}

抽牌结果：
${summary}`;

    return NextResponse.json({
      interpretation: fakeInterpretation,
    });
  } catch (error) {
    return NextResponse.json({ error: "解读生成失败" }, { status: 500 });
  }
}