#! /usr/bin/env node

import { intro, outro } from '@clack/prompts';
import chalk from 'chalk';
import { installPackage } from './utils/package-manager.js';
import { abort } from './utils/utils.js';
import { handleConfigFile } from './utils/config.js';
import { isPackageInstalled } from './utils/package-json.js';

async function runMillionWizard(): Promise<void> {
  const isMillionAlreadyInstalled = await isPackageInstalled();
  await installPackage({
    packageName: 'million',
    alreadyInstalled: isMillionAlreadyInstalled,
  });
  await handleConfigFile();
}

async function main() {
  intro(showWelcomeScreen());
  await runMillionWizard();
  outro(`${chalk.bold.green('✓ ')} You're all set!`);
}

main().catch(() => {
  abort(
    'Failed to setup Million.js, refer to the docs for manual setup: https://million.dev/docs/install',
  );
});

function showWelcomeScreen() {
  const text = `${chalk.bold(chalk.bgMagentaBright(' million '))}`;
  return text;
}
