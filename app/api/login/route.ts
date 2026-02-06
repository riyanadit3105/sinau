import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import { db } from "@/lib/db";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { email, password } = body;

    // 1. Baca data user
    const users = await db.read<any[]>("users.json");
    
    // 2. Cari user
    const user = users.find((u) => u.email === email);

    // 3. Validasi
    if (!user || user.password !== password) {
      return NextResponse.json({ error: "Email atau password salah" }, { status: 401 });
    }

    const { password: _, ...userWithoutPassword } = user;

    // 4. Set Cookie (VERSI BARU: Pakai await)
    const cookieStore = await cookies(); // <--- INI PERUBAHANNYA
    
    cookieStore.set({
      name: "sinau_session",
      value: JSON.stringify(userWithoutPassword),
      httpOnly: true,
      path: "/",
      maxAge: 60 * 60 * 24, // 1 Hari
      sameSite: "strict",
    });

    return NextResponse.json({ success: true, user: userWithoutPassword });

  } catch (error) {
    console.error("Login Error:", error);
    return NextResponse.json({ error: "Server Error" }, { status: 500 });
  }
}