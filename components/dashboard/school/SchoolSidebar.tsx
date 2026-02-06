import { LayoutDashboard, Users, BookOpen, LogOut, Settings, CreditCard } from "lucide-react"
import Logo from "@/components/shared/Logo"

export function SchoolSidebar({ activeView, setActiveView, isSidebarOpen, user, logout }: any) {
  
  const SidebarItem = ({ id, icon, label }: any) => (
    <button 
      onClick={() => setActiveView(id)} 
      className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-all duration-200 
      ${activeView === id ? 'bg-indigo-50 text-indigo-700 shadow-sm' : 'text-slate-500 hover:bg-slate-50 hover:text-slate-900'}`}
    >
      {icon} {label}
    </button>
  )

  return (
    <aside className={`
      fixed inset-y-0 z-[60] w-64 bg-white flex flex-col 
      transition-transform duration-300 ease-in-out shadow-2xl lg:shadow-none

      /* --- LOGIKA MOBILE (HP): MUNCUL DARI KANAN --- */
      right-0 
      border-l border-slate-200
      ${isSidebarOpen ? 'translate-x-0' : 'translate-x-full'} 

      /* --- LOGIKA DESKTOP (LAPTOP): TETAP DI KIRI --- */
      lg:static lg:translate-x-0 lg:border-l-0 lg:border-r lg:left-0
    `}>
      
      {/* Header Sidebar */}
      <div className="h-20 border-b border-slate-100 hidden lg:flex items-center px-6 gap-3 shrink-0">
        {/* Menggunakan Komponen Logo Kita */}
        <Logo className="h-8" textSize="text-lg" withText={true} />
      </div>
      
      {/* Menu List */}
      <nav className="flex-1 p-4 space-y-1 overflow-y-auto mt-16 lg:mt-4">
        <p className="px-4 text-xs font-semibold text-slate-400 uppercase tracking-wider mb-2 mt-2">Menu Utama</p>
        <SidebarItem id="overview" icon={<LayoutDashboard size={20}/>} label="Overview" />
        <SidebarItem id="classes" icon={<BookOpen size={20}/>} label="Manajemen Kelas" />
        <SidebarItem id="teachers" icon={<Users size={20}/>} label="Data Guru" />
        <div className="my-4 border-t border-slate-100 mx-2"></div>
        <SidebarItem id="billing" icon={<CreditCard size={20}/>} label="Langganan" />
      </nav>

      {/* Footer User */}
      <div className="p-4 border-t border-slate-100 bg-slate-50 shrink-0">
        <div className="flex items-center gap-3 mb-4 px-2">
            <div className="w-10 h-10 rounded-full bg-indigo-100 flex items-center justify-center text-indigo-600 font-bold border border-indigo-200 shrink-0">
                {user?.name?.charAt(0) || "A"}
            </div>
            <div className="overflow-hidden min-w-0">
                <p className="text-sm font-bold text-slate-800 truncate">{user?.name}</p>
                <p className="text-xs text-slate-500 truncate">{user?.email}</p>
            </div>
        </div>
        <button onClick={logout} className="w-full flex items-center gap-3 px-3 py-2 text-sm font-medium text-red-600 rounded-lg hover:bg-white hover:shadow-sm transition-all border border-transparent hover:border-slate-200">
            <LogOut size={18} /> Keluar Aplikasi
        </button>
      </div>
    </aside>
  )
}