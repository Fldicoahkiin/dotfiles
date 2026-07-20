<!-- LinuxDo · tone 1.5 / hook 2.5 · 板块：开发调优 · 标签：开源推广 -->

# 【开源推广】一个管配置的工具，对你写好的那些文件，该服务还是该接管

> 第一张图放这里：aghub 改一条 MCP 时的 diff / 终端截图，能看清"只动了这一项、其余没碰"（别放 logo）〔待补：功能截图〕

一个管配置的工具，对待你已经写好的那些文件，只有两种态度：接管，或者服务。选哪种，基本决定了它是什么东西。

我用了小半年 CC Switch，最后还是自己写了 aghub，分歧就在这一点上。下面这些是我翻它行为、翻自己配置文件、来回切了很多次之后的判断，不是查文档查来的——哪家最近改了行为跟我说的不一致，评论区甩给我。

## CC Switch 选的是接管

它把 provider 配置收进自己的一个数据库，以这份库为准。每次切换，都拿库里的版本，把 `settings.json`、`config.toml` 整份重写一遍。你目录下那份配置文件，在它眼里只是一个被覆盖的输出。

第一次启动它就把你现有配置导进库了。从那一刻起，真正生效的状态不在你的文件里，在它的库里。

接管之后，会发生几件具体的事：

**你在 shell 里设的环境变量作废。** `settings.json` 归它写，Claude Code 只认它写进去的那份值。你 export 的东西，切一次就被盖没了。

**你看不清它改了什么。** 配置在库里，不是一份能打开、能 diff 的文本。它这次切换动了哪几个字段，不交代，你也没处对。想知道就得去刨它的数据库。

**你手写、没进它库的东西，下次切换可能就没了。** 你自己往 `settings.json` 里加的 plugins、MCP、permissions，不在它那份库的认知范围内。它整份重写的时候，不认识的就不会保留。

**退出也不干净。** 因为真正生效的状态早在第一次启动就搬进库了，你的原始文件从那以后就不是权威版本。

再加一条我看到的：它内置的 provider 列表里混着中转站和赞助条目〔发前再核一次是否仍如此〕。

这些不是哪一版没写好，是它的取向决定的：配置存它的库，对外整份覆盖。配置本来是你的东西，托管就意味着你得信它保管得住。我不想信，我想自己拿着。

## aghub 选的是服务

它从头到尾只认一件事：配置是你的，我帮你配好，不替你保管。落到实现上就是增量编辑，不接管。

具体是这样：

- 它直接读你现有的配置文件，**只改你显式指定的那几项**，其余的一个字节都不动。
- **不写全局状态、不注册 handler、不驻留后台进程。** 它不在你系统里留常驻的东西。
- **每次变更可 diff。** 改完你 `git diff` 一下就知道它动了哪几行，因为它动的就是你文件里那几行，没有第二份真相。
- **退出零残留。** 你加的那条 MCP 不想要了，删掉对应条目就干净了，不用去别处清库。

所有权自始至终在你手里。我从一开始就没给它接管你文件的能力。

## 连实现都是这个原则

这套取向不只体现在对外行为，代码里也是。

每个 agent 在 aghub 里就是一张静态的 `AgentDescriptor`：配置在哪、用什么格式解析和序列化、skill 从哪读、支持哪些能力——全挂在这张描述符上，是一组函数指针。加一家 agent = 加一个文件 + 往 `ALL_AGENTS` 那个数组里加一行，注册进去。

```rust
pub static ALL_AGENTS: &[&AgentDescriptor] = &[
    &agents::claude::DESCRIPTOR,
    &agents::codex::DESCRIPTOR,
    &agents::opencode::DESCRIPTOR,
    // …一共 22 张，加一家就在这加一行
];
```

没有一堆手写的 adapter struct，没有 if-else 按 agent 分派塞满主流程。哪家 agent 改了格式、哪个字段反直觉，我打开对应那张描述符就能改，改完影响面就在那张表里，不会漏。同样是"只动该动的，别往主流程里塞特例"——对文件是这个规矩，对代码也是这个规矩。

## aghub 现在能做什么

- **MCP 配一次，推到全部 agent**，并且能一眼审计谁装了哪些 server；支持 Stdio / SSE / StreamableHttp 三种 transport，带跨 agent 去重视图。
- **可移植 Skills**：本地目录、`.skill` 包（SHA-256 校验）、GitHub 仓库（含私有凭据）都能装，跨 agent 共享一套。
- **自定义 provider（BYOM）**：provider 不绑定具体 agent，可以只装到某一家或推到全部；预设从 models.dev 在线拉取，不内置任何商业中转/赞助条目；API key 存系统钥匙串，不落明文配置。
- Claude Code 插件市场、Usage 用量监控（Claude / Codex）。

底层是一份 `core`，对外暴露桌面、CLI、HTTP API 三套接口。支持 22+ 个 agent：Claude Code、Codex、Cursor、Windsurf、Copilot、Gemini、OpenCode、Zed、Warp、Cline、RooCode 等。

## 装一下

```bash
# macOS,Homebrew
brew install --cask akarachen/tap/aghub
```

CLI 大概长这样：

```bash
aghub-cli -a claude get mcps      # 看 Claude 装了哪些 MCP
aghub-cli -a claude get skills    # 看有哪些 skill
```

跨平台都有（Win / mac / Linux），Windows 那档目前还在补。

- 源码：https://github.com/akarachen/aghub
- 官网：https://aghub.akr.moe

这套"配置是你的、工具别接管"的想法，很多是在 L 站这种地方看别人怎么较真才想清楚的，这份"有问题就摊开讲"的风气我很吃。上面对 CC Switch 那几条断言都是我实际用下来的观察，哪条你在最新版本上看到的行为跟我说的不一样，评论区拍我，我改。descriptor 那套抽象你觉得拆得对不对，也欢迎佬友拍砖。
