<script lang="ts">
	import { onMount, onDestroy } from 'svelte';
	import { Editor, isRegExp } from '@tiptap/core';
	import StarterKit from '@tiptap/starter-kit';
	import Button from '$lib/components/Button.svelte';
	import '../../../styles/blog.scss';
	import Youtube from '@tiptap/extension-youtube';
	import Image from '@tiptap/extension-image';
	import { enhance } from '$app/forms';
	import { page } from '$app/stores';
	import type { Project } from '$lib/db/types';
	import {
		handleDocumentUploadResponse,
		handleImageUploadResponse,
		handleVideoUploadResponse
	} from './handleUploadResponse';
	import Link from '@tiptap/extension-link';
	import { Video } from '$lib/helpers/TipTapVideo';
	import Superscript from '@tiptap/extension-superscript';

	export let initialHtml: string;

	let element: Element | undefined;
	let editor: Editor;

	let fileLoading = false;

	const project = $page.data.project as Project;

	onMount(() => {
		editor = new Editor({
			element: element,
			extensions: [
				StarterKit,
				Youtube,
				Video,
				Link.configure({
					linkOnPaste: true,
					openOnClick: 'whenNotEditable',
					autolink: true
				}),
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
				}),
				Superscript
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

	async function insertFile(ev: Event) {
		const file = (ev.target as HTMLInputElement).files?.[0];
		if (!file) return;

		fileLoading = true;

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
			if (file.type.startsWith('image/')) {
				await handleImageUploadResponse(req, editor);
			} else if (file.type.startsWith('video/')) {
				await handleVideoUploadResponse(req, editor);
			} else {
				await handleDocumentUploadResponse(req, editor);
			}
		} else {
			alert('Failed to upload content');
		}
		fileLoading = false;
	}

	async function insertLink() {
		const url = prompt('Enter a URL');

		if (url) {
			editor.commands.toggleLink({
				href: url
			});
		}
	}

	$: html = editor?.getHTML();
</script>

<form use:enhance action="?/editContent" method="post" enctype="multipart/form-data">
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
				<button
					on:click={() => editor.chain().focus().toggleSuperscript().run()}
					class={editor.isActive('subscript') ? 'filled' : 'outlined'}
					type="button"
				>
					Superscript
				</button>
			</span>

			<span class="button-group">
				<button on:click={insertLink}> Link </button>
				<button on:click={insertYouTube}> YouTube video </button>
				<label class={fileLoading ? 'filled' : 'outlined'}>
					{#if fileLoading}
						Loading...
					{:else}
						Insert content
					{/if}
					<input type="file" style="display: none;" on:change={insertFile} />
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
		position: sticky;
		top: 0;
		left: 0;
		background-color: var(--color-background);
		padding: 1rem;
		z-index: 9;
		margin: 0 -1rem;
		margin-top: -1rem;
		border-bottom: 2px solid var(--color-foreground-lowest);
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
