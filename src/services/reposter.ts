import { addJob } from '../queue/queue';
import { db } from '../db/client';
import { BrandConfig } from '../config/brands';

export async function repost(brand: BrandConfig): Promise<void> {
  const result = await db.query(
    "SELECT * FROM content WHERE status = 'posted' AND platform = $1",
    [brand.id]
  );

  const posted = result.rows;
  console.log(`  [${brand.name}] Scheduling reposts for ${posted.length} items...`);

  for (const item of posted) {
    const sixHours        = 6  * 60 * 60 * 1000;
    const twentyFourHours = 24 * 60 * 60 * 1000;

    await addJob('repost_job', {
      contentId: item.id,
      text: item.text,
      variant: item.variant,
      brandId: brand.id,
      brandName: brand.name,
    }, { delay: sixHours });

    await addJob('repost_job', {
      contentId: item.id,
      text: item.text,
      variant: item.variant,
      brandId: brand.id,
      brandName: brand.name,
    }, { delay: twentyFourHours });

    await db.query(
      "UPDATE content SET status = 'scheduled_repost' WHERE id = $1",
      [item.id]
    );
  }

  console.log(`  [${brand.name}] Scheduled ${posted.length * 2} reposts (6h and 24h delays)`);
}

export async function executeRepost(contentId: number, text: string, brandName: string): Promise<void> {
  console.log(`  [${brandName}] [REPOST] Content #${contentId}: ${text.slice(0, 50)}...`);
  await db.query(
    "UPDATE content SET status = 'reposted' WHERE id = $1",
    [contentId]
  );
}
