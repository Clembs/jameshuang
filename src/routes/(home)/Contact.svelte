<script lang="ts">
	import { enhance } from '$app/forms';
	import Button from '$lib/components/Button.svelte';
	import SelectMenu from '$lib/components/SelectMenu.svelte';
	import TextInput from '$lib/components/TextInput.svelte';

	let fullName: string;
	let email: string;
	let message: string;

	let loading = false;

	let errors = {
		fullName: '',
		email: '',
		reason: '',
		message: ''
	};
</script>

<section id="contact">
	<div id="contact-left">
		<img
			id="contact-background"
			loading="eager"
			aria-hidden
			alt=""
			src="/contact-background.webp"
		/>

		<h2>Get in Touch</h2>

		<p>
			Contact my email through this form for any professional inquiries, or if you just want to
			chat.
		</p>
	</div>

	<form
		use:enhance={async () => {
			loading = true;

			return async ({ result, update }) => {
				loading = false;

				if (result.type === 'failure' && result.data) {
					// @ts-ignore
					errors = result.data;
				} else {
					errors = {
						fullName: '',
						email: '',
						reason: '',
						message: ''
					};
				}

				await update({
					reset: result.type !== 'failure' && result.type !== 'error'
				});
			};
		}}
		action="?/contact"
		method="post"
		id="contact-right"
	>
		<TextInput
			wide
			name="full-name"
			label="Full name"
			placeholder="John Smith"
			bind:value={fullName}
			error={errors.fullName}
		/>
		<TextInput
			wide
			type="email"
			name="email"
			label="Email"
			placeholder="john@smith.com"
			bind:value={email}
			error={errors.email}
		/>
		<SelectMenu
			label="Reason for contact"
			name="reason"
			options={[
				{
					label: 'General inquiry',
					value: 'general'
				},
				{
					label: 'Advertising/Sponsorships',
					value: 'advertising'
				},
				{
					label: 'Media',
					value: 'media'
				},
				{
					label: 'Feedback/Suggestions',
					value: 'feedback'
				},
				{
					label: 'Fanmail',
					value: 'fanmail'
				}
			]}
			error={errors.reason}
		/>
		<TextInput
			maxlength={500}
			multiline
			wide
			name="message"
			label="Message"
			placeholder="Write your message here..."
			bind:value={message}
			error={errors.message}
		/>

		<Button
			disabled={!fullName || !email || !message || loading}
			inline
			style="gradient"
			type="submit"
		>
			{#if loading}
				Submitting...
			{:else}
				Submit
			{/if}
		</Button>
	</form>
</section>

<style lang="scss">
	#contact {
		display: flex;
		justify-content: center;
		// align-items: center;
		gap: var(--space-xxl);
		padding: var(--space-xxl) var(--space-xl);
		position: relative;

		#contact-left {
			display: flex;
			flex-direction: column;
			gap: 1rem;
			max-width: 30ch;
			padding: 0 1rem;
			position: relative;
			height: fit-content;
			padding-top: 3rem;

			#contact-background {
				position: absolute;
				width: 200%;
				max-width: none;
				top: 50%;
				left: 50%;
				z-index: -1;
				transform: translate(-50%, -50%);
				opacity: 0.8;

				animation: rotate 15s linear infinite;
				transform-origin: top left;
			}

			h2 {
				font-size: var(--font-size-xl);
			}

			p {
				font-style: italic;
			}
		}

		#contact-right {
			min-width: 450px;
			display: flex;
			flex-direction: column;
			gap: var(--space-lg);
		}

		@media (max-width: 1050px) {
			flex-direction: column;
			gap: var(--space-xl);

			#contact-left {
				max-width: none;
				padding: 0;

				#contact-background {
					animation: none;
					height: 500%;
					top: 20%;
				}
			}

			#contact-right {
				min-width: 0;
			}
		}
	}

	@keyframes rotate {
		from {
			rotate: 0deg;
		}
		to {
			rotate: 360deg;
		}
	}
</style>
