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
exports.getDataSources = getDataSources;
var dotenv_1 = require("dotenv");
dotenv_1.default.config();
function getDataSources() {
    return __awaiter(this, void 0, void 0, function () {
        var sources;
        return __generator(this, function (_a) {
            try {
                console.log("Fetching AI/LLM data sources...");
                sources = [
                    { identifier: "https://x.com/OpenAIDevs" },
                    { identifier: "https://x.com/OpenAI" },
                    { identifier: "https://x.com/AnthropicAI" },
                    { identifier: "https://x.com/AIatMeta" },
                    { identifier: "https://x.com/skirano" },
                    { identifier: "https://x.com/xai" },
                    { identifier: "https://x.com/alexalbert__" },
                    { identifier: "https://x.com/rauchg" },
                    { identifier: "https://x.com/amasad" },
                    { identifier: "https://x.com/leeerob" },
                    { identifier: "https://x.com/nutlope" },
                    { identifier: "https://x.com/akshay_pachaar" },
                    { identifier: "https://x.com/replit" },
                    { identifier: "https://x.com/firecrawl_dev" },
                    { identifier: "https://x.com/v0" },
                    { identifier: "https://x.com/aisdk" },
                    { identifier: "https://x.com/googleaidevs" },
                    { identifier: "https://x.com/nickscamara_" },
                    { identifier: "https://x.com/ericciarla" },
                    { identifier: "https://x.com/CalebPeffer" },
                    { identifier: "https://buttondown.com/ainews" },
                    { identifier: "https://x.com/EHuanglu" },
                    { identifier: "https://x.com/rezkhere" },
                    { identifier: "https://x.com/nickscamara_" },
                    { identifier: "https://x.com/ericciarla" },
                    { identifier: "https://x.com/CalebPeffer" },
                    { identifier: "https://buttondown.com/ainews" },
                ];
                return [2 /*return*/, sources.map(function (source) { return source.identifier; })];
            }
            catch (error) {
                console.error("Error fetching data sources:", error);
                throw error;
            }
            return [2 /*return*/];
        });
    });
}
