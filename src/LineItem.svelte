<script context=module>
	import number from 'financial-number'

	const zero = number(`0`)
</script>

<script>
	import Checkbox from './inputs/Checkbox.svelte'
	import Number from './inputs/Number.svelte'
	import NumberDisplay from './inputs/NumberDisplay.svelte'
	import Text from './inputs/Text.svelte'

	export let tax_rate

	export let taxable
	export let description
	export let quantity
	export let price
	
	$: subtotal = quantity.times(price)
	$: tax = (taxable ? subtotal.times(tax_rate) : zero).changePrecision(2)
	$: total = subtotal.plus(tax).changePrecision(2)
</script>

<tr>
	<td>
		<Checkbox
			bind:value={taxable}
		/>
	</td>
	<td>
		<Text
			bind:value={description}
		/>
	</td>
	<td>
		<Number 
			bind:value={quantity}
			min={null}
			precision={0}
		/>
	</td>
	<td>
		<Number 
			bind:value={price}
			min={null}
			precision={2}
		/>
	</td>
	<td>
		<NumberDisplay
			value={tax}
		/>
	</td>
	<td>
		<NumberDisplay
			value={total}
		/>
	</td>
</tr>
