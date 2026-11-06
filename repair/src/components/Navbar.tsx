'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import Image from 'next/image';
import { 
  Laptop, 
  Wrench, 
  Search, 
  ShieldCheck, 
  Sparkles, 
  Layers,
  HelpCircle
} from 'lucide-react';
import { useEffect, useState } from 'react';
import { mockStore } from '@/lib/mockStore';
import { RepairRole } from '@/types';

export default function Navbar() {
  const pathname = usePathname();
  const [role, setRole] = useState<RepairRole>('user');

  useEffect(() => {
    setRole(mockStore.getRole());
  }, []);

  const navItems = [
    { label: 'หน้าหลักศูนย์บริการ', href: '/', icon: Layers },
    { label: 'ยืมอุปกรณ์ออนไลน์', href: '/borrow', icon: Laptop },
    { label: 'แจ้งซ่อมอุปกรณ์ (Helpdesk)', href: '/repair', icon: Wrench },
    { label: 'ติดตามสถานะคำขอ', href: '/tracking', icon: Search },
    { label: 'แผงควบคุมเจ้าหน้าที่ (Admin)', href: '/admin', icon: ShieldCheck },
  ];

  return (
    <header className="sticky top-0 z-40 bg-slate-950/90 backdrop-blur-md border-b border-slate-800 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo & Brand */}
          <Link href="/" className="flex items-center gap-3 group">
            <div className="relative w-10 h-10 rounded-xl overflow-hidden bg-slate-900 border border-slate-700 p-1 flex items-center justify-center group-hover:border-cyan-400 transition-colors">
              <Image 
                src="/images/logo_20170112044011.png" 
                alt="Logo" 
                width={36} 
                height={36} 
                className="object-contain" 
                priority
              />
            </div>
            <div className="flex flex-col">
              <span className="font-extrabold text-base tracking-tight text-white flex items-center gap-1.5">
                ศูนย์คอมพิวเตอร์ <span className="text-cyan-400 font-black">IT SERVICE</span>
              </span>
              <span className="text-[11px] text-slate-400 font-medium">ระบบยืม-คืนอุปกรณ์และแจ้งซ่อมออนไลน์</span>
            </div>
          </Link>

          {/* Nav Items */}
          <nav className="hidden lg:flex items-center gap-1">
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = pathname === item.href;
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`flex items-center gap-1.5 px-3 py-2 rounded-lg text-xs font-semibold transition-all ${
                    isActive
                      ? 'bg-cyan-500/10 text-cyan-400 border border-cyan-500/30'
                      : 'text-slate-300 hover:text-white hover:bg-slate-800'
                  }`}
                >
                  <Icon className={`w-3.5 h-3.5 ${isActive ? 'text-cyan-400' : 'text-slate-400'}`} />
                  <span>{item.label}</span>
                </Link>
              );
            })}
          </nav>

          {/* Right Role and Actions */}
          <div className="flex items-center gap-3">
            <div className="hidden sm:flex items-center gap-2 px-2.5 py-1 rounded-full bg-slate-900 border border-slate-800 text-xs text-slate-300">
              <span className="w-2 h-2 rounded-full bg-cyan-400 animate-pulse" />
              <span>สิทธิ์:</span>
              <span className="font-bold text-white capitalize">
                {role === 'admin' ? 'ผู้ดูแลระบบ' : role === 'officer' ? 'เจ้าหน้าที่ไอที' : 'ผู้ใช้งานทั่วไป'}
              </span>
            </div>

            <Link
              href="/borrow"
              className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg bg-cyan-500 text-slate-950 text-xs font-bold hover:bg-cyan-400 shadow-sm transition-all hover:scale-[1.02]"
            >
              <Laptop className="w-3.5 h-3.5" />
              <span>ขอยืมอุปกรณ์</span>
            </Link>
          </div>
        </div>

        {/* Mobile Navigation */}
        <div className="lg:hidden flex items-center gap-1 overflow-x-auto py-2 border-t border-slate-800 no-scrollbar">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = pathname === item.href;
            return (
              <Link
                key={item.href}
                href={item.href}
                className={`whitespace-nowrap flex items-center gap-1 px-2.5 py-1.5 rounded-md text-xs font-medium ${
                  isActive
                    ? 'bg-cyan-500 text-slate-950 font-bold'
                    : 'text-slate-300 hover:text-white hover:bg-slate-800'
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
