import axios from 'axios';
import { config } from '../config/env';

export async function postToMastodon(text: string): Promise<void> {
  if (!config.mastodon?.instance || !config.mastodon?.token) {
    console.log(`[SIMULATED Mastodon] Would post: ${text.slice(0, 50)}...`);
    return;
  }

  try {
    const response = await axios.post(
      `${config.mastodon.instance}/api/v1/statuses`,
      { status: text },
      {
        headers: {
          'Authorization': `Bearer ${config.mastodon.token}`,
          'Content-Type': 'application/json',
        },
      }
    );

    console.log(`[Mastodon] Posted: ${text.slice(0, 50)}...`);
  } catch (error: any) {
    console.error('[Mastodon] Post failed:', error.message);
    throw error;
  }
}
