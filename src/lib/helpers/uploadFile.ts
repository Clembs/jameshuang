import { SUPABASE_URL } from '$env/static/private';
import { supabaseClient } from '$lib/db/supabase';
import { getOptimizedImages } from './getOptimizedImages';

export type ReturnFile = {
	buffer: Buffer;
	height?: number;
	width?: number;
	url?: string;
	type?: string;
};

export async function uploadFiles(basePath: string, ...files: File[]) {
	const returnFiles = new Map<string, ReturnFile>();

	// Optimize the images
	for (const file of files) {
		const buffer = await new Blob([file]).arrayBuffer();

		if (file.type.startsWith('image/')) {
			const name = file.name.split('.').slice(0, -1).join('.');
			const { thumbnail: thumb, highQuality: hq, height, width } = await getOptimizedImages(buffer);

			for (const [key, value] of Object.entries({ thumb, hq })) {
				returnFiles.set(`${name}-${key}.webp`, {
					buffer: value,
					height,
					width,
					type: file.type
				});
			}
		} else {
			returnFiles.set(file.name, {
				buffer: Buffer.from(buffer),
				type: file.type
			});
		}
	}

	// Upload each file to Supabase Storage
	for (const [name, { buffer, type, width, height }] of returnFiles) {
		const { data, error } = await supabaseClient.storage
			.from('public_files')
			.upload(`${basePath}/${name}`, buffer, {
				contentType: type,
				upsert: true
			});

		if (error) {
			throw error;
		}

		returnFiles.set(name, {
			buffer,
			type,
			width,
			height,
			url: `${SUPABASE_URL}/storage/v1/object/public/public_files/${data.path}`
		});
	}

	return returnFiles;
}
