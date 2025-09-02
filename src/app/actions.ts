"use server";

import { analyzeResumeAndSuggestImprovements } from "@/ai/flows/analyze-resume-and-suggest-improvements";
import type { AnalyzeResumeAndSuggestImprovementsOutput } from "@/ai/flows/analyze-resume-and-suggest-improvements";

export async function runAnalysis(
  resumeText: string,
  jobDescriptionText: string
): Promise<AnalyzeResumeAndSuggestImprovementsOutput | null> {
  try {
    const result = await analyzeResumeAndSuggestImprovements({
      resumeText,
      jobDescriptionText,
    });
    return result;
  } catch (error) {
    console.error("Error in runAnalysis server action:", error);
    // Propagate the error to be handled by the client
    throw new Error("Failed to analyze resume. Please try again later.");
  }
}
