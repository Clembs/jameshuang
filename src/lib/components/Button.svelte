<script lang="ts">
	export let type: 'submit' | 'button' = 'submit';
	export let style: 'filled' | 'outlined' = 'filled';
	export let formaction: string | null = null;
	export let href = '';
</script>

{#if href}
	<a {href} class={style}>
		<slot />
	</a>
{:else}
	<button on:click {type} class={style} {formaction}>
		<slot />
	</button>
{/if}

<style lang="scss">
	button,
	a {
		display: inline-block;
		padding: 0.5rem 1.5rem;
		font: inherit;
		font-size: var(--font-size-base);
		border-radius: 0.25rem;
		margin-top: 0.5rem;

		&.filled {
			background-color: var(--color-foreground-full);
			color: var(--color-background);
			border: 1px solid transparent;
			text-decoration: none;

			&:hover {
				background-color: var(--color-foreground-medium);
			}
		}

		&.outlined {
			background-color: transparent;
			color: var(--color-foreground-full);
			border: 1px solid var(--color-foreground-full);

			&:hover {
				background-color: var(--color-foreground-lowest);
			}
		}
	}
</style>
