# Contributing to grok-cli-self

First off — thank you for considering a contribution! 🎉
Bug reports, feature ideas, docs improvements and pull requests are all welcome.

## Ways to contribute

| Type | How |
| ---- | --- |
| 🐛 Bug report | [Open an issue](https://github.com/PointAntStorm/grok-self/issues/new) with your OS, Node version (`node -v`), the exact command you ran, and the full error output |
| 💡 Feature request | Open an issue and describe the workflow you want to enable |
| 📝 Docs | Typos, clearer install steps, translations — small PRs are perfect first contributions |
| 🛠️ Code | Fork → branch → PR (see below) |

## Development setup

```bash
git clone https://github.com/PointAntStorm/grok-self.git
cd grok-self

# No dependencies to install — the project is zero-dependency by design.
# Run the CLI directly from source:
node bin/grokself.js --help

# Run the tests:
npm test
```

> Tip: `npm run dev` starts the CLI with `node --watch`, restarting on every file change.

## Project layout

```
bin/grokself.js   # thin executable entry point
src/cli.js        # argument parsing, one-shot mode, setup wizard
src/repl.js       # interactive chat loop + slash commands
src/api.js        # xAI API client (streaming + non-streaming, model list)
src/config.js     # config file loading/saving (~/.grokself/config.json)
src/ui.js         # ANSI colors, banner, log helpers
test/             # node:test unit tests
```

## Ground rules for code contributions

1. **Zero runtime dependencies.** This is a core design goal — the CLI must
   install and run anywhere Node 18+ exists. Use the standard library.
2. **Node.js >= 18 compatibility.** No syntax or APIs newer than that.
3. **Keep it small.** A focused feature done well beats a big feature done halfway.
4. **Add/adjust tests** for behavior changes (`node --test`).
5. **Update the README** if you change user-facing behavior.
6. Use [Conventional Commits](https://www.conventionalcommits.org/) style in
   commit messages when possible (`feat:`, `fix:`, `docs:`, …).

## Pull request process

1. Fork the repo and create a branch: `git checkout -b feat/my-feature`
2. Make your changes, run `npm test`, and try the CLI manually
3. Open a PR against `main` with a clear description of **what** and **why**
4. One PR = one concern. Small PRs get reviewed fastest.

## Code of Conduct

By participating you agree to abide by our [Code of Conduct](CODE_OF_CONDUCT.md).
