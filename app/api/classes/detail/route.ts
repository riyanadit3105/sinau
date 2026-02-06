import { NextResponse } from 'next/server';
import { promises as fs } from 'fs';
import path from 'path';
import { getUsers } from '@/lib/db';

const classesPath = path.join(process.cwd(), 'data', 'classes.json');

export async function POST(request: Request) {
  try {
    const { classId, schoolId } = await request.json(); // ID Kelas & ID Sekolah
    
    // 1. Ambil Data Kelas
    const classesData = await fs.readFile(classesPath, 'utf8');
    const classes = JSON.parse(classesData);
    const targetClass = classes.find((c:any) => c.id === classId);

    if (!targetClass) return NextResponse.json({ error: "Kelas tidak ada" }, { status: 404 });

    // 2. Ambil Semua User
    const users = await getUsers();

    // 3. Cari Siswa di kelas ini
    const students = users.filter((u:any) => u.classId === classId && u.role === 'student');

    // 4. Cari Guru di sekolah ini (untuk dropdown pilihan)
    const teachers = users.filter((u:any) => u.schoolId === schoolId && u.role === 'teacher');

    // 5. Cari Nama Guru yang sedang mengajar (jika ada)
    const currentTeacher = teachers.find((t:any) => t.email === targetClass.teacherId);

    return NextResponse.json({ 
        success: true, 
        students, 
        teachers, 
        currentTeacherName: currentTeacher ? currentTeacher.name : "Belum ada guru"
    });

  } catch (e) {
    return NextResponse.json({ error: "Error server" }, { status: 500 });
  }
}