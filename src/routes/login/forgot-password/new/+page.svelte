<script lang="ts">
	import Input from '$lib/components/Input.svelte';
	import Button from '$lib/components/Button.svelte';
	import LoginErrorMessage from '$lib/components/LoginErrorMessage.svelte';
	import type { LayoutData } from '../../../$types';
	export let data: LayoutData;
	$: ({ supabase } = data);

	let password = '';
	let password2 = '';
	let errorMessage = '';
	let loading = false;

	async function login() {
		if (password !== password2) {
			errorMessage = "Passwords don't match";
			return;
		}
		if (!password || !password2) {
			errorMessage = 'Enter password';
			return;
		}
		loading = true;
		const { data: res, error } = await supabase.auth.updateUser({ password });

		if (res.user) {
			errorMessage = 'Password updated 👍🏻';
			setTimeout(() => (window.location.href = '/login'), 2000);
		}
		if (error?.message) errorMessage = error?.message;
		loading = false;
	}
</script>

<div class="relative p-2">
	<form class="flex flex-col gap-2">
		<Input id="password" type="password" label="password" bind:value={password} />
		<Input id="password2" type="password" label="password" bind:value={password2} />
		<div class="mt-2 flex flex-col items-center">
			<Button class=" bg-slate-400 px-6" onClick={login} {loading}>Update password</Button>
			<a class="m-2" href="/login"><Button textOnly class="">Back</Button></a>
		</div>
	</form>
	<LoginErrorMessage {errorMessage} {loading} />
</div>
