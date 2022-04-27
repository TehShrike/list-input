<script>
	import Number from './inputs/Number.svelte'
	import Checkbox from './inputs/Checkbox.svelte'
	import NumberDisplay from './inputs/NumberDisplay.svelte'
	import Text from './inputs/Text.svelte'

	import ListInput from './ListInput.svelte'

	import number from 'financial-number'
	import { value } from 'warg'

	const zero = number(`0`)

	const external_stores = {
		tax_rate: value(number(`0.075`)),
	}

	const columns = [{
		name: `Taxable`,
		property: `taxable`,
		component: Checkbox,
		initial_fraction: 1,
	}, {
		name: `Description`,
		property: `description`,
		component: Text,
		initial_fraction: 6,
	}, {
		name: `Quantity`,
		property: `quantity`,
		component: Number,
		initial_fraction: 2,
		header_text_align: `right`,
		props: {
			min: null,
			precision: 0,
		},
	}, {
		name: `Price`,
		property: `price`,
		component: Number,
		initial_fraction: 3,
		header_text_align: `right`,
		props: {
			min: null,
			precision: 2,
		},
	}, {
		name: `Tax`,
		property: `tax`,
		component: NumberDisplay,
		initial_fraction: 2,
		header_text_align: `right`,
		computed: ({ taxable, quantity, price, tax_rate }) => (taxable
			? quantity.times(price).times(tax_rate)
			: zero
		).changePrecision(2),
	}, {
		name: `Total`,
		property: `total`,
		component: NumberDisplay,
		initial_fraction: 2.5,
		header_text_align: `right`,
		computed: ({ quantity, price, tax }) => quantity.times(price).plus(tax).changePrecision(2),
	}]

	const empty_row_factory = () => ({
		quantity: number(`1`),
		description: ``,
		taxable: true,
		price: number(`0.00`),
	})

	const row_is_empty_predicate = row => row.quantity.equal(`1`)
		&& row.description === ``
		&& row.taxable === true
		&& row.price.equal(`0.00`)

	let items = [{
		quantity: number(`2`),
		description: `Pants`,
		taxable: true,
		price: number(`20000.01`),
	}, {
		quantity: number(`1`),
		description: `Sock`,
		taxable: true,
		price: number(`3.99`),
	}, {
		quantity: number(`1`),
		description: `Chocolate bar`,
		taxable: false,
		price: number(`1.29`),
	}]

	$: total_calculated_from_rows = items.reduce(
		(invoice_total, { total }) => invoice_total.plus(total ? total : zero), zero,
	)
</script>

<div class="container">
	<label>
		Tax rate
		<Number
			bind:store={external_stores.tax_rate}
			precision={3}
			min={0}
			style="max-width: 200px; border: 1px solid black"
		/>	
	</label>

	<ListInput 
		{columns}
		bind:rows={items}
		{external_stores}
		{empty_row_factory}
		{row_is_empty_predicate}
	/>

	<div style="display: flex; justify-content: flex-end; gap: 8px;">
		<strong>Calculated total:</strong>
		<output>{total_calculated_from_rows.toString()}</output>		
	</div>
</div>



<style>
	.container {
		display: flex;
		flex-direction: column;
		gap: 16px;
	}
</style>
