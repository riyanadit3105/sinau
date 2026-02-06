import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Trash2, Loader2, LogOut } from "lucide-react"
import { useRouter } from "next/navigation"

// Tambahkan prop 'user' untuk mendapatkan ID Sekolah yang sedang login
export function TeachersView({ teachers, user, removeTeacher }: any) {
  const router = useRouter()
  const [loadingEmail, setLoadingEmail] = useState<string | null>(null)


  return (
    <div className="space-y-6 animate-in fade-in slide-in-from-bottom-2">
        <div className="mb-6">
            <h1 className="text-2xl font-bold text-slate-900">Data Guru</h1>
            <p className="text-slate-500">Manajemen akun guru yang terdaftar di sekolah ini.</p>
        </div>

        <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
            <div className="overflow-x-auto">
                <table className="w-full text-sm text-left whitespace-nowrap">
                    <thead className="bg-slate-50 text-slate-600 border-b border-slate-200">
                        <tr>
                            <th className="px-6 py-4 font-semibold uppercase text-xs tracking-wider">Nama Lengkap</th>
                            <th className="px-6 py-4 font-semibold uppercase text-xs tracking-wider">Email</th>
                            <th className="px-6 py-4 text-right font-semibold uppercase text-xs tracking-wider">Aksi</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100">
                        {teachers.map((t: any) => (
                            <tr key={t.id} className="hover:bg-slate-50 transition-colors">
                                <td className="px-6 py-4 font-bold text-slate-800">{t.name}</td>
                                <td className="px-6 py-4 text-slate-500 font-mono text-xs">{t.email}</td>
                                <td className="px-6 py-4 text-right">
                                    <Button 
                                        variant="ghost" 
                                        size="sm" 
                                        className="text-red-500 hover:bg-red-50 hover:text-red-700" 
                                        onClick={() => removeTeacher(t.email)}
                                        disabled={loadingEmail === t.email}
                                    >
                                        {loadingEmail === t.email ? (
                                            <Loader2 size={16} className="mr-2 animate-spin"/>
                                        ) : (
                                            <LogOut size={16} className="mr-2"/> 
                                        )}
                                        {loadingEmail === t.email ? "Proses..." : "Keluarkan"}
                                    </Button>
                                </td>
                            </tr>
                        ))}
                        {teachers.length === 0 && (
                            <tr><td colSpan={3} className="px-6 py-12 text-center text-slate-400 italic">Belum ada guru yang bergabung.</td></tr>
                        )}
                    </tbody>
                </table>
            </div>
        </div>
    </div>
  )
}