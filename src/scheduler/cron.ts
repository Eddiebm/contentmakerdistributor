import cron from 'node-cron';
import { addJob } from '../queue/queue';
import { BRANDS, BrandConfig } from '../config/brands';

/**
 * Initialises one cron job per active brand.
 * Each brand fires its own pipeline at the time defined in brands.ts.
 * To add a new brand, simply add it to the BRANDS array — no code change needed here.
 */
export function initScheduler(): void {
  const activeBrands = BRANDS.filter(b => b.active);

  console.log(`\nScheduler initialised for ${activeBrands.length} active brands:\n`);

  for (const brand of activeBrands) {
    // node-cron supports 6-field cron (with seconds field)
    cron.schedule(brand.schedule, async () => {
      console.log(`\n⏰ [${brand.name}] Scheduled pipeline triggered`);
      await triggerBrandPipeline(brand);
    });

    // Human-readable schedule display
    const parts = brand.schedule.split(' ');
    const hour   = parts[2].padStart(2, '0');
    const minute = parts[1].padStart(2, '0');
    console.log(`  ✓ ${brand.name.padEnd(32)} → daily at ${hour}:${minute}`);
  }

  console.log('');
}

/**
 * Triggers the full pipeline for a single brand.
 */
export async function triggerBrandPipeline(brand: BrandConfig): Promise<void> {
  await addJob('pipeline', { brandId: brand.id });
}

/**
 * Triggers ALL active brand pipelines immediately.
 * Used when starting with --run flag for testing.
 */
export async function triggerAllPipelines(): Promise<void> {
  const activeBrands = BRANDS.filter(b => b.active);
  console.log(`\n🚀 Triggering pipelines for all ${activeBrands.length} active brands...\n`);

  for (const brand of activeBrands) {
    console.log(`  → Queuing pipeline for: ${brand.name}`);
    await triggerBrandPipeline(brand);
    // Small stagger to avoid hammering the AI API simultaneously
    await new Promise(resolve => setTimeout(resolve, 500));
  }
}
