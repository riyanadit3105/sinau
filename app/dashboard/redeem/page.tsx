"use client"
import { useState } from "react"
import { useRouter } from "next/navigation"
import { useAuth } from "@/contexts/AuthContext"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Ticket } from "lucide-react"

export default function RedeemPage() {
  const [code, setCode] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const { user, login } = useAuth() // Kita butuh login ulang untuk refresh data user
  const router = useRouter()

  const handleRedeem = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    
    try {
        const res = await fetch('/api/redeem', {
            method: 'POST',
            body: JSON.stringify({ email: user?.email, code }) // Kirim email user yang sedang login
        });
        
        const data = await res.json();
        
        if(!res.ok) throw new Error(data.error);

        alert(`Berhasil masuk ke kelas ${data.className}!`);
        
        // --- PERBAIKAN TAMPILAN ---
        // Force reload halaman agar AuthContext mengambil data terbaru (schoolId & classId) dari server
        window.location.href = "/dashboard"; 
        
    } catch (error: any) {
        alert(error.message);
    } finally {
        setIsLoading(false);
    }
  }
  return (
    <div className="max-w-md mx-auto mt-10">
      <div className="bg-white p-8 rounded-3xl shadow-xl border border-indigo-50 text-center">
        <div className="w-16 h-16 bg-orange-100 text-orange-600 rounded-2xl flex items-center justify-center mx-auto mb-6">
            <Ticket size={32} />
        </div>

        <h1 className="text-2xl font-bold text-indigo-900 mb-2">Tukarkan Kode</h1>
        <p className="text-slate-500 mb-8 text-sm">
          Masukkan kode unik dari gurumu (Contoh: SINAU-4A-XXXX).
        </p>

        <form onSubmit={handleRedeem} className="space-y-4">
            <Input 
                placeholder="Kode Kelas" 
                className="text-center text-lg uppercase font-mono h-14"
                value={code}
                onChange={(e) => setCode(e.target.value)}
                required
            />
            <Button type="submit" size="lg" className="w-full" disabled={isLoading}>
                {isLoading ? "Memproses..." : "Masuk Kelas"}
            </Button>
        </form>
      </div>
    </div>
  )
}