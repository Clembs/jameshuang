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
		max-width: 1200px;
		margin: 0 auto;
		display: flex;
		justify-content: center;

		ul {
			width: 90%;
			margin: 3rem 0;
			list-style: none;
			// display: flex;
			gap: 2rem;
			column-gap: 2rem;
			columns: 300px;
		}
	}
</style>
