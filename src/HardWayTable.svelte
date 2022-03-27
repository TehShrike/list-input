<script>
	import Table from './Table.svelte'
	import LineItem from './LineItem.svelte'

	export let tax_rate
	export let items = []
</script>

<Table>
	<thead>
		<tr>
			<th>Taxable</th>
			<th>Description</th>
			<th>Quantity</th>
			<th>Price</th>
			<th>Tax</th>
			<th>Total</th>
		</tr>
	</thead>
	<tbody>
		{#each items as item}
			<LineItem 
				{tax_rate}
				bind:taxable={item.taxable}
				bind:description={item.description}
				bind:quantity={item.quantity}
				bind:price={item.price}
			/>
		{/each}		
	</tbody>
</Table>
