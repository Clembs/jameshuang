<script lang="ts">
	import { enhance } from '$app/forms';
	import Button from '$lib/components/Button.svelte';
	import Editor from './WYSIWYGEditor.svelte';
	import TextInput from '$lib/components/TextInput.svelte';
	import type { projects } from '$lib/db/schema';

	export let data;

	let project: typeof projects.$inferInsert = {
		id: '',
		title: '',
		bannerUrl: '',
		year: 2024,
		timeline: '',
		roles: '',
		mediums: [],
		tools: [],
		article: '',
		...data.project
	};
</script>

<main>
	<a href="/dashboard">Back to all projects</a>

	{#if data.project}
		<h1>{project.title} - Edit</h1>
	{:else}
		<h1>New Project</h1>
	{/if}

	<form
		use:enhance={() =>
			({ update }) =>
				update({ reset: false })}
		action="?/editMetadata"
		method="post"
	>
		<section id="metadata">
			<h2>Metadata</h2>

			{#if !data.project}
				<TextInput name="slug" label="URL slug" bind:value={project.id} />
				The project will be available at /projects/{project.id || '[the slug]'}
			{/if}

			<TextInput name="title" maxlength={256} label="Title" bind:value={project.title} />

			<div class="flex">
				<TextInput name="banner-url" label="Banner URL" bind:value={project.bannerUrl} />
				<img src={project.bannerUrl} alt="Banner" />
			</div>

			<TextInput name="year" label="Year" bind:value={project.year} />

			<TextInput name="timeline" label="Timeline" bind:value={project.timeline} />

			<TextInput name="roles" label="Roles" value={data.project?.roles} />

			<section id="mediums">
				<p>Mediums</p>

				<div class="editable-array">
					<div class="editable-array-items">
						{#each project.mediums || [] as _, i}
							<TextInput
								name="medium"
								bind:value={project.mediums[i]}
								autofocus={i === project.mediums.length - 1}
							/>
						{/each}
					</div>
					<div class="editable-array-buttons">
						<button type="button" on:click={() => (project.mediums = project.mediums.slice(0, -1))}>
							-
						</button>
						<button type="button" on:click={() => (project.mediums = [...project.mediums, ''])}>
							+
						</button>
					</div>
				</div>
			</section>

			<section id="tools">
				<p>Tools</p>

				<div class="editable-array">
					<div class="editable-array-items">
						{#each project.tools as _, i}
							<TextInput
								name="tool"
								bind:value={project.tools[i]}
								autofocus={i === project.tools.length - 1}
							/>
						{/each}
					</div>
					<div class="editable-array-buttons">
						<button type="button" on:click={() => (project.tools = project.tools.slice(0, -1))}>
							-
						</button>
						<button type="button" on:click={() => (project.tools = [...project.tools, ''])}>
							+
						</button>
					</div>
				</div>
			</section>

			<Button type="submit">
				{#if data.project}
					Update
				{:else}
					Create
				{/if}
			</Button>
		</section>

		<section id="content">
			<h2>Content</h2>

			{#if data.project}
				<Editor initialHtml={data.project.article} />
			{:else}
				Create the project first to write its content.
			{/if}
		</section>
	</form>
</main>

<style lang="scss">
	main {
		padding: 3rem 1rem;
		margin: 0 auto;
		max-width: 900px;
		width: 100%;

		h1 {
			font-family: var(--fonts-paragraphs);
		}

		form {
			display: flex;
			flex-direction: column;
			gap: 1rem;
			margin: 1rem 0;

			.flex {
				display: flex;
				gap: 1rem;
				width: 100%;

				img {
					flex-shrink: 0;
					max-width: 300px;
				}

				@media (max-width: 600px) {
					flex-direction: column;
				}
			}

			section {
				width: 100%;

				p {
					font-size: var(--font-size-sm);
				}
			}

			.editable-array {
				&-items {
					display: grid;
					grid-template-columns: repeat(auto-fill, minmax(15ch, 1fr));
					width: 100%;
					gap: 0.25rem;
				}

				&-buttons {
					display: flex;
					gap: 0.25rem;
					width: 100%;
					margin-top: 0.25rem;

					button {
						display: grid;
						place-items: center;
						width: 2.25rem;
						height: 2.25rem;
						border: none;
						border-radius: 0.5rem;
						font-size: var(--font-size-md);
						background-color: var(--color-foreground-full);
						color: var(--color-background);
						cursor: pointer;
						transition: background-color 0.2s;
					}
				}
			}
		}

		#metadata,
		#content {
			display: flex;
			flex-direction: column;
			gap: 1rem;
			padding: 1rem;
			border: 2px solid var(--color-foreground-lowest);
			border-radius: 0.5rem;

			h2 {
				// font-size: var(--font-size-md);
				font-family: var(--fonts-paragraphs);
			}

			:global(button[type='submit']) {
				margin-top: 1rem;
				align-self: flex-end;
			}
		}
	}
</style>
