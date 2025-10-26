'use client';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Separator } from '@/components/ui/separator';
import { useRouter } from 'next/navigation';
import { Shield, Mail, Lock } from 'lucide-react';
import React from 'react';

const AppleIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg viewBox="0 0 24 24" fill="currentColor" {...props}>
    <path d="M19.39 10.74C19.41 10.73 19.43 10.71 19.45 10.7C19.44 10.71 19.43 10.72 19.42 10.73C18.33 9.71001 17.65 8.24001 17.65 6.43001C17.65 4.29001 19.03 3.09001 20.37 2.37001C18.68 1.15001 16.32 1.28001 15.02 2.65001C14.04 3.70001 13.5 5.08001 13.5 6.43001C13.5 8.37001 14.22 9.77001 15.34 10.74C15.35 10.75 15.36 10.76 15.38 10.77C15.37 10.76 15.36 10.75 15.35 10.74C14.34 11.45 13.5 12.68 13.5 14.12C13.5 15.99 14.63 17.38 16.2 17.91C16.3 16.6 16.81 15.38 17.62 14.53C16.37 13.51 16.32 12.02 17.22 11.08C18.15 10.11 19.38 10.08 20.44 10.83C20.31 10.81 20.19 10.8 20.06 10.8C19.83 10.8 19.6 10.78 19.39 10.74ZM12.01 22C11.18 22 10.37 21.84 9.58001 21.52C8.75001 21.19 8.01001 20.73 7.37001 20.1C5.87001 18.62 5.00001 16.63 5.00001 14.12C5.00001 12.18 5.64001 10.45 6.94001 9.00001C7.47001 8.35001 8.13001 7.82001 8.90001 7.43001C9.68001 7.04001 10.5 6.85001 11.33 6.85001C11.58 6.85001 11.83 6.86001 12.08 6.89001C12.07 6.01001 11.9 5.16001 11.62 4.38001C9.91001 4.79001 8.35001 5.76001 7.37001 7.37001C6.01001 9.42001 5.31001 11.51 5.63001 13.59C5.72001 14.28 5.92001 14.96 6.22001 15.59C4.19001 14.49 3.00001 13.13 3.00001 11.01C3.00001 9.61001 3.48001 8.24001 4.45001 7.02001C5.23001 6.02001 6.13001 5.30001 7.15001 4.88001C5.82001 4.74001 4.54001 5.21001 3.54001 6.22001C2.96001 6.80001 2.50001 7.48001 2.18001 8.24001C1.22001 10.36 1.49001 13.01 2.97001 15.22C3.78001 16.45 4.84001 17.58 6.13001 18.57C6.73001 19.02 7.39001 19.4 8.11001 19.68C7.54001 18.52 7.24001 17.25 7.24001 15.89C7.24001 15.21 7.33001 14.54 7.51001 13.91C7.81001 12.9 8.35001 12.01 9.13001 11.31C9.91001 10.61 10.87 10.15 11.96 10.02C12.16 11.31 12.01 12.63 11.53 13.84C10.74 15.86 11.23 17.96 12.59 19.32C13.25 19.99 14.04 20.5 14.93 20.84C15.81 21.18 16.74 21.35 17.65 21.35C18.11 21.35 18.56 21.3 19.01 21.21C20.25 21.91 21.01 22 21.03 22C21.01 22 12.01 22 12.01 22Z" />
  </svg>
);

const GoogleIcon = (props: React.SVGProps<SVGSVGElement>) => (
    <svg viewBox="0 0 24 24" fill="currentColor" {...props}>
        <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4" />
        <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853" />
        <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l3.66-2.84z" fill="#FBBC05" />
        <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335" />
        <path d="M1 1h22v22H1z" fill="none" />
    </svg>
);


export default function LoginPage() {
  const router = useRouter();

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    // In a real app, you'd have validation and an API call here.
    // For this demo, we'll just redirect.
    router.push('/dashboard');
  };

  return (
    <>
      <div className="text-center">
        <div className="flex justify-center items-center gap-2 mb-4">
          <Shield className="h-8 w-8 text-primary" />
          <h1 className="text-3xl font-bold font-headline text-foreground">LiquorPay</h1>
        </div>
        <h2 className="text-2xl font-semibold tracking-tight">Welcome Back</h2>
        <p className="text-sm text-muted-foreground mt-2">
          Securely sign in to your vendor payment hub.
        </p>
      </div>

      <form onSubmit={handleLogin} className="space-y-4">
        <div className="grid gap-2">
          <Label htmlFor="email">Email</Label>
          <div className="relative">
            <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input id="email" type="email" placeholder="owner@liquorstore.com" required className="pl-10"/>
          </div>
        </div>
        <div className="grid gap-2">
          <Label htmlFor="password">Password</Label>
          <div className="relative">
             <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input id="password" type="password" placeholder="••••••••" required className="pl-10"/>
          </div>
        </div>
        <Button type="submit" className="w-full bg-primary hover:bg-primary/90 text-primary-foreground">
          Sign In
        </Button>
      </form>

      <div className="relative">
        <Separator className="my-4" />
        <div className="absolute inset-0 flex items-center">
          <span className="w-full border-t" />
        </div>
        <div className="relative flex justify-center text-xs uppercase">
          <span className="bg-card px-2 text-muted-foreground">Or continue with</span>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <Button variant="outline">
          <GoogleIcon className="mr-2 h-4 w-4" /> Google
        </Button>
        <Button variant="outline">
          <AppleIcon className="mr-2 h-4 w-4" /> Apple
        </Button>
      </div>
      <p className="px-8 text-center text-sm text-muted-foreground mt-4">
        Don't have an account?{' '}
        <a href="/signup" className="underline underline-offset-4 hover:text-primary">
          Sign Up
        </a>
      </p>
    </>
  );
}
