import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Cpu, Code, Radio, Loader2 } from "lucide-react";
import type { QuizConfig, QuizCategory, TimerOption, QuestionCountOption, QuizQuestion } from "@shared/schema";
import { quizCategories, timerOptions, questionCountOptions } from "@shared/schema";
import { useToast } from "@/hooks/use-toast";
import { apiRequest } from "@/lib/queryClient";

const categoryIcons = {
  "VLSI": Cpu,
  "React": Code,
  "Digital Signals": Radio,
};

const categoryDescriptions = {
  "VLSI": "Very Large Scale Integration design and architecture",
  "React": "Modern React development and best practices",
  "Digital Signals": "Signal processing and digital communications",
};

interface QuizSetupProps {
  onStartQuiz: (config: QuizConfig, questions: QuizQuestion[]) => void;
}

export function QuizSetup({ onStartQuiz }: QuizSetupProps) {
  const [selectedCategory, setSelectedCategory] = useState<QuizCategory | null>(null);
  const [selectedTimer, setSelectedTimer] = useState<TimerOption>(2);
  const [selectedQuestionCount, setSelectedQuestionCount] = useState<QuestionCountOption>(10);
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();

  const handleStartQuiz = async () => {
    if (!selectedCategory) {
      toast({
        title: "Category Required",
        description: "Please select a quiz category to continue.",
        variant: "destructive",
      });
      return;
    }

    setIsLoading(true);

    try {
      const response = await apiRequest<{ questions: QuizQuestion[] }>(
        "POST",
        "/api/quiz/generate",
        {
          category: selectedCategory,
          questionCount: selectedQuestionCount,
        }
      );

      if (response?.questions && response.questions.length > 0) {
        onStartQuiz(
          {
            category: selectedCategory,
            timer: selectedTimer,
            questionCount: selectedQuestionCount,
          },
          response.questions
        );
      } else {
        throw new Error("No questions received");
      }
    } catch (error) {
      console.error("Failed to generate quiz:", error);
      toast({
        title: "Generation Failed",
        description: "Failed to generate quiz questions. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto space-y-8">
      <div className="text-center space-y-3">
        <h2 className="text-4xl font-bold text-foreground">Start Your Quiz</h2>
        <p className="text-lg text-muted-foreground">
          Choose your topic, set your timer, and challenge yourself
        </p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Select Category</CardTitle>
          <CardDescription>Pick a topic that interests you</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {quizCategories.map((category) => {
              const Icon = categoryIcons[category];
              const isSelected = selectedCategory === category;

              return (
                <button
                  key={category}
                  onClick={() => setSelectedCategory(category)}
                  className={`
                    p-6 rounded-lg border-2 transition-all text-left
                    ${isSelected
                      ? "border-primary bg-primary/5"
                      : "border-border bg-card hover-elevate active-elevate-2"
                    }
                  `}
                  data-testid={`button-category-${category.toLowerCase().replace(/\s+/g, '-')}`}
                >
                  <div className="flex flex-col gap-3">
                    <div className={`
                      w-12 h-12 rounded-lg flex items-center justify-center
                      ${isSelected ? "bg-primary text-primary-foreground" : "bg-muted text-muted-foreground"}
                    `}>
                      <Icon className="w-6 h-6" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-foreground">{category}</h3>
                      <p className="text-sm text-muted-foreground mt-1">
                        {categoryDescriptions[category]}
                      </p>
                    </div>
                  </div>
                </button>
              );
            })}
          </div>
        </CardContent>
      </Card>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Question Count</CardTitle>
            <CardDescription>How many questions would you like?</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex flex-wrap gap-3">
              {questionCountOptions.map((count) => (
                <Button
                  key={count}
                  variant={selectedQuestionCount === count ? "default" : "outline"}
                  onClick={() => setSelectedQuestionCount(count)}
                  data-testid={`button-question-count-${count}`}
                  className="flex-1 min-w-[70px]"
                >
                  {count}
                </Button>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Timer</CardTitle>
            <CardDescription>Set your challenge duration</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex flex-wrap gap-3">
              {timerOptions.map((time) => (
                <Button
                  key={time}
                  variant={selectedTimer === time ? "default" : "outline"}
                  onClick={() => setSelectedTimer(time)}
                  data-testid={`button-timer-${time}`}
                  className="flex-1 min-w-[90px]"
                >
                  {time} {time === 1 ? "min" : "mins"}
                </Button>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="flex justify-center">
        <Button
          size="lg"
          onClick={handleStartQuiz}
          disabled={!selectedCategory || isLoading}
          className="min-w-[200px]"
          data-testid="button-start-quiz"
        >
          {isLoading ? (
            <>
              <Loader2 className="mr-2 h-5 w-5 animate-spin" />
              Generating Questions...
            </>
          ) : (
            "Start Quiz"
          )}
        </Button>
      </div>

      {selectedCategory && (
        <div className="text-center">
          <Badge variant="secondary" className="text-sm">
            {selectedQuestionCount} questions • {selectedTimer} {selectedTimer === 1 ? "minute" : "minutes"} • {selectedCategory}
          </Badge>
        </div>
      )}
    </div>
  );
}
