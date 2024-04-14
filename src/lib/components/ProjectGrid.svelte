<script lang="ts">
	import { animate, inView, stagger } from 'motion';
	import { onMount } from 'svelte';
	import ProjectComponent from './Project.svelte';
	import type { Project } from '$lib/db/types';

	onMount(() => {
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

	export let projects: Project[];
</script>

<section id="projects">
	<ul id="project-grid">
		{#each projects as project}
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
