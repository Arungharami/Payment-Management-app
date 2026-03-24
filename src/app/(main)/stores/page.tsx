import { Building2, Plus } from 'lucide-react';

import { Header } from '@/components/layout/header';
import { InsightCard, SectionIntro } from '@/components/platform/shared';
import { Button } from '@/components/ui/button';
import { formatCurrency } from '@/lib/format';
import { stores } from '@/lib/platform-data';

export default function StoresPage() {
  return (
    <>
      <Header title="Stores" />
      <main className="flex-1 space-y-8 px-4 py-6 md:px-8">
        <SectionIntro
          eyebrow="Multi-location ready"
          title="Organize payables by store, warehouse, pharmacy, and back-office team."
          description="The architecture is built for shared vendor records with location-aware invoices, payments, and operational issue tracking."
          action={
            <Button className="rounded-full">
              <Plus className="h-4 w-4" />
              Add location
            </Button>
          }
        />

        <div className="grid gap-6 lg:grid-cols-2">
          {stores.map((store) => (
            <InsightCard key={store.id} title={store.name} description={`${store.city}, ${store.state} · ${store.type}`}>
              <div className="space-y-4">
                <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-slate-950 text-white">
                  <Building2 className="h-5 w-5" />
                </div>
                <div className="grid gap-3 text-sm">
                  <div className="flex items-center justify-between">
                    <span className="text-slate-500">Store manager</span>
                    <span className="font-medium text-slate-900">{store.manager}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-slate-500">Monthly outflow</span>
                    <span className="font-medium text-slate-900">{formatCurrency(store.monthlyOutflow)}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-slate-500">Open issues</span>
                    <span className="font-medium text-slate-900">{store.openIssues}</span>
                  </div>
                </div>
              </div>
            </InsightCard>
          ))}
        </div>
      </main>
    </>
  );
}
