"use client"
import { useState } from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"

export default function RegisterSchoolPage() {
  const router = useRouter()
  const [isLoading, setIsLoading] = useState(false)

  // State untuk menampung data input
  const [formData, setFormData] = useState({
    role: 'school',
    name: '',       // Nama Sekolah
    email: '',      // Email Login
    password: '',   // Password Login
    village: '',    // Desa
    district: '',   // Kecamatan
    regency: ''     // Kabupaten
  })

  // Handler saat mengetik
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
  }

  // Handler saat submit
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)

    try {
      // Kita gabungkan data alamat menjadi satu field 'address' agar rapi di database, 
      // atau biarkan terpisah terserah preferensi. Di sini kita kirim apa adanya.
      const payload = {
        ...formData,
        // Opsional: Buat field address lengkap untuk kemudahan display nanti
        address: `${formData.village}, ${formData.district}, ${formData.regency}`
      }

      const res = await fetch('/api/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      })

      const data = await res.json()

      if (!res.ok) throw new Error(data.error)

      // Sukses
      alert("Pendaftaran Sekolah Berhasil! Silakan Login.")
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
        <h1 className="text-2xl font-bold text-indigo-900">Daftarkan Sekolah</h1>
        <p className="text-slate-500">Bawa metode Singapore Math ke ruang kelas Anda.</p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-5">
        {/* Bagian Akun Login (Penting ditambahkan agar bisa login) */}
        <div className="space-y-4">
            <Input 
                name="name" 
                label="Nama Sekolah" 
                placeholder="Contoh: SD Tunas Bangsa" 
                onChange={handleChange} 
                required 
            />
            <Input 
                name="email" 
                label="Email Sekolah / Admin" 
                type="email" 
                placeholder="admin@sekolah.id" 
                onChange={handleChange} 
                required 
            />
            <Input 
                name="password" 
                label="Kata Sandi Akun" 
                isPassword 
                placeholder="••••••" 
                onChange={handleChange} 
                required 
            />
        </div>
        
        {/* Bagian Alamat */}
        <div className="space-y-4 border-t pt-4 border-slate-100">
            <p className="text-sm font-semibold text-slate-700">Alamat Lengkap</p>
            <Input 
                name="village" 
                label="Desa / Kelurahan" 
                placeholder="Nama Desa" 
                onChange={handleChange} 
                required 
            />
            <div className="grid grid-cols-2 gap-4">
                <Input 
                    name="district" 
                    label="Kecamatan" 
                    placeholder="Kecamatan" 
                    onChange={handleChange} 
                    required 
                />
                <Input 
                    name="regency" 
                    label="Kabupaten / Kota" 
                    placeholder="Kabupaten" 
                    onChange={handleChange} 
                    required 
                />
            </div>
        </div>

        <Button type="submit" className="w-full" disabled={isLoading}>
            {isLoading ? "Mendaftarkan..." : "Daftarkan Sekolah"}
        </Button>
      </form>

      <p className="text-center text-sm text-slate-600 mt-4">
        Sudah punya akun? <Link href="/login" className="font-semibold text-indigo-600">Login</Link>
      </p>
    </div>
  )
}