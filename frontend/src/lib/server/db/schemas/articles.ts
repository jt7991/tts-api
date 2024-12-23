import { pgTable, uuid, varchar } from 'drizzle-orm/pg-core';
import { usersTable } from './users';
import type { InferSelectModel } from 'drizzle-orm';

export const articleTable = pgTable('articles', {
	id: uuid()
		.$defaultFn(() => crypto.randomUUID())
		.primaryKey(),
	title: varchar().notNull(),
	userId: uuid()
		.notNull()
		.references(() => usersTable.id),
	lead_image_url: varchar(),
	web_url: varchar().notNull(),
	author: varchar(),
	audio_url: varchar().notNull(),
	timestamp_url: varchar().notNull()
});

export type Article = InferSelectModel<typeof articleTable>;
