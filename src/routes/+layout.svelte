<script lang="ts">
	import Footer from '$lib/components/Footer.svelte';
	import NavBar from '$lib/components/NavBar.svelte';
	import '../styles/global.scss';
</script>

<div>
	<NavBar />

	<slot />

	<Footer />
</div>
