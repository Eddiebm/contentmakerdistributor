import axios from 'axios';
import { config } from '../config/env';

export interface BlueskyCredentials {
  identifier: string; // Usually your email or @handle
  password: string;   // App password from Bluesky
}

let session: { accessJwt: string; did: string } | null = null;

export async function loginToBluesky(): Promise<void> {
  if (!config.bluesky?.identifier || !config.bluesky?.password) {
    console.log('[Bluesky] No credentials configured');
    return;
  }

  try {
    const response = await axios.post('https://bsky.social/xrpc/com.atproto.server.createSession', {
      identifier: config.bluesky.identifier,
      password: config.bluesky.password,
    });

    session = {
      accessJwt: response.data.accessJwt,
      did: response.data.did,
    };

    console.log('[Bluesky] Logged in successfully');
  } catch (error: any) {
    console.error('[Bluesky] Login failed:', error.message);
    throw error;
  }
}

export async function postToBluesky(text: string): Promise<void> {
  if (!session) {
    await loginToBluesky();
  }

  if (!session) {
    console.log(`[SIMULATED Bluesky] Would post: ${text.slice(0, 50)}...`);
    return;
  }

  try {
    const response = await axios.post('https://bsky.social/xrpc/com.atproto.server.createSession', {
      text: text,
    }, {
      headers: {
        'Authorization': `Bearer ${session.accessJwt}`,
        'Content-Type': 'application/json',
      },
    });

    console.log(`[Bluesky] Posted: ${text.slice(0, 50)}...`);
  } catch (error: any) {
    console.error('[Bluesky] Post failed:', error.message);
    throw error;
  }
}
