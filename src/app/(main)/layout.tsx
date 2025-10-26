import { BottomNav } from '@/components/layout/bottom-nav';
import { SidebarNav } from '@/components/layout/sidebar-nav';
import React from 'react';

export default function MainLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex min-h-screen w-full flex-col bg-background md:flex-row">
      <SidebarNav />
      <div className="flex flex-1 flex-col pb-16 md:pb-0">
        {children}
      </div>
      <BottomNav />
    </div>
  );
}
