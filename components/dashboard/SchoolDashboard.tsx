"use client"
import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Menu, X } from "lucide-react"
import { useAuth } from "@/contexts/AuthContext"
import Logo from "@/components/shared/Logo" 

// Import Modular Components
import { 
  useSchoolData, 
  SchoolSidebar, 
  OverviewView, 
  ClassesView, 
  TeachersView, 
  BillingView, 
  ClassDetailModal 
} from "./school"

export function SchoolDashboard({ user }: { user: any }) {
  const { logout } = useAuth()
  const schoolData = useSchoolData(user)
  
  // State
  const [activeView, setActiveView] = useState<'overview' | 'classes' | 'teachers' | 'billing'>('overview')
  const [isSidebarOpen, setIsSidebarOpen] = useState(false)
  const [selectedClass, setSelectedClass] = useState<any | null>(null)

  const handleNavClick = (view: any) => {
    setActiveView(view)
    setIsSidebarOpen(false)
  }

  return (
    <div className="fixed inset-0 z-[50] bg-slate-50 flex flex-col lg:flex-row overflow-hidden font-sans">
      
      {/* --- HEADER MOBILE (SOLUSI CSS GRID) --- */}
      {/* grid-cols-[1fr_auto] -> Kiri ambil semua sisa, Kanan ambil secukupnya */}
      <header className="lg:hidden w-full h-16 bg-white border-b border-slate-200 grid grid-cols-[1fr_auto] items-center px-4 shrink-0 z-50 relative shadow-sm">
        
        {/* 1. AREA LOGO (Kiri) */}
        <div className="flex items-center justify-start">
            <Logo className="h-8" textSize="text-lg" withText={true} />
        </div>

        {/* 2. AREA HAMBURGER (Kanan) */}
        {/* w-10 h-10: Memaksa tombol berbentuk kotak kecil (tidak panjang) */}
        <Button 
            variant="ghost" 
            size="icon" 
            onClick={() => setIsSidebarOpen(!isSidebarOpen)}
            className="w-10 h-10 rounded-lg text-slate-700 hover:bg-slate-100 flex items-center justify-center"
        >
            {isSidebarOpen ? <X size={24} /> : <Menu size={24} />}
        </Button>

      </header>

      {/* --- SIDEBAR --- */}
      <SchoolSidebar 
        activeView={activeView} 
        setActiveView={handleNavClick} 
        isSidebarOpen={isSidebarOpen} 
        user={user} 
        logout={logout}
      />

      {/* --- OVERLAY MOBILE --- */}
      {isSidebarOpen && (
        <div 
            className="fixed inset-0 bg-black/50 z-[45] lg:hidden backdrop-blur-sm" 
            onClick={() => setIsSidebarOpen(false)} 
        />
      )}

      {/* --- MAIN CONTENT --- */}
      <main className="flex-1 flex flex-col relative w-full h-full overflow-hidden bg-slate-50">
        <div className="flex-1 overflow-y-auto p-4 lg:p-10 pb-24 lg:pb-10">
            <div className="max-w-7xl mx-auto">
                {activeView === 'overview' && <OverviewView {...schoolData} />}
                {activeView === 'classes' && <ClassesView {...schoolData} onOpenDetail={setSelectedClass} />}
                {activeView === 'teachers' && <TeachersView {...schoolData} />}
                {activeView === 'billing' && <BillingView {...schoolData} />}
            </div>
        </div>
      </main>

      {/* --- MODAL DETAIL --- */}
      {selectedClass && (
        <ClassDetailModal 
            cls={selectedClass} 
            onClose={() => setSelectedClass(null)} 
            user={user}
            onUpdate={schoolData.refreshData} 
            teachers={schoolData.teachers}
        />
      )}
    </div>
  )
}