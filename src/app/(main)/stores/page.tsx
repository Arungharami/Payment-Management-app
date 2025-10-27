import { Header } from '@/components/layout/header';
import { PageHeader } from '@/components/shared/page-header';
import { StoreTable } from '@/components/stores/store-table';

export default function StoresPage() {
  return (
    <>
      <Header title="Stores" />
      <main className="flex-1 overflow-y-auto p-4 md:p-6 space-y-6">
        <PageHeader
          title="Store Management"
          description="Add, view, and manage your stores."
        />
        <StoreTable />
      </main>
    </>
  );
}
