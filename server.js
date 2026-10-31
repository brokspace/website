// Entry file for hosts that start a script rather than `pnpm start`
// (Hostinger Node.js web apps). Same server as `pnpm start`: react-router-serve
// on $PORT, serving build/ (run `pnpm build` first).
import { createRequire } from 'node:module';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';

const root = dirname(fileURLToPath(import.meta.url));
const require = createRequire(import.meta.url);
const serve = dirname(require.resolve('@react-router/serve/package.json'));

process.chdir(root);
process.argv.splice(2, process.argv.length - 2, join(root, 'build', 'server', 'index.js'));
require(join(serve, 'bin.cjs'));
