"use client"
import React from 'react'
import { Lock, Star, Check, MapPin } from 'lucide-react'

// Dummy Data untuk Peta (Nanti bisa dari JSON/API)
const LEVELS = [
  { id: 1, title: "Penjumlahan Dasar", status: "completed" },
  { id: 2, title: "Pengurangan Dasar", status: "completed" },
  { id: 3, title: "Perkalian 1-5", status: "current" }, // Posisi User Sekarang
  { id: 4, title: "Pembagian Sederhana", status: "locked" },
  { id: 5, title: "Soal Cerita Level 1", status: "locked" },
  { id: 6, title: "Quiz Akhir Bab 1", status: "locked" },
]

export function GameMap() {
  return (
    <div className="w-full max-w-2xl mx-auto py-10 relative">
        <h2 className="text-2xl font-bold text-center text-indigo-900 mb-2">Petualangan Matematika</h2>
        <p className="text-center text-slate-500 mb-12">Selesaikan bab untuk membuka kunci selanjutnya!</p>

      <div className="relative flex flex-col items-center gap-16">
        {/* Garis Putus-putus (Garis Jalur) */}
        <div className="absolute top-4 bottom-4 w-1 border-l-4 border-dotted border-slate-300 -z-10" />

        {LEVELS.map((level, index) => {
          const isCompleted = level.status === "completed"
          const isCurrent = level.status === "current"
          const isLocked = level.status === "locked"

          return (
            <div key={level.id} className="relative w-full flex justify-center group">
              
              {/* === AVATAR (Muncul hanya di level Current) === */}
              {isCurrent && (
                <div className="absolute -top-12 z-20 animate-bounce">
                  <div className="bg-indigo-600 text-white px-3 py-1 rounded-full text-xs font-bold shadow-lg mb-1 whitespace-nowrap">
                    Kamu di sini!
                  </div>
                  <div className="w-12 h-12 bg-white rounded-full border-4 border-indigo-600 shadow-xl overflow-hidden mx-auto">
                    {/* Placeholder Avatar - Bisa diganti image user */}
                    <img src={`https://api.dicebear.com/7.x/avataaars/svg?seed=Felix`} alt="Avatar" />
                  </div>
                </div>
              )}

              {/* === NODE / LEVEL BUTTON === */}
              <button 
                disabled={isLocked}
                className={`
                  relative w-20 h-20 rounded-[2rem] flex items-center justify-center transition-all duration-300
                  border-b-8 active:border-b-0 active:translate-y-2
                  ${isCompleted 
                    ? "bg-emerald-400 border-emerald-600 text-white shadow-emerald-200" 
                    : isCurrent 
                      ? "bg-indigo-500 border-indigo-700 text-white shadow-indigo-300 ring-4 ring-indigo-200" 
                      : "bg-slate-200 border-slate-300 text-slate-400 cursor-not-allowed"}
                  shadow-xl
                `}
              >
                {isCompleted ? <Check size={32} strokeWidth={4} /> : 
                 isLocked ? <Lock size={24} /> : 
                 <Star size={32} fill="currentColor" />}
              </button>

              {/* === LABEL BAB (Kiri atau Kanan bergantian) === */}
              <div className={`absolute top-6 w-40 p-2 
                ${index % 2 === 0 ? "left-[55%] text-left pl-8" : "right-[55%] text-right pr-8"}
              `}>
                <h3 className={`font-bold text-sm ${isLocked ? "text-slate-400" : "text-slate-800"}`}>
                  Bab {level.id}
                </h3>
                <p className="text-xs text-slate-500 leading-tight">{level.title}</p>
              </div>

            </div>
          )
        })}
      </div>
      
      {/* Start Point */}
      <div className="mt-12 text-center">
         <div className="inline-block px-4 py-2 bg-slate-200 rounded-full text-xs font-bold text-slate-500 uppercase tracking-wider">
            Start
         </div>
      </div>
    </div>
  )
}