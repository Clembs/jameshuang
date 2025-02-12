<script lang="ts">
	import { links } from '$lib/helpers/links';
	import { ArrowRight } from 'phosphor-svelte';
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
	id="contact"
	style="opacity: {sectionAnimationPercent};
	transform: translateY(calc(50px * {sectionAnimationPercent}));
"
>
	<img
		id="contact-background"
		loading="eager"
		aria-hidden
		inert
		alt=""
		src="/contact-background.webp"
	/>

	<div id="contact-left">
		<!-- TODO: load availability from db -->
		<div id="availability-pill">
			<svg width="8" height="8" viewBox="0 0 8 8" fill="none" xmlns="http://www.w3.org/2000/svg">
				<rect width="8" height="8" rx="4" fill="#F6FF92" />
			</svg>

			Limited availability
		</div>

		<div id="contact-header">
			<h2>Ready to <br /> collaborate?</h2>

			<p>or just say hello...</p>
		</div>
	</div>

	<div id="contact-right">
		<div id="email-eyebrow">for all general inquiries,</div>

		<div id="email">hello@jameshuang.design</div>

		<ul id="contact-links">
			{#each links as link}
				<li>
					<a href={link.href}>
						<div class="label">
							<svelte:component this={link.icon} size={24} />

							<span>
								{link.label}
							</span>
						</div>

						<div class="arrow">
							<ArrowRight />
						</div>
					</a>
				</li>
			{/each}
		</ul>
	</div>
</section>

<style lang="scss">
	#contact {
		display: flex;
		justify-content: center;
		align-items: center;
		gap: 6rem;
		padding: var(--space-xl) var(--space-lg);
		position: relative;
		width: 95%;
		margin: 0 auto;

		#contact-background {
			position: absolute;
			width: 75%;
			max-width: none;
			top: 50%;
			left: 50%;
			z-index: -1;
			transform: translate(-50%, -50%);
			opacity: 0.8;

			animation: rotate 15s linear infinite;
			transform-origin: top left;
		}

		#contact-left {
			display: flex;
			flex-direction: column;
			max-width: 30ch;
			padding: 0 1rem;
			height: fit-content;
			padding: 3rem 0;
			gap: var(--space-md);

			#availability-pill {
				background-color: hsla(0, 0%, 100%, 0.1);
				color: var(--color-foreground-full);
				border: 1px solid var(--color-foreground-lowest);
				backdrop-filter: blur(5px);
				padding: var(--space-sm) var(--space-md);
				border-radius: 999px;
				display: flex;
				align-items: center;
				gap: var(--space-sm);
				width: fit-content;
			}

			h2 {
				font-family: var(--fonts-headings);
				font-size: var(--font-size-xxl);
			}

			p {
				font-family: var(--fonts-headings);
				font-size: var(--font-size-lg);
				color: var(--color-foreground-full);
				font-style: italic;
				text-align: right;
			}
		}

		#contact-right {
			min-width: 450px;
			display: flex;
			flex-direction: column;

			#email {
				color: var(--color-foreground-full);
				font-size: var(--font-size-xl);
				padding-bottom: 0.125rem;
				border-bottom: 2px solid var(--color-foreground-full);
				width: fit-content;
				margin-top: var(--space-md);
				margin-bottom: var(--space-lg);
			}

			#contact-links {
				display: grid;
				grid-template-columns: repeat(auto-fit, minmax(150px, 1fr));
				gap: var(--space-lg);
				column-gap: var(--space-xxl);
				list-style: none;
				margin: 0;
				padding: 0;
				width: 100%;

				li {
					display: contents;
				}

				a {
					display: flex;
					align-items: center;
					text-decoration: none;
					justify-content: space-between;
					width: 100%;
					gap: var(--space-lg);
					color: var(--color-foreground-low);

					.label {
						display: flex;
						align-items: center;
						gap: var(--space-sm);
						color: var(--color-foreground-full);

						span {
							transform: translateY(2px);
						}
					}

					.arrow {
						display: grid;
						transition: transform 200ms ease;
					}

					&:hover {
						.arrow {
							transform: translateX(0.5rem);
						}
					}
				}
			}
		}

		@media (max-width: 1050px) {
			flex-direction: column;
			gap: var(--space-xl);
			padding: var(--space-xl) var(--space-base);
			align-items: center;

			#contact-left {
				max-width: none;
				padding: 0;
				text-align: center;
				align-items: center;
				flex-direction: column-reverse;

				p {
					text-align: center;
				}

				br {
					display: none;
				}

				#contact-background {
					animation: none;
					height: 500%;
					top: 20%;
					width: 100%;
					left: 130px;
				}
			}

			#contact-right {
				min-width: 0;
				text-align: center;
				align-items: center;

				#email {
					font-size: var(--font-size-lg);
				}
			}
		}
	}

	@keyframes rotate {
		from {
			rotate: 0deg;
		}
		to {
			rotate: 360deg;
		}
	}
</style>
