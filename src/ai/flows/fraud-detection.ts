// This file implements a Genkit flow for fraud detection to prevent payments to unusual or potentially fraudulent vendors.

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
  fraudReason: z.string().describe('The reason for the fraud assessment.'),
});

export type FraudDetectionOutput = z.infer<typeof FraudDetectionOutputSchema>;

export async function detectFraud(input: FraudDetectionInput): Promise<FraudDetectionOutput> {
  return detectFraudFlow(input);
}

const detectFraudPrompt = ai.definePrompt({
  name: 'detectFraudPrompt',
  input: {schema: FraudDetectionInputSchema},
  output: {schema: FraudDetectionOutputSchema},
  prompt: `You are an expert in fraud detection, specializing in identifying potentially fraudulent vendor payments for liquor stores.

  Given the vendor's name, payment amount, vendor history, and account age, assess the likelihood of fraud.

  Vendor Name: {{{vendorName}}}
  Payment Amount: {{{paymentAmount}}}
  Vendor Payment History: {{{vendorHistory}}}
  Vendor Account Age (days): {{{accountAge}}}

  Consider factors such as unusually high payment amounts, lack of payment history, and recent account creation.

  Determine if the payment is potentially fraudulent and provide a clear reason for your assessment. Return in JSON format.

  { {{#if isFraudulent}} \"isFraudulent\": true, {{else}} \"isFraudulent\": false, {{/if}} \"fraudReason\": \"explanation here\" }
  `,
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
