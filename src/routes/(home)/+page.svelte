<script lang="ts">
	import AboutMe from './AboutMe.svelte';
	import Header from './Header.svelte';
	import Projects from './Projects.svelte';
</script>

<main>
	<Header />
	<AboutMe />
	<Projects />
</main>

<style lang="scss">
	:global(.highlighted) {
		background-clip: text;
		-webkit-background-clip: text;
		-webkit-text-fill-color: transparent;
		background-image: var(--gradient-background);
	}
</style>
