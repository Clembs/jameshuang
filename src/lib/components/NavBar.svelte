<script lang="ts">
	import { page } from '$app/stores';
	import James from '$lib/svg/James.svelte';
	import { slide, crossfade } from 'svelte/transition';

	let menuShown = true;

	const items = [
		{
			href: '/#about-me',
			label: 'about',
			img: '/about.webp'
		},
		{
			href: '/#about-me',
			label: 'work',
			img: '/work.webp'
		},
		{
			href: '/#about-me',
			label: 'contact',
			img: '/contact.webp'
		}
	];
</script>

<div class="nav-wrapper">
	<nav>
		<a href="/">
			<James />
		</a>

		<div class="right">
			<ul>
				{#each items as item}
					<li>
						<a href={item.href}>
							{item.label}
						</a>
					</li>
				{/each}
			</ul>

			<button on:click={() => (menuShown = !menuShown)}>
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
</div>
<div id="nav-menu" class:closed={!menuShown}>
	<ul>
		{#each items as item}
			<li>
				<a href={item.href}>
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
	.nav-wrapper {
		position: sticky;
		left: 0;
		top: 0;
		z-index: 9;
		max-width: 1200px;
		margin: 0 auto;
		mix-blend-mode: difference;
	}

	nav {
		display: flex;
		justify-content: space-between;
		align-items: center;
		padding: var(--space-md) var(--space-lg);
		position: relative;

		.right {
			display: flex;
			gap: var(--space-xxl);
			align-items: center;
			color: var(--color-foreground-full);

			ul {
				display: flex;
				margin: 0;
				padding: 0;
				list-style: none;
				gap: var(--space-lg);
				align-items: center;

				li {
					a {
						font-family: var(--fonts-headings);
						text-decoration: none;
						font-size: var(--font-size-md);
						transition: color 0.2s;
					}
				}

				@media (max-width: 600px) {
					display: none;
				}
			}
		}

		button {
			display: grid;
			place-items: center;
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
				border-bottom: 1px solid var(--color-foreground-lowest);
			}

			a {
				display: block;
				border-top: 1px solid var(--color-foreground-lowest);
				font-family: var(--fonts-headings);
				text-decoration: none;
				width: 100%;

				.item-content {
					display: flex;
					justify-content: space-between;
					align-items: center;
					max-width: 1200px;
					margin: 0 auto;
					font-size: var(--font-size-xl);
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
