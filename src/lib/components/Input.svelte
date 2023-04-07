<script lang="ts">
	export let id: string;
	export let value = '';
	export let type = 'text';
	export let label: string;
	export let hideLabel = false;

	function typeAction(node: HTMLInputElement) {
		node.type = type;
	}
</script>

<label hidden={hideLabel} for={id}>{label}</label>
<input
	use:typeAction
	bind:value
	{id}
	class={`${$$props.class} rounded-md border-2 border-black p-2`}
/>
