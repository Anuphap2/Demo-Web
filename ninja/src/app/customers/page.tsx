'use client';

import { useState, useEffect } from 'react';
import { mockStore } from '@/lib/mockStore';
import { Customer } from '@/types';
import { Users, Plus, ArrowLeft, X, Building, Phone, Mail, MapPin } from 'lucide-react';
import Link from 'next/link';

export default function CustomersPage() {
  const [customers, setCustomers] = useState<Customer[]>([]);
  const [isAddOpen, setIsAddOpen] = useState(false);

  // Form
  const [name, setName] = useState('');
  const [code, setCode] = useState('');
  const [taxId, setTaxId] = useState('');
  const [address, setAddress] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [branch, setBranch] = useState('สำนักงานใหญ่');

  useEffect(() => {
    setCustomers(mockStore.getCustomers());
  }, []);

  const refresh = () => setCustomers(mockStore.getCustomers());

  const handleAdd = (e: React.FormEvent) => {
    e.preventDefault();
    const newCust: Customer = {
      id: `c-${Date.now()}`,
      code: code || `CUST-${String(customers.length + 1).padStart(3, '0')}`,
      name,
      taxId,
      address,
      phone,
      email,
      branch,
    };
    const list = [...customers, newCust];
    mockStore.saveCustomers(list);
    setIsAddOpen(false);
    setName('');
    setTaxId('');
    setAddress('');
    setPhone('');
    setEmail('');
    refresh();
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <Link href="/" className="text-zinc-400 hover:text-white transition-colors">
              <ArrowLeft className="w-4 h-4" />
            </Link>
            <h1 className="text-2xl font-black text-white tracking-tight flex items-center gap-2">
              <Users className="w-6 h-6 text-amber-400" />
              <span>ทะเบียนลูกค้า & คู่ค้า (Customer CRM)</span>
            </h1>
          </div>
          <p className="text-xs text-zinc-400 mt-1">
            ข้อมูลบริษัท นิติบุคคล เลขประจำตัวผู้เสียภาษี และที่อยู่ออกใบกำกับภาษี
          </p>
        </div>

        <button
          onClick={() => setIsAddOpen(true)}
          className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-amber-400 text-zinc-950 text-xs font-bold hover:bg-amber-300 transition-all shadow-md self-start sm:self-auto"
        >
          <Plus className="w-4 h-4" />
          <span>เพิ่มลูกค้าใหม่</span>
        </button>
      </div>

      {/* Customers Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {customers.map((c) => (
          <div key={c.id} className="p-5 rounded-xl bg-zinc-900/80 border border-zinc-800 space-y-3 hover:border-zinc-700 transition-colors">
            <div className="flex items-start justify-between">
              <div>
                <span className="font-mono text-[10px] font-bold text-amber-400 bg-amber-400/10 px-2 py-0.5 rounded border border-amber-400/30">
                  {c.code}
                </span>
                <h2 className="text-base font-bold text-white mt-1.5">{c.name}</h2>
                <span className="text-xs text-zinc-400">สาขา: {c.branch}</span>
              </div>
              <div className="p-2 rounded-lg bg-zinc-800 text-zinc-400">
                <Building className="w-4 h-4" />
              </div>
            </div>

            <div className="space-y-1.5 text-xs text-zinc-300 pt-2 border-t border-zinc-800">
              <p className="flex items-center gap-2 text-zinc-400">
                <span className="font-bold text-zinc-300">Tax ID:</span> {c.taxId || 'ไม่ระบุ'}
              </p>
              <p className="flex items-center gap-2 text-zinc-400">
                <MapPin className="w-3.5 h-3.5 text-zinc-500 shrink-0" />
                <span className="line-clamp-2">{c.address}</span>
              </p>
              <div className="flex items-center gap-4 text-zinc-400 pt-1">
                <span className="flex items-center gap-1.5">
                  <Phone className="w-3.5 h-3.5 text-zinc-500" /> {c.phone}
                </span>
                <span className="flex items-center gap-1.5">
                  <Mail className="w-3.5 h-3.5 text-zinc-500" /> {c.email}
                </span>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Add Modal */}
      {isAddOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm">
          <div className="bg-zinc-900 border border-zinc-700 rounded-2xl w-full max-w-md p-6 space-y-4 text-xs text-zinc-200 shadow-2xl">
            <div className="flex items-center justify-between border-b border-zinc-800 pb-3">
              <h2 className="text-base font-bold text-white flex items-center gap-2">
                <Users className="w-5 h-5 text-amber-400" />
                <span>เพิ่มลูกค้าใหม่</span>
              </h2>
              <button onClick={() => setIsAddOpen(false)} className="text-zinc-400 hover:text-white">
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleAdd} className="space-y-3">
              <div>
                <label className="block text-zinc-400 mb-1">ชื่อบริษัท / องค์กร / บุคคล</label>
                <input
                  type="text"
                  required
                  placeholder="เช่น บริษัท นอร์ธเทิร์น เทค จำกัด"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full bg-zinc-950 border border-zinc-800 rounded p-2 text-zinc-200"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-zinc-400 mb-1">เลขประจำตัวผู้เสียภาษี</label>
                  <input
                    type="text"
                    placeholder="13 หลัก"
                    value={taxId}
                    onChange={(e) => setTaxId(e.target.value)}
                    className="w-full bg-zinc-950 border border-zinc-800 rounded p-2 text-zinc-200"
                  />
                </div>
                <div>
                  <label className="block text-zinc-400 mb-1">สาขา</label>
                  <input
                    type="text"
                    value={branch}
                    onChange={(e) => setBranch(e.target.value)}
                    className="w-full bg-zinc-950 border border-zinc-800 rounded p-2 text-zinc-200"
                  />
                </div>
              </div>

              <div>
                <label className="block text-zinc-400 mb-1">ที่อยู่ออกใบกำกับภาษี</label>
                <textarea
                  rows={2}
                  required
                  value={address}
                  onChange={(e) => setAddress(e.target.value)}
                  className="w-full bg-zinc-950 border border-zinc-800 rounded p-2 text-zinc-200"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-zinc-400 mb-1">เบอร์โทรศัพท์</label>
                  <input
                    type="text"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    className="w-full bg-zinc-950 border border-zinc-800 rounded p-2 text-zinc-200"
                  />
                </div>
                <div>
                  <label className="block text-zinc-400 mb-1">อีเมล</label>
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full bg-zinc-950 border border-zinc-800 rounded p-2 text-zinc-200"
                  />
                </div>
              </div>

              <div className="flex justify-end gap-2 pt-3">
                <button
                  type="button"
                  onClick={() => setIsAddOpen(false)}
                  className="px-4 py-2 bg-zinc-800 rounded text-zinc-300"
                >
                  ยกเลิก
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 bg-amber-400 rounded text-zinc-950 font-bold hover:bg-amber-300"
                >
                  บันทึกข้อมูล
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
