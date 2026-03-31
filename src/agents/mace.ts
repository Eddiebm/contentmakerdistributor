import OpenAI from 'openai';
import { db } from '../db/client';
import { config } from '../config/env';
import { BrandConfig } from '../config/brands';

const openai = new OpenAI({ apiKey: config.openaiApiKey });

export async function runMACE(brand: BrandConfig): Promise<void> {
  const topicsText = brand.topics.map((t, i) => `${i + 1}. ${t}`).join('\n');

  const prompt = `You are a social media content writer for "${brand.name}".

Brand description: ${brand.description}
Target audience: ${brand.audience}
Tone and style: ${brand.tone}
Website: ${brand.url}

Generate 3 high-quality social media posts for this brand. Each post must:
- Follow the BUSOS principles: Bold, Unique, Surprising, Outstanding, Shareable
- Be written in the brand's specific tone: ${brand.tone}
- Be directly relevant to this audience: ${brand.audience}
- Focus on one of these topics (rotate across the 3 posts):
${topicsText}
- Have a strong hook in the first line
- Deliver clear value or insight
- End with a subtle call to action or engagement prompt
- Be maximum 280 characters

${brand.cta ? `Optional CTA to weave in naturally: "${brand.cta}"` : ''}

Format your response as exactly 3 numbered posts like this:
1. [post text]
2. [post text]
3. [post text]

Write only the posts. No explanations, no headers.`;

  try {
    const completion = await openai.chat.completions.create({
      model: 'gpt-4.1-mini',
      messages: [{ role: 'user', content: prompt }],
      max_tokens: 600,
      temperature: 0.85,
    });

    const content = completion.choices[0]?.message?.content || '';

    // Parse the numbered posts
    const posts = content
      .split(/\n?\d+\.\s+/)
      .filter(p => p.trim().length > 10)
      .slice(0, 3);

    for (const post of posts) {
      const cleanPost = post.trim().replace(/^["']|["']$/g, '').trim();
      await db.query(
        'INSERT INTO content(text, status, platform) VALUES($1, $2, $3)',
        [cleanPost, 'draft', brand.id]
      );
      console.log(`  [${brand.name}] Draft created: ${cleanPost.slice(0, 60)}...`);
    }

    console.log(`  [${brand.name}] MACE generated ${posts.length} content drafts`);
  } catch (error: any) {
    console.error(`  [${brand.name}] MACE generation failed:`, error.message);
    throw error;
  }
}
