import axios from 'axios';
import { config } from '../config/env';

export async function postToDiscord(text: string): Promise<void> {
  if (!config.discord?.webhookUrl) {
    console.log(`[SIMULATED Discord] Would post: ${text.slice(0, 50)}...`);
    return;
  }

  try {
    await axios.post(config.discord.webhookUrl, {
      content: text,
    });

    console.log(`[Discord] Posted: ${text.slice(0, 50)}...`);
  } catch (error: any) {
    console.error('[Discord] Post failed:', error.message);
    throw error;
  }
}
