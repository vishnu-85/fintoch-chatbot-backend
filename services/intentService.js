import { llm } from "./llmService.js";
import { ChatPromptTemplate } from "@langchain/core/prompts";
import { StringOutputParser } from "@langchain/core/output_parsers";

const intentPrompt = ChatPromptTemplate.fromMessages([
  ["system", `You are a financial classifier. Output ONLY JSON: {{"category": "stock|fund|market|industry", "filters": {{}}, "searchTerm": ""}}. Do not include any extra text.`],
  ["human", "Query: {query}\nHistory: {history}"],
]);
const chain = intentPrompt.pipe(llm).pipe(new StringOutputParser());

export async function extractIntent(query, history = []) {
  try {
    const historyText = history.map(h => `User: ${h.user} | Bot: ${h.assistant}`).join("\n");
    const raw = await chain.invoke({ query, history: historyText || "None" });
      
    // Clean markdown code fences
    const cleaned = raw.replace(/```json\n?/g, "").replace(/```\n?/g, "").trim();
    const parsed = JSON.parse(cleaned);
    
    // Validate required fields
    if (!parsed.category || !["stock","fund","market","industry"].includes(parsed.category)) {
      throw new Error("Invalid category");
    }
    return {
      category: parsed.category,
      filters: parsed.filters || {},
      searchTerm: parsed.searchTerm || query
    };
  } catch (err) {
    console.warn("Intent extraction failed, using fallback", err);
    return { category: "stock", filters: {}, searchTerm: query };
  }
}