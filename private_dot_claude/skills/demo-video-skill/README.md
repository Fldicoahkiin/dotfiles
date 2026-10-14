# demo-video-skill

[![skills.sh](https://skills.sh/b/Fldicoahkiin/demo-video-skill)](https://skills.sh/Fldicoahkiin/demo-video-skill)

An agent skill that turns a running app into a **cinematic demo video, fully
automated** — up to the Screen Studio / Cap look: auto-zoom driven by what the
choreography actually does, spring cursor with motion blur, padded wallpaper
background. Real recorded interaction + local AI narration + word-synced
captions + a quiet music bed, composed deterministically into an MP4.

> Real interaction, not a slideshow. Zoom decided by semantics, not by hand.
> Local TTS, not cloud. Word-level captions, not guessed timing. One MP4 out.

## Install

```bash
npx skills add Fldicoahkiin/demo-video-skill
```

## Pipeline

```
① record    one of three engines (below)                    → out/*.mp4|webm
② narrate   per-scene VO → Kokoro TTS (local)               → narration/*.wav
③ transcribe Whisper word-level timestamps                  → *.transcript.json
④ caption   group into phrases + fix brand mishears         → captions.js
⑤ music     ffmpeg ambient bed, mixed low under the voice   → music/bed.wav
⑥ compose   HyperFrames HTML one-timeline → render          → MP4
```

Three recording engines, picked with you per project
([details](references/screen-studio-look.md)):

| Target | Engine | Look |
|---|---|---|
| Web/desktop app, macOS | **Cap CLI** | Screen Studio native — semantic auto-zoom, spring cursor + motion blur, wallpaper / rounding / shadow |
| CLI tool | **VHS** | styled terminal mp4, deterministic |
| Headless / CI | **Playwright** | synthetic cursor + ripples, runs anywhere |

Recording and composition are independent — re-record one scene, or re-run
narration, without redoing the other. Narration is one wav per scene, so any
line can be swapped for a human take or another TTS without touching the rest.
Everything in the stack is free to run (Cap is AGPL open source; licensing
table in the reference).

## Quick start

```bash
brew install node ffmpeg
npx playwright install chromium
python3 -m venv .ttsvenv && .ttsvenv/bin/pip install kokoro-onnx soundfile
export PATH="$(pwd)/.ttsvenv/bin:$PATH"

node scripts/record.mjs
bash scripts/tts.sh && bash scripts/transcribe.sh && node scripts/build-captions.mjs
npx hyperframes render . --resolution landscape --fps 30 --crf 17 --output out/demo.mp4
```

See [SKILL.md](SKILL.md) for the full workflow, then the
[references](references/) for each stage.

## Why this and not a screen recorder

- **Real product, on camera.** A synthetic cursor glides and clicks through the
  live app — the footage is the product running, not a mock or a deck.
- **Deterministic & local.** Kokoro TTS and Whisper run on your machine; the
  HyperFrames composition seeks frames reproducibly (no `Date.now`, no network).
- **Word-synced captions.** Whisper timestamps drive the caption track, with a
  small fix map for brand names it can't spell.
- **Authored once, re-rendered cheaply.** Swap a clip or rewrite a line and
  re-render; the timeline is HTML.

## Built on

[HyperFrames](https://hyperframes.heygen.com) (composition + render, + its
Kokoro/Whisper media CLI), Playwright (recording), FFmpeg (clip + music).
Install the HyperFrames skills: `npx skills add heygen-com/hyperframes`.

## Structure

```
demo-video-skill/
├── SKILL.md                 # the workflow
├── scripts/                 # record.mjs · record-cap.mjs · tts.sh · transcribe.sh · build-captions.mjs · music.sh
└── references/              # pipeline · screen-studio-look · recording · narration-and-captions · composition · templates · troubleshooting
```

## License

MIT
