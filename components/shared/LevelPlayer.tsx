"use client"
import { useState } from "react"
import { ArrowLeft, ArrowRight, X, Grip, AlertCircle } from "lucide-react" // Tambah icon Alert
import { SegmentManager } from "@/components/lesson-engine/SegmentManager"

export function LevelPlayer({ level, userRole, currentUser, classStudents, onExit, onComplete, onXpUpdate, initialIndex = 0 }: any) {
  // 1. SAFETY CHECK: ARRAY SEGMENTS
  const slides = level?.segments || [];
  
  // --- KONDISI KHUSUS: KELAS KOSONG / BELUM ADA MATERI ---
  if (slides.length === 0) {
      return (
        <div className="fixed inset-0 z-[100] w-screen h-screen bg-slate-50 flex flex-col items-center justify-center font-sans p-6 text-center">
            <div className="bg-white p-8 rounded-3xl shadow-xl max-w-sm w-full border border-slate-100">
                <div className="w-16 h-16 bg-red-50 rounded-full flex items-center justify-center mx-auto mb-4">
                    <AlertCircle size={32} className="text-red-500"/>
                </div>
                <h2 className="text-xl font-bold text-slate-800 mb-2">Materi Belum Tersedia</h2>
                <p className="text-slate-500 mb-6">
                    Materi untuk bab <b>"{level?.title}"</b> belum diisi oleh Guru atau Admin.
                </p>
                <button 
                    onClick={onExit} // Keluar tanpa trigger onComplete (Jadi TIDAK DAPAT XP)
                    className="w-full py-3 bg-slate-800 text-white rounded-xl font-bold hover:bg-slate-700 transition-colors"
                >
                    Kembali
                </button>
            </div>
        </div>
      )
  }

  // --- LOGIKA NORMAL (Jika materi ada) ---
  const [currentIndex, setCurrentIndex] = useState(initialIndex)
  const currentSegment = slides[currentIndex]

  // Safety check double layer (jika index error)
  if (!currentSegment) return <div className="p-10 text-white">Error Memuat Segmen</div>;

  const isLastSlide = currentIndex === slides.length - 1
  const isBossLevel = currentSegment.type === 'boss';

  const handleNext = () => {
    if (isLastSlide) {
      onComplete() // XP baru diberikan disini
    } else {
      setCurrentIndex((prev: number) => prev + 1)
    }
  }

  const handlePrev = () => {
    if (currentIndex > 0) setCurrentIndex((prev:number) => prev - 1)
  }

  const bgTheme = level.themeColor || "bg-gradient-to-b from-sky-400 to-sky-200"

  return (
    <div className={`fixed inset-0 z-[100] w-screen h-screen flex flex-col font-sans transition-colors duration-500 ${isBossLevel ? 'bg-slate-900' : bgTheme}`}>
      
      {/* 1. PROGRESS BAR */}
      <div className="absolute top-0 left-0 w-full h-2 bg-black/10 z-50">
        <div 
          className="h-full bg-white/50 backdrop-blur transition-all duration-500 rounded-r-full"
          style={{ width: `${((currentIndex + 1) / slides.length) * 100}%` }}
        />
      </div>

      {/* 2. HEADER */}
      <div className="absolute top-6 left-6 right-6 flex justify-between items-center z-50 pointer-events-none">
        <div className="pointer-events-auto bg-white/20 backdrop-blur-md px-5 py-2.5 rounded-full border border-white/30 flex items-center gap-3 shadow-sm">
            <Grip size={18} className="text-white/80"/>
            <span className="text-sm font-bold text-white tracking-wide drop-shadow-sm">{level.title}</span>
        </div>
        <button onClick={onExit} className="pointer-events-auto w-10 h-10 bg-black/20 hover:bg-red-500 hover:text-white text-white/80 rounded-full flex items-center justify-center transition-all backdrop-blur-sm">
            <X size={20} strokeWidth={2.5} />
        </button>
      </div>

      {/* 3. CONTENT */}
      <div className="flex-1 relative w-full h-full overflow-hidden">
         <SegmentManager 
            segment={currentSegment}
            userRole={userRole}
            currentUser={currentUser}
            classStudents={classStudents}
            onNext={handleNext}
            onXpUpdate={onXpUpdate}
         />
      </div>

      {/* 4. NAVIGATION */}
      {currentSegment.type === 'material' && (
         <div className="absolute bottom-6 right-6 z-50 flex gap-4">
             {currentIndex > 0 && (
                 <button onClick={handlePrev} className="w-14 h-14 bg-white text-indigo-600 hover:bg-indigo-50 backdrop-blur-md rounded-full flex items-center justify-center shadow-xl shadow-indigo-900/20 transition-transform hover:scale-110 active:scale-95">
                    <ArrowLeft size={24} strokeWidth={3}/>
                 </button>
             )}
             <button onClick={handleNext} className="w-14 h-14 bg-white text-indigo-600 hover:bg-indigo-50 backdrop-blur-md rounded-full flex items-center justify-center shadow-xl shadow-indigo-900/20 transition-transform hover:scale-110 active:scale-95">
                <ArrowRight size={28} strokeWidth={4}/>
             </button>
         </div>
      )}
    </div>
  )
}