import { NextResponse } from 'next/server';
import { promises as fs } from 'fs';
import path from 'path';

const classesPath = path.join(process.cwd(), 'data', 'classes.json');

export async function POST(request: Request) {
  try {
    const { classId, teacherEmail } = await request.json();

    const data = await fs.readFile(classesPath, 'utf8');
    let classes = JSON.parse(data);

    const index = classes.findIndex((c:any) => c.id === classId);
    if (index === -1) return NextResponse.json({ error: "Kelas 404" }, { status: 404 });

    // Update Guru
    classes[index].teacherId = teacherEmail;

    await fs.writeFile(classesPath, JSON.stringify(classes, null, 2));

    return NextResponse.json({ success: true });
  } catch (e) {
    return NextResponse.json({ error: "Gagal update" }, { status: 500 });
  }
}