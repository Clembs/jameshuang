<script lang="ts">
	import { enhance } from '$app/forms';
	import Button from '$lib/components/Button.svelte';
	import Editor from './WYSIWYGEditor.svelte';
	import TextInput from '$lib/components/TextInput.svelte';
	import { onMount } from 'svelte';

	export let data;

	let isLoading = false;
	let fileInput: HTMLInputElement;

	function uploadFileInput(e: Event) {
		const file = fileInput.files?.[0];
		if (!file) return;

		const reader = new FileReader();
		reader.readAsDataURL(file);

		reader.onload = (e) => {
			data.project.bannerUrl = e.target?.result?.toString()!;
		};
	}

	function resetFileInput() {
		fileInput.value = '';
		fileInput.files = null;
	}

	onMount(resetFileInput);
</script>

<main>
	<a href="/dashboard">Back to all projects</a>

	{#if data.project}
		<h1>{data.project.title} - Edit</h1>
	{:else}
		<h1>New Project</h1>
	{/if}

	<section id="metadata">
		<h2>Metadata</h2>

		<form
			use:enhance={(e) => {
				console.log(e.formData);

				isLoading = true;
				return ({ update }) => {
					isLoading = false;
					update({ reset: false });
					resetFileInput();
				};
			}}
			action="?/editMetadata"
			method="post"
		>
			{#if data.isNewProject}
				<TextInput name="slug" label="URL slug" bind:value={data.project.id} />
				The project will be available at /projects/{data.project.id === 'new' || '[the slug]'}
			{/if}

			<TextInput name="title" maxlength={256} label="Title" bind:value={data.project.title} />

			<div class="flex">
				<label id="upload-button" for="banner-blob">
					Set banner image
					<input
						bind:this={fileInput}
						id="banner-blob"
						type="file"
						accept="image/*"
						name="banner-blob"
						on:change={uploadFileInput}
					/>
				</label>
				<!-- <TextInput name="banner-url" label="Banner URL" bind:value={data.project.bannerUrl} /> -->
				<img src={data.project.bannerUrl} alt="" />
			</div>

			<TextInput name="year" label="Year" bind:value={data.project.year} />

			<TextInput name="timeline" label="Timeline" bind:value={data.project.timeline} />

			<TextInput name="roles" label="Roles" value={data.project?.roles} />

			<section id="mediums">
				<p>Mediums</p>

				<div class="editable-array">
					<div class="editable-array-items">
						{#each data.project.mediums || [] as _, i}
							<TextInput
								name="medium"
								bind:value={data.project.mediums[i]}
								autofocus={i === data.project.mediums.length - 1}
							/>
						{/each}
					</div>
					<div class="editable-array-buttons">
						<button
							type="button"
							on:click={() => (data.project.mediums = data.project.mediums.slice(0, -1))}
						>
							-
						</button>
						<button
							type="button"
							on:click={() => (data.project.mediums = [...data.project.mediums, ''])}
						>
							+
						</button>
					</div>
				</div>
			</section>

			<section id="tools">
				<p>Tools</p>

				<div class="editable-array">
					<div class="editable-array-items">
						{#each data.project.tools as _, i}
							<TextInput
								name="tool"
								bind:value={data.project.tools[i]}
								autofocus={i === data.project.tools.length - 1}
							/>
						{/each}
					</div>
					<div class="editable-array-buttons">
						<button
							type="button"
							on:click={() => (data.project.tools = data.project.tools.slice(0, -1))}
						>
							-
						</button>
						<button
							type="button"
							on:click={() => (data.project.tools = [...data.project.tools, ''])}
						>
							+
						</button>
					</div>
				</div>
			</section>

			{#if isLoading}
				Optimizing image, uploading it to the server... This may take a moment.
			{/if}

			<Button type="submit">
				{#if isLoading}
					Saving...
				{:else if data.project}
					Update
				{:else}
					Create
				{/if}
			</Button>
		</form>
	</section>

	<section id="content">
		<h2>Content</h2>

		{#if data.project}
			<Editor initialHtml={data.project.article} />
		{:else}
			Create the project first to write its content.
		{/if}
	</section>
</main>

<style lang="scss">
	main {
		padding: 3rem 1rem;
		margin: 0 auto;
		max-width: 900px;
		width: 100%;

		form {
			display: flex;
			flex-direction: column;
			gap: 1rem;

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

			#upload-button {
				display: inline-block;
				padding: 0.5rem 1.5rem;
				font: inherit;
				border-radius: 0.25rem;
				color: var(--color-background);
				border: 1px solid transparent;
				text-decoration: none;
				height: fit-content;
				background-color: var(--color-foreground-full);
				cursor: pointer;

				&:hover {
					background-color: var(--color-foreground-medium);
				}

				input {
					display: none;
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

	section {
		width: 100%;
		margin: 1rem 0;

		p {
			font-size: var(--font-size-sm);
		}
	}
</style>
