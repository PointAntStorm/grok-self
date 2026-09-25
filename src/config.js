import fs from 'node:fs';
import os from 'node:os';
import path from 'node:path';

export const CONFIG_DIR = path.join(os.homedir(), '.grokself');
export const CONFIG_FILE = path.join(CONFIG_DIR, 'config.json');

export const DEFAULTS = {
  baseUrl: 'https://api.x.ai/v1',
  model: 'grok-4-latest',
  temperature: 0.7,
  systemPrompt:
    'You are Grok, a helpful and maximally truthful AI assistant built by xAI. Answer concisely and format code in fenced code blocks.',
};

/** Load config from ~/.grokself/config.json, merged over defaults. */
export function loadConfig() {
  let fileConfig = {};
  try {
    fileConfig = JSON.parse(fs.readFileSync(CONFIG_FILE, 'utf8'));
  } catch {
    /* first run — no config yet */
  }
  const config = { ...DEFAULTS, ...fileConfig };

  // Environment variables always win.
  if (process.env.XAI_API_KEY) config.apiKey = process.env.XAI_API_KEY;
  if (process.env.GROK_BASE_URL) config.baseUrl = process.env.GROK_BASE_URL;
  if (process.env.GROK_MODEL) config.model = process.env.GROK_MODEL;

  return config;
}

/** Persist config with owner-only permissions (0600) — it holds your API key. */
export function saveConfig(config) {
  fs.mkdirSync(CONFIG_DIR, { recursive: true, mode: 0o700 });
  fs.writeFileSync(CONFIG_FILE, JSON.stringify(config, null, 2), { mode: 0o600 });
}

export function configPath() {
  return CONFIG_FILE;
}
