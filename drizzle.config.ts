import { defineConfig } from 'drizzle-kit';

export default defineConfig({
  schema: './src/db/schema.ts',
  out: './drizzle',
  dialect: 'postgresql',
  dbCredentials: {
    url: process.env.DATABASE_URL || 'postgresql://veles:veles_secure_password_2026@localhost:5432/veles_voyage',
  },
  verbose: true,
  strict: true,
});
