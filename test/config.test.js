import { test } from 'node:test';
import assert from 'node:assert/strict';
import { loadConfig, DEFAULTS } from '../src/config.js';

test('loadConfig returns defaults when no config file exists', () => {
  delete process.env.XAI_API_KEY;
  delete process.env.GROK_BASE_URL;
  delete process.env.GROK_MODEL;
  const config = loadConfig();
  assert.equal(config.baseUrl, DEFAULTS.baseUrl);
  assert.equal(config.model, DEFAULTS.model);
  assert.equal(config.temperature, DEFAULTS.temperature);
});

test('environment variables override defaults', () => {
  process.env.XAI_API_KEY = 'xai-test-key';
  process.env.GROK_MODEL = 'grok-test-model';
  const config = loadConfig();
  assert.equal(config.apiKey, 'xai-test-key');
  assert.equal(config.model, 'grok-test-model');
  delete process.env.XAI_API_KEY;
  delete process.env.GROK_MODEL;
});
