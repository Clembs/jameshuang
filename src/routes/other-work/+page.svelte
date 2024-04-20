<script lang="ts">
	import Meta from '$lib/components/Meta.svelte';
	import ProjectGrid from '$lib/components/ProjectGrid.svelte';
	import BackArrow from '$lib/svg/BackArrow.svelte';

	export let data;
</script>

<Meta title="Other Works - James Huang" />

<main>
	<header>
		<h1>Other Work</h1>

		<p>
			Here is a collection of some other pieces of work from me, <br />
			including art, photography or older design work.
		</p>
	</header>

	<ProjectGrid projects={data.projects} />

	<a href="/" id="back-button">
		<BackArrow />
		Return back
	</a>
</main>

<style lang="scss">
	main {
		display: flex;
		flex-direction: column;
		align-items: center;
		margin: var(--space-xl) 0;
		margin-top: 10rem;

		header {
			display: flex;
			flex-direction: column;
			align-items: center;
			gap: var(--space-base);
			margin: 0 auto;
			text-align: center;

			h1 {
				font-size: var(--font-size-xxl);
			}
		}

		#back-button {
			display: flex;
			align-items: center;
			gap: 0.5rem;
			text-decoration: none;
			color: var(--color-foreground-low);
			transition: color 100ms ease-in-out;
			margin-top: 2rem;

			&:hover {
				color: var(--color-foreground-lowest);
				text-decoration: underline;
			}
		}
	}
</style>
