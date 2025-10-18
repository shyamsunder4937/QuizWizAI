import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Timer as TimerIcon, CheckCircle2, XCircle, ChevronRight } from "lucide-react";
import type { QuizConfig, QuizQuestion, UserAnswer } from "@shared/schema";

interface QuizInterfaceProps {
  config: QuizConfig;
  questions: QuizQuestion[];
  onQuizComplete: (answers: UserAnswer[]) => void;
}

export function QuizInterface({ config, questions, onQuizComplete }: QuizInterfaceProps) {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedOptionIndex, setSelectedOptionIndex] = useState<number | null>(null);
  const [userAnswers, setUserAnswers] = useState<UserAnswer[]>([]);
  const [timeRemaining, setTimeRemaining] = useState(config.timer * 60);
  const [hasAnswered, setHasAnswered] = useState(false);

  const currentQuestion = questions[currentQuestionIndex];
  const progress = ((currentQuestionIndex + 1) / questions.length) * 100;
  const correctAnswerIndex = currentQuestion?.options.findIndex((opt) => opt.isCorrect);

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeRemaining((prev) => {
        if (prev <= 1) {
          clearInterval(timer);
          handleQuizComplete();
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const handleQuizComplete = () => {
    onQuizComplete(userAnswers);
  };

  const handleAnswerSelect = (optionIndex: number) => {
    if (hasAnswered) return;
    
    setSelectedOptionIndex(optionIndex);
    setHasAnswered(true);

    const newAnswer: UserAnswer = {
      questionIndex: currentQuestionIndex,
      selectedOptionIndex: optionIndex,
    };

    setUserAnswers((prev) => [...prev, newAnswer]);
  };

  const handleNextQuestion = () => {
    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex((prev) => prev + 1);
      setSelectedOptionIndex(null);
      setHasAnswered(false);
    } else {
      handleQuizComplete();
    }
  };

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, "0")}`;
  };

  const getTimerColor = () => {
    if (timeRemaining <= 10) return "text-destructive";
    if (timeRemaining <= 30) return "text-warning";
    return "text-primary";
  };

  return (
    <div className="max-w-3xl mx-auto space-y-6">
      <div className="sticky top-4 z-10 bg-background/80 backdrop-blur-sm rounded-lg border border-border p-4">
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center gap-3">
            <Badge variant="outline" className="text-sm">
              Question {currentQuestionIndex + 1} of {questions.length}
            </Badge>
            <Badge variant="secondary" className="text-sm">
              {config.category}
            </Badge>
          </div>
          <div className={`flex items-center gap-2 font-mono text-xl font-bold tabular-nums ${getTimerColor()}`}>
            <TimerIcon className="w-5 h-5" />
            <span data-testid="text-timer">{formatTime(timeRemaining)}</span>
          </div>
        </div>
        <Progress value={progress} className="h-2" />
      </div>

      <Card className="shadow-lg">
        <CardHeader className="pb-4">
          <h3 className="text-2xl font-semibold text-foreground leading-relaxed">
            {currentQuestion?.question}
          </h3>
        </CardHeader>
        <CardContent className="space-y-3">
          {currentQuestion?.options.map((option, index) => {
            const isSelected = selectedOptionIndex === index;
            const isCorrect = index === correctAnswerIndex;
            const showResult = hasAnswered;

            let buttonClasses = "w-full p-4 text-left rounded-lg border-2 transition-all ";

            if (!showResult) {
              buttonClasses += isSelected
                ? "border-primary bg-primary/10"
                : "border-border bg-card hover-elevate active-elevate-2";
            } else {
              if (isCorrect) {
                buttonClasses += "border-success bg-success/10";
              } else if (isSelected && !isCorrect) {
                buttonClasses += "border-destructive bg-destructive/10";
              } else {
                buttonClasses += "border-border bg-card";
              }
            }

            return (
              <button
                key={index}
                onClick={() => handleAnswerSelect(index)}
                disabled={hasAnswered}
                className={buttonClasses}
                data-testid={`button-option-${index}`}
              >
                <div className="flex items-start justify-between gap-3">
                  <div className="flex items-start gap-3 flex-1">
                    <div className={`
                      w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 font-semibold
                      ${!showResult
                        ? isSelected
                          ? "bg-primary text-primary-foreground"
                          : "bg-muted text-muted-foreground"
                        : isCorrect
                          ? "bg-success text-success-foreground"
                          : isSelected
                            ? "bg-destructive text-destructive-foreground"
                            : "bg-muted text-muted-foreground"
                      }
                    `}>
                      {String.fromCharCode(65 + index)}
                    </div>
                    <span className="text-base leading-relaxed flex-1">
                      {option.text}
                    </span>
                  </div>
                  {showResult && (
                    <div className="flex-shrink-0">
                      {isCorrect ? (
                        <CheckCircle2 className="w-6 h-6 text-success" />
                      ) : isSelected ? (
                        <XCircle className="w-6 h-6 text-destructive" />
                      ) : null}
                    </div>
                  )}
                </div>
              </button>
            );
          })}
        </CardContent>
      </Card>

      {hasAnswered && (
        <div className="flex justify-end">
          <Button
            size="lg"
            onClick={handleNextQuestion}
            data-testid="button-next-question"
          >
            {currentQuestionIndex < questions.length - 1 ? (
              <>
                Next Question
                <ChevronRight className="ml-2 h-5 w-5" />
              </>
            ) : (
              "View Results"
            )}
          </Button>
        </div>
      )}
    </div>
  );
}
