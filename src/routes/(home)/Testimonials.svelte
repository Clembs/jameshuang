<script lang="ts">
	import Quote from '$lib/svg/Quote.svelte';
	import { onMount } from 'svelte';

	let sectionEl: HTMLElement;
	let sectionAnimationPercent = 0;

	// the more you scroll down, the more the opacity increases and the more the section moves up
	function animateSection() {
		const sectionRect = sectionEl.getBoundingClientRect();

		sectionAnimationPercent = Math.max(
			(window.innerHeight - (sectionRect.top - sectionRect.height / 2)) / window.innerHeight,
			0
		);
	}

	onMount(animateSection);
</script>

<svelte:window on:scroll={animateSection} />

<section
	bind:this={sectionEl}
	id="testimonials-section"
	style="opacity: {sectionAnimationPercent};
  transform: translateY(calc(-50px * {sectionAnimationPercent}));"
>
	<ul id="testimonials">
		<li class="testimonial-wrapper">
			<div class="testimonial">
				<div class="quote-symbol">
					<Quote />
				</div>

				<div class="quote">
					<span class="highlight">Incredible output, organised, diligent, proactive...</span>
					I'm privileged to have him on our Team at Catalyst Chemistry.
				</div>
				<div class="author">
					<div class="profile">
						<img
							src="/testimonials/avatars/jeff-tse.png"
							alt="Jeff Tse"
							height="40"
							width="40"
							class="avatar"
						/>
						<div class="text">
							<div class="name">Jeff Tse</div>
							<p class="position">Founder @ Catalyst Chemistry</p>
						</div>
					</div>

					<img
						src="/testimonials/logos/catalyst-chemistry.svg"
						alt="Catalyst Chemistry's logo"
						class="logo"
					/>
				</div>
			</div>
		</li>
		<li class="testimonial-wrapper">
			<div class="testimonial">
				<div class="quote-symbol">
					<Quote />
				</div>

				<div class="quote">
					James is great to work with. He's <span class="highlight">dedicated</span> to his craft...
					and produces <span class="highlight">great quality UX/UI</span> output.
				</div>
				<div class="author">
					<div class="profile">
						<img
							src="/testimonials/avatars/daniel-radovich.png"
							alt="Daniel Radovich"
							height="40"
							width="40"
							class="avatar"
						/>
						<div class="text">
							<div class="name">Daniel Radovich</div>
							<p class="position">Director, Lead Product Designer @ Raw Studio</p>
						</div>
					</div>

					<img src="/testimonials/logos/raw.svg" alt="Raw Studio's logo" class="logo" />
				</div>
			</div>
		</li>
		<li class="testimonial-wrapper">
			<div class="testimonial">
				<div class="quote-symbol">
					<Quote />
				</div>

				<div class="quote">
					James is one of the few designers I know that makes you think
					<span class="highlight">'why would I want it any other way?'.</span>
				</div>
				<div class="author">
					<div class="profile">
						<img
							src="/testimonials/avatars/darren-candra.png"
							alt="Darren Candra"
							height="40"
							width="40"
							class="avatar"
						/>
						<div class="text">
							<div class="name">Darren Candra</div>
							<p class="position">Founder @ Subjective Labs</p>
						</div>
					</div>

					<img
						src="/testimonials/logos/subjective-labs.png"
						alt="Subjective Labs's logo"
						class="logo"
					/>
				</div>
			</div>
		</li>
	</ul>
</section>

<style lang="scss">
	#testimonials-section {
		padding: var(--space-xxl) var(--space-xxl);
		margin: 0 auto;

		@media (max-width: 600px) {
			padding: var(--space-md) var(--space-sm);
		}
	}

	#testimonials {
		display: grid;
		grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
		gap: var(--space-lg);
		list-style: none;
		padding: 0;
		margin: 0 auto;
	}

	.testimonial-wrapper {
		padding: 1px;
		background-image: linear-gradient(
			180deg,
			var(--color-foreground-lowest),
			var(--color-foreground-lowerest)
		);
		border-radius: calc(var(--space-lg) + 1px);
		height: fit-content;
	}

	.testimonial {
		display: flex;
		flex-direction: column;
		align-items: center;
		gap: var(--space-lg);
		padding: var(--space-xl);
		border-radius: var(--space-lg);
		background-color: var(--color-background);

		.quote-symbol {
			background-color: var(--color-background);
			margin-top: -45px;
			padding: 0 1rem;
		}

		.quote {
			font-size: var(--font-size-md);
			color: var(--color-foreground-low);

			.highlight {
				color: var(--color-foreground-full);
			}
		}

		.author {
			display: flex;
			justify-content: space-between;
			gap: var(--space-md);
			align-items: center;
			width: 100%;
			padding-left: var(--space-md);
			border-left: 2px solid var(--color-foreground-low);

			.profile {
				display: grid;
				grid-template-columns: auto 1fr;
				gap: var(--space-md);
				align-items: center;

				.avatar {
					border-radius: 50%;
					background-color: var(--color-foreground-low);
					font-size: 0px;
				}

				.name {
					font-weight: 600;
					color: var(--color-foreground-full);
				}

				.position {
					font-size: var(--font-size-sm);
					text-wrap: balance;
				}
			}

			.logo {
				width: auto;
				height: 30px;
				max-width: 45px;
			}
		}
	}
</style>
