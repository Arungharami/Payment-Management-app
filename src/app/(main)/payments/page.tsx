import { CalendarDays, Download, PlayCircle } from 'lucide-react';

import { Header } from '@/components/layout/header';
import { InsightCard, SectionIntro, StatusBadge } from '@/components/platform/shared';
import { Button } from '@/components/ui/button';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { formatCurrency, formatDate } from '@/lib/format';
import { payments, getStore, getVendor } from '@/lib/platform-data';

export default function PaymentsPage() {
  return (
    <>
      <Header title="Payments" />
      <main className="flex-1 space-y-8 px-4 py-6 md:px-8">
        <SectionIntro
          eyebrow="Payment operations"
          title="Schedule, batch, confirm, and monitor vendor payouts with full reference tracking."
          description="Support ACH, bank transfer, wire, card, or check records while keeping payment status and remittance context visible to finance teams."
          action={
            <>
              <Button variant="outline" className="rounded-full border-slate-200 bg-white">
                <Download className="h-4 w-4" />
                Export payments
              </Button>
              <Button className="rounded-full">
                <PlayCircle className="h-4 w-4" />
                Process batch
              </Button>
            </>
          }
        />

        <div className="grid gap-6 xl:grid-cols-[1.15fr_0.85fr]">
          <InsightCard title="Payment queue" description="Reference numbers, methods, dates, and confirmation state in one operational grid.">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Vendor</TableHead>
                  <TableHead>Store</TableHead>
                  <TableHead>Reference</TableHead>
                  <TableHead>Method</TableHead>
                  <TableHead>Amount</TableHead>
                  <TableHead>Status</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {payments.map((payment) => (
                  <TableRow key={payment.id}>
                    <TableCell>{getVendor(payment.vendorId)?.name}</TableCell>
                    <TableCell>{getStore(payment.storeId)?.name}</TableCell>
                    <TableCell>{payment.referenceNumber}</TableCell>
                    <TableCell>{payment.method}</TableCell>
                    <TableCell>{formatCurrency(payment.amount)}</TableCell>
                    <TableCell>
                      <StatusBadge value={payment.status} />
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </InsightCard>

          <div className="grid gap-6">
            <InsightCard title="Upcoming calendar" description="Upcoming release dates and batch groupings.">
              <div className="space-y-4">
                {payments.map((payment) => (
                  <div key={payment.id} className="flex items-center gap-4 rounded-2xl border border-slate-200 bg-slate-50/80 p-4">
                    <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-slate-950 text-white">
                      <CalendarDays className="h-5 w-5" />
                    </div>
                    <div className="flex-1">
                      <p className="font-medium text-slate-900">{payment.batchName}</p>
                      <p className="text-sm text-slate-500">{formatDate(payment.scheduledDate)} · {payment.method}</p>
                    </div>
                    <div className="text-right">
                      <p className="font-semibold text-slate-900">{formatCurrency(payment.amount)}</p>
                      <StatusBadge value={payment.status} />
                    </div>
                  </div>
                ))}
              </div>
            </InsightCard>

            <InsightCard title="Batch processing UI" description="Batch tools can group releases by vendor type, bank cutoff, or approval readiness.">
              <div className="rounded-3xl border border-slate-200 bg-white p-5">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-slate-500">Ready batch</p>
                    <p className="mt-1 text-xl font-semibold text-slate-900">West Coast Monday batch</p>
                  </div>
                  <StatusBadge value="Scheduled" />
                </div>
                <div className="mt-4 grid gap-3 text-sm">
                  <div className="flex items-center justify-between">
                    <span className="text-slate-500">Invoices included</span>
                    <span className="font-medium text-slate-900">4</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-slate-500">Estimated release</span>
                    <span className="font-medium text-slate-900">{formatDate('2026-03-25')}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-slate-500">Total batch amount</span>
                    <span className="font-medium text-slate-900">{formatCurrency(33720)}</span>
                  </div>
                </div>
              </div>
            </InsightCard>
          </div>
        </div>
      </main>
    </>
  );
}
