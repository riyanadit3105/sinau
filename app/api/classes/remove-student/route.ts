import { NextResponse } from "next/server";
import { db } from "@/lib/db";

export async function POST(req: Request) {
  try {
    const { email } = await req.json();

    if (!email) {
      return NextResponse.json({ error: "Email wajib diisi" }, { status: 400 });
    }

    // 1. Baca Database Users
    const users = await db.read<any[]>("users.json");

    // --- SAFETY CHECK (PENTING) ---
    // Jangan pernah menulis balik jika data yang dibaca kosong/korup.
    // Ini mencegah database terhapus total jika terjadi error baca.
    if (!users || users.length === 0) {
        return NextResponse.json({ error: "Database user kosong atau gagal dibaca. Operasi dibatalkan demi keamanan." }, { status: 500 });
    }

    // 2. Cek apakah user ada?
    const userIndex = users.findIndex((u) => u.email === email);
    if (userIndex === -1) {
      return NextResponse.json({ error: "Siswa tidak ditemukan" }, { status: 404 });
    }

    // 3. UPDATE: Hanya Reset Class ID (Jangan di-splice/delete array-nya)
    // Kita gunakan spread operator untuk update aman
    const currentUser = users[userIndex];
    
    // Simpan nama kelas lama untuk pesan sukses
    const oldClassName = currentUser.className; 

    // Reset data kelas siswa
    users[userIndex] = {
        ...currentUser,
        classId: null,
        className: null,
        // Opsional: Reset progress level jika perlu, atau biarkan agar history tetap ada
        // completedLevels: [] 
    };

    // 4. Simpan Perubahan
    await db.write("users.json", users);

    return NextResponse.json({ 
        success: true, 
        message: `Siswa ${currentUser.name} berhasil dikeluarkan dari kelas ${oldClassName || ''}.` 
    });

  } catch (error) {
    console.error("Error removing student:", error);
    return NextResponse.json({ error: "Gagal memproses data" }, { status: 500 });
  }
}