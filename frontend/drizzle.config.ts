import { defineConfig } from 'drizzle-kit';
export default defineConfig({
	dialect: 'postgresql',
	schema: './src/lib/server/db/schemas/*',
	dbCredentials: {
		url: process.env.DATABASE_URL || ''
	}
});
