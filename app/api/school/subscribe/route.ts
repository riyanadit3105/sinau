import { NextResponse } from 'next/server';
import { promises as fs } from 'fs';
import path from 'path';

const usersPath = path.join(process.cwd(), 'data', 'users.json');

export async function POST(request: Request) {
  try {
    const { schoolId, tier, cycle } = await request.json(); 
    // tier: 9 | 18 | 36 | 2 (trial)
    // cycle: 'monthly' | 'yearly' | 'trial'

    // Baca Database
    const data = await fs.readFile(usersPath, 'utf8');
    let users = JSON.parse(data);

    const index = users.findIndex((u:any) => u.email === schoolId);
    if (index === -1) return NextResponse.json({ error: "Sekolah tidak ditemukan" }, { status: 404 });

    // --- LOGIKA HITUNG DURASI ---
    let durationDays = 30;
    
    if (cycle === 'trial') {
        durationDays = 30; // Trial 1 bulan
    } else if (cycle === 'monthly') {
        durationDays = 30;
    } else if (cycle === 'yearly') {
        durationDays = 365;
    }

    // Hitung Expired Date
    const nextDue = new Date();
    nextDue.setDate(nextDue.getDate() + durationDays);

    // Update User
    users[index].subscriptionStatus = 'active';
    users[index].plan = cycle === 'trial' ? 'trial' : `${cycle}_${tier}`; // ex: monthly_18
    users[index].maxClasses = tier; // 2, 9, 18, atau 36
    users[index].maxStudentsPerClass = 36; 
    users[index].subscriptionValidUntil = nextDue.toISOString();

    await fs.writeFile(usersPath, JSON.stringify(users, null, 2));

    return NextResponse.json({ success: true, user: users[index] });
  } catch (e) {
    return NextResponse.json({ error: "Gagal memproses pembelian" }, { status: 500 });
  }
}