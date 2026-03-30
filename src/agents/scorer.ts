import { db } from '../db/client';

export async function scoreContent(): Promise<void> {
  const result = await db.query(
    "SELECT * FROM content WHERE status = 'draft'"
  );

  const drafts = result.rows;
  console.log(`Scoring ${drafts.length} draft items...`);

  for (const item of drafts) {
    // Simple scoring algorithm
    const score = calculateScore(item.text);
    const status = score > 6 ? 'approved' : 'kill';

    await db.query(
      'UPDATE content SET score = $1, status = $2 WHERE id = $3',
      [score, status, item.id]
    );

    console.log(`Content #${item.id}: score=${score}, status=${status}`);
  }

  console.log('Scoring complete');
}

function calculateScore(text: string): number {
  let score = 0;

  // Length check (optimal: 100-260 chars)
  if (text.length >= 100 && text.length <= 260) score += 3;
  else if (text.length >= 50 && text.length < 280) score += 2;
  else score += 1;

  // Engagement hooks
  const hooks = ['?', '!', '...', '👀', '🔥', '💡', '🎯', '⚡'];
  for (const hook of hooks) {
    if (text.includes(hook)) score += 1;
  }

  // Avoid spam patterns
  if (text.includes('http://') || text.includes('free')) score -= 2;

  // Hashtags (1-3 optimal)
  const hashtagCount = (text.match(/#\w+/g) || []).length;
  if (hashtagCount >= 1 && hashtagCount <= 3) score += 2;

  return Math.min(10, Math.max(0, score));
}
