import { NextResponse } from "next/server";
import { db } from "@/lib/db";

export async function GET(req: Request) {
  try {
    // 1. Ambil Parameter (Opsional: ?count=10)
    const { searchParams } = new URL(req.url);
    const count = parseInt(searchParams.get("count") || "5"); // Default buat 5 siswa
    
    // Hardcode schoolId sesuai request (atau bisa diambil dari param juga)
    const defaultSchoolId = "admin@gmail.com";
    const defaultPassword = "rahasia";

    // 2. Baca Database Lama
    const users = await db.read<any[]>("users.json");

    // 3. Generate Data Dummy
    const newStudents = [];
    
    // Kita mulai penomoran nama/email berdasarkan jumlah user yang ada biar unik
    // Misal user sudah ada 2, maka siswa berikutnya jadi "Siswa 3"
    let startNumber = users.filter(u => u.role === 'student').length + 1;

    for (let i = 0; i < count; i++) {
      const currentNum = startNumber + i;
      const timestamp = Date.now();
      
      // Random delay sedikit biar ID unik jika loop cepat
      const randomSuffix = Math.floor(Math.random() * 9999); 

      const student = {
        id: `${timestamp}${randomSuffix}`,
        createdAt: new Date().toISOString(),
        role: "student",
        name: `Siswa ${currentNum}`,
        birthDate: "2018-01-01", // Asumsi anak SD kelas 1
        email: `siswa${currentNum}@gmail.com`,
        password: defaultPassword,
        schoolId: defaultSchoolId,
        classId: "1770019082496",      // Belum masuk kelas
        xp: 0,
        subscriptionStatus: "active",
        maxStudents: null,  // Khusus guru/admin
        className: "2"     // Belum masuk kelas
      };

      newStudents.push(student);
    }

    // 4. Gabungkan dan Simpan
    const updatedUsers = [...users, ...newStudents];
    await db.write("users.json", updatedUsers);

    return NextResponse.json({ 
      success: true, 
      message: `Berhasil membuat ${count} siswa baru!`,
      data: newStudents 
    });

  } catch (error) {
    return NextResponse.json({ error: "Gagal seeding data" }, { status: 500 });
  }
}