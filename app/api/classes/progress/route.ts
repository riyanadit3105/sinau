import { NextResponse } from 'next/server';
import { promises as fs } from 'fs';
import path from 'path';

const classesPath = path.join(process.cwd(), 'data', 'classes.json');

export async function POST(request: Request) {
  try {
    const { classId, levelId, action } = await request.json(); 
    // action: 'unlock' | 'lock'

    // 1. Baca Database Kelas
    const fileData = await fs.readFile(classesPath, 'utf8');
    let classes = JSON.parse(fileData);

    const classIndex = classes.findIndex((c: any) => c.id === classId);
    if (classIndex === -1) return NextResponse.json({ error: "Kelas tidak ditemukan" }, { status: 404 });

    // 2. Siapkan Array unlockedLevels jika belum ada
    if (!classes[classIndex].unlockedLevels) {
        classes[classIndex].unlockedLevels = [];
    }

    let levels = classes[classIndex].unlockedLevels;

    if (action === 'unlock') {
        // Tambahkan ID jika belum ada
        if (!levels.includes(levelId)) levels.push(levelId);
    } else {
        // Hapus ID (Kunci kembali)
        levels = levels.filter((id: string) => id !== levelId);
    }

    // Update di object utama
    classes[classIndex].unlockedLevels = levels;

    // 3. SIMPAN KE FILE (PENTING!)
    await fs.writeFile(classesPath, JSON.stringify(classes, null, 2));

    return NextResponse.json({ success: true, unlockedLevels: levels });

  } catch (error) {
    console.error("Error saving progress:", error);
    return NextResponse.json({ error: "Gagal update progress" }, { status: 500 });
  }
}