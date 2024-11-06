const { FlatCompat } = require('@eslint/eslintrc');
const babelParser = require('@babel/eslint-parser');
const eslintPluginReact = require('eslint-plugin-react');
const eslintPluginReactHooks = require('eslint-plugin-react-hooks');

const compat = new FlatCompat({
  baseDirectory: __dirname,
  recommendedConfig: true,
});

module.exports = [
  ...compat.extends('eslint:recommended', 'plugin:react/recommended'),
  {
    languageOptions: {
      parser: babelParser,
      parserOptions: {
        ecmaVersion: 2021,
        sourceType: 'module',
        ecmaFeatures: {
          jsx: true,
        },
        requireConfigFile: false,
      },
      globals: {
        browser: true,
        es2021: true,
      },
    },
    plugins: {
      react: eslintPluginReact,
      'react-hooks': eslintPluginReactHooks,
    },
    rules: {
      'react-hooks/rules-of-hooks': 'error', // Verifica las reglas de los hooks
      'react-hooks/exhaustive-deps': 'warn', // Verifica las dependencias de los hooks
    },
    settings: {
      react: {
        version: 'detect',
      },
    },
  },
];