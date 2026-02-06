"use client"
import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { useRouter } from "next/navigation"
import { 
    BookOpen, Users, ArrowLeft, School, Loader2, 
    Star, Lock, Trophy
} from "lucide-react"
import { LevelPlayer } from "@/components/shared/LevelPlayer"

export function TeacherDashboard({ user }: { user: any }) {
  const router = useRouter()
  const [myClasses, setMyClasses] = useState<any[]>([])
  const [chapters, setChapters] = useState<any[]>([]) 
  const [isLoading, setIsLoading] = useState(true)
  const [joinCode, setJoinCode] = useState("")
  const [isJoining, setIsJoining] = useState(false)
  const [playingLevel, setPlayingLevel] = useState<any | null>(null)
  
  const [selectedClass, setSelectedClass] = useState<any | null>(null)
  const [activeLevel, setActiveLevel] = useState<any | null>(null) 

  // --- 1. FETCH DATA AWAL (Hanya Ambil Daftar Kelas) ---
  const fetchData = async () => {
    setIsLoading(true)
    try {
      if (!user.schoolId) { setIsLoading(false); return; }
      
      const resClasses = await fetch('/api/classes', { cache: 'no-store' })
      const allClasses = await resClasses.json()
      // Filter kelas milik guru ini
      const teacherClasses = allClasses.filter((c: any) => c.teacherId === user.email)
      setMyClasses(teacherClasses)
      
      // Catatan: Kita TIDAK fetch chapters disini lagi.
      // Kita fetch nanti saat guru memilih kelasnya.

    } catch (e) { console.error(e) } 
    finally { setIsLoading(false) }
  }

  useEffect(() => { fetchData() }, [user.email, user.schoolId]) 

  // --- 2. LOGIC PILIH KELAS (PERBAIKAN UTAMA DISINI) ---
  const handleSelectClass = async (cls: any) => {
      // Tampilkan loading sebentar agar transisi halus
      setIsLoading(true); 
      
      try {
          // A. Deteksi Grade dari Nama Kelas
          // Contoh: "Kelas 6A" -> ambil angka "6"
          // Jika tidak ada angka, default ke "1"
          const detectedGrade = cls.name.match(/\d+/)?.[0] || "1";

          // B. Panggil API Chapter Sesuai Grade
          const res = await fetch(`/api/chapters?grade=${detectedGrade}`, { cache: 'no-store' });
          const dataChapters = await res.json();
          
          // C. Simpan ke state
          setChapters(dataChapters);
          setSelectedClass(cls);

      } catch (error) {
          console.error("Gagal memuat materi:", error);
      } finally {
          setIsLoading(false);
      }
  }

  // --- 3. HELPER JOIN SEKOLAH ---
  const handleJoinSchool = async () => {
      if(!joinCode) return;
      setIsJoining(true);
      try {
          const res = await fetch('/api/redeem/teacher', {
              method: 'POST',
              headers: { 'Content-Type': 'application/json' },
              body: JSON.stringify({ email: user.email, code: joinCode })
          });
          const data = await res.json();
          if (!res.ok) throw new Error(data.error);
          alert(`Berhasil bergabung ke ${data.schoolName}!`);
          window.location.reload(); 
      } catch (e: any) { alert(e.message); } finally { setIsJoining(false); }
  }

  // --- 4. HELPER START GAME ---
  const handleStart = () => {
      if (!activeLevel) return;
      let contentData = null;
      for (const bab of chapters) {
          const found = bab.levels?.find((sub: any) => sub.id === activeLevel.id);
          if (found) { contentData = found; break; }
      }
      if (!contentData) {
            alert(`Materi untuk level ${activeLevel.id} belum tersedia.`);
            return;
      }
      const levelToPlay = { ...activeLevel, ...contentData };
      setPlayingLevel(levelToPlay);
  }

  // --- 5. LOGIC LAINNYA (Unlock/Lock/Progress) ---
  const saveProgressToDB = async (levelId: string, action: 'unlock' | 'lock') => {
      if (!selectedClass) return;
      try {
          await fetch('/api/classes/progress', {
              method: 'POST',
              headers: { 'Content-Type': 'application/json' },
              body: JSON.stringify({ classId: selectedClass.id, levelId, action })
          });
      } catch (error) { console.error(error); }
  }

  const handleUnlockLevel = async () => {
    if (!activeLevel || !selectedClass) return;
    const currentUnlocked = selectedClass.unlockedLevels || [];
    if(!currentUnlocked.includes(activeLevel.id)){
        const newList = [...currentUnlocked, activeLevel.id];
        // Update Lokal dulu biar cepat
        const updatedClass = { ...selectedClass, unlockedLevels: newList };
        setSelectedClass(updatedClass);
        // Update List Kelas Utama juga
        setMyClasses(prev => prev.map(c => c.id === updatedClass.id ? updatedClass : c));
        
        setActiveLevel({ ...activeLevel, status: 'unlocked' });
        await saveProgressToDB(activeLevel.id, 'unlock');
    }
  }

  const handleLockLevel = async () => {
      if (!activeLevel || !selectedClass) return;
      const currentUnlocked = selectedClass.unlockedLevels || [];
      const newUnlockedList = currentUnlocked.filter((id: string) => id !== activeLevel.id);
      
      const updatedClass = { ...selectedClass, unlockedLevels: newUnlockedList };
      setSelectedClass(updatedClass);
      setMyClasses(prev => prev.map(c => c.id === updatedClass.id ? updatedClass : c));

      setActiveLevel({ ...activeLevel, status: 'locked' });
      await saveProgressToDB(activeLevel.id, 'lock');
  }

  const handleFinishSession = async () => {
      if (!selectedClass || !playingLevel) return;
      
      const finishedLevelId = playingLevel.id;
      setPlayingLevel(null); 

      try {
          // PANGGIL API BARU
          const res = await fetch('/api/teacher/finish-session', {
              method: 'POST',
              headers: { 'Content-Type': 'application/json' },
              body: JSON.stringify({
                  classId: selectedClass.id,
                  levelId: finishedLevelId
              })
          });
          
          const data = await res.json();
          
          if (data.success) {
              alert(`✅ KELAS SELESAI!\n\n${data.message}`);
              // Refresh data agar status terupdate
              if (selectedClass) handleSelectClass(selectedClass); 
          }
      } catch (error) { 
          console.error("Error finish session:", error); 
          alert("Gagal menyimpan sesi kelas.");
      }
  }

  const getMergedChapters = () => {
      if (!selectedClass || !chapters.length) return chapters;
      const unlockedIds = selectedClass.unlockedLevels || [];
      return chapters.map(bab => ({
          ...bab,
          levels: bab.levels?.map((lvl: any) => ({
              ...lvl,
              status: unlockedIds.includes(lvl.id) ? 'unlocked' : 'locked'
          })) || []
      }));
  }
  
  const getPositionClass = (index: number) => {
      const pos = index % 4;
      if(pos === 0) return "justify-center";
      if(pos === 1) return "justify-start pl-8 md:pl-32";
      if(pos === 2) return "justify-center";
      return "justify-end pr-8 md:pr-32";
  }

  // --- RENDER ---

  if (playingLevel) {
      return (
        <LevelPlayer 
            level={playingLevel} 
            userRole="teacher"
            onExit={() => setPlayingLevel(null)} 
            onComplete={handleFinishSession} 
            currentUser={user} 
            classStudents={selectedClass.students || []} 
        />
      )
  }

  // VIEW 1: JOIN SCHOOL
  if (!user.schoolId) { 
    return (
        <div className="flex flex-col items-center justify-center min-h-[70vh] text-center space-y-8 animate-in fade-in">
            <div className="w-24 h-24 bg-indigo-100 rounded-3xl flex items-center justify-center rotate-3">
                <School size={48} className="text-indigo-600" />
            </div>
            <div>
                <h1 className="text-2xl font-bold text-slate-900">Gabung Sekolah</h1>
                <p className="text-slate-500 mt-2">Masukkan kode rekrutmen dari Admin Sekolah.</p>
            </div>
            <div className="flex gap-3 bg-white p-4 rounded-xl shadow-sm border border-slate-200">
                <Input placeholder="JOIN-XXXX" value={joinCode} onChange={(e) => setJoinCode(e.target.value)} className="font-mono uppercase w-40"/>
                <Button onClick={handleJoinSchool} disabled={isJoining}>{isJoining ? "..." : "Gabung"}</Button>
            </div>
        </div>
    )
  }

  if (isLoading) return <div className="flex flex-col items-center justify-center min-h-[50vh]"><Loader2 className="animate-spin text-indigo-600 mb-2"/> <p className="text-slate-400 font-bold">Memuat Kelas...</p></div>

  // VIEW 2: LIST KELAS
  if (!selectedClass) {
      return (
        <div className="space-y-8 animate-in fade-in">
            <div className="flex justify-between items-end">
                <div>
                    <h1 className="text-3xl font-bold text-slate-900">Halo, {user.name}</h1>
                    <p className="text-slate-500 mt-1">Pilih kelas untuk mulai mengajar.</p>
                </div>
            </div>

            {myClasses.length === 0 ? (
                <div className="text-center py-20 bg-slate-50 rounded-3xl border border-dashed border-slate-300">
                    <Users size={48} className="mx-auto text-slate-300 mb-4"/>
                    <p className="text-slate-500 font-medium">Anda belum memiliki kelas.</p>
                    <p className="text-sm text-slate-400">Minta Admin Sekolah untuk membuatkan kelas.</p>
                </div>
            ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {myClasses.map((cls) => (
                        <div 
                            key={cls.id} 
                            // 👇 INI YANG PENTING: Panggil handleSelectClass saat diklik
                            onClick={() => handleSelectClass(cls)} 
                            className="group bg-white rounded-3xl p-6 border border-slate-200 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all cursor-pointer relative overflow-hidden"
                        >
                            <div className="absolute top-0 right-0 w-32 h-32 bg-indigo-50 rounded-bl-[100px] -mr-8 -mt-8 transition-transform group-hover:scale-110"></div>
                            <div className="relative z-10">
                                <div className="w-14 h-14 bg-indigo-600 text-white rounded-2xl flex items-center justify-center font-bold text-2xl mb-4 shadow-lg shadow-indigo-200">
                                    {cls.name.charAt(0)}
                                </div>
                                <h3 className="text-2xl font-bold text-slate-900 mb-1">Kelas {cls.name}</h3>
                                <p className="text-slate-500 text-sm flex items-center gap-2">
                                    <Users size={16}/> {cls.studentsCount || 0} Siswa
                                </p>
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
      )
  }

  // VIEW 3: PETA BELAJAR (Detail Kelas)
  const displayChapters = getMergedChapters(); 

  return (
        <div className="relative min-h-screen bg-white pb-20 animate-in slide-in-from-right-4">
            {/* HEADER KELAS: Sticky & Balanced Layout */}
            <div className="sticky top-0 md:top-16 z-30 bg-white/90 backdrop-blur-md border-b border-slate-200 shadow-sm transition-all">
                <div className="px-4 h-16 flex items-center justify-between max-w-5xl mx-auto">
                    
                    {/* 1. KIRI: Tombol Kembali (Fixed Width) */}
                    <div className="w-12 flex justify-start">
                        <Button 
                            variant="ghost" 
                            size="icon" 
                            onClick={() => setSelectedClass(null)} 
                            className="rounded-xl text-slate-500 hover:text-slate-800 hover:bg-slate-100"
                        >
                            <ArrowLeft size={24} strokeWidth={2.5}/>
                        </Button>
                    </div>

                    {/* 2. TENGAH: Judul Kelas (Flex-1: Mengisi Ruang Sisa) */}
                    <div className="flex-1 flex flex-col items-center justify-center">
                        <h1 className="font-bold text-slate-800 text-lg md:text-xl leading-tight">
                            Kelas {selectedClass.name}
                        </h1>
                        <div className="flex items-center gap-1.5 opacity-80 mt-0.5">
                            <span className="w-1.5 h-1.5 rounded-full bg-indigo-500 animate-pulse"></span>
                            <span className="text-[10px] font-bold tracking-widest text-indigo-600 uppercase">
                                Peta Belajar
                            </span>
                        </div>
                    </div>

                    {/* 3. KANAN: Spacer Penyeimbang (Fixed Width = Kiri) */}
                    <div className="w-12"></div> 

                </div>
            </div>

            <div className="max-w-md mx-auto pt-8 pb-32 px-4 space-y-12">
                {displayChapters.map((bab, babIndex) => (
                    <div key={bab.id || babIndex} className="relative">
                        <div className={`${bab.themeColor || 'bg-blue-500'} text-white p-5 rounded-2xl shadow-lg shadow-indigo-200/50 mb-12 relative overflow-hidden z-10`}>
                            <div className="flex justify-between items-start">
                                <div>
                                    <h2 className="text-xl font-extrabold tracking-tight mb-1">{bab.title}</h2>
                                    <p className="text-white/90 text-sm font-medium leading-snug">{bab.description}</p>
                                </div>
                                <BookOpen size={24} className="text-white/80"/>
                            </div>
                        </div>

                        <div className="space-y-8 relative">
                            {bab.levels?.map((lvl: any, lvlIndex: number) => {
                                const isLocked = lvl.status === 'locked';
                                const positionClass = getPositionClass(lvlIndex);
                                return (
                                    <div key={lvl.id} className={`flex ${positionClass} relative z-0`}>
                                        <div className="flex flex-col items-center group relative">
                                            <button
                                                onClick={() => setActiveLevel(lvl)}
                                                className={`w-20 h-20 rounded-full flex flex-col items-center justify-center border-b-[6px] transition-all active:border-b-0 active:translate-y-2 outline-none relative z-10 ${isLocked ? 'bg-slate-200 border-slate-300 text-slate-400' : 'bg-indigo-500 border-indigo-700 text-white shadow-xl shadow-indigo-200 hover:bg-indigo-400'}`}
                                            >
                                                {isLocked ? <Lock size={28} strokeWidth={2.5} /> : <Star size={32} fill="currentColor" className="text-yellow-300 stroke-yellow-600" strokeWidth={1.5} />}
                                            </button>
                                            <div className="mt-3 bg-white border border-slate-200 px-3 py-1.5 rounded-xl shadow-sm max-w-[140px] text-center z-10">
                                                <p className={`text-xs font-bold leading-tight ${isLocked ? 'text-slate-400' : 'text-slate-700'}`}>{lvl.title}</p>
                                            </div>
                                        </div>
                                    </div>
                                )
                            })}
                        </div>
                    </div>
                ))}
            </div>

            {/* MODAL LEVEL */}
            {activeLevel && (
                <div className="fixed inset-0 z-[60] flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-in fade-in">
                    <div className="bg-white w-full max-w-sm rounded-3xl overflow-hidden shadow-2xl animate-in zoom-in-95 duration-200">
                        <div className={`p-6 text-center ${activeLevel.status === 'locked' ? 'bg-slate-100' : 'bg-indigo-500'}`}>
                             {activeLevel.status === 'locked' ? (
                                <div className="w-16 h-16 bg-slate-200 rounded-full flex items-center justify-center mx-auto mb-2"><Lock size={32} className="text-slate-400"/></div>
                             ) : (
                                <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-2 animate-bounce"><Star size={32} className="text-yellow-300" fill="currentColor" /></div>
                             )}
                             <h3 className={`text-xl font-bold ${activeLevel.status === 'locked' ? 'text-slate-600' : 'text-white'}`}>
                                {activeLevel.status === 'locked' ? 'Materi Terkunci' : 'Siap Mulai?'}
                             </h3>
                        </div>

                        <div className="p-6 text-center space-y-6">
                            <div>
                                <h4 className="text-lg font-bold text-slate-800 mb-1">{activeLevel.title}</h4>
                                <p className="text-sm text-slate-500">
                                    {activeLevel.status === 'locked' ? "Buka materi ini agar Siswa bisa mengaksesnya?" : "Tampilkan materi ini di layar kelas?"}
                                </p>
                            </div>

                            <div className="space-y-3">
                                {activeLevel.status !== 'locked' ? (
                                    <>
                                        <Button onClick={handleStart} className="w-full h-12 text-lg font-bold uppercase tracking-wide bg-green-500 hover:bg-green-600 text-white shadow-lg shadow-green-200 border-b-4 border-green-700 active:border-b-0 active:translate-y-1 rounded-2xl">MULAI</Button>
                                        <button onClick={handleLockLevel} className="text-xs font-bold text-slate-400 hover:text-red-500 flex items-center justify-center gap-1 w-full"><Lock size={12}/> Kunci Kembali</button>
                                    </>
                                ) : (
                                    <Button onClick={handleUnlockLevel} className="w-full h-12 text-lg font-bold bg-indigo-600 hover:bg-indigo-700 text-white border-b-4 border-indigo-800 rounded-2xl">BUKA KUNCI</Button>
                                )}
                            </div>
                        </div>
                        <div className="bg-slate-50 p-4 border-t border-slate-100">
                            <button onClick={() => setActiveLevel(null)} className="w-full py-3 font-bold text-slate-500 hover:bg-slate-100 rounded-xl transition-colors uppercase tracking-wider text-sm">Tutup</button>
                        </div>
                    </div>
                </div>
            )}
        </div>
  )
}