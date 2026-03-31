import axios from 'axios';
import { config } from '../config/env';

export async function postToTelegram(text: string): Promise<void> {
  if (!config.telegram?.botToken || !config.telegram?.chatId) {
    console.log(`[SIMULATED Telegram] Would post: ${text.slice(0, 50)}...`);
    return;
  }

  try {
    await axios.post(
      `https://api.telegram.org/bot${config.telegram.botToken}/sendMessage`,
      {
        chat_id: config.telegram.chatId,
        text: text,
        parse_mode: 'Markdown',
      }
    );

    console.log(`[Telegram] Posted: ${text.slice(0, 50)}...`);
  } catch (error: any) {
    console.error('[Telegram] Post failed:', error.message);
    throw error;
  }
}
