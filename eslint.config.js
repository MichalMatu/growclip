import js from '@eslint/js';
import typescript from '@typescript-eslint/eslint-plugin';
import typescriptParser from '@typescript-eslint/parser';
import prettier from 'eslint-config-prettier';
import svelte from 'eslint-plugin-svelte';

const globals = {
	CanvasRenderingContext2D: 'readonly',
	HTMLCanvasElement: 'readonly',
	HTMLElement: 'readonly',
	IntersectionObserver: 'readonly',
	ResizeObserver: 'readonly',
	clearTimeout: 'readonly',
	console: 'readonly',
	document: 'readonly',
	globalThis: 'readonly',
	module: 'readonly',
	process: 'readonly',
	requestAnimationFrame: 'readonly',
	require: 'readonly',
	setTimeout: 'readonly',
	window: 'readonly'
};

export default [
	{
		ignores: [
			'.svelte-kit/**',
			'build/**',
			'node_modules/**',
			'src/lib/features/litegraph/vendor/**'
		]
	},
	js.configs.recommended,
	{
		files: ['**/*.{cjs,js,ts}'],
		ignores: ['.svelte-kit/**', 'build/**', 'node_modules/**'],
		languageOptions: {
			parser: typescriptParser,
			parserOptions: {
				ecmaVersion: 2022,
				sourceType: 'module'
			},
			globals
		},
		plugins: {
			'@typescript-eslint': typescript
		},
		rules: {
			...typescript.configs.recommended.rules,
			'@typescript-eslint/no-explicit-any': 'off',
			'@typescript-eslint/no-unused-vars': ['warn', { argsIgnorePattern: '^_' }],
			'no-undef': 'off',
			'no-unused-vars': 'off'
		}
	},
	{
		files: ['**/*.cjs'],
		rules: {
			'@typescript-eslint/no-require-imports': 'off'
		}
	},
	...svelte.configs['flat/recommended'].map((config) => ({
		...config,
		ignores: ['.svelte-kit/**', 'build/**', 'node_modules/**'],
		languageOptions: {
			...(config.languageOptions ?? {}),
			globals,
			parserOptions: {
				...((config.languageOptions ?? {}).parserOptions ?? {}),
				parser: typescriptParser
			}
		},
		rules: {
			...(config.rules ?? {}),
			'svelte/no-navigation-without-resolve': 'off',
			'no-unused-vars': 'off'
		}
	})),
	prettier
];
