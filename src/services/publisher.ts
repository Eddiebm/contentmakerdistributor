import { db } from '../db/client';
import { config } from '../config/env';

export async function publish(): Promise<void> {
  const result = await db.query(
    "SELECT * FROM content WHERE status = 'queued'"
  );

  const queued = result.rows;
  console.log(`Publishing ${queued.length} items...`);

  for (const item of queued) {
    try {
      await publishToX(item.text);

      await db.query(
        "UPDATE content SET status = 'posted' WHERE id = $1",
        [item.id]
      );

      console.log(`Published: ${item.text.slice(0, 50)}...`);
    } catch (error: any) {
      console.error(`Failed to publish #${item.id}:`, error.message);
      await db.query(
        "UPDATE content SET status = 'failed' WHERE id = $1",
        [item.id]
      );
    }
  }

  console.log('Publishing complete');
}

async function publishToX(text: string): Promise<void> {
  // X API integration placeholder
  // In production, implement actual X API call:
  //
  // const response = await axios.post('https://api.twitter.com/2/tweets', {
  //   text: text
  // }, {
  //   headers: {
  //     'Authorization': `Bearer ${config.x.accessToken}`,
  //     'Content-Type': 'application/json'
  //   }
  // });

  if (!config.x.accessToken) {
    console.log(`[SIMULATED] Would post to X: ${text.slice(0, 50)}...`);
    return;
  }

  // Simulate API delay
  await new Promise(resolve => setTimeout(resolve, 100));

  console.log(`[X API] Posted: ${text.slice(0, 50)}...`);
}
