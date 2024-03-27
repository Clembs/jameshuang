import { relations, sql } from 'drizzle-orm';
import { date, integer, pgTable, text, timestamp, varchar } from 'drizzle-orm/pg-core';

export const projects = pgTable('projects', {
	id: text('id').notNull().primaryKey(),
	title: varchar('title', { length: 256 }).notNull(),
	article: text('article').notNull(),
	bannerUrl: text('image_url').notNull(),
	createdAt: date('created_at').notNull(),
	finishedAt: date('finished_at'),
	tools: varchar('tools', { length: 32 }).array().notNull(),
	mediums: varchar('mediums', { length: 32 }).array().notNull(),
	roles: varchar('roles', { length: 64 }).notNull(),
	position: integer('position')
});

export const pictures = pgTable('pictures', {
	id: text('id').notNull().primaryKey(),
	title: varchar('title', { length: 256 }).notNull(),
	alt: varchar('alt', { length: 256 }),
	imageUrl: text('image_url').notNull(),
	createdAt: timestamp('created_at').notNull()
});

export const users = pgTable('users', {
	id: text('id')
		.notNull()
		.primaryKey()
		.default(sql`gen_random_uuid()`),
	username: varchar('username', { length: 256 }).unique().notNull(),
	password: text('password').notNull(),
	// TODO: Add more permissions, maybe
	permissions: varchar('permissions', { length: 32, enum: ['admin'] })
		.array()
		.notNull()
});

export const sessions = pgTable('sessions', {
	id: text('id')
		.notNull()
		.primaryKey()
		.default(sql`gen_random_uuid()`),
	userId: text('user_id').notNull(),
	expiresAt: timestamp('expires_at').notNull()
});

export const usersRelations = relations(users, ({ many }) => ({
	sessions: many(sessions)
}));

export const sessionsRelations = relations(sessions, ({ one }) => ({
	user: one(users, {
		fields: [sessions.userId],
		references: [users.id]
	})
}));
