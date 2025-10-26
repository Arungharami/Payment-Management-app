import { Header } from '@/components/layout/header';
import { Button } from '@/components/ui/button';
import { bills, paymentHistory } from '@/lib/data';
import { DollarSign, FileText, ArrowRight } from 'lucide-react';
import { VendorBillCard } from '@/components/dashboard/vendor-bill-card';
import { StatsCards } from '@/components/dashboard/stats-cards';
import { PageHeader } from '@/components/shared/page-header';
import Link from 'next/link';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import Image from 'next/image';

export default function DashboardPage() {
  const outstandingBills = bills.filter((bill) => bill.status !== 'paid');
  const recentPayments = paymentHistory.slice(0, 3);

  return (
    <>
      <Header title="Dashboard" />
      <main className="flex-1 overflow-y-auto p-4 md:p-6 space-y-6">
        <PageHeader
          title="Welcome Back, John!"
          description="Here's a summary of your vendor accounts."
        />

        <StatsCards />

        <section>
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl font-semibold">Outstanding Bills</h2>
            <Button variant="outline" size="sm">Pay All</Button>
          </div>
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {outstandingBills.map((bill) => (
              <VendorBillCard key={bill.id} bill={bill} />
            ))}
          </div>
        </section>

        <section>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between">
              <CardTitle>Recent Payments</CardTitle>
              <Link href="/history">
                <Button variant="ghost" size="sm">
                  View All <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </Link>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Vendor</TableHead>
                    <TableHead className="text-right">Amount</TableHead>
                    <TableHead className="hidden sm:table-cell text-right">Date</TableHead>
                    <TableHead className="text-right">Status</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {recentPayments.map((payment) => (
                    <TableRow key={payment.id}>
                      <TableCell>
                        <div className="flex items-center gap-3">
                           <Image
                            src={payment.vendor.logo.imageUrl}
                            alt={payment.vendor.name}
                            width={32}
                            height={32}
                            className="rounded-full object-cover"
                            data-ai-hint={payment.vendor.logo.imageHint}
                          />
                          <span className="font-medium">{payment.vendor.name}</span>
                        </div>
                      </TableCell>
                      <TableCell className="text-right font-medium">
                        ${payment.amount.toFixed(2)}
                      </TableCell>
                      <TableCell className="hidden sm:table-cell text-right text-muted-foreground">
                        {payment.date}
                      </TableCell>
                      <TableCell className="text-right">
                         <Badge
                          variant={
                            payment.status === 'Completed' ? 'default' : 'destructive'
                          }
                          className={payment.status === 'Completed' ? 'bg-accent text-accent-foreground' : ''}
                        >
                          {payment.status}
                        </Badge>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </section>
      </main>
    </>
  );
}
