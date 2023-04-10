<script lang="ts">
	import Input from '$lib/components/Input.svelte';
	import Button from '$lib/components/Button.svelte';
	import LoginErrorMessage from '$lib/components/LoginErrorMessage.svelte';
	import type { LayoutData } from '../../../$types';
	export let data: LayoutData;
	$: ({ supabase } = data);

	let password = '';
	let errorMessage = '';
	let errorMessageIcon = false;
	let loading = false;

	async function login() {
		if (!password) {
			errorMessage = 'Fyll i ett lösenord';
			return;
		}
		loading = true;
		const { data: res, error } = await supabase.auth.updateUser({ password });

		if (res.user) {
			errorMessage = 'Password updated';
			errorMessageIcon = true;
			setTimeout(() => (window.location.href = '/login'), 2000);
		}
		if (error?.message) errorMessage = error?.message;
		loading = false;
	}
</script>

<div class="relative">
	<form class="flex flex-col ">
		<Input id="password" type="password" label="Nytt lösenord" bind:value={password} />
		<Button class="mt-8 bg-slate-400 px-6" onClick={login} {loading}>Uppdatera lösenord</Button>
		<a class="m-2 mx-auto" href="/login">Tillbaka</a>
	</form>
	<LoginErrorMessage {errorMessage} showIcon={errorMessageIcon} {loading} />
</div>
