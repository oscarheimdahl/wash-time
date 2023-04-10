<script lang="ts">
	import Input from '$lib/components/Input.svelte';
	import Button from '$lib/components/Button.svelte';
	import LoginErrorMessage from '$lib/components/LoginErrorMessage.svelte';
	import type { LayoutData } from '../../$types';
	export let data: LayoutData;
	$: ({ supabase } = data);

	let email = '';
	let errorMessage = '';
	let errorMessageIcon = false;
	let loading = false;

	async function login() {
		loading = true;
		const { data: res, error } = await supabase.auth.resetPasswordForEmail(email, {
			redirectTo: 'http://localhost:5173/login/forgot-password/new'
		});

		errorMessage = error?.message ?? '';

		if (data) {
			errorMessage = 'Mail skickat!';
			errorMessageIcon = true;
		}
		loading = false;
	}
</script>

<div class="relative">
	<h2 class="mb-10 text-center text-xl font-medium">Återställ lösenord</h2>

	<form class="flex  flex-col">
		<Input class="mb-2" type="email" label="Email" bind:value={email} id="" />
		<span class="text-center text-sm text-gray-500"
			>Ett mail kommer skickas till din mail-address med en länk. Klicka på länken för att
			återställa ditt lösenord. Om du inte hittar mailet, kolla i skräpposten.</span
		>
		<Button class="mt-16 bg-slate-400" onClick={login} {loading}>Skicka återställningsmail</Button>
		<a class="m-2 mx-auto" href="/login/  ">Tillbaka</a>
	</form>
	<LoginErrorMessage {errorMessage} showIcon={errorMessageIcon} {loading} />
</div>
