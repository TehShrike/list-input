<script>
	import Number from './inputs/Number.svelte'
	import Checkbox from './inputs/Checkbox.svelte'
	import NumberDisplay from './inputs/NumberDisplay.svelte'
	import Text from './inputs/Text.svelte'

	import HardWayTable from './HardWayTable.svelte'
	import ListInput from './ListInput.svelte'

	import number from 'financial-number'

	let tax_rate = number(`0.075`)

/*
	Is it practical to have a warg element for every item?
	Can `computed` be implemented across all rows?
*/
	const zero = number(`0`)

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
		calculated_value: ({ taxable, quantity, price }) => (taxable
			? quantity.times(price).times(tax_rate)
			: zero
		).changePrecision(2),
	}, {
		name: `Total`,
		property: `total`,
		component: NumberDisplay,
		initial_fraction: 3,
		header_text_align: `right`,
		calculated_value: ({ taxable, quantity, price }) => quantity.times(price).plus(
			(taxable ? quantity.times(price).times(tax_rate) : zero).changePrecision(2),
		).changePrecision(2),
	}]

	const items = [{
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
</script>

<label>
	Tax rate
	<Number
		bind:value={tax_rate}
		precision={3}
		min={0}
		style="max-width: 200px; border: 1px solid black"
	/>	
</label>

<hr>

<HardWayTable
	{items}
	{tax_rate}
/>

<hr>

<ListInput 
	{columns}
	rows={items}
/>

<hr>

<style>
	hr {
		margin: 32px 0;
		color: lightgray;
	}
</style>
