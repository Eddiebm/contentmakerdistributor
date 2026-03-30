import { Worker } from 'bullmq';
import IORedis from 'ioredis';
import { config } from '../config/env';
import { runMACE } from '../agents/mace';
import { scoreContent } from '../agents/scorer';
import { createVariants } from '../agents/variants';
import { publish } from '../services/publisher';
import { repost } from '../services/reposter';
import { engage } from '../services/engager';

const connection = new IORedis(config.redisUrl, {
  maxRetriesPerRequest: null,
});

export const worker = new Worker('aede', async (job) => {
  console.log(`Processing job: ${job.name}`);

  if (job.name === 'pipeline') {
    console.log('Starting AEDE pipeline...');

    await runMACE();
    console.log('✓ MACE content generation complete');

    await scoreContent();
    console.log('✓ Content scoring complete');

    await createVariants();
    console.log('✓ Variant creation complete');

    await publish();
    console.log('✓ Publishing complete');

    await repost();
    console.log('✓ Repost scheduling complete');

    await engage();
    console.log('✓ Engagement actions complete');

    console.log('Pipeline completed successfully!');
  }

  if (job.name === 'repost_job') {
    console.log('Executing scheduled repost...');
    await publish();
  }

}, { connection });

worker.on('completed', (job) => {
  console.log(`Job ${job.id} completed successfully`);
});

worker.on('failed', (job, err) => {
  console.error(`Job ${job?.id} failed:`, err.message);
});

export async function closeWorker(): Promise<void> {
  await worker.close();
  await connection.quit();
}
