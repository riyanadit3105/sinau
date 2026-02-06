"use client"
import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { X, UserCog, GraduationCap, UserMinus, ChevronRight, Users } from "lucide-react"

export function ClassDetailModal({ cls, onClose, user, onUpdate, teachers }: any) {
  const [details, setDetails] = useState<{students: any[], teachers: any[]} | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [selectedTeacher, setSelectedTeacher] = useState("")

  useEffect(() => {
    const fetchDetail = async () => {
      setIsLoading(true)
      try {
        const res = await fetch('/api/classes/detail', { 
            method: 'POST', 
            body: JSON.stringify({ classId: cls.id, schoolId: user.email }) 
        })
        const data = await res.json()
        if (data.success) {
            setDetails(data)
            setSelectedTeacher(cls.teacherId || "")
        }
      } catch (error) { console.error(error) } 
      finally { setIsLoading(false) }
    }
    fetchDetail()
  }, [cls.id, user.email, cls.teacherId])

  const handleAssign = async () => {
    await fetch('/api/classes/assign-teacher', { 
        method: 'POST', 
        body: JSON.stringify({ classId: cls.id, teacherEmail: selectedTeacher }) 
    })
    alert("Wali kelas berhasil disimpan!")
    onUpdate()
  }
  
  const handleRemoveStudent = async (studentEmail: string) => {
    if(!confirm("Yakin ingin mengeluarkan siswa ini dari kelas?")) return;

    const res = await fetch('/api/classes/remove-student', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: studentEmail })
    });

    const data = await res.json();
    if (data.success) {
        alert("Berhasil!");
        // Refresh halaman
        window.location.reload();
    } else {
        alert(data.error);
    }
}

  return (
    <div className="fixed inset-0 z-[110] flex items-end sm:items-center justify-center bg-black/60 p-0 sm:p-4 backdrop-blur-sm animate-in fade-in">
      <div className="bg-white w-full sm:max-w-2xl sm:rounded-2xl rounded-t-2xl shadow-2xl overflow-hidden flex flex-col h-[90vh] sm:h-auto sm:max-h-[85vh]">
        
        {/* HEADER */}
        <div className="p-5 border-b flex justify-between items-center bg-slate-50">
            <div>
                <h2 className="text-xl font-bold text-slate-900 truncate">Kelas {cls.name}</h2>
                <p className="text-xs text-slate-500">ID: {cls.id}</p>
            </div>
            <button onClick={onClose} className="p-2 bg-slate-100 rounded-full hover:bg-slate-200 transition-colors"><X size={20}/></button>
        </div>

        {/* CONTENT */}
        <div className="p-6 overflow-y-auto space-y-8 flex-1">
            {isLoading ? <div className="text-center py-10 text-slate-500">Memuat data...</div> : (
                <>
                    {/* BAGIAN WALI KELAS (PERBAIKAN UI DI SINI) */}
                    <div className="bg-blue-50/50 p-5 rounded-2xl border border-blue-100">
                        <label className="text-sm font-bold text-blue-900 mb-3 flex items-center gap-2">
                            <UserCog size={18}/> Pilih Wali Kelas
                        </label>
                        
                        {/* Container Flexbox */}
                        <div className="flex flex-col sm:flex-row gap-3 w-full">
                            
                            {/* Dropdown Wrapper: Flex-1 agar mengambil sisa ruang yang tersedia */}
                            <div className="relative flex-1 w-full">
                                <select 
                                    className="w-full h-11 rounded-xl border border-slate-300 px-3 text-sm bg-white appearance-none outline-none cursor-pointer hover:border-blue-400 transition-colors"
                                    value={selectedTeacher} 
                                    onChange={(e) => setSelectedTeacher(e.target.value)}
                                >
                                    <option value="">-- Belum dipilih --</option>
                                    {teachers.map((t:any) => <option key={t.email} value={t.email}>{t.name}</option>)}
                                </select>
                                <ChevronRight size={16} className="absolute right-3 top-3 pointer-events-none text-slate-500 rotate-90"/>
                            </div>

                            {/* Button: W-auto di desktop agar tidak melar, shrink-0 agar tidak tergencet */}
                            <Button 
                                onClick={handleAssign} 
                                className="h-11 bg-blue-600 hover:bg-blue-700 w-full sm:w-auto sm:min-w-[100px] shrink-0"
                            >
                                Simpan
                            </Button>
                        </div>
                    </div>

                    {/* DAFTAR SISWA */}
                    <div>
                        <div className="flex justify-between items-end mb-4 border-b pb-2">
                            <h3 className="font-bold text-slate-800 flex items-center gap-2"><GraduationCap size={20}/> Daftar Siswa</h3>
                            <span className="bg-slate-100 text-slate-600 px-2 py-1 rounded text-xs font-bold">{details?.students.length || 0} Siswa</span>
                        </div>
                        <div className="space-y-2">
                            {details?.students.map((s, idx) => (
                                <div key={idx} className="flex justify-between items-center p-3 border border-slate-100 rounded-xl hover:bg-slate-50 transition-colors bg-white">
                                    <div className="min-w-0 pr-2 flex items-center gap-3">
                                        <div className="w-8 h-8 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center font-bold text-xs">{s.name.charAt(0)}</div>
                                        <div className="min-w-0"><p className="font-bold text-sm text-slate-800 truncate">{s.name}</p><p className="text-xs text-slate-400 truncate">{s.email}</p></div>
                                    </div>
                                    <button onClick={() => handleRemoveStudent(s.email)} className="text-slate-300 hover:text-red-500 p-2 hover:bg-red-50 rounded-lg"><UserMinus size={18}/></button>
                                </div>
                            ))}
                            {(!details?.students || details.students.length === 0) && <div className="text-center py-8 text-slate-400 text-sm">Belum ada siswa.</div>}
                        </div>
                    </div>
                </>
            )}
        </div>
      </div>
    </div>
  )
}