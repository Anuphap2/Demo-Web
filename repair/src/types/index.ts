export type DeviceStatus = 'available' | 'borrowed' | 'repairing' | 'damaged' | 'retired';

export interface Device {
  id: string;
  name: string;
  assetNumber: string;
  category: 'Notebook' | 'Projector' | 'Adapter' | 'Tablet' | 'Monitor' | 'Peripherals';
  specs: string;
  status: DeviceStatus;
  img: string;
}

export type LoanStatus = 'pending' | 'active' | 'returned' | 'overdue';

export interface BorrowTicket {
  id: string;
  ticketNo: string;
  deviceId: string;
  deviceName: string;
  assetNumber: string;
  borrowerName: string;
  studentId: string;
  departmentId: string;
  departmentName: string;
  phone: string;
  email: string;
  borrowDate: string;
  returnDueDate: string;
  actualReturnDate?: string;
  purpose: string;
  status: LoanStatus;
  officerName?: string;
  notes?: string;
  createdAt: string;
}

export type RepairCategory = 'Hardware' | 'Software' | 'Network' | 'Printer';
export type RepairUrgency = 'low' | 'medium' | 'high' | 'critical';
export type RepairStatus = 'submitted' | 'diagnosing' | 'in_repair' | 'ready_for_pickup' | 'closed';

export interface RepairTicket {
  id: string;
  ticketNo: string;
  deviceType: string;
  assetNumber?: string;
  issueTitle: string;
  issueDetails: string;
  category: RepairCategory;
  urgency: RepairUrgency;
  departmentName: string;
  location: string;
  contactName: string;
  phone: string;
  email: string;
  status: RepairStatus;
  technicianNotes?: string;
  createdAt: string;
}

export type RepairRole = 'user' | 'officer' | 'admin';
