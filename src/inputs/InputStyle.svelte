<div>
	<slot></slot>
</div>

<style>
	div :global(.input-style), div :global(input) {
		box-sizing: border-box;
		margin: 0;
		padding: 4px 8px;
		border: none;
		border-radius: 0;
		width: 100%;
		font-size: 16px;
		
		color: var(--input-text-color);
	}

	div :global(.input-style:disabled), div :global(input:disabled) {
		color: gray;
		background-color: transparent;
	}


	div :global(.input-style:focus), div :global(input:focus) {
		background-color: floralwhite;
		outline: none;
	}
</style>
