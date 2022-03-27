<script>
	export let columns
	export let rows

	$: grid_template_columns = columns.map(
		({ initial_fraction }) => `${initial_fraction}fr`,
	).join(` `)
</script>

<div class="grid-daddy">
	<div class="grid-header" style="grid-template-columns: {grid_template_columns};">
		{#each columns as column}
			<div class="grid-column-header" data-header-text-align={column.header_text_align}>
				{column.name}
			</div>
		{/each}			
	</div>

	{#each rows as row}
		<div class="grid-row" style="grid-template-columns: {grid_template_columns};">
			{#each columns as column}
				<div class="grid-dolumn">
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
	.grid-daddy {
		display: grid;
	}

	.grid-header {
		display: grid;
	}

	.grid-row {
		display: grid;
	}

	.grid-column-header {
		padding: 2px 4px;
	}

	.grid-dolumn, .grid-column-header {
		box-sizing: border-box;
		border: .5px solid black;
	}

	.grid-column-header {
		display: grid;
	}

	[data-header-text-align=center] {
		text-align: center;
	}
	[data-header-text-align=right] {
		text-align: right;
	}
</style>
