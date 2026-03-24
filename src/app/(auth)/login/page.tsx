'use client';

import Link from 'next/link';
import { Lock, Mail, ShieldCheck } from 'lucide-react';
import { useRouter } from 'next/navigation';
import React from 'react';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

export default function LoginPage() {
  const router = useRouter();

  const handleLogin = (event: React.FormEvent) => {
    event.preventDefault();
    router.push('/dashboard');
  };

  return (
    <div className="space-y-8">
      <div className="space-y-4">
        <div className="inline-flex items-center gap-2 rounded-full border border-emerald-200 bg-emerald-50 px-4 py-2 text-sm font-medium text-emerald-700">
          <ShieldCheck className="h-4 w-4" />
          Secure session access
        </div>
        <div className="space-y-2">
          <h1 className="font-headline text-3xl font-semibold tracking-tight text-slate-950">Sign in to LedgerFlow</h1>
          <p className="text-sm leading-7 text-slate-600">
            Access vendor payments, approvals, invoice controls, and AI-supported cash flow insights.
          </p>
        </div>
      </div>

      <form onSubmit={handleLogin} className="space-y-5">
        <div className="space-y-2">
          <Label htmlFor="email">Work email</Label>
          <div className="relative">
            <Mail className="absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
            <Input id="email" type="email" placeholder="finance@yourbusiness.com" required className="h-12 rounded-2xl border-slate-200 bg-white pl-11" />
          </div>
        </div>
        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <Label htmlFor="password">Password</Label>
            <Link href="/forgot-password" className="text-sm font-medium text-primary">
              Forgot password?
            </Link>
          </div>
          <div className="relative">
            <Lock className="absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
            <Input id="password" type="password" placeholder="Enter your password" required className="h-12 rounded-2xl border-slate-200 bg-white pl-11" />
          </div>
        </div>
        <Button type="submit" className="h-12 w-full rounded-2xl text-base">
          Sign in
        </Button>
      </form>

      <div className="grid gap-3 rounded-[1.5rem] border border-slate-200 bg-slate-50 p-5 text-sm text-slate-600">
        <p className="font-medium text-slate-900">Role-based access includes:</p>
        <p>Admin dashboards, accountant payment controls, manager invoice submission, and audit-ready action history.</p>
      </div>

      <p className="text-center text-sm text-slate-600">
        New to LedgerFlow?{' '}
        <Link href="/signup" className="font-medium text-primary">
          Create an account
        </Link>
      </p>
    </div>
  );
}
