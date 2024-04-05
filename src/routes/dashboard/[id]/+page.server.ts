import { db } from '$lib/db';
import { projects } from '$lib/db/schema';
import { error } from '@sveltejs/kit';
import { eq } from 'drizzle-orm';

export async function load({ params, locals: { getUser } }) {
	const user = await getUser();

	if (!user) throw error(401, 'Unauthorized');

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

		await db.update(projects).set(updatedProject).where(eq(projects.id, params.id));

		return {
			success: true
		};
	},
	async editContent({ params, locals: { getUser }, request }) {
		const user = await getUser();

		if (!user) throw error(401, 'Unauthorized');

		const data = await request.formData();
		const content = data.get('content')?.toString();

		console.log(content);

		await db.update(projects).set({ article: content }).where(eq(projects.id, params.id));

		return {
			success: true
		};
	}
};
