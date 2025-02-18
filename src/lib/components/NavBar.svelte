<script lang="ts">
	import { page } from '$app/stores';
	import { links } from '$lib/helpers/links';
	import JamesIcon from '$lib/svg/JamesIcon.svelte';
	import { FileText, LinkedinLogo, X } from 'phosphor-svelte';
	import { onMount } from 'svelte';

	let navBarShown = true;
	let menuShown = false;
	let itemsShown = true;
	let linksShown = false;
	let scrollY = 0;

	const items = [
		{
			href: '/#about-me',
			label: 'about',
			img: '/about.webp'
		},
		{
			href: '/#projects',
			label: 'work',
			img: '/work.webp'
		},
		{
			href: '/#contact',
			label: 'contact',
			img: '/contact.webp'
		}
	];

	function toggleMenu() {
		menuShown = !menuShown;
		itemsShown = !menuShown;
		linksShown = menuShown;
	}

	function handleScroll() {
		if (menuShown) return;

		const currentScrollY = window.scrollY;

		if (currentScrollY < 300 && $page.url.pathname === '/') {
			// navBarShown = false;
			// itemsShown = false;
			linksShown = false;
		} else if (currentScrollY > scrollY) {
			// navBarShown = true;
			itemsShown = false;
			linksShown = false;
		} else {
			// navBarShown = true;
			itemsShown = true;
			linksShown = true;
		}

		scrollY = currentScrollY;
	}

	onMount(handleScroll);
</script>

<svelte:window on:scroll={handleScroll} />

<nav class:hidden={!navBarShown}>
	<div class="left">
		<a id="navbar-logo" href="/" on:click={() => (menuShown = false)}>
			<JamesIcon />
		</a>
	</div>

	<ul class="middle" class:hidden={!itemsShown}>
		{#each items as item, i}
			<li style:--index={i + 1}>
				<a href={item.href}>
					{item.label}
				</a>
			</li>
		{/each}
	</ul>

	<div class="right">
		<ul class="links" class:hidden={!linksShown}>
			<a
				href={links.find((l) => l.label === 'LinkedIn')?.href}
				target="_blank"
				rel="noopener noreferrer"
				aria-label="LinkedIn"
			>
				<LinkedinLogo size={28} />
			</a>
			<a
				href={links.find((l) => l.label === 'Resume')?.href}
				target="_blank"
				rel="noopener noreferrer"
				aria-label="Resume"
			>
				<FileText size={28} />
			</a>
		</ul>

		<button on:click={toggleMenu}>
			{#if menuShown}
				<X size={28} />
			{:else}
				<svg
					width="28"
					height="28"
					viewBox="0 0 28 28"
					fill="none"
					xmlns="http://www.w3.org/2000/svg"
				>
					<path
						d="M4.66663 8.16666C4.66663 6.23366 6.23364 4.66666 8.16662 4.66666C10.0996 4.66666 11.6666 6.23366 11.6666 8.16666C11.6666 10.0997 10.0996 11.6667 8.16662 11.6667C6.23364 11.6667 4.66663 10.0997 4.66663 8.16666Z"
						fill="white"
					/>
					<path
						d="M16.3334 8.16666C16.3334 6.23366 17.9003 4.66666 19.8333 4.66666C21.7663 4.66666 23.3334 6.23366 23.3334 8.16666C23.3334 10.0997 21.7663 11.6667 19.8333 11.6667C17.9003 11.6667 16.3334 10.0997 16.3334 8.16666Z"
						fill="white"
					/>
					<path
						d="M4.66663 19.8334C4.66663 17.9004 6.23364 16.3333 8.16662 16.3333C10.0996 16.3333 11.6666 17.9004 11.6666 19.8334C11.6666 21.7664 10.0996 23.3333 8.16662 23.3333C6.23364 23.3333 4.66663 21.7664 4.66663 19.8334Z"
						fill="white"
					/>
					<path
						d="M16.3334 19.8334C16.3334 17.9004 17.9003 16.3333 19.8333 16.3333C21.7663 16.3333 23.3334 17.9004 23.3334 19.8334C23.3334 21.7664 21.7663 23.3333 19.8333 23.3333C17.9003 23.3333 16.3334 21.7664 16.3334 19.8334Z"
						fill="white"
					/>
				</svg>
			{/if}
		</button>
	</div>
</nav>

<div id="nav-menu" class:closed={!menuShown}>
	<ul>
		{#each items as item}
			<li>
				<a href={item.href} on:click={toggleMenu}>
					<div class="item-content">
						<span class="label">
							{item.label}
						</span>
						<div class="img-wrapper">
							<img width="96" height="96" loading="eager" src={item.img} alt={item.label} />
						</div>
					</div>
				</a>
			</li>
		{/each}
	</ul>
</div>

<style lang="scss">
	nav {
		position: fixed;
		inset: 0;
		width: 100%;
		height: fit-content;
		z-index: 9;
		// max-width: 1600px;
		margin: 0 auto;
		mix-blend-mode: difference;
		display: flex;
		justify-content: space-between;
		align-items: flex-start;
		padding: var(--space-lg) var(--space-xl);
		transition: transform 200ms ease;

		.left {
			width: 100%;

			#navbar-logo {
				display: grid;
				margin: -1rem;
				padding: 1rem;
				width: fit-content;

				:global(svg) {
					width: 32px;
					height: 32px;
				}
			}
		}

		&.hidden {
			transform: translateY(-100%);
		}

		.middle {
			width: 100%;
			display: flex;
			margin: 0;
			padding: 0;
			list-style: none;
			gap: var(--space-lg);
			align-items: center;
			justify-content: center;

			&.hidden {
				li {
					transform: translateY(-15px);
					opacity: 0;
					filter: blur(2px);
				}
			}

			li {
				--transition-duration: 250ms;
				--transition-delay: calc(50ms * var(--index));

				transition: transform 200ms ease, opacity 200ms ease, filter 200ms ease;
				transition-delay: var(--transition-delay);

				a {
					color: var(--color-foreground-medium);
					font-family: var(--fonts-headings);
					text-decoration: none;
					font-size: var(--font-size-md);

					&:hover {
						color: var(--color-foreground-full);
					}
				}
			}

			@media (max-width: 800px) {
				display: none;
			}
		}

		.links {
			display: contents;

			a {
				--transition-duration: 250ms;
				--transition-delay: calc(50ms * var(--index));

				transition: transform 200ms ease, opacity 200ms ease, filter 200ms ease;
				transition-delay: var(--transition-delay);
			}

			&.hidden {
				a {
					transform: translateY(-15px);
					opacity: 0;
					filter: blur(2px);
				}
			}
		}

		.right {
			display: flex;
			gap: 2rem;
			align-items: center;
			color: var(--color-foreground-full);
			width: 100%;
			justify-content: flex-end;

			a,
			button {
				display: grid;
				margin: -1rem;
				padding: 1rem;
			}
		}
	}

	#nav-menu {
		position: fixed;
		left: 0;
		top: 0;
		width: 100%;
		min-height: 100%;
		height: 0;
		background-color: var(--color-background);
		transition: min-height 400ms ease-in-out;
		overflow: hidden;
		z-index: 8;

		&.closed {
			min-height: 0;
		}

		ul {
			width: 100%;
			height: 100vh;
			height: 100dvh;
			list-style: none;
			padding: 0;
			margin: 0;
			display: flex;
			flex-direction: column;
			justify-content: flex-end;
			padding-bottom: var(--space-md);
		}

		li {
			width: 100%;
			margin: 0;

			&:last-child {
				border-bottom: 1px solid var(--color-foreground-lowerest);
			}

			a {
				display: block;
				border-top: 1px solid var(--color-foreground-lowerest);
				font-family: var(--fonts-headings);
				text-decoration: none;
				color: var(--color-foreground-low);
				width: 100%;
				transition: color 200ms ease;

				.item-content {
					display: flex;
					justify-content: space-between;
					align-items: center;
					max-width: 1200px;
					margin: 0 auto;
					font-size: var(--font-size-xxl);
					padding: var(--space-md) var(--space-xl);
				}

				.label {
					position: relative;

					&::after {
						content: '';
						position: absolute;
						left: -15px;
						top: -5px;
						width: calc(100% + 30px);
						height: calc(100% + 10px);

						background: radial-gradient(
							50% 50% at 50% 50%,
							#8affea 0%,
							#b5dcc3 32.89%,
							#fca284 59.96%,
							rgba(0, 0, 0, 0) 100%
						);
						opacity: 0;
						transition: opacity 200ms ease;
					}
				}

				.img-wrapper {
					border-radius: var(--space-sm);
					border: 1px solid var(--color-foreground-lowest);
					position: relative;

					img {
						opacity: 0.75;
						transition: opacity 200ms ease;
					}

					&::after {
						content: '';
						position: absolute;
						left: 0;
						top: 0;
						width: 100%;
						height: 100%;
						background-image: linear-gradient(45deg, #00ffd1, #ff9b7b);
						opacity: 0;
						transition: opacity 200ms ease;
						mix-blend-mode: overlay;
					}
					// img {
					// }
				}

				&:hover {
					color: var(--color-foreground-full);

					.label::after {
						opacity: 0.08;
					}

					.img-wrapper {
						img {
							opacity: 1;
						}

						&::after {
							opacity: 0.2;
						}
					}
				}
			}
		}
	}
</style>
