import { defineBuildConfig } from 'unbuild';
import banner from 'rollup-plugin-banner2';
import { readFileSync } from 'node:fs';
import { join } from 'node:path';

const version = JSON.parse(
  readFileSync(join(__dirname, 'package.json'), 'utf-8')
).version;

export default defineBuildConfig({
  entries: [
    './packages/million',
    './packages/jsx-runtime',
    './packages/compiler',
    './packages/react',
    './packages/react-server',
    './packages/types',
  ],
  declaration: true,
  clean: true,
  failOnWarn: false,
  rollup: {
    emitCJS: true,
    inlineDependencies: true,
    replace: {
      'process.env.VERSION': JSON.stringify(version),
      preventAssignment: true,
    }
  },
  hooks: {
    'rollup:options'(_ctx, options) {
      if (Array.isArray(options?.plugins)) {
        options.plugins.push(banner(() => `'use client';\n`) as any);
      }
    },
  },
  externals: [
    'react',
    'react-dom',
    'million',
    'vite',
    'esbuild',
    'rollup',
  ],
});
