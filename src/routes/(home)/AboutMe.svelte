<script lang="ts">
	import Chip from '$lib/components/Chip.svelte';
	import Status from '$lib/components/Status.svelte';
	import { animate, inView } from 'motion';
	import { onMount } from 'svelte';
	import { page } from '$app/stores';

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

	let scrollY = 0;
	let sectionAnimationPercent = 0;

	function animateSection() {
		scrollY = window.scrollY;
		sectionAnimationPercent = Math.min(scrollY / 400, 1);
	}

	onMount(() => {
		// the more you scroll down, the more the opacity increases and the more the section moves up
		animateSection();

		// inView('#about-me', ({ target }) => {
		// 	animate(target, { opacity: 1 });
		// });
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
				{#each $page.data.status as status}
					<li class="status">
						<Status {status} />
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
