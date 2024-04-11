<script lang="ts">
	import { onMount, onDestroy } from 'svelte';
	import { Editor, mergeAttributes } from '@tiptap/core';
	import StarterKit from '@tiptap/starter-kit';
	import Button from '$lib/components/Button.svelte';
	import '../../../styles/blog.scss';
	import Youtube from '@tiptap/extension-youtube';
	import Image from '@tiptap/extension-image';
	import { enhance } from '$app/forms';
	import { page } from '$app/stores';
	import type { Project } from '$lib/db/types';

	export let initialHtml: string;

	let element: Element | undefined;
	let editor: Editor;

	let imageLoading = false;

	const project = $page.data.project as Project;

	onMount(() => {
		editor = new Editor({
			element: element,
			extensions: [
				StarterKit,
				Youtube,
				Image.configure({
					HTMLAttributes: {
						loading: 'lazy'
					}
				}).extend({
					addAttributes() {
						return {
							...this.parent?.(),
							thumbnailSrc: {
								default: null,
								renderHTML(attr) {
									return {
										style: `background-image: url(${attr.thumbnailSrc})`
									};
								}
							}
						};
					}
				})
			],
			content: initialHtml,
			onTransaction: () => (editor = editor)
		});
	});

	onDestroy(() => {
		if (editor) {
			editor.destroy();
		}
	});

	function insertYouTube() {
		const url = prompt('Enter the YouTube URL');

		if (url) {
			editor.commands.setYoutubeVideo({
				src: url,
				width: 600,
				height: 336
			});
		}
	}

	async function insertImage(ev: Event) {
		const file = (ev.target as HTMLInputElement).files?.[0];
		if (!file) return;

		imageLoading = true;

		const formData = new FormData();

		formData.append('file', file);

		const req = await fetch(
			`/api/upload?basePath=/${project.type === 'PROJECT' ? 'projects' : 'other'}/${project.id}`,
			{
				method: 'POST',
				body: formData
			}
		);

		if (req.ok) {
			const res: {
				name: string;
				url: string;
			}[] = await req.json();

			const thumbnailUrl = res.find((f) => f.name.endsWith('-thumb.webp'))?.url;
			const hqUrl = res.find((f) => f.name.endsWith('-hq.webp'))?.url;

			if (!hqUrl) {
				alert('Failed to upload image');
				return;
			}

			editor
				.chain()
				.focus()
				.setImage({
					src: hqUrl,
					alt: file.name
				})
				.updateAttributes('image', {
					thumbnailSrc: thumbnailUrl
				})
				.run();

			imageLoading = false;
		} else {
			alert('Failed to upload image');
		}
	}

	$: html = editor?.getHTML();
</script>

<form use:enhance action="?/editContent" method="post">
	<input type="hidden" name="content" bind:value={html} />

	{#if editor}
		<div class="buttons">
			<span class="button-group">
				<button
					on:click={() => editor.chain().focus().toggleHeading({ level: 1 }).run()}
					class={editor.isActive('heading', { level: 1 }) ? 'filled' : 'outlined'}
					type="button"
				>
					H1
				</button>
				<button
					on:click={() => editor.chain().focus().toggleHeading({ level: 2 }).run()}
					class={editor.isActive('heading', { level: 2 }) ? 'filled' : 'outlined'}
					type="button"
				>
					H2
				</button>
				<button
					on:click={() => editor.chain().focus().toggleHeading({ level: 3 }).run()}
					class={editor.isActive('heading', { level: 3 }) ? 'filled' : 'outlined'}
					type="button"
				>
					H3
				</button>
			</span>
			<span class="button-group">
				<button
					on:click={() => editor.chain().focus().toggleBold().run()}
					class={editor.isActive('bold') ? 'filled' : 'outlined'}
					type="button"
				>
					<b>B</b>
				</button>
				<button
					on:click={() => editor.chain().focus().toggleItalic().run()}
					class={editor.isActive('italic') ? 'filled' : 'outlined'}
					type="button"
				>
					<i>I</i>
				</button>
				<button
					on:click={() => editor.chain().focus().toggleBlockquote().run()}
					class={editor.isActive('blockquote') ? 'filled' : 'outlined'}
					type="button"
				>
					Quote
				</button>
			</span>

			<span class="button-group">
				<button on:click={insertYouTube}> YouTube video </button>
				<label class={imageLoading ? 'filled' : 'outlined'}>
					{#if imageLoading}
						Loading...
					{:else}
						Image upload
					{/if}
					<input type="file" accept="image/*" style="display: none;" on:change={insertImage} />
				</label>
			</span>
		</div>
	{/if}

	<div class="blog-article-content" bind:this={element} />

	<Button type="submit">Save</Button>
</form>

<style lang="scss">
	form {
		display: flex;
		flex-direction: column;
		gap: 1rem;
	}

	.buttons {
		display: flex;
		gap: 0.5rem;
	}

	.button-group {
		display: flex;

		button,
		label {
			display: grid;
			place-items: center;
			padding: 0 0.75rem;
			// width: 2.5rem;
			height: 2rem;
			color: var(--color-foreground-full);
			border: 1px solid var(--color-foreground-full);
			border-right: 0;
			cursor: pointer;

			&:first-child {
				border-top-left-radius: 0.25rem;
				border-bottom-left-radius: 0.25rem;
			}

			&:last-child {
				border-top-right-radius: 0.25rem;
				border-bottom-right-radius: 0.25rem;
				border-right: 1px solid var(--color-foreground-full);
			}

			&.filled {
				background-color: var(--color-foreground-full);
				color: var(--color-background);
				border: 1px solid transparent;
			}
		}
	}

	:global(.tiptap) {
		outline: none;
	}

	:global(.ProseMirror [contenteditable='false']) {
		margin: var(--space-md) 0;
	}
</style>
