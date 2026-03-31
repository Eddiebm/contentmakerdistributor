import axios from 'axios';
import { config } from '../config/env';

export async function postToLinkedIn(text: string): Promise<void> {
  if (!config.linkedin?.accessToken) {
    console.log(`[SIMULATED LinkedIn] Would post: ${text.slice(0, 50)}...`);
    return;
  }

  try {
    const response = await axios.post(
      'https://api.linkedin.com/v2/ugcPosts',
      {
        author: `urn:li:person:${config.linkedin.personId}`,
        lifecycleState: 'PUBLISHED',
        specificContent: {
          'com.linkedin.ugc.ShareContent': {
            shareCommentary: { text: text },
            shareMediaCategory: 'NONE',
          },
        },
        visibility: {
          'com.linkedin.ugc.MemberNetworkVisibility': 'PUBLIC',
        },
      },
      {
        headers: {
          'Authorization': `Bearer ${config.linkedin.accessToken}`,
          'X-Restli-Protocol-Version': '2.0.0',
          'Content-Type': 'application/json',
        },
      }
    );

    console.log(`[LinkedIn] Posted: ${text.slice(0, 50)}...`);
  } catch (error: any) {
    console.error('[LinkedIn] Post failed:', error.message);
    throw error;
  }
}
