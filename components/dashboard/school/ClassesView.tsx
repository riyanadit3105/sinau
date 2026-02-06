import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Plus, Trash2, Edit, Save, Copy, Users, Lock as LockIcon, AlertTriangle } from "lucide-react"

export function ClassesView({ classes, createClass, deleteClass, updateClass, teachers, onOpenDetail, isLoading, subscription, maxClasses }: any) {
  const [newClassName, setNewClassName] = useState("")
  const [editingId, setEditingId] = useState<string | null>(null)
  const [editName, setEditName] = useState("")

  const handleCreate = () => { createClass(newClassName); setNewClassName("") }
  const startEdit = (cls: any) => { setEditingId(cls.id); setEditName(cls.name) }
  const saveEdit = (id: string) => { updateClass(id, editName); setEditingId(null) }

  // LOGIKA LIMIT & LOCK
  const isInactive = subscription !== 'active';

  const isLimitReached = classes.length >= maxClasses;
  const isLocked = isInactive || isLimitReached;

  return (
    <div className="space-y-8 animate-in fade-in pb-10">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 border-b border-slate-200 pb-6">
             <div>
                <h1 className="text-2xl font-bold text-slate-900">Manajemen Kelas</h1>
                <div className="flex items-center gap-2 mt-1">
                    <span className={`px-2 py-0.5 rounded text-xs font-bold ${isLimitReached ? 'bg-red-100 text-red-700' : 'bg-green-100 text-green-700'}`}>
                        {classes.length} / {maxClasses} Kelas
                    </span>
                    <span className="text-slate-500 text-sm">Terpakai</span>
                </div>
             </div>
        </div>

        {/* ALERTS */}
        {isInactive && (
            <div className="bg-orange-50 border border-orange-200 p-4 rounded-xl flex items-center gap-3 text-orange-800 shadow-sm">
                <div className="p-2 bg-white rounded-full text-orange-600"><LockIcon size={18} /></div>
                <p className="text-sm font-semibold">Anda belum berlangganan. Silakan beli paket untuk membuat kelas.</p>
            </div>
        )}
        {isLimitReached && !isInactive && (
            <div className="bg-yellow-50 border border-yellow-200 p-4 rounded-xl flex items-center gap-3 text-yellow-800 shadow-sm">
                <div className="p-2 bg-white rounded-full text-yellow-600"><AlertTriangle size={18} /></div>
                <p className="text-sm font-semibold">Kuota kelas penuh (Maksimal 9). Hapus kelas lama jika ingin membuat baru.</p>
            </div>
        )}

        {/* FORM INPUT */}
        <div className={`bg-white p-6 rounded-2xl border border-slate-200 shadow-sm transition-all duration-300 ${isLocked ? 'opacity-60 grayscale pointer-events-none' : ''}`}>
            <label className="text-sm font-bold text-slate-700 mb-2 block">Buat Kelas Baru</label>
            <div className="flex flex-col sm:flex-row gap-3">
                <Input 
                    placeholder="Nama Kelas (Contoh: 1A)" 
                    value={newClassName} 
                    onChange={(e) => setNewClassName(e.target.value)} 
                    className="max-w-md h-11" 
                    disabled={isLocked}
                />
                <Button 
                    onClick={handleCreate} 
                    disabled={isLoading || isLocked || !newClassName}
                    className="h-11 bg-indigo-600 hover:bg-indigo-700 font-bold px-6"
                >
                    <Plus size={18} className="mr-2"/> Buat Kelas
                </Button>
            </div>
        </div>

        {/* GRID KELAS */}
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
            {classes.map((cls: any) => (
                <div key={cls.id} className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm flex flex-col hover:shadow-lg transition-all group h-full">
                    {/* Header Card */}
                    <div className="flex justify-between items-start mb-3">
                        <div className="flex-1 min-w-0 pr-2">
                             {editingId === cls.id ? (
                                <div className="flex gap-2 items-center">
                                    <Input value={editName} onChange={(e) => setEditName(e.target.value)} className="h-8 text-sm"/>
                                    <button onClick={() => saveEdit(cls.id)} className="text-green-600 hover:bg-green-50 p-1 rounded"><Save size={18}/></button>
                                </div>
                            ) : (
                                <h3 className="text-lg font-bold text-slate-900 flex items-center gap-2 truncate">
                                    {cls.name} 
                                    <button onClick={() => startEdit(cls)} className="text-slate-300 hover:text-indigo-500 opacity-0 group-hover:opacity-100 transition-opacity p-1"><Edit size={14}/></button>
                                </h3>
                            )}
                             <div className="flex items-center gap-2 text-xs text-slate-500 mt-1">
                                <Users size={14} className="text-slate-400"/> 
                                <span className="truncate max-w-[150px] font-medium">{teachers.find((t: any) => t.email === cls.teacherId)?.name || "Belum ada Wali"}</span>
                            </div>
                        </div>
                        <button onClick={() => deleteClass(cls.id)} className="text-slate-300 hover:text-red-500 p-2 hover:bg-red-50 rounded-lg transition-colors"><Trash2 size={16}/></button>
                    </div>

                    {/* Kode Kelas */}
                    <div className="bg-slate-50 px-3 py-3 rounded-xl border border-dashed border-slate-300 flex justify-between items-center mb-6 gap-2">
                        <div className="flex flex-col">
                             <span className="text-[10px] text-slate-400 font-bold uppercase tracking-wider">Kode Akses</span>
                             <code className="text-sm font-mono font-bold text-indigo-700 truncate">{cls.token}</code>
                        </div>
                        <button className="text-slate-400 hover:text-indigo-600 p-2 hover:bg-white rounded-lg transition-colors" onClick={() => navigator.clipboard.writeText(cls.token)}>
                            <Copy size={16}/>
                        </button>
                    </div>

                    {/* Footer */}
                    <Button variant="outline" className="w-full mt-auto border-slate-200 text-slate-700 hover:bg-slate-50 h-10 font-medium" onClick={() => onOpenDetail(cls)}>
                        Kelola Detail
                    </Button>
                </div>
            ))}
        </div>
    </div>
  )
}