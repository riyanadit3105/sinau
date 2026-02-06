import { BookOpen, Users, GraduationCap, Copy, Check } from "lucide-react"
import { Button } from "@/components/ui/button"
import { useState } from "react"

export function OverviewView({ classes, teachers, totalStudents, teacherJoinCode }: any) {
  const [copied, setCopied] = useState(false)

  const handleCopy = () => {
    navigator.clipboard.writeText(teacherJoinCode)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  const StatCard = ({ icon, label, value, color }: any) => (
    <div className="bg-white p-6 rounded-2xl border border-slate-100 shadow-sm flex items-center gap-5 hover:shadow-md transition-shadow">
      <div className={`w-12 h-12 rounded-xl text-white ${color} flex items-center justify-center shadow-lg shadow-indigo-50 shrink-0`}>{icon}</div>
      <div className="min-w-0">
          <p className="text-xs font-bold text-slate-400 uppercase tracking-wide mb-1">{label}</p>
          <p className="text-3xl font-black text-slate-800 truncate">{value}</p>
      </div>
    </div>
  )

  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-2 duration-500">
      <div className="flex flex-col gap-1">
          <h1 className="text-2xl font-bold text-slate-900">Dashboard Overview</h1>
          <p className="text-slate-500">Ringkasan aktivitas sekolah Anda hari ini.</p>
      </div>
      
      {/* Kartu Statistik */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <StatCard icon={<BookOpen/>} label="Total Kelas" value={classes.length} color="bg-blue-500" />
        <StatCard icon={<Users/>} label="Total Guru" value={teachers.length} color="bg-orange-500" />
        <StatCard icon={<GraduationCap/>} label="Total Siswa" value={totalStudents} color="bg-emerald-500" />
      </div>

      {/* Banner Kode Rekrutmen */}
      <div className="bg-gradient-to-r from-indigo-600 to-indigo-800 rounded-3xl p-8 text-white shadow-2xl relative overflow-hidden">
        {/* Background Decoration */}
        <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full blur-3xl -mr-16 -mt-16"></div>
        
        <div className="relative z-10">
            <h3 className="font-bold text-xl mb-2">Kode Rekrutmen Guru</h3>
            <p className="text-indigo-100 text-sm mb-6 max-w-lg leading-relaxed">
                Bagikan kode unik ini kepada guru-guru di sekolah Anda agar mereka bisa mendaftar.
            </p>
            
            {/* --- UI COMPACT / PENDEK --- */}
            {/* w-fit: Kuncinya disini, agar lebarnya pas sesuai konten (tidak memanjang) */}
            <div className="flex items-center gap-2 bg-black/20 backdrop-blur-md rounded-xl border border-white/10 p-1.5 shadow-inner">
                
                {/* 1. TEKS KODE */}
                <span className="font-mono flex-1 w-50 text-xl font-bold tracking-widest text-white px-4 select-all">
                    {teacherJoinCode}
                </span>

                {/* 2. TOMBOL SALIN (Kecil & Menyatu) */}
                <Button 
                    onClick={handleCopy}
                    size="icon"
                    className="flex-1 w-1 rounded-lg bg-white/10 hover:bg-white/20 text-white border-none transition-all active:scale-95"
                    title="Salin Kode"
                >
                    {copied ? <Check size={18} className="text-green-300"/> : <Copy size={18} />}
                </Button>

            </div>
        </div>
      </div>
    </div>
  )
}