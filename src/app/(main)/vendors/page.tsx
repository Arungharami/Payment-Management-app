import { Download, Plus } from 'lucide-react';

import { Header } from '@/components/layout/header';
import { InsightCard, KeyValueGrid, SectionIntro, StatusBadge } from '@/components/platform/shared';
import { Button } from '@/components/ui/button';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { formatCurrency } from '@/lib/format';
import { vendors } from '@/lib/platform-data';

export default function VendorsPage() {
  const spotlightVendor = vendors[0];

  return (
    <>
      <Header title="Vendors" />
      <main className="flex-1 space-y-8 px-4 py-6 md:px-8">
        <SectionIntro
          eyebrow="Vendor directory"
          title="Manage distributor relationships, payment methods, documents, and risk in one record."
          description="Every vendor profile is structured for real AP work: contacts, terms, ACH placeholders, notes, spend history, and invoice context."
          action={
            <>
              <Button variant="outline" className="rounded-full border-slate-200 bg-white">
                <Download className="h-4 w-4" />
                Export vendors
              </Button>
              <Button className="rounded-full">
                <Plus className="h-4 w-4" />
                Add vendor
              </Button>
            </>
          }
        />

        <div className="grid gap-6 xl:grid-cols-[1.1fr_0.9fr]">
          <InsightCard title="Vendor master table" description="Search-ready structure for real supplier operations.">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Vendor</TableHead>
                  <TableHead>Business type</TableHead>
                  <TableHead>Payment method</TableHead>
                  <TableHead>Open balance</TableHead>
                  <TableHead>Status</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {vendors.map((vendor) => (
                  <TableRow key={vendor.id}>
                    <TableCell>
                      <div>
                        <p className="font-medium text-slate-900">{vendor.name}</p>
                        <p className="text-xs text-slate-500">{vendor.contactPerson} · {vendor.email}</p>
                      </div>
                    </TableCell>
                    <TableCell>{vendor.businessType}</TableCell>
                    <TableCell>{vendor.paymentMethod}</TableCell>
                    <TableCell>{formatCurrency(vendor.openBalance)}</TableCell>
                    <TableCell>
                      <div className="flex gap-2">
                        <StatusBadge value={vendor.status} />
                        <StatusBadge value={vendor.risk} />
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </InsightCard>

          <InsightCard title="Vendor spotlight" description="Example of a production-ready supplier record.">
            <div className="space-y-5">
              <div className="rounded-3xl bg-slate-950 p-5 text-white">
                <p className="text-sm text-slate-400">Selected vendor</p>
                <h2 className="mt-2 text-2xl font-semibold">{spotlightVendor.name}</h2>
                <p className="mt-2 text-sm text-slate-300">{spotlightVendor.notes}</p>
              </div>
              <KeyValueGrid
                items={[
                  { label: 'Contact', value: `${spotlightVendor.contactPerson} · ${spotlightVendor.phone}` },
                  { label: 'Terms', value: spotlightVendor.paymentTerms },
                  { label: 'Tax ID / EIN', value: spotlightVendor.taxId },
                  { label: 'Bank / ACH', value: spotlightVendor.bankAccountMask },
                  { label: 'Address', value: spotlightVendor.address },
                  { label: 'Payment history', value: `${formatCurrency(spotlightVendor.totalPaidYtd)} YTD` },
                ]}
              />
            </div>
          </InsightCard>
        </div>

        <div className="grid gap-6 lg:grid-cols-3">
          {vendors.map((vendor) => (
            <InsightCard key={vendor.id} title={vendor.name} description={`${vendor.invoiceCount} invoices on file`}>
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <StatusBadge value={vendor.risk} />
                  <StatusBadge value={vendor.status} />
                </div>
                <div className="grid gap-3 text-sm">
                  <div className="flex items-center justify-between">
                    <span className="text-slate-500">Open balance</span>
                    <span className="font-medium text-slate-900">{formatCurrency(vendor.openBalance)}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-slate-500">Payment terms</span>
                    <span className="font-medium text-slate-900">{vendor.paymentTerms}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-slate-500">Method</span>
                    <span className="font-medium text-slate-900">{vendor.paymentMethod}</span>
                  </div>
                </div>
                <div className="flex flex-wrap gap-2">
                  {vendor.tags.map((tag) => (
                    <span key={tag} className="rounded-full bg-slate-100 px-3 py-1 text-xs font-medium text-slate-600">
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            </InsightCard>
          ))}
        </div>
      </main>
    </>
  );
}
