<script lang="ts">
	import { page } from '$app/stores';
	import ProjectComponent from '$lib/components/Project.svelte';
	import { animate, inView, stagger } from 'motion';
	import { onMount } from 'svelte';

	// let grid;

	onMount(async () => {
		// @ts-ignore
		// const Columns = (await import('columns.js')).default;

		// grid = new Columns(document.getElementById('project-grid'), {
		// 	columns: 1,
		// 	breakpoints: {
		// 		600: 2,
		// 		1000: 3
		// 	}
		// });

		inView('#projects', () => {
			const a = animate(
				'.project',
				{
					opacity: 1,
					transform: 'translateY(0)'
				},
				{
					delay: stagger(0.125),
					duration: 0.5
				}
			);
			return () => a.stop();
		});
	});
</script>

<!-- <svelte:window on:resize={() => grid?.render()} /> -->

<section id="projects">
	<ul id="project-grid">
		{#each $page.data.projects as project}
			<ProjectComponent {project} />
		{/each}
	</ul>
</section>

<style lang="scss">
	#projects {
		// display: grid;
		// grid-template-columns: repeat(auto-fit, minmax(315px, 1fr));
		// gap: var(--space-xl);
		max-width: 1200px;
		margin: 0 auto;
		display: flex;
		justify-content: center;

		ul {
			width: 90%;
			padding: 3rem 0;
			list-style: none;
			// display: flex;
			gap: 2rem;
			column-gap: 2rem;
			columns: 3;

			@media (max-width: 1000px) {
				columns: 2;
			}

			@media (max-width: 600px) {
				columns: 1;
			}
		}
	}
</style>
