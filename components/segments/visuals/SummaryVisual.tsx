"use client"
import { motion } from "framer-motion"
import { GAME_OBJECTS } from "@/data/assets"

export function SummaryVisual({ data }: { data: any }) {
    return (
      <div className="w-full h-full overflow-y-auto p-4 flex items-center justify-center">
        <div className="bg-white/60 backdrop-blur-md rounded-[2rem] p-6 shadow-2xl border-4 border-white max-h-full overflow-y-auto">
           <div className="grid grid-cols-2 md:grid-cols-3 gap-6">
              {data.items?.map((item: any, idx: number) => (
                  <motion.div 
                    key={idx}
                    initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ delay: idx * 0.1 }}
                    className="bg-white rounded-2xl p-4 shadow-sm border border-slate-100 flex flex-col items-center gap-2"
                  >
                      <span className={`text-3xl font-black ${item.color || 'text-slate-700'}`}>{item.count}</span>
                      <div className="flex flex-wrap justify-center gap-1">
                          {Array.from({ length: item.count }).map((_, i) => (
                              <img key={i} src={GAME_OBJECTS[item.icon] || GAME_OBJECTS['apple']} alt="icon" className="w-8 h-8 object-contain" />
                          ))}
                      </div>
                  </motion.div>
              ))}
           </div>
        </div>
      </div>
    )
}