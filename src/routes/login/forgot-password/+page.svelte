<script lang="ts">
	import Input from '$lib/components/Input.svelte';
	import Button from '$lib/components/Button.svelte';
	import LoginErrorMessage from '$lib/components/LoginErrorMessage.svelte';
	import type { LayoutData } from '../../$types';
	export let data: LayoutData;
	$: ({ supabase } = data);

	let email = '';
	let errorMessage = '';
	let loading = false;

	async function login() {
		loading = true;
		const { data: res, error } = await supabase.auth.resetPasswordForEmail(email, {
			redirectTo: 'http://localhost:5173/login/forgot-password/new'
		});

		errorMessage = error?.message ?? '';
		loading = false;
	}
</script>

<div class="relative p-2">
	<form class="flex flex-col gap-2">
		<Input type="email" label="email" bind:value={email} id="" />
		<div class="mt-2 flex flex-col items-center">
			<Button class=" bg-slate-400 px-6" onClick={login} {loading}>Send reset email</Button>
			<a class="m-2" href="/login/  "><Button textOnly class="">Back</Button></a>
		</div>
	</form>
	<LoginErrorMessage {errorMessage} {loading} />
</div>
