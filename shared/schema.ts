import { pgTable, text, serial, integer, timestamp } from "drizzle-orm/pg-core";
import { createInsertSchema, createSelectSchema } from "drizzle-zod";
import { z } from "zod";

// Quiz categories
export const quizCategories = ["VLSI", "Verilog", "Digital Electronics"] as const;
export type QuizCategory = typeof quizCategories[number];

// Quiz types
export interface QuizQuestion {
  question: string;
  options: Array<{
    text: string;
    isCorrect: boolean;
  }>;
}

export interface UserAnswer {
  questionIndex: number;
  selectedOptionIndex: number;
}

export interface QuizConfig {
  category: QuizCategory;
  timer: number;
  questionCount: number;
}

export interface QuizAnalysis {
  score: number;
  totalQuestions: number;
  strengths: string[];
  weaknesses: string[];
  suggestions: string[];
  feedback: string;
}

// Database schema
export const quizHistory = pgTable("quiz_history", {
  id: serial("id").primaryKey(),
  topic: text("topic").notNull(),
  score: integer("score").notNull(),
  totalQuestions: integer("total_questions").notNull(),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

export const insertQuizHistorySchema = createInsertSchema(quizHistory);
export const selectQuizHistorySchema = createSelectSchema(quizHistory);
