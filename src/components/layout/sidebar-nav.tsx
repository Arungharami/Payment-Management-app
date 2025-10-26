'use client';

import { usePathname } from 'next/navigation';
import Link from 'next/link';
import { Home, Package, History, User, Shield } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Separator } from '../ui/separator';

const navItems = [
  { href: '/dashboard', label: 'Dashboard', icon: Home },
  { href: '/vendors', label: 'Vendors', icon: Package },
  { href: '/history', label: 'History', icon: History },
  { href: '/profile', label: 'Profile', icon: User },
];

export function SidebarNav() {
  const pathname = usePathname();

  return (
    <aside className="hidden w-64 flex-col border-r bg-card md:flex">
      <div className="flex h-16 items-center border-b px-6">
        <Link href="/dashboard" className="flex items-center gap-2 font-semibold">
          <Shield className="h-6 w-6 text-primary" />
          <span>LiquorPay</span>
        </Link>
      </div>
      <div className="flex-1 overflow-auto py-4">
        <nav className="grid items-start px-4 text-sm font-medium">
          {navItems.map(({ href, label, icon: Icon }) => {
            const isActive = pathname.startsWith(href);
            return (
              <Link
                key={href}
                href={href}
                className={cn(
                  'flex items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground transition-all hover:text-primary',
                  isActive && 'bg-muted text-primary'
                )}
              >
                <Icon className="h-4 w-4" />
                {label}
              </Link>
            );
          })}
        </nav>
      </div>
      <Separator/>
       <div className="p-4">
        <div className="text-xs text-muted-foreground">© 2024 LiquorPay Inc.</div>
       </div>
    </aside>
  );
}
