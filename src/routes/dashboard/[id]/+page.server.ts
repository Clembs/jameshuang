import { db } from '$lib/db';
import { projects } from '$lib/db/schema';
import { error, redirect } from '@sveltejs/kit';
import { eq } from 'drizzle-orm';

export async function load({ params, locals: { getUser } }) {
	const user = await getUser();

	if (!user) throw error(401, 'Unauthorized');

	if (params.id === 'new') {
		return {
			project: null
		};
	}

	const project = await db.query.projects.findFirst({
		where: ({ id }, { eq }) => eq(id, params.id)
	});

	if (!project) throw error(404);

	return {
		project
	};
}

export const actions = {
	async editMetadata({ params, locals: { getUser }, request }) {
		const user = await getUser();

		if (!user) throw error(401, 'Unauthorized');

		const data = await request.formData();
		const { title, 'banner-url': bannerUrl, year, timeline, roles } = Object.fromEntries(data);
		const mediums = data.getAll('medium').map((medium) => medium.toString());
		const tools = data.getAll('tool').map((tool) => tool.toString());

		const updatedProject = {
			title: title.toString(),
			bannerUrl: bannerUrl.toString(),
			year: Number(year.toString()),
			timeline: timeline.toString(),
			roles: roles.toString(),
			mediums,
			tools
		};

		if (params.id === 'new') {
			const slug = data.get('slug')?.toString();

			if (!slug) throw error(400, 'Missing slug');

			const [newProject] = await db
				.insert(projects)
				.values({ id: slug, article: '', ...updatedProject })
				.returning();

			throw redirect(301, `/dashboard/${newProject.id}`);
		} else {
			await db.update(projects).set(updatedProject).where(eq(projects.id, params.id));

			return {
				success: true
			};
		}
	},
	async editContent({ params, locals: { getUser }, request }) {
		const user = await getUser();

		if (!user) throw error(401, 'Unauthorized');

		const data = await request.formData();
		const content = data.get('content')?.toString();

		await db.update(projects).set({ article: content }).where(eq(projects.id, params.id));

		return {
			success: true
		};
	}
};
