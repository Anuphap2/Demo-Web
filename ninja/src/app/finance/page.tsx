'use client';

import { useState, useEffect } from 'react';
import { mockStore } from '@/lib/mockStore';
import { Expense } from '@/types';
import { Wallet, Plus, ArrowLeft, X, TrendingDown, DollarSign } from 'lucide-react';
import Link from 'next/link';

export default function FinancePage() {
  const [expenses, setExpenses] = useState<Expense[]>([]);
  const [isAddOpen, setIsAddOpen] = useState(false);

  // Form
  const [title, setTitle] = useState('');
  const [category, setCategory] = useState<Expense['category']>('ขนส่ง');
  const [amount, setAmount] = useState(0);
  const [paidTo, setPaidTo] = useState('');
  const [paymentMethod, setPaymentMethod] = useState('โอนเงิน');
  const [receiptNo, setReceiptNo] = useState('');
  const [notes, setNotes] = useState('');

  useEffect(() => {
    setExpenses(mockStore.getExpenses());
  }, []);

  const refresh = () => setExpenses(mockStore.getExpenses());

  const handleAddExpense = (e: React.FormEvent) => {
    e.preventDefault();
    mockStore.addExpense({
      date: new Date().toISOString().split('T')[0],
      title,
      category,
      amount,
      paidTo,
      paymentMethod,
      receiptNo: receiptNo || `REC-${Date.now().toString().slice(-5)}`,
      notes,
    });
    setIsAddOpen(false);
    setTitle('');
    setAmount(0);
    setPaidTo('');
    refresh();
  };

  const totalExpense = expenses.reduce((sum, e) => sum + e.amount, 0);

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <Link href="/" className="text-zinc-400 hover:text-white transition-colors">
              <ArrowLeft className="w-4 h-4" />
            </Link>
            <h1 className="text-2xl font-black text-white tracking-tight flex items-center gap-2">
              <Wallet className="w-6 h-6 text-amber-400" />
              <span>ระบบการเงิน & บันทึกรายจ่าย (Finance & Expenses)</span>
            </h1>
          </div>
          <p className="text-xs text-zinc-400 mt-1">
            บันทึกค่าใช้จ่ายดำเนินงาน ค่าขนส่ง ค่าอะไหล่ และสรุปกระแสเงินสดประจำองค์กร
          </p>
        </div>

        <button
          onClick={() => setIsAddOpen(true)}
          className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-amber-400 text-zinc-950 text-xs font-bold hover:bg-amber-300 transition-all shadow-md self-start sm:self-auto"
        >
          <Plus className="w-4 h-4" />
          <span>บันทึกรายจ่ายใหม่</span>
        </button>
      </div>

      {/* KPI */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="p-5 rounded-xl bg-zinc-900/80 border border-zinc-800">
          <span className="text-xs text-zinc-400 font-medium">ค่าใช้จ่ายรวมเดือนนี้</span>
          <div className="mt-2 text-2xl font-black text-rose-400 font-mono">
            ฿{totalExpense.toLocaleString()}
          </div>
          <p className="text-[11px] text-zinc-500 mt-1">{expenses.length} รายการที่บันทึก</p>
        </div>
      </div>

      {/* Expenses Table */}
      <div className="rounded-xl bg-zinc-900/80 border border-zinc-800 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-zinc-950/70 text-zinc-400 uppercase text-[10px] tracking-wider border-b border-zinc-800">
              <tr>
                <th className="py-3.5 px-4">วันที่</th>
                <th className="py-3.5 px-4">เลขที่ใบเสร็จ</th>
                <th className="py-3.5 px-4">รายการรายจ่าย</th>
                <th className="py-3.5 px-4">หมวดหมู่</th>
                <th className="py-3.5 px-4">จ่ายให้</th>
                <th className="py-3.5 px-4">ช่องทาง</th>
                <th className="py-3.5 px-4 text-right">จำนวนเงิน (บาท)</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-zinc-800/60 font-medium">
              {expenses.map((exp) => (
                <tr key={exp.id} className="hover:bg-zinc-800/40">
                  <td className="py-3.5 px-4 text-zinc-400">{exp.date}</td>
                  <td className="py-3.5 px-4 font-mono font-bold text-amber-400">{exp.receiptNo}</td>
                  <td className="py-3.5 px-4 font-semibold text-zinc-200">{exp.title}</td>
                  <td className="py-3.5 px-4">
                    <span className="px-2 py-0.5 rounded bg-zinc-800 text-zinc-300 text-[11px]">
                      {exp.category}
                    </span>
                  </td>
                  <td className="py-3.5 px-4 text-zinc-300">{exp.paidTo}</td>
                  <td className="py-3.5 px-4 text-zinc-400">{exp.paymentMethod}</td>
                  <td className="py-3.5 px-4 text-right font-mono font-bold text-rose-400">
                    ฿{exp.amount.toLocaleString()}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Add Modal */}
      {isAddOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm">
          <div className="bg-zinc-900 border border-zinc-700 rounded-2xl w-full max-w-md p-6 space-y-4 text-xs text-zinc-200 shadow-2xl">
            <div className="flex items-center justify-between border-b border-zinc-800 pb-3">
              <h2 className="text-base font-bold text-white flex items-center gap-2">
                <Wallet className="w-5 h-5 text-amber-400" />
                <span>บันทึกรายจ่ายใหม่ (New Expense)</span>
              </h2>
              <button onClick={() => setIsAddOpen(false)} className="text-zinc-400 hover:text-white">
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleAddExpense} className="space-y-3">
              <div>
                <label className="block text-zinc-400 mb-1">รายการรายจ่าย</label>
                <input
                  type="text"
                  required
                  placeholder="เช่น ค่าจัดส่งพัสดุ Flash Express"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  className="w-full bg-zinc-950 border border-zinc-800 rounded p-2 text-zinc-200"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-zinc-400 mb-1">หมวดหมู่</label>
                  <select
                    value={category}
                    onChange={(e) => setCategory(e.target.value as Expense['category'])}
                    className="w-full bg-zinc-950 border border-zinc-800 rounded p-2 text-zinc-200"
                  >
                    <option value="ขนส่ง">ขนส่ง</option>
                    <option value="ภาษี">ภาษี</option>
                    <option value="วัสดุอุปกรณ์">วัสดุอุปกรณ์</option>
                    <option value="สาธารณูปโภค">สาธารณูปโภค</option>
                    <option value="เงินเดือน">เงินเดือน</option>
                    <option value="อื่นๆ">อื่นๆ</option>
                  </select>
                </div>
                <div>
                  <label className="block text-zinc-400 mb-1">จำนวนเงิน (บาท)</label>
                  <input
                    type="number"
                    required
                    value={amount}
                    onChange={(e) => setAmount(Number(e.target.value))}
                    className="w-full bg-zinc-950 border border-zinc-800 rounded p-2 text-zinc-200 font-mono"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-zinc-400 mb-1">จ่ายให้ใคร (Payee)</label>
                  <input
                    type="text"
                    required
                    placeholder="เช่น Flash Express"
                    value={paidTo}
                    onChange={(e) => setPaidTo(e.target.value)}
                    className="w-full bg-zinc-950 border border-zinc-800 rounded p-2 text-zinc-200"
                  />
                </div>
                <div>
                  <label className="block text-zinc-400 mb-1">ช่องทางชำระ</label>
                  <input
                    type="text"
                    value={paymentMethod}
                    onChange={(e) => setPaymentMethod(e.target.value)}
                    className="w-full bg-zinc-950 border border-zinc-800 rounded p-2 text-zinc-200"
                  />
                </div>
              </div>

              <div>
                <label className="block text-zinc-400 mb-1">เลขที่ใบเสร็จรับเงิน (ถ้ามี)</label>
                <input
                  type="text"
                  placeholder="เช่น REC-12345"
                  value={receiptNo}
                  onChange={(e) => setReceiptNo(e.target.value)}
                  className="w-full bg-zinc-950 border border-zinc-800 rounded p-2 text-zinc-200"
                />
              </div>

              <div className="flex justify-end gap-2 pt-3">
                <button
                  type="button"
                  onClick={() => setIsAddOpen(false)}
                  className="px-4 py-2 bg-zinc-800 rounded text-zinc-300"
                >
                  ยกเลิก
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 bg-amber-400 rounded text-zinc-950 font-bold hover:bg-amber-300"
                >
                  บันทึก
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
