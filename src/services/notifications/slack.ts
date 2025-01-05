import axios from 'axios';

export async function sendSlackNotification(content: string) {
  try {
    const response = await axios.post(
      process.env.SLACK_WEBHOOK_URL!,
      { text: content },
      { headers: { 'Content-Type': 'application/json' } }
    );
    return `Slack notification sent at ${new Date().toISOString()}`;
  } catch (error) {
    throw new Error(`Slack notification failed: ${error}`);
  }
}