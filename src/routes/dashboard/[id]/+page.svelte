<script lang="ts">
	import { enhance } from '$app/forms';
	import Button from '$lib/components/Button.svelte';
	import TextInput from '$lib/components/TextInput.svelte';
	import { marked } from 'marked';

	export let data;
</script>

<main>
	<h1>{data.project.title} - Edit</h1>

	<form
		use:enhance={() =>
			({ update }) =>
				update({ reset: false })}
		action="?/edit"
		method="post"
	>
		<TextInput name="title" maxlength={256} label="Title" value={data.project.title} />

		<div class="flex">
			<TextInput name="banner-url" label="Banner URL" bind:value={data.project.bannerUrl} />
			<img src={data.project.bannerUrl} alt="Banner" />
		</div>

		<TextInput name="year" label="Year" value={data.project.year?.toString() || '2024'} />

		<TextInput name="timeline" label="Timeline" value={data.project.timeline} />

		<TextInput name="roles" label="Roles" value={data.project.roles} />

		<section id="mediums">
			<p>Mediums</p>

			<div class="editable-array">
				<div class="editable-array-items">
					{#each data.project.mediums as _, i}
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
					<button type="button" on:click={() => (data.project.tools = [...data.project.tools, ''])}>
						+
					</button>
				</div>
			</div>
		</section>

		<Button type="submit">Update</Button>
	</form>

	<hr />

	<section id="article">
		<h2>Article (uneditable atm)</h2>
		<div>
			<!-- TODO: add tiptap for wysiwyg editing -->
			{@html marked(data.project.article)}
		</div>
	</section>
</main>

<style lang="scss">
	main {
		padding: 3rem 1rem;
		margin: 0 auto;
		max-width: 700px;
		width: 100%;

		h1 {
			font-family: var(--fonts-paragraphs);
		}

		form {
			display: flex;
			flex-direction: column;
			gap: 1rem;
			margin: 1rem 0;
			align-items: flex-end;

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

		#article {
			h2 {
				font-size: var(--font-size-md);
				font-family: var(--fonts-paragraphs);
			}
		}
	}
</style>
