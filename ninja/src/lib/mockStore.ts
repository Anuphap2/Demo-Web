import { Product, Customer, Invoice, Quotation, Expense, UserRole } from '@/types';

export const INITIAL_PRODUCTS: Product[] = [
  { id: 'p1', name: 'Server Dell PowerEdge R450', sku: 'SRV-DEL-01', category: 'Server', costPrice: 65000, sellPrice: 89000, stockQty: 4, minQty: 2, unit: 'เครื่อง' },
  { id: 'p2', name: 'Notebook Lenovo ThinkPad E14 Gen 5', sku: 'NB-LEN-02', category: 'Notebook', costPrice: 22000, sellPrice: 28900, stockQty: 12, minQty: 5, unit: 'เครื่อง' },
  { id: 'p3', name: 'Switch Cisco Catalyst 24-Port Gigabit', sku: 'NET-CIS-03', category: 'Network', costPrice: 14500, sellPrice: 19500, stockQty: 8, minQty: 3, unit: 'ตัว' },
  { id: 'p4', name: 'Access Point Ubiquiti UniFi U6-Pro', sku: 'NET-UBI-04', category: 'Network', costPrice: 4800, sellPrice: 6900, stockQty: 18, minQty: 6, unit: 'ตัว' },
  { id: 'p5', name: 'SSD Samsung 990 PRO 2TB NVMe', sku: 'STR-SAM-05', category: 'Storage', costPrice: 4200, sellPrice: 5900, stockQty: 25, minQty: 10, unit: 'ชิ้น' },
  { id: 'p6', name: 'UPS APC Easy UPS 1500VA', sku: 'PWR-APC-06', category: 'Power', costPrice: 7800, sellPrice: 10500, stockQty: 3, minQty: 4, unit: 'เครื่อง' },
  { id: 'p7', name: 'สายแลน CAT6 Link UTP (305m)', sku: 'CAB-LNK-07', category: 'Cable', costPrice: 2800, sellPrice: 3950, stockQty: 14, minQty: 5, unit: 'กล่อง' },
  { id: 'p8', name: 'Windows 11 Pro 64-bit OEM License', sku: 'SFT-MSW-08', category: 'Software', costPrice: 3800, sellPrice: 5200, stockQty: 30, minQty: 10, unit: 'License' },
];

export const INITIAL_CUSTOMERS: Customer[] = [
  { id: 'c1', code: 'CUST-001', name: 'บริษัท เดโม อินโนเวชั่น จำกัด (สำนักงานใหญ่)', taxId: '0105599000011', address: '123/45 ถนนสุขุมวิท 71 แขวงคลองตันเหนือ เขตวัฒนา กรุงเทพฯ 10110', phone: '02-000-1111', email: 'contact@demo-innovation.co.th', branch: 'สำนักงานใหญ่' },
  { id: 'c2', code: 'CUST-002', name: 'หจก. ดิจิทัล โซลูชั่นส์ ตัวอย่าง', taxId: '0105599000022', address: '88 หมู่ 1 ถนนสมมุติพัฒนา ต.ช้างเผือก อ.เมือง จ.เชียงใหม่ 50300', phone: '053-000-222', email: 'account@example-solutions.com', branch: 'สำนักงานใหญ่' },
  { id: 'c3', code: 'CUST-003', name: 'สถาบันเทคโนโลยีและนวัตกรรมตัวอย่าง (Demo Institute)', taxId: '0994000999999', address: '99 ถนนมหาวิทยาลัยจำลอง ต.สุเทพ อ.เมือง จ.เชียงใหม่ 50200', phone: '053-000-333', email: 'procurement@demo-institute.ac.th', branch: 'คณะเทคโนโลยีสารสนเทศ' },
  { id: 'c4', code: 'CUST-004', name: 'บริษัท บลูสกาย รีสอร์ท แอนด์ สปา จำกัด', taxId: '0105599000044', address: '15/2 ถนนสายทะเล ต.หาดสมมุติ อ.เมือง จ.ภูเก็ต 83000', phone: '076-000-444', email: 'it-support@bluesky-resort.demo', branch: 'สำนักงานใหญ่' },
];

export const INITIAL_INVOICES: Invoice[] = [
  {
    id: 'inv-1',
    invoiceNo: 'INV-2026-001',
    date: '2026-03-01',
    dueDate: '2026-03-31',
    customerId: 'c1',
    customerName: 'บริษัท เดโม อินโนเวชั่น จำกัด (สำนักงานใหญ่)',
    items: [
      { productId: 'p1', productName: 'Server Dell PowerEdge R450', quantity: 1, costPrice: 65000, sellPrice: 89000, discount: 0, total: 89000, profit: 24000 },
      { productId: 'p5', productName: 'SSD Samsung 990 PRO 2TB NVMe', quantity: 2, costPrice: 4200, sellPrice: 5900, discount: 0, total: 11800, profit: 3400 },
    ],
    subtotal: 100800,
    vatRate: 7,
    vatAmount: 7056,
    withholdingTaxRate: 3,
    withholdingTaxAmount: 3024,
    grandTotal: 104832,
    totalCost: 73400,
    profit: 27400,
    status: 'paid',
    taxYear: 2026,
    paymentMethod: 'โอนผ่านธนาคารตัวอย่าง',
    slipUrl: '/images/logo.png',
    slipVerified: true,
  },
  {
    id: 'inv-2',
    invoiceNo: 'INV-2026-002',
    date: '2026-03-05',
    dueDate: '2026-04-05',
    customerId: 'c3',
    customerName: 'สถาบันเทคโนโลยีและนวัตกรรมตัวอย่าง (Demo Institute)',
    items: [
      { productId: 'p3', productName: 'Switch Cisco Catalyst 24-Port Gigabit', quantity: 2, costPrice: 14500, sellPrice: 19500, discount: 0, total: 39000, profit: 10000 },
      { productId: 'p4', productName: 'Access Point Ubiquiti UniFi U6-Pro', quantity: 4, costPrice: 4800, sellPrice: 6900, discount: 0, total: 27600, profit: 8400 },
      { productId: 'p7', productName: 'สายแลน CAT6 Link UTP (305m)', quantity: 2, costPrice: 2800, sellPrice: 3950, discount: 0, total: 7900, profit: 2300 },
    ],
    subtotal: 74500,
    vatRate: 7,
    vatAmount: 5215,
    withholdingTaxRate: 1,
    withholdingTaxAmount: 745,
    grandTotal: 78970,
    totalCost: 53800,
    profit: 20700,
    status: 'invoiced',
    taxYear: 2026,
  },
  {
    id: 'inv-3',
    invoiceNo: 'INV-2026-003',
    date: '2026-03-10',
    dueDate: '2026-04-10',
    customerId: 'c2',
    customerName: 'หจก. ดิจิทัล โซลูชั่นส์ ตัวอย่าง',
    items: [
      { productId: 'p2', productName: 'Notebook Lenovo ThinkPad E14 Gen 5', quantity: 3, costPrice: 22000, sellPrice: 28900, discount: 1000, total: 85700, profit: 19700 },
      { productId: 'p8', productName: 'Windows 11 Pro 64-bit OEM License', quantity: 3, costPrice: 3800, sellPrice: 5200, discount: 0, total: 15600, profit: 4200 },
    ],
    subtotal: 101300,
    vatRate: 7,
    vatAmount: 7091,
    withholdingTaxRate: 3,
    withholdingTaxAmount: 3039,
    grandTotal: 105352,
    totalCost: 77400,
    profit: 23900,
    status: 'confirmed',
    taxYear: 2026,
  },
  {
    id: 'inv-4',
    invoiceNo: 'INV-2026-004',
    date: '2026-03-14',
    dueDate: '2026-04-14',
    customerId: 'c4',
    customerName: 'บริษัท บลูสกาย รีสอร์ท แอนด์ สปา จำกัด',
    items: [
      { productId: 'p6', productName: 'UPS APC Easy UPS 1500VA', quantity: 2, costPrice: 7800, sellPrice: 10500, discount: 0, total: 21000, profit: 5400 },
    ],
    subtotal: 21000,
    vatRate: 7,
    vatAmount: 1470,
    withholdingTaxRate: 0,
    withholdingTaxAmount: 0,
    grandTotal: 22470,
    totalCost: 15600,
    profit: 5400,
    status: 'pending',
    taxYear: 2026,
  },
];

export const INITIAL_QUOTATIONS: Quotation[] = [
  {
    id: 'qt-1',
    quotationNo: 'QT-2026-001',
    date: '2026-03-12',
    validDays: 30,
    customerId: 'c4',
    customerName: 'บริษัท บลูสกาย รีสอร์ท แอนด์ สปา จำกัด',
    items: [
      { productId: 'p4', productName: 'Access Point Ubiquiti UniFi U6-Pro', quantity: 8, costPrice: 4800, sellPrice: 6900, discount: 0, total: 55200, profit: 16800 },
      { productId: 'p3', productName: 'Switch Cisco Catalyst 24-Port Gigabit', quantity: 1, costPrice: 14500, sellPrice: 19500, discount: 0, total: 19500, profit: 5000 },
    ],
    subtotal: 74700,
    vatRate: 7,
    vatAmount: 5229,
    grandTotal: 79929,
    status: 'sent',
    notes: 'รวมติดตั้งระบบ Wireless Controller',
  },
  {
    id: 'qt-2',
    quotationNo: 'QT-2026-002',
    date: '2026-03-15',
    validDays: 15,
    customerId: 'c1',
    customerName: 'บริษัท เดโม อินโนเวชั่น จำกัด (สำนักงานใหญ่)',
    items: [
      { productId: 'p2', productName: 'Notebook Lenovo ThinkPad E14 Gen 5', quantity: 5, costPrice: 22000, sellPrice: 28900, discount: 2000, total: 142500, profit: 32500 },
    ],
    subtotal: 142500,
    vatRate: 7,
    vatAmount: 9975,
    grandTotal: 152475,
    status: 'approved',
    notes: 'อนุมัติใบเสนอราคาตามเงื่อนไขตัวอย่าง',
  },
];

export const INITIAL_EXPENSES: Expense[] = [
  { id: 'exp-1', date: '2026-03-02', title: 'ค่าจัดส่งพัสดุด่วนโลจิสติกส์ตัวอย่าง', category: 'ขนส่ง', amount: 1450, paidTo: 'บจก. โลจิสติกส์ เอ็กซ์เพรส (จำลอง)', paymentMethod: 'เงินสด', receiptNo: 'LOG-99001' },
  { id: 'exp-2', date: '2026-03-05', title: 'ค่าภาษีมูลค่าเพิ่ม ภ.พ. 30 ประจำเดือน (จำลอง)', category: 'ภาษี', amount: 4820, paidTo: 'กรมสรรพากร (ตัวอย่าง)', paymentMethod: 'โอนเงิน', receiptNo: 'RD-DEMO-03' },
  { id: 'exp-3', date: '2026-03-08', title: 'ซื้อหัวต่อสัญญาณและกล่องพักสาย', category: 'วัสดุอุปกรณ์', amount: 2600, paidTo: 'ร้านอุปกรณ์เน็ตเวิร์กตัวอย่าง', paymentMethod: 'โอนเงิน', receiptNo: 'EXP-8812' },
  { id: 'exp-4', date: '2026-03-12', title: 'ค่าอินเทอร์เน็ตความเร็วสูงประจำสำนักงาน', category: 'สาธารณูปโภค', amount: 1290, paidTo: 'ผู้ให้บริการอินเทอร์เน็ตจำลอง', paymentMethod: 'หักบัญชี', receiptNo: 'ISP-55441' },
];

class NinjaStore {
  private isBrowser = typeof window !== 'undefined';

  private getItem<T>(key: string, initial: T): T {
    if (!this.isBrowser) return initial;
    try {
      const data = localStorage.getItem(`ninja_${key}`);
      return data ? JSON.parse(data) : initial;
    } catch {
      return initial;
    }
  }

  private setItem<T>(key: string, value: T): void {
    if (!this.isBrowser) return;
    try {
      localStorage.setItem(`ninja_${key}`, JSON.stringify(value));
    } catch (e) {
      console.error(e);
    }
  }

  getProducts(): Product[] {
    return this.getItem('products', INITIAL_PRODUCTS);
  }

  saveProducts(products: Product[]): void {
    this.setItem('products', products);
  }

  getCustomers(): Customer[] {
    return this.getItem('customers', INITIAL_CUSTOMERS);
  }

  saveCustomers(customers: Customer[]): void {
    this.setItem('customers', customers);
  }

  getInvoices(): Invoice[] {
    return this.getItem('invoices', INITIAL_INVOICES);
  }

  saveInvoices(invoices: Invoice[]): void {
    this.setItem('invoices', invoices);
  }

  addInvoice(invoice: Omit<Invoice, 'id' | 'invoiceNo'>): Invoice {
    const invoices = this.getInvoices();
    const newNo = `INV-2026-${String(invoices.length + 1).padStart(3, '0')}`;
    const newInvoice: Invoice = {
      ...invoice,
      id: `inv-${Date.now()}`,
      invoiceNo: newNo,
    };
    invoices.unshift(newInvoice);
    this.saveInvoices(invoices);
    return newInvoice;
  }

  updateInvoice(id: string, updates: Partial<Invoice>): void {
    const invoices = this.getInvoices().map(inv => inv.id === id ? { ...inv, ...updates } : inv);
    this.saveInvoices(invoices);
  }

  deleteInvoice(id: string): void {
    const invoices = this.getInvoices().filter(inv => inv.id !== id);
    this.saveInvoices(invoices);
  }

  getQuotations(): Quotation[] {
    return this.getItem('quotations', INITIAL_QUOTATIONS);
  }

  saveQuotations(quotations: Quotation[]): void {
    this.setItem('quotations', quotations);
  }

  addQuotation(qt: Omit<Quotation, 'id' | 'quotationNo'>): Quotation {
    const list = this.getQuotations();
    const newNo = `QT-2026-${String(list.length + 1).padStart(3, '0')}`;
    const item: Quotation = { ...qt, id: `qt-${Date.now()}`, quotationNo: newNo };
    list.unshift(item);
    this.saveQuotations(list);
    return item;
  }

  convertQuotationToInvoice(qtId: string): Invoice | null {
    const quotations = this.getQuotations();
    const qt = quotations.find(q => q.id === qtId);
    if (!qt) return null;

    const invoice = this.addInvoice({
      date: new Date().toISOString().split('T')[0],
      dueDate: new Date(Date.now() + 30 * 86400000).toISOString().split('T')[0],
      customerId: qt.customerId,
      customerName: qt.customerName,
      items: qt.items,
      subtotal: qt.subtotal,
      vatRate: qt.vatRate,
      vatAmount: qt.vatAmount,
      withholdingTaxRate: 0,
      withholdingTaxAmount: 0,
      grandTotal: qt.grandTotal,
      totalCost: qt.items.reduce((sum, item) => sum + (item.costPrice * item.quantity), 0),
      profit: qt.items.reduce((sum, item) => sum + item.profit, 0),
      status: 'confirmed',
      taxYear: 2026,
      notes: `แปลงจากใบเสนอราคา ${qt.quotationNo}`,
    });

    this.saveQuotations(quotations.map(q => q.id === qtId ? { ...q, status: 'converted' } : q));
    return invoice;
  }

  getExpenses(): Expense[] {
    return this.getItem('expenses', INITIAL_EXPENSES);
  }

  saveExpenses(expenses: Expense[]): void {
    this.setItem('expenses', expenses);
  }

  addExpense(exp: Omit<Expense, 'id'>): Expense {
    const list = this.getExpenses();
    const newExp: Expense = { ...exp, id: `exp-${Date.now()}` };
    list.unshift(newExp);
    this.saveExpenses(list);
    return newExp;
  }

  getRole(): UserRole {
    return this.getItem('role', 'superadmin');
  }

  setRole(role: UserRole): void {
    this.setItem('role', role);
  }

  resetAll(): void {
    if (!this.isBrowser) return;
    localStorage.removeItem('ninja_products');
    localStorage.removeItem('ninja_customers');
    localStorage.removeItem('ninja_invoices');
    localStorage.removeItem('ninja_quotations');
    localStorage.removeItem('ninja_expenses');
    localStorage.removeItem('ninja_role');
  }
}

export const mockStore = new NinjaStore();
