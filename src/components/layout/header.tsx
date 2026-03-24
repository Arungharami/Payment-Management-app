import Link from 'next/link';
import { Bell, ChevronDown, Search } from 'lucide-react';

import { ThemeToggle } from '@/components/layout/theme-toggle';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { notifications, userProfile } from '@/lib/platform-data';

export function Header({ title }: { title: string }) {
  return (
    <header className="sticky top-0 z-30 border-b border-white/60 bg-background/85 backdrop-blur-xl">
      <div className="flex flex-col gap-4 px-4 py-4 md:px-8 lg:flex-row lg:items-center lg:justify-between">
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.18em] text-slate-500">LedgerFlow Workspace</p>
          <h1 className="mt-1 font-headline text-2xl font-semibold tracking-tight text-slate-950">{title}</h1>
        </div>
        <div className="flex flex-1 items-center justify-end gap-3">
          <div className="relative hidden w-full max-w-md lg:block">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
            <Input className="h-11 rounded-full border-slate-200 bg-white/90 pl-10" placeholder="Search vendors, invoices, payments, or docs" />
          </div>
          <ThemeToggle />
          <Button asChild variant="outline" size="icon" className="relative rounded-full border-slate-200 bg-white/80">
            <Link href="/notifications">
              <Bell className="h-4 w-4" />
              <span className="sr-only">Open notifications</span>
              <span className="absolute -right-1 -top-1 flex h-5 min-w-5 items-center justify-center rounded-full bg-rose-500 px-1 text-[10px] font-semibold text-white">
                {notifications.length}
              </span>
            </Link>
          </Button>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" className="h-11 rounded-full border-slate-200 bg-white/90 px-2.5">
                <Avatar className="h-8 w-8">
                  <AvatarFallback className="bg-slate-950 text-xs font-semibold text-white">{userProfile.initials}</AvatarFallback>
                </Avatar>
                <div className="hidden text-left sm:block">
                  <p className="text-sm font-medium text-slate-900">{userProfile.name}</p>
                  <p className="text-xs text-slate-500">{userProfile.role}</p>
                </div>
                <ChevronDown className="h-4 w-4 text-slate-400" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-64 rounded-2xl border-slate-200">
              <DropdownMenuLabel className="font-normal">
                <div className="space-y-1">
                  <p className="text-sm font-medium text-slate-900">{userProfile.name}</p>
                  <p className="text-xs text-slate-500">{userProfile.email}</p>
                </div>
              </DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuGroup>
                <DropdownMenuItem asChild>
                  <Link href="/settings">Settings</Link>
                </DropdownMenuItem>
                <DropdownMenuItem asChild>
                  <Link href="/assistant">AI Assistant</Link>
                </DropdownMenuItem>
                <DropdownMenuItem asChild>
                  <Link href="/login">Sign out</Link>
                </DropdownMenuItem>
              </DropdownMenuGroup>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
    </header>
  );
}
