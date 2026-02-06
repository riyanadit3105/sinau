import { NextResponse } from 'next/server';
import { promises as fs } from 'fs';
import path from 'path';

const classesPath = path.join(process.cwd(), 'data', 'classes.json');
const usersPath = path.join(process.cwd(), 'data', 'users.json');

export async function POST(request: Request) {
  try {
    const { email, code } = await request.json();

    // 1. Baca Data Kelas
    const classesData = await fs.readFile(classesPath, 'utf8');
    let classes = JSON.parse(classesData);

    // 2. Cari Kelas Berdasarkan Token
    const targetClassIndex = classes.findIndex((c: any) => c.token === code);
    
    if (targetClassIndex === -1) {
      return NextResponse.json({ error: "Kode kelas tidak ditemukan!" }, { status: 404 });
    }

    const targetClass = classes[targetClassIndex];

    // 3. Update Data User (Siswa)
    const usersData = await fs.readFile(usersPath, 'utf8');
    let users = JSON.parse(usersData);
    
    const userIndex = users.findIndex((u: any) => u.email === email);
    if (userIndex === -1) return NextResponse.json({ error: "User tidak ditemukan" }, { status: 404 });

    // Update User: Masukkan classId & className
    users[userIndex].classId = targetClass.id;
    users[userIndex].className = targetClass.name;
    users[userIndex].schoolId = targetClass.schoolId; // Ikut sekolahnya juga

    // 4. Update Data Kelas (Tambah Siswa ke List)
    // Pastikan array students ada
    if (!classes[targetClassIndex].students) classes[targetClassIndex].students = [];
    
    // Cek duplikasi
    const isAlreadyIn = classes[targetClassIndex].students.find((s: any) => s.email === email);
    if (!isAlreadyIn) {
        classes[targetClassIndex].students.push({
            name: users[userIndex].name,
            email: users[userIndex].email,
            joinedAt: new Date().toISOString()
        });
        classes[targetClassIndex].studentsCount = classes[targetClassIndex].students.length;
    }

    // 5. Simpan Perubahan
    await fs.writeFile(usersPath, JSON.stringify(users, null, 2));
    await fs.writeFile(classesPath, JSON.stringify(classes, null, 2));

    return NextResponse.json({ success: true, className: targetClass.name });

  } catch (error) {
    return NextResponse.json({ error: "Gagal bergabung kelas" }, { status: 500 });
  }
}