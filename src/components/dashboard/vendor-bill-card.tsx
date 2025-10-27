import Image from 'next/image';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardFooter, CardHeader } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import type { Bill, Vendor, Store } from '@/lib/data';
import { formatDistanceToNow, parseISO } from 'date-fns';

type EnrichedBill = Bill & {
    vendor: Vendor;
    store: Store;
}

export function VendorBillCard({ bill }: { bill: EnrichedBill }) {
  const dueDate = parseISO(bill.dueDate);
  const isOverdue = bill.status === 'overdue';
  const distanceToNow = formatDistanceToNow(dueDate, { addSuffix: true });

  return (
    <Card className="flex flex-col">
      <CardHeader className="flex flex-row items-center gap-4">
        <Image
          src={bill.vendor.logo.imageUrl}
          alt={bill.vendor.name}
          width={40}
          height={40}
          className="rounded-full"
          data-ai-hint={bill.vendor.logo.imageHint}
        />
        <div className="grid gap-1">
          <p className="font-semibold">{bill.vendor.name}</p>
          <p className="text-sm text-muted-foreground">
            {bill.store.name}
          </p>
        </div>
      </CardHeader>
      <CardContent className="flex-grow">
        <div className="text-3xl font-bold">
          ${bill.amount.toLocaleString('en-US')}
        </div>
        <div className="flex items-center gap-2 mt-2">
            <Badge variant={isOverdue ? "destructive" : "secondary"} className="capitalize">
                {bill.status}
            </Badge>
            <p className="text-sm text-muted-foreground">
                Due {distanceToNow}
            </p>
        </div>
      </CardContent>
      <CardFooter>
        <Button className="w-full">
          Pay Now
        </Button>
      </CardFooter>
    </Card>
  );
}
