import type { InferSelectModel } from 'drizzle-orm';
import { pgTable, timestamp, uuid, varchar } from 'drizzle-orm/pg-core';

export const usersTable = pgTable('users', {
	id: uuid()
		.$defaultFn(() => crypto.randomUUID())
		.primaryKey(),
	email: varchar().unique().notNull(),
	googleId: varchar().unique().notNull()
});

export type User = InferSelectModel<typeof usersTable>;

export const sessionTable = pgTable('sessions', {
	id: varchar().primaryKey(),
	userId: uuid()
		.notNull()
		.references(() => usersTable.id),
	expiresAt: timestamp().notNull()
});
export type Session = InferSelectModel<typeof sessionTable>;
