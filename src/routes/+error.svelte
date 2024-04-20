<script lang="ts">
	import { page } from '$app/stores';
	import Button from '$lib/components/Button.svelte';
</script>

<main>
	<h1>{$page.status}</h1>
	{#if $page.status === 404}
		<p>The page you were looking for was not found.</p>
	{:else if $page.status >= 500 && $page.status < 600}
		<p>An error happened on our end. Please try again later.</p>
	{:else}
		<p>An error happened. Please try again later.</p>
	{/if}

	<Button href="/">Go back to the home page</Button>
</main>

<style lang="scss">
	main {
		display: flex;
		justify-content: center;
		align-items: center;
		height: 100vh;
		text-align: center;
		flex-direction: column;
		gap: 1rem;

		h1 {
			font-size: var(--font-size-xxl);
		}
	}
</style>
