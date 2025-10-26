import { Header } from '@/components/layout/header';
import { PageHeader } from '@/components/shared/page-header';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Separator } from '@/components/ui/separator';
import { Switch } from '@/components/ui/switch';
import { userProfile, paymentMethods, notificationSettings } from '@/lib/data';
import { Banknote, CreditCard, PlusCircle } from 'lucide-react';

export default function ProfilePage() {
  return (
    <>
      <Header title="Profile & Settings" />
      <main className="flex-1 overflow-y-auto p-4 md:p-6 space-y-6">
        <PageHeader
          title="Profile & Settings"
          description="Manage your account details and preferences."
        />

        <div className="grid gap-6 md:grid-cols-3">
          <div className="md:col-span-2 space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Profile Information</CardTitle>
                <CardDescription>Update your personal and store details.</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center gap-4">
                  <Avatar className="h-20 w-20">
                    <AvatarImage src={userProfile.avatar.imageUrl} alt={userProfile.name} data-ai-hint={userProfile.avatar.imageHint} />
                    <AvatarFallback>{userProfile.name.charAt(0)}</AvatarFallback>
                  </Avatar>
                  <Button variant="outline">Change Photo</Button>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="name">Full Name</Label>
                    <Input id="name" defaultValue={userProfile.name} />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="email">Email</Label>
                    <Input id="email" type="email" defaultValue={userProfile.email} />
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="storeName">Store Name</Label>
                  <Input id="storeName" defaultValue={userProfile.storeName} />
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Payment Methods</CardTitle>
                <CardDescription>Manage your connected bank accounts and cards.</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                {paymentMethods.map(method => (
                  <div key={method.id} className="flex items-center justify-between rounded-md border p-4">
                    <div className="flex items-center gap-4">
                      {method.type === 'Bank Account' ? <Banknote className="h-6 w-6 text-muted-foreground" /> : <CreditCard className="h-6 w-6 text-muted-foreground" />}
                      <div>
                        <p className="font-medium">{method.type}</p>
                        <p className="text-sm text-muted-foreground">{method.details}</p>
                      </div>
                    </div>
                     <Button variant="ghost" size="sm">Remove</Button>
                  </div>
                ))}
                 <Button variant="outline" className="w-full">
                    <PlusCircle className="mr-2 h-4 w-4" /> Add Payment Method
                </Button>
              </CardContent>
            </Card>
          </div>

          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Notifications</CardTitle>
                <CardDescription>Choose how you receive alerts.</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between">
                  <Label htmlFor="due-dates">Due Date Reminders</Label>
                  <Switch id="due-dates" defaultChecked={notificationSettings.dueDates} />
                </div>
                <div className="flex items-center justify-between">
                  <Label htmlFor="failed-payments">Failed Payments</Label>
                  <Switch id="failed-payments" defaultChecked={notificationSettings.failedPayments} />
                </div>
                <div className="flex items-center justify-between">
                  <Label htmlFor="promotions">Promotions</Label>
                  <Switch id="promotions" defaultChecked={notificationSettings.promotions} />
                </div>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader>
                <CardTitle>Reports</CardTitle>
                <CardDescription>Export your spending data.</CardDescription>
              </CardHeader>
              <CardContent>
                 <Button className="w-full">Export Monthly Report</Button>
              </CardContent>
            </Card>
          </div>
        </div>

        <div className="mt-6 flex justify-end">
            <Button>Save Changes</Button>
        </div>
      </main>
    </>
  );
}
