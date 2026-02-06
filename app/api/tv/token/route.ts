import { NextResponse } from 'next/server';
import { promises as fs } from 'fs';
import path from 'path';

const tokensPath = path.join(process.cwd(), 'data', 'tokens.json');

export async function POST(request: Request) {
  try {
    const { teacherEmail, teacherData } = await request.json();

    // 1. Generate Kode Unik 6 Digit (Angka Besar)
    const code = Math.floor(100000 + Math.random() * 900000).toString();

    // 2. Baca File Lama
    let tokens = [];
    try {
      const fileData = await fs.readFile(tokensPath, 'utf8');
      tokens = JSON.parse(fileData);
    } catch (e) { tokens = [] }

    // 3. Simpan Token Baru (Hapus token lama milik guru ini jika ada)
    tokens = tokens.filter((t: any) => t.email !== teacherEmail);
    
    tokens.push({
      code,
      email: teacherEmail,
      userData: teacherData,
      createdAt: Date.now(),
      expiresAt: Date.now() + 3600000 // Berlaku 1 Jam
    });

    await fs.writeFile(tokensPath, JSON.stringify(tokens, null, 2));

    return NextResponse.json({ success: true, code });
  } catch (error) {
    return NextResponse.json({ error: "Gagal membuat kode TV" }, { status: 500 });
  }
}