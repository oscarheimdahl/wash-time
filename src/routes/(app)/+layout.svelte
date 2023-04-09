<script lang="ts">
	import Button from '$components/Button.svelte';
	import type { LayoutData } from '../$types';
	export let data: LayoutData;
	$: ({ supabase, session } = data);

	let loading = false;

	async function logout() {
		loading = true;
		const { error } = await supabase.auth.signOut();
		if (error) {
			alert(error.message);
			return;
		}
		window.location.href = '/login';
		setTimeout(() => (loading = false), 200);
	}
</script>

<div class="h-full">
	<div
		class="fixed flex h-12 w-full items-center justify-between border-b-2 border-black bg-stone-600 px-2"
	>
		<h2>{session?.user.email ?? ''}</h2>
		<Button {loading} onClick={logout} textOnly>Logout</Button>
	</div>
	<div class="h-12"><!-- under header --></div>
	<div class="h-[calc(100%-3rem)]">
		<slot />
	</div>
</div>
