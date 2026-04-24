import { llm } from "./llmService.js";
import { ChatPromptTemplate } from "@langchain/core/prompts";
import { StringOutputParser } from "@langchain/core/output_parsers";

const summaryPrompt = ChatPromptTemplate.fromMessages([
  ["system", `You are a JSON‑only financial assistant. Your entire response must be a single, valid JSON object with exactly three fields: "summary", "data", "links". Do not include any text before or after the JSON, no markdown. Now return only valid JSON for the following query.`],
  ["human", `User query: {query}
    Category: {category}
    Fetched data (JSON array): {data}`]
]);
const chain = summaryPrompt.pipe(llm).pipe(new StringOutputParser());

export async function generateResponse(query, category, data) {
   const dataSlice = data.slice(0, 5);
  // Directly invoke the chain with the required variables
  const responseText = await chain.invoke({
    query,
    category,
    data: JSON.stringify(dataSlice, null, 2)
  });
  
  try {
    // Clean potential markdown code fences
    const cleaned = responseText.replace(/```json\n?/g, "").replace(/```\n?/g, "");
    return JSON.parse(cleaned);
  } catch (e) {
    console.error("Failed to parse LLM response, using fallback", e, responseText);
    return {
      summary: `Found ${data.length} results for your query.`,
      data: data.slice(0, 5),
      links: data.slice(0, 3).map(item => ({
        label: `View ${item.symbol || item.name || "details"}`,
        url: `/${category}/${item.symbol || item.id || item.name}`
      }))
    };
  }
}