import { Room, Department, Booking, ReserveRole } from '@/types';

export const INITIAL_ROOMS: Room[] = [
  {
    id: 'r1',
    name: 'ห้องประชุมใหญ่ทองกวาว (Grand Auditorium)',
    capacity: 80,
    building: 'อาคารเฉลิมพระเกียรติ (จำลอง)',
    floor: 'ชั้น 3',
    description: 'ห้องประชุมขนาดใหญ่ รองรับงานสัมมนา บรรยายพิเศษ ประชุมสภาคณาจารย์ และพิธีการสำคัญ',
    facilities: ['ระบบเสียงรอบทิศทาง Dolby', 'ไมโครโฟนไร้สาย 6 ตัว', 'จอ LED Wall 4K ขนาดใหญ่', 'ระบบถ่ายทอดสด Live Streaming', 'เครื่องปรับอากาศ 6 ทิศทาง', 'Wi-Fi 6'],
    img: '/images/banner.jpg',
    status: 'available',
  },
  {
    id: 'r2',
    name: 'ห้องประชุมสารภี (Executive Boardroom)',
    capacity: 25,
    building: 'อาคารอำนวยการ (จำลอง)',
    floor: 'ชั้น 2',
    description: 'ห้องประชุมผู้บริหารและคณะกรรมการ จัดโต๊ะแบบ U-Shape พร้อมระบบ Video Conference ความคมชัดสูง',
    facilities: ['Smart TV 85 นิ้ว รองรับ AirPlay/Miracast', 'กล้อง Video Conference AI Auto-Framing', 'ไมโครโฟนรอบทิศทางประจำโต๊ะ', 'กระดานไวท์บอร์ดอัจฉริยะ', 'Wi-Fi 6'],
    img: '/images/645935662.png',
    status: 'available',
  },
  {
    id: 'r3',
    name: 'ห้องประชุมเชิงปฏิบัติการกาสะลอง (Workshop Suite)',
    capacity: 40,
    building: 'อาคารวิชาการ (จำลอง)',
    floor: 'ชั้น 4',
    description: 'ห้องประชุมสำหรับการอบรม สัมมนาเชิงปฏิบัติการ กลุ่มย่อย สามารถปรับเปลี่ยนการจัดโต๊ะได้หลายรูปแบบ',
    facilities: ['โปรเจกเตอร์ความสว่างสูง 5000 Lumens', 'ปลั๊กไฟประจำโต๊ะทุกจุด', 'ไมโครโฟนไร้สาย 2 ตัว', 'ชุดเครื่องเสียงสำหรับการสอน', 'เครื่องปรับอากาศ'],
    img: '/images/697751322.png',
    status: 'available',
  },
];

export const INITIAL_DEPARTMENTS: Department[] = [
  { id: 'd1', name: 'ฝ่ายเทคโนโลยีสารสนเทศ (IT Support)', code: 'IT' },
  { id: 'd2', name: 'สำนักงานบริหารทั่วไปและประสานงาน', code: 'ADM' },
  { id: 'd3', name: 'งานประกันคุณภาพและยุทธศาสตร์องค์กร', code: 'QA' },
  { id: 'd4', name: 'ฝ่ายวิจัยและนวัตกรรมดิจิทัล', code: 'RD' },
  { id: 'd5', name: 'งานพัฒนาศักยภาพและฝึกอบรม', code: 'HR' },
];

export const INITIAL_BOOKINGS: Booking[] = [
  {
    id: 'b1',
    bookingNo: 'RES-2026-001',
    roomId: 'r1',
    roomName: 'ห้องประชุมใหญ่ทองกวาว (Grand Auditorium)',
    date: '2026-03-20',
    startTime: '09:00',
    endTime: '12:00',
    timeSlotName: 'ช่วงเช้า (09:00 - 12:00 น.)',
    topic: 'การประชุมวิชาการระดับชาติ ด้านนวัตกรรมปัญญาประดิษฐ์ (โครงการตัวอย่าง)',
    departmentId: 'd4',
    departmentName: 'ฝ่ายวิจัยและนวัตกรรมดิจิทัล',
    bookerName: 'ดร. กิตติศักดิ์ ตัวอย่างดี',
    phone: '080-000-0001',
    email: 'kittisak.demo@example.ac.th',
    attendees: 65,
    equipmentNotes: 'ขอใช้ระบบ Live Streaming และไมโครโฟนไร้สาย 4 ตัว',
    status: 'approved',
    createdAt: '2026-03-01T08:30:00Z',
  },
  {
    id: 'b2',
    bookingNo: 'RES-2026-002',
    roomId: 'r2',
    roomName: 'ห้องประชุมสารภี (Executive Boardroom)',
    date: '2026-03-22',
    startTime: '13:30',
    endTime: '16:30',
    timeSlotName: 'ช่วงบ่าย (13:30 - 16:30 น.)',
    topic: 'การประชุมคณะกรรมการบริหารงบประมาณ ไตรมาส 2 (วาระสมมุติ)',
    departmentId: 'd2',
    departmentName: 'สำนักงานบริหารทั่วไปและประสานงาน',
    bookerName: 'นางสาวสมหญิง นามสมมุติ',
    phone: '080-000-0002',
    email: 'somying.demo@example.ac.th',
    attendees: 18,
    equipmentNotes: 'เตรียมชุดอาหารว่าง 18 ชุด และต่อ Video Conference',
    status: 'approved',
    createdAt: '2026-03-05T10:15:00Z',
  },
  {
    id: 'b3',
    bookingNo: 'RES-2026-003',
    roomId: 'r3',
    roomName: 'ห้องประชุมเชิงปฏิบัติการกาสะลอง (Workshop Suite)',
    date: '2026-03-25',
    startTime: '09:00',
    endTime: '16:30',
    timeSlotName: 'เต็มวัน (09:00 - 16:30 น.)',
    topic: 'อบรมเชิงปฏิบัติการ การพัฒนาเว็บแอปพลิเคชันยุคใหม่ด้วย Next.js',
    departmentId: 'd1',
    departmentName: 'ฝ่ายเทคโนโลยีสารสนเทศ (IT Support)',
    bookerName: 'นายสมชาย ใจจำลอง',
    phone: '080-000-0003',
    email: 'somchai.user@example.ac.th',
    attendees: 30,
    equipmentNotes: 'ต้องการปลั๊กพ่วงเพิ่ม 6 จุด และเครื่องเสียง',
    status: 'pending',
    createdAt: '2026-03-10T14:20:00Z',
  },
];

class ReserveStore {
  private isBrowser = typeof window !== 'undefined';

  private getItem<T>(key: string, initial: T): T {
    if (!this.isBrowser) return initial;
    try {
      const data = localStorage.getItem(`reserve_${key}`);
      return data ? JSON.parse(data) : initial;
    } catch {
      return initial;
    }
  }

  private setItem<T>(key: string, value: T): void {
    if (!this.isBrowser) return;
    try {
      localStorage.setItem(`reserve_${key}`, JSON.stringify(value));
    } catch (e) {
      console.error(e);
    }
  }

  getRooms(): Room[] {
    return this.getItem('rooms', INITIAL_ROOMS);
  }

  saveRooms(rooms: Room[]): void {
    this.setItem('rooms', rooms);
  }

  getDepartments(): Department[] {
    return this.getItem('departments', INITIAL_DEPARTMENTS);
  }

  getBookings(): Booking[] {
    return this.getItem('bookings', INITIAL_BOOKINGS);
  }

  saveBookings(bookings: Booking[]): void {
    this.setItem('bookings', bookings);
  }

  addBooking(booking: Omit<Booking, 'id' | 'bookingNo' | 'createdAt'>): Booking {
    const list = this.getBookings();
    const newNo = `RES-2026-${String(list.length + 1).padStart(3, '0')}`;
    const newBooking: Booking = {
      ...booking,
      id: `b-${Date.now()}`,
      bookingNo: newNo,
      createdAt: new Date().toISOString(),
    };
    list.unshift(newBooking);
    this.saveBookings(list);
    return newBooking;
  }

  updateBookingStatus(id: string, status: Booking['status'], reason?: string): void {
    const list = this.getBookings().map(b => b.id === id ? { ...b, status, rejectReason: reason } : b);
    this.saveBookings(list);
  }

  deleteBooking(id: string): void {
    const list = this.getBookings().filter(b => b.id !== id);
    this.saveBookings(list);
  }

  getRole(): ReserveRole {
    return this.getItem('role', 'user');
  }

  setRole(role: ReserveRole): void {
    this.setItem('role', role);
  }

  resetAll(): void {
    if (!this.isBrowser) return;
    localStorage.removeItem('reserve_rooms');
    localStorage.removeItem('reserve_bookings');
    localStorage.removeItem('reserve_role');
  }
}

export const mockStore = new ReserveStore();
