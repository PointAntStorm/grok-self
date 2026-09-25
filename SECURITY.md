# Security Policy

## Supported Versions

| Version | Supported          |
| ------- | ------------------ |
| 1.x     | :white_check_mark: |

## Reporting a Vulnerability

Please **do not** open a public GitHub issue for security vulnerabilities.

Instead, open a [private security advisory](https://github.com/PointAntStorm/grok-self/security/advisories/new)
on this repository. You can expect an acknowledgement within 72 hours.

## Notes on API Key Handling

- `grokself` stores your xAI API key in `~/.grokself/config.json` with
  owner-only file permissions (`0600`).
- The key is sent **only** to the configured API base URL
  (default: `https://api.x.ai/v1`) as an `Authorization: Bearer` header.
- Never commit your config file or `.env` to git — the `.gitignore` in this
  repo already excludes them.
- If you believe your key has leaked, revoke it immediately at
  https://console.x.ai and generate a new one.
