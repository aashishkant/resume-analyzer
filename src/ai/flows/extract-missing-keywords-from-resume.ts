'use server';
/**
 * @fileOverview Extracts missing keywords from a resume compared to a job description using AI.
 *
 * - extractMissingKeywords - A function that extracts missing keywords.
 * - ExtractMissingKeywordsInput - The input type for the extractMissingKeywords function.
 * - ExtractMissingKeywordsOutput - The return type for the extractMissingKeywords function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const ExtractMissingKeywordsInputSchema = z.object({
  resumeText: z.string().describe('The text content of the resume.'),
  jobDescriptionText: z.string().describe('The text content of the job description.'),
});
export type ExtractMissingKeywordsInput = z.infer<typeof ExtractMissingKeywordsInputSchema>;

const ExtractMissingKeywordsOutputSchema = z.object({
  missingKeywords: z.array(z.string()).describe('List of keywords missing from the resume.'),
  explanation: z.string().describe('Explanation of why these keywords are important.'),
});
export type ExtractMissingKeywordsOutput = z.infer<typeof ExtractMissingKeywordsOutputSchema>;

export async function extractMissingKeywords(
  input: ExtractMissingKeywordsInput
): Promise<ExtractMissingKeywordsOutput> {
  return extractMissingKeywordsFlow(input);
}

const prompt = ai.definePrompt({
  name: 'extractMissingKeywordsPrompt',
  input: {schema: ExtractMissingKeywordsInputSchema},
  output: {schema: ExtractMissingKeywordsOutputSchema},
  prompt: `You are an AI resume expert. Given the following resume and job description, identify the key skills and keywords that are missing from the resume compared to the job description. Explain why each keyword is important in the explanation field.

Resume:
{{resumeText}}

Job Description:
{{jobDescriptionText}}`,
});

const extractMissingKeywordsFlow = ai.defineFlow(
  {
    name: 'extractMissingKeywordsFlow',
    inputSchema: ExtractMissingKeywordsInputSchema,
    outputSchema: ExtractMissingKeywordsOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
