'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { mockStore } from '@/lib/mockStore';
import { BorrowTicket, RepairTicket, Device } from '@/types';
import { 
  ShieldCheck, 
  Laptop, 
  Wrench, 
  Boxes, 
  CheckCircle2, 
  AlertTriangle, 
  Download, 
  ArrowLeft,
  X,
  Plus
} from 'lucide-react';

export default function AdminPage() {
  const [borrows, setBorrows] = useState<BorrowTicket[]>([]);
  const [repairs, setRepairs] = useState<RepairTicket[]>([]);
  const [devices, setDevices] = useState<Device[]>([]);
  
  // Tab
  const [activeTab, setActiveTab] = useState<'loans' | 'repairs' | 'inventory'>('loans');

  // Repair note update modal
  const [editingRepair, setEditingRepair] = useState<RepairTicket | null>(null);
  const [techNote, setTechNote] = useState('');
  const [repairStatus, setRepairStatus] = useState<RepairTicket['status']>('in_repair');

  // Add Device modal
  const [isAddDeviceOpen, setIsAddDeviceOpen] = useState(false);
  const [devName, setDevName] = useState('');
  const [devAsset, setDevAsset] = useState('');
  const [devCat, setDevCat] = useState<Device['category']>('Notebook');
  const [devSpecs, setDevSpecs] = useState('');

  useEffect(() => {
    refresh();
  }, []);

  const refresh = () => {
    setBorrows(mockStore.getBorrows());
    setRepairs(mockStore.getRepairs());
    setDevices(mockStore.getDevices());
  };

  const handleReturnCheckin = (id: string) => {
    if (confirm('ยืนยันการรับคืนอุปกรณ์และตรวจเช็คสภาพความเรียบร้อย?')) {
      mockStore.updateBorrowStatus(id, 'returned');
      alert('บันทึกการรับคืนอุปกรณ์เรียบร้อย อุปกรณ์พร้อมให้ผู้ใช้อื่นยืมต่อทันที');
      refresh();
    }
  };

  const handleOpenEditRepair = (r: RepairTicket) => {
    setEditingRepair(r);
    setTechNote(r.technicianNotes || '');
    setRepairStatus(r.status);
  };

  const handleSaveRepair = (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingRepair) return;
    mockStore.updateRepairStatus(editingRepair.id, repairStatus, techNote);
    setEditingRepair(null);
    alert('อัปเดตสถานะงานซ่อมเรียบร้อยแล้ว');
    refresh();
  };

  const handleAddDevice = (e: React.FormEvent) => {
    e.preventDefault();
    const newDev: Device = {
      id: `dev-${Date.now()}`,
      name: devName,
      assetNumber: devAsset || `COM-AST-${Date.now().toString().slice(-4)}`,
      category: devCat,
      specs: devSpecs,
      status: 'available',
      img: '/images/24242.png',
    };
    const next = [...devices, newDev];
    mockStore.saveDevices(next);
    setIsAddDeviceOpen(false);
    setDevName('');
    setDevAsset('');
    setDevSpecs('');
    alert('เพิ่มอุปกรณ์เข้าคลังเรียบร้อยแล้ว');
    refresh();
  };

  const handleExportCSV = () => {
    const headers = 'TicketNo,Type,Device,Person,Department,Date,Status\n';
    const loanRows = borrows.map(b => `${b.ticketNo},Loan,"${b.deviceName}","${b.borrowerName}","${b.departmentName}",${b.borrowDate},${b.status}`);
    const repairRows = repairs.map(r => `${r.ticketNo},Repair,"${r.deviceType}","${r.contactName}","${r.departmentName}",${r.createdAt.split('T')[0]},${r.status}`);
    const blob = new Blob([[headers, ...loanRows, ...repairRows].join('\n')], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `IT_Service_Report_${new Date().toISOString().split('T')[0]}.csv`;
    a.click();
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
              <ShieldCheck className="w-6 h-6 text-cyan-400" />
              <span>แผงควบคุมเจ้าหน้าที่ไอที (IT Officer & Admin Console)</span>
            </h1>
          </div>
          <p className="text-xs text-slate-400 mt-1">
            จัดการรายการยืม-คืน ตรวจรับอุปกรณ์ คิวงานซ่อมแซม และบริหารคลังครุภัณฑ์
          </p>
        </div>

        <button
          onClick={handleExportCSV}
          className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-slate-900 hover:bg-slate-800 text-slate-200 border border-slate-700 text-xs font-bold transition-all shadow-md self-start sm:self-auto"
        >
          <Download className="w-4 h-4 text-cyan-400" />
          <span>ส่งออกรายงานบริการ (Export CSV)</span>
        </button>
      </div>

      {/* Tabs */}
      <div className="flex border-b border-slate-800 text-xs font-bold gap-2">
        <button
          onClick={() => setActiveTab('loans')}
          className={`flex items-center gap-2 py-3 px-4 border-b-2 transition-colors ${
            activeTab === 'loans'
              ? 'border-cyan-400 text-cyan-400'
              : 'border-transparent text-slate-400 hover:text-white'
          }`}
        >
          <Laptop className="w-4 h-4" />
          <span>ทะเบียนการยืม-คืน ({borrows.length})</span>
        </button>
        <button
          onClick={() => setActiveTab('repairs')}
          className={`flex items-center gap-2 py-3 px-4 border-b-2 transition-colors ${
            activeTab === 'repairs'
              ? 'border-amber-400 text-amber-400'
              : 'border-transparent text-slate-400 hover:text-white'
          }`}
        >
          <Wrench className="w-4 h-4" />
          <span>คิวงานแจ้งซ่อม ({repairs.length})</span>
        </button>
        <button
          onClick={() => setActiveTab('inventory')}
          className={`flex items-center gap-2 py-3 px-4 border-b-2 transition-colors ${
            activeTab === 'inventory'
              ? 'border-emerald-400 text-emerald-400'
              : 'border-transparent text-slate-400 hover:text-white'
          }`}
        >
          <Boxes className="w-4 h-4" />
          <span>ทะเบียนครุภัณฑ์ ({devices.length})</span>
        </button>
      </div>

      {/* Tab 1: Loans */}
      {activeTab === 'loans' && (
        <div className="rounded-2xl bg-slate-900/90 border border-slate-800 overflow-hidden shadow-xl">
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead className="bg-slate-950/80 text-slate-400 uppercase text-[10px] tracking-wider border-b border-slate-800">
                <tr>
                  <th className="py-3.5 px-4">เลขที่ใบยืม</th>
                  <th className="py-3.5 px-4">อุปกรณ์ / ครุภัณฑ์</th>
                  <th className="py-3.5 px-4">ผู้ยืม / แผนก</th>
                  <th className="py-3.5 px-4">กำหนดคืน</th>
                  <th className="py-3.5 px-4 text-center">สถานะ</th>
                  <th className="py-3.5 px-4 text-right">การจัดการ</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800/60 font-medium">
                {borrows.map((b) => (
                  <tr key={b.id} className="hover:bg-slate-800/40">
                    <td className="py-3.5 px-4 font-mono font-bold text-cyan-400">{b.ticketNo}</td>
                    <td className="py-3.5 px-4">
                      <div className="font-semibold text-white">{b.deviceName}</div>
                      <div className="text-[10px] text-slate-500 font-mono">{b.assetNumber}</div>
                    </td>
                    <td className="py-3.5 px-4">
                      <div className="text-slate-200">{b.borrowerName}</div>
                      <div className="text-[10px] text-slate-500">{b.departmentName} ({b.phone})</div>
                    </td>
                    <td className="py-3.5 px-4 text-slate-300">
                      <div>{b.returnDueDate}</div>
                      {b.actualReturnDate && (
                        <div className="text-[10px] text-emerald-400">คืนเมื่อ: {b.actualReturnDate}</div>
                      )}
                    </td>
                    <td className="py-3.5 px-4 text-center">
                      <span className={`px-2.5 py-0.5 rounded-full text-[10px] font-bold border ${
                        b.status === 'returned'
                          ? 'bg-emerald-500/10 text-emerald-400 border-emerald-500/30'
                          : 'bg-blue-500/10 text-blue-400 border-blue-500/30'
                      }`}>
                        {b.status === 'returned' ? 'คืนแล้ว' : 'กำลังยืม'}
                      </span>
                    </td>
                    <td className="py-3.5 px-4 text-right">
                      {b.status !== 'returned' && (
                        <button
                          onClick={() => handleReturnCheckin(b.id)}
                          className="px-3 py-1.5 rounded-lg bg-emerald-500 text-slate-950 font-bold text-xs hover:bg-emerald-400 transition-colors"
                        >
                          รับคืนอุปกรณ์
                        </button>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Tab 2: Repairs */}
      {activeTab === 'repairs' && (
        <div className="rounded-2xl bg-slate-900/90 border border-slate-800 overflow-hidden shadow-xl">
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead className="bg-slate-950/80 text-slate-400 uppercase text-[10px] tracking-wider border-b border-slate-800">
                <tr>
                  <th className="py-3.5 px-4">เลขที่แจ้งซ่อม</th>
                  <th className="py-3.5 px-4">อุปกรณ์</th>
                  <th className="py-3.5 px-4">อาการเสีย</th>
                  <th className="py-3.5 px-4">ผู้แจ้ง / สถานที่</th>
                  <th className="py-3.5 px-4 text-center">ระดับความเร่งด่วน</th>
                  <th className="py-3.5 px-4 text-center">สถานะงาน</th>
                  <th className="py-3.5 px-4 text-right">การจัดการ</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800/60 font-medium">
                {repairs.map((r) => (
                  <tr key={r.id} className="hover:bg-slate-800/40">
                    <td className="py-3.5 px-4 font-mono font-bold text-amber-400">{r.ticketNo}</td>
                    <td className="py-3.5 px-4 font-semibold text-white">{r.deviceType}</td>
                    <td className="py-3.5 px-4 text-slate-300 max-w-xs truncate">{r.issueTitle}</td>
                    <td className="py-3.5 px-4 text-slate-400">
                      <div>{r.contactName} ({r.phone})</div>
                      <div className="text-[10px] text-slate-500">{r.location}</div>
                    </td>
                    <td className="py-3.5 px-4 text-center">
                      <span className={`px-2 py-0.5 rounded text-[10px] font-bold ${
                        r.urgency === 'critical' ? 'bg-rose-500/20 text-rose-400 border border-rose-500/30' :
                        r.urgency === 'high' ? 'bg-orange-500/20 text-orange-400 border border-orange-500/30' :
                        'bg-slate-800 text-slate-400'
                      }`}>
                        {r.urgency.toUpperCase()}
                      </span>
                    </td>
                    <td className="py-3.5 px-4 text-center">
                      <span className={`px-2.5 py-0.5 rounded-full text-[10px] font-bold border ${
                        r.status === 'ready_for_pickup' ? 'bg-emerald-500/10 text-emerald-400 border-emerald-500/30' :
                        r.status === 'in_repair' ? 'bg-amber-500/10 text-amber-400 border-amber-500/30' :
                        'bg-blue-500/10 text-blue-400 border-blue-500/30'
                      }`}>
                        {r.status === 'ready_for_pickup' ? 'พร้อมรับคืน' : r.status === 'in_repair' ? 'กำลังซ่อม' : 'รับเรื่องแล้ว'}
                      </span>
                    </td>
                    <td className="py-3.5 px-4 text-right">
                      <button
                        onClick={() => handleOpenEditRepair(r)}
                        className="px-3 py-1.5 rounded-lg bg-amber-400 text-slate-950 font-bold text-xs hover:bg-amber-300 transition-colors"
                      >
                        บันทึกงานช่าง
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Tab 3: Inventory */}
      {activeTab === 'inventory' && (
        <div className="space-y-4">
          <div className="flex justify-end">
            <button
              onClick={() => setIsAddDeviceOpen(true)}
              className="flex items-center gap-1.5 px-4 py-2 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold text-xs shadow-md"
            >
              <Plus className="w-4 h-4" />
              <span>ลงทะเบียนอุปกรณ์ใหม่</span>
            </button>
          </div>

          <div className="rounded-2xl bg-slate-900/90 border border-slate-800 overflow-hidden shadow-xl">
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs">
                <thead className="bg-slate-950/80 text-slate-400 uppercase text-[10px] tracking-wider border-b border-slate-800">
                  <tr>
                    <th className="py-3.5 px-4">หมายเลขครุภัณฑ์</th>
                    <th className="py-3.5 px-4">ชื่ออุปกรณ์</th>
                    <th className="py-3.5 px-4">หมวดหมู่</th>
                    <th className="py-3.5 px-4">สเปก / รายละเอียด</th>
                    <th className="py-3.5 px-4 text-center">สถานะ</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-800/60 font-medium">
                  {devices.map((d) => (
                    <tr key={d.id} className="hover:bg-slate-800/40">
                      <td className="py-3.5 px-4 font-mono font-bold text-cyan-400">{d.assetNumber}</td>
                      <td className="py-3.5 px-4 font-semibold text-white">{d.name}</td>
                      <td className="py-3.5 px-4 text-slate-400">{d.category}</td>
                      <td className="py-3.5 px-4 text-slate-400 max-w-xs truncate">{d.specs}</td>
                      <td className="py-3.5 px-4 text-center">
                        <span className={`px-2.5 py-0.5 rounded-full text-[10px] font-bold border ${
                          d.status === 'available' ? 'bg-emerald-500/10 text-emerald-400 border-emerald-500/30' :
                          'bg-amber-500/10 text-amber-400 border-amber-500/30'
                        }`}>
                          {d.status === 'available' ? 'พร้อมใช้งาน' : 'ติดภารกิจ/ถูกยืม'}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}

      {/* Edit Repair Note Modal */}
      {editingRepair && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm">
          <div className="bg-slate-900 border border-slate-700 rounded-2xl w-full max-w-md p-6 space-y-4 text-xs text-slate-200 shadow-2xl">
            <div className="flex items-center justify-between border-b border-slate-800 pb-3">
              <h3 className="text-base font-bold text-white flex items-center gap-2">
                <Wrench className="w-5 h-5 text-amber-400" />
                <span>บันทึกความคืบหน้างานช่าง: {editingRepair.ticketNo}</span>
              </h3>
              <button onClick={() => setEditingRepair(null)} className="text-slate-400 hover:text-white">
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSaveRepair} className="space-y-3">
              <div>
                <label className="block text-slate-400 mb-1">สถานะงานซ่อม</label>
                <select
                  value={repairStatus}
                  onChange={(e) => setRepairStatus(e.target.value as RepairTicket['status'])}
                  className="w-full bg-slate-950 border border-slate-800 rounded p-2 text-white"
                >
                  <option value="diagnosing">กำลังวินิจฉัยอาการ</option>
                  <option value="in_repair">กำลังดำเนินการซ่อมแซม/รออะไหล่</option>
                  <option value="ready_for_pickup">ซ่อมเสร็จแล้ว (พร้อมให้ผู้แจ้งรับคืน)</option>
                  <option value="closed">ปิดงานเสร็จสมบูรณ์</option>
                </select>
              </div>

              <div>
                <label className="block text-slate-400 mb-1">บันทึกผลการตรวจสอบและขั้นตอนที่ทำ</label>
                <textarea
                  rows={3}
                  required
                  placeholder="เช่น ทำความสะอาดสล็อตแรม เปลี่ยนสายเคเบิล ทดสอบเปิดใช้งานผ่านเกณฑ์"
                  value={techNote}
                  onChange={(e) => setTechNote(e.target.value)}
                  className="w-full bg-slate-950 border border-slate-800 rounded p-2 text-white"
                />
              </div>

              <div className="flex justify-end gap-2 pt-2">
                <button
                  type="button"
                  onClick={() => setEditingRepair(null)}
                  className="px-4 py-2 bg-slate-800 rounded text-slate-300"
                >
                  ยกเลิก
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 bg-amber-400 text-slate-950 font-bold rounded hover:bg-amber-300"
                >
                  บันทึกผลงานช่าง
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Add Device Modal */}
      {isAddDeviceOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm">
          <div className="bg-slate-900 border border-slate-700 rounded-2xl w-full max-w-md p-6 space-y-4 text-xs text-slate-200 shadow-2xl">
            <div className="flex items-center justify-between border-b border-slate-800 pb-3">
              <h3 className="text-base font-bold text-white flex items-center gap-2">
                <Boxes className="w-5 h-5 text-emerald-400" />
                <span>ลงทะเบียนอุปกรณ์ใหม่เข้าคลัง</span>
              </h3>
              <button onClick={() => setIsAddDeviceOpen(false)} className="text-slate-400 hover:text-white">
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleAddDevice} className="space-y-3">
              <div>
                <label className="block text-slate-400 mb-1">ชื่ออุปกรณ์</label>
                <input
                  type="text"
                  required
                  placeholder="เช่น โน้ตบุ๊ก Asus Zenbook 14 OLED"
                  value={devName}
                  onChange={(e) => setDevName(e.target.value)}
                  className="w-full bg-slate-950 border border-slate-800 rounded p-2 text-white"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-slate-400 mb-1">หมายเลขครุภัณฑ์</label>
                  <input
                    type="text"
                    placeholder="COM-NB-2567-001"
                    value={devAsset}
                    onChange={(e) => setDevAsset(e.target.value)}
                    className="w-full bg-slate-950 border border-slate-800 rounded p-2 text-white font-mono"
                  />
                </div>
                <div>
                  <label className="block text-slate-400 mb-1">หมวดหมู่</label>
                  <select
                    value={devCat}
                    onChange={(e) => setDevCat(e.target.value as Device['category'])}
                    className="w-full bg-slate-950 border border-slate-800 rounded p-2 text-white"
                  >
                    <option value="Notebook">Notebook</option>
                    <option value="Projector">Projector</option>
                    <option value="Adapter">Adapter</option>
                    <option value="Tablet">Tablet</option>
                    <option value="Monitor">Monitor</option>
                    <option value="Peripherals">Peripherals</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-slate-400 mb-1">สเปก / คุณสมบัติ</label>
                <input
                  type="text"
                  required
                  placeholder="เช่น Core Ultra 7, 32GB RAM, 1TB SSD"
                  value={devSpecs}
                  onChange={(e) => setDevSpecs(e.target.value)}
                  className="w-full bg-slate-950 border border-slate-800 rounded p-2 text-white"
                />
              </div>

              <div className="flex justify-end gap-2 pt-2">
                <button
                  type="button"
                  onClick={() => setIsAddDeviceOpen(false)}
                  className="px-4 py-2 bg-slate-800 rounded text-slate-300"
                >
                  ยกเลิก
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 bg-emerald-500 text-slate-950 font-bold rounded hover:bg-emerald-400"
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
