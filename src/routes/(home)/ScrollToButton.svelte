<script lang="ts">
	import DownArrow from '$lib/svg/DownArrow.svelte';

	export let href: string;
</script>

<a {href}>
	<div id="arrow">
		<DownArrow />
	</div>

	<span class="label">
		<slot />
	</span>
</a>

<style lang="scss">
	a {
		display: flex;
		flex-direction: column;
		align-items: center;

		color: var(--color-foreground-lowest);
		text-decoration: none;
		width: fit-content;
		margin: var(--space-xl) auto;

		#arrow {
			transition: transform 200ms ease;
		}

		&:hover {
			#arrow {
				transform: translateY(0.25rem);
			}
		}
	}
</style>
