import { $ } from 'zx';
import { success, fail, load } from './helpers.mjs';
$.verbose = false;

let current;
current = load('Checking for errors...');
try {
  await $`zx scripts/check.mjs`;
} catch (_err) {
  fail('checks', 'zx scripts/check.mjs');
}
current.stop();
success('No errors found.');

current = load('Building distribution bundles...');
try {
  await $`zx scripts/build.mjs`;
} catch (_err) {
  fail('build', 'pnpm build');
}
current.stop();
success('Built distribution bundles.');

await $`zx scripts/citation.mjs`;

await $`bumpp --commit --push --tag && pnpm publish`;
