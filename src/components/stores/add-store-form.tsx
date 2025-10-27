'use client'

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useToast } from '@/hooks/use-toast';

export function AddStoreForm({ setDialogOpen }: { setDialogOpen: (open: boolean) => void }) {
  const { toast } = useToast();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // In a real app, you would have form state management and an API call here.
    toast({
        title: "Success",
        description: "New store added successfully (demo)."
    })
    setDialogOpen(false);
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="space-y-2">
        <Label htmlFor="storeName">Store Name</Label>
        <Input id="storeName" name="storeName" placeholder="e.g., My New Store" required />
      </div>
      <div className="space-y-2">
        <Label htmlFor="address">Address</Label>
        <Input id="address" name="address" placeholder="123 Example St, City, State" required />
      </div>
      <Button type="submit" className="w-full">Add Store</Button>
    </form>
  );
}
