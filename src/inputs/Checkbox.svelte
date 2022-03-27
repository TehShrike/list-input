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
		text-align: center;
	}

	input {
		transform: scale(1.5);
		margin: 0;
	}
</style>
