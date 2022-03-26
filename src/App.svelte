<script>
	import ListInput from './ListInput.svelte'

	import Checkbox from './inputs/Checkbox.svelte'
	import Number from './inputs/Number.svelte'
	import Text from './inputs/Text.svelte'

	let taxRate = 0.075

	const numberFormatter = precision => number => number === null ? `` : number.toFixed(precision)

	/*
		Need to be able to define attributes along with the component.  Need to pass
		min, max, increment, etc to the Number component.

		I think this obviates the formatter for the Number component?  maybe not.

		Need a display component that can take attributes to know whether or not
		to right-align/numeric-column and whatnot.  Slightly lightened text.

		What should I be passing to Quantity?  min, max, increment/precision.]]

		Tax/Total absolutely need to be display components and not inputs.  wtf.

		Then just make the components look as good as the other version.
	*/

	const columns = [
		{ name: `Taxable`, property: `taxable`, component: Checkbox },
		{ name: `Description`, property: `description`, component: Text },
		{ name: `Quantity`, property: `quantity`, component: Number, formatter: numberFormatter(1) },
		{ name: `Price`, property: `price`, component: Number, formatter: numberFormatter(2) },
		{
			name: `Tax`,
			property: `tax`,
			component: Number,
			formatter: numberFormatter(2),
			computed: ({ price }) => price * taxRate,
		},
		{
			name: `Total`,
			property: `total`,
			component: Number,
			formatter: numberFormatter(2),
			computed: ({ quantity, price, tax, taxable }) => (quantity * price) + (taxable ? tax : 0),
		},
	]

	const items = [
		{ quantity: 2, description: `Pants`, taxable: true, price: 20000000.01, tax: 1.5, total: 21.5 },
		{ quantity: 1, description: `Sock`, taxable: true, price: 3.99, tax: .30, total: 4.29 },
		{ quantity: 1, description: `Chocolate bar`, taxable: false, price: 1.29, tax: null, total: 1.29 },
	]
</script>

<input type="number" step="0.01" bind:value={taxRate}>

<hr>

<ListInput {columns} {items} />

<style>
	:global(.list-input) {
		width: 100%;
		min-width: 600px;
	}
</style>
