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
					duration: 0.25
				}
			);
			return () => a.stop();
		});
	});

	type FilterProjectCallback = (project: Project) => boolean;

	const filters: Record<
		string,
		{
			label: string;
			filterFn: FilterProjectCallback;
		}
	> = {
		all: {
			label: 'All',
			filterFn: (project: Project) => !!project
		},
		web: {
			label: 'Web',
			filterFn: (project: Project) => !!project.mediums.find((m) => m.toLowerCase().includes('web'))
		},
		ui: {
			label: 'UI/UX',
			filterFn: (project: Project) =>
				!!project.mediums.find(
					(m) => m.toLowerCase().includes('ui') || m.toLowerCase().includes('ux')
				)
		},
		motion: {
			label: 'Motion',
			filterFn: (project: Project) =>
				!!project.mediums.find((m) => m.toLowerCase().includes('motion'))
		},
		print: {
			label: 'Print',
			filterFn: (project: Project) =>
				!!project.mediums.find((m) => m.toLowerCase().includes('print'))
		},
		branding: {
			label: 'Branding',
			filterFn: (project: Project) =>
				!!project.mediums.find((m) => m.toLowerCase().includes('branding'))
		}
	};

	export let showFilters: boolean = true;
	export let projects: Project[];
	let selectedFilter: string = 'all';

	function selectFilter(filterKey: string) {
		selectedFilter = filterKey;

		requestAnimationFrame(() => {
			// reanimate the list
			animate(
				'.project',
				{
					opacity: 1,
					transform: 'translateY(0)'
				},
				{
					delay: stagger(0.125),
					duration: 0.25
				}
			);
		});
	}

	$: filteredProjects = projects.filter(filters[selectedFilter].filterFn);
</script>

<section id="projects">
	{#if showFilters}
		<div role="tablist" id="project-filters">
			{#each Object.entries(filters) as [filterKey, filter]}
				<button
					role="tab"
					on:click={() => selectFilter(filterKey)}
					aria-selected={selectedFilter === filterKey}
				>
					{filter.label}
				</button>
			{/each}
		</div>
	{/if}

	<ul id="project-grid">
		{#each filteredProjects as project}
			{#key filteredProjects}
				<ProjectComponent {project} />
			{/key}
		{/each}
	</ul>
</section>

<style lang="scss">
	#projects {
		max-width: 1200px;
		margin: 0 auto;
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;
		width: 100%;

		#project-filters {
			display: flex;
			gap: 1rem;
			align-items: center;
			justify-content: center;
			// align-self: flex-start;
			overflow-x: scroll;
			width: 100%;

			// hide scrollbars
			-ms-overflow-style: none;
			scrollbar-width: none;

			&::-webkit-scrollbar {
				display: none;
			}

			button {
				padding: var(--space-md);
				font-family: var(--fonts-headings);
				font-size: var(--font-size-xxl);
				color: var(--color-foreground-low);
				font-weight: 500;
				white-space: nowrap;

				&[aria-selected='true'] {
					color: var(--color-foreground-full);
				}

				&:first-child {
					margin-left: var(--space-lg);
				}

				&:last-child {
					margin-right: var(--space-lg);
				}
			}
		}

		ul {
			width: 95%;
			margin: 3rem var(--space-lg);
			padding: 0;
			list-style: none;
			gap: 2rem;
			column-gap: 2rem;
			columns: 300px;
		}
	}
</style>
