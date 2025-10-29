'use server';

/**
 * @fileOverview Implements fraud detection for vendor payments.
 *
 * This file exports:
 * - `detectFraud`: An asynchronous function that takes vendor details and payment amount as input and returns a fraud assessment.
 * - `FraudDetectionInput`: The input type for the `detectFraud` function.
 * - `FraudDetectionOutput`: The output type for the `detectFraud` function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const FraudDetectionInputSchema = z.object({
  vendorName: z.string().describe('The name of the vendor.'),
  paymentAmount: z.number().describe('The amount of the payment.'),
  vendorHistory: z.string().optional().describe('Payment history with the vendor'),
  accountAge: z.number().optional().describe('The age of the vendor account in days'),
});

export type FraudDetectionInput = z.infer<typeof FraudDetectionInputSchema>;

const FraudDetectionOutputSchema = z.object({
  isFraudulent: z.boolean().describe('Whether the payment is potentially fraudulent.'),
  fraudReason: z.string().describe('A concise, one-sentence reason for the fraud assessment.'),
});

export type FraudDetectionOutput = z.infer<typeof FraudDetectionOutputSchema>;

export async function detectFraud(input: FraudDetectionInput): Promise<FraudDetectionOutput> {
  return detectFraudFlow(input);
}

const detectFraudPrompt = ai.definePrompt({
  name: 'detectFraudPrompt',
  input: {schema: FraudDetectionInputSchema},
  output: {schema: FraudDetectionOutputSchema},
  prompt: `You are an expert fraud detection agent for a B2B payment platform. Your task is to assess if a new vendor payment is potentially fraudulent based on the provided data.

Analyze the following payment details:
- Vendor Name: {{{vendorName}}}
- Payment Amount: {{{paymentAmount}}}
- Vendor Payment History: {{{vendorHistory}}}
- Vendor Account Age (days): {{{accountAge}}}

A payment may be fraudulent if:
- The payment amount is unusually high for a new vendor.
- The vendor account is very new (e.g., less than 30 days old).
- There is no established payment history.
- The vendor name seems suspicious or generic.

Based on your analysis, determine if the transaction is fraudulent. Respond with a JSON object containing 'isFraudulent' (boolean) and a concise, one-sentence 'fraudReason' (string) explaining your decision.`,
});

const detectFraudFlow = ai.defineFlow(
  {
    name: 'detectFraudFlow',
    inputSchema: FraudDetectionInputSchema,
    outputSchema: FraudDetectionOutputSchema,
  },
  async input => {
    const {output} = await detectFraudPrompt(input);
    return output!;
  }
);
