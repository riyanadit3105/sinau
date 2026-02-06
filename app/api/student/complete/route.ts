// FILE: app/api/student/complete/route.ts

import { NextResponse } from "next/server";
import { db } from "@/lib/db";
import { User } from "@/types"; // Pastikan Langkah 1 sudah dilakukan
import { curriculumMap } from '@/data/curriculum';

// Tipe Data Statistik Level
type LevelStats = Record<string, number>; 

const MIN_XP = 10; 

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { email, levelId, isTeacherTriggered } = body;

    // 1. Baca Data User & Stats
    const users = await db.read<User[]>("users.json") || []; // Pastikan array
    const levelStats = await db.read<LevelStats>("level_stats.json") || {}; 

    // 2. Cari Data User
    const userIndex = users.findIndex((u) => u.email === email);
    if (userIndex === -1) return NextResponse.json({ error: "User not found" }, { status: 404 });

    const currentUser = users[userIndex];
    
    // Inisialisasi array jika belum ada
    if (!currentUser.completedLevels) currentUser.completedLevels = [];
    if (!currentUser.xp) currentUser.xp = 0;

    // --- PERBAIKAN: LOGIKA CARI BASE XP ---
    let levelBaseXP = 100; // Default

    // 1. Ambil semua data chapter dari semua kelas (Grade 1, 2, dst)
    // Object.values mengubah { "1": [...], "2": [...] } menjadi [[...], [...]]
    const allGradesData = Object.values(curriculumMap); 

    outerLoop:
    for (const gradeChapters of allGradesData) {
        // gradeChapters adalah Array of Chapter (Materi satu kelas)
        // Kita perlu memastikan dia array sebelum di-loop
        if (Array.isArray(gradeChapters)) {
            for (const chapter of gradeChapters) {
                if (chapter.subChapters) {
                    for (const sub of chapter.subChapters) {
                        // Cek apakah level ada di sub-chapter ini
                        const foundLevel = sub.levels?.find((l: any) => l.id === levelId);
                        
                        if (foundLevel) {
                            levelBaseXP = foundLevel.xp || 100; 
                            break outerLoop; // Keluar dari SEMUA loop jika ketemu
                        }
                    }
                }
            }
        }
    }

    // --- LOGIKA UTAMA (Sama seperti sebelumnya) ---
    const hasCompletedBefore = currentUser.completedLevels.includes(levelId);
    let xpGained = 0;
    let message = "";
    let shouldSaveStats = false; 

    // Gunakan CLASS ID sebagai pembeda statistik agar kompetisi adil per kelas
    const statsKey = currentUser.classId ? `${levelId}_${currentUser.classId}` : levelId;

    if (isTeacherTriggered) {
        // SKENARIO 1: GURU YANG MENG-KLIK (Review Bareng di TV)
        if (hasCompletedBefore) {
            xpGained = 1; 
            message = "Review Materi (+1 XP)";
        } else {
            xpGained = levelBaseXP; 
            message = `Materi Kelas Selesai (+${levelBaseXP} XP)`;
            currentUser.completedLevels.push(levelId); 
        }
    } else {
        // SKENARIO 2: MURID YANG MENGERJAKAN (Self Study di HP)
        if (hasCompletedBefore) {
            xpGained = 0;
            message = "Kamu sudah menyelesaikan ini sebelumnya.";
        } else {
            // Cek urutan selesai ke berapa di kelas ini
            const finishedCount = levelStats[statsKey] || 0;
            
            // Rumus Kompetisi: XP berkurang makin belakangan selesai
            xpGained = Math.max(MIN_XP, levelBaseXP - (finishedCount * 5)); // Kurangi 5 poin per urutan
            
            message = `Self Study Selesai! (+${xpGained} XP)`;
            if (finishedCount === 0) message += " (PERTAMA DI KELAS!)";
            else if (finishedCount < 5) message += " (Top 5 di Kelas!)";

            currentUser.completedLevels.push(levelId);
            
            // Update Stats Kelas
            levelStats[statsKey] = finishedCount + 1;
            shouldSaveStats = true;
        }
    }

    // 4. Simpan Perubahan ke JSON
    if (xpGained > 0 || !hasCompletedBefore) {
        currentUser.xp += xpGained;
        users[userIndex] = currentUser;
        
        // Simpan data users
        await db.write("users.json", users);

        // Simpan stats level jika ada perubahan rank
        if (shouldSaveStats) {
            await db.write("level_stats.json", levelStats);
        }
    }

    return NextResponse.json({ 
        success: true, 
        xpGained, 
        newTotalXp: currentUser.xp,
        message 
    });

  } catch (error) {
    console.error("Error update XP:", error);
    return NextResponse.json({ error: "Gagal update XP" }, { status: 500 });
  }
}