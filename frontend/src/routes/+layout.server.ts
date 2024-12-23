import { db } from '$lib/server/db';
import { eq } from 'drizzle-orm';
import { articleTable } from '$lib/server/db/schemas/articles';
import type { LayoutServerLoad } from './$types';

export const load: LayoutServerLoad = async (event) => {
	const userId = event.locals.user?.id;
	if (!userId) {
		return { articles: [] };
	}

	const articles = await db.select().from(articleTable).where(eq(articleTable.userId, userId));
	return {
		articles
	};
};
