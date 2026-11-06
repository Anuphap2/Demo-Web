'use client';

import { useState, useEffect } from 'react';
import { mockStore } from '@/lib/mockStore';
import { ReserveRole } from '@/types';
import { RotateCcw, ExternalLink, Sparkles, CheckCircle2 } from 'lucide-react';

export default function DemoToolbar() {
  const [role, setRole] = useState<ReserveRole>('user');
  const [resetSuccess, setResetSuccess] = useState(false);
  const [isOpen, setIsOpen] = useState(true);

  useEffect(() => {
    setRole(mockStore.getRole());
  }, []);

  const handleRoleChange = (newRole: ReserveRole) => {
    setRole(newRole);
    mockStore.setRole(newRole);
    window.location.reload();
  };

  const handleReset = () => {
    if (confirm('ต้องการคืนค่าข้อมูลตัวอย่างห้องประชุมและการจองทั้งหมดหรือไม่?')) {
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
        <div className="bg-white/95 border border-slate-300 shadow-2xl rounded-2xl p-3.5 backdrop-blur-xl text-xs text-slate-700 w-72 flex flex-col gap-2.5 transition-all">
          <div className="flex items-center justify-between border-b border-slate-200 pb-2">
            <div className="flex items-center gap-1.5 font-bold text-indigo-600">
              <Sparkles className="w-4 h-4" />
              <span>Reserve Demo Controls</span>
            </div>
            <button 
              onClick={() => setIsOpen(false)}
              className="text-slate-400 hover:text-slate-600 text-xs px-1"
            >
              ย่อ ✕
            </button>
          </div>

          <div>
            <label className="text-[11px] text-slate-500 font-medium block mb-1">
              สลับสิทธิ์การใช้งาน (Role Switch):
            </label>
            <div className="grid grid-cols-3 gap-1 bg-slate-100 p-1 rounded-lg border border-slate-200">
              {(['user', 'approver', 'admin'] as ReserveRole[]).map((r) => (
                <button
                  key={r}
                  onClick={() => handleRoleChange(r)}
                  className={`py-1 text-[11px] font-semibold rounded transition-all ${
                    role === r
                      ? 'bg-indigo-600 text-white shadow-sm'
                      : 'text-slate-600 hover:text-slate-900 hover:bg-slate-200'
                  }`}
                >
                  {r === 'user' ? 'ผู้ใช้' : r === 'approver' ? 'ผู้อนุมัติ' : 'Admin'}
                </button>
              ))}
            </div>
          </div>

          <div className="flex items-center gap-2 pt-1 border-t border-slate-200">
            <button
              onClick={handleReset}
              className="flex-1 flex items-center justify-center gap-1.5 py-1.5 px-2 rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-700 font-semibold border border-slate-300 transition-colors"
            >
              {resetSuccess ? (
                <>
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                  <span>รีเซ็ตสำเร็จ</span>
                </>
              ) : (
                <>
                  <RotateCcw className="w-3.5 h-3.5 text-indigo-600" />
                  <span>คืนค่าข้อมูลจำลอง</span>
                </>
              )}
            </button>

            <a
              href="https://anuphap.vercel.app/"
              target="_blank"
              rel="noreferrer"
              className="p-1.5 rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-700 hover:text-indigo-600 border border-slate-300 transition-colors"
              title="ดูพอร์ตโฟลิโอคุณอานุภาพ"
            >
              <ExternalLink className="w-4 h-4" />
            </a>
          </div>
        </div>
      ) : (
        <button
          onClick={() => setIsOpen(true)}
          className="flex items-center gap-1.5 px-3 py-2 rounded-full bg-indigo-600 text-white font-bold shadow-lg text-xs hover:bg-indigo-700 transition-all hover:scale-105"
        >
          <Sparkles className="w-3.5 h-3.5" />
          <span>Demo Bar</span>
        </button>
      )}
    </aside>
  );
}
