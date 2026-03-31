import { db } from '../db/client';
import { BrandConfig } from '../config/brands';

export async function scoreContent(brand: BrandConfig): Promise<void> {
  const result = await db.query(
    "SELECT * FROM content WHERE status = 'draft' AND platform = $1",
    [brand.id]
  );

  const drafts = result.rows;
  console.log(`  [${brand.name}] Scoring ${drafts.length} draft items...`);

  for (const item of drafts) {
    const score = calculateScore(item.text);
    const status = score > 4 ? 'approved' : 'kill';

    await db.query(
      'UPDATE content SET score = $1, status = $2 WHERE id = $3',
      [score, status, item.id]
    );

    console.log(`  [${brand.name}] Content #${item.id}: score=${score}, status=${status}`);
  }

  console.log(`  [${brand.name}] Scoring complete`);
}

function calculateScore(text: string): number {
  let score = 0;

  // Length check (optimal: 100–260 chars for social media)
  if (text.length >= 100 && text.length <= 260) score += 3;
  else if (text.length >= 50 && text.length < 280) score += 2;
  else score += 1;

  // Engagement hooks
  const hooks = ['?', '!', '...', '👀', '🔥', '💡', '🎯', '⚡', '→'];
  for (const hook of hooks) {
    if (text.includes(hook)) score += 1;
  }

  // Penalise spam patterns
  if (text.includes('http://') || text.toLowerCase().includes('free!!!')) score -= 2;

  // Hashtags (1–3 is optimal)
  const hashtagCount = (text.match(/#\w+/g) || []).length;
  if (hashtagCount >= 1 && hashtagCount <= 3) score += 2;

  // Reward content that has a clear value statement
  const valueWords = ['how to', 'why', 'truth', 'mistake', 'secret', 'tip', 'guide', 'never', 'always', 'most'];
  for (const word of valueWords) {
    if (text.toLowerCase().includes(word)) { score += 1; break; }
  }

  return Math.min(10, Math.max(0, score));
}
