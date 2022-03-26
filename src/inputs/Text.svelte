<script>
	import InputStyle from './InputStyle.svelte'

	export let value = ``
	export let disabled = false
</script>

<InputStyle>
	<input
		type=text
		bind:value
		disabled={disabled}
	/>
</InputStyle>
