'use client';

import { useState, useEffect, Suspense } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';
import { mockStore } from '@/lib/mockStore';
import { Room, Department } from '@/types';
import { 
  CalendarPlus, 
  ArrowLeft, 
  Clock, 
  Users, 
  Building, 
  AlertTriangle, 
  CheckCircle2, 
  Sparkles 
} from 'lucide-react';

function BookingForm() {
  const router = useRouter();
  const searchParams = useSearchParams();

  const [rooms, setRooms] = useState<Room[]>([]);
  const [departments, setDepartments] = useState<Department[]>([]);

  // Form Fields
  const [roomId, setRoomId] = useState('');
  const [date, setDate] = useState('2026-03-24');
  const [timeSlot, setTimeSlot] = useState('morning');
  const [topic, setTopic] = useState('');
  const [departmentId, setDepartmentId] = useState('');
  const [bookerName, setBookerName] = useState('นายอานุภาพ ศรเทียน');
  const [phone, setPhone] = useState('085-035-2548');
  const [email, setEmail] = useState('anuphap.240348@gmail.com');
  const [attendees, setAttendees] = useState(20);
  const [equipmentNotes, setEquipmentNotes] = useState('');
  const [hasConflict, setHasConflict] = useState(false);

  useEffect(() => {
    const rList = mockStore.getRooms();
    const dList = mockStore.getDepartments();
    setRooms(rList);
    setDepartments(dList);

    const initialRoom = searchParams.get('room') || (rList.length > 0 ? rList[0].id : '');
    const initialDate = searchParams.get('date') || '2026-03-24';
    setRoomId(initialRoom);
    setDate(initialDate);
    if (dList.length > 0) setDepartmentId(dList[0].id);
  }, [searchParams]);

  // Conflict Check
  useEffect(() => {
    if (!roomId || !date) return;
    const existing = mockStore.getBookings();
    const conflict = existing.some(b => 
      b.roomId === roomId && 
      b.date === date && 
      b.status !== 'rejected' &&
      (b.timeSlotName.includes(timeSlot === 'morning' ? 'เช้า' : timeSlot === 'afternoon' ? 'บ่าย' : 'เต็มวัน') || b.timeSlotName.includes('เต็มวัน'))
    );
    setHasConflict(conflict);
  }, [roomId, date, timeSlot]);

  const selectedRoom = rooms.find(r => r.id === roomId);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedRoom) return;
    if (hasConflict) {
      alert('คำเตือน: มีการจองห้องนี้ในช่วงเวลาดังกล่าวแล้ว กรุณาเลือกช่วงเวลาหรือห้องอื่น');
      return;
    }

    const dept = departments.find(d => d.id === departmentId);
    let startTime = '09:00';
    let endTime = '12:00';
    let timeSlotName = 'ช่วงเช้า (09:00 - 12:00 น.)';

    if (timeSlot === 'afternoon') {
      startTime = '13:30';
      endTime = '16:30';
      timeSlotName = 'ช่วงบ่าย (13:30 - 16:30 น.)';
    } else if (timeSlot === 'fullday') {
      startTime = '09:00';
      endTime = '16:30';
      timeSlotName = 'เต็มวัน (09:00 - 16:30 น.)';
    }

    mockStore.addBooking({
      roomId: selectedRoom.id,
      roomName: selectedRoom.name,
      date,
      startTime,
      endTime,
      timeSlotName,
      topic,
      departmentId,
      departmentName: dept ? dept.name : 'ทั่วไป',
      bookerName,
      phone,
      email,
      attendees,
      equipmentNotes,
      status: 'pending',
    });

    alert('ส่งคำขอจองห้องประชุมเรียบร้อยแล้ว! เจ้าหน้าที่จะตรวจสอบและอนุมัติในระบบ');
    router.push('/my-bookings');
  };

  return (
    <div className="space-y-6 max-w-4xl mx-auto">
      <div className="flex items-center gap-2">
        <Link href="/" className="text-slate-400 hover:text-slate-700 transition-colors">
          <ArrowLeft className="w-4 h-4" />
        </Link>
        <div>
          <h1 className="text-2xl font-black text-slate-900 tracking-tight flex items-center gap-2">
            <CalendarPlus className="w-6 h-6 text-indigo-600" />
            <span>ฟอร์มจองห้องประชุมออนไลน์ (Room Reservation)</span>
          </h1>
          <p className="text-xs text-slate-500 mt-0.5">
            กรอกข้อมูลรายละเอียดการประชุมและเลือกสิ่งอำนวยความสะดวกที่ต้องการใช้งาน
          </p>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Form Inputs (2 Cols) */}
        <div className="md:col-span-2 p-6 rounded-2xl bg-white border border-slate-200 shadow-xs space-y-4 text-xs">
          {hasConflict && (
            <div className="p-3 rounded-xl bg-amber-50 border border-amber-200 text-amber-800 flex items-center gap-2">
              <AlertTriangle className="w-5 h-5 text-amber-600 shrink-0" />
              <span>ห้องนี้มีคำขอจองในช่วงเวลาดังกล่าวแล้ว กรุณาตรวจสอบหรือเปลี่ยนช่วงเวลา</span>
            </div>
          )}

          <div>
            <label className="block text-slate-700 font-bold mb-1">เลือกห้องประชุม (Meeting Room)</label>
            <select
              value={roomId}
              onChange={(e) => setRoomId(e.target.value)}
              className="w-full bg-slate-50 border border-slate-300 rounded-lg p-2.5 text-slate-900 focus:outline-none focus:border-indigo-600"
              required
            >
              {rooms.map(r => (
                <option key={r.id} value={r.id}>{r.name} (จุได้ {r.capacity} คน)</option>
              ))}
            </select>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <label className="block text-slate-700 font-bold mb-1">วันที่ต้องการจอง</label>
              <input
                type="date"
                value={date}
                onChange={(e) => setDate(e.target.value)}
                className="w-full bg-slate-50 border border-slate-300 rounded-lg p-2.5 text-slate-900 focus:outline-none focus:border-indigo-600"
                required
              />
            </div>

            <div>
              <label className="block text-slate-700 font-bold mb-1">ช่วงเวลาที่จอง</label>
              <select
                value={timeSlot}
                onChange={(e) => setTimeSlot(e.target.value)}
                className="w-full bg-slate-50 border border-slate-300 rounded-lg p-2.5 text-slate-900 focus:outline-none focus:border-indigo-600"
              >
                <option value="morning">ช่วงเช้า (09:00 - 12:00 น.)</option>
                <option value="afternoon">ช่วงบ่าย (13:30 - 16:30 น.)</option>
                <option value="fullday">เต็มวัน (09:00 - 16:30 น.)</option>
              </select>
            </div>
          </div>

          <div>
            <label className="block text-slate-700 font-bold mb-1">หัวข้อการประชุม / วัตถุประสงค์ (Meeting Topic)</label>
            <input
              type="text"
              required
              placeholder="เช่น ประชุมวางแผนงานโครงการระบบบริหารสารสนเทศ"
              value={topic}
              onChange={(e) => setTopic(e.target.value)}
              className="w-full bg-slate-50 border border-slate-300 rounded-lg p-2.5 text-slate-900 focus:outline-none focus:border-indigo-600"
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <label className="block text-slate-700 font-bold mb-1">หน่วยงาน / แผนก</label>
              <select
                value={departmentId}
                onChange={(e) => setDepartmentId(e.target.value)}
                className="w-full bg-slate-50 border border-slate-300 rounded-lg p-2.5 text-slate-900 focus:outline-none focus:border-indigo-600"
                required
              >
                {departments.map(d => (
                  <option key={d.id} value={d.id}>{d.name}</option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-slate-700 font-bold mb-1">จำนวนผู้เข้าร่วม (คน)</label>
              <input
                type="number"
                min="1"
                max={selectedRoom ? selectedRoom.capacity : 100}
                value={attendees}
                onChange={(e) => setAttendees(Number(e.target.value))}
                className="w-full bg-slate-50 border border-slate-300 rounded-lg p-2.5 text-slate-900 focus:outline-none focus:border-indigo-600 font-mono"
                required
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            <div>
              <label className="block text-slate-700 font-bold mb-1">ชื่อผู้ประสานงาน / ผู้จอง</label>
              <input
                type="text"
                required
                value={bookerName}
                onChange={(e) => setBookerName(e.target.value)}
                className="w-full bg-slate-50 border border-slate-300 rounded-lg p-2.5 text-slate-900"
              />
            </div>
            <div>
              <label className="block text-slate-700 font-bold mb-1">เบอร์โทรศัพท์ติดต่อ</label>
              <input
                type="text"
                required
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                className="w-full bg-slate-50 border border-slate-300 rounded-lg p-2.5 text-slate-900"
              />
            </div>
            <div>
              <label className="block text-slate-700 font-bold mb-1">อีเมล</label>
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full bg-slate-50 border border-slate-300 rounded-lg p-2.5 text-slate-900"
              />
            </div>
          </div>

          <div>
            <label className="block text-slate-700 font-bold mb-1">อุปกรณ์และสิ่งอำนวยความสะดวกพิเศษที่ต้องการ</label>
            <textarea
              rows={2}
              placeholder="เช่น ขอไมโครโฟนไร้สาย 4 ตัว, ปลั๊กพ่วง 4 จุด, หรือการจัดเบรกอาหารว่าง"
              value={equipmentNotes}
              onChange={(e) => setEquipmentNotes(e.target.value)}
              className="w-full bg-slate-50 border border-slate-300 rounded-lg p-2.5 text-slate-900"
            />
          </div>

          <div className="pt-2 flex justify-end gap-2">
            <Link
              href="/"
              className="px-4 py-2.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 font-semibold"
            >
              ยกเลิก
            </Link>
            <button
              type="submit"
              className="px-6 py-2.5 rounded-xl bg-indigo-600 text-white font-bold hover:bg-indigo-700 shadow-md transition-all hover:scale-[1.02]"
            >
              ยืนยันการส่งคำขอจอง
            </button>
          </div>
        </div>

        {/* Room Preview Card (1 Col) */}
        {selectedRoom && (
          <div className="p-5 rounded-2xl bg-white border border-slate-200 shadow-xs space-y-4 self-start">
            <div className="relative h-40 w-full rounded-xl overflow-hidden bg-slate-100">
              <Image
                src={selectedRoom.img}
                alt={selectedRoom.name}
                fill
                className="object-cover"
              />
            </div>

            <div className="space-y-2 text-xs">
              <span className="text-[10px] uppercase font-bold text-indigo-600 bg-indigo-50 px-2 py-0.5 rounded border border-indigo-200">
                ข้อมูลห้องที่เลือก
              </span>
              <h3 className="font-bold text-slate-900 text-sm">{selectedRoom.name}</h3>
              <p className="text-slate-500">{selectedRoom.building} · {selectedRoom.floor}</p>
              <div className="flex items-center gap-1.5 text-slate-700 font-semibold">
                <Users className="w-3.5 h-3.5 text-indigo-600" />
                <span>รองรับสูงสุด {selectedRoom.capacity} ที่นั่ง</span>
              </div>
            </div>

            <div className="pt-2 border-t border-slate-100 space-y-1.5 text-xs text-slate-600">
              <span className="font-bold text-slate-800 text-[11px] block">สิ่งอำนวยความสะดวกในห้อง:</span>
              <ul className="space-y-1">
                {selectedRoom.facilities.map((f, i) => (
                  <li key={i} className="flex items-center gap-1.5 text-[11px]">
                    <CheckCircle2 className="w-3 h-3 text-emerald-600 shrink-0" />
                    <span>{f}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        )}
      </form>
    </div>
  );
}

export default function BookPage() {
  return (
    <Suspense fallback={<div className="p-10 text-center text-xs text-slate-500">กำลังโหลดฟอร์มจองห้อง...</div>}>
      <BookingForm />
    </Suspense>
  );
}
