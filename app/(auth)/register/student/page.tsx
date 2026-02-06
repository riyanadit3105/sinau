"use client"
import { useState } from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Chrome } from "lucide-react"

export default function RegisterStudentPage() {
  const router = useRouter()
  const [isLoading, setIsLoading] = useState(false)
  
  // STATE BARU: Lebih bersih, tanpa sekolah & kelas
  const [formData, setFormData] = useState({
    role: 'student',
    name: '',
    birthDate: '',
    email: '',
    password: '',
    // confirmPassword bisa divalidasi di frontend saja sebelum kirim
  })

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)

    try {
      const res = await fetch('/api/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      })

      const data = await res.json()

      if (!res.ok) throw new Error(data.error)

      // Sukses
      alert("Pendaftaran Berhasil! Silakan Login lalu masukkan Kode Kelas.")
      router.push('/login')

    } catch (error: any) {
      alert(error.message)
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="w-full max-w-lg p-8 space-y-6 bg-white rounded-2xl shadow-xl border border-indigo-50">
      <div className="space-y-2 text-center">
        <h1 className="text-2xl font-bold text-indigo-900">Daftar sebagai Siswa</h1>
        <p className="text-slate-500">Buat akun untuk mulai belajar.</p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-4">
        <Input name="name" label="Nama Lengkap" placeholder="Budi Santoso" onChange={handleChange} required />
        <Input name="birthDate" label="Tanggal Lahir" type="date" onChange={handleChange} required />
        <Input name="email" label="Email" type="email" placeholder="siswa@email.com" onChange={handleChange} required />
        <Input name="password" label="Kata Sandi" isPassword placeholder="••••••" onChange={handleChange} required />
        
        <Button type="submit" disabled={isLoading} className="w-full mt-6">
            {isLoading ? "Menyimpan..." : "Daftar Sekarang"}
        </Button>
      </form>

      {/* Login Google & Footer */}
      <div className="relative my-4">
        <div className="absolute inset-0 flex items-center"><span className="w-full border-t" /></div>
        <div className="relative flex justify-center text-xs uppercase"><span className="bg-white px-2 text-slate-500">Atau</span></div>
      </div>

      <Button variant="outline" className="w-full">
        <Chrome className="mr-2 h-4 w-4" /> Daftar dengan Google
      </Button>
      
      <p className="text-center text-sm text-slate-600 mt-4">
        Sudah punya akun? <Link href="/login" className="font-semibold text-indigo-600">Login</Link>
      </p>
    </div>
  )
}