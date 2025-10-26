import { Header } from '@/components/layout/header';
import { PageHeader } from '@/components/shared/page-header';
import { HistoryTable } from '@/components/history/history-table';
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from '@/components/ui/tabs';

export default function HistoryPage() {
  return (
    <>
      <Header title="Payment History" />
      <main className="flex-1 overflow-y-auto p-4 md:p-6 space-y-6">
        <PageHeader
          title="Payment History"
          description="Review all your past vendor payments."
        />
        <Tabs defaultValue="all">
          <TabsList className="grid w-full grid-cols-4 md:w-fit">
            <TabsTrigger value="all">All</TabsTrigger>
            <TabsTrigger value="completed">Completed</TabsTrigger>
            <TabsTrigger value="pending">Pending</TabsTrigger>
            <TabsTrigger value="failed">Failed</TabsTrigger>
          </TabsList>
          <TabsContent value="all">
            <HistoryTable />
          </TabsContent>
          <TabsContent value="completed">
            <HistoryTable filter="Completed" />
          </TabsContent>
          <TabsContent value="pending">
             <HistoryTable filter="Pending" />
          </TabsContent>
          <TabsContent value="failed">
             <HistoryTable filter="Failed" />
          </TabsContent>
        </Tabs>
      </main>
    </>
  );
}
