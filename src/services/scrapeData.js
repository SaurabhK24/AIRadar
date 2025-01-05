"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g = Object.create((typeof Iterator === "function" ? Iterator : Object).prototype);
    return g.next = verb(0), g["throw"] = verb(1), g["return"] = verb(2), typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.scrapeSources = scrapeSources;
var firecrawl_js_1 = require("@mendable/firecrawl-js");
var dotenv_1 = require("dotenv");
// Removed Together import
var zod_1 = require("zod");
// Removed zodToJsonSchema import since we no longer enforce JSON output via Together
dotenv_1.default.config();
// Initialize Firecrawl
var app = new firecrawl_js_1.default({ apiKey: process.env.FIRECRAWL_API_KEY });
// 1. Define the schema for our expected JSON
var StorySchema = zod_1.z.object({
    headline: zod_1.z.string().describe("Story or post headline"),
    link: zod_1.z.string().describe("A link to the post or story"),
    date_posted: zod_1.z.string().describe("The date the story or post was published"),
});
var StoriesSchema = zod_1.z.object({
    stories: zod_1.z.array(StorySchema).describe("A list of today's AI or LLM-related stories"),
});
function scrapeSources(sources) {
    return __awaiter(this, void 0, void 0, function () {
        var num_sources, combinedText, useTwitter, useScrape, _loop_1, _i, sources_1, source, rawStories;
        var _a;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    num_sources = sources.length;
                    console.log("Scraping ".concat(num_sources, " sources..."));
                    combinedText = { stories: [] };
                    useTwitter = true;
                    useScrape = true;
                    _loop_1 = function (source) {
                        var usernameMatch, username, query, encodedQuery, startTime_1, encodedStartTime, apiUrl, response, tweets, stories, currentDate, promptForFirecrawl, scrapeResult, todayStories;
                        var _c, _d;
                        return __generator(this, function (_e) {
                            switch (_e.label) {
                                case 0:
                                    if (!source.includes("x.com")) return [3 /*break*/, 4];
                                    if (!useTwitter) return [3 /*break*/, 3];
                                    usernameMatch = source.match(/x\.com\/([^\/]+)/);
                                    if (!usernameMatch) return [3 /*break*/, 3];
                                    username = usernameMatch[1];
                                    query = "from:".concat(username, " has:media -is:retweet -is:reply");
                                    encodedQuery = encodeURIComponent(query);
                                    startTime_1 = new Date(Date.now() - 24 * 60 * 60 * 1000).toISOString();
                                    encodedStartTime = encodeURIComponent(startTime_1);
                                    apiUrl = "https://api.x.com/2/tweets/search/recent?query=".concat(encodedQuery, "&max_results=10&start_time=").concat(encodedStartTime);
                                    return [4 /*yield*/, fetch(apiUrl, {
                                            headers: {
                                                Authorization: "Bearer ".concat(process.env.X_API_BEARER_TOKEN),
                                            },
                                        })];
                                case 1:
                                    response = _e.sent();
                                    if (!response.ok) {
                                        throw new Error("Failed to fetch tweets for ".concat(username, ": ").concat(response.statusText));
                                    }
                                    return [4 /*yield*/, response.json()];
                                case 2:
                                    tweets = _e.sent();
                                    if (((_a = tweets.meta) === null || _a === void 0 ? void 0 : _a.result_count) === 0) {
                                        console.log("No tweets found for username ".concat(username, "."));
                                    }
                                    else if (Array.isArray(tweets.data)) {
                                        console.log("Tweets found from username ".concat(username));
                                        stories = tweets.data.map(function (tweet) {
                                            return {
                                                headline: tweet.text,
                                                link: "https://x.com/i/status/".concat(tweet.id),
                                                date_posted: startTime_1,
                                            };
                                        });
                                        (_c = combinedText.stories).push.apply(_c, stories);
                                    }
                                    else {
                                        console.error("Expected tweets.data to be an array:", tweets.data);
                                    }
                                    _e.label = 3;
                                case 3: return [3 /*break*/, 6];
                                case 4:
                                    if (!useScrape) return [3 /*break*/, 6];
                                    currentDate = new Date().toLocaleDateString();
                                    promptForFirecrawl = "\n        Return only today's AI or LLM related story or post headlines and links in JSON format from the page content. \n        They must be posted today, ".concat(currentDate, ". The format should be:\n        {\n          \"stories\": [\n            {\n              \"headline\": \"headline1\",\n              \"link\": \"link1\",\n              \"date_posted\": \"YYYY-MM-DD\"\n            },\n            ...\n          ]\n        }\n        If there are no AI or LLM stories from today, return {\"stories\": []}.\n        \n        The source link is ").concat(source, ". \n        If a story link is not absolute, prepend ").concat(source, " to make it absolute. \n        Return only pure JSON in the specified format (no extra text, no markdown, no ```). \n        ");
                                    return [4 /*yield*/, app.extract([source], {
                                            prompt: promptForFirecrawl,
                                            schema: StoriesSchema, // The Zod schema for expected JSON
                                        })];
                                case 5:
                                    scrapeResult = _e.sent();
                                    if (!scrapeResult.success) {
                                        throw new Error("Failed to scrape: ".concat(scrapeResult.error));
                                    }
                                    todayStories = scrapeResult.data;
                                    console.log("Found ".concat(todayStories.stories.length, " stories from ").concat(source));
                                    (_d = combinedText.stories).push.apply(_d, todayStories.stories);
                                    _e.label = 6;
                                case 6: return [2 /*return*/];
                            }
                        });
                    };
                    _i = 0, sources_1 = sources;
                    _b.label = 1;
                case 1:
                    if (!(_i < sources_1.length)) return [3 /*break*/, 4];
                    source = sources_1[_i];
                    return [5 /*yield**/, _loop_1(source)];
                case 2:
                    _b.sent();
                    _b.label = 3;
                case 3:
                    _i++;
                    return [3 /*break*/, 1];
                case 4:
                    rawStories = combinedText.stories;
                    console.log(rawStories);
                    return [2 /*return*/, rawStories];
            }
        });
    });
}
