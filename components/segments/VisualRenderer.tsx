import Image from "next/image";
// Grade 6 Visuals
import { PlaceValueChart } from "./visuals/PlaceValueChart";
import { EquationView } from "./visuals/EquationView";
import { DecimalShiftAnimation } from "./visuals/DecimalShiftAnimation";
import { FractionToDecimalAnimation } from "./visuals/FractionToDecimalAnimation";
// Grade 1 Visuals (Refactored)
import { GridVisual } from "./visuals/GridVisual";
import { SummaryVisual } from "./visuals/SummaryVisual";
import { CardVisual } from "./visuals/CardVisual";
import { useState } from "react";


export function VisualRenderer({ visual }: { visual: any }) {
  const [imgSrc, setImgSrc] = useState(visual?.src);
  if (!visual) return null;

  switch (visual.type) {
    // --- GRADE 6 ---
    case 'chart_place_value': return <PlaceValueChart data={visual.data} highlight={visual.highlight} />;
    case 'equation': return <EquationView content={visual.content} color={visual.color} />;
    case 'animation_shift_decimal':
       return <DecimalShiftAnimation data={visual.data} />;

    // --- GRADE 1 ---
    case 'grid': return <GridVisual data={visual} />;
    case 'summary': return <SummaryVisual data={visual} />;
    case 'card': return <CardVisual data={visual} />;

    // --- UNIVERSAL ---
    case 'image':
      return (
        <div className="w-full h-full flex items-center justify-center animate-in slide-in-from-bottom-8 duration-700">
             <div className="relative w-[90%] h-[50vh] md:h-[60vh]">
                 {/* Gunakan tag img standar dengan onError handler agar lebih robust */}
                 {/* eslint-disable-next-line @next/next/no-img-element */}
                 <img 
                   src={imgSrc || "/images/placeholder.png"} // Pastikan ada file placeholder.png di public/images
                   alt="Visual" 
                   className="w-full h-full object-contain drop-shadow-2xl"
                   onError={() => {
                       console.warn("Gambar gagal dimuat:", visual.src);
                       setImgSrc("https://placehold.co/600x400/png?text=Gambar+Tidak+Ditemukan"); // Fallback online
                   }}
                 />
             </div>
        </div>
      );
    case 'animation_fraction_decimal':
      return <FractionToDecimalAnimation fraction={visual.fraction} decimal={visual.decimal} color={visual.color} />;

    default:
      return (
        <div className="p-4 bg-slate-100 text-slate-400 border border-slate-200 rounded-lg text-sm text-center italic">
          Visual tidak tersedia ({visual.type})
        </div>
      );
  }
}