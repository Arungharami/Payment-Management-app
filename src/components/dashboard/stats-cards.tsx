import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { allBills } from '@/lib/data';
import { DollarSign, FileText, CalendarClock } from 'lucide-react';
import { format, parseISO } from 'date-fns';

export function StatsCards() {
  const totalOutstanding = allBills.reduce((acc, bill) => {
    if (bill.status !== 'paid') {
      return acc + bill.amount;
    }
    return acc;
  }, 0);

  const upcomingBills = allBills.filter(
    (bill) => bill.status === 'due' && parseISO(bill.dueDate) > new Date()
  );

  const nextDueDate = upcomingBills.length > 0 
    ? upcomingBills.sort((a, b) => new Date(a.dueDate).getTime() - new Date(b.dueDate).getTime())[0].dueDate
    : null;
    
  const nextDueBill = nextDueDate ? allBills.find(b => b.dueDate === nextDueDate) : null;

  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Total Outstanding</CardTitle>
          <DollarSign className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">
            ${totalOutstanding.toLocaleString('en-US', { minimumFractionDigits: 2 })}
          </div>
          <p className="text-xs text-muted-foreground">Across all stores</p>
        </CardContent>
      </Card>
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Bills Due Soon</CardTitle>
          <FileText className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{upcomingBills.length} Bills</div>
          <p className="text-xs text-muted-foreground">Due in the next 30 days</p>
        </CardContent>
      </Card>
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Next Payment Due</CardTitle>
          <CalendarClock className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">
            {nextDueDate ? format(parseISO(nextDueDate), 'MMM dd, yyyy') : 'N/A'}
          </div>
          <p className="text-xs text-muted-foreground truncate">
            {nextDueBill ? `For ${nextDueBill.vendor.name} (${nextDueBill.store.name})` : 'No upcoming payments'}
          </p>
        </CardContent>
      </Card>
    </div>
  );
}
