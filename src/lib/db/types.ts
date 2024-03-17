import type { pictures, projects } from './schema';

export type Project = typeof projects.$inferSelect;

export type Picture = typeof pictures.$inferSelect;
