'use client';

import { useState, useEffect, Suspense } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';
import { mockStore } from '@/lib/mockStore';
import { Device } from '@/types';
import { Laptop, ArrowLeft, Search, Plus, CheckCircle2, Clock, AlertTriangle, X } from 'lucide-react';

function BorrowContent() {
  const router = useRouter();
  const searchParams = useSearchParams();

  const [devices, setDevices] = useState<Device[]>([]);
  const [search, setSearch] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('all');
  
  // Modal State
  const [selectedDevice, setSelectedDevice] = useState<Device | null>(null);
  const [borrowerName, setBorrowerName] = useState('นายสมชาย ตัวอย่างดี');
  const [studentId, setStudentId] = useState('DEMO-STD-889');
  const [departmentName, setDepartmentName] = useState('สาขาเทคโนโลยีสารสนเทศ (ตัวอย่าง)');
  const [phone, setPhone] = useState('080-000-0002');
  const [email, setEmail] = useState('somchai.demo@example.ac.th');
  const [borrowDate, setBorrowDate] = useState(new Date().toISOString().split('T')[0]);
  const [returnDueDate, setReturnDueDate] = useState(new Date(Date.now() + 4 * 86400000).toISOString().split('T')[0]);
  const [purpose, setPurpose] = useState('');

  useEffect(() => {
    const list = mockStore.getDevices();
    setDevices(list);

    const devParam = searchParams.get('device');
    if (devParam) {
      const dev = list.find(d => d.id === devParam);
      if (dev && dev.status === 'available') setSelectedDevice(dev);
    }
  }, [searchParams]);

  const handleOpenBorrow = (dev: Device) => {
    setSelectedDevice(dev);
  };

  const handleSubmitBorrow = (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedDevice) return;

    mockStore.addBorrow({
      deviceId: selectedDevice.id,
      deviceName: selectedDevice.name,
      assetNumber: selectedDevice.assetNumber,
      borrowerName,
      studentId,
      departmentId: 'dept-1',
      departmentName,
      phone,
      email,
      borrowDate,
      returnDueDate,
      purpose: purpose || 'นำไปใช้สำหรับการเรียนการสอนและกิจกรรมของคณะ',
      status: 'active',
      officerName: 'เจ้าหน้าที่ศูนย์คอมพิวเตอร์',
    });

    alert('บันทึกการขอยืมอุปกรณ์เรียบร้อยแล้ว! สามารถรับอุปกรณ์ได้ที่เคาน์เตอร์ศูนย์คอมพิวเตอร์');
    setSelectedDevice(null);
    router.push('/tracking');
  };

  const categories = ['all', 'Notebook', 'Projector', 'Adapter', 'Tablet', 'Monitor', 'Peripherals'];

  const filtered = devices.filter(d => {
    const matchesSearch = d.name.toLowerCase().includes(search.toLowerCase()) || d.assetNumber.toLowerCase().includes(search.toLowerCase());
    const matchesCat = categoryFilter === 'all' || d.category === categoryFilter;
    return matchesSearch && matchesCat;
  });

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <Link href="/" className="text-slate-400 hover:text-white transition-colors">
              <ArrowLeft className="w-4 h-4" />
            </Link>
            <h1 className="text-2xl font-black text-white tracking-tight flex items-center gap-2">
              <Laptop className="w-6 h-6 text-cyan-400" />
              <span>ยืมอุปกรณ์คอมพิวเตอร์ออนไลน์ (Equipment Loan)</span>
            </h1>
          </div>
          <p className="text-xs text-slate-400 mt-1">
            เลือกอุปกรณ์ที่พร้อมใช้งาน ระบุวัตถุประสงค์ และบันทึกคำขอยืมเพื่อรับอุปกรณ์
          </p>
        </div>
      </div>

      {/* Filter and Search Bar */}
      <div className="p-4 rounded-xl bg-slate-900 border border-slate-800 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div className="relative flex-1 max-w-md">
          <Search className="w-4 h-4 text-slate-500 absolute left-3 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            placeholder="ค้นหาตามชื่ออุปกรณ์ หรือหมายเลขครุภัณฑ์..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full pl-9 pr-4 py-2 bg-slate-950 border border-slate-800 rounded-lg text-xs text-slate-200 placeholder-slate-500 focus:outline-none focus:border-cyan-400"
          />
        </div>

        <div className="flex items-center gap-1.5 overflow-x-auto text-xs">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setCategoryFilter(cat)}
              className={`px-3 py-1.5 rounded-lg whitespace-nowrap font-medium transition-colors ${
                categoryFilter === cat
                  ? 'bg-cyan-500 text-slate-950 font-bold'
                  : 'text-slate-400 hover:text-white hover:bg-slate-800'
              }`}
            >
              {cat === 'all' ? 'ทั้งหมด' : cat}
            </button>
          ))}
        </div>
      </div>

      {/* Devices Catalog Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {filtered.map((dev) => {
          const isAvail = dev.status === 'available';
          return (
            <div
              key={dev.id}
              className="rounded-2xl bg-slate-900/90 border border-slate-800 overflow-hidden shadow-lg flex flex-col justify-between group hover:border-slate-700 transition-all"
            >
              <div>
                <div className="relative h-44 w-full bg-slate-950 p-4 flex items-center justify-center">
                  <Image
                    src={dev.img}
                    alt={dev.name}
                    width={180}
                    height={120}
                    className="object-contain max-h-36 group-hover:scale-105 transition-transform"
                  />
                  <div className="absolute top-3 right-3">
                    <span className={`px-2.5 py-0.5 rounded-full text-[10px] font-bold border ${
                      isAvail
                        ? 'bg-emerald-500/10 text-emerald-400 border-emerald-500/30'
                        : 'bg-amber-500/10 text-amber-400 border-amber-500/30'
                    }`}>
                      {isAvail ? '● พร้อมให้ยืม' : '● กำลังถูกยืม'}
                    </span>
                  </div>
                </div>

                <div className="p-5 space-y-2 text-xs">
                  <span className="font-mono text-[10px] text-cyan-400 bg-cyan-500/10 px-2 py-0.5 rounded border border-cyan-500/20 font-bold">
                    {dev.assetNumber}
                  </span>
                  <h2 className="text-sm font-bold text-white leading-snug">{dev.name}</h2>
                  <p className="text-slate-400 text-[11px] leading-relaxed">{dev.specs}</p>
                </div>
              </div>

              <div className="p-5 pt-0">
                <button
                  disabled={!isAvail}
                  onClick={() => handleOpenBorrow(dev)}
                  className={`w-full py-2.5 px-4 rounded-xl font-bold text-xs flex items-center justify-center gap-1.5 transition-all ${
                    isAvail
                      ? 'bg-cyan-500 hover:bg-cyan-400 text-slate-950 shadow-md hover:scale-[1.02]'
                      : 'bg-slate-800 text-slate-500 cursor-not-allowed'
                  }`}
                >
                  <Laptop className="w-3.5 h-3.5" />
                  <span>{isAvail ? 'ทำรายการขอยืม' : 'ไม่ว่าง (ติดยืม)'}</span>
                </button>
              </div>
            </div>
          );
        })}
      </div>

      {/* Borrow Request Modal */}
      {selectedDevice && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm">
          <div className="bg-slate-900 border border-slate-700 rounded-2xl w-full max-w-lg max-h-[90vh] overflow-y-auto p-6 space-y-4 text-xs text-slate-200 shadow-2xl">
            <div className="flex items-center justify-between border-b border-slate-800 pb-3">
              <h2 className="text-base font-bold text-white flex items-center gap-2">
                <Laptop className="w-5 h-5 text-cyan-400" />
                <span>แบบฟอร์มขอยืมอุปกรณ์ไอที</span>
              </h2>
              <button onClick={() => setSelectedDevice(null)} className="text-slate-400 hover:text-white">
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="p-3 bg-slate-950 rounded-xl border border-slate-800 space-y-1">
              <span className="text-[10px] uppercase font-bold text-cyan-400 font-mono">
                {selectedDevice.assetNumber}
              </span>
              <h3 className="font-bold text-white text-sm">{selectedDevice.name}</h3>
              <p className="text-[11px] text-slate-400">{selectedDevice.specs}</p>
            </div>

            <form onSubmit={handleSubmitBorrow} className="space-y-3">
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-slate-400 mb-1">ชื่อ-นามสกุล ผู้ยืม</label>
                  <input
                    type="text"
                    required
                    value={borrowerName}
                    onChange={(e) => setBorrowerName(e.target.value)}
                    className="w-full bg-slate-950 border border-slate-800 rounded p-2 text-white"
                  />
                </div>
                <div>
                  <label className="block text-slate-400 mb-1">รหัสนักศึกษา / บุคลากร</label>
                  <input
                    type="text"
                    required
                    value={studentId}
                    onChange={(e) => setStudentId(e.target.value)}
                    className="w-full bg-slate-950 border border-slate-800 rounded p-2 text-white"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-slate-400 mb-1">คณะ / แผนกวิชา</label>
                  <input
                    type="text"
                    required
                    value={departmentName}
                    onChange={(e) => setDepartmentName(e.target.value)}
                    className="w-full bg-slate-950 border border-slate-800 rounded p-2 text-white"
                  />
                </div>
                <div>
                  <label className="block text-slate-400 mb-1">เบอร์โทรศัพท์ติดต่อ</label>
                  <input
                    type="text"
                    required
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    className="w-full bg-slate-950 border border-slate-800 rounded p-2 text-white"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-slate-400 mb-1">วันที่ยืม</label>
                  <input
                    type="date"
                    required
                    value={borrowDate}
                    onChange={(e) => setBorrowDate(e.target.value)}
                    className="w-full bg-slate-950 border border-slate-800 rounded p-2 text-white"
                  />
                </div>
                <div>
                  <label className="block text-slate-400 mb-1">กำหนดส่งคืนอุปกรณ์</label>
                  <input
                    type="date"
                    required
                    value={returnDueDate}
                    onChange={(e) => setReturnDueDate(e.target.value)}
                    className="w-full bg-slate-950 border border-slate-800 rounded p-2 text-white"
                  />
                </div>
              </div>

              <div>
                <label className="block text-slate-400 mb-1">วัตถุประสงค์ในการยืมใช้งาน</label>
                <textarea
                  rows={2}
                  required
                  placeholder="เช่น นำไปใช้จัดสัมมนาวิชาการ ณ ห้องประชุมสุเทพ"
                  value={purpose}
                  onChange={(e) => setPurpose(e.target.value)}
                  className="w-full bg-slate-950 border border-slate-800 rounded p-2 text-white"
                />
              </div>

              <div className="p-3 bg-slate-950/60 rounded border border-slate-800 text-[11px] text-slate-400 space-y-1">
                <span className="font-bold text-slate-300">เงื่อนไขการยืม:</span>
                <p>1. ผู้ยืมต้องดูแลรักษาอุปกรณ์ให้อยู่ในสภาพสมบูรณ์</p>
                <p>2. ส่งคืนอุปกรณ์ตามกำหนดเวลา ณ เคาน์เตอร์ศูนย์คอมพิวเตอร์</p>
              </div>

              <div className="flex justify-end gap-2 pt-2">
                <button
                  type="button"
                  onClick={() => setSelectedDevice(null)}
                  className="px-4 py-2 bg-slate-800 rounded text-slate-300"
                >
                  ยกเลิก
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 bg-cyan-500 rounded text-slate-950 font-bold hover:bg-cyan-400 shadow"
                >
                  ยืนยันการยืมอุปกรณ์
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

export default function BorrowPage() {
  return (
    <Suspense fallback={<div className="p-10 text-center text-xs text-slate-400">กำลังโหลดรายการอุปกรณ์...</div>}>
      <BorrowContent />
    </Suspense>
  );
}
