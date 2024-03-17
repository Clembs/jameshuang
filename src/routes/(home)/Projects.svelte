<script lang="ts">
	import { page } from '$app/stores';
	import ProjectComponent from '$lib/components/Project.svelte';
</script>

<section id="projects">
	<ul>
		{#each $page.data.projects as project}
			<ProjectComponent {project} />
		{/each}
	</ul>
</section>

<style lang="scss">
	#projects ul {
		display: grid;
		grid-template-columns: repeat(auto-fit, minmax(315px, 1fr));
		gap: var(--space-xl);
		width: 90%;
		max-width: 1200px;
		margin: 0 auto;
		padding: 3rem 0;
	}
</style>
