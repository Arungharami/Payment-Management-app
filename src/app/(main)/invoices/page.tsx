import { Download, Plus, Upload } from 'lucide-react';

import { Header } from '@/components/layout/header';
import { EmptyState, InsightCard, SectionIntro, StatusBadge } from '@/components/platform/shared';
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
import { invoices, getStore, getVendor } from '@/lib/platform-data';

export default function InvoicesPage() {
  const recurringInvoices = invoices.filter((invoice) => invoice.recurring);

  return (
    <>
      <Header title="Invoices" />
      <main className="flex-1 space-y-8 px-4 py-6 md:px-8">
        <SectionIntro
          eyebrow="Bills and invoices"
          title="Capture invoice detail, attachment records, approval status, and due dates without friction."
          description="The invoice module is designed for production AP workflows: manual entry, document upload, recurring cycles, approval routing, and clear payment readiness."
          action={
            <>
              <Button variant="outline" className="rounded-full border-slate-200 bg-white">
                <Upload className="h-4 w-4" />
                Upload invoice
              </Button>
              <Button variant="outline" className="rounded-full border-slate-200 bg-white">
                <Download className="h-4 w-4" />
                Export CSV
              </Button>
              <Button className="rounded-full">
                <Plus className="h-4 w-4" />
                Create invoice
              </Button>
            </>
          }
        />

        <div className="grid gap-6 xl:grid-cols-[1.15fr_0.85fr]">
          <InsightCard title="Invoice pipeline" description="Operational table with status, due date, approval stage, and attachment traceability.">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Invoice</TableHead>
                  <TableHead>Vendor</TableHead>
                  <TableHead>Store</TableHead>
                  <TableHead>Amount</TableHead>
                  <TableHead>Due date</TableHead>
                  <TableHead>Status</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {invoices.map((invoice) => {
                  const vendor = getVendor(invoice.vendorId);
                  const store = getStore(invoice.storeId);
                  return (
                    <TableRow key={invoice.id}>
                      <TableCell>
                        <div>
                          <p className="font-medium text-slate-900">{invoice.invoiceNumber}</p>
                          <p className="text-xs text-slate-500">{invoice.attachmentName}</p>
                        </div>
                      </TableCell>
                      <TableCell>{vendor?.name}</TableCell>
                      <TableCell>{store?.name}</TableCell>
                      <TableCell>{formatCurrency(invoice.amount)}</TableCell>
                      <TableCell>{formatDate(invoice.dueDate)}</TableCell>
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

          <div className="grid gap-6">
            <InsightCard title="Recurring invoices" description="Ready-made structure for repeat vendor cycles and predictable cash planning.">
              <div className="space-y-4">
                {recurringInvoices.map((invoice) => {
                  const vendor = getVendor(invoice.vendorId);
                  return (
                    <div key={invoice.id} className="rounded-2xl border border-slate-200 bg-slate-50/80 p-4">
                      <div className="flex items-center justify-between gap-3">
                        <div>
                          <p className="font-medium text-slate-900">{vendor?.name}</p>
                          <p className="text-sm text-slate-500">{invoice.category}</p>
                        </div>
                        <p className="font-semibold text-slate-900">{formatCurrency(invoice.amount)}</p>
                      </div>
                    </div>
                  );
                })}
              </div>
            </InsightCard>

            <InsightCard title="Attachment preview experience" description="Document linkage is kept close to AP work instead of hidden in a separate upload bucket.">
              <div className="rounded-[1.75rem] border border-dashed border-slate-300 bg-slate-50 p-6">
                <p className="font-medium text-slate-900">Invoice packet preview</p>
                <p className="mt-2 text-sm leading-7 text-slate-600">
                  Preview panels can show attachment thumbnails, extracted details, vendor metadata, and approval comments next to invoice data.
                </p>
                <div className="mt-5 rounded-3xl border border-slate-200 bg-white p-4">
                  <p className="text-sm text-slate-500">Selected file</p>
                  <p className="mt-1 font-medium text-slate-900">{invoices[0].attachmentName}</p>
                  <p className="mt-3 text-sm text-slate-600">{invoices[0].notes}</p>
                </div>
              </div>
            </InsightCard>
          </div>
        </div>

        {invoices.length === 0 ? (
          <EmptyState
            title="No invoices yet"
            description="Create the first invoice or upload a bill to begin building your AP workflow."
            actionLabel="Create invoice"
          />
        ) : null}
      </main>
    </>
  );
}
