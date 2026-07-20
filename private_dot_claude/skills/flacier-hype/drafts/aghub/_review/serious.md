# serious.md 审校

对照 `argument-spine.md` / `say-human.md` / `references/products/aghub.md` / 研究简报 `_research/11-serious-ph-readme-landing.md` 逐条查。三件套（Product Hunt + README + Landing hero），主体英文。只挑毛病。

---

## 1. 主线（配置是你的、工具帮你配好不接管）

**贯穿，没断。** 三块各自独立成篇，但都收敛到同一条轴，且轴的方向一致。

把每块的第一句连起来：

- 顶部第5行总纲：「配置是你的。工具应该帮你把它配好、配稳，而不是接管它、替你保管。」——直接抄的 spine 观点句，轴立在明面。
- ① PH maker comment（第26行首句）：从「switcher 靠接管来管配置」进入 → 第30行「hold the config, overwrite the files」把它框成设计取向 → 第32行「aghub does the opposite」正面证成。
- ② README（第60行 Why 首句）：同一条轴重讲一遍——第60行「did it by taking over」→ 第62行「Once a tool holds your config, it stops being yours」→ 第64行「aghub doesn't hold your config — it edits it in place」。
- ③ Landing（第75行 headline「It edits your config. It never takes it over.」）：把整条轴压成一句 headline。

三块的第一句连起来是一条论证线：接管 vs 编辑 → 托管让配置不再属于你 → aghub 反过来做。反面（CC Switch 托管）证否、正面（增量编辑）证成，从 tagline 到 headline 都咬着这一件事。主线合格，不用改。

一处需留意（非断线）：README Why（第60-62行）与 PH maker comment（第26-30行）几乎是同一段的两次表述，连措辞都近乎复制（both: 「rewrote settings.json and config.toml in full on every switch」「A held config is one you're trusting something else to keep safe」）。同一份文件内三件套并列、受众不同（PH 读者 vs README 读者不重叠），复用可接受；但若担心有人同时刷到 PH 和 README，`voice-dna.md`「跨平台别复读同一句」的精神也适用——建议 README Why 换一个别的真细节开场（如 skill 从 Cursor 搬不到 Claude、审计翻出忘删的 server），别与 PH 逐句同形。

---

## 2. 多余套路段落

对照 `argument-spine.md`「删掉这些多余的套路段落」逐类查：

- **「诚实讲还没搞定的」义务清单**：无独立成节的自我拆台。全篇没有 Windows experimental / 支持不全的 TODO 收尾。**通过。**
- **「适合谁 / 谁不需要」**：无。**通过。**
- **「我们仨做的 / 求 star / 点赞」收尾 CTA**：
  - 署名 @ 队友（第36行「— Flacier, with @AkaraChen and 〔待补〕」）属正式 launch 要件，`voice-dna.md` 明确「正式 launch @ 另两位」，不算多余 CTA。**通过。**
  - PH 结尾第34行「I'd like to hear where it breaks for you. Repo's linked below.」是要反馈 + 给链接，不是求 upvote/star。研究简报第25行专门警告「在 first comment 里求 upvote 会反噬」——本稿正好避开了，反而是加分项。**通过。**
  - README / Landing 均无求 star、求点赞收尾。**通过。**
- **「痛点」式铺垫开场**：
  - PH、README 都从「switcher 靠接管」这个技术取向直接进，没有先铺一段「每装一个 agent 就要重配」的痛点。**通过。**
  - Landing 有一块显式的「痛点区」（第95-99行），但这是研究简报第112行 landing 结构里明确要求的固定区块（痛点区紧跟 hero），是页面组件不是开场铺垫，且用第二人称写具体场景（rewrote your settings.json from a copy），不是抽象痛点。**属结构要件，通过。**

本条无命中。注：第95行标题「痛点区」三字是写作元数据/结构标签，不是正文文案，发布不含，不计违规——但见第 4 条。

---

## 3. 黑话大词

逐词扫（赋能/助力/驱动/抓手/闭环/生态/一站式/沉淀/心智/组合拳/护城河/颗粒度/打通/赛道/破圈/价值释放/能力提升/体验升级）：

**未命中。** 全篇（含中文注释）没有出现上述任何一个充数大词。英文正文也无对应的 seamless / powerful / revolutionary / all-in-one / next-gen（研究简报第23行点名 PH 会脑内过滤的词），本稿一个都没用。

技术词（MCP、Tauri、`settings.json`、`config.toml`、diff、handler、Rust CLI、SHA-256、keychain）都指得出具体东西，属可信度不属黑话。

---

## 4. 营销词

逐词扫（痛点/踩过的坑/钩子/软广/种草/安利/引流）：

**命中 1 处：**

- 第95行 Landing 区块标题写的是「**痛点区**（紧跟 hero，第二人称）」——正文文案不含，但「痛点」二字作为结构标签出现在成品文件里。`say-human.md` 病灶 12 明确「文案里出现『痛点/踩过的坑/钩子/软广』这些做营销的人的词」要删。
  - 判定：这是给排版者看的结构标注（同类的还有第90行「社会证明 kicker」、第84行「主 CTA」），不会进最终页面，属工作稿注释而非文案本身，**不构成对读者的营销词泄露**。但既然全篇其他结构标签都用中性词（headline / subheadline / kicker / CTA），唯独这里用了「痛点」，口径不齐，**建议改成中性的「问题区 / pain section」**，与其余标签统一，也免得复制进 CMS 时带出来。
  - 顶部注释第1行 `<!-- 语气 2/3 · 钩子 2/3 -->` 里的「钩子」同理是写作元数据，不计。

其余营销词（踩过的坑/软广/种草/安利/引流）**未命中**。

---

## 5. 说人话病灶

逐类查 `say-human.md` 高发病灶：

- **假口语化（谁懂啊/真的会谢/绝绝子）**：无。英文也无网红话术。**通过。**
- **先说结论 / 先摆结论 开场**：无提示层。**通过。**
- **总结式收尾（综上/归根结底/本质上/In conclusion）**：无。**通过。**
- **二元对比假戏剧（不是 X 而是 Y）**：需点出两处，性质不同——
  - 第30行 PH：「This is the design talking, not one bad release」。这是「是 X，不是 Y」变体。但它承载真实判断（这是设计取向问题、不是某个坏版本），是论点框定（研究简报/spine 都要求把竞品对比做成「这是设计取向不是实现缺陷」），**属该保留的立场句，不是空戏剧。通过。**
  - 第75行 headline「It edits your config. It never takes it over.」——两句对照，是论点轴本身的正/反陈述，不是「不是 X 而是 Y」病灶句式。**通过。**
- **价值拔高（不仅仅是…更是…/真正的 X 不是…）**：无「不仅…更是」骨架。**通过。**
- **无源引用（研究表明/数据显示/业内人士）**：无。**通过。**
- **自我指涉开场（免得像软广 / 我做了个东西介绍一下）**：
  - PH 第24行「I'm Flacier, one of three people behind aghub.」——这是 PH 平台的默认动作（研究简报第37行：PH 就吃「我做了个工具」，主语用「我」是正门），且紧接第26行立刻进具体故事（run Claude/Cursor/Codex → 试了 switcher），不是「宣布自己不是广告」式的自我指涉。**符合平台语域，通过。**
- **表演谦逊（还很糙 / 轻喷 / 求轻喷）**：无。全篇姿态自信，无「还很糙」类。**通过。**
- **句长均匀 / 排比堆叠**：PH maker comment 长短句交替，有呼吸感（第32行「It writes no global state, registers no handler, runs no background process.」三连短句是有意的节奏，不是机械排比）。**通过。**

本条唯一需处理：无硬伤。第30行的立场句属该留。

---

## 6. 事实核查

对照事实库 `references/products/aghub.md` 与研究简报逐条：

**编造的数字 / 自相矛盾 —— 无命中。** 全篇数字只有「22+」「18+ more」「three people」，无临场编的确数。

- 「22+ agents」（第16行 tagline、第32行、第54行、第92行）= 事实库第22/34/57行统一口径。✅
- 「Gemini and 18+ more」（第81行 subheadline）：headline 处列了 Claude Code / Codex / Cursor / Gemini 四家 + 18 = 22，与「22+」自洽。✅
- 「one of three people / three people behind aghub」（第24行）= 事实库第7行「三人团队」。✅
- 第36行「with @AkaraChen and 〔待补：第三位队友 handle〕」= 事实库第8行第三位待补，占位符如实标注，未编造 handle。✅

**CC Switch 负面说法 —— 全部在事实库范围内，逐条对上，且比事实库还保守（少用一条）：**

- 第26行「kept the real config in its own database, treated that as the source of truth, and rewrote `settings.json` and `config.toml` in full on every switch」= 事实库第44行。✅
- 第28行「environment variables I set in my shell stopped taking effect, because Claude Code only read what the tool wrote」= 事实库第45行。✅
- 第28行「config lived in its database, not in a file I could open and diff」= 事实库第46行。✅
- 第28行「Plugins, MCP servers and permissions I'd added by hand and never imported would quietly go missing on the next switch」= 事实库第47行。✅
- 第30行「hold the config, overwrite the files」+「a held config is one you're trusting something else to keep safe」= 事实库第48/51行的概括，属设计取向框定。✅
- README 第60/62行为同批断言的复述，同样在范围内。✅
- **注意（正面）**：事实库第49行「内置 provider 列表混入中转站和赞助条目〔发前再核〕」这一条负面断言，serious.md **没有使用**。这是最需要发前二次核实、风险最高的一条，本稿主动避开，稳妥。**无越界。**

框定方式符合要求：第30行「This is the design talking, not one bad release」正是事实库第53行/研究简报要求的「这不是实现缺陷，而是设计取向」——立场硬但讲理，未做情绪泼冷水。✅

**其余事实点核对（均对上，无编造）：**

- 「Rust CLI plus a Tauri desktop app, open source」（第32行）/「Rust + Tauri tool — a CLI and a desktop app」（第54行）= 事实库第20/21行。✅
- 「writes no global state, registers no handler, runs no background process」（第32/64行）= 事实库第51行「不写全局状态、不注册 handler、不驻留后台进程」。✅
- 「every change is a diff you can read, and deleting an entry leaves nothing behind」（第32/54/64行）= 事实库第51行「可追溯、退出删条目零残留」。✅
- Landing feature 分区（第101行）：「MCP 一次配置到全平台 + 跨 agent 审计」「.skill / SHA-256 校验 / skills.sh 市场」「key 存 OS 钥匙串」「Claude Code 插件市场」= 事实库第26-29行，逐项对上。✅
- 第101行末「涉及本轮新功能处 〔待补：本轮新功能〕」= 事实库第87-89行本轮新功能待填，占位符如实标注。✅

**两处需留意（非硬错，建议发前确认）：**

1. **badge 用了 `release` 没用 `stars`**（README 第49-52行：release / build / last-commit / license）。研究简报第66行 badge 信任向清单是「stars（社会证明）/ license / build / last commit」，并未列 release。事实库第38行明确 star 约 265 是可晒的社会证明。当前 badge 组缺了最直接的社会证明项（stars）。不算错，但**建议补一个 stars badge**，符合研究简报的信任向组合。（另：第50行 build badge 的 workflow 文件名硬编码为 `ci.yml`，第67行注释也说指向已有的 `.github/workflows/ci.yml`——发前需确认该路径真实存在，否则 badge 会红。）

2. **Landing feature 第101行「BYOM，每个 agent 单独选模型」的口径边界**。事实库第29行 BYOM 明确限定为「给 Claude、Codex、OpenCode 接任意推理端点……每个 agent 单独选 provider 和模型」——只覆盖三家。第101行「每个 agent 单独选模型」放在「22+ agents」的语境里，易被读成「全部 22+ 个 agent 都能单独选模型」。**建议核实并补一句限定**（如「for Claude / Codex / OpenCode」），避免暗示 BYOM 覆盖全部 agent。（与 linuxdo 稿同类问题。）

---

## 7. 总评

**合格（可发）。** 主线三块同轴、无套路段落、无黑话大词、说人话病灶无硬伤，事实层面 CC Switch 负面断言全部可背、且主动避开了风险最高的一条。整体是三件套里最干净的一稿。

**最该改的 3 条（具体到句）：**

1. **README badge 补 stars、核 build 路径**（第49-52行） —— 缺最直接的社会证明项（star 约 265，事实库第38行可晒）；第50行 build badge 硬编码 `ci.yml`，发前确认 `.github/workflows/ci.yml` 真实存在，否则 badge 变红反减信任。（优先级最高，直接影响 README 第一屏可信度）

2. **Landing feature「BYOM，每个 agent 单独选模型」核口径**（第101行） —— 事实库 BYOM 只覆盖 Claude / Codex / OpenCode 三家，放在「22+」语境易被读成全覆盖；补一句限定或改述。（优先级次高，避免事实被读歪）

3. **README Why 与 PH maker comment 换开场细节**（第60-62行 vs 第26-30行） —— 两段近乎逐句同形（settings.json/config.toml、「a held config is one you're trusting…」），同一份文件内可接受，但若担心有人同时刷到，按 `voice-dna.md`「跨平台别复读同一句」换 README 一个别的真细节开场。（优先级最低，属打磨）

另附一处口径统一建议（非上榜）：第95行结构标签「痛点区」改为中性词（如「问题区 / pain section」），与全篇其余结构标签（headline / kicker / CTA）对齐，也免得营销词随复制带进最终页面。
