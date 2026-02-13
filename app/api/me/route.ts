import { NextResponse } from "next/server";
import { getServerSession } from "next-auth"; 
import { authOptions } from "@/app/api/auth/[...nextauth]/route"; // Import konfigurasi auth kamu
import { db } from "@/lib/db"; 

export async function GET() {
  try {
    // 1. CARA BARU (NEXTAUTH): Cek Session
    // Tidak perlu lagi baca cookies().get("sinau_session")
    const session = await getServerSession(authOptions);

    // Jika session null atau user tidak ada, berarti belum login
    if (!session || !session.user?.email) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    // 2. Ambil Email dari Session NextAuth
    const email = session.user.email;
    
    // 3. BACA DATABASE (Source of Truth)
    // Cari data user paling segar (update XP/Level/Class)
    const users = await db.read<any[]>("users.json");
    
    // Karena di route.ts kita sudah setting agar login bisa by email/username,
    // kita cari yang emailnya cocok.
    const freshUser = users.find((u) => u.email === email);

    if (!freshUser) {
        return NextResponse.json({ error: "User tidak ditemukan di DB" }, { status: 404 });
    }

    // 4. Hapus password & kirim data
    const { password, ...safeUser } = freshUser;
    
    return NextResponse.json(safeUser);

  } catch (error) {
    console.error("Session Check Error:", error);
    return NextResponse.json({ error: "Error checking session" }, { status: 500 });
  }
}