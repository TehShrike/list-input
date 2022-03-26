<span>
	<slot></slot>
</span>

<style>
	span :global(.input-style) {
		margin: 0;
		border: none;
		border-radius: 0;
		width: 100%;
	}

	span :global(.input-style:disabled) {
		color: gray;
		background-color: transparent;
	}
</style>
