"use client";

import { useState } from "react";
import type { AnalyzeResumeAndSuggestImprovementsOutput } from "@/ai/flows/analyze-resume-and-suggest-improvements";
import { runAnalysis } from "@/app/actions";
import { useToast } from "@/hooks/use-toast";
import AnalysisForm from "@/components/analysis-form";
import ResultsDashboard from "@/components/results-dashboard";
import Header from "@/components/header";
import { Loader } from "@/components/loader";
import { Card, CardContent } from "@/components/ui/card";

export default function Home() {
  const [result, setResult] = useState<AnalyzeResumeAndSuggestImprovementsOutput | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();

  const handleFormSubmit = async (data: {
    resume: string;
    jobDescription: string;
  }) => {
    setIsLoading(true);
    setResult(null);

    try {
      const analysisResult = await runAnalysis(
        data.resume,
        data.jobDescription
      );
      if (!analysisResult) {
        throw new Error("Analysis failed to return a result.");
      }
      setResult(analysisResult);
    } catch (e) {
      console.error(e);
      toast({
        variant: "destructive",
        title: "Analysis Failed",
        description:
          "An error occurred during analysis. Please check the console for details and try again.",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-grow container mx-auto px-4 py-8 md:py-12">
        <div className="max-w-4xl mx-auto">
          <Card className="mb-8 shadow-lg">
            <CardContent className="p-6">
              <h2 className="text-2xl font-bold font-headline mb-2 text-center">
                Get an Instant Resume Analysis
              </h2>
              <p className="text-muted-foreground mb-6 text-center">
                Paste your resume and a job description below to see how well you match.
              </p>
              <AnalysisForm onSubmit={handleFormSubmit} isLoading={isLoading} />
            </CardContent>
          </Card>

          {isLoading && (
            <div className="flex flex-col items-center justify-center space-y-4">
              <Loader />
              <p className="text-muted-foreground animate-pulse">
                Analyzing your documents...
              </p>
            </div>
          )}

          {result && <ResultsDashboard result={result} />}
        </div>
      </main>
      <footer className="text-center p-4 text-sm text-muted-foreground">
        © {new Date().getFullYear()} ResumeAce. All rights reserved.
      </footer>
    </div>
  );
}
