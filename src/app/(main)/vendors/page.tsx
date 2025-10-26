import { Header } from '@/components/layout/header';
import { PageHeader } from '@/components/shared/page-header';
import { VendorTable } from '@/components/vendors/vendor-table';

export default function VendorsPage() {
  return (
    <>
      <Header title="Vendors" />
      <main className="flex-1 overflow-y-auto p-4 md:p-6 space-y-6">
        <PageHeader
          title="Vendor Management"
          description="Add, view, and manage your vendor payment details."
        />
        <VendorTable />
      </main>
    </>
  );
}
