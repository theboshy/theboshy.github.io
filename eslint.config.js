import { defineConfig } from 'eslint/config';
import js from '@eslint/js';
import tseslint from 'typescript-eslint';
import astro from 'eslint-plugin-astro';
import globals from 'globals';

export default defineConfig(
  { ignores: ['dist', '.astro', 'node_modules', '.private'] },
  js.configs.recommended,
  tseslint.configs.strict,
  astro.configs.recommended,
  {
    languageOptions: { globals: { ...globals.browser, ...globals.node } },
    rules: {
      // `!` is used only where the DOM contract is guaranteed by our own server-rendered markup
      '@typescript-eslint/no-non-null-assertion': 'off',
    },
  },
);
