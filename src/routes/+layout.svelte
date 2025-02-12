<script lang="ts">
	import Footer from '$lib/components/Footer.svelte';
	import NavBar from '$lib/components/NavBar.svelte';
	import { IconContext } from 'phosphor-svelte';
	import '../styles/global.scss';
</script>

<IconContext
	values={{
		size: '20px'
	}}
>
	<NavBar />

	<slot />

	<Footer />
</IconContext>
