"use client"
import { useState, useEffect } from "react"
import { useParams, useSearchParams, useRouter } from "next/navigation"
import { LevelPlayer } from "@/components/shared/LevelPlayer"
import { Loader2, LockKeyhole } from "lucide-react"
import { Button } from "@/components/ui/button"

export default function GameRunnerPage() {
  const params = useParams()
  const searchParams = useSearchParams()
  const router = useRouter()
  
  const levelId = params.levelId as string
  const startIndex = parseInt(searchParams.get('idx') || "0")
  
  // ✅ AMBIL GRADE DARI URL (Prioritas Utama)
  const urlGrade = searchParams.get('grade'); 

  const [levelData, setLevelData] = useState<any>(null)
  const [currentUser, setCurrentUser] = useState<any>(null)
  const [loading, setLoading] = useState(true)
  const [lockedError, setLockedError] = useState(false)

  useEffect(() => {
    const init = async () => {
       setLoading(true)
       try {
          // 1. Ambil User
          const resMe = await fetch('/api/me')
          if (!resMe.ok) { router.push('/login'); return; }
          const user = await resMe.json()
          setCurrentUser(user)

          // 2. Cek Kelas & Grade User (Untuk Validasi Izin)
          let userGrade = "1";
          let unlockedIds: string[] = [];
          
          if (user.classId) {
             const resClass = await fetch('/api/classes');
             const classes = await resClass.json();
             const myClass = classes.find((c:any) => c.id === user.classId);
             
             if (myClass) {
                 userGrade = myClass.name.match(/\d+/)?.[0] || "1";
                 unlockedIds = myClass.unlockedLevels || [];
             }
          }

          // 3. TENTUKAN TARGET GRADE (Untuk Fetch Data)
          // Logika: 
          // A. Jika ada di URL (?grade=6) -> Pakai itu.
          // B. Jika format ID angka (6-1-...) -> Ambil angka depan.
          // C. Fallback -> Pakai grade user saat ini.
          let targetGradeToFetch = urlGrade;

          if (!targetGradeToFetch) {
              const firstPart = levelId.split('-')[0];
              // Cek apakah karakter pertama adalah angka
              if (!isNaN(parseInt(firstPart))) {
                  targetGradeToFetch = firstPart;
              } else {
                  // Jika ID-nya string (misal: "game-f1"), kita asumsi pakai grade user
                  targetGradeToFetch = userGrade;
              }
          }

          // 4. Fetch Data Materi
          const resChapters = await fetch(`/api/chapters?grade=${targetGradeToFetch}`);
          const chapters = await resChapters.json();

          // Cari Level
          let foundLevel = null
          if (Array.isArray(chapters)) {
              for (const chap of chapters) {
                 const found = chap.levels?.find((s:any) => s.id === levelId)
                 if (found) { foundLevel = found; break }
              }
          }
          
          if (!foundLevel) {
              setLevelData(null);
          } else {
              // --- 🛡️ SATPAM UTAMA ---
              const userGradeNum = parseInt(userGrade);
              const levelGradeNum = parseInt(targetGradeToFetch || "1");

              const isLowerGrade = levelGradeNum < userGradeNum;
              const isUnlocked = unlockedIds.includes(levelId);
              const isStudent = user.role === 'student';

              // Jika Student main game kelas yang LEBIH TINGGI atau SAMA, harus unlocked
              // Kecuali game itu memang untuk kelas di bawahnya (Review materi)
              if (isStudent && (levelGradeNum >= userGradeNum) && !isUnlocked) {
                  setLockedError(true); 
              } else {
                  setLevelData(foundLevel);
              }
          }

       } catch(e) { 
           console.error(e) 
       } finally { 
           setLoading(false) 
       }
    }
    init()
  }, [levelId, router, urlGrade]) // Tambahkan urlGrade ke dependency

  // ... (SISA KODE SAMA) ...
  const handleXpUpdate = (amount: number) => { /* ... */ }
  const handleExit = () => router.push('/games')

  if (lockedError) {
      return (
          <div className="h-screen flex flex-col items-center justify-center bg-slate-50 text-slate-500 p-8 text-center">
              <div className="bg-slate-200 p-6 rounded-full mb-4">
                  <LockKeyhole size={64} className="text-slate-400" />
              </div>
              <h1 className="text-2xl font-black text-slate-800 mb-2">Game Terkunci!</h1>
              <p className="max-w-md mb-8">
                  Maaf, Gurumu belum membuka materi ini.
              </p>
              <Button onClick={handleExit} className="bg-slate-800 text-white">Kembali</Button>
          </div>
      )
  }

  if (loading) return (
    <div className="h-screen flex flex-col items-center justify-center gap-2 text-slate-400">
        <Loader2 className="animate-spin" />
        <p>Memuat Game...</p>
    </div>
  )

  if (!levelData) return <div className="p-10 text-center">Game tidak ditemukan.</div>

  return (
    <LevelPlayer 
        level={levelData}
        userRole={currentUser?.role || 'student'}
        currentUser={currentUser}
        initialIndex={startIndex} 
        onExit={handleExit}
        onComplete={handleExit}
        onXpUpdate={handleXpUpdate}
    />
  )
}