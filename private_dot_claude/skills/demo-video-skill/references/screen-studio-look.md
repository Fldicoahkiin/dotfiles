# The Screen Studio look, fully automated

Auto-zoom on clicks, spring-animated cursor with motion blur, click ripples, padded wallpaper background with rounded corners and shadow — without a human in an editor. Three engines, picked by target:

| Target | Engine | Why |
|---|---|---|
| Web/desktop app on macOS (this machine) | **Cap CLI** — flagship | The whole look is native: Cap's editor state is a JSON file, and `cap export` renders it on the same GPU pipeline as the editor. Zero compositing code. |
| CLI tool | **VHS** (charmbracelet) | Tape script → styled terminal mp4 (padding, margin fill, border radius, window bar) in one step. |
| Headless / CI / Linux | **Playwright pipeline** (the original one in this skill) | No OS recorder available; synthetic cursor + HyperFrames composition. No auto-zoom. |

## Engine 1 · Cap CLI (`cap.so`) — the flagship

Cap's CLI is built for agents: every command takes `--json`, recordings have an explicit start/stop lifecycle, and the repo ships its own Claude skill. Install: `curl -fsSL https://cap.so/install-cli.sh | sh` (same binary as the desktop app). `brew install cliclick` for real input.

**The one trap that decides the architecture: Playwright's synthetic clicks do not move the OS cursor.** Cap records the cursor via a system hook — drive the demo with **real** input (`cliclick`), using Playwright only to compute where to click (`boundingBox()` + `window.screenX/screenY` + chrome offset). `scripts/record-cap.mjs` does this.

Lifecycle (what the script runs):

```bash
cap doctor --json                       # permissions + env sanity
cap targets --json                      # pick the window/screen id
cap record start --window <id> --json --detach   # Studio mode: video + cursor events land separately
# ... drive the demo with real input ...
cap record stop --json
cap project config get <proj.cap>       # editor state as JSON
cap project config set <proj.cap> '<merged>'     # look template + zoom segments (below)
cap export <proj.cap> --output out.mp4 --json \
  --settings-json '{"format":"Mp4","fps":60,"resolution_base":{"x":1920,"y":1080}}'
```

**Zoom is generated, not hand-placed.** Studio recordings write cursor events (`clicks: [{time_ms, x, y, down}]`). Cluster clicks with a 3-second merge window (Cap's own desktop semantics) into `timeline.zoomSegments`:

```json
{ "start": <firstClick - 0.5s, clamp 0>, "end": <lastClick + 1.5s>,
  "amount": 1.8, "mode": "auto" }
```

`"mode": "auto"` makes the zoom follow the recorded cursor — no coordinates to compute. The rest of the look is a one-time config template merged over `config get` output: `background` (wallpaper source, `padding` ~12%, `rounding` ~12, `shadow`), `cursor` (spring `tension/mass/friction`, `motion_blur`, `click_spring`), optional browser-frame chrome. Field names evolve with Cap versions — always `config get` first, merge, `set` (it validates before writing).

Narration/captions/music are unchanged: the Cap-exported mp4 replaces the raw Playwright webm as the *clip* input to this skill's existing compose step (①′ instead of ①; ②–⑥ untouched).

### Zoom is semantic, not guesswork

You wrote the choreography — you already know what each act *means*. That knowledge drives the zoom deterministically:

| Signal from the choreography | Zoom decision |
|---|---|
| interaction target < 8% of viewport (button, input, menu item) | push in, amount 2.0, follow cursor |
| target 8–25% (card, panel, form) | push in, amount 1.5 |
| target > 25% (whole page — it *is* the overview) | stay wide |
| navigation / dialog opens / full-screen result appears | pull back to overview (close the open segment) |
| consecutive small-target acts < 3s apart | merge into one segment (no twitching) |
| scene end | always back at overview, holding on the result |

`record-cap.mjs` computes the target-size fraction on every `realClick` and applies these rules automatically. The choreography can override: `H.focusOn(selector)` forces a push-in on a region that was never clicked (e.g. "look at this diff"), `H.overview()` forces the pull-back (call it right after a result renders). What's left for a human is a single pass over the exported video — not placing zooms, just vetoing the rare wrong one.

## Engine 2 · VHS — CLI-tool demos

```tape
Set FontSize 20
Set Padding 24
Set Margin 48
Set MarginFill "#1a1b26"
Set BorderRadius 12
Set WindowBar Colorful
Output demo.mp4
Type "mytool run --demo"
Enter
Wait /done/
```

`vhs demo.tape` → styled mp4, deterministic, CI-safe. Feed it into the same composition for narration/captions. No cursor concept (terminals don't need one); "zoom" only as a gentle whole-frame push in the composition if wanted.

## Engine 3 · Playwright (existing pipeline) — headless fallback

Keep for Linux/CI where no OS recorder exists. Two upgrades land here too:
- `record.mjs` now writes **`out/events.json`** (every act: `{type, selector, x, y, t}`) — the script *is* the event log, no detection needed.
- Playwright ≥1.59's `page.screencast` gives frame-presentation timestamps if you need exact event↔frame alignment later.

With events.json in hand, a Remotion composition (`<OffthreadVideo>` in a wallpaper container + `spring()` zoom/pan + SVG cursor layer) can add the look headlessly — that's the documented growth path, deliberately not built until a real headless need shows up.

**Build once, reuse forever.** The compositor is fully generic: its inputs are `(video file, events.json, look config)` — nothing about it is per-project. The per-project work in every route is only the choreography (`scenes`); the same zoom rules above map events → keyframes. So it's a one-time ~4–5 day build (spring zoom/pan engine with edge clamping, SVG cursor layer + click ripples, wallpaper/rounding/shadow container, motion-blur wrapper), after which any recording from any project runs through it. Licensing: Remotion is free for ≤3-person companies but **not open source**; if the stack must be strictly OSS, build it on **Revideo (MIT)** — same shape, `renderVideo()` headless API.

## Licensing / cost (everything in this skill is free to run)

| Piece | License | Cost |
|---|---|---|
| Cap (app + CLI) | AGPL-3.0, open source | free — local record/edit/export needs no account; paid tier is only their cloud sharing. AGPL obliges you only if you modify Cap and offer it as a service |
| VHS | MIT | free |
| Playwright | Apache-2.0 | free |
| Kokoro TTS | Apache-2.0, runs locally | free (has Mandarin voices, `zf_*`/`zm_*`) |
| Whisper | MIT, runs locally | free |
| ffmpeg | LGPL/GPL | free |
| HyperFrames CLI | free to use | swap to an OSS equivalent (e.g. Apache-2.0 html-video) if strict-OSS matters for compose |
| Remotion (route ④ only) | source-available, **not OSS** | free ≤3-person org; strict-OSS alternative: **Revideo (MIT)** |

## Don't build on

OpenScreen (archived 2026-06), editly / FFCreator (dormant), `screenstudio-cli` (reverse-engineered internals, breaks on update). Screen Studio itself has no API — only `screen-studio://` deeplinks.

## QC additions for the Cap route

- Watch the exported mp4's first zoom: does it land on the element that was clicked (auto mode follows the cursor — if the cursor didn't move, the zoom won't).
- Check the recording caught the *real* cursor (if the video shows no cursor movement, the driver fell back to synthetic input — fix cliclick).
- Notifications/menubar clutter: record with Do Not Disturb on; Cap masks exist but "what to mask" is a judgment call.
