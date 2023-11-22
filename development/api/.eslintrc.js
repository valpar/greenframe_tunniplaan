const path = require('path');

module.exports = {
  env: {
    browser: true,
    es2021: true,
    mocha: true,
  },
  extends: [
    'airbnb-base',
    'airbnb-typescript/base',
    'plugin:import/recommended',
    'plugin:import/typescript',
  ],
  parser: '@typescript-eslint/parser',
  parserOptions: {
    ecmaVersion: 'latest',
    sourceType: 'module',
    project: path.join(__dirname, 'tsconfig.eslint.json'),
    // project: path.join(__dirname, "tsconfig.eslint.json")
    // project: './tsconfig.json', //typescript eslint tahab olla projekti
    // juurkaustas tsconfig failiga, kui mõlemad development/api all on siis ei leia ts-eslint seda
    // project: './tsconfig.json',
  },
  plugins: [
    '@typescript-eslint',
  ],
  rules: {
    'linebreak-style': 0,
  },
  settings: {
    'import/parsers': {
      '@typescript-eslint/parser': ['.ts', '.tsx'],
    },
    'import/resolver': {
      typescript: true,
      node: true,
    },
  },
};