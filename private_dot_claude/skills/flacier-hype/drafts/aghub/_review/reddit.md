# 审校 · reddit.md

审校对象：`drafts/aghub/reddit.md`（Reddit · 语气 1.5 / 钩子 2.5，含两帖：① Show HN 版投 r/SideProject，② r/ClaudeAI 口语版）
对照：`references/products/aghub.md`、`references/platforms/reddit.md`、`references/argument-spine.md`、`references/say-human.md`、`SKILL.md`

两帖分别评。

---

## 1. 主线（配置是你的、工具帮你配好不接管）

**结论：两帖主线都在、都贯穿到底，合格。但 ① 首段的抽象框法偏「AI 拼装口」，是全稿最该收的一处。**

**帖 ①**，每段首句连起来是一条论证线：

- 段1「A tool that manages config has two ways to treat the files you already wrote: take them over, or serve them.」→ 立起「接管 vs 服务」的分野。
- 段2「I ran CC Switch for the better part of a year to juggle provider configs, and it takes them over.」→ 竞品落在「接管」这一侧。
- 段3「Once something takes over like that, you don't really own your config anymore.」→ 接管的代价 = 失去所有权（正是 argument-spine 第 23 行的主线）。
- 段4「So I wrote aghub, and it does the opposite.」→ aghub 落在「服务」侧，逐条对应。
- 段5「It's a Rust + Tauri 2 desktop app plus a CLI…」→ 载体与覆盖面。
- 段6「The same idea runs down into the code.」→ 把主线推进到架构层（对应 argument-spine 第 25 行）。
- 段7「The CC Switch behavior above is from running it…」→ 对 claim 的诚实 + 抛讨论问题收尾。

连起来是完整的一条论证线，收尾问题「does anyone want a config tool to be the source of truth」正好回踩主线。**合格。**

**唯一实质问题（① 段1，第 17 行）**：
> 「A tool that manages config has two ways to treat the files you already wrote: take them over, or serve them. Which one it picks mostly decides what kind of tool it is.」
这是「先抛一个二分抽象框架，再往里填」的开法。Reddit 平台卡铁律第一条要的是 **"I built X because I was frustrated by Y" 起源故事**——先讲被什么具体折磨到。这里第一句是抽象命题而非具体起源，起源被推到了段2。虽然论点没错，但首句锐度靠的是「一句漂亮的对仗」（take them over / serve them），不是一个让人一愣的具体事实，与 say-human 第 13 行「提高钩子只能靠更具体的真事，不能靠情绪词和网感话术顶上去」相抵。建议把段2的具体起源提上来当首句，抽象二分句删掉或后置。

**帖 ②**，首句连线同样成立：段1「For most of a year I ran CC Switch…」→ 段2「It keeps your config in its own database and treats that as the truth.」→ 段3「That's not a bug you wait out. It's the design」→ 段4「aghub goes the other way.」→ 段5「Full disclosure, I'm the author…」。② 开门就是起源，比 ① 更合 Reddit 铁律。**合格。**

---

## 2. 多余套路段落

**结论：四类套路段落基本都没有，合格。仅 ① 段5 有「适合谁/功能清单」的擦边堆料，非硬伤。**

- 「诚实讲还没搞定的」义务清单：**无。**（事实库第 67 行有「Windows experimental」等边界，两帖都没硬塞自我拆台清单，符合 argument-spine 第 31 行。正确。）
- 「适合谁 / 谁不需要」：**无独立段落。** 但见下方擦边。
- 「我们仨做的 / 求 star / 点赞」CTA：**无。** 两帖结尾都是「抛讨论问题 + 首评放链接」，没有求 star / 求下载话术。`Full disclosure: I'm the author` 是 Reddit 平台卡要求的 disclose（加分项），不算 CTA。正确。
- 「痛点」式铺垫开场：**②无**（直接起源切入）；**①段1 偏抽象框架**，已在 §1 点明，那不是「你是不是也被折磨」式痛点铺陈，性质更接近「抽象命题开场」，归 §1。
- **擦边（① 段5，第 25 行）**：这一段把「MCP 传输类型 / skills / providers / 22+ agents 列名 / keychain」一口气铺开，接近功能清单堆料。Reddit 平台卡结构要求 Value 段「2-3 段真东西，每段 1-3 句」，此段偏长且信息密度接近 feature dump。**非套路段落硬伤**（内容都是真事实，且服务于「覆盖面」这个论点），但可读性上偏挤，建议瘦身。

---

## 3. 黑话大词

逐词扫（赋能/助力/驱动/抓手/闭环/生态/一站式/沉淀/心智/组合拳/护城河/颗粒度/打通/赛道/破圈/价值释放/能力提升/体验升级，及其英文对应）：

**结论：一个都没有，合格。**

英文稿用词是 `settings.json` / `config.toml` / `diff` / `MCP` / `Stdio / SSE / StreamableHttp` / `AgentDescriptor` / `ALL_AGENTS` / keychain 这类实指名词，无一命中黑话清单。Reddit 平台卡专门挂的 `revolutionary / game-changing / seamless / powerful / the best solution` 也逐个查过，**均未出现**。

---

## 4. 营销词

逐词扫（痛点/踩过的坑/钩子/软广/种草/安利/引流，及英文营销腔）：

**结论：正文无营销行话，合格。**

无 pain point / dead-simple / supercharge / effortless 之类。收益导向词（「效率翻倍」式）也没有——符合 Reddit 平台卡「收益导向是净负分」。

---

## 5. 说人话病灶

逐项扫：

- 假口语化（谁懂啊/真的会谢等，英文对应如 game-changer / trust me bro）：**无。**
- 先说结论 / 先摆结论开场：**无。** 但 ① 段1 是「抽象命题开场」（见 §1），与「先说结论」邻近——它没有预告「结论是」，而是直接抛一个二分判断，判为 §1 主线问题，不重复计。
- 总结式收尾（综上/归根结底 / in conclusion / at the end of the day）：**无。** 两帖都以讨论问题收尾，不是复读总结。
- **二元对比（不是 X 而是 Y / take them over vs serve them）：命中，多处，需留意。**
  - ① 段1「two ways to treat the files…: take them over, or serve them.」（第 17 行）——纯二元对仗开场。
  - ① 段4「So I wrote aghub, and it does the opposite.」（第 23 行）——「反过来做」框架。
  - ① 段3「That's not one bad release. It's the design」（第 21 行）与 ② 段3「That's not a bug you wait out. It's the design」（第 59 行）——**两帖各有一句「不是 X，是 Y」句式**，正是 say-human 第 33 行点名的「不是 A 的问题，是 B 的问题」二元假戏剧结构。
  - 判定：这些对比**有真实技术依据**（对照 CC Switch 的实际行为），语义站得住，不是空洞排比，属可放过一档；但**密度偏高**（① 一帖内 take-over/serve + does the opposite + not…it's the design 三处同构对比叠用），已接近套路感。建议至少删 ① 段1 的裸对仗句，保留后面有实指的那两处即可。这是本条最该收的地方。
- 价值拔高（不仅仅是…更是 / not just…but）：**无。**
- 无源引用（研究表明 / studies show）：**无。**
- 自我指涉开场（免得像软广 / 「这不是广告」）：**无。**（`Full disclosure: I'm the author` 是 Reddit 要求的身份披露，不是「我不是软广」式自我指涉，正确。）
- 表演谦逊（还很糙 / 轻喷）：**无。** ① 段7「so if a recent version does something different I'd rather hear it than be wrong」是对 claim 的诚实（argument-spine 第 40 行认可的真人味），不是表演谦逊。

**本条结论：唯一实质病灶是二元对比密度偏高**，语义都成立但同构句叠了三处，建议削一处。

---

## 6. 事实核对

逐条比对事实库 `references/products/aghub.md`：

**CC Switch 负面说法（对照事实库第 44–49 行，这是唯一权威范围）：**

- ①段2「pulls your provider config into its own database, treats that database as the source of truth, and every switch it rewrites `settings.json` / `config.toml` in full from the DB」（第 19 行）——精确对应事实库第 44 行「收进它自己的一个数据库，以库为准，每次切换把 settings.json / config.toml 整份重写」。**范围内，一致。**
- ①段3「Env vars you set in your shell stop counting, because Claude Code only reads what got written into `settings.json`」（第 21 行）——对应事实库第 46 行。**一致。**
- ①段3「You can't see what it changed, because the live state is in a DB, not a text file you can `diff`」（第 21 行）——对应事实库第 47 行「看不清它改了什么」。**一致。**
- ①段3「a plugin, an MCP server, a permissions block — can be gone after the next switch」（第 21 行）——对应事实库第 47 行「没进库的 plugins / MCP / permissions 下次切换可能丢」。**一致。**
- ②段2「a couple of permissions and MCP entries I'd hand-added just weren't there after a switch」（第 57 行）——同上，**范围内**。这里从泛断言收成「我亲历的一次」，风险更低，正确。
- **两帖都没提事实库第 49 行「内置 provider 列表混入中转站和赞助条目」**——这条事实库标了「〔发前再核一次是否仍如此〕」，稿子主动回避，是稳妥选择，不算漏。
- **disclaimer 到位**：①段7「The CC Switch behavior above is from running it, not from reading its source, so if a recent version does something different I'd rather hear it than be wrong」、②首评「from using it, not reading its source — correct me if a newer version handles it differently」——两帖都给了「基于实际使用、欢迎指正」的护栏，符合 argument-spine 第 40 行「对 claim 的诚实」和 Reddit 平台卡「接批评用数据/推理」。**做得对。**

**其余事实点：**

- 「22+ agents」（①第 25 行 "22+ agents"、②第 61 行 "22+ agents"）——对应事实库第 22、34 行「22+」。**口径一致**（比 jike 稿写死「22 个」更准）。
- agent 列名（Claude Code / Codex / Cursor / Windsurf / Copilot / Gemini / OpenCode / Zed / Warp / Cline / RooCode）——与事实库第 22 行完全一致。正确。
- 「Rust + Tauri 2 desktop app plus a CLI, cross-platform, open source」（①第 25 行）——对应事实库第 20、21 行。**一致。**
- 「MCP servers (Stdio / SSE / StreamableHttp, with a cross-agent view)」（①第 25 行）——对应事实库第 60 行「Stdio / SSE / StreamableHttp 三种传输，提供跨 agent 去重视图」。**一致。**
- 「Provider API keys go into the OS keychain, not plaintext config」（①第 25 行）、②「keys go in the system keychain instead of a plaintext file」（第 61 行）——对应事实库第 29、37 行。**一致。**
- 「Each agent is a static `AgentDescriptor` … Adding an agent is one file plus a line registering it in `ALL_AGENTS`」（①第 27 行）——对应事实库第 57 行，符号名 `AgentDescriptor`、`ALL_AGENTS` 准确。**一致。**
- 首评括号里的三条 agent 特有行为（①第 40 行）：「Claude drops URL-type MCP servers on serialize」「OpenCode collapses SSE and StreamableHttp into one "type": "remote"」「Codex is TOML and stdio-only」——与项目 CLAUDE.md「Agent-Specific Behavior」一致（Claude URL-based MCP silently skipped on serialize、OpenCode SSE/StreamableHttp 统一为 remote、Codex TOML）。**准确。**
- 链接：`github.com/akarachen/aghub`、`aghub.akr.moe`、`brew install --cask akarachen/tap/aghub`——对应事实库第 73–76 行。**一致。**

**未发现编造的数字或断言。事实核对合格。**

**一处口径提醒（非事实错误）**：事实库把 CC Switch 描述为管 **provider 配置**（第 44 行「provider 配置」）；①段3 把「a plugin, an MCP server, a permissions block」也算进「会被下次切换清掉」的范围，事实库第 47 行确实列了 plugins/MCP/permissions，所以在范围内。但 ①段2 先说它只「pulls your provider config into its own database」，段3 又说非 provider 的手写项（plugin/MCP/permissions）会丢——读者可能追问：既然它只收 provider 配置进库，为什么整份重写 `settings.json` 会波及 plugin/permissions?这一步的因果稿子没交代（答案是「整份重写 settings.json 时会覆盖掉库里没有的手写项」，事实库第 44+47 行合起来能撑住）。**不是编造，是论证链有一环留白**，头 60 分钟答疑时若被追问要接得住。建议 ①段2 或段3 补半句点明「full rewrite means anything not in the DB gets dropped」。

---

## 7. 总评

**合格**（两帖事实准确、主线清晰、无黑话无营销词无假口语化，符合 Reddit 语气 1.5 / 钩子 2.5，CC Switch 负面说法全部落在事实库范围内且带了「基于实际使用、欢迎指正」的护栏）。可发，但 ① 建议按下面第 1、2 条改一版再投。

最该改的 3 条（第 1 条建议改，2/3 锦上添花）：

1. **① 首句（第 17 行）用抽象二分对仗开场，违 Reddit「先讲被什么具体折磨到」铁律。**
   当前：「A tool that manages config has two ways to treat the files you already wrote: take them over, or serve them.」——漂亮但抽象。建议把段2的具体起源「I ran CC Switch for the better part of a year… and it takes them over」提上来当第一句，删掉或后置这句二元对仗。② 的开法（直接起源）就是正确示范，① 应向它看齐。

2. **二元对比同构句在 ① 内叠了三处（第 17、21、23 行），密度偏高、开始有套路感。**
   take them over / serve them（段1）+ does the opposite（段4）+ not one bad release, it's the design（段3）。后两处有实指、可留；建议删段1那句裸对仗（与第 1 条同一处），一石二鸟。② 只有一处「not a bug… it's the design」（第 59 行），无需动。

3. **① 段5 功能清单偏挤（第 25 行）+ 段2「只收 provider 配置进库」到段3「plugin/permissions 也会丢」有一环因果留白（第 19、21 行）。**
   前者建议把「MCP 传输类型 + skills + providers + 22+ 列名 + keychain」拆成两短句或砍掉次要项，贴合 Reddit「每段 1-3 句」；后者建议补半句「a full rewrite drops anything not in the DB」，把因果补上，免得头 60 分钟答疑被追问卡住。
