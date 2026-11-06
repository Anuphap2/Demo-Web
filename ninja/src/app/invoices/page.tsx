'use client';

import { useState, useEffect } from 'react';
import { mockStore } from '@/lib/mockStore';
import { Invoice, Product, Customer, InvoiceItem } from '@/types';
import { 
  Receipt, 
  Plus, 
  Search, 
  Printer, 
  CheckCircle2, 
  Clock, 
  AlertTriangle, 
  Trash2, 
  ArrowLeft,
  X,
  Building,
  QrCode
} from 'lucide-react';
import Link from 'next/link';

export default function InvoicesPage() {
  const [invoices, setInvoices] = useState<Invoice[]>([]);
  const [products, setProducts] = useState<Product[]>([]);
  const [customers, setCustomers] = useState<Customer[]>([]);
  const [search, setSearch] = useState('');
  const [filterStatus, setFilterStatus] = useState<string>('all');
  
  // Modals
  const [isCreateOpen, setIsCreateOpen] = useState(false);
  const [viewInvoice, setViewInvoice] = useState<Invoice | null>(null);

  // New Invoice Form state
  const [customerId, setCustomerId] = useState('');
  const [date, setDate] = useState(new Date().toISOString().split('T')[0]);
  const [dueDate, setDueDate] = useState(new Date(Date.now() + 30 * 86400000).toISOString().split('T')[0]);
  const [items, setItems] = useState<InvoiceItem[]>([]);
  const [vatRate, setVatRate] = useState<number>(7);
  const [withholdingTaxRate, setWithholdingTaxRate] = useState<number>(0);
  const [notes, setNotes] = useState('');

  useEffect(() => {
    refreshData();
  }, []);

  const refreshData = () => {
    setInvoices(mockStore.getInvoices());
    setProducts(mockStore.getProducts());
    const custs = mockStore.getCustomers();
    setCustomers(custs);
    if (custs.length > 0 && !customerId) {
      setCustomerId(custs[0].id);
    }
  };

  const addItem = (productId: string) => {
    const prod = products.find(p => p.id === productId);
    if (!prod) return;
    const existing = items.find(i => i.productId === productId);
    if (existing) {
      setItems(items.map(i => i.productId === productId ? {
        ...i,
        quantity: i.quantity + 1,
        total: (i.quantity + 1) * i.sellPrice - i.discount,
        profit: (i.quantity + 1) * (i.sellPrice - i.costPrice) - i.discount,
      } : i));
    } else {
      setItems([...items, {
        productId: prod.id,
        productName: prod.name,
        quantity: 1,
        costPrice: prod.costPrice,
        sellPrice: prod.sellPrice,
        discount: 0,
        total: prod.sellPrice,
        profit: prod.sellPrice - prod.costPrice,
      }]);
    }
  };

  const updateItemQty = (index: number, qty: number) => {
    const next = [...items];
    const item = next[index];
    item.quantity = Math.max(1, qty);
    item.total = item.quantity * item.sellPrice - item.discount;
    item.profit = item.quantity * (item.sellPrice - item.costPrice) - item.discount;
    setItems(next);
  };

  const removeItem = (index: number) => {
    setItems(items.filter((_, i) => i !== index));
  };

  const subtotal = items.reduce((sum, i) => sum + i.total, 0);
  const totalCost = items.reduce((sum, i) => sum + (i.costPrice * i.quantity), 0);
  const vatAmount = vatRate > 0 ? (subtotal * vatRate) / 100 : 0;
  const withholdingTaxAmount = withholdingTaxRate > 0 ? (subtotal * withholdingTaxRate) / 100 : 0;
  const grandTotal = subtotal + vatAmount - withholdingTaxAmount;
  const netProfit = subtotal - totalCost;

  const handleCreateInvoice = (e: React.FormEvent) => {
    e.preventDefault();
    if (items.length === 0) {
      alert('กรุณาเลือกรายการสินค้าอย่างน้อย 1 รายการ');
      return;
    }
    const customer = customers.find(c => c.id === customerId);
    if (!customer) return;

    mockStore.addInvoice({
      date,
      dueDate,
      customerId,
      customerName: customer.name,
      items,
      subtotal,
      vatRate,
      vatAmount,
      withholdingTaxRate,
      withholdingTaxAmount,
      grandTotal,
      totalCost,
      profit: netProfit,
      status: 'confirmed',
      taxYear: new Date(date).getFullYear(),
      notes,
    });

    setIsCreateOpen(false);
    setItems([]);
    setNotes('');
    refreshData();
  };

  const handleDelete = (id: string) => {
    if (confirm('ยืนยันลบบิลนี้หรือไม่?')) {
      mockStore.deleteInvoice(id);
      refreshData();
    }
  };

  const handleUpdateStatus = (id: string, status: Invoice['status']) => {
    mockStore.updateInvoice(id, { status });
    refreshData();
  };

  const filteredInvoices = invoices.filter(inv => {
    const matchesSearch = inv.invoiceNo.toLowerCase().includes(search.toLowerCase()) || 
                          inv.customerName.toLowerCase().includes(search.toLowerCase());
    const matchesStatus = filterStatus === 'all' || inv.status === filterStatus;
    return matchesSearch && matchesStatus;
  });

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <Link href="/" className="text-zinc-400 hover:text-white transition-colors">
              <ArrowLeft className="w-4 h-4" />
            </Link>
            <h1 className="text-2xl font-black text-white tracking-tight flex items-center gap-2">
              <Receipt className="w-6 h-6 text-amber-400" />
              <span>ระบบออกบิลงาน & ใบแจ้งหนี้ (Job Invoicing)</span>
            </h1>
          </div>
          <p className="text-xs text-zinc-400 mt-1">
            สร้าง จัดการ และออกเอกสารบิลงาน ใบแจ้งหนี้ ใบเสร็จรับเงิน พร้อมคำนวณภาษี VAT 7%
          </p>
        </div>

        <button
          onClick={() => setIsCreateOpen(true)}
          className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-amber-400 text-zinc-950 text-xs font-bold hover:bg-amber-300 transition-all shadow-md self-start sm:self-auto"
        >
          <Plus className="w-4 h-4" />
          <span>สร้างบิลใหม่ (Create Job)</span>
        </button>
      </div>

      {/* Filter and Search Bar */}
      <div className="p-4 rounded-xl bg-zinc-900/80 border border-zinc-800 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div className="relative flex-1 max-w-md">
          <Search className="w-4 h-4 text-zinc-500 absolute left-3 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            placeholder="ค้นหาตามเลขที่บิล หรือชื่อลูกค้า..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full pl-9 pr-4 py-2 bg-zinc-950 border border-zinc-800 rounded-lg text-xs text-zinc-200 placeholder-zinc-500 focus:outline-none focus:border-amber-400"
          />
        </div>

        <div className="flex items-center gap-1.5 overflow-x-auto text-xs">
          {[
            { id: 'all', label: 'ทั้งหมด' },
            { id: 'confirmed', label: 'รอบิล' },
            { id: 'invoiced', label: 'ออกบิลแล้ว' },
            { id: 'paid', label: 'ชำระแล้ว' },
            { id: 'pending', label: 'รอชำระ' },
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setFilterStatus(tab.id)}
              className={`px-3 py-1.5 rounded-lg whitespace-nowrap font-medium transition-colors ${
                filterStatus === tab.id
                  ? 'bg-amber-400 text-zinc-950 font-bold'
                  : 'text-zinc-400 hover:text-white hover:bg-zinc-800'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>
      </div>

      {/* Invoices List */}
      <div className="rounded-xl bg-zinc-900/80 border border-zinc-800 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-zinc-950/70 text-zinc-400 uppercase text-[10px] tracking-wider border-b border-zinc-800">
              <tr>
                <th className="py-3.5 px-4">เลขที่บิล</th>
                <th className="py-3.5 px-4">วันที่ / กำหนดชำระ</th>
                <th className="py-3.5 px-4">ลูกค้า</th>
                <th className="py-3.5 px-4 text-center">รายการ</th>
                <th className="py-3.5 px-4 text-right">ยอดรวม (Grand Total)</th>
                <th className="py-3.5 px-4 text-right">กำไรสุทธิ</th>
                <th className="py-3.5 px-4 text-center">สถานะ</th>
                <th className="py-3.5 px-4 text-right">การจัดการ</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-zinc-800/60">
              {filteredInvoices.map((inv) => (
                <tr key={inv.id} className="hover:bg-zinc-800/40 transition-colors">
                  <td className="py-3.5 px-4 font-mono font-bold text-amber-400">
                    {inv.invoiceNo}
                  </td>
                  <td className="py-3.5 px-4 text-zinc-400">
                    <div>{inv.date}</div>
                    <div className="text-[10px] text-zinc-500">ครบกำหนด: {inv.dueDate}</div>
                  </td>
                  <td className="py-3.5 px-4">
                    <div className="font-semibold text-zinc-200">{inv.customerName}</div>
                    {inv.paymentMethod && (
                      <div className="text-[10px] text-zinc-500">{inv.paymentMethod}</div>
                    )}
                  </td>
                  <td className="py-3.5 px-4 text-center text-zinc-400">
                    {inv.items.length} รายการ
                  </td>
                  <td className="py-3.5 px-4 text-right font-mono font-bold text-white text-sm">
                    ฿{inv.grandTotal.toLocaleString()}
                  </td>
                  <td className="py-3.5 px-4 text-right font-mono text-emerald-400 font-semibold">
                    ฿{inv.profit.toLocaleString()}
                  </td>
                  <td className="py-3.5 px-4 text-center">
                    <select
                      value={inv.status}
                      onChange={(e) => handleUpdateStatus(inv.id, e.target.value as Invoice['status'])}
                      className={`text-[11px] font-bold px-2.5 py-1 rounded-full border bg-zinc-950 cursor-pointer focus:outline-none ${
                        inv.status === 'paid'
                          ? 'text-emerald-400 border-emerald-500/40'
                          : inv.status === 'invoiced'
                          ? 'text-blue-400 border-blue-500/40'
                          : inv.status === 'confirmed'
                          ? 'text-amber-400 border-amber-500/40'
                          : 'text-orange-400 border-orange-500/40'
                      }`}
                    >
                      <option value="pending">รอชำระ</option>
                      <option value="confirmed">ยืนยันแล้ว</option>
                      <option value="invoiced">ออกใบกำกับ</option>
                      <option value="paid">ชำระแล้ว</option>
                    </select>
                  </td>
                  <td className="py-3.5 px-4 text-right">
                    <div className="flex items-center justify-end gap-2">
                      <button
                        onClick={() => setViewInvoice(inv)}
                        className="px-2.5 py-1 rounded bg-zinc-800 hover:bg-zinc-700 text-zinc-200 font-semibold text-[11px] flex items-center gap-1 transition-colors"
                      >
                        <Printer className="w-3 h-3 text-amber-400" />
                        <span>พิมพ์บิล</span>
                      </button>
                      <button
                        onClick={() => handleDelete(inv.id)}
                        className="p-1 rounded text-zinc-500 hover:text-rose-400 hover:bg-zinc-800 transition-colors"
                        title="ลบบิล"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
              {filteredInvoices.length === 0 && (
                <tr>
                  <td colSpan={8} className="py-10 text-center text-zinc-500">
                    ไม่พบรายการบิลที่ค้นหา
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Create Invoice Modal */}
      {isCreateOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm">
          <div className="bg-zinc-900 border border-zinc-700 rounded-2xl w-full max-w-3xl max-h-[90vh] overflow-y-auto p-6 space-y-5 text-xs text-zinc-200 shadow-2xl">
            <div className="flex items-center justify-between border-b border-zinc-800 pb-3">
              <h2 className="text-base font-bold text-white flex items-center gap-2">
                <Receipt className="w-5 h-5 text-amber-400" />
                <span>สร้างบิลงานใหม่ (New Job Invoice)</span>
              </h2>
              <button onClick={() => setIsCreateOpen(false)} className="text-zinc-400 hover:text-white">
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleCreateInvoice} className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                <div>
                  <label className="block text-zinc-400 font-medium mb-1">เลือกลูกค้า (Customer)</label>
                  <select
                    value={customerId}
                    onChange={(e) => setCustomerId(e.target.value)}
                    className="w-full bg-zinc-950 border border-zinc-800 rounded-lg p-2 text-zinc-200 focus:outline-none focus:border-amber-400"
                    required
                  >
                    {customers.map(c => (
                      <option key={c.id} value={c.id}>{c.name}</option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="block text-zinc-400 font-medium mb-1">วันที่ออกบิล</label>
                  <input
                    type="date"
                    value={date}
                    onChange={(e) => setDate(e.target.value)}
                    className="w-full bg-zinc-950 border border-zinc-800 rounded-lg p-2 text-zinc-200 focus:outline-none focus:border-amber-400"
                    required
                  />
                </div>
                <div>
                  <label className="block text-zinc-400 font-medium mb-1">กำหนดชำระเงิน (Due Date)</label>
                  <input
                    type="date"
                    value={dueDate}
                    onChange={(e) => setDueDate(e.target.value)}
                    className="w-full bg-zinc-950 border border-zinc-800 rounded-lg p-2 text-zinc-200 focus:outline-none focus:border-amber-400"
                    required
                  />
                </div>
              </div>

              {/* Product Picker */}
              <div className="p-3 rounded-lg bg-zinc-950 border border-zinc-800 space-y-2">
                <label className="block text-amber-400 font-bold">เลือกสินค้าหรือบริการลงบิล</label>
                <div className="flex flex-wrap gap-1.5">
                  {products.map(p => (
                    <button
                      type="button"
                      key={p.id}
                      onClick={() => addItem(p.id)}
                      className="px-2.5 py-1.5 rounded-lg bg-zinc-800 hover:bg-zinc-700 text-zinc-300 hover:text-white border border-zinc-700 text-[11px] font-medium transition-colors"
                    >
                      + {p.name} (฿{p.sellPrice.toLocaleString()})
                    </button>
                  ))}
                </div>
              </div>

              {/* Selected Items Table */}
              <div className="border border-zinc-800 rounded-lg overflow-hidden">
                <table className="w-full text-left text-xs">
                  <thead className="bg-zinc-950 text-zinc-400 uppercase text-[10px]">
                    <tr>
                      <th className="p-2.5">รายการ</th>
                      <th className="p-2.5 text-center">จำนวน</th>
                      <th className="p-2.5 text-right">ราคา/หน่วย</th>
                      <th className="p-2.5 text-right">รวม</th>
                      <th className="p-2.5 text-center">ลบ</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-zinc-800">
                    {items.map((item, idx) => (
                      <tr key={idx} className="bg-zinc-900/50">
                        <td className="p-2.5 font-medium text-white">{item.productName}</td>
                        <td className="p-2.5 text-center">
                          <input
                            type="number"
                            min="1"
                            value={item.quantity}
                            onChange={(e) => updateItemQty(idx, parseInt(e.target.value) || 1)}
                            className="w-14 text-center bg-zinc-950 border border-zinc-700 rounded py-1 text-white"
                          />
                        </td>
                        <td className="p-2.5 text-right font-mono">฿{item.sellPrice.toLocaleString()}</td>
                        <td className="p-2.5 text-right font-mono font-bold text-amber-400">฿{item.total.toLocaleString()}</td>
                        <td className="p-2.5 text-center">
                          <button type="button" onClick={() => removeItem(idx)} className="text-zinc-500 hover:text-rose-400">
                            ✕
                          </button>
                        </td>
                      </tr>
                    ))}
                    {items.length === 0 && (
                      <tr>
                        <td colSpan={5} className="p-4 text-center text-zinc-500">
                          ยังไม่มีรายการสินค้า คลิกปุ่มด้านบนเพื่อเลือกสินค้า
                        </td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>

              {/* Tax & Total Summary */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 p-4 rounded-xl bg-zinc-950 border border-zinc-800">
                <div className="space-y-3">
                  <div>
                    <label className="block text-zinc-400 font-medium mb-1">ภาษีมูลค่าเพิ่ม (VAT)</label>
                    <div className="flex gap-2">
                      <button
                        type="button"
                        onClick={() => setVatRate(7)}
                        className={`flex-1 py-1.5 rounded text-xs font-semibold border ${vatRate === 7 ? 'bg-amber-400 text-zinc-950 border-amber-400' : 'bg-zinc-900 text-zinc-400 border-zinc-800'}`}
                      >
                        VAT 7%
                      </button>
                      <button
                        type="button"
                        onClick={() => setVatRate(0)}
                        className={`flex-1 py-1.5 rounded text-xs font-semibold border ${vatRate === 0 ? 'bg-amber-400 text-zinc-950 border-amber-400' : 'bg-zinc-900 text-zinc-400 border-zinc-800'}`}
                      >
                        ไม่มี VAT (0%)
                      </button>
                    </div>
                  </div>

                  <div>
                    <label className="block text-zinc-400 font-medium mb-1">ภาษีหัก ณ ที่จ่าย (Withholding Tax)</label>
                    <div className="flex gap-2">
                      {[0, 1, 3].map((r) => (
                        <button
                          key={r}
                          type="button"
                          onClick={() => setWithholdingTaxRate(r)}
                          className={`flex-1 py-1.5 rounded text-xs font-semibold border ${withholdingTaxRate === r ? 'bg-amber-400 text-zinc-950 border-amber-400' : 'bg-zinc-900 text-zinc-400 border-zinc-800'}`}
                        >
                          {r === 0 ? 'ไม่หัก' : `หัก ${r}%`}
                        </button>
                      ))}
                    </div>
                  </div>

                  <div>
                    <label className="block text-zinc-400 font-medium mb-1">หมายเหตุเอกสาร</label>
                    <input
                      type="text"
                      placeholder="เช่น เงื่อนไขการรับประกัน หรือรายละเอียดงาน"
                      value={notes}
                      onChange={(e) => setNotes(e.target.value)}
                      className="w-full bg-zinc-900 border border-zinc-800 rounded p-2 text-zinc-200 focus:outline-none"
                    />
                  </div>
                </div>

                <div className="space-y-2 text-xs flex flex-col justify-end">
                  <div className="flex justify-between text-zinc-400">
                    <span>ยอดรวมก่อนภาษี (Subtotal):</span>
                    <span className="font-mono">฿{subtotal.toLocaleString()}</span>
                  </div>
                  {vatRate > 0 && (
                    <div className="flex justify-between text-zinc-400">
                      <span>ภาษีมูลค่าเพิ่ม (VAT 7%):</span>
                      <span className="font-mono text-blue-400">+฿{vatAmount.toLocaleString()}</span>
                    </div>
                  )}
                  {withholdingTaxRate > 0 && (
                    <div className="flex justify-between text-zinc-400">
                      <span>หัก ณ ที่จ่าย ({withholdingTaxRate}%):</span>
                      <span className="font-mono text-orange-400">-฿{withholdingTaxAmount.toLocaleString()}</span>
                    </div>
                  )}
                  <div className="border-t border-zinc-800 pt-2 flex justify-between text-sm font-bold text-white">
                    <span>ยอดรวมสุทธิ (Grand Total):</span>
                    <span className="font-mono text-amber-400 text-base">฿{grandTotal.toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between text-xs text-emerald-400 font-medium">
                    <span>กำไรสุทธิโดยประมาณ:</span>
                    <span className="font-mono">฿{netProfit.toLocaleString()}</span>
                  </div>
                </div>
              </div>

              <div className="flex justify-end gap-2 pt-2">
                <button
                  type="button"
                  onClick={() => setIsCreateOpen(false)}
                  className="px-4 py-2 rounded-lg bg-zinc-800 text-zinc-300 hover:bg-zinc-700"
                >
                  ยกเลิก
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 rounded-lg bg-amber-400 text-zinc-950 font-bold hover:bg-amber-300 shadow-md"
                >
                  บันทึกและเปิดบิล
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Printable Invoice Modal */}
      {viewInvoice && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-sm">
          <div className="bg-white text-zinc-900 rounded-2xl w-full max-w-3xl max-h-[95vh] overflow-y-auto p-8 space-y-6 shadow-2xl relative">
            <div className="flex items-center justify-between no-print border-b pb-4">
              <span className="text-xs font-bold text-zinc-500 uppercase tracking-widest">
                พิมพ์บิลต้นฉบับ / สำเนาใบกำกับภาษี
              </span>
              <div className="flex items-center gap-2">
                <button
                  onClick={() => window.print()}
                  className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-amber-400 text-zinc-950 text-xs font-bold hover:bg-amber-300"
                >
                  <Printer className="w-3.5 h-3.5" />
                  <span>พิมพ์เอกสาร</span>
                </button>
                <button onClick={() => setViewInvoice(null)} className="p-1 text-zinc-500 hover:text-zinc-900">
                  <X className="w-5 h-5" />
                </button>
              </div>
            </div>

            {/* A4 Invoice Paper Layout */}
            <div className="space-y-6 text-xs leading-relaxed">
              <div className="flex justify-between items-start border-b pb-6">
                <div className="space-y-1">
                  <h2 className="text-xl font-black tracking-tight text-zinc-950">N!NJA IT ENTERPRISE</h2>
                  <p className="text-zinc-600 font-medium">บจก. นินจา ไอที ซิสเต็มส์ แอนด์ โซลูชั่นส์</p>
                  <p className="text-zinc-500">เลขประจำตัวผู้เสียภาษี: 0505566019921 (สำนักงานใหญ่)</p>
                  <p className="text-zinc-500">โทร: 053-998-812 · อีเมล: billing@ninjait.co.th</p>
                </div>
                <div className="text-right space-y-1">
                  <div className="inline-block px-3 py-1 bg-zinc-900 text-white font-extrabold text-sm rounded">
                    ใบแจ้งหนี้ / ใบกำกับภาษี
                  </div>
                  <p className="font-mono font-bold text-sm text-zinc-900 mt-2">{viewInvoice.invoiceNo}</p>
                  <p className="text-zinc-500">วันที่: {viewInvoice.date}</p>
                  <p className="text-zinc-500">ครบกำหนด: {viewInvoice.dueDate}</p>
                </div>
              </div>

              {/* Customer Info */}
              <div className="p-4 rounded-lg bg-zinc-50 border border-zinc-200">
                <span className="text-[10px] font-bold text-zinc-400 uppercase tracking-wider block mb-1">
                  ข้อมูลลูกค้า (Customer)
                </span>
                <p className="font-bold text-sm text-zinc-900">{viewInvoice.customerName}</p>
                <p className="text-zinc-600 mt-0.5">สถานะการชำระ: {viewInvoice.status === 'paid' ? 'ชำระเงินเรียบร้อยแล้ว' : 'รอดำเนินการชำระ'}</p>
              </div>

              {/* Table */}
              <table className="w-full text-left border-collapse border border-zinc-200 text-xs">
                <thead className="bg-zinc-100 text-zinc-700">
                  <tr>
                    <th className="p-2 border border-zinc-200">#</th>
                    <th className="p-2 border border-zinc-200">รายการสินค้า / บริการ</th>
                    <th className="p-2 text-center border border-zinc-200">จำนวน</th>
                    <th className="p-2 text-right border border-zinc-200">ราคา/หน่วย</th>
                    <th className="p-2 text-right border border-zinc-200">จำนวนเงิน (บาท)</th>
                  </tr>
                </thead>
                <tbody>
                  {viewInvoice.items.map((item, idx) => (
                    <tr key={idx}>
                      <td className="p-2 text-center border border-zinc-200">{idx + 1}</td>
                      <td className="p-2 border border-zinc-200 font-medium">{item.productName}</td>
                      <td className="p-2 text-center border border-zinc-200">{item.quantity}</td>
                      <td className="p-2 text-right border border-zinc-200 font-mono">฿{item.sellPrice.toLocaleString()}</td>
                      <td className="p-2 text-right border border-zinc-200 font-mono font-bold">฿{item.total.toLocaleString()}</td>
                    </tr>
                  ))}
                </tbody>
              </table>

              {/* Totals */}
              <div className="flex justify-end">
                <div className="w-64 space-y-1.5 text-xs">
                  <div className="flex justify-between text-zinc-600">
                    <span>ยอดรวมก่อนภาษี:</span>
                    <span className="font-mono">฿{viewInvoice.subtotal.toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between text-zinc-600">
                    <span>ภาษีมูลค่าเพิ่ม 7%:</span>
                    <span className="font-mono">฿{viewInvoice.vatAmount.toLocaleString()}</span>
                  </div>
                  {viewInvoice.withholdingTaxAmount > 0 && (
                    <div className="flex justify-between text-zinc-600">
                      <span>หัก ณ ที่จ่าย:</span>
                      <span className="font-mono text-orange-600">-฿{viewInvoice.withholdingTaxAmount.toLocaleString()}</span>
                    </div>
                  )}
                  <div className="border-t-2 border-zinc-900 pt-1 flex justify-between text-sm font-black text-zinc-950">
                    <span>จำนวนเงินรวมทั้งสิ้น:</span>
                    <span className="font-mono">฿{viewInvoice.grandTotal.toLocaleString()}</span>
                  </div>
                </div>
              </div>

              {/* Signatures */}
              <div className="pt-10 grid grid-cols-2 gap-12 text-center text-xs text-zinc-600">
                <div className="border-t border-zinc-300 pt-2">
                  <p>ผู้รับวางบิล / ผู้รับสินค้า</p>
                  <p className="text-[10px] text-zinc-400 mt-6">วันที่ ......./......./.......</p>
                </div>
                <div className="border-t border-zinc-300 pt-2">
                  <p>ผู้มีอำนาจลงนาม / บจก. นินจา ไอที</p>
                  <p className="text-[10px] text-zinc-400 mt-6">วันที่ ......./......./.......</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
