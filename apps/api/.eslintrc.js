module.exports = {
  root: true,
  parser: '@typescript-eslint/parser',
  parserOptions: {
    project: 'tsconfig.json',
    sourceType: 'module',
    ecmaVersion: 2022,
  },
  plugins: ['@typescript-eslint', 'simple-import-sort'],
  extends: [
    'eslint:recommended',
    'plugin:@typescript-eslint/recommended',
    'plugin:@typescript-eslint/recommended-type-checked',
    'plugin:prettier/recommended',
    'plugin:unicorn/recommended',
    'plugin:node/recommended',
    'prettier'
  ],
  rules: {
    'simple-import-sort/imports': 'error',
    'simple-import-sort/exports': 'error',
    'unicorn/prefer-module': 'off',
    'unicorn/prefer-top-level-await': 'off',
    'unicorn/prevent-abbreviations': 'off',
    'no-console': 'warn',
    'node/no-missing-import': 'off',
    'node/no-unsupported-features/es-syntax': [
      'error',
      { ignores: ['modules'] },
    ],
    'node/no-unpublished-import': 'off',
    'no-process-exit': 'off',
    'prettier/prettier': ['error', { 'endOfLine': 'auto' }]
  },
  overrides: [
    {
      files: ['*.ts'],
      rules: {
        'simple-import-sort/imports': [
          'error',
          {
            groups: [
              [
                '^(assert|buffer|child_process|cluster|console|constants|crypto|dgram|dns|domain|events|fs|http|https|module|net|os|path|punycode|querystring|readline|repl|stream|string_decoder|sys|timers|tls|tty|url|util|vm|zlib|freelist|v8|process|async_hooks|http2|perf_hooks)(/.*|$)',
              ],
              [
                '^node:.*\\u0000$',
                '^@?\\w.*\\u0000$',
                '^[^.].*\\u0000$',
                '^\\..*\\u0000$',
              ],
              ['^\\u0000'],
              ['^node:'],
              ['^@?\\w'],
              ['^@src(/.*|$)'],
              ['^@core(/.*|$)'],
              ['^@shared(/.*|$)'],
              ['^@contexts(/.*|$)'],
              ['^'],
              ['^\\.'],
            ],
          },
        ],
      },
    },
    {
      files: ['scripts/**'],
      rules: {
        'no-console': 'off',
      },
    },
    {
      files: ['tests/**'],
      plugins: ['vitest'],
      rules: {
        '@typescript-eslint/unbound-method': 'off',
        'vitest/expect-expect': 'off',
        'vitest/no-standalone-expect': 'off',
      },
    },
    {
      files: ['tests/performance/**'],
      rules: {
        'unicorn/numeric-separators-style': 'off',
        'unicorn/no-anonymous-default-export': 'off',
        '@typescript-eslint/no-unsafe-call': 'off',
        '@typescript-eslint/no-unsafe-assignment': 'off',
        '@typescript-eslint/no-unsafe-member-access': 'off',
        'no-undef': 'off',
      },
    },
  ],
  env: {
    node: true,
  },
};
