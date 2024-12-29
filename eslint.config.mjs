import path from 'node:path';
import { fileURLToPath } from 'node:url';

import { fixupPluginRules } from '@eslint/compat';
import { FlatCompat } from '@eslint/eslintrc';
import js from '@eslint/js';
import typescriptEslint from '@typescript-eslint/eslint-plugin';
import tsParser from '@typescript-eslint/parser';
import importPlugin from 'eslint-plugin-import';
import prettier from 'eslint-plugin-prettier';
import react from 'eslint-plugin-react';
import reactHooks from 'eslint-plugin-react-hooks';
import simpleImportSort from 'eslint-plugin-simple-import-sort';
import stylelint from 'eslint-plugin-stylelint';
import globals from 'globals';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const compat = new FlatCompat({
  baseDirectory: __dirname,
  recommendedConfig: js.configs.recommended,
  allConfig: js.configs.all,
});

export default [
  {
    ignores: [
      '**/node_modules',
      '**/dist',
      '**/webpack',
      '**/*.config.js',
      '**/*.config.ts',
    ],
  },
  ...compat.extends(
    'plugin:react/recommended',
    'airbnb',
    'plugin:@typescript-eslint/recommended',
    'prettier',
    'prettier/prettier',
    'plugin:prettier/recommended',
  ),
  {
    plugins: {
      react,
      '@typescript-eslint': typescriptEslint,
      'react-hooks': fixupPluginRules(reactHooks),
      'simple-import-sort': simpleImportSort,
      import: importPlugin,
      prettier,
      stylelint,
    },

    languageOptions: {
      globals: {
        ...globals.browser,
      },

      parser: tsParser,
      ecmaVersion: 12,
      sourceType: 'module',

      parserOptions: {
        ecmaFeatures: {
          jsx: true,
        },

        project: './tsconfig.json',
      },
    },

    settings: {
      'import/resolver': {
        node: {
          extensions: ['.js', '.jsx', '.ts', '.tsx'],
        },

        webpack: {
          config: './webpack/webpack.common.js',
        },

        alias: {
          map: [['~', './src']],
          extensions: ['.ts', '.tsx', '.js', '.jsx', '.json'],
        },
      },
    },

    rules: {
      'prettier/prettier': [
        'error',
        {
          endOfLine: 'auto',
        },
      ],

      'no-nested-ternary': 'off',

      'react/function-component-definition': [
        2,
        {
          namedComponents: 'arrow-function',
        },
      ],

      '@typescript-eslint/no-use-before-define': ['error'],

      'react/jsx-filename-extension': [
        'warn',
        {
          extensions: ['.tsx'],
        },
      ],

      'import/extensions': [
        'error',
        'ignorePackages',
        {
          js: 'never',
          jsx: 'never',
          ts: 'never',
          tsx: 'never',
        },
      ],

      'no-shadow': 'off',
      '@typescript-eslint/no-shadow': ['error'],

      '@typescript-eslint/explicit-function-return-type': 'error',

      '@typescript-eslint/lines-between-class-members': 0,

      'max-len': [
        'warn',
        {
          code: 80,
        },
      ],

      'react-hooks/rules-of-hooks': 'error',
      'react-hooks/exhaustive-deps': 'warn',
      'import/prefer-default-export': 'off',
      'react/prop-types': 'off',
      'react/react-in-jsx-scope': 'off',
      'react/require-default-props': 2,
      'react/state-in-constructor': 'off',
      'react/destructuring-assignment': 'off',

      'no-console': [
        'error',
        {
          allow: ['error', 'warn'],
        },
      ],

      'no-underscore-dangle': 'off',
      'react/no-array-index-key': 'error',
      'simple-import-sort/imports': 'error',
      'simple-import-sort/exports': 'error',
      'import/first': 'error',
      'import/newline-after-import': 'error',
      'import/no-duplicates': 'error',

      'import/no-extraneous-dependencies': [
        'error',
        {
          devDependencies: true,
        },
      ],

      'no-param-reassign': 0,
      'import/no-cycle': 'off',
    },
  },
  {
    files: ['**/*.ts', '**/*.tsx', '**/*.scss'],
  },
];
