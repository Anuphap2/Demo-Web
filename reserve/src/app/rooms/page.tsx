'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { mockStore } from '@/lib/mockStore';
import { Room } from '@/types';
import { DoorOpen, Users, MapPin, CheckCircle2, CalendarPlus, ArrowLeft } from 'lucide-react';

export default function RoomsPage() {
  const [rooms, setRooms] = useState<Room[]>([]);

  useEffect(() => {
    setRooms(mockStore.getRooms());
  }, []);

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <Link href="/" className="text-slate-400 hover:text-slate-700 transition-colors">
              <ArrowLeft className="w-4 h-4" />
            </Link>
            <h1 className="text-2xl font-black text-slate-900 tracking-tight flex items-center gap-2">
              <DoorOpen className="w-6 h-6 text-indigo-600" />
              <span>ห้องประชุมทั้งหมด (Meeting Rooms Directory)</span>
            </h1>
          </div>
          <p className="text-xs text-slate-500 mt-1">
            รายละเอียด ขนาดความจุ และสิ่งอำนวยความสะดวกของห้องประชุมทุกห้องในระบบ
          </p>
        </div>

        <Link
          href="/book"
          className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-indigo-600 text-white text-xs font-bold hover:bg-indigo-700 transition-all shadow-md self-start sm:self-auto"
        >
          <CalendarPlus className="w-4 h-4" />
          <span>จองห้องประชุม</span>
        </Link>
      </div>

      {/* Room Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {rooms.map((room) => (
          <div 
            key={room.id}
            className="rounded-2xl bg-white border border-slate-200 overflow-hidden shadow-xs hover:shadow-md transition-all flex flex-col group"
          >
            {/* Room Image */}
            <div className="relative h-48 w-full bg-slate-100 overflow-hidden">
              <Image
                src={room.img}
                alt={room.name}
                fill
                className="object-cover group-hover:scale-105 transition-transform duration-300"
              />
              <div className="absolute top-3 right-3 px-2.5 py-1 rounded-full bg-white/90 backdrop-blur-md text-[11px] font-bold text-slate-800 shadow-sm flex items-center gap-1">
                <Users className="w-3.5 h-3.5 text-indigo-600" />
                <span>จุได้ {room.capacity} ที่นั่ง</span>
              </div>
            </div>

            {/* Room Info */}
            <div className="p-5 flex-1 flex flex-col justify-between space-y-4">
              <div className="space-y-2">
                <div className="flex items-center gap-1.5 text-xs text-slate-500">
                  <MapPin className="w-3.5 h-3.5 text-indigo-500" />
                  <span>{room.building} · {room.floor}</span>
                </div>

                <h2 className="text-base font-bold text-slate-900 group-hover:text-indigo-600 transition-colors">
                  {room.name}
                </h2>

                <p className="text-xs text-slate-600 line-clamp-2 leading-relaxed">
                  {room.description}
                </p>

                {/* Facilities Pills */}
                <div className="pt-2">
                  <span className="text-[10px] uppercase font-bold text-slate-400 tracking-wider block mb-1.5">
                    สิ่งอำนวยความสะดวก:
                  </span>
                  <div className="flex flex-wrap gap-1">
                    {room.facilities.map((f, idx) => (
                      <span
                        key={idx}
                        className="inline-flex items-center gap-1 px-2 py-0.5 rounded-md bg-slate-100 text-slate-700 text-[11px] font-medium"
                      >
                        <CheckCircle2 className="w-3 h-3 text-emerald-600" />
                        <span>{f}</span>
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              {/* Action Button */}
              <div className="pt-2 border-t border-slate-100">
                <Link
                  href={`/book?room=${room.id}`}
                  className="w-full flex items-center justify-center gap-2 py-2 px-3 rounded-xl bg-slate-900 text-white text-xs font-bold hover:bg-indigo-600 transition-colors"
                >
                  <CalendarPlus className="w-3.5 h-3.5" />
                  <span>จองห้องนี้</span>
                </Link>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
