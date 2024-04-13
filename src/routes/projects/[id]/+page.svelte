<script lang="ts">
	import type { Project } from '$lib/db/types';
	import '../../../styles/blog.scss';

	export let data: Project;
</script>

<article>
	<header>
		<!-- TODO: maybe add a customizable color field? -->
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
			<ul id="details">
				<li class="detail">
					<div class="label">Timeline</div>
					<div class="value">
						{data.timeline || 'N/A'}
					</div>
				</li>
				<li class="detail">
					<div class="label">Tools</div>
					<div class="value">{data.tools.join(', ')}</div>
				</li>
				<li class="detail">
					<div class="label">Roles</div>
					<div class="value">{data.roles}</div>
				</li>
			</ul>
		</div>

		<img
			loading="lazy"
			src={data.bannerUrl}
			alt={data.title}
			id="banner"
			style="background-image: url({data.bannerThumbUrl});"
			height={data.bannerHeight}
			width={data.bannerWidth}
		/>
	</header>

	<!-- TODO: still a lot to do here lol -->
	<main class="blog-article-content">
		{@html data.article}

		<a href="/projects" id="back-button">
			<svg
				width="20"
				height="20"
				viewBox="0 0 20 20"
				fill="none"
				xmlns="http://www.w3.org/2000/svg"
			>
				<path
					d="M5.83348 15.8334C5.83348 16.0544 5.92128 16.2664 6.07756 16.4226C6.23384 16.5789 6.4458 16.6667 6.66681 16.6667H10.8335C12.7018 16.6667 14.1751 16.0184 15.1818 14.9809C16.1785 13.9534 16.6668 12.5942 16.6668 11.2501C16.6668 9.90589 16.1785 8.54672 15.1818 7.51922C14.1751 6.48172 12.7018 5.83339 10.8335 5.83339H7.01181L8.71431 4.13089C8.86611 3.97372 8.95011 3.76322 8.94821 3.54472C8.94631 3.32622 8.85867 3.11721 8.70416 2.96271C8.54966 2.8082 8.34065 2.72056 8.12215 2.71866C7.90365 2.71676 7.69315 2.80076 7.53598 2.95255L4.41098 6.07755C4.25476 6.23383 4.16699 6.44575 4.16699 6.66672C4.16699 6.88769 4.25476 7.09961 4.41098 7.25589L7.53598 10.3809C7.69315 10.5327 7.90365 10.6167 8.12215 10.6148C8.34065 10.6129 8.54966 10.5252 8.70416 10.3707C8.85867 10.2162 8.94631 10.0072 8.94821 9.78872C8.95011 9.57022 8.86611 9.35972 8.71431 9.20255L7.01181 7.50005H10.8335C12.2985 7.50005 13.3251 7.99755 13.9851 8.67922C14.6551 9.37089 15.0001 10.3026 15.0001 11.2501C15.0001 12.1976 14.6551 13.1301 13.9851 13.8209C13.3251 14.5026 12.2985 15.0001 10.8335 15.0001H6.66681C6.4458 15.0001 6.23384 15.0879 6.07756 15.2441C5.92128 15.4004 5.83348 15.6124 5.83348 15.8334Z"
					fill="currentColor"
				/>
			</svg>
			Return to all my work
		</a>
	</main>
</article>

<style lang="scss">
	article {
		min-width: 90%;
		// max-width: 80%;
		// max-width: 950px;
		margin: 0 auto;
		margin-top: 7.5rem;
		padding: 1rem;

		@media (max-width: 500px) {
			margin-top: 5rem;
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
				display: flex;
				flex-direction: column;
				gap: 0.5rem;
				margin: 0;
				padding: 0;
				font-size: var(--font-size-sm);

				.detail {
					display: flex;
					gap: 1rem;

					.label {
						color: var(--color-foreground-low);
					}

					.value {
						color: var(--color-foreground-medium);
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
