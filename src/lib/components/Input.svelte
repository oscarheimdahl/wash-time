<script lang="ts">
	export let id: string;
	export let value = '';
	export let type = 'text';
	export let label: string;
	export let hideLabel = false;
	export let placeholder = '';

	function typeAction(node: HTMLInputElement) {
		node.type = type;
	}
</script>

<label hidden={hideLabel} for={id}>{label}</label>
<input
	{placeholder}
	use:typeAction
	bind:value
	{id}
	class={`rounded-md border-2 border-gray-200 p-2 ${$$props.class} `}
/>
