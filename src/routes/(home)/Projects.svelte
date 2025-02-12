<script lang="ts">
	import { page } from '$app/stores';
	import ProjectGrid from '$lib/components/ProjectGrid.svelte';
	import { ArrowRight } from 'phosphor-svelte';
	import ScrollToButton from './ScrollToButton.svelte';
</script>

<ProjectGrid projects={$page.data.projects} />

<a id="other-work" href="/other-work">
	<div class="text">
		<b>Miscellaneous work</b>
		<span>Art, Photography, Archive </span>
	</div>
	<div id="right-arrow">
		<ArrowRight />
	</div>
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
		gap: 0.75rem;
		padding: 0 var(--space-lg);
		margin-bottom: var(--space-xxl);
		background-color: hsla(0, 0%, 100%, 0.06);
		padding: 1rem 1.25rem;
		border-radius: 1rem;

		color: var(--color-foreground-low);
		text-decoration: none;

		b {
			color: var(--color-foreground-full);
		}

		.text {
			display: flex;
			flex-direction: column;
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

		@media (max-width: 600px) {
			gap: 1em;

			span::before {
				content: '';
			}

			.text {
				display: flex;
				flex-direction: column;
			}
		}
	}
</style>
