<script>
	import Text from './Text.svelte'

	const defaultFormatter = _ => _

	export let disabled = false
	export let formatter = defaultFormatter
	export let value = null

	const onChange = (event) => {
		value = event.target.value
	}
</script>

<input
	class=textish-input
	value={(formatter || defaultFormatter)(value)}
	disabled={disabled}
	on:change={onChange}
/>

<style>
	span > :global(input) {
		text-align: right;
	}
</style>
