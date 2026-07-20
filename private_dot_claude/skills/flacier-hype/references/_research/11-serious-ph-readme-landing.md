# 正经三件套：Product Hunt + GitHub README + 产品官网 landing 文风简报

> 面向 aghub（One hub for every AI coding agent，Rust + Tauri 的统一 AI coding agent 配置管理器）。
> 调研方法：WebSearch 5 轮（PH tagline / PH maker comment / README best practices / landing hero / 竞品与去 AI 味参考），WebFetch 抓取 4 个真实页面（fmerian PH 指南、DEV「8 条 README 规则」、shuorenhua 去 AI 味 skill、cc-switch-cli README、Papermark 开源 PH 指南）。凡结论标注 `[检索所得]` 或 `[经验推断]`。
> 重要参照物：**cc-switch-cli**（Rust+Tauri，统一管理 Claude Code / Codex / Gemini 的 provider / MCP / skill / prompt / usage）——与 aghub 几乎同赛道同技术栈，是最好的对标 README。

---

# 一、Product Hunt

## 原生语感
PH 是「产品 + 做产品的人」的社区，不是流量场。真正被顶起来的文案有两层：tagline 一句话把「这是什么、解决什么」讲清楚（越具体越好，越像宣传语越死），maker first comment 是一个真实的人在讲「我为什么受不了了所以做了这个」。`[检索所得]` PH 官方和多份指南反复强调：**tagline 里凡是 "revolutionary" / "AI-powered" / "next-gen" 这类词，读者会自动过滤掉当没看见**。这里的人吃「我也天天被这个问题烦」的共鸣，不吃「颠覆行业」。

## 什么内容能起量
- **tagline 遵循 `动词 + 结果 + 时间/轻松感` 公式**。`[检索所得]` 真实高排名例：Aikido Security「Secure everything you build, host, and run」（#1 Product of the Day）；模板级例句「Automate your SEO in 30 seconds」「Turn screenshots into shippable code instantly」。
- **gallery 直接演示 workflow**，不用 stock 图、不用营销拼贴。`[检索所得]` 硬要求：缩略图 240×240，画廊至少 3 张，第一张会当社交预览图（要能独立说清是什么），最后一张放 CTA。
- **maker comment 讲真故事**：你是谁、解决什么问题、为谁做、为什么做、现在什么阶段、想从社区要什么反馈。`[检索所得]` 建议 150-250 字（英文 words），分段/bullet 让人扫得动。
- **发布当天全程泡评论区**。`[检索所得]` Papermark 开源launch 复盘：40% 票来自开源社区（Reddit r/opensource、r/selfhosted、COSS Discord、GitHub 群），且「每个认真给你留言的人都值得一条真实回复」。
- **开源身份要显性标出**：描述里写 Open Source、打 Open Source tag、挂 GitHub 链接——这是开源项目在 PH 的额外票仓。`[检索所得]`
- **多次 launch 制造顺风**。`[检索所得]` 指南普遍认为「launch 多次会形成 tailwind」，第一次不必憋大招。

## 什么显 AI 味 / 显尬 / 显硬广
- tagline 里出现 "AI-powered / revolutionary / seamless / powerful / next-generation / all-in-one platform" —— 直接被脑内过滤。`[检索所得]`
- maker comment 写成「产品部新闻稿」：第三人称吹功能、罗列 feature bullet 却没有一句「我」。指南原话：**"Be a person, not a marketing department."** `[检索所得]`
- **在 first comment 里求 upvote** —— PH 社区明确反感，会反噬。`[检索所得]`
- 开头「在 AI coding agent 爆发的今天……」这类时代宏大铺垫（shuorenhua 明确把「在当今快速发展的人工智能时代」列为 AI 腔标志）。`[检索所得]`
- gallery 放 stock 图、渐变大字 slogan、抽象概念图而不是真实界面。`[检索所得]`

## 格式与硬约束
- **tagline ≤ 60 字符**，无 emoji、无夸张词。`[检索所得]`
- 缩略图 240×240；gallery ≥ 3 张真实截图/GIF；首图 = 社交预览，尾图 = CTA。`[检索所得]`
- maker comment 150-250 词，分段可扫。`[检索所得]`
- **发布时间：太平洋时间 00:01（工作日）**。前 4 小时是关键窗口（此时票数隐藏、首页随机），目标是 4 小时内进 Top 4。`[检索所得]`
- 准备期约提前 1 周：先写好 Twitter 主帖（ROI 最高）、一封单一 CTA 的邮件、给官网/头像加 launch banner。`[检索所得]`

## 自我推广的容忍度与原生包装方式
**可以直接说「我做了个工具」——这就是 PH 的默认动作，没人觉得是广告。** 但包装方式是「个人被痛点逼出来的产物」，不是「我们推出一款平台」。把「我做了个工具」讲得不像广告的关键：主语用「我」、故事从一个具体的烦人时刻开头（不是从功能清单开头）、结尾问社区一个真问题（要反馈而不是要票）。

## 3-4 个原生开头钩子示例（PH 母语腔，可直接借用）
1. `I use Claude Code, Cursor and Codex daily — and I was copy-pasting the same MCP config into three different files every single week. So I built aghub to configure it once and push it everywhere.`
2. `Every time I set up a new machine I lost half a day re-adding the same MCP servers, skills and API keys across ~5 different AI agents. aghub is me finally getting tired of that.`
3. `My "AI coding setup" was 22 tools that all disagreed about where config lives. aghub is one hub that manages all of them — MCP servers, skills, model providers, keys — from a single place.`
4. `I kept auditing my MCP servers agent-by-agent to make sure nothing sketchy slipped in. There was no single place to see them all. Now there is — that's aghub.`

**tagline 候选（≤60 字符，动词+结果）：**
- `One hub for every AI coding agent` （品牌 slogan，做副标题）
- `Configure MCP, skills and models once — for all your AI agents`（59 字符，最贴公式）
- `Manage every AI coding agent's config from one place`

## 真诚⇄炒作落点：**2 档**
理由：PH 允许你直接推自己，所以不必压到最真诚（1 档会显得没自信、不会用平台）；但过度炒作在这里是反效果（tagline 一夸张就被过滤，comment 一像新闻稿就掉分）。2 档 = 真诚故事打底 + 一句克制的价值主张 + 干净的界面演示。

## aghub 在 PH 的切入角度
- **选题 A（最稳）**：把 aghub 定位成「多 agent 用户的配置中枢」，主打 MCP 一次配置全平台部署 + 跨 agent 审计。标题方向：`aghub — configure MCP, skills & models once for all 22 AI coding agents`。maker comment 用钩子 1/2。
- **选题 B（差异化）**：主打「可移植 Skills + 跨 agent 安全审计」这个别人没有的角度，避开「又一个配置切换器」的印象（cc-switch 已占了 switcher 心智）。标题方向：`aghub — portable skills & one-place MCP audit for your AI agents`。

---

# 二、GitHub README

## 原生语感
README 的读者是 30 秒内决定「要不要 star / 要不要装」的开发者。前两行必须回答「这是什么 / 给谁用」，然后立刻上一张真实界面 GIF 或截图。`[检索所得]` DEV 那篇 60k star 复盘第一条就是：**头两行回答 What is this? Why should I care?**，反例是「A tool for developers」，正例是「Open-source Notion alternative with real-time collaboration」。cc-switch-cli 的开场就是标准范式：一句话说清「A cross-platform CLI All-in-One assistant tool for Claude Code, Codex & Gemini CLI」，语气「human-friendly with technical precision」——有 "Uh oh!" 这种口语、有平台限制的诚实免责、有像人写的 FAQ。**README 不是发布宣言，是一份能上手的说明书。**

## 什么内容能起量
- **第一屏 = logo + 名字 + 一句价值主张 + 少量 badge + 一张 demo GIF/截图**。`[检索所得]`
- **badge 只留能建立信任的**：stars（社会证明）、license（法律清晰）、build status（质量）、last commit（在维护）。`[检索所得]` 跳过下载量、覆盖率这类虚荣指标。
- **Quick Start 30 秒可跑，最多 3 条命令**，copy-paste 即用。`[检索所得]` cc-switch-cli 给了「一键安装脚本 + 各 OS 手动 + Homebrew + 源码 build」的分层。
- **feature 用表格不用 bullet**：「Tables are scannable. Bullet lists are not.」表格列出 feature 名 + 真实价值。`[检索所得]`
- **一个「Why / 为什么做这个」小节**建立情感连接——讲你要解决的问题，不是公司口径。`[检索所得]`
- **链接外部文档**，别把所有东西堆进 README。`[检索所得]`

## 什么显 AI 味 / 显尬 / 显硬广
- 开头写成产品发布宣言/时代宏大叙事（「随着 AI coding agent 的普及……」）。shuorenhua 把这类「无源权威铺垫 + 时代开场」直接列为 AI 腔要删。`[检索所得]`
- 大量「工程师腔 / 翻译腔 / 小红书 AI 腔」的堆砌形容词。`[检索所得]`
- feature 用一长串带 emoji 前缀的营销 bullet（🚀 Blazing fast、✨ Seamless、💪 Powerful）——这是最典型的 AI/模板味。
- 「过度承接」句式：每段都用「不仅……而且……」「值得一提的是」「总而言之」串联。`[检索所得]`
- 没有一张真实截图，全靠文字吹。`[检索所得]` 一律要「Show, don't tell」。

## 格式与硬约束
- 第一屏结构固定：`H1 名字` →（可选一行 tagline）→ badge 行 → demo GIF/截图 → Quick Start。`[检索所得]`
- demo GIF 控制在 15-30 秒。`[检索所得]`
- Quick Start ≤ 3 条命令。`[检索所得]`
- feature 表格化；深内容外链（docs / contributing / changelog）。`[检索所得]`
- Rust 项目惯例：安装给 `cargo install` / 一键脚本 / Homebrew / 源码 build 分层（对标 cc-switch-cli）。`[经验推断，与 cc-switch-cli 结构一致]`

## 自我推广的容忍度与原生包装方式
README 里**不存在「打广告」问题**——它本来就是你的项目主页。这里的雷不是「推销」，而是「AI 味/发布宣言味」。原生包装 = 把价值写成可验证的事实句（「configure once, deploy to 22 agents」而不是「revolutionize your AI workflow」），把「为什么做」写成一段人话的痛点自述。

## 3-4 个原生开头钩子示例（README 母语腔）
1. `**aghub** — one hub for every AI coding agent. Manage MCP servers, portable skills, model providers and API keys across Claude Code, Codex, Cursor, Gemini and 18+ more agents — configure once, deploy everywhere.`
2. `If you run more than one AI coding agent, your MCP servers, skills and keys are scattered across a dozen config files that all disagree with each other. aghub keeps them in one place.`
3. `**aghub** is a Rust + Tauri tool (CLI + desktop app) that unifies configuration for 22+ AI coding agents. One MCP config → every agent. One skill package → shared anywhere. One audit → all your agents.`
4.（Why 小节开头）`## Why?` + `I use several AI coding agents daily and got tired of re-adding the same MCP servers, skills, models and keys into every one of them. There was no single place to see or manage it all — so I built one.`

## 真诚⇄炒作落点：**1-2 档**
理由：README 是最该克制的场。开发者对 README 的 bullshit 容忍度最低，一有 AI 味/发布宣言就掉 star。1 档打底（全是可验证事实 + 界面证据），Why 小节允许升到 2 档（一段带情绪的痛点自述）。

## aghub 在 README 的切入角度
- 第一屏 tagline 用 `One hub for every AI coding agent`，紧跟一句可验证事实句（22+ agents、configure once）。
- feature 表格建议列：MCP 一次配置全平台部署 / 跨 agent MCP 审计 / 可移植 Skills（.skill + SHA-256 + skills.sh 市场）/ Claude Code 插件市场 / 自定义 model provider（BYOM，key 存 OS keychain）/ 每 agent 独立选模型 / Usage 监控。每行右列写「真实价值」而非功能名复读。
- 放一张桌面 App 的真实截图（Tauri 界面）+ 一段 CLI 演示 GIF，坐实「不是 vaporware」。

---

# 三、产品官网 Landing

## 原生语感
Landing 的视线动线是固定的：**headline → subheadline → 视觉 → CTA**。`[检索所得]` headline ≤ 10 词、回答「What's in it for me」；subheadline ≤ 25 词补充上下文；CTA 只保留一个主行动（多个竞争 CTA 会显著砍转化）。`[检索所得]` 这里比 PH/README 更「产品化」允许一点设计感和 slogan，但对开发者受众，**hero 仍要具体、可验证，不能是纯抽象概念大字**。

## 什么内容能起量
- **hero = 大 headline（48-72px）+ 一句 subheadline + 单一主 CTA**，CTA 是页面最显眼的元素（高对比色）。`[检索所得]`
- **痛点区**紧跟 hero：把「多 agent 用户重复配置 MCP/skill/model/key」的痛说清楚，让人「这说的就是我」。`[检索所得]`
- **feature 分区**：每个功能配真实截图/交互演示，讲「解决什么问题」而不只是「有什么」。`[检索所得]`
- **社会证明**放 CTA 附近：GitHub stars 数、支持的 agent 数（22+）、开源/跨平台徽章。`[检索所得]` 对开发者，「支持 22 个 agent」「开源」「key 存 OS keychain」本身就是信任指标。
- **渐进披露 + 多处 CTA**：每个决策点附近再放一次「装 CLI / 下载 App / 看 GitHub」。`[检索所得]`

## 什么显 AI 味 / 显尬 / 显硬广
- headline 是抽象概念大字（「The Future of AI Development」）而不是具体价值。`[检索所得]`
- hero 放 stock 插画/抽象渐变，而不是真实产品界面。`[检索所得]`
- 一屏塞 4-5 个并列 CTA（下载/文档/GitHub/Discord/订阅），互相抢注意力。`[检索所得]`
- feature 区全是形容词营销文（seamless / powerful / elegant），没有截图、没有「解决什么问题」。
- 通篇「赋能开发者 / 一站式平台 / 全面管理」这类中文 AI 腔（shuorenhua 明确要删）。`[检索所得]`

## 格式与硬约束
- headline ≤ 10 词、48-72px；subheadline ≤ 25 词；hero 内**单一主 CTA**（至多主+次，且次 CTA 不与主竞争）。`[检索所得]`
- 视线动线 headline→subheadline→视觉→CTA，别打乱。`[检索所得]`
- 移动端优先、可扫（标题/留白/短段）。`[检索所得]`
- 社会证明作为 CTA 旁的 kicker（例：显示支持的 agent 数、stars 数）。`[检索所得]`

## 自我推广的容忍度与原生包装方式
Landing 是你自己的地盘，**推销是本分**，容忍度最高。但对开发者受众，「推销」的正确形态是「用真实界面 + 可验证事实说话」，不是形容词轰炸。把「我做了个工具」讲得不像广告 = hero 讲一句具体价值（configure once for every agent），痛点区用第二人称戳中「你也这样吧」，feature 区每块都有截图坐实。

## 3-4 个原生开头钩子示例（Landing hero 母语腔）
1. **Headline**: `One hub for every AI coding agent` · **Sub**: `Configure MCP servers, skills, models and keys once — and deploy them across Claude Code, Codex, Cursor, Gemini and 18+ more.` · **CTA**: `Install the CLI` / (次) `Get the desktop app`
2. **Headline**: `Stop configuring the same thing 22 times` · **Sub**: `aghub keeps your MCP servers, portable skills and model providers in one place, in sync across every AI coding agent you use.`
3. **Headline**: `Your AI agents, one config` · **Sub**: `One MCP config → every agent. One skill package → shared anywhere. Keys stored in your OS keychain, never in plaintext.`
4. **Headline**: `Manage every AI coding agent from one place` · **Sub**: `Open-source, Rust + Tauri, cross-platform. CLI for your scripts, desktop app for everything else.`

## 真诚⇄炒作落点：**2-3 档**
理由：Landing 是三件套里允许最放开的（自己地盘、要转化）。可以有 slogan、有设计感、CTA 明确。但受众是开发者，超过 3 档（形容词轰炸/抽象大字/多 CTA）反而掉信任。2-3 档 = 一句有记忆点的 headline + 具体可验证的 subheadline + 真实界面 + 单一 CTA。

## aghub 在 Landing 的切入角度
- **hero**：`One hub for every AI coding agent`（保留品牌 slogan）+ subheadline 立刻落到「configure once, deploy to 22+ agents」这个可验证事实。
- **痛点区**：一句第二人称戳中——「You run Claude Code, Cursor, Codex… and you've re-added the same MCP server three times this week.」
- **feature 分区**建议顺序（每块配真实截图）：① MCP 一次配置全平台 + 跨 agent 审计 → ② 可移植 Skills（.skill / SHA-256 / skills.sh 市场）→ ③ 自定义 model provider（BYOM，key 存 OS keychain）+ 每 agent 独立选模型 → ④ Usage 监控 → ⑤ Claude Code 插件市场。
- **社会证明 kicker**：`Works with 22+ agents · Open source · Keys stay in your OS keychain`。

---

# 三平台横向对照（速查）

| 维度 | Product Hunt | GitHub README | 官网 Landing |
|---|---|---|---|
| 读者心态 | 「谁做的、为什么做」 | 30 秒决定 star/装 | 转化决策 |
| 真诚⇄炒作档位 | **2** | **1-2** | **2-3** |
| 能否直接推自己 | 能（默认动作） | 无「推销」概念，怕 AI 味 | 本分，容忍度最高 |
| 第一句要干什么 | tagline 说清是什么（≤60 字符） | 头两行答 what/who | headline 答 what's in it for me（≤10 词） |
| 最大的雷 | comment 像新闻稿 / 求票 / 夸张 tagline | 发布宣言味 + emoji 营销 bullet + 无截图 | 抽象大字 + stock 图 + 多 CTA |
| 必备视觉 | gallery ≥3 张真实截图 | demo GIF/截图 | 真实产品界面 |
| 硬指标 | 缩略图 240×240，PST 00:01 首发 | ≤3 条 Quick Start，feature 用表格 | 单一主 CTA，headline≤10 词 |

**一条贯穿三平台的总原则**：aghub 的杀伤力在「具体可验证的事实」——22+ agents、configure once、key 存 OS keychain、跨 agent 审计、SHA-256 校验。三个平台都用这些事实句替代形容词，就天然去 AI 味、去硬广味。

---

## 来源
- [fmerian / awesome-product-hunt launch guide](https://github.com/fmerian/awesome-product-hunt/blob/main/product-hunt-launch-guide.md)
- [How to launch a developer tool on Product Hunt (Flo Merian, Hackmamba)](https://hackmamba.io/developer-marketing/how-to-launch-on-product-hunt/)
- [How to Write the Perfect Product Hunt First Comment (Uprows Hub)](https://uprowshub.com/campaigns/blog/product-hunt-first-comment-guide)
- [Papermark — launching an Open Source project on Product Hunt](https://www.papermark.com/blog/product-hunt-launch)
- [GitHub README Best Practices: 8 Rules That Got 60k+ Stars (DEV)](https://dev.to/iris1031/github-readme-best-practices-how-to-write-a-readme-that-gets-stars-2gb2)
- [cc-switch-cli README（对标竞品）](https://github.com/saladday/cc-switch-cli)
- [MrGeDiao / shuorenhua 去 AI 味 skill（反 AI 味参照）](https://github.com/MrGeDiao/shuorenhua)
- [Website Hero Section Best Practices (Prismic)](https://prismic.io/blog/website-hero-section)
- [7 Pro Tips for Designing High-Converting Hero Sections (Monet)](https://www.monet.design/blog/posts/hero-section-design-pro-tips)
- [I made a list of 50 best taglines to launch on Product Hunt (Indie Hackers)](https://www.indiehackers.com/post/i-made-a-list-of-50-best-taglines-to-launch-on-product-hunt-4d6b1ad7bd)
