<script>
	import Chip from '$lib/components/Chip.svelte';
	import { animate, inView } from 'motion';

	const skills = [
		'UI & UX',
		'Web',
		'Print',
		'Motion',
		'Social Media',
		'Branding',
		'Figma',
		'Framer',
		'After Effects'
	];

	const statuses = [
		{
			img: './books.webp',
			lines: ['Reading **Twilight**', 'by Stephenie Meyer']
		},
		{
			img: './headset.webp',
			lines: ['Listening to **Midnights**', 'by Taylor Swift']
		},
		{
			img: './lightbulb.webp',
			lines: ['Learning **Blender**']
		}
	];

	inView('#about-me', ({ target }) => {
		animate(target, { opacity: 1 });
	});
</script>

<section id="about-me">
	<section id="intro">
		<h2>
			Hi, my name is <br />
			<span class="highlighted">James Huang</span>.
		</h2>
		<p>
			I'm a self-taught graphic designer based in Sydney with experience freelancing, working with
			startups, businesses, creators, along with some personal projects as a hobby.<br />
			<br />
			I'm inspired and intrigued by how appealing design crafts impactful experiences and channel stories.
			You'll find that I try to reflect this notion across my work across mediums like print, UI, web,
			and motion design. <br />
			<br />
			I'm currently a student often busy with academic commitments, though in my spare time you'll find
			me reading a book or the news, working on a project or taking a walk around national parks or the
			city.<br />
			<br />
		</p>
	</section>

	<section id="info">
		<section id="skills">
			<h2>Skills</h2>

			<div id="chips">
				{#each skills as skill}
					<Chip>{skill}</Chip>
				{/each}
			</div>
		</section>

		<section id="status">
			<h2>Status</h2>

			<ul>
				{#each statuses as status}
					<li class="status">
						<img height="28" width="28" alt="" src={status.img} aria-hidden />
						<p>
							{#each status.lines as line, i}
								{@html line.replace(/\*\*(.*?)\*\*/g, '<b>$1</b>')}
								{#if i !== status.lines.length - 1}
									<br />
								{/if}
							{/each}
						</p>
					</li>
				{/each}
			</ul>
		</section>
	</section>
</section>

<style lang="scss">
	#about-me {
		display: flex;
		gap: 5rem;
		max-width: 900px;
		width: 80%;
		margin: 0 auto;
		padding: 3rem 0;
		opacity: 0;

		section {
			display: flex;
			flex-direction: column;
			gap: 0.5rem;
			min-width: 350px;
		}

		#intro {
			h2 {
				font-size: var(--font-size-xl);
			}

			p {
				text-align: justify;
			}
		}

		#info {
			display: flex;
			flex-direction: column;
			gap: 2rem;
		}

		#chips {
			display: flex;
			gap: 0.75rem;
			flex-wrap: wrap;
		}

		#status ul {
			display: flex;
			flex-direction: column;
			gap: 1rem;

			.status {
				display: flex;
				gap: 1rem;
				align-items: center;

				img {
					flex: 0 0 28px;
				}
			}
		}

		@media (max-width: 1020px) {
			flex-direction: column;
			gap: 1rem;

			#intro h2 br {
				display: none;
			}

			#status ul {
				flex-direction: row;

				li {
					width: 100%;
				}
			}
		}

		@media (max-width: 800px) {
			#status ul {
				flex-direction: column;

				br {
					display: none;
				}
			}

			#intro h2 br {
				display: block;
			}
		}
	}
</style>
