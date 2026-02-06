"use client"
import Link from "next/link"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Chrome } from "lucide-react"

export default function RegisterStudentPage() {
  return (
    <div className="w-full max-w-lg p-8 space-y-6 bg-white rounded-2xl shadow-xl border border-indigo-50">
      <div className="space-y-2 text-center">
        <h1 className="text-2xl font-bold text-indigo-900">Daftar sebagai Siswa</h1>
        <p className="text-slate-500">Mulai petualangan matematikamu sekarang!</p>
      </div>

      <form className="space-y-4">
        <Input label="Nama Lengkap" placeholder="Budi Santoso" required />
        <Input label="Tanggal Lahir" type="date" required />
        <Input label="Email" type="email" placeholder="siswa@email.com" required />
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Input label="Kata Sandi Baru" isPassword placeholder="••••••" required />
            <Input label="Konfirmasi Kata Sandi" isPassword placeholder="••••••" required />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Input label="Sekolah" placeholder="SDN 01 Pagi" required />
            <Input label="Kelas" placeholder="4 SD" required />
        </div>

        <Button type="submit" className="w-full mt-6">Daftar Sekarang</Button>
      </form>

      <div className="relative my-4">
        <div className="absolute inset-0 flex items-center"><span className="w-full border-t" /></div>
        <div className="relative flex justify-center text-xs uppercase"><span className="bg-white px-2 text-slate-500">Atau</span></div>
      </div>

      <Button variant="outline">
        <Chrome className="mr-2 h-4 w-4" /> Daftar dengan Google
      </Button>
      
      <p className="text-center text-sm text-slate-600 mt-4">
        Sudah punya akun? <Link href="/login" className="font-semibold text-indigo-600">Login</Link>
      </p>
    </div>
  )
}