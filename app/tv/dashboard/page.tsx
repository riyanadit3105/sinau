"use client"
import { useAuth } from "@/contexts/AuthContext"
import { useEffect } from "react"
import { useRouter } from "next/navigation"

export default function TvDashboard() {
  const { user, isLoading } = useAuth()
  const router = useRouter()

  // Proteksi Halaman
  useEffect(() => {
    if (!isLoading && !user) {
        router.push('/tv/login')
    }
  }, [user, isLoading, router])

  if (!user) return <div className="min-h-screen bg-slate-900 text-white flex items-center justify-center">Memuat...</div>

  return (
    <div className="min-h-screen bg-slate-950 text-white p-10">
      <div className="max-w-7xl mx-auto border-4 border-dashed border-slate-800 rounded-3xl h-[80vh] flex flex-col items-center justify-center text-center">
        <h1 className="text-6xl font-bold text-indigo-400 mb-6">Selamat Datang di Kelas</h1>
        <h2 className="text-4xl text-white font-semibold">{user.className || "Matematika Dasar"}</h2>
        <div className="mt-10 p-6 bg-slate-900 rounded-2xl border border-slate-800">
            <p className="text-xl text-slate-400">Menunggu Guru memulai pelajaran...</p>
        </div>
      </div>
    </div>
  )
}