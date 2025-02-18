<script lang="ts">
	import { animate, stagger } from 'motion';
	import { onMount } from 'svelte';
	import HomeDecoration1 from '$lib/svg/decorations/HomeDecoration1.svelte';
	import HomeDecoration2 from '$lib/svg/decorations/HomeDecoration2.svelte';
	import { page } from '$app/stores';

	let logoEl: HTMLVideoElement;
	let heroEl: HTMLVideoElement | undefined;

	let featuresAnimated = false;
	let sectionAnimationPercent = 0;

	onMount(() => {
		scrollUpParallax();

		logoEl = document.getElementById('logo') as HTMLVideoElement;

		if (logoEl) {
			if (logoEl.paused) {
				logoEl.play();
			}

			requestAnimationFrame(() => {
				animateWebsiteFeatures();
			});

			logoEl.onloadedmetadata = () => {
				animateWebsiteFeatures();
			};
			logoEl.oncanplay = () => {
				animateWebsiteFeatures();
			};
		}
	});

	function scrollUpParallax() {
		sectionAnimationPercent = Math.min(window.scrollY / 400, 1);
	}

	function animateWebsiteFeatures() {
		if (featuresAnimated) return;

		featuresAnimated = true;

		const START_ANIMATION = 1;
		animate(
			logoEl,
			{
				top: `-70px`
				// transform: `translateY(-100%)`
			},
			{
				duration: 0.5,
				easing: [0.8, 0, 0.4, 1],
				delay: START_ANIMATION
			}
		);
		animate(
			'.phrase',
			{ opacity: 1, top: 0 },
			{
				delay: stagger(0.25, { start: START_ANIMATION + 0.2 }),
				easing: [0.55, 0, 0.1, 1],
				duration: 1.25
			}
		);
		const heroAnimation = animate('#hero', { opacity: 1 }, { delay: START_ANIMATION + 1.125 });
		if (typeof heroEl !== 'undefined' && heroEl) {
			heroAnimation.finished.then(() => (heroEl as HTMLVideoElement).play());
		}
	}
</script>

<svelte:window on:scroll={scrollUpParallax} />

<header>
	<div id="decorations" aria-hidden>
		<div id="deco1">
			<HomeDecoration1 />
		</div>
		<div id="deco2">
			<HomeDecoration2 />
		</div>
	</div>

	<div id="header-contents">
		<div id="top-part" style="transform: translateY({0 - 150 * sectionAnimationPercent}px)">
			<h1>
				<span class="phrase"> James Huang, </span> <br />
				<span class="phrase"> multidisciplinary </span> <br />
				<span class="phrase"> <span class="highlighted">designer</span>. </span>
			</h1>

			<video
				id="logo"
				src="https://f004.backblazeb2.com/file/jameshuangwebsite/Comp+1.mp4"
				autoplay
				muted
				playsinline
			/>
		</div>

		<div id="hero-wrapper">
			{#if $page.data.privateMode}
				<video
					id="hero"
					src="https://f004.backblazeb2.com/file/jameshuangwebsite/tempfinalup2date.mp4"
					muted
					playsinline
					loop
					bind:this={heroEl}
				/>
			{:else}
				<img
					id="hero"
					src="/hero-static-image.png"
					alt="Still of the hero video that would supposedly play"
				/>
				<sup>
					The landing video has been replaced by a still to avoid leaking personal information.
				</sup>
			{/if}
		</div>
	</div>
</header>

<style lang="scss">
	video {
		pointer-events: none;
	}

	header {
		display: grid;
		place-items: center;
		position: relative;
		min-height: 90vh;

		#header-contents {
			padding-top: 12rem;

			#top-part {
				display: flex;
				flex-direction: column;
				align-items: center;
				justify-content: center;
				gap: 1rem;
			}
		}

		#logo {
			width: clamp(76px, 20vw, 90px);
			position: absolute;
			top: 100%;
		}

		h1 {
			font-size: var(--font-size-xxl);
			line-height: 1.2;
			text-align: center;
			padding: 0 1rem;

			.phrase {
				opacity: 0;
				position: relative;
				top: 3rem;
				// will-change: opacity, top;
			}

			@media (max-width: 800px) {
				font-size: var(--font-size-xl);
			}
		}

		#hero-wrapper {
			position: relative;

			#hero {
				width: 100%;
				height: 100%;
				max-width: 1200px;
				aspect-ratio: 1.875 / 1;
				opacity: 0;
			}

			sup {
				position: absolute;
				display: block;
				font-size: var(--font-size-xs);
				color: var(--color-foreground-low);
				margin: 0 auto;
				padding: 0 1rem;
				bottom: 0;
				left: 50%;
				transform: translateX(-50%);
				text-align: center;
			}
		}

		#decorations {
			* {
				position: absolute;
				pointer-events: none;
				z-index: 2;
				opacity: 0.75;
			}

			#deco1 {
				transform-origin: top left;
				top: 0;
				left: 0;
			}

			#deco2 {
				transform-origin: bottom right;
				bottom: 0;
				right: 0;
			}

			@media (max-width: 1450px) {
				#deco2 {
					bottom: 50%;
					transform: translateY(50%);
				}
			}
			@media (max-width: 1050px) {
				* {
					scale: 0.75;
				}
			}
			@media (max-width: 900px) {
				* {
					scale: 0.7;
				}

				#deco2 {
					scale: 0.5;
				}
			}
		}
	}
</style>
