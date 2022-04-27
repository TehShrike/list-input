<script>
	import { computed as warg_computed, value as warg_value } from 'warg'

	export let columns
	export let rows
	export let external_stores
	export let empty_row_factory
	export let row_is_empty_predicate

	$: grid_template_columns = columns.map(
		({ initial_fraction }) => `${initial_fraction}fr`,
	).join(` `)

	const row_to_stores = (row, row_index) => {
		const value_stores = Object.fromEntries(
			columns
				.filter(({ computed }) => !computed)
				.map(({ property }) => {
					if (!(property in row)) {
						throw new Error(`row ${row_index} was missing property "${property}"`)
					}
	
					return [
						property,
						warg_value(row[property]),
					]
				}),
		)

		const object_of_stores = {
			...value_stores,
			...external_stores,
		}

		columns.filter(({ computed }) => computed)
			.forEach(({ property, computed }) => {
				object_of_stores[property] = warg_computed(object_of_stores, computed)
			})

		const store_of_values = warg_computed(object_of_stores, all_values => all_values)

		return {
			object_of_stores,
			store_of_values,
		}
	}

	let row_stores = rows.map((row, row_index) => row_to_stores(row, row_index))

	$: row_contents_store = warg_computed(
		// this could theoretically come out in a different order than the original array?  meh
		Object.fromEntries(row_stores.map(
			({ store_of_values }, index) => [ index, store_of_values ],
		)),
		rows_object => Object.values(rows_object),
	)

	const update_bound_value = () => {
		rows = row_stores.map(({ store_of_values }) => store_of_values.get())
	}

	$: $row_contents_store && update_bound_value()
	$: row_stores && update_bound_value()

	// a store that changes whenever any rows change.
	// another store that changes whenever the array changes.
	// the array of stores is the canonical array?

	const focus_functions = {}

	const on_keypress = (event, row_index, column_index) => {
		if (event.key === `Enter`) {
			const target_row_index = row_index + (event.shiftKey ? -1 : 1)
			const target_focus_function = focus_functions[`${target_row_index}-${column_index}`]
			if (target_focus_function) {
				target_focus_function()
			}
		}
	}

	
</script>

<div role=table>
	<div style="grid-template-columns: {grid_template_columns};" role=row>
		{#each columns as column}
			<div data-header-text-align={column.header_text_align} role=columnheader>
				{column.name}
			</div>
		{/each}			
	</div>

	{#each row_stores as {object_of_stores}, row_index}
		<div style="grid-template-columns: {grid_template_columns};" role=row>
			{#each columns as column, column_index}
				<div role=cell on:keypress={event => on_keypress(event, row_index, column_index)}>
					<svelte:component
						this={column.component}
						store={object_of_stores[column.property]}
						bind:focus={focus_functions[`${row_index}-${column_index}`]}
						{...column.props}
					/>
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

	[role=cell]:focus-within {
		border-radius: 2px;
		-webkit-box-shadow: 0 0 0 2px #6a6862;
		box-shadow: 0 0 0 2px #6a6862;
		z-index: 1;
	}

	[data-header-text-align=center] {
		text-align: center;
	}
	[data-header-text-align=right] {
		text-align: right;
	}
</style>
