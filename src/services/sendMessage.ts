import axios from 'axios';
import dotenv from 'dotenv';
dotenv.config();

export async function sendDraft(draft_post: string) {
  try {
   console.log("Yeeeee its working!!");  

    /**
     * import axios from 'axios';
import dotenv from 'dotenv';
dotenv.config();

export async function sendDraft(draft_post: string) {
  try {
    const response = await axios.post(
      process.env.SLACK_WEBHOOK_URL || '',
      {
        text: draft_post,
      },
      {
        headers: {
          'Content-Type': 'application/json',
        },
      }
    );

    return `Success sending draft to webhook at ${new Date().toISOString()}`;
  } catch (error) {
    console.log('error sending draft to webhook');
    console.log(error);
  }
}
     */

    return `Success sending draft to webhook at ${new Date().toISOString()}`;
  } catch (error) {
    console.log('error sending draft to webhook');
    console.log(error);
  }
}