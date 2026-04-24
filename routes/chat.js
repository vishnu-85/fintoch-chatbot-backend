import express from "express";
import { extractIntent } from "../services/intentService.js";
import { fetchDataByIntent } from "../services/dataService.js";
import { generateResponse } from "../services/responseService.js";
import memoryStore from "../utils/memory.js";

const router = express.Router();


router.get("/history", async (req, res) => {
  try {
    const { sessionId = "default" } = req.query;
    const history = memoryStore.getHistory(sessionId);
    res.json({data: history});
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to process query" });
  }
});

router.post("/chat", async (req, res) => {
  const { query, sessionId = "default" } = req.body;
  if (!query) return res.status(400).json({ error: "Query required" });

  try {
    // 1. Get conversation history (optional, for context)
    const history = memoryStore.getHistory(sessionId);

    // 2. Extract intent & filters
    const { category, filters, searchTerm } = await extractIntent(query, history);

    // 3. Fetch data from internal APIs/database
    const data = await fetchDataByIntent(category, filters, searchTerm);

    // 4. Generate final response (summary + links)
    const response = await generateResponse(query, category, data);
    
    // 5. Store in memory
    memoryStore.addEntry(sessionId, { user: query, assistant: response.summary });

    res.json(response);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to process query" });
  }
});

export default router;