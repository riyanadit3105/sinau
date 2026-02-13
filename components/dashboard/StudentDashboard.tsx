"use client"
import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { useRouter } from "next/navigation"
import { 
    BookOpen, School, Star, Lock, Play, Trophy, ArrowRight
} from "lucide-react"
import { LevelPlayer } from "@/components/shared/LevelPlayer"

// 1. IMPORT DATA KURIKULUM (DATABASE ISI MATERI)


export function StudentDashboard({ user }: { user: any }) {
  // --- STATE ---
  const [studentData, setStudentData] = useState(user) 
  const [chapters, setChapters] = useState<any[]>([])
  const [isLoading, setIsLoading] = useState(true) 
  
  // State UI
  const [activeLevel, setActiveLevel] = useState<any | null>(null)
  const [playingLevel, setPlayingLevel] = useState<any | null>(null)

  const router = useRouter()

  // --- FETCH DATA (AUTO SYNC) ---
  useEffect(() => {
    const syncData = async () => {
      setIsLoading(true)
      try {
        // 1. Cek User Terbaru
        const resMe = await fetch('/api/me', { cache: 'no-store' });
        let currentUser = studentData; 
        if (resMe.ok) {
            const freshUser = await resMe.json();
            setStudentData(freshUser); 
            currentUser = freshUser;   
        }

        // Kalo belum punya kelas, stop (jangan lanjut biar gak error)
        if (!currentUser?.classId) {
            setChapters([]); 
            setIsLoading(false); 
            return; 
        }

        // 2. Ambil Info Kelas Dulu
        const resClasses = await fetch('/api/classes', { cache: 'no-store' });
        const classesData = await resClasses.json();
        
        // Cari kelas siswa (Gunakan ?. agar tidak error jika undefined)
        const myClassData = classesData?.find((c: any) => c.id === currentUser.classId);

        // --- LOGIKA PENENTUAN GRADE (AMAT SEDERHANA & AMAN) ---
        // Default ke "1" jika terjadi error apapun
        let gradeToFetch = "1"; 
        
        if (myClassData?.name) {
            // Cek apakah ada angka "6" di nama kelas? Jika ya, set ke "6"
            if (myClassData.name.includes("6")) gradeToFetch = "6";
            // Cek apakah ada angka "1" di nama kelas? Jika ya, set ke "1"
            else if (myClassData.name.includes("1")) gradeToFetch = "1";
        }

        // 3. Panggil API dengan Grade yang sudah ditentukan
        const resChapters = await fetch(`/api/chapters?grade=${gradeToFetch}`, { cache: 'no-store' });
        const rawChapters = await resChapters.json();
        // 4. Proses Status Unlock (Konsep Lama)
        const unlockedIds = myClassData?.unlockedLevels || [];
        
        // Pastikan rawChapters adalah array sebelum di-map
        if (Array.isArray(rawChapters)) {
            const mergedChapters = rawChapters.map((bab: any) => ({
                ...bab,
                levels: bab.levels?.map((lvl: any) => ({
                    ...lvl,
                    status: unlockedIds.includes(lvl.id) ? 'unlocked' : 'locked'
                })) || [] // Fallback array kosong
            }));
            setChapters(mergedChapters);
        }

      } catch (e) { 
          console.error("Dashboard error (Auto-fix applied):", e);
          // Jangan biarkan loading selamanya jika error
          setIsLoading(false);
      } finally { 
          setIsLoading(false); 
      }
    }
    
    syncData();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])
  // --- ACTIONS ---

  // [PERBAIKAN UTAMA DISINI]
  const handleStartGame = () => {
      if (!activeLevel) return;

      // ✅ CARA BARU: Cari materi langsung dari state 'chapters' yang sudah dimuat API
      // Tidak perlu import file curriculumData lagi.
      
      let contentData = null;
      
      // Loop data chapters yang ada di dashboard
      for (const bab of chapters) {
          // Ingat: API kita mengembalikan properti 'levels', bukan 'subChapters' lagi di JSON finalnya
          // Gunakan optional chaining (?.) biar tidak error
          const found = bab.levels?.find((lvl: any) => lvl.id === activeLevel.id);
          if (found) { 
              contentData = found; 
              break; 
          }
      }

      if (!contentData) {
          alert(`Maaf, materi untuk Level ${activeLevel.id} sedang dimuat atau belum tersedia.`);
          return;
      }

      // Gabungkan data
      const levelToPlay = { ...activeLevel, ...contentData };
      setActiveLevel(null)
      setPlayingLevel(levelToPlay) 
  }

  const handleFinishGame = async () => {
      const finishedLevelId = playingLevel.id;
      setPlayingLevel(null)

      try {
          const res = await fetch('/api/student/complete', {
              method: 'POST',
              headers: { 'Content-Type': 'application/json' },
              body: JSON.stringify({ 
                  email: studentData.email, 
                  levelId: finishedLevelId,
                  isTeacherTriggered: false 
              })
          });

          const data = await res.json();

          if (data.success && data.xpGained > 0) {
              setStudentData((prev: any) => ({ ...prev, xp: data.newTotalXp }));
              alert(`🎉 HEBAT!\n\n${data.message}`);
          } 

      } catch (error) {
          console.error("Gagal simpan progress", error);
      }
  }

  const getPositionClass = (index: number) => {
      const pos = index % 4; 
      switch(pos) {
          case 0: return "justify-center"; 
          case 1: return "justify-start pl-8 md:pl-32"; 
          case 2: return "justify-center"; 
          case 3: return "justify-end pr-8 md:pr-32"; 
          default: return "justify-center";
      }
  }

  const handleInstantXpUpdate = (amount: number) => {
      setStudentData((prev: any) => ({
          ...prev,
          xp: (prev.xp || 0) + amount
      }));
  };

  // --- RENDER ---

  if (playingLevel) {
      return (
        <LevelPlayer 
            level={playingLevel} 
            userRole="student"
            currentUser={studentData}
            onExit={() => setPlayingLevel(null)} 
            onComplete={handleFinishGame}
            onXpUpdate={handleInstantXpUpdate}
        />
      )
  }

  if (isLoading) return <div className="p-20 text-center text-slate-400 font-bold animate-pulse">Sinkronisasi Data...</div>

  if (!studentData.classId) {
    return (
        <div className="flex flex-col items-center justify-center min-h-[70vh] text-center space-y-8 animate-in fade-in">
            <div className="w-24 h-24 bg-yellow-100 rounded-3xl flex items-center justify-center shadow-xl shadow-yellow-100">
                <School size={48} className="text-yellow-600" />
            </div>
            <div className="space-y-2 max-w-md">
                <h1 className="text-3xl font-black text-slate-900">Selamat Datang!</h1>
                <p className="text-slate-500 text-lg">Kamu belum masuk kelas. Yuk, gabung kelas dulu!</p>
            </div>
            <div className="w-full max-w-sm bg-white p-8 rounded-[2rem] border border-slate-100 shadow-2xl shadow-indigo-100/50 flex flex-col items-center gap-4">
                <p className="text-slate-600 font-medium">Silakan buka menu <b>Redeem</b> di atas.</p>
                <Button onClick={() => router.push('/dashboard/redeem')} className="h-14 w-full text-lg font-bold bg-indigo-600 hover:bg-indigo-700 rounded-xl shadow-lg shadow-indigo-200">
                    BUKA HALAMAN REDEEM <ArrowRight className="ml-2" />
                </Button>
            </div>
        </div>
    )
  }

  return (
    <div className="relative min-h-screen bg-white pb-32 animate-in fade-in">
        <div className="sticky top-0 md:top-16 z-30 bg-white/95 backdrop-blur-md border-b border-slate-100 px-6 py-4 flex items-center justify-between shadow-sm">
            <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-indigo-100 rounded-full flex items-center justify-center text-indigo-700 font-bold">
                    {studentData.className?.charAt(0) || "K"}
                </div>
                <div>
                    <h1 className="font-black text-slate-800 text-lg leading-none">Kelas {studentData.className}</h1>
                    <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">Peta Belajar</span>
                </div>
            </div>
            <div className="bg-yellow-100 text-yellow-700 px-4 py-1.5 rounded-full text-sm font-bold flex items-center gap-2 transition-all">
                <Trophy size={16} /> 
                <span>XP: {studentData.xp || 0}</span>
            </div>
        </div>

        <div className="max-w-md mx-auto pt-10 px-4 space-y-16">
            {chapters.map((bab) => (
                <div key={bab.id} className="relative">
                    <div className={`${bab.themeColor} text-white p-6 rounded-3xl shadow-xl shadow-indigo-200/40 mb-10 relative overflow-hidden transform hover:scale-[1.02] transition-transform`}>
                        <div className="relative z-10 flex justify-between items-center">
                            <div>
                                <h2 className="text-2xl font-black mb-1">{bab.title}</h2>
                                <p className="text-white/80 font-medium text-sm">{bab.description}</p>
                            </div>
                            <BookOpen size={32} className="text-white/90" />
                        </div>
                        <div className="absolute -right-6 -bottom-10 w-32 h-32 bg-white/20 rounded-full blur-2xl"></div>
                    </div>

                    <div className="space-y-6">
                        {bab.levels.map((lvl: any, idx: number) => {
                            const isLocked = lvl.status === 'locked';
                            const positionClass = getPositionClass(idx);
                            return (
                                <div key={lvl.id} className={`flex ${positionClass} relative z-0`}>
                                    <div className="flex flex-col items-center relative group">
                                        <button
                                            onClick={() => !isLocked && setActiveLevel(lvl)}
                                            disabled={isLocked}
                                            className={`w-24 h-24 rounded-full flex flex-col items-center justify-center border-b-[8px] transition-all relative z-10 outline-none ${isLocked ? 'bg-slate-200 border-slate-300 text-slate-400 cursor-not-allowed grayscale' : 'bg-yellow-400 border-yellow-600 text-white shadow-xl shadow-yellow-200 active:border-b-0 active:translate-y-2 hover:bg-yellow-300 cursor-pointer'}`}
                                        >
                                            {isLocked ? <Lock size={32} strokeWidth={3} className="text-slate-400" /> : <Star size={40} fill="white" className="text-white drop-shadow-md animate-pulse-slow" />}
                                        </button>
                                        <div className="mt-4 bg-white border-2 border-slate-100 px-4 py-2 rounded-2xl shadow-sm text-center max-w-[160px] z-20 relative">
                                            <p className={`text-sm font-bold leading-tight ${isLocked ? 'text-slate-400' : 'text-slate-700'}`}>{lvl.title}</p>
                                            {!isLocked && (
                                                <div className="absolute -top-3 -right-3 bg-yellow-400 text-yellow-900 text-[10px] font-black px-2 py-1 rounded-full shadow-sm flex items-center gap-1 border border-yellow-200">
                                                    <Trophy size={10} /> {lvl.xp} XP
                                                </div>
                                            )}
                                        </div>
                                    </div>
                                </div>
                            )
                        })}
                    </div>
                </div>
            ))}
        </div>

        {activeLevel && (
            <div className="fixed inset-0 z-[60] flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm animate-in fade-in">
                <div className="bg-white w-full max-w-sm rounded-[2rem] overflow-hidden shadow-2xl animate-in zoom-in-95">
                    <div className="bg-yellow-400 p-8 text-center relative overflow-hidden">
                        <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-20"></div>
                        <div className="w-20 h-20 bg-white/30 rounded-full flex items-center justify-center mx-auto mb-4 animate-bounce">
                            <Star size={48} className="text-white" fill="white" />
                        </div>
                        <h3 className="text-2xl font-black text-white drop-shadow-sm uppercase">Level Terbuka!</h3>
                    </div>
                    <div className="p-8 text-center space-y-6">
                        <div>
                            <h4 className="text-xl font-bold text-slate-800 mb-2">{activeLevel.title}</h4>
                            <div className="flex items-center justify-center gap-2 mb-4">
                                <span className="text-slate-400 text-sm font-bold uppercase tracking-wider">Hadiah:</span>
                                <span className="bg-green-100 text-green-700 px-3 py-1 rounded-lg font-black text-sm border border-green-200">+{activeLevel.xp} XP</span>
                            </div>
                            <p className="text-slate-500 font-medium text-sm">Jadilah yang pertama menyelesaikan level ini untuk mendapatkan XP maksimal!</p>
                        </div>
                        <Button onClick={handleStartGame} className="w-full h-14 text-xl font-black uppercase tracking-wider bg-green-500 hover:bg-green-600 text-white shadow-lg shadow-green-200 border-b-4 border-green-700 active:border-b-0 active:translate-y-1 rounded-2xl transition-all">
                            <Play fill="currentColor" className="mr-2"/> MAINKAN
                        </Button>
                        <button onClick={() => setActiveLevel(null)} className="text-slate-400 font-bold text-sm hover:text-slate-600 uppercase tracking-wide">Kembali ke Peta</button>
                    </div>
                </div>
            </div>
        )}
    </div>
  )
}