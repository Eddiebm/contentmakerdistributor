import { db } from '../db/client';
import { BrandConfig } from '../config/brands';

interface MetricsData {
  contentId: number;
  impressions: number;
  likes: number;
  retweets?: number;
  replies?: number;
}

export async function collectMetrics(brand: BrandConfig): Promise<void> {
  const result = await db.query(
    "SELECT * FROM content WHERE status LIKE 'posted%' AND platform = $1",
    [brand.id]
  );

  const items = result.rows;
  console.log(`  [${brand.name}] Collecting metrics for ${items.length} posted items...`);

  for (const item of items) {
    // In production: fetch real metrics from each platform's API
    const metrics: MetricsData = {
      contentId: item.id,
      impressions: Math.floor(Math.random() * 1000),
      likes: Math.floor(Math.random() * 100),
      retweets: Math.floor(Math.random() * 20),
      replies: Math.floor(Math.random() * 10),
    };
    await saveMetrics(metrics);
  }

  console.log(`  [${brand.name}] Metrics collection complete`);
}

export async function saveMetrics(metrics: MetricsData): Promise<void> {
  await db.query(
    'INSERT INTO metrics(content_id, impressions, likes) VALUES($1, $2, $3)',
    [metrics.contentId, metrics.impressions, metrics.likes]
  );
}

export async function getTopPerformingContent(brandId: string, limit: number = 10): Promise<any[]> {
  const result = await db.query(`
    SELECT c.*, m.impressions, m.likes
    FROM content c
    LEFT JOIN metrics m ON c.id = m.content_id
    WHERE c.status LIKE 'posted%' AND c.platform = $1
    ORDER BY m.impressions DESC NULLS LAST
    LIMIT $2
  `, [brandId, limit]);
  return result.rows;
}

export async function generateReport(brand: BrandConfig): Promise<string> {
  const topContent = await getTopPerformingContent(brand.id, 5);
  const report = `
AEDE Performance Report — ${brand.name}
${'='.repeat(40)}
Generated: ${new Date().toISOString()}

Top 5 Performing Posts:
${topContent.map((c, i) =>
  `${i + 1}. "${c.text.slice(0, 60)}..." — Score: ${c.score} | Impressions: ${c.impressions || 0} | Likes: ${c.likes || 0}`
).join('\n') || 'No data yet'}
  `.trim();
  return report;
}
