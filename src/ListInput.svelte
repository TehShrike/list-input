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

	let row_key = 0
	const row_to_stores = (row, row_name) => {
		const value_stores = Object.fromEntries(
			columns
				.filter(({ computed }) => !computed)
				.map(({ property }) => {
					if (!(property in row)) {
						throw new Error(`row ${row_name} was missing property "${property}"`)
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
			key: row_key++,
		}
	}

	// row_stores is the canonical array that should be written to when state needs to change
	let row_stores = rows.map((row, row_index) => row_to_stores(row, row_index))

	const make_store_that_updates_when_array_contents_change = row_stores => {
		console.log(`make_store_that_updates_when_array_contents_change was called`, row_stores.length)
		const index_to_values_object = Object.fromEntries(row_stores.map(
			({ store_of_values }, index) => [ index, store_of_values ],
		))
	
		return warg_computed(
			// this could theoretically come out in a different order than the original array?  meh
			index_to_values_object,
			rows_object => Object.values(rows_object),
		)
	}

	const update_rows_property = () => {
		rows = row_stores
			.map(({ store_of_values }) => store_of_values.get())
			.filter(row => !row_is_empty_predicate(row))
	}

	const clean_up_empty_rows_and_ensure_final_is_empty = () => {
		let cleaned_up = row_stores.filter(
			({ store_of_values }, index) => index === row_stores.length - 1
				|| !row_is_empty_predicate(store_of_values.get()),
		)

		let changed = cleaned_up.length !== row_stores.length

		let last_row_is_empty = cleaned_up.length > 0
			&& row_is_empty_predicate(cleaned_up[cleaned_up.length - 1].store_of_values.get())

	
		if (!last_row_is_empty) {
			cleaned_up.push(row_to_stores(empty_row_factory(), `[row from empty row factory]`))
			changed = true
		}

		if (changed) {
			row_stores = cleaned_up
			row_contents_store = make_store_that_updates_when_array_contents_change(row_stores)
		}
	}

	$: row_contents_store = make_store_that_updates_when_array_contents_change(row_stores)
	$: $row_contents_store && row_stores && clean_up_empty_rows_and_ensure_final_is_empty()
	$: $row_contents_store && row_stores && update_rows_property()

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

	{#each row_stores as { object_of_stores, key }, row_index (key)}
		<div style="grid-template-columns: {grid_template_columns};" role=row>
			{#each columns as column, column_index}
				<div 
					role=cell 
					on:keypress={event => on_keypress(event, row_index, column_index)}
					style="--input-text-color: {row_index === row_stores.length - 1 ? `var(--mid-gray)` : `var(--black)`};"
				>
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

		--mid-gray: #888787;
		--cell-outline-color: var(--mid-gray);
		--focus-indicator-color: #6a6862;
		--black: #333;
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
		outline: 1px solid var(--cell-outline-color);

		overflow: hidden;
	}

	[role=cell]:focus-within {
		border-radius: 2px;
		-webkit-box-shadow: 0 0 0 2px var(--focus-indicator-color);
		box-shadow: 0 0 0 2px var(--focus-indicator-color);
		z-index: 1;
	}

	[data-header-text-align=center] {
		text-align: center;
	}
	[data-header-text-align=right] {
		text-align: right;
	}
</style>
