<script lang="ts">
	import type { Project } from '$lib/db/types';
	export let project: Project;
</script>

<li>
	<a class="project" href="/projects/{project.id}">
		<img
			loading="lazy"
			src={project.bannerUrl}
			alt={project.title}
			style="background-image: url({project.bannerThumbUrl});"
			height={project.bannerHeight}
			width={project.bannerWidth}
		/>

		<div class="text">
			<div class="about">
				<h3>{project.title}</h3>
				<p>
					{#each project.mediums as medium, i}
						<span>
							{medium}
						</span>
						{#if i < project.mediums.length - 1}
							<span class="bullet">•{' '}</span>
						{/if}
					{/each}
				</p>
			</div>
			<time datetime={project.year?.toString()}>
				{project.year}
			</time>
		</div>
	</a>
</li>

<style lang="scss">
	.project {
		display: flex;
		flex-direction: column;
		gap: 1.25rem;
		text-decoration: none;
		transform: translateY(50px);
		opacity: 0;

		img {
			width: 100%;
			height: auto;
			object-fit: cover;
			border-radius: 0.25rem;
		}

		.text {
			display: flex;
			justify-content: space-between;
			align-items: center;
			gap: 1rem;

			h3 {
				font-family: var(--fonts-paragraphs);
				font-weight: 500;
			}

			p,
			time {
				color: var(--color-foreground-low);

				.bullet {
					color: var(--color-foreground-lowest);
				}
			}
		}

		&:hover {
			h3 {
				color: var(--color-foreground-medium);
				text-decoration: underline;
			}
		}
	}
</style>
