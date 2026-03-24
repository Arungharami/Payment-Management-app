import { CheckCheck, MessageSquareMore, XCircle } from 'lucide-react';

import { Header } from '@/components/layout/header';
import { InsightCard, SectionIntro, StatusBadge } from '@/components/platform/shared';
import { Button } from '@/components/ui/button';
import { formatDate } from '@/lib/format';
import { approvalItems, invoices, getVendor } from '@/lib/platform-data';

export default function ApprovalsPage() {
  return (
    <>
      <Header title="Approvals" />
      <main className="flex-1 space-y-8 px-4 py-6 md:px-8">
        <SectionIntro
          eyebrow="Approval workflow"
          title="Submit, approve, reject, and comment with clear accountability."
          description="Approval routing is separated from invoice capture so finance teams can keep policy control without slowing store operations."
        />

        <div className="grid gap-6 xl:grid-cols-[1.05fr_0.95fr]">
          <InsightCard title="Approval queue" description="Prioritize by due date, role, and business risk.">
            <div className="space-y-4">
              {approvalItems.map((item) => {
                const invoice = invoices.find((candidate) => candidate.id === item.invoiceId);
                const vendor = invoice ? getVendor(invoice.vendorId) : undefined;
                return (
                  <div key={item.id} className="rounded-3xl border border-slate-200 bg-white p-5">
                    <div className="flex flex-col gap-4 lg:flex-row lg:items-start lg:justify-between">
                      <div className="space-y-2">
                        <div className="flex items-center gap-2">
                          <p className="font-semibold text-slate-900">{invoice?.invoiceNumber}</p>
                          <StatusBadge value={item.status} />
                        </div>
                        <p className="text-sm text-slate-600">{vendor?.name} · {item.role}</p>
                        <p className="text-sm leading-7 text-slate-600">{item.comment}</p>
                        <p className="text-xs text-slate-500">
                          Submitted by {item.submittedBy} on {formatDate(item.submittedAt)} · due {formatDate(item.dueBy)}
                        </p>
                      </div>
                      <div className="flex gap-2">
                        <Button variant="outline" className="rounded-full">
                          <MessageSquareMore className="h-4 w-4" />
                          Comment
                        </Button>
                        <Button variant="outline" className="rounded-full border-emerald-200 text-emerald-700">
                          <CheckCheck className="h-4 w-4" />
                          Approve
                        </Button>
                        <Button variant="outline" className="rounded-full border-rose-200 text-rose-700">
                          <XCircle className="h-4 w-4" />
                          Reject
                        </Button>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </InsightCard>

          <InsightCard title="Role-based controls" description="Manager, accountant, and admin oversight are modeled into the workflow.">
            <div className="space-y-4">
              {[
                ['Store manager', 'Submits bills, explains exceptions, and tracks follow-up comments.'],
                ['Accountant', 'Validates coding, confirms payment readiness, and groups batches.'],
                ['Admin', 'Approves policy exceptions, escalations, and high-value releases.'],
              ].map(([role, detail]) => (
                <div key={role} className="rounded-2xl border border-slate-200 bg-slate-50/80 p-4">
                  <p className="font-medium text-slate-900">{role}</p>
                  <p className="mt-1 text-sm leading-7 text-slate-600">{detail}</p>
                </div>
              ))}
            </div>
          </InsightCard>
        </div>
      </main>
    </>
  );
}
