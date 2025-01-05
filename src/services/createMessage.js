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
exports.generateDraft = generateDraft;
var dotenv_1 = require("dotenv");
var together_ai_1 = require("together-ai");
var zod_1 = require("zod");
var zod_to_json_schema_1 = require("zod-to-json-schema");
dotenv_1.default.config();
/**
 * Generate a post draft with trending ideas based on raw tweets.
 */
function generateDraft(rawStories) {
    return __awaiter(this, void 0, void 0, function () {
        var together, DraftPostSchema, jsonSchema, currentDate, completion, rawJSON, parsedResponse, header, draft_post, error_1;
        var _a, _b, _c;
        return __generator(this, function (_d) {
            switch (_d.label) {
                case 0:
                    console.log("Generating a post draft with raw stories (".concat(rawStories.length, " characters)..."));
                    _d.label = 1;
                case 1:
                    _d.trys.push([1, 3, , 4]);
                    together = new together_ai_1.default();
                    DraftPostSchema = zod_1.z.object({
                        interestingTweetsOrStories: zod_1.z.array(zod_1.z.object({
                            story_or_tweet_link: zod_1.z.string().describe("The direct link to the tweet or story"),
                            description: zod_1.z.string().describe("A short sentence describing what's interesting about the tweet or story")
                        }))
                    }).describe("Draft post schema with interesting tweets or stories for AI developers.");
                    jsonSchema = (0, zod_to_json_schema_1.zodToJsonSchema)(DraftPostSchema, {
                        name: 'DraftPostSchema',
                        nameStrategy: 'title'
                    });
                    currentDate = new Date().toLocaleDateString('en-US', {
                        timeZone: 'America/New_York',
                        month: 'numeric',
                        day: 'numeric',
                    });
                    return [4 /*yield*/, together.chat.completions.create({
                            model: 'meta-llama/Meta-Llama-3.1-70B-Instruct-Turbo',
                            messages: [
                                {
                                    role: 'system',
                                    content: "You are given a list of raw AI and LLM-related tweets sourced from X/Twitter.\nOnly respond in valid JSON that matches the provided schema (no extra keys).\n",
                                },
                                {
                                    role: 'user',
                                    content: "Your task is to find interesting trends, launches, or interesting examples from the tweets or stories. \nFor each tweet or story, provide a 'story_or_tweet_link' and a one-sentence 'description'. \nReturn all relevant tweets or stories as separate objects. \nAim to pick at least 10 tweets or stories unless there are fewer than 10 available. If there are less than 10 tweets or stories, return ALL of them. Here are the raw tweets or stories you can pick from:\n\n".concat(rawStories, "\n\n")
                                },
                            ],
                            // Tell Together to strictly enforce JSON output that matches our schema
                            // @ts-ignore
                            response_format: { type: 'json_object', schema: jsonSchema },
                        })];
                case 2:
                    completion = _d.sent();
                    rawJSON = (_c = (_b = (_a = completion === null || completion === void 0 ? void 0 : completion.choices) === null || _a === void 0 ? void 0 : _a[0]) === null || _b === void 0 ? void 0 : _b.message) === null || _c === void 0 ? void 0 : _c.content;
                    if (!rawJSON) {
                        console.log("No JSON output returned from Together.");
                        return [2 /*return*/, "No output."];
                    }
                    console.log(rawJSON);
                    parsedResponse = JSON.parse(rawJSON);
                    header = "\uD83D\uDE80 AI and LLM Trends on X for ".concat(currentDate, "\n\n");
                    draft_post = header + parsedResponse.interestingTweetsOrStories
                        .map(function (tweetOrStory) { return "\u2022 ".concat(tweetOrStory.description, "\n  ").concat(tweetOrStory.story_or_tweet_link); })
                        .join('\n\n');
                    return [2 /*return*/, draft_post];
                case 3:
                    error_1 = _d.sent();
                    console.error("Error generating draft post", error_1);
                    return [2 /*return*/, "Error generating draft post."];
                case 4: return [2 /*return*/];
            }
        });
    });
}
