<script>
	import InputStyle from './InputStyle.svelte'

	export let disabled = false

	export let store

	let input_element

	export const focus = () => input_element.focus()
</script>

<InputStyle>
	<input
		type=text
		bind:value={$store}
		disabled={disabled}
		bind:this={input_element}
	/>
</InputStyle>
