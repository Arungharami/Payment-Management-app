'use client';

import Link from 'next/link';
import { Building2, Lock, Mail, User2 } from 'lucide-react';
import { useRouter } from 'next/navigation';
import React from 'react';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

export default function SignupPage() {
  const router = useRouter();

  const handleSignup = (event: React.FormEvent) => {
    event.preventDefault();
    router.push('/dashboard');
  };

  return (
    <div className="space-y-8">
      <div className="space-y-4">
        <div className="inline-flex items-center gap-2 rounded-full border border-sky-200 bg-sky-50 px-4 py-2 text-sm font-medium text-sky-700">
          <Building2 className="h-4 w-4" />
          Set up your AP workspace
        </div>
        <div className="space-y-2">
          <h1 className="font-headline text-3xl font-semibold tracking-tight text-slate-950">Create your LedgerFlow account</h1>
          <p className="text-sm leading-7 text-slate-600">
            Start with a production-ready workspace for vendors, invoices, approvals, payments, and reporting.
          </p>
        </div>
      </div>

      <form onSubmit={handleSignup} className="space-y-5">
        <div className="space-y-2">
          <Label htmlFor="name">Full name</Label>
          <div className="relative">
            <User2 className="absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
            <Input id="name" placeholder="Arun Gharami" required className="h-12 rounded-2xl border-slate-200 bg-white pl-11" />
          </div>
        </div>
        <div className="space-y-2">
          <Label htmlFor="company">Business name</Label>
          <div className="relative">
            <Building2 className="absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
            <Input id="company" placeholder="Your retail group or store name" required className="h-12 rounded-2xl border-slate-200 bg-white pl-11" />
          </div>
        </div>
        <div className="space-y-2">
          <Label htmlFor="email">Work email</Label>
          <div className="relative">
            <Mail className="absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
            <Input id="email" type="email" placeholder="finance@yourbusiness.com" required className="h-12 rounded-2xl border-slate-200 bg-white pl-11" />
          </div>
        </div>
        <div className="space-y-2">
          <Label htmlFor="password">Password</Label>
          <div className="relative">
            <Lock className="absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
            <Input id="password" type="password" placeholder="Create a secure password" required className="h-12 rounded-2xl border-slate-200 bg-white pl-11" />
          </div>
        </div>
        <Button type="submit" className="h-12 w-full rounded-2xl text-base">
          Create workspace
        </Button>
      </form>

      <div className="rounded-[1.5rem] border border-slate-200 bg-slate-50 p-5 text-sm leading-7 text-slate-600">
        Workspace setup includes stores, users, approval policies, notification defaults, and AI assistant preferences.
      </div>

      <p className="text-center text-sm text-slate-600">
        Already have access?{' '}
        <Link href="/login" className="font-medium text-primary">
          Sign in
        </Link>
      </p>
    </div>
  );
}
