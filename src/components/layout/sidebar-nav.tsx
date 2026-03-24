'use client';

import Link from 'next/link';
import { ShieldCheck } from 'lucide-react';
import { usePathname } from 'next/navigation';

import { primaryNav, secondaryNav } from '@/lib/platform-data';
import { cn } from '@/lib/utils';

function NavSection({
  items,
  pathname,
}: {
  items: typeof primaryNav;
  pathname: string;
}) {
  return (
    <nav className="grid gap-1">
      {items.map(({ href, label, icon: Icon }) => {
        const isActive = pathname.startsWith(href);
        return (
          <Link
            key={href}
            href={href}
            className={cn(
              'group flex items-center gap-3 rounded-2xl px-4 py-3 text-sm font-medium text-slate-600 transition-all hover:bg-white hover:text-slate-950',
              isActive && 'bg-slate-950 text-white shadow-lg shadow-slate-300/40 hover:bg-slate-950 hover:text-white'
            )}
          >
            <Icon className={cn('h-4 w-4', isActive ? 'text-white' : 'text-slate-500 group-hover:text-slate-900')} />
            {label}
          </Link>
        );
      })}
    </nav>
  );
}

export function SidebarNav() {
  const pathname = usePathname();

  return (
    <aside className="hidden w-[290px] shrink-0 border-r border-white/70 bg-slate-50/75 px-5 py-5 backdrop-blur md:flex md:flex-col">
      <Link href="/dashboard" className="flex items-center gap-3 rounded-3xl bg-white px-4 py-4 shadow-sm">
        <span className="flex h-11 w-11 items-center justify-center rounded-2xl bg-slate-950 text-white">
          <ShieldCheck className="h-5 w-5" />
        </span>
        <div>
          <p className="font-semibold text-slate-950">LedgerFlow</p>
          <p className="text-xs text-slate-500">Vendor Payments OS</p>
        </div>
      </Link>

      <div className="mt-8 flex-1 overflow-y-auto">
        <p className="mb-3 px-2 text-xs font-semibold uppercase tracking-[0.18em] text-slate-400">Platform</p>
        <NavSection items={primaryNav} pathname={pathname} />

        <p className="mb-3 mt-8 px-2 text-xs font-semibold uppercase tracking-[0.18em] text-slate-400">Workspace</p>
        <NavSection items={secondaryNav} pathname={pathname} />
      </div>

      <div className="rounded-[1.5rem] border border-slate-200 bg-white p-4 shadow-sm">
        <p className="text-sm font-semibold text-slate-900">Cash flow visibility</p>
        <p className="mt-2 text-sm leading-6 text-slate-600">
          Prioritize vendor bills with approval status, due dates, and payment readiness in one queue.
        </p>
      </div>
    </aside>
  );
}
