<script lang="ts">
	export let type: 'submit' | 'button' = 'submit';
	export let style: 'filled' | 'outlined' | 'gradient' = 'filled';
	export let formaction: string | null = null;
	export let href = '';
	export let inline = false;
	export let disabled = false;
</script>

{#if href && !disabled}
	<a {href} class={style} class:inline>
		<slot />
	</a>
{:else}
	<button on:click {type} class={style} class:inline {formaction} {disabled}>
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

		&.inline {
			display: inline-flex;
			width: fit-content;
		}

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

		&.gradient {
			background: linear-gradient(297.15deg, #ff9b7b 13.92%, rgba(138, 255, 234, 0.8) 111.83%);
			color: var(--color-background);

			&:hover {
				background: linear-gradient(297.15deg, #ff9b7b 13.92%, rgba(138, 255, 234, 0.8) 111.83%);
			}
		}

		&:disabled {
			cursor: not-allowed;
			opacity: 0.5;
		}
	}
</style>
