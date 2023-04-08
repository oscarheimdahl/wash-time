<script lang="ts">
	import '../app.css';
	import { invalidate } from '$app/navigation';
	import { onMount } from 'svelte';
	import type { LayoutData } from './$types';
	import { user } from '../store/user';
	import { supabase as supabaseStore } from '../store/supabase';

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
			user.set({ id: session?.user.id ?? '' });
			supabaseStore.set(supabase);
		}
		return () => subscription.unsubscribe();
	});
</script>

<div class="h-full w-full bg-stone-400">
	{#if show}
		<slot />
	{/if}
</div>
