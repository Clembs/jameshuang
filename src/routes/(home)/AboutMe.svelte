<script lang="ts">
	import Chip from '$lib/components/Chip.svelte';
	import Status from '$lib/components/Status.svelte';
	import { onMount } from 'svelte';
	import { page } from '$app/stores';
	import ScrollToButton from './ScrollToButton.svelte';

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

	let sectionAnimationPercent = 0;

	function animateSection() {
		sectionAnimationPercent = Math.min(window.scrollY / 400, 1);
	}

	onMount(() => {
		// the more you scroll down, the more the opacity increases and the more the section moves up
		animateSection();
	});
</script>

<svelte:window on:scroll={animateSection} />

<section
	id="about-me"
	style="opacity: {sectionAnimationPercent};
	transform: translateY(calc(50px * {sectionAnimationPercent}))
"
>
	<section id="intro">
		<h2>
			Hi, my name is <br />
			<span class="highlighted">James Huang</span>.
		</h2>
		<p>
			I'm a self-taught graphic designer based in Sydney with experience freelancing, and working with
			startups, businesses, creators, while pursuing some personal projects as a hobby.<br />
			<br />
			I'm inspired and intrigued by how appealing design channels impactful experiences and stories.
			You'll find that I try to reflect this notion through my works of print, UI, web,
			and motion design, along with some art and photography. <br />
			<br />
			I'm currently a high school student primarily occupied with academic commitments, though in my spare time you'll find
			me reading a book or the news, working on a project or taking a walk around national parks and the
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
				{#each $page.data.status as status}
					<li class="status">
						<Status {status} />
					</li>
				{/each}
			</ul>
		</section>
	</section>
</section>

<ScrollToButton href="#projects">
	Scroll down to see <b>my work</b>
</ScrollToButton>

<style lang="scss">
	#about-me {
		display: flex;
		gap: 5rem;
		max-width: 900px;
		width: 95%;
		margin: 0 auto;
		padding: 3rem var(--space-lg);
		opacity: 0;

		section {
			display: flex;
			flex-direction: column;
			gap: 0.5rem;
			// min-width: 350px;
		}

		#intro {
			width: 100%;

			h2 {
				font-size: var(--font-size-xl);
			}

			p {
				text-align: justify;
			}
		}

		#info {
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
			padding: 0;
			list-style: none;
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
			}

			#intro h2 br {
				display: block;
			}
		}
	}
</style>
