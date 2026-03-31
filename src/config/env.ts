import dotenv from 'dotenv';
dotenv.config();

export const config = {
  openaiApiKey: process.env.OPENAI_API_KEY || '',
  redisUrl: process.env.REDIS_URL || 'redis://127.0.0.1:6379',
  databaseUrl: process.env.DATABASE_URL || '',

  // X (Twitter)
  x: {
    apiKey: process.env.X_API_KEY || '',
    apiSecret: process.env.X_API_SECRET || '',
    accessToken: process.env.X_ACCESS_TOKEN || '',
    accessSecret: process.env.X_ACCESS_SECRET || '',
  },

  // Bluesky
  bluesky: {
    identifier: process.env.BLUESKY_IDENTIFIER || '',
    password: process.env.BLUESKY_PASSWORD || '',
  },

  // Mastodon
  mastodon: {
    instance: process.env.MASTODON_INSTANCE || '',
    token: process.env.MASTODON_TOKEN || '',
  },

  // LinkedIn
  linkedin: {
    accessToken: process.env.LINKEDIN_ACCESS_TOKEN || '',
    personId: process.env.LINKEDIN_PERSON_ID || '',
  },

  // Threads (Meta)
  threads: {
    accessToken: process.env.THREADS_ACCESS_TOKEN || '',
    userId: process.env.THREADS_USER_ID || '',
  },

  // Telegram
  telegram: {
    botToken: process.env.TELEGRAM_BOT_TOKEN || '',
    chatId: process.env.TELEGRAM_CHAT_ID || '',
  },

  // Discord
  discord: {
    webhookUrl: process.env.DISCORD_WEBHOOK_URL || '',
  },
};
