# 🎟️ Concert Ticket Booking System (Web Demo for Portfolio)

> **ระบบจองตั๋วคอนเสิร์ต & กิจกรรมการแสดงขนาดใหญ่ (High Concurrency Architecture)**
> ออกแบบมาเพื่อจำลองสถานการณ์ "สงครามกดบัตร" และแสดงสถาปัตยกรรมระบบทั้งฝั่ง Frontend และ Backend อย่างสมบูรณ์แบบสำหรับใส่ใน Portfolio พร้อมโหมด **Web Demo 100% Standalone** ที่สามารถเปิดใช้งานและทดสอบได้ทันทีโดยไม่ต้องต่อ Backend หรือ Database!

---

## 🌟 จุดเด่นของผลงาน (Portfolio Highlights)

1. **สถาปัตยกรรมรองรับผู้ใช้พร้อมกันจำนวนมหาศาล (High Concurrency)**
   - **Asynchronous FIFO Queue**: ระบบรับคำขอกดบัตรเข้าคิวทันทีแบบ Non-blocking ตอบกลับ `trackingId` ในระดับมิลลิวินาที ลดปัญหา Request Timeout และ Server Crash
   - **Atomic Inventory Updates**: หักสต็อกบัตรในระดับ Database ด้วย `$inc` พร้อมเงื่อนไขการันตีจำนวนที่นั่งแม่นยำ 100% ป้องกันปัญหา Overbooking และ Race Condition
   - **Auto-Cancellation & Stock Release**: ระบบนับเวลาถอยหลังการชำระเงิน หากหมดเวลาจะคืนสต็อกเข้าสู่ระบบโดยอัตโนมัติ

2. **ประสบการณ์ผู้ใช้ระดับพรีเมียม (Interactive Frontend Experience)**
   - **Interactive 3D/Dark-themed Seat Map**: ผังที่นั่งแบบไดนามิกพร้อมเวทีคอนเสิร์ตแสงสีเสียง (Stage Glow), แถว A–Z, ช่องทางเดิน (Aisles), แสดงสถานะที่นั่งว่าง / ถูกจองแล้ว / กำลังเลือก
   - **Queue Waiting Screen**: จำลองสถานะคิวขณะกดบัตรแบบเรียลไทม์ (Queue Polling: ตำแหน่งในคิว -> ประมวลผล -> ถึงคิวของคุณ!)
   - **Stripe & Demo Payment Flow**: หน้าชำระเงินพร้อมตัวเลขนับถอยหลัง (Timer Bar) และระบบจำลองบัตรเครดิตแบบ 1-Click โดยไม่ต้องใช้บัตรจริง
   - **Digital Ticket Pass & QR Code**: เมื่อชำระเงินสำเร็จจะแสดงแอนิเมชัน Confetti พร้อมตั๋วคอนเสิร์ตที่มีแถบบาร์โค้ด และ QR Code สำหรับสแกนเข้างาน
   - **Full Admin Panel**: แดชบอร์ดสรุปยอดขาย (Total Revenue, Tickets Sold, Total Bookings), จัดการอีเวนต์ (สร้าง/แก้ไข/ลบ ผังที่นั่ง), และจัดการข้อมูลการจอง

3. **โหมด Web Demo สำหรับ Portfolio (Zero-Backend Required)**
   - ทำงานได้แบบ Standalone ผ่าน **Browser LocalStorage Mock Engine**
   - มี **Demo Toolbar** ที่มุมขวาล่างสำหรับ:
     - สลับบัญชี 1-Click ระหว่าง **Customer** (`user@demo.com`) และ **Admin** (`admin@demo.com`)
     - ปุ่ม **Reset Demo Data** คืนค่าข้อมูลตัวอย่างตั้งต้นได้ตลอดเวลา
     - ลิงก์ตรงไปยัง GitHub Repositories ทั้งฝั่ง Backend และ Frontend

---

## 🏗️ Tech Stack

### 🎨 Frontend (`ticket-frontend`)
- **Framework**: Next.js 16 (App Router), React 19, TypeScript
- **Styling**: Tailwind CSS v4, Lucide Icons
- **Animation**: GSAP (ScrollTrigger, ScrollSmoother), Framer Motion, Canvas Confetti
- **State & Data Fetching**: SWR, Axios, React Hook Form
- **Ticketing & Payments**: React QR Code, Stripe React Elements

### ⚙️ Backend (`ticket-backend`)
- **Framework**: NestJS (Node.js)
- **Database**: MongoDB with Mongoose
- **Security & Auth**: Argon2, JWT (Access & Refresh Tokens), Passport
- **Payment & Docs**: Stripe API, Swagger (OpenAPI)
- **Architecture**: In-Memory Queue, Atomic Concurrency Handlers

---

## 🚀 วิธีการรันโปรเจกต์ (Quick Start)

### 1. รันโหมด Web Demo (แนะนำสำหรับเปิดดูผลงาน)
ไม่ต้องติดตั้ง MongoDB หรือ Backend ใดๆ เพียงรันคำสั่ง:

```bash
# ติดตั้ง dependencies ฝั่ง frontend
cd ticket-frontend
npm install --legacy-peer-deps

# รัน Development Server
npm run dev
```

เปิดเบราว์เซอร์ไปที่: **`http://localhost:3000`**

---

### 2. บัญชีสำหรับทดสอบ (Demo Accounts)

สามารถกดปุ่มสลับบัญชีที่แถบ **Portfolio Demo** มุมขวาล่าง หรือกดปุ่ม 1-Click ที่หน้า Login ได้ทันที:

| บทบาท (Role) | อีเมล (Email) | รหัสผ่าน (Password) | สิทธิ์การเข้าถึง |
| :--- | :--- | :--- | :--- |
| **Customer (ผู้ชม)** | `user@demo.com` | `demo123` | ค้นหาคอนเสิร์ต, เลือกผังที่นั่ง, เข้าคิว, ชำระเงิน, ดูตั๋วใน My Collection |
| **Admin (ผู้ดูแลระบบ)** | `admin@demo.com` | `admin123` | เข้าถึง `/admin`, แดชบอร์ดสถิติ, สร้าง/แก้ไขคอนเสิร์ต, ดูรายการจองทั้งหมด |

---

## 🌐 การนำไป Deploy ขึ้น Portfolio (Vercel / Netlify)

คุณสามารถนำโฟลเดอร์ `ticket-frontend` ไป Deploy ขึ้น **Vercel** หรือ **Netlify** ได้ฟรีใน 1 นาที:
1. Push โค้ดขึ้น GitHub
2. เชื่อมต่อ Repository กับ Vercel
3. ตั้งค่า Root Directory เป็น `ticket-frontend`
4. ตั้งค่า Build Command เป็น `npm run build`
5. ระบบจะ Build ผ่าน 100% พร้อมใช้งานเป็น Live Web Demo บน Portfolio ของคุณทันที!

---

## 🔗 ลิงก์ต้นฉบับ (Original Repositories)
- **Backend**: [https://github.com/Anuphap2/ticket](https://github.com/Anuphap2/ticket)
- **Frontend**: [https://github.com/Anuphap2/ticket-frontend](https://github.com/Anuphap2/ticket-frontend)
