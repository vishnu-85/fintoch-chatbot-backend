import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import chatRoutes from "./routes/chat.js";

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

app.use("/api", chatRoutes);

// Optional: direct mock endpoints for frontend
app.get("/api/hello", (req, res) => {
  // mocked - in real app call service
  res.json([{ message: "Hello, how are you" }]);
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));