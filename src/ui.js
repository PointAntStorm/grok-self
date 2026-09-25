// Tiny zero-dependency terminal styling (ANSI escapes).
const enabled = process.stdout.isTTY && !process.env.NO_COLOR;
const ESC = '\u001b';

const wrap = (code) => (s) => (enabled ? `${ESC}[${code}m${s}${ESC}[0m` : String(s));

export const c = {
  bold: wrap('1'),
  dim: wrap('2'),
  italic: wrap('3'),
  underline: wrap('4'),
  cyan: wrap('36'),
  green: wrap('32'),
  yellow: wrap('33'),
  red: wrap('31'),
  magenta: wrap('35'),
  gray: wrap('90'),
};

export const BANNER = `
   ▄████  ██▀███   ▒█████   ██ ▄█▀
  ██▒ ▀█▒▓██ ▒ ██▒▒██▒  ██▒ ██▄█▒
 ▒██░▄▄▄░▓██ ░▄█ ▒▒██░  ██▒▓███▄░
 ░▓█  ██▓▒██▀▀█▄  ▒██   ██░▓██ █▄
 ░▒▓███▀▒░██▓ ▒██▒░ ████▓▒░▒██▒ █▄   CLI · self-hosted
`;

export function info(msg) {
  console.log(`${c.cyan('ℹ')} ${msg}`);
}

export function ok(msg) {
  console.log(`${c.green('✔')} ${msg}`);
}

export function warn(msg) {
  console.log(`${c.yellow('⚠')} ${msg}`);
}

export function err(msg) {
  console.error(`${c.red('✖')} ${msg}`);
}
