<script lang="ts">
	import { onMount, onDestroy } from 'svelte';
	import { Editor } from '@tiptap/core';
	import StarterKit from '@tiptap/starter-kit';
	import Button from '../../../lib/components/Button.svelte';
	import '../../../styles/blog.scss';

	export let initialHtml: string;

	let element: Element | undefined;
	let editor: Editor;

	onMount(() => {
		editor = new Editor({
			element: element,
			extensions: [StarterKit],
			content: initialHtml,
			onTransaction: () => {
				// force re-render so `editor.isActive` works as expected
				editor = editor;
			}
		});
	});

	onDestroy(() => {
		if (editor) {
			editor.destroy();
		}
	});

	$: html = editor?.getHTML();
</script>

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
	</div>
{/if}

<div class="blog-article-content" bind:this={element} />

<Button formaction="?/editContent" type="submit">Save</Button>

<style lang="scss">
	.buttons {
		display: flex;
		gap: 0.5rem;
	}

	.button-group {
		display: flex;

		button {
			display: grid;
			place-items: center;
			padding: 0 0.75rem;
			// width: 2.5rem;
			height: 2rem;
			color: var(--color-foreground-full);
			border: 1px solid var(--color-foreground-full);
			border-right: 0;

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
</style>
