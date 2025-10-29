'use client';

import { useEffect, useRef, useState } from 'react';
import { useFormState, useFormStatus } from 'react-dom';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from '@/components/ui/alert-dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { useToast } from '@/hooks/use-toast';
import type { FormState } from '@/app/actions/vendor';
import { addVendorAction, AddVendorSchema, type AddVendorInput } from '@/app/actions/vendor';
import { Alert, AlertDescription, AlertTitle } from '../ui/alert';
import { AlertCircle } from 'lucide-react';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../ui/select';
import { stores } from '@/lib/data';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '../ui/form';

function SubmitButton() {
  const { pending } = useFormStatus();
  return (
    <Button type="submit" disabled={pending} className="w-full">
      {pending ? 'Checking...' : 'Add Vendor'}
    </Button>
  );
}

export function AddVendorForm({ setDialogOpen }: { setDialogOpen: (open: boolean) => void }) {
  const initialState: FormState = { message: '', isFraud: false, reason: null, success: false };
  const [state, formAction] = useFormState(addVendorAction, initialState);
  const [showFraudAlert, setShowFraudAlert] = useState(false);
  const formRef = useRef<HTMLFormElement>(null);
  const { toast } = useToast();

  const form = useForm<AddVendorInput>({
    resolver: zodResolver(AddVendorSchema),
    defaultValues: {
      storeId: '',
      vendorName: '',
      paymentAmount: 0,
      vendorHistory: '',
      accountAge: 0,
    },
  });

  useEffect(() => {
    if (state.message) {
      if (state.isFraud) {
        setShowFraudAlert(true);
      } else if (state.success) {
        toast({
          title: 'Success',
          description: state.message,
        });
        setDialogOpen(false);
        form.reset();
      } else if (state.message && !state.success) {
         toast({
          title: 'Error',
          description: state.message,
          variant: 'destructive',
        });
      }
    }
  }, [state, toast, setDialogOpen, form]);

  const handleProceed = () => {
    toast({
      title: 'Vendor Added',
      description: 'Vendor added despite fraud warning.',
    });
    setShowFraudAlert(false);
    setDialogOpen(false);
    form.reset();
  };

  return (
    <>
      <Form {...form}>
        <form ref={formRef} action={formAction} className="space-y-4">
          <FormField
            control={form.control}
            name="storeId"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Store</FormLabel>
                <Select onValueChange={field.onChange} defaultValue={field.value}>
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Select a store" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    {stores.map((store) => (
                      <SelectItem key={store.id} value={store.id}>
                        {store.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="vendorName"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Vendor Name</FormLabel>
                <FormControl>
                  <Input placeholder="e.g., PepsiCo" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="paymentAmount"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Typical Payment Amount</FormLabel>
                <FormControl>
                  <Input type="number" placeholder="500" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="vendorHistory"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Payment History Notes</FormLabel>
                <FormControl>
                  <Textarea placeholder="e.g., Monthly payments for 2 years" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="accountAge"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Vendor Account Age (days)</FormLabel>
                <FormControl>
                  <Input type="number" placeholder="e.g., 365" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <SubmitButton />
        </form>
      </Form>

      <AlertDialog open={showFraudAlert} onOpenChange={setShowFraudAlert}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle className="flex items-center gap-2"><AlertCircle className="text-destructive"/>Potential Fraud Detected</AlertDialogTitle>
            <AlertDialogDescription>
              Our AI system has flagged this vendor as potentially fraudulent for the following reason:
            </AlertDialogDescription>
          </AlertDialogHeader>
          <Alert variant="destructive">
            <AlertTitle>AI Assessment</AlertTitle>
            <AlertDescription>{state.reason || 'No specific reason provided.'}</AlertDescription>
          </Alert>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction onClick={handleProceed}>Proceed Anyway</AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
}
