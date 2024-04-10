import { uploadFiles } from '$lib/helpers/uploadFile';
import { error, json, redirect } from '@sveltejs/kit';

export async function POST({ request, url, locals: { getUser } }) {
	const user = await getUser();

	if (!user) throw redirect(301, '/login');

	const data = await request.formData();
	const basePath = url.searchParams.get('basePath');

	const files = data.getAll('file') as File[];

	if (!basePath) {
		throw error(400, 'Missing base-path');
	}

	if (!files.length) {
		throw error(400, 'Missing file(s)');
	}

	const fileMap = await uploadFiles(basePath, ...files);

	return json(
		Array.from(fileMap).map(([name, { url, width, height }]) => ({
			name,
			url,
			width,
			height
		}))
	);
}
