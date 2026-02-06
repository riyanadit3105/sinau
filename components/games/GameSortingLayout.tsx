"use client"
import React, { useState, useEffect } from "react";
import {
  DndContext, 
  closestCenter,
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors,
  DragOverlay
} from "@dnd-kit/core";
import {
  arrayMove,
  SortableContext,
  sortableKeyboardCoordinates,
  verticalListSortingStrategy,
  useSortable
} from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { motion, AnimatePresence } from "framer-motion";
import { Flag, Trophy, Timer, RefreshCcw, GripVertical, User, Users } from "lucide-react"; // Tambah User & Users
import { Button } from "@/components/ui/button";

// --- DATA DUMMY ---
const DRIVERS = [
  { id: "d1", name: "Hamilton", teamColor: "bg-teal-500" },
  { id: "d2", name: "Verstappen", teamColor: "bg-blue-600" },
  { id: "d3", name: "Leclerc", teamColor: "bg-red-600" },
  { id: "d4", name: "Norris", teamColor: "bg-orange-500" },
];

const generateRaceData = () => {
    const base = 45 + Math.floor(Math.random() * 10); 
    let times = [];
    for(let i=0; i<4; i++) {
        const dec = Math.floor(Math.random() * 999) + 1;
        const timeStr = `${base}.${dec.toString().padStart(3, '0')}`;
        times.push(parseFloat(timeStr));
    }
    times = [...new Set(times)];
    while(times.length < 4) times.push(times[0] + 0.001);

    const items = DRIVERS.map((driver, i) => ({
        ...driver,
        time: times[i],
        displayTime: times[i].toFixed(3) + " s"
    }));

    return items.sort(() => Math.random() - 0.5);
};

// --- KOMPONEN ITEM SORTABLE ---
function SortableItem(props: any) {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging
  } = useSortable({ id: props.id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    zIndex: isDragging ? 999 : 1,
    position: "relative" as const,
  };

  return (
    <div ref={setNodeRef} style={style} {...attributes} {...listeners} className="touch-none mb-3">
        <div className={`bg-white rounded-2xl p-4 flex items-center gap-4 shadow-sm border border-slate-200 ${isDragging ? 'shadow-2xl scale-105 ring-2 ring-indigo-500 opacity-90' : 'hover:border-indigo-300'}`}>
            <div className="text-slate-300 cursor-grab active:cursor-grabbing">
                <GripVertical size={20} />
            </div>
            <div className={`w-10 h-10 ${props.teamColor} rounded-full flex items-center justify-center text-white font-bold shadow-md`}>
                {props.name.charAt(0)}
            </div>
            <div className="flex-1">
                <h4 className="font-bold text-slate-700">{props.name}</h4>
                <div className="flex items-center gap-1 text-xs font-bold text-slate-400 uppercase tracking-wider">
                    <Timer size={12} /> Lap Time
                </div>
            </div>
            <div className="bg-slate-100 px-4 py-2 rounded-xl font-mono font-black text-xl md:text-2xl text-slate-800 tracking-wider">
                {props.displayTime}
            </div>
        </div>
    </div>
  );
}

// --- MAIN LAYOUT ---
export default function GameSortingLayout({ userRole, currentUser, classList, onComplete, onXpUpdate }: any) {
  const [items, setItems] = useState<any[]>([]);
  const [feedback, setFeedback] = useState<"idle" | "correct" | "wrong">("idle");
  const [activeId, setActiveId] = useState(null);

  // Identitas Player
  const [selectedStudentId, setSelectedStudentId] = useState("");
  const [studentNameDisplay, setStudentNameDisplay] = useState("");
  
  // Init
  useEffect(() => {
     if (currentUser) {
        if (userRole === "student") {
            setStudentNameDisplay(currentUser?.name || "Siswa");
            setSelectedStudentId(currentUser?.id || currentUser?.email);
        }
     }
     handleNewRace();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentUser?.email, userRole]);

  const handleNewRace = () => {
      setItems(generateRaceData());
      setFeedback("idle");
  };

  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor, { coordinateGetter: sortableKeyboardCoordinates })
  );

  const handleDragStart = (event: any) => setActiveId(event.active.id);

  const handleDragEnd = (event: any) => {
    const { active, over } = event;
    if (active.id !== over.id) {
      setItems((items) => {
        const oldIndex = items.findIndex(i => i.id === active.id);
        const newIndex = items.findIndex(i => i.id === over.id);
        return arrayMove(items, oldIndex, newIndex);
      });
    }
    setActiveId(null);
  };

  const checkAnswer = async () => {
      // Logic: Item harus urut dari WAKTU TERKECIL (Tercepat) ke TERBESAR
      const sortedByTime = [...items].sort((a, b) => a.time - b.time);
      const isCorrect = items.every((item, index) => item.id === sortedByTime[index].id);

      if (isCorrect) {
          setFeedback("correct");
          if(onXpUpdate) onXpUpdate(10);

          // Simpan XP ke Server
          try {
             await fetch('/api/xp/add', {
                 method: 'POST',
                 body: JSON.stringify({ 
                    email: userRole === 'teacher' ? selectedStudentId : currentUser.email, 
                    xp: 10, reason: "Game Balap F1" 
                 })
             });
           } catch(e) { console.error(e); }

      } else {
          setFeedback("wrong");
          setTimeout(() => setFeedback("idle"), 2000);
      }
  };

  return (
    <div className="fixed inset-0 bg-slate-50 flex flex-col font-sans overflow-hidden">
        
        {/* HEADER */}
        <div className="flex-none h-20 flex items-center justify-between px-4 relative z-20 bg-white/80 backdrop-blur-md border-b border-slate-200">
             
             {/* Judul Game */}
             <div className="flex items-center gap-2 text-indigo-700 font-black text-lg md:text-xl uppercase tracking-widest">
                <Flag className="text-red-500" fill="currentColor"/> 
                <span className="hidden md:inline">Grand Prix Desimal</span>
                <span className="md:hidden">F1 Desimal</span>
             </div>

             {/* Identitas Player (SAMA SEPERTI GAME LAIN) */}
             <div>
                {userRole === 'teacher' ? (
                    <div className="flex items-center gap-2 bg-white border border-indigo-200 px-3 py-1.5 rounded-full shadow-sm">
                        <Users size={16} className="text-indigo-500" />
                        <select 
                            className="bg-transparent font-bold text-slate-700 outline-none text-sm cursor-pointer max-w-[120px] md:max-w-none"
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
                    <div className="flex items-center gap-2 bg-indigo-100 text-indigo-700 px-4 py-1.5 rounded-full font-bold shadow-sm text-sm">
                        <User size={16} /> {studentNameDisplay}
                    </div>
                )}
            </div>
        </div>

        {/* GAME AREA */}
        <div className="flex-1 overflow-y-auto p-4 flex flex-col items-center">
            
            <div className="w-full max-w-md mt-4 mb-8 text-center space-y-2">
                <h2 className="text-lg font-bold text-slate-600">Urutkan Juara Balapan!</h2>
                <p className="text-sm text-slate-400">
                    Geser pembalap dengan waktu <b>tercepat (angka terkecil)</b> ke posisi paling atas.
                </p>
            </div>

            <div className="w-full max-w-lg relative pb-20">
                 {/* Podium Numbers */}
                 <div className="absolute -left-8 top-4 flex flex-col gap-[76px] text-slate-300 font-black text-2xl italic opacity-50 select-none">
                    <span>1st</span>
                    <span>2nd</span>
                    <span>3rd</span>
                    <span>4th</span>
                 </div>

                 <DndContext 
                    sensors={sensors} 
                    collisionDetection={closestCenter} 
                    onDragStart={handleDragStart} 
                    onDragEnd={handleDragEnd}
                 >
                    <SortableContext items={items} strategy={verticalListSortingStrategy}>
                        {items.map((item) => <SortableItem key={item.id} id={item.id} {...item} />)}
                    </SortableContext>
                    
                    <DragOverlay>
                        {activeId ? (
                            <div className="bg-white rounded-2xl p-4 flex items-center gap-4 shadow-2xl scale-105 ring-2 ring-indigo-500 cursor-grabbing opacity-90">
                                <div className="w-10 h-10 bg-slate-200 rounded-full"></div>
                                <div className="flex-1 h-4 bg-slate-100 rounded"></div>
                                <div className="w-20 h-8 bg-slate-100 rounded"></div>
                            </div>
                        ) : null}
                    </DragOverlay>
                 </DndContext>
            </div>

        </div>

        {/* FOOTER */}
        <div className="flex-none p-4 md:p-6 bg-white border-t border-slate-100 z-30 shadow-[0_-10px_40px_rgba(0,0,0,0.03)]">
            <div className="max-w-lg mx-auto flex items-center gap-3">
                 <Button 
                    onClick={handleNewRace} 
                    className="h-12 w-12 md:h-14 md:w-14 shrink-0 rounded-xl bg-slate-100 text-slate-500 hover:bg-slate-200 border border-slate-200 transition-colors"
                 >
                     <RefreshCcw size={20} className="md:w-6 md:h-6" />
                 </Button>
                 
                 <Button 
                    onClick={checkAnswer}
                    disabled={userRole === 'teacher' && !selectedStudentId}
                    className={`flex-1 h-12 md:h-14 text-base md:text-lg font-black rounded-xl shadow-[0_4px_0_0_rgba(0,0,0,0.1)] active:shadow-none active:translate-y-1 transition-all ${
                        feedback === 'wrong' 
                            ? 'bg-red-500 hover:bg-red-600 text-white shadow-red-700/20' 
                            : 'bg-indigo-600 hover:bg-indigo-700 text-white shadow-indigo-700/20'
                    }`}
                 >
                    {feedback === 'wrong' ? 'Masih Salah...' : 'Cek Urutan'} <Flag className="ml-2 w-4 h-4 md:w-5 md:h-5"/>
                 </Button>
            </div>
            {userRole === 'teacher' && !selectedStudentId && (
                <p className="text-center text-red-400 text-xs font-bold mt-2 animate-pulse">
                    ⚠️ Pilih nama siswa terlebih dahulu!
                </p>
             )}
        </div>

        {/* MODAL SUCCESS */}
        <AnimatePresence>
            {feedback === 'correct' && (
                <div className="absolute inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4">
                     <motion.div initial={{scale:0.8}} animate={{scale:1}} className="bg-white rounded-[2.5rem] p-8 text-center max-w-sm w-full relative overflow-hidden shadow-2xl">
                          <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/confetti.png')] opacity-20 pointer-events-none"></div>
                          <div className="w-24 h-24 bg-yellow-100 text-yellow-600 rounded-full flex items-center justify-center mx-auto mb-6 animate-bounce">
                             <Trophy size={48} fill="currentColor"/>
                          </div>
                          <h2 className="text-3xl font-black text-slate-800 mb-2">JUARA!</h2>
                          <p className="text-slate-500 font-medium mb-6">Urutan waktumu tepat sekali.</p>
                          <div className="flex gap-3">
                              <Button onClick={handleNewRace} className="flex-1 h-12 bg-indigo-600 hover:bg-indigo-700 rounded-xl font-bold">Balap Lagi</Button>
                              <Button onClick={onComplete} variant="outline" className="flex-1 h-12 rounded-xl font-bold border-slate-200">Selesai</Button>
                          </div>
                     </motion.div>
                </div>
            )}
        </AnimatePresence>
    </div>
  );
}