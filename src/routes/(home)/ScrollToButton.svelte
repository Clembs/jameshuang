<script lang="ts">
	import DownArrow from '$lib/svg/DownArrow.svelte';
	import { onMount } from 'svelte';

	export let href: string;

	let el: HTMLAnchorElement;
	let opacity = 1;

	onMount(hideOnScroll);

	function hideOnScroll() {
		const topDistance = el.getBoundingClientRect().top;
		opacity = Math.min((topDistance - 100) / window.innerHeight, 1);
	}
</script>

<svelte:window on:scroll={hideOnScroll} />

<a {href} bind:this={el} style="opacity: {opacity};">
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
		gap: 0.25rem;

		font-size: var(--font-size-xs);
		color: var(--color-foreground-lowest);
		text-decoration: none;
		width: fit-content;
		margin: var(--space-xl) auto;

		#arrow {
			transition: transform 200ms ease;
		}

		:global(b) {
			color: var(--color-foreground-low);
			font-weight: 500;
		}

		&:hover {
			#arrow {
				transform: translateY(0.25rem);
			}
		}
	}
</style>
