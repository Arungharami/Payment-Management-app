import Link from 'next/link';
import { BrainCircuit, Building2, ShieldCheck } from 'lucide-react';

import { businessProfile } from '@/lib/platform-data';

const highlights = [
  'Approval workflows for store managers, accountants, and admins',
  'Vendor records with documents, payment terms, and risk visibility',
  'AI support for overdue invoices, payment prioritization, and cash flow context',
];

export default function AuthLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen bg-[radial-gradient(circle_at_top_left,_rgba(14,165,164,0.12),_transparent_24%),linear-gradient(180deg,_#edf4f8_0%,_#f8fafc_100%)]">
      <div className="container grid min-h-screen items-center gap-10 py-10 lg:grid-cols-[1fr_520px]">
        <div className="hidden rounded-[2rem] border border-white/70 bg-slate-950 p-10 text-white shadow-2xl shadow-slate-900/10 lg:block">
          <Link href="/" className="inline-flex items-center gap-3 text-lg font-semibold">
            <span className="flex h-11 w-11 items-center justify-center rounded-2xl bg-white/10">
              <ShieldCheck className="h-5 w-5" />
            </span>
            LedgerFlow
          </Link>
          <div className="mt-14 space-y-6">
            <div className="space-y-4">
              <p className="text-sm uppercase tracking-[0.22em] text-emerald-300">AP Operating System</p>
              <h1 className="text-4xl font-semibold tracking-tight">
                Payment management built for real vendor workflows.
              </h1>
              <p className="max-w-xl text-base leading-8 text-slate-300">
                Centralize due dates, approvals, payment scheduling, vendor documents, and AI-assisted decision support across California and U.S. retail operations.
              </p>
            </div>
            <div className="grid gap-4">
              {highlights.map((item, index) => {
                const Icon = index === 0 ? Building2 : index === 1 ? ShieldCheck : BrainCircuit;
                return (
                  <div key={item} className="flex gap-4 rounded-3xl border border-white/10 bg-white/5 p-5">
                    <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl bg-white/10">
                      <Icon className="h-5 w-5 text-emerald-300" />
                    </div>
                    <p className="text-sm leading-7 text-slate-200">{item}</p>
                  </div>
                );
              })}
            </div>
            <div className="rounded-3xl border border-white/10 bg-white/5 p-5">
              <p className="text-sm text-slate-400">Serving</p>
              <p className="mt-2 text-xl font-semibold">{businessProfile.entityType}</p>
              <p className="mt-2 text-sm text-slate-300">{businessProfile.headquarters}</p>
            </div>
          </div>
        </div>

        <div className="mx-auto w-full max-w-xl rounded-[2rem] border border-white/70 bg-white/85 p-8 shadow-2xl shadow-slate-200/60 backdrop-blur md:p-10">
          {children}
        </div>
      </div>
    </div>
  );
}
