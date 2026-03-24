import type { ComponentType } from 'react';
import {
  AlertTriangle,
  ArrowDownCircle,
  BadgeDollarSign,
  BrainCircuit,
  Building2,
  Clock3,
  FileText,
  Landmark,
  ShieldCheck,
  Wallet,
} from 'lucide-react';

import { formatCompactCurrency, formatCurrency } from '@/lib/format';

export type NavItem = {
  href: string;
  label: string;
  icon: ComponentType<{ className?: string }>;
};

export type VendorRisk = 'Low' | 'Medium' | 'High';
export type InvoiceStatus =
  | 'Draft'
  | 'Pending'
  | 'Approved'
  | 'Scheduled'
  | 'Paid'
  | 'Overdue'
  | 'Partially Paid'
  | 'Cancelled';
export type PaymentMethod = 'ACH' | 'Wire' | 'Card' | 'Check';
export type PaymentStatus = 'Scheduled' | 'Processing' | 'Completed' | 'Failed';
export type ApprovalStatus = 'Pending' | 'Approved' | 'Rejected';
export type NotificationSeverity = 'Info' | 'Warning' | 'Critical' | 'Success';

export type StoreLocation = {
  id: string;
  name: string;
  city: string;
  state: string;
  type: string;
  manager: string;
  monthlyOutflow: number;
  openIssues: number;
};

export type Vendor = {
  id: string;
  name: string;
  contactPerson: string;
  phone: string;
  email: string;
  businessType: string;
  paymentMethod: PaymentMethod;
  paymentTerms: string;
  taxId: string;
  bankAccountMask: string;
  address: string;
  notes: string;
  status: 'Active' | 'Inactive';
  risk: VendorRisk;
  tags: string[];
  totalPaidYtd: number;
  openBalance: number;
  invoiceCount: number;
  paymentReliability: string;
};

export type Invoice = {
  id: string;
  invoiceNumber: string;
  vendorId: string;
  storeId: string;
  category: string;
  amount: number;
  issueDate: string;
  dueDate: string;
  status: InvoiceStatus;
  approvalStatus: ApprovalStatus;
  recurring: boolean;
  attachmentName: string;
  notes: string;
};

export type Payment = {
  id: string;
  vendorId: string;
  storeId: string;
  referenceNumber: string;
  amount: number;
  scheduledDate: string;
  completedDate?: string;
  method: PaymentMethod;
  status: PaymentStatus;
  batchName: string;
};

export type ApprovalItem = {
  id: string;
  invoiceId: string;
  submittedBy: string;
  approver: string;
  role: string;
  status: ApprovalStatus;
  submittedAt: string;
  dueBy: string;
  comment: string;
};

export type DocumentRecord = {
  id: string;
  name: string;
  category: 'Invoice' | 'Contract' | 'Receipt' | 'Tax' | 'Payment Confirmation' | 'Internal';
  linkedTo: string;
  vendorId?: string;
  paymentId?: string;
  updatedAt: string;
  tag: string;
};

export type NotificationItem = {
  id: string;
  title: string;
  body: string;
  severity: NotificationSeverity;
  createdAt: string;
  actionLabel: string;
};

export type ActivityItem = {
  id: string;
  title: string;
  detail: string;
  timestamp: string;
};

export type ChatMessage = {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  timestamp: string;
};

export type AuditLog = {
  id: string;
  actor: string;
  action: string;
  target: string;
  timestamp: string;
};

export const primaryNav: NavItem[] = [
  { href: '/dashboard', label: 'Dashboard', icon: Wallet },
  { href: '/vendors', label: 'Vendors', icon: Building2 },
  { href: '/invoices', label: 'Invoices', icon: FileText },
  { href: '/payments', label: 'Payments', icon: BadgeDollarSign },
  { href: '/approvals', label: 'Approvals', icon: ShieldCheck },
  { href: '/documents', label: 'Documents', icon: Landmark },
  { href: '/assistant', label: 'AI Assistant', icon: BrainCircuit },
  { href: '/analytics', label: 'Analytics', icon: ArrowDownCircle },
];

export const secondaryNav: NavItem[] = [
  { href: '/stores', label: 'Stores', icon: Building2 },
  { href: '/notifications', label: 'Alerts', icon: AlertTriangle },
  { href: '/settings', label: 'Settings', icon: Clock3 },
];

export const businessProfile = {
  name: 'LedgerFlow Commerce Group',
  legalName: 'LedgerFlow Commerce Group LLC',
  headquarters: 'Sacramento, California',
  entityType: 'Multi-location retail operator',
  taxId: '94-1287430',
  accountingCloseDay: '25th of each month',
  supportEmail: 'finance@ledgerflowhq.com',
};

export const userProfile = {
  name: 'Arun Patel',
  email: 'arun@ledgerflowhq.com',
  role: 'Finance Admin',
  initials: 'AP',
};

export const stores: StoreLocation[] = [
  {
    id: 'st-1',
    name: 'Capital Spirits',
    city: 'Sacramento',
    state: 'CA',
    type: 'Liquor store',
    manager: 'Maya Singh',
    monthlyOutflow: 122000,
    openIssues: 3,
  },
  {
    id: 'st-2',
    name: 'Bayview Market',
    city: 'San Jose',
    state: 'CA',
    type: 'Grocery & convenience',
    manager: 'Daniel Lopez',
    monthlyOutflow: 164000,
    openIssues: 5,
  },
  {
    id: 'st-3',
    name: 'Golden Care Pharmacy',
    city: 'Fresno',
    state: 'CA',
    type: 'Pharmacy',
    manager: 'Ayesha Khan',
    monthlyOutflow: 98000,
    openIssues: 2,
  },
  {
    id: 'st-4',
    name: 'Route 99 Wholesale',
    city: 'Bakersfield',
    state: 'CA',
    type: 'Wholesale warehouse',
    manager: 'Miguel Ramos',
    monthlyOutflow: 231000,
    openIssues: 6,
  },
];

export const vendors: Vendor[] = [
  {
    id: 'ven-1',
    name: 'RNDC West',
    contactPerson: 'Lauren Davis',
    phone: '(916) 555-0142',
    email: 'collections@rndcwest.com',
    businessType: 'Liquor distributor',
    paymentMethod: 'ACH',
    paymentTerms: 'Net 15',
    taxId: '45-2213987',
    bankAccountMask: 'Chase ACH •••• 4491',
    address: '100 Distribution Way, Sacramento, CA',
    notes: 'Requires statement reconciliation before release over $25k.',
    status: 'Active',
    risk: 'Medium',
    tags: ['California', 'High volume', 'Alcohol'],
    totalPaidYtd: 386000,
    openBalance: 42850,
    invoiceCount: 26,
    paymentReliability: 'Consistent ACH acceptance',
  },
  {
    id: 'ven-2',
    name: 'Coca-Cola Bottling Co.',
    contactPerson: 'James Edwards',
    phone: '(408) 555-0122',
    email: 'ap-west@coke.com',
    businessType: 'Beverage supplier',
    paymentMethod: 'ACH',
    paymentTerms: 'Net 30',
    taxId: '33-7794212',
    bankAccountMask: 'Wells Fargo ACH •••• 1092',
    address: '2400 South 7th Street, San Jose, CA',
    notes: 'Recurring weekly beverage invoices for Bayview Market.',
    status: 'Active',
    risk: 'Low',
    tags: ['Recurring', 'Beverages'],
    totalPaidYtd: 118500,
    openBalance: 16640,
    invoiceCount: 18,
    paymentReliability: 'Stable recurring cycle',
  },
  {
    id: 'ven-3',
    name: 'McKesson Medical-Surgical',
    contactPerson: 'Priya Nair',
    phone: '(559) 555-0198',
    email: 'payables@mckesson.com',
    businessType: 'Pharmacy & medical supplier',
    paymentMethod: 'Wire',
    paymentTerms: 'Net 10',
    taxId: '81-5531904',
    bankAccountMask: 'BofA Wire •••• 8401',
    address: '5250 Medical Park Dr, Fresno, CA',
    notes: 'Escalate if any invoice is overdue due to inventory sensitivity.',
    status: 'Active',
    risk: 'High',
    tags: ['Critical inventory', 'Pharmacy'],
    totalPaidYtd: 212400,
    openBalance: 61220,
    invoiceCount: 14,
    paymentReliability: 'Time sensitive wire transfers',
  },
  {
    id: 'ven-4',
    name: 'Sysco Foods Northern CA',
    contactPerson: 'Brandon Lee',
    phone: '(925) 555-0177',
    email: 'collections@sysco.com',
    businessType: 'Food distributor',
    paymentMethod: 'ACH',
    paymentTerms: 'Net 14',
    taxId: '23-4456719',
    bankAccountMask: 'Citi ACH •••• 6691',
    address: '8610 Logistics Ave, Oakland, CA',
    notes: 'Supports multiple locations with recurring deliveries.',
    status: 'Active',
    risk: 'Medium',
    tags: ['Food', 'Multi-location'],
    totalPaidYtd: 174900,
    openBalance: 27400,
    invoiceCount: 19,
    paymentReliability: 'Weekly payment cadence',
  },
  {
    id: 'ven-5',
    name: 'Premier Packaging Supply',
    contactPerson: 'Olivia Chen',
    phone: '(661) 555-0114',
    email: 'support@premierpack.com',
    businessType: 'Packaging supplier',
    paymentMethod: 'Card',
    paymentTerms: 'Net 30',
    taxId: '58-7419203',
    bankAccountMask: 'Corporate Card •••• 5418',
    address: '4500 Commerce Blvd, Bakersfield, CA',
    notes: 'Used for store packaging and seasonal displays.',
    status: 'Active',
    risk: 'Low',
    tags: ['Packaging', 'Card'],
    totalPaidYtd: 53200,
    openBalance: 9200,
    invoiceCount: 11,
    paymentReliability: 'Low exception rate',
  },
];

export const invoices: Invoice[] = [
  {
    id: 'inv-1001',
    invoiceNumber: 'RNDC-30288',
    vendorId: 'ven-1',
    storeId: 'st-1',
    category: 'Inventory replenishment',
    amount: 18340,
    issueDate: '2026-03-05',
    dueDate: '2026-03-25',
    status: 'Pending',
    approvalStatus: 'Pending',
    recurring: true,
    attachmentName: 'rndc-march-week1.pdf',
    notes: 'Includes spring spirits launch allocation.',
  },
  {
    id: 'inv-1002',
    invoiceNumber: 'COKE-88114',
    vendorId: 'ven-2',
    storeId: 'st-2',
    category: 'Beverage restock',
    amount: 8420,
    issueDate: '2026-03-07',
    dueDate: '2026-03-28',
    status: 'Approved',
    approvalStatus: 'Approved',
    recurring: true,
    attachmentName: 'coke-bayview-restock.pdf',
    notes: 'Quarterly volume discount applied.',
  },
  {
    id: 'inv-1003',
    invoiceNumber: 'MCK-41077',
    vendorId: 'ven-3',
    storeId: 'st-3',
    category: 'Pharmacy inventory',
    amount: 27610,
    issueDate: '2026-03-09',
    dueDate: '2026-03-21',
    status: 'Overdue',
    approvalStatus: 'Pending',
    recurring: false,
    attachmentName: 'mckesson-purchase-41077.pdf',
    notes: 'Urgent antibiotic line item flagged by store manager.',
  },
  {
    id: 'inv-1004',
    invoiceNumber: 'SYS-22814',
    vendorId: 'ven-4',
    storeId: 'st-2',
    category: 'Prepared foods & grocery',
    amount: 12980,
    issueDate: '2026-03-10',
    dueDate: '2026-03-27',
    status: 'Scheduled',
    approvalStatus: 'Approved',
    recurring: true,
    attachmentName: 'sysco-bayview-week3.pdf',
    notes: 'Scheduled in Thursday ACH batch.',
  },
  {
    id: 'inv-1005',
    invoiceNumber: 'PP-55019',
    vendorId: 'ven-5',
    storeId: 'st-4',
    category: 'Packaging materials',
    amount: 4180,
    issueDate: '2026-03-12',
    dueDate: '2026-04-11',
    status: 'Draft',
    approvalStatus: 'Pending',
    recurring: false,
    attachmentName: 'premier-packaging-march.pdf',
    notes: 'Needs PO match before submission.',
  },
  {
    id: 'inv-1006',
    invoiceNumber: 'RNDC-30312',
    vendorId: 'ven-1',
    storeId: 'st-4',
    category: 'Wholesale inventory',
    amount: 24150,
    issueDate: '2026-03-11',
    dueDate: '2026-03-26',
    status: 'Partially Paid',
    approvalStatus: 'Approved',
    recurring: true,
    attachmentName: 'rndc-wholesale-30312.pdf',
    notes: 'Partial release already sent for priority SKUs.',
  },
  {
    id: 'inv-1007',
    invoiceNumber: 'MCK-41152',
    vendorId: 'ven-3',
    storeId: 'st-3',
    category: 'Controlled inventory',
    amount: 19300,
    issueDate: '2026-03-18',
    dueDate: '2026-03-29',
    status: 'Pending',
    approvalStatus: 'Pending',
    recurring: false,
    attachmentName: 'mckesson-controlled-41152.pdf',
    notes: 'Manager comment requested on dosage variance.',
  },
  {
    id: 'inv-1008',
    invoiceNumber: 'COKE-88197',
    vendorId: 'ven-2',
    storeId: 'st-1',
    category: 'Cooler restock',
    amount: 6940,
    issueDate: '2026-03-13',
    dueDate: '2026-03-31',
    status: 'Paid',
    approvalStatus: 'Approved',
    recurring: true,
    attachmentName: 'coke-capital-88197.pdf',
    notes: 'Paid in Monday beverage batch.',
  },
];

export const payments: Payment[] = [
  {
    id: 'pay-2001',
    vendorId: 'ven-1',
    storeId: 'st-1',
    referenceNumber: 'ACH-938154',
    amount: 18340,
    scheduledDate: '2026-03-25',
    method: 'ACH',
    status: 'Scheduled',
    batchName: 'West Coast Monday batch',
  },
  {
    id: 'pay-2002',
    vendorId: 'ven-2',
    storeId: 'st-2',
    referenceNumber: 'ACH-938155',
    amount: 8420,
    scheduledDate: '2026-03-27',
    method: 'ACH',
    status: 'Processing',
    batchName: 'Recurring beverage batch',
  },
  {
    id: 'pay-2003',
    vendorId: 'ven-3',
    storeId: 'st-3',
    referenceNumber: 'WIRE-18200',
    amount: 27610,
    scheduledDate: '2026-03-22',
    completedDate: '2026-03-22',
    method: 'Wire',
    status: 'Failed',
    batchName: 'Emergency pharmacy release',
  },
  {
    id: 'pay-2004',
    vendorId: 'ven-4',
    storeId: 'st-2',
    referenceNumber: 'ACH-938166',
    amount: 12980,
    scheduledDate: '2026-03-27',
    method: 'ACH',
    status: 'Scheduled',
    batchName: 'Thursday grocery batch',
  },
  {
    id: 'pay-2005',
    vendorId: 'ven-5',
    storeId: 'st-4',
    referenceNumber: 'CARD-77318',
    amount: 4180,
    scheduledDate: '2026-04-10',
    method: 'Card',
    status: 'Scheduled',
    batchName: 'Packaging card payments',
  },
  {
    id: 'pay-2006',
    vendorId: 'ven-2',
    storeId: 'st-1',
    referenceNumber: 'ACH-937904',
    amount: 6940,
    scheduledDate: '2026-03-19',
    completedDate: '2026-03-19',
    method: 'ACH',
    status: 'Completed',
    batchName: 'Monday beverage batch',
  },
];

export const approvalItems: ApprovalItem[] = [
  {
    id: 'appr-1',
    invoiceId: 'inv-1001',
    submittedBy: 'Maya Singh',
    approver: 'Arun Patel',
    role: 'Finance Admin',
    status: 'Pending',
    submittedAt: '2026-03-20',
    dueBy: '2026-03-24',
    comment: 'Review promotional allowances before release.',
  },
  {
    id: 'appr-2',
    invoiceId: 'inv-1002',
    submittedBy: 'Daniel Lopez',
    approver: 'Lina Brooks',
    role: 'Controller',
    status: 'Approved',
    submittedAt: '2026-03-18',
    dueBy: '2026-03-21',
    comment: 'Approved after volume discount validation.',
  },
  {
    id: 'appr-3',
    invoiceId: 'inv-1003',
    submittedBy: 'Ayesha Khan',
    approver: 'Arun Patel',
    role: 'Finance Admin',
    status: 'Pending',
    submittedAt: '2026-03-19',
    dueBy: '2026-03-23',
    comment: 'Escalated due to overdue medical inventory.',
  },
  {
    id: 'appr-4',
    invoiceId: 'inv-1005',
    submittedBy: 'Miguel Ramos',
    approver: 'Jordan Wells',
    role: 'Operations Manager',
    status: 'Rejected',
    submittedAt: '2026-03-17',
    dueBy: '2026-03-20',
    comment: 'PO mismatch. Re-submit with corrected line items.',
  },
];

export const documents: DocumentRecord[] = [
  {
    id: 'doc-1',
    name: 'RNDC master supplier contract',
    category: 'Contract',
    linkedTo: 'RNDC West',
    vendorId: 'ven-1',
    updatedAt: '2026-03-02',
    tag: 'Renewal due Jun 2026',
  },
  {
    id: 'doc-2',
    name: 'McKesson tax certificate',
    category: 'Tax',
    linkedTo: 'McKesson Medical-Surgical',
    vendorId: 'ven-3',
    updatedAt: '2026-02-28',
    tag: 'Compliance',
  },
  {
    id: 'doc-3',
    name: 'ACH remittance 938155',
    category: 'Payment Confirmation',
    linkedTo: 'Recurring beverage batch',
    paymentId: 'pay-2002',
    updatedAt: '2026-03-24',
    tag: 'In transit',
  },
  {
    id: 'doc-4',
    name: 'Bayview market invoice packet',
    category: 'Invoice',
    linkedTo: 'Coca-Cola Bottling Co.',
    vendorId: 'ven-2',
    updatedAt: '2026-03-18',
    tag: 'March cycle',
  },
  {
    id: 'doc-5',
    name: 'Internal approval worksheet',
    category: 'Internal',
    linkedTo: 'West Coast Monday batch',
    updatedAt: '2026-03-23',
    tag: 'Batch prep',
  },
];

export const notifications: NotificationItem[] = [
  {
    id: 'not-1',
    title: 'Overdue pharmacy invoice requires action',
    body: 'McKesson invoice MCK-41077 is overdue and tied to controlled inventory replenishment.',
    severity: 'Critical',
    createdAt: '2026-03-24 08:12',
    actionLabel: 'Review approval',
  },
  {
    id: 'not-2',
    title: '5 invoices are due within 3 days',
    body: 'Upcoming outflow for the next three business days is $54,300 across four vendors.',
    severity: 'Warning',
    createdAt: '2026-03-24 07:40',
    actionLabel: 'Open payment calendar',
  },
  {
    id: 'not-3',
    title: 'Recurring beverage batch processing',
    body: 'ACH file ACH-938155 has been released to the bank and is awaiting confirmation.',
    severity: 'Info',
    createdAt: '2026-03-24 06:55',
    actionLabel: 'Track payment',
  },
  {
    id: 'not-4',
    title: 'Vendor contract renewal in 90 days',
    body: 'RNDC master supplier contract should be reviewed before renewal window closes.',
    severity: 'Success',
    createdAt: '2026-03-23 15:20',
    actionLabel: 'Open documents',
  },
];

export const activityFeed: ActivityItem[] = [
  {
    id: 'act-1',
    title: 'Thursday grocery batch prepared',
    detail: '2 invoices totaling $21,400 are scheduled for release.',
    timestamp: '15 minutes ago',
  },
  {
    id: 'act-2',
    title: 'Controller approved COKE-88114',
    detail: 'Daniel Lopez invoice moved from pending to approved.',
    timestamp: '42 minutes ago',
  },
  {
    id: 'act-3',
    title: 'Bank rejected wire confirmation',
    detail: 'WIRE-18200 needs updated beneficiary review.',
    timestamp: '1 hour ago',
  },
  {
    id: 'act-4',
    title: 'Vendor document uploaded',
    detail: 'McKesson tax certificate added to compliance records.',
    timestamp: '3 hours ago',
  },
];

export const aiQuickPrompts = [
  'Which vendors are overdue this week?',
  'How much do I need to pay in the next 7 days?',
  'Show unpaid invoices from Coca-Cola',
  'What is my biggest vendor expense this month?',
  'Which payments need approval?',
];

export const chatMessages: ChatMessage[] = [
  {
    id: 'chat-1',
    role: 'user',
    content: 'Which vendors are overdue this week?',
    timestamp: '09:02 AM',
  },
  {
    id: 'chat-2',
    role: 'assistant',
    content:
      'McKesson Medical-Surgical and RNDC West are the highest-risk overdue vendors this week. McKesson is tied to urgent pharmacy inventory, so prioritize that approval first. Total overdue exposure is $27,610.',
    timestamp: '09:02 AM',
  },
  {
    id: 'chat-3',
    role: 'user',
    content: 'How much do I need to pay in the next 7 days?',
    timestamp: '09:05 AM',
  },
  {
    id: 'chat-4',
    role: 'assistant',
    content:
      'You have $63,550 scheduled or expected in the next 7 days. 58% is tied to inventory suppliers and 31% requires final approval before release.',
    timestamp: '09:05 AM',
  },
];

export const auditLogs: AuditLog[] = [
  {
    id: 'log-1',
    actor: 'Arun Patel',
    action: 'Approved invoice',
    target: 'COKE-88114',
    timestamp: '2026-03-24 08:14',
  },
  {
    id: 'log-2',
    actor: 'Maya Singh',
    action: 'Submitted invoice',
    target: 'RNDC-30288',
    timestamp: '2026-03-24 07:58',
  },
  {
    id: 'log-3',
    actor: 'Jordan Wells',
    action: 'Rejected invoice',
    target: 'PP-55019',
    timestamp: '2026-03-23 17:43',
  },
  {
    id: 'log-4',
    actor: 'System',
    action: 'Bank status updated',
    target: 'ACH-938155',
    timestamp: '2026-03-23 16:50',
  },
];

export const monthlySpend = [
  { month: 'Oct', spend: 148000, paid: 136000 },
  { month: 'Nov', spend: 153000, paid: 144000 },
  { month: 'Dec', spend: 176000, paid: 169000 },
  { month: 'Jan', spend: 185000, paid: 174000 },
  { month: 'Feb', spend: 191000, paid: 182000 },
  { month: 'Mar', spend: 204000, paid: 165000 },
];

export const overdueTrend = [
  { week: 'W1', overdue: 6 },
  { week: 'W2', overdue: 4 },
  { week: 'W3', overdue: 5 },
  { week: 'W4', overdue: 3 },
];

export const paymentMethodDistribution = [
  { method: 'ACH', value: 62 },
  { method: 'Wire', value: 18 },
  { method: 'Card', value: 13 },
  { method: 'Check', value: 7 },
];

export const approvalTurnaround = [
  { label: 'Same day', value: 38 },
  { label: '1-2 days', value: 44 },
  { label: '3+ days', value: 18 },
];

export const reportSnapshots = {
  upcomingOutflow: 63550,
  pendingApprovals: 8,
  overdueExposure: 27610,
  topVendorSpend: [
    { vendor: 'RNDC West', amount: 42850, share: 86 },
    { vendor: 'McKesson Medical-Surgical', amount: 61220, share: 100 },
    { vendor: 'Sysco Foods Northern CA', amount: 27400, share: 45 },
    { vendor: 'Coca-Cola Bottling Co.', amount: 16640, share: 27 },
  ],
};

export const dashboardMetrics = [
  {
    label: 'Total payable',
    value: formatCurrency(157310),
    helper: 'Across 8 open invoices',
    delta: '+12.4% vs last month',
    icon: Wallet,
  },
  {
    label: 'Upcoming due payments',
    value: formatCurrency(63550),
    helper: 'Next 7 days',
    delta: '18 scheduled payments',
    icon: Clock3,
  },
  {
    label: 'Overdue invoices',
    value: '4',
    helper: '1 critical vendor',
    delta: formatCurrency(27610),
    icon: AlertTriangle,
  },
  {
    label: 'Paid this month',
    value: formatCurrency(165000),
    helper: '76% automated',
    delta: '+9.8% completion rate',
    icon: BadgeDollarSign,
  },
  {
    label: 'Pending approvals',
    value: '8',
    helper: '5 need same-day action',
    delta: 'Median turnaround 1.4 days',
    icon: ShieldCheck,
  },
  {
    label: 'Vendor count',
    value: `${vendors.length}`,
    helper: '4 active locations',
    delta: '2 new vendors this quarter',
    icon: Building2,
  },
];

export const cashFlowCards = [
  {
    label: 'Forecasted outflow',
    value: formatCompactCurrency(204000),
    helper: 'March month-end',
  },
  {
    label: 'Held for approval',
    value: formatCompactCurrency(47450),
    helper: 'Awaiting manager or controller action',
  },
  {
    label: 'Automatable recurring spend',
    value: formatCompactCurrency(86300),
    helper: 'Recurring vendor cycles ready for rules',
  },
];

export const roleCards = [
  {
    role: 'Store manager',
    focus: 'Invoice submission, comments, exception handling',
    coverage: '4 users',
  },
  {
    role: 'Accountant',
    focus: 'Payment release, reconciliation, vendor upkeep',
    coverage: '2 users',
  },
  {
    role: 'Admin',
    focus: 'Approvals, audit oversight, policy settings',
    coverage: '1 user',
  },
];

export function getVendor(vendorId: string) {
  return vendors.find((vendor) => vendor.id === vendorId);
}

export function getStore(storeId: string) {
  return stores.find((store) => store.id === storeId);
}
