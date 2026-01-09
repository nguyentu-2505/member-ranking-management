import { askAI } from "../services/aiService.js";

export async function chatWithAI(req, res) {
  try {
    const { message } = req.body;

    if (!message) {
      return res.status(400).json({ error: "Message is required" });
    }

    const aiReply = await askAI(message);

    res.json({
      reply: aiReply,
    });
  } catch (error) {
    console.error("Chat error:", error);
    res.status(500).json({ error: "Internal server error" });
  }
}
