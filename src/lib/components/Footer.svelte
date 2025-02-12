<script lang="ts">
	import FooterDecoration from '$lib/svg/decorations/FooterDecoration.svelte';
	import UpArrow from '$lib/svg/UpArrow.svelte';
	import { readable } from 'svelte/store';
	import { links } from '$lib/helpers/links';

	const clock = readable(new Date(), (set) => {
		const interval = setInterval(() => {
			set(new Date());
		}, 1000);

		return () => clearInterval(interval);
	});
</script>

<footer>
	<section id="about">
		<div id="designed-by">
			<svg
				width="70.6732406616211"
				height="40.07689666748047"
				viewBox="0 0 53 31"
				fill="none"
				xmlns="http://www.w3.org/2000/svg"
				aria-label="James"
			>
				<path
					d="M3.16765 7.78552C4.68824 6.97829 8.42217 4.52015 11.1932 1.14541C11.7988 0.485742 12.482 1.71047 10.3697 11.8868C9.51577 15.9706 7.75039 30.0754 2.33111 30.0754C-0.338648 30.0754 1.73027 22.7568 2.34449 21.6116C3.16173 20.1802 4.7929 17.2822 10.3697 14.8683C16.6175 12.164 14.8997 12.4466 17.6292 10.8706C15.7586 10.8706 14.108 13.358 14.6831 14.5558C14.7136 14.9421 15.1877 15.3683 16.8398 13.9829C18.492 12.5976 19.1403 12.0083 19.258 11.8868C19.2885 11.8477 19.3625 11.793 19.4148 11.8868C19.4802 12.0039 19.1011 15.311 19.8984 14.9985C20.0902 15.0723 20.7977 14.8318 22.0944 13.2799C23.7152 11.3399 24.1465 10.4806 24.97 10.2593C25.166 10.1595 25.5268 10.3244 25.4013 11.7826C25.2758 13.2408 26.264 13.1106 26.7738 12.8632C27.802 12.4032 30.1565 11.2149 31.3486 10.1421C31.549 9.94246 31.9812 9.86608 32.1067 11.1576C32.2322 12.4492 33.5184 12.5551 34.1458 12.4466C34.7949 12.3815 36.5299 11.8295 38.2762 10.1421C40.459 8.03289 41.4785 6.61373 41.4393 6.35334C41.4001 6.09294 40.7858 6.17106 40.3806 6.76997C39.9754 7.36888 36.9952 10.3895 39.2173 10.702C40.9949 10.9519 42.4589 10.4329 42.9686 10.1421C44.1189 9.48243 46.788 7.82978 48.2624 6.49655C49.7368 5.16333 49.6261 4.50886 49.3865 4.34829C48.9072 4.04449 47.8833 3.95248 47.6219 6.01482C47.6524 6.71789 48.3748 7.91311 51.0203 7.06943C51.4809 6.92255 52.3965 6.35334 52.2621 7.66834C52.0629 9.61765 48.2624 17.8898 31.3486 26.1923"
					stroke="url(#paint0_linear_915_10144)"
					stroke-width="1.25969"
					stroke-linecap="round"
					stroke-linejoin="round"
				/>
				<defs>
					<linearGradient
						id="paint0_linear_915_10144"
						x1="94.7639"
						y1="-36.5174"
						x2="-85.6875"
						y2="31.4969"
						gradientUnits="userSpaceOnUse"
					>
						<stop offset="0.150838" stop-color="#FF9B7B" />
						<stop offset="0.851762" stop-color="#8AFFEA" stop-opacity="0.8" />
					</linearGradient>
				</defs>
			</svg>
		</div>

		<div id="links">
			<div id="icons">
				{#each links as link}
					<a href={link.href} target="_blank" rel="noopener noreferrer" aria-label={link.label}>
						<svelte:component this={link.icon} size={24} />
					</a>
				{/each}
			</div>
			<div id="labels">
				{#each links as link, index}
					<a href={link.href} target="_blank" rel="noopener noreferrer" class="label">
						{link.label}
					</a>
					{#if index !== links.length - 1}
						/
					{/if}
				{/each}
			</div>
		</div>

		<div id="clock">
			<time datetime={$clock.toISOString()}>
				{$clock.toLocaleTimeString('en-AU', {
					hour: 'numeric',
					minute: '2-digit',
					hour12: true,
					timeZone: 'Australia/Sydney'
				})}
			</time>

			<span id="timezone-description"> (AEDT) in my timezone </span>
		</div>
	</section>

	<div id="right-side">
		<section id="location">
			<div id="location-label">Currently based in</div>
			<div id="location-value">Sydney, NSW</div>
		</section>

		<button
			on:click={() =>
				window.scrollTo({
					top: 0
				})}
			aria-label="Scroll up"
		>
			<UpArrow />
		</button>
	</div>

	<div id="decoration" aria-hidden>
		<FooterDecoration />
	</div>
</footer>

<style lang="scss">
	footer {
		display: flex;
		padding: 5rem 3rem;
		gap: 2rem;
		justify-content: space-between;
		position: relative;
		overflow: hidden;
		width: 95%;
		margin: 0 auto;
		align-items: flex-end;

		#about {
			display: flex;
			flex-direction: column;
			gap: 1rem;

			#designed-by {
				display: flex;
				gap: 0.5rem;
				align-items: center;
				text-transform: uppercase;
				font-size: var(--font-size-base);
				letter-spacing: 0.075rem;
				color: var(--color-foreground-full);
			}

			#links {
				display: flex;
				align-items: center;
				color: var(--color-foreground-lowest);

				#icons {
					display: flex;
					margin-left: -1rem;

					a {
						display: grid;
						place-items: center;
						width: 3rem;
						height: 3rem;
						padding: 0.75rem;
						color: var(--color-foreground-medium);
						transition: color 100ms ease-in-out;
					}
				}

				#labels {
					margin-left: 1rem;
					display: flex;
					gap: 0.25rem;
					text-transform: uppercase;
					font-size: var(--font-size-xs);
					letter-spacing: 0.075rem;
					color: var(--color-foreground-lowest);

					.label {
						color: var(--color-foreground-low);
						text-decoration: none;

						&:hover {
							text-decoration: underline;
						}
					}

					@media (max-width: 1110px) {
						display: none;
					}
				}
			}

			#clock {
				time {
					color: var(--color-foreground-full);
					font-size: var(--font-size-md);
					margin-right: var(--space-sm);
				}

				#timezone-description {
					color: var(--color-foreground-low);
					font-size: var(--font-size-sm);
				}
			}
		}

		#right-side {
			display: flex;
			flex-direction: column;
			align-items: flex-end;
			gap: 2rem;
			max-width: max-content;
		}

		#location {
			display: flex;
			flex-direction: column;
			gap: 0.25rem;
			text-align: end;

			#location-label {
				text-transform: uppercase;
				color: var(--color-foreground-low);
				font-size: var(--font-size-xs);
				letter-spacing: 0.05rem;
			}

			#location-value {
				color: var(--color-foreground-full);
				font-size: 1.3rem;
			}
		}

		#decoration {
			position: absolute;
			bottom: -10px;
			right: 30%;
			transform: translateX(50%);
			z-index: -1;
			pointer-events: none;
			transform-origin: bottom right;

			@media (max-width: 600px) {
				scale: 0.75;
			}
		}

		@media (max-width: 800px) {
			flex-direction: column;
			padding: 5rem var(--space-lg);

			#right-side {
				align-items: flex-start;

				#location {
					text-align: start;
				}
			}
		}
	}
</style>
