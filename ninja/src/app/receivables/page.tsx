'use client';

import { useState, useEffect } from 'react';
import { mockStore } from '@/lib/mockStore';
import { Invoice } from '@/types';
import { CreditCard, ArrowLeft, CheckCircle2, Clock, Eye, X, Upload } from 'lucide-react';
import Link from 'next/link';

export default function ReceivablesPage() {
  const [invoices, setInvoices] = useState<Invoice[]>([]);
  const [selectedSlip, setSelectedSlip] = useState<Invoice | null>(null);

  useEffect(() => {
    refresh();
  }, []);

  const refresh = () => setInvoices(mockStore.getInvoices());

  const handleVerify = (id: string) => {
    mockStore.updateInvoice(id, { status: 'paid', slipVerified: true });
    alert('ยืนยันสลิปโอนเงินและปรับสถานะเป็น "ชำระแล้ว" สำเร็จ!');
    setSelectedSlip(null);
    refresh();
  };

  const handleSimulateSlipUpload = (id: string) => {
    mockStore.updateInvoice(id, { 
      slipUrl: '/images/logo.png',
      paymentMethod: 'โอนผ่านธนาคารไทยพาณิชย์',
      slipVerified: false,
    });
    alert('แนบสลิปโอนเงินตัวอย่างเรียบร้อยแล้ว');
    refresh();
  };

  const totalReceivables = invoices.filter(i => i.status !== 'paid').reduce((sum, i) => sum + i.grandTotal, 0);

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <Link href="/" className="text-zinc-400 hover:text-white transition-colors">
              <ArrowLeft className="w-4 h-4" />
            </Link>
            <h1 className="text-2xl font-black text-white tracking-tight flex items-center gap-2">
              <CreditCard className="w-6 h-6 text-amber-400" />
              <span>บัญชีลูกหนี้ & ตรวจสอบสลิปโอนเงิน (Accounts Receivable)</span>
            </h1>
          </div>
          <p className="text-xs text-zinc-400 mt-1">
            ติดตามยอดค้างชำระ ตรวจสอบหลักฐานการโอนเงิน (Slip Verification) และปรับสถานะรับชำระ
          </p>
        </div>

        <div className="p-3 bg-zinc-900 border border-zinc-800 rounded-xl text-xs">
          <span className="text-zinc-400">ยอดหนี้ค้างชำระรวม: </span>
          <span className="font-mono font-bold text-base text-orange-400">฿{totalReceivables.toLocaleString()}</span>
        </div>
      </div>

      {/* Receivables Table */}
      <div className="rounded-xl bg-zinc-900/80 border border-zinc-800 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-zinc-950/70 text-zinc-400 uppercase text-[10px] tracking-wider border-b border-zinc-800">
              <tr>
                <th className="py-3.5 px-4">เลขที่บิล</th>
                <th className="py-3.5 px-4">วันที่ / ครบกำหนด</th>
                <th className="py-3.5 px-4">ลูกค้า</th>
                <th className="py-3.5 px-4 text-right">ยอดค้างชำระ</th>
                <th className="py-3.5 px-4 text-center">สลิปการโอน</th>
                <th className="py-3.5 px-4 text-center">สถานะ</th>
                <th className="py-3.5 px-4 text-right">การจัดการ</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-zinc-800/60 font-medium">
              {invoices.map((inv) => (
                <tr key={inv.id} className="hover:bg-zinc-800/40">
                  <td className="py-3.5 px-4 font-mono font-bold text-amber-400">{inv.invoiceNo}</td>
                  <td className="py-3.5 px-4 text-zinc-400">
                    <div>{inv.date}</div>
                    <div className="text-[10px] text-zinc-500">ครบ: {inv.dueDate}</div>
                  </td>
                  <td className="py-3.5 px-4 text-zinc-200">{inv.customerName}</td>
                  <td className="py-3.5 px-4 text-right font-mono font-bold text-white">
                    ฿{inv.grandTotal.toLocaleString()}
                  </td>
                  <td className="py-3.5 px-4 text-center">
                    {inv.slipUrl ? (
                      <button
                        onClick={() => setSelectedSlip(inv)}
                        className="inline-flex items-center gap-1 px-2.5 py-1 rounded bg-zinc-800 hover:bg-zinc-700 text-amber-400 font-semibold text-[11px]"
                      >
                        <Eye className="w-3.5 h-3.5" />
                        <span>ดูสลิป</span>
                      </button>
                    ) : (
                      <button
                        onClick={() => handleSimulateSlipUpload(inv.id)}
                        className="inline-flex items-center gap-1 px-2 py-0.5 rounded text-zinc-500 hover:text-zinc-300 text-[10px]"
                      >
                        <Upload className="w-3 h-3" />
                        <span>จำลองแนบสลิป</span>
                      </button>
                    )}
                  </td>
                  <td className="py-3.5 px-4 text-center">
                    {inv.status === 'paid' ? (
                      <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-emerald-500/10 text-emerald-400 border border-emerald-500/30">
                        ชำระแล้ว
                      </span>
                    ) : (
                      <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-orange-500/10 text-orange-400 border border-orange-500/30">
                        ค้างชำระ
                      </span>
                    )}
                  </td>
                  <td className="py-3.5 px-4 text-right">
                    {inv.status !== 'paid' && (
                      <button
                        onClick={() => handleVerify(inv.id)}
                        className="px-3 py-1 rounded-lg bg-emerald-500 text-zinc-950 font-bold text-[11px] hover:bg-emerald-400 transition-colors"
                      >
                        รับชำระเงิน
                      </button>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Slip Viewer Modal */}
      {selectedSlip && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-sm">
          <div className="bg-zinc-900 border border-zinc-700 rounded-2xl w-full max-w-md p-6 space-y-4 text-xs text-zinc-200 shadow-2xl">
            <div className="flex items-center justify-between border-b border-zinc-800 pb-3">
              <h2 className="text-base font-bold text-white flex items-center gap-2">
                <CreditCard className="w-5 h-5 text-amber-400" />
                <span>ตรวจสอบสลิปโอนเงิน: {selectedSlip.invoiceNo}</span>
              </h2>
              <button onClick={() => setSelectedSlip(null)} className="text-zinc-400 hover:text-white">
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="p-4 bg-zinc-950 rounded-xl border border-zinc-800 flex flex-col items-center gap-3">
              <div className="w-32 h-32 relative bg-zinc-900 rounded-lg overflow-hidden border border-zinc-700 flex items-center justify-center p-2">
                <img src={selectedSlip.slipUrl} alt="Slip" className="object-contain max-h-full" />
              </div>
              <div className="text-center">
                <p className="font-bold text-white text-sm">฿{selectedSlip.grandTotal.toLocaleString()}</p>
                <p className="text-zinc-400 text-xs mt-0.5">{selectedSlip.paymentMethod || 'โอนผ่านบัญชีธนาคาร'}</p>
                <p className="text-zinc-500 text-[11px]">ลูกค้า: {selectedSlip.customerName}</p>
              </div>
            </div>

            <div className="flex justify-end gap-2 pt-2">
              <button
                onClick={() => setSelectedSlip(null)}
                className="px-4 py-2 bg-zinc-800 rounded text-zinc-300"
              >
                ปิด
              </button>
              {selectedSlip.status !== 'paid' && (
                <button
                  onClick={() => handleVerify(selectedSlip.id)}
                  className="px-5 py-2 bg-emerald-500 text-zinc-950 font-bold rounded hover:bg-emerald-400"
                >
                  อนุมัติสลิป & รับชำระ
                </button>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
