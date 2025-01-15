import FirecrawlApp, { ScrapeResponse } from '@mendable/firecrawl-js';

if (!process.env.FIRECRAWL_API_KEY) {
  throw new Error('Missing Firecrawl API Key');
}

const app = new FirecrawlApp({
  apiKey: process.env.FIRECRAWL_API_KEY
});

// Function to test scrape functionality
export async function testScrape() {
    try {
      // Scrape a website:
      console.log("Starting scraper")
      const scrapeResult = await app.scrapeUrl('https://crustdata.notion.site/Crustdata-Discovery-And-Enrichment-API-c66d5236e8ea40df8af114f6d447ab48', { 
        formats: ['markdown', 'html'], 
        actions: [
          { type: "wait", milliseconds: 2000 },
          { type: "click", selector: "textarea[title=\"Search\"]" },
          { type: "wait", milliseconds: 2000 },
          { type: "write", text: "firecrawl" },
          { type: "wait", milliseconds: 2000 },
          { type: "press", key: "ENTER" },
          { type: "wait", milliseconds: 3000 },
          { type: "click", selector: "h3" },
          { type: "scrape" },
          {"type": "screenshot"}
        ]
      }) as ScrapeResponse;
  
      if (!scrapeResult.success) {
        throw new Error(`Failed to scrape: ${scrapeResult.error}`)
      }
  
      console.log(scrapeResult);
    } catch (error) {
      console.error('Error during scrape test:', error);
    }
}

  
  
