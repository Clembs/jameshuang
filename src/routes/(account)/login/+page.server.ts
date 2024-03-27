import bcrypt from 'bcryptjs';
import { db } from '$lib/db';
import { fail, redirect } from '@sveltejs/kit';
import { createSession } from '$lib/helpers/createSession';

export const actions = {
	async default({ request, cookies }) {
		const formData = await request.formData();
		const formUsername = formData.get('username')?.toString();
		const formPassword = formData.get('password')?.toString();

		if (!formUsername) {
			return fail(400, { username: 'Username is required' });
		}

		if (!formPassword) {
			return fail(400, { password: 'Password is required' });
		}

		const user = await db.query.users.findFirst({
			where: ({ username }, { eq }) => eq(username, formUsername)
		});

		if (!user) {
			return fail(401, { username: 'Username or password is invalid' });
		}

		const isPwdCorrect = await bcrypt.compare(formPassword, user.password);

		if (!isPwdCorrect) {
			return fail(401, { username: 'Username or password is invalid' });
		}

		await createSession(user.id, cookies);

		throw redirect(302, '/dashboard');
	}
};
