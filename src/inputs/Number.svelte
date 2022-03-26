<script>
	import InputStyle from './InputStyle.svelte'

	const defaultFormatter = _ => _

	export let disabled = false
	export let formatter = defaultFormatter
	export let value = null

	const onChange = (event) => {
		value = event.target.value
	}
</script>

<InputStyle>
	<input
		class=input-style
		value={(formatter || defaultFormatter)(value)}
		disabled={disabled}
		on:change={onChange}
	/>
</InputStyle>

<style>
	:global(input) {
		text-align: right;
	}
</style>
