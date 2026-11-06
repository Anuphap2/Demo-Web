export interface Room {
  id: string;
  name: string;
  capacity: number;
  building: string;
  floor: string;
  description: string;
  facilities: string[];
  img: string;
  status: 'available' | 'maintenance';
}

export interface Department {
  id: string;
  name: string;
  code: string;
}

export type BookingStatus = 'pending' | 'approved' | 'rejected' | 'completed';

export interface Booking {
  id: string;
  bookingNo: string;
  roomId: string;
  roomName: string;
  date: string;
  startTime: string;
  endTime: string;
  timeSlotName: string;
  topic: string;
  departmentId: string;
  departmentName: string;
  bookerName: string;
  phone: string;
  email: string;
  attendees: number;
  equipmentNotes?: string;
  status: BookingStatus;
  rejectReason?: string;
  createdAt: string;
}

export type ReserveRole = 'user' | 'approver' | 'admin';
