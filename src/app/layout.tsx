import type { Metadata } from 'next';

import './globals.css';
import { Toaster } from '@/components/ui/toaster';

export const metadata: Metadata = {
  title: 'LedgerFlow',
  description: 'Modern vendor payment management for retail, wholesale, and multi-location businesses.',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className="font-body">
        {children}
        <Toaster />
      </body>
    </html>
  );
}
