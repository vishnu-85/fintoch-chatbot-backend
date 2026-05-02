import express from "express";
import { PromptTemplate } from "@langchain/core/prompts";
import { StringOutputParser } from "@langchain/core/output_parsers";
import { llm } from "../config/ollama.js";

const router = express.Router();


router.post("/chat", async (req, res) => {

  try {
    const wordlimit = 50;
    const {query, sessionId } = req.body;

    const promptTemplate = new PromptTemplate({
      template: "What is {query}? Limit the output to {wordlimit} words.",
      inputVariables: ["query", "wordlimit"],
    });

    // ✅ Correct: pipe template directly
    const chain = promptTemplate.pipe(llm);

    const answer = await chain.invoke({
      query,
      wordlimit
    });

    console.log("answer:", answer.content);

    res.status(200).json({ data: answer.content });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to process query" });
  }
});



export default router;