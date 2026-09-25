import readline from 'node:readline';
import fs from 'node:fs';
import path from 'node:path';
import os from 'node:os';
import { chatCompletionStream } from './api.js';
import { c, BANNER, info, ok, warn } from './ui.js';

const HELP = `
${c.bold('Interactive commands:')}
  /help              show this help
  /model <name>      switch model for this session (e.g. /model grok-code-fast-1)
  /system <prompt>   set a new system prompt
  /clear             forget the conversation history
  /save <file>       save the conversation to a Markdown file
  /exit, /quit       leave the chat (or press Ctrl+C / Ctrl+D)

Anything else is sent to Grok. Multi-line: end a line with \\ to continue.
`;

/** Interactive chat REPL. */
export async function startRepl(config) {
  console.log(c.magenta(BANNER));
  info(`model: ${c.bold(config.model)}  ·  type ${c.bold('/help')} for commands, ${c.bold('/exit')} to quit\n`);

  const messages = [{ role: 'system', content: config.systemPrompt }];

  const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
    prompt: c.cyan('you › '),
    historySize: 200,
  });

  rl.prompt();
  let pending = '';

  rl.on('line', async (line) => {
    // Multi-line input with trailing backslash.
    if (line.endsWith('\\')) {
      pending += line.slice(0, -1) + '\n';
      rl.setPrompt(c.gray('... '));
      rl.prompt();
      return;
    }
    const input = (pending + line).trim();
    pending = '';
    rl.setPrompt(c.cyan('you › '));

    if (!input) return rl.prompt();

    if (input.startsWith('/')) {
      const [cmd, ...rest] = input.split(/\s+/);
      const arg = rest.join(' ');
      switch (cmd) {
        case '/help':
          console.log(HELP);
          break;
        case '/model':
          if (!arg) info(`current model: ${config.model}`);
          else {
            config.model = arg;
            ok(`model switched to ${c.bold(arg)}`);
          }
          break;
        case '/system':
          if (!arg) info(`current system prompt: ${messages[0].content}`);
          else {
            messages[0].content = arg;
            ok('system prompt updated');
          }
          break;
        case '/clear':
          messages.length = 1;
          ok('conversation cleared');
          break;
        case '/save': {
          const file =
            arg || path.join(os.homedir(), `grokself-chat-${Date.now()}.md`);
          const md = messages
            .filter((m) => m.role !== 'system')
            .map((m) => `## ${m.role === 'user' ? '🧑 You' : '🤖 Grok'}\n\n${m.content}\n`)
            .join('\n');
          fs.writeFileSync(file, `# grokself conversation\n\n${md}`);
          ok(`saved to ${file}`);
          break;
        }
        case '/exit':
        case '/quit':
          rl.close();
          return;
        default:
          warn(`unknown command ${cmd} — try /help`);
      }
      return rl.prompt();
    }

    messages.push({ role: 'user', content: input });
    process.stdout.write(c.green('\ngrok › '));
    try {
      const reply = await chatCompletionStream(config, messages, (t) =>
        process.stdout.write(t)
      );
      messages.push({ role: 'assistant', content: reply });
    } catch (e) {
      console.error(`\n${c.red('✖')} ${e.message}`);
      messages.pop(); // don't poison history with a failed turn
    }
    process.stdout.write('\n\n');
    rl.prompt();
  });

  rl.on('close', () => {
    console.log(c.gray('\nbye 👋'));
    process.exit(0);
  });
}
