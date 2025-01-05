import dotenv from 'dotenv';
import { z } from 'zod';

dotenv.config();

// Schema definition for type safety
const StorySchema = z.object({
  headline: z.string().describe("Story or post headline"),
  link: z.string().describe("A link to the post or story"),
  date_posted: z.string().describe("The date the story or post was published"),
  engagement: z.object({
    likes: z.number().optional(),
    retweets: z.number().optional(),
    replies: z.number().optional(),
    views: z.number().optional(),
  }).optional(),
  author: z.string().optional(),
  source_platform: z.string().optional(),
});

const StoriesSchema = z.object({
  stories: z.array(StorySchema)
});

async function fetchTweets(username: string, startTime: string) {
  try {
    const query = `from:${username} 
      (AI OR "artificial intelligence" OR ML OR "machine learning" OR LLM OR AGI)
      -is:retweet -is:reply
      has:links
    `.replace(/\s+/g, ' ').trim();

    const params = new URLSearchParams({
      'query': query,
      'max_results': '100',
      'start_time': startTime,
      'tweet.fields': 'created_at,public_metrics,entities,context_annotations',
      'user.fields': 'username,name,verified',
      'expansions': 'author_id'
    });

    const apiUrl = `https://api.x.com/2/tweets/search/recent?${params}`;

    const response = await fetch(apiUrl, {
      headers: {
        Authorization: `Bearer ${process.env.X_API_BEARER_TOKEN}`,
      },
    });

    if (!response.ok) {
      console.error(`Error fetching tweets for ${username}: ${response.status} ${response.statusText}`);
      return [];
    }

    const tweets = await response.json();
    return tweets.data || [];

  } catch (error) {
    console.error(`Failed to fetch tweets for ${username}:`, error);
    return [];
  }
}

export async function scrapeSources(sources: string[]) {
  console.log(`Starting to scrape ${sources.length} sources...`);
  
  const startTime = new Date(Date.now() - 24 * 60 * 60 * 1000).toISOString();
  let combinedText: { stories: any[] } = { stories: [] };

  for (const source of sources) {
    try {
      if (source.includes("x.com")) {
        const usernameMatch = source.match(/x\.com\/([^\/]+)/);
        if (!usernameMatch) {
          console.log(`Invalid X/Twitter URL format: ${source}`);
          continue;
        }

        const username = usernameMatch[1];
        console.log(`Processing tweets for ${username}...`);

        const tweets = await fetchTweets(username, startTime);

        if (tweets.length > 0) {
          console.log(`Found ${tweets.length} tweets from ${username}`);
          const stories = tweets.map((tweet: any) => ({
            headline: tweet.text,
            link: `https://x.com/i/status/${tweet.id}`,
            date_posted: tweet.created_at || startTime,
            engagement: tweet.public_metrics ? {
              likes: tweet.public_metrics.like_count,
              retweets: tweet.public_metrics.retweet_count,
              replies: tweet.public_metrics.reply_count,
              views: tweet.public_metrics.impression_count
            } : undefined,
            author: username,
            source_platform: 'twitter'
          }));
          combinedText.stories.push(...stories);
        } else {
          console.log(`No relevant tweets found for ${username}`);
        }
      }
    } catch (error) {
      console.error(`Error processing source ${source}:`, error);
      continue; // Continue with next source even if one fails
    }
  }

  const rawStories = combinedText.stories;
  console.log(`Total stories found: ${rawStories.length}`);
  return rawStories;
}