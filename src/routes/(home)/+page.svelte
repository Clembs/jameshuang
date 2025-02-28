<script lang="ts">
	import Meta from '$lib/components/Meta.svelte';
	import AboutMe from './AboutMe.svelte';
	import Contact from './Contact.svelte';
	import Header from './Header.svelte';
	import Projects from './Projects.svelte';
	import Testimonials from './Testimonials.svelte';
</script>

<Meta title="James Huang - Graphic Designer Based in Sydney" />

<main>
	<Header />
	<AboutMe />
	<Projects />
	<Contact />
	<Testimonials />
</main>

<style lang="scss">
	:global(.highlighted) {
		background-clip: text;
		-webkit-background-clip: text;
		-webkit-text-fill-color: transparent;
		background-image: var(--gradient-background);
	}
</style>
