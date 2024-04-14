<script lang="ts">
	import DownArrow from '$lib/svg/DownArrow.svelte';

	export let href: string;
</script>

<a {href}>
	<DownArrow />
	<span class="label">
		<slot />
	</span>
</a>

<style lang="scss">
	a {
		display: flex;
		flex-direction: column;
		align-items: center;
		gap: var(--space-sm);

		color: var(--color-foreground-lowest);
		text-decoration: none;
		width: fit-content;
		margin: var(--space-xl) auto;
	}
</style>
