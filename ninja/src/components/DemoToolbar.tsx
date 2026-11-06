'use client';

import { useState, useEffect } from 'react';
import { mockStore } from '@/lib/mockStore';
import { UserRole } from '@/types';
import { ShieldCheck, RotateCcw, ExternalLink, Sparkles, CheckCircle2 } from 'lucide-react';

export default function DemoToolbar() {
  const [role, setRole] = useState<UserRole>('superadmin');
  const [resetSuccess, setResetSuccess] = useState(false);
  const [isOpen, setIsOpen] = useState(true);

  useEffect(() => {
    setRole(mockStore.getRole());
  }, []);

  const handleRoleChange = (newRole: UserRole) => {
    setRole(newRole);
    mockStore.setRole(newRole);
    window.location.reload();
  };

  const handleReset = () => {
    if (confirm('ต้องการคืนค่าข้อมูลตัวอย่างตั้งต้นทั้งหมดของ NINJA IT หรือไม่?')) {
      mockStore.resetAll();
      setResetSuccess(true);
      setTimeout(() => {
        window.location.reload();
      }, 500);
    }
  };

  return (
    <aside aria-label="Demo Controller" className="fixed bottom-4 right-4 z-50">
      {isOpen ? (
        <div className="bg-zinc-900/95 border border-zinc-700/80 shadow-2xl rounded-2xl p-3.5 backdrop-blur-xl text-xs text-zinc-300 w-72 flex flex-col gap-2.5 transition-all">
          <div className="flex items-center justify-between border-b border-zinc-800 pb-2">
            <div className="flex items-center gap-1.5 font-bold text-amber-400">
              <Sparkles className="w-4 h-4" />
              <span>N!NJA IT Demo Controls</span>
            </div>
            <button 
              onClick={() => setIsOpen(false)}
              className="text-zinc-500 hover:text-zinc-300 text-xs px-1"
            >
              ย่อ ✕
            </button>
          </div>

          <div>
            <label className="text-[11px] text-zinc-400 font-medium block mb-1">
              สลับสิทธิ์การใช้งาน (Role Switch):
            </label>
            <div className="grid grid-cols-3 gap-1 bg-zinc-950 p-1 rounded-lg border border-zinc-800">
              {(['superadmin', 'accountant', 'sales'] as UserRole[]).map((r) => (
                <button
                  key={r}
                  onClick={() => handleRoleChange(r)}
                  className={`py-1 text-[11px] font-semibold rounded transition-all ${
                    role === r
                      ? 'bg-amber-400 text-zinc-950 shadow-sm'
                      : 'text-zinc-400 hover:text-zinc-200 hover:bg-zinc-800'
                  }`}
                >
                  {r === 'superadmin' ? 'Admin' : r === 'accountant' ? 'การเงิน' : 'ฝ่ายขาย'}
                </button>
              ))}
            </div>
          </div>

          <div className="flex items-center gap-2 pt-1 border-t border-zinc-800/80">
            <button
              onClick={handleReset}
              className="flex-1 flex items-center justify-center gap-1.5 py-1.5 px-2 rounded-lg bg-zinc-800 hover:bg-zinc-700 text-zinc-200 font-semibold border border-zinc-700 transition-colors"
            >
              {resetSuccess ? (
                <>
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
                  <span>รีเซ็ตสำเร็จ</span>
                </>
              ) : (
                <>
                  <RotateCcw className="w-3.5 h-3.5 text-amber-400" />
                  <span>คืนค่าข้อมูลจำลอง</span>
                </>
              )}
            </button>

            <a
              href="https://anuphap.vercel.app/"
              target="_blank"
              rel="noreferrer"
              className="p-1.5 rounded-lg bg-zinc-800 hover:bg-zinc-700 text-zinc-300 hover:text-white border border-zinc-700 transition-colors"
              title="ดูพอร์ตโฟลิโอคุณอานุภาพ"
            >
              <ExternalLink className="w-4 h-4" />
            </a>
          </div>
        </div>
      ) : (
        <button
          onClick={() => setIsOpen(true)}
          className="flex items-center gap-1.5 px-3 py-2 rounded-full bg-amber-400 text-zinc-950 font-bold shadow-lg text-xs hover:bg-amber-300 transition-all hover:scale-105"
        >
          <Sparkles className="w-3.5 h-3.5" />
          <span>Demo Bar</span>
        </button>
      )}
    </aside>
  );
}
