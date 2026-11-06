# 🌐 Portfolio Web Demos (ผลงานเว็บไซต์จำลองสำหรับ Portfolio)

> **เว็บไซต์แนะนำตัวและผลงาน**: [https://anuphap.vercel.app/](https://anuphap.vercel.app/)  
> **ผู้พัฒนา**: อานุภาพ ศรเทียน (Anuphap Sornthian) — Full-stack developer

รวม 3 โปรเจกต์ที่ได้รับการยกระดับและรีแฟคเตอร์จาก PHP Monolithic สู่ **Modern Standalone Web Demos (Next.js 16 + React 19 + Tailwind CSS + In-Browser Mock Store)** สำหรับจัดแสดงบนเว็บไซต์ผลงานส่วนตัว พร้อมโหมดจำลองระบบ 100% ไม่ต้องติดตั้ง Database ภายนอก และพร้อม Deploy ขึ้น Vercel ได้ทันที!

---

## 📁 โครงสร้างโปรเจกต์ (Project Directory)

```text
d:\Demo-Web\
├── ninja\       # 1. N!NJA IT — ระบบ ERP บริหารงานธุรกิจ ออกบิล ใบเสนอราคา สต็อกสินค้า และภาษี
├── reserve\     # 2. RESERVE — ระบบจองห้องประชุมและทรัพยากรส่วนกลาง ปฏิทินแบบ Interactive
├── repair\      # 3. IT SERVICE — ศูนย์คอมพิวเตอร์ ระบบยืม-คืนอุปกรณ์ไอทีและแจ้งซ่อมออนไลน์
├── ticket\      # 4. TICKET — ระบบจองตั๋วคอนเสิร์ตและอีเวนต์สถาปัตยกรรม High Concurrency
└── package.json # Root workspace scripts สำหรับสั่งรันหรือบิลด์โปรเจกต์
```

---

## 🌟 รายละเอียดแต่ละโปรเจกต์ (Project Highlights)

### 1. 💼 `ninja` — N!NJA IT Enterprise ERP & Billing
- **URL โลคอล**: [http://localhost:3001](http://localhost:3001)
- **จุดเด่น**:
  - แดชบอร์ดสรุปยอดขายรวม กำไรขั้นต้น ภาษีมูลค่าเพิ่ม ภ.พ. 30 และลูกหนี้คงค้าง
  - ระบบออกบิลงาน (Job Invoicing) คำนวณ VAT 7% และหัก ณ ที่จ่าย 1%, 3% อัตโนมัติ
  - ระบบใบเสนอราคา (Quotations) พร้อมปุ่มแปลงเป็นบิลงานจริง (Convert to Job) ใน 1 คลิก
  - ทะเบียนคลังสินค้า (Stock Inventory) คำนวณ Margin กำไรต่อชิ้น และแจ้งเตือนสต็อกใกล้หมด
  - ระบบบัญชีลูกหนี้และตรวจสลิปโอนเงิน (Receivable & Payment Slip Inspector)
  - หน้าพิมพ์เอกสารใบแจ้งหนี้/ใบกำกับภาษีขนาด A4 มาตรฐานสากล

### 2. 📅 `reserve` — Smart Meeting Room & Resource Reservation
- **URL โลคอล**: [http://localhost:3002](http://localhost:3002)
- **จุดเด่น**:
  - ปฏิทินแสดงตารางการใช้ห้องประชุมแบบไดนามิกรายเดือน/รายวัน รองรับปี พ.ศ. ไทย
  - คลังภาพห้องประชุมความคมชัดสูง สเปกสิ่งอำนวยความสะดวก และจำนวนที่นั่ง
  - ฟอร์มการจองห้องประชุมพร้อมระบบตรวจจับเวลาซ้อนกัน (Conflict Detection) แบบเรียลไทม์
  - บัตรอนุญาตเข้าห้องประชุมดิจิทัล (Digital Meeting Pass) พร้อม QR Code สำหรับสแกนเช็คอิน
  - ศูนย์ควบคุมเจ้าหน้าที่ (Admin Approval Hub) สำหรับอนุมัติ/ปฏิเสธคำขอ และส่งออกรายงาน CSV

### 3. 🛠️ `repair` — ศูนย์คอมพิวเตอร์ IT Service Desk & Equipment Loan
- **URL โลคอล**: [http://localhost:3003](http://localhost:3003)
- **จุดเด่น**:
  - แคตตาล็อกอุปกรณ์ไอทีพร้อมให้ยืม (Notebook, Projector, สายแปลง, จอพกพา, แท็บเล็ต)
  - ฟอร์มขอยืมอุปกรณ์ระบุวัตถุประสงค์ กำหนดคืน และเงื่อนไขการรับผิดชอบ
  - ระบบเปิดใบแจ้งซ่อมคอมพิวเตอร์ (Helpdesk) แยกหมวดหมู่ Hardware, Software, Network, Printer
  - ระบบติดตามสถานะคำขอ (Tracking Timeline) แสดงขั้นตอนการซ่อมและความคืบหน้าแบบสด
  - แผงควบคุมเจ้าหน้าที่ช่างไอที บันทึกผลการตรวจเช็ค และสแกนรับคืนอุปกรณ์

---

## 🚀 วิธีการรันโปรเจกต์ (How to Run)

คุณสามารถสั่งรันแต่ละโปรเจกต์แยกกัน หรือรันพร้อมกันได้ผ่านคำสั่งด้านล่าง:

### รันทีละโปรเจกต์:
```bash
# รันโปรเจกต์ N!NJA IT (Port 3001)
npm run dev:ninja

# รันโปรเจกต์ RESERVE ห้องประชุม (Port 3002)
npm run dev:reserve

# รันโปรเจกต์ REPAIR แจ้งซ่อม/ยืมอุปกรณ์ (Port 3003)
npm run dev:repair
```

หรือเข้าไปในโฟลเดอร์ของแต่ละโปรเจกต์โดยตรง:
```bash
cd ninja
npm run dev    # เปิดที่ http://localhost:3001

cd ../reserve
npm run dev    # เปิดที่ http://localhost:3002

cd ../repair
npm run dev    # เปิดที่ http://localhost:3003
```

---

## 🛠️ Demo Controller Bar
ทุกโปรเจกต์มี **Demo Toolbar** อยู่ที่มุมขวาล่างของหน้าจอ:
- **Role Switcher**: สลับสิทธิ์ผู้ใช้งานได้ทันที (User / Officer / Admin / Accountant)
- **Reset Demo Data**: คืนค่าข้อมูลตัวอย่างตั้งต้นได้ตลอดเวลาเมื่อต้องการเริ่มต้นทดสอบใหม่
- **Portfolio Link**: เชื่อมต่อไปยังเว็บไซต์หลัก [https://anuphap.vercel.app/](https://anuphap.vercel.app/)
