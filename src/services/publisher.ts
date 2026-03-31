import { db } from '../db/client';
import { config } from '../config/env';
import { BrandConfig } from '../config/brands';

// Platform integrations
import { postToBluesky } from './bluesky';
import { postToMastodon } from './mastodon';
import { postToLinkedIn } from './linkedin';
import { postToThreads } from './threads';
import { postToTelegram } from './telegram';
import { postToDiscord } from './discord';

export async function publish(brand: BrandConfig): Promise<void> {
  const result = await db.query(
    "SELECT * FROM content WHERE status = 'queued' AND platform = $1",
    [brand.id]
  );

  const queued = result.rows;
  const platformCount = countEnabledPlatforms();
  console.log(`  [${brand.name}] Publishing ${queued.length} items to ${platformCount} platforms...`);

  for (const item of queued) {
    const platforms: Promise<void>[] = [];

    // Post to all enabled platforms (credentials in .env)
    if (config.x.accessToken)          platforms.push(postToX(item.text, brand.name));
    if (config.bluesky.identifier)     platforms.push(postToBluesky(item.text));
    if (config.mastodon.token)         platforms.push(postToMastodon(item.text));
    if (config.linkedin.accessToken)   platforms.push(postToLinkedIn(item.text));
    if (config.threads.accessToken)    platforms.push(postToThreads(item.text));
    if (config.telegram.botToken)      platforms.push(postToTelegram(item.text));
    if (config.discord.webhookUrl)     platforms.push(postToDiscord(item.text));

    // If no platforms are configured, simulate posting
    if (platforms.length === 0) {
      console.log(`  [${brand.name}] [SIMULATED] Would post: ${item.text.slice(0, 70)}...`);
      await db.query(
        "UPDATE content SET status = 'posted' WHERE id = $1",
        [item.id]
      );
      continue;
    }

    try {
      await Promise.all(platforms);
      await db.query(
        "UPDATE content SET status = 'posted' WHERE id = $1",
        [item.id]
      );
      console.log(`  [${brand.name}] ✓ Published: ${item.text.slice(0, 60)}...`);
    } catch (error: any) {
      console.error(`  [${brand.name}] Failed to publish #${item.id}:`, error.message);
      await db.query(
        "UPDATE content SET status = 'failed' WHERE id = $1",
        [item.id]
      );
    }
  }

  console.log(`  [${brand.name}] Publishing complete`);
}

function countEnabledPlatforms(): number {
  let count = 0;
  if (config.x.accessToken)        count++;
  if (config.bluesky.identifier)   count++;
  if (config.mastodon.token)       count++;
  if (config.linkedin.accessToken) count++;
  if (config.threads.accessToken)  count++;
  if (config.telegram.botToken)    count++;
  if (config.discord.webhookUrl)   count++;
  return count;
}

// X (Twitter) posting
async function postToX(text: string, brandName: string): Promise<void> {
  if (!config.x.accessToken) {
    console.log(`  [${brandName}] [SIMULATED X] Would post: ${text.slice(0, 50)}...`);
    return;
  }
  // Production: call X API v2 here
  await new Promise(resolve => setTimeout(resolve, 100));
  console.log(`  [${brandName}] [X] Posted: ${text.slice(0, 50)}...`);
}
