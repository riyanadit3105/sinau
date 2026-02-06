"use client"
import { useState, useEffect } from "react"
import { motion } from "framer-motion"
import { GAME_OBJECTS } from "@/data/assets"

export function GridVisual({ data }: { data: any }) {
  const [currentCount, setCurrentCount] = useState(0);
  
  useEffect(() => {
    const total = data.count || 1;
    setCurrentCount(0);
    const interval = setInterval(() => {
      setCurrentCount(prev => (prev < total ? prev + 1 : prev));
    }, 600); 
    return () => clearInterval(interval);
  }, [data]);

  const imgSrc = GAME_OBJECTS[data.icon] || GAME_OBJECTS['apple']; 
  const showCounts = data.mode === 'total'; 

  return (
      <div className="flex flex-col items-center gap-6 w-full max-w-5xl">
         <div className="bg-white/50 backdrop-blur-md border-4 border-white rounded-[2rem] p-8 shadow-xl w-full min-h-[300px] flex items-center justify-center">
             <div className="flex flex-wrap justify-center gap-x-6 gap-y-8"> 
                {Array.from({ length: data.count || 1 }).map((_, i) => (
                   <motion.div 
                     key={i}
                     initial={{ scale: 0, opacity: 0 }}
                     animate={{ scale: i < currentCount ? 1 : 0, opacity: i < currentCount ? 1 : 0 }}
                     transition={{ type: "spring", bounce: 0.5 }}
                     className="w-20 h-20 md:w-24 md:h-24 bg-white rounded-3xl flex items-center justify-center shadow-md border-b-4 border-slate-100"
                   >
                       <img src={imgSrc} alt="Object" className="w-14 h-14 md:w-16 md:h-16 object-contain" />
                   </motion.div>
                ))}
             </div>
         </div>
         {showCounts && (
             <div className="h-10 flex items-center justify-center">
                 {currentCount > 0 && (
                     <motion.span 
                        key={currentCount} initial={{ scale: 0.8 }} animate={{ scale: 1 }}
                        className="bg-white px-4 py-1 rounded-full text-slate-400 font-bold tracking-widest uppercase text-xs shadow-sm border border-slate-100"
                     >
                        Total: {currentCount}
                     </motion.span>
                 )}
             </div>
         )}
      </div>
  )
}