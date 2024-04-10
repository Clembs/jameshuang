<script lang="ts">
	import { enhance } from '$app/forms';
	import Button from '$lib/components/Button.svelte';
	import Status from '$lib/components/Status.svelte';
	import TextInput from '$lib/components/TextInput.svelte';
	import { dndzone } from 'svelte-dnd-action';

	export let data;

	export let isOrdering: 'project' | 'other' | false = false;

	let projects = data.projects.filter((p) => p.type === 'PROJECT');
	let works = data.projects.filter((p) => p.type === 'OTHER');
</script>

<main>
	<header>
		<h1>Welcome back, {data.user.username}</h1>
	</header>

	<section id="status">
		<h2>Status</h2>

		<form
			use:enhance={() =>
				({ update }) =>
					update({ reset: false })}
			id="edit-status"
			action="?/editStatus"
			method="post"
		>
			<div id="statuses">
				{#each data.status as status}
					<div class="status">
						<div class="edit">
							<TextInput label="Image URL" name="image_url" bind:value={status.imageUrl} />
							<p class="pro-tip">Start the URL with / to reference an image at the website root</p>
							<TextInput label="Status" name="title" bind:value={status.title} />
							<p class="pro-tip">Wrap text in ** to <b>bolden</b> it. Add \n to add a newline.</p>
						</div>
						<!-- <h3>Preview</h3> -->
						<Status {status} />
					</div>
				{/each}
			</div>
			<Button type="submit">Save</Button>
		</form>
	</section>

	<section id="projects" class="project-section">
		<header>
			<h2>Projects</h2>
			<div>
				{#if isOrdering}
					<form
						use:enhance={() => {
							isOrdering = false;
							return ({ update }) => update();
						}}
						action="?/reorderProjects&type=project"
						method="post"
					>
						<input type="hidden" name="order" value={projects.map((p) => p.id).join(',')} />
						<Button on:click={() => (isOrdering = false)} style="outlined" type="button">
							Cancel
						</Button>
						<Button type="submit">Save order</Button>
					</form>
				{:else}
					<Button style="outlined" on:click={() => (isOrdering = isOrdering ? false : 'project')}>
						Reorder
					</Button>
					<Button href="/dashboard/new?type=project">New project</Button>
				{/if}
			</div>
		</header>
		{#if isOrdering !== 'project'}
			<ul id="project-list">
				{#each projects as project}
					<li>
						<a class="project" href="/dashboard/{project.id}">
							<img
								height={project.bannerHeight}
								width={project.bannerWidth}
								src={project.bannerThumbUrl}
								alt=""
							/>
							{project.title}
						</a>
					</li>
				{/each}
			</ul>
		{:else}
			<ul
				id="project-reordering"
				use:dndzone={{ items: projects }}
				on:consider={(e) => {
					projects = e.detail.items;
				}}
				on:finalize={(e) => {
					projects = e.detail.items;
				}}
			>
				{#each projects as project (project.id)}
					<li class="reorderable-item">
						≣
						<img
							height={project.bannerHeight}
							width={project.bannerWidth}
							src={project.bannerThumbUrl}
							alt=""
						/>
						{project.title}
					</li>
				{/each}
			</ul>
		{/if}
	</section>

	<section id="other" class="project-section">
		<header>
			<h2>Other works</h2>
			<div>
				{#if isOrdering}
					<form
						use:enhance={() => {
							isOrdering = false;
							return ({ update }) => update();
						}}
						action="?/reorderProjects&type=other"
						method="post"
					>
						<input type="hidden" name="order" value={works.map((p) => p.id).join(',')} />
						<Button on:click={() => (isOrdering = false)} style="outlined" type="button">
							Cancel
						</Button>
						<Button type="submit">Save order</Button>
					</form>
				{:else}
					<Button style="outlined" on:click={() => (isOrdering = isOrdering ? false : 'other')}>
						Reorder
					</Button>
					<Button href="/dashboard/new?type=other">New work</Button>
				{/if}
			</div>
		</header>
		{#if isOrdering !== 'other'}
			<ul id="project-list">
				{#each works as work}
					<li>
						<a class="project" href="/dashboard/{work.id}">
							<img
								height={work.bannerHeight}
								width={work.bannerWidth}
								src={work.bannerThumbUrl}
								alt=""
							/>
							{work.title}
						</a>
					</li>
				{/each}
			</ul>
		{:else}
			<ul
				id="project-reordering"
				use:dndzone={{ items: works }}
				on:consider={(e) => {
					works = e.detail.items;
				}}
				on:finalize={(e) => {
					works = e.detail.items;
				}}
			>
				{#each works as work (work.id)}
					<li class="reorderable-item">
						≣
						<img
							height={work.bannerHeight}
							width={work.bannerWidth}
							src={work.bannerThumbUrl}
							alt=""
						/>
						{work.title}
					</li>
				{/each}
			</ul>
		{/if}
	</section>
</main>

<style lang="scss">
	main {
		padding: 4rem 1.5rem;
		max-width: 1200px;
		margin: 0 auto;

		section {
			padding: 1rem;
			border: 2px solid var(--color-foreground-lowest);
			border-radius: 0.5rem;
			margin-top: 1rem;

			h2 {
				font-family: var(--fonts-paragraphs);
			}
		}

		.project-section {
			header {
				display: flex;
				gap: 1rem;
				justify-content: space-between;
				align-items: center;
			}

			#project-list {
				display: grid;
				grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
				gap: 1rem;
				margin-top: 1rem;
				padding: 0;
				list-style: none;

				.project {
					display: flex;
					flex-direction: column;
					gap: 0.5rem;
					font-size: var(--font-size-md);
					text-decoration: none;
					position: relative;

					img {
						border-radius: 0.25rem;
						aspect-ratio: 16/9;
						object-fit: cover;
					}

					&:hover {
						color: var(--color-foreground-low);

						&::after {
							content: 'Edit project';
							position: absolute;
							left: 0;
							top: 0;
							width: 100%;
							height: 100%;
							background-color: rgb(0 0 0 / 0.5);
							display: grid;
							place-items: center;
						}
					}
				}
			}

			#project-reordering {
				display: flex;
				flex-direction: column;
				list-style: none;
				padding: 0;
				margin: 0;
			}
		}

		#edit-status {
			display: flex;
			flex-direction: column;
			gap: 1rem;
			// align-items: flex-end;

			#statuses {
				display: flex;
				gap: 2rem;

				.status {
					display: flex;
					flex-direction: column;
					gap: 1rem;
					width: 100%;

					.edit {
						display: flex;
						flex-direction: column;
						gap: 0.5rem;
						width: 100%;

						.pro-tip {
							font-size: var(--font-size-sm);
							color: var(--color-foreground-low);
						}
					}
				}

				@media (max-width: 1020px) {
					flex-direction: column;

					.status {
						flex-direction: row;
					}
				}

				@media (max-width: 800px) {
					.status {
						flex-direction: column;
					}
				}
			}
		}
	}

	.reorderable-item {
		display: flex;
		gap: 1rem;
		align-items: center;
		padding: 0.5rem;
		border: 2px solid var(--color-foreground-lowest);
		border-radius: 0.5rem;
		margin-top: 0.5rem;

		img {
			border-radius: 0.25rem;
			aspect-ratio: 16/9;
			object-fit: cover;
			max-width: 100px;
		}
	}
</style>
