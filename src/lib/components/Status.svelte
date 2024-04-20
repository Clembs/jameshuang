<script lang="ts">
	import type { status as statusType } from '$lib/db/schema';

	export let status: typeof statusType.$inferSelect;
</script>

<div class="status">
	<img height="28" width="28" alt="" src={status.imageUrl} aria-hidden />
	<p>
		{#each status.title.split('\\n') as line, i}
			{@html line.replace(/\*\*(.*?)\*\*/g, '<b>$1</b>')}
			{#if i !== status.title.length - 1}
				<br />
			{/if}
		{/each}
	</p>
</div>

<style lang="scss">
	.status {
		display: flex;
		gap: 1rem;
		align-items: center;

		img {
			flex: 0 0 28px;
		}

		@media (max-width: 800px) {
			width: 100%;
			br {
				display: none;
			}
		}
	}
</style>
