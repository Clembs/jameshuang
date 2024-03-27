<main>
	<slot />
</main>

<style>
	main {
		display: flex;
		flex-direction: column;
		gap: 1rem;
		justify-content: center;
		align-items: center;
		margin: 0 auto;
		width: 100%;
		height: 90vh;
	}

	:global(.account-form) {
		display: flex;
		flex-direction: column;
		padding: 1.5rem;
		gap: 1rem;
		width: 500px;
		max-width: 100%;
	}
</style>
