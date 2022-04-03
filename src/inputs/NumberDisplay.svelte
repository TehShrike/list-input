<script>
	import InputStyle from './InputStyle.svelte'

	export let store
</script>

<InputStyle>
	<div class="input-style">
		{#if $store !== null}
			{$store.toString()}
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
