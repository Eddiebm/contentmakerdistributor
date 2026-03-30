import { db } from '../db/client';

export async function createVariants(): Promise<void> {
  const result = await db.query(
    "SELECT * FROM content WHERE status = 'approved'"
  );

  const approved = result.rows;
  console.log(`Creating variants for ${approved.length} approved items...`);

  for (const item of approved) {
    const variants = generateVariants(item.text);

    for (const variant of variants) {
      await db.query(
        'INSERT INTO content(text, variant, status) VALUES($1, $2, $3)',
        [variant.text, variant.type, 'queued']
      );
    }

    // Mark original as processed
    await db.query(
      "UPDATE content SET status = 'multiplied' WHERE id = $1",
      [item.id]
    );

    console.log(`Created ${variants.length} variants for content #${item.id}`);
  }

  console.log('Variant creation complete');
}

interface Variant {
  text: string;
  type: string;
}

function generateVariants(original: string): Variant[] {
  const variants: Variant[] = [];

  // Original
  variants.push({ text: original, type: 'original' });

  // Hot take version
  if (!original.toLowerCase().startsWith('hot take')) {
    variants.push({ text: `Hot take: ${original}`, type: 'hot_take' });
  }

  // Thread version
  const threadLines = original.split(/(?<=[.!?])\s+/);
  if (threadLines.length > 1) {
    const threadText = threadLines
      .map((line, i) => `${i + 1}/${threadLines.length} ${line}`)
      .join('\n');
    variants.push({ text: threadText, type: 'thread' });
  } else {
    variants.push({ text: `Thread:\n${original}`, type: 'thread' });
  }

  // Short version (hook + truncated)
  const hook = original.split(/[.!?]/)[0].trim();
  if (hook.length > 10 && hook.length < 200) {
    variants.push({ text: `${hook}...`, type: 'short' });
  }

  return variants;
}
