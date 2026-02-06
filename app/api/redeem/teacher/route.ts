import { NextResponse } from 'next/server';
import { promises as fs } from 'fs';
import path from 'path';
import { getUsers } from '@/lib/db'; 

const usersPath = path.join(process.cwd(), 'data', 'users.json');

export async function POST(request: Request) {
  try {
    const { email, code } = await request.json();

    // Validasi
    if (!code || !code.startsWith("JOIN-")) {
        return NextResponse.json({ error: "Format kode salah." }, { status: 400 });
    }

    // Baca Data User TERBARU (Penting: jangan pakai cache)
    // Kita baca manual file-nya di sini untuk memastikan data fresh sebelum write
    const fileData = await fs.readFile(usersPath, 'utf8');
    const users = JSON.parse(fileData);

    // LOGIKA PENCARIAN SEKOLAH (Rumus Kalkulasi)
    const targetSchool = users.find((u: any) => {
        if (u.role !== 'school') return false;
        
        const uniqueSuffix = u.id ? u.id.slice(-4) : '9999';
        const emailPrefix = u.email?.substring(0, 2).toUpperCase() || 'SC';
        const generatedCode = `JOIN-${emailPrefix}${uniqueSuffix}`;

        return generatedCode === code;
    });

    if (!targetSchool) {
        return NextResponse.json({ error: "Kode sekolah tidak valid." }, { status: 404 });
    }

    // UPDATE GURU
    // Pastikan kita mencari berdasarkan email yang persis
    const teacherIndex = users.findIndex((u: any) => u.email === email);
    
    if (teacherIndex === -1) {
        return NextResponse.json({ error: "Data guru tidak ditemukan." }, { status: 404 });
    }

    // Cek apakah sudah join?
    if (users[teacherIndex].schoolId) {
         return NextResponse.json({ error: "Anda sudah bergabung di sekolah lain." }, { status: 400 });
    }

    // LINKING
    users[teacherIndex].schoolId = targetSchool.id; 
    // Opsional: Simpan nama sekolah juga di data guru
    users[teacherIndex].schoolName = targetSchool.name;

    // SIMPAN PERUBAHAN
    await fs.writeFile(usersPath, JSON.stringify(users, null, 2));

    return NextResponse.json({ 
        success: true, 
        schoolName: targetSchool.name 
    });

  } catch (error) {
    console.error("Redeem Error:", error);
    return NextResponse.json({ error: "Gagal memproses database" }, { status: 500 });
  }
}