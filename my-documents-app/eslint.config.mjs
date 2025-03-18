import tseslint from '@typescript-eslint/eslint-plugin'
import tsparser from '@typescript-eslint/parser'
import prettierPlugin from 'eslint-plugin-prettier'
import prettierConfig from 'eslint-config-prettier'
import importPlugin from 'eslint-plugin-import'
import jsxA11y from 'eslint-plugin-jsx-a11y'
import react from 'eslint-plugin-react'
import reactHooks from 'eslint-plugin-react-hooks'
import unusedImports from 'eslint-plugin-unused-imports'

/** @type {import("eslint").Linter.Config} */
export default {
  languageOptions: {
    parser: tsparser,
    globals: {
      document: 'readonly',
      console: 'readonly',
      h: 'writable' // ⬅️ Asegurar que `h` no se elimine
    }
  },
  settings: {
    react: {
      pragma: 'h'
    }
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
    'no-console': process.env.NODE_ENV === 'production' ? 'warn' : 'off',
    'unused-imports/no-unused-imports': 'off',
    '@typescript-eslint/no-unused-vars': [
      'warn',
      {
        vars: 'all',
        args: 'after-used',
        ignoreRestSiblings: true
      }
    ],
    'react/react-in-jsx-scope': 'off',
    'react/jsx-filename-extension': ['warn', { extensions: ['.tsx'] }],
    'react/prop-types': 'off',
    'import/prefer-default-export': 'off',
    'import/extensions': 'off',
    'import/no-extraneous-dependencies': 'off'
  }
}
