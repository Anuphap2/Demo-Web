export interface Product {
  id: string;
  name: string;
  sku: string;
  category: string;
  costPrice: number;
  sellPrice: number;
  stockQty: number;
  minQty: number;
  unit: string;
}

export interface Customer {
  id: string;
  code: string;
  name: string;
  taxId: string;
  address: string;
  phone: string;
  email: string;
  branch: string;
}

export interface InvoiceItem {
  productId: string;
  productName: string;
  quantity: number;
  costPrice: number;
  sellPrice: number;
  discount: number;
  total: number;
  profit: number;
}

export type InvoiceStatus = 'draft' | 'pending' | 'confirmed' | 'paid' | 'invoiced';

export interface Invoice {
  id: string;
  invoiceNo: string;
  date: string;
  dueDate: string;
  customerId: string;
  customerName: string;
  items: InvoiceItem[];
  subtotal: number;
  vatRate: number; // 7 or 0
  vatAmount: number;
  withholdingTaxRate: number; // 0, 1, 3
  withholdingTaxAmount: number;
  grandTotal: number;
  totalCost: number;
  profit: number;
  status: InvoiceStatus;
  taxYear: number;
  notes?: string;
  paymentMethod?: string;
  slipUrl?: string;
  slipVerified?: boolean;
}

export interface Quotation {
  id: string;
  quotationNo: string;
  date: string;
  validDays: number;
  customerId: string;
  customerName: string;
  items: InvoiceItem[];
  subtotal: number;
  vatRate: number;
  vatAmount: number;
  grandTotal: number;
  status: 'draft' | 'sent' | 'approved' | 'converted' | 'rejected';
  notes?: string;
}

export interface Expense {
  id: string;
  date: string;
  title: string;
  category: 'ขนส่ง' | 'ภาษี' | 'วัสดุอุปกรณ์' | 'สาธารณูปโภค' | 'เงินเดือน' | 'อื่นๆ';
  amount: number;
  paidTo: string;
  paymentMethod: string;
  receiptNo: string;
  notes?: string;
}

export type UserRole = 'superadmin' | 'accountant' | 'sales';
