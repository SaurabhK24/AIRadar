import dotenv from 'dotenv';
import Together from 'together-ai';
import { z } from 'zod';
import { zodToJsonSchema } from 'zod-to-json-schema';

dotenv.config();

const app = new crawl4AI({ apiKey: process.env.CRAWL4AI_API_KEY });

const ContentSchema = z.object({
  headline: z.string().describe("Content headline or title"),
  link: z.string().describe("Content URL"),
  date_posted: z.string().describe("Content publication date"),
});

const ContentCollectionSchema = z.object({
  stories: z.array(ContentSchema).describe(
    "Collection of today's AI/LLM-related content"
  ),
});

const jsonSchema = zodToJsonSchema(ContentCollectionSchema, {
  name: "ContentCollectionSchema",
  nameStrategy: "title",
});

export async function collectContent(sources: string[]) {
  console.log(`Collecting content from ${sources.length} sources...`);

  let collectedContent: { stories: any[] } = { stories: [] };
  const enableTwitter = true;
  const enableWebScraping = true;

  for (const source of sources) {
    if (source.includes("x.com")) {
      if (enableTwitter) {
        // Twitter collection logic (same as original)
        // ... [Twitter collection code remains the same]
      }
    } else {
      if (enableWebScraping) {
        try {
          const scrapeResponse = await app.scrapeUrl(source, {
            formats: ["markdown"],
          });

          if (!scrapeResponse.success) {
            throw new Error(`Scraping failed: ${scrapeResponse.error}`);
          }

          const together = new Together();
          const currentDate = new Date().toLocaleDateString();

          const contentAnalysis = await together.chat.completions.create({
            model: "meta-llama/Meta-Llama-3.1-70B-Instruct-Turbo",
            messages: [
              {
                role: "system",
                content: `Today is ${currentDate}. Analyze and extract today's AI/LLM related content in JSON format. Format: {"stories": [{"headline": "title", "link": "url", "date_posted": "date"}]}. Source: ${source}. Content:\n\n${scrapeResponse.markdown}\n\nJSON:`,
              },
            ],
            response_format: { type: "json_object", schema: jsonSchema },
          });

          const rawJSON = contentAnalysis?.choices?.[0]?.message?.content;
          if (rawJSON) {
            const todayContent = JSON.parse(rawJSON);
            console.log(`Found ${todayContent.stories.length} items from ${source}`);
            collectedContent.stories.push(...todayContent.stories);
          }
        } catch (error) {
          console.error(`Error collecting from ${source}:`, error);
        }
      }
    }
  }

  return collectedContent.stories;
}