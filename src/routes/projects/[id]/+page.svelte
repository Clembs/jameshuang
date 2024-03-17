<script lang="ts">
	import { marked } from 'marked';
	import dayjs from 'dayjs';
	import type { Project } from '$lib/db/types';

	export let data: Project;

	const timeDistance = dayjs(data.finishedAt || data.createdAt).diff(
		dayjs(data.createdAt),
		'months'
	);
</script>

<article>
	<header>
		<!-- TODO: maybe add a customizable color field? -->
		<img src={data.bannerUrl} alt={data.title} id="background-color" />

		<time datetime={new Date(data.finishedAt || data.createdAt).toISOString()}>
			{new Date(data.finishedAt || data.createdAt).getFullYear()}
		</time>
		<h1>{data.title}</h1>
		<p id="mediums">{data.mediums.join('•')}</p>
		<hr />
		<ul id="details">
			<li class="detail">
				<div class="label">Timeline</div>
				<!-- TODO: add month names -->
				<div class="value">
					{timeDistance > 1 ? `${timeDistance} months` : `${timeDistance} month`}
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

		<img src={data.bannerUrl} alt={data.title} id="banner" />
	</header>

	<!-- TODO: still a lot to do here lol -->
	{@html marked(data.article)}
</article>

<style lang="scss">
	article {
		max-width: 600px;
		margin: 4rem auto;
		// position: relative;

		#background-color {
			position: absolute;
			top: -25px;
			left: 0;
			width: 100%;
			max-height: 50px;
			object-fit: cover;
			border-radius: 0.5rem;
			filter: blur(100px);
		}

		header {
			display: flex;
			flex-direction: column;

			time {
				font-size: var(--font-size-md);
			}

			h1 {
				font-size: var(--font-size-xl);
				font-family: var(--fonts-paragraphs);
			}

			#mediums {
				font-size: var(--font-size-base);
				text-transform: uppercase;
			}

			hr {
				width: 100%;
				height: 1px;
				border: none;
				background: linear-gradient(
					to right,
					var(--color-foreground-medium),
					var(--color-foreground-lowest)
				);
				margin: 1rem 0;
			}

			#details {
				display: flex;
				flex-direction: column;
				gap: 0.5rem;
				margin: 1rem 0;

				.detail {
					display: flex;
					gap: 1rem;

					.value {
						color: var(--color-foreground-full);
					}
				}
			}
		}
	}
</style>
