import { Device, BorrowTicket, RepairTicket, RepairRole } from '@/types';

export const INITIAL_DEVICES: Device[] = [
  {
    id: 'dev-1',
    name: 'โน้ตบุ๊กสำหรับนำเสนอผลงาน Dell Latitude 5430',
    assetNumber: 'COM-NB-2566-014',
    category: 'Notebook',
    specs: 'Intel Core i5-1245U, 16GB DDR4, SSD 512GB, Windows 11 Pro',
    status: 'available',
    img: '/images/24242.png',
  },
  {
    id: 'dev-2',
    name: 'โปรเจกเตอร์พกพา Epson EB-E01 (3,300 Lumens)',
    assetNumber: 'COM-PRJ-2566-008',
    category: 'Projector',
    specs: 'ความสว่าง 3,300 ANSI Lumens, ความละเอียด XGA, พอร์ต HDMI/VGA',
    status: 'borrowed',
    img: '/images/24242.jpg',
  },
  {
    id: 'dev-3',
    name: 'อะแดปเตอร์ Type-C to HDMI / VGA Multi-Port Hub',
    assetNumber: 'COM-ADP-2566-042',
    category: 'Adapter',
    specs: 'USB-C to 4K HDMI, VGA, USB 3.0, 100W Power Delivery',
    status: 'available',
    img: '/images/24242.png',
  },
  {
    id: 'dev-4',
    name: 'แท็บเล็ต iPad Air 10.9 (Gen 5) + Apple Pencil 2',
    assetNumber: 'COM-TAB-2567-003',
    category: 'Tablet',
    specs: 'Apple M1 Chip, 64GB Wi-Fi, จอภาพ Liquid Retina 10.9 นิ้ว',
    status: 'available',
    img: '/images/24242.png',
  },
  {
    id: 'dev-5',
    name: 'จอภาพพกพา Portable Monitor 15.6" IPS FHD',
    assetNumber: 'COM-MON-2567-011',
    category: 'Monitor',
    specs: 'Full HD 1080p, แผง IPS, ต่อเชื่อมผ่าน Type-C / Mini-HDMI',
    status: 'borrowed',
    img: '/images/24242.jpg',
  },
  {
    id: 'dev-6',
    name: 'ชุดไมโครโฟนไร้สาย Wireless Microphone Set BOYA',
    assetNumber: 'COM-MIC-2566-019',
    category: 'Peripherals',
    specs: 'ไมโครโฟนไร้สาย 2 ตัวส่ง 1 ตัวรับ ระยะสัญญาณ 50 เมตร',
    status: 'available',
    img: '/images/24242.png',
  },
];

export const INITIAL_BORROWS: BorrowTicket[] = [
  {
    id: 'loan-1',
    ticketNo: 'BRW-2026-001',
    deviceId: 'dev-2',
    deviceName: 'โปรเจกเตอร์พกพา Epson EB-E01 (3,300 Lumens)',
    assetNumber: 'COM-PRJ-2566-008',
    borrowerName: 'ดร. กิตติภพ สมมุติธรรม',
    studentId: 'DEMO-T-01',
    departmentId: 'dept-1',
    departmentName: 'ฝ่ายวิชาการและเทคโนโลยีการศึกษา',
    phone: '080-000-0001',
    email: 'kittiphop.demo@example.ac.th',
    borrowDate: '2026-03-12',
    returnDueDate: '2026-03-16',
    purpose: 'นำไปใช้บรรยายพิเศษและสอนปฏิบัติการห้องอบรม 402',
    status: 'active',
    officerName: 'เจ้าหน้าที่ศูนย์คอมพิวเตอร์ (ตัวอย่าง)',
    createdAt: '2026-03-12T09:00:00Z',
  },
  {
    id: 'loan-2',
    ticketNo: 'BRW-2026-002',
    deviceId: 'dev-5',
    deviceName: 'จอภาพพกพา Portable Monitor 15.6" IPS FHD',
    assetNumber: 'COM-MON-2567-011',
    borrowerName: 'นายสมชาย ตัวอย่างดี',
    studentId: 'DEMO-STD-889',
    departmentId: 'dept-1',
    departmentName: 'คณะวิทยาศาสตร์และนวัตกรรม (สาขาไอที)',
    phone: '080-000-0002',
    email: 'somchai.demo@example.ac.th',
    borrowDate: '2026-03-10',
    returnDueDate: '2026-03-14',
    purpose: 'ใช้สำหรับการแข่งขัน Hackathon และทดสอบระบบ Web Application',
    status: 'active',
    officerName: 'เจ้าหน้าที่ศูนย์คอมพิวเตอร์ (ตัวอย่าง)',
    createdAt: '2026-03-10T10:30:00Z',
  },
  {
    id: 'loan-3',
    ticketNo: 'BRW-2026-003',
    deviceId: 'dev-1',
    deviceName: 'โน้ตบุ๊กสำหรับนำเสนอผลงาน Dell Latitude 5430',
    assetNumber: 'COM-NB-2566-014',
    borrowerName: 'นางสาวสมหญิง นามสมมุติ',
    studentId: 'DEMO-EMP-042',
    departmentId: 'dept-2',
    departmentName: 'งานวิเทศสัมพันธ์และประชาสัมพันธ์',
    phone: '080-000-0003',
    email: 'somying.demo@example.ac.th',
    borrowDate: '2026-03-01',
    returnDueDate: '2026-03-05',
    actualReturnDate: '2026-03-05',
    purpose: 'ต้อนรับคณะผู้แทนและวิทยากรภายนอก',
    status: 'returned',
    officerName: 'เจ้าหน้าที่ศูนย์คอมพิวเตอร์ (ตัวอย่าง)',
    createdAt: '2026-03-01T08:00:00Z',
  },
];

export const INITIAL_REPAIRS: RepairTicket[] = [
  {
    id: 'rep-1',
    ticketNo: 'REP-2026-001',
    deviceType: 'PC Desktop All-in-One HP',
    assetNumber: 'COM-PC-2565-088',
    issueTitle: 'เครื่องเปิดติดแต่ไม่ขึ้นภาพบนจอ มีเสียง Beep Code ดังยาว 1 ครั้ง สั้น 2 ครั้ง',
    issueDetails: 'เปิดเครื่องไฟเข้า พัดลมหมุน จอมืดสนิท ลองขยับสายจอ HDMI แล้วยังไม่ติด คาดว่าแรมหลวมหรือการ์ดจอมีปัญหา',
    category: 'Hardware',
    urgency: 'high',
    departmentName: 'สำนักงานบริหารทั่วไป (ห้องธุรการการเงิน)',
    location: 'อาคารอำนวยการ ชั้น 1 โต๊ะทำงานธุรการ',
    contactName: 'นางสาววิลาวัณย์ ตัวอย่างงาม',
    phone: '080-000-0004',
    email: 'wilawan.demo@example.ac.th',
    status: 'in_repair',
    technicianNotes: 'ตรวจพบช่องเสียบแรมสกปรก ได้ทำความสะอาดและกำลังรัน MemTest86 เพื่อทดสอบความเสถียร',
    createdAt: '2026-03-13T09:15:00Z',
  },
  {
    id: 'rep-2',
    ticketNo: 'REP-2026-002',
    deviceType: 'เครื่องพิมพ์เลเซอร์ HP LaserJet Pro M404dn',
    assetNumber: 'COM-PRN-2565-021',
    issueTitle: 'กระดาษติดในถาดดึงกระดาษ (Paper Jam) และไฟสีส้มกะพริบ',
    issueDetails: 'สั่งพิมพ์เอกสารข้อสอบแล้วเครื่องดึงกระดาษเบี้ยว ติดค้างข้างใน ดึงเศษกระดาษออกแล้วยังมีไฟ Error เตือน',
    category: 'Printer',
    urgency: 'critical',
    departmentName: 'ภาควิชาวิทยาการสารสนเทศ',
    location: 'ห้องพักอาจารย์ อาคารวิชาการ ชั้น 3',
    contactName: 'อาจารย์ทรงพล จำลองสิทธิ์',
    phone: '080-000-0005',
    email: 'songpon.demo@example.ac.th',
    status: 'submitted',
    createdAt: '2026-03-14T11:45:00Z',
  },
  {
    id: 'rep-3',
    ticketNo: 'REP-2026-003',
    deviceType: 'เครื่องคอมพิวเตอร์สำนักงาน Dell OptiPlex 7090',
    assetNumber: 'COM-PC-2565-055',
    issueTitle: 'เครื่องติดไวรัส โดนแอดแวร์ Redirect เว็บไซต์ และเครื่องทำงานช้ามาก',
    issueDetails: 'เปิดใช้งานเบราว์เซอร์แล้วมีหน้าต่างโฆษณาเด้งขึ้นมาตลอดเวลา CPU Usage ทำงาน 100% ตลอดเวลา',
    category: 'Software',
    urgency: 'medium',
    departmentName: 'งานบริการนักศึกษา',
    location: 'เคาน์เตอร์บริการ ชั้น 1',
    contactName: 'นายเกียรติศักดิ์ สมมุติการ',
    phone: '080-000-0006',
    email: 'kiattisak.demo@example.ac.th',
    status: 'ready_for_pickup',
    technicianNotes: 'ล้างมัลแวร์เรียบร้อย ลงซอฟต์แวร์ความปลอดภัยและอัปเดตระบบปฏิบัติการล่าสุด พร้อมส่งมอบคืน',
    createdAt: '2026-03-11T13:30:00Z',
  },
];

class RepairStore {
  private isBrowser = typeof window !== 'undefined';

  private getItem<T>(key: string, initial: T): T {
    if (!this.isBrowser) return initial;
    try {
      const data = localStorage.getItem(`repair_${key}`);
      return data ? JSON.parse(data) : initial;
    } catch {
      return initial;
    }
  }

  private setItem<T>(key: string, value: T): void {
    if (!this.isBrowser) return;
    try {
      localStorage.setItem(`repair_${key}`, JSON.stringify(value));
    } catch (e) {
      console.error(e);
    }
  }

  getDevices(): Device[] {
    return this.getItem('devices', INITIAL_DEVICES);
  }

  saveDevices(devices: Device[]): void {
    this.setItem('devices', devices);
  }

  getBorrows(): BorrowTicket[] {
    return this.getItem('borrows', INITIAL_BORROWS);
  }

  saveBorrows(borrows: BorrowTicket[]): void {
    this.setItem('borrows', borrows);
  }

  addBorrow(borrow: Omit<BorrowTicket, 'id' | 'ticketNo' | 'createdAt'>): BorrowTicket {
    const list = this.getBorrows();
    const newNo = `BRW-2026-${String(list.length + 1).padStart(3, '0')}`;
    const newBorrow: BorrowTicket = {
      ...borrow,
      id: `loan-${Date.now()}`,
      ticketNo: newNo,
      createdAt: new Date().toISOString(),
    };
    list.unshift(newBorrow);
    this.saveBorrows(list);

    // Update device status to borrowed
    const devs = this.getDevices().map(d => d.id === borrow.deviceId ? { ...d, status: 'borrowed' as Device['status'] } : d);
    this.saveDevices(devs);

    return newBorrow;
  }

  updateBorrowStatus(id: string, status: BorrowTicket['status']): void {
    const list = this.getBorrows().map(b => {
      if (b.id === id) {
        const actualReturnDate = status === 'returned' ? new Date().toISOString().split('T')[0] : b.actualReturnDate;
        return { ...b, status, actualReturnDate };
      }
      return b;
    });
    this.saveBorrows(list);

    // If returned, set device status to available
    const item = list.find(b => b.id === id);
    if (item && status === 'returned') {
      const devs = this.getDevices().map(d => d.id === item.deviceId ? { ...d, status: 'available' as Device['status'] } : d);
      this.saveDevices(devs);
    }
  }

  getRepairs(): RepairTicket[] {
    return this.getItem('repairs', INITIAL_REPAIRS);
  }

  saveRepairs(repairs: RepairTicket[]): void {
    this.setItem('repairs', repairs);
  }

  addRepair(repair: Omit<RepairTicket, 'id' | 'ticketNo' | 'createdAt'>): RepairTicket {
    const list = this.getRepairs();
    const newNo = `REP-2026-${String(list.length + 1).padStart(3, '0')}`;
    const newRepair: RepairTicket = {
      ...repair,
      id: `rep-${Date.now()}`,
      ticketNo: newNo,
      createdAt: new Date().toISOString(),
    };
    list.unshift(newRepair);
    this.saveRepairs(list);
    return newRepair;
  }

  updateRepairStatus(id: string, status: RepairTicket['status'], techNotes?: string): void {
    const list = this.getRepairs().map(r => r.id === id ? { 
      ...r, 
      status, 
      technicianNotes: techNotes !== undefined ? techNotes : r.technicianNotes 
    } : r);
    this.saveRepairs(list);
  }

  getRole(): RepairRole {
    return this.getItem('role', 'user');
  }

  setRole(role: RepairRole): void {
    this.setItem('role', role);
  }

  resetAll(): void {
    if (!this.isBrowser) return;
    localStorage.removeItem('repair_devices');
    localStorage.removeItem('repair_borrows');
    localStorage.removeItem('repair_repairs');
    localStorage.removeItem('repair_role');
  }
}

export const mockStore = new RepairStore();
