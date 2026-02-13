import { useState } from "react"
import { Check, CreditCard, Sparkles, Zap, ShieldCheck, Tag } from "lucide-react"
import { Button } from "@/components/ui/button"

export function BillingView({ subscribe, isLoading, subscription }: any) {
  const [selectedTier, setSelectedTier] = useState(9)
  const [cycle, setCycle] = useState<'monthly' | 'yearly'>('monthly')

  // LOGIKA HARGA ASLI (Sebelum Diskon)
  const marketValue: Record<number, number> = {
      9: 300000,
      18: 600000,
      36: 900000
  }

  // DEFINISI DISKON PER TIER
  const tierDiscounts: Record<number, number> = {
      9: 0.5,  // 50%
      18: 0.5, // 50%
      36: 0.5  // 60% (Kelas Besar lebih untung)
  }

  const getPrice = () => {
      // 1. Ambil Harga Pasar
      const base = marketValue[selectedTier]
      // 2. Terapkan Diskon Tier
      let discounted = base * (1 - tierDiscounts[selectedTier])
      
      if (cycle === 'yearly') {
          // 3. Terapkan Diskon Tahunan (+10% dari harga yang sudah didiskon)
          return (discounted * 12) * 0.9 
      }
      return discounted
  }

  const formatRupiah = (num: number) => {
      return new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR', maximumFractionDigits: 0 }).format(num)
  }

  const finalPrice = getPrice()
  const isTrialActive = subscription === 'active'

  return (
    <div className="space-y-8 animate-in fade-in pb-10 max-w-5xl mx-auto px-4">
        {/* Header */}
        <div className="text-center pt-4 mb-8">
            <h1 className="text-4xl font-black text-slate-900 mb-3 italic uppercase tracking-tighter">Langganan Sinau</h1>
            <p className="text-slate-500 text-lg">Investasi teknologi matematika terbaik</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
            
            {/* KOLOM KIRI: KONFIGURATOR */}
            <div className="lg:col-span-2 space-y-8">
                
                {/* 1. Pilih Durasi */}
                <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-sm">
                    <h3 className="font-bold text-slate-900 mb-4 flex items-center gap-2">
                        <span className="bg-indigo-600 text-white w-6 h-6 rounded-full flex items-center justify-center text-[10px]">1</span>
                        DURASI LANGGANAN
                    </h3>
                    <div className="flex bg-slate-100 p-1.5 rounded-2xl">
                        <button 
                            onClick={() => setCycle('monthly')}
                            className={`flex-1 py-3 rounded-xl text-sm font-bold transition-all ${cycle === 'monthly' ? 'bg-white text-indigo-700 shadow-sm' : 'text-slate-500 hover:text-slate-700'}`}
                        >
                            Bulanan
                        </button>
                        <button 
                            onClick={() => setCycle('yearly')}
                            className={`flex-1 py-3 rounded-xl text-sm font-bold transition-all relative ${cycle === 'yearly' ? 'bg-white text-indigo-700 shadow-sm' : 'text-slate-500 hover:text-slate-700'}`}
                        >
                            Tahunan
                            <span className="absolute -top-3 -right-2 bg-green-500 text-white text-[10px] px-3 py-1 rounded-full shadow-md font-black italic">
                                +10% OFF
                            </span>
                        </button>
                    </div>
                </div>

                {/* 2. Pilih Jumlah Kelas */}
                <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-sm">
                    <h3 className="font-bold text-slate-900 mb-4 flex items-center gap-2">
                        <span className="bg-indigo-600 text-white w-6 h-6 rounded-full flex items-center justify-center text-[10px]">2</span>
                        KUOTA KELAS
                    </h3>
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                        {[9, 18, 36].map((tier) => {
                            const discount = tierDiscounts[tier] * 100;
                            const isSelected = selectedTier === tier;
                            return (
                                <button
                                    key={tier}
                                    onClick={() => setSelectedTier(tier)}
                                    className={`
                                        relative p-5 rounded-2xl border-2 text-left transition-all overflow-hidden
                                        ${isSelected 
                                            ? 'border-indigo-600 bg-indigo-50/50 ring-2 ring-indigo-100' 
                                            : 'border-slate-100 hover:border-indigo-300 bg-white'}
                                    `}
                                >
                                    {/* Badge Diskon */}
                                    <div className={`absolute -right-6 top-2 rotate-45 text-[9px] font-black py-1 px-8 ${isSelected ? 'bg-indigo-600 text-white' : 'bg-slate-200 text-slate-500'}`}>
                                        SAVE {discount}%
                                    </div>

                                    <div className="text-3xl font-black text-slate-900 mb-1">{tier}</div>
                                    <div className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-3">Kelas</div>
                                    
                                    <div className="space-y-1">
                                        <div className="text-[10px] text-slate-400 line-through decoration-red-400 font-bold">
                                            {formatRupiah(marketValue[tier])}
                                        </div>
                                        <div className="text-sm font-black text-indigo-600">
                                            {formatRupiah(marketValue[tier] * (1 - tierDiscounts[tier]))}
                                            <span className="text-[10px] font-normal text-slate-400">/bln</span>
                                        </div>
                                    </div>
                                </button>
                            )
                        })}
                    </div>
                </div>

                {/* Opsi Trial */}
                {!isTrialActive && (
                     <div className="bg-slate-900 p-6 rounded-3xl text-white flex flex-col sm:flex-row items-center justify-between gap-4 shadow-2xl relative overflow-hidden">
                        <div className="absolute top-0 right-0 w-32 h-32 bg-indigo-500/10 rounded-full -mr-16 -mt-16"></div>
                        <div className="flex items-center gap-4 flex-1 w-full sm:w-auto z-10">
                            <div className="p-3 bg-indigo-500 rounded-xl shrink-0 shadow-lg shadow-indigo-500/20">
                                <Sparkles className="text-yellow-300" />
                            </div>
                            <div>
                                <h3 className="font-bold text-lg">Paket Trial</h3>
                                <p className="text-slate-400 text-sm italic">Coba full fitur di 2 Kelas selama 30 Hari.</p>
                            </div>
                        </div>

                        <Button 
                            onClick={() => subscribe(2, 'trial')} 
                            variant="secondary" 
                            disabled={isLoading}
                            className="bg-white text-slate-900 font-black px-8 hover:bg-indigo-50 transition-all w-full sm:w-auto shrink-0 z-10"
                        >
                            AMBIL TRIAL
                        </Button>
                    </div>
                )}
            </div>

            {/* KOLOM KANAN: SUMMARY CART */}
            <div className="lg:col-span-1">
                <div className="bg-white p-8 rounded-3xl border-2 border-slate-100 shadow-xl sticky top-6">
                    <h3 className="font-black text-slate-900 mb-6 border-b border-slate-100 pb-4 tracking-tight">RINGKASAN PESANAN</h3>
                    
                    <div className="space-y-4 mb-8">
                        <div className="flex justify-between text-sm">
                            <span className="text-slate-500 font-medium">Paket</span>
                            <span className="font-bold text-slate-900">Sekolah {cycle === 'yearly' ? 'Tahunan' : 'Bulanan'}</span>
                        </div>
                        <div className="flex justify-between text-sm">
                            <span className="text-slate-500 font-medium">Kuota</span>
                            <span className="font-bold text-slate-900">{selectedTier} Kelas</span>
                        </div>
                        <div className="flex justify-between text-sm">
                            <span className="text-slate-500 font-medium">Guru</span>
                            <span className="font-bold text-slate-900">Akses {selectedTier} Guru</span>
                        </div>
                        
                        {/* Breakdown Diskon */}
                        <div className="pt-4 mt-4 border-t border-slate-50 space-y-2">
                             <div className="flex justify-between text-[11px] text-green-600 font-bold">
                                <span>Hemat ({tierDiscounts[selectedTier] * 100}%)</span>
                                <span>- {formatRupiah(marketValue[selectedTier] * tierDiscounts[selectedTier])}</span>
                            </div>
                            {cycle === 'yearly' && (
                                 <div className="flex justify-between text-[11px] text-green-600 font-bold">
                                    <span>Diskon Tahunan (+10%)</span>
                                    <span>Applied</span>
                                </div>
                            )}
                        </div>
                    </div>

                    <div className="bg-indigo-50 p-5 rounded-2xl mb-8 border border-indigo-100">
                        <p className="text-[10px] font-black text-indigo-400 uppercase tracking-widest mb-1">Total Pembayaran</p>
                        <div className="text-4xl font-black text-indigo-700 tracking-tighter">
                            {formatRupiah(finalPrice)}
                        </div>
                    </div>

                    <Button 
                        onClick={() => subscribe(selectedTier, cycle)} 
                        disabled={isLoading || subscription === 'active'}
                        className="w-full h-14 rounded-2xl font-black text-lg bg-indigo-600 hover:bg-indigo-700 shadow-xl shadow-indigo-100 transition-all active:scale-95"
                    >
                        {subscription === 'active' ? "PAKET AKTIF" : "BAYAR SEKARANG"}
                    </Button>
                </div>
            </div>

        </div>
    </div>
  )
}