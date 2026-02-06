"use client"
import Link from "next/link"
import { useState } from "react"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Chrome } from "lucide-react"
import { useAuth } from "@/contexts/AuthContext"

export default function LoginPage() {
  const { login } = useAuth();
  
  // State untuk inputan
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    // Panggil fungsi login dari AuthContext
    // await login(email, password) akan mengembalikan true/false
    await login(email, password);
    
    setIsLoading(false);
  }

  return (
    <div className="w-full max-w-md p-8 space-y-6 bg-white rounded-2xl shadow-xl border border-indigo-50">
      <div className="space-y-2 text-center">
        <h1 className="text-3xl font-bold text-indigo-900">Masuk ke Sinau</h1>
        <p className="text-slate-500">Lanjutkan pembelajaran matematika yang menyenangkan.</p>
      </div>

      <form onSubmit={handleLogin} className="space-y-4">
        <Input 
          label="Email" 
          type="email" 
          placeholder="guru@sekolah.id" 
          required 
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <Input 
          label="Kata Sandi" 
          isPassword 
          placeholder="••••••••" 
          required 
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        
        <div className="flex justify-end">
          <Link href="#" className="text-sm font-medium text-indigo-600 hover:text-indigo-500">
            Lupa kata sandi?
          </Link>
        </div>

        <Button type="submit" disabled={isLoading}>
            {isLoading ? "Memuat..." : "Masuk"}
        </Button>
      </form>

      <div className="relative">
        <div className="absolute inset-0 flex items-center">
          <span className="w-full border-t" />
        </div>
        <div className="relative flex justify-center text-xs uppercase">
          <span className="bg-white px-2 text-slate-500">Atau masuk dengan</span>
        </div>
      </div>

      <Button variant="outline" type="button">
        <Chrome className="mr-2 h-4 w-4" /> Google
      </Button>

      <div className="text-center text-sm text-slate-600 space-y-2 mt-6">
        <p>Belum punya akun?</p>
        <div className="flex flex-wrap justify-center gap-4 font-semibold text-indigo-600">
            <Link href="/register/student" className="hover:underline">Daftar Siswa</Link>
            <span className="text-slate-300">|</span>
            <Link href="/register/teacher" className="hover:underline">Daftar Guru</Link>
            <span className="text-slate-300">|</span>
            <Link href="/register/school" className="hover:underline">Daftar Sekolah</Link>
        </div>
      </div>
    </div>
  )
}