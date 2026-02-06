"use client"
import { useState } from "react"
import { useRouter } from "next/navigation"
import { Tv, Loader2, ArrowRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import { useAuth } from "@/contexts/AuthContext" // Kita pakai context auth yg sudah ada

export default function TvLoginPage() {
  const [code, setCode] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const router = useRouter()
  // Kita akan menembak API login TV, lalu set cookie manual agar AuthContext mendeteksi
  
  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault()
    if (code.length < 6) return;

    setIsLoading(true)
    try {
        const res = await fetch('/api/tv/login', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ code })
        });
        const data = await res.json();

        if (!res.ok) throw new Error(data.error);

        // LOGIN BERHASIL: SIMPAN COOKIE
        // Kita simpan cookie persis seperti login biasa agar AuthContext membacanya
        const userData = JSON.stringify(data.user);
        document.cookie = `sinau_token=${encodeURIComponent(userData)}; path=/; max-age=86400; SameSite=Lax`;

        // Redirect ke Tampilan TV
        router.push("dashboard"); 
        
    } catch (error: any) {
        alert(error.message);
    } finally {
        setIsLoading(false);
    }
  }

  return (
    <div className="min-h-screen bg-slate-900 flex items-center justify-center text-white">
      <div className="w-full max-w-lg p-8 text-center space-y-8 animate-in zoom-in duration-500">
        
        {/* Logo Besar */}
        <div className="flex justify-center mb-6">
            <div className="bg-indigo-600 p-6 rounded-3xl shadow-2xl shadow-indigo-500/20">
                <Tv size={64} className="text-white" />
            </div>
        </div>

        <div>
            <h1 className="text-4xl font-bold mb-2">Login Layar Kelas</h1>
            <p className="text-slate-400 text-lg">Masukkan 6 digit kode yang ada di Dashboard Guru</p>
        </div>

        <form onSubmit={handleLogin} className="space-y-6">
            <input 
                type="text" 
                maxLength={6}
                value={code}
                onChange={(e) => setCode(e.target.value.replace(/\D/g,''))} // Hanya angka
                placeholder="000000"
                className="w-full bg-slate-800 border-2 border-slate-700 focus:border-indigo-500 text-center text-6xl font-mono font-bold tracking-[1rem] py-6 rounded-2xl outline-none transition-all placeholder:text-slate-700"
                autoFocus
            />

            <Button 
                size="lg" 
                className="w-full h-16 text-xl font-bold bg-indigo-600 hover:bg-indigo-500 rounded-xl"
                disabled={isLoading || code.length < 6}
            >
                {isLoading ? <Loader2 className="animate-spin mr-2" /> : <ArrowRight className="mr-2" />}
                MASUK KELAS
            </Button>
        </form>

        <p className="text-slate-500 text-sm">
            Gunakan remote atau keyboard untuk mengetik kode.
        </p>
      </div>
    </div>
  )
}