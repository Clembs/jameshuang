<script lang="ts">
	import { page } from '$app/stores';
	import ProjectGrid from '$lib/components/ProjectGrid.svelte';
	import ScrollToButton from './ScrollToButton.svelte';
</script>

<ProjectGrid projects={$page.data.projects} />

<ScrollToButton href="#contact">
	Scroll down to <b>contact me</b>
</ScrollToButton>
