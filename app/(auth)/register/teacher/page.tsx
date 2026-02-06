"use client"
import { useState } from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"

export default function RegisterTeacherPage() {
  const router = useRouter()
  const [isLoading, setIsLoading] = useState(false)
  
  const [formData, setFormData] = useState({
    role: 'teacher', // Role dikunci sebagai teacher
    name: '',
    email: '',
    password: '',
    nip: '' // Opsional: Nomor Induk Pegawai
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

      alert("Pendaftaran Guru Berhasil! Silakan Login.")
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
        <h1 className="text-2xl font-bold text-indigo-900">Daftar sebagai Guru</h1>
        <p className="text-slate-500">Kelola kelas dan pantau perkembangan siswa.</p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-4">
        <Input name="name" label="Nama Lengkap & Gelar" placeholder="Budi Santoso, S.Pd." onChange={handleChange} required />
        <Input name="email" label="Email Sekolah" type="email" placeholder="guru@sekolah.id" onChange={handleChange} required />
        <Input name="password" label="Kata Sandi" isPassword placeholder="••••••" onChange={handleChange} required />
        <Input name="nip" label="NIP / ID Guru (Opsional)" placeholder="1980xxxx..." onChange={handleChange} />
        
        <Button type="submit" disabled={isLoading} className="w-full mt-6 bg-indigo-700 hover:bg-indigo-800">
            {isLoading ? "Menyimpan..." : "Daftar Guru"}
        </Button>
      </form>

      <p className="text-center text-sm text-slate-600 mt-4">
        Sudah punya akun? <Link href="/login" className="font-semibold text-indigo-600">Login</Link>
      </p>
    </div>
  )
}