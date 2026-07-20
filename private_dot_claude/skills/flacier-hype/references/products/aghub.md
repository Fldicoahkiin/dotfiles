# 产品底料：aghub

文案的事实来源。写任何平台的稿都从这里取料——数字、卖点、链接、边界，一律以此为准，不临场编。
每要宣发一个新产品，就在 `products/` 下加一份这样的文件。

## 要说的那一件事（写 aghub 就用这条当主线）

**配置是你的。工具应该帮你把它配好、配稳，而不是接管它、替你保管。**

- CC Switch 的托管违背它 → 你失去了对自己配置的所有权（环境变量作废、不能 diff、丢字段、退出不干净）。
- aghub 的每个设计都是它的贯彻 → 增量编辑、不写全局状态、不注册 handler、不驻留后台、可 diff、零残留、key 存 keychain 而非明文。
- 连 `AgentDescriptor` + `ALL_AGENTS` 那套架构都是它对代码的要求 → 哪家 agent 改了格式，我得能一眼找到、干净地改掉。

一篇讲 aghub 的稿，从头到尾都在证这一件事，就有主线了。

## 团队

三人团队。已确认成员之一：**AkaraChen**（GitHub `akarachen`、X `@object_nullll` 显示名「吊顶高松灯」、站点 akr.moe），aghub 挂在他 bio 第一位，X 阵地由他发。宣发口径：团队框架用「我们」，主观体验用「我」，正式 launch @ 另两位。〔另两位成员的 handle 待补。〕

## 一句话

One hub for every AI coding agent —— 一个统一管理所有 AI coding agent 配置的工具。

## 背景（不是开场；主线见下面「差异化」那节）

你同时在用 Claude Code、Codex、Cursor、Copilot、Gemini……每装一个新 agent，就要把 MCP server、skill、模型、API key 重新配一遍，散在十几个工具、十几个路径里。**但宣发别从「重复配置好烦」开场——那是旧路子。** 主线是所有权：配置是你的，工具该帮你配好、不接管（见「差异化：aghub vs CC Switch」）。「重复配置」只当背景，或日常短动态的一个具体由头。

## 是什么

- 形态：CLI（`aghub-cli`）+ Tauri 2 桌面 App，跨平台（Windows / macOS / Linux）。
- 技术栈：Rust + Tauri 2，开源。
- 支持 22+ 个 agent：Claude Code、Codex、Cursor、Windsurf、Copilot、Gemini、OpenCode、Zed、Warp、Cline、RooCode 等。

## 功能（人话版，别照抄 feature 名）

- **MCP 一次配置、全 agent 部署**：配一次 MCP server，推到全部 22+ agent；能一条命令审计所有 agent 装了哪些 server；不删也能临时禁用。
- **Skill 跨 agent 共享**：导入 `.skill` 包或自己写 SKILL.md；通过通用 skills 目录让所有 agent 共用一套 skill；SHA-256 校验内容、记录来源；能从 skills.sh 市场浏览安装。
- **Claude Code 插件市场**：不离开 aghub 就能发现、浏览、安装 Claude Code 插件（v2）；装/更新/启停/卸载全生命周期；全局或按项目 scope。
- **自定义模型 provider（BYOM）**：给 Claude、Codex、OpenCode 接任意推理端点；支持 Anthropic Messages、OpenAI Chat Completions、OpenAI Responses 各种格式；**API key 存在系统原生 keychain，不落明文配置**；每个 agent 单独选 provider 和模型。
- **Usage 用量监控**：看 Claude / Codex 的用量。

## 可晒的事实 / 数据

- 支持的 agent 数量：22+（这是最直观的数字卖点）。
- 已有 release、Homebrew tap（`brew install --cask akarachen/tap/aghub`）、多平台安装包。
- 开源、Rust 写的（技术平台上这两点是信任分）。
- key 存 OS keychain 不落明文——安全意识的证明点。
- GitHub star：约 265（2026-07 调研快照）——集中宣发前拉一次真实数字，下载量/用户数一并补。

## 差异化：aghub vs CC Switch（宣发主线，最强的钩子）

整波宣发的主线不是「重复配置好烦」，而是 **「用了大半年 CC Switch，最后我为什么还是自己写了 aghub」**——一个具体的、设计取向之争的对比。

**CC Switch = 托管**：把 provider 配置收进它自己的一个数据库，以库为准，每次切换把 `settings.json` / `config.toml` 整份重写一遍；你目录下那份配置文件在它眼里只是被覆盖的输出。由此的结构性问题（Flacier 从真实使用中断言，发前逐条确认能背得住）：
- shell 里设的环境变量作废（settings.json 归它写，Claude Code 只认它写进去的值）
- 看不清它改了什么（配置在库里，不是能打开、能 diff 的文本）
- 覆盖手写的东西：没进库的 plugins / MCP / permissions 下次切换可能丢
- 退出不干净：第一次启动就把配置导进库，真正生效的状态从此不在你的文件里
- 内置 provider 列表混入中转站和赞助条目〔发前再核一次是否仍如此〕

**aghub = 增量编辑，不接管**：直接读你现有配置文件，只改你显式指定的那几项，其余原样不动；不写全局状态、不注册 handler、不驻留后台进程；每次变更可追溯，退出删掉对应条目即可、零残留。所有权始终归用户。

框定方式：**「这不是实现缺陷，而是设计取向」**——立场硬但讲理，靠具体技术依据，不做情绪泼冷水。（早期宣发点名竞品有风险，但这是 Flacier 定的主线；每条负面断言都要他能在被质疑时接住。）

## 真实设计与实现（点这些真符号 = 可信，也天然不堆空话）

- 每个 agent 是一个静态的 `AgentDescriptor`：解析、序列化、路径解析、能力声明都以函数指针挂在上面。加一个 agent = 加一个文件 + 注册进 `ALL_AGENTS`，所以能稳定扛 22 个格式各异的 agent。
- Provider **不绑定**到具体 agent，可装到指定 agent 或全部；预设从 **models.dev** 在线拉取，不内置任何商业中转/赞助条目；桌面端检测到 inventory 与 agent 实际写入漂移时主动提示同步。
- agent 特有行为在适配层单独处理：OpenCode 允许 inline API key、Codex 不写 provider env 等。
- MCP 支持 Stdio / SSE / StreamableHttp 三种传输，提供跨 agent 去重视图。
- Skills 支持本地目录、`.skill` 压缩包、GitHub 仓库（含私有凭据）。
- 插件管理对齐 Claude 官方目录布局与命名，aghub 装的插件 Claude Code 直接识别；远程源支持 pin 到具体 git ref 锁版本。
- 三者底层共用一份 `core`，对外暴露桌面、CLI、HTTP API 三套接口。

## 边界 / 还没做（诚实用，别藏）

- Windows 标注 experimental。
- 〔按实际情况补：哪些 agent 支持得不完整、哪些功能还在路上〕
- 诚实讲边界反而加分，尤其 LinuxDo / Reddit / 即刻。

## 链接

- GitHub：https://github.com/akarachen/aghub
- Releases：https://github.com/akarachen/aghub/releases
- 官网：https://aghub.akr.moe
- Homebrew：`brew install --cask akarachen/tap/aghub`
- Product Hunt：已建 product（product_id 1193657）
- 品牌矩阵：AkaraChen 的产品都收在 akr.moe 主域下（aghub.akr.moe、2code/ag.akr.moe、博客 akr.moe），可互相导流。姊妹产品 **2code / Angel Engine**（"The Vibe Coding Workstation" / "All you agent, in one desktop"）。

## slogan / tagline 候选（待定，集中宣发前定一个主用）

- One hub for every AI coding agent.
- 你的 AI coding agent 越装越多，配置该有人统一管了。
- 配一次，推到所有 agent。
- 〔中文主 slogan 待定〕

## 本轮集中宣发要主打的新功能（源自当前开放 PR/issue，发前按实际合并情况勾选）

这批做完就是集中宣发那波的主线。按 2026-07 aghub 开放 PR/issue 梳理：

- **MCP 市场**（PR #286，`mcp-catalog` crate）：站内搜索/安装 MCP，不用手动找。
- **skill 安全扫描 skill-audit**（PR #229 crate + #249 装/导入 UI）：装 skill 前先过一道安全审计。
- **usage 用量监控**（issue #288 菜单栏 + #289 设置 UI，走 ccusage）：看 Claude/Codex 烧了多少。
- **规则 + 提示词库**（PR #279 管 agent instruction 文件 + #278 prompt library，源自 issue #263）。
- **从 CC Switch 导入 provider**（issue #285）：**和主线直接咬合**——aghub 不接管你的配置，还能把 CC Switch 里的 provider 一键搬过来，切换成本几乎为零。是「用了大半年 CC Switch，最后写了 aghub」故事的收尾。
- **UI/交互重构**（PR #322 统一资源列表：分组、多选、拖拽、右键菜单）。
- **全局 hook 管理**（PR #280）。

集中宣发稿的结构 =「这批新功能 + 一句话重新自我介绍（配置归你那句）」，别只堆旧 feature。发前确认哪些已合并进 release。

## 已有素材

- 之前小红书/B站各发过一条，内容少、流量差、新功能没覆盖——视作从零开始，旧稿不复用，但账号还在。
