"use client"
import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { ArrowLeft, Crown, Medal, Trophy, User as UserIcon, ChevronLeft, ChevronDown } from "lucide-react"
import { Button } from "@/components/ui/button"

export default function LeaderboardPage() {
  const router = useRouter()
  const [loading, setLoading] = useState(true)
  
  // Data
  const [leaderboardData, setLeaderboardData] = useState<any[]>([])
  const [classInfo, setClassInfo] = useState<any>(null)
  
  // State User & Role
  const [currentUserEmail, setCurrentUserEmail] = useState("")
  const [userRole, setUserRole] = useState<'student' | 'teacher'>('student')
  
  // State Khusus Guru (List Kelas & Kelas Terpilih)
  const [teacherClasses, setTeacherClasses] = useState<any[]>([])
  const [selectedClassId, setSelectedClassId] = useState<string>("")

  // --- 1. FETCH DATA UTAMA ---
  useEffect(() => {
    const initData = async () => {
      try {
        // A. Cek Siapa Saya
        const resMe = await fetch('/api/me');
        if (!resMe.ok) return router.push('/'); // Redirect kalau belum login
        const me = await resMe.json();
        
        setCurrentUserEmail(me.email);
        setUserRole(me.role || 'student');

        // B. Ambil Data Master (Kelas & User)
        const [resClasses, resUsers] = await Promise.all([
            fetch('/api/classes'),
            fetch('/api/users')
        ]);
        const allClasses = await resClasses.json();
        const allUsers = await resUsers.json();

        // C. LOGIKA SISWA vs GURU
        let targetClassId = "";

        if (me.role === 'teacher') {
            // --- MODE GURU ---
            // Cari kelas yang diajar guru ini
            const myClasses = allClasses.filter((c: any) => c.teacherId === me.email);
            setTeacherClasses(myClasses);
            
            if (myClasses.length > 0) {
                targetClassId = myClasses[0].id; // Default pilih kelas pertama
                setSelectedClassId(targetClassId);
            }
        } else {
            // --- MODE SISWA ---
            targetClassId = me.classId;
            setSelectedClassId(targetClassId);
        }

        // D. PROSES DATA AWAL
        if (targetClassId) {
            processLeaderboard(targetClassId, allClasses, allUsers);
        } else {
            setLoading(false);
        }

      } catch (e) {
        console.error(e);
        setLoading(false);
      }
    }

    initData();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  // --- 2. FUNGSI UPDATE TAMPILAN (Saat Kelas Berubah) ---
  const processLeaderboard = (classId: string, allClasses: any[], allUsers: any[]) => {
      const targetClass = allClasses.find((c: any) => c.id === classId);
      
      if (targetClass) {
          const teacher = allUsers.find((u: any) => u.email === targetClass.teacherId);
          
          setClassInfo({
              className: targetClass.name,
              teacherName: teacher ? teacher.name : "Tanpa Guru"
          });

          // Filter teman sekelas & Sort XP
          const classmates = allUsers.filter((u: any) => u.classId === classId && u.role === 'student');
          const sorted = classmates.sort((a: any, b: any) => (b.xp || 0) - (a.xp || 0));
          
          setLeaderboardData(sorted);
      } else {
          setLeaderboardData([]);
      }
      setLoading(false);
  }

  // --- 3. HANDLER GANTI KELAS (Khusus Guru) ---
  const handleClassChange = async (newClassId: string) => {
      setLoading(true);
      setSelectedClassId(newClassId);

      // Fetch ulang user (biar data XP paling update)
      const [resClasses, resUsers] = await Promise.all([
          fetch('/api/classes'),
          fetch('/api/users')
      ]);
      const allClasses = await resClasses.json();
      const allUsers = await resUsers.json();

      processLeaderboard(newClassId, allClasses, allUsers);
  }

  if (loading) return (
    <div className="min-h-screen flex items-center justify-center bg-indigo-50">
        <div className="animate-pulse text-indigo-400 font-bold">Memuat Peringkat...</div>
    </div>
  )

  const topThree = leaderboardData.slice(0, 3)
  const restOfStudents = leaderboardData.slice(3)

  return (
    <div className="min-h-screen bg-indigo-50/50 pb-20 font-sans">
      
      {/* === HEADER NAVBAR === */}
      <div className="bg-white/90 backdrop-blur-md border-b border-slate-200 sticky top-0 z-40 supports-[backdrop-filter]:bg-white/60">
        <div className="max-w-5xl mx-auto px-4 h-16 flex items-center justify-between relative">
            
            {/* 1. KIRI: Tombol Kembali */}
            <div className="flex-shrink-0 z-10">
                <Button variant="ghost" size="icon" onClick={() => router.back()} className="rounded-full hover:bg-slate-100 -ml-2">
                    <ChevronLeft className="text-slate-700" size={28} />
                </Button>
            </div>

            {/* 2. TENGAH: Judul */}
            <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 text-center pointer-events-none md:pointer-events-auto">
                <h1 className="text-base md:text-lg font-black text-slate-800 uppercase tracking-widest hidden md:block">
                    Papan Juara
                </h1>
                {/* Judul Mobile */}
                <h1 className="text-sm font-black text-slate-800 uppercase tracking-widest md:hidden">
                    Leaderboard
                </h1>
            </div>

            {/* 3. KANAN: INFO KELAS / DROPDOWN GURU */}
            <div className="flex-shrink-0 z-10 flex flex-col items-end justify-center">
                {userRole === 'teacher' ? (
                    // --- TAMPILAN GURU: DROPDOWN ---
                    <div className="relative">
                        <select 
                            value={selectedClassId}
                            onChange={(e) => handleClassChange(e.target.value)}
                            className="appearance-none bg-indigo-50 border border-indigo-200 text-indigo-700 font-bold text-sm py-1.5 pl-3 pr-8 rounded-lg outline-none cursor-pointer hover:bg-indigo-100 transition-colors"
                        >
                            {teacherClasses.map((c) => (
                                <option key={c.id} value={c.id}>{c.name}</option>
                            ))}
                        </select>
                        <ChevronDown size={14} className="absolute right-2 top-1/2 -translate-y-1/2 text-indigo-400 pointer-events-none"/>
                    </div>
                ) : (
                    // --- TAMPILAN SISWA: TEKS BIASA ---
                    classInfo && (
                        <>
                            <span className="text-sm font-bold text-indigo-600 leading-tight">
                                {classInfo.className}
                            </span>
                            <div className="flex items-center gap-1 text-slate-500">
                                <UserIcon size={10} />
                                <span className="text-[10px] font-medium uppercase tracking-wide">
                                    {classInfo.teacherName}
                                </span>
                            </div>
                        </>
                    )
                )}
            </div>

        </div>
      </div>

      <div className="max-w-2xl mx-auto px-4 mt-8 animate-in slide-in-from-bottom-4">
        
        {/* --- 2. PODIUM (JUARA 1, 2, 3) --- */}
        {leaderboardData.length > 0 ? (
             <div className="flex justify-center items-end gap-2 md:gap-4 mb-12 min-h-[300px]">
                
                {/* JUARA 2 */}
                {topThree[1] && (
                    <div className="flex flex-col items-center">
                        <div className="mb-2 text-center">
                            <span className="font-bold text-slate-600 block text-sm">{topThree[1].name}</span>
                            <span className="text-xs font-bold text-indigo-500 bg-indigo-50 px-2 py-0.5 rounded-full">{topThree[1].xp || 0} XP</span>
                        </div>
                        <div className="w-24 md:w-28 bg-slate-200 h-32 rounded-t-2xl border-t-4 border-slate-300 relative shadow-sm flex flex-col items-center pt-4">
                            <div className="w-8 h-8 bg-slate-300 rounded-full flex items-center justify-center text-white font-bold mb-2">2</div>
                            <Medal size={32} className="text-slate-400" />
                        </div>
                    </div>
                )}

                {/* JUARA 1 */}
                {topThree[0] && (
                    <div className="flex flex-col items-center z-10">
                         <div className="mb-2 text-center relative">
                            <Crown size={32} className="text-yellow-500 absolute -top-8 left-1/2 -translate-x-1/2 animate-bounce" fill="currentColor" />
                            <span className="font-black text-slate-800 block text-lg">{topThree[0].name}</span>
                            <span className="text-sm font-bold text-yellow-600 bg-yellow-100 px-3 py-1 rounded-full border border-yellow-200">{topThree[0].xp || 0} XP</span>
                        </div>
                        <div className="w-28 md:w-36 bg-yellow-300 h-48 rounded-t-3xl border-t-4 border-yellow-400 relative shadow-xl flex flex-col items-center pt-6">
                            <div className="w-10 h-10 bg-yellow-400 rounded-full flex items-center justify-center text-white font-black text-xl mb-2">1</div>
                            <Trophy size={40} className="text-white drop-shadow-md" />
                        </div>
                    </div>
                )}

                {/* JUARA 3 */}
                {topThree[2] && (
                    <div className="flex flex-col items-center">
                        <div className="mb-2 text-center">
                            <span className="font-bold text-slate-600 block text-sm">{topThree[2].name}</span>
                            <span className="text-xs font-bold text-orange-600 bg-orange-100 px-2 py-0.5 rounded-full">{topThree[2].xp || 0} XP</span>
                        </div>
                        <div className="w-24 md:w-28 bg-orange-200 h-24 rounded-t-2xl border-t-4 border-orange-300 relative shadow-sm flex flex-col items-center pt-4">
                            <div className="w-8 h-8 bg-orange-300 rounded-full flex items-center justify-center text-white font-bold mb-2">3</div>
                            <Medal size={32} className="text-orange-400" />
                        </div>
                    </div>
                )}
             </div>
        ) : (
            <div className="text-center py-20">
                <div className="inline-block p-4 bg-white rounded-full shadow-sm mb-4"><Trophy size={48} className="text-slate-200" /></div>
                <p className="text-slate-400 font-bold">Belum ada siswa di kelas ini.</p>
            </div>
        )}

        {/* --- 3. LIST RANKING --- */}
        {restOfStudents.length > 0 && (
            <div className="bg-white rounded-3xl shadow-sm border border-slate-100 overflow-hidden">
                <div className="divide-y divide-slate-100">
                    {restOfStudents.map((student, idx) => {
                        const rank = idx + 4;
                        const isMe = student.email === currentUserEmail;
                        return (
                            <div key={student.id} className={`flex items-center p-4 gap-4 ${isMe ? 'bg-indigo-50 border-l-4 border-indigo-500' : ''}`}>
                                <div className="w-8 h-8 flex-shrink-0 flex items-center justify-center font-bold text-slate-400">{rank}</div>
                                <div className="w-10 h-10 bg-slate-100 rounded-full flex items-center justify-center text-slate-500">
                                    <UserIcon size={20} />
                                </div>
                                <div className="flex-1">
                                    <h3 className={`font-bold ${isMe ? 'text-indigo-700' : 'text-slate-700'}`}>
                                        {student.name} {isMe && "(Saya)"}
                                    </h3>
                                </div>
                                <div className="text-right">
                                    <span className="font-bold text-slate-800">{student.xp || 0}</span>
                                    <span className="text-xs text-slate-400 ml-1">XP</span>
                                </div>
                            </div>
                        )
                    })}
                </div>
            </div>
        )}

      </div>
    </div>
  )
}