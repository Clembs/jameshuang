<script lang="ts">
	import { page } from '$app/stores';
	import ProjectGrid from '$lib/components/ProjectGrid.svelte';
</script>

<ProjectGrid projects={$page.data.projects} />
