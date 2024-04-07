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
</script>

<div class="text-input" class:inline>
	{#if label}
		<label for={name}>
			{label}
		</label>
	{/if}

	<!-- svelte-ignore a11y-autofocus -->
	<input
		{autofocus}
		{placeholder}
		{name}
		{...{ type }}
		bind:value
		{required}
		{maxlength}
		{minlength}
	/>

	{#if error}
		<p class="error">{error}</p>
	{/if}
</div>

<style lang="scss">
	.text-input {
		display: flex;
		flex-direction: column;
		gap: 0.25rem;
		font-size: var(--font-size-sm);
		width: 100%;

		&.inline {
			display: inline-flex;
			width: fit-content;
		}

		input {
			padding: 0.5rem;
			font: inherit;
			font-size: var(--font-size-base);
			border-radius: 0.25rem;
			background-color: var(--color-background);
			border: 1px solid var(--color-foreground-full);
			color: var(--color-foreground-full);

			&:active,
			&:focus {
				background-color: var(--color-foreground-full);
				// border-color: var(--color-primary);
				color: var(--color-background);
				outline: none;
			}
		}

		.error {
			color: #ff0000;
		}
	}
</style>
