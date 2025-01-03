import { handleScheduledTask } from "./controllers/scheduler"
import cron from 'node-cron';
import dotenv from 'dotenv';

dotenv.config();

async function main() {
  console.log(`Starting process to generate draft...`);
  await handleScheduledTask();
}
main();

// Uncomment for scheduled runs
// cron.schedule(`0 17 * * *`, handleCron);