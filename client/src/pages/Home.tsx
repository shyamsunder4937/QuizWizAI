import { useState } from "react";
import { QuizSetup } from "@/components/quiz/QuizSetup";
import { QuizInterface } from "@/components/quiz/QuizInterface";
import { QuizResults } from "@/components/quiz/QuizResults";
import type { QuizConfig, QuizQuestion, UserAnswer } from "@shared/schema";
import { ThemeToggle } from "@/components/ThemeToggle";

type QuizState = "setup" | "taking" | "results";

export default function Home() {
  const [quizState, setQuizState] = useState<QuizState>("setup");
  const [quizConfig, setQuizConfig] = useState<QuizConfig | null>(null);
  const [questions, setQuestions] = useState<QuizQuestion[]>([]);
  const [userAnswers, setUserAnswers] = useState<UserAnswer[]>([]);

  const handleStartQuiz = (config: QuizConfig, generatedQuestions: QuizQuestion[]) => {
    setQuizConfig(config);
    setQuestions(generatedQuestions);
    setUserAnswers([]);
    setQuizState("taking");
  };

  const handleQuizComplete = (answers: UserAnswer[]) => {
    setUserAnswers(answers);
    setQuizState("results");
  };

  const handleRetakeQuiz = () => {
    setQuizState("setup");
    setQuizConfig(null);
    setQuestions([]);
    setUserAnswers([]);
  };

  return (
    <div className="min-h-screen bg-background">
      <header className="border-b border-border">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg bg-primary flex items-center justify-center">
              <span className="text-xl font-bold text-primary-foreground">Q</span>
            </div>
            <h1 className="text-xl font-bold text-foreground">AI Quiz Master</h1>
          </div>
          <ThemeToggle />
        </div>
      </header>

      <main className="container mx-auto px-4 py-8 md:py-12">
        {quizState === "setup" && (
          <QuizSetup onStartQuiz={handleStartQuiz} />
        )}

        {quizState === "taking" && quizConfig && (
          <QuizInterface
            config={quizConfig}
            questions={questions}
            onQuizComplete={handleQuizComplete}
          />
        )}

        {quizState === "results" && quizConfig && (
          <QuizResults
            config={quizConfig}
            questions={questions}
            userAnswers={userAnswers}
            onRetakeQuiz={handleRetakeQuiz}
          />
        )}
      </main>
    </div>
  );
}
