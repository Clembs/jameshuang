import { date, pgTable, text, timestamp, varchar } from 'drizzle-orm/pg-core';

export const projects = pgTable('projects', {
	id: text('id').notNull().primaryKey(),
	title: varchar('title', { length: 256 }).notNull(),
	article: text('article').notNull(),
	bannerUrl: text('image_url').notNull(),
	createdAt: date('created_at').notNull(),
	finishedAt: date('finished_at'),
	tools: varchar('tools', { length: 32 }).array().notNull(),
	mediums: varchar('mediums', { length: 32 }).array().notNull(),
	roles: varchar('roles', { length: 64 }).notNull()
});

export const pictures = pgTable('pictures', {
	id: text('id').notNull().primaryKey(),
	title: varchar('title', { length: 256 }).notNull(),
	alt: varchar('alt', { length: 256 }),
	imageUrl: text('image_url').notNull(),
	createdAt: timestamp('created_at').notNull()
});
