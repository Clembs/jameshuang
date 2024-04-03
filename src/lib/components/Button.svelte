<script lang="ts">
	export let type: 'submit' | 'button' = 'submit';
	export let style: 'filled' | 'outline' = 'filled';
</script>

<button on:click {type} class={style}>
	<slot />
</button>

<style lang="scss">
	button {
		padding: 0.5rem 1.5rem;
		font: inherit;
		font-size: var(--font-size-base);
		border-radius: 0.25rem;
		margin-top: 0.5rem;

		&.filled {
			background-color: var(--color-foreground-full);
			color: var(--color-background);
			border: 1px solid transparent;

			&:hover {
				background-color: var(--color-foreground-medium);
			}
		}

		&.outline {
			background-color: transparent;
			color: var(--color-foreground-full);
			border: 1px solid var(--color-foreground-full);

			&:hover {
				background-color: var(--color-foreground-lowest);
			}
		}
	}
</style>
