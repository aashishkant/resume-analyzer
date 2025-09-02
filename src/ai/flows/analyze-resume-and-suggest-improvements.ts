'use server';
/**
 * @fileOverview Analyzes a resume against a job description and provides AI-powered suggestions.
 *
 * - analyzeResumeAndSuggestImprovements - A function that analyzes the resume and provides suggestions.
 * - AnalyzeResumeAndSuggestImprovementsInput - The input type for the analyzeResumeAndSuggestImprovements function.
 * - AnalyzeResumeAndSuggestImprovementsOutput - The return type for the analyzeResumeAndSuggestImprovements function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const AnalyzeResumeAndSuggestImprovementsInputSchema = z.object({
  resumeText: z
    .string()
    .describe('The text content of the resume.'),
  jobDescriptionText: z
    .string()
    .describe('The text content of the job description.'),
});
export type AnalyzeResumeAndSuggestImprovementsInput = z.infer<
  typeof AnalyzeResumeAndSuggestImprovementsInputSchema
>;

const AnalyzeResumeAndSuggestImprovementsOutputSchema = z.object({
  matchPercentage: z
    .number()
    .describe('The percentage of how well the resume matches the job description.'),
  missingKeywords: z
    .array(z.string())
    .describe('Keywords missing from the resume compared to the job description.'),
  improvementSuggestions: z
    .string()
    .describe('AI-powered suggestions on how to improve the resume.'),
});
export type AnalyzeResumeAndSuggestImprovementsOutput = z.infer<
  typeof AnalyzeResumeAndSuggestImprovementsOutputSchema
>;

export async function analyzeResumeAndSuggestImprovements(
  input: AnalyzeResumeAndSuggestImprovementsInput
): Promise<AnalyzeResumeAndSuggestImprovementsOutput> {
  return analyzeResumeAndSuggestImprovementsFlow(input);
}

const analyzeResumeAndSuggestImprovementsPrompt = ai.definePrompt({
  name: 'analyzeResumeAndSuggestImprovementsPrompt',
  input: {schema: AnalyzeResumeAndSuggestImprovementsInputSchema},
  output: {schema: AnalyzeResumeAndSuggestImprovementsOutputSchema},
  prompt: `You are a professional resume analyzer. Analyze the resume and provide suggestions on how to improve it to better match the job requirements. 

  Compute the match percentage of how well the resume matches the job description. Identify key skills and keywords missing from the resume compared to the job description. Provide suggestions on how to improve the resume.

  Resume Text: {{{resumeText}}}
  Job Description Text: {{{jobDescriptionText}}}

  Ensure that the output is properly formatted.
  `,
});

const analyzeResumeAndSuggestImprovementsFlow = ai.defineFlow(
  {
    name: 'analyzeResumeAndSuggestImprovementsFlow',
    inputSchema: AnalyzeResumeAndSuggestImprovementsInputSchema,
    outputSchema: AnalyzeResumeAndSuggestImprovementsOutputSchema,
  },
  async input => {
    const {output} = await analyzeResumeAndSuggestImprovementsPrompt(input);
    return output!;
  }
);
