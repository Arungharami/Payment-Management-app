import type { ImagePlaceholder } from './placeholder-images';
import { PlaceHolderImages } from './placeholder-images';

const getImage = (id: string): ImagePlaceholder =>
  PlaceHolderImages.find((img) => img.id === id) ?? PlaceHolderImages[0];

export type Vendor = {
  id: string;
  name: string;
  logo: ImagePlaceholder;
  accountNumber: string;
  paymentUrl?: string;
};

export type Bill = {
  id: string;
  vendor: Vendor;
  amount: number;
  dueDate: string;
  status: 'due' | 'paid' | 'overdue';
};

export type Payment = {
  id: string;
  vendor: Vendor;
  amount: number;
  date: string;
  status: 'Completed' | 'Pending' | 'Failed';
};

export const vendors: Vendor[] = [
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

export const bills: Bill[] = [
  {
    id: 'bill-001',
    vendor: vendors[0],
    amount: 542.5,
    dueDate: '2024-08-15',
    status: 'due',
  },
  {
    id: 'bill-002',
    vendor: vendors[2],
    amount: 1875.0,
    dueDate: '2024-08-10',
    status: 'overdue',
  },
  {
    id: 'bill-003',
    vendor: vendors[1],
    amount: 480.25,
    dueDate: '2024-08-20',
    status: 'due',
  },
  {
    id: 'bill-004',
    vendor: vendors[3],
    amount: 3250.75,
    dueDate: '2024-08-22',
    status: 'due',
  },
];

export const paymentHistory: Payment[] = [
  {
    id: 'pay-001',
    vendor: vendors[4],
    amount: 250.0,
    date: '2024-07-28',
    status: 'Completed',
  },
  {
    id: 'pay-002',
    vendor: vendors[0],
    amount: 530.1,
    date: '2024-07-15',
    status: 'Completed',
  },
  {
    id: 'pay-003',
    vendor: vendors[2],
    amount: 1850.0,
    date: '2024-07-10',
    status: 'Completed',
  },
  {
    id: 'pay-004',
    vendor: vendors[1],
    amount: 450.0,
    date: '2024-07-20',
    status: 'Completed',
  },
    {
    id: 'pay-005',
    vendor: vendors[3],
    amount: 3200.0,
    date: '2024-07-22',
    status: 'Completed',
  },
   {
    id: 'pay-006',
    vendor: { id: 'fraud', name: "Fraudulent Vendor", logo: getImage('pepsi'), accountNumber: "FV-000"},
    amount: 5000.0,
    date: '2024-06-15',
    status: 'Failed',
  },
];

export const userProfile = {
  name: 'John Doe',
  email: 'john.doe@liquorstore.com',
  storeName: 'The Corner Sip',
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
