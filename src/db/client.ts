import { drizzle } from "drizzle-orm/node-postgres";
import { Pool } from "pg";

const connectionString = process.env.DATABASE_URL
console.log("DB connecting with:", connectionString);

const pool = new Pool({ connectionString });

export const db = drizzle(pool);