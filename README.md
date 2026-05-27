# strdl-studio

A desktop live coding environment for [Strudel](https://strudel.cc) (music) and [Hydra](https://hydra.ojack.xyz) (visuals), built with Tauri v2 + React + TypeScript.

## Features

- **Strudel editor** — full-featured live coding editor with syntax highlighting, autocompletion, and evaluator
- **Hydra visual editor** — side-by-side CodeMirror 6 editor for Hydra synth visuals, synchronized with Strudel playback
- **Color themes** — 5 built-in themes (Void, Aqua, Ember, Jade, Sakura), each pairing an app color scheme with a matching Strudel syntax theme
- **Multi-tab sessions** — open, save, and manage multiple code sessions with recent file history
- **Sample browser** — load and preview audio samples, insert them directly into the editor
- **Snippets panel** — save code snippets, load official Strudel examples and patterns by style
- **Audio export** — render patterns to WAV
- **Visualizers** — scope, spectrum, piano roll, punch card, spiral

## Stack

- [Tauri v2](https://tauri.app) — native desktop shell (macOS / Windows / Linux)
- [React 18](https://react.dev) + TypeScript
- [@strudel/repl](https://www.npmjs.com/package/@strudel/repl) — Strudel web component + full library
- [@strudel/hydra](https://www.npmjs.com/package/@strudel/hydra) — Hydra synth integration
- [CodeMirror 6](https://codemirror.net) — Hydra editor
- [Vite](https://vitejs.dev) — bundler

## Development

```bash
# Install dependencies
bun install

# Run in development mode
bun tauri dev

# Build
bun tauri build
```

Requires [Rust](https://rustup.rs) and the [Tauri prerequisites](https://tauri.app/start/prerequisites/) for your platform.
