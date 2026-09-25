<div align="center">

# grok-cli-self

### The lightweight, zero-dependency Grok CLI — chat with xAI's Grok AI directly from your terminal

**One-shot prompts · Interactive chat · Streaming replies · Pipe anything in · macOS, Linux & Windows**

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](LICENSE)
[![Node.js >= 18](https://img.shields.io/badge/node-%3E%3D18-brightgreen.svg)](https://nodejs.org/en/download)
[![Zero Dependencies](https://img.shields.io/badge/dependencies-0-blue.svg)](package.json)
[![Platform](https://img.shields.io/badge/platform-macOS%20%7C%20Linux%20%7C%20Windows-lightgrey.svg)](#-installation)
[![PRs Welcome](https://img.shields.io/badge/PRs-welcome-brightgreen.svg)](CONTRIBUTING.md)
[![GitHub stars](https://img.shields.io/github/stars/PointAntStorm/grok-self?style=social)](https://github.com/PointAntStorm/grok-self/stargazers)

[Installation](#-installation) ·
[Quick Start](#-quick-start) ·
[Usage](#-usage) ·
[For Developers](#-for-developers) ·
[FAQ](#-faq) ·
[Contributing](CONTRIBUTING.md)

</div>

---

## 🤖 What is grok-cli-self?

**grok-cli-self** is a free, open-source **command-line interface (CLI) for Grok**, the AI assistant built by **xAI**. It brings the power of Grok's large language models — including the latest **Grok 4** family — straight into your terminal, so you can ask questions, generate code, explain errors, draft text, and automate AI workflows **without ever leaving your shell**.

If you're searching for a **Grok CLI**, a **Grok command-line tool**, a way to **use Grok in the terminal**, or a **self-hosted Grok chat client** that you fully control — this is it. No Electron, no browser tab, no telemetry, no bloat: one small Node.js program, **zero runtime dependencies**, and your own xAI API key.

> ⚠️ **Disclaimer:** grok-cli-self is a community project and is **not an official xAI product**. "Grok" and "xAI" are trademarks of xAI Corp. This tool simply talks to the official, public [xAI API](https://docs.x.ai) using your own key.

---

## ✨ Features

- ⚡ **Blazing fast startup** — pure Node.js, zero dependencies, installs in seconds
- 💬 **Interactive chat mode** — a friendly REPL with conversation memory, slash commands and multi-line input
- 🎯 **One-shot mode** — `grokself "your question"` prints the answer and exits; perfect for scripts
- 🌊 **Real-time streaming** — watch Grok's reply appear token by token
- 🔀 **Pipe anything in** — `cat error.log | grokself "what's wrong here?"` — the Unix way
- 🧠 **Model switching** — use `grok-4-latest`, `grok-code-fast-1`, or any model your key can access
- 🔐 **Private by design** — your API key lives in `~/.grokself/config.json` (chmod `600`) and is sent only to `api.x.ai`
- 🛠️ **Scriptable & CI-friendly** — `--no-stream`, exit codes, env vars (`XAI_API_KEY`, `GROK_BASE_URL`, `GROK_MODEL`)
- 🍎 **Runs anywhere Node 18+ runs** — macOS (Apple Silicon & Intel), Linux, Windows (PowerShell / Git Bash / WSL)

---

## 🚀 Installation

### ⚡ macOS — 3-line quick install

Open **Terminal** (press `⌘ + Space`, type `Terminal`, hit Enter) and run these **three lines**, one at a time:

1. Install Apple's command line tools (needed by git & compilers)
```bash
xcode-select --install
```
2.  Install Node.js + npm via nvm — see https://nodejs.org/en/download
```bash
curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.40.3/install.sh | bash && source ~/.zshrc && nvm install --lts
```
3.  Install grok-cli-self straight from GitHub
```bash
mkdir -p 'grokself' && cd 'grokself' && npm install github:PointAntStorm/grok-self
```

Then run it:

```bash
npx grokself setup          # paste your xAI API key once
npx grokself "hello Grok!"  # 🎉 you're chatting with Grok in your terminal
```

### 🐧 Linux / 🪟 Windows

```bash
# Install Node.js 18+ from https://nodejs.org/en/download (nvm / fnm / official installer)
mkdir -p 'grokself' && cd 'grokself' && npm install github:PointAntStorm/grok-self
npx grokself setup
npx grokself "hello Grok!"
```

### 🌍 Optional: install globally

If you want the `grokself` command available **everywhere** (not just inside the `grokself` folder):

```bash
npm install -g github:PointAntStorm/grok-self
grokself "hello Grok!"   # works from any directory now
```

---

## 🧒 Never used a terminal before? (Beginner-friendly guide)

No worries — follow these steps exactly and you'll be chatting with Grok in ~5 minutes. **No programming knowledge and no Homebrew needed.**

**Step 1 — Open the Terminal app.**
On your Mac, press `⌘ (Command) + Space`, type `Terminal`, and press Enter. A white or black window with text appears. This is where you "talk" to your computer by typing commands.

**Step 2 — Install Apple's developer tools.**
Copy this line, paste it into Terminal (with `⌘ + V`), and press Enter:

```bash
xcode-select --install
```

A popup appears → click **Install** and wait for it to finish. If it says they're *already installed*, that's fine — move on.

**Step 3 — Install Node.js (which includes npm).**
`npm` is the tool that downloads grok-cli-self. The easiest way to get it **without Homebrew** is **nvm** (Node Version Manager):

1. Open https://nodejs.org/en/download in your browser.
2. Choose the **nvm** install method shown on that page — it gives you one command to copy.
3. Paste that command into Terminal and press Enter. It looks like this:

   ```bash
   curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.40.3/install.sh | bash
   ```

4. Then copy-paste these two lines (they load nvm and install the long-term-support version of Node):

   ```bash
   source ~/.zshrc
   nvm install --lts
   ```

5. Check it worked — type `node -v` and press Enter. You should see something like `v22.x.x`. ✅

**Step 4 — Install grok-cli-self.**
Copy-paste this whole line and press Enter:

```bash
mkdir -p 'grokself' && cd 'grokself' && npm install github:PointAntStorm/grok-self
```

This creates a folder called `grokself` in your home directory and downloads the tool into it.

**Step 5 — Get your Grok API key.**
Grok's brain lives in xAI's cloud, and the key is your personal password to use it:

1. Go to https://console.x.ai and sign in (you can use your X/Twitter account).
2. Click **API Keys** → **Create API key**.
3. Copy the key — it starts with `xai-`. Keep it secret, like a password.

**Step 6 — Save the key and start chatting!**

```bash
npx grokself setup
```

Paste your key when asked and press Enter. Then:

```bash
npx grokself "Explain quantum computing like I'm five"
```

🎉 **Done!** From now on, whenever you want to chat, open Terminal, type `cd ~/grokself`, then `npx grokself` for chat mode or `npx grokself "your question"` for a quick answer.

---

## ⚡ Quick Start

```bash
# One-shot question (streams the answer)
grokself "Write a haiku about terminals"

# Interactive chat with memory
grokself

# Pipe in context — logs, code, diffs, anything
cat server.log | grokself "Find the root cause of this crash"
git diff | grokself "Review this diff like a senior engineer"

# Pick a different model for one command
grokself --model grok-code-fast-1 "Refactor this function: ..."

# Non-interactive output for scripts & CI
grokself --no-stream "Summarize: ..." > summary.txt
```

### Example session

```
$ grokself "Why is my zsh slow to start?"

grok › The most common cause is a heavy ~/.zshrc — usually a plugin
manager or nvm loading synchronously. Try timing it:

  time zsh -i -c exit

If nvm is the culprit, lazy-load it or move to a faster manager…
```

---

## 📖 Usage

### Commands

| Command | Description |
| ------- | ----------- |
| `grokself` | Start interactive chat (REPL) with conversation memory |
| `grokself "<prompt>"` | One-shot answer, streamed to stdout |
| `grokself setup` | Interactive wizard — saves your API key & default model |
| `grokself models` | List all models available to your API key |
| `grokself --help` | Full help text |

### Options

| Flag | Description | Default |
| ---- | ----------- | ------- |
| `-m, --model <name>` | Model to use | `grok-4-latest` |
| `-s, --system <prompt>` | Custom system prompt | built-in helpful-assistant prompt |
| `-t, --temperature <n>` | Sampling temperature `0–2` | `0.7` |
| `--no-stream` | Wait for the full reply, print once (script-friendly) | off |
| `-v, --version` | Print version | — |
| `-h, --help` | Show help | — |

### Interactive mode (REPL) slash commands

| Command | Description |
| ------- | ----------- |
| `/help` | Show in-chat help |
| `/model <name>` | Switch model mid-conversation |
| `/system <prompt>` | Change the system prompt |
| `/clear` | Forget conversation history |
| `/save <file>` | Export the chat to a Markdown file |
| `/exit` | Quit (or `Ctrl+C` / `Ctrl+D`) |

### Environment variables

| Variable | Description |
| -------- | ----------- |
| `XAI_API_KEY` | Your xAI API key (overrides the saved config) |
| `GROK_BASE_URL` | Custom API endpoint — works with any OpenAI-compatible proxy/relay |
| `GROK_MODEL` | Default model override |
| `NO_COLOR` | Disable colored output |

### Configuration file

Settings are stored at `~/.grokself/config.json` (permissions `600` — only you can read it):

```json
{
  "apiKey": "xai-...",
  "model": "grok-4-latest",
  "baseUrl": "https://api.x.ai/v1",
  "temperature": 0.7
}
```

---

## 🆚 Why grok-cli-self?

| | grok-cli-self | Official Grok Build CLI | Heavyweight AI TUIs |
| --- | --- | --- | --- |
| Install size | **~30 KB, 0 deps** | Large Rust binary | 100s of MB |
| Install | `npm install github:…` | curl script | Installers / DMGs |
| Setup time | **< 1 minute** | Browser OAuth flow | Account + wizard |
| Bring your own API key | ✅ | ❌ (account login) | Varies |
| Pipe & script friendly | ✅ | Partial | ❌ |
| Hackable source | ✅ tiny, readable JS | Complex Rust workspace | ❌ |
| Offline-friendly config | ✅ single JSON file | Managed | Managed |

grok-cli-self doesn't try to be an autonomous coding agent — it's the **fastest way to talk to Grok from a shell**, and a clean base to build your own tools on.

---

## 💻 For Developers

### Tech stack (and why)

| Choice | Reason |
| ------ | ------ |
| **Node.js ≥ 18 (ESM)** | Native global `fetch` + `readline` — no polyfills needed; npm/GitHub install story is unbeatable |
| **Zero runtime dependencies** | Installs instantly, audits clean, never breaks from a dependency update |
| **xAI API (OpenAI-compatible)** | Official, documented, stable; works with relays via `GROK_BASE_URL` |
| **SSE streaming** | Token-by-token output with a hand-rolled, dependency-free SSE parser |
| **`node:test`** | Built-in test runner — again, zero deps |

### Project structure

```
grok-cli-self/
├── bin/
│   └── grokself.js      # executable entry point (#!/usr/bin/env node)
├── src/
│   ├── cli.js           # arg parsing · one-shot mode · setup wizard
│   ├── repl.js          # interactive chat loop · slash commands
│   ├── api.js           # xAI API client (stream / non-stream / models)
│   ├── config.js        # ~/.grokself/config.json load & save
│   └── ui.js            # ANSI colors, banner, log helpers
├── test/
│   └── config.test.js   # node:test unit tests
├── README.md
├── CONTRIBUTING.md
├── CODE_OF_CONDUCT.md
├── SECURITY.md
├── CHANGELOG.md
├── LICENSE              # MIT
└── package.json
```

### Hack on it

```bash
git clone https://github.com/PointAntStorm/grok-self.git
cd grok-self

node bin/grokself.js --help   # run from source — nothing to install
npm run dev                   # node --watch: auto-restart on changes
npm test                      # node:test suite
```

Design constraints we hold every PR to: **zero runtime dependencies**, **Node 18+ compatibility**, **small readable modules**. See [CONTRIBUTING.md](CONTRIBUTING.md) for the full guide.

### Roadmap

- [ ] Conversation history persistence across sessions (`--continue`)
- [ ] Image input support (Grok vision models)
- [ ] `--json` output mode for machine parsing
- [ ] Shell completions (zsh / bash / fish)
- [ ] Reasoning-effort flag for supported models
- [ ] Publish to the npm registry (`npm i -g grok-cli-self`)

Have an idea? [Open an issue](https://github.com/PointAntStorm/grok-self/issues) — roadmap items are driven by user requests.

---

## 🛠️ Troubleshooting

| Problem | Fix |
| ------- | --- |
| `command not found: npx` | Node isn't installed or the shell hasn't reloaded nvm: run `source ~/.zshrc`, then `node -v` to verify |
| `command not found: grokself` | You installed locally — run `npx grokself` **inside the `grokself` folder**, or install globally with `npm install -g github:PointAntStorm/grok-self` |
| `401 Unauthorized` | Wrong/expired key → run `grokself setup` again, or check `echo $XAI_API_KEY` |
| `403` / quota errors | Add credits or check billing at https://console.x.ai |
| `Model not found` | Run `grokself models` to see what your key can use, then `--model <name>` |
| `xcode-select: error` | Already installed — safe to ignore and continue |
| Colors look broken | Set `NO_COLOR=1` or update your terminal emulator |

---

## ❓ FAQ

**Is grok-cli-self free?**
The tool is 100% free and MIT-licensed. You pay only for your own xAI API usage, billed by xAI.

**Is this the official Grok CLI?**
No. It's an independent, community-built client for the official xAI API. xAI's own agent CLI is a separate product (Grok Build).

**Do I need Homebrew?**
**No.** Everything installs via `xcode-select`, nvm (from https://nodejs.org/en/download) and npm.

**Do I need to know how to code?**
No — follow the [beginner guide](#-never-used-a-terminal-before-beginner-friendly-guide). Copy, paste, chat.

**Which Grok models are supported?**
Any model your API key can access — `grok-4-latest` by default, switchable via `--model` or `/model`. Run `grokself models` for your live list.

**Can I use a custom endpoint or relay?**
Yes — set `GROK_BASE_URL` to any OpenAI-compatible endpoint.

**Where is my API key stored?**
In `~/.grokself/config.json` with owner-only permissions. It's never sent anywhere except the configured API endpoint.

**Does it work on Windows?**
Yes — PowerShell, Git Bash, or WSL with Node 18+.

---

## 🤝 Contributing

Contributions make the open-source community amazing. **Any contribution is greatly appreciated** — see [CONTRIBUTING.md](CONTRIBUTING.md).

1. Fork the project
2. Create your feature branch (`git checkout -b feat/amazing-feature`)
3. Commit your changes (`git commit -m 'feat: add amazing feature'`)
4. Push to the branch (`git push origin feat/amazing-feature`)
5. Open a Pull Request

---

## ⭐ Support the project

If grok-cli-self saves you time, **give it a star** — it helps other developers discover the project and keeps development going.

[![Star History](https://img.shields.io/github/stars/PointAntStorm/grok-self?style=social)](https://github.com/PointAntStorm/grok-self/stargazers)

---

## 📄 License

Distributed under the **MIT License** — see [LICENSE](LICENSE) for details. Use it, fork it, ship it.

---

<div align="center">

**Keywords:** grok cli · grok command line · grok terminal · xai grok cli · grok ai cli · grok chat cli · grok-4 cli · grok api client · terminal ai chatbot · llm cli · command line ai assistant · grok self-hosted · openai-compatible cli · nodejs ai cli

Built with ❤️ by [PointAntStorm](https://github.com/PointAntStorm) · Not affiliated with xAI

</div>
