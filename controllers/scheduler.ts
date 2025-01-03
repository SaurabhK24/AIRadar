//import { collectContent } from '../services/scrapeData';  // Updated from scrapeData
import { getDataSources } from '../services/dataSources';  // This one was already correct
import { analyzeContent } from '../services/analyzeContent';  // This one was already correct
import { sendNotifications } from '../services/notifications';  // This one was already correct

export const handleScheduledTask = async (): Promise<void> => {
  try {
    const dataSources = await getDataSources();
    const rawContent = await collectContent(dataSources!); //broken
    const rawContentString = JSON.stringify(rawContent);
    const analysis = await analyzeContent(rawContentString);
    const result = await sendNotifications(analysis!);
    console.log(result);
  } catch (error) {
    console.error(error);
  }
}