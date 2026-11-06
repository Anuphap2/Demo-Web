import type { Metadata } from 'next';
import './globals.css';
import Navbar from '@/components/Navbar';
import DemoToolbar from '@/components/DemoToolbar';

export const metadata: Metadata = {
  title: 'N!NJA IT — ระบบบริหารงานธุรกิจ ออกบิล และการเงิน (ERP & Invoicing Demo)',
  description: 'ระบบออกบิล ใบเสนอราคา สต็อกสินค้า ภาษีมูลค่าเพิ่ม และการเงิน พอร์ตโฟลิโอผลงาน อานุภาพ ศรเทียน',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="th" className="dark h-full">
      <body className="min-h-full flex flex-col bg-[#0c0d0e] text-zinc-100 antialiased selection:bg-amber-400 selection:text-zinc-950">
        <Navbar />
        <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-6">
          {children}
        </main>
        <footer className="border-t border-zinc-900 bg-zinc-950 py-6 text-center text-xs text-zinc-500">
          <p>© 2026 N!NJA IT Enterprise Management Suite · ผลงานพัฒนาโดย อานุภาพ ศรเทียน (Portfolio Web Demo)</p>
        </footer>
        <DemoToolbar />
      </body>
    </html>
  );
}
