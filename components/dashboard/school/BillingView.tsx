import { useState } from "react"
import { Check, CreditCard, Sparkles, Zap, ShieldCheck } from "lucide-react"
import { Button } from "@/components/ui/button"

export function BillingView({ subscribe, isLoading, subscription }: any) {
  // State Kalkulator
  const [selectedTier, setSelectedTier] = useState(9) // 9, 18, 36
  const [cycle, setCycle] = useState<'monthly' | 'yearly'>('monthly')

  // LOGIKA HARGA (Configurable Pricing)
  const basePrices: Record<number, number> = {
      9: 50000,
      18: 80000,  // Diskon volume (20% dari penambahan)
      36: 150000  // Estimasi volume lebih besar
  }

  const getPrice = () => {
      let base = basePrices[selectedTier]
      if (cycle === 'yearly') {
          // Rumus: (Harga Bulan x 12) - Diskon 10%
          return (base * 12) * 0.9 
      }
      return base
  }

  const formatRupiah = (num: number) => {
      return new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR', maximumFractionDigits: 0 }).format(num)
  }

  const finalPrice = getPrice()
  const isTrialActive = subscription === 'active' // Asumsi sederhana, realnya cek plan di DB

  return (
    <div className="space-y-8 animate-in fade-in pb-10 max-w-5xl mx-auto">
        
        {/* Header */}
        <div className="text-center pt-4 mb-8">
            <h1 className="text-3xl font-bold text-slate-900 mb-3">Kalkulator Langganan</h1>
            <p className="text-slate-500 text-lg">Sesuaikan jumlah kelas dan durasi langganan dengan kebutuhan sekolah Anda.</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
            
            {/* KOLOM KIRI: KONFIGURATOR */}
            <div className="lg:col-span-2 space-y-8">
                
                {/* 1. Pilih Durasi (Toggle) */}
                <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-sm">
                    <h3 className="font-bold text-slate-900 mb-4 flex items-center gap-2">
                        <span className="bg-indigo-100 text-indigo-700 w-6 h-6 rounded-full flex items-center justify-center text-xs">1</span>
                        Pilih Durasi
                    </h3>
                    <div className="flex bg-slate-100 p-1.5 rounded-xl">
                        <button 
                            onClick={() => setCycle('monthly')}
                            className={`flex-1 py-3 rounded-lg text-sm font-bold transition-all ${cycle === 'monthly' ? 'bg-white text-indigo-700 shadow-sm' : 'text-slate-500 hover:text-slate-700'}`}
                        >
                            Bulanan
                        </button>
                        <button 
                            onClick={() => setCycle('yearly')}
                            className={`flex-1 py-3 rounded-lg text-sm font-bold transition-all relative ${cycle === 'yearly' ? 'bg-white text-indigo-700 shadow-sm' : 'text-slate-500 hover:text-slate-700'}`}
                        >
                            Tahunan
                            <span className="absolute -top-2 -right-2 bg-green-500 text-white text-[10px] px-2 py-0.5 rounded-full">Hemat 10%</span>
                        </button>
                    </div>
                </div>

                {/* 2. Pilih Jumlah Kelas (Grid) */}
                <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-sm">
                    <h3 className="font-bold text-slate-900 mb-4 flex items-center gap-2">
                        <span className="bg-indigo-100 text-indigo-700 w-6 h-6 rounded-full flex items-center justify-center text-xs">2</span>
                        Pilih Kuota Kelas
                    </h3>
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                        {[9, 18, 36].map((tier) => (
                            <button
                                key={tier}
                                onClick={() => setSelectedTier(tier)}
                                className={`
                                    relative p-4 rounded-xl border-2 text-left transition-all
                                    ${selectedTier === tier 
                                        ? 'border-indigo-600 bg-indigo-50/50 ring-1 ring-indigo-600' 
                                        : 'border-slate-200 hover:border-indigo-300 bg-white'}
                                `}
                            >
                                <div className="text-2xl font-black text-slate-900 mb-1">{tier}</div>
                                <div className="text-xs font-bold text-slate-500 uppercase tracking-wider">Kelas</div>
                                {tier === 18 && <span className="absolute top-2 right-2 text-[10px] font-bold bg-orange-100 text-orange-700 px-2 py-0.5 rounded-full">Diskon Volume</span>}
                                {tier === 36 && <span className="absolute top-2 right-2 text-[10px] font-bold bg-green-100 text-green-700 px-2 py-0.5 rounded-full">Super Hemat</span>}
                            </button>
                        ))}
                    </div>
                    <p className="text-sm text-slate-500 mt-4">
                        *Setiap kelas menampung maksimal 36 siswa.
                    </p>
                </div>

                {/* Opsi Trial */}
                {!isTrialActive && (
                     <div className="bg-gradient-to-r from-slate-800 to-slate-900 p-6 rounded-3xl text-white flex flex-col sm:flex-row items-center justify-between gap-4 shadow-xl">
                        {/* BAGIAN KIRI: Tambahkan flex-1 agar mengisi ruang kosong, dan w-full agar rapi di mobile */}
                        <div className="flex items-center gap-4 flex-1 w-full sm:w-auto">
                            {/* Icon wrapper: shrink-0 agar icon tidak gepeng */}
                            <div className="p-3 bg-white/10 rounded-xl shrink-0">
                                <Sparkles className="text-yellow-400" />
                            </div>
                            <div>
                                <h3 className="font-bold text-lg">Coba Gratis (Trial)</h3>
                                <p className="text-slate-300 text-sm">Akses 2 Kelas selama 30 Hari.</p>
                            </div>
                        </div>

                        {/* BAGIAN KANAN (TOMBOL): Tambahkan shrink-0 dan sm:w-auto */}
                        <Button 
                            onClick={() => subscribe(2, 'trial')} 
                            variant="secondary" 
                            disabled={isLoading}
                            // w-full di mobile (agar mudah dipencet), sm:w-auto di desktop (agar pendek/compact)
                            // shrink-0 mencegah tombol mengecil jika teks di kiri panjang
                            className="bg-white text-slate-900 whitespace-nowrap font-bold hover:bg-slate-200 hover:shadow-lg transition-shadow w-full hover:border-slate-300 sm:w-auto shrink-0 p-1"
                        >
                            Ambil Trial
                        </Button>
                    </div>

                )}
            </div>

            {/* KOLOM KANAN: SUMMARY CART */}
            <div className="lg:col-span-1">
                <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-lg sticky top-6">
                    <h3 className="font-bold text-slate-900 mb-6 border-b border-slate-100 pb-4">Ringkasan Pesanan</h3>
                    
                    <div className="space-y-4 mb-8">
                        <div className="flex justify-between text-sm">
                            <span className="text-slate-500">Paket</span>
                            <span className="font-bold text-slate-900">Sekolah {cycle === 'yearly' ? 'Tahunan' : 'Bulanan'}</span>
                        </div>
                        <div className="flex justify-between text-sm">
                            <span className="text-slate-500">Kuota</span>
                            <span className="font-bold text-slate-900">{selectedTier} Kelas</span>
                        </div>
                        <div className="flex justify-between text-sm">
                            <span className="text-slate-500">Siswa / Kelas</span>
                            <span className="font-bold text-slate-900">36 Siswa</span>
                        </div>
                         <div className="flex justify-between text-sm">
                            <span className="text-slate-500">Guru</span>
                            <span className="font-bold text-slate-900">{selectedTier} Akun</span>
                        </div>
                        {cycle === 'yearly' && (
                             <div className="flex justify-between text-sm text-green-600 font-medium">
                                <span>Diskon Durasi</span>
                                <span>10% Applied</span>
                            </div>
                        )}
                    </div>

                    <div className="bg-slate-50 p-4 rounded-xl mb-6">
                        <p className="text-xs text-slate-500 mb-1">Total Pembayaran</p>
                        <div className="text-3xl font-black text-indigo-700">
                            {formatRupiah(finalPrice)}
                        </div>
                        <p className="text-xs text-slate-400 mt-1">/{cycle === 'yearly' ? 'tahun' : 'bulan'}</p>
                    </div>

                    <Button 
                        onClick={() => subscribe(selectedTier, cycle)} 
                        disabled={isLoading || subscription === 'active'}
                        className="w-full h-12 rounded-xl font-bold text-base bg-indigo-600 hover:bg-indigo-700 shadow-lg shadow-indigo-200"
                    >
                        {subscription === 'active' ? "Paket Sedang Aktif" : "Bayar Sekarang"}
                    </Button>
                    
                    <div className="mt-4 flex items-center justify-center gap-2 text-xs text-slate-400">
                        <ShieldCheck size={14}/> Pembayaran Aman & Instan
                    </div>
                </div>
            </div>

        </div>
    </div>
  )
}