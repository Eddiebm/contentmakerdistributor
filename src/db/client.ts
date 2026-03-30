import { Pool } from 'pg';
import { config } from '../config/env';

export const db = new Pool({
  connectionString: config.databaseUrl,
});

export async function initDatabase(): Promise<void> {
  const client = await db.connect();
  try {
    await client.query(`
      CREATE TABLE IF NOT EXISTS content (
        id SERIAL PRIMARY KEY,
        text TEXT NOT NULL,
        variant TEXT,
        platform TEXT DEFAULT 'x',
        score INT DEFAULT 0,
        status TEXT DEFAULT 'draft',
        created_at TIMESTAMP DEFAULT NOW()
      )
    `);

    await client.query(`
      CREATE TABLE IF NOT EXISTS metrics (
        id SERIAL PRIMARY KEY,
        content_id INT REFERENCES content(id),
        impressions INT DEFAULT 0,
        likes INT DEFAULT 0,
        created_at TIMESTAMP DEFAULT NOW()
      )
    `);

    console.log('Database initialized successfully');
  } finally {
    client.release();
  }
}
