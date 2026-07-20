<!-- 平台坐标：知乎 · tone 2.5 / hook 3.5 · 切入点=各家配置格式不统一 → 谁来管、该不该接管你的文件 · 回答+专栏双发 -->

**标题（专栏用）：2026 我同时用了 6 个 AI 编程 Agent，一份 MCP 配置抄了四遍还漏一个｜附各家格式对比表**

---

我电脑上常驻的 AI coding agent 有六个：Claude Code、Codex、Cursor、Windsurf、Copilot、OpenCode。各有各的活，谁擅长什么用久了心里有数，选工具这件事对我早就不纠结。

真正磨人的是另一件，几乎没人正经聊：这几个工具，配置格式没有一个是一样的。

上周我写了个查数据库 schema 的 MCP server，想让六个 agent 都能调它。听着像复制粘贴的活，我干了一个下午。Claude Code 把 MCP 写在 `~/.claude.json`，OpenCode 是 `~/.config/opencode/opencode.json` 里一个叫 `mcp` 的对象，Codex 直接是 `~/.codex/config.toml`——连数据格式都从 JSON 换成了 TOML。抄到第四个我已经记不清前两个填的是不是同一个 token，最后还漏了一个，调了半天才发现那个 agent 根本没装上。

那天之后我把各家配置到底长什么样研究了一圈，先讲「同时用一堆 agent 到底难在哪」。末尾会提我做的一个开源工具，也会给纯手动的做法——不感兴趣，前面这些照样够用。

## 为什么「抄一遍配置」这么难

各家格式要是统一，这就不是问题。难在同一个 MCP server，在不同 agent 里写法差得离谱。我按自己确认过的情况拉一张表：

| 维度 | Claude Code | OpenCode | Codex | Cursor / Windsurf |
|---|---|---|---|---|
| MCP 配置文件 | `~/.claude.json` | `~/.config/opencode/opencode.json` | `~/.codex/config.toml` | `.cursor/mcp.json` 等各自 JSON |
| 数据格式 | JSON | JSON | **TOML** | JSON |
| MCP 挂在哪个 key | `mcpServers` 对象 | `mcp` 对象（不是数组） | `[mcp_servers.xxx]` 段 | `mcpServers` 对象 |
| 远程 MCP（SSE/HTTP） | 支持 | 支持，但 SSE 和 HTTP 被**合并成一种** | **不支持**，只吃 stdio | 支持 |
| Skill 放哪 | 扫 `~/.claude/skills/` 里的 SKILL.md | 有自己的 skills 目录 | 有自己的 skills 目录 | `.cursor/skills` 等 |

表里两处，是我对着源码确认过、光看文档看不出来的：

**OpenCode 把 SSE 和 StreamableHttp 揉成了同一个 `"type": "remote"`。** 这本来是两种不同的远程传输。写进 OpenCode 的配置后都变成 `remote`，再读回来，你已经分不清它原来是 SSE 还是 HTTP——transport 的身份在这一进一出之间就没了。对多数 server 无所谓，但你的 server 只认其中一种时，这是个不报错的隐性差异。

**Codex 干脆不支持远程 MCP。** 它的 TOML 配置只吃 stdio，也就是本地起一个命令那种。你在别的 agent 里跑惯的远程 server，搬到 Codex 直接用不了，得改成本地进程。

单看每条都不致命。但你同时养五六个 agent，每加一个 MCP、每换一个 API key、每想给某个 agent 单独换模型，就得把这套差异在脑子里过一遍，手动去五六个路径里改。选工具是一次性的，配好之后天天维护它们，才是那个磨人的活。

## 于是绕到一个更前面的问题：谁来管这些文件

一旦你不想再手动抄，就得找个东西替你管。这里有个岔路，很多工具的取向差别就在这——它对待你已经写好的那些配置文件，是接管，还是服务。

**接管**是这样：工具把配置收进它自己的一份数据库，以这份库为准，每次给你写文件就拿库里的版本整份重写一遍。你目录下那份 `settings.json`、`config.toml`，在它眼里只是一个被覆盖的输出。我用过大半年的 CC Switch 走的就是这条路。方便，一键切 provider。但接管之后有几件具体的事：你在 shell 里 export 的环境变量会作废，因为文件归它写、agent 只认它写进去的值；它这次动了哪几个字段你看不清，配置在库里不是一份能打开、能 diff 的文本；你自己手写、没进它库的 plugins / MCP / permissions，下次整份重写时它不认识，可能就不给你留了。

这不是哪一版没写好，是取向本身的结果：配置存它的库、对外整份覆盖。等于你的配置得托给它保管，你信它保管得住才行。

**服务**是另一条：工具不建自己的库，直接读你现有那份文件，只改你显式指定的那几项，别的一个字节不碰；不写全局状态、不在后台驻留进程；每次改了什么能 diff 出来；你不想用了，把它加的那几条删掉，文件回到原样，零残留。配置从头到尾在你自己手里，工具只是帮你把它配好、配稳。

我做 aghub 的时候认死了后面这条。原因很简单：我想随时知道我的配置现在是什么样，也想随时能自己改回去。这个前提一立，很多设计就没得选了——只能增量编辑，不能接管。

## 想手动扛的话，这么弄

不上工具、纯手动也不是不行，给个能照抄的思路：

- **把配置当代码管。** 我一度把每个 agent 的配置文件软链到一个 git 仓库，改一处 commit 一次，至少有版本记录，配错了能回退。
- **写个 shell 脚本做分发。** 维护一份「标准 MCP 列表」，用脚本按各家格式生成对应文件。麻烦在于上面那些差异你得自己处理——尤其 Codex 的 TOML、OpenCode 的 `remote` 合并，脚本里都得特判。
- **接受不完全同步。** 常用那两个配全，剩下的用到再说。很多人就这么活，损耗最小。

边界很清楚：agent 就两三个、配置不常动，手动完全够。到五六个还经常调，手动才开始漏东西——我就是漏了才去做工具。

## 我做的那个（开源）

工具叫 **aghub**，我和两个朋友一起写的，Rust + Tauri，CLI 和桌面 App 都有，目前支持 22+ 个 agent。它就是上面「服务」那条路的实现：把 MCP、skill、模型在一个地方配一次，按各家格式推到所有 agent；改哪一条只动那一条，别的原样不动；还能一条命令看到哪个 agent 装了哪些 server，省得再去五六个路径里对。

实现上我没给每家 agent 写死一个 adapter。每个 agent 是一张静态的 `AgentDescriptor`，解析、序列化、路径、能力声明都是挂在上面的函数指针；加一个 agent，就是加一个文件、再把它注册进 `ALL_AGENTS` 那张表。上面那些格式差异——TOML、`remote` 合并、各家 key 名不同——全收敛在各自的 descriptor 里，主流程不塞特例。这也是「不接管」这个取向在代码里的样子：哪家 agent 改了格式，我能一眼找到、干净地改掉。

几个我自己天天用到的点：skill 能打成 `.skill` 包跨 agent 共享，带 SHA-256 校验；自定义 provider 的 API key 存系统钥匙串、不落明文配置，每个 agent 单独选模型；provider 预设从 models.dev 在线拉，不内置任何商业中转条目。目前 Mac 上跑得最稳，Windows 还标着 experimental。

GitHub 在 `github.com/akarachen/aghub`，`brew install --cask akarachen/tap/aghub` 能直接装。不感兴趣的话，前面那张表和手动方案照样帮你少走点弯路。
