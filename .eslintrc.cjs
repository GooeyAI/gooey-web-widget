module.exports = {
  root: true,
  env: {
    browser: true,
    es2020: true,
  },
  parser: '@typescript-eslint/parser',
  parserOptions: {
    ecmaVersion: 2020,
    sourceType: 'module',
    ecmaFeatures: {
      jsx: true, // ⬅️ This is KEY for JSX support
    },
  },
  settings: {
    react: {
      version: 'detect', // ⬅️ Auto-detect React version (fixes many JSX lint errors)
    },
  },
  extends: [
    'eslint:recommended',
    'plugin:react/recommended', // ⬅️ This adds React JSX rules
    'plugin:@typescript-eslint/recommended',
    'plugin:react-hooks/recommended',
  ],
  plugins: ['react', 'react-refresh'],
  ignorePatterns: ['dist', '.eslintrc.cjs'],
  rules: {
    "react-refresh/only-export-components": [
      "warn",
      { allowConstantExport: true },
    ],
    "prefer-const": "off",
    "@typescript-eslint/no-unused-vars": "off",
  },
};
