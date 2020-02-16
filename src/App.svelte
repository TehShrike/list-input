<!--
- styling based on column type (e.g. font-variant-numeric)
- the ability to use custom format functions per-column, with defaults based on column type
- checkboxes, dropdowns, text/numeric inputs
- resizable columns, emitting an event on resize so that you can store them in user preferences
- change detection, with an event fired when an item changes
-->
<script>
	import ListInput from './ListInput.svelte'
	
	const numberFormatter = precision => number => number === null ? '' : number.toFixed(precision)
	
	
	const columns = [
		{ name: 'Taxable', property: 'taxable', type: 'boolean' },
		{ name: 'Description', property: 'description', type: 'string' },
		{ name: 'Quantity', property: 'quantity', type: 'number', step: '.1', formatter: numberFormatter(1) },
		{ name: 'Price', property: 'price', type: 'number', step: '.01', formatter: numberFormatter(2) },
		{ name: 'Tax', property: 'tax', type: 'number', step: '.01', formatter: numberFormatter(2), writeable: false },
		{ name: 'Total', property: 'total', type: 'number', step: '.01', formatter: numberFormatter(2), writeable: false },
	]
	
	const items = [
		{ quantity: 2, description: 'Pants', taxable: true, price: 20, tax: 1.5, total: 21.5 },
		{ quantity: 1, description: 'Sock', taxable: true, price: 3.99, tax: .30, total: 4.29 },
		{ quantity: 1, description: 'Chocolate bar', taxable: false, price: 1.29, tax: null, total: 1.29 },
	]
</script>

<ListInput {columns} {items} />
