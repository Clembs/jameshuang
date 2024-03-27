<script lang="ts">
	import { enhance } from '$app/forms';
	import Button from '$lib/components/Button.svelte';
	import TextInput from '$lib/components/TextInput.svelte';

	let errors: {
		username: string | undefined;
		password: string | undefined;
		inviteCode: string | undefined;
	};
</script>

<h1>Admin registration</h1>

<form
	use:enhance={() =>
		async ({ result, update }) => {
			if (result.type === 'failure') {
				// @ts-ignore
				errors = result.data;
			}

			await update();
		}}
	class="account-form"
	method="post"
>
	<TextInput error={errors?.username} type="text" label="Username" name="username" />
	<TextInput error={errors?.password} type="password" label="Password" name="password" />
	<TextInput error={errors?.inviteCode} type="text" label="Invite code" name="invite-code" />

	<Button type="submit">Register</Button>
	<a href="/login">Login instead?</a>
</form>

<style lang="scss">
	h1 {
		font-size: var(--font-size-xxl);
	}
</style>
