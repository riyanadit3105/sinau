"use client"
import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { Gamepad2, ArrowRight, Trophy, ArrowLeft, Loader2, Lock } from "lucide-react"
import { Button } from "@/components/ui/button"

const SUPPORTED_GAME_TYPES = [
    "game_guess",
    "game_drag_drop",
    "game_fill_blank",
    "game_sorting"
];

export default function GameLibraryPage() {
  const router = useRouter()
  const [games, setGames] = useState<any[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchGames = async () => {
        setLoading(true)
        try {
            // 1. Ambil User
            const resMe = await fetch('/api/me');
            if (!resMe.ok) throw new Error("Login required");
            const userData = await resMe.json();

            // 🛡️ SATPAM: Hanya blokir jika STUDENT dan tidak punya kelas
            if (userData.role === 'student' && !userData.classId) {
                setGames([]); setLoading(false); return;
            }

            // 2. Tentukan Grade & Unlocked Levels
            let currentGrade = 1;
            let unlockedIds: string[] = [];
            const isTeacher = userData.role === 'teacher' || userData.role === 'school'; // Cek Role

            if (isTeacher) {
                // ✅ JIKA GURU: Set Grade Maksimal (6) & Tidak butuh unlockedIds
                currentGrade = 6; 
            } else {
                // 🎓 JIKA SISWA: Cek Kelasnya
                const resClass = await fetch('/api/classes');
                const classes = await resClass.json();
                const myClass = classes.find((c:any) => c.id === userData.classId);
                
                unlockedIds = myClass?.unlockedLevels || [];
                if (myClass?.name) {
                    currentGrade = parseInt(myClass.name.match(/\d+/)?.[0] || "1");
                }
            }

            // 3. LOGIKA SCANNING GAME
            let collectedGames: any[] = [];

            // Loop dari kelas 1 sampai Grade Tertinggi (Guru=6, Siswa=GradeDia)
            for (let g = 1; g <= currentGrade; g++) {
                const resChapters = await fetch(`/api/chapters?grade=${g}`);
                const chapters = await resChapters.json();

                if (Array.isArray(chapters)) {
                    chapters.forEach((chapter: any) => {
                        if (chapter.levels) {
                            chapter.levels.forEach((level: any) => {
                                // --- 🛡️ FILTER ---
                                const isClassBelow = g < currentGrade;
                                const isUnlockedByTeacher = unlockedIds.includes(level.id);

                                // ATURAN TAMPIL:
                                // 1. Guru -> BOLEH SEMUA (isTeacher == true)
                                // 2. Siswa -> Hanya jika (Kelas Bawah) ATAU (Sudah Dibuka)
                                
                                const canView = isTeacher || isClassBelow || isUnlockedByTeacher;

                                if (!canView) {
                                    return; // Skip game ini
                                }

                                if (level.segments) {
                                    level.segments.forEach((segment: any, index: number) => {
                                        if (SUPPORTED_GAME_TYPES.includes(segment.type)) {
                                            collectedGames.push({
                                                gameTitle: segment.title || level.title,
                                                chapterTitle: `Kelas ${g} - ${chapter.title}`,
                                                levelId: level.id,
                                                segmentIndex: index,
                                                themeColor: chapter.themeColor,
                                                xp: level.xp || 0,
                                                grade: g
                                            })
                                        }
                                    })
                                }
                            })
                        }
                    })
                }
            }

            collectedGames.sort((a, b) => b.grade - a.grade);
            setGames(collectedGames)

        } catch (e) {
            console.error("Gagal memuat game:", e)
        } finally {
            setLoading(false)
        }
    }

    fetchGames()
  }, [])

  // ... (RENDER BAGIAN HEADER SAMA) ...

  return (
    <div className="min-h-screen bg-slate-50 font-sans pb-20">
      {/* HEADER: Sticky & Blur Effect */}
      <div className="bg-white/80 backdrop-blur-md border-b border-slate-200 sticky top-0 z-50">
        <div className="max-w-5xl mx-auto px-4 h-18 md:h-20 flex items-center gap-3">
          
          {/* 1. Tombol Kembali */}
          <Button 
            variant="ghost" 
            size="icon" 
            onClick={() => router.push('/dashboard')}
            className="w-10 h-10 md:w-12 md:h-12 rounded-xl text-slate-500 hover:text-slate-700 hover:bg-slate-100 transition-colors"
          >
             <ArrowLeft size={24} strokeWidth={2.5} />
          </Button>

          {/* 2. Divider Vertikal (Pemisah Visual) */}
          <div className="w-px h-8 bg-slate-200 mx-1"></div>

          {/* 3. Identitas Halaman */}
          <div className="flex items-center gap-3 text-indigo-600 pl-1">
             <div className="w-10 h-10 md:w-12 md:h-12 bg-indigo-50 rounded-xl flex items-center justify-center">
                <Gamepad2 size={24} className="md:w-7 md:h-7" />
             </div>
             <div>
                <h1 className="text-lg md:text-xl font-black uppercase tracking-wider leading-none">Arcade Zone</h1>
                <p className="text-[10px] md:text-xs font-bold text-slate-400 uppercase tracking-widest">Mini Games</p>
             </div>
          </div>

        </div>
      </div>

      <div className="max-w-5xl mx-auto px-4 mt-8 space-y-6 animate-in fade-in">
        {/* ... Banner Code SAMA ... */}
        
        {/* LOADING */}
        {loading && (
             <div className="flex flex-col items-center justify-center py-20 text-slate-400">
                <Loader2 className="animate-spin mb-2" size={32}/>
                <p>Mengecek game yang terbuka...</p>
            </div>
        )}

        {/* LIST GAME */}
        {!loading && games.length > 0 && (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {games.map((game, idx) => (
                <div 
                    key={idx} 
                    className="group bg-white rounded-3xl p-5 border-2 border-slate-100 hover:border-indigo-500 hover:shadow-xl transition-all cursor-pointer relative overflow-hidden"
                    onClick={() => router.push(`/games/${game.levelId}?idx=${game.segmentIndex}&grade=${game.grade}`)}
                >
                    {/* Badge Chapter */}
                    <div className="flex items-center gap-2 mb-4">
                        <span className={`text-[10px] font-bold text-white px-2 py-1 rounded-md ${game.themeColor || 'bg-slate-500'}`}>
                            {game.levelId}
                        </span>
                        <span className="text-xs font-bold text-slate-400 truncate flex-1">
                            {game.chapterTitle}
                        </span>
                    </div>

                    {/* Title & Icon */}
                    {/* ... (Code tampilan SAMA) ... */}
                     <div className="flex items-start justify-between mb-6">
                        <div>
                            <h3 className="text-xl font-black text-slate-800 group-hover:text-indigo-600 transition-colors line-clamp-2">
                                {game.gameTitle}
                            </h3>
                        </div>
                        <div className="w-12 h-12 bg-indigo-50 rounded-2xl flex items-center justify-center text-indigo-500 group-hover:bg-indigo-600 group-hover:text-white transition-all">
                            <Gamepad2 size={24} />
                        </div>
                    </div>
                    {/* ... */}
                </div>
            ))}
            </div>
        )}

        {!loading && games.length === 0 && (
            <div className="text-center py-20 bg-slate-100 rounded-3xl border border-dashed border-slate-300 text-slate-400">
                <Lock size={48} className="mx-auto mb-4 text-slate-300"/>
                <p className="font-bold text-lg text-slate-500">Belum Ada Game Terbuka</p>
                <p className="text-sm max-w-md mx-auto mt-2">
                    Game akan muncul di sini setelah Gurumu membuka materi (Unlock Bab) di kelas, atau materi dari kelas sebelumnya.
                </p>
            </div>
        )}

      </div>
    </div>
  )
}