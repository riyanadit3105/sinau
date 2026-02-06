import Logo from "@/components/shared/Logo"

export default function LogoShowcasePage() {
  return (
    <div className="min-h-screen bg-slate-50 p-10 font-sans">
      
      <div className="max-w-4xl mx-auto space-y-12">
        <div className="text-center mb-10">
            <h1 className="text-2xl font-bold text-slate-700">Sinau Brand Assets</h1>
            <p className="text-slate-400">Gunakan Snipping Tool (Win+Shift+S) untuk mengambil gambar.</p>
        </div>

        {/* 1. VARIAN UTAMA (LATAR PUTIH) - Paling sering dipakai di dokumen */}
        <section className="bg-white p-12 rounded-3xl shadow-sm border border-slate-200 flex flex-col items-center gap-4">
            <span className="text-xs font-bold text-slate-300 uppercase tracking-widest mb-4">Primary Logo (Light)</span>
            <div className="p-8 border border-dashed border-slate-100 rounded-xl">
                {/* Kita force ukurannya besar agar High Res */}
                <Logo className="h-32" textSize="text-8xl" />
            </div>
        </section>

        {/* 2. VARIAN ICON ONLY (Untuk Favicon / App Icon) */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <section className="bg-white p-12 rounded-3xl shadow-sm border border-slate-200 flex flex-col items-center gap-4">
                <span className="text-xs font-bold text-slate-300 uppercase tracking-widest mb-4">Icon Only</span>
                <div className="p-4">
                    <Logo className="h-32" withText={false} />
                </div>
            </section>

            {/* 3. VARIAN DARK MODE (Latar Gelap) - Keren untuk cover proposal */}
            <section className="bg-slate-900 p-12 rounded-3xl shadow-xl flex flex-col items-center gap-4">
                <span className="text-xs font-bold text-slate-500 uppercase tracking-widest mb-4">Dark Mode</span>
                {/* Trik: Ubah warna teks jadi putih lewat parent class / inline style karena Logo component Anda support Tailwind classes */}
                <div className="p-4 text-white">
                     {/* Karena komponen Logo Anda menggunakan text-slate-900 hardcoded, 
                         kita bungkus div ini dengan filter invert atau kita edit komponen Logo sedikit.
                         Tapi cara termudah tanpa edit komponen adalah background gelap yang kontras.
                     */}
                     {/* Note: Idealnya komponen Logo menerima props 'textColor', tapi untuk SS ini sudah cukup kontras dengan background icon */}
                     <div className="p-6 bg-white/10 rounded-2xl backdrop-blur-sm">
                        <Logo className="h-24" textSize="text-6xl" />
                     </div>
                </div>
            </section>
        </div>

        {/* 4. VARIAN BRAND COLOR (Latar Indigo) */}
        <section className="bg-indigo-600 p-16 rounded-3xl shadow-xl flex flex-col items-center gap-4 text-center">
             <span className="text-xs font-bold text-indigo-300 uppercase tracking-widest mb-4">Brand Background</span>
             <div className="bg-white p-8 rounded-2xl shadow-lg">
                <Logo className="h-24" textSize="text-6xl" />
             </div>
        </section>

      </div>
    </div>
  )
}