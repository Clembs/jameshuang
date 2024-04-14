import type { Editor } from '@tiptap/core';

export async function handleImageUploadResponse(req: Response, editor: Editor) {
	const res: {
		name: string;
		url: string;
	}[] = await req.json();

	const name = res[0].name.split('-').slice(0, -1).join('-');
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
			alt: name
		})
		.updateAttributes('image', {
			thumbnailSrc: thumbnailUrl
		})
		.run();
}

export async function handleVideoUploadResponse(req: Response, editor: Editor) {
	const res: {
		name: string;
		url: string;
	}[] = await req.json();

	const videoFile = res?.[0];

	if (!res || !videoFile) {
		alert('Failed to upload video');
		return;
	}

	editor
		.chain()
		.focus()
		.insertContent({
			type: 'video',
			attrs: {
				src: videoFile.url
			}
		})
		.run();
}

export async function handleDocumentUploadResponse(req: Response, editor: Editor) {
	const res: {
		name: string;
		url: string;
	}[] = await req.json();

	const file = res?.[0];

	if (!res || !file) {
		alert('Failed to upload file');
		return;
	}

	editor
		.chain()
		.focus()
		.insertContent(
			`<a class="blog-file-download" href="${file.url}" target="_blank">Download ${file.name}</a>`
		)
		.run();
}
