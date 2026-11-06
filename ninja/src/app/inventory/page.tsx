'use client';

import { useState, useEffect } from 'react';
import { mockStore } from '@/lib/mockStore';
import { Product } from '@/types';
import { Boxes, Plus, Search, AlertTriangle, ArrowLeft, X, Edit, Trash2 } from 'lucide-react';
import Link from 'next/link';

export default function InventoryPage() {
  const [products, setProducts] = useState<Product[]>([]);
  const [search, setSearch] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('all');
  const [isAddOpen, setIsAddOpen] = useState(false);

  // Form state
  const [name, setName] = useState('');
  const [sku, setSku] = useState('');
  const [category, setCategory] = useState('Hardware');
  const [costPrice, setCostPrice] = useState(0);
  const [sellPrice, setSellPrice] = useState(0);
  const [stockQty, setStockQty] = useState(10);
  const [minQty, setMinQty] = useState(5);
  const [unit, setUnit] = useState('ชิ้น');

  useEffect(() => {
    setProducts(mockStore.getProducts());
  }, []);

  const refresh = () => {
    setProducts(mockStore.getProducts());
  };

  const handleAddProduct = (e: React.FormEvent) => {
    e.preventDefault();
    const newProd: Product = {
      id: `p-${Date.now()}`,
      name,
      sku: sku || `SKU-${Date.now().toString().slice(-4)}`,
      category,
      costPrice,
      sellPrice,
      stockQty,
      minQty,
      unit,
    };
    const list = [...products, newProd];
    mockStore.saveProducts(list);
    setIsAddOpen(false);
    setName('');
    setSku('');
    setCostPrice(0);
    setSellPrice(0);
    refresh();
  };

  const handleUpdateStock = (id: string, delta: number) => {
    const list = products.map(p => p.id === id ? { ...p, stockQty: Math.max(0, p.stockQty + delta) } : p);
    mockStore.saveProducts(list);
    refresh();
  };

  const handleDelete = (id: string) => {
    if (confirm('ยืนยันลบสินค้านี้ออกจากคลังหรือไม่?')) {
      const list = products.filter(p => p.id !== id);
      mockStore.saveProducts(list);
      refresh();
    }
  };

  const categories = ['all', ...Array.from(new Set(products.map(p => p.category)))];

  const filtered = products.filter(p => {
    const matchesSearch = p.name.toLowerCase().includes(search.toLowerCase()) || p.sku.toLowerCase().includes(search.toLowerCase());
    const matchesCategory = categoryFilter === 'all' || p.category === categoryFilter;
    return matchesSearch && matchesCategory;
  });

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <Link href="/" className="text-zinc-400 hover:text-white transition-colors">
              <ArrowLeft className="w-4 h-4" />
            </Link>
            <h1 className="text-2xl font-black text-white tracking-tight flex items-center gap-2">
              <Boxes className="w-6 h-6 text-amber-400" />
              <span>คลังสินค้า & อุปกรณ์ (Inventory & Stock)</span>
            </h1>
          </div>
          <p className="text-xs text-zinc-400 mt-1">
            จัดการรายการสินค้า ตรวจสอบสต็อกคงเหลือ ต้นทุน ราคาขาย และอัตรากำไร (Margin)
          </p>
        </div>

        <button
          onClick={() => setIsAddOpen(true)}
          className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-amber-400 text-zinc-950 text-xs font-bold hover:bg-amber-300 transition-all shadow-md self-start sm:self-auto"
        >
          <Plus className="w-4 h-4" />
          <span>เพิ่มสินค้าใหม่</span>
        </button>
      </div>

      {/* Filter and Search Bar */}
      <div className="p-4 rounded-xl bg-zinc-900/80 border border-zinc-800 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div className="relative flex-1 max-w-md">
          <Search className="w-4 h-4 text-zinc-500 absolute left-3 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            placeholder="ค้นหาตามชื่อสินค้า หรือ SKU..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full pl-9 pr-4 py-2 bg-zinc-950 border border-zinc-800 rounded-lg text-xs text-zinc-200 placeholder-zinc-500 focus:outline-none focus:border-amber-400"
          />
        </div>

        <div className="flex items-center gap-1.5 overflow-x-auto text-xs">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setCategoryFilter(cat)}
              className={`px-3 py-1.5 rounded-lg whitespace-nowrap font-medium transition-colors ${
                categoryFilter === cat
                  ? 'bg-amber-400 text-zinc-950 font-bold'
                  : 'text-zinc-400 hover:text-white hover:bg-zinc-800'
              }`}
            >
              {cat === 'all' ? 'ทั้งหมด' : cat}
            </button>
          ))}
        </div>
      </div>

      {/* Inventory Table */}
      <div className="rounded-xl bg-zinc-900/80 border border-zinc-800 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-zinc-950/70 text-zinc-400 uppercase text-[10px] tracking-wider border-b border-zinc-800">
              <tr>
                <th className="py-3.5 px-4">SKU / รหัส</th>
                <th className="py-3.5 px-4">ชื่อสินค้า</th>
                <th className="py-3.5 px-4">หมวดหมู่</th>
                <th className="py-3.5 px-4 text-right">ราคาทุน</th>
                <th className="py-3.5 px-4 text-right">ราคาขาย</th>
                <th className="py-3.5 px-4 text-right">กำไร/ชิ้น</th>
                <th className="py-3.5 px-4 text-center">คงเหลือ</th>
                <th className="py-3.5 px-4 text-right">การจัดการ</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-zinc-800/60">
              {filtered.map((p) => {
                const profit = p.sellPrice - p.costPrice;
                const marginPct = p.sellPrice > 0 ? ((profit / p.sellPrice) * 100).toFixed(1) : 0;
                const isLow = p.stockQty <= p.minQty;
                return (
                  <tr key={p.id} className="hover:bg-zinc-800/40 transition-colors">
                    <td className="py-3.5 px-4 font-mono font-bold text-amber-400">{p.sku}</td>
                    <td className="py-3.5 px-4">
                      <div className="font-semibold text-zinc-100">{p.name}</div>
                      {isLow && (
                        <span className="inline-flex items-center gap-1 text-[10px] text-rose-400 font-bold mt-0.5">
                          <AlertTriangle className="w-3 h-3" /> สินค้าใกล้หมด (ต่ำกว่า {p.minQty})
                        </span>
                      )}
                    </td>
                    <td className="py-3.5 px-4 text-zinc-400">
                      <span className="px-2 py-0.5 rounded bg-zinc-800 text-zinc-300 text-[11px]">
                        {p.category}
                      </span>
                    </td>
                    <td className="py-3.5 px-4 text-right font-mono text-zinc-400">฿{p.costPrice.toLocaleString()}</td>
                    <td className="py-3.5 px-4 text-right font-mono font-bold text-white">฿{p.sellPrice.toLocaleString()}</td>
                    <td className="py-3.5 px-4 text-right font-mono text-emerald-400">
                      ฿{profit.toLocaleString()} <span className="text-[10px] text-zinc-500">({marginPct}%)</span>
                    </td>
                    <td className="py-3.5 px-4 text-center">
                      <div className="inline-flex items-center gap-1.5 bg-zinc-950 px-2 py-1 rounded-lg border border-zinc-800">
                        <button
                          onClick={() => handleUpdateStock(p.id, -1)}
                          className="w-5 h-5 rounded hover:bg-zinc-800 text-zinc-400 hover:text-white font-bold"
                        >
                          -
                        </button>
                        <span className={`font-mono font-bold px-1.5 ${isLow ? 'text-rose-400' : 'text-zinc-200'}`}>
                          {p.stockQty} {p.unit}
                        </span>
                        <button
                          onClick={() => handleUpdateStock(p.id, 1)}
                          className="w-5 h-5 rounded hover:bg-zinc-800 text-zinc-400 hover:text-white font-bold"
                        >
                          +
                        </button>
                      </div>
                    </td>
                    <td className="py-3.5 px-4 text-right">
                      <button
                        onClick={() => handleDelete(p.id)}
                        className="p-1.5 text-zinc-500 hover:text-rose-400 hover:bg-zinc-800 rounded transition-colors"
                        title="ลบสินค้า"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>

      {/* Add Modal */}
      {isAddOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm">
          <div className="bg-zinc-900 border border-zinc-700 rounded-2xl w-full max-w-md p-6 space-y-4 text-xs text-zinc-200 shadow-2xl">
            <div className="flex items-center justify-between border-b border-zinc-800 pb-3">
              <h2 className="text-base font-bold text-white flex items-center gap-2">
                <Boxes className="w-5 h-5 text-amber-400" />
                <span>เพิ่มสินค้าใหม่เข้าคลัง</span>
              </h2>
              <button onClick={() => setIsAddOpen(false)} className="text-zinc-400 hover:text-white">
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleAddProduct} className="space-y-3">
              <div>
                <label className="block text-zinc-400 mb-1">ชื่อสินค้า / บริการ</label>
                <input
                  type="text"
                  required
                  placeholder="เช่น Router MikroTik CCR2004"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full bg-zinc-950 border border-zinc-800 rounded p-2 text-zinc-200"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-zinc-400 mb-1">SKU / รหัสสินค้า</label>
                  <input
                    type="text"
                    placeholder="เช่น NET-MIK-01"
                    value={sku}
                    onChange={(e) => setSku(e.target.value)}
                    className="w-full bg-zinc-950 border border-zinc-800 rounded p-2 text-zinc-200"
                  />
                </div>
                <div>
                  <label className="block text-zinc-400 mb-1">หมวดหมู่</label>
                  <input
                    type="text"
                    value={category}
                    onChange={(e) => setCategory(e.target.value)}
                    className="w-full bg-zinc-950 border border-zinc-800 rounded p-2 text-zinc-200"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-zinc-400 mb-1">ราคาทุน (Cost)</label>
                  <input
                    type="number"
                    required
                    value={costPrice}
                    onChange={(e) => setCostPrice(Number(e.target.value))}
                    className="w-full bg-zinc-950 border border-zinc-800 rounded p-2 text-zinc-200"
                  />
                </div>
                <div>
                  <label className="block text-zinc-400 mb-1">ราคาขาย (Price)</label>
                  <input
                    type="number"
                    required
                    value={sellPrice}
                    onChange={(e) => setSellPrice(Number(e.target.value))}
                    className="w-full bg-zinc-950 border border-zinc-800 rounded p-2 text-zinc-200"
                  />
                </div>
              </div>

              <div className="grid grid-cols-3 gap-3">
                <div>
                  <label className="block text-zinc-400 mb-1">จำนวนตั้งต้น</label>
                  <input
                    type="number"
                    value={stockQty}
                    onChange={(e) => setStockQty(Number(e.target.value))}
                    className="w-full bg-zinc-950 border border-zinc-800 rounded p-2 text-zinc-200"
                  />
                </div>
                <div>
                  <label className="block text-zinc-400 mb-1">แจ้งเตือนต่ำสุด</label>
                  <input
                    type="number"
                    value={minQty}
                    onChange={(e) => setMinQty(Number(e.target.value))}
                    className="w-full bg-zinc-950 border border-zinc-800 rounded p-2 text-zinc-200"
                  />
                </div>
                <div>
                  <label className="block text-zinc-400 mb-1">หน่วยนับ</label>
                  <input
                    type="text"
                    value={unit}
                    onChange={(e) => setUnit(e.target.value)}
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
                  บันทึกสินค้า
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
