import globals from 'globals';
import pluginJs from '@eslint/js';
import tseslint from 'typescript-eslint';
import eslintReact from 'eslint-plugin-react';
import reactHooks from 'eslint-plugin-react-hooks';
import reactRefresh from 'eslint-plugin-react-refresh';
import eslintPrettier from 'eslint-plugin-prettier';
import eslintConfigPrettier from 'eslint-config-prettier';

/** @type {import('eslint').Linter.Config[]} */
export default tseslint.config(
    {
        plugins: {
            '@typescript-eslint': tseslint.plugin,
            'react-hooks': reactHooks,
            react: eslintReact,
            'react-refresh': reactRefresh,
            prettier: eslintPrettier,
        },
    },
    {
        ignores: ['node_modules', 'dist'],
    },
    {
        files: ['**/*.{js,mjs,cjs,ts,jsx,tsx}'],
        extends: [pluginJs.configs.recommended, tseslint.configs.recommended],
        rules: {
            ...eslintPrettier.configs.recommended.rules,
            ...eslintConfigPrettier.rules,
            'prettier/prettier': 'warn',
            '@typescript-eslint/no-unused-vars': ['warn'],
            '@typescript-eslint/no-explicit-any': ['warn'],
            'prefer-const': 'warn',
        },
    },
    {
        languageOptions: {
            globals: { ...globals.browser, ...globals.node, ...globals.es2021 },
        },
    }
);
