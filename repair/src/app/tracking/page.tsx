'use client';

import { useState, useEffect, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import Link from 'next/link';
import { mockStore } from '@/lib/mockStore';
import { BorrowTicket, RepairTicket } from '@/types';
import { 
  Search, 
  ArrowLeft, 
  Clock, 
  CheckCircle2, 
  AlertCircle, 
  Laptop, 
  Wrench, 
  QrCode, 
  Printer, 
  ChevronRight,
  ShieldCheck
} from 'lucide-react';

function TrackingContent() {
  const searchParams = useSearchParams();
  const [query, setQuery] = useState('');
  const [selectedBorrow, setSelectedBorrow] = useState<BorrowTicket | null>(null);
  const [selectedRepair, setSelectedRepair] = useState<RepairTicket | null>(null);

  const [allBorrows, setAllBorrows] = useState<BorrowTicket[]>([]);
  const [allRepairs, setAllRepairs] = useState<RepairTicket[]>([]);

  useEffect(() => {
    const bList = mockStore.getBorrows();
    const rList = mockStore.getRepairs();
    setAllBorrows(bList);
    setAllRepairs(rList);

    const initialQ = searchParams.get('q');
    if (initialQ) {
      setQuery(initialQ);
      handleSearch(initialQ, bList, rList);
    } else if (bList.length > 0) {
      setSelectedBorrow(bList[0]);
    }
  }, [searchParams]);

  const handleSearch = (q: string, bList = allBorrows, rList = allRepairs) => {
    const term = q.trim().toLowerCase();
    if (!term) return;

    const foundBorrow = bList.find(b => 
      b.ticketNo.toLowerCase().includes(term) || 
      b.phone.includes(term) ||
      b.borrowerName.toLowerCase().includes(term)
    );

    const foundRepair = rList.find(r => 
      r.ticketNo.toLowerCase().includes(term) || 
      r.phone.includes(term) ||
      r.contactName.toLowerCase().includes(term)
    );

    setSelectedBorrow(foundBorrow || null);
    setSelectedRepair(foundRepair || null);
  };

  const onSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    handleSearch(query);
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <Link href="/" className="text-slate-400 hover:text-white transition-colors">
              <ArrowLeft className="w-4 h-4" />
            </Link>
            <h1 className="text-2xl font-black text-white tracking-tight flex items-center gap-2">
              <Search className="w-6 h-6 text-cyan-400" />
              <span>ติดตามสถานะงานบริการไอที (Service Status Tracking)</span>
            </h1>
          </div>
          <p className="text-xs text-slate-400 mt-1">
            ค้นหาด้วยเลขที่คำขอ (เช่น BRW-2026-001 หรือ REP-2026-001) หรือเบอร์โทรศัพท์
          </p>
        </div>
      </div>

      {/* Search Input Box */}
      <form onSubmit={onSearchSubmit} className="p-4 rounded-2xl bg-slate-900 border border-slate-800 flex gap-2">
        <div className="relative flex-1">
          <Search className="w-4 h-4 text-slate-500 absolute left-3 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            placeholder="ค้นหาเลขที่คำขอ เช่น BRW-2026-001, REP-2026-001 หรือเบอร์โทร 080-000-0002..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className="w-full pl-9 pr-4 py-2.5 bg-slate-950 border border-slate-800 rounded-xl text-xs text-white focus:outline-none focus:border-cyan-400"
          />
        </div>
        <button
          type="submit"
          className="px-6 py-2.5 rounded-xl bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-bold text-xs shadow-md transition-all"
        >
          ค้นหา
        </button>
      </form>

      {/* Quick Select Buttons */}
      <div className="flex items-center gap-2 overflow-x-auto text-xs pb-1">
        <span className="text-slate-500 shrink-0">คำขอล่าสุด:</span>
        {allBorrows.slice(0, 3).map(b => (
          <button
            key={b.id}
            onClick={() => { setSelectedBorrow(b); setSelectedRepair(null); }}
            className={`px-3 py-1 rounded-lg border font-mono transition-colors shrink-0 ${
              selectedBorrow?.id === b.id
                ? 'bg-cyan-500 text-slate-950 font-bold border-cyan-400'
                : 'bg-slate-900 text-slate-400 border-slate-800 hover:text-white'
            }`}
          >
            {b.ticketNo} (ยืม)
          </button>
        ))}
        {allRepairs.slice(0, 3).map(r => (
          <button
            key={r.id}
            onClick={() => { setSelectedRepair(r); setSelectedBorrow(null); }}
            className={`px-3 py-1 rounded-lg border font-mono transition-colors shrink-0 ${
              selectedRepair?.id === r.id
                ? 'bg-amber-400 text-slate-950 font-bold border-amber-400'
                : 'bg-slate-900 text-slate-400 border-slate-800 hover:text-white'
            }`}
          >
            {r.ticketNo} (ซ่อม)
          </button>
        ))}
      </div>

      {/* Result Display: Borrow Details */}
      {selectedBorrow && (
        <div className="p-6 rounded-3xl bg-slate-900 border border-slate-800 shadow-xl space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-800 pb-4">
            <div>
              <div className="flex items-center gap-2">
                <span className="font-mono font-bold text-cyan-400 text-sm bg-cyan-500/10 px-2.5 py-0.5 rounded border border-cyan-500/30">
                  {selectedBorrow.ticketNo}
                </span>
                <span className={`px-2.5 py-0.5 rounded-full text-xs font-bold border ${
                  selectedBorrow.status === 'returned'
                    ? 'bg-emerald-500/10 text-emerald-400 border-emerald-500/30'
                    : 'bg-blue-500/10 text-blue-400 border-blue-500/30'
                }`}>
                  {selectedBorrow.status === 'returned' ? 'ส่งคืนเรียบร้อย' : 'กำลังยืมใช้งาน'}
                </span>
              </div>
              <h2 className="text-lg font-bold text-white mt-1.5">{selectedBorrow.deviceName}</h2>
              <p className="text-xs text-slate-400 font-mono">ครุภัณฑ์: {selectedBorrow.assetNumber}</p>
            </div>

            <div className="flex items-center gap-2">
              <button
                onClick={() => window.print()}
                className="px-3 py-1.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 font-semibold text-xs flex items-center gap-1.5"
              >
                <Printer className="w-3.5 h-3.5 text-cyan-400" />
                <span>พิมพ์ใบยืม</span>
              </button>
            </div>
          </div>

          {/* Stepper Timeline for Borrow */}
          <div className="py-4">
            <span className="text-[11px] uppercase font-bold text-slate-500 tracking-wider block mb-4">
              ขั้นตอนความคืบหน้า (Process Timeline)
            </span>
            <div className="grid grid-cols-4 gap-2 text-center text-xs">
              <div className="space-y-1">
                <div className="w-8 h-8 rounded-full bg-cyan-500 text-slate-950 font-black flex items-center justify-center mx-auto text-xs shadow-md">
                  ✓
                </div>
                <p className="font-bold text-white">ยื่นคำขอยืม</p>
                <p className="text-[10px] text-slate-500">{selectedBorrow.borrowDate}</p>
              </div>

              <div className="space-y-1">
                <div className="w-8 h-8 rounded-full bg-cyan-500 text-slate-950 font-black flex items-center justify-center mx-auto text-xs shadow-md">
                  ✓
                </div>
                <p className="font-bold text-white">ส่งมอบอุปกรณ์</p>
                <p className="text-[10px] text-slate-500">ตรวจสอบสภาพแล้ว</p>
              </div>

              <div className="space-y-1">
                <div className={`w-8 h-8 rounded-full flex items-center justify-center mx-auto text-xs font-black ${
                  selectedBorrow.status === 'active' || selectedBorrow.status === 'returned'
                    ? 'bg-cyan-500 text-slate-950 shadow-md'
                    : 'bg-slate-800 text-slate-500'
                }`}>
                  {selectedBorrow.status === 'returned' ? '✓' : '3'}
                </div>
                <p className="font-bold text-white">อยู่ในระหว่างใช้งาน</p>
                <p className="text-[10px] text-slate-500">กำหนดคืน {selectedBorrow.returnDueDate}</p>
              </div>

              <div className="space-y-1">
                <div className={`w-8 h-8 rounded-full flex items-center justify-center mx-auto text-xs font-black ${
                  selectedBorrow.status === 'returned'
                    ? 'bg-emerald-500 text-slate-950 shadow-md'
                    : 'bg-slate-800 text-slate-500'
                }`}>
                  {selectedBorrow.status === 'returned' ? '✓' : '4'}
                </div>
                <p className={`font-bold ${selectedBorrow.status === 'returned' ? 'text-emerald-400' : 'text-slate-500'}`}>
                  ส่งคืนและปิดงาน
                </p>
                <p className="text-[10px] text-slate-500">{selectedBorrow.actualReturnDate || 'รอส่งคืน'}</p>
              </div>
            </div>
          </div>

          {/* Details Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs bg-slate-950 p-4 rounded-2xl border border-slate-800 text-slate-300">
            <div>
              <span className="text-slate-500 font-bold block mb-1">ข้อมูลผู้ยืม:</span>
              <p><span className="text-slate-400">ชื่อ-นามสกุล:</span> {selectedBorrow.borrowerName}</p>
              <p><span className="text-slate-400">รหัสประจำตัว:</span> {selectedBorrow.studentId}</p>
              <p><span className="text-slate-400">หน่วยงาน/คณะ:</span> {selectedBorrow.departmentName}</p>
              <p><span className="text-slate-400">เบอร์ติดต่อ:</span> {selectedBorrow.phone}</p>
            </div>
            <div>
              <span className="text-slate-500 font-bold block mb-1">รายละเอียดการใช้งาน:</span>
              <p><span className="text-slate-400">วันที่ยืม:</span> {selectedBorrow.borrowDate}</p>
              <p><span className="text-slate-400">กำหนดคืน:</span> {selectedBorrow.returnDueDate}</p>
              <p><span className="text-slate-400">วัตถุประสงค์:</span> {selectedBorrow.purpose}</p>
              <p><span className="text-slate-400">เจ้าหน้าที่ผู้ส่งมอบ:</span> {selectedBorrow.officerName || 'ศูนย์คอมพิวเตอร์'}</p>
            </div>
          </div>
        </div>
      )}

      {/* Result Display: Repair Details */}
      {selectedRepair && (
        <div className="p-6 rounded-3xl bg-slate-900 border border-slate-800 shadow-xl space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-800 pb-4">
            <div>
              <div className="flex items-center gap-2">
                <span className="font-mono font-bold text-amber-400 text-sm bg-amber-500/10 px-2.5 py-0.5 rounded border border-amber-500/30">
                  {selectedRepair.ticketNo}
                </span>
                <span className={`px-2.5 py-0.5 rounded-full text-xs font-bold border ${
                  selectedRepair.status === 'ready_for_pickup'
                    ? 'bg-emerald-500/10 text-emerald-400 border-emerald-500/30'
                    : selectedRepair.status === 'in_repair'
                    ? 'bg-amber-500/10 text-amber-400 border-amber-500/30'
                    : 'bg-blue-500/10 text-blue-400 border-blue-500/30'
                }`}>
                  {selectedRepair.status === 'ready_for_pickup' ? 'ซ่อมเสร็จสิ้น / พร้อมรับคืน' : selectedRepair.status === 'in_repair' ? 'กำลังดำเนินการซ่อม' : 'รับเรื่องเข้าระบบ'}
                </span>
              </div>
              <h2 className="text-lg font-bold text-white mt-1.5">{selectedRepair.deviceType}</h2>
              <p className="text-xs text-slate-400">อาการ: {selectedRepair.issueTitle}</p>
            </div>

            <button
              onClick={() => window.print()}
              className="px-3 py-1.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 font-semibold text-xs flex items-center gap-1.5"
            >
              <Printer className="w-3.5 h-3.5 text-amber-400" />
              <span>พิมพ์ใบแจ้งซ่อม</span>
            </button>
          </div>

          {/* Stepper Timeline for Repair */}
          <div className="py-4">
            <span className="text-[11px] uppercase font-bold text-slate-500 tracking-wider block mb-4">
              ขั้นตอนการซ่อมแซม (Repair Progress)
            </span>
            <div className="grid grid-cols-4 gap-2 text-center text-xs">
              <div className="space-y-1">
                <div className="w-8 h-8 rounded-full bg-amber-400 text-slate-950 font-black flex items-center justify-center mx-auto text-xs shadow-md">
                  ✓
                </div>
                <p className="font-bold text-white">แจ้งซ่อม</p>
                <p className="text-[10px] text-slate-500">รับเรื่องเข้าระบบ</p>
              </div>

              <div className="space-y-1">
                <div className="w-8 h-8 rounded-full bg-amber-400 text-slate-950 font-black flex items-center justify-center mx-auto text-xs shadow-md">
                  ✓
                </div>
                <p className="font-bold text-white">ตรวจเช็คอาการ</p>
                <p className="text-[10px] text-slate-500">วินิจฉัยปัญหา</p>
              </div>

              <div className="space-y-1">
                <div className={`w-8 h-8 rounded-full flex items-center justify-center mx-auto text-xs font-black ${
                  selectedRepair.status === 'in_repair' || selectedRepair.status === 'ready_for_pickup' || selectedRepair.status === 'closed'
                    ? 'bg-amber-400 text-slate-950 shadow-md'
                    : 'bg-slate-800 text-slate-500'
                }`}>
                  {selectedRepair.status === 'ready_for_pickup' || selectedRepair.status === 'closed' ? '✓' : '3'}
                </div>
                <p className="font-bold text-white">กำลังซ่อมแซม</p>
                <p className="text-[10px] text-slate-500">เปลี่ยนอะไหล่/ตั้งค่า</p>
              </div>

              <div className="space-y-1">
                <div className={`w-8 h-8 rounded-full flex items-center justify-center mx-auto text-xs font-black ${
                  selectedRepair.status === 'ready_for_pickup' || selectedRepair.status === 'closed'
                    ? 'bg-emerald-500 text-slate-950 shadow-md'
                    : 'bg-slate-800 text-slate-500'
                }`}>
                  {selectedRepair.status === 'ready_for_pickup' || selectedRepair.status === 'closed' ? '✓' : '4'}
                </div>
                <p className={`font-bold ${selectedRepair.status === 'ready_for_pickup' ? 'text-emerald-400' : 'text-slate-500'}`}>
                  พร้อมส่งมอบคืน
                </p>
                <p className="text-[10px] text-slate-500">ทดสอบผ่านแล้ว</p>
              </div>
            </div>
          </div>

          {/* Details Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs bg-slate-950 p-4 rounded-2xl border border-slate-800 text-slate-300">
            <div>
              <span className="text-slate-500 font-bold block mb-1">ข้อมูลผู้แจ้ง:</span>
              <p><span className="text-slate-400">ผู้แจ้ง:</span> {selectedRepair.contactName}</p>
              <p><span className="text-slate-400">หน่วยงาน:</span> {selectedRepair.departmentName}</p>
              <p><span className="text-slate-400">สถานที่:</span> {selectedRepair.location}</p>
              <p><span className="text-slate-400">เบอร์โทร:</span> {selectedRepair.phone}</p>
            </div>
            <div>
              <span className="text-slate-500 font-bold block mb-1">ผลการตรวจสอบของช่าง:</span>
              <p className="text-amber-300 bg-slate-900 p-2.5 rounded-lg border border-slate-800">
                {selectedRepair.technicianNotes || 'ช่างกำลังรับเครื่องและดำเนินการทดสอบ'}
              </p>
            </div>
          </div>
        </div>
      )}

      {!selectedBorrow && !selectedRepair && (
        <div className="py-16 text-center text-slate-500 bg-slate-900/50 rounded-3xl border border-slate-800">
          <Search className="w-10 h-10 mx-auto text-slate-600 mb-2" />
          <p className="text-sm font-semibold text-slate-300">ไม่พบข้อมูลคำขอที่ค้นหา</p>
          <p className="text-xs text-slate-500 mt-0.5">กรุณาตรวจสอบหมายเลขคำขอ หรือคลิกเลือกจากรายการด้านบน</p>
        </div>
      )}
    </div>
  );
}

export default function TrackingPage() {
  return (
    <Suspense fallback={<div className="p-10 text-center text-xs text-slate-400">กำลังโหลดระบบติดตามสถานะ...</div>}>
      <TrackingContent />
    </Suspense>
  );
}
