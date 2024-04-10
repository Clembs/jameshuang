import { relations, sql } from 'drizzle-orm';
import { integer, pgTable, serial, text, timestamp, varchar } from 'drizzle-orm/pg-core';

export const projects = pgTable('projects', {
	id: text('id').notNull().primaryKey(),
	title: varchar('title', { length: 256 }).notNull(),
	article: text('article').notNull(),
	bannerUrl: text('image_url').notNull(),
	bannerThumbUrl: text('banner_thumb_url'),
	bannerWidth: integer('banner_width'),
	bannerHeight: integer('banner_height'),
	timeline: varchar('timeline', { length: 256 }),
	year: integer('year'),
	tools: varchar('tools', { length: 32 }).array().notNull(),
	mediums: varchar('mediums', { length: 32 }).array().notNull(),
	roles: varchar('roles', { length: 64 }).notNull(),
	position: integer('position'),
	type: text('type', { enum: ['PROJECT', 'OTHER'] })
		.default('PROJECT')
		.notNull(),
	url: text('url')
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

export const status = pgTable('status', {
	id: serial('id').primaryKey(),
	imageUrl: text('image_url').notNull(),
	title: varchar('title', { length: 256 }).notNull()
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
