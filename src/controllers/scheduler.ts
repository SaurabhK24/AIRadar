import { scrapeSources } from '../services/scrapeData';  // Updated from scrapeData
import { getDataSources } from '../services/dataSources';  // This one was already correct
import { generateDraft } from '../services/createMessage';  // This one was already correct
import { sendNotifications } from '../services/notifications';  // This one was already correct
import { testScrape } from '../services/scraperTest';
import twilio from "twilio";
import dotenv from 'dotenv';

dotenv.config();

const accountSid = process.env.TWILIO_ACCOUNT_SID;
const authToken = process.env.TWILIO_AUTH_TOKEN;
const client = twilio(accountSid, authToken);


async function createCall() {
  const call = await client.calls.create({
    from: "+18339011746",
    to: "+15717230095",
    url: "https://demo.twilio.com/welcome/voice/",
  });

  console.log(call.sid);
}

export const handleScheduledTask = async (): Promise<void> => {
  try {
    
    //await testScrape();
    const dataSources = await getDataSources();
    console.log(dataSources)
    const rawContent = await scrapeSources(dataSources!); 
    //const rawContentString = JSON.stringify(rawContent);
    //const analysis = await generateDraft(rawContentString);
    //const result = await sendNotifications(analysis);
    //console.log(result, "type shit!");
   
    
    //createCall();

  } catch (error) {
    console.error(error);
  }
}

