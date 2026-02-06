import { NextResponse } from 'next/server';
import { promises as fs } from 'fs';
import path from 'path';

// Lokasi database
const usersPath = path.join(process.cwd(), 'data', 'users.json');

export async function POST(request: Request) {
  try {
    const { teacherEmail, schoolId } = await request.json();

    if (!teacherEmail || !schoolId) {
      return NextResponse.json({ error: "Data tidak lengkap" }, { status: 400 });
    }

    // 1. Baca Database Manual (biar data fresh)
    const fileData = await fs.readFile(usersPath, 'utf8');
    const users = JSON.parse(fileData);

    // 2. Cari Guru Berdasarkan Email
    const teacherIndex = users.findIndex((u: any) => u.email === teacherEmail);

    if (teacherIndex === -1) {
      return NextResponse.json({ error: "Guru tidak ditemukan" }, { status: 404 });
    }

    // 3. Validasi: Apakah guru ini benar-benar milik sekolah ini?
    // (Penting biar admin sekolah A tidak sembarangan kick guru sekolah B)
    if (users[teacherIndex].schoolId !== schoolId) {
      return NextResponse.json({ error: "Guru ini tidak terdaftar di sekolah Anda" }, { status: 403 });
    }

    // 4. ACTION: UNLINK (Set schoolId jadi null)
    // JANGAN HAPUS USERNYA! Cukup hapus ID sekolahnya.
    users[teacherIndex].schoolId = null;
    users[teacherIndex].schoolName = null; // Opsional: hapus nama sekolah juga

    // 5. Simpan Perubahan
    await fs.writeFile(usersPath, JSON.stringify(users, null, 2));

    return NextResponse.json({ success: true, message: "Guru berhasil dikeluarkan dari sekolah." });

  } catch (error) {
    console.error("Remove Teacher Error:", error);
    return NextResponse.json({ error: "Gagal memproses permintaan" }, { status: 500 });
  }
}