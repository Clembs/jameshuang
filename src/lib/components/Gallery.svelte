<script lang="ts">
	export let open = false;
	export let images: string[];
	export let currentImage = 0;

	let dialogEl: HTMLDialogElement;
	let galleryEl: HTMLElement;

	$: if (dialogEl && open) {
		dialogEl.showModal();
		galleryEl.scrollTo({
			left: currentImage * window.innerWidth,
			behavior: 'smooth'
		});
	}

	$: if (galleryEl)
		galleryEl.scrollTo({
			left: currentImage * window.innerWidth,
			behavior: 'smooth'
		});
</script>

<svelte:window
	on:keydown={(e) => {
		if (e.key === 'ArrowLeft') {
			currentImage = Math.max(currentImage - 1, 0);
		} else if (e.key === 'ArrowRight') {
			currentImage = Math.min(currentImage + 1, images.length - 1);
		}
	}}
/>

<dialog on:close={() => (open = false)} bind:this={dialogEl} class="gallery">
	<form method="dialog">
		<button aria-label="Close gallery">
			<svg
				xmlns="http://www.w3.org/2000/svg"
				fill="none"
				viewBox="0 0 24 24"
				stroke="currentColor"
				height="24"
				width="24"
			>
				<path
					stroke-linecap="round"
					stroke-linejoin="round"
					stroke-width="2"
					d="M6 18L18 6M6 6l12 12"
				/>
			</svg>
		</button>
	</form>
	<ol class="gallery-images" bind:this={galleryEl}>
		{#each images as image, i}
			<li class="image" id="gallery-image-{i}">
				<slot name="image" {image} index={i + 1} />
			</li>
		{/each}
	</ol>
</dialog>

<style lang="scss">
	.gallery {
		background-color: transparent;
		padding: 0;
		border: none;
		min-width: 100%;

		form {
			position: fixed;
			top: 0;
			right: 0;
			z-index: 1;
			color: var(--color-foreground-full);

			button {
				display: grid;
				padding: 1rem;
			}
		}

		.gallery-images {
			display: flex;
			align-items: center;
			gap: 1rem;
			overflow: auto;
			padding: 1rem;
			margin: 0;
			scroll-snap-type: x mandatory;
			list-style: none;

			.image {
				scroll-snap-align: center;
				min-width: 100%;
				height: 100%;
				display: grid;
				place-items: center;
				margin: 0;
				padding: 0;

				:global(img) {
					min-width: 100%;
					height: 100%;
				}
			}
		}

		&::backdrop {
			// content: '';
			// display: block;
			// width: 100vw;
			// height: 100vh;
			background-color: rgba(0, 0, 0, 0.75);
			// position: fixed;
			// inset: 0;
			// z-index: -1;
		}
	}
</style>
