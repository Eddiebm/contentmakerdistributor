import { initDatabase } from './db/client';
import { initScheduler } from './scheduler/cron';
import { closeQueue } from './queue/queue';
import { closeWorker } from './queue/workers';
import { triggerPipeline } from './scheduler/cron';

async function main(): Promise<void> {
  console.log('🚀 AEDE - Autonomous Execution + Distribution Engine');
  console.log('====================================================\n');

  try {
    // Initialize database
    console.log('Initializing database...');
    await initDatabase();

    // Initialize scheduler
    console.log('Starting scheduler...');
    initScheduler();

    // Run initial pipeline (optional - for testing)
    const args = process.argv.slice(2);
    if (args.includes('--run') || args.includes('-r')) {
      console.log('\nRunning initial pipeline...');
      await triggerPipeline();
    }

    console.log('\n✅ AEDE is running...');
    console.log('   - Pipeline scheduled daily at 7:00 AM');
    console.log('   - Workers are active and waiting for jobs');
    console.log('\nPress Ctrl+C to stop\n');

    // Keep process running
    process.on('SIGINT', async () => {
      console.log('\nShutting down...');
      await closeQueue();
      await closeWorker();
      process.exit(0);
    });

  } catch (error: any) {
    console.error('❌ Failed to start AEDE:', error.message);
    process.exit(1);
  }
}

main();
