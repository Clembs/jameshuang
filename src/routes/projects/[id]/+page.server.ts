import { PRIVATE_MODE } from '$env/static/private';
import { db } from '$lib/db';
import { error } from '@sveltejs/kit';

export async function load({ params }) {
	const project = await db.query.projects.findFirst({
		where: ({ id, private: privateMode }, { eq, and }) =>
			PRIVATE_MODE === '1' ? eq(id, params.id) : and(eq(id, params.id), eq(privateMode, false))
	});

	if (!project) {
		throw error(404);
	}

	return project;
}
