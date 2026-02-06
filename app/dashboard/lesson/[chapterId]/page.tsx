"use client"

import { useParams, useRouter } from "next/navigation" 
import { Button } from "@/components/ui/button"
import { ArrowLeft } from "lucide-react"

// Import Data
import { curriculumMap } from "@/data/curriculum" 

export default function LessonPage() {
  const params = useParams()
  const router = useRouter()
  
  // ---------------------------------------------------------
  // 1. PERBAIKAN PENGAMBILAN ID
  // Cek nama folder Anda! Jika folder bernama [chapterId], gunakan params.chapterId
  // Jika folder bernama [chapter-id], gunakan params['chapter-id']
  // Kode di bawah ini mencoba keduanya agar aman.
  // ---------------------------------------------------------
  const rawId = params.chapterId || params['chapter-id']
  
  // Pastikan ID berupa string (bukan array)
  const subChapterId = Array.isArray(rawId) ? rawId[0] : rawId

  // ---------------------------------------------------------
  // 2. PERBAIKAN LOGIKA PENCARIAN (FIX ITERATOR ERROR)
  // ---------------------------------------------------------
  let targetSubChapter = null;

  if (subChapterId) {
    // UBAH OBJECT KE ARRAY DULU
    // curriculumMap bentuknya { "1": [...], "2": [...] }
    const allGradesData = Object.values(curriculumMap);

    // Loop Grade (Kelas 1, Kelas 2, dst)
    for (const gradeChapters of allGradesData) {
      // Pastikan gradeChapters adalah array sebelum di-loop
      if (Array.isArray(gradeChapters)) {
        // Loop Chapter
        for (const chapter of gradeChapters) {
           // Loop SubChapter (Cari ID yang cocok)
           const found = chapter.subChapters?.find((sub: any) => sub.id === subChapterId);
           if (found) {
             targetSubChapter = found;
             break; // Ketemu di level chapter
           }
        }
      }
      if (targetSubChapter) break; // Ketemu di level grade, stop looping
    }
  }

  // ---------------------------------------------------------
  // 3. HANDLING JIKA TIDAK KETEMU (404)
  // ---------------------------------------------------------
  if (!targetSubChapter) {
    return (
      <div className="flex h-screen w-full flex-col items-center justify-center gap-4 bg-slate-50">
        <h1 className="text-2xl font-bold text-slate-800">Materi Tidak Ditemukan</h1>
        <p className="text-slate-500">ID Materi: {subChapterId || "Kosong"}</p>
        <Button onClick={() => router.back()}>Kembali</Button>
      </div>
    )
  }

  // ---------------------------------------------------------
  // 4. RENDER PLAYER
  // ---------------------------------------------------------
  return (
    <div className="fixed inset-0 z-[100] bg-white">
        {/* Tombol Keluar Floating */}
        <div className="absolute top-4 left-4 z-50">
            <Button 
              onClick={() => router.back()} 
              variant="outline" 
              className="bg-white/90 backdrop-blur shadow-sm hover:bg-slate-100 border-slate-200 text-slate-700 h-9 px-3"
            >
                <ArrowLeft className="mr-2 h-4 w-4"/> Keluar
            </Button>
        </div>
    </div>
  )
}