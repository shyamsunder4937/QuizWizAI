import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Label } from "@/components/ui/label";
import { Slider } from "@/components/ui/slider";
import { Cpu, Code, Radio, Loader2 } from "lucide-react";
import type { QuizConfig, QuizCategory, QuizQuestion } from "@shared/schema";
import { quizCategories } from "@shared/schema";
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
  const [selectedTimer, setSelectedTimer] = useState<number>(2);
  const [selectedQuestionCount, setSelectedQuestionCount] = useState<number>(10);
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
            <CardDescription>Select between 5 and 20 questions</CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <Label htmlFor="question-count" className="text-base font-medium">
                  Questions
                </Label>
                <span className="text-3xl font-bold text-primary" data-testid="text-question-count">
                  {selectedQuestionCount}
                </span>
              </div>
              <Slider
                id="question-count"
                min={5}
                max={20}
                step={1}
                value={[selectedQuestionCount]}
                onValueChange={(value) => setSelectedQuestionCount(value[0])}
                className="w-full"
                data-testid="slider-question-count"
              />
              <div className="flex justify-between text-sm text-muted-foreground">
                <span>5</span>
                <span>20</span>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Timer</CardTitle>
            <CardDescription>Set duration from 1 to 5 minutes</CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <Label htmlFor="timer" className="text-base font-medium">
                  Duration
                </Label>
                <span className="text-3xl font-bold text-primary" data-testid="text-timer-minutes">
                  {selectedTimer} <span className="text-xl text-muted-foreground">min</span>
                </span>
              </div>
              <Slider
                id="timer"
                min={1}
                max={5}
                step={1}
                value={[selectedTimer]}
                onValueChange={(value) => setSelectedTimer(value[0])}
                className="w-full"
                data-testid="slider-timer"
              />
              <div className="flex justify-between text-sm text-muted-foreground">
                <span>1 min</span>
                <span>5 min</span>
              </div>
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
