import { NextResponse } from 'next/server';
import { db } from '@/lib/db'; // <--- Sekarang ini sudah valid

// Helper: Generate Kode Kelas (Fitur ini TETAP ADA)
function generateClassCode(className: string) {
  const randomStr = Math.random().toString(36).substring(2, 6).toUpperCase();
  const cleanName = className.replace(/\s/g, '').toUpperCase();
  return `SINAU-${cleanName}-${randomStr}`;
}

// 1. GET: Ambil Kelas & Hitung Siswa
export async function GET() {
    try {
        const classes = await db.read<any[]>("classes.json");
        const users = await db.read<any[]>("users.json");

        // Gabungkan data: Masukkan array students ke dalam objek kelas
        const classesWithStudents = classes.map((cls) => {
            // Filter siswa yang ada di kelas ini
            const myStudents = users.filter(u => u.classId === cls.id && u.role === 'student');
            
            return {
                ...cls,
                studentsCount: myStudents.length,
                students: myStudents // <--- INI KUNCINYA (Kirim Data Siswa ke Frontend)
            };
        });

        return NextResponse.json(classesWithStudents);
    } catch (e) {
        return NextResponse.json([]);
    }
}

// 2. POST: Tambah Kelas Baru
export async function POST(request: Request) {
  try {
    const body = await request.json();
    const classes = await db.read<any[]>("classes.json");

    const newClass = {
      id: Date.now().toString(),
      schoolId: body.schoolId,
      name: body.className,
      token: generateClassCode(body.className), // Token generator dipakai disini
      teacherId: null,
      studentsCount: 0,
      unlockedLevels: [] // Fitur baru: Kunci level
    };

    classes.push(newClass);
    await db.write("classes.json", classes);
    
    return NextResponse.json({ success: true, data: newClass });
  } catch (error) {
    return NextResponse.json({ error: "Gagal membuat kelas" }, { status: 500 });
  }
}

// 3. PUT: Update Nama Kelas
export async function PUT(request: Request) {
  try {
    const { classId, newName } = await request.json();
    const classes = await db.read<any[]>("classes.json");

    const index = classes.findIndex((c) => c.id === classId);
    if (index === -1) return NextResponse.json({ error: "Kelas tidak ditemukan" }, { status: 404 });

    classes[index].name = newName;
    await db.write("classes.json", classes);

    return NextResponse.json({ success: true });
  } catch (e) {
    return NextResponse.json({ error: "Gagal update" }, { status: 500 });
  }
}

// 4. DELETE: Hapus Kelas & Reset Siswa
export async function DELETE(request: Request) {
  try {
    const { classId } = await request.json();
    
    // Baca Data
    let classes = await db.read<any[]>("classes.json");
    const users = await db.read<any[]>("users.json");

    // Hapus Kelas
    classes = classes.filter((c) => c.id !== classId);
    
    // Reset Siswa (Jadi tidak punya kelas)
    const updatedUsers = users.map((u) => {
        if (u.classId === classId) {
            return { ...u, classId: null, className: null }; 
        }
        return u;
    });

    // Simpan keduanya sekaligus
    await Promise.all([
        db.write("classes.json", classes),
        db.write("users.json", updatedUsers)
    ]);

    return NextResponse.json({ success: true });
  } catch (e) {
    return NextResponse.json({ error: "Gagal hapus" }, { status: 500 });
  }
}