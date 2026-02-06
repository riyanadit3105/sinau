"use client"
import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { RefreshCcw, Send, CheckCircle2, XCircle, Trophy, User, Users } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

// --- LOGIC GENERATOR SOAL ---
const generateEquation = () => {
  // 1. Generate Angka Random (Misal: 37.844)
  // Range: 10 - 99 untuk bulat, dan 3 digit desimal
  const tens = Math.floor(Math.random() * 9) + 1; // 1-9 (jadi 10-90)
  const ones = Math.floor(Math.random() * 10);    // 0-9
  const tenths = Math.floor(Math.random() * 10);  // 0.0 - 0.9
  const hundredths = Math.floor(Math.random() * 10);
  const thousandths = Math.floor(Math.random() * 9) + 1; // Minimal ada angka di ujung

  // 2. Susun Parts (Bagian-bagian penjumlahan)
  // Filter yang nilainya 0 agar tidak muncul di soal (misal 30 + 0 + 0.5 -> 30 + 0.5)
  const rawParts = [
    { value: tens * 10, display: (tens * 10).toString() },
    { value: ones, display: ones.toString() },
    { value: tenths / 10, display: (tenths / 10).toString() },
    { value: hundredths / 100, display: (hundredths / 100).toString() },
    { value: thousandths / 1000, display: (thousandths / 1000).toString() }
  ];

  // Hapus bagian yang nilainya 0
  const activeParts = rawParts.filter(p => p.value > 0);

  // Hitung Total Angka
  const totalNumber = activeParts.reduce((acc, curr) => acc + curr.value, 0);
  // Fix floating point issue (biar gak jadi 37.84400000002)
  const formattedTotal = parseFloat(totalNumber.toFixed(3)).toString();

  // 3. Tentukan Mana yang Hilang (Blank)
  // Random jumlah blank: 1 sampai 3 (tapi tidak boleh melebihi jumlah parts - 1)
  const maxBlanks = Math.min(3, activeParts.length - 1);
  const numBlanks = Math.floor(Math.random() * maxBlanks) + 1;

  // Pilih index secara acak untuk di-hide
  const indices = activeParts.map((_, i) => i);
  const shuffledIndices = indices.sort(() => 0.5 - Math.random());
  const hiddenIndices = shuffledIndices.slice(0, numBlanks);

  return {
    total: formattedTotal,
    parts: activeParts,
    hiddenIndices: hiddenIndices // Array index yang harus diisi user
  };
};

interface GameProps {
  userRole: "student" | "teacher";
  currentUser: any;
  classList?: any[];
  onComplete: () => void;
  onXpUpdate?: (amount: number) => void;
  data?: any; // Config opsional dari JSON
}

export default function GameFillBlankLayout({ userRole, currentUser, classList, onComplete, onXpUpdate }: GameProps) {
  // --- STATE ---
  const [problem, setProblem] = useState<any>(null);
  const [userInputs, setUserInputs] = useState<Record<number, string>>({});
  const [feedback, setFeedback] = useState<"idle" | "correct" | "wrong">("idle");
  
  // Identitas Player
  const [selectedStudentId, setSelectedStudentId] = useState("");
  const [studentNameDisplay, setStudentNameDisplay] = useState("");

  // Init
  useEffect(() => {
    if (!currentUser) return;
    if (userRole === "student") {
        setStudentNameDisplay(currentUser?.name || "Siswa");
        setSelectedStudentId(currentUser?.id || currentUser?.email);
    }
    handleNewProblem();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentUser?.email, userRole]);

  const handleNewProblem = () => {
    const newProb = generateEquation();
    setProblem(newProb);
    setUserInputs({});
    setFeedback("idle");
  };

  const handleInputChange = (index: number, val: string) => {
    setUserInputs(prev => ({ ...prev, [index]: val }));
  };

  const checkAnswer = async () => {
    if (!problem) return;

    let isAllCorrect = true;

    // Cek setiap input yang required
    problem.hiddenIndices.forEach((idx: number) => {
       const userVal = parseFloat(userInputs[idx]); // Ubah string user jadi float
       const correctVal = problem.parts[idx].value; // Nilai asli (float)

       // Bandingkan (gunakan epsilon kecil untuk toleransi float) atau toFixed
       if (isNaN(userVal) || Math.abs(userVal - correctVal) > 0.0001) {
           isAllCorrect = false;
       }
    });

    if (isAllCorrect) {
       setFeedback("correct");
       // Award XP logic
       if (onXpUpdate) onXpUpdate(10); // +10 XP karena susah
       
       // Kirim ke server (Opsional)
       try {
         await fetch('/api/xp/add', {
             method: 'POST',
             body: JSON.stringify({ 
                email: userRole === 'teacher' ? selectedStudentId : currentUser.email, 
                xp: 3, reason: "Game Isian Desimal" 
             })
         });
       } catch(e) { console.error(e); }

    } else {
       setFeedback("wrong");
       setTimeout(() => setFeedback("idle"), 2000);
    }
  };

  if (!problem) return <div className="p-10 text-center">Memuat Soal...</div>;

  return (
    <div className="fixed inset-0 bg-slate-50 flex flex-col font-sans overflow-hidden">
        
        {/* HEADER */}
        <div className="flex-none h-20 flex items-center justify-center relative z-20">
            <div className="absolute inset-0 bg-white/60 backdrop-blur-md border-b border-slate-200"></div>
             <div className="relative z-10">
                {userRole === 'teacher' ? (
                    <div className="flex items-center gap-2 bg-white border border-indigo-200 px-3 py-1.5 rounded-full shadow-sm">
                        <Users size={16} className="text-indigo-500" />
                        <select 
                            className="bg-transparent font-bold text-slate-700 outline-none text-sm cursor-pointer"
                            value={selectedStudentId}
                            onChange={(e) => {
                                setSelectedStudentId(e.target.value);
                                const s = classList?.find((u:any) => u.email === e.target.value);
                                setStudentNameDisplay(s ? s.name : "");
                            }}
                        >
                            <option value="">-- Pilih Siswa --</option>
                            {classList?.map((s: any) => (
                                <option key={s.id || s.email} value={s.email || s.id}>{s.name}</option>
                            ))}
                        </select>
                    </div>
                ) : (
                    <div className="flex items-center gap-2 bg-indigo-100 text-indigo-700 px-4 py-1.5 rounded-full font-bold shadow-sm">
                        <User size={16} /> {studentNameDisplay}
                    </div>
                )}
            </div>
        </div>

        {/* GAME AREA */}
        <div className="flex-1 flex flex-col items-center justify-center p-4 relative overflow-y-auto">
             <div className="absolute inset-0 bg-[radial-gradient(#e0e7ff_1px,transparent_1px)] [background-size:20px_20px] opacity-50 pointer-events-none"></div>

             {/* KARTU SOAL */}
             <div className="bg-white rounded-[2rem] shadow-2xl border-4 border-white p-6 md:p-10 w-full max-w-3xl flex flex-col items-center gap-8 relative z-10 animate-in zoom-in-95 duration-500">
                  
                  {/* Angka Target */}
                  <div className="text-center">
                      <p className="text-slate-400 font-bold uppercase tracking-widest text-xs md:text-sm mb-2">Uraikan Angka Ini</p>
                      <div className="text-5xl md:text-7xl font-black text-slate-800 tracking-tight">
                          {problem?.total}
                      </div>
                  </div>

                  {/* Persamaan */}
                  <div className="flex flex-wrap items-center justify-center gap-2 md:gap-4 bg-slate-50 p-4 md:p-8 rounded-3xl border border-slate-200 w-full min-h-[120px]">
                      
                      {problem?.parts.map((part: any, idx: number) => {
                          const isHidden = problem.hiddenIndices.includes(idx);
                          
                          return (
                              <React.Fragment key={idx}>
                                  {isHidden ? (
                                      <motion.div 
                                        initial={{ scale: 0.8 }} animate={{ scale: 1 }}
                                        className="relative"
                                      >
                                          <Input 
                                              type="number"
                                              placeholder="?"
                                              value={userInputs[idx] || ""}
                                              onChange={(e) => handleInputChange(idx, e.target.value)}
                                              className={`w-20 md:w-28 h-12 md:h-16 text-center text-lg md:text-2xl font-bold rounded-xl border-2 transition-all focus:ring-4 focus:ring-indigo-100 ${
                                                feedback === 'wrong' ? 'border-red-300 bg-red-50 animate-shake' : 'border-indigo-300 bg-white border-dashed shadow-sm'
                                              }`}
                                          />
                                      </motion.div>
                                  ) : (
                                      <span className="text-2xl md:text-4xl font-bold text-indigo-600 font-mono">
                                          {part.display}
                                      </span>
                                  )}

                                  {idx < problem.parts.length - 1 && (
                                      <span className="text-slate-300 font-black text-xl md:text-3xl">+</span>
                                  )}
                              </React.Fragment>
                          );
                      })}

                  </div>
             </div>
        </div>

        {/* --- FOOTER CONTROLS (UPDATED) --- */}
        <div className="flex-none p-4 md:p-6 bg-white border-t border-slate-100 z-30 shadow-[0_-10px_40px_rgba(0,0,0,0.03)]">
            <div className="max-w-lg mx-auto flex items-center gap-3 md:gap-4">
                 
                 {/* Tombol Refresh: Kotak, fix width, tidak shrink */}
                 <Button 
                    onClick={handleNewProblem}
                    className="h-12 w-12 md:h-14 md:w-14 shrink-0 rounded-xl bg-slate-100 text-slate-500 hover:bg-slate-200 border border-slate-200 transition-colors"
                    title="Soal Baru"
                 >
                     <RefreshCcw size={20} className="md:w-6 md:h-6" />
                 </Button>

                 {/* Tombol Action: Flex-1 agar mengisi sisa ruang, dengan efek 3D */}
                 <Button 
                    onClick={checkAnswer}
                    disabled={userRole === 'teacher' && !selectedStudentId}
                    className={`flex-1 h-12 md:h-14 text-base md:text-lg font-black rounded-xl shadow-[0_4px_0_0_rgba(0,0,0,0.1)] active:shadow-none active:translate-y-1 transition-all ${
                        feedback === 'wrong' 
                            ? 'bg-red-500 hover:bg-red-600 text-white shadow-red-700/20' 
                            : 'bg-indigo-600 hover:bg-indigo-700 text-white shadow-indigo-700/20'
                    }`}
                 >
                    {feedback === 'wrong' ? 'Coba Lagi' : 'Periksa Jawaban'} 
                    <Send className="ml-2 w-4 h-4 md:w-5 md:h-5" strokeWidth={3}/>
                 </Button>
            </div>
            
             {userRole === 'teacher' && !selectedStudentId && (
                <p className="text-center text-red-400 text-xs font-bold mt-2 animate-pulse">
                    ⚠️ Pilih nama siswa terlebih dahulu!
                </p>
             )}
        </div>

        {/* MODAL SUKSES (TETAP SAMA) */}
        <AnimatePresence>
            {feedback === 'correct' && (
                <div className="absolute inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4">
                    <motion.div 
                        initial={{ scale: 0.8, opacity: 0 }} animate={{ scale: 1, opacity: 1 }}
                        className="bg-white rounded-[2.5rem] p-8 text-center max-w-sm w-full shadow-2xl relative overflow-hidden"
                    >
                         <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/confetti.png')] opacity-20 pointer-events-none"></div>
                         
                         <div className="w-24 h-24 bg-green-100 text-green-600 rounded-full flex items-center justify-center mx-auto mb-6 animate-bounce">
                             <Trophy size={48} fill="currentColor" />
                         </div>

                         <h2 className="text-3xl font-black text-slate-800 mb-2">BENAR!</h2>
                         <p className="text-slate-500 font-medium mb-8">
                             Susunan angkanya sudah tepat sesuai nilai tempatnya.
                         </p>

                         <div className="flex gap-3">
                             <Button onClick={handleNewProblem} className="flex-1 h-12 bg-indigo-600 hover:bg-indigo-700 rounded-xl font-bold shadow-lg shadow-indigo-200">
                                 Soal Baru
                             </Button>
                             <Button onClick={onComplete} variant="outline" className="flex-1 h-12 rounded-xl font-bold border-slate-200 hover:bg-slate-50">
                                 Selesai
                             </Button>
                         </div>
                    </motion.div>
                </div>
            )}
        </AnimatePresence>

    </div>
  );
}