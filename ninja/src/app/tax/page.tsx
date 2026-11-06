'use client';

import { useState, useEffect } from 'react';
import { mockStore } from '@/lib/mockStore';
import { Invoice } from '@/types';
import { Calculator, ArrowLeft, Download, FileText, CheckCircle2, TrendingUp } from 'lucide-react';
import Link from 'next/link';

export default function TaxPage() {
  const [invoices, setInvoices] = useState<Invoice[]>([]);
  const [selectedMonth, setSelectedMonth] = useState('03');
  const [selectedYear, setSelectedYear] = useState(2026);

  useEffect(() => {
    setInvoices(mockStore.getInvoices());
  }, []);

  const vatInvoices = invoices.filter(inv => inv.vatRate > 0);
  const totalSalesBeforeVat = vatInvoices.reduce((sum, i) => sum + i.subtotal, 0);
  const totalOutputVat = vatInvoices.reduce((sum, i) => sum + i.vatAmount, 0);
  const estimatedInputVat = (totalSalesBeforeVat * 0.45 * 0.07); // Simulated purchase VAT
  const netVatPayable = totalOutputVat - estimatedInputVat;

  const withholdingInvoices = invoices.filter(inv => inv.withholdingTaxAmount > 0);
  const totalWithholdingTax = withholdingInvoices.reduce((sum, i) => sum + i.withholdingTaxAmount, 0);

  const handleExportCSV = () => {
    const headers = 'InvoiceNo,Date,Customer,Subtotal,VAT_7,GrandTotal,Status\n';
    const rows = vatInvoices.map(i => `${i.invoiceNo},${i.date},"${i.customerName}",${i.subtotal},${i.vatAmount},${i.grandTotal},${i.status}`).join('\n');
    const blob = new Blob([headers + rows], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `VAT_Report_${selectedYear}_${selectedMonth}.csv`;
    a.click();
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
              <Calculator className="w-6 h-6 text-amber-400" />
              <span>การจัดการภาษีมูลค่าเพิ่ม & ภาษีหัก ณ ที่จ่าย (Tax / VAT Management)</span>
            </h1>
          </div>
          <p className="text-xs text-zinc-400 mt-1">
            สรุปยอดภาษีขาย ภ.พ. 30 และภาษีหัก ณ ที่จ่าย (ภ.ง.ด. 3, 53) ประจำงวดบัญชี
          </p>
        </div>

        <button
          onClick={handleExportCSV}
          className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-zinc-800 hover:bg-zinc-700 text-zinc-200 border border-zinc-700 text-xs font-bold transition-all shadow-md self-start sm:self-auto"
        >
          <Download className="w-4 h-4 text-amber-400" />
          <span>ส่งออกรายงานภาษี (Export CSV)</span>
        </button>
      </div>

      {/* Tax Summary Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="p-5 rounded-xl bg-zinc-900/80 border border-zinc-800">
          <span className="text-xs text-zinc-400 font-medium">ภาษีขายรวม (Output VAT 7%)</span>
          <div className="mt-2 text-2xl font-black text-blue-400 font-mono">
            ฿{totalOutputVat.toLocaleString(undefined, { minimumFractionDigits: 2 })}
          </div>
          <p className="text-[11px] text-zinc-500 mt-1">จากยอดขายก่อนภาษี ฿{totalSalesBeforeVat.toLocaleString()}</p>
        </div>

        <div className="p-5 rounded-xl bg-zinc-900/80 border border-zinc-800">
          <span className="text-xs text-zinc-400 font-medium">ภาษีซื้อประเมิน (Input VAT)</span>
          <div className="mt-2 text-2xl font-black text-emerald-400 font-mono">
            ฿{estimatedInputVat.toLocaleString(undefined, { minimumFractionDigits: 2 })}
          </div>
          <p className="text-[11px] text-zinc-500 mt-1">จากใบกำกับภาษีซื้อวัตถุดิบและอุปกรณ์</p>
        </div>

        <div className="p-5 rounded-xl bg-zinc-900/80 border border-zinc-800">
          <span className="text-xs text-zinc-400 font-medium">ภาษีที่ต้องนำส่งสุทธิ (Net VAT Payable)</span>
          <div className="mt-2 text-2xl font-black text-amber-400 font-mono">
            ฿{netVatPayable.toLocaleString(undefined, { minimumFractionDigits: 2 })}
          </div>
          <p className="text-[11px] text-zinc-500 mt-1">ยอดชำระแบบ ภ.พ. 30 ประจำเดือน</p>
        </div>
      </div>

      {/* Tax Table */}
      <div className="p-5 rounded-xl bg-zinc-900/80 border border-zinc-800 space-y-4">
        <h2 className="text-sm font-bold text-white flex items-center gap-2">
          <FileText className="w-4 h-4 text-amber-400" />
          <span>รายงานภาษีขายประจำงวด (Sales Tax Ledger)</span>
        </h2>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-zinc-950/70 text-zinc-400 uppercase text-[10px] tracking-wider border-b border-zinc-800">
              <tr>
                <th className="py-3 px-3">เลขที่ใบกำกับภาษี</th>
                <th className="py-3 px-3">วันที่</th>
                <th className="py-3 px-3">ชื่อผู้ซื้อสินค้า / บริการ</th>
                <th className="py-3 px-3 text-right">มูลค่าสินค้า (ก่อน VAT)</th>
                <th className="py-3 px-3 text-right">จำนวนภาษี (7%)</th>
                <th className="py-3 px-3 text-right">ยอดรวมสุทธิ</th>
                <th className="py-3 px-3 text-center">สถานะเอกสาร</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-zinc-800/60 font-medium">
              {vatInvoices.map((inv) => (
                <tr key={inv.id} className="hover:bg-zinc-800/40">
                  <td className="py-3 px-3 font-mono font-bold text-amber-400">{inv.invoiceNo}</td>
                  <td className="py-3 px-3 text-zinc-400">{inv.date}</td>
                  <td className="py-3 px-3 text-zinc-200">{inv.customerName}</td>
                  <td className="py-3 px-3 text-right font-mono">฿{inv.subtotal.toLocaleString()}</td>
                  <td className="py-3 px-3 text-right font-mono text-blue-400">฿{inv.vatAmount.toLocaleString()}</td>
                  <td className="py-3 px-3 text-right font-mono font-bold text-white">฿{inv.grandTotal.toLocaleString()}</td>
                  <td className="py-3 px-3 text-center">
                    <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-emerald-500/10 text-emerald-400 border border-emerald-500/30">
                      ยื่นแล้ว
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Withholding Tax Table */}
      <div className="p-5 rounded-xl bg-zinc-900/80 border border-zinc-800 space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="text-sm font-bold text-white flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4 text-emerald-400" />
            <span>หนังสือรับรองการหักภาษี ณ ที่จ่าย (Withholding Tax Certificates)</span>
          </h2>
          <span className="text-xs text-zinc-400">หักสะสม: ฿{totalWithholdingTax.toLocaleString()}</span>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-zinc-950/70 text-zinc-400 uppercase text-[10px] tracking-wider border-b border-zinc-800">
              <tr>
                <th className="py-3 px-3">บิลอ้างอิง</th>
                <th className="py-3 px-3">ลูกค้าผู้หัก</th>
                <th className="py-3 px-3 text-right">ยอดก่อนหัก</th>
                <th className="py-3 px-3 text-center">อัตราหัก (%)</th>
                <th className="py-3 px-3 text-right">ภาษีที่ถูกหัก</th>
                <th className="py-3 px-3 text-center">เอกสารรับรอง</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-zinc-800/60 font-medium">
              {withholdingInvoices.map((inv) => (
                <tr key={inv.id} className="hover:bg-zinc-800/40">
                  <td className="py-3 px-3 font-mono font-bold text-amber-400">{inv.invoiceNo}</td>
                  <td className="py-3 px-3 text-zinc-200">{inv.customerName}</td>
                  <td className="py-3 px-3 text-right font-mono">฿{inv.subtotal.toLocaleString()}</td>
                  <td className="py-3 px-3 text-center text-orange-400 font-bold">{inv.withholdingTaxRate}%</td>
                  <td className="py-3 px-3 text-right font-mono text-orange-400 font-bold">฿{inv.withholdingTaxAmount.toLocaleString()}</td>
                  <td className="py-3 px-3 text-center text-zinc-400">ใบ 50 ทวิ แนบในระบบ</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
