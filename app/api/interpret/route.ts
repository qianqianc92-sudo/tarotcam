import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { question, cards } = body;

    if (!cards || !Array.isArray(cards) || cards.length !== 3) {
      return NextResponse.json(
        { error: "抽牌结果不完整" },
        { status: 400 }
      );
    }

    const summary = cards
      .map(
        (card: { position: string; name: string; orientation: string }) =>
          `${card.position}：${card.name}（${card.orientation}）`
      )
      .join("\n");

    const fakeInterpretation = `总体解读：
你当前正处在一个需要重新梳理内心状态与现实方向的阶段。三张牌组合在一起，更像是在提醒你：过去的经历仍然影响着你此刻的判断，而未来的突破点在于你是否愿意更清楚地面对真正的问题。

过去：
这张牌说明你过去积累的经验、情绪或某种惯性，依然在影响你现在的状态。它不一定是坏事，但它说明你不是从“空白”出发，而是带着某些过去的印记进入现在。

现在：
现在这张牌强调的是你当前最需要看清的主题。也许是情绪、也许是关系、也许是行动方向。它在提醒你，不要只盯着表面的结果，更要去看自己当下真正卡住的位置。

未来：
未来这张牌并不是绝对预言，而是一种趋势提示。它更像是在说：如果你延续当前的理解方式，事情可能会朝这个方向展开；如果你愿意调整，也会有新的打开方式。

建议：
先不要急着追求一个“立刻正确”的答案，而是把注意力放回你真正想解决的问题本身。明确自己的核心诉求，反而会更快看清下一步。

用户问题：
${question || "未提供问题"}

抽牌结果：
${summary}`;

    return NextResponse.json({
      interpretation: fakeInterpretation,
    });
  } catch (error) {
    console.error("fake interpret error:", error);
    return NextResponse.json(
      { error: "解读生成失败" },
      { status: 500 }
    );
  }
}