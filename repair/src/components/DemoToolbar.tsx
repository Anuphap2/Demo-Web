'use client';

import { useState, useEffect } from 'react';
import { mockStore } from '@/lib/mockStore';
import { RepairRole } from '@/types';
import { RotateCcw, ExternalLink, Sparkles, CheckCircle2 } from 'lucide-react';

export default function DemoToolbar() {
  const [role, setRole] = useState<RepairRole>('user');
  const [resetSuccess, setResetSuccess] = useState(false);
  const [isOpen, setIsOpen] = useState(true);

  useEffect(() => {
    setRole(mockStore.getRole());
  }, []);

  const handleRoleChange = (newRole: RepairRole) => {
    setRole(newRole);
    mockStore.setRole(newRole);
    window.location.reload();
  };

  const handleReset = () => {
    if (confirm('ต้องการคืนค่าข้อมูลตัวอย่างอุปกรณ์ การยืม และการแจ้งซ่อมทั้งหมดหรือไม่?')) {
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
        <div className="bg-slate-900/95 border border-slate-700 shadow-2xl rounded-2xl p-3.5 backdrop-blur-xl text-xs text-slate-300 w-72 flex flex-col gap-2.5 transition-all">
          <div className="flex items-center justify-between border-b border-slate-800 pb-2">
            <div className="flex items-center gap-1.5 font-bold text-cyan-400">
              <Sparkles className="w-4 h-4" />
              <span>Repair & Loan Controls</span>
            </div>
            <button 
              onClick={() => setIsOpen(false)}
              className="text-slate-500 hover:text-slate-300 text-xs px-1"
            >
              ย่อ ✕
            </button>
          </div>

          <div>
            <label className="text-[11px] text-slate-400 font-medium block mb-1">
              สลับสิทธิ์การใช้งาน (Role Switch):
            </label>
            <div className="grid grid-cols-3 gap-1 bg-slate-950 p-1 rounded-lg border border-slate-800">
              {(['user', 'officer', 'admin'] as RepairRole[]).map((r) => (
                <button
                  key={r}
                  onClick={() => handleRoleChange(r)}
                  className={`py-1 text-[11px] font-semibold rounded transition-all ${
                    role === r
                      ? 'bg-cyan-500 text-slate-950 shadow-sm'
                      : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800'
                  }`}
                >
                  {r === 'user' ? 'ผู้ใช้' : r === 'officer' ? 'ช่างไอที' : 'Admin'}
                </button>
              ))}
            </div>
          </div>

          <div className="flex items-center gap-2 pt-1 border-t border-slate-800">
            <button
              onClick={handleReset}
              className="flex-1 flex items-center justify-center gap-1.5 py-1.5 px-2 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-200 font-semibold border border-slate-700 transition-colors"
            >
              {resetSuccess ? (
                <>
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
                  <span>รีเซ็ตสำเร็จ</span>
                </>
              ) : (
                <>
                  <RotateCcw className="w-3.5 h-3.5 text-cyan-400" />
                  <span>คืนค่าข้อมูลจำลอง</span>
                </>
              )}
            </button>

            <a
              href="https://anuphap.vercel.app/"
              target="_blank"
              rel="noreferrer"
              className="p-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-cyan-400 border border-slate-700 transition-colors"
              title="ดูพอร์ตโฟลิโอคุณอานุภาพ"
            >
              <ExternalLink className="w-4 h-4" />
            </a>
          </div>
        </div>
      ) : (
        <button
          onClick={() => setIsOpen(true)}
          className="flex items-center gap-1.5 px-3 py-2 rounded-full bg-cyan-500 text-slate-950 font-bold shadow-lg text-xs hover:bg-cyan-400 transition-all hover:scale-105"
        >
          <Sparkles className="w-3.5 h-3.5" />
          <span>Demo Bar</span>
        </button>
      )}
    </aside>
  );
}
