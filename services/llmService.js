import { Ollama } from "@langchain/ollama";
import dotenv from "dotenv";
dotenv.config();

export const llm = new Ollama({
  baseUrl: process.env.OLLAMA_BASE_URL,
  model: process.env.LLM_MODEL,
  temperature: 0.2,   // deterministic for extraction tasks
});