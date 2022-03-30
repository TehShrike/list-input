<script>
	export let columns
	export let rows

	$: grid_template_columns = columns.map(
		({ initial_fraction }) => `${initial_fraction}fr`,
	).join(` `)
</script>

<div role=table>
	<div style="grid-template-columns: {grid_template_columns};" role=row>
		{#each columns as column}
			<div data-header-text-align={column.header_text_align} role=columnheader>
				{column.name}
			</div>
		{/each}			
	</div>

	{#each rows as row}
		<div style="grid-template-columns: {grid_template_columns};" role=row>
			{#each columns as column}
				<div role=cell>
					{#if column.calculated_value}
						<svelte:component
							this={column.component}
							value={column.calculated_value(row)}
						/>
					{:else}
						<svelte:component
							this={column.component}
							bind:value={row[column.property]}
							{...column.props}
						/>
					{/if}
				</div>
			{/each}
		</div>
	{/each}
</div>

<style>
	[role=table] {
		display: grid;
		gap: 1px;
	}

	[role=row] {
		display: grid;
		gap: 1px;
	}

	[role=columnheader] {
		display: grid;
		font-weight: 500;

		padding: 8px;
	}

	[role=cell], [role=columnheader] {
		box-sizing: border-box;
		outline: 1px solid #888787;

		overflow: hidden;
	}

	[data-header-text-align=center] {
		text-align: center;
	}
	[data-header-text-align=right] {
		text-align: right;
	}
</style>
