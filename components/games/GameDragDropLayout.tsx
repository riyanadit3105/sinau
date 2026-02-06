"use client"
import React, { useState, useEffect } from "react";
import {
  DndContext, DragOverlay, useSensor, useSensors, MouseSensor, TouchSensor, useDraggable, useDroppable, DragEndEvent,
} from "@dnd-kit/core";
import { motion, AnimatePresence } from "framer-motion";
import { RefreshCcw, Send, Trash2, Users, User, Check, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { GAME_OBJECTS } from "@/data/assets"; // 1. IMPORT ASET GAMBAR

// --- TIPE ---
type ItemKey = keyof typeof GAME_OBJECTS;

interface GameItem {
  id: string;
  type: ItemKey;
}

interface GameProps {
  data : any;
  userRole: "student" | "teacher";
  currentUser: any;
  classList?: any[];
  onComplete: () => void;
  onXpUpdate?: (amount: number) => void;
}

// --- KOMPONEN KECIL: BENDA (DRAGGABLE) ---
function DraggableItem({ item, id, isOverlay = false }: { item: GameItem, id: string, isOverlay?: boolean }) {
  const { attributes, listeners, setNodeRef, isDragging } = useDraggable({ id: id, data: item });
  const imgSrc = GAME_OBJECTS[item.type];
  
  return (
    <div 
      ref={setNodeRef} 
      {...listeners} 
      {...attributes}
      style={{ 
        opacity: isDragging && !isOverlay ? 0 : 1, // Hilang saat ditarik (biar overlay yg kelihatan)
        touchAction: 'none' 
      }}
      className={`
        w-16 h-16 md:w-20 md:h-20 bg-white rounded-2xl flex items-center justify-center 
        shadow-sm border border-slate-200 cursor-grab active:cursor-grabbing select-none
        transition-transform ${isOverlay ? 'scale-110 shadow-xl z-[999] rotate-6' : 'hover:scale-105'}
      `}
    >
        {/* Render Gambar Aset */}
        <img src={imgSrc} alt={item.type} className="w-12 h-12 md:w-14 md:h-14 object-contain pointer-events-none" />
    </div>
  );
}

// --- KOMPONEN KECIL: KERANJANG (DROPPABLE) ---
function DroppableBasket({ children }: { children: React.ReactNode }) {
    const { isOver, setNodeRef } = useDroppable({ id: 'basket-zone' });
    return (
      <div 
        ref={setNodeRef} 
        className={`
            relative w-full max-w-lg h-56 md:h-64 rounded-[2.5rem] border-[6px] transition-all 
            flex flex-wrap content-start items-center justify-center gap-2 p-6 overflow-hidden
            ${isOver 
                ? 'border-green-400 bg-green-50 shadow-[0_0_30px_rgba(74,222,128,0.4)] scale-105' 
                : 'border-amber-700/30 bg-[#fdf6e3] shadow-inner'
            }
        `}
      >
        {/* Tekstur Keranjang */}
        <div className="absolute inset-0 opacity-10 bg-[url('https://www.transparenttextures.com/patterns/washi.png')] pointer-events-none" />
        
        {/* Label Keranjang */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 bg-amber-700/20 px-4 py-1 rounded-b-xl text-amber-800 font-bold text-xs uppercase tracking-widest pointer-events-none">
            Keranjang
        </div>

        {children}
        
        {React.Children.count(children) === 0 && !isOver && (
             <div className="absolute inset-0 flex items-center justify-center pointer-events-none opacity-40">
                <p className="text-amber-800 font-black text-xl border-2 border-dashed border-amber-800/30 px-4 py-2 rounded-xl">
                   TARUH SINI
                </p>
             </div>
        )}
      </div>
    );
}

// --- KOMPONEN UTAMA ---
export default function GameDragDropLayout({ data, userRole, currentUser, classList, onComplete, onXpUpdate }: GameProps) {
  // State
  const [targetQty, setTargetQty] = useState(5);
  const [targetType, setTargetType] = useState<ItemKey>('apple');
  const [sourceItems, setSourceItems] = useState<GameItem[]>([]);
  const [basketItems, setBasketItems] = useState<GameItem[]>([]);
  const [activeDragItem, setActiveDragItem] = useState<GameItem | null>(null);
  const [feedback, setFeedback] = useState<"idle" | "correct" | "wrong">("idle");

  // Identitas
  const [selectedStudentId, setSelectedStudentId] = useState("");
  const [studentNameDisplay, setStudentNameDisplay] = useState("");

  const sensors = useSensors(
      useSensor(MouseSensor, { activationConstraint: { distance: 10 } }), 
      useSensor(TouchSensor, { activationConstraint: { delay: 100, tolerance: 5 } })
  );

  // --- INIT ---
  useEffect(() => {
    if (!currentUser) return; 
    if (userRole === "student") {
        setStudentNameDisplay(currentUser?.name || "Siswa");
        setSelectedStudentId(currentUser?.id || currentUser?.email);
    }
    generateProblem();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentUser?.email, userRole]);

  // --- LOGIC: BUAT SOAL ---
  const generateProblem = () => {
    setFeedback("idle");
    setBasketItems([]);
    
    // 1. Tentukan Soal (3-6 item)
    const newQty = Math.floor(Math.random() * 4) + 3;
    setTargetQty(newQty);
    
    // 2. Pilih Tipe Target
    const keys = Object.keys(GAME_OBJECTS) as ItemKey[];
    const newType = keys[Math.floor(Math.random() * keys.length)];
    setTargetType(newType);

    // 3. Buat Kolam Item (Jawaban Benar + Pengecoh)
    let newPool: GameItem[] = [];
    
    // Tambah Jawaban Benar
    for (let i = 0; i < newQty; i++) newPool.push({ id: `correct-${i}`, type: newType });
    
    // Tambah Pengecoh (Distractors)
    for (let i = 0; i < 6; i++) {
        let randomType = keys[Math.floor(Math.random() * keys.length)];
        // Pastikan pengecoh beda jenis (opsional, tapi lebih bagus)
        while(randomType === newType) {
             randomType = keys[Math.floor(Math.random() * keys.length)];
        }
        newPool.push({ id: `distractor-${i}`, type: randomType });
    }
    
    setSourceItems(newPool.sort(() => Math.random() - 0.5));
  };

  // --- LOGIC: SAVE & CEK ---
  const checkAnswer = async () => {
    // Hitung jumlah item TIPE TARGET di keranjang
    const correctCount = basketItems.filter(item => item.type === targetType).length;
    
    if (correctCount === targetQty) {
      setFeedback("correct");
      await awardXP();

    } else {
      setFeedback("wrong");
      setTimeout(() => setFeedback("idle"), 2000);
    }
  };

  const awardXP = async () => {
     const targetEmail = userRole === 'teacher' ? selectedStudentId : currentUser.email;
     

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
     }
  }

  // --- LOGIC DND ---
  const handleDragStart = (e: any) => setActiveDragItem(e.active.data.current);
  
  const handleDragEnd = (e: DragEndEvent) => {
    const { active, over } = e;
    setActiveDragItem(null);

    // Kalau tidak di-drop di keranjang, batalkan
    if (!over || over.id !== 'basket-zone') return;

    const itemData = active.data.current as GameItem;
    if(!itemData) return;

    // Pindahkan dari Source -> Basket
    setSourceItems((prev) => prev.filter((i) => i.id !== itemData.id));
    setBasketItems((prev) => [...prev, itemData]);
  };

  const resetBasket = () => {
      setSourceItems(prev => [...prev, ...basketItems]);
      setBasketItems([]);
  }

  return (
    <DndContext sensors={sensors} onDragStart={handleDragStart} onDragEnd={handleDragEnd}>
    {/* Gunakan Fixed Layout agar tidak scroll tumpang tindih */}
    <div className="fixed inset-0 flex flex-col bg-slate-50 font-sans">
        
        {/* --- 1. HEADER (ABS) --- */}
        <div className="h-20 flex-none relative z-50 flex items-center justify-center">
             {/* Background Header Blur */}
             <div className="absolute inset-0 bg-white/80 backdrop-blur-sm border-b border-slate-200" />
             
             {/* Identitas Pemain */}
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

        {/* --- 2. GAME AREA (FLEX GROW) --- */}
        <div className="flex-1 relative flex flex-col overflow-hidden">
            
            {/* Background */}
            <div className="absolute inset-0 -z-10 bg-gradient-to-b from-sky-100 to-green-50" />

            {/* Soal */}
            <div className="flex-none pt-4 pb-2 text-center z-10 px-4">
                <div className="inline-flex items-center justify-center gap-3 bg-white px-6 py-3 rounded-2xl shadow-lg border-2 border-white/50 backdrop-blur">
                    <span className="text-slate-500 font-bold">Masukkan</span>
                    <span className="text-4xl font-black text-indigo-600">{targetQty}</span>
                    <img src={GAME_OBJECTS[targetType]} alt="target" className="w-10 h-10 object-contain drop-shadow-md" />
                </div>
            </div>

            {/* Area Sumber Barang (Atas) */}
            <div className="flex-1 flex items-center justify-center p-4 min-h-0">
                <div className="flex flex-wrap justify-center gap-3 max-w-3xl">
                    <AnimatePresence>
                    {sourceItems.map((item) => (
                        <motion.div key={item.id} layout initial={{scale:0}} animate={{scale:1}} exit={{scale:0}}>
                            <DraggableItem id={item.id} item={item} />
                        </motion.div>
                    ))}
                    </AnimatePresence>
                </div>
            </div>

            {/* Area Keranjang (Bawah) */}
            <div className="flex-none h-64 md:h-72 w-full flex justify-center pb-4 relative z-0">
                <DroppableBasket>
                    <AnimatePresence>
                    {basketItems.map((item) => (
                        <motion.div key={item.id} layoutId={item.id} initial={{scale:0.5, opacity:0}} animate={{scale:1, opacity:1}}>
                            <div className="w-14 h-14 bg-white rounded-xl flex items-center justify-center shadow-sm border border-slate-100">
                                <img src={GAME_OBJECTS[item.type]} alt="" className="w-10 h-10 object-contain"/>
                            </div>
                        </motion.div>
                    ))}
                    </AnimatePresence>
                </DroppableBasket>

                {/* Tombol Reset Kecil */}
                {basketItems.length > 0 && (
                    <button onClick={resetBasket} className="absolute right-6 top-0 bg-white p-2 rounded-full text-red-500 shadow-md border border-slate-100 hover:bg-red-50">
                        <Trash2 size={20} />
                    </button>
                )}
            </div>

        </div>

        {/* --- 3. FOOTER CONTROL (FIXED) --- */}
        <div className="flex-none p-4 bg-white border-t border-slate-200 z-50 shadow-[0_-10px_40px_rgba(0,0,0,0.05)]">
            <div className="max-w-md mx-auto relative">
                
                {/* Tombol Kirim */}
                <Button 
                    onClick={checkAnswer} 
                    disabled={basketItems.length === 0 || (userRole === 'teacher' && !selectedStudentId)}
                    className={`w-full h-14 text-xl rounded-xl font-black transition-all active:scale-95 shadow-md
                        ${feedback === 'wrong' ? 'bg-red-500 hover:bg-red-600 animate-shake' : 'bg-indigo-600 hover:bg-indigo-700'}
                    `}
                >
                    {feedback === 'wrong' ? 'Coba Lagi' : 'Kirim Jawaban'} <Send size={20} className="ml-2" />
                </Button>

                {/* Peringatan Guru */}
                {userRole === 'teacher' && !selectedStudentId && (
                    <p className="text-center text-red-500 text-xs font-bold mt-2 animate-pulse">
                        *Pilih nama siswa dulu di atas
                    </p>
                )}
            </div>
        </div>

        {/* --- OVERLAY & MODALS --- */}
        
        {/* 1. Drag Overlay (Benda Melayang) */}
        <DragOverlay>
            {activeDragItem ? <DraggableItem id="overlay" item={activeDragItem} isOverlay /> : null}
        </DragOverlay>

        {/* 2. Modal Sukses */}
        <AnimatePresence>
            {feedback === 'correct' && (
                <div className="absolute inset-0 z-[100] flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
                    <motion.div 
                        initial={{ scale: 0.5, opacity: 0 }} 
                        animate={{ scale: 1, opacity: 1 }} 
                        className="bg-white rounded-[2rem] p-8 text-center max-w-sm w-full shadow-2xl relative overflow-hidden"
                    >
                        {/* Confetti Effect Background */}
                        <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/confetti.png')] opacity-20" />
                        
                        <div className="relative z-10">
                            <motion.div animate={{ rotate: [0, 10, -10, 0] }} transition={{ repeat: Infinity, duration: 1 }}>
                                <img src={GAME_OBJECTS[targetType]} alt="icon" className="w-24 h-24 mx-auto drop-shadow-xl mb-4" />
                            </motion.div>
                            
                            <h2 className="text-3xl font-black text-slate-800 mb-1">LUAR BIASA!</h2>
                            <p className="text-slate-500 font-medium mb-6">Kamu berhasil mengumpulkan {targetQty} benda.</p>
                            
                            <div className="flex gap-3">
                                {/* TOMBOL MAIN LAGI */}
                                <Button 
                                    onClick={generateProblem} 
                                    className="flex-1 h-12 bg-indigo-600 hover:bg-indigo-700 rounded-xl font-bold"
                                >
                                    Main Lagi <RefreshCcw size={18} className="ml-2"/>
                                </Button>
                                
                                {/* TOMBOL SELESAI (Hanya Student, atau Guru jika mau close slide) */}
                                <Button 
                                    onClick={onComplete} 
                                    variant="outline" 
                                    className="flex-1 h-12 border-slate-300 text-slate-600 hover:bg-slate-50 rounded-xl font-bold"
                                >
                                    Selesai
                                </Button>
                            </div>
                        </div>
                    </motion.div>
                </div>
            )}
        </AnimatePresence>

    </div>
    </DndContext>
  )
}