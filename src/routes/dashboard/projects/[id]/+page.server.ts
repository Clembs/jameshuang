import { SUPABASE_URL } from '$env/static/private';
import { db } from '$lib/db';
import { projects } from '$lib/db/schema';
import { supabaseClient } from '$lib/db/supabase';
import { getOptimizedImages } from '$lib/helpers/getOptimizedImages';
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

		const banner = {
			highQuality: '',
			thumbnail: '',
			height: 0,
			width: 0
		};

		if (bannerFileRaw.toString().length) {
			const bannerFile = bannerFileRaw as File;
			const bannerBuffer = await new Blob([bannerFile]).arrayBuffer();

			const { thumbnail, highQuality, height, width } = await getOptimizedImages(bannerBuffer);

			banner.width = width;
			banner.height = height;

			for (const [name, buffer] of Object.entries({ thumbnail, highQuality })) {
				const { data, error } = await supabaseClient.storage
					.from('public_files')
					.upload(`projects/${params.id}/${name}.webp`, buffer, {
						contentType: bannerFile.type,
						upsert: true
					});

				if (error) {
					console.error(error);

					return fail(500, { message: 'Failed to upload banner' });
				} else if (data) {
					const url = `${SUPABASE_URL}/storage/v1/object/public/public_files/${data.path}`;
					if (name === 'thumbnail') {
						banner.thumbnail = url;
					} else {
						banner.highQuality = url;
					}
				}
			}
		}

		const updatedProject = {
			title: title.toString(),
			...(banner && {
				bannerUrl: banner.highQuality,
				bannerThumbUrl: banner.thumbnail,
				bannerWidth: banner.width,
				bannerHeight: banner.height
			}),
			year: Number(year.toString()),
			timeline: timeline.toString(),
			roles: roles.toString(),
			mediums,
			tools
		};

		if (params.id === 'new' && banner) {
			const slug = formData.get('slug')?.toString();

			if (!slug) throw error(400, 'Missing slug');

			const [newProject] = await db
				.insert(projects)
				.values({
					id: slug,
					article: '',
					...updatedProject,
					bannerUrl: banner.highQuality
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
