import { db } from '../db/client';
import { BrandConfig } from '../config/brands';

export async function createVariants(brand: BrandConfig): Promise<void> {
  const result = await db.query(
    "SELECT * FROM content WHERE status = 'approved' AND platform = $1",
    [brand.id]
  );

  const approved = result.rows;
  console.log(`  [${brand.name}] Creating variants for ${approved.length} approved items...`);

  for (const item of approved) {
    const variants = generateVariants(item.text);

    for (const variant of variants) {
      await db.query(
        'INSERT INTO content(text, variant, status, platform) VALUES($1, $2, $3, $4)',
        [variant.text, variant.type, 'queued', brand.id]
      );
    }

    await db.query(
      "UPDATE content SET status = 'multiplied' WHERE id = $1",
      [item.id]
    );

    console.log(`  [${brand.name}] Created ${variants.length} variants for content #${item.id}`);
  }

  console.log(`  [${brand.name}] Variant creation complete`);
}

interface Variant {
  text: string;
  type: string;
}

function generateVariants(original: string): Variant[] {
  const variants: Variant[] = [];

  // 1. Original
  variants.push({ text: original, type: 'original' });

  // 2. Hot take version
  if (!original.toLowerCase().startsWith('hot take')) {
    variants.push({ text: `Hot take: ${original}`, type: 'hot_take' });
  }

  // 3. Thread version
  const sentences = original.split(/(?<=[.!?])\s+/);
  if (sentences.length > 1) {
    const threadText = sentences
      .map((line, i) => `${i + 1}/${sentences.length} ${line}`)
      .join('\n');
    variants.push({ text: threadText, type: 'thread' });
  } else {
    variants.push({ text: `Thread:\n${original}`, type: 'thread' });
  }

  // 4. Short hook version
  const hook = original.split(/[.!?]/)[0].trim();
  if (hook.length > 10 && hook.length < 200) {
    variants.push({ text: `${hook}...`, type: 'short' });
  }

  return variants;
}
