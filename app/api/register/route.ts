import { NextResponse } from 'next/server';
import { saveUser } from '@/lib/db';

export async function POST(request: Request) {
  try {
    const body = await request.json();
    
    // VALIDASI DASAR (Wajib untuk semua role)
    if (!body.email || !body.password || !body.name || !body.role) {
      return NextResponse.json({ error: "Data pokok (Nama, Email, Password) tidak lengkap" }, { status: 400 });
    }

    // VALIDASI KHUSUS SISWA
    // Siswa TIDAK butuh sekolah/kelas saat daftar pertama kali
    if (body.role === 'student') {
        // Cukup pastikan tanggal lahir ada (opsional)
        if (!body.birthDate) {
             return NextResponse.json({ error: "Tanggal lahir wajib diisi" }, { status: 400 });
        }
    }

    // VALIDASI KHUSUS SEKOLAH
    if (body.role === 'school') {
        // Sekolah butuh alamat (opsional tapi disarankan)
        if (!body.village || !body.district || !body.regency) {
             // Kita bisa skip validasi ketat untuk MVP, atau biarkan lolos
        }
    }
    
    if (body.role === 'teacher') {
        // Validasi tambahan untuk guru jika perlu (misal NIP)
        // Saat ini kita loloskan saja
    }

    // Persiapkan User Object
    const newUser = {
    id: Date.now().toString(),
    createdAt: new Date().toISOString(),
    ...body,
    schoolId: body.role === 'school' ? body.email : null,
    classId: null,
    xp: 0,
    // --- TAMBAHAN BARU ---
    subscriptionStatus: body.role === 'school' ? 'inactive' : 'active', // Siswa/Guru gratis, Sekolah bayar
    maxStudents: body.role === 'school' ? 0 : null // Kuota 0
  };

    // Simpan ke JSON
    await saveUser(newUser);

    return NextResponse.json({ success: true, user: newUser });
    
  } catch (error: any) {
    return NextResponse.json({ error: error.message || "Gagal mendaftar" }, { status: 400 });
  }
}