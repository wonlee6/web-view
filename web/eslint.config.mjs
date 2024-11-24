import typescriptPlugin from '@typescript-eslint/eslint-plugin';
import typescriptParser from '@typescript-eslint/parser';
import jsxA11y from 'eslint-plugin-jsx-a11y';
import reactPlugin from 'eslint-plugin-react';
import reactHooksPlugin from 'eslint-plugin-react-hooks';
import importPlugin from 'eslint-plugin-import';
import prettierPlugin from 'eslint-plugin-prettier';
import nextPlugin from '@next/eslint-plugin-next';

export default [
  {
    ignores: ['dist/**', 'node_modules/**'],
  },
  {
    linterOptions: {
      reportUnusedDisableDirectives: true,
    },
    languageOptions: {
      ecmaVersion: 2024,
      sourceType: 'module',
      parser: typescriptParser,
      parserOptions: {
        project: './tsconfig.json',
      },
      globals: {
        browser: true,
      },
    },
    plugins: {
      '@next/next': nextPlugin,
      react: reactPlugin,
      'react-hooks': reactHooksPlugin,
      '@typescript-eslint': typescriptPlugin,
      'jsx-a11y': jsxA11y,
      import: importPlugin,
      prettier: prettierPlugin,
    },
    rules: {
      'import/order': [
        'error',
        {
          'newlines-between': 'always',
          pathGroupsExcludedImportTypes: ['react'],
          alphabetize: {
            order: 'asc',
            caseInsensitive: true,
          },
          groups: [
            'builtin',
            'external',
            'internal',
            'parent',
            'sibling',
            'index',
            'object',
            'type',
          ],
          pathGroups: [
            {
              pattern: 'react',
              group: 'external',
              position: 'before',
            },
            {
              pattern: '@/**',
              group: 'internal',
              position: 'after',
            },
          ],
        },
      ],
      'import/no-duplicates': 'error',
      'import/no-unresolved': 'error',
      'react/react-in-jsx-scope': 'off',
      'react/prop-types': 'off',
      'react/display-name': 'off',
      'react-hooks/rules-of-hooks': 'error',
      'react-hooks/exhaustive-deps': 'warn',
      '@typescript-eslint/no-unused-vars': [
        'warn',
        {
          argsIgnorePattern: '^_',
          varsIgnorePattern: '^_',
        },
      ],
      '@typescript-eslint/prefer-optional-chain': 'off',
      '@typescript-eslint/prefer-nullish-coalescing': 'off',
      '@typescript-eslint/restrict-template-expressions': 'off',
      '@typescript-eslint/explicit-module-boundary-types': 'off',
      '@typescript-eslint/no-explicit-any': 'warn',
      '@typescript-eslint/consistent-type-imports': [
        'error',
        { prefer: 'type-imports' },
      ],
      '@typescript-eslint/no-import-type-side-effects': 'error',
      '@typescript-eslint/no-deprecated': 'off',
      '@typescript-eslint/no-unnecessary-condition': 'off',
      'no-console': ['warn', { allow: ['warn', 'error'] }],
      'no-debugger': 'warn',
      'prefer-const': 'error',
      'no-var': 'error',
      'no-multiple-empty-lines': ['error', { max: 1, maxEOF: 0 }],
      'eol-last': ['error', 'always'],
      'jsx-a11y/anchor-has-content': 'off',
      'jsx-a11y/heading-has-content': 'off',
    },
  },
];
