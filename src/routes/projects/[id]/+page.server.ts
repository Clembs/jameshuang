import { PRIVATE_MODE } from '$env/static/private';
import { db } from '$lib/db';
import { error } from '@sveltejs/kit';

export async function load({ params }) {
	const project = await db.query.projects.findFirst({
		where: ({ id, private: privateMode }, { eq, and }) =>
			PRIVATE_MODE === '1' ? eq(id, params.id) : and(eq(id, params.id), eq(privateMode, false))
	});

	const mediaRegex = /(https?:\/\/[^\s/$.?#].[^\s]*)\.(?:webp|jpg|jpeg|png|gif|mp4)/g;

	const media = Array.from(project?.article.match(mediaRegex) || []);

	if (!project) {
		throw error(404);
	}

	return {
		...project,
		media
	};
}
