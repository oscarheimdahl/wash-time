<script lang="ts">
	import Button from '$components/Button.svelte';
	import LogoutIcon from '$components/LogoutIcon.svelte';
	import { onMount } from 'svelte';
	import type { LayoutData } from '../$types';
	export let data: LayoutData;
	$: ({ supabase, session } = data);

	let logoutLoading = false;
	let y = 0;

	async function logout() {
		logoutLoading = true;
		const { error } = await supabase.auth.signOut();
		if (error) {
			logoutLoading = false;
			alert(error.message);
			return;
		}
		window.location.href = '/login';
	}
</script>

<svelte:window bind:scrollY={y} />
<div class="h-full">
	<div class="h-16"><!-- under header --></div>
	<div class="h-[calc(100%-4rem)]">
		<slot />
	</div>
	<div
		class={`header fixed top-0 flex h-16 w-full items-center justify-between bg-stone-100 px-4 shadow-md transition-transform ${
			y > 40 ? '-translate-y-full' : ''
		}`}
	>
		<!-- <div class="flex items-center gap-2"> -->
		<h2>Inloggad som: <span class="font-semibold">{session?.user.email ?? ''}</span></h2>
		<Button loading={logoutLoading} onClick={logout}>
			<span class="flex gap-2"><span class="logout-text">Logga ut</span><LogoutIcon /></span>
		</Button>
	</div>
	<!-- </div> -->
</div>

<style>
	@media screen and (max-width: 500px) {
		.logout-text {
			display: none;
		}
	}
</style>
