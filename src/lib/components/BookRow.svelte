<script lang="ts">
	import { formattedDate } from '$lib/helpers/date';
	import Button from '$lib/components/Button.svelte';
	import { onMount } from 'svelte';
	export let day: number;
</script>

<h2 class="text-right">{formattedDate(day)}</h2>
<Button>Boka</Button>
<Button>Boka</Button>
<Button>Boka</Button>
