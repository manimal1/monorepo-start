/** @type {import("eslint").Linter.Config} */
module.exports = {
  root: true,
  parser: '@typescript-eslint/parser',
  parserOptions: {
    ecmaVersion: 2018,
    sourceType: 'module',
    project: true,
  },
  ignorePatterns: [
    '__tests__/',
    'bin/',
    'config.ts',
    '__mocks__',
    'eslintrc.js',
  ],
  env: {
    node: true,
    es2020: true,
  },
  plugins: [
    '@typescript-eslint',
    'prettier',
    'import',
    'prettier',
    'eslint-plugin-import',
    'no-relative-import-paths',
  ],
  extends: [
    'eslint:recommended',
    'plugin:@typescript-eslint/recommended',
    'plugin:prettier/recommended',
    'plugin:import/recommended',
    'plugin:import/typescript',
  ],
  rules: {
    'no-shadow': 'off',
    'linebreak-style': 0,
    '@typescript-eslint/no-shadow': 'warn',
    'no-underscore-dangle': 'off',
    'no-param-reassign': 'warn',
    'import/extensions': [
      'warn',
      'ignorePackages',
      {
        ts: 'never',
        js: 'never',
      },
    ],
    'consistent-return': 'warn',
    'no-loop-func': 'warn',
    'no-await-in-loop': 'warn',
    camelcase: 'warn',
    'prettier/prettier': 'warn',
    '@typescript-eslint/no-explicit-any': 'warn',
    '@typescript-eslint/no-unused-vars': 'warn',
    'no-console': 'warn',
    'no-nested-ternary': 'error',
    'max-depth': ['error', 3],
    'max-params': ['error', 4],
    complexity: ['error', 7],
    '@typescript-eslint/explicit-function-return-type': [
      'error',
      {
        allowedNames: ['*.controller*'],
      },
    ],
    'sort-imports': [
      'error',
      {
        ignoreCase: false,
        ignoreDeclarationSort: true, // don"t want to sort import lines, use eslint-plugin-import instead
        ignoreMemberSort: false,
        memberSyntaxSortOrder: ['none', 'all', 'multiple', 'single'],
        allowSeparatedGroups: true,
      },
    ],
    // turn on errors for missing imports
    'import/no-unresolved': 'error',
    'import/no-named-as-default-member': 'false',
    'import/order': [
      'error',
      {
        groups: [
          'builtin', // Built-in imports (come from NodeJS native) go first
          'external', // <- External imports
          'internal', // <- Absolute imports
          ['sibling', 'parent'], // <- Relative imports, the sibling and parent types they can be mingled together
          'index', // <- Index imports
          'unknown', // <- Unknown
        ],
        pathGroups: [
          {
            pattern: '*/**', // Pattern for absolute external imports (but not @p3)
            group: 'external',
            position: 'after',
          },
          {
            pattern: '~/**', // Pattern for absolute internal imports
            group: 'internal',
            position: 'after',
          },
        ],
        pathGroupsExcludedImportTypes: ['builtin'],
        'newlines-between': 'always',
        alphabetize: {
          order: 'asc',
          caseInsensitive: true,
        },
      },
    ],
    'no-relative-import-paths/no-relative-import-paths': [
      'error',
      { allowSameFolder: true },
    ],
  },

  overrides: [
    {
      // Disable the rule specifically for *.controller.ts and *.controller.js files
      files: ['*controller.ts', '*controller.js'],
      rules: {
        '@typescript-eslint/explicit-function-return-type': 'off',
      },
    },
  ],
  settings: {
    'import/resolver': {
      typescript: {
        alwaysTryTypes: true,
        project: ['./tsconfig.json', './tsconfig.build.json'],
      },
      node: {
        paths: ['node_modules', './node_modules', '~/node_modules'],
        extensions: ['.js', '.ts', '.d.ts'],
      },
    },
  },
};
