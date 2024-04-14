<script lang="ts">
	import { page } from '$app/stores';
	import James from '$lib/svg/James.svelte';
	import { onMount } from 'svelte';

	let navBarShown = false;
	let menuShown = false;
	let itemsShown = false;
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
			href: '/#about-me',
			label: 'contact',
			img: '/contact.webp'
		}
	];

	function toggleMenu() {
		menuShown = !menuShown;
		itemsShown = !menuShown;
	}

	function handleScroll() {
		if (menuShown) return;

		const currentScrollY = window.scrollY;

		if (currentScrollY < 800 && $page.url.pathname === '/') {
			navBarShown = false;
			itemsShown = false;
		} else if (currentScrollY > scrollY) {
			itemsShown = false;
			navBarShown = true;
		} else {
			itemsShown = true;
			navBarShown = true;
		}

		scrollY = currentScrollY;
	}

	onMount(handleScroll);
</script>

<svelte:window on:scroll={handleScroll} />

<nav class:hidden={!navBarShown}>
	<a href="/">
		<James />
	</a>

	<div class="right">
		<ul class:hidden={!itemsShown}>
			{#each items as item, i}
				<li style:--index={i + 1}>
					<a href={item.href}>
						{item.label}
					</a>
				</li>
			{/each}
		</ul>

		<button on:click={toggleMenu}>
			<svg
				xmlns="http://www.w3.org/2000/svg"
				width="24"
				height="24"
				viewBox="0 0 24 24"
				fill="none"
			>
				<circle cx="12" cy="12" r="11" stroke="currentColor" stroke-width="2" />
			</svg>
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
		position: sticky;
		left: 0;
		top: 0;
		z-index: 9;
		max-width: 1600px;
		margin: 0 auto;
		mix-blend-mode: difference;
		display: flex;
		justify-content: space-between;
		align-items: flex-start;
		padding: var(--space-md) var(--space-md);
		transition: transform 200ms ease;

		&.hidden {
			transform: translateY(-100%);
		}

		.right {
			display: flex;
			gap: 13rem;
			align-items: center;
			color: var(--color-foreground-full);

			ul {
				display: flex;
				margin: 0;
				padding: 0;
				list-style: none;
				gap: var(--space-lg);
				align-items: center;

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
		}

		button {
			display: grid;
			place-items: center;
			margin: -1rem;
			padding: 1rem;
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
