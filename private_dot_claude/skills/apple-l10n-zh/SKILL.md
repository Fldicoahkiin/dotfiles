---
name: apple-l10n-zh
description: Use before translating any macOS or iOS app interface into Simplified Chinese (zh-Hans / 简体中文) — even a single button or menu label. Apple ships its own Chinese for UI (Save = 存储 not 保存, Copy = 拷贝 not 复制, chart Series = 序列 not 系列, plus Finder = 访达, Force Quit, Sockets, Resident Memory…), so don't translate from general knowledge — find each term in Apple's official zh-CN sources and pick it by the control's actual function, because a guess reads as machine translation. Triggers on a .xcstrings, .xliff, or .xcloc file, filling in target translations, a zh-Hans translation PR for a Mac/iPhone app, choosing the Apple-conventional Chinese for SwiftUI/Xcode buttons, menus, or labels, or keeping placeholders like %@, %lld, %1$@ intact. Gives the workflow to verify terms against Apple docs and flag disputed ones to the user, a cached glossary of already-verified terms and known traps, CJK punctuation and spacing rules, and a bulk target-injection script with placeholder-parity checks. Not for web/i18next/JSON localization, English copywriting or release notes, App Store screenshot uploads, or Simplified-to-Traditional conversion.
---

# Apple App Localization → Simplified Chinese

Translate Apple-platform (macOS / iOS) UI strings into Simplified Chinese (zh-Hans) so the result reads like a native Apple app: Apple's official terminology, intact format placeholders, and the Xcode String Catalog file workflow. Output language is **zh-Hans**; the source is usually English but may be any language.

## When to use

- Editing a `<lang>.xliff` exported from an `.xcloc` localization catalog
- Adding zh-Hans values to a `.xcstrings` String Catalog
- Choosing the Apple-official Chinese term for a macOS/iOS UI concept

## File workflow (.xcloc / .xliff / .xcstrings)

An `.xcloc` localization catalog has two sides:

| Path | Role |
|---|---|
| `Source Contents/.../*.xcstrings` | English source snapshot — **read-only, never edit** |
| `Localized Contents/<lang>.xliff` | where translations go |

Translate by adding a `<target>` after each `<source>`:

```xml
<trans-unit id="Save" xml:space="preserve">
  <source>Save</source>
  <target state="translated">存储</target>
  <note from="auto-generated">A button that saves the current color setting.</note>
</trans-unit>
```

- Mark a finished translation `state="translated"` (Xcode shows it as done). A unit with no `<target>` falls back to the source at runtime — nothing breaks, so leaving a string untranslated is safe.
- Leave brand names and empty-source units alone (e.g. `CFBundleName`, copyright).
- The maintainer merges `<target>`s back into the real String Catalog with `xcodebuild -importLocalizations`. You only ever edit the xliff; never touch `Source Contents`.
- **Always read each unit's `<note>`** — it gives the real UI context and frequently decides the correct term.
- **Plural strings** (String Catalog `%#@…@` variations) export as separate trans-units with ids like `key|==|plural.other`. zh-Hans has a single CLDR plural category — translate only the `plural.other` unit (keep the `%#@…@` / `%lld` tokens intact); `plural.one` / `few` / `many` don't apply to Chinese.

## Translation workflow (per string)

Apple already shipped a Chinese term for almost every UI concept — the job is to **find** it, not invent it. Don't translate from memory. For each string:

1. **Read the actual UI context.** Use the `<note>` and what the control does in the running app. The same English word splits by function — `Filter` the search action is 筛选, a saved `Filter` rule object is 过滤器. Context, not the word alone, picks the term.
2. **Find Apple's term.** Check [reference/terminology.md](reference/terminology.md) and [reference/pitfalls.md](reference/pitfalls.md) first — they are a verified cache and a list of known traps, *not* the whole language. For any term not there, or where context is ambiguous, verify against an authoritative source, in this order: the live macOS/iOS system UI in zh-Hans → Apple's zh-CN docs (`support.apple.com/zh-cn`, the matching app's 使用手册) → Apple Style Guide. WebFetch the Apple zh-CN page rather than guessing. See [reference/sources.md](reference/sources.md).
3. **Apply the hard rules** below — placeholders, code tokens, punctuation, spacing.
4. **Flag disputes instead of guessing.** If two Apple-plausible terms compete and context can't decide, or your only source is non-Apple (e.g. Microsoft), or **no** settled zh term exists at all — some developer/API terms have none, since `developer.apple.com` is English-only (e.g. Hardened Runtime, whose 强化运行时/加固运行时 compete with neither official; contrast QoS class names, which do have settled WWDC renderings — see pitfalls) — present the options with their evidence and let the user choose; don't silently pick. A string with **no `<note>` and more than one plausible Apple term** is a flag by default; don't pick one just to look decisive. A unit left with no `<target>` safely falls back to the source at runtime, so it's fine to leave a pending one untranslated. Once resolved, add it to [reference/terminology.md](reference/terminology.md) so the next run hits the cache.

## Hard rules

1. **Placeholders**: the target must keep the same set of format specifiers as the source — `%@`, `%lld`, `%d`, `%.1f`, `%u`, and positional `%1$@` / `%2$@`. Reorder with positional specifiers; never drop, add, or alter one. `进程 %A` is wrong; `进程 %@` is right.
2. **Don't translate code tokens**: CPU, GPU, QoS, PID, JSON, CSV, SSD, RAM, vmmap, dylib, plist, and signal names (SIGTERM / SIGKILL / SIGINT / SIGSTOP / SIGCONT).
3. **Markdown links**: translate the label, keep the URL unchanged — `[Documentation](https://…)` → `[文档](https://…)`.
4. **Punctuation**: full-width Chinese marks in Chinese text (：，。（）「」？！), but half-width for code tokens and their parentheses — `中断 (SIGINT)`, not `中断（SIGINT）`.
5. **CJK / Latin spacing**: one space between a Chinese run and an adjacent Latin word or number — `显示 CPU 使用率`, `vmmap 路径`. A standalone unit like `30s` stays `30s`.
6. **Second person → 你, not 您**: Apple's zh-Hans addresses the user as **你**, declarative and imperative alike (macOS User Guide: 「你的隐私和安全至关重要」). The "professional tone = 您" instinct is wrong here. Drop a possessive the context already scopes — `输入许可证密钥`, not `输入你的许可证密钥`. See [reference/pitfalls.md](reference/pitfalls.md).
7. **Counts**: Chinese has no plural inflection — a counted noun takes a measure word, default **个** (`%lld 个进程`, not `%lld 进程`). Pick the noun's conventional measure word and keep it consistent across the app.

## Terminology

The glossary is a **verified cache**, not the authority — the authority is Apple's live UI and zh-CN docs (step 2 above). A term being absent means "go verify and add it," not "translate freely." A few high-frequency entries:

| English | zh-Hans | Watch out |
|---|---|---|
| Save | 存储 | not 保存 |
| Copy | 拷贝 | not 复制 |
| Finder | 访达 | |
| Force Quit | 强制退出 | |
| Inspector | 检查器 | |
| Sockets | 套接字 | |
| Resident Memory | 常驻内存 | RSS |
| Series (chart) | 序列 | Apple Numbers 数据序列 — not Excel 系列 |
| Documentation | 文档 | not 文稿 (that is the Documents folder) |

Full glossary with sources: [reference/terminology.md](reference/terminology.md).
The cases where the obvious translation is wrong: [reference/pitfalls.md](reference/pitfalls.md).

## Validation

After editing the xliff, run this loop until clean:

```
- [ ] XML is well-formed:      xmllint --noout <file>.xliff
- [ ] Placeholder parity:      each <target> has the same specifiers as its <source>
- [ ] Spot-check terminology:  against reference/terminology.md
```

For bulk work, `scripts/inject_targets.py` inserts `<target>`s from an id→translation JSON map and reports any placeholder mismatch. Run it, then run `xmllint`:

```bash
python3 scripts/inject_targets.py path/to/zh-Hans.xliff path/to/translations.json
xmllint --noout path/to/zh-Hans.xliff
```

See the script header for the JSON format.

## Sources

Authoritative references (Apple Style Guide, String Catalog docs, Activity Monitor / Numbers zh-CN guides) are in [reference/sources.md](reference/sources.md). Prefer the live macOS system UI and Apple's own zh-CN material over third-party blogs.
