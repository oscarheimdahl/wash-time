<script lang="ts">
	import Input from '$lib/components/Input.svelte';
	import Button from '$lib/components/Button.svelte';
	import type { LayoutData } from '../$types';
	import LoginErrorMessage from '$lib/components/LoginErrorMessage.svelte';
	export let data: LayoutData;
	$: ({ supabase, session } = data);

	let email = '';
	let password = '';
	let errorMessage = '';
	let loading = false;

	async function login(method: 'password' | 'google' | 'facebook') {
		errorMessage = '';
		if (method === 'password' && (!email || !password)) {
			errorMessage = 'Please provide an email and password';
			return;
		}
		loading = true;
		const { data: res, error } = await data.supabase.auth.signInWithPassword({
			email,
			password
		});

		if (res.session) window.location.href = '/';

		if (error) {
			errorMessage = error.message;
			loading = false;
		}
	}
</script>

<div class="relative">
	<h2 class=" mb-10 text-center text-xl font-medium">Dags för tvätt</h2>
	<form class="flex flex-col">
		<Input class="mb-4" label="Email" bind:value={email} id="" />
		<Input label="Lösenord" type="password" bind:value={password} id="email" />
		<a class="mt-2 h-6 self-end text-sm text-gray-600" href="/login/forgot-password"
			>Glömt lösenord?</a
		>
		<Button class="mt-8" onClick={() => login('password')} {loading}>Logga in</Button>
		<a class="m-2 mx-auto" href="/login/register">Registrera</a>
		<!-- <div class="my-4 flex w-full justify-center gap-2">
			<div class="w-8 translate-y-[0.7rem] border-t-2 border-gray-300" />
			<span class="text-center text-gray-500">eller</span>
			<div class="w-8 translate-y-[0.7rem] border-t-2 border-gray-300" />
		</div>
		<div class="flex justify-center gap-4">
			<Button textOnly>Google</Button>
			<Button textOnly>Facebook</Button>
			<button on:click={() => login('google')}><GoogleLogo /></button>
			<button on:click={() => login('facebook')}><FacebookLogo /></button>
		</div> -->
	</form>
	<LoginErrorMessage {errorMessage} {loading} />
</div>
