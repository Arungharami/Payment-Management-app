import { BottomNav } from '@/components/layout/bottom-nav';
import { SidebarNav } from '@/components/layout/sidebar-nav';

export default function MainLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen bg-transparent">
      <div className="flex min-h-screen w-full flex-col md:flex-row">
        <SidebarNav />
        <div className="flex min-h-screen flex-1 flex-col pb-20 md:pb-0">{children}</div>
      </div>
      <BottomNav />
    </div>
  );
}
