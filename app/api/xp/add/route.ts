import { NextResponse } from "next/server";
import { db } from "@/lib/db";

export async function POST(request: Request) {
  try {
    const { email, xp } = await request.json();

    // 1. Baca data users
    const users = await db.read<any[]>("users.json");

    // 2. Cari user dan Update XP
    let userFound = false;
    const updatedUsers = users.map((u) => {
      if (u.email === email) {
        userFound = true;
        // Pastikan xp ada nilainya, kalau null anggap 0
        const currentXp = u.xp || 0;
        return { ...u, xp: currentXp + xp }; 
      }
      return u;
    });

    if (!userFound) {
      return NextResponse.json({ error: "User tidak ditemukan" }, { status: 404 });
    }

    // 3. Simpan ke users.json
    await db.write("users.json", updatedUsers);

    return NextResponse.json({ success: true, message: "XP bertambah" });

  } catch (error) {
    console.error("Gagal update XP:", error);
    return NextResponse.json({ error: "Server Error" }, { status: 500 });
  }
}