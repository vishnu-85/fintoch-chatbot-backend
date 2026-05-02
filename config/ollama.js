import { ChatOllama  } from "@langchain/ollama";
import dotenv from "dotenv";
dotenv.config();

export const llm = new ChatOllama ({
  baseUrl: process.env.OLLAMA_BASE_URL,
  model: process.env.LLM_MODEL,
  temperature: 0.7,   // deterministic for extraction tasks
  
});