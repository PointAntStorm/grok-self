import readline from 'node:readline';
import { loadConfig, saveConfig, configPath, DEFAULTS } from './config.js';
import { chatCompletion, chatCompletionStream, listModels } from './api.js';
import { startRepl } from './repl.js';
import { c, ok, info } from './ui.js';
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const pkg = JSON.parse(
  fs.readFileSync(
    path.join(path.dirname(fileURLToPath(import.meta.url)), '..', 'package.json'),
    'utf8'
  )
);

const USAGE = `
${c.bold('grokself')} — chat with xAI Grok from your terminal

${c.bold('USAGE')}
  grokself                      start interactive chat (REPL)
  grokself "your question"      one-shot answer (streams to stdout)
  grokself setup                save your xAI API key
  grokself models               list models available to your key
  cat file.js | grokself "explain this"   pipe context in

${c.bold('OPTIONS')}
  -m, --model <name>        model to use (default: ${DEFAULTS.model})
  -s, --system <prompt>     custom system prompt
  -t, --temperature <n>     sampling temperature (default: ${DEFAULTS.temperature})
      --no-stream           wait for the full answer, print once
  -v, --version             print version
  -h, --help                show this help

${c.bold('ENVIRONMENT')}
  XAI_API_KEY     your xAI API key (get one at https://console.x.ai)
  GROK_BASE_URL   override API base URL (default: ${DEFAULTS.baseUrl})
  GROK_MODEL      override default model

Config file: ${configPath()}
Docs: https://github.com/PointAntStorm/grok-self
`;

function parseArgs(argv) {
  const opts = { prompt: [] };
  for (let i = 0; i < argv.length; i++) {
    const a = argv[i];
    switch (a) {
      case '-h':
      case '--help':
        opts.help = true;
        break;
      case '-v':
      case '--version':
        opts.version = true;
        break;
      case '-m':
      case '--model':
        opts.model = argv[++i];
        break;
      case '-s':
      case '--system':
        opts.system = argv[++i];
        break;
      case '-t':
      case '--temperature':
        opts.temperature = Number(argv[++i]);
        break;
      case '--no-stream':
        opts.stream = false;
        break;
      default:
        opts.prompt.push(a);
    }
  }
  return opts;
}

async function runSetup(config) {
  const rl = readline.createInterface({ input: process.stdin, output: process.stdout });
  const ask = (q) => new Promise((r) => rl.question(q, r));

  console.log(c.bold('\ngrokself setup\n'));
  console.log('1. Open https://console.x.ai and sign in');
  console.log('2. Create an API key (it starts with "xai-")');
  console.log('3. Paste it below — it is stored locally in ' + configPath() + '\n');

  const key = (await ask('xAI API key: ')).trim();
  if (!key) {
    rl.close();
    throw new Error('no key entered — aborting');
  }
  const model =
    (await ask(`Default model [${config.model}]: `)).trim() || config.model;
  rl.close();

  saveConfig({ apiKey: key, model, baseUrl: config.baseUrl, temperature: config.temperature });
  ok(`saved. Try it:  grokself "hello Grok!"`);
}

/** Read all of stdin (used when input is piped). */
function readStdin() {
  return new Promise((resolve) => {
    let data = '';
    process.stdin.setEncoding('utf8');
    process.stdin.on('data', (d) => (data += d));
    process.stdin.on('end', () => resolve(data.trim()));
  });
}

export async function main(argv) {
  const opts = parseArgs(argv);

  if (opts.version) return console.log(`grokself v${pkg.version}`);
  if (opts.help) return console.log(USAGE);

  const config = loadConfig();
  if (opts.model) config.model = opts.model;
  if (opts.system) config.systemPrompt = opts.system;
  if (Number.isFinite(opts.temperature)) config.temperature = opts.temperature;

  const command = opts.prompt[0];

  if (command === 'setup') return runSetup(config);

  if (command === 'models') {
    const models = await listModels(config);
    console.log(models.join('\n'));
    return;
  }

  const oneShot = opts.prompt.join(' ').trim();
  const piped = !process.stdin.isTTY ? await readStdin() : '';

  // No prompt & no pipe → interactive mode.
  if (!oneShot && !piped) return startRepl(config);

  const userContent = piped
    ? `${oneShot || 'Please review the following:'}\n\n${piped}`
    : oneShot;

  const messages = [
    { role: 'system', content: config.systemPrompt },
    { role: 'user', content: userContent },
  ];

  if (opts.stream === false) {
    const reply = await chatCompletion(config, messages);
    console.log(reply);
  } else {
    await chatCompletionStream(config, messages, (t) => process.stdout.write(t));
    process.stdout.write('\n');
  }
}
