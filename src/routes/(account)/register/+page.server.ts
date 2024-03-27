import { INVITE_CODE } from '$env/static/private';
import { db } from '$lib/db';
import { users } from '$lib/db/schema';
import { createSession } from '$lib/helpers/createSession';
import { fail, redirect } from '@sveltejs/kit';
import bcrypt from 'bcryptjs';

export const actions = {
	async default({ request, cookies }) {
		const formData = await request.formData();
		const formUsername = formData.get('username')?.toString();
		const formPassword = formData.get('password')?.toString();
		const inviteCode = formData.get('invite-code')?.toString();

		if (!formUsername) {
			return fail(400, { username: 'Usernmae is required' });
		}

		if (!formPassword) {
			return fail(400, { password: 'Password is required' });
		}

		if (!inviteCode || inviteCode !== INVITE_CODE) {
			return fail(400, { inviteCode: 'Invalid invite code' });
		}

		const existingUser = await db.query.users.findFirst({
			where: ({ username }, { eq }) => eq(username, formUsername)
		});

		if (existingUser) {
			return fail(401, {
				username: 'Account with isername already exists. Did you mean to login?'
			});
		}

		const [user] = await db
			.insert(users)
			.values({
				username: formUsername,
				password: bcrypt.hashSync(formPassword),
				permissions: ['admin']
			})
			.returning();

		await createSession(user?.id, cookies);

		throw redirect(301, '/dashboard');
	}
};
