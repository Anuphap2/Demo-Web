import type { Metadata } from 'next';
import './globals.css';
import Navbar from '@/components/Navbar';
import DemoToolbar from '@/components/DemoToolbar';

export const metadata: Metadata = {
  title: 'ศูนย์คอมพิวเตอร์ — ระบบยืม-คืนอุปกรณ์ไอทีและแจ้งซ่อมออนไลน์ (IT Service Desk)',
  description: 'ระบบยืม-คืนอุปกรณ์คอมพิวเตอร์ แจ้งซ่อมไอที และติดตามสถานะแบบเรียลไทม์ พอร์ตโฟลิโอผลงาน อานุภาพ ศรเทียน',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="th" className="dark h-full">
      <body className="min-h-full flex flex-col bg-[#090d16] text-slate-100 antialiased selection:bg-cyan-500 selection:text-slate-950">
        <Navbar />
        <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-6">
          {children}
        </main>
        <footer className="border-t border-slate-800 bg-slate-950 py-6 text-center text-xs text-slate-500">
          <p>© 2026 ศูนย์คอมพิวเตอร์ (IT Service Desk & Equipment Loan) · ผลงานพัฒนาโดย อานุภาพ ศรเทียน (Portfolio Web Demo)</p>
        </footer>
        <DemoToolbar />
      </body>
    </html>
  );
}
