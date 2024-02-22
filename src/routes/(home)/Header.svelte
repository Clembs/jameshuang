<header>
	<video
		id="logo"
		src="https://f004.backblazeb2.com/file/jameshuangwebsite/Comp+1.mp4"
		autoplay
		muted
		playsinline
	/>

	<h1>
		Product-focused <span class="highlighted"> designer </span> <br />
		crafting experiences and identities
	</h1>

	<nav id="links">
		<a href="#about-me">About</a>
		<a href="#projects">Work</a>
		<a href="#contact">Contact</a>
	</nav>

	<video
		id="hero"
		src="https://f004.backblazeb2.com/file/jameshuangwebsite/tempfinalup2date.mp4"
		autoplay
		muted
		playsinline
		loop
	/>
</header>

<style lang="scss">
	header {
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
		padding: 2rem 0;
		gap: 1rem;

		#logo {
			width: clamp(76px, 20vw, 90px);
		}

		h1 {
			font-size: var(--font-size-xxl);
			line-height: 1.2;
			text-align: center;
			padding: 0 1rem;
		}

		#links {
			display: flex;
			gap: 1rem;
			font-weight: 600;

			a {
				font-size: var(--font-size-sm);
				color: var(--color-text);
				text-decoration: none;
				text-transform: uppercase;
				transition: scale 0.2s ease-in-out;
				will-change: scale;

				&:hover {
					scale: 1.1;
				}
			}
		}

		#hero {
			width: 100%;
			height: 100%;
			max-width: 1200px;
			aspect-ratio: 1.875 / 1;
		}
	}
</style>
