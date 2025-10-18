import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { generateQuestionsRequestSchema, type GenerateQuestionsResponse } from "@shared/schema";

const OPENROUTER_API_KEY = process.env.OPENROUTER_API_KEY;

async function generateQuizQuestions(
  category: string,
  questionCount: number
): Promise<GenerateQuestionsResponse> {
  if (!OPENROUTER_API_KEY) {
    throw new Error("OPENROUTER_API_KEY is not configured");
  }

  const systemPrompt = `You are a quiz question generator. Generate EXACTLY ${questionCount} multiple-choice questions about ${category}.

CRITICAL REQUIREMENTS:
1. Return ONLY valid JSON, no markdown, no code blocks, no explanations
2. Each question must have exactly 4 options
3. Exactly ONE option must be marked as correct (isCorrect: true)
4. The other 3 options must be marked as incorrect (isCorrect: false)
5. Questions should be challenging but fair
6. Options should be plausible but clearly distinguishable

Response format:
{
  "questions": [
    {
      "question": "Your question text here?",
      "options": [
        {"text": "First option", "isCorrect": false},
        {"text": "Second option", "isCorrect": true},
        {"text": "Third option", "isCorrect": false},
        {"text": "Fourth option", "isCorrect": false}
      ]
    }
  ]
}`;

  const userPrompt = `Generate ${questionCount} quiz questions about ${category}. Return only the JSON response with no additional text.`;

  try {
    const response = await fetch("https://openrouter.ai/api/v1/chat/completions", {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${OPENROUTER_API_KEY}`,
        "Content-Type": "application/json",
        "HTTP-Referer": "https://ai-quiz-master.replit.app",
        "X-Title": "AI Quiz Master",
      },
      body: JSON.stringify({
        model: "deepseek/deepseek-chat",
        messages: [
          {
            role: "system",
            content: systemPrompt,
          },
          {
            role: "user",
            content: userPrompt,
          },
        ],
        temperature: 0.7,
        max_tokens: 4000,
      }),
    });

    if (!response.ok) {
      const errorText = await response.text();
      console.error("OpenRouter API error:", response.status, errorText);
      throw new Error(`OpenRouter API request failed: ${response.status}`);
    }

    const data = await response.json();
    const content = data.choices?.[0]?.message?.content;

    if (!content) {
      throw new Error("No content in OpenRouter response");
    }

    // Parse the JSON response, handling potential markdown code blocks
    let jsonContent = content.trim();
    
    // Remove markdown code blocks if present
    if (jsonContent.startsWith("```json")) {
      jsonContent = jsonContent.replace(/^```json\s*/, "").replace(/\s*```$/, "");
    } else if (jsonContent.startsWith("```")) {
      jsonContent = jsonContent.replace(/^```\s*/, "").replace(/\s*```$/, "");
    }

    const parsedData = JSON.parse(jsonContent);

    // Validate the response structure
    if (!parsedData.questions || !Array.isArray(parsedData.questions)) {
      throw new Error("Invalid response format: missing questions array");
    }

    // Validate each question
    parsedData.questions.forEach((q: any, index: number) => {
      if (!q.question || typeof q.question !== "string") {
        throw new Error(`Question ${index + 1}: Invalid question text`);
      }

      if (!Array.isArray(q.options) || q.options.length !== 4) {
        throw new Error(`Question ${index + 1}: Must have exactly 4 options`);
      }

      const correctCount = q.options.filter((opt: any) => opt.isCorrect).length;
      if (correctCount !== 1) {
        throw new Error(`Question ${index + 1}: Must have exactly 1 correct answer, found ${correctCount}`);
      }

      q.options.forEach((opt: any, optIndex: number) => {
        if (!opt.text || typeof opt.text !== "string") {
          throw new Error(`Question ${index + 1}, Option ${optIndex + 1}: Invalid option text`);
        }
        if (typeof opt.isCorrect !== "boolean") {
          throw new Error(`Question ${index + 1}, Option ${optIndex + 1}: isCorrect must be boolean`);
        }
      });
    });

    return parsedData as GenerateQuestionsResponse;
  } catch (error) {
    console.error("Error generating quiz questions:", error);
    throw error;
  }
}

export async function registerRoutes(app: Express): Promise<Server> {
  // Generate quiz questions endpoint
  app.post("/api/quiz/generate", async (req, res) => {
    try {
      const validatedData = generateQuestionsRequestSchema.parse(req.body);
      
      const result = await generateQuizQuestions(
        validatedData.category,
        validatedData.questionCount
      );

      res.json(result);
    } catch (error) {
      console.error("Quiz generation error:", error);
      
      if (error instanceof Error) {
        res.status(500).json({
          error: "Failed to generate quiz questions",
          message: error.message,
        });
      } else {
        res.status(500).json({
          error: "Failed to generate quiz questions",
        });
      }
    }
  });

  const httpServer = createServer(app);
  return httpServer;
}
