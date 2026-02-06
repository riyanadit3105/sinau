import { NextResponse } from "next/server";
import { promises as fs } from 'fs';
import path from 'path';
import { curriculumMap } from '@/data/curriculum'; 

const usersPath = path.join(process.cwd(), 'data', 'users.json');
const classesPath = path.join(process.cwd(), 'data', 'classes.json');

export async function POST(req: Request) {
  try {
    const { classId, levelId } = await req.json();

    // 1. Baca Database
    const users = JSON.parse(await fs.readFile(usersPath, 'utf8'));
    const classes = JSON.parse(await fs.readFile(classesPath, 'utf8'));

    // 2. Cari Kelas Target
    const classIndex = classes.findIndex((c: any) => c.id === classId);
    if (classIndex === -1) return NextResponse.json({ error: "Kelas tidak ditemukan" }, { status: 404 });
    
    const targetClass = classes[classIndex];

    // 3. Cek History Sesi (Anti-Spam Guru)
    if (!targetClass.sessionHistory) targetClass.sessionHistory = {};
    const playCount = targetClass.sessionHistory[levelId] || 0;

    // KASUS A: SUDAH PERNAH (REPLAY) -> 0 XP
    if (playCount > 0) {
        targetClass.sessionHistory[levelId] = playCount + 1;
        await fs.writeFile(classesPath, JSON.stringify(classes, null, 2));
        
        return NextResponse.json({ 
            success: true, 
            message: "Sesi selesai (Re-play). Tidak ada XP tambahan diberikan." 
        });
    }

    // KASUS B: PERTAMA KALI -> BAGI XP
    
    // A. Cari Base XP (Dari Kurikulum)
    let baseXP = 100; 
    const grade = targetClass.name.match(/\d+/)?.[0] || "1";
    const curriculum = curriculumMap[grade] || [];
    
    if (Array.isArray(curriculum)) {
        for (const chap of curriculum) {
            const found = chap.levels?.find((l: any) => l.id === levelId);
            if (found) { baseXP = found.xp || 100; break; }
        }
    }

    // B. SCAN SEMUA USER (LOGIKA LEBIH KUAT)
    // Cari user yang classId-nya cocok dengan classId ini.
    let updatedUserCount = 0;

    users.forEach((user: any) => {
        // 👇 PERBAIKAN DISINI: Cek langsung ID Kelas di data user
        // (Jangan mengandalkan array email di data kelas yg mungkin error)
        if (user.classId === classId && user.role === 'student') {
            
            if (!user.completedLevels) user.completedLevels = [];

            const alreadyDone = user.completedLevels.includes(levelId);

            if (alreadyDone) {
                // Siswa Rajin (Sudah selesai duluan) -> Bonus +1
                user.xp = (user.xp || 0) + 1;
            } else {
                // Siswa Normal -> Full XP
                user.xp = (user.xp || 0) + baseXP;
                user.completedLevels.push(levelId);
            }
            updatedUserCount++;
        }
    });

    // 4. Simpan Update
    targetClass.sessionHistory[levelId] = 1;

    await fs.writeFile(usersPath, JSON.stringify(users, null, 2));
    await fs.writeFile(classesPath, JSON.stringify(classes, null, 2));

    return NextResponse.json({ 
        success: true, 
        message: `Sesi Pertama Selesai! XP dibagikan ke ${updatedUserCount} siswa.` 
    });

  } catch (error) {
    console.error("Finish Session Error:", error);
    return NextResponse.json({ error: "Server Error" }, { status: 500 });
  }
}