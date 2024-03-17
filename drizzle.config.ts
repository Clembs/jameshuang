import type { Config } from 'drizzle-kit';
import 'dotenv/config';

const connectionString = process.env.POSTGRES_URL;

if (!connectionString) {
	throw new Error('POSTGRES_URL environment variable is not set');
}

export default {
	schema: './src/lib/db/schema.ts',
	out: './src/lib/db/migrations',
	driver: 'pg',
	dbCredentials: {
		connectionString
	}
} satisfies Config;
