'use server';

import { detectFraud } from '@/ai/flows/fraud-detection';
import { AddVendorSchema, type FormState } from '@/lib/schemas/vendor';


export async function addVendorAction(prevState: FormState, data: FormData): Promise<FormState> {
  const formData = Object.fromEntries(data);
  const parsed = AddVendorSchema.safeParse(formData);

  if (!parsed.success) {
    const issues = parsed.error.issues.map((issue) => issue.message);
    return {
      message: 'Invalid form data. Please check the fields below.',
      isFraud: false,
      success: false,
      reason: null,
      issues,
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
        success: false,
        reason: fraudResult.fraudReason,
      };
    }

    // In a real app, you would save the vendor to the database here.
    // await saveVendorToStore(parsed.data.storeId, parsed.data);

    return {
      message: `${parsed.data.vendorName} added successfully.`,
      isFraud: false,
      success: true,
      reason: null,
    };

  } catch (error) {
    console.error(error);
    return {
      message: 'An unexpected error occurred. Please try again.',
      isFraud: false,
      success: false,
      reason: null,
    };
  }
}
