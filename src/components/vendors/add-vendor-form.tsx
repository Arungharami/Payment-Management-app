'use client';

import { useEffect, useRef, useState } from 'react';
import { useFormState, useFormStatus } from 'react-dom';
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
import { addVendorAction } from '@/app/actions/vendor';
import { Alert, AlertDescription, AlertTitle } from '../ui/alert';
import { AlertCircle } from 'lucide-react';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../ui/select';
import { stores } from '@/lib/data';

function SubmitButton() {
  const { pending } = useFormStatus();
  return (
    <Button type="submit" disabled={pending} className="w-full">
      {pending ? 'Checking...' : 'Add Vendor'}
    </Button>
  );
}

export function AddVendorForm({ setDialogOpen }: { setDialogOpen: (open: boolean) => void }) {
  const initialState: FormState = { message: '', isFraud: false, reason: null };
  const [state, formAction] = useFormState(addVendorAction, initialState);
  const [showFraudAlert, setShowFraudAlert] = useState(false);
  const formRef = useRef<HTMLFormElement>(null);
  const { toast } = useToast();

  useEffect(() => {
    if (state.message) {
      if (state.isFraud) {
        setShowFraudAlert(true);
      } else if (state.message.includes('success')) {
        toast({
          title: 'Success',
          description: state.message,
        });
        setDialogOpen(false);
        formRef.current?.reset();
      } else if (!state.issues && !state.isFraud) {
         toast({
          title: 'Error',
          description: state.message,
          variant: 'destructive',
        });
      }
    }
  }, [state, toast, setDialogOpen]);

  const handleProceed = () => {
    // In a real app, you might re-submit with a "force" flag
    toast({
      title: 'Vendor Added',
      description: 'Vendor added despite fraud warning.',
    });
    setShowFraudAlert(false);
    setDialogOpen(false);
    formRef.current?.reset();
  };

  return (
    <>
      <form ref={formRef} action={formAction} className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="storeId">Store</Label>
          <Select name="storeId">
            <SelectTrigger>
              <SelectValue placeholder="Select a store" />
            </SelectTrigger>
            <SelectContent>
              {stores.map(store => (
                <SelectItem key={store.id} value={store.id}>{store.name}</SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
        <div className="space-y-2">
          <Label htmlFor="vendorName">Vendor Name</Label>
          <Input id="vendorName" name="vendorName" placeholder="e.g., PepsiCo" required />
          {state.issues && <p className="text-sm text-destructive">{state.issues.find(s => s.includes('Vendor'))}</p>}
        </div>
        <div className="space-y-2">
          <Label htmlFor="paymentAmount">Typical Payment Amount</Label>
          <Input id="paymentAmount" name="paymentAmount" type="number" placeholder="500" required/>
          {state.issues && <p className="text-sm text-destructive">{state.issues.find(s => s.includes('amount'))}</p>}
        </div>
        <div className="space-y-2">
          <Label htmlFor="vendorHistory">Payment History Notes</Label>
          <Textarea id="vendorHistory" name="vendorHistory" placeholder="e.g., Monthly payments for 2 years" />
        </div>
        <div className="space-y-2">
          <Label htmlFor="accountAge">Vendor Account Age (days)</Label>
          <Input id="accountAge" name="accountAge" type="number" placeholder="e.g., 365" />
        </div>
        <SubmitButton />
      </form>

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
