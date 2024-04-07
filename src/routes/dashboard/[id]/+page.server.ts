import { SUPABASE_URL } from '$env/static/private';
import { db } from '$lib/db';
import { projects } from '$lib/db/schema';
import { supabaseClient } from '$lib/db/supabase';
import { error, fail, redirect } from '@sveltejs/kit';
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

		const formData = await request.formData();
		const {
			title,
			'banner-blob': bannerFileRaw,
			year,
			timeline,
			roles
		} = Object.fromEntries(formData);
		const mediums = formData.getAll('medium').map((medium) => medium.toString());
		const tools = formData.getAll('tool').map((tool) => tool.toString());

		let bannerUrl: string | null = null;

		if (bannerFileRaw) {
			const bannerFile = bannerFileRaw as File;
			const bannerBuffer = await new Blob([bannerFile]).arrayBuffer();

			const ext = bannerFile.type.split('/')[1];

			const { data, error } = await supabaseClient.storage
				.from('public_files')
				.upload(`projects/${params.id}/banner.${ext}`, bannerBuffer, {
					contentType: bannerFile.type,
					upsert: true
				});

			if (error) {
				console.error(error);

				return fail(500, { message: 'Failed to upload banner' });
			} else if (data) {
				bannerUrl = `${SUPABASE_URL}/storage/v1/object/public/public_files/${data.path}`;
			}
		}

		const updatedProject = {
			title: title.toString(),
			...(bannerUrl && { bannerUrl }),
			year: Number(year.toString()),
			timeline: timeline.toString(),
			roles: roles.toString(),
			mediums,
			tools
		};

		if (params.id === 'new' && bannerUrl) {
			const slug = formData.get('slug')?.toString();

			if (!slug) throw error(400, 'Missing slug');

			const [newProject] = await db
				.insert(projects)
				.values({
					id: slug,
					article: '',
					...updatedProject,
					bannerUrl: bannerUrl
				})
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
