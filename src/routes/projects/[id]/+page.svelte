<script lang="ts">
	import Meta from '$lib/components/Meta.svelte';
	import type { Project } from '$lib/db/types';
	import BackArrow from '$lib/svg/BackArrow.svelte';
	import '../../../styles/blog.scss';

	export let data: Project;
</script>

<Meta title="{data.title} - James Huang" bannerImage={data.bannerUrl} />

<article>
	<header>
		<img loading="eager" src={data.bannerThumbUrl} alt={data.title} id="background-color" />

		<div class="text-info">
			<div class="left-section">
				<span id="year">
					{data.year}
				</span>
				<h1>{data.title}</h1>
				<p id="mediums">
					{#each data.mediums as medium, i}
						<span class="medium">
							{medium}
						</span>
						{#if i !== data.mediums.length - 1}
							•
						{/if}
					{/each}
				</p>
			</div>
			<!-- <hr /> -->
			<table id="details">
				<tr class="detail">
					<td class="label">Timeline</td>
					<td class="value">
						{data.timeline || 'N/A'}
					</td>
				</tr>
				<tr class="detail">
					<td class="label">Tools</td>
					<td class="value">{data.tools.join(', ')}</td>
				</tr>
				<tr class="detail">
					<td class="label">Roles</td>
					<td class="value">{data.roles}</td>
				</tr>
			</table>
		</div>

		{#if data.type === 'PROJECT'}
			<img
				loading="lazy"
				src={data.bannerUrl}
				alt={data.title}
				id="banner"
				style="background-image: url({data.bannerThumbUrl});"
				height={data.bannerHeight}
				width={data.bannerWidth}
			/>
		{/if}
	</header>

	<main class="blog-article-content">
		{@html data.article}

		<a href={data.type === 'PROJECT' ? '/projects' : '/other-work'} id="back-button">
			<BackArrow />
			{#if data.type === 'PROJECT'}
				Return to all my projects
			{:else}
				Return to my other work
			{/if}
		</a>
	</main>
</article>

<style lang="scss">
	article {
		width: 95%;
		margin: 0 auto;
		margin-top: 10rem;
		padding: 1.5rem;

		@media (max-width: 500px) {
			margin-top: 7.5rem;
		}

		#background-color {
			position: absolute;
			top: -15px;
			left: 0;
			width: 100%;
			max-height: 50px;
			// object-fit: cover;
			border-radius: 0.5rem;
			filter: blur(100px) brightness(0.5);

			@media (max-width: 500px) {
				max-height: 100px;
			}
		}

		header {
			display: flex;
			flex-direction: column;
			gap: 3rem;
			max-width: 1000px;
			margin: 0 auto;

			.text-info {
				display: flex;
				justify-content: space-between;
				align-items: flex-end;
				width: 100%;

				@media (max-width: 800px) {
					flex-direction: column;
					align-items: flex-start;
					gap: 2rem;
				}

				#year {
					font-size: var(--font-size-md);
					color: var(--color-foreground-low);
				}

				h1 {
					font-size: var(--font-size-xl);
					font-family: var(--fonts-paragraphs);
					font-weight: 500;
				}

				#mediums {
					font-size: var(--font-size-base);
					text-transform: uppercase;
					font-weight: 500;
					color: var(--color-foreground-lowest);
					display: flex;
					gap: 0.5rem;

					.medium {
						color: var(--color-foreground-low);
					}
				}
			}

			// hr {
			// 	width: 100%;
			// 	height: 1px;
			// 	border: none;
			// 	background: linear-gradient(
			// 		to right,
			// 		var(--color-foreground-medium),
			// 		var(--color-foreground-lowest)
			// 	);
			// 	margin: 1rem 0;
			// }

			#details {
				margin: 0;
				padding: 0;
				font-size: var(--font-size-sm);

				td {
					padding: 0.25rem 0;

					&.label {
						color: var(--color-foreground-low);
						padding-right: 1rem;
					}

					&.value {
						color: var(--color-foreground-medium);
						padding-left: 1rem;
					}
				}
			}
		}

		main {
			// padding: 2rem 0;
			max-width: 700px;
			margin: 2rem auto;
		}

		#back-button {
			display: flex;
			align-items: center;
			gap: 0.5rem;
			text-decoration: none;
			color: var(--color-foreground-low);
			transition: color 100ms ease-in-out;
			margin-top: 2rem;

			&:hover {
				color: var(--color-foreground-lowest);
				text-decoration: underline;
			}
		}
	}
</style>
