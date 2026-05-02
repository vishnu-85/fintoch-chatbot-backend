import express from "express";
import { PromptTemplate } from "@langchain/core/prompts";
import { StringOutputParser } from "@langchain/core/output_parsers";
import { llm } from "../config/ollama.js";

const router = express.Router();


router.get("/chat", async (req, res) => {

  try {
    const wordlimit = 50;
    const {course } = req.query;

    const promptTemplate = new PromptTemplate({
      template: "What is {course}? Limit the output to {wordlimit} words.",
      inputVariables: ["course", "wordlimit"],
    });

    // ✅ Correct: pipe template directly
    const chain = promptTemplate.pipe(llm);

    const answer = await chain.invoke({
      course,
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