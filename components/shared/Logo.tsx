import React from 'react';

interface LogoProps {
  className?: string;     // Kelas tambahan untuk container
  withText?: boolean;     // Tampilkan teks "Sinau"?
  iconOnly?: boolean;     // (Opsional) Jika true, matikan teks paksa
  textSize?: string;      // (Opsional) Ukuran teks, misal "text-xl"
}

export default function Logo({ 
  className = "h-10", 
  withText = true,
  textSize = "text-2xl" 
}: LogoProps) {
  
  // Palet Warna Tema Sinau (Sesuai Tailwind Standard)
  const colors = {
    indigo: "#4F46E5", // Brand Utama
    emerald: "#10B981", // Nuansa Alam/Konkret
    amber: "#F59E0B",   // Nuansa Emas/Prestasi (Gamification)
    white: "#FFFFFF"
  };

  return (
    <div className={`flex items-center gap-2.5 select-none ${className}`}>
      
      {/* --- LOGO SVG (Filosofi CPA: Concrete, Pictorial, Abstract) --- */}
      <svg
        viewBox="0 0 100 100"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="h-full w-auto drop-shadow-sm"
        aria-label="Logo Sinau"
      >
        {/* 1. Concrete (Bawah Kiri) - Indigo (Brand) */}
        {/* Mewakili benda nyata/manipulatif */}
        <rect x="10" y="55" width="35" height="35" rx="8" fill={colors.indigo} />
        {/* Detail tekstur balok */}
        <path d="M10 63C10 58.5817 13.5817 55 18 55H45V75H10V63Z" fill="white" fillOpacity="0.2" />

        {/* 2. Pictorial (Tengah) - Emerald (Growth/Green) */}
        {/* Mewakili gambar visual */}
        <rect x="32" y="32" width="35" height="35" rx="8" fill={colors.emerald} />
        {/* Ikon lingkaran sederhana */}
        <circle cx="49.5" cy="49.5" r="8" stroke="white" strokeWidth="3" fill="none" />

        {/* 3. Abstract (Atas Kanan) - Amber (Gold/Star) */}
        {/* Mewakili simbol matematika */}
        <rect x="55" y="10" width="35" height="35" rx="8" fill={colors.amber} />
        {/* Simbol garis/simbolik */}
        <path 
          d="M68 22L77 32M77 22L68 32" 
          stroke="white" 
          strokeWidth="4" 
          strokeLinecap="round" 
        />
      </svg>
      
      {/* --- TEKS BRANDING --- */}
      {withText && (
        <span className={`font-black tracking-tight text-slate-900 ${textSize} leading-none`}>
          Sinau<span className="text-indigo-600">.</span>
        </span>
      )}
    </div>
  );
};