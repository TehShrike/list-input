<script>
	import InputStyle from './InputStyle.svelte'

	export let value
</script>

<InputStyle>
	<div class="input-style">
		{#if value !== null}
			{value.toString()}
		{/if}
	</div>
</InputStyle>

<style>
	div {
		text-align: right;
		font-variant-numeric: tabular-nums;
		width: 100%;
		margin: 0;
		padding: 0;
		background-color: #f2f2f2;
	}
</style>
