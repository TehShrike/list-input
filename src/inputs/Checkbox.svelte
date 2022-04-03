<script>
	export let value = false

	let input_element = null

	const on_cell_click = () => {
		value = !value
		input_element.focus()
	}
</script>

<div class="checkbox-wrapper" on:click={on_cell_click}>
	<input 
		type=checkbox 
		bind:checked={value} 
		bind:this={input_element}
	/>
</div>

<style>
	.checkbox-wrapper {
		width: 100%;
		height: 100%;
		display: flex;
		align-items: center;
		justify-content: center;
	}

	.checkbox-wrapper:focus-within {
		background-color: floralwhite;
	}

	input {
		transform: scale(1.5);
		margin: 0;
		outline: none;
	}
</style>
