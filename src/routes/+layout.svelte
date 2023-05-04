<script lang="ts">
	import '../app.css';
	import { invalidate } from '$app/navigation';
	import { onMount } from 'svelte';
	import type { LayoutData } from './$types';
	import { userStore } from '../store/userStore';
	import { supabaseStore as supabaseStore } from '../store/supabaseStore';

	export let data: LayoutData;

	$: ({ supabase, session } = data);
	let show = false;

	onMount(() => {
		const {
			data: { subscription }
		} = supabase.auth.onAuthStateChange((event, _session) => {
			if (_session?.expires_at !== session?.expires_at) {
				invalidate('supabase:auth');
			}
		});
		if (!session && window.location.pathname !== '/login') window.location.href = '/login';
		else {
			show = true;
			userStore.set({ id: session?.user.id ?? '' });
			supabaseStore.set(supabase);
		}
		return () => subscription.unsubscribe();
	});
</script>

<div class="page-background relative min-h-full w-full overflow-hidden">
	<div class="background fixed grid bg-stone-200">
		{#each Array(100).fill(0) as _, i}
			<div class:rotate={i % 2 === 0} class="image h-40 w-40" />
		{/each}
	</div>
	{#if show}
		<slot />
	{/if}
</div>

<style>
	:global(.page-background > *:not(.background)) {
		position: relative;
	}

	.background {
		grid-template-columns: 1fr 1fr 1fr 1fr 1fr;
		width: 100%;
		justify-items: center;
		gap: 2%;
	}

	.image {
		background-image: url('../lib/assets/washing-machine.svg');
		background-size: 50%;
		background-repeat: no-repeat;
		background-position: center;
	}
	.image.rotate {
		transform: rotate(30deg);
	}
</style>
