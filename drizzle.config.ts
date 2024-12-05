import { Config } from 'drizzle-kit';

// when executing "npx drizzle-kit push" from the terminal
// the below configuration will be used during the migration generation process

export default {
  out: './drizzle',
  dialect: 'postgresql',
  schema: './app/data/schema.ts',
  casing: 'snake_case',
  dbCredentials: {
    ssl: {
      rejectUnauthorized: false,
    },
    host: 'points-of-interest.c9cism04k8bh.eu-north-1.rds.amazonaws.com',
    port: 5432,
    user: 'postgres',
    password: 'A<Y2{4obQb|1]]F)[?DVDH0SZ#{D',
    database: "postgres",
  },
} satisfies Config;
