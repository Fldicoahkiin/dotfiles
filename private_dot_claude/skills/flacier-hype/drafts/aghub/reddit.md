<!-- 平台坐标：Reddit · tone 1.5 / hook 2.5 · 切入点=you own your config。CC Switch 托管（DB 为准、整份重写你的文件）vs aghub 增量编辑、可 diff、可干净回退。disclose 身份加分，链接进第一条评论。 -->

# Reddit 成稿（英文）

---

## ① Show HN 帖 — 投 r/SideProject（备选 r/ClaudeAI）

**Title:**

```
Show HN: aghub – a config manager for AI coding agents that edits your files instead of taking them over
```

**Body:**

I ran CC Switch for the better part of a year to juggle provider configs, and it takes over the files you already wrote. It pulls your provider config into its own database, treats that database as the source of truth, and every switch it rewrites `settings.json` / `config.toml` in full from the DB. A full rewrite means anything not in the DB gets dropped. The config file in your directory is, to it, just an output that gets overwritten.

Once something takes over like that, you don't really own your config anymore. Env vars you set in your shell stop counting, because Claude Code only reads what got written into `settings.json`, and that file belongs to the tool now. You can't see what it changed, because the live state is in a DB, not a text file you can `diff`. And anything you hand-wrote that never made it into the DB — a plugin, an MCP server, a permissions block — can be gone after the next switch. That's not one bad release. It's the design: my config lives in my DB, yours gets overwritten wholesale.

So I wrote aghub, and it does the opposite. It opens the config file you already have, changes only the entries you explicitly ask it to touch, and leaves the rest byte-for-byte alone. No global state, no registered handlers, nothing left running in the background. Every change is a diff you can read before and after. Delete an entry and there's nothing left behind — no residue in a sidecar DB, because there is no sidecar DB. The config stays yours the whole time.

It's a Rust + Tauri 2 desktop app plus a CLI, cross-platform, open source. It handles MCP servers (Stdio / SSE / StreamableHttp, with a cross-agent view so you can see which agent runs what), skills, and custom model providers across 22+ agents — Claude Code, Codex, Cursor, Windsurf, Copilot, Gemini, OpenCode, Zed, Warp, Cline, RooCode and more. Provider API keys go into the OS keychain, not plaintext config.

The same idea runs down into the code. Each agent is a static `AgentDescriptor` — parsing, serialization, path resolution, capability flags all hang off it as function pointers. Adding an agent is one file plus a line registering it in `ALL_AGENTS`. There's no special-casing threaded through a main loop, which is the only reason it can hold 22 config formats that disagree with each other without collapsing into `if agent == "..."`.

The CC Switch behavior above is from running it, not from reading its source, so if a recent version does something different I'd rather hear it than be wrong. Links in the first comment. The thing I'm actually curious about: does anyone want a config tool to be the source of truth, or is that always the wrong trade?

**First comment (link — per sub rule, keep links out of the body):**

```
Full disclosure: I'm the author.

GitHub (source): https://github.com/akarachen/aghub
Site: https://aghub.akr.moe
macOS: brew install --cask akarachen/tap/aghub

Happy to get into the incremental-edit approach, or how a specific agent's format is handled — some are strange (Claude drops URL-type MCP servers on serialize, OpenCode collapses SSE and StreamableHttp into one "type": "remote", Codex is TOML and stdio-only). I'll be around in the comments for a while.
```

---

## ② r/ClaudeAI 口语版 — 单帖，更松

**Title:**

```
I stopped letting a switcher tool own my config and wrote my own — it edits settings.json in place and you can diff every change
```

**Body:**

For most of a year I ran CC Switch to swap provider configs for Claude Code. It works. The way it works is what finally got to me.

It keeps your config in its own database and treats that as the truth. Every switch, it rewrites `settings.json` from the DB. So the file in your directory isn't really yours — it's whatever the DB last printed there. Env vars I'd set in my shell got ignored. I couldn't `diff` anything to see what actually changed, because the real state lived in the DB. And a couple of permissions and MCP entries I'd hand-added just weren't there after a switch, because they were never in the DB in the first place.

That's not a bug you wait out. It's the design — the tool holds the config, your file is disposable.

aghub goes the other way. It opens the config file you already have, changes only the entries you asked for, leaves the rest untouched. Every change is a plain diff. Remove something and it's actually gone, no leftover state in a database, because it doesn't keep one. It does this across 22+ agents — Claude Code, Codex, Cursor, Copilot, Gemini, OpenCode and more — for MCP servers, skills and model providers, and keys go in the system keychain instead of a plaintext file. Rust + Tauri app plus a CLI, open source.

Full disclosure, I'm the author, links in the first comment. If you're fine with a tool being the source of truth for your config, I'm genuinely curious why — it's the part I could never talk myself into.

**First comment:**

```
GitHub: https://github.com/akarachen/aghub
Site: https://aghub.akr.moe
brew install --cask akarachen/tap/aghub

The CC Switch behavior above is from using it, not reading its source — correct me if a newer version handles it differently.
```
