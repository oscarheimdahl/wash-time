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

	async function login() {
		errorMessage = '';
		if (!email || !password) {
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

<div class="relative p-2">
	<form class="flex flex-col gap-2">
		<Input label="email" bind:value={email} id="" />
		<div />
		<Input label="password" type="password" bind:value={password} id="email" />
		<div class="mt-2 flex flex-col items-center">
			<Button class="w-min px-6" onClick={login} {loading}>Login</Button>
			<div class="flex w-80 justify-center gap-2">
				<a class="m-2" href="/login/register"><Button textOnly class="">Register</Button></a>
				<a class="m-2" href="/login/forgot-password"
					><Button textOnly class="">Forgot password</Button></a
				>
			</div>
		</div>
	</form>
	<LoginErrorMessage {errorMessage} {loading} />
</div>
