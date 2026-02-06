import { NextResponse } from 'next/server';
import { promises as fs } from 'fs';
import path from 'path';

const tokensPath = path.join(process.cwd(), 'data', 'tokens.json');

export async function POST(request: Request) {
  try {
    const { code } = await request.json();

    // 1. Baca Token
    const fileData = await fs.readFile(tokensPath, 'utf8');
    const tokens = JSON.parse(fileData);

    // 2. Cari Kode
    const validToken = tokens.find((t: any) => t.code === code);

    if (!validToken) {
      return NextResponse.json({ error: "Kode tidak valid atau kadaluarsa" }, { status: 401 });
    }

    // 3. Cek Kadaluarsa (Opsional)
    if (Date.now() > validToken.expiresAt) {
        return NextResponse.json({ error: "Kode sudah kadaluarsa. Minta guru generate ulang." }, { status: 401 });
    }

    // 4. LOGIN SUKSES -> SET SESSION (Sama seperti login biasa)
    // Kita "meminjam" identitas guru yang membuat kode
    const user = validToken.userData;
    
    // Hapus token setelah dipakai (One-time use) agar aman
    const newTokens = tokens.filter((t: any) => t.code !== code);
    await fs.writeFile(tokensPath, JSON.stringify(newTokens, null, 2));

    return NextResponse.json({ success: true, user });

  } catch (error) {
    return NextResponse.json({ error: "Server Error" }, { status: 500 });
  }
}