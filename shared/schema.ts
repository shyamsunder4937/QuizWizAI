import { z } from "zod";

export const quizCategories = ["VLSI", "React", "Digital Signals"] as const;
export type QuizCategory = typeof quizCategories[number];

export const quizConfigSchema = z.object({
  category: z.enum(quizCategories),
  timer: z.number().min(1).max(5),
  questionCount: z.number().min(5).max(20),
});

export type QuizConfig = z.infer<typeof quizConfigSchema>;

export const quizOptionSchema = z.object({
  text: z.string(),
  isCorrect: z.boolean(),
});

export type QuizOption = z.infer<typeof quizOptionSchema>;

export const quizQuestionSchema = z.object({
  question: z.string(),
  options: z.array(quizOptionSchema).length(4),
});

export type QuizQuestion = z.infer<typeof quizQuestionSchema>;

export const generateQuestionsRequestSchema = z.object({
  category: z.enum(quizCategories),
  questionCount: z.number().min(5).max(20),
});

export type GenerateQuestionsRequest = z.infer<typeof generateQuestionsRequestSchema>;

export const generateQuestionsResponseSchema = z.object({
  questions: z.array(quizQuestionSchema),
});

export type GenerateQuestionsResponse = z.infer<typeof generateQuestionsResponseSchema>;

export const userAnswerSchema = z.object({
  questionIndex: z.number(),
  selectedOptionIndex: z.number(),
});

export type UserAnswer = z.infer<typeof userAnswerSchema>;

export const quizResultSchema = z.object({
  totalQuestions: z.number(),
  correctAnswers: z.number(),
  percentage: z.number(),
  userAnswers: z.array(userAnswerSchema),
});

export type QuizResult = z.infer<typeof quizResultSchema>;
