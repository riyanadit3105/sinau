"use client"
import { useEffect } from "react"
import { useRouter } from "next/navigation"
import { useAuth } from "@/contexts/AuthContext"
import { Loader2 } from "lucide-react"

// --- IMPORT 3 DASHBOARD UTAMA ---
// Pastikan path-nya sesuai dengan tempat Anda menyimpan file komponen tadi
import { SchoolDashboard } from "@/components/dashboard/SchoolDashboard"
import { TeacherDashboard } from "@/components/dashboard/TeacherDashboard"
import { StudentDashboard } from "@/components/dashboard/StudentDashboard"

export default function DashboardPage() {
  const { user, isLoading } = useAuth()
  const router = useRouter()

  // 1. Cek Login (Proteksi Halaman)
  useEffect(() => {
    if (!isLoading && !user) {
      router.push("/login")
    }
  }, [user, isLoading, router])

  // 2. Tampilan Loading (Saat cek sesi)
  if (isLoading) {
    return (
      <div className="flex h-screen w-full items-center justify-center bg-slate-50">
        <div className="flex flex-col items-center gap-2">
          <Loader2 className="h-10 w-10 animate-spin text-indigo-600" />
          <p className="text-sm font-medium text-slate-500">Memuat Dashboard...</p>
        </div>
      </div>
    )
  }

  // 3. Jika tidak ada user (Redundan dgn useEffect tapi aman untuk TypeScript)
  if (!user) return null

  // 4. SWITCHER: Tampilkan Dashboard sesuai Role
  return (
    <>
      {/* Jika Role = SCHOOL (Admin Sekolah) */}
      {user.role === "school" && <SchoolDashboard user={user} />}

      {/* Jika Role = TEACHER (Guru) */}
      {user.role === "teacher" && <TeacherDashboard user={user} />}

      {/* Jika Role = STUDENT (Murid) */}
      {/* INI YANG SEBELUMNYA MUNGKIN BELUM ADA */}
      {user.role === "student" && <StudentDashboard user={user} />}
      
      {/* Fallback jika role tidak dikenali */}
      {!["school", "teacher", "student"].includes(user.role) && (
        <div className="p-10 text-center">
            <h1 className="text-xl font-bold text-red-500">Error: Role Tidak Dikenali</h1>
            <p>Role akun Anda: {user.role}</p>
        </div>
      )}
    </>
  )
}