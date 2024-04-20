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

		while (!logoEl) {
			logoEl = document.getElementById('logo') as HTMLVideoElement;
		}

		if (logoEl) {
			if (logoEl.paused) {
				logoEl.play();
			}

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
		animate(
			'#links a',
			{ opacity: 1, left: 0 },
			{
				delay: stagger(0.25, { start: START_ANIMATION + 1.125 }),
				duration: 1
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
			<video
				id="logo"
				src="https://f004.backblazeb2.com/file/jameshuangwebsite/Comp+1.mp4"
				autoplay
				muted
				playsinline
			/>

			<h1>
				<span class="phrase"> Product-focused </span>
				<span class="phrase highlighted"> designer </span> <br />
				<span class="phrase"> crafting experiences </span>
				<span class="phrase"> and identities </span>
			</h1>

			<ul id="links">
				<a href="#about-me">
					<span>About</span>
					<svg
						width="18"
						height="19"
						viewBox="0 0 18 19"
						fill="none"
						xmlns="http://www.w3.org/2000/svg"
						id="svg1988074152_1220"
					>
						<path
							d="M10.2785 3.99477C10.2083 3.92563 10.1252 3.87099 10.0339 3.83396C9.94265 3.79694 9.84496 3.77826 9.74644 3.77899C9.64793 3.77973 9.55053 3.79985 9.4598 3.83823C9.36906 3.8766 9.28678 3.93247 9.21763 4.00265C9.14849 4.07282 9.09385 4.15593 9.05683 4.24722C9.0198 4.33851 9.00113 4.43621 9.00186 4.53472C9.00259 4.63323 9.02272 4.73063 9.06109 4.82137C9.09946 4.9121 9.15533 4.99439 9.22551 5.06353L13.253 9.03105L3.00048 9.03105C2.80157 9.03105 2.6108 9.11007 2.47015 9.25072C2.32949 9.39137 2.25047 9.58214 2.25047 9.78105C2.25047 9.97996 2.32949 10.1707 2.47015 10.3114C2.6108 10.452 2.80157 10.5311 3.00048 10.5311L13.2478 10.5311L9.22476 14.4963C9.0868 14.6367 9.00957 14.8258 9.00974 15.0226C9.00991 15.2195 9.08746 15.4084 9.22567 15.5485C9.36388 15.6887 9.55165 15.7689 9.74848 15.7719C9.94531 15.7748 10.1354 15.7003 10.2778 15.5643L15.4708 10.4478C15.5592 10.3606 15.6295 10.2567 15.6774 10.1421C15.7253 10.0275 15.75 9.90451 15.75 9.7803C15.75 9.65609 15.7253 9.53312 15.6774 9.41853C15.6295 9.30394 15.5592 9.20002 15.4708 9.1128L10.2778 3.99552L10.2785 3.99477Z"
							fill="currentColor"
						/>
					</svg>
				</a>
				<a href="#projects">
					<span>Work</span>
					<svg
						width="18"
						height="19"
						viewBox="0 0 18 19"
						fill="none"
						xmlns="http://www.w3.org/2000/svg"
						id="svg1988074152_1220"
					>
						<path
							d="M10.2785 3.99477C10.2083 3.92563 10.1252 3.87099 10.0339 3.83396C9.94265 3.79694 9.84496 3.77826 9.74644 3.77899C9.64793 3.77973 9.55053 3.79985 9.4598 3.83823C9.36906 3.8766 9.28678 3.93247 9.21763 4.00265C9.14849 4.07282 9.09385 4.15593 9.05683 4.24722C9.0198 4.33851 9.00113 4.43621 9.00186 4.53472C9.00259 4.63323 9.02272 4.73063 9.06109 4.82137C9.09946 4.9121 9.15533 4.99439 9.22551 5.06353L13.253 9.03105L3.00048 9.03105C2.80157 9.03105 2.6108 9.11007 2.47015 9.25072C2.32949 9.39137 2.25047 9.58214 2.25047 9.78105C2.25047 9.97996 2.32949 10.1707 2.47015 10.3114C2.6108 10.452 2.80157 10.5311 3.00048 10.5311L13.2478 10.5311L9.22476 14.4963C9.0868 14.6367 9.00957 14.8258 9.00974 15.0226C9.00991 15.2195 9.08746 15.4084 9.22567 15.5485C9.36388 15.6887 9.55165 15.7689 9.74848 15.7719C9.94531 15.7748 10.1354 15.7003 10.2778 15.5643L15.4708 10.4478C15.5592 10.3606 15.6295 10.2567 15.6774 10.1421C15.7253 10.0275 15.75 9.90451 15.75 9.7803C15.75 9.65609 15.7253 9.53312 15.6774 9.41853C15.6295 9.30394 15.5592 9.20002 15.4708 9.1128L10.2778 3.99552L10.2785 3.99477Z"
							fill="currentColor"
						/>
					</svg>
				</a>
				<a href="#contact">
					Contact
					<svg
						width="18"
						height="19"
						viewBox="0 0 18 19"
						fill="none"
						xmlns="http://www.w3.org/2000/svg"
						id="svg1988074152_1220"
					>
						<path
							d="M10.2785 3.99477C10.2083 3.92563 10.1252 3.87099 10.0339 3.83396C9.94265 3.79694 9.84496 3.77826 9.74644 3.77899C9.64793 3.77973 9.55053 3.79985 9.4598 3.83823C9.36906 3.8766 9.28678 3.93247 9.21763 4.00265C9.14849 4.07282 9.09385 4.15593 9.05683 4.24722C9.0198 4.33851 9.00113 4.43621 9.00186 4.53472C9.00259 4.63323 9.02272 4.73063 9.06109 4.82137C9.09946 4.9121 9.15533 4.99439 9.22551 5.06353L13.253 9.03105L3.00048 9.03105C2.80157 9.03105 2.6108 9.11007 2.47015 9.25072C2.32949 9.39137 2.25047 9.58214 2.25047 9.78105C2.25047 9.97996 2.32949 10.1707 2.47015 10.3114C2.6108 10.452 2.80157 10.5311 3.00048 10.5311L13.2478 10.5311L9.22476 14.4963C9.0868 14.6367 9.00957 14.8258 9.00974 15.0226C9.00991 15.2195 9.08746 15.4084 9.22567 15.5485C9.36388 15.6887 9.55165 15.7689 9.74848 15.7719C9.94531 15.7748 10.1354 15.7003 10.2778 15.5643L15.4708 10.4478C15.5592 10.3606 15.6295 10.2567 15.6774 10.1421C15.7253 10.0275 15.75 9.90451 15.75 9.7803C15.75 9.65609 15.7253 9.53312 15.6774 9.41853C15.6295 9.30394 15.5592 9.20002 15.4708 9.1128L10.2778 3.99552L10.2785 3.99477Z"
							fill="currentColor"
						/>
					</svg>
				</a>
			</ul>
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

		#links {
			display: flex;
			gap: 1rem;
			font-weight: 600;
			margin: 0;
			margin-top: 1rem;
			padding: 0;
			list-style: none;

			a {
				font-size: var(--font-size-sm);
				color: var(--color-foreground-low);
				text-decoration: none;
				text-transform: uppercase;
				display: flex;
				gap: 0.25rem;
				align-items: center;
				letter-spacing: 0.06rem;
				transition: scale 0.2s ease-in-out, color 0.2s ease-in-out;
				will-change: scale, color;
				position: relative;
				line-height: 0%;
				opacity: 0;
				position: relative;
				left: -0.5rem;

				&:hover {
					scale: 1.1;
					color: var(--color-foreground-lowest);
				}

				svg {
					translate: 0px -2px;
				}
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
				bottom: 2rem;
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
