# 正经三件套 · 平台卡（Product Hunt / GitHub README / 官网 Landing）

一条贯穿三者的总原则：**aghub 的杀伤力在「具体可验证的事实」**——22+ agents、configure once、key 存 OS keychain、跨 agent 审计、SHA-256 校验。三处都用事实句替代形容词，就天然去 AI 味、去硬广味。对标竞品 README：**cc-switch-cli**（同赛道同技术栈）。

| 维度 | Product Hunt | GitHub README | 官网 Landing |
|---|---|---|---|
| tone/hook | 2 / 3 | 1.5 / 3 | 2 / 3 |
| 读者心态 | 谁做的、为什么做 | 30 秒决定 star/装 | 转化决策 |
| 第一句 | tagline 说清是什么（≤60 字符） | 头两行答 what/who | headline 答 what's in it for me（≤10 词） |
| 最大的雷 | comment 像新闻稿/求票/夸张 tagline | 发布宣言味+emoji 营销 bullet+无截图 | 抽象大字+stock 图+多 CTA |
| 必备视觉 | gallery ≥3 张真实截图 | demo GIF/截图 | 真实产品界面 |

---

## Product Hunt
- **tagline 公式 `动词+结果+轻松感`，≤60 字符，无 emoji 无夸张词**。凡 revolutionary/AI-powered/next-gen 被脑内自动过滤。候选：`Configure MCP, skills and models once — for all your AI agents`（59 字符）；品牌 slogan `One hub for every AI coding agent` 做副标题。
- **maker first comment = 一个真人讲故事**（150-250 词）：你是谁、被什么烦到、为谁做、什么阶段、想要什么反馈。原则 **"Be a person, not a marketing department."** 别在 comment 里求 upvote。
- 打 Open Source tag、挂 GitHub 链接（开源票仓）。gallery 首图=社交预览（能独立说清是什么），尾图=CTA。
- 发布 PST 00:01 工作日，前 4 小时进 Top 4 是目标，全程泡评论区。多次 launch 形成顺风。
- maker comment 钩子：`I use Claude Code, Cursor and Codex daily — and I was copy-pasting the same MCP config into three different files every single week. So I built aghub to configure it once and push it everywhere.`

## GitHub README
- **第一屏 = H1 名字 → 一行 tagline → 少量 badge → demo GIF/截图 → Quick Start**。头两行必须答「这是什么/给谁用」。
- badge：**风格统一**（单个项目用 `flat`，别混 `for-the-badge`——后者是 skill 合集堆数量统计才用的，单 skill 显吵）。挂「信任三件套 + 一枚能力徽章」：`license / stars / last-commit`（有 release 加 version、有 CI 加 build）管信任和活跃，再加**一枚说清「这东西干嘛/兼容啥」的能力徽章**（最高星 skill caveman 的 `works with 30+ agents` 就是这枚，最值钱）。跳过虚荣指标（下载量、覆盖率）；一排数量统计（Skills-355 那种）只有合集才用。
- Quick Start ≤3 条命令 copy-paste 即用；Rust 惯例分层（一键脚本 + 各 OS 手动 + Homebrew + 源码 build）。
- **feature 用表格不用 bullet**（表格可扫），右列写「真实价值」而非功能名复读。
- 一个 `## Why?` 小节（可升到 2 档情绪）：`I use several AI coding agents daily and got tired of re-adding the same MCP servers, skills, models and keys into every one of them. There was no single place to see or manage it all — so I built one.`
- 开场钩子：`**aghub** is a Rust + Tauri tool (CLI + desktop app) that unifies configuration for 22+ AI coding agents. One MCP config → every agent. One skill package → shared anywhere. One audit → all your agents.`
- （aghub 现有 README 有章节错位/重复问题，见 spawn 的清理任务；本卡是重写时的目标形态。）

## 官网 Landing
- **视线动线 headline → subheadline → 视觉 → CTA 固定别打乱**。headline ≤10 词、48-72px；subheadline ≤25 词；**单一主 CTA**（次 CTA 不与主竞争）。
- hero：`One hub for every AI coding agent` + sub 立刻落到可验证事实 `Configure MCP servers, skills, models and keys once — and deploy them across Claude Code, Codex, Cursor, Gemini and 18+ more.` + CTA `Install the CLI` /（次）`Get the desktop app`。
- 痛点区紧跟 hero，第二人称戳中：`You run Claude Code, Cursor, Codex… and you've re-added the same MCP server three times this week.`
- feature 分区（每块配真实截图）：① MCP 一次配置全平台+跨 agent 审计 → ② 可移植 Skills（.skill/SHA-256/skills.sh 市场）→ ③ BYOM+每 agent 独立选模型（key 存 keychain）→ ④ Usage 监控 → ⑤ Claude Code 插件市场。
- 社会证明 kicker：`Works with 22+ agents · Open source · Keys stay in your OS keychain`。

## 反 AI 味 · 三件套共通雷
「随着 AI coding agent 的普及…」时代宏大叙事、🚀 Blazing fast/✨ Seamless/💪 Powerful 营销 bullet、「不仅…而且…/值得一提的是/总而言之」过度承接、stock 图/渐变大字/抽象概念、一屏 4-5 个抢注意力的并列 CTA、全靠文字吹无一张真实界面。
