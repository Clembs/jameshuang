<script lang="ts">
	import { page } from '$app/stores';
	import ProjectGrid from '$lib/components/ProjectGrid.svelte';
	import ScrollToButton from './ScrollToButton.svelte';
	import RightArrow from '$lib/svg/RightArrow.svelte';
</script>

<ProjectGrid projects={$page.data.projects} />

<a id="other-work" href="/other-work">
	<b>Other Work</b> / Art, Photography, Miscellaneous, Archive
	<span id="right-arrow">
		<RightArrow />
	</span>
</a>

<ScrollToButton href="#contact">
	Scroll down to <b>contact me</b>
</ScrollToButton>

<style lang="scss">
	#other-work {
		display: flex;
		align-items: center;
		width: fit-content;
		margin: 0 auto;
		gap: 0.5em;

		color: var(--color-foreground-low);
		text-decoration: none;

		b {
			color: var(--color-foreground-full);
		}

		#right-arrow {
			transition: transform 100ms ease;
			transform: translateY(3px);
		}

		&:hover {
			#right-arrow {
				transform: translate(3px, 3px);
			}
		}
	}
</style>
