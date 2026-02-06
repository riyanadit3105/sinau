"use client"
import { useState, useEffect } from "react";
import { Plus, Equal, RefreshCw, Play, ArrowDown } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { motion, AnimatePresence } from "framer-motion";

// Definisi warna
const COLOR_MAP: Record<string, string> = {
  tens: "text-emerald-400",
  ones: "text-blue-400",
  tenths: "text-indigo-400",
  hundredths: "text-purple-400",
  thousandths: "text-pink-400"
};

export function DecimalShiftAnimation({ data = {} }: { data?: any }) {
  // State: 0 = Awal (Semua terpisah), 1,2,3... = Proses gabung, Last = Hasil Akhir
  const [step, setStep] = useState(0);

  if (!data || Object.keys(data).length === 0) return null;

  // 1. Urutkan data & Filter
  const order = ['tens', 'ones', 'tenths', 'hundredths', 'thousandths'];
  const parts = order
    .filter(key => data[key] !== undefined && data[key] !== 0)
    .map(key => ({
      key,
      value: data[key],
      color: COLOR_MAP[key]
    }));

  const maxSteps = parts.length; 

  // Hitung nilai akumulatif per langkah
  // Contoh: step 1 (20), step 2 (25), step 3 (25.3), dst.
  const getCurrentTotal = (currentStep: number) => {
      if (currentStep === 0) return 0;
      let sum = 0;
      for (let i = 0; i < currentStep; i++) {
          sum += Number(parts[i].value);
      }
      return parseFloat(sum.toFixed(3)).toString();
  };

  const handleNext = () => {
      if (step < maxSteps) {
          setStep(prev => prev + 1);
      } else {
          setStep(0); // Reset
      }
  };

  // Auto-play option (Opsional: Jika mau otomatis jalan setelah klik pertama)
  // useEffect(() => {
  //    if (step > 0 && step < maxSteps) {
  //        const timer = setTimeout(() => setStep(prev => prev + 1), 1000);
  //        return () => clearTimeout(timer);
  //    }
  // }, [step]);

  const isFinished = step === maxSteps;
  const currentTotal = getCurrentTotal(step);

  return (
    <div className="my-6 p-8 bg-gradient-to-br from-slate-900 to-slate-800 rounded-[2.5rem] text-white shadow-2xl text-center relative overflow-hidden w-full max-w-3xl mx-auto border border-slate-700">
      
      {/* Background Decor */}
      <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-emerald-500 via-blue-500 to-purple-500"></div>
      
      {/* AREA UTAMA */}
      <div className="relative z-10 flex flex-col items-center justify-center min-h-[200px]">
        
        {/* BARIS ATAS: Angka yang belum digabung (Antrian) */}
        <div className="flex gap-4 mb-12 h-12 items-center justify-center opacity-50 scale-90">
             {parts.map((part, idx) => (
                 <div key={part.key} className={cn(
                     "transition-all duration-500 flex items-center gap-2",
                     idx < step ? "opacity-0 translate-y-10 scale-50 blur-sm" : "opacity-100" // Jika sudah dipanggil, hilang
                 )}>
                     <span className={cn("text-2xl font-mono font-bold", part.color)}>{part.value}</span>
                     {idx < parts.length - 1 && <Plus size={16} className="text-slate-600"/>}
                 </div>
             ))}
        </div>

        {/* BARIS BAWAH: HASIL AKUMULASI (Main Stage) */}
        <div className="relative h-24 flex items-center justify-center w-full">
            <AnimatePresence mode="wait">
                {step > 0 && (
                    <motion.div
                        key={step} // Key berubah = animasi ulang
                        initial={{ opacity: 0, scale: 0.8, y: 20 }}
                        animate={{ opacity: 1, scale: 1, y: 0 }}
                        exit={{ opacity: 0, scale: 1.2, position: 'absolute' }}
                        transition={{ type: "spring", stiffness: 300, damping: 20 }}
                        className="flex items-center gap-4"
                    >
                        {/* Jika baru mulai (step 1), jangan tampilkan panah turun, langsung angka */}
                        {step > 1 && (
                             <motion.div 
                                initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }}
                                className="flex items-center text-slate-500 gap-2"
                             >
                                <ArrowDown className="animate-bounce" /> 
                                <span className="text-xs font-bold uppercase tracking-widest text-slate-600">Gabung</span>
                             </motion.div>
                        )}
                        
                        <span className={cn(
                            "font-black tracking-widest drop-shadow-[0_0_25px_rgba(255,255,255,0.2)]",
                            isFinished 
                                ? "text-6xl bg-gradient-to-r from-emerald-300 via-blue-300 to-purple-300 bg-clip-text text-transparent" 
                                : "text-5xl text-white"
                        )}>
                            {currentTotal}
                        </span>
                    </motion.div>
                )}
                
                {step === 0 && (
                    <motion.div 
                        initial={{ opacity: 0 }} animate={{ opacity: 1 }}
                        className="text-slate-500 font-medium italic"
                    >
                        Klik tombol untuk menggabungkan...
                    </motion.div>
                )}
            </AnimatePresence>
        </div>

        {/* TOMBOL KONTROL */}
        <Button 
          onClick={handleNext}
          className={cn(
              "mt-8 rounded-full px-8 h-14 text-lg border transition-all duration-300 font-bold tracking-wide shadow-lg min-w-[200px]",
              isFinished
                ? "bg-slate-800 border-slate-600 text-slate-300 hover:bg-slate-700" 
                : "bg-indigo-600 border-indigo-400 text-white hover:bg-indigo-500 hover:shadow-indigo-500/50 hover:scale-105"
          )}
        >
          {isFinished ? (
              <>
                 <RefreshCw size={20} className="mr-2 group-hover:rotate-180 transition-transform"/> Ulangi
              </>
          ) : (
              <>
                 <Play size={20} fill="currentColor" className="mr-2"/> 
                 {step === 0 ? "Mulai Gabungkan" : "Tambah Berikutnya"}
              </>
          )}
        </Button>

        {/* PROGRESS DOTS */}
        <div className="flex gap-2 mt-6">
            {parts.map((_, i) => (
                <div key={i} className={cn(
                    "w-2 h-2 rounded-full transition-all duration-300",
                    i < step ? "bg-indigo-500 scale-125" : "bg-slate-700"
                )} />
            ))}
        </div>

      </div>
    </div>
  )
}