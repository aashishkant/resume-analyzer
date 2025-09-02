import type { AnalyzeResumeAndSuggestImprovementsOutput } from "@/ai/flows/analyze-resume-and-suggest-improvements";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { CheckCircle, AlertTriangle, Lightbulb } from "lucide-react";

type ResultsDashboardProps = {
  result: AnalyzeResumeAndSuggestImprovementsOutput;
};

export default function ResultsDashboard({ result }: ResultsDashboardProps) {
  const { matchPercentage, missingKeywords, improvementSuggestions } = result;

  const getProgressColor = (percentage: number) => {
    if (percentage < 40) return "bg-red-500";
    if (percentage < 75) return "bg-yellow-500";
    return "bg-green-500";
  };

  return (
    <section className="mt-12 animate-in fade-in duration-500">
      <h2 className="text-3xl font-bold text-center font-headline mb-8">
        Your Analysis Report
      </h2>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
        <Card className="shadow-md">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <CheckCircle className="text-primary" />
              <span>Match Score</span>
            </CardTitle>
            <CardDescription>
              How well your resume aligns with the job description.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-center space-x-4">
              <span
                className={`text-5xl font-bold font-headline ${
                  matchPercentage > 75
                    ? "text-green-500"
                    : matchPercentage > 40
                    ? "text-yellow-500"
                    : "text-red-500"
                }`}
              >
                {matchPercentage.toFixed(0)}%
              </span>
            </div>
            <Progress
              value={matchPercentage}
              className="h-3 [&>div]:bg-primary"
            />
          </CardContent>
        </Card>
        <Card className="shadow-md">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <AlertTriangle className="text-yellow-500" />
              <span>Missing Keywords</span>
            </CardTitle>
            <CardDescription>
              Important terms from the job description missing in your resume.
            </CardDescription>
          </CardHeader>
          <CardContent>
            {missingKeywords && missingKeywords.length > 0 ? (
              <div className="flex flex-wrap gap-2">
                {missingKeywords.map((keyword, index) => (
                  <Badge key={index} variant="secondary">
                    {keyword}
                  </Badge>
                ))}
              </div>
            ) : (
              <p className="text-sm text-muted-foreground">
                Great job! No critical keywords seem to be missing.
              </p>
            )}
          </CardContent>
        </Card>
      </div>
      <Card className="shadow-md">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Lightbulb className="text-accent" />
            <span>AI-Powered Suggestions</span>
          </CardTitle>
          <CardDescription>
            Recommendations to enhance your resume for this specific role.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="prose prose-sm dark:prose-invert max-w-none whitespace-pre-line">
            {improvementSuggestions}
          </div>
        </CardContent>
      </Card>
    </section>
  );
}
