import type { Express } from "express";

const OPENROUTER_URL = "https://openrouter.ai/api/v1/chat/completions";

function getApiKey() {
  const key = process.env.OPENROUTER_API_KEY;
  if (!key) {
    console.error("OPENROUTER_API_KEY is not set in environment");
  }
  return key;
}

function extractJSON(content: string) {
  // Remove markdown code blocks if present
  let cleaned = content.trim();
  
  // Remove ```json and ``` markers
  if (cleaned.startsWith("```json")) {
    cleaned = cleaned.replace(/^```json\s*/, "").replace(/```\s*$/, "");
  } else if (cleaned.startsWith("```")) {
    cleaned = cleaned.replace(/^```\s*/, "").replace(/```\s*$/, "");
  }
  
  return JSON.parse(cleaned.trim());
}

export function registerRoutes(app: Express) {
  // Generate quiz questions
  app.post("/api/quiz/generate", async (req, res) => {
    try {
      const { category, questionCount = 10 } = req.body;
      
      if (!category || typeof category !== "string") {
        return res.status(400).json({ error: "Category is required" });
      }

      const apiKey = getApiKey();
      if (!apiKey) {
        return res.status(500).json({ error: "API key not configured" });
      }

      const prompt = `Generate ${questionCount} multiple-choice quiz questions about ${category}. Each question must have exactly 4 options labeled A, B, C, D and one correct answer. Respond ONLY with valid JSON in this exact format: {"questions": [{"question": "text", "options": {"A": "text", "B": "text", "C": "text", "D": "text"}, "correctAnswer": "A"}]}`;

      const response = await fetch(OPENROUTER_URL, {
        method: "POST",
        headers: {
          "Authorization": `Bearer ${apiKey}`,
          "HTTP-Referer": "http://localhost:3000",
          "X-Title": "QuizWizAI",
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          model: "deepseek/deepseek-chat",
          messages: [{ role: "user", content: prompt }],
        }),
      });

      if (!response.ok) {
        const errorText = await response.text();
        console.error("OpenRouter API Error:", response.status, errorText);
        throw new Error(`OpenRouter API error: ${response.statusText}`);
      }

      const data = await response.json();
      const content = data.choices[0].message.content;
      const aiResponse = extractJSON(content);

      // Transform AI response to match frontend format
      const transformedQuestions = aiResponse.questions.map((q: any) => ({
        question: q.question,
        options: [
          { text: q.options.A, isCorrect: q.correctAnswer === "A" },
          { text: q.options.B, isCorrect: q.correctAnswer === "B" },
          { text: q.options.C, isCorrect: q.correctAnswer === "C" },
          { text: q.options.D, isCorrect: q.correctAnswer === "D" },
        ],
      }));

      res.json({ questions: transformedQuestions });
    } catch (error) {
      console.error("Error generating questions:", error);
      res.status(500).json({ error: "Failed to generate questions" });
    }
  });

  // Analyze quiz performance
  app.post("/api/analyze", async (req, res) => {
    try {
      const { topic, answers, questions } = req.body;

      if (!topic || !answers || !questions) {
        return res.status(400).json({ error: "Missing required fields" });
      }

      const apiKey = getApiKey();
      if (!apiKey) {
        return res.status(500).json({ error: "API key not configured" });
      }

      const prompt = `Analyze this quiz performance for topic "${topic}". Questions and user answers: ${JSON.stringify({ questions, answers })}. Return ONLY valid JSON in this exact format: {"score": number, "totalQuestions": number, "strengths": ["text"], "weaknesses": ["text"], "suggestions": ["text"], "feedback": "motivational text"}`;

      const response = await fetch(OPENROUTER_URL, {
        method: "POST",
        headers: {
          "Authorization": `Bearer ${apiKey}`,
          "HTTP-Referer": "http://localhost:3000",
          "X-Title": "QuizWizAI",
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          model: "deepseek/deepseek-chat",
          messages: [{ role: "user", content: prompt }],
        }),
      });

      if (!response.ok) {
        const errorText = await response.text();
        console.error("OpenRouter API Error:", response.status, errorText);
        throw new Error(`OpenRouter API error: ${response.statusText}`);
      }

      const data = await response.json();
      const content = data.choices[0].message.content;
      const analysis = extractJSON(content);

      res.json(analysis);
    } catch (error) {
      console.error("Error analyzing quiz:", error);
      res.status(500).json({ error: "Failed to analyze quiz" });
    }
  });

  // Get quiz history (in-memory for now)
  app.get("/api/history", async (_req, res) => {
    res.json([]);
  });
}
