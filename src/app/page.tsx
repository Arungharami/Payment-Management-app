import Link from 'next/link';
import {
  ArrowRight,
  BadgeCheck,
  BrainCircuit,
  Building2,
  CheckCircle2,
  ChevronRight,
  CreditCard,
  FileStack,
  Landmark,
  LineChart,
  ShieldCheck,
  Sparkles,
} from 'lucide-react';

import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { formatCurrency } from '@/lib/format';
import { dashboardMetrics, reportSnapshots, vendors } from '@/lib/platform-data';

const featureCards = [
  {
    title: 'Invoice control with real approvals',
    description:
      'Route bills through manager, accountant, and admin approvals before money leaves the business.',
    icon: FileStack,
  },
  {
    title: 'Payment scheduling across every location',
    description:
      'Queue ACH, wire, card, and check payments with due-date visibility across stores and teams.',
    icon: Landmark,
  },
  {
    title: 'AI support built for AP teams',
    description:
      'Ask operational questions, surface overdue vendors, and prioritize payments without digging through reports.',
    icon: BrainCircuit,
  },
];

const faqs = [
  {
    q: 'Is the platform built for multi-store operators?',
    a: 'Yes. The information architecture is organized around locations, vendors, approvals, and shared payment controls.',
  },
  {
    q: 'Can the product support mock data before backend integration?',
    a: 'Yes. The app is structured with typed domain objects and service-ready modules so live APIs can replace mock data cleanly.',
  },
  {
    q: 'Who is this best suited for?',
    a: 'Retail owners, controllers, bookkeepers, AP teams, and managers handling recurring vendor obligations and approval workflows.',
  },
];

export default function HomePage() {
  return (
    <main className="min-h-screen bg-background text-foreground">
      <section className="relative overflow-hidden border-b border-white/50 bg-[radial-gradient(circle_at_top_left,_rgba(12,158,131,0.18),_transparent_28%),linear-gradient(180deg,_#f7fafc_0%,_#edf3f8_48%,_#f9fbfc_100%)]">
        <div className="absolute inset-x-0 top-0 h-24 bg-[linear-gradient(90deg,rgba(15,23,42,0.05),rgba(15,23,42,0))]" />
        <div className="container py-6">
          <div className="flex items-center justify-between gap-4">
            <Link href="/" className="flex items-center gap-3 text-sm font-semibold tracking-tight text-slate-900">
              <span className="flex h-10 w-10 items-center justify-center rounded-2xl bg-slate-950 text-white shadow-lg shadow-slate-950/15">
                <ShieldCheck className="h-5 w-5" />
              </span>
              LedgerFlow
            </Link>
            <div className="flex items-center gap-3">
              <Button asChild variant="ghost" className="hidden sm:inline-flex">
                <Link href="/login">Sign in</Link>
              </Button>
              <Button asChild className="rounded-full px-5">
                <Link href="/signup">Book a demo</Link>
              </Button>
            </div>
          </div>

          <div className="grid gap-12 py-16 lg:grid-cols-[1.1fr_0.9fr] lg:py-24">
            <div className="space-y-8">
              <div className="inline-flex items-center gap-2 rounded-full border border-emerald-200 bg-white/80 px-4 py-2 text-sm font-medium text-emerald-700 shadow-sm backdrop-blur">
                <Sparkles className="h-4 w-4" />
                Smarter vendor payments for modern retail businesses
              </div>
              <div className="space-y-5">
                <h1 className="max-w-3xl text-4xl font-semibold tracking-tight text-slate-950 sm:text-5xl lg:text-6xl">
                  Manage bills, vendors, approvals, and payments in one intelligent platform.
                </h1>
                <p className="max-w-2xl text-lg leading-8 text-slate-600">
                  LedgerFlow helps retail stores, wholesalers, pharmacies, liquor stores, and multi-location operators run accounts payable with enterprise clarity and small-business speed.
                </p>
              </div>
              <div className="flex flex-wrap gap-3">
                <Button asChild size="lg" className="rounded-full px-6">
                  <Link href="/login">
                    Enter the platform
                    <ArrowRight className="h-4 w-4" />
                  </Link>
                </Button>
                <Button asChild size="lg" variant="outline" className="rounded-full border-slate-300 bg-white/70 px-6">
                  <Link href="/dashboard">Preview dashboard</Link>
                </Button>
              </div>
              <div className="grid gap-4 sm:grid-cols-3">
                {dashboardMetrics.slice(0, 3).map((metric) => (
                  <Card key={metric.label} className="border-white/70 bg-white/75 shadow-xl shadow-slate-200/50 backdrop-blur">
                    <CardContent className="space-y-2 p-5">
                      <p className="text-sm text-slate-500">{metric.label}</p>
                      <p className="text-2xl font-semibold text-slate-950">{metric.value}</p>
                      <p className="text-xs text-slate-500">{metric.helper}</p>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>

            <Card className="border-white/60 bg-slate-950 text-slate-50 shadow-2xl shadow-slate-900/15">
              <CardContent className="space-y-6 p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm uppercase tracking-[0.2em] text-slate-400">Executive Snapshot</p>
                    <h2 className="mt-2 text-2xl font-semibold">Today’s payables posture</h2>
                  </div>
                  <div className="rounded-full bg-emerald-500/15 px-3 py-1 text-sm font-medium text-emerald-300">
                    AI monitored
                  </div>
                </div>
                <div className="grid gap-4 sm:grid-cols-2">
                  <div className="rounded-3xl border border-white/10 bg-white/5 p-5">
                    <p className="text-sm text-slate-400">Upcoming 7-day outflow</p>
                    <p className="mt-3 text-3xl font-semibold">{formatCurrency(reportSnapshots.upcomingOutflow)}</p>
                    <p className="mt-2 text-sm text-slate-400">Across 18 scheduled vendor payments</p>
                  </div>
                  <div className="rounded-3xl border border-white/10 bg-white/5 p-5">
                    <p className="text-sm text-slate-400">Approval queue</p>
                    <p className="mt-3 text-3xl font-semibold">{reportSnapshots.pendingApprovals}</p>
                    <p className="mt-2 text-sm text-slate-400">5 high-priority invoices require action today</p>
                  </div>
                </div>
                <div className="rounded-3xl border border-white/10 bg-gradient-to-br from-white/10 to-white/5 p-5">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-slate-400">Top vendor spend</p>
                      <p className="mt-2 text-xl font-semibold">{vendors[0].name}</p>
                    </div>
                    <LineChart className="h-5 w-5 text-emerald-300" />
                  </div>
                  <div className="mt-5 space-y-3">
                    {reportSnapshots.topVendorSpend.slice(0, 4).map((item) => (
                      <div key={item.vendor} className="space-y-2">
                        <div className="flex items-center justify-between text-sm">
                          <span className="text-slate-300">{item.vendor}</span>
                          <span className="font-medium text-white">{formatCurrency(item.amount)}</span>
                        </div>
                        <div className="h-2 rounded-full bg-white/10">
                          <div className="h-2 rounded-full bg-emerald-400" style={{ width: `${item.share}%` }} />
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      <section className="container py-20">
        <div className="grid gap-6 lg:grid-cols-3">
          {featureCards.map((feature) => (
            <Card key={feature.title} className="border-slate-200/80 bg-white shadow-lg shadow-slate-200/40">
              <CardContent className="space-y-4 p-6">
                <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-slate-950 text-white">
                  <feature.icon className="h-5 w-5" />
                </div>
                <h3 className="text-xl font-semibold text-slate-950">{feature.title}</h3>
                <p className="text-sm leading-7 text-slate-600">{feature.description}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      <section className="border-y bg-slate-950 py-20 text-slate-50">
        <div className="container grid gap-12 lg:grid-cols-[0.85fr_1.15fr]">
          <div className="space-y-5">
            <p className="text-sm uppercase tracking-[0.2em] text-emerald-300">Why teams switch</p>
            <h2 className="text-3xl font-semibold tracking-tight">Built for operational AP, not generic expense tracking.</h2>
            <p className="text-base leading-8 text-slate-300">
              Multi-vendor businesses need more than invoice uploads. LedgerFlow combines vendor records, payment readiness, approval governance, and cash flow intelligence in one place.
            </p>
            <div className="space-y-3">
              {[
                'Role-based approvals with comments and audit trail',
                'Vendor profiles with ACH placeholders, risk flags, and documents',
                'Due soon, overdue, and exception alerts by location',
                'AI assistant trained on operational AP questions',
              ].map((item) => (
                <div key={item} className="flex items-start gap-3 text-sm text-slate-200">
                  <CheckCircle2 className="mt-0.5 h-4 w-4 text-emerald-300" />
                  <span>{item}</span>
                </div>
              ))}
            </div>
          </div>

          <Card className="border-white/10 bg-white/5 text-slate-50">
            <CardContent className="space-y-6 p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-slate-400">Platform Preview</p>
                  <h3 className="mt-1 text-2xl font-semibold">Operations command center</h3>
                </div>
                <div className="rounded-full border border-white/10 px-3 py-1 text-xs text-slate-300">Live workflow</div>
              </div>
              <div className="grid gap-4 md:grid-cols-[1.05fr_0.95fr]">
                <div className="space-y-4 rounded-3xl border border-white/10 bg-slate-900/70 p-5">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-slate-400">Due this week</p>
                      <p className="mt-2 text-3xl font-semibold">{formatCurrency(reportSnapshots.upcomingOutflow)}</p>
                    </div>
                    <div className="rounded-2xl bg-emerald-500/15 p-3 text-emerald-300">
                      <CreditCard className="h-5 w-5" />
                    </div>
                  </div>
                  <div className="space-y-3">
                    {vendors.slice(0, 3).map((vendor) => (
                      <div key={vendor.id} className="flex items-center justify-between rounded-2xl bg-white/5 px-4 py-3">
                        <div>
                          <p className="font-medium">{vendor.name}</p>
                          <p className="text-sm text-slate-400">{vendor.paymentTerms}</p>
                        </div>
                        <ChevronRight className="h-4 w-4 text-slate-500" />
                      </div>
                    ))}
                  </div>
                </div>
                <div className="space-y-4">
                  <div className="rounded-3xl border border-white/10 bg-white/5 p-5">
                    <p className="text-sm text-slate-400">AI assistant</p>
                    <p className="mt-2 text-lg font-semibold">Which vendors are overdue this week?</p>
                    <p className="mt-3 text-sm leading-7 text-slate-300">
                      4 vendors have overdue invoices. RNDC and McKesson have the largest exposure. Prioritize McKesson because pharmacy inventory turns are at risk.
                    </p>
                  </div>
                  <div className="rounded-3xl border border-white/10 bg-white/5 p-5">
                    <p className="text-sm text-slate-400">Approval velocity</p>
                    <div className="mt-4 flex items-end gap-3">
                      {[42, 61, 55, 72, 81, 76].map((height, index) => (
                        <div key={index} className="flex-1 rounded-t-full bg-gradient-to-t from-emerald-400 to-sky-400" style={{ height }} />
                      ))}
                    </div>
                    <p className="mt-3 text-sm text-slate-400">Median turnaround improved by 18% this month.</p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </section>

      <section className="container py-20">
        <div className="grid gap-8 lg:grid-cols-[0.9fr_1.1fr]">
          <div className="space-y-4">
            <p className="text-sm uppercase tracking-[0.2em] text-slate-500">Solutions</p>
            <h2 className="text-3xl font-semibold tracking-tight text-slate-950">Designed for retail operators with real vendor complexity.</h2>
            <p className="text-base leading-8 text-slate-600">
              Liquor stores, grocery groups, pharmacies, convenience operators, and back-office AP teams all need clear due-date visibility, payment discipline, and clean documentation.
            </p>
          </div>
          <div className="grid gap-4 sm:grid-cols-2">
            {[
              ['Retail stores', 'Centralize dozens of distributors, service vendors, and recurring bills.'],
              ['Wholesalers', 'Manage higher-volume invoice cycles and batch payment reviews.'],
              ['Pharmacies', 'Track urgent vendor obligations and document-heavy compliance workflows.'],
              ['Multi-location groups', 'Standardize roles, alerts, and outflow forecasting across stores.'],
            ].map(([title, body]) => (
              <Card key={title} className="border-slate-200/70 bg-white">
                <CardContent className="space-y-3 p-6">
                  <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-slate-100">
                    <Building2 className="h-5 w-5 text-slate-700" />
                  </div>
                  <h3 className="text-lg font-semibold text-slate-950">{title}</h3>
                  <p className="text-sm leading-7 text-slate-600">{body}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      <section className="border-y bg-slate-50 py-20">
        <div className="container grid gap-8 lg:grid-cols-[0.85fr_1.15fr]">
          <div className="space-y-4">
            <p className="text-sm uppercase tracking-[0.2em] text-slate-500">Pricing</p>
            <h2 className="text-3xl font-semibold tracking-tight text-slate-950">Simple pricing framework, ready for packaging.</h2>
            <p className="text-base leading-8 text-slate-600">
              The repository includes a polished pricing section placeholder so the marketing site feels complete while backend packaging evolves.
            </p>
          </div>
          <div className="grid gap-4 md:grid-cols-3">
            {[
              ['Starter', 'For single-store operators', '$149/mo'],
              ['Growth', 'For multi-location AP teams', '$349/mo'],
              ['Enterprise', 'For high-volume workflows', 'Custom'],
            ].map(([plan, subtitle, price]) => (
              <Card key={plan} className={plan === 'Growth' ? 'border-slate-950 bg-slate-950 text-white shadow-xl' : 'border-slate-200 bg-white'}>
                <CardContent className="space-y-5 p-6">
                  <div>
                    <p className="text-lg font-semibold">{plan}</p>
                    <p className={plan === 'Growth' ? 'text-sm text-slate-300' : 'text-sm text-slate-500'}>{subtitle}</p>
                  </div>
                  <p className="text-3xl font-semibold">{price}</p>
                  <Button variant={plan === 'Growth' ? 'secondary' : 'outline'} className="w-full rounded-full">
                    Request access
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      <section className="container py-20">
        <div className="grid gap-10 lg:grid-cols-[0.9fr_1.1fr]">
          <div className="space-y-4">
            <p className="text-sm uppercase tracking-[0.2em] text-slate-500">FAQ</p>
            <h2 className="text-3xl font-semibold tracking-tight text-slate-950">Common questions from operators and finance teams.</h2>
          </div>
          <div className="space-y-4">
            {faqs.map((item) => (
              <Card key={item.q} className="border-slate-200 bg-white">
                <CardContent className="space-y-2 p-6">
                  <p className="font-semibold text-slate-950">{item.q}</p>
                  <p className="text-sm leading-7 text-slate-600">{item.a}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      <section className="border-t bg-slate-950 py-20 text-slate-50">
        <div className="container flex flex-col gap-6 rounded-[2rem] border border-white/10 bg-white/5 p-8 shadow-2xl shadow-slate-950/20 lg:flex-row lg:items-center lg:justify-between">
          <div className="space-y-2">
            <p className="inline-flex items-center gap-2 text-sm text-emerald-300">
              <BadgeCheck className="h-4 w-4" />
              Contact / demo section
            </p>
            <h2 className="text-3xl font-semibold">See how LedgerFlow fits your AP workflow.</h2>
            <p className="max-w-2xl text-sm leading-7 text-slate-300">
              Explore vendor controls, invoice approvals, scheduled payments, analytics, and AI summaries in one operating system for payable workflows.
            </p>
          </div>
          <div className="flex flex-wrap gap-3">
            <Button asChild size="lg" className="rounded-full bg-emerald-500 px-6 text-slate-950 hover:bg-emerald-400">
              <Link href="/signup">Start setup</Link>
            </Button>
            <Button asChild size="lg" variant="outline" className="rounded-full border-white/15 bg-transparent px-6 text-white hover:bg-white/10 hover:text-white">
              <Link href="/dashboard">Open product preview</Link>
            </Button>
          </div>
        </div>
      </section>
    </main>
  );
}
