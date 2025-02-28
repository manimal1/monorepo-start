/** @type {import("eslint").Linter.Config} */
module.exports = {
  root: true,
  extends: ['@repo/eslint-config/index.js'],
  ignorePatterns: ['node_modules', 'public', '.eslintrc.cjs', 'build', 'dist'],
  parser: '@typescript-eslint/parser',
  settings: {
    'import/resolver': {
      typescript: {
        alwaysTryTypes: true,
        project: ['./tsconfig.json'],
      },
      node: {
        paths: ['node_modules', './node_modules', '~/node_modules'],
      },
      alias: {
        map: [
          ['~/*', './src/*'],
          ['__tests__', './src/__tests__'],
          ['__mocks__', './src/__mocks__'],
        ],
        extensions: ['.ts', '.tsx', '.js', '.jsx'],
      },
    },
  },
};
