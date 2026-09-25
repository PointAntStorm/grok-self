# Changelog

All notable changes to **grok-cli-self** are documented here.
Format follows [Keep a Changelog](https://keepachangelog.com/en/1.1.0/), versioning follows [SemVer](https://semver.org/).

## [1.0.0] - 2026-09-25

### Added
- Interactive chat REPL with streaming replies (`grokself`)
- One-shot prompts (`grokself "question"`) with token-by-token streaming
- Pipe/stdin support (`cat file | grokself "explain this"`)
- Interactive `grokself setup` wizard — stores the xAI API key in `~/.grokself/config.json` (chmod 600)
- `grokself models` — list models available to your API key
- Flags: `--model`, `--system`, `--temperature`, `--no-stream`, `--version`, `--help`
- Environment overrides: `XAI_API_KEY`, `GROK_BASE_URL`, `GROK_MODEL`
- REPL slash commands: `/help`, `/model`, `/system`, `/clear`, `/save`, `/exit`
- Zero runtime dependencies — pure Node.js 18+ (global `fetch`, `readline`)
