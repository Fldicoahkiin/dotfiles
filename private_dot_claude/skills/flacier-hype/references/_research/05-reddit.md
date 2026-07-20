# Reddit（r/programming, r/commandline, r/ClaudeAI, r/LocalLLaMA, r/neovim 等 dev 工具向 sub + Show HN 邻近文化）文风简报

> 调研方法说明：Reddit 全域（reddit.com / old.reddit.com）对 Anthropic 抓取器与本环境 WebFetch 均返回 403 / 屏蔽，无法直接抓取真实帖原文与分数。
> 因此本简报的"平台机制、self-promo 规则、Show HN 范式"部分基于可访问的第三方实操指南 [检索所得]，
> "各 subreddit 社区腔调与具体钩子"部分基于对这些社区长期文化的认知 [经验推断]，两者已逐条标注。
> 未编造任何"爆款原文"——文中出现的标题示例，凡标 [经验推断] 者均为按该平台腔调新写的可借用模板，非声称存在的真实爆款。
>
> 主要检索来源：
> - redship.io《Reddit self-promotion rules 2026》
> - shipwithai.substack《4 Steps To Promote Your Side Project On Reddit Without Getting Banned》
> - lucasfcosta.com《How to do a successful Hacker News launch》
> - dev.to《How to Post on Hacker News Without Getting Flagged or Ignored》
> - HN 官方 Show HN guidelines（经二手引述）

---

## 原生语感（这里的人到底怎么说话、什么调性）

这里的人说话是**工程师之间递话，不是台上做 pitch**。第一人称、小写开头、口语、承认权衡（"它慢在 X，但我用它是因为 Y"）——越像同行随口分享越吃香。任何一句读起来像 landing page 的话都会被瞬间识别并嘲讽。Reddit dev 圈的默认心态是"证明给我看，别夸给我听"：他们要能跑、能看源码、能挑刺的东西 [检索所得：HN/Reddit 指南均强调 anti-marketing-speak、technical audience]。真诚的自嘲（"我知道又是一个 config 工具"）和坦率的短板承认，是这里最硬的信任货币 [经验推断]。

---

## 什么内容能起量（越具体越好）

- **"I built X because I was frustrated by Y" 起源故事**：先讲你被什么具体地折磨到（重复配置、来回抄 key），再讲你做了什么。痛点驱动的标题（"i got tired of debugging config files"）是被明确验证的高效结构 [检索所得：shipwithai Step 1]。
- **可跑、可看源码、无注册墙**：开源 + GitHub 链接 + 一条命令能试，是 dev sub 与 Show HN 起量的物理前提。Show HN 开源工具约 "1.4 GitHub stars per upvote" [检索所得：syften/daily.dev]。
- **具体、可量化的标题**："How we reduced API latency by 90%" 胜过 "Improving performance"；技术精确 > 收益吹嘘 [检索所得：dev.to good/bad 对比]。
- **对比表 / "我试了 5 个都不行，所以自己写了"**：dev 圈爱看横向对比和踩坑清单，天然带价值，即使不点链接也有收获 [检索所得：value-first]。
- **发帖后头 60 分钟本人在评论区认真答疑**（尤其接批评时用"数据/推理，不辩护"）——直接决定帖子能否留在页面上 [检索所得：HN 60-min rule、respond with data not defensiveness]。
- **选对 sub**：r/SideProject 本就是给 "I built..." 用的，最宽容；r/commandline、r/neovim 这类工具 sub 对"真做了个能用的 TUI/CLI"接受度高 [经验推断]。

---

## 什么显 AI 味 / 显尬 / 显硬广（要避开的雷）

- **marketing-speak**："revolutionary" "game-changing" "seamless" "powerful" "the best solution for…" —— 立即被判死刑，评论区会专门挂这些词 [检索所得：明确点名 revolutionary/game-changing]。
- **收益导向而非功能导向**："让你效率翻倍"这类，不如直说"一次配 MCP，同步到 22 个 agent" [检索所得]。
- **藏身份 / 结尾偷偷塞链接**：不 disclose 自己是作者会被当场揭穿。反而"Full disclosure: I built this"能提升信任 [检索所得：redship/replyagent]。
- **ALL CAPS、感叹号、emoji 堆料、标题党数字**：HN 与 Reddit dev 圈都反感；HN 官方明令禁止 uppercase/exclamation/praise/编辑化标题 [检索所得]。
- **一稿多投**：同一篇同日 cross-post 到多个 sub = spam 信号，可能触发几乎无法申诉的 shadowban [检索所得：redship]。
- **完成度不够就当大事发**：半成品 / 只有 waitlist / 只有 landing page，会被鄙视 [检索所得：HN 反 "trivial or unfinished"]。
- **过度打磨的排版**：一段一句、加粗满屏、结尾 CTA + emoji 的"内容营销体"，在 dev 圈本身就是 AI/marketing 味的标志 [经验推断]。
- **新号空号直发广告**：无 karma、无历史，直接掉进 spam 过滤 [检索所得：90/10 规则、账号需真实历史]。

---

## 格式与硬约束（篇幅、标题、标签、封面、结构、发布机制）

- **90/10 规则**（全站潜规则）：账号整体活动 ≥90% 真实参与，≤10% 自我推广；发广告前先积累 2-4 周真实互动 [检索所得：redship 等多处]。有的 sub 还有 comment-karma / 账号年龄门槛。
- **标题**：直白、技术、小写口语；说清"这东西是什么/做什么"，不说"它多好"。Show HN 格式为 `Show HN: 名称 – 一句准确的功能描述`（破折号 en dash，不用感叹号）[检索所得]。
- **无封面文化**：Reddit dev sub 与 HN 不靠封面图；一张干净的终端截图 / 短 GIF 演示 > 精修 banner [经验推断]。
- **正文结构（side-project 打法）**：Hook（痛点/起源）→ Value（2-3 段真东西、每段 1-3 句）→ Soft Plug（"顺带一提，我把它开源了"）→ 结尾抛讨论问题 [检索所得：shipwithai 4-step]。
- **链接放评论区**：当 sub 禁正文链接时，把 GitHub 链接放自己的第一条评论，是通行的合规做法 [检索所得：complementary/first-comment trick]。
- **r/programming 特别注意**：以链接文章为主、对纯 self-promo 帖极严，最好用"技术复盘博客文章顺带提到工具"的方式进入，而非直发工具帖 [经验推断，与"限权 self-promo"定性一致]。
- **发帖机制**：不要发完自己去 Discord/群里求赞——刷票会被判定并降权/封号 [检索所得：dev.to]。发完别改标题（可能触发算法惩罚）。

---

## 自我推广的容忍度与原生包装方式

**能不能直接打广告**：分 sub 差异很大。r/SideProject / r/SomebodyMakeThis 类 ≈ "showcase 就是主场"，可以直说"我做了个 X"（但仍需故事和 context，光甩 landing page 照删）[检索所得]。r/commandline / r/neovim / r/ClaudeAI / r/LocalLLaMA 类工具 sub ≈ **能发，但必须是"分享一个能用的东西"而非"卖东西"**，且遵守各自 self-promo 细则 [经验推断]。r/programming ≈ 基本别直发工具，走技术文章路线 [经验推断]。

**原生包装法（把"我做了个工具"讲得不像广告）**：
- **起源故事替代卖点**：把工具讲成"我学习/被折磨的副产品"，只自然提一两次，别当情绪高潮 [检索所得：shipwithai Step 3]。
- **先给价值再露产品**：先交出可复用的经验/踩坑，读者不点链接也有收获，产品作为"顺带"出现 [检索所得]。
- **主动 disclose**："Full disclosure: I'm the author" 反而加分 [检索所得]。
- **同类工具并列**：把自己和已知工具放一起对比（含如实说别家哪里更好），降低"硬广"味并借势 [检索所得：complementary plug]。
- **本人在评论区当人**：认真接批评、给数据、改 bug，比正文任何话都更能建立可信度 [检索所得]。

---

## 3-4 个原生开头钩子示例（针对一个开发者工具，用该平台腔调；均为可借用模板，非真实爆款）[经验推断]

1. `I use 4 different AI coding agents daily and I was tired of re-configuring the same MCP servers and API keys in every single one. So I built a thing.`
   （痛点起源，小写口语，"so I built a thing" 是这里的经典收束）

2. `Show HN: aghub – One place to manage MCP servers, skills and models across 22 AI coding agents`
   （HN 标准格式：前缀 + 名称 + en dash + 准确功能句，无形容词）

3. `Full disclosure, I'm the author. This started because I kept copy-pasting the same skill into Claude Code, Cursor and Codex. It's a Rust/Tauri app + CLI, open source, one config syncs everywhere.`
   （先亮身份 → 具体到令人恼火的动作 → 技术栈 → 开源，全程不夸）

4. `Not another config manager… okay it is a config manager. But hear me out: if you run Claude Code + Codex + Cursor, you're maintaining the same MCP/skill/key config N times. I got fed up and wrote one hub for all of them.`
   （自嘲开场化解"又一个工具"的抵触，Reddit dev 圈特别吃这套）

---

## 真诚⇄炒作该落在第几档

**1.5 档**（1=最真诚克制 … 5=最放飞烂炒）。

理由：Reddit dev sub 与 Show HN 邻近文化是全平台里对炒作**容忍度最低**的一档——marketing-speak 被明确点名处刑，藏身份被当场揭穿，半成品被鄙视，刷票被封号。这里的流量来自"真诚 + 技术可信 + 本人在场答疑"，而不是任何标题技巧。给 1.5 而非纯 1：允许一点点"痛点故事包装"和一句自嘉的 hook（如上面的自嘲开场），这是被验证有效的、且不越界的最小炒作量 [综合检索所得]。任何往 2 档以上走的修辞，在这里都是净负分。

---

## aghub 在这个平台的切入角度（1-2 个具体选题/标题）

**角度 A —— 痛点起源 + 开源工具（主推，投 r/SideProject / r/commandline / r/ClaudeAI）**
- 选题：讲"重度用多个 AI coding agent 后被重复配置折磨到自己写工具"的起源故事，正文给一段真价值（比如"跨 agent 审计 MCP 时我发现哪些 agent 悄悄丢了 SSE transport"这类真实踩坑），GitHub 链接放第一条评论。
- 标题（HN/showcase 通用）：
  `Show HN: aghub – One hub to manage MCP servers, skills and models across 22 AI coding agents`
- 变体（Reddit 口语版，投 r/ClaudeAI）：
  `I built a tool to stop re-configuring MCP servers and skills across Claude Code, Codex and Cursor`

**角度 B —— 技术复盘文章顺带露出（投 r/programming / r/rust）**
- 选题：写一篇"用 Rust + Tauri 2 给 22 个 agent 建统一配置模型踩的坑"的技术博客（adapter/descriptor 驱动、各家格式差异如 OpenCode 把 SSE 和 StreamableHttp 合并成 remote 导致 transport 身份丢失、Claude 的 skills 不进 JSON 而扫 SKILL.md），文末一句话提工具+开源链接。
- 标题：
  `Building one config model for 22 AI coding agents in Rust: what breaks when every agent stores MCP servers differently`
- 说明：r/programming 对纯工具帖不友好，用"有干货的技术文章"这条路才进得去，工具作为副产品自然露出 [经验推断，与该 sub 限权 self-promo 定性一致]。
