import { BellRing } from 'lucide-react';

import { Header } from '@/components/layout/header';
import { InsightCard, SectionIntro, StatusBadge } from '@/components/platform/shared';
import { Button } from '@/components/ui/button';
import { notifications } from '@/lib/platform-data';

export default function NotificationsPage() {
  return (
    <>
      <Header title="Notifications" />
      <main className="flex-1 space-y-8 px-4 py-6 md:px-8">
        <SectionIntro
          eyebrow="Alerts and reminders"
          title="Keep teams ahead of due dates, approvals, payment events, and document expirations."
          description="Notification design is tuned for operational finance, with severity-based alerts and clear next actions."
          action={<Button className="rounded-full">Mark all reviewed</Button>}
        />

        <div className="grid gap-6">
          {notifications.map((notification) => (
            <InsightCard key={notification.id} title={notification.title} description={notification.createdAt}>
              <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
                <div className="flex items-start gap-4">
                  <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-slate-950 text-white">
                    <BellRing className="h-5 w-5" />
                  </div>
                  <p className="max-w-3xl text-sm leading-7 text-slate-600">{notification.body}</p>
                </div>
                <div className="flex items-center gap-3">
                  <StatusBadge value={notification.severity} />
                  <Button variant="outline" className="rounded-full border-slate-200 bg-white">
                    {notification.actionLabel}
                  </Button>
                </div>
              </div>
            </InsightCard>
          ))}
        </div>
      </main>
    </>
  );
}
