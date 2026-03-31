import { Worker } from 'bullmq';
import { redisConnection } from './queue';
import { BRANDS } from '../config/brands';

// Pipeline stages
import { runMACE }        from '../agents/mace';
import { scoreContent }   from '../agents/scorer';
import { createVariants } from '../agents/variants';
import { publish }        from '../services/publisher';
import { repost, executeRepost } from '../services/reposter';
import { engage }         from '../services/engager';
import { collectMetrics } from '../services/metrics';

let worker: Worker;

export function initWorker(): void {
  worker = new Worker('aede', async (job) => {
    console.log(`\nProcessing job: ${job.name}`);

    if (job.name === 'pipeline') {
      const { brandId } = job.data;

      // Look up the brand config by ID
      const brand = BRANDS.find(b => b.id === brandId);
      if (!brand) {
        console.error(`Unknown brand ID: "${brandId}". Add it to src/config/brands.ts`);
        return;
      }

      console.log(`\n${'─'.repeat(50)}`);
      console.log(`Running pipeline for: ${brand.name}`);
      console.log(`${'─'.repeat(50)}`);

      try {
        console.log('\n[1/7] MACE — Generating content...');
        await runMACE(brand);

        console.log('\n[2/7] SCORER — Evaluating quality...');
        await scoreContent(brand);

        console.log('\n[3/7] VARIANTS — Multiplying approved content...');
        await createVariants(brand);

        console.log('\n[4/7] PUBLISHER — Posting to platforms...');
        await publish(brand);

        console.log('\n[5/7] REPOSTER — Scheduling reposts...');
        await repost(brand);

        console.log('\n[6/7] ENGAGER — Running engagement actions...');
        await engage(brand);

        console.log('\n[7/7] METRICS — Collecting performance data...');
        await collectMetrics(brand);

        console.log(`\n[${brand.name}] Pipeline complete`);
      } catch (error: any) {
        console.error(`\n[${brand.name}] Pipeline failed:`, error.message);
        throw error;
      }
    }

    if (job.name === 'repost_job') {
      const { contentId, text, brandName, brandId } = job.data;
      await executeRepost(contentId, text, brandName || brandId || 'Unknown');
    }

  }, { connection: redisConnection });

  worker.on('completed', job => {
    console.log(`Job ${job.id} (${job.name}) completed`);
  });

  worker.on('failed', (job, err) => {
    console.error(`Job ${job?.id} (${job?.name}) failed:`, err.message);
  });

  console.log('Workers initialised and listening for jobs');
}

export async function closeWorker(): Promise<void> {
  if (worker) await worker.close();
}
