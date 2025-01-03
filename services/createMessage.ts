import dotenv from 'dotenv';
import Together from 'together-ai';
import { z } from 'zod';
import { zodToJsonSchema } from 'zod-to-json-schema';

dotenv.config();

const AnalysisSchema = z.object({
  relevantContent: z.array(z.object({
    content_link: z.string().describe("Direct link to the content"),
    insight: z.string().describe("Analysis of why this content is significant")
  }))
}).describe("Content analysis schema for AI/LLM trends");

export async function analyzeContent(rawContent: string) {
  console.log(`Analyzing content (${rawContent.length} characters)...`);

  try {
    const together = new Together();
    const jsonSchema = zodToJsonSchema(AnalysisSchema, {
      name: 'AnalysisSchema',
      nameStrategy: 'title'
    });

    const currentDate = new Date().toLocaleDateString('en-US', {
      timeZone: 'America/New_York',
      month: 'numeric',
      day: 'numeric',
    });

    const analysis = await together.chat.completions.create({
      model: 'meta-llama/Meta-Llama-3.1-70B-Instruct-Turbo',
      messages: [
        {
          role: 'system',
          content: `Analyze AI and LLM-related content to identify significant trends and developments.`
        },
        {
          role: 'user',
          content: `Analyze this content and identify key trends and insights. Provide analysis for at least 10 items if available:\n\n${rawContent}\n\n`
        },
      ],
      response_format: { type: 'json_object', schema: jsonSchema },
    });

    const rawJSON = analysis?.choices?.[0]?.message?.content;
    if (!rawJSON) {
      console.log("No analysis output generated.");
      return "Analysis unavailable.";
    }

    const parsedAnalysis = JSON.parse(rawJSON);

    // Format the analysis
    const header = `📊 AI/LLM Trend Analysis - ${currentDate}\n\n`;
    const formattedAnalysis = header + parsedAnalysis.relevantContent
      .map((item: any) => `• ${item.insight}\n  ${item.content_link}`)
      .join('\n\n');

    return formattedAnalysis;

  } catch (error) {
    console.error("Error analyzing content:", error);
    throw error;
  }
}