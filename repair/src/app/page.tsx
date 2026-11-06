'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { mockStore } from '@/lib/mockStore';
import { Device, BorrowTicket, RepairTicket } from '@/types';
import { 
  Laptop, 
  Wrench, 
  Search, 
  Clock, 
  CheckCircle2, 
  AlertTriangle, 
  ArrowRight, 
  Boxes, 
  Sparkles,
  ShieldCheck,
  Activity,
  Layers
} from 'lucide-react';

export default function ServiceDeskHub() {
  const [devices, setDevices] = useState<Device[]>([]);
  const [borrows, setBorrows] = useState<BorrowTicket[]>([]);
  const [repairs, setRepairs] = useState<RepairTicket[]>([]);
  const [searchTracking, setSearchTracking] = useState('');

  useEffect(() => {
    setDevices(mockStore.getDevices());
    setBorrows(mockStore.getBorrows());
    setRepairs(mockStore.getRepairs());
  }, []);

  const availableDevices = devices.filter(d => d.status === 'available');
  const activeLoans = borrows.filter(b => b.status === 'active');
  const activeRepairs = repairs.filter(r => r.status !== 'closed');

  return (
    <div className="space-y-8">
      {/* Hero Welcome */}
      <div className="relative rounded-3xl overflow-hidden border border-slate-800 bg-gradient-to-br from-slate-900 via-slate-900/90 to-slate-950 p-6 sm:p-10 shadow-2xl">
        <div className="absolute right-0 top-0 bottom-0 w-1/3 opacity-20 pointer-events-none hidden lg:block overflow-hidden">
          <Image
            src="/images/24242.jpg"
            alt="IT Hardware"
            fill
            className="object-cover"
          />
        </div>

        <div className="relative z-10 max-w-2xl space-y-4">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-500/10 text-cyan-400 text-xs font-semibold border border-cyan-500/30">
            <Sparkles className="w-3.5 h-3.5" />
            <span>ศูนย์คอมพิวเตอร์ สำนักวิทยบริการและเทคโนโลยีสารสนเทศ</span>
          </div>

          <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-white leading-tight">
            ระบบบริการยืม-คืนอุปกรณ์ <br />
            และแจ้งซ่อมออนไลน์ <span className="text-cyan-400">(IT Service Desk)</span>
          </h1>

          <p className="text-sm text-slate-400 leading-relaxed">
            ให้บริการยืมอุปกรณ์คอมพิวเตอร์ โน้ตบุ๊ก โปรเจกเตอร์ จอภาพพกพา สำหรับการเรียนการสอนและกิจกรรม พร้อมระบบแจ้งซ่อมคอมพิวเตอร์ ฮาร์ดแวร์ ซอฟต์แวร์ และระบบเครือข่าย
          </p>

          {/* Quick Tracking Search Bar */}
          <div className="pt-2 flex flex-col sm:flex-row gap-2 max-w-md">
            <div className="relative flex-1">
              <Search className="w-4 h-4 text-slate-500 absolute left-3 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                placeholder="ระบุเลขที่คำขอ เช่น BRW-2026-001 หรือ REP-2026-001..."
                value={searchTracking}
                onChange={(e) => setSearchTracking(e.target.value)}
                className="w-full pl-9 pr-3 py-2.5 bg-slate-950 border border-slate-700 rounded-xl text-xs text-white placeholder-slate-500 focus:outline-none focus:border-cyan-400"
              />
            </div>
            <Link
              href={`/tracking${searchTracking ? `?q=${searchTracking}` : ''}`}
              className="px-5 py-2.5 rounded-xl bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-bold text-xs flex items-center justify-center gap-1.5 transition-all shadow-md"
            >
              <span>ค้นหางาน</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>
        </div>
      </div>

      {/* 3 Core Service Portals Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* 1. Borrowing Portal */}
        <Link
          href="/borrow"
          className="p-6 rounded-2xl bg-slate-900/80 border border-slate-800 hover:border-cyan-500/50 shadow-lg group transition-all flex flex-col justify-between space-y-5"
        >
          <div className="space-y-3">
            <div className="w-12 h-12 rounded-xl bg-cyan-500/10 text-cyan-400 flex items-center justify-center border border-cyan-500/20 group-hover:scale-110 transition-transform">
              <Laptop className="w-6 h-6" />
            </div>
            <h2 className="text-lg font-bold text-white group-hover:text-cyan-400 transition-colors">
              ยืมอุปกรณ์ไอทีออนไลน์
            </h2>
            <p className="text-xs text-slate-400 leading-relaxed">
              เลือกยืมโน้ตบุ๊ก โปรเจกเตอร์ จอภาพ สายแปลง และอุปกรณ์เสริม พร้อมตรวจสอบสต็อกเครื่องว่างแบบเรียลไทม์
            </p>
          </div>

          <div className="flex items-center justify-between text-xs font-semibold pt-4 border-t border-slate-800/80">
            <span className="text-emerald-400">พร้อมให้ยืม {availableDevices.length} เครื่อง</span>
            <span className="text-cyan-400 flex items-center gap-1 group-hover:translate-x-1 transition-transform">
              เข้าสู่ระบบยืม <ArrowRight className="w-3.5 h-3.5" />
            </span>
          </div>
        </Link>

        {/* 2. IT Repair Desk */}
        <Link
          href="/repair"
          className="p-6 rounded-2xl bg-slate-900/80 border border-slate-800 hover:border-amber-500/50 shadow-lg group transition-all flex flex-col justify-between space-y-5"
        >
          <div className="space-y-3">
            <div className="w-12 h-12 rounded-xl bg-amber-500/10 text-amber-400 flex items-center justify-center border border-amber-500/20 group-hover:scale-110 transition-transform">
              <Wrench className="w-6 h-6" />
            </div>
            <h2 className="text-lg font-bold text-white group-hover:text-amber-400 transition-colors">
              แจ้งซ่อมคอมพิวเตอร์ / Helpdesk
            </h2>
            <p className="text-xs text-slate-400 leading-relaxed">
              แจ้งปัญหาเครื่องเสีย ปรึกษาอาการขัดข้อง ฮาร์ดแวร์ ซอฟต์แวร์ ระบบเครือข่าย หรือเครื่องพิมพ์ขัดข้อง
            </p>
          </div>

          <div className="flex items-center justify-between text-xs font-semibold pt-4 border-t border-slate-800/80">
            <span className="text-amber-400">คิวงานซ่อม {activeRepairs.length} รายการ</span>
            <span className="text-amber-400 flex items-center gap-1 group-hover:translate-x-1 transition-transform">
              เปิดใบแจ้งซ่อม <ArrowRight className="w-3.5 h-3.5" />
            </span>
          </div>
        </Link>

        {/* 3. Tracking Status */}
        <Link
          href="/tracking"
          className="p-6 rounded-2xl bg-slate-900/80 border border-slate-800 hover:border-emerald-500/50 shadow-lg group transition-all flex flex-col justify-between space-y-5"
        >
          <div className="space-y-3">
            <div className="w-12 h-12 rounded-xl bg-emerald-500/10 text-emerald-400 flex items-center justify-center border border-emerald-500/20 group-hover:scale-110 transition-transform">
              <Activity className="w-6 h-6" />
            </div>
            <h2 className="text-lg font-bold text-white group-hover:text-emerald-400 transition-colors">
              ติดตามสถานะคำขอ (Status Tracking)
            </h2>
            <p className="text-xs text-slate-400 leading-relaxed">
              เช็คสถานะการอนุมัติยืม วันกำหนดส่งคืนอุปกรณ์ และขั้นตอนการซ่อมคอมพิวเตอร์ของช่างเทคนิค
            </p>
          </div>

          <div className="flex items-center justify-between text-xs font-semibold pt-4 border-t border-slate-800/80">
            <span className="text-slate-400">อัปเดตสถานะแบบ Real-time</span>
            <span className="text-emerald-400 flex items-center gap-1 group-hover:translate-x-1 transition-transform">
              เช็คสถานะงาน <ArrowRight className="w-3.5 h-3.5" />
            </span>
          </div>
        </Link>
      </div>

      {/* Live Operations Overview & Recent Tickets */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Device Availability Spotlight (1 Col) */}
        <div className="p-5 rounded-2xl bg-slate-900/80 border border-slate-800 space-y-4">
          <div className="flex items-center justify-between border-b border-slate-800 pb-3">
            <h3 className="text-sm font-bold text-white flex items-center gap-2">
              <Boxes className="w-4 h-4 text-cyan-400" />
              <span>อุปกรณ์พร้อมให้ยืมทันที</span>
            </h3>
            <Link href="/borrow" className="text-xs text-cyan-400 hover:underline">
              ดูทั้งหมด
            </Link>
          </div>

          <div className="space-y-2.5">
            {availableDevices.slice(0, 4).map((d) => (
              <div key={d.id} className="p-3 rounded-xl bg-slate-950 border border-slate-800/80 flex items-center justify-between text-xs">
                <div>
                  <h4 className="font-semibold text-slate-200 line-clamp-1">{d.name}</h4>
                  <p className="text-[11px] text-slate-500 font-mono mt-0.5">{d.assetNumber}</p>
                </div>
                <Link
                  href={`/borrow?device=${d.id}`}
                  className="px-2.5 py-1 rounded bg-cyan-500/10 text-cyan-400 hover:bg-cyan-500 hover:text-slate-950 font-bold text-[11px] border border-cyan-500/30 transition-all shrink-0"
                >
                  ขอยืม
                </Link>
              </div>
            ))}
          </div>
        </div>

        {/* Recent Service Desk Activities (2 Cols) */}
        <div className="lg:col-span-2 p-5 rounded-2xl bg-slate-900/80 border border-slate-800 space-y-4">
          <div className="flex items-center justify-between border-b border-slate-800 pb-3">
            <h3 className="text-sm font-bold text-white flex items-center gap-2">
              <Clock className="w-4 h-4 text-amber-400" />
              <span>รายการบริการล่าสุด (Recent Activity)</span>
            </h3>
            <Link href="/admin" className="text-xs text-slate-400 hover:text-white">
              สำหรับเจ้าหน้าที่ →
            </Link>
          </div>

          <div className="space-y-3">
            {/* Active loans snippet */}
            {borrows.slice(0, 3).map((b) => (
              <div key={b.id} className="p-3.5 rounded-xl bg-slate-950 border border-slate-800 flex flex-col sm:flex-row sm:items-center justify-between gap-2 text-xs">
                <div>
                  <div className="flex items-center gap-2">
                    <span className="font-mono font-bold text-cyan-400 text-[11px]">{b.ticketNo}</span>
                    <span className="text-white font-semibold">{b.deviceName}</span>
                  </div>
                  <p className="text-slate-400 text-[11px] mt-0.5">
                    ผู้ยืม: {b.borrowerName} ({b.departmentName}) · กำหนดคืน: {b.returnDueDate}
                  </p>
                </div>
                <span className={`px-2.5 py-0.5 rounded-full text-[10px] font-bold border self-start sm:self-auto ${
                  b.status === 'active' 
                    ? 'bg-blue-500/10 text-blue-400 border-blue-500/30' 
                    : 'bg-emerald-500/10 text-emerald-400 border-emerald-500/30'
                }`}>
                  {b.status === 'active' ? 'กำลังยืมใช้งาน' : 'ส่งคืนแล้ว'}
                </span>
              </div>
            ))}

            {/* Active repairs snippet */}
            {repairs.slice(0, 2).map((r) => (
              <div key={r.id} className="p-3.5 rounded-xl bg-slate-950 border border-slate-800 flex flex-col sm:flex-row sm:items-center justify-between gap-2 text-xs">
                <div>
                  <div className="flex items-center gap-2">
                    <span className="font-mono font-bold text-amber-400 text-[11px]">{r.ticketNo}</span>
                    <span className="text-white font-semibold">{r.deviceType}</span>
                  </div>
                  <p className="text-slate-400 text-[11px] mt-0.5">
                    อาการ: {r.issueTitle}
                  </p>
                </div>
                <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-amber-500/10 text-amber-400 border border-amber-500/30 self-start sm:self-auto">
                  {r.status === 'in_repair' ? 'กำลังดำเนินการซ่อม' : 'รอช่างตรวจรับ'}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
