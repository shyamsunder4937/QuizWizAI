import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Trophy, TrendingUp, RotateCcw, CheckCircle2, XCircle } from "lucide-react";
import type { QuizConfig, QuizQuestion, UserAnswer } from "@shared/schema";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

interface QuizResultsProps {
  config: QuizConfig;
  questions: QuizQuestion[];
  userAnswers: UserAnswer[];
  onRetakeQuiz: () => void;
}

export function QuizResults({ config, questions, userAnswers, onRetakeQuiz }: QuizResultsProps) {
  const correctCount = userAnswers.filter((answer) => {
    const question = questions[answer.questionIndex];
    return question?.options[answer.selectedOptionIndex]?.isCorrect;
  }).length;

  const totalQuestions = questions.length;
  const percentage = Math.round((correctCount / totalQuestions) * 100);

  const getPerformanceBadge = () => {
    if (percentage >= 80) return { label: "Excellent", variant: "default" as const, color: "text-success" };
    if (percentage >= 60) return { label: "Good", variant: "secondary" as const, color: "text-info" };
    return { label: "Needs Practice", variant: "outline" as const, color: "text-warning" };
  };

  const performance = getPerformanceBadge();

  return (
    <div className="max-w-4xl mx-auto space-y-8">
      <Card className="shadow-xl border-2">
        <CardHeader className="text-center pb-2">
          <div className="flex justify-center mb-4">
            <div className="w-20 h-20 rounded-full bg-primary/10 flex items-center justify-center">
              <Trophy className="w-10 h-10 text-primary" />
            </div>
          </div>
          <CardTitle className="text-3xl">Quiz Complete!</CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="text-center space-y-4">
            <div>
              <div className="text-7xl font-bold text-primary mb-2" data-testid="text-score-percentage">
                {percentage}%
              </div>
              <p className="text-lg text-muted-foreground">
                <span data-testid="text-score-correct">{correctCount}</span> out of{" "}
                <span data-testid="text-score-total">{totalQuestions}</span> correct
              </p>
            </div>
            <Badge variant={performance.variant} className={`text-lg px-4 py-2 ${performance.color}`}>
              <TrendingUp className="w-4 h-4 mr-2" />
              {performance.label}
            </Badge>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-4 border-t">
            <div className="text-center">
              <div className="text-2xl font-bold text-foreground">{config.category}</div>
              <div className="text-sm text-muted-foreground">Category</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-foreground">{totalQuestions}</div>
              <div className="text-sm text-muted-foreground">Questions</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-foreground">{config.timer} min</div>
              <div className="text-sm text-muted-foreground">Time Limit</div>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Review Your Answers</CardTitle>
        </CardHeader>
        <CardContent>
          <Accordion type="single" collapsible className="w-full">
            {questions.map((question, qIndex) => {
              const userAnswer = userAnswers.find((a) => a.questionIndex === qIndex);
              const selectedOption = userAnswer ? question.options[userAnswer.selectedOptionIndex] : null;
              const correctOption = question.options.find((opt) => opt.isCorrect);
              const isCorrect = selectedOption?.isCorrect ?? false;

              return (
                <AccordionItem key={qIndex} value={`question-${qIndex}`}>
                  <AccordionTrigger className="hover:no-underline">
                    <div className="flex items-center gap-3 text-left">
                      <div className="flex-shrink-0">
                        {isCorrect ? (
                          <CheckCircle2 className="w-6 h-6 text-success" />
                        ) : (
                          <XCircle className="w-6 h-6 text-destructive" />
                        )}
                      </div>
                      <div className="flex-1">
                        <div className="font-medium">Question {qIndex + 1}</div>
                        <div className="text-sm text-muted-foreground line-clamp-1">
                          {question.question}
                        </div>
                      </div>
                    </div>
                  </AccordionTrigger>
                  <AccordionContent>
                    <div className="space-y-4 pl-9 pt-2">
                      <div>
                        <h4 className="font-semibold text-foreground mb-2">{question.question}</h4>
                      </div>
                      
                      <div className="space-y-2">
                        {question.options.map((option, oIndex) => {
                          const isUserSelected = userAnswer?.selectedOptionIndex === oIndex;
                          const isCorrectOption = option.isCorrect;

                          return (
                            <div
                              key={oIndex}
                              className={`
                                p-3 rounded-lg border
                                ${isCorrectOption
                                  ? "border-success bg-success/10"
                                  : isUserSelected
                                    ? "border-destructive bg-destructive/10"
                                    : "border-border bg-muted/50"
                                }
                              `}
                            >
                              <div className="flex items-start gap-2">
                                <span className="font-medium text-muted-foreground">
                                  {String.fromCharCode(65 + oIndex)}.
                                </span>
                                <span className="flex-1">{option.text}</span>
                                {isCorrectOption && (
                                  <Badge variant="outline" className="bg-success/20 border-success text-success">
                                    Correct
                                  </Badge>
                                )}
                                {isUserSelected && !isCorrectOption && (
                                  <Badge variant="outline" className="bg-destructive/20 border-destructive text-destructive">
                                    Your Answer
                                  </Badge>
                                )}
                              </div>
                            </div>
                          );
                        })}
                      </div>
                    </div>
                  </AccordionContent>
                </AccordionItem>
              );
            })}
          </Accordion>
        </CardContent>
      </Card>

      <div className="flex justify-center gap-4">
        <Button size="lg" onClick={onRetakeQuiz} data-testid="button-retake-quiz">
          <RotateCcw className="mr-2 h-5 w-5" />
          Try Another Quiz
        </Button>
      </div>
    </div>
  );
}
