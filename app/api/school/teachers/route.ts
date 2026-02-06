import { NextResponse } from 'next/server';
import { promises as fs } from 'fs';
import path from 'path';

const usersPath = path.join(process.cwd(), 'data', 'users.json');

export async function POST(request: Request) {
  try {
    const { schoolId } = await request.json();

    // Baca file users.json
    const fileData = await fs.readFile(usersPath, 'utf8');
    const users = JSON.parse(fileData);

    // Filter: Ambil user yang role-nya 'teacher' DAN schoolId-nya cocok
    const teachers = users.filter((u: any) => u.role === 'teacher' && u.schoolId === schoolId);

    return NextResponse.json({ success: true, teachers });
  } catch (error) {
    return NextResponse.json({ success: false, teachers: [] });
  }
}