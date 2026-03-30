import OpenAI from 'openai';
import { db } from '../db/client';
import { config } from '../config/env';

const openai = new OpenAI({ apiKey: config.openaiApiKey });

export async function runMACE(): Promise<void> {
  const prompt = `Generate 3 social media posts following these principles:
1. BUSOS (Bold, Unique, Surprising, Outstanding, Shareable)
2. COARE (Clear, Original, Authentic, Relevant, Engaging)
3. Thought leadership content

Each post should have:
- A strong hook in the first line
- Clear value proposition
- Call to action or engagement prompt
- Maximum 280 characters

Format as numbered posts (1, 2, 3).`;

  try {
    const completion = await openai.chat.completions.create({
      model: 'gpt-4o-mini',
      messages: [{ role: 'user', content: prompt }],
      max_tokens: 500,
      temperature: 0.8,
    });

    const content = completion.choices[0]?.message?.content || '';

    // Parse generated posts (simple extraction)
    const posts = content
      .split(/\d+\.\s+/)
      .filter(p => p.trim().length > 10)
      .slice(0, 3);

    for (const post of posts) {
      const cleanPost = post.trim().replace(/^["']|["']$/g, '');
      await db.query(
        'INSERT INTO content(text, status) VALUES($1, $2)',
        [cleanPost, 'draft']
      );
      console.log(`Created draft: ${cleanPost.slice(0, 50)}...`);
    }

    console.log(`MACE generated ${posts.length} content drafts`);
  } catch (error: any) {
    console.error('MACE generation failed:', error.message);
    throw error;
  }
}
