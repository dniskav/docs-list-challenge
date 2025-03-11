import js from '@eslint/js'
import tseslint from '@typescript-eslint/eslint-plugin'
import tsparser from '@typescript-eslint/parser'
import prettierPlugin from 'eslint-plugin-prettier'
import prettierConfig from 'eslint-config-prettier'
import airbnb from 'eslint-config-airbnb'
import importPlugin from 'eslint-plugin-import'
import jsxA11y from 'eslint-plugin-jsx-a11y'
import react from 'eslint-plugin-react'
import reactHooks from 'eslint-plugin-react-hooks'
import unusedImports from 'eslint-plugin-unused-imports'

/** @type {import("eslint").Linter.FlatConfig[]} */
export default [
  js.configs.recommended,
  prettierConfig,
  {
    files: ['**/*.ts', '**/*.tsx'],
    languageOptions: {
      parser: tsparser
    },
    plugins: {
      '@typescript-eslint': tseslint,
      import: importPlugin,
      'jsx-a11y': jsxA11y,
      react,
      'react-hooks': reactHooks,
      'unused-imports': unusedImports,
      prettier: prettierPlugin
    },
    rules: {
      'prettier/prettier': 'error',
      'no-console': 'warn',
      'unused-imports/no-unused-imports': 'error',
      'react/react-in-jsx-scope': 'off',
      'react/jsx-filename-extension': ['warn', { extensions: ['.tsx'] }],
      'react/prop-types': 'off',
      '@typescript-eslint/no-unused-vars': 'warn',
      'import/prefer-default-export': 'off',
      'import/extensions': 'off',
      'import/no-extraneous-dependencies': 'off'
    }
  }
]
