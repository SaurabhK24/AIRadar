import axios from 'axios';

export async function sendDiscordNotification(content: string) {
  try {
    const response = await axios.post(
      process.env.DISCORD_WEBHOOK_URL!,
      { content },
      { headers: { 'Content-Type': 'application/json' } }
    );
    return `Discord notification sent at ${new Date().toISOString()}`;
  } catch (error) {
    throw new Error(`Discord notification failed: ${error}`);
  }
}