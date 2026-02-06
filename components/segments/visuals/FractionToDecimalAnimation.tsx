"use client"
import { useState } from "react";
import { ArrowRight, Play, RefreshCw, ArrowDown } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

export function FractionToDecimalAnimation({ fraction = "1/2", decimal = "0.5", color = "bg-blue-500" }: any) {
  // Steps: 0=Start, 1=Cut to Fraction, 2=Show Tenths Grid, 3=Show Decimal
  const [step, setStep] = useState(0);
  const maxSteps = 3;

  const handleNext = () => {
      setStep(prev => (prev < maxSteps ? prev + 1 : 0));
  }

  // Warna teks berdasarkan background color yang diinput
  const textColorClass = color.includes("blue") ? "text-blue-100" : "text-white";
  const darkColorClass = color.replace("500", "700");

  return (
    <div className="my-6 p-8 bg-white rounded-[2.5rem] border-2 border-slate-100 shadow-xl text-center relative overflow-hidden w-full max-w-2xl mx-auto">
      
      <h3 className="text-lg font-bold text-slate-600 mb-8 uppercase tracking-widest">Ilustrasi Perubahan</h3>

      {/* CONTAINER UTAMA BAR */}
      <div className="relative w-full h-28 bg-amber-700 rounded-2xl overflow-hidden border border-slate-200 shadow-inner">
          
          {/* LAYER 1: FRACTION BAR (Potongan Besar 1/2) */}
          <div className={cn(
              "absolute inset-0 flex transition-all duration-700 bg-",
              step >= 1 ? "opacity-100" : "opacity-0"
          )}>
               {/* Bagian Kiri (Diarsir) */}
              <div className={cn("w-1/2 h-full flex items-center justify-center transition-all duration-700 relative", color, step >= 2 ? "opacity-50" : "opacity-100")}>
                   {step === 1 && (
                      <span className={cn("text-4xl font-black animate-in zoom-in", textColorClass)}>{fraction}</span>
                   )}
              </div>
               {/* Bagian Kanan (Kosong) */}
              <div className="w-1/2 h-full bg-transparent"></div>
          </div>

           {/* LAYER 2: TENTHS GRID (Grid Persepuluhan) */}
           <div className={cn(
              "absolute inset-0 flex transition-all duration-700 z-10",
              step >= 2 ? "opacity-100 scale-100" : "opacity-0 scale-105 pointer-events-none"
          )}>
              {/* Loop 10 kotak kecil */}
              {Array.from({ length: 10 }).map((_, i) => (
                  <div key={i} className={cn(
                      "w-[10%] h-full border-r border-white/30 flex items-center justify-center first:rounded-l-2xl last:rounded-r-2xl last:border-r-0 transition-all delay-[i*100ms]",
                      // 5 kotak pertama diarsir, sisanya transparan
                      i < 5 ? color : "bg-transparent"
                  )}>
                      {/* Tampilkan angka 1-5 di kotak yang diarsir saat step 2 */}
                      {step === 2 && i < 5 && (
                          <span className={cn("text-sm font-bold", textColorClass)}>{i+1}</span>
                      )}
                  </div>
              ))}
          </div>
      </div>

      {/* LABELS & ARROWS AREA */}
      <div className="h-32 flex flex-col items-center justify-center relative mt-4">
           {/* Label Tahap 2: Pecahan Persepuluhan */}
           <div className={cn("absolute transition-all duration-500 flex flex-col items-center", step === 2 ? "opacity-100 translate-y-0" : "opacity-0 -translate-y-4")}>
                <ArrowDown className="text-slate-400 mb-2 animate-bounce" />
                <div className={cn("px-6 py-2 rounded-xl font-bold text-2xl", darkColorClass, textColorClass)}>
                    Sama <span className="text-3xl font-black">5/10</span>
                </div>
           </div>

           {/* Label Tahap 3: Desimal Akhir */}
           <div className={cn("absolute transition-all duration-700 flex flex-col items-center", step === 3 ? "opacity-100 scale-100" : "opacity-0 scale-50")}>
                 <div className="text-slate-400 font-bold mb-2 uppercase tracking-wider text-sm">Bentuk Desimal</div>
                <div className={cn("px-8 py-4 rounded-2xl font-black text-5xl shadow-lg animate-in slide-in-from-bottom-4", color, textColorClass)}>
                    {decimal}
                </div>
           </div>
      </div>


      {/* TOMBOL KONTROL */}
      <Button 
        onClick={handleNext}
        className={cn("mt-4 rounded-full px-8 font-bold transition-all shadow-md hover:shadow-lg active:scale-95", step === maxSteps ? "bg-slate-800 text-white hover:bg-slate-700" : "bg-indigo-600 text-white hover:bg-indigo-700")}
        size="lg"
      >
        {step === maxSteps ? <RefreshCw size={18} className="mr-2"/> : <Play size={18} fill="currentColor" className="mr-2"/>}
        {step === 0 ? "Mulai Potong" : step === 1 ? "Ubah ke Grid" : step === 2 ? "Jadikan Desimal" : "Ulangi"}
      </Button>
    </div>
  )
}