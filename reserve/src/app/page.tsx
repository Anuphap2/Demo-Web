'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { mockStore } from '@/lib/mockStore';
import { Room, Booking } from '@/types';
import { 
  Calendar as CalendarIcon, 
  DoorOpen, 
  Clock, 
  Users, 
  CheckCircle2, 
  AlertCircle, 
  PlusCircle, 
  ArrowRight,
  Sparkles,
  ChevronLeft,
  ChevronRight,
  Building
} from 'lucide-react';

export default function CalendarPage() {
  const [rooms, setRooms] = useState<Room[]>([]);
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [selectedRoomId, setSelectedRoomId] = useState<string>('all');
  const [selectedDate, setSelectedDate] = useState<string>('2026-03-20');

  useEffect(() => {
    setRooms(mockStore.getRooms());
    setBookings(mockStore.getBookings());
  }, []);

  // Calendar dates for March 2026 (Demo month)
  const currentMonthYear = 'มีนาคม 2569 (2026)';
  const daysInMonth = Array.from({ length: 31 }, (_, i) => {
    const day = i + 1;
    const dateStr = `2026-03-${String(day).padStart(2, '0')}`;
    return { day, dateStr };
  });

  const filteredBookings = bookings.filter(b => {
    const matchesRoom = selectedRoomId === 'all' || b.roomId === selectedRoomId;
    return matchesRoom;
  });

  const selectedDateBookings = filteredBookings.filter(b => b.date === selectedDate);

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
      {/* Hero Banner with original background image */}
      <div className="relative rounded-2xl overflow-hidden shadow-md border border-slate-200 bg-slate-900 text-white min-h-[180px] flex flex-col justify-end p-6 sm:p-8">
        <div className="absolute inset-0 opacity-40 mix-blend-overlay">
          <Image 
            src="/images/banner.jpg" 
            alt="Auditorium Banner" 
            fill 
            className="object-cover"
            priority
          />
        </div>
        <div className="relative z-10 max-w-2xl">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-500/30 text-indigo-200 text-xs font-semibold backdrop-blur-md border border-indigo-400/30 mb-2">
            <Sparkles className="w-3.5 h-3.5 text-indigo-300" />
            <span>ระบบบริการจองห้องประชุมและอุปกรณ์ดิจิทัล</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight">
            ปฏิทินการใช้ห้องประชุมส่วนกลาง (Meeting Calendar)
          </h1>
          <p className="text-xs sm:text-sm text-slate-200 mt-1">
            ตรวจสอบตารางเวลาห้องว่าง จองห้องประชุมออนไลน์ พร้อมอุปกรณ์มัลติมีเดียและระบบอนุมัติคำขอ
          </p>
        </div>
      </div>

      {/* Filter and Quick Stats Bar */}
      <div className="grid grid-cols-1 sm:grid-cols-4 gap-4">
        <div className="p-4 rounded-xl bg-white border border-slate-200 shadow-xs flex items-center justify-between">
          <div>
            <span className="text-xs text-slate-500 font-medium">ห้องประชุมทั้งหมด</span>
            <div className="text-xl font-bold text-slate-900 mt-0.5">{rooms.length} ห้อง</div>
          </div>
          <div className="p-2.5 rounded-lg bg-indigo-50 text-indigo-600">
            <DoorOpen className="w-5 h-5" />
          </div>
        </div>

        <div className="p-4 rounded-xl bg-white border border-slate-200 shadow-xs flex items-center justify-between">
          <div>
            <span className="text-xs text-slate-500 font-medium">การจองในเดือนนี้</span>
            <div className="text-xl font-bold text-slate-900 mt-0.5">{bookings.length} รายการ</div>
          </div>
          <div className="p-2.5 rounded-lg bg-blue-50 text-blue-600">
            <CalendarIcon className="w-5 h-5" />
          </div>
        </div>

        <div className="p-4 rounded-xl bg-white border border-slate-200 shadow-xs flex items-center justify-between">
          <div>
            <span className="text-xs text-slate-500 font-medium">อนุมัติเรียบร้อย</span>
            <div className="text-xl font-bold text-emerald-600 mt-0.5">
              {bookings.filter(b => b.status === 'approved').length} รายการ
            </div>
          </div>
          <div className="p-2.5 rounded-lg bg-emerald-50 text-emerald-600">
            <CheckCircle2 className="w-5 h-5" />
          </div>
        </div>

        <div className="p-4 rounded-xl bg-white border border-slate-200 shadow-xs flex items-center justify-between">
          <div>
            <span className="text-xs text-slate-500 font-medium">รอการอนุมัติ</span>
            <div className="text-xl font-bold text-amber-600 mt-0.5">
              {bookings.filter(b => b.status === 'pending').length} รายการ
            </div>
          </div>
          <div className="p-2.5 rounded-lg bg-amber-50 text-amber-600">
            <AlertCircle className="w-5 h-5" />
          </div>
        </div>
      </div>

      {/* Main Grid: Calendar & Schedule */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Calendar Grid (2 Cols) */}
        <div className="lg:col-span-2 p-5 rounded-2xl bg-white border border-slate-200 shadow-xs space-y-4">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-100 pb-4">
            <div className="flex items-center gap-2">
              <CalendarIcon className="w-5 h-5 text-indigo-600" />
              <h2 className="text-base font-bold text-slate-900">{currentMonthYear}</h2>
            </div>

            {/* Room Filter Dropdown */}
            <div className="flex items-center gap-2">
              <span className="text-xs text-slate-500 font-medium">กรองตามห้อง:</span>
              <select
                value={selectedRoomId}
                onChange={(e) => setSelectedRoomId(e.target.value)}
                className="bg-slate-50 border border-slate-200 text-xs font-semibold rounded-lg px-2.5 py-1.5 text-slate-800 focus:outline-none focus:border-indigo-600"
              >
                <option value="all">ทุกห้องประชุม</option>
                {rooms.map(r => (
                  <option key={r.id} value={r.id}>{r.name}</option>
                ))}
              </select>
            </div>
          </div>

          {/* Days Grid */}
          <div className="grid grid-cols-7 gap-1.5 text-center text-xs">
            {['อา.', 'จ.', 'อ.', 'พ.', 'พฤ.', 'ศ.', 'ส.'].map((day, idx) => (
              <div key={day} className={`font-bold py-1.5 ${idx === 0 || idx === 6 ? 'text-rose-500' : 'text-slate-600'}`}>
                {day}
              </div>
            ))}

            {/* Empty padding days for Sunday 1st March 2026 */}
            {/* March 1, 2026 is Sunday, so 0 padding days! */}
            {daysInMonth.map(({ day, dateStr }) => {
              const dayBookings = filteredBookings.filter(b => b.date === dateStr);
              const isSelected = selectedDate === dateStr;
              const hasBookings = dayBookings.length > 0;

              return (
                <button
                  key={day}
                  type="button"
                  onClick={() => setSelectedDate(dateStr)}
                  className={`min-h-[72px] p-1.5 rounded-xl border flex flex-col items-center justify-between transition-all ${
                    isSelected
                      ? 'border-indigo-600 bg-indigo-50/70 shadow-xs ring-2 ring-indigo-600/20'
                      : 'border-slate-100 bg-white hover:border-slate-300 hover:bg-slate-50'
                  }`}
                >
                  <span className={`text-xs font-bold ${isSelected ? 'text-indigo-700' : 'text-slate-700'}`}>
                    {day}
                  </span>

                  <div className="w-full space-y-1 my-1">
                    {dayBookings.slice(0, 2).map((b) => (
                      <div
                        key={b.id}
                        className={`text-[9px] font-semibold truncate rounded px-1 py-0.5 text-left ${
                          b.status === 'approved'
                            ? 'bg-emerald-100 text-emerald-800'
                            : 'bg-amber-100 text-amber-800'
                        }`}
                        title={`${b.roomName}: ${b.topic}`}
                      >
                        {b.startTime} {b.roomName.split(' ')[0]}
                      </div>
                    ))}
                    {dayBookings.length > 2 && (
                      <div className="text-[9px] text-slate-500 font-bold">
                        +{dayBookings.length - 2} รายการ
                      </div>
                    )}
                  </div>

                  {hasBookings ? (
                    <span className="w-1.5 h-1.5 rounded-full bg-indigo-600" />
                  ) : (
                    <span className="w-1.5 h-1.5 rounded-full bg-transparent" />
                  )}
                </button>
              );
            })}
          </div>

          <div className="flex items-center justify-between text-xs text-slate-500 pt-2 border-t border-slate-100">
            <div className="flex items-center gap-4">
              <span className="flex items-center gap-1">
                <span className="w-2.5 h-2.5 rounded-full bg-emerald-500" /> อนุมัติแล้ว
              </span>
              <span className="flex items-center gap-1">
                <span className="w-2.5 h-2.5 rounded-full bg-amber-500" /> รออนุมัติ
              </span>
            </div>
            <span>คลิกที่วันที่เพื่อดูรายละเอียดการใช้งาน</span>
          </div>
        </div>

        {/* Selected Date Schedule & Action (1 Col) */}
        <div className="p-5 rounded-2xl bg-white border border-slate-200 shadow-xs space-y-4">
          <div className="flex items-center justify-between border-b border-slate-100 pb-3">
            <div>
              <span className="text-[11px] font-bold text-indigo-600 uppercase tracking-wider block">
                ตารางการใช้งาน
              </span>
              <h2 className="text-base font-extrabold text-slate-900 mt-0.5">
                วันที่ {new Date(selectedDate).toLocaleDateString('th-TH', { year: 'numeric', month: 'long', day: 'numeric' })}
              </h2>
            </div>
            <Link
              href={`/book?date=${selectedDate}`}
              className="p-2 rounded-lg bg-indigo-50 text-indigo-600 hover:bg-indigo-100 transition-colors"
              title="จองห้องในวันนี้"
            >
              <PlusCircle className="w-5 h-5" />
            </Link>
          </div>

          {/* Bookings on this day */}
          <div className="space-y-3">
            {selectedDateBookings.map((b) => (
              <div key={b.id} className="p-3.5 rounded-xl border border-slate-200 bg-slate-50/60 space-y-2 text-xs">
                <div className="flex items-start justify-between gap-2">
                  <h3 className="font-bold text-slate-900 text-sm leading-snug">{b.topic}</h3>
                  {getStatusBadge(b.status)}
                </div>

                <div className="space-y-1 text-slate-600">
                  <p className="flex items-center gap-1.5 font-medium text-indigo-700">
                    <DoorOpen className="w-3.5 h-3.5" />
                    <span>{b.roomName}</span>
                  </p>
                  <p className="flex items-center gap-1.5">
                    <Clock className="w-3.5 h-3.5 text-slate-400" />
                    <span>เวลา {b.startTime} - {b.endTime} น. ({b.timeSlotName})</span>
                  </p>
                  <p className="flex items-center gap-1.5">
                    <Building className="w-3.5 h-3.5 text-slate-400" />
                    <span>{b.departmentName}</span>
                  </p>
                  <p className="flex items-center gap-1.5">
                    <Users className="w-3.5 h-3.5 text-slate-400" />
                    <span>ผู้จอง: {b.bookerName} (จำนวน {b.attendees} คน)</span>
                  </p>
                </div>

                {b.equipmentNotes && (
                  <div className="text-[11px] text-slate-500 bg-white p-2 rounded border border-slate-200">
                    <span className="font-semibold text-slate-700">อุปกรณ์ที่ขอ:</span> {b.equipmentNotes}
                  </div>
                )}
              </div>
            ))}

            {selectedDateBookings.length === 0 && (
              <div className="py-12 text-center text-slate-400 space-y-2">
                <CalendarIcon className="w-8 h-8 mx-auto text-slate-300" />
                <p className="text-xs">ยังไม่มีรายการจองห้องประชุมในวันนี้</p>
                <Link
                  href={`/book?date=${selectedDate}`}
                  className="inline-flex items-center gap-1 text-xs font-bold text-indigo-600 hover:underline mt-1"
                >
                  <span>คลิกเพื่อทำการจองห้อง</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </Link>
              </div>
            )}
          </div>

          <div className="pt-2">
            <Link
              href="/book"
              className="w-full flex items-center justify-center gap-2 py-2.5 px-4 rounded-xl bg-indigo-600 text-white text-xs font-bold hover:bg-indigo-700 transition-colors shadow-sm"
            >
              <PlusCircle className="w-4 h-4" />
              <span>เปิดฟอร์มจองห้องประชุมใหม่</span>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
