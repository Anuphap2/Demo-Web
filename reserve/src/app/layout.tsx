import type { Metadata } from 'next';
import './globals.css';
import Navbar from '@/components/Navbar';
import DemoToolbar from '@/components/DemoToolbar';

export const metadata: Metadata = {
  title: 'ระบบจองห้องประชุมและทรัพยากร (Smart Meeting Room Reservation)',
  description: 'ระบบจองห้องประชุมออนไลน์ ปฏิทินแสดงการใช้งาน และระบบอนุมัติคำขอ พอร์ตโฟลิโอผลงาน อานุภาพ ศรเทียน',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="th" className="h-full">
      <body className="min-h-full flex flex-col bg-slate-50 text-slate-800 antialiased selection:bg-indigo-600 selection:text-white">
        <Navbar />
        <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-6">
          {children}
        </main>
        <footer className="border-t border-slate-200 bg-white py-6 text-center text-xs text-slate-500">
          <p>© 2024 ระบบจองห้องประชุมออนไลน์ (Smart Reservation) · ผลงานพัฒนาโดย อานุภาพ ศรเทียน (Portfolio Web Demo)</p>
        </footer>
        <DemoToolbar />
      </body>
    </html>
  );
}
