import { initDatabase } from './db/client';
import { initScheduler, triggerAllPipelines } from './scheduler/cron';
import { initWorker, closeWorker } from './queue/workers';
import { closeQueue } from './queue/queue';
import { BRANDS } from './config/brands';

async function main(): Promise<void> {
  console.log('AEDE — Autonomous Execution + Distribution Engine');
  console.log('     Multi-Brand Edition');
  console.log('====================================================\n');

  const activeBrands = BRANDS.filter(b => b.active);
  console.log(`Loaded ${BRANDS.length} brands (${activeBrands.length} active):\n`);
  for (const brand of activeBrands) {
    console.log(`  * ${brand.name} — ${brand.description}`);
  }
  console.log('');

  try {
    // Initialise database
    console.log('Initialising database...');
    await initDatabase();

    // Initialise workers and wait for them to be ready
    initWorker();
    await new Promise(resolve => setTimeout(resolve, 1500));

    // Initialise per-brand schedulers
    initScheduler();

    // Run all pipelines immediately if --run flag is passed
    const args = process.argv.slice(2);
    if (args.includes('--run') || args.includes('-r')) {
      await new Promise(resolve => setTimeout(resolve, 500));
      await triggerAllPipelines();
    }

    console.log('\nAEDE is running.');
    console.log('Each brand pipeline fires on its own schedule (see above).');
    console.log('Workers are active and waiting for jobs.');
    console.log('\nPress Ctrl+C to stop\n');

    // Graceful shutdown
    process.on('SIGINT', async () => {
      console.log('\nShutting down AEDE...');
      await closeQueue();
      await closeWorker();
      process.exit(0);
    });

  } catch (error: any) {
    console.error('Failed to start AEDE:', error.message);
    process.exit(1);
  }
}

main();
