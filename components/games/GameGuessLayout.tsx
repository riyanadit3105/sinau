"use client"
import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { RefreshCcw, User, Send, Users, Star, Trophy } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { GAME_OBJECTS } from "@/data/assets"

interface GameProps {
  data: any;
  userRole: "student" | "teacher";
  currentUser: any;
  classList?: any[];
  onComplete: () => void;
  onXpUpdate?: (amount: number) => void;
}

export default function GameGuessLayout({ data, userRole, currentUser, classList, onComplete, onXpUpdate }: GameProps) {
  // --- STATE ---
  const [targetNumber, setTargetNumber] = useState(3);
  const [currentIcon, setCurrentIcon] = useState("apple");
  
  const [selectedStudentId, setSelectedStudentId] = useState("");
  const [studentNameDisplay, setStudentNameDisplay] = useState("");
  
  const [userAnswer, setUserAnswer] = useState("");
  const [feedback, setFeedback] = useState<"idle" | "correct" | "wrong">("idle");
  const [isSaving, setIsSaving] = useState(false);

  // --- INIT ---
useEffect(() => {
    if (!currentUser) return; 
    if (userRole === "student") {
        setStudentNameDisplay(currentUser?.name || "Siswa");
        setSelectedStudentId(currentUser?.id || currentUser?.email);
    } else {
        setStudentNameDisplay("");
    }
    
    // Panggil generate soal awal
    generateProblem();

    // 👇 PERBAIKAN DISINI:
    // Jangan pakai [currentUser], tapi pakai [currentUser.email]
    // Supaya kalau XP nambah, dia GAK refresh soal.
  }, [currentUser?.email, userRole]);

  // --- LOGIC ---
  const generateProblem = () => {
    const newNum = Math.floor(Math.random() * 10) + 1;
    setTargetNumber(newNum);
    const keys = Object.keys(GAME_OBJECTS);
    const randomKey = keys[Math.floor(Math.random() * keys.length)];
    setCurrentIcon(randomKey);
    setUserAnswer("");
    setFeedback("idle");
  };

  const awardXP = async () => {
     setIsSaving(true);
     const targetEmail = userRole === 'teacher' ? selectedStudentId : currentUser.email;
     
     if (!targetEmail) { setIsSaving(false); return; }

     try {
         // 1. Kirim ke Database (Server)
         await fetch('/api/xp/add', {
             method: 'POST',
             body: JSON.stringify({ email: targetEmail, xp: 2, reason: "Game Tebak Jumlah" })
         });

         // 👇 TAMBAHAN 3: Update Visual di Dashboard (Client)
         // "Halo Dashboard, tolong tambah 10 poin di layar sekarang juga"
         if (onXpUpdate) {
             onXpUpdate(2);
         }

     } catch (e) { 
         console.error("Gagal simpan XP", e); 
     } finally { 
         setIsSaving(false); 
     }
  }

  const checkAnswer = async () => {
    const numAns = parseInt(userAnswer);
    if (!numAns) return;

    if (numAns === targetNumber) {
      setFeedback("correct");
      await awardXP();
    } else {
      setFeedback("wrong");
      setTimeout(() => setFeedback("idle"), 1000);
    }
  };

  const handleStudentChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
      const id = e.target.value;
      setSelectedStudentId(id);
      
      // Cari nama siswa dari ID
      const student = classList?.find((s:any) => s.email === id || s.id === id);
      setStudentNameDisplay(student ? student.name : "");

  }

  return (
    <div className="w-full h-full flex flex-col items-center justify-center p-4 relative font-sans overflow-hidden bg-slate-50">
        
        {/* --- 1. BACKGROUND PROFESIONAL --- */}
        {/* Pola grid halus khas SaaS + Aksen bulat blur */}
        <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-30" />
        <div className="absolute top-[-10%] right-[-5%] w-96 h-96 bg-indigo-200/40 rounded-full blur-3xl" />
        <div className="absolute bottom-[-10%] left-[-5%] w-80 h-80 bg-blue-200/40 rounded-full blur-3xl" />

        {/* --- 2. HEADER: IDENTITAS PEMAIN --- */}
        <div className="absolute top-6 left-1/2 -translate-x-1/2 w-[90%] max-w-md z-20">
            {userRole === 'teacher' ? (
                // MODE GURU: Dropdown Bersih
                <div className="bg-white/80 backdrop-blur border border-indigo-100 rounded-full shadow-sm flex items-center px-4 py-2 gap-3">
                    <div className="bg-indigo-100 p-1.5 rounded-full text-indigo-600"><Users size={18} /></div>
                    <select 
                        className="w-full bg-transparent border-none font-bold text-slate-700 focus:ring-0 cursor-pointer outline-none text-sm md:text-base"
                        value={selectedStudentId}
                        onChange={handleStudentChange}
                    >
                        <option value="">-- Pilih Siswa --</option>
                        {classList?.map((s: any) => (
                            <option key={s.id || s.email} value={s.email || s.id}>{s.name}</option>
                        ))}
                    </select>
                </div>
            ) : (
                // MODE SISWA: Pill Elegan
                <div className="flex items-center justify-center gap-2 bg-indigo-600 text-white px-6 py-2 rounded-full shadow-lg shadow-indigo-200">
                    <User size={18} />
                    <span className="font-bold tracking-wide">{studentNameDisplay}</span>
                </div>
            )}
        </div>

        {/* --- 3. ARENA GAME (Clean Card) --- */}
        <div className="flex-1 flex items-center justify-center w-full mt-12 mb-6">
            <div className="relative bg-white rounded-[2.5rem] p-8 md:p-12 shadow-2xl shadow-slate-200/50 w-full max-w-3xl min-h-[380px] flex items-center justify-center border border-slate-400">
                
                {/* Tombol Refresh Elegan */}
                <button 
                  onClick={generateProblem} 
                  className="absolute top-6 right-6 text-slate-300 hover:text-indigo-600 hover:bg-indigo-50 p-2 rounded-full transition-all"
                  title="Ganti Soal"
                >
                    <RefreshCcw size={20} />
                </button>

                {/* GRID VISUAL */}
                <div className="flex flex-wrap justify-center gap-6">
                    {Array.from({ length: targetNumber }).map((_, i) => (
                        <motion.div
                          key={i} 
                          initial={{ scale: 0 }} 
                          animate={{ scale: 1 }} 
                          transition={{ delay: i * 0.1, type: "spring", bounce: 0.5 }}
                          className="w-20 h-20 md:w-24 md:h-24 bg-slate-50 rounded-2xl flex items-center justify-center border border-slate-100 hover:shadow-md transition-shadow"
                        >
                            <img src={GAME_OBJECTS[currentIcon]} alt="icon" className="w-14 h-14 md:w-16 md:h-16 object-contain drop-shadow-sm" />
                        </motion.div>
                    ))}
                </div>

                {/* OVERLAY FEEDBACK (Clean & Professional) */}
                <AnimatePresence>
                    {feedback === 'correct' && (
                        <motion.div 
                          initial={{ opacity: 0, y: 20 }} 
                          animate={{ opacity: 1, y: 0 }} 
                          exit={{ opacity: 0, y: -20 }}
                          className="absolute inset-0 z-40 bg-white/95 backdrop-blur rounded-[2.5rem] flex flex-col items-center justify-center text-center p-6"
                        >
                           <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mb-4 animate-bounce">
                               <Trophy className="text-green-600" size={40} />
                           </div>
                           <h2 className="text-3xl font-black text-slate-800 mb-1">Luar Biasa!</h2>
                           <p className="text-slate-500 font-medium mb-8">Jawaban kamu benar, +2 XP berhasil didapat.</p>
                           
                           <div className="flex gap-3 w-full max-w-xs">
                               <Button onClick={generateProblem} className="flex-1 bg-indigo-600 hover:bg-indigo-700 text-white h-12 rounded-xl font-bold">
                                  Lanjut <RefreshCcw size={16} className="ml-2"/>
                               </Button>
                               <Button onClick={onComplete} variant="outline" className="flex-1 border-slate-200 text-slate-600 h-12 rounded-xl font-bold">
                                       Selesai
                               </Button>
                           </div>
                        </motion.div>
                    )}
                </AnimatePresence>
            </div>
        </div>

        {/* --- 4. CONTROLLER (Input & Button) --- */}
        <div className="w-full max-w-xl mx-auto pb-10 z-20">

            <div className="bg-white p-4 rounded-[2rem] shadow-[0_20px_60px_rgba(124,58,237,0.3)] flex items-center gap-4">

                <Input

                   type="number" placeholder="?"

                   value={userAnswer} onChange={(e) => setUserAnswer(e.target.value)} onKeyDown={(e) => e.key === 'Enter' && checkAnswer()}

                   disabled={userRole === 'teacher' && !selectedStudentId} // Disable jika guru belum pilih siswa

                   className="text-center text-4xl font-black h-16 rounded-xl border-2 border-slate--200 bg-slate-50 flex-1"

                />

                <Button 
                    onClick={checkAnswer} 
                    disabled={userRole === 'teacher' && !selectedStudentId} 
                    className={`h-16 w-20 rounded-xl transition-all shadow-md active:shadow-none active:translate-y-1 
                        ${feedback === 'wrong' 
                            ? 'bg-red-500 hover:bg-red-600' 
                            : 'bg-indigo-600 hover:bg-indigo-700'
                        }`}
                >
                    <Send size={28} />
                </Button>

            </div>

            {userRole === 'teacher' && !selectedStudentId && (

                <p className="text-center text-red-500 font-bold mt-2 animate-bounce">👆 Pilih siswa dulu di atas!</p>

            )}

        </div>



    </div>
  )
}