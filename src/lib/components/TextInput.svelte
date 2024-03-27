<script lang="ts">
	export let type: 'email' | 'password' | 'text' | 'number';
	export let name: string;
	export let placeholder: string = '';
	export let value: string = '';
	export let label: string = '';
	export let required: boolean = true;
	export let error = '';
</script>

<div class="text-input">
	{#if label}
		<label for={name}>
			{label}
		</label>
	{/if}

	<input {placeholder} {name} {type} {value} {required} />

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

		input {
			padding: 0.5rem;
			font: inherit;
			font-size: var(--font-size-md);
			border-radius: 0.25rem;
			border: 1px solid var(--color-foreground-full);
		}

		.error {
			color: #ff0000;
		}
	}
</style>
