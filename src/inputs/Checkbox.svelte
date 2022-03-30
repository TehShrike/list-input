<script>
	export let value = false
</script>

<div class="checkbox-wrapper">
	<input 
		type=checkbox 
		bind:checked={value} 
	/>
</div>

<style>
	.checkbox-wrapper {
		width: 100%;
		height: 100%;
		display: flex;
		align-content: center;
		justify-content: center;
	}

	.checkbox-wrapper:focus-within {
		background-color: floralwhite;
	}

	input {
		transform: scale(1.5);
		margin: 0;
	}
</style>
