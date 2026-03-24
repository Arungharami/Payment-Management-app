import { Download } from 'lucide-react';

import { Header } from '@/components/layout/header';
import { MethodDistributionChart, OverdueTrendChart, SpendTrendChart } from '@/components/platform/charts';
import { InsightCard, ProgressList, SectionIntro } from '@/components/platform/shared';
import { Button } from '@/components/ui/button';
import { approvalTurnaround, monthlySpend, overdueTrend, paymentMethodDistribution, reportSnapshots } from '@/lib/platform-data';
import { formatCurrency } from '@/lib/format';

export default function AnalyticsPage() {
  return (
    <>
      <Header title="Analytics" />
      <main className="flex-1 space-y-8 px-4 py-6 md:px-8">
        <SectionIntro
          eyebrow="Reports and analytics"
          title="Turn invoice, vendor, and payment activity into operating insight."
          description="Charts and tables summarize spending, overdue risk, approval speed, payment mix, and forecasted outflow for finance leadership."
          action={
            <Button variant="outline" className="rounded-full border-slate-200 bg-white">
              <Download className="h-4 w-4" />
              Export PDF
            </Button>
          }
        />

        <div className="grid gap-6 xl:grid-cols-[1.15fr_0.85fr]">
          <InsightCard title="Monthly spending" description="Spend and paid totals by month.">
            <SpendTrendChart data={monthlySpend} />
          </InsightCard>
          <InsightCard title="Payment mix" description="Distribution across ACH, wire, card, and check records.">
            <MethodDistributionChart data={paymentMethodDistribution} />
          </InsightCard>
        </div>

        <div className="grid gap-6 xl:grid-cols-[0.9fr_1.1fr]">
          <InsightCard title="Overdue trend" description="Weekly overdue invoice count.">
            <OverdueTrendChart data={overdueTrend} />
          </InsightCard>
          <InsightCard title="Approval turnaround" description="How quickly approval tasks are being resolved.">
            <ProgressList items={approvalTurnaround.map((item) => ({ label: item.label, value: item.value }))} />
          </InsightCard>
        </div>

        <div className="grid gap-6 lg:grid-cols-3">
          {reportSnapshots.topVendorSpend.map((item) => (
            <InsightCard key={item.vendor} title={item.vendor} description="Top vendors by spend">
              <div className="space-y-3">
                <p className="text-3xl font-semibold text-slate-950">{formatCurrency(item.amount)}</p>
                <p className="text-sm text-slate-600">{item.share}% of current high-value vendor exposure</p>
              </div>
            </InsightCard>
          ))}
        </div>
      </main>
    </>
  );
}
