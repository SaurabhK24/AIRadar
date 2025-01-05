import { handleScheduledTask } from "./controllers/scheduler"
import cron from 'node-cron';
import dotenv from 'dotenv';

dotenv.config();


async function main() {
  console.log(`Starting process to generate draft...`);
  await handleScheduledTask();
}



async function handleCron() {
  console.log(`Running scheduled task...`);
  await handleScheduledTask();
}



main();

// Uncomment for scheduled runs
cron.schedule(`10 23 * * *`, handleCron);

// Schedule the cron job to run at 10:30 PM every day

/**
 * cron.schedule(`45 22 * * *`, async () => {
  console.log(`Running scheduled task at 10:45 PM...`);
  await handleScheduledTask();
});
 */
