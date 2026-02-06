import { NextResponse } from 'next/server';
import { promises as fs } from 'fs';
import path from 'path';
import { getUsers, saveUser } from '@/lib/db'; // Asumsi helper ini ada

const classesPath = path.join(process.cwd(), 'data', 'classes.json');
const usersPath = path.join(process.cwd(), 'data', 'users.json');

export async function POST(request: Request) {
  try {
    const { email, code } = await request.json();
    
    // 1. Ambil Data Kelas
    let classes = [];
    try {
      const classesData = await fs.readFile(classesPath, 'utf8');
      classes = JSON.parse(classesData);
    } catch (e) { classes = [] }

    const targetClass = classes.find((c: any) => c.token === code);

    if (!targetClass) {
      return NextResponse.json({ error: "Kode kelas tidak valid!" }, { status: 404 });
    }

    // 2. Ambil Data Siswa
    let users = await getUsers();
    const studentIndex = users.findIndex((u: any) => u.email === email);

    if (studentIndex === -1) {
      return NextResponse.json({ error: "Siswa tidak ditemukan" }, { status: 404 });
    }

    // --- PERBAIKAN BUG: CEK APAKAH SUDAH MASUK KELAS? ---
    if (users[studentIndex].classId) {
       return NextResponse.json({ 
         error: "Kamu sudah terdaftar di kelas lain! Hubungi guru jika ingin pindah." 
       }, { status: 400 });
    }
    // ----------------------------------------------------

    // 3. Update Data Siswa
    users[studentIndex].schoolId = targetClass.schoolId;
    users[studentIndex].classId = targetClass.id;
    users[studentIndex].className = targetClass.name; 

    // Simpan Users
    await fs.writeFile(usersPath, JSON.stringify(users, null, 2));

    // 4. Update Counter Kelas (Hanya nambah jika lolos pengecekan di atas)
    const classIndex = classes.findIndex((c:any) => c.id === targetClass.id);
    if (classIndex !== -1) {
        classes[classIndex].studentsCount = (classes[classIndex].studentsCount || 0) + 1;
        await fs.writeFile(classesPath, JSON.stringify(classes, null, 2));
    }

    return NextResponse.json({ success: true, className: targetClass.name });

  } catch (error) {
    return NextResponse.json({ error: "Gagal memproses kode" }, { status: 500 });
  }
}