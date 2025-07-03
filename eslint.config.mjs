import { defineConfig } from '@poupe/eslint-config';

export default defineConfig({
  ignores: ['package.json'],
  rules: {
    'max-len': ['error', { code: 80 }],
  },
});
