// Minimal xAI (Grok) API client — OpenAI-compatible, zero dependencies.
// Uses the global fetch available in Node.js 18+.

export class GrokApiError extends Error {
  constructor(message, status) {
    super(message);
    this.name = 'GrokApiError';
    this.status = status;
  }
}

function assertKey(config) {
  if (!config.apiKey) {
    throw new GrokApiError(
      'No API key found.\n' +
        '  Get one at https://console.x.ai and then either:\n' +
        '    • run:  grokself setup\n' +
        '    • or:   export XAI_API_KEY="xai-..."',
      401
    );
  }
}

async function handleErrorResponse(res) {
  let detail = '';
  try {
    const body = await res.json();
    detail = body?.error?.message || JSON.stringify(body);
  } catch {
    detail = await res.text().catch(() => '');
  }
  const hints = {
    401: 'Invalid API key. Run `grokself setup` or check XAI_API_KEY.',
    403: 'Access denied. Check your xAI account/billing at https://console.x.ai',
    404: `Model not found. Try \`grokself --model grok-4-latest\` or list models with \`grokself models\`.`,
    429: 'Rate limited or out of credits. Slow down or top up at https://console.x.ai',
  };
  throw new GrokApiError(
    `xAI API error ${res.status}: ${detail}${hints[res.status] ? '\n  → ' + hints[res.status] : ''}`,
    res.status
  );
}

/**
 * One-shot (non-streaming) chat completion.
 * @returns {Promise<string>} assistant message content
 */
export async function chatCompletion(config, messages) {
  assertKey(config);
  const res = await fetch(`${config.baseUrl}/chat/completions`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${config.apiKey}`,
    },
    body: JSON.stringify({
      model: config.model,
      messages,
      temperature: config.temperature,
      stream: false,
    }),
  });
  if (!res.ok) await handleErrorResponse(res);
  const data = await res.json();
  return data.choices?.[0]?.message?.content ?? '';
}

/**
 * Streaming chat completion. Calls onToken(text) for every delta.
 * @returns {Promise<string>} the full assembled reply
 */
export async function chatCompletionStream(config, messages, onToken) {
  assertKey(config);
  const res = await fetch(`${config.baseUrl}/chat/completions`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${config.apiKey}`,
    },
    body: JSON.stringify({
      model: config.model,
      messages,
      temperature: config.temperature,
      stream: true,
    }),
  });
  if (!res.ok) await handleErrorResponse(res);

  const decoder = new TextDecoder();
  let buffer = '';
  let full = '';

  for await (const chunk of res.body) {
    buffer += decoder.decode(chunk, { stream: true });
    const lines = buffer.split('\n');
    buffer = lines.pop() ?? '';
    for (const line of lines) {
      const trimmed = line.trim();
      if (!trimmed.startsWith('data:')) continue;
      const payload = trimmed.slice(5).trim();
      if (payload === '[DONE]') return full;
      try {
        const json = JSON.parse(payload);
        const delta = json.choices?.[0]?.delta?.content;
        if (delta) {
          full += delta;
          onToken?.(delta);
        }
      } catch {
        /* keep-alive or partial JSON — ignore */
      }
    }
  }
  return full;
}

/** List models available to this API key. */
export async function listModels(config) {
  assertKey(config);
  const res = await fetch(`${config.baseUrl}/models`, {
    headers: { Authorization: `Bearer ${config.apiKey}` },
  });
  if (!res.ok) await handleErrorResponse(res);
  const data = await res.json();
  return (data.data ?? []).map((m) => m.id).sort();
}
