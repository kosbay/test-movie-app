module.exports = {
  parser: '@typescript-eslint/parser',
  plugins: ['react', '@typescript-eslint', 'prettier', 'import'],
  extends: [
    'eslint:recommended',
    'plugin:react/recommended',
    'plugin:@typescript-eslint/recommended',
    'prettier',
    'plugin:prettier/recommended',
    'plugin:import/recommended',
    'plugin:import/typescript',
  ],
  env: {
    es6: true,
    browser: true,
    jest: true,
    node: true,
  },
  rules: {
    'arrow-body-style': ['error', 'as-needed'],
    'no-use-before-define': 'off',
    'import/no-anonymous-default-export': 'off',
    'newline-before-return': 'off',
    'newline-after-var': 'off',
    'padding-line-between-statements': [
      'error',
      { blankLine: 'always', prev: '*', next: 'return' },
      { blankLine: 'always', prev: ['const', 'let', 'var'], next: '*' },
      { blankLine: 'any', prev: ['const', 'let', 'var'], next: ['const', 'let', 'var'] },
    ],
    'react/prop-types': 'off',
    'react/jsx-boolean-value': ['error', 'never'],
    'react/jsx-key': ['error'],
    'react/jsx-curly-brace-presence': ['error', { props: 'never', children: 'never' }],
    '@typescript-eslint/no-use-before-define': ['error', { functions: false }],
    '@typescript-eslint/no-non-null-assertion': 'off',
    '@typescript-eslint/no-empty-interface': 'off',
    '@typescript-eslint/ban-ts-ignore': 'off',
    '@typescript-eslint/ban-ts-comment': 'off',
    '@typescript-eslint/no-unused-vars': [
      process.env.PRECOMMIT ? 'error' : 'warn',
      {
        argsIgnorePattern: '^_',
        args: 'after-used',
        ignoreRestSiblings: true,
      },
    ],
    '@typescript-eslint/no-explicit-any': 'off',
    '@typescript-eslint/no-empty-function': 'off',
    '@typescript-eslint/explicit-module-boundary-types': 'off',
    '@typescript-eslint/ban-types': [
      'error',
      {
        types: {
          '{}': false,
        },
      },
    ],
    camelcase: 'off',
    '@typescript-eslint/naming-convention': [
      'error',
      {
        selector: ['variable', 'function'],
        format: ['camelCase', 'UPPER_CASE', 'PascalCase'],
      },
      {
        selector: 'parameter',
        format: ['camelCase', 'PascalCase'],
        leadingUnderscore: 'allow',
      },
      {
        selector: 'typeLike',
        format: ['PascalCase'],
      },
      {
        selector: 'enumMember',
        format: null,
      },
      {
        selector: 'objectLiteralProperty',
        format: null,
      },
    ],
    'import/no-unresolved': 'error',
    'sort-imports': ['error', { ignoreCase: true, ignoreDeclarationSort: true }],
    'import/order': [
      'error',
      {
        groups: ['builtin', 'external', 'internal', 'type', 'sibling', 'index', 'unknown'],
        pathGroups: [
          {
            pattern: '{react,react-*}',
            group: 'external',
            position: 'before',
          },
          {
            pattern: '**/__generated__/**',
            group: 'type',
          },
          {
            pattern: 'assets/**',
            group: 'sibling',
            position: 'before',
          },
          {
            pattern: '../**',
            group: 'index',
            position: 'before',
          },
          {
            pattern: '*.+(css|sass|less|scss|pcss|styl)*(?*)',
            patternOptions: {
              dot: true,
              nocomment: true,
              matchBase: true,
            },
            group: 'unknown',
            position: 'after',
          },
        ],
        pathGroupsExcludedImportTypes: ['react'],
        'newlines-between': 'always',
        alphabetize: {
          order: 'asc',
          caseInsensitive: true,
        },
      },
    ],
    'eol-last': 2,
    'no-multiple-empty-lines': ['error', { max: 1, maxEOF: 1, maxBOF: 0 }],
  },
  settings: {
    react: {
      pragma: 'React',
      version: 'detect',
    },
    'import/resolver': {
      node: {
        extensions: ['.js', '.jsx', '.ts', '.tsx'],
        moduleDirectory: ['node_modules', 'src/'],
      },
      typescript: {
        alwaysTryTypes: true,
      },
    },
  },
}
