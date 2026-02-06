import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import { db } from "@/lib/db"; // Pastikan import db sudah benar

export async function GET() {
  try {
    // 1. Baca Cookie Session
    const cookieStore = await cookies();
    const session = cookieStore.get("sinau_session");

    if (!session) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    // 2. Ambil Email dari Cookie
    const sessionData = JSON.parse(session.value);
    
    // 3. BACA DATABASE LANGSUNG (Source of Truth)
    // Ini kuncinya: Kita cari data user paling segar dari DB berdasarkan email di cookie
    const users = await db.read<any[]>("users.json");
    const freshUser = users.find((u) => u.email === sessionData.email);

    if (!freshUser) {
        return NextResponse.json({ error: "User tidak ditemukan di DB" }, { status: 404 });
    }

    // 4. Kembalikan data Fresh (yang sudah berisi update classId/XP terbaru)
    // Hapus password sebelum dikirim ke frontend
    const { password, ...safeUser } = freshUser;
    
    return NextResponse.json(safeUser);

  } catch (error) {
    console.error("Session Check Error:", error);
    return NextResponse.json({ error: "Error checking session" }, { status: 500 });
  }
}