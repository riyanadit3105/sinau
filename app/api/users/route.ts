import { NextResponse } from 'next/server';
import { db } from '@/lib/db';

export async function GET() {
  try {
    // Ganti getUsers() dengan db.read()
    const users = await db.read<any[]>("users.json");
    
    // Kembalikan data user tanpa password agar aman
    const safeUsers = users.map(({ password, ...u }) => u);
    
    return NextResponse.json(safeUsers);
  } catch (error) {
    return NextResponse.json([]);
  }
}