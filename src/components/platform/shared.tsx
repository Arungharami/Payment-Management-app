import { ReactNode } from 'react';
import { LucideIcon } from 'lucide-react';

import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { cn } from '@/lib/utils';

type MetricCardProps = {
  title: string;
  value: string;
  helper: string;
  delta?: string;
  icon: LucideIcon;
};

const statusStyles: Record<string, string> = {
  Active: 'border-emerald-200 bg-emerald-50 text-emerald-700',
  Inactive: 'border-slate-200 bg-slate-100 text-slate-600',
  Pending: 'border-amber-200 bg-amber-50 text-amber-700',
  Approved: 'border-emerald-200 bg-emerald-50 text-emerald-700',
  Rejected: 'border-rose-200 bg-rose-50 text-rose-700',
  Scheduled: 'border-sky-200 bg-sky-50 text-sky-700',
  Completed: 'border-emerald-200 bg-emerald-50 text-emerald-700',
  Failed: 'border-rose-200 bg-rose-50 text-rose-700',
  Processing: 'border-blue-200 bg-blue-50 text-blue-700',
  Paid: 'border-emerald-200 bg-emerald-50 text-emerald-700',
  Overdue: 'border-rose-200 bg-rose-50 text-rose-700',
  'Partially Paid': 'border-orange-200 bg-orange-50 text-orange-700',
  Draft: 'border-slate-200 bg-slate-100 text-slate-600',
  Low: 'border-emerald-200 bg-emerald-50 text-emerald-700',
  Medium: 'border-amber-200 bg-amber-50 text-amber-700',
  High: 'border-rose-200 bg-rose-50 text-rose-700',
  Critical: 'border-rose-200 bg-rose-50 text-rose-700',
  Warning: 'border-amber-200 bg-amber-50 text-amber-700',
  Info: 'border-blue-200 bg-blue-50 text-blue-700',
  Success: 'border-emerald-200 bg-emerald-50 text-emerald-700',
};

export function MetricCard({ title, value, helper, delta, icon: Icon }: MetricCardProps) {
  return (
    <Card className="border-white/70 bg-white/90 shadow-lg shadow-slate-200/50">
      <CardContent className="p-5">
        <div className="flex items-start justify-between gap-3">
          <div className="space-y-2">
            <p className="text-sm text-muted-foreground">{title}</p>
            <p className="text-3xl font-semibold tracking-tight text-slate-950">{value}</p>
            <p className="text-sm text-slate-500">{helper}</p>
          </div>
          <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-slate-950 text-white">
            <Icon className="h-5 w-5" />
          </div>
        </div>
        {delta ? <p className="mt-4 text-xs font-medium text-slate-600">{delta}</p> : null}
      </CardContent>
    </Card>
  );
}

export function SectionIntro({
  eyebrow,
  title,
  description,
  action,
}: {
  eyebrow?: string;
  title: string;
  description: string;
  action?: ReactNode;
}) {
  return (
    <div className="flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
      <div className="space-y-2">
        {eyebrow ? <p className="text-xs font-semibold uppercase tracking-[0.22em] text-slate-500">{eyebrow}</p> : null}
        <h1 className="text-3xl font-semibold tracking-tight text-slate-950">{title}</h1>
        <p className="max-w-3xl text-sm leading-7 text-slate-600">{description}</p>
      </div>
      {action ? <div className="flex shrink-0 items-center gap-3">{action}</div> : null}
    </div>
  );
}

export function StatusBadge({ value }: { value: string }) {
  return <Badge className={cn('border font-medium', statusStyles[value] ?? 'border-slate-200 bg-slate-100 text-slate-700')}>{value}</Badge>;
}

export function InsightCard({
  title,
  description,
  children,
}: {
  title: string;
  description?: string;
  children: ReactNode;
}) {
  return (
    <Card className="border-slate-200/80 bg-white shadow-sm">
      <CardHeader className="space-y-2">
        <CardTitle className="text-lg">{title}</CardTitle>
        {description ? <CardDescription>{description}</CardDescription> : null}
      </CardHeader>
      <CardContent>{children}</CardContent>
    </Card>
  );
}

export function EmptyState({
  title,
  description,
  actionLabel,
}: {
  title: string;
  description: string;
  actionLabel?: string;
}) {
  return (
    <Card className="border-dashed border-slate-300 bg-slate-50/80">
      <CardContent className="flex flex-col items-center justify-center gap-4 p-10 text-center">
        <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-white shadow-sm">
          <span className="text-lg font-semibold text-slate-500">0</span>
        </div>
        <div className="space-y-2">
          <p className="text-lg font-semibold text-slate-900">{title}</p>
          <p className="max-w-md text-sm leading-7 text-slate-600">{description}</p>
        </div>
        {actionLabel ? <Button variant="outline">{actionLabel}</Button> : null}
      </CardContent>
    </Card>
  );
}

export function ProgressList({
  items,
}: {
  items: Array<{ label: string; value: number; helper?: string }>;
}) {
  return (
    <div className="space-y-4">
      {items.map((item) => (
        <div key={item.label} className="space-y-2">
          <div className="flex items-center justify-between gap-3 text-sm">
            <span className="font-medium text-slate-800">{item.label}</span>
            <span className="text-slate-500">{item.value}%</span>
          </div>
          <Progress value={item.value} className="h-2.5" />
          {item.helper ? <p className="text-xs text-slate-500">{item.helper}</p> : null}
        </div>
      ))}
    </div>
  );
}

export function KeyValueGrid({
  items,
}: {
  items: Array<{ label: string; value: string }>;
}) {
  return (
    <div className="grid gap-4 sm:grid-cols-2">
      {items.map((item) => (
        <div key={item.label} className="rounded-2xl border border-slate-200 bg-slate-50/70 p-4">
          <p className="text-xs uppercase tracking-[0.18em] text-slate-500">{item.label}</p>
          <p className="mt-2 text-sm font-medium text-slate-900">{item.value}</p>
        </div>
      ))}
    </div>
  );
}
