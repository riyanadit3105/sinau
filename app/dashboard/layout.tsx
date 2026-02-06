"use client"
import React, { useState } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { 
  LayoutDashboard, LogOut, Tv, X, 
  Gamepad2, Trophy, CreditCard, QrCode, BookOpen 
} from "lucide-react"
import { useAuth } from "@/contexts/AuthContext"
import { Button } from "@/components/ui/button"
import Logo from "@/components/shared/Logo" // <--- 1. Import Logo Disini

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname()
  const { user, logout, isLoading } = useAuth()
  
  // State untuk Modal TV Code (Pop-up)
  const [showTvModal, setShowTvModal] = useState(false)
  const [tvCode, setTvCode] = useState<string | null>(null)
  const [loadingTv, setLoadingTv] = useState(false)

  // Fungsi Generate Kode TV
  const generateTvCode = async () => {
    setLoadingTv(true)
    try {
        const res = await fetch('/api/tv/token', {
            method: 'POST',
            body: JSON.stringify({ teacherEmail: user?.email, teacherData: user })
        });
        const data = await res.json();
        if(data.success) setTvCode(data.code)
    } catch (e) { 
        console.error(e) 
    }
    setLoadingTv(false)
  }

  // --- LOGIKA MENU DINAMIS BERDASARKAN ROLE ---
  let navItems = [
    { name: "Dashboard", href: "/dashboard", icon: LayoutDashboard },
  ]

  if (user?.role === "school") {
    // Menu Admin Sekolah
    navItems.push(
      { name: "Pembelian", href: "/dashboard/billing", icon: CreditCard }
    )
  } else if (user?.role === "student") {
    // Menu Siswa
    navItems.push(
      { name: "Redeem", href: "/dashboard/redeem", icon: QrCode },
      { name: "Games", href: "/games", icon: Gamepad2 },
      { name: "Leaderboard", href: "/dashboard/leaderboard", icon: Trophy }
    )
  } else if (user?.role === "teacher") {
    // Menu Guru
    navItems.push(
      { name: "Games", href: "/games", icon: Gamepad2 },
      { name: "Leaderboard", href: "/dashboard/leaderboard", icon: Trophy }
    )
  }

  return (
    <div className="min-h-screen bg-slate-50 font-sans pb-20 md:pb-0">
      
      {/* --- NAVBAR ATAS --- */}
      <header className="sticky top-0 z-40 w-full border-b border-slate-200 bg-white/80 backdrop-blur-xl">
        <div className="container mx-auto flex h-16 items-center justify-between px-4">
          
          {/* --- 2. LOGO DIGANTI DISINI --- */}
          <Link href="/dashboard" className="hover:opacity-80 transition-opacity">
             <Logo className="h-9" withText={true} />
          </Link>

          {/* Menu Navigasi Tengah (Desktop) */}
          <nav className="hidden md:flex items-center gap-1">
            {navItems.map((item) => {
              const isActive = pathname === item.href
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium transition-all
                    ${isActive 
                      ? "bg-indigo-100 text-indigo-700" 
                      : "text-slate-600 hover:bg-slate-100 hover:text-slate-900"
                    }`}
                >
                  <item.icon size={18} />
                  {item.name}
                </Link>
              )
            })}
          </nav>

          {/* Menu Kanan (User & Actions) */}
          <div className="flex items-center gap-3">
             
             {/* TOMBOL TV (KHUSUS GURU) */}
             {user?.role === 'teacher' && (
                <Button 
                    variant="outline" 
                    size="sm" 
                    className="gap-2 border-indigo-200 text-indigo-700 hover:bg-indigo-50 hidden sm:flex"
                    onClick={() => { setShowTvModal(true); if(!tvCode) generateTvCode(); }}
                >
                    <Tv size={16} /> <span className="hidden lg:inline">Mode Layar Kelas</span>
                </Button>
             )}

             {/* Profil User */}
             <div className="hidden md:block text-right mr-2">
                <p className="text-sm font-bold text-slate-900 leading-none">{user?.name || "Guest"}</p>
                <p className="text-[10px] text-slate-500 uppercase tracking-wider mt-1">{user?.role === 'school' ? 'Admin' : user?.role}</p>
             </div>

             {/* Tombol Logout */}
             <button 
                onClick={logout} 
                className="p-2 rounded-full bg-slate-100 hover:bg-red-50 hover:text-red-600 text-slate-600 transition-colors"
                title="Keluar"
             >
                <LogOut size={20} />
             </button>
          </div>
        </div>
      </header>

      {/* --- KONTEN UTAMA --- */}
      <main className="container mx-auto p-4 md:p-8 animate-in fade-in">
        {children}
      </main>

      {/* --- MODAL POPUP KODE TV --- */}
      {showTvModal && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/60 backdrop-blur-sm p-4 animate-in fade-in">
            <div className="bg-white rounded-2xl shadow-2xl p-6 max-w-sm w-full text-center relative">
                <button 
                    onClick={() => setShowTvModal(false)} 
                    className="absolute top-4 right-4 text-slate-400 hover:text-slate-600 bg-slate-100 rounded-full p-1"
                >
                    <X size={20}/>
                </button>
                
                <div className="w-16 h-16 bg-indigo-100 text-indigo-600 rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-sm">
                    <Tv size={32} />
                </div>
                
                <h3 className="text-xl font-bold text-slate-900 mb-1">Login di TV</h3>
                <p className="text-sm text-slate-500 mb-6">
                    Buka <b>sinau.com/tv</b> di Smart TV kelas dan masukkan kode ini:
                </p>
                
                <div className="bg-slate-50 border-2 border-dashed border-slate-200 py-6 rounded-xl mb-6">
                    {loadingTv ? (
                        <span className="text-slate-400 animate-pulse font-medium">Membuat Kode...</span>
                    ) : (
                        <span className="text-5xl font-mono font-black text-indigo-600 tracking-[0.2em]">{tvCode}</span>
                    )}
                </div>
                
                <Button onClick={() => setShowTvModal(false)} className="w-full h-11 bg-indigo-600 hover:bg-indigo-700">
                    Tutup
                </Button>
            </div>
        </div>
      )}
      <div className="md:hidden fixed bottom-0 left-0 right-0 bg-white border-t border-slate-200 z-50 pb-safe safe-area-inset-bottom">
        <div className="flex justify-around items-center h-16">
          {navItems.map((item) => {
             const isActive = pathname === item.href
             return (
               <Link 
                 key={item.href} 
                 href={item.href}
                 className={`flex flex-col items-center justify-center w-full h-full space-y-1 transition-colors
                    ${isActive ? "text-indigo-600" : "text-slate-400 hover:text-slate-600"}
                 `}
               >
                 <item.icon size={20} strokeWidth={isActive ? 2.5 : 2} />
                 <span className="text-[10px] font-medium">{item.name}</span>
               </Link>
             )
          })}
        </div>
      </div>
    </div>
  )
}