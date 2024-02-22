<section id="projects">
	<ul>
		{#each new Array(25).fill('') as project}
			<li />
		{/each}
	</ul>
</section>

<style lang="scss">
	#projects ul {
		display: grid;
		grid-template-columns: repeat(auto-fit, minmax(315px, 1fr));
		gap: var(--space-md);
		width: 90%;
		max-width: 1200px;
		margin: 0 auto;
		padding: 3rem 0;

		li {
			background-color: var(--color-emphasis);
			width: 100%;
			aspect-ratio: 1.3 / 1;
		}
	}
</style>
