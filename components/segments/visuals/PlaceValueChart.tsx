import { cn } from "@/lib/utils";

export function PlaceValueChart({ data, highlight = [] }: { data: any, highlight?: string[] }) {
  // Definisi Kolom
  const columns = [
    { key: "tens", label: "Puluhan", value: "10", color: "bg-emerald-100 text-emerald-800" },
    { key: "ones", label: "Satuan", value: "1", color: "bg-blue-100 text-blue-800" },
    { key: "comma", label: "", value: "", color: "bg-transparent", width: "w-4 md:w-8" }, // Kolom Separator
    { key: "tenths", label: "Persepuluhan", value: "1/10", color: "bg-indigo-100 text-indigo-800" },
    { key: "hundredths", label: "Perseratusan", value: "1/100", color: "bg-purple-100 text-purple-800" },
    { key: "thousandths", label: "Perseribu", value: "1/1000", color: "bg-pink-100 text-pink-800" },
  ];

  return (
    <div className="w-full overflow-hidden rounded-3xl border-2 border-slate-200 shadow-lg bg-white my-6">
      <div className="flex w-full text-center items-stretch">
        {columns.map((col) => {
           // KHUSUS TANDA KOMA
           if (col.key === "comma") {
               return (
                   <div key={col.key} className={`${col.width} flex flex-col justify-end pb-4 md:pb-6 items-center relative`}>
                       {/* Render Koma Besar di bagian bawah (sejajar angka) */}
                       <span className="text-4xl md:text-6xl font-black text-slate-800 translate-y-3">,</span>
                   </div>
               )
           }

           const isHighlighted = highlight.includes(col.key);
           
           return (
            <div key={col.key} className={`flex-1 flex flex-col group`}>
              {/* Header: Label & Nilai Pecahan */}
              <div className={`flex flex-col items-center justify-center py-3 md:py-4 border-b-2 border-white/50 ${col.color} ${isHighlighted ? 'brightness-95 ring-4 ring-inset ring-yellow-400 z-10' : ''}`}>
                <span className="text-[9px] md:text-[10px] font-bold uppercase tracking-widest opacity-70 mb-0.5">{col.label}</span>
                {/* TULISAN PECAHAN LEBIH BESAR */}
                <span className="text-sm md:text-xl font-black">{col.value}</span>
              </div>

              {/* Isi Angka */}
              <div className={`flex-1 flex items-center justify-center text-3xl md:text-5xl font-mono font-bold py-4 md:py-6 transition-colors ${isHighlighted ? 'bg-yellow-50 text-slate-900' : 'bg-slate-50 text-slate-600'}`}>
                {data[col.key] !== undefined ? data[col.key] : ""}
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}