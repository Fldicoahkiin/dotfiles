# twitter.md 审校

对照 `argument-spine.md` / `say-human.md` / `references/products/aghub.md` / 平台卡 `twitter.md` / 口径参考 `_research/13-x-object-nullll.md` 逐条查。只挑毛病。

口径提醒：本稿是 launch thread，交给 AkaraChen @object_nullll 发，极简英文、真诚 8:2、😇 点睛别滥用。平台卡明确要求 thread 收尾「软 CTA + 链接放这条或首条 reply」——所以第 6 条的链接与署名属结构要件，不按「多余 CTA」判。

---

## 1. 主线（配置是你的、工具帮你配好不接管）

**贯穿，没断。** 把每段第一句连起来是一条论证线：

- 第 11 行（钩子）：「A tool that edits your config files can do one of two things: take them over, or leave them yours.」——立起「接管 vs 归你」这条轴。
- 第 23 行「The usual switcher takes them over.」→ 第 31 行「After that, you don't really own your config anymore.」→ 第 39 行「aghub edits in place.」→ 第 47 行「Same idea all the way down to the code.」→ 第 57 行功能清单落地。

反面（托管）证否 → 后果 → 正面（增量编辑）证成 → 延伸到代码架构（`AgentDescriptor`）。轴从头拉到尾，合格，不用改。

日常单推（第 73-75 行）同轴：「Your config is a file you wrote... should keep it that way」——独立成立，也在主线上。

唯一略松：第 57 行功能清单本身不推进论点，是并排陈列。但前五条已把观点证完，此处作落地展示可接受，未到「断了」的程度。

---

## 2. 多余套路段落

对照 `argument-spine.md`「删掉这些多余的套路段落」逐类查：

- **「诚实讲还没搞定的」义务清单**：无。全稿无独立自我拆台节，也没提 Windows experimental 之类 TODO。**通过。**
- **「适合谁 / 谁不需要」**：无。**通过。**
- **「我们仨做的 / 求 star / 点赞」收尾 CTA**：
  - 第 59 行「If you'd rather your config stay a file you can open and diff, try it 😇」——是平台卡要求的软 CTA，且用主线复述收束（不是空喊「觉得有用给个 star」），**符合 thread 收尾要件，通过。**
  - 第 66 行「Built with @〔待补〕 and @〔待补〕.」——事实库第 8 行明确「正式 launch @ 另两位」，属 launch 署名，不是「工具是我们仨做的求轻喷」式表演谦逊，**通过。**（但占位符未填，见第 6 节事实。）
- **「痛点」式铺垫开场**：无。第 11 行直接从「take over vs leave yours」这个设计取向切入，没有先铺一段「每装一个 agent 就要重配」的痛点。**通过。**

本条无命中。

---

## 3. 黑话大词

逐词扫中文清单（赋能/助力/驱动/抓手/闭环/生态/一站式/沉淀/心智/组合拳/护城河/颗粒度/打通/赛道/破圈/价值释放/能力提升/体验升级）：

**未命中。** 本稿是英文，无上述任何中文充数大词。

英文侧补查平台卡「本平台专属雷」（powerful/seamless/robust/all-in-one 新闻稿腔）：**未命中。** 全稿用词克制——「edits in place」「byte-for-byte」「zero residue」「one static AgentDescriptor」，指得出具体东西，符合 @object_nullll「quiet / real agent work」那派冷淡工具审美。技术词（config、settings.json、config.toml、MCP、AgentDescriptor、ALL_AGENTS、Tauri 2、diff）都是可信度不是黑话。

---

## 4. 营销词

逐词扫（痛点/踩过的坑/钩子/软广/种草/安利/引流）：

**未命中。** 正文无上述任何一词。

注：第 1 行注释 `<!-- ...钩子 3.5... -->`、第 9 行标题「（钩子推 · 配 GIF...）」、第 55 行「软 CTA」——都是写作元数据/分段标注，非正文，发帖不含，不计。

---

## 5. 说人话病灶

逐类查 `say-human.md` 高发病灶：

- **假口语化（谁懂啊/真的会谢/绝绝子）**：无（英文稿，也无对应英文网感套话）。**通过。**
- **先说结论 / 先摆结论 开场**：无提示层。**通过。**
- **总结式收尾（综上/归根结底/本质上）**：无。第 51 行「That's how it carries 22+ agents...」是承接上句的具体推论，不是复读式总结。**通过。**
- **二元对比假戏剧（不是 X 而是 Y）**：
  - 第 11 行「can do one of two things: take them over, or leave them yours」——是「接管 vs 归你」这条**论点轴本身**，全 thread 靠它展开，不是 say-human 规则 4 要杀的事后戏剧化对比。**属论点轴，保留。**
  - 全稿无「This isn't X, it's Y」式补插对比。**通过。**
- **价值拔高（不仅仅是…更是…/真正的 X 不是…）**：无。**通过。**
- **无源引用（研究表明/数据显示）**：
  - 第 24 行「native video 比纯文字多约 10x 互动」——不在正文，是平台卡里的数据，稿里未出现，不计。
  - 正文里第 23 行「The usual switcher takes them over. It pulls your provider config into its own database...」是对 CC Switch 行为的直接断言，非「研究表明」式引用，且有事实库支撑（见第 6 节）。**通过。**
- **自我指涉开场（免得像软广 / 我做了个东西介绍一下）**：无。开篇是技术判断，不是身份自白。**通过。**（注：@object_nullll 本人有「敢自标软广」的习惯，但本稿没走那条，属克制处理，可接受。）
- **表演谦逊（还很糙 / 轻喷 / 求轻喷）**：无。**通过。**

**一处需留意（非病灶，节奏）：** 第 33 行三句连排（「Env vars... You can't diff... Plugins, MCP servers, permissions... can be gone」）句长偏匀、都是「后果罗列」，读起来略平。say-human「节奏不必齐」建议长短句混。非硬伤，想更有呼吸感可打散一句。

---

## 6. 事实核查

对照事实库 `references/products/aghub.md` 逐条：

**占位符未填 —— 命中 1 处（发帖前必处理）：**

- 第 66 行「Built with @〔待补：队友 handle〕 and @〔待补：队友 handle〕.」——两个队友 handle 仍是占位符。事实库第 8 行也标「另两位成员的 handle 待补」。**这不是编造，是缺料；但带占位符发不出去，launch 前必须填实或删掉这行。**

**agent 数字口径 —— 命中 1 处（需统一，非硬错）：**

- 第 57 行「22 and counting」与「Claude Code, Codex, Cursor, Windsurf, Copilot, Gemini, OpenCode, Zed, Warp, Cline, RooCode — 22 and counting」。
- 第 51 行「22+ agents」。
- 事实库统一口径是「22+」（第 22/34/57 行）。
- 「22 and counting」与「22+」语义一致、不算矛盾，但同一 thread 里两种写法并存略松。建议对齐成一种表述。**优先级低。**
- 另核第 57 行点名列表：Claude Code / Codex / Cursor / Windsurf / Copilot / Gemini / OpenCode / Zed / Warp / Cline / RooCode 共 11 家，全部在事实库第 22 行支持列表内，无编造 agent。✅

**CC Switch 负面说法 —— 全部在事实库范围内，逐条对上：**

- 第 23 行「pulls your provider config into its own database, treats that DB as the source of truth, and rewrites settings.json / config.toml in full on every switch」= 事实库第 44 行「把 provider 配置收进它自己的一个数据库，以库为准，每次切换把 settings.json / config.toml 整份重写」。✅
- 第 33 行「Env vars you set in your shell stop counting」= 事实库第 45 行「shell 里设的环境变量作废」。✅
- 第 33 行「You can't diff what it changed — the real state lives in a DB, not text you can open」= 事实库第 46 行「看不清它改了什么（配置在库里，不是能打开、能 diff 的文本）」。✅
- 第 33 行「Plugins, MCP servers, permissions you wrote by hand and never imported can be gone after the next switch」= 事实库第 47 行「没进库的 plugins / MCP / permissions 下次切换可能丢」。✅
- 第 26 行「The file sitting in your directory is just an output it overwrites」= 事实库第 44 行「你目录下那份配置文件在它眼里只是被覆盖的输出」。✅

CC Switch 负面断言无一越界，均可背。**注意：** 本稿**没有**用事实库第 49 行「内置 provider 列表混入中转站和赞助条目」那条（该条自带「发前再核一次是否仍如此」待核标记）——不引这条是稳妥选择，减少发前核实负担，无需补。

**其余事实点核对（均对上，无编造）：**

- 第 39-41 行「edits in place / reads the config file you already have / changes only the entries you named / leaves the rest byte-for-byte / No global state, no handler it registers, nothing left running in the background / Every change is a diff / zero residue」= 事实库第 51 行「增量编辑，不接管：直接读你现有配置文件，只改你显式指定的那几项，其余原样不动；不写全局状态、不注册 handler、不驻留后台进程；每次变更可追溯，退出删掉对应条目即可、零残留」。✅ 逐句对上。
- 第 49 行「Each agent is one static AgentDescriptor — parsing, serializing, paths, capabilities, all hung off function pointers. Adding an agent is one new file plus one line in ALL_AGENTS」= 事实库第 57 行 + CLAUDE.md 架构说明。✅ `AgentDescriptor`、`ALL_AGENTS` 是真符号。
- 第 57 行「CLI plus a Tauri 2 desktop app. Rust, cross-platform, open source」= 事实库第 20-21 行「CLI + Tauri 2 桌面 App，跨平台；Rust + Tauri 2，开源」。✅
- 第 62-64 行链接：`github.com/akarachen/aghub` = 事实库第 73 行 ✅；`aghub.akr.moe` = 事实库第 75 行 ✅；`brew install --cask akarachen/tap/aghub` = 事实库第 76 行 ✅。

**无编造数字。** 稿里没有出现 star 数、下载量等易编的确数（事实库第 38 行标 star「约 265」需发前拉真实数字，稿里没写反而稳妥）。

---

## 7. 总评

**合格（可发，但发帖前须填第 66 行两个队友 handle）。** 主线贯穿、无套路段落、无黑话大词、无营销词、无 powerful/seamless 类平台专属雷；说人话病灶无硬命中（唯一二元对比是论点轴本身）；CC Switch 五条负面断言全部可背、无越界，无编造数字。

**最该改的 3 条（具体到句）：**

1. **第 66 行「Built with @〔待补：队友 handle〕 and @〔待补：队友 handle〕.」填实占位符** —— 两个队友 handle 仍是模板占位，带它发不出去。launch 前填真实 handle，或临时删掉这行。（唯一发帖阻断项，优先级最高）
2. **第 57 行「22 and counting」与第 51 行「22+ agents」统一口径** —— 同一 thread 两种写法并存，建议对齐成事实库口径「22+」。（非矛盾，属打磨，优先级中）
3. **第 33 行三句后果罗列打散节奏** —— 「Env vars... / You can't diff... / Plugins, MCP servers, permissions...」句长偏匀，读起来平。混一句长短句更有呼吸感。（非硬伤，优先级最低）
