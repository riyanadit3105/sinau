import { NextResponse } from 'next/server';
import { promises as fs } from 'fs';
import path from 'path';

const usersPath = path.join(process.cwd(), 'data', 'users.json');
const classesPath = path.join(process.cwd(), 'data', 'classes.json');

export async function DELETE(request: Request) {
  try {
    const { email, role } = await request.json(); // Email user yang mau dihapus

    const data = await fs.readFile(usersPath, 'utf8');
    let users = JSON.parse(data);

    // Filter user yang mau dihapus
    const userToDelete = users.find((u:any) => u.email === email);
    if (!userToDelete) return NextResponse.json({ error: "User tidak ditemukan" }, { status: 404 });

    // HAPUS DARI ARRAY (Hard Delete)
    users = users.filter((u:any) => u.email !== email);
    await fs.writeFile(usersPath, JSON.stringify(users, null, 2));

    // UPDATE COUNTER KELAS (Jika Siswa)
    if (role === 'student' && userToDelete.classId) {
        const clsData = await fs.readFile(classesPath, 'utf8');
        let classes = JSON.parse(clsData);
        const clsIdx = classes.findIndex((c:any) => c.id === userToDelete.classId);
        if (clsIdx !== -1) {
            classes[clsIdx].studentsCount = Math.max(0, (classes[clsIdx].studentsCount || 0) - 1);
            await fs.writeFile(classesPath, JSON.stringify(classes, null, 2));
        }
    }

    return NextResponse.json({ success: true });
  } catch (e) {
    return NextResponse.json({ error: "Gagal hapus user" }, { status: 500 });
  }
}