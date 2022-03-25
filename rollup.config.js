import svelte from 'rollup-plugin-svelte'
import resolve from '@rollup/plugin-node-resolve'
import commonjs from '@rollup/plugin-commonjs'
import css from 'rollup-plugin-css-only'

const production = !process.env.ROLLUP_WATCH

export default {
	input: `src/main.js`,
	output: {
		sourcemap: true,
		format: `iife`,
		name: `app`,
		file: `public/build/bundle.js`,
	},
	plugins: [
		svelte({
			compilerOptions: {
				// enable run-time checks when not in production
				dev: !production,
			},
		}),
		css({
			output: `public/build/bundle.css`,
		}),
		resolve({
			browser: true,
			dedupe: [ `svelte` ],
		}),
		commonjs(),
	],
	watch: {
		clearScreen: false,
	},
}
