'use server';

import { detectFraud } from '@/ai/flows/fraud-detection';
import { z } from 'zod';

const AddVendorSchema = z.object({
  storeId: z.string().min(1, { message: 'Please select a store.' }),
  vendorName: z.string().min(2, { message: 'Vendor name must be at least 2 characters.' }),
  paymentAmount: z.coerce.number().positive({ message: 'Please enter a valid amount.' }),
  vendorHistory: z.string().optional(),
  accountAge: z.coerce.number().min(0).optional(),
});

export type FormState = {
  message: string;
  isFraud: boolean;
  reason: string | null;
  fields?: Record<string, string>;
  issues?: string[];
};

export async function addVendorAction(prevState: FormState, data: FormData): Promise<FormState> {
  const formData = Object.fromEntries(data);
  const parsed = AddVendorSchema.safeParse(formData);

  if (!parsed.success) {
    const issues = parsed.error.issues.map((issue) => issue.message);
    return {
      message: 'Invalid form data.',
      isFraud: false,
      reason: null,
      issues,
      fields: {
        ...Object.fromEntries(
          Object.entries(formData).map(([key, value]) => [key, value.toString()])
        ),
      },
    };
  }

  try {
    const fraudResult = await detectFraud({
      vendorName: parsed.data.vendorName,
      paymentAmount: parsed.data.paymentAmount,
      vendorHistory: parsed.data.vendorHistory,
      accountAge: parsed.data.accountAge,
    });
    
    if (fraudResult.isFraudulent) {
      return {
        message: 'Potential fraud detected.',
        isFraud: true,
        reason: fraudResult.fraudReason,
      };
    }

    // In a real app, you would save the vendor to the database here.
    // await saveVendorToStore(parsed.data.storeId, parsed.data);

    return {
      message: `${parsed.data.vendorName} added successfully.`,
      isFraud: false,
      reason: null,
    };

  } catch (error) {
    console.error(error);
    return {
      message: 'An unexpected error occurred. Please try again.',
      isFraud: false,
      reason: null,
    };
  }
}
