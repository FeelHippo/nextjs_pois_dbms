import { drizzle } from 'drizzle-orm/node-postgres';
import { Pool } from 'pg';

const client = new Pool({
  host: 'points-of-interest.c9cism04k8bh.eu-north-1.rds.amazonaws.com',
  port: 5432,
  user: 'postgres',
  password: 'A<Y2{4obQb|1]]F)[?DVDH0SZ#{D',
  database: "postgres",
  ssl: {
    rejectUnauthorized: false,
  }
});

const casing = 'snake_case';

export default drizzle({ client, casing });
