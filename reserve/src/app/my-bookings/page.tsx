'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { mockStore } from '@/lib/mockStore';
import { Booking } from '@/types';
import { 
  Clock, 
  DoorOpen, 
  Calendar, 
  CheckCircle2, 
  AlertCircle, 
  X, 
  QrCode, 
  Printer, 
  ArrowLeft,
  Building,
  Users
} from 'lucide-react';

export default function MyBookingsPage() {
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [viewPass, setViewPass] = useState<Booking | null>(null);

  useEffect(() => {
    refresh();
  }, []);

  const refresh = () => setBookings(mockStore.getBookings());

  const handleCancel = (id: string) => {
    if (confirm('คุณต้องการยกเลิกคำขอจองห้องนี้หรือไม่?')) {
      mockStore.deleteBooking(id);
      refresh();
    }
  };

  const getStatusBadge = (status: Booking['status']) => {
    switch (status) {
      case 'approved':
        return <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-semibold bg-emerald-50 text-emerald-700 border border-emerald-200"><CheckCircle2 className="w-3 h-3" /> อนุมัติแล้ว</span>;
      case 'pending':
        return <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-semibold bg-amber-50 text-amber-700 border border-amber-200"><AlertCircle className="w-3 h-3" /> รอการอนุมัติ</span>;
      case 'rejected':
        return <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-semibold bg-rose-50 text-rose-700 border border-rose-200">ไม่อนุมัติ</span>;
      default:
        return <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-semibold bg-slate-100 text-slate-700">เสร็จสิ้น</span>;
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <Link href="/" className="text-slate-400 hover:text-slate-700 transition-colors">
              <ArrowLeft className="w-4 h-4" />
            </Link>
            <h1 className="text-2xl font-black text-slate-900 tracking-tight flex items-center gap-2">
              <Clock className="w-6 h-6 text-indigo-600" />
              <span>ประวัติและสถานะการจอง (My Reservations)</span>
            </h1>
          </div>
          <p className="text-xs text-slate-500 mt-1">
            ตรวจสอบสถานะคำขอ ใบอนุญาตเข้าใช้ห้องประชุม และ QR Code ยืนยันการเข้าใช้งาน
          </p>
        </div>

        <Link
          href="/book"
          className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-indigo-600 text-white text-xs font-bold hover:bg-indigo-700 transition-all shadow-md self-start sm:self-auto"
        >
          <span>+ จองห้องประชุมใหม่</span>
        </Link>
      </div>

      {/* Bookings List */}
      <div className="space-y-4">
        {bookings.map((b) => (
          <div
            key={b.id}
            className="p-5 rounded-2xl bg-white border border-slate-200 shadow-xs flex flex-col md:flex-row md:items-center justify-between gap-4 hover:border-slate-300 transition-all"
          >
            <div className="space-y-2">
              <div className="flex items-center gap-2">
                <span className="font-mono text-xs font-bold text-indigo-600 bg-indigo-50 px-2 py-0.5 rounded border border-indigo-200">
                  {b.bookingNo}
                </span>
                {getStatusBadge(b.status)}
              </div>

              <h2 className="text-base font-bold text-slate-900">{b.topic}</h2>

              <div className="flex flex-wrap items-center gap-x-4 gap-y-1 text-xs text-slate-600">
                <span className="flex items-center gap-1 font-semibold text-indigo-700">
                  <DoorOpen className="w-3.5 h-3.5" /> {b.roomName}
                </span>
                <span className="flex items-center gap-1">
                  <Calendar className="w-3.5 h-3.5 text-slate-400" /> วันที่ {b.date}
                </span>
                <span className="flex items-center gap-1">
                  <Clock className="w-3.5 h-3.5 text-slate-400" /> {b.startTime} - {b.endTime} น. ({b.timeSlotName})
                </span>
                <span className="flex items-center gap-1">
                  <Building className="w-3.5 h-3.5 text-slate-400" /> {b.departmentName}
                </span>
                <span className="flex items-center gap-1">
                  <Users className="w-3.5 h-3.5 text-slate-400" /> {b.attendees} คน
                </span>
              </div>

              {b.equipmentNotes && (
                <p className="text-[11px] text-slate-500 bg-slate-50 p-2 rounded border border-slate-200">
                  <span className="font-bold text-slate-700">ความต้องการพิเศษ:</span> {b.equipmentNotes}
                </p>
              )}
            </div>

            {/* Actions */}
            <div className="flex items-center gap-2 self-end md:self-center">
              <button
                onClick={() => setViewPass(b)}
                className="px-3 py-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-800 text-xs font-bold flex items-center gap-1.5 transition-colors"
              >
                <QrCode className="w-4 h-4 text-indigo-600" />
                <span>บัตรเข้าห้อง / QR</span>
              </button>

              {b.status === 'pending' && (
                <button
                  onClick={() => handleCancel(b.id)}
                  className="px-3 py-2 rounded-xl bg-rose-50 hover:bg-rose-100 text-rose-700 text-xs font-bold transition-colors"
                >
                  ยกเลิกคำขอ
                </button>
              )}
            </div>
          </div>
        ))}

        {bookings.length === 0 && (
          <div className="py-16 text-center text-slate-400 bg-white rounded-2xl border border-slate-200">
            <Clock className="w-10 h-10 mx-auto text-slate-300 mb-2" />
            <p className="text-sm font-semibold text-slate-700">ยังไม่มีประวัติการจองห้องประชุม</p>
            <p className="text-xs text-slate-400 mt-0.5">คุณสามารถจองห้องประชุมออนไลน์ได้ทันที</p>
          </div>
        )}
      </div>

      {/* Digital Pass & QR Modal */}
      {viewPass && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/75 backdrop-blur-sm">
          <div className="bg-white rounded-3xl w-full max-w-sm p-6 space-y-5 text-center shadow-2xl relative border border-slate-100">
            <button
              onClick={() => setViewPass(null)}
              className="absolute top-4 right-4 text-slate-400 hover:text-slate-800"
            >
              <X className="w-5 h-5" />
            </button>

            <div>
              <span className="text-[10px] font-bold uppercase tracking-widest text-indigo-600 bg-indigo-50 px-2 py-0.5 rounded-full border border-indigo-200">
                Official Digital Pass
              </span>
              <h2 className="text-lg font-black text-slate-900 mt-2">บัตรอนุญาตเข้าใช้ห้องประชุม</h2>
              <p className="text-xs text-slate-500 font-mono mt-0.5">{viewPass.bookingNo}</p>
            </div>

            {/* QR Code Graphic Box */}
            <div className="p-4 bg-slate-50 rounded-2xl border border-slate-200 inline-block shadow-inner">
              <div className="w-40 h-40 bg-white p-2 rounded-xl border border-slate-300 flex items-center justify-center mx-auto">
                <QrCode className="w-32 h-32 text-slate-800" />
              </div>
              <p className="text-[10px] text-slate-400 mt-2">สแกนที่หน้าห้องประชุมเพื่อเช็คอิน</p>
            </div>

            <div className="text-xs text-slate-700 space-y-1.5 text-left bg-slate-50 p-3.5 rounded-xl border border-slate-200">
              <p className="font-bold text-slate-900 text-sm">{viewPass.topic}</p>
              <p className="text-indigo-700 font-semibold">{viewPass.roomName}</p>
              <p className="text-slate-500">วันที่: {viewPass.date} ({viewPass.startTime} - {viewPass.endTime} น.)</p>
              <p className="text-slate-500">ผู้จอง: {viewPass.bookerName} ({viewPass.departmentName})</p>
            </div>

            <div className="flex gap-2 pt-2">
              <button
                onClick={() => window.print()}
                className="flex-1 py-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-800 text-xs font-bold flex items-center justify-center gap-1.5"
              >
                <Printer className="w-3.5 h-3.5" />
                <span>พิมพ์บัตร</span>
              </button>
              <button
                onClick={() => setViewPass(null)}
                className="flex-1 py-2 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-bold shadow-sm"
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
