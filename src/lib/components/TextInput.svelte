<script lang="ts">
	export let type: 'email' | 'password' | 'text' | 'number' | 'date' = 'text';
	export let name: string;
	export let placeholder: string = '';
	export let value: string | number | null | undefined = '';
	export let label: string = '';
	export let required: boolean = true;
	export let error = '';
	export let maxlength: number | undefined = undefined;
	export let minlength: number | undefined = undefined;
	export let autofocus: boolean = false;
	export let inline: boolean = false;
	export let wide: boolean = false;
	export let multiline: boolean = false;
</script>

<div class="text-input" class:inline class:wide>
	{#if label}
		<label for={name}>
			{label}
		</label>
	{/if}

	{#if multiline}
		<!-- svelte-ignore a11y-autofocus -->
		<textarea
			{...autofocus && { autofocus }}
			{placeholder}
			{name}
			bind:value
			{required}
			{maxlength}
			{minlength}
		/>
	{:else}
		<!-- svelte-ignore a11y-autofocus -->
		<!-- {autofocus} -->
		<input
			{...autofocus && { autofocus }}
			{placeholder}
			{name}
			{...{ type }}
			bind:value
			{required}
			{maxlength}
			{minlength}
		/>
	{/if}

	{#if error}
		<p class="error">{error}</p>
	{/if}
</div>

<style lang="scss">
	.text-input {
		display: flex;
		flex-direction: column;
		gap: 0.25rem;
		width: 100%;

		label {
			font-size: var(--font-size-sm);
			text-transform: uppercase;
			letter-spacing: 1px;
		}

		&.inline {
			display: inline-flex;
			width: fit-content;
		}

		&.wide {
			input,
			textarea {
				padding: 0.75rem var(--space-md);
			}
		}

		input,
		textarea {
			padding: var(--space-sm);
			font: inherit;
			font-size: var(--font-size-base);
			border-radius: 0.25rem;
			// background-color: var(--color-background);
			background-color: transparent;
			border: 1px solid var(--color-foreground-lowest);
			color: var(--color-foreground-full);

			&:active,
			&:focus {
				background-color: var(--color-foreground-full);
				// border-color: var(--color-primary);
				color: var(--color-background);
				outline: none;
			}
		}

		textarea {
			min-height: 7.5rem;
			resize: vertical;
		}

		.error {
			color: #ff0000;
		}
	}
</style>
