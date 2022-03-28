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
	}

	div :global(.input-style:disabled), div :global(input:disabled) {
		color: gray;
		background-color: transparent;
	}


	div :global(.input-style:focus), div :global(input:focus) {
		background-color: floralwhite;

		-webkit-appearance: none;
		-webkit-box-shadow: 0 0 0 2px #6a6862;
		box-shadow: 0 0 0 2px #6a6862;
		outline: none;

		position: relative;
		border-radius: 2px;
	}
</style>
