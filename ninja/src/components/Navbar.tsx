'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import Image from 'next/image';
import { 
  LayoutDashboard, 
  Receipt, 
  FileSpreadsheet, 
  Boxes, 
  Calculator, 
  Wallet, 
  Users, 
  CreditCard,
  ShieldCheck,
  Sparkles
} from 'lucide-react';
import { useEffect, useState } from 'react';
import { mockStore } from '@/lib/mockStore';
import { UserRole } from '@/types';

export default function Navbar() {
  const pathname = usePathname();
  const [role, setRole] = useState<UserRole>('superadmin');

  useEffect(() => {
    setRole(mockStore.getRole());
    const handleStorage = () => setRole(mockStore.getRole());
    window.addEventListener('storage', handleStorage);
    return () => window.removeEventListener('storage', handleStorage);
  }, []);

  const navItems = [
    { label: 'แดชบอร์ด', href: '/', icon: LayoutDashboard },
    { label: 'ออกบิล (Job)', href: '/invoices', icon: Receipt },
    { label: 'ใบเสนอราคา', href: '/quotations', icon: FileSpreadsheet },
    { label: 'สต็อกสินค้า', href: '/inventory', icon: Boxes },
    { label: 'จัดการภาษี (VAT)', href: '/tax', icon: Calculator },
    { label: 'การเงิน & รายจ่าย', href: '/finance', icon: Wallet },
    { label: 'ข้อมูลลูกค้า', href: '/customers', icon: Users },
    { label: 'บัญชีลูกหนี้', href: '/receivables', icon: CreditCard },
  ];

  return (
    <header className="sticky top-0 z-40 bg-zinc-950/90 backdrop-blur-md border-b border-zinc-800/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo & Brand */}
          <div className="flex items-center gap-3">
            <Link href="/" className="flex items-center gap-2 group">
              <div className="relative w-10 h-10 rounded-lg overflow-hidden bg-zinc-900 border border-zinc-700/60 p-1 flex items-center justify-center group-hover:border-amber-400 transition-colors">
                <Image 
                  src="/images/logo.png" 
                  alt="N!NJA IT Logo" 
                  width={36} 
                  height={36} 
                  className="object-contain" 
                  priority
                />
              </div>
              <div className="flex flex-col">
                <span className="font-extrabold text-lg tracking-wider text-white flex items-center gap-1.5">
                  N!NJA <span className="text-amber-400 font-black">IT</span>
                  <span className="text-[10px] uppercase font-bold tracking-widest px-1.5 py-0.5 rounded bg-zinc-800 text-zinc-300 border border-zinc-700">ERP</span>
                </span>
                <span className="text-[11px] text-zinc-400 font-medium">Enterprise Management Suite</span>
              </div>
            </Link>
          </div>

          {/* Navigation Links */}
          <nav className="hidden lg:flex items-center gap-1">
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = pathname === item.href || (item.href !== '/' && pathname.startsWith(item.href));
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`flex items-center gap-1.5 px-3 py-2 rounded-lg text-xs font-semibold transition-all ${
                    isActive
                      ? 'bg-amber-400/10 text-amber-400 border border-amber-400/30'
                      : 'text-zinc-300 hover:text-white hover:bg-zinc-800/60'
                  }`}
                >
                  <Icon className={`w-3.5 h-3.5 ${isActive ? 'text-amber-400' : 'text-zinc-400'}`} />
                  <span>{item.label}</span>
                </Link>
              );
            })}
          </nav>

          {/* Right Status & Role Pill */}
          <div className="flex items-center gap-3">
            <div className="hidden sm:flex items-center gap-2 px-2.5 py-1 rounded-full bg-zinc-900 border border-zinc-800 text-xs">
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
              <span className="text-zinc-400">โหมด:</span>
              <span className="font-semibold text-zinc-200 capitalize flex items-center gap-1">
                <ShieldCheck className="w-3.5 h-3.5 text-amber-400" />
                {role === 'superadmin' ? 'Super Admin' : role === 'accountant' ? 'การเงิน/บัญชี' : 'ฝ่ายขาย'}
              </span>
            </div>

            <Link
              href="/invoices"
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-amber-400 text-zinc-950 text-xs font-bold hover:bg-amber-300 shadow-sm transition-all hover:scale-[1.02] active:scale-[0.98]"
            >
              <Sparkles className="w-3.5 h-3.5" />
              <span>ออกบิลใหม่</span>
            </Link>
          </div>
        </div>

        {/* Mobile Nav Scroller */}
        <div className="lg:hidden flex items-center gap-1 overflow-x-auto py-2 border-t border-zinc-800/60 no-scrollbar">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = pathname === item.href;
            return (
              <Link
                key={item.href}
                href={item.href}
                className={`whitespace-nowrap flex items-center gap-1 px-2.5 py-1.5 rounded-md text-xs font-medium ${
                  isActive
                    ? 'bg-amber-400 text-zinc-950 font-bold'
                    : 'text-zinc-400 hover:text-white hover:bg-zinc-800'
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
