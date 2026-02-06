import { NextResponse } from 'next/server';
// 👇 Kita import "Peta Kurikulum" yang sudah kita buat sebelumnya
import { curriculumMap } from '@/data/curriculum';

export async function GET(request: Request) {
  try {
    // 1. Cek parameter URL (Contoh: /api/chapters?grade=6)
    const { searchParams } = new URL(request.url);
    const requestedGrade = searchParams.get('grade');

    // 2. LOGIKA PEMILIHAN MATERI (Smart Switching)
    // - Jika ada request grade (misal "6"), ambil data kelas 6.
    // - Jika tidak ada request atau datanya kosong, KEMBALI KE KELAS 1 (Default).
    const data = curriculumMap[requestedGrade || "1"] || curriculumMap["1"];

    // 3. Kembalikan data sebagai JSON
    return NextResponse.json(data);

  } catch (error) {
    // Jika terjadi error fatal, kembalikan array kosong agar aplikasi tidak crash
    console.error("API Error:", error);
    return NextResponse.json([]);
  }
}