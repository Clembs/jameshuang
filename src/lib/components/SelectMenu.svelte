<script lang="ts">
	export let name: string;
	export let label = '';
	export let id = '';
	export let options: {
		label: string;
		value: string;
	}[];
	export let error = '';
</script>

<div class="select-menu">
	{#if label}
		<label for={id || name}>
			{label}
		</label>
	{/if}
	<select {name} id={id || name}>
		{#each options as option}
			<option value={option.value}>
				{option.label}
			</option>
		{/each}
	</select>

	{#if error}
		<p class="error">{error}</p>
	{/if}
</div>

<style lang="scss">
	.select-menu {
		display: flex;
		flex-direction: column;
		gap: 0.25rem;
		width: 100%;

		label {
			text-transform: uppercase;
			font-size: var(--font-size-sm);
		}

		select {
			border: 1px solid var(--color-foreground-lowest);
			background-color: transparent;
			color: var(--color-foreground-full);
			font: inherit;
			font-size: var(--font-size-base);
			border-radius: 0.25rem;
			padding: 0.75rem var(--space-md);
			appearance: none;

			option {
				background-color: var(--color-background);
				font: inherit;
			}
			// &:after {
			// 	position: absolute;
			// 	content: '';
			// 	top: 14px;
			// 	right: 10px;
			// 	width: 0;
			// 	height: 0;
			// 	border: 6px solid transparent;
			// 	border-color: #fff transparent transparent transparent;
			// }
		}

		.error {
			color: #ff0000;
		}
	}
</style>
