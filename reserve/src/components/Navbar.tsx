'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import Image from 'next/image';
import { 
  Calendar, 
  DoorOpen, 
  CalendarPlus, 
  Clock, 
  ShieldCheck, 
  Sparkles,
  UserCheck
} from 'lucide-react';
import { useEffect, useState } from 'react';
import { mockStore } from '@/lib/mockStore';
import { ReserveRole } from '@/types';

export default function Navbar() {
  const pathname = usePathname();
  const [role, setRole] = useState<ReserveRole>('user');

  useEffect(() => {
    setRole(mockStore.getRole());
  }, []);

  const navItems = [
    { label: 'ปฏิทินการจอง', href: '/', icon: Calendar },
    { label: 'ห้องประชุมทั้งหมด', href: '/rooms', icon: DoorOpen },
    { label: 'จองห้องประชุม', href: '/book', icon: CalendarPlus },
    { label: 'ประวัติการจองของฉัน', href: '/my-bookings', icon: Clock },
    { label: 'ศูนย์จัดการคำขอ (Admin)', href: '/admin', icon: ShieldCheck },
  ];

  return (
    <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-slate-200 shadow-xs">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo & Brand */}
          <Link href="/" className="flex items-center gap-3 group">
            <div className="relative w-10 h-10 rounded-xl overflow-hidden bg-indigo-50 border border-indigo-100 p-1 flex items-center justify-center group-hover:scale-105 transition-transform">
              <Image 
                src="/images/logo.png" 
                alt="Logo" 
                width={36} 
                height={36} 
                className="object-contain" 
                priority
              />
            </div>
            <div className="flex flex-col">
              <span className="font-extrabold text-base tracking-tight text-slate-900 flex items-center gap-1.5">
                ระบบจองห้องประชุม <span className="text-indigo-600 font-black">RESERVE</span>
              </span>
              <span className="text-[11px] text-slate-500 font-medium">Smart Room & Resource Reservation</span>
            </div>
          </Link>

          {/* Navigation Links */}
          <nav className="hidden md:flex items-center gap-1">
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = pathname === item.href;
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`flex items-center gap-1.5 px-3 py-2 rounded-lg text-xs font-semibold transition-all ${
                    isActive
                      ? 'bg-indigo-50 text-indigo-700 border border-indigo-200'
                      : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
                  }`}
                >
                  <Icon className={`w-3.5 h-3.5 ${isActive ? 'text-indigo-600' : 'text-slate-400'}`} />
                  <span>{item.label}</span>
                </Link>
              );
            })}
          </nav>

          {/* Right Status */}
          <div className="flex items-center gap-3">
            <div className="hidden sm:flex items-center gap-2 px-2.5 py-1 rounded-full bg-slate-100 border border-slate-200 text-xs text-slate-700">
              <UserCheck className="w-3.5 h-3.5 text-indigo-600" />
              <span>สิทธิ์:</span>
              <span className="font-bold text-slate-900 capitalize">
                {role === 'admin' ? 'ผู้ดูแลระบบ' : role === 'approver' ? 'เจ้าหน้าที่อนุมัติ' : 'ผู้ใช้งาน'}
              </span>
            </div>

            <Link
              href="/book"
              className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg bg-indigo-600 text-white text-xs font-bold hover:bg-indigo-700 shadow-sm transition-all hover:scale-[1.02]"
            >
              <CalendarPlus className="w-3.5 h-3.5" />
              <span>จองห้องทันที</span>
            </Link>
          </div>
        </div>

        {/* Mobile Navigation */}
        <div className="md:hidden flex items-center gap-1 overflow-x-auto py-2 border-t border-slate-200 no-scrollbar">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = pathname === item.href;
            return (
              <Link
                key={item.href}
                href={item.href}
                className={`whitespace-nowrap flex items-center gap-1 px-2.5 py-1.5 rounded-md text-xs font-medium ${
                  isActive
                    ? 'bg-indigo-600 text-white font-bold'
                    : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
                }`}
              >
                <Icon className="w-3.5 h-3.5" />
                <span>{item.label}</span>
              </Link>
            );
          })}
        </div>
      </div>
    </header>
  );
}
