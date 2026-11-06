'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { mockStore } from '@/lib/mockStore';
import { Invoice, Product, Expense } from '@/types';
import { 
  TrendingUp, 
  DollarSign, 
  CreditCard, 
  Wallet, 
  Boxes, 
  Receipt, 
  AlertTriangle, 
  ArrowUpRight, 
  CheckCircle2, 
  Clock, 
  Calendar, 
  PlusCircle,
  FileSpreadsheet
} from 'lucide-react';

export default function DashboardPage() {
  const [invoices, setInvoices] = useState<Invoice[]>([]);
  const [products, setProducts] = useState<Product[]>([]);
  const [expenses, setExpenses] = useState<Expense[]>([]);
  const [selectedYear, setSelectedYear] = useState<number>(2026);

  useEffect(() => {
    setInvoices(mockStore.getInvoices());
    setProducts(mockStore.getProducts());
    setExpenses(mockStore.getExpenses());
  }, []);

  // Financial calculations
  const totalRevenue = invoices.reduce((sum, inv) => sum + inv.grandTotal, 0);
  const totalProfit = invoices.reduce((sum, inv) => sum + inv.profit, 0);
  const totalVat = invoices.reduce((sum, inv) => sum + inv.vatAmount, 0);
  const totalExpenses = expenses.reduce((sum, exp) => sum + exp.amount, 0);
  const pendingInvoices = invoices.filter(inv => inv.status === 'pending' || inv.status === 'confirmed');
  const outstandingAmount = pendingInvoices.reduce((sum, inv) => sum + inv.grandTotal, 0);
  const lowStockProducts = products.filter(p => p.stockQty <= p.minQty);

  // Status counts
  const countPaid = invoices.filter(i => i.status === 'paid').length;
  const countInvoiced = invoices.filter(i => i.status === 'invoiced').length;
  const countConfirmed = invoices.filter(i => i.status === 'confirmed').length;
  const countPending = invoices.filter(i => i.status === 'pending').length;

  // Monthly dummy distribution for chart
  const months = ['ม.ค.', 'ก.พ.', 'มี.ค.', 'เม.ย.', 'พ.ค.', 'มิ.ย.', 'ก.ค.', 'ส.ค.', 'ก.ย.', 'ต.ค.', 'พ.ย.', 'ธ.ค.'];
  const monthlyData = [45000, 68000, 305154, 0, 0, 0, 0, 0, 0, 0, 0, 0];

  const getStatusBadge = (status: Invoice['status']) => {
    switch (status) {
      case 'paid':
        return <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-semibold bg-emerald-500/10 text-emerald-400 border border-emerald-500/30"><CheckCircle2 className="w-3 h-3" /> ชำระแล้ว</span>;
      case 'invoiced':
        return <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-semibold bg-blue-500/10 text-blue-400 border border-blue-500/30"><Receipt className="w-3 h-3" /> ออกใบกำกับภาษี</span>;
      case 'confirmed':
        return <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-semibold bg-amber-500/10 text-amber-400 border border-amber-500/30"><Clock className="w-3 h-3" /> ยืนยันแล้ว/รอบิล</span>;
      case 'pending':
        return <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-semibold bg-orange-500/10 text-orange-400 border border-orange-500/30"><AlertTriangle className="w-3 h-3" /> รอชำระเงิน</span>;
      default:
        return <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-semibold bg-zinc-700 text-zinc-300">ร่างบิล</span>;
    }
  };

  return (
    <div className="space-y-6">
      {/* Top Banner / Hero */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-6 rounded-2xl bg-gradient-to-r from-zinc-900 via-zinc-900/90 to-zinc-950 border border-zinc-800 shadow-xl">
        <div>
          <div className="flex items-center gap-2 mb-1.5">
            <span className="px-2 py-0.5 rounded text-[11px] font-bold bg-amber-400 text-zinc-950 uppercase tracking-wider">
              N!NJA IT System
            </span>
            <span className="text-xs text-zinc-400 flex items-center gap-1">
              <Calendar className="w-3.5 h-3.5" /> ประจำปีงบประมาณ {selectedYear + 543} (ค.ศ. {selectedYear})
            </span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
            ภาพรวมการเงินและยอดขาย (Financial Dashboard)
          </h1>
          <p className="text-sm text-zinc-400 mt-1 max-w-2xl">
            ระบบบริหารงานออกบิล ใบเสนอราคา และบัญชีลูกหนี้ ติดตามรายได้ กำไรสุทธิ และภาษีมูลค่าเพิ่มแบบเรียลไทม์
          </p>
        </div>

        {/* Year Selector & Quick CTA */}
        <div className="flex items-center gap-2.5 self-start sm:self-auto">
          <select 
            value={selectedYear} 
            onChange={(e) => setSelectedYear(Number(e.target.value))}
            className="bg-zinc-800 text-zinc-200 border border-zinc-700 rounded-lg px-3 py-2 text-xs font-semibold focus:outline-none focus:border-amber-400"
          >
            <option value={2026}>ปี 2569 (2026)</option>
            <option value={2025}>ปี 2568 (2025)</option>
            <option value={2024}>ปี 2567 (2024)</option>
          </select>

          <Link
            href="/invoices"
            className="flex items-center gap-1.5 px-4 py-2 rounded-lg bg-amber-400 text-zinc-950 text-xs font-bold hover:bg-amber-300 transition-colors shadow-sm"
          >
            <PlusCircle className="w-4 h-4" />
            <span>ออกบิลใหม่</span>
          </Link>
        </div>
      </div>

      {/* KPI Stats Cards Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Total Invoiced Sales */}
        <div className="p-5 rounded-xl bg-zinc-900/80 border border-zinc-800 relative overflow-hidden group hover:border-zinc-700 transition-colors">
          <div className="flex items-center justify-between text-zinc-400 text-xs font-medium">
            <span>ยอดขายรวมสุทธิ (Grand Total)</span>
            <div className="p-2 rounded-lg bg-amber-400/10 text-amber-400">
              <DollarSign className="w-4 h-4" />
            </div>
          </div>
          <div className="mt-3">
            <span className="text-2xl font-black text-white tracking-tight">
              ฿{totalRevenue.toLocaleString()}
            </span>
            <div className="flex items-center gap-1 mt-1 text-xs text-emerald-400 font-medium">
              <TrendingUp className="w-3.5 h-3.5" />
              <span>จากบิลทั้งหมด {invoices.length} รายการ</span>
            </div>
          </div>
        </div>

        {/* Total Gross Margin */}
        <div className="p-5 rounded-xl bg-zinc-900/80 border border-zinc-800 relative overflow-hidden group hover:border-zinc-700 transition-colors">
          <div className="flex items-center justify-between text-zinc-400 text-xs font-medium">
            <span>กำไรขั้นต้น (Gross Profit)</span>
            <div className="p-2 rounded-lg bg-emerald-500/10 text-emerald-400">
              <TrendingUp className="w-4 h-4" />
            </div>
          </div>
          <div className="mt-3">
            <span className="text-2xl font-black text-emerald-400 tracking-tight">
              ฿{totalProfit.toLocaleString()}
            </span>
            <div className="flex items-center gap-1 mt-1 text-xs text-zinc-400">
              <span>อัตรากำไรเฉลี่ย: </span>
              <span className="text-emerald-400 font-bold">
                {totalRevenue > 0 ? ((totalProfit / totalRevenue) * 100).toFixed(1) : 0}%
              </span>
            </div>
          </div>
        </div>

        {/* Tax & VAT */}
        <div className="p-5 rounded-xl bg-zinc-900/80 border border-zinc-800 relative overflow-hidden group hover:border-zinc-700 transition-colors">
          <div className="flex items-center justify-between text-zinc-400 text-xs font-medium">
            <span>ภาษีมูลค่าเพิ่ม (VAT 7%)</span>
            <div className="p-2 rounded-lg bg-blue-500/10 text-blue-400">
              <Receipt className="w-4 h-4" />
            </div>
          </div>
          <div className="mt-3">
            <span className="text-2xl font-black text-blue-400 tracking-tight">
              ฿{totalVat.toLocaleString()}
            </span>
            <div className="flex items-center gap-1 mt-1 text-xs text-zinc-400">
              <span>ยอดนำส่ง ภ.พ. 30</span>
            </div>
          </div>
        </div>

        {/* Outstanding Receivables */}
        <div className="p-5 rounded-xl bg-zinc-900/80 border border-zinc-800 relative overflow-hidden group hover:border-zinc-700 transition-colors">
          <div className="flex items-center justify-between text-zinc-400 text-xs font-medium">
            <span>ลูกหนี้คงค้าง (Receivables)</span>
            <div className="p-2 rounded-lg bg-orange-500/10 text-orange-400">
              <CreditCard className="w-4 h-4" />
            </div>
          </div>
          <div className="mt-3">
            <span className="text-2xl font-black text-orange-400 tracking-tight">
              ฿{outstandingAmount.toLocaleString()}
            </span>
            <div className="flex items-center gap-1 mt-1 text-xs text-zinc-400">
              <span>ค้างชำระ {pendingInvoices.length} บิล</span>
            </div>
          </div>
        </div>
      </div>

      {/* Grid: Revenue Chart & Quick Summary */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Monthly Revenue Chart */}
        <div className="lg:col-span-2 p-5 rounded-xl bg-zinc-900/80 border border-zinc-800 space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-base font-bold text-white flex items-center gap-2">
                <TrendingUp className="w-4 h-4 text-amber-400" />
                <span>การเติบโตยอดขายรายเดือน (Monthly Revenue)</span>
              </h2>
              <p className="text-xs text-zinc-400 mt-0.5">กราฟแสดงยอดขายและแนวโน้มการเติบโตประจำปี {selectedYear}</p>
            </div>
            <span className="text-xs px-2.5 py-1 rounded bg-zinc-800 text-zinc-300 font-mono">
              ฿305,154 YTD
            </span>
          </div>

          {/* Bar Chart Visualization */}
          <div className="h-48 pt-6 flex items-end justify-between gap-2 border-b border-zinc-800 pb-2">
            {months.map((m, idx) => {
              const val = monthlyData[idx];
              const maxVal = 320000;
              const heightPct = val > 0 ? Math.max((val / maxVal) * 100, 12) : 4;
              return (
                <div key={m} className="flex-1 flex flex-col items-center gap-1 group relative">
                  {val > 0 && (
                    <div className="opacity-0 group-hover:opacity-100 absolute -top-8 bg-zinc-950 border border-zinc-700 text-amber-400 text-[10px] font-bold px-1.5 py-0.5 rounded transition-opacity pointer-events-none whitespace-nowrap z-10 shadow-lg">
                      ฿{val.toLocaleString()}
                    </div>
                  )}
                  <div 
                    className={`w-full rounded-t transition-all ${
                      val > 0 
                        ? 'bg-gradient-to-t from-amber-500 to-amber-300 group-hover:brightness-125' 
                        : 'bg-zinc-800/40'
                    }`}
                    style={{ height: `${heightPct}%` }}
                  />
                  <span className="text-[10px] text-zinc-400 group-hover:text-zinc-200 mt-1 font-medium">{m}</span>
                </div>
              );
            })}
          </div>

          <div className="flex items-center justify-between text-xs text-zinc-400 pt-1">
            <div className="flex items-center gap-4">
              <span className="flex items-center gap-1.5">
                <span className="w-2.5 h-2.5 rounded-sm bg-amber-400" /> ยอดขายออกบิลจริง
              </span>
              <span className="flex items-center gap-1.5">
                <span className="w-2.5 h-2.5 rounded-sm bg-zinc-800" /> คาดการณ์
              </span>
            </div>
            <Link href="/tax" className="text-amber-400 hover:underline flex items-center gap-1 text-xs">
              <span>รายงานภาษีขาย</span>
              <ArrowUpRight className="w-3 h-3" />
            </Link>
          </div>
        </div>

        {/* Status Pipeline & Low Stock Alerts */}
        <div className="space-y-4">
          {/* Status Breakdown */}
          <div className="p-5 rounded-xl bg-zinc-900/80 border border-zinc-800 space-y-3">
            <h2 className="text-sm font-bold text-white flex items-center justify-between">
              <span>สถานะบิลงาน (Status Pipeline)</span>
              <span className="text-xs text-zinc-400">{invoices.length} รายการ</span>
            </h2>

            <div className="space-y-2 text-xs">
              <div className="flex items-center justify-between p-2 rounded-lg bg-zinc-800/40 border border-zinc-800">
                <span className="text-zinc-300 flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-emerald-400" /> ชำระเงินแล้ว
                </span>
                <span className="font-bold text-white">{countPaid} บิล</span>
              </div>
              <div className="flex items-center justify-between p-2 rounded-lg bg-zinc-800/40 border border-zinc-800">
                <span className="text-zinc-300 flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-blue-400" /> ออกใบกำกับภาษี
                </span>
                <span className="font-bold text-white">{countInvoiced} บิล</span>
              </div>
              <div className="flex items-center justify-between p-2 rounded-lg bg-zinc-800/40 border border-zinc-800">
                <span className="text-zinc-300 flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-amber-400" /> ยืนยันแล้ว / รอบิล
                </span>
                <span className="font-bold text-white">{countConfirmed} บิล</span>
              </div>
              <div className="flex items-center justify-between p-2 rounded-lg bg-zinc-800/40 border border-zinc-800">
                <span className="text-zinc-300 flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-orange-400" /> รอลูกค้าชำระเงิน
                </span>
                <span className="font-bold text-white">{countPending} บิล</span>
              </div>
            </div>
          </div>

          {/* Low Stock Warning */}
          <div className="p-5 rounded-xl bg-zinc-900/80 border border-zinc-800 space-y-3">
            <div className="flex items-center justify-between">
              <h2 className="text-sm font-bold text-white flex items-center gap-1.5 text-amber-400">
                <AlertTriangle className="w-4 h-4" />
                <span>เตือนสินค้าใกล้หมด ({lowStockProducts.length})</span>
              </h2>
              <Link href="/inventory" className="text-xs text-amber-400 hover:underline">
                ดูคลังสินค้า
              </Link>
            </div>

            <div className="space-y-2">
              {lowStockProducts.map(p => (
                <div key={p.id} className="flex items-center justify-between p-2 rounded-lg bg-zinc-950 border border-zinc-800 text-xs">
                  <div>
                    <p className="font-semibold text-zinc-200 line-clamp-1">{p.name}</p>
                    <p className="text-[11px] text-zinc-500">คงเหลือ {p.stockQty} {p.unit} (ขั้นต่ำ {p.minQty})</p>
                  </div>
                  <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-rose-500/10 text-rose-400 border border-rose-500/30">
                    ใกล้หมด
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Recent Invoices Table */}
      <div className="p-5 rounded-xl bg-zinc-900/80 border border-zinc-800 space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div>
            <h2 className="text-base font-bold text-white flex items-center gap-2">
              <Receipt className="w-4 h-4 text-amber-400" />
              <span>รายการบิลและเอกสารล่าสุด (Recent Invoices)</span>
            </h2>
            <p className="text-xs text-zinc-400 mt-0.5">เอกสารออกบิลงาน ขายสินค้า และวางบิลลูกหนี้</p>
          </div>

          <div className="flex items-center gap-2">
            <Link
              href="/invoices"
              className="text-xs font-semibold px-3 py-1.5 rounded-lg bg-zinc-800 text-zinc-200 hover:bg-zinc-700 border border-zinc-700 transition-colors"
            >
              ดูบิลทั้งหมด ({invoices.length})
            </Link>
            <Link
              href="/quotations"
              className="text-xs font-semibold px-3 py-1.5 rounded-lg bg-zinc-800 text-zinc-200 hover:bg-zinc-700 border border-zinc-700 transition-colors"
            >
              ใบเสนอราคา
            </Link>
          </div>
        </div>

        {/* Table */}
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-zinc-950/60 text-zinc-400 uppercase text-[10px] tracking-wider border-b border-zinc-800">
              <tr>
                <th className="py-3 px-3">เลขที่เอกสาร</th>
                <th className="py-3 px-3">วันที่</th>
                <th className="py-3 px-3">ลูกค้า / บริษัท</th>
                <th className="py-3 px-3 text-right">ยอดรวมสุทธิ</th>
                <th className="py-3 px-3 text-right">กำไร (Profit)</th>
                <th className="py-3 px-3 text-center">สถานะ</th>
                <th className="py-3 px-3 text-right">การจัดการ</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-zinc-800/60 font-medium">
              {invoices.slice(0, 5).map((inv) => (
                <tr key={inv.id} className="hover:bg-zinc-800/40 transition-colors">
                  <td className="py-3 px-3 font-mono font-bold text-amber-400">{inv.invoiceNo}</td>
                  <td className="py-3 px-3 text-zinc-400">{inv.date}</td>
                  <td className="py-3 px-3 text-zinc-200 max-w-[200px] truncate">{inv.customerName}</td>
                  <td className="py-3 px-3 text-right font-mono font-bold text-white">฿{inv.grandTotal.toLocaleString()}</td>
                  <td className="py-3 px-3 text-right font-mono text-emerald-400">฿{inv.profit.toLocaleString()}</td>
                  <td className="py-3 px-3 text-center">{getStatusBadge(inv.status)}</td>
                  <td className="py-3 px-3 text-right">
                    <Link
                      href={`/invoices`}
                      className="text-zinc-400 hover:text-white font-semibold underline text-[11px]"
                    >
                      เปิดดู/พิมพ์
                    </Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
