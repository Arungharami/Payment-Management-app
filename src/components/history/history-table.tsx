import {
  MoreHorizontal,
  FileDown,
  Search,
} from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationNext,
  PaginationPrevious,
} from '@/components/ui/pagination';

import { paymentHistory } from '@/lib/data';
import Image from 'next/image';
import { Input } from '../ui/input';

export function HistoryTable({ filter }: { filter?: 'Completed' | 'Pending' | 'Failed' }) {
  const filteredHistory = filter ? paymentHistory.filter(p => p.status === filter) : paymentHistory;

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between gap-4">
          <div className="relative flex-1">
             <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
             <Input placeholder="Search payments..." className="pl-10" />
          </div>
          <Button size="sm" variant="outline">
            <FileDown className="h-4 w-4 mr-2" />
            Export
          </Button>
        </div>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Vendor</TableHead>
              <TableHead className="hidden md:table-cell">Date</TableHead>
              <TableHead className="hidden md:table-cell">Status</TableHead>
              <TableHead className="text-right">Amount</TableHead>
              <TableHead>
                <span className="sr-only">Actions</span>
              </TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredHistory.map((payment) => (
              <TableRow key={payment.id}>
                <TableCell className="font-medium">
                  <div className="flex items-center gap-3">
                    <Image
                      src={payment.vendor.logo.imageUrl}
                      alt={payment.vendor.name}
                      width={32}
                      height={32}
                      className="rounded-full object-cover"
                      data-ai-hint={payment.vendor.logo.imageHint}
                    />
                    {payment.vendor.name}
                  </div>
                </TableCell>
                <TableCell className="hidden md:table-cell">{payment.date}</TableCell>
                <TableCell className="hidden md:table-cell">
                  <Badge variant={
                    payment.status === 'Completed' ? 'default' : payment.status === 'Failed' ? 'destructive' : 'secondary'
                  } className={payment.status === 'Completed' ? 'bg-accent text-accent-foreground' : ''}>
                    {payment.status}
                  </Badge>
                </TableCell>
                <TableCell className="text-right">${payment.amount.toFixed(2)}</TableCell>
                <TableCell>
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button aria-haspopup="true" size="icon" variant="ghost">
                        <MoreHorizontal className="h-4 w-4" />
                        <span className="sr-only">Toggle menu</span>
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      <DropdownMenuLabel>Actions</DropdownMenuLabel>
                      <DropdownMenuItem>View Details</DropdownMenuItem>
                      <DropdownMenuItem>Download Receipt</DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
      <CardFooter>
        <div className="text-xs text-muted-foreground">
          Showing <strong>1-10</strong> of <strong>{filteredHistory.length}</strong> payments
        </div>
         <Pagination className="ml-auto">
            <PaginationContent>
              <PaginationItem>
                <PaginationPrevious href="#" />
              </PaginationItem>
              <PaginationItem>
                <PaginationNext href="#" />
              </PaginationItem>
            </PaginationContent>
          </Pagination>
      </CardFooter>
    </Card>
  );
}
