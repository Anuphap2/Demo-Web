'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { mockStore } from '@/lib/mockStore';
import { RepairCategory, RepairUrgency } from '@/types';
import { Wrench, ArrowLeft, AlertTriangle, CheckCircle2, ShieldAlert } from 'lucide-react';

export default function RepairTicketPage() {
  const router = useRouter();

  const [deviceType, setDeviceType] = useState('คอมพิวเตอร์ตั้งโต๊ะ (PC)');
  const [assetNumber, setAssetNumber] = useState('');
  const [issueTitle, setIssueTitle] = useState('');
  const [issueDetails, setIssueDetails] = useState('');
  const [category, setCategory] = useState<RepairCategory>('Hardware');
  const [urgency, setUrgency] = useState<RepairUrgency>('medium');
  const [departmentName, setDepartmentName] = useState('ภาควิชาวิทยาการคอมพิวเตอร์');
  const [location, setLocation] = useState('อาคาร 40 ปี ชั้น 3 ห้อง 305');
  const [contactName, setContactName] = useState('นายอานุภาพ ศรเทียน');
  const [phone, setPhone] = useState('085-035-2548');
  const [email, setEmail] = useState('anuphap.240348@gmail.com');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const ticket = mockStore.addRepair({
      deviceType,
      assetNumber: assetNumber || 'ไม่ระบุ/อุปกรณ์ส่วนกลาง',
      issueTitle,
      issueDetails,
      category,
      urgency,
      departmentName,
      location,
      contactName,
      phone,
      email,
      status: 'submitted',
    });

    alert(`บันทึกคำขอแจ้งซ่อมสำเร็จ! หมายเลขงานแจ้งซ่อมของคุณคือ: ${ticket.ticketNo}`);
    router.push(`/tracking?q=${ticket.ticketNo}`);
  };

  return (
    <div className="space-y-6 max-w-3xl mx-auto">
      <div className="flex items-center gap-2">
        <Link href="/" className="text-slate-400 hover:text-white transition-colors">
          <ArrowLeft className="w-4 h-4" />
        </Link>
        <div>
          <h1 className="text-2xl font-black text-white tracking-tight flex items-center gap-2">
            <Wrench className="w-6 h-6 text-amber-400" />
            <span>แจ้งซ่อมคอมพิวเตอร์ & อุปกรณ์ไอที (IT Helpdesk)</span>
          </h1>
          <p className="text-xs text-slate-400 mt-0.5">
            กรอกรายละเอียดอาการขัดข้อง เพื่อให้ทีมช่างเทคนิคศูนย์คอมพิวเตอร์เข้าดำเนินการตรวจเช็คและซ่อมแซม
          </p>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="p-6 rounded-2xl bg-slate-900 border border-slate-800 shadow-xl space-y-4 text-xs text-slate-200">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-slate-300 font-bold mb-1">ประเภทอุปกรณ์ที่ชำรุด</label>
            <select
              value={deviceType}
              onChange={(e) => setDeviceType(e.target.value)}
              className="w-full bg-slate-950 border border-slate-800 rounded-lg p-2.5 text-white focus:outline-none focus:border-amber-400"
              required
            >
              <option value="คอมพิวเตอร์ตั้งโต๊ะ (PC)">คอมพิวเตอร์ตั้งโต๊ะ (PC Desktop)</option>
              <option value="โน้ตบุ๊ก (Notebook/Laptop)">โน้ตบุ๊ก (Notebook/Laptop)</option>
              <option value="เครื่องพิมพ์ (Printer/Scanner)">เครื่องพิมพ์ (Printer/Scanner)</option>
              <option value="จอแสดงผล (Monitor/Projector)">จอแสดงผล (Monitor/Projector)</option>
              <option value="ระบบเครือข่าย (Network/Wi-Fi)">ระบบเครือข่าย (Network/Wi-Fi)</option>
              <option value="ซอฟต์แวร์/ระบบปฏิบัติการ">ซอฟต์แวร์/ระบบปฏิบัติการ (Software/OS)</option>
            </select>
          </div>

          <div>
            <label className="block text-slate-300 font-bold mb-1">หมายเลขครุภัณฑ์ (Asset Tag) ถ้ามี</label>
            <input
              type="text"
              placeholder="เช่น COM-PC-2565-088"
              value={assetNumber}
              onChange={(e) => setAssetNumber(e.target.value)}
              className="w-full bg-slate-950 border border-slate-800 rounded-lg p-2.5 text-white focus:outline-none focus:border-amber-400"
            />
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-slate-300 font-bold mb-1">หมวดหมู่ปัญหา</label>
            <div className="grid grid-cols-2 gap-2">
              {(['Hardware', 'Software', 'Network', 'Printer'] as RepairCategory[]).map((cat) => (
                <button
                  key={cat}
                  type="button"
                  onClick={() => setCategory(cat)}
                  className={`py-2 rounded-lg font-bold border transition-colors ${
                    category === cat
                      ? 'bg-amber-400 text-slate-950 border-amber-400'
                      : 'bg-slate-950 text-slate-400 border-slate-800 hover:text-white'
                  }`}
                >
                  {cat === 'Hardware' ? 'ฮาร์ดแวร์' : cat === 'Software' ? 'ซอฟต์แวร์' : cat === 'Network' ? 'ระบบเน็ตเวิร์ก' : 'เครื่องพิมพ์'}
                </button>
              ))}
            </div>
          </div>

          <div>
            <label className="block text-slate-300 font-bold mb-1">ระดับความเร่งด่วน</label>
            <select
              value={urgency}
              onChange={(e) => setUrgency(e.target.value as RepairUrgency)}
              className="w-full bg-slate-950 border border-slate-800 rounded-lg p-2.5 text-white focus:outline-none focus:border-amber-400"
            >
              <option value="low">ระดับปกติ (ดำเนินการภายใน 48 ชม.)</option>
              <option value="medium">ระดับปานกลาง (ดำเนินการภายใน 24 ชม.)</option>
              <option value="high">ระดับด่วน (ส่งผลกระทบต่องานสอน/งานบริการ)</option>
              <option value="critical">ระดับฉุกเฉินสูงสุด (ระบบหยุดชะงักทั้งหมด)</option>
            </select>
          </div>
        </div>

        <div>
          <label className="block text-slate-300 font-bold mb-1">หัวข้ออาการเสีย / ปัญหาที่พบ</label>
          <input
            type="text"
            required
            placeholder="เช่น เครื่องเปิดติดแต่ไม่ขึ้นภาพ, อินเทอร์เน็ตหลุดบ่อย, ปริ้นไม่ออก"
            value={issueTitle}
            onChange={(e) => setIssueTitle(e.target.value)}
            className="w-full bg-slate-950 border border-slate-800 rounded-lg p-2.5 text-white focus:outline-none focus:border-amber-400"
          />
        </div>

        <div>
          <label className="block text-slate-300 font-bold mb-1">รายละเอียดเพิ่มเติมของอาการ</label>
          <textarea
            rows={3}
            required
            placeholder="เล่ารายละเอียด เช่น เกิดขึ้นเมื่อไหร่ มีเสียงหรือข้อความแจ้งเตือน Error Code อะไรบ้าง"
            value={issueDetails}
            onChange={(e) => setIssueDetails(e.target.value)}
            className="w-full bg-slate-950 border border-slate-800 rounded-lg p-2.5 text-white focus:outline-none focus:border-amber-400"
          />
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2 border-t border-slate-800">
          <div>
            <label className="block text-slate-300 font-bold mb-1">คณะ / หน่วยงาน</label>
            <input
              type="text"
              required
              value={departmentName}
              onChange={(e) => setDepartmentName(e.target.value)}
              className="w-full bg-slate-950 border border-slate-800 rounded-lg p-2 text-white"
            />
          </div>

          <div>
            <label className="block text-slate-300 font-bold mb-1">สถานที่ตั้งอุปกรณ์ (อาคาร / ชั้น / ห้อง)</label>
            <input
              type="text"
              required
              value={location}
              onChange={(e) => setLocation(e.target.value)}
              className="w-full bg-slate-950 border border-slate-800 rounded-lg p-2 text-white"
            />
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
          <div>
            <label className="block text-slate-300 font-bold mb-1">ชื่อผู้แจ้ง</label>
            <input
              type="text"
              required
              value={contactName}
              onChange={(e) => setContactName(e.target.value)}
              className="w-full bg-slate-950 border border-slate-800 rounded-lg p-2 text-white"
            />
          </div>
          <div>
            <label className="block text-slate-300 font-bold mb-1">เบอร์โทรศัพท์</label>
            <input
              type="text"
              required
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              className="w-full bg-slate-950 border border-slate-800 rounded-lg p-2 text-white"
            />
          </div>
          <div>
            <label className="block text-slate-300 font-bold mb-1">อีเมล</label>
            <input
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full bg-slate-950 border border-slate-800 rounded-lg p-2 text-white"
            />
          </div>
        </div>

        <div className="pt-3 flex justify-end gap-2">
          <Link
            href="/"
            className="px-4 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 font-semibold"
          >
            ยกเลิก
          </Link>
          <button
            type="submit"
            className="px-6 py-2.5 rounded-xl bg-amber-400 hover:bg-amber-300 text-slate-950 font-bold shadow-md transition-all hover:scale-[1.02]"
          >
            ส่งใบแจ้งซ่อม
          </button>
        </div>
      </form>
    </div>
  );
}
