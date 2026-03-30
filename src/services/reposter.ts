import { addJob } from '../queue/queue';
import { db } from '../db/client';

export async function repost(): Promise<void> {
  const result = await db.query(
    "SELECT * FROM content WHERE status = 'posted'"
  );

  const posted = result.rows;
  console.log(`Scheduling reposts for ${posted.length} items...`);

  for (const item of posted) {
    // Schedule reposts at 6 hours and 24 hours
    const sixHours = 6 * 60 * 60 * 1000;
    const twentyFourHours = 24 * 60 * 60 * 1000;

    await addJob('repost_job', {
      contentId: item.id,
      text: item.text,
      variant: item.variant
    }, { delay: sixHours });

    await addJob('repost_job', {
      contentId: item.id,
      text: item.text,
      variant: item.variant
    }, { delay: twentyFourHours });

    // Mark as scheduled for reposting
    await db.query(
      "UPDATE content SET status = 'scheduled_repost' WHERE id = $1",
      [item.id]
    );
  }

  console.log(`Scheduled ${posted.length * 2} reposts (6h and 24h delays)`);
}

export async function executeRepost(contentId: number, text: string): Promise<void> {
  // In production, call X API to repost/retweet
  console.log(`[REPOST] Content #${contentId}: ${text.slice(0, 50)}...`);

  await db.query(
    "UPDATE content SET status = 'reposted' WHERE id = $1",
    [contentId]
  );
}
