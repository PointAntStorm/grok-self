#!/usr/bin/env node
import { main } from '../src/cli.js';

main(process.argv.slice(2)).catch((err) => {
  console.error(`\n✖ grokself: ${err.message}`);
  process.exit(1);
});
