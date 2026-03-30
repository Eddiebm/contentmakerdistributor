import { db } from '../db/client';

export interface MetricsData {
  contentId: number;
  impressions: number;
  likes: number;
  retweets: number;
  replies: number;
}

export async function collectMetrics(): Promise<void> {
  console.log('Collecting content metrics...');

  const result = await db.query(
    "SELECT * FROM content WHERE status IN ('posted', 'reposted')"
  );

  const items = result.rows;

  for (const item of items) {
    // In production: Fetch actual metrics from X API
    const metrics: MetricsData = {
      contentId: item.id,
      impressions: Math.floor(Math.random() * 1000), // Placeholder
      likes: Math.floor(Math.random() * 100),
      retweets: Math.floor(Math.random() * 20),
      replies: Math.floor(Math.random() * 10),
    };

    await saveMetrics(metrics);
  }

  console.log(`Collected metrics for ${items.length} items`);
}

export async function saveMetrics(metrics: MetricsData): Promise<void> {
  await db.query(
    'INSERT INTO metrics(content_id, impressions, likes) VALUES($1, $2, $3)',
    [metrics.contentId, metrics.impressions, metrics.likes]
  );
}

export async function getTopPerformingContent(limit: number = 10): Promise<any[]> {
  const result = await db.query(`
    SELECT c.*, m.impressions, m.likes
    FROM content c
    LEFT JOIN metrics m ON c.id = m.content_id
    WHERE c.status LIKE 'posted%'
    ORDER BY m.impressions DESC
    LIMIT $1
  `, [limit]);

  return result.rows;
}

export async function generateReport(): Promise<string> {
  const topContent = await getTopPerformingContent(5);

  const report = `
AEDE Performance Report
========================
Generated: ${new Date().toISOString()}

Top 5 Performing Content:
${topContent.map((c, i) =>
  `${i + 1}. "${c.text.slice(0, 50)}..." - Score: ${c.score}`
).join('\n')}
  `.trim();

  return report;
}
