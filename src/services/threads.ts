import axios from 'axios';
import { config } from '../config/env';

export async function postToThreads(text: string): Promise<void> {
  if (!config.threads?.accessToken) {
    console.log(`[SIMULATED Threads] Would post: ${text.slice(0, 50)}...`);
    return;
  }

  try {
    // Step 1: Create a media container
    const createResponse = await axios.post(
      `https://graph.threads.net/v1.0/${config.threads.userId}/threads`,
      null,
      {
        params: {
          media_type: 'TEXT',
          text: text,
          access_token: config.threads.accessToken,
        },
      }
    );

    const creationId = createResponse.data.id;

    // Step 2: Publish the container
    await axios.post(
      `https://graph.threads.net/v1.0/${config.threads.userId}/threads_publish`,
      null,
      {
        params: {
          creation_id: creationId,
          access_token: config.threads.accessToken,
        },
      }
    );

    console.log(`[Threads] Posted: ${text.slice(0, 50)}...`);
  } catch (error: any) {
    console.error('[Threads] Post failed:', error.message);
    throw error;
  }
}
