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
				<th data-type={column.type}>
					{column.name}
				</th>
			{/each}
		</tr>
	</thead>
	<tbody>
		{#each items as item}
			<tr>
				{#each columns as column}
					<td data-type={column.type}>
						{#if column.type === 'boolean'}
							<div class="checkbox-wrapper">
								<input type=checkbox checked={item[column.property]} />
							</div>
						{:else if column.type === 'number'}
							<input
								class=textish-input
								type=number
								value={format(column, item)}
								step={column.step}
								disabled={column.writeable === false}
							/>
						{:else}
							<input
								class=textish-input
								type=text
								value={format(column, item)}
								disabled={column.writeable === false}
							/>
						{/if}
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

	td[data-type=boolean] {
		text-align: center;
		vertical-align: center;
	}

	.checkbox-wrapper {
		width: 100%;
		height: 100%;
	}

	input[type=checkbox] {
		transform: scale(1.5);
	}

	.textish-input {
		margin: 0;
		border: none;
		border-radius: 0;
		width: 100%;
	}

	.textish-input:disabled {
		color: gray;
		background-color: transparent;
	}

	th, tr {
		text-align: left;
	}

	th {
		padding: 0 4px;
	}

	input:focus {
		background-color: floralwhite;
	}

	th[data-type=number], td[data-type=number] {
		text-align: right;
	}

	input[type=number] {
		text-align: right;
    	-moz-appearance: textfield;
	}

	input::-webkit-outer-spin-button,
	input::-webkit-inner-spin-button {
		display: none;
		-webkit-appearance: none;
	}
</style>
