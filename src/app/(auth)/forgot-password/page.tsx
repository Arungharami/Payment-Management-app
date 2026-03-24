'use client';

import Link from 'next/link';
import { ArrowLeft, MailCheck } from 'lucide-react';
import React from 'react';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

export default function ForgotPasswordPage() {
  const [submitted, setSubmitted] = React.useState(false);

  return (
    <div className="space-y-8">
      <div className="space-y-4">
        <div className="inline-flex items-center gap-2 rounded-full border border-amber-200 bg-amber-50 px-4 py-2 text-sm font-medium text-amber-700">
          <MailCheck className="h-4 w-4" />
          Recovery access
        </div>
        <div className="space-y-2">
          <h1 className="font-headline text-3xl font-semibold tracking-tight text-slate-950">Reset your password</h1>
          <p className="text-sm leading-7 text-slate-600">
            Enter your work email and we&apos;ll send a secure reset link for your LedgerFlow workspace.
          </p>
        </div>
      </div>

      <form
        onSubmit={(event) => {
          event.preventDefault();
          setSubmitted(true);
        }}
        className="space-y-5"
      >
        <div className="space-y-2">
          <Label htmlFor="email">Work email</Label>
          <Input id="email" type="email" placeholder="finance@yourbusiness.com" required className="h-12 rounded-2xl border-slate-200 bg-white" />
        </div>
        <Button type="submit" className="h-12 w-full rounded-2xl text-base">
          Send reset link
        </Button>
      </form>

      {submitted ? (
        <div className="rounded-[1.5rem] border border-emerald-200 bg-emerald-50 p-5 text-sm leading-7 text-emerald-800">
          Reset instructions have been sent. Check your inbox for a secure sign-in recovery link.
        </div>
      ) : null}

      <Link href="/login" className="inline-flex items-center gap-2 text-sm font-medium text-slate-600">
        <ArrowLeft className="h-4 w-4" />
        Back to sign in
      </Link>
    </div>
  );
}
