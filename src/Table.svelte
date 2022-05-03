<table>
	<slot></slot>
</table>

<style>
	table {
		border-collapse: collapse;
		border-spacing: 0;
		width: 100%;
		min-width: 600px;
	}

	table :global(td) {
		padding: 0;
		border: 1px solid silver;
	}

	table :global(th) {
		text-align: left;
	}

	table :global(th) {
		padding: 2px 4px;
	}

	table :global(th) :global(input:focus) {
		background-color: var(--focus-background-color);
	}
</style>
