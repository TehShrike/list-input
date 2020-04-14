<script>
	const defaultFormatter = _ => _

	export let value = ''
	export let disabled = false
	export let formatter = defaultFormatter
</script>

<input
	class=textish-input
	type=text
	value={(formatter || defaultFormatter)(value)}
	disabled={disabled}
/>
