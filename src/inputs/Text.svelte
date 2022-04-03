<script>
	import InputStyle from './InputStyle.svelte'

	export let disabled = false

	export let store
</script>

<InputStyle>
	<input
		type=text
		bind:value={$store}
		disabled={disabled}
	/>
</InputStyle>
