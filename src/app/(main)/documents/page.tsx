import { FolderOpen, Search, Tags } from 'lucide-react';

import { Header } from '@/components/layout/header';
import { InsightCard, SectionIntro, StatusBadge } from '@/components/platform/shared';
import { Input } from '@/components/ui/input';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { documents } from '@/lib/platform-data';

export default function DocumentsPage() {
  return (
    <>
      <Header title="Documents" />
      <main className="flex-1 space-y-8 px-4 py-6 md:px-8">
        <SectionIntro
          eyebrow="Document library"
          title="Search, preview, tag, and link contracts, invoices, receipts, and payment confirmations."
          description="Documents are tied to vendors, invoices, and payment records so compliance and AP context stay together."
        />

        <div className="grid gap-6 xl:grid-cols-[1.1fr_0.9fr]">
          <InsightCard title="Document records" description="Filtered document management designed around AP operations.">
            <div className="mb-4 relative">
              <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
              <Input className="h-11 rounded-full border-slate-200 bg-white pl-10" placeholder="Search contracts, receipts, invoices, or tax docs" />
            </div>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Name</TableHead>
                  <TableHead>Category</TableHead>
                  <TableHead>Linked to</TableHead>
                  <TableHead>Tag</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {documents.map((document) => (
                  <TableRow key={document.id}>
                    <TableCell>{document.name}</TableCell>
                    <TableCell>{document.category}</TableCell>
                    <TableCell>{document.linkedTo}</TableCell>
                    <TableCell>
                      <span className="rounded-full bg-slate-100 px-3 py-1 text-xs font-medium text-slate-600">{document.tag}</span>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </InsightCard>

          <div className="grid gap-6">
            <InsightCard title="Category filters" description="Quick filtering for the document types AP teams care about.">
              <div className="grid gap-3">
                {['Invoices', 'Contracts', 'Receipts', 'Tax documents', 'Payment confirmations', 'Internal records'].map((item) => (
                  <div key={item} className="flex items-center gap-3 rounded-2xl border border-slate-200 bg-white px-4 py-3">
                    <FolderOpen className="h-4 w-4 text-slate-500" />
                    <span className="text-sm font-medium text-slate-800">{item}</span>
                  </div>
                ))}
              </div>
            </InsightCard>

            <InsightCard title="Tagging and preview" description="Document tagging supports retrieval, compliance, and audit review.">
              <div className="rounded-3xl border border-slate-200 bg-slate-50/80 p-5">
                <div className="flex items-center gap-3">
                  <Tags className="h-5 w-5 text-slate-500" />
                  <p className="font-medium text-slate-900">Selected record</p>
                </div>
                <p className="mt-4 text-sm leading-7 text-slate-600">
                  Documents can surface preview panels, linked invoice/payment context, and status tags for compliance-sensitive workflows.
                </p>
                <div className="mt-4">
                  <StatusBadge value="Info" />
                </div>
              </div>
            </InsightCard>
          </div>
        </div>
      </main>
    </>
  );
}
