import { Save } from 'lucide-react';

import { Header } from '@/components/layout/header';
import { InsightCard, KeyValueGrid, SectionIntro } from '@/components/platform/shared';
import { Button } from '@/components/ui/button';
import { Switch } from '@/components/ui/switch';
import { auditLogs, businessProfile, userProfile } from '@/lib/platform-data';

export default function SettingsPage() {
  return (
    <>
      <Header title="Settings" />
      <main className="flex-1 space-y-8 px-4 py-6 md:px-8">
        <SectionIntro
          eyebrow="Workspace settings"
          title="Configure business identity, roles, notifications, theme, AI behavior, and audit oversight."
          description="The settings area is organized like a real SaaS platform instead of a profile stub, with business-level controls and operational governance."
          action={
            <Button className="rounded-full">
              <Save className="h-4 w-4" />
              Save changes
            </Button>
          }
        />

        <div className="grid gap-6 xl:grid-cols-[1fr_1fr]">
          <InsightCard title="Business profile" description="Entity information and payment operating defaults.">
            <KeyValueGrid
              items={[
                { label: 'Business name', value: businessProfile.name },
                { label: 'Legal name', value: businessProfile.legalName },
                { label: 'Headquarters', value: businessProfile.headquarters },
                { label: 'Entity type', value: businessProfile.entityType },
                { label: 'Tax ID', value: businessProfile.taxId },
                { label: 'Close schedule', value: businessProfile.accountingCloseDay },
              ]}
            />
          </InsightCard>

          <InsightCard title="User and role settings" description="Role-based access and user-level visibility controls.">
            <KeyValueGrid
              items={[
                { label: 'Primary admin', value: `${userProfile.name} · ${userProfile.role}` },
                { label: 'Support email', value: businessProfile.supportEmail },
                { label: 'Roles enabled', value: 'Admin, Accountant, Store Manager' },
                { label: 'Theme preference', value: 'Light default, dark optional' },
              ]}
            />
          </InsightCard>
        </div>

        <div className="grid gap-6 xl:grid-cols-[0.95fr_1.05fr]">
          <InsightCard title="Notification and AI settings" description="Operational reminders and assistant behavior can be tuned by the workspace.">
            <div className="space-y-4">
              {[
                'Due soon reminders',
                'Overdue invoice alerts',
                'Approval pending notifications',
                'Payment success and failure alerts',
                'Vendor document expiry alerts',
                'AI anomaly detection',
              ].map((label, index) => (
                <div key={label} className="flex items-center justify-between rounded-2xl border border-slate-200 bg-white px-4 py-3">
                  <div>
                    <p className="font-medium text-slate-900">{label}</p>
                    <p className="text-sm text-slate-500">Workspace-level operational control</p>
                  </div>
                  <Switch defaultChecked={index < 5} />
                </div>
              ))}
            </div>
          </InsightCard>

          <InsightCard title="Audit log" description="Track who changed what across approvals, invoices, and bank actions.">
            <div className="space-y-3">
              {auditLogs.map((item) => (
                <div key={item.id} className="rounded-2xl border border-slate-200 bg-slate-50/80 p-4">
                  <div className="flex items-center justify-between gap-3">
                    <div>
                      <p className="font-medium text-slate-900">{item.actor}</p>
                      <p className="text-sm text-slate-600">{item.action} · {item.target}</p>
                    </div>
                    <span className="text-xs text-slate-500">{item.timestamp}</span>
                  </div>
                </div>
              ))}
            </div>
          </InsightCard>
        </div>
      </main>
    </>
  );
}
