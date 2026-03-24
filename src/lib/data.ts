import type { ImagePlaceholder } from './placeholder-images';
import { PlaceHolderImages } from './placeholder-images';

const getImage = (id: string): ImagePlaceholder =>
  PlaceHolderImages.find((img) => img.id === id) ?? PlaceHolderImages[0];

export type Store = {
  id: string;
  name: string;
  address: string;
  vendors: Vendor[];
};

export type Vendor = {
  id: string;
  name: string;
  logo: ImagePlaceholder;
  accountNumber: string;
  paymentUrl?: string;
  bills: Bill[];
};

export type Bill = {
  id: string;
  amount: number;
  dueDate: string;
  status: 'due' | 'paid' | 'overdue';
  invoiceUrl?: string;
};

export type Payment = {
  id: string;
  vendorName: string;
  vendorLogo: ImagePlaceholder;
  storeName: string;
  amount: number;
  date: string;
  status: 'Completed' | 'Pending' | 'Failed';
};

const vendors: Omit<Vendor, 'bills'>[] = [
  {
    id: 'pepsi',
    name: 'PepsiCo',
    logo: getImage('pepsi'),
    accountNumber: 'PEP-12345',
    paymentUrl: 'https://pepsi.com/pay',
  },
  {
    id: 'coca-cola',
    name: 'Coca-Cola',
    logo: getImage('coca-cola'),
    accountNumber: 'COKE-67890',
  },
  {
    id: 'rndc',
    name: 'RNDC',
    logo: getImage('rndc'),
    accountNumber: 'RNDC-54321',
    paymentUrl: 'https://rndc-usa.com/pay',
  },
  {
    id: 'southern-glazers',
    name: "Southern Glazer's",
    logo: getImage('southern-glazers'),
    accountNumber: 'SG-98765',
  },
  {
    id: 'breakthru',
    name: 'Breakthru Beverage',
    logo: getImage('breakthru'),
    accountNumber: 'BBG-11223',
    paymentUrl: 'https://www.breakthrubev.com/pay',
  },
];

export const stores: Store[] = [
    {
        id: 'store-1',
        name: 'Downtown Liquor',
        address: '123 Main St, Anytown USA',
        vendors: [
            { 
                ...vendors[0], 
                bills: [
                    { id: 'bill-001', amount: 542.50, dueDate: '2024-08-15', status: 'due' },
                    { id: 'bill-005', amount: 530.10, dueDate: '2024-07-15', status: 'paid' }
                ] 
            },
            { 
                ...vendors[2], 
                bills: [
                    { id: 'bill-002', amount: 1875.00, dueDate: '2024-08-10', status: 'overdue' },
                     { id: 'bill-006', amount: 1850.00, dueDate: '2024-07-10', status: 'paid' }
                ] 
            }
        ]
    },
    {
        id: 'store-2',
        name: 'The Corner Sip',
        address: '456 Oak Ave, Sometown USA',
        vendors: [
            { 
                ...vendors[1], 
                bills: [
                    { id: 'bill-003', amount: 480.25, dueDate: '2024-08-20', status: 'due' },
                     { id: 'bill-007', amount: 450.00, dueDate: '2024-07-20', status: 'paid' }
                ] 
            },
            { 
                ...vendors[3], 
                bills: [
                    { id: 'bill-004', amount: 3250.75, dueDate: '2024-08-22', status: 'due' },
                    { id: 'bill-008', amount: 3200.00, dueDate: '2024-07-22', status: 'paid' }
                ] 
            },
            {
                ...vendors[4],
                bills: [
                     { id: 'bill-009', amount: 250.00, dueDate: '2024-07-28', status: 'paid' }
                ]
            }
        ]
    }
];

// Computed data for easier access
export const allBills = stores.flatMap(s => s.vendors.flatMap(v => v.bills.map(b => ({...b, vendor: v, store: s}))));

export const paymentHistory: Payment[] = allBills.filter(b => b.status === 'paid').map((b): Payment => ({
    id: `pay-${b.id}`,
    vendorName: b.vendor.name,
    vendorLogo: b.vendor.logo,
    storeName: b.store.name,
    amount: b.amount,
    date: b.dueDate,
    status: 'Completed'
})).sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());

// Adding a failed payment for demonstration
paymentHistory.push({
    id: 'pay-006',
    vendorName: "Fraudulent Vendor",
    vendorLogo: getImage('pepsi'),
    storeName: 'Downtown Liquor',
    amount: 5000.0,
    date: '2024-06-15',
    status: 'Failed'
});


export const userProfile = {
  name: 'John Doe',
  email: 'john.doe@example.com',
  avatar: getImage('user-avatar'),
};

export const paymentMethods = [
  {
    id: 'pm-1',
    type: 'Bank Account',
    details: 'Chase Bank **** 1234',
    isDefault: true,
  },
  {
    id: 'pm-2',
    type: 'Credit Card',
    details: 'Visa **** 5678',
    isDefault: false,
  },
];

export const notificationSettings = {
  dueDates: true,
  failedPayments: true,
  promotions: false,
};
