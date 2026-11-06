'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { mockStore } from '@/lib/mockStore';
import { Booking, Room } from '@/types';
import { 
  ShieldCheck, 
  CheckCircle2, 
  XCircle, 
  Download, 
  DoorOpen, 
  Calendar, 
  ArrowLeft,
  Users,
  Clock,
  Building,
  AlertCircle
} from 'lucide-react';

export default function AdminPage() {
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [rooms, setRooms] = useState<Room[]>([]);
  const [rejectId, setRejectId] = useState<string | null>(null);
  const [rejectReason, setRejectReason] = useState('');

  useEffect(() => {
    refresh();
  }, []);

  const refresh = () => {
    setBookings(mockStore.getBookings());
    setRooms(mockStore.getRooms());
  };

  const handleApprove = (id: string) => {
    mockStore.updateBookingStatus(id, 'approved');
    alert('อนุมัติการจองห้องประชุมเรียบร้อยแล้ว!');
    refresh();
  };

  const handleRejectConfirm = () => {
    if (!rejectId) return;
    mockStore.updateBookingStatus(rejectId, 'rejected', rejectReason || 'ห้องประชุมไม่พร้อมให้บริการในช่วงเวลาดังกล่าว');
    setRejectId(null);
    setRejectReason('');
    alert('บันทึกการไม่อนุมัติเรียบร้อย');
    refresh();
  };

  const handleToggleRoomStatus = (id: string) => {
    const next = rooms.map(r => {
      if (r.id === id) {
        const newStatus = r.status === 'available' ? 'maintenance' : 'available';
        return { ...r, status: newStatus as Room['status'] };
      }
      return r;
    });
    mockStore.saveRooms(next);
    refresh();
  };

  const handleExportCSV = () => {
    const headers = 'BookingNo,Date,Time,Room,Topic,Department,Booker,Phone,Attendees,Status\n';
    const rows = bookings.map(b => 
      `${b.bookingNo},${b.date},"${b.startTime}-${b.endTime}","${b.roomName}","${b.topic}","${b.departmentName}","${b.bookerName}",${b.phone},${b.attendees},${b.status}`
    ).join('\n');
    const blob = new Blob([headers + rows], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `Bookings_Report_${new Date().toISOString().split('T')[0]}.csv`;
    a.click();
  };

  const pendingBookings = bookings.filter(b => b.status === 'pending');

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <Link href="/" className="text-slate-400 hover:text-slate-700 transition-colors">
              <ArrowLeft className="w-4 h-4" />
            </Link>
            <h1 className="text-2xl font-black text-slate-900 tracking-tight flex items-center gap-2">
              <ShieldCheck className="w-6 h-6 text-indigo-600" />
              <span>ศูนย์ควบคุมและอนุมัติคำขอ (Admin Approval Hub)</span>
            </h1>
          </div>
          <p className="text-xs text-slate-500 mt-1">
            พิจารณาอนุมัติคำขอจองห้องประชุม จัดการสถานะห้อง และส่งออกรายงานสถิติการใช้งาน
          </p>
        </div>

        <button
          onClick={handleExportCSV}
          className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-white hover:bg-slate-50 text-slate-800 border border-slate-300 text-xs font-bold transition-all shadow-xs self-start sm:self-auto"
        >
          <Download className="w-4 h-4 text-indigo-600" />
          <span>ส่งออกรายงาน (Export CSV)</span>
        </button>
      </div>

      {/* Pending Approvals Queue */}
      <div className="p-6 rounded-2xl bg-white border border-slate-200 shadow-xs space-y-4">
        <div className="flex items-center justify-between border-b border-slate-100 pb-3">
          <div className="flex items-center gap-2">
            <AlertCircle className="w-5 h-5 text-amber-500" />
            <h2 className="text-base font-extrabold text-slate-900">
              คิวคำขอรอการอนุมัติ ({pendingBookings.length} รายการ)
            </h2>
          </div>
          <span className="text-xs text-slate-500">ต้องดำเนินการโดยเจ้าหน้าที่</span>
        </div>

        <div className="space-y-3">
          {pendingBookings.map((b) => (
            <div
              key={b.id}
              className="p-4 rounded-xl border border-amber-200 bg-amber-50/40 flex flex-col md:flex-row md:items-center justify-between gap-4 text-xs"
            >
              <div className="space-y-1.5">
                <div className="flex items-center gap-2">
                  <span className="font-mono font-bold text-indigo-700 bg-white px-2 py-0.5 rounded border border-indigo-200">
                    {b.bookingNo}
                  </span>
                  <span className="font-bold text-slate-900 text-sm">{b.topic}</span>
                </div>

                <div className="flex flex-wrap gap-x-4 gap-y-1 text-slate-600">
                  <span className="font-semibold text-slate-900">{b.roomName}</span>
                  <span>วันที่: {b.date} ({b.startTime} - {b.endTime} น.)</span>
                  <span>ผู้ขอ: {b.bookerName} ({b.phone})</span>
                  <span>แผนก: {b.departmentName}</span>
                  <span>ผู้เข้าร่วม: {b.attendees} คน</span>
                </div>

                {b.equipmentNotes && (
                  <p className="text-slate-500 bg-white p-2 rounded border border-slate-200">
                    <span className="font-bold text-slate-700">อุปกรณ์:</span> {b.equipmentNotes}
                  </p>
                )}
              </div>

              {/* Action Buttons */}
              <div className="flex items-center gap-2 self-end md:self-center shrink-0">
                <button
                  onClick={() => handleApprove(b.id)}
                  className="px-4 py-2 rounded-xl bg-emerald-600 text-white font-bold hover:bg-emerald-700 flex items-center gap-1.5 shadow-sm transition-all"
                >
                  <CheckCircle2 className="w-4 h-4" />
                  <span>อนุมัติคำขอ</span>
                </button>
                <button
                  onClick={() => setRejectId(b.id)}
                  className="px-3 py-2 rounded-xl bg-rose-50 hover:bg-rose-100 text-rose-700 font-bold border border-rose-200 transition-colors"
                >
                  ไม่อนุมัติ
                </button>
              </div>
            </div>
          ))}

          {pendingBookings.length === 0 && (
            <div className="py-8 text-center text-slate-400">
              <CheckCircle2 className="w-8 h-8 text-emerald-500 mx-auto mb-1" />
              <p className="text-xs font-semibold text-slate-700">ไม่มีคำขอรออนุมัติค้างในระบบ</p>
            </div>
          )}
        </div>
      </div>

      {/* Room Status Management */}
      <div className="p-6 rounded-2xl bg-white border border-slate-200 shadow-xs space-y-4">
        <h2 className="text-base font-extrabold text-slate-900 flex items-center gap-2">
          <DoorOpen className="w-5 h-5 text-indigo-600" />
          <span>การจัดการสถานะห้องประชุม (Rooms Status & Maintenance)</span>
        </h2>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-slate-50 text-slate-500 uppercase text-[10px] tracking-wider border-b border-slate-200">
              <tr>
                <th className="py-3 px-4">ชื่อห้องประชุม</th>
                <th className="py-3 px-4">อาคาร / ชั้น</th>
                <th className="py-3 px-4 text-center">ความจุ</th>
                <th className="py-3 px-4 text-center">สถานะห้อง</th>
                <th className="py-3 px-4 text-right">การจัดการ</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 font-medium">
              {rooms.map((room) => (
                <tr key={room.id} className="hover:bg-slate-50">
                  <td className="py-3.5 px-4 font-bold text-slate-900">{room.name}</td>
                  <td className="py-3.5 px-4 text-slate-600">{room.building} ({room.floor})</td>
                  <td className="py-3.5 px-4 text-center font-mono">{room.capacity} ที่นั่ง</td>
                  <td className="py-3.5 px-4 text-center">
                    <span className={`px-2.5 py-0.5 rounded-full text-[11px] font-bold border ${
                      room.status === 'available'
                        ? 'bg-emerald-50 text-emerald-700 border-emerald-200'
                        : 'bg-amber-50 text-amber-700 border-amber-200'
                    }`}>
                      {room.status === 'available' ? 'พร้อมใช้งาน' : 'ปิดปรับปรุง'}
                    </span>
                  </td>
                  <td className="py-3.5 px-4 text-right">
                    <button
                      onClick={() => handleToggleRoomStatus(room.id)}
                      className="px-3 py-1 rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-semibold transition-colors"
                    >
                      {room.status === 'available' ? 'สลับเป็นปิดปรับปรุง' : 'สลับเป็นพร้อมใช้'}
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Reject Reason Modal */}
      {rejectId && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/75 backdrop-blur-sm">
          <div className="bg-white rounded-2xl w-full max-w-md p-6 space-y-4 text-xs text-slate-700 shadow-2xl">
            <h3 className="text-base font-bold text-slate-900">ระบุเหตุผลที่ไม่อนุมัติคำขอ</h3>
            <textarea
              rows={3}
              placeholder="เช่น ห้องอยู่ในช่วงบำรุงรักษา หรือเวลาทับซ้อนกับกิจกรรมหลักของมหาวิทยาลัย"
              value={rejectReason}
              onChange={(e) => setRejectReason(e.target.value)}
              className="w-full bg-slate-50 border border-slate-300 rounded-xl p-3 text-slate-900 focus:outline-none focus:border-rose-500"
            />
            <div className="flex justify-end gap-2 pt-2">
              <button
                onClick={() => setRejectId(null)}
                className="px-4 py-2 rounded-xl bg-slate-100 hover:bg-slate-200 font-semibold"
              >
                ยกเลิก
              </button>
              <button
                onClick={handleRejectConfirm}
                className="px-5 py-2 rounded-xl bg-rose-600 hover:bg-rose-700 text-white font-bold"
              >
                ยืนยันไม่อนุมัติ
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
