import { ArrowRight, Download, Plus } from 'lucide-react';

import { Header } from '@/components/layout/header';
import { MethodDistributionChart, SpendTrendChart } from '@/components/platform/charts';
import { InsightCard, MetricCard, SectionIntro, StatusBadge } from '@/components/platform/shared';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { formatCurrency, formatDate } from '@/lib/format';
import {
  activityFeed,
  approvalItems,
  cashFlowCards,
  dashboardMetrics,
  invoices,
  monthlySpend,
  payments,
  paymentMethodDistribution,
  reportSnapshots,
  roleCards,
  stores,
  vendors,
  getStore,
  getVendor,
} from '@/lib/platform-data';

export default function DashboardPage() {
  const topInvoices = invoices.slice(0, 5);
  const upcomingPayments = payments.filter((payment) => payment.status !== 'Completed').slice(0, 4);

  return (
    <>
      <Header title="Dashboard" />
      <main className="flex-1 space-y-8 px-4 py-6 md:px-8">
        <SectionIntro
          eyebrow="Financial command center"
          title="Accounts payable visibility for every store, vendor, and payment cycle."
          description="Track payable exposure, upcoming due dates, overdue exceptions, approval bottlenecks, and store-level cash flow from one operating dashboard."
          action={
            <>
              <Button variant="outline" className="rounded-full border-slate-200 bg-white">
                <Download className="h-4 w-4" />
                Export overview
              </Button>
              <Button className="rounded-full">
                <Plus className="h-4 w-4" />
                New invoice
              </Button>
            </>
          }
        />

        <div className="grid gap-4 xl:grid-cols-3">
          <div className="grid gap-4 sm:grid-cols-2 xl:col-span-2 xl:grid-cols-3">
            {dashboardMetrics.map((metric) => (
              <MetricCard
                key={metric.label}
                title={metric.label}
                value={metric.value}
                helper={metric.helper}
                delta={metric.delta}
                icon={metric.icon}
              />
            ))}
          </div>
          <Card className="border-white/70 bg-slate-950 text-white shadow-xl shadow-slate-300/30">
            <CardContent className="space-y-5 p-6">
              <div>
                <p className="text-xs uppercase tracking-[0.18em] text-slate-400">Cash flow summary</p>
                <h2 className="mt-2 text-2xl font-semibold">Payment posture this week</h2>
              </div>
              <div className="space-y-4">
                {cashFlowCards.map((card) => (
                  <div key={card.label} className="rounded-3xl border border-white/10 bg-white/5 p-4">
                    <p className="text-sm text-slate-400">{card.label}</p>
                    <p className="mt-2 text-2xl font-semibold">{card.value}</p>
                    <p className="mt-1 text-xs text-slate-400">{card.helper}</p>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="grid gap-6 xl:grid-cols-[1.3fr_0.7fr]">
          <InsightCard title="Spending and payment trend" description="Monthly spend vs paid invoices across the AP cycle.">
            <SpendTrendChart data={monthlySpend} />
          </InsightCard>
          <InsightCard title="Payment method mix" description="Operational distribution across release types.">
            <MethodDistributionChart data={paymentMethodDistribution} />
          </InsightCard>
        </div>

        <div className="grid gap-6 xl:grid-cols-[1.2fr_0.8fr]">
          <InsightCard title="Invoice queue" description="Highest priority invoices needing attention.">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Invoice</TableHead>
                  <TableHead>Vendor</TableHead>
                  <TableHead>Store</TableHead>
                  <TableHead>Amount</TableHead>
                  <TableHead>Status</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {topInvoices.map((invoice) => {
                  const vendor = getVendor(invoice.vendorId);
                  const store = getStore(invoice.storeId);
                  return (
                    <TableRow key={invoice.id}>
                      <TableCell>
                        <div>
                          <p className="font-medium text-slate-900">{invoice.invoiceNumber}</p>
                          <p className="text-xs text-slate-500">{formatDate(invoice.dueDate)}</p>
                        </div>
                      </TableCell>
                      <TableCell>{vendor?.name}</TableCell>
                      <TableCell>{store?.name}</TableCell>
                      <TableCell>{formatCurrency(invoice.amount)}</TableCell>
                      <TableCell>
                        <div className="flex gap-2">
                          <StatusBadge value={invoice.status} />
                          <StatusBadge value={invoice.approvalStatus} />
                        </div>
                      </TableCell>
                    </TableRow>
                  );
                })}
              </TableBody>
            </Table>
          </InsightCard>

          <InsightCard title="Recent activity" description="Operational events across approvals, documents, and bank processing.">
            <div className="space-y-4">
              {activityFeed.map((item) => (
                <div key={item.id} className="rounded-2xl border border-slate-200 bg-slate-50/80 p-4">
                  <div className="flex items-start justify-between gap-3">
                    <div>
                      <p className="font-medium text-slate-900">{item.title}</p>
                      <p className="mt-1 text-sm leading-6 text-slate-600">{item.detail}</p>
                    </div>
                    <span className="text-xs text-slate-500">{item.timestamp}</span>
                  </div>
                </div>
              ))}
            </div>
          </InsightCard>
        </div>

        <div className="grid gap-6 xl:grid-cols-[0.95fr_1.05fr]">
          <InsightCard title="Pending approvals" description={`${approvalItems.filter((item) => item.status === 'Pending').length} items need review today.`}>
            <div className="space-y-4">
              {approvalItems.map((item) => {
                const invoice = invoices.find((candidate) => candidate.id === item.invoiceId);
                const vendor = invoice ? getVendor(invoice.vendorId) : undefined;
                return (
                  <div key={item.id} className="rounded-2xl border border-slate-200 bg-white p-4">
                    <div className="flex items-start justify-between gap-3">
                      <div className="space-y-1">
                        <p className="font-medium text-slate-900">{invoice?.invoiceNumber} · {vendor?.name}</p>
                        <p className="text-sm text-slate-600">{item.comment}</p>
                        <p className="text-xs text-slate-500">Submitted by {item.submittedBy} · due {formatDate(item.dueBy)}</p>
                      </div>
                      <StatusBadge value={item.status} />
                    </div>
                  </div>
                );
              })}
            </div>
          </InsightCard>

          <div className="grid gap-6">
            <InsightCard title="Upcoming payments" description={`${formatCurrency(reportSnapshots.upcomingOutflow)} expected in the next 7 days.`}>
              <div className="space-y-4">
                {upcomingPayments.map((payment) => {
                  const vendor = getVendor(payment.vendorId);
                  return (
                    <div key={payment.id} className="flex items-center justify-between rounded-2xl border border-slate-200 bg-slate-50/80 px-4 py-3">
                      <div>
                        <p className="font-medium text-slate-900">{vendor?.name}</p>
                        <p className="text-sm text-slate-500">{payment.batchName} · {formatDate(payment.scheduledDate)}</p>
                      </div>
                      <div className="text-right">
                        <p className="font-semibold text-slate-900">{formatCurrency(payment.amount)}</p>
                        <StatusBadge value={payment.status} />
                      </div>
                    </div>
                  );
                })}
              </div>
            </InsightCard>

            <InsightCard title="Role-based coverage" description="The platform is structured for store managers, accountants, and finance admins.">
              <div className="space-y-4">
                {roleCards.map((item) => (
                  <div key={item.role} className="rounded-2xl border border-slate-200 bg-white p-4">
                    <div className="flex items-center justify-between gap-3">
                      <div>
                        <p className="font-medium text-slate-900">{item.role}</p>
                        <p className="text-sm text-slate-600">{item.focus}</p>
                      </div>
                      <span className="rounded-full bg-slate-100 px-3 py-1 text-xs font-medium text-slate-600">{item.coverage}</span>
                    </div>
                  </div>
                ))}
              </div>
            </InsightCard>
          </div>
        </div>

        <div className="grid gap-6 xl:grid-cols-[0.9fr_1.1fr]">
          <InsightCard title="Store health" description="Open issues and monthly payable exposure by location.">
            <div className="space-y-3">
              {stores.map((store) => (
                <div key={store.id} className="flex items-center justify-between rounded-2xl border border-slate-200 bg-white px-4 py-3">
                  <div>
                    <p className="font-medium text-slate-900">{store.name}</p>
                    <p className="text-sm text-slate-500">{store.city}, {store.state} · {store.type}</p>
                  </div>
                  <div className="text-right">
                    <p className="font-semibold text-slate-900">{formatCurrency(store.monthlyOutflow)}</p>
                    <p className="text-xs text-slate-500">{store.openIssues} open issues</p>
                  </div>
                </div>
              ))}
            </div>
          </InsightCard>

          <InsightCard title="Vendor risk watchlist" description="Suppliers with the highest payment sensitivity or exception exposure.">
            <div className="space-y-4">
              {vendors.slice(0, 4).map((vendor) => (
                <div key={vendor.id} className="rounded-2xl border border-slate-200 bg-white p-4">
                  <div className="flex items-center justify-between gap-3">
                    <div>
                      <p className="font-medium text-slate-900">{vendor.name}</p>
                      <p className="text-sm text-slate-600">{vendor.businessType}</p>
                    </div>
                    <StatusBadge value={vendor.risk} />
                  </div>
                  <div className="mt-3 flex items-center justify-between text-sm text-slate-500">
                    <span>Open balance {formatCurrency(vendor.openBalance)}</span>
                    <span>{vendor.paymentTerms}</span>
                  </div>
                </div>
              ))}
              <Button variant="ghost" className="w-full justify-between rounded-2xl">
                Open full vendor module
                <ArrowRight className="h-4 w-4" />
              </Button>
            </div>
          </InsightCard>
        </div>
      </main>
    </>
  );
}
