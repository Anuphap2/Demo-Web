'use client';

import { useState, useEffect } from 'react';
import { mockStore } from '@/lib/mockStore';
import { Quotation, Product, Customer } from '@/types';
import { FileSpreadsheet, Plus, CheckCircle2, ArrowRight, Printer, X, ArrowLeft } from 'lucide-react';
import Link from 'next/link';

export default function QuotationsPage() {
  const [quotations, setQuotations] = useState<Quotation[]>([]);
  const [products, setProducts] = useState<Product[]>([]);
  const [customers, setCustomers] = useState<Customer[]>([]);
  const [isCreateOpen, setIsCreateOpen] = useState(false);
  const [viewQuotation, setViewQuotation] = useState<Quotation | null>(null);

  // Form
  const [customerId, setCustomerId] = useState('');
  const [date, setDate] = useState(new Date().toISOString().split('T')[0]);
  const [validDays, setValidDays] = useState(30);
  const [selectedProducts, setSelectedProducts] = useState<{ productId: string; qty: number }[]>([]);
  const [notes, setNotes] = useState('');

  useEffect(() => {
    refresh();
  }, []);

  const refresh = () => {
    setQuotations(mockStore.getQuotations());
    setProducts(mockStore.getProducts());
    const custs = mockStore.getCustomers();
    setCustomers(custs);
    if (custs.length > 0 && !customerId) setCustomerId(custs[0].id);
  };

  const handleConvert = (id: string) => {
    if (confirm('ต้องการแปลงใบเสนอราคานี้เป็นบิลงานจริง (Active Job Invoice) หรือไม่?')) {
      const inv = mockStore.convertQuotationToInvoice(id);
      if (inv) {
        alert(`แปลงเป็นบิลสำเร็จ! เลขที่บิล: ${inv.invoiceNo}`);
        refresh();
      }
    }
  };

  const addProductToQt = (pId: string) => {
    const existing = selectedProducts.find(p => p.productId === pId);
    if (existing) {
      setSelectedProducts(selectedProducts.map(p => p.productId === pId ? { ...p, qty: p.qty + 1 } : p));
    } else {
      setSelectedProducts([...selectedProducts, { productId: pId, qty: 1 }]);
    }
  };

  const handleCreateQuotation = (e: React.FormEvent) => {
    e.preventDefault();
    if (selectedProducts.length === 0) {
      alert('กรุณาเลือกรายการสินค้าอย่างน้อย 1 รายการ');
      return;
    }
    const customer = customers.find(c => c.id === customerId);
    if (!customer) return;

    const items = selectedProducts.map(sp => {
      const prod = products.find(p => p.id === sp.productId)!;
      return {
        productId: prod.id,
        productName: prod.name,
        quantity: sp.qty,
        costPrice: prod.costPrice,
        sellPrice: prod.sellPrice,
        discount: 0,
        total: prod.sellPrice * sp.qty,
        profit: (prod.sellPrice - prod.costPrice) * sp.qty,
      };
    });

    const subtotal = items.reduce((sum, i) => sum + i.total, 0);
    const vatAmount = (subtotal * 7) / 100;
    const grandTotal = subtotal + vatAmount;

    mockStore.addQuotation({
      date,
      validDays,
      customerId,
      customerName: customer.name,
      items,
      subtotal,
      vatRate: 7,
      vatAmount,
      grandTotal,
      status: 'sent',
      notes,
    });

    setIsCreateOpen(false);
    setSelectedProducts([]);
    setNotes('');
    refresh();
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <Link href="/" className="text-zinc-400 hover:text-white transition-colors">
              <ArrowLeft className="w-4 h-4" />
            </Link>
            <h1 className="text-2xl font-black text-white tracking-tight flex items-center gap-2">
              <FileSpreadsheet className="w-6 h-6 text-amber-400" />
              <span>ระบบใบเสนอราคา (Quotations & Bidding)</span>
            </h1>
          </div>
          <p className="text-xs text-zinc-400 mt-1">
            ออกใบเสนอราคาเพื่อเสนอลูกค้า พร้อมระบบแปลงเป็นบิลงานจริง (Convert to Job Invoice) ใน 1 คลิก
          </p>
        </div>

        <button
          onClick={() => setIsCreateOpen(true)}
          className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-amber-400 text-zinc-950 text-xs font-bold hover:bg-amber-300 transition-all shadow-md self-start sm:self-auto"
        >
          <Plus className="w-4 h-4" />
          <span>สร้างใบเสนอราคาใหม่</span>
        </button>
      </div>

      {/* List */}
      <div className="rounded-xl bg-zinc-900/80 border border-zinc-800 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-zinc-950/70 text-zinc-400 uppercase text-[10px] tracking-wider border-b border-zinc-800">
              <tr>
                <th className="py-3.5 px-4">เลขที่ใบเสนอราคา</th>
                <th className="py-3.5 px-4">วันที่ / ยืนราคา</th>
                <th className="py-3.5 px-4">ลูกค้า</th>
                <th className="py-3.5 px-4 text-center">รายการ</th>
                <th className="py-3.5 px-4 text-right">ยอดรวม (VAT 7%)</th>
                <th className="py-3.5 px-4 text-center">สถานะ</th>
                <th className="py-3.5 px-4 text-right">การจัดการ</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-zinc-800/60">
              {quotations.map((qt) => (
                <tr key={qt.id} className="hover:bg-zinc-800/40 transition-colors">
                  <td className="py-3.5 px-4 font-mono font-bold text-amber-400">{qt.quotationNo}</td>
                  <td className="py-3.5 px-4 text-zinc-400">
                    <div>{qt.date}</div>
                    <div className="text-[10px] text-zinc-500">ยืนราคา {qt.validDays} วัน</div>
                  </td>
                  <td className="py-3.5 px-4 font-semibold text-zinc-200">{qt.customerName}</td>
                  <td className="py-3.5 px-4 text-center text-zinc-400">{qt.items.length} รายการ</td>
                  <td className="py-3.5 px-4 text-right font-mono font-bold text-white text-sm">
                    ฿{qt.grandTotal.toLocaleString()}
                  </td>
                  <td className="py-3.5 px-4 text-center">
                    <span className={`px-2.5 py-0.5 rounded-full text-xs font-semibold border ${
                      qt.status === 'approved'
                        ? 'bg-emerald-500/10 text-emerald-400 border-emerald-500/30'
                        : qt.status === 'converted'
                        ? 'bg-blue-500/10 text-blue-400 border-blue-500/30'
                        : 'bg-amber-500/10 text-amber-400 border-amber-500/30'
                    }`}>
                      {qt.status === 'approved' ? 'ลูกค้าอนุมัติแล้ว' : qt.status === 'converted' ? 'แปลงเป็นบิลแล้ว' : 'ส่งเสนอราคาแล้ว'}
                    </span>
                  </td>
                  <td className="py-3.5 px-4 text-right">
                    <div className="flex items-center justify-end gap-2">
                      <button
                        onClick={() => setViewQuotation(qt)}
                        className="px-2.5 py-1 rounded bg-zinc-800 hover:bg-zinc-700 text-zinc-200 font-semibold text-[11px] flex items-center gap-1"
                      >
                        <Printer className="w-3 h-3 text-amber-400" />
                        <span>พิมพ์</span>
                      </button>
                      {qt.status !== 'converted' && (
                        <button
                          onClick={() => handleConvert(qt.id)}
                          className="px-2.5 py-1 rounded bg-amber-400 text-zinc-950 font-bold text-[11px] flex items-center gap-1 hover:bg-amber-300"
                          title="แปลงเป็นบิลงานเพื่อเริ่มบันทึกยอดขาย"
                        >
                          <span>เปิดบิล</span>
                          <ArrowRight className="w-3 h-3" />
                        </button>
                      )}
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Create Modal */}
      {isCreateOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm">
          <div className="bg-zinc-900 border border-zinc-700 rounded-2xl w-full max-w-2xl max-h-[90vh] overflow-y-auto p-6 space-y-4 text-xs text-zinc-200 shadow-2xl">
            <div className="flex items-center justify-between border-b border-zinc-800 pb-3">
              <h2 className="text-base font-bold text-white flex items-center gap-2">
                <FileSpreadsheet className="w-5 h-5 text-amber-400" />
                <span>สร้างใบเสนอราคาใหม่ (New Quotation)</span>
              </h2>
              <button onClick={() => setIsCreateOpen(false)} className="text-zinc-400 hover:text-white">
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleCreateQuotation} className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                <div>
                  <label className="block text-zinc-400 mb-1">ลูกค้า</label>
                  <select
                    value={customerId}
                    onChange={(e) => setCustomerId(e.target.value)}
                    className="w-full bg-zinc-950 border border-zinc-800 rounded p-2 text-zinc-200"
                    required
                  >
                    {customers.map(c => (
                      <option key={c.id} value={c.id}>{c.name}</option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="block text-zinc-400 mb-1">วันที่ออก</label>
                  <input
                    type="date"
                    value={date}
                    onChange={(e) => setDate(e.target.value)}
                    className="w-full bg-zinc-950 border border-zinc-800 rounded p-2 text-zinc-200"
                    required
                  />
                </div>
                <div>
                  <label className="block text-zinc-400 mb-1">กำหนดยืนราคา (วัน)</label>
                  <input
                    type="number"
                    value={validDays}
                    onChange={(e) => setValidDays(Number(e.target.value))}
                    className="w-full bg-zinc-950 border border-zinc-800 rounded p-2 text-zinc-200"
                    required
                  />
                </div>
              </div>

              <div className="p-3 rounded-lg bg-zinc-950 border border-zinc-800 space-y-2">
                <label className="block text-amber-400 font-bold">เลือกรายการสินค้าเพื่อเสนอราคา</label>
                <div className="flex flex-wrap gap-1.5">
                  {products.map(p => (
                    <button
                      type="button"
                      key={p.id}
                      onClick={() => addProductToQt(p.id)}
                      className="px-2.5 py-1.5 rounded-lg bg-zinc-800 hover:bg-zinc-700 text-zinc-300 hover:text-white border border-zinc-700 text-[11px]"
                    >
                      + {p.name} (฿{p.sellPrice.toLocaleString()})
                    </button>
                  ))}
                </div>
              </div>

              {/* Items List */}
              <div className="border border-zinc-800 rounded-lg p-3 space-y-2 bg-zinc-950">
                {selectedProducts.map((sp, idx) => {
                  const prod = products.find(p => p.id === sp.productId)!;
                  return (
                    <div key={idx} className="flex items-center justify-between text-xs py-1 border-b border-zinc-800 last:border-0">
                      <span className="font-medium text-white">{prod.name}</span>
                      <div className="flex items-center gap-3">
                        <span className="text-zinc-400">จำนวน: {sp.qty} {prod.unit}</span>
                        <span className="font-mono text-amber-400 font-bold">฿{(prod.sellPrice * sp.qty).toLocaleString()}</span>
                      </div>
                    </div>
                  );
                })}
              </div>

              <div>
                <label className="block text-zinc-400 mb-1">เงื่อนไข / หมายเหตุ</label>
                <input
                  type="text"
                  placeholder="เช่น ราคาไม่รวมค่าเดินสาย, ระยะเวลาส่งมอบ 7 วันทำการ"
                  value={notes}
                  onChange={(e) => setNotes(e.target.value)}
                  className="w-full bg-zinc-950 border border-zinc-800 rounded p-2 text-zinc-200"
                />
              </div>

              <div className="flex justify-end gap-2 pt-2">
                <button
                  type="button"
                  onClick={() => setIsCreateOpen(false)}
                  className="px-4 py-2 rounded-lg bg-zinc-800 text-zinc-300"
                >
                  ยกเลิก
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 rounded-lg bg-amber-400 text-zinc-950 font-bold hover:bg-amber-300 shadow"
                >
                  บันทึกใบเสนอราคา
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* View Printable Modal */}
      {viewQuotation && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-sm">
          <div className="bg-white text-zinc-900 rounded-2xl w-full max-w-2xl max-h-[90vh] overflow-y-auto p-8 space-y-6 shadow-2xl">
            <div className="flex justify-between items-start border-b pb-4">
              <div>
                <h2 className="text-lg font-black text-zinc-950">N!NJA IT ENTERPRISE</h2>
                <p className="text-xs text-zinc-500">ใบเสนอราคา (Quotation)</p>
              </div>
              <div className="text-right">
                <span className="font-mono font-bold text-sm text-zinc-900">{viewQuotation.quotationNo}</span>
                <p className="text-xs text-zinc-500">วันที่: {viewQuotation.date}</p>
                <p className="text-xs text-zinc-500">ยืนราคา {viewQuotation.validDays} วัน</p>
              </div>
            </div>

            <div className="p-3 bg-zinc-50 rounded border text-xs">
              <span className="text-zinc-500 font-bold">ลูกค้า:</span> {viewQuotation.customerName}
            </div>

            <table className="w-full text-left text-xs border border-zinc-200">
              <thead className="bg-zinc-100">
                <tr>
                  <th className="p-2 border">รายการ</th>
                  <th className="p-2 text-center border">จำนวน</th>
                  <th className="p-2 text-right border">ราคา</th>
                  <th className="p-2 text-right border">รวม</th>
                </tr>
              </thead>
              <tbody>
                {viewQuotation.items.map((item, idx) => (
                  <tr key={idx}>
                    <td className="p-2 border">{item.productName}</td>
                    <td className="p-2 text-center border">{item.quantity}</td>
                    <td className="p-2 text-right border font-mono">฿{item.sellPrice.toLocaleString()}</td>
                    <td className="p-2 text-right border font-mono font-bold">฿{item.total.toLocaleString()}</td>
                  </tr>
                ))}
              </tbody>
            </table>

            <div className="text-right text-xs space-y-1">
              <p className="text-zinc-600">ยอดรวมก่อนภาษี: ฿{viewQuotation.subtotal.toLocaleString()}</p>
              <p className="text-zinc-600">ภาษีมูลค่าเพิ่ม 7%: ฿{viewQuotation.vatAmount.toLocaleString()}</p>
              <p className="text-base font-black text-zinc-950 border-t pt-1">
                ยอดรวมสุทธิ: ฿{viewQuotation.grandTotal.toLocaleString()}
              </p>
            </div>

            <div className="flex justify-end gap-2 pt-4 border-t">
              <button
                onClick={() => setViewQuotation(null)}
                className="px-4 py-2 bg-zinc-200 rounded text-xs font-semibold text-zinc-800"
              >
                ปิดหน้าต่าง
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
