<script lang="ts">
	import Button from '$lib/components/Button.svelte';

	export let data;
</script>

<main>
	<header>
		<h1>Welcome back, {data.user.username}</h1>
	</header>

	<section id="status">
		<h2>Status</h2>

		<!-- TODO: this -->
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
	}
</style>
