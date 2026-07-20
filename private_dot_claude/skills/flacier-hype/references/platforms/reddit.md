# Reddit · 平台卡（英文）

**档位**：语气 1.5 / 钩子 2.5　|　工程师之间递话，不是台上做 pitch。全平台对炒作容忍度最低——marketing-speak 被当场处刑，往 2 档以上走都是净负分。

## 铁律
- **"I built X because I was frustrated by Y" 起源故事**。先讲被什么具体折磨到，再讲做了什么。
- **可跑、可看源码、无注册墙**是 dev sub 与 Show HN 起量的物理前提（Show HN 开源工具约 1.4 star / upvote）。
- **主动 disclose**：`Full disclosure: I'm the author` 反而加分。藏身份会被当场揭穿。
- **发帖后头 60 分钟本人在评论区认真答疑**，接批评用「数据/推理，不辩护」——直接决定帖子存活。
- **90/10**：账号整体 ≥90% 真实参与，≤10% 自我推广；发广告前先积累 2-4 周真实互动。别刷票（几乎无法申诉的 shadowban）。

## 选 sub
- `r/SideProject`、`r/SomebodyMakeThis`：showcase 主场，可直说「我做了个 X」（仍需故事）。
- `r/commandline`、`r/ClaudeAI`、`r/LocalLLaMA`：能发，但必须是「分享一个能用的东西」而非「卖东西」，遵守各自 self-promo 细则。
- `r/programming`、`r/rust`：基本别直发工具，走「技术复盘博客文章顺带提到工具」的路线。
- 别同日 cross-post 到多个 sub（spam 信号）。

## 格式硬约束
- 标题直白、技术、小写口语，说清「是什么/做什么」不说「多好」。Show HN 格式 `Show HN: 名称 – 一句准确功能描述`（en dash，无感叹号）。
- 无封面文化：一张干净终端截图 / 短 GIF > 精修 banner。
- 正文结构：Hook（痛点/起源）→ Value（2-3 段真东西，每段 1-3 句）→ Soft Plug（「顺带一提，开源了」）→ 结尾抛讨论问题。
- 链接放自己的第一条评论（sub 禁正文链接时的通行做法）。发完别改标题。

## 钩子模板（aghub 版，可直接改用）
1. `I use 4 different AI coding agents daily and I was tired of re-configuring the same MCP servers and API keys in every single one. So I built a thing.`
2. `Show HN: aghub – One place to manage MCP servers, skills and models across 22 AI coding agents`
3. `Full disclosure, I'm the author. This started because I kept copy-pasting the same skill into Claude Code, Cursor and Codex. It's a Rust/Tauri app + CLI, open source, one config syncs everywhere.`
4. （自嘲化解「又一个工具」）`Not another config manager… okay it is a config manager. But hear me out: if you run Claude Code + Codex + Cursor, you're maintaining the same MCP/skill/key config N times. I got fed up and wrote one hub for all of them.`

## aghub 选题
- **A（主推·投 r/SideProject / r/commandline / r/ClaudeAI）**：起源故事 + 一段真价值（如「跨 agent 审计 MCP 时发现哪些 agent 悄悄丢了 SSE transport」的真实踩坑），GitHub 链接放第一条评论。标题用上面模板 2 或 `I built a tool to stop re-configuring MCP servers and skills across Claude Code, Codex and Cursor`。
- **B（投 r/programming / r/rust·技术复盘顺带露出）**：写「用 Rust + Tauri 给 22 个 agent 建统一配置模型踩的坑」（各家格式差异、OpenCode 合并 SSE/StreamableHttp 丢 transport 身份、Claude skills 不进 JSON 而扫 SKILL.md），文末一句提工具+开源链接。

## 反 AI 味 · 本平台专属雷
revolutionary/game-changing/seamless/powerful/"the best solution"（评论区专门挂这些词）、收益导向（「效率翻倍」不如「一次配 MCP 同步到 22 个 agent」）、ALL CAPS/感叹号/emoji 堆料、半成品/只有 waitlist 当大事发、一段一句加粗满屏的内容营销体。
