<script>
	export let value = false
	export let formatter = null
</script>

<div class="checkbox-wrapper">
	<input type=checkbox bind:checked={value} />
</div>

<style>
	.checkbox-wrapper {
		width: 100%;
		height: 100%;
	}

	input {
		transform: scale(1.5);
	}
</style>
