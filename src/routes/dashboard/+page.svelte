<script lang="ts">
	import { enhance } from '$app/forms';
	import Button from '$lib/components/Button.svelte';
	import Status from '$lib/components/Status.svelte';
	import TextInput from '$lib/components/TextInput.svelte';

	export let data;
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

	<section id="projects">
		<header>
			<h2>Projects</h2>
			<Button on:click={() => {}}>New project</Button>
		</header>
		<ul>
			{#each data.projects as project}
				<li>
					<a class="project" href="/dashboard/{project.id}">
						<img src={project.bannerUrl} alt="" />
						{project.title}
					</a>
				</li>
			{/each}
		</ul>
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

		#projects {
			header {
				display: flex;
				gap: 1rem;
				justify-content: space-between;
				align-items: center;
			}

			ul {
				display: grid;
				grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
				gap: 1rem;
				margin-top: 1rem;

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
</style>
