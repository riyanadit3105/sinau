"use client"
import { VisualRenderer } from "@/components/segments/VisualRenderer";

export default function MaterialLayout({ data, onNext }: any) {
  if (!data) return null;

  return (
    <div className="flex flex-col h-full w-full overflow-hidden font-sans">
       
       {/* 1. AREA VISUAL (Mengisi Sisa Layar) */}
       <div className="flex-1 flex items-center justify-center w-full relative p-4">
           {data.visual ? (
               <VisualRenderer visual={data.visual} />
           ) : (
               // Placeholder jika tidak ada visual
               <div className="flex-1 flex items-center justify-center text-slate-300 font-bold text-lg opacity-20 select-none">
                   (Simak Penjelasan)
               </div>
           )}
       </div>

       {/* 2. AREA DIALOG (Full Width Text) */}
       <div className="flex-none w-full px-4 pb-6 pt-2 z-20">
           <div 
             className="bg-white/95 backdrop-blur-md w-full rounded-[2rem] border-2 border-slate-100 shadow-[0_-10px_40px_rgba(0,0,0,0.05)] p-6 md:p-10 cursor-pointer active:scale-[0.98] transition-transform select-none"
             onClick={onNext}
           >
               {/* Teks Dialog: Besar di PC, Pas di HP, Rata Tengah */}
               <p className="text-xl md:text-3xl font-bold text-slate-800 leading-relaxed text-center">
                   {data.dialogue || "..."}
               </p>
           </div>
       </div>
    </div>
  )
}