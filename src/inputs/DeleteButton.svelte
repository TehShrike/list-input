<script>
	import { createEventDispatcher } from 'svelte'

	const dispatch = createEventDispatcher()

	let input_element

	export const set_focus = () => input_element.focus()

	const on_click = () => {
		dispatch(`column_event`, {
			event: `delete`,
		})
	}
</script>

<div class="button-wrapper">
	<button
		class=input-style
		bind:this={input_element}
		on:click={on_click}
		on:focus
		on:blur
	>
		❌
	</button>
</div>

<style>
	.button-wrapper {
		width: 100%;
		height: 100%;
		display: flex;
		align-items: center;
		justify-content: center;
	}

	.button-wrapper:focus-within {
		background-color: floralwhite;
	}

	button {
		border: none;
		background: transparent;
		outline: none;
	}
</style>
