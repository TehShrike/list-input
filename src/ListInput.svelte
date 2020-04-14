<script>
	export let columns = []
	export let items = []

	const defaultFormatter = value => value.toString()
	const getColumnFormatter = column => column.formatter || defaultFormatter
	const format = (column, item) => getColumnFormatter(column)(item[column.property])

</script>

<table class=list-input>
	<thead>
		<tr>
			{#each columns as column}
				<th>
					{column.name}
				</th>
			{/each}
		</tr>
	</thead>
	<tbody>
		{#each items as item}
			<tr>
				{#each columns as column}
					<td>
						<svelte:component
							this={column.component}
							value={item[column.property]}
							formatter={column.formatter}
						/>
					</td>
				{/each}
			</tr>
		{/each}
	</tbody>
</table>

<style>
	table {
		border-collapse: collapse;
		border-spacing: 0;
	}

	td {
		padding: 0;
		border: 1px solid silver;
	}

	th, tr {
		text-align: left;
	}

	th {
		padding: 0 4px;
	}

	th :global(input:focus) {
		background-color: floralwhite;
	}

	th :global(input::-webkit-outer-spin-button),
	th :global(input::-webkit-inner-spin-button) {
		display: none;
		-webkit-appearance: none;
	}

	th :global(.textish-input) {
		margin: 0;
		border: none;
		border-radius: 0;
		width: 100%;
	}

	th :global(.textish-input:disabled) {
		color: gray;
		background-color: transparent;
	}

</style>
