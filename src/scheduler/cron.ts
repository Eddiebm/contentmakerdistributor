import cron from 'node-cron';
import { addJob } from '../queue/queue';

export function initScheduler(): void {
  // Run pipeline daily at 7:00 AM
  cron.schedule('0 7 * * *', async () => {
    console.log('Scheduled pipeline triggered');
    await addJob('pipeline', { timestamp: new Date().toISOString() });
  });

  console.log('Scheduler initialized - Pipeline runs daily at 7:00 AM');
}

// Manual trigger function for testing
export async function triggerPipeline(): Promise<void> {
  console.log('Manually triggering pipeline...');
  await addJob('pipeline', { timestamp: new Date().toISOString(), manual: true });
}
