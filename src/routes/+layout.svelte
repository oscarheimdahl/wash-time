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

<div class="min-h-full w-full bg-stone-200">
	{#if show}
		<slot />
	{/if}
</div>
