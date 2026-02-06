import React from 'react';

// ==========================================
// KELOMPOK 1: THE ORIGINALS (1-4 DITAHAN)
// ==========================================

const LogoCPA = ({ className }: { className?: string }) => (
  <svg viewBox="0 0 100 100" fill="none" className={className}>
    <rect x="10" y="55" width="35" height="35" rx="8" fill="#4F46E5" />
    <path d="M10 63C10 58.5817 13.5817 55 18 55H45V75H10V63Z" fill="white" fillOpacity="0.2" />
    <rect x="32" y="32" width="35" height="35" rx="8" fill="#10B981" />
    <circle cx="49.5" cy="49.5" r="8" stroke="white" strokeWidth="3" fill="none" />
    <rect x="55" y="10" width="35" height="35" rx="8" fill="#F59E0B" />
    <path d="M68 22L77 32M77 22L68 32" stroke="white" strokeWidth="4" strokeLinecap="round" />
  </svg>
);

const LogoBars = ({ className }: { className?: string }) => (
  <svg viewBox="0 0 100 100" fill="none" className={className}>
     <rect x="15" y="60" width="20" height="30" rx="6" fill="#4F46E5" />
     <rect x="40" y="40" width="20" height="50" rx="6" fill="#10B981" />
     <rect x="65" y="20" width="20" height="70" rx="6" fill="#F59E0B" />
     <path d="M75 5L77 12H84L78 16L80 23L75 19L70 23L72 16L66 12H73L75 5Z" fill="#F59E0B" />
  </svg>
);

const LogoGamePad = ({ className }: { className?: string }) => (
  <svg viewBox="0 0 100 100" fill="none" className={className}>
     <rect x="10" y="30" width="80" height="45" rx="22.5" fill="#4F46E5" />
     <circle cx="30" cy="52.5" r="10" fill="white" fillOpacity="0.2" />
     <path d="M25 52.5H35M30 47.5V57.5" stroke="white" strokeWidth="4" strokeLinecap="round" />
     <circle cx="70" cy="52.5" r="8" fill="#F59E0B" />
     <circle cx="70" cy="52.5" r="12" stroke="#10B981" strokeWidth="3" />
  </svg>
);

const LogoTangram = ({ className }: { className?: string }) => (
  <svg viewBox="0 0 100 100" fill="none" className={className}>
     <path d="M40 30L70 30L70 80L40 80Z" fill="#4F46E5" />
     <path d="M40 30L55 5L70 30H40Z" fill="#F59E0B" />
     <path d="M30 80L40 60V80H30Z" fill="#10B981" />
     <path d="M80 80L70 60V80H80Z" fill="#10B981" />
     <circle cx="55" cy="50" r="8" fill="white" />
  </svg>
);

// ==========================================
// KELOMPOK 2: THE "S" CONCEPTS (Sinau + Math)
// ==========================================

// 5. ISOMETRIC S-BLOCK (Concrete CPA)
const LogoIsoBlockS = ({ className }: { className?: string }) => (
  <svg viewBox="0 0 100 100" fill="none" className={className}>
    <path d="M50 15L75 27.5V52.5L50 65L25 52.5V27.5L50 15Z" fill="#4F46E5" opacity="0.5"/>
    {/* Top Block */}
    <path d="M50 15L75 27.5L50 40L25 27.5L50 15Z" fill="#6366F1" />
    {/* Middle S Path - using blocks */}
    <path d="M75 27.5V52.5L50 65L50 40L75 27.5Z" fill="#4338CA" /> 
    <path d="M25 52.5L50 65V90L25 77.5V52.5Z" fill="#F59E0B" /> 
    <path d="M50 65L75 52.5V77.5L50 90L50 65Z" fill="#10B981" />
  </svg>
);

// 6. FUNCTION CURVE (Abstract Math + S)
const LogoFunctionS = ({ className }: { className?: string }) => (
  <svg viewBox="0 0 100 100" fill="none" className={className}>
    {/* Grid Background */}
    <path d="M20 20V80H80" stroke="#CBD5E1" strokeWidth="2" strokeLinecap="round"/>
    {/* The S Curve Graph */}
    <path d="M25 75C40 75 40 25 75 25" stroke="#4F46E5" strokeWidth="8" strokeLinecap="round" />
    {/* Points */}
    <circle cx="25" cy="75" r="5" fill="#F59E0B" />
    <circle cx="50" cy="50" r="5" fill="#10B981" />
    <circle cx="75" cy="25" r="5" fill="#F59E0B" />
  </svg>
);

// 7. GOLDEN RATIO S (Geometry Beauty)
const LogoGoldenS = ({ className }: { className?: string }) => (
  <svg viewBox="0 0 100 100" fill="none" className={className}>
    <rect x="20" y="20" width="60" height="60" rx="4" stroke="#4F46E5" strokeWidth="2" strokeOpacity="0.3"/>
    <path d="M80 20C46.8629 20 20 46.8629 20 80" stroke="#4F46E5" strokeWidth="6" strokeLinecap="round"/>
    <path d="M80 80C80 46.8629 53.1371 20 20 20" stroke="#F59E0B" strokeWidth="0" /> 
    <path d="M80 50C80 66.5685 66.5685 80 50 80" stroke="#10B981" strokeWidth="6" strokeLinecap="round"/>
    <circle cx="50" cy="50" r="4" fill="#F59E0B" />
  </svg>
);

// 8. PIXEL SNAKE (Game Retro S)
const LogoPixelSnake = ({ className }: { className?: string }) => (
  <svg viewBox="0 0 100 100" fill="none" className={className}>
    <rect x="60" y="20" width="20" height="20" fill="#4F46E5" />
    <rect x="40" y="20" width="20" height="20" fill="#4F46E5" />
    <rect x="20" y="20" width="20" height="20" fill="#4F46E5" />
    <rect x="20" y="40" width="20" height="20" fill="#4F46E5" />
    <rect x="20" y="60" width="20" height="20" fill="#10B981" />
    <rect x="40" y="60" width="20" height="20" fill="#10B981" />
    <rect x="60" y="60" width="20" height="20" fill="#F59E0B" />
    <rect x="60" y="80" width="20" height="20" fill="#F59E0B" />
    <path d="M72 85L78 85" stroke="white" strokeWidth="2"/> {/* Snake Tongue/Eye */}
  </svg>
);

// ==========================================
// KELOMPOK 3: GAMIFICATION & REWARD
// ==========================================

// 9. THE SUMMATION SHIELD (Hero Badge)
const LogoSigmaShield = ({ className }: { className?: string }) => (
  <svg viewBox="0 0 100 100" fill="none" className={className}>
    <path d="M50 90L20 75V25L50 10L80 25V75L50 90Z" fill="#4F46E5" />
    {/* Sigma Symbol */}
    <path d="M65 30H35L50 50L35 70H65" stroke="white" strokeWidth="6" strokeLinecap="round" strokeLinejoin="round"/>
    <circle cx="50" cy="20" r="3" fill="#F59E0B" />
  </svg>
);

// 10. PERCENTAGE COIN (Economy/Reward)
const LogoPercentCoin = ({ className }: { className?: string }) => (
  <svg viewBox="0 0 100 100" fill="none" className={className}>
    <circle cx="50" cy="50" r="40" fill="#F59E0B" />
    <circle cx="50" cy="50" r="32" stroke="#FDE68A" strokeWidth="2" strokeDasharray="4 4"/>
    {/* Percent Sign Layout */}
    <circle cx="35" cy="35" r="8" fill="#4F46E5"/>
    <circle cx="65" cy="65" r="8" fill="#10B981"/>
    <path d="M65 30L35 70" stroke="white" strokeWidth="6" strokeLinecap="round"/>
  </svg>
);

// 11. CUBE MATRIX (Problem Solving)
const LogoCubeMatrix = ({ className }: { className?: string }) => (
  <svg viewBox="0 0 100 100" fill="none" className={className}>
    <rect x="20" y="20" width="60" height="60" rx="8" fill="#1E293B" />
    <rect x="28" y="28" width="18" height="18" rx="4" fill="#4F46E5" />
    <rect x="54" y="28" width="18" height="18" rx="4" fill="#334155" />
    <rect x="28" y="54" width="18" height="18" rx="4" fill="#334155" />
    <rect x="54" y="54" width="18" height="18" rx="4" fill="#10B981" />
    {/* Connecting path */}
    <path d="M46 37H54M37 46V54" stroke="white" strokeWidth="2" strokeLinecap="round" />
  </svg>
);

// 12. TARGET PARABOLA (Precision)
const LogoTarget = ({ className }: { className?: string }) => (
  <svg viewBox="0 0 100 100" fill="none" className={className}>
    <circle cx="50" cy="50" r="35" stroke="#E2E8F0" strokeWidth="4" />
    <circle cx="50" cy="50" r="25" stroke="#4F46E5" strokeWidth="4" />
    <circle cx="50" cy="50" r="10" fill="#F59E0B" />
    {/* Trajectory */}
    <path d="M10 80Q50 10 90 80" stroke="#10B981" strokeWidth="4" strokeDasharray="6 6"/>
  </svg>
);

// ==========================================
// KELOMPOK 4: MATH & CPA DEEP DIVE
// ==========================================

// 13. VENN CONTROLLER (Set Theory + Play)
const LogoVennPlay = ({ className }: { className?: string }) => (
  <svg viewBox="0 0 100 100" fill="none" className={className}>
    <circle cx="35" cy="50" r="30" fill="#4F46E5" fillOpacity="0.8" />
    <circle cx="65" cy="50" r="30" fill="#10B981" fillOpacity="0.8" />
    {/* Intersection Area */}
    <path d="M50 35L60 50L50 65V35Z" fill="white" /> 
    <path d="M50 35L40 50L50 65" fill="white" fillOpacity="0.5"/> 
  </svg>
);

// 14. DIVISION QUEST (Operations)
const LogoDivisionQuest = ({ className }: { className?: string }) => (
  <svg viewBox="0 0 100 100" fill="none" className={className}>
    <rect x="20" y="45" width="60" height="10" rx="5" fill="#4F46E5" />
    <circle cx="50" cy="25" r="10" fill="#F59E0B" />
    <circle cx="50" cy="75" r="10" fill="#10B981" />
    {/* Glint */}
    <circle cx="53" cy="22" r="3" fill="white" fillOpacity="0.5"/>
  </svg>
);

// 15. FRACTION PIE (Visual Math)
const LogoFractionPie = ({ className }: { className?: string }) => (
  <svg viewBox="0 0 100 100" fill="none" className={className}>
    <circle cx="50" cy="50" r="40" fill="#E2E8F0" />
    <path d="M50 50L50 10A40 40 0 0 1 90 50Z" fill="#F59E0B" />
    <path d="M50 50L90 50A40 40 0 0 1 50 90Z" fill="#10B981" />
    <path d="M50 50L50 90A40 40 0 0 1 10 50Z" fill="#4F46E5" />
    {/* Center Dot */}
    <circle cx="50" cy="50" r="5" fill="white" />
  </svg>
);

// 16. BRACKET CODE (Logic/Algebra)
const LogoBracketBox = ({ className }: { className?: string }) => (
  <svg viewBox="0 0 100 100" fill="none" className={className}>
    <path d="M35 20H25C20 20 15 25 15 30V70C15 75 20 80 25 80H35" stroke="#4F46E5" strokeWidth="6" strokeLinecap="round"/>
    <path d="M65 20H75C80 20 85 25 85 30V70C85 75 80 80 75 80H65" stroke="#4F46E5" strokeWidth="6" strokeLinecap="round"/>
    <rect x="35" y="35" width="30" height="30" rx="6" fill="#F59E0B" />
    <path d="M45 50H55" stroke="white" strokeWidth="4" strokeLinecap="round"/>
  </svg>
);

// ==========================================
// KELOMPOK 5: ABSTRACT & FUTURE
// ==========================================

// 17. INFINITY LOOP CONTROLLER (Endless Learning)
const LogoInfinityPad = ({ className }: { className?: string }) => (
  <svg viewBox="0 0 100 100" fill="none" className={className}>
    <path d="M30 50C30 35 45 35 50 50C55 65 70 65 70 50C70 35 55 35 50 50C45 65 30 65 30 50Z" stroke="#4F46E5" strokeWidth="12" strokeLinecap="round"/>
    <circle cx="30" cy="50" r="5" fill="#F59E0B" />
    <circle cx="70" cy="50" r="5" fill="#10B981" />
  </svg>
);

// 18. TANGRAM ROCKET 2 (Exploration)
const LogoTangramFly = ({ className }: { className?: string }) => (
  <svg viewBox="0 0 100 100" fill="none" className={className}>
     <path d="M20 80L50 50L40 20L20 80Z" fill="#4F46E5" /> {/* Body */}
     <path d="M50 50L80 20L80 50L50 50Z" fill="#F59E0B" /> {/* Wing */}
     <path d="M50 50L60 80L80 80L50 50Z" fill="#10B981" /> {/* Tail */}
     <circle cx="40" cy="40" r="4" fill="white" fillOpacity="0.5"/>
  </svg>
);

// 19. GRAPH NODE NETWORK (Connected Knowledge)
const LogoNodeNet = ({ className }: { className?: string }) => (
  <svg viewBox="0 0 100 100" fill="none" className={className}>
    <line x1="25" y1="75" x2="50" y2="25" stroke="#CBD5E1" strokeWidth="4" />
    <line x1="75" y1="75" x2="50" y2="25" stroke="#CBD5E1" strokeWidth="4" />
    <line x1="25" y1="75" x2="75" y2="75" stroke="#CBD5E1" strokeWidth="4" />
    
    <circle cx="50" cy="25" r="12" fill="#4F46E5" />
    <text x="50" y="30" textAnchor="middle" fill="white" fontSize="14" fontWeight="bold">?</text>
    
    <circle cx="25" cy="75" r="10" fill="#10B981" />
    <circle cx="75" cy="75" r="10" fill="#F59E0B" />
  </svg>
);

// 20. ABACUS SLIDER (Traditional + Digital)
const LogoAbacus = ({ className }: { className?: string }) => (
  <svg viewBox="0 0 100 100" fill="none" className={className}>
    <rect x="15" y="20" width="70" height="60" rx="4" stroke="#475569" strokeWidth="4" />
    <line x1="15" y1="40" x2="85" y2="40" stroke="#94A3B8" strokeWidth="2" />
    <line x1="15" y1="60" x2="85" y2="60" stroke="#94A3B8" strokeWidth="2" />
    
    <rect x="30" y="35" width="10" height="10" rx="3" fill="#4F46E5" />
    <rect x="45" y="35" width="10" height="10" rx="3" fill="#4F46E5" />
    <rect x="60" y="55" width="10" height="10" rx="3" fill="#F59E0B" />
    <rect x="70" y="55" width="10" height="10" rx="3" fill="#10B981" />
  </svg>
);


// 21. TETRO BLOCKS S (Classic Puzzle)
const LogoTetroS = ({ className }: { className?: string }) => (
  <svg viewBox="0 0 100 100" fill="none" className={className}>
    {/* Bentuk S dari blok Tetris */}
    <rect x="50" y="25" width="25" height="25" rx="4" fill="#F59E0B" stroke="white" strokeWidth="2"/>
    <rect x="25" y="25" width="25" height="25" rx="4" fill="#10B981" stroke="white" strokeWidth="2"/>
    <rect x="25" y="50" width="25" height="25" rx="4" fill="#4F46E5" stroke="white" strokeWidth="2"/>
    <rect x="50" y="50" width="25" height="25" rx="4" fill="#F59E0B" stroke="white" strokeWidth="2"/> {/* Center pivot */}
    <rect x="50" y="75" width="25" height="25" rx="4" fill="#10B981" stroke="white" strokeWidth="2"/>
    <rect x="75" y="50" width="25" height="25" rx="4" fill="#4F46E5" stroke="white" strokeWidth="2"/>
  </svg>
);

// 22. LEVEL MAP S (Learning Path)
const LogoLevelMap = ({ className }: { className?: string }) => (
  <svg viewBox="0 0 100 100" fill="none" className={className}>
    {/* Garis putus-putus membentuk S */}
    <path d="M70 25C40 25 40 50 70 50C85 50 85 75 55 75H30" stroke="#CBD5E1" strokeWidth="4" strokeDasharray="6 6" strokeLinecap="round"/>
    
    {/* Node Level */}
    <circle cx="70" cy="25" r="8" fill="#10B981" />
    <circle cx="55" cy="50" r="8" fill="#F59E0B" />
    <circle cx="30" cy="75" r="8" fill="#4F46E5" />
    
    {/* Player Icon (Triangle) */}
    <path d="M55 45L60 55H50L55 45Z" fill="white" />
  </svg>
);

// 23. CALCULATOR SEGMENT S (Digital Math)
const LogoCalcS = ({ className }: { className?: string }) => (
  <svg viewBox="0 0 100 100" fill="none" className={className}>
    {/* Seven Segment Display Style forming '5' or 'S' */}
    <path d="M30 20H70" stroke="#4F46E5" strokeWidth="8" strokeLinecap="round"/> {/* Top */}
    <path d="M30 20V50" stroke="#4F46E5" strokeWidth="8" strokeLinecap="round"/> {/* Top Left */}
    <path d="M30 50H70" stroke="#10B981" strokeWidth="8" strokeLinecap="round"/> {/* Middle */}
    <path d="M70 50V80" stroke="#F59E0B" strokeWidth="8" strokeLinecap="round"/> {/* Bottom Right */}
    <path d="M30 80H70" stroke="#F59E0B" strokeWidth="8" strokeLinecap="round"/> {/* Bottom */}
  </svg>
);

// 24. DOUBLE CHECK S (Success/Correct)
const LogoDoubleCheck = ({ className }: { className?: string }) => (
  <svg viewBox="0 0 100 100" fill="none" className={className}>
    {/* Dua centang yang disusun membentuk alur S */}
    <path d="M25 45L45 65L80 30" stroke="#E2E8F0" strokeWidth="6" strokeLinecap="round" opacity="0.3"/>
    
    {/* Centang Atas (Hijau) */}
    <path d="M40 30L55 45L75 25" stroke="#10B981" strokeWidth="8" strokeLinecap="round" strokeLinejoin="round"/>
    {/* Centang Bawah (Indigo - Inverted visual flow) */}
    <path d="M25 75L40 90L60 70" stroke="#4F46E5" strokeWidth="8" strokeLinecap="round" strokeLinejoin="round"/>
    
    {/* Connecting visual flow */}
    <path d="M55 45C55 60 40 70 40 90" stroke="#F59E0B" strokeWidth="2" strokeDasharray="4 4"/>
  </svg>
);

// 25. MAZE RUNNER S (Logic/Thinking)
const LogoMazeS = ({ className }: { className?: string }) => (
  <svg viewBox="0 0 100 100" fill="none" className={className}>
    <rect x="20" y="20" width="60" height="60" rx="8" stroke="#4F46E5" strokeWidth="4"/>
    {/* Dinding Maze membentuk S */}
    <path d="M80 35H40V50H60V65H20" stroke="#4F46E5" strokeWidth="4" strokeLinecap="square"/>
    {/* Titik Start & End */}
    <circle cx="60" cy="35" r="4" fill="#F59E0B"/>
    <circle cx="40" cy="65" r="4" fill="#10B981"/>
  </svg>
);

// 26. BOOK STACK S (Library/Knowledge)
const LogoBookStackS = ({ className }: { className?: string }) => (
  <svg viewBox="0 0 100 100" fill="none" className={className}>
    {/* Buku Atas (Geser Kanan) */}
    <rect x="40" y="20" width="40" height="12" rx="2" fill="#F59E0B" />
    {/* Buku Tengah (Geser Kiri) */}
    <rect x="20" y="35" width="40" height="12" rx="2" fill="#10B981" />
    {/* Buku Bawah (Geser Kanan) */}
    <rect x="40" y="50" width="40" height="12" rx="2" fill="#4F46E5" />
    {/* Buku Dasar (Geser Kiri) */}
    <rect x="20" y="65" width="40" height="12" rx="2" fill="#6366F1" />
    
    {/* Visual Guide Curve */}
    <path d="M85 26C95 26 95 60 50 60C10 60 10 70 15 70" stroke="black" strokeOpacity="0.1" strokeWidth="2" strokeDasharray="2 2"/>
  </svg>
);

// 27. ROCKET TRAIL S (Action/Speed)
const LogoRocketTrail = ({ className }: { className?: string }) => (
  <svg viewBox="0 0 100 100" fill="none" className={className}>
    {/* Roket Kecil */}
    <path d="M70 20L80 30L75 35L65 25L70 20Z" fill="#F59E0B" />
    {/* Asap membentuk huruf S */}
    <path d="M65 25C50 10 30 30 50 50C70 70 50 90 30 80" stroke="#4F46E5" strokeWidth="6" strokeLinecap="round"/>
    <circle cx="30" cy="80" r="3" fill="#10B981"/> {/* Start Point */}
    {/* Bintang */}
    <path d="M20 30L22 32M80 70L82 72" stroke="#CBD5E1" strokeWidth="2"/>
  </svg>
);

// 28. CIRCUIT TECH S (Modern/Coding)
const LogoCircuitS = ({ className }: { className?: string }) => (
  <svg viewBox="0 0 100 100" fill="none" className={className}>
    {/* Jalur PCB membentuk S */}
    <path d="M70 25H40C30 25 30 35 40 45H60C70 45 70 55 60 65H30" stroke="#10B981" strokeWidth="4" strokeLinecap="round"/>
    <circle cx="70" cy="25" r="6" stroke="#4F46E5" strokeWidth="3" fill="white"/>
    <circle cx="30" cy="65" r="6" fill="#F59E0B"/>
    {/* Dekorasi Chip */}
    <rect x="45" y="40" width="10" height="10" fill="#4F46E5" rx="1"/>
  </svg>
);

// 29. PAPER ORIGAMI S (Hands-on Math)
const LogoOrigamiS = ({ className }: { className?: string }) => (
  <svg viewBox="0 0 100 100" fill="none" className={className}>
    {/* Lipatan Kertas */}
    <path d="M60 20L30 20L50 50L20 80H50L80 50L60 20Z" fill="#E0E7FF"/> {/* Back shadow */}
    <path d="M60 20L50 50L80 50L60 20Z" fill="#4F46E5"/> {/* Top Triangle */}
    <path d="M50 50L20 80H50L50 50Z" fill="#4338CA"/> {/* Bottom Triangle Shadow */}
    <path d="M30 20L50 50L30 50L30 20Z" fill="#6366F1"/> {/* Top Left Fold */}
    <path d="M50 50L80 50L50 80L50 50Z" fill="#10B981"/> {/* Bottom Right Green */}
  </svg>
);

// 30. CURSOR CLICK S (Digital Literacy)
const LogoCursorS = ({ className }: { className?: string }) => (
  <svg viewBox="0 0 100 100" fill="none" className={className}>
    {/* Jejak Mouse membentuk S */}
    <path d="M70 30C40 30 40 50 70 50C80 50 80 80 50 80H30" stroke="#CBD5E1" strokeWidth="3" strokeDasharray="4 2"/>
    
    {/* Cursor Panah */}
    <path d="M70 30L60 45L65 45L63 52L67 53L69 46H74L70 30Z" fill="#4F46E5" stroke="white" strokeWidth="1"/>
    
    {/* Tombol Klik (Target) */}
    <rect x="25" y="70" width="20" height="15" rx="4" fill="#F59E0B" />
    <path d="M35 77.5L35 77.5" stroke="white" strokeWidth="2" strokeLinecap="round"/>
  </svg>
);

const LogoPencilCoaster = ({ className }: { className?: string }) => (
  <svg viewBox="0 0 100 100" fill="none" className={className}>
    {/* Jalur Rollercoaster berbentuk S */}
    <path d="M75 25C40 25 40 55 75 55C90 55 90 85 55 85H25" stroke="#CBD5E1" strokeWidth="6" strokeLinecap="round" strokeDasharray="1 10"/>
    <path d="M75 25C40 25 40 55 75 55C90 55 90 85 55 85H25" stroke="#4F46E5" strokeWidth="2" strokeLinecap="round"/>
    
    {/* Pensil sebagai Kereta */}
    <g transform="translate(25, 85) rotate(45)">
       <path d="M0 0L15 -5L20 0L15 5Z" fill="#F59E0B" /> {/* Tip */}
       <rect x="15" y="-5" width="20" height="10" fill="#10B981" /> {/* Body */}
    </g>
  </svg>
);

// 32. OPERATOR SNAKE (Retro Game + Math)
const LogoOperatorSnake = ({ className }: { className?: string }) => (
  <svg viewBox="0 0 100 100" fill="none" className={className}>
    {/* Badan Ular terdiri dari simbol matematika */}
    <circle cx="70" cy="25" r="10" fill="#10B981" />
    <path d="M66 25H74M70 21V29" stroke="white" strokeWidth="3" strokeLinecap="round"/> {/* Head (+) */}
    
    <circle cx="45" cy="25" r="9" fill="#4F46E5" opacity="0.8"/>
    <path d="M41 25H49" stroke="white" strokeWidth="3" strokeLinecap="round"/> {/* (-) */}

    <circle cx="45" cy="50" r="9" fill="#4F46E5" opacity="0.6"/>
    <path d="M42 47L48 53M48 47L42 53" stroke="white" strokeWidth="2.5" strokeLinecap="round"/> {/* (x) */}
    
    <circle cx="70" cy="50" r="9" fill="#4F46E5" opacity="0.4"/>
    <circle cx="70" cy="75" r="8" fill="#F59E0B" /> {/* Ekor (Food) */}
  </svg>
);

// 33. CONSOLE BOOK (EdTech Device)
const LogoConsoleBook = ({ className }: { className?: string }) => (
  <svg viewBox="0 0 100 100" fill="none" className={className}>
    {/* Buku terbuka berbentuk konsol game */}
    <path d="M20 30C20 30 35 35 50 30V70C35 75 20 70 20 70V30Z" fill="#4F46E5" />
    <path d="M80 30C80 30 65 35 50 30V70C65 75 80 70 80 70V30Z" fill="#4338CA" />
    
    {/* Tombol D-Pad di halaman kiri */}
    <path d="M30 45H40M35 40V50" stroke="white" strokeWidth="3" strokeLinecap="round"/>
    
    {/* Tombol A B di halaman kanan */}
    <circle cx="60" cy="45" r="3" fill="#F59E0B"/>
    <circle cx="70" cy="50" r="3" fill="#10B981"/>

    {/* Kabel membentuk S di bawah */}
    <path d="M50 70C50 85 65 80 70 90" stroke="#CBD5E1" strokeWidth="2"/>
  </svg>
);

// 34. FLEXI RULER (Measurement + Path)
const LogoFlexiRuler = ({ className }: { className?: string }) => (
  <svg viewBox="0 0 100 100" fill="none" className={className}>
    {/* Pengaris fleksibel melengkung S */}
    <path d="M70 20C40 20 40 50 70 50C90 50 90 80 60 80H30" stroke="#F59E0B" strokeWidth="12" strokeLinecap="round"/>
    
    {/* Garis-garis ukuran (Markings) */}
    <path d="M70 16V24M60 16V24M50 17V23" stroke="#B45309" strokeWidth="2"/>
    <path d="M60 46V54M70 46V54" stroke="#B45309" strokeWidth="2"/>
    <path d="M50 76V84M40 76V84" stroke="#B45309" strokeWidth="2"/>
  </svg>
);

// 35. MAP PIN ROUTE (Journey)
const LogoMapRoute = ({ className }: { className?: string }) => (
  <svg viewBox="0 0 100 100" fill="none" className={className}>
    {/* Jalan Peta membentuk S */}
    <path d="M75 25C45 25 45 55 75 55C90 55 90 80 60 80H40" stroke="#E2E8F0" strokeWidth="10" strokeLinecap="round"/>
    <path d="M75 25C45 25 45 55 75 55C90 55 90 80 60 80H40" stroke="#4F46E5" strokeWidth="2" strokeDasharray="4 4"/>
    
    {/* Pin Lokasi (Start) */}
    <path d="M75 15C75 10 79 10 79 15C79 25 75 30 75 30C75 30 71 25 71 15C71 10 75 10 75 15Z" fill="#F59E0B"/>
    
    {/* Flag (Finish) */}
    <path d="M40 80V65L50 70L40 75" fill="#10B981"/>
  </svg>
);

// 36. XP SCROLL (RPG/History)
const LogoXpScroll = ({ className }: { className?: string }) => (
  <svg viewBox="0 0 100 100" fill="none" className={className}>
    {/* Kertas gulungan membentuk S */}
    <path d="M30 25C20 25 20 35 30 35H60C80 35 80 55 60 55H40C20 55 20 75 40 75H70" stroke="#F59E0B" strokeWidth="8" strokeLinecap="square"/>
    
    {/* Gulungan ujung */}
    <rect x="25" y="20" width="5" height="20" rx="2" fill="#B45309"/>
    <rect x="65" y="65" width="5" height="20" rx="2" fill="#B45309"/>
    
    {/* Tulisan simbolis */}
    <path d="M35 35H50M45 55H55" stroke="white" strokeWidth="2" strokeOpacity="0.5"/>
  </svg>
);

// 37. SWITCH JOY-S (Modern Controller)
const LogoSwitchS = ({ className }: { className?: string }) => (
  <svg viewBox="0 0 100 100" fill="none" className={className}>
    {/* Controller Kiri (Geser Atas) */}
    <path d="M35 20H45V60H35C25 60 25 20 35 20Z" fill="#4F46E5" />
    <circle cx="38" cy="30" r="3" fill="#1E1B4B" opacity="0.3"/>
    <circle cx="38" cy="45" r="2" fill="#1E1B4B" opacity="0.3"/>
    
    {/* Controller Kanan (Geser Bawah - Membentuk diagonal S) */}
    <path d="M65 40H55V80H65C75 80 75 40 65 40Z" fill="#F59E0B" />
    <circle cx="62" cy="60" r="3" fill="#78350F" opacity="0.3"/>
    <circle cx="62" cy="50" r="2" fill="#78350F" opacity="0.3"/>
    
    {/* Koneksi Visual */}
    <path d="M45 40C45 40 50 40 50 40C50 60 55 60 55 60" stroke="#CBD5E1" strokeWidth="2" strokeDasharray="2 2"/>
  </svg>
);

// 38. PROTRACTOR ARC (Geometry Tool)
const LogoProtractorS = ({ className }: { className?: string }) => (
  <svg viewBox="0 0 100 100" fill="none" className={className}>
    {/* Busur Derajat Atas */}
    <path d="M60 50A20 20 0 0 0 20 50H60Z" fill="#4F46E5" opacity="0.9"/>
    {/* Busur Derajat Bawah (Terbalik) - Membentuk S */}
    <path d="M40 50A20 20 0 0 1 80 50H40Z" fill="#10B981" opacity="0.9"/>
    
    {/* Titik Pusat */}
    <circle cx="40" cy="50" r="2" fill="white"/>
    <circle cx="60" cy="50" r="2" fill="white"/>
    
    {/* Garis Sudut */}
    <path d="M40 50L55 35" stroke="white" strokeWidth="1"/>
    <path d="M60 50L45 65" stroke="white" strokeWidth="1"/>
  </svg>
);

// 39. INVENTORY GRID (Bag/Items)
const LogoInventoryS = ({ className }: { className?: string }) => (
  <svg viewBox="0 0 100 100" fill="none" className={className}>
    {/* Grid Background */}
    <rect x="25" y="20" width="50" height="60" rx="4" fill="#1E293B"/>
    
    {/* Slot items yang terisi membentuk huruf S */}
    <rect x="53" y="25" width="14" height="14" rx="2" fill="#F59E0B" /> {/* Top Right */}
    <rect x="33" y="25" width="14" height="14" rx="2" fill="#4F46E5" /> {/* Top Left */}
    <rect x="33" y="43" width="14" height="14" rx="2" fill="#4F46E5" /> {/* Mid Left */}
    <rect x="53" y="43" width="14" height="14" rx="2" fill="#10B981" /> {/* Mid Right (Pivot) */}
    <rect x="53" y="61" width="14" height="14" rx="2" fill="#4F46E5" /> {/* Bot Right */}
    <rect x="33" y="61" width="14" height="14" rx="2" fill="#1E293B" stroke="#334155" /> {/* Bot Left (Empty) */}
  </svg>
);

// 40. KEYCAP WASD (PC Gaming)
const LogoKeycapS = ({ className }: { className?: string }) => (
  <svg viewBox="0 0 100 100" fill="none" className={className}>
    {/* Tombol Keyboard disusun diagonal S */}
    
    {/* Tombol 1 (Atas) */}
    <rect x="55" y="20" width="20" height="20" rx="4" fill="#F59E0B" />
    <text x="65" y="35" textAnchor="middle" fill="white" fontSize="10" fontFamily="sans-serif" fontWeight="bold">S</text>

    {/* Tombol 2 (Tengah) */}
    <rect x="40" y="40" width="20" height="20" rx="4" fill="#4F46E5" />
    <text x="50" y="55" textAnchor="middle" fill="white" fontSize="10" fontFamily="sans-serif" fontWeight="bold">I</text>

    {/* Tombol 3 (Bawah) */}
    <rect x="25" y="60" width="20" height="20" rx="4" fill="#10B981" />
    <text x="35" y="75" textAnchor="middle" fill="white" fontSize="10" fontFamily="sans-serif" fontWeight="bold">N</text>
    
    {/* Kabel */}
    <path d="M65 20V15M25 70H20" stroke="#CBD5E1" strokeWidth="2"/>
  </svg>
);

// 41. PENROSE LOGIC (The Impossible S)
const LogoPenroseS = ({ className }: { className?: string }) => (
  <svg viewBox="0 0 100 100" fill="none" className={className}>
    {/* Ilusi Optik Geometri (Impossible Object) */}
    <path d="M30 20L70 20L80 40L50 40L30 20Z" fill="#4F46E5" /> {/* Top Plane */}
    <path d="M30 20L20 40L20 80L40 70L40 40L50 40L30 20Z" fill="#4338CA" /> {/* Left Drop */}
    <path d="M80 40L70 20L70 60L50 70L60 90L80 80V40Z" fill="#6366F1" /> {/* Right Drop */}
    
    {/* Center Link forming S flow */}
    <path d="M40 70L20 80L60 90L50 70H40Z" fill="#10B981" /> 
    <circle cx="50" cy="55" r="5" fill="#F59E0B" /> {/* The Pivot Point */}
  </svg>
);

// 42. ORBITAL ATOM (Science of Learning)
const LogoOrbital = ({ className }: { className?: string }) => (
  <svg viewBox="0 0 100 100" fill="none" className={className}>
    {/* Inti Atom */}
    <circle cx="50" cy="50" r="10" fill="#4F46E5" />
    
    {/* Orbit 1 (Horizontal) */}
    <ellipse cx="50" cy="50" rx="40" ry="12" stroke="#10B981" strokeWidth="4" transform="rotate(-45 50 50)" strokeOpacity="0.6"/>
    {/* Orbit 2 (Vertical) */}
    <ellipse cx="50" cy="50" rx="40" ry="12" stroke="#F59E0B" strokeWidth="4" transform="rotate(45 50 50)" strokeOpacity="0.6"/>
    
    {/* Electrons */}
    <circle cx="78" cy="22" r="5" fill="#10B981" />
    <circle cx="22" cy="22" r="5" fill="#F59E0B" />
  </svg>
);

// 43. HEXA HIVE (Structured Knowledge)
const LogoHexaHive = ({ className }: { className?: string }) => (
  <svg viewBox="0 0 100 100" fill="none" className={className}>
    {/* Susunan Hexagon membentuk S Abstrak */}
    <path d="M50 20L65 28V45L50 53L35 45V28L50 20Z" fill="#F59E0B" /> {/* Top Center */}
    <path d="M35 45L50 53V70L35 78L20 70V53L35 45Z" fill="#4F46E5" /> {/* Bottom Left */}
    <path d="M80 45L95 53V70L80 78L65 70V53L80 45Z" fill="#10B981" /> {/* Bottom Right */}
    
    {/* Connector Lines */}
    <path d="M50 53L65 70" stroke="#CBD5E1" strokeWidth="2" strokeDasharray="4 4"/>
  </svg>
);

// 44. GROWTH BAR S (Data Driven)
const LogoGrowthBar = ({ className }: { className?: string }) => (
  <svg viewBox="0 0 100 100" fill="none" className={className}>
    {/* 3 Batang diagram yang naik membentuk flow S */}
    <rect x="20" y="50" width="15" height="30" rx="4" fill="#4F46E5" opacity="0.4" />
    <rect x="42" y="35" width="15" height="45" rx="4" fill="#4F46E5" opacity="0.7" />
    <rect x="65" y="20" width="15" height="60" rx="4" fill="#4F46E5" />
    
    {/* Panah kenaikan (The Arrow) */}
    <path d="M25 45L45 30L70 15" stroke="#F59E0B" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round"/>
    <path d="M70 15H55M70 15V30" stroke="#F59E0B" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
);

// 45. THE COMPASS (Geometry Master)
const LogoCompass = ({ className }: { className?: string }) => (
  <svg viewBox="0 0 100 100" fill="none" className={className}>
    {/* Lingkaran yang digambar */}
    <path d="M80 50A30 30 0 1 1 50 20" stroke="#10B981" strokeWidth="4" strokeDasharray="8 4" strokeLinecap="round"/>
    
    {/* Jangka (Compass Tool) */}
    <path d="M50 20L35 70" stroke="#4F46E5" strokeWidth="6" strokeLinecap="round" /> {/* Kaki Kiri */}
    <path d="M50 20L65 70" stroke="#4F46E5" strokeWidth="6" strokeLinecap="round" /> {/* Kaki Kanan */}
    <circle cx="50" cy="20" r="6" fill="#F59E0B" stroke="white" strokeWidth="2"/> {/* Engsel */}
    
    {/* Ujung Tajam & Pensil */}
    <path d="M35 70L35 75" stroke="#94A3B8" strokeWidth="2"/>
    <path d="M65 70L65 75" stroke="#F59E0B" strokeWidth="4"/>
  </svg>
);

// 46. PORTAL JUMP (Gamification Gate)
const LogoPortal = ({ className }: { className?: string }) => (
  <svg viewBox="0 0 100 100" fill="none" className={className}>
    {/* Portal berbentuk Oval/S */}
    <ellipse cx="50" cy="50" rx="20" ry="35" stroke="#4F46E5" strokeWidth="4" fill="#EEF2FF"/>
    <ellipse cx="50" cy="50" rx="20" ry="35" stroke="#F59E0B" strokeWidth="4" strokeDasharray="20 40" transform="rotate(15 50 50)"/>
    
    {/* Partikel keluar dari portal */}
    <rect x="40" y="40" width="10" height="10" rx="2" fill="#10B981" transform="rotate(-15 45 45)"/>
    <path d="M60 30L65 40L55 40Z" fill="#F59E0B" transform="rotate(20 60 35)"/>
  </svg>
);

// 47. BRAIN CIRCUIT (Neural S)
const LogoBrainCircuit = ({ className }: { className?: string }) => (
  <svg viewBox="0 0 100 100" fill="none" className={className}>
    {/* Bentuk Otak Abstrak Kiri & Kanan */}
    <path d="M50 20C30 20 20 40 20 60C20 75 35 80 50 80" stroke="#E2E8F0" strokeWidth="4" strokeLinecap="round"/>
    <path d="M50 20C70 20 80 40 80 60C80 75 65 80 50 80" stroke="#E2E8F0" strokeWidth="4" strokeLinecap="round"/>
    
    {/* Circuit Connections forming Tree/S */}
    <path d="M50 80V50" stroke="#4F46E5" strokeWidth="4"/>
    <circle cx="50" cy="50" r="6" fill="#4F46E5"/>
    
    {/* Synapses */}
    <path d="M50 50L30 40" stroke="#10B981" strokeWidth="3"/>
    <circle cx="30" cy="40" r="4" fill="#10B981"/>
    
    <path d="M50 50L70 40" stroke="#F59E0B" strokeWidth="3"/>
    <circle cx="70" cy="40" r="4" fill="#F59E0B"/>
  </svg>
);

// 48. THE LIGHTHOUSE (Guidance)
const LogoLighthouse = ({ className }: { className?: string }) => (
  <svg viewBox="0 0 100 100" fill="none" className={className}>
    {/* Menara */}
    <path d="M40 80L45 30H55L60 80H40Z" fill="#4F46E5" />
    
    {/* Lampu/Cahaya */}
    <circle cx="50" cy="30" r="8" fill="#F59E0B" />
    
    {/* Sinar Cahaya membentuk S Shape negatif space atau beam */}
    <path d="M50 30L90 10V50L50 30Z" fill="#F59E0B" opacity="0.2" />
    <path d="M50 30L10 50V10L50 30Z" fill="#F59E0B" opacity="0.2" />
    
    {/* Gelombang air di bawah */}
    <path d="M20 85C30 80 40 90 50 85C60 80 70 90 80 85" stroke="#10B981" strokeWidth="3" strokeLinecap="round"/>
  </svg>
);

// 49. STACKED LAYERS (Material Design)
const LogoLayers = ({ className }: { className?: string }) => (
  <svg viewBox="0 0 100 100" fill="none" className={className}>
    {/* Layer 1 (Bottom) */}
    <path d="M50 75L20 60L50 45L80 60L50 75Z" fill="#4F46E5" opacity="0.4"/>
    {/* Layer 2 (Middle) */}
    <path d="M50 60L20 45L50 30L80 45L50 60Z" fill="#4F46E5" opacity="0.7"/>
    {/* Layer 3 (Top) - The Platform */}
    <path d="M50 45L20 30L50 15L80 30L50 45Z" fill="#F59E0B" />
    
    {/* Floating Element */}
    <circle cx="50" cy="25" r="4" fill="white" fillOpacity="0.8"/>
  </svg>
);

// 50. THE SINAU SPARK (Brand Icon)
const LogoSpark = ({ className }: { className?: string }) => (
  <svg viewBox="0 0 100 100" fill="none" className={className}>
    {/* Bintang 4 Sudut yang dinamis */}
    <path d="M50 10C50 30 35 50 10 50C35 50 50 70 50 90C50 70 65 50 90 50C65 50 50 30 50 10Z" fill="#4F46E5" />
    
    {/* Inner Core */}
    <path d="M50 30C50 40 45 50 35 50C45 50 50 60 50 70C50 60 55 50 65 50C55 50 50 40 50 30Z" fill="#10B981" />
    
    {/* Center Dot */}
    <circle cx="50" cy="50" r="5" fill="#F59E0B" stroke="white" strokeWidth="2"/>
  </svg>
);

// 51. ANALOG STICK SLIDE (Modern Controller Flow)
const LogoAnalogSlide = ({ className }: { className?: string }) => (
  <svg viewBox="0 0 100 100" fill="none" className={className}>
    {/* Jalur Slide berbentuk S */}
    <path d="M70 20C30 20 30 50 70 50C90 50 90 80 50 80H30" stroke="#E2E8F0" strokeWidth="12" strokeLinecap="round"/>
    {/* Jalur yang sudah dilalui (Progress) */}
    <path d="M70 20C30 20 30 50 70 50C80 50 85 55 85 65" stroke="#4F46E5" strokeWidth="12" strokeLinecap="round"/>
    
    {/* Analog Stick Head (Slider Knob) */}
    <circle cx="85" cy="65" r="14" fill="#F59E0B" stroke="white" strokeWidth="3"/>
    <circle cx="85" cy="65" r="6" fill="#B45309" opacity="0.5"/> {/* Thumb grip texture */}
  </svg>
);

// 52. PIXEL RAMP SLIDE (Retro Game Platform)
const LogoPixelRamp = ({ className }: { className?: string }) => (
  <svg viewBox="0 0 100 100" fill="none" className={className}>
    {/* Platform Pixel membentuk S */}
    <rect x="60" y="20" width="20" height="10" fill="#4F46E5"/>
    <rect x="50" y="30" width="20" height="10" fill="#4F46E5"/>
    <rect x="40" y="40" width="20" height="10" fill="#4F46E5"/>
    <rect x="30" y="50" width="20" height="10" fill="#4F46E5"/>
    <rect x="20" y="60" width="40" height="10" fill="#10B981"/> {/* Landing Area */}
    
    {/* Karakter/Kotak meluncur */}
    <rect x="45" y="35" width="10" height="10" fill="#F59E0B"/>
    {/* Motion trail pixel */}
    <rect x="55" y="25" width="5" height="5" fill="#F59E0B" opacity="0.5"/>
  </svg>
);

// 53. UI PROGRESS SLIDER (Digital Interface)
const LogoUiSlider = ({ className }: { className?: string }) => (
  <svg viewBox="0 0 100 100" fill="none" className={className}>
    {/* Track Slider S */}
    <path d="M30 25C10 25 10 55 30 55H70C90 55 90 85 70 85" stroke="#CBD5E1" strokeWidth="8" strokeLinecap="round"/>
    
    {/* Tombol Geser (Slider Thumb) */}
    <circle cx="50" cy="55" r="12" fill="white" stroke="#4F46E5" strokeWidth="4"/>
    {/* Indikator Geser */}
    <path d="M46 55H54" stroke="#4F46E5" strokeWidth="2" strokeLinecap="round"/>
  </svg>
);

// 54. MARBLE RUN S (Physical Toy/CPA)
const LogoMarbleRun = ({ className }: { className?: string }) => (
  <svg viewBox="0 0 100 100" fill="none" className={className}>
    {/* Rel Ganda membentuk S */}
    <path d="M75 20C40 20 40 50 75 50C90 50 90 80 55 80H30" stroke="#4F46E5" strokeWidth="4" strokeLinecap="round"/>
    <path d="M75 28C48 28 48 58 75 58C82 58 82 88 55 88H30" stroke="#4F46E5" strokeWidth="4" strokeLinecap="round"/>
    
    {/* Penyangga Track */}
    <path d="M45 25V85M85 25V85" stroke="#CBD5E1" strokeWidth="2" strokeDasharray="4 4"/>
    
    {/* Kelereng (Marble) Meluncur */}
    <circle cx="60" cy="54" r="8" fill="#F59E0B"/>
    <circle cx="58" cy="52" r="3" fill="white" opacity="0.6"/> {/* Glint */}
  </svg>
);

// 55. ARCADE COIN SLOT (The Entry Slide)
const LogoArcadeSlot = ({ className }: { className?: string }) => (
  <svg viewBox="0 0 100 100" fill="none" className={className}>
    {/* Pelat Logam Slot */}
    <rect x="20" y="15" width="60" height="70" rx="4" fill="#334155"/>
    <rect x="25" y="20" width="50" height="60" rx="2" fill="#1E293B" stroke="#475569" strokeWidth="2"/>
    
    {/* Jalur Masuk Koin membentuk S */}
    <path d="M65 25C65 25 40 35 40 50C40 65 65 75 65 75" stroke="#10B981" strokeWidth="6" strokeLinecap="round"/>
    
    {/* Koin meluncur */}
    <circle cx="45" cy="45" r="8" fill="#F59E0B" stroke="#B45309" strokeWidth="1"/>
    <text x="45" y="48" textAnchor="middle" fill="#B45309" fontSize="6" fontWeight="bold">$</text>
  </svg>
);

// 56. FUTURISTIC GLIDER (Sci-Fi Racer)
const LogoSciFiGlider = ({ className }: { className?: string }) => (
  <svg viewBox="0 0 100 100" fill="none" className={className}>
    {/* Jejak Cahaya Neon membentuk S */}
    <path d="M80 20C50 20 50 50 80 50C100 50 100 80 70 80H30" stroke="#4F46E5" strokeWidth="4" strokeLinecap="round"/>
    {/* Glow Effect */}
    <path d="M80 20C50 20 50 50 80 50C100 50 100 80 70 80H30" stroke="#818CF8" strokeWidth="8" strokeLinecap="round" opacity="0.3"/>
    
    {/* Kendaraan Glider */}
    <path d="M30 80L40 70L45 80L30 80Z" fill="#F59E0B"/>
    <path d="M30 80L20 85L35 85L30 80Z" fill="#10B981"/> {/* Engine boost */}
  </svg>
);

// 57. D-PAD SHIFT (Controller Sliding)
const LogoDPadShift = ({ className }: { className?: string }) => (
  <svg viewBox="0 0 100 100" fill="none" className={className}>
    {/* Bentuk dasar D-Pad */}
    <path d="M40 20H60V40H80V60H60V80H40V60H20V40H40V20Z" fill="#1E293B" opacity="0.5"/>
    
    {/* Bagian yang "bergeser" membentuk S diagonal */}
    <rect x="45" y="25" width="15" height="15" rx="2" fill="#4F46E5" /> {/* Up */}
    <rect x="45" y="45" width="15" height="15" rx="2" fill="#10B981" /> {/* Center */}
    <rect x="65" y="45" width="15" height="15" rx="2" fill="#F59E0B" /> {/* Right */}
    
    {/* Panah geser */}
    <path d="M52 30L52 35M70 52L75 52" stroke="white" strokeWidth="2" strokeLinecap="round"/>
  </svg>
);

// 58. TOGGLE SWITCH S (Settings/Options)
const LogoToggleS = ({ className }: { className?: string }) => (
  <svg viewBox="0 0 100 100" fill="none" className={className}>
    {/* Track Toggle Atas */}
    <rect x="25" y="25" width="50" height="20" rx="10" fill="#E2E8F0"/>
    <circle cx="35" cy="35" r="8" fill="#4F46E5"/> {/* Off state */}

    {/* Track Toggle Bawah (Digeser) */}
    <rect x="25" y="55" width="50" height="20" rx="10" fill="#10B981"/>
    <circle cx="65" cy="65" r="8" fill="white"/> {/* On state */}
    
    {/* Garis penghubung visual membentuk S */}
    <path d="M35 35C35 50 65 50 65 65" stroke="#F59E0B" strokeWidth="2" strokeDasharray="2 2"/>
  </svg>
);

// 59. AUDIO FADER S (Sound/Media)
const LogoAudioFader = ({ className }: { className?: string }) => (
  <svg viewBox="0 0 100 100" fill="none" className={className}>
    {/* Slot Fader melengkung S */}
    <path d="M40 20V40C40 60 60 40 60 60V80" stroke="#1E293B" strokeWidth="6" strokeLinecap="round"/>
    <path d="M40 20V40C40 60 60 40 60 60V80" stroke="#CBD5E1" strokeWidth="2" strokeLinecap="round"/>
    
    {/* Knob Fader */}
    <rect x="30" y="30" width="20" height="10" rx="2" fill="#F59E0B" stroke="#B45309" strokeWidth="1"/>
    <path d="M40 32V38" stroke="#B45309" strokeWidth="2"/>
  </svg>
);

// 60. SWIPE TO UNLOCK (Mobile Game UI)
const LogoSwipeUnlock = ({ className }: { className?: string }) => (
  <svg viewBox="0 0 100 100" fill="none" className={className}>
    {/* Area Swipe S */}
    <path d="M30 30C10 30 10 70 30 70H70C90 70 90 30 70 30H60" stroke="#4F46E5" strokeWidth="10" strokeLinecap="round" fill="none" opacity="0.2"/>
    
    {/* Tombol Swipe dengan Panah */}
    <circle cx="30" cy="30" r="12" fill="#10B981"/>
    <path d="M26 30H34M31 26L35 30L31 34" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
    
    {/* Target Unlock (Gembok terbuka) */}
    <path d="M70 25V20C70 15 66 15 66 20V25" stroke="#F59E0B" strokeWidth="2"/>
    <rect x="64" y="25" width="12" height="10" rx="2" fill="#F59E0B"/>
  </svg>
);

// 61. THE SHIFTED STACK (Direct Reference to CPA)
const LogoStackS = ({ className }: { className?: string }) => (
  <svg viewBox="0 0 100 100" fill="none" className={className}>
    {/* Konsep: 3 Kartu ditumpuk dengan alignment Zig-Zag membentuk S */}
    
    {/* Kartu 1 (Atas - Geser Kanan) - GAME */}
    <rect x="45" y="15" width="45" height="22" rx="6" fill="#4F46E5" />
    <path d="M60 26H70M65 21V31" stroke="white" strokeWidth="2" strokeLinecap="round"/> {/* D-Pad */}
    <circle cx="80" cy="26" r="3" fill="#F59E0B"/>

    {/* Kartu 2 (Tengah - Geser Kiri) - MATH/LEARN */}
    <rect x="10" y="40" width="45" height="22" rx="6" fill="#10B981" />
    <path d="M25 51L32 51L40 45" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/> {/* Graph/Check */}

    {/* Kartu 3 (Bawah - Geser Kanan) - MAP/GOAL */}
    <rect x="45" y="65" width="45" height="22" rx="6" fill="#F59E0B" />
    <path d="M67 71V81L75 76L67 71Z" fill="white"/> {/* Flag/Map Pin */}
    
    {/* Garis Konektor Halus */}
    <path d="M45 26H32.5C32.5 26 32.5 40 32.5 40" stroke="#CBD5E1" strokeWidth="2" strokeDasharray="4 2" fill="none"/>
    <path d="M55 51H67.5C67.5 51 67.5 65 67.5 65" stroke="#CBD5E1" strokeWidth="2" strokeDasharray="4 2" fill="none"/>
  </svg>
);

// 62. LEVEL SELECT PATH (Map Cards)
const LogoLevelCards = ({ className }: { className?: string }) => (
  <svg viewBox="0 0 100 100" fill="none" className={className}>
    {/* Kartu-kartu level game yang disusun melengkung S */}
    
    {/* Card 3 (Finish) */}
    <rect x="20" y="70" width="25" height="20" rx="4" fill="#10B981" transform="rotate(-10 32.5 80)"/>
    <text x="32" y="85" textAnchor="middle" fill="white" fontSize="10" fontWeight="bold">3</text>

    {/* Card 2 (Mid) */}
    <rect x="40" y="40" width="25" height="20" rx="4" fill="#F59E0B" transform="rotate(10 52.5 50)"/>
    <text x="52" y="55" textAnchor="middle" fill="white" fontSize="10" fontWeight="bold">2</text>

    {/* Card 1 (Start) */}
    <rect x="65" y="10" width="25" height="20" rx="4" fill="#4F46E5" transform="rotate(-5 77.5 20)"/>
    <text x="77" y="25" textAnchor="middle" fill="white" fontSize="10" fontWeight="bold">1</text>
    
    {/* Path Konektor (Titik-titik) */}
    <path d="M70 25C70 45 60 40 55 45M50 55C40 65 35 60 30 70" stroke="#CBD5E1" strokeWidth="3" strokeDasharray="4 4" strokeLinecap="round"/>
  </svg>
);

// 63. CODE BLOCKS S (Scratch/Blockly Style)
const LogoCodeBlockS = ({ className }: { className?: string }) => (
  <svg viewBox="0 0 100 100" fill="none" className={className}>
    {/* Blok koding puzzle yang menyatu membentuk S */}
    
    {/* Blok Atas (Loop) */}
    <path d="M70 20H40C35 20 30 25 30 30V35H40V30H70V40H80V30C80 25 75 20 70 20Z" fill="#F59E0B" />
    
    {/* Blok Tengah (Action) */}
    <path d="M30 35H60C65 35 70 40 70 45V55H60V45H30V55H20V45C20 40 25 35 30 35Z" fill="#4F46E5" />
    
    {/* Blok Bawah (Variable) */}
    <path d="M60 55H30C25 55 20 60 20 65V75H30V65H60V75H70V65C70 60 65 55 60 55Z" fill="#10B981" />
    
    {/* Simbol Script */}
    <path d="M35 45L40 50L35 55" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
);

// 64. FLASHCARD FAN (Learning Tools)
const LogoFlashcardFan = ({ className }: { className?: string }) => (
  <svg viewBox="0 0 100 100" fill="none" className={className}>
    {/* Tiga kartu flashcard dikipas membentuk kurva S */}
    
    {/* Card Left (Bottom layer) */}
    <rect x="40" y="20" width="30" height="45" rx="4" fill="#E2E8F0" stroke="#94A3B8" strokeWidth="2" transform="rotate(-30 55 65)"/>
    
    {/* Card Right (Middle layer) */}
    <rect x="40" y="20" width="30" height="45" rx="4" fill="#E2E8F0" stroke="#94A3B8" strokeWidth="2" transform="rotate(30 55 65)"/>
    
    {/* Card Center (Top layer - The Focus) */}
    <rect x="35" y="15" width="40" height="55" rx="5" fill="#4F46E5" />
    
    {/* Content di kartu utama */}
    <circle cx="55" cy="35" r="10" fill="white" fillOpacity="0.2"/>
    <text x="55" y="40" textAnchor="middle" fill="white" fontSize="24" fontWeight="bold">S</text>
    <rect x="45" y="55" width="20" height="4" rx="2" fill="#F59E0B"/>
  </svg>
);

// 65. GAME INVENTORY GRID (RPG UI)
const LogoInventoryGrid = ({ className }: { className?: string }) => (
  <svg viewBox="0 0 100 100" fill="none" className={className}>
    {/* Grid kotak-kotak UI Game */}
    <rect x="25" y="25" width="50" height="50" rx="4" fill="#1E293B" stroke="#334155" strokeWidth="2"/>
    
    {/* Slot yang terisi membentuk pola S */}
    {/* Row 1 */}
    <rect x="52" y="30" width="14" height="14" rx="2" fill="#334155"/> {/* Empty */}
    <rect x="34" y="30" width="14" height="14" rx="2" fill="#F59E0B"/> {/* Item: Coin */}
    
    {/* Row 2 */}
    <rect x="34" y="48" width="14" height="14" rx="2" fill="#4F46E5"/> {/* Item: Book */}
    <rect x="52" y="48" width="14" height="14" rx="2" fill="#334155"/> {/* Empty */}
    
    {/* Row 3 */}
    <rect x="34" y="66" width="14" height="14" rx="2" fill="#334155"/> {/* Empty */}
    <rect x="52" y="66" width="14" height="14" rx="2" fill="#10B981"/> {/* Item: Potion */}

    {/* Koneksi Visual S */}
    <path d="M48 37H50C60 37 60 55 50 55H45C35 55 35 73 45 73H50" stroke="white" strokeWidth="2" strokeDasharray="2 2" opacity="0.5"/>
  </svg>
);

// 66. KANBAN BOARD S (Progress)
const LogoKanbanS = ({ className }: { className?: string }) => (
  <svg viewBox="0 0 100 100" fill="none" className={className}>
    {/* Kolom Kanban */}
    <rect x="15" y="20" width="20" height="60" rx="2" fill="#F1F5F9"/>
    <rect x="40" y="20" width="20" height="60" rx="2" fill="#F1F5F9"/>
    <rect x="65" y="20" width="20" height="60" rx="2" fill="#F1F5F9"/>
    
    {/* Kartu Tugas (Stickies) membentuk S */}
    <rect x="67" y="25" width="16" height="12" rx="2" fill="#F59E0B"/> {/* To Do (Top Right?? No, let's allow flow) */}
    {/* Let's make the flow: Start Left Top -> Mid Mid -> End Right Bot */}
    
    <rect x="17" y="25" width="16" height="12" rx="2" fill="#4F46E5"/> {/* Start */}
    <rect x="17" y="40" width="16" height="12" rx="2" fill="#CBD5E1"/> {/* Idle */}
    
    <rect x="42" y="45" width="16" height="12" rx="2" fill="#4F46E5"/> {/* In Progress */}
    
    <rect x="67" y="65" width="16" height="12" rx="2" fill="#10B981"/> {/* Done */}
    
    {/* Garis alur */}
    <path d="M25 37C25 45 50 35 50 45C50 55 75 55 75 65" stroke="#4F46E5" strokeWidth="2" strokeDasharray="2 2" fill="none"/>
  </svg>
);

// 67. ISOMETRIC TILES (Map Blocks)
const LogoIsoTiles = ({ className }: { className?: string }) => (
  <svg viewBox="0 0 100 100" fill="none" className={className}>
    {/* Ubin Isometrik mengambang */}
    
    {/* Top Tile */}
    <path d="M70 20L90 30L70 40L50 30L70 20Z" fill="#F59E0B" />
    <path d="M50 30L70 40V50L50 40V30Z" fill="#B45309" opacity="0.5"/> {/* Thickness */}

    {/* Middle Tile */}
    <path d="M50 40L70 50L50 60L30 50L50 40Z" fill="#4F46E5" />
    <path d="M30 50L50 60V70L30 60V50Z" fill="#312E81" opacity="0.5"/>

    {/* Bottom Tile */}
    <path d="M30 60L50 70L30 80L10 70L30 60Z" fill="#10B981" />
    <path d="M10 70L30 80V90L10 80V70Z" fill="#064E3B" opacity="0.5"/>
    
    {/* Simbol di atas ubin */}
    <text x="70" y="33" textAnchor="middle" fill="white" fontSize="8" fontWeight="bold">1</text>
    <text x="50" y="53" textAnchor="middle" fill="white" fontSize="8" fontWeight="bold">2</text>
    <text x="30" y="73" textAnchor="middle" fill="white" fontSize="8" fontWeight="bold">3</text>
  </svg>
);

// 68. MEMORY MATCH CARDS (Flipped S)
const LogoMemoryMatch = ({ className }: { className?: string }) => (
  <svg viewBox="0 0 100 100" fill="none" className={className}>
    {/* 3x3 Grid Kartu Kecil */}
    
    {/* Row 1 */}
    <rect x="20" y="20" width="18" height="18" rx="2" fill="#CBD5E1"/> {/* Closed */}
    <rect x="41" y="20" width="18" height="18" rx="2" fill="#F59E0B"/> {/* OPEN */}
    <rect x="62" y="20" width="18" height="18" rx="2" fill="#F59E0B"/> {/* OPEN */}
    
    {/* Row 2 */}
    <rect x="20" y="41" width="18" height="18" rx="2" fill="#4F46E5"/> {/* OPEN */}
    <rect x="41" y="41" width="18" height="18" rx="2" fill="#CBD5E1"/> {/* Closed */}
    <rect x="62" y="41" width="18" height="18" rx="2" fill="#CBD5E1"/> {/* Closed */}
    
    {/* Row 3 */}
    <rect x="20" y="62" width="18" height="18" rx="2" fill="#CBD5E1"/> {/* Closed */}
    <rect x="41" y="62" width="18" height="18" rx="2" fill="#10B981"/> {/* OPEN */}
    <rect x="62" y="62" width="18" height="18" rx="2" fill="#10B981"/> {/* OPEN */}
    
    {/* Kartu yang terbuka (Warna warni) membentuk pola S terbalik/abstrak */}
  </svg>
);

// 69. SLIDE DECK STREAM (Presentation)
const LogoSlideStream = ({ className }: { className?: string }) => (
  <svg viewBox="0 0 100 100" fill="none" className={className}>
    {/* Slide Presentasi yang melayang berurutan */}
    
    {/* Slide 1 (Jauh) */}
    <rect x="60" y="20" width="30" height="20" rx="2" fill="#CBD5E1" stroke="white" strokeWidth="2"/>
    
    {/* Slide 2 (Tengah) */}
    <rect x="45" y="35" width="35" height="25" rx="3" fill="#4F46E5" stroke="white" strokeWidth="2"/>
    <path d="M55 45H70" stroke="white" strokeWidth="2"/> {/* Content line */}
    
    {/* Slide 3 (Depan - Fokus) */}
    <rect x="20" y="55" width="45" height="30" rx="4" fill="#F59E0B" stroke="white" strokeWidth="2"/>
    <circle cx="42.5" cy="70" r="6" fill="white" fillOpacity="0.3"/> {/* Chart pie */}
    
    {/* Koneksi S */}
    <path d="M75 30C75 30 60 45 60 45M60 45C60 45 45 70 45 70" stroke="#10B981" strokeWidth="2" strokeDasharray="2 2"/>
  </svg>
);

// 70. DIALOG BOX CHAIN (Story/Language)
const LogoDialogS = ({ className }: { className?: string }) => (
  <svg viewBox="0 0 100 100" fill="none" className={className}>
    {/* Gelembung percakapan (Chat Bubbles) ditumpuk S */}
    
    {/* Bubble 1 (Right) */}
    <path d="M50 20H80C85 20 90 25 90 30V40C90 45 85 50 80 50H60L50 60V50H50C45 50 40 45 40 40V30C40 25 45 20 50 20Z" fill="#4F46E5"/>
    <text x="65" y="40" textAnchor="middle" fill="white" fontSize="16" fontWeight="bold">?</text>

    {/* Bubble 2 (Left) */}
    <path d="M10 50H40C45 50 50 55 50 60V70C50 75 45 80 40 80H30L20 90V80H10C5 80 0 75 0 70V60C0 55 5 50 10 50Z" fill="#10B981"/>
    <text x="25" y="70" textAnchor="middle" fill="white" fontSize="16" fontWeight="bold">!</text>
    
    {/* Koneksi Topik */}
    <circle cx="50" cy="50" r="5" fill="#F59E0B" stroke="white" strokeWidth="2"/>
  </svg>
);

// 71. TACTICAL GRID (Strategy Game Map)
const LogoTacticalGrid = ({ className }: { className?: string }) => (
  <svg viewBox="0 0 100 100" fill="none" className={className}>
    {/* Base Isometric Grid (3x3 view) */}
    <path d="M50 20L80 35V65L50 80L20 65V35L50 20Z" fill="#E2E8F0" stroke="#CBD5E1" strokeWidth="2"/>
    <path d="M50 50L80 35M50 50L20 35M50 50V80" stroke="#CBD5E1" strokeWidth="2"/>

    {/* Player Unit (Blue Block) */}
    <g transform="translate(35, 45)">
        <rect x="0" y="0" width="15" height="15" fill="#4F46E5" transform="rotate(45)"/>
        <circle cx="0" cy="0" r="3" fill="white" transform="translate(0, -10)"/>
    </g>

    {/* Target/Goal Unit (Gold Block with Item) */}
    <g transform="translate(65, 30)">
        <rect x="0" y="0" width="15" height="15" fill="#F59E0B" transform="rotate(45)"/>
        {/* Tiny Book Icon */}
        <rect x="-5" y="-8" width="10" height="6" fill="white"/>
    </g>

    {/* Movement Path */}
    <path d="M35 55L50 62.5L65 40" stroke="#10B981" strokeWidth="3" strokeDasharray="4 2" strokeLinecap="round"/>
  </svg>
);

// 72. INVENTORY HEROES (RPG UI Slots)
const LogoInventoryHeroes = ({ className }: { className?: string }) => (
  <svg viewBox="0 0 100 100" fill="none" className={className}>
    {/* Main UI Container Box */}
    <rect x="15" y="15" width="70" height="70" rx="8" fill="#1E293B" stroke="#334155" strokeWidth="3"/>

    {/* Slot 1: Weapon/Tool (Pencil Sword) */}
    <rect x="22" y="22" width="25" height="25" rx="4" fill="#334155"/>
    <path d="M28 40L40 28M40 28L43 31L31 43M40 28L45 23" stroke="#F59E0B" strokeWidth="3" strokeLinecap="round"/>

    {/* Slot 2: Knowledge (Book Spell) */}
    <rect x="53" y="22" width="25" height="25" rx="4" fill="#4F46E5"/>
    <rect x="58" y="27" width="15" height="15" fill="white" rx="2"/>
    <path d="M65 27V42" stroke="#4F46E5" strokeWidth="2"/>

    {/* Slot 3: Health/Energy (Potion) */}
    <rect x="22" y="53" width="25" height="25" rx="4" fill="#334155"/>
    <circle cx="34.5" cy="65.5" r="8" fill="#10B981"/>
    <rect x="32.5" y="56" width="4" height="6" fill="#CBD5E1"/>

    {/* Slot 4: Locked/Empty */}
    <rect x="53" y="53" width="25" height="25" rx="4" fill="#0F172A"/>
    <path d="M62 62L69 69M69 62L62 69" stroke="#334155" strokeWidth="3" strokeLinecap="round"/>
  </svg>
);

// 73. CARD BATTLE DUEL (Trading Card Game)
const LogoCardDuel = ({ className }: { className?: string }) => (
  <svg viewBox="0 0 100 100" fill="none" className={className}>
    {/* Player Card (Left - Blue) */}
    <g transform="rotate(-15 40 50)">
        <rect x="20" y="25" width="40" height="55" rx="4" fill="#4F46E5" stroke="white" strokeWidth="2"/>
        <rect x="25" y="30" width="30" height="30" fill="#6366F1" rx="2"/> {/* Art Box */}
        <circle cx="40" cy="45" r="8" fill="white" fillOpacity="0.5"/>
        <rect x="25" y="65" width="30" height="10" fill="#312E81" rx="2"/> {/* Stats Box */}
    </g>

    {/* Opponent/Challenge Card (Right - Orange - Overlapping) */}
    <g transform="rotate(10 60 50)">
        <rect x="40" y="20" width="40" height="55" rx="4" fill="#F59E0B" stroke="white" strokeWidth="2"/>
        <rect x="45" y="25" width="30" height="30" fill="#B45309" rx="2" opacity="0.5"/> {/* Art Box */}
        <path d="M55 35L65 40L55 45L65 50" stroke="white" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"/> {/* Lightning */}
    </g>

    {/* Clash Effect Center */}
    <circle cx="50" cy="50" r="10" fill="white" fillOpacity="0.3"/>
    <path d="M50 40V60M40 50H60" stroke="white" strokeWidth="2"/>
  </svg>
);

// 74. PIXEL BUILDER STACK (Sandbox Game)
const LogoPixelBuilder = ({ className }: { className?: string }) => (
  <svg viewBox="0 0 100 100" fill="none" className={className}>
    {/* Base Foundation Blocks */}
    <rect x="20" y="70" width="20" height="20" fill="#4F46E5" stroke="#312E81" strokeWidth="2"/>
    <rect x="40" y="70" width="20" height="20" fill="#4F46E5" stroke="#312E81" strokeWidth="2"/>
    <rect x="60" y="70" width="20" height="20" fill="#4F46E5" stroke="#312E81" strokeWidth="2"/>

    {/* Second Layer */}
    <rect x="30" y="50" width="20" height="20" fill="#10B981" stroke="#064E3B" strokeWidth="2"/>
    <rect x="50" y="50" width="20" height="20" fill="#10B981" stroke="#064E3B" strokeWidth="2"/>

    {/* Block Being Placed (Hovering) */}
    <rect x="40" y="25" width="20" height="20" fill="#F59E0B" stroke="#B45309" strokeWidth="2" opacity="0.8"/>

    {/* Pixel Cursor */}
    <path d="M65 25V35H75V40H65V50H60V40H50V35H60V25H65Z" fill="white" stroke="#1E293B" strokeWidth="2"/>
  </svg>
);

// 75. CONTROLLER GRID PAD (Input Device)
const LogoControllerGrid = ({ className }: { className?: string }) => (
  <svg viewBox="0 0 100 100" fill="none" className={className}>
    {/* Controller Body Shape */}
    <rect x="10" y="25" width="80" height="50" rx="15" fill="#1E293B"/>
    <path d="M15 25H85" stroke="#334155" strokeWidth="4"/> {/* Shoulder Line */}

    {/* Central Grid Interface (Replacing standard buttons) */}
    <rect x="30" y="35" width="40" height="30" rx="4" fill="#0F172A" stroke="#334155"/>

    {/* The "Kotak-kotak" Buttons */}
    {/* Row 1 */}
    <rect x="34" y="39" width="8" height="8" rx="1" fill="#4F46E5"/>
    <rect x="46" y="39" width="8" height="8" rx="1" fill="#4F46E5"/>
    <rect x="58" y="39" width="8" height="8" rx="1" fill="#F59E0B"/>
    {/* Row 2 */}
    <rect x="34" y="51" width="8" height="8" rx="1" fill="#4F46E5"/>
    <rect x="46" y="51" width="8" height="8" rx="1" fill="#10B981"/>
    <rect x="58" y="51" width="8" height="8" rx="1" fill="#4F46E5"/>

    {/* Analog Sticks (Subtle) */}
    <circle cx="22" cy="65" r="6" fill="#334155"/>
    <circle cx="78" cy="65" r="6" fill="#334155"/>
  </svg>
);

// 76. DUNGEON MAP PATHFINDER (Grid Based Movement)
const LogoDungeonMap = ({ className }: { className?: string }) => (
  <svg viewBox="0 0 100 100" fill="none" className={className}>
    {/* 4x4 Grid Container */}
    <rect x="10" y="10" width="80" height="80" rx="4" fill="#F1F5F9" stroke="#CBD5E1" strokeWidth="2"/>

    {/* Grid Lines */}
    <path d="M30 10V90M50 10V90M70 10V90" stroke="#CBD5E1" strokeWidth="1"/>
    <path d="M10 30H90M10 50H90M10 70H90" stroke="#CBD5E1" strokeWidth="1"/>

    {/* Walls/Obstacles (Dark Boxes) */}
    <rect x="30" y="30" width="20" height="20" fill="#64748B"/>
    <rect x="50" y="50" width="20" height="20" fill="#64748B"/>
    <rect x="10" y="70" width="20" height="20" fill="#64748B"/>

    {/* Start Point (Green Box) */}
    <rect x="10" y="10" width="20" height="20" fill="#10B981" opacity="0.8"/>
    {/* End Point (Gold Box/Treasure) */}
    <rect x="70" y="70" width="20" height="20" fill="#F59E0B"/>
    <circle cx="80" cy="80" r="4" fill="white"/>

    {/* Path Line */}
    <path d="M20 20H40V40H60V70H75" stroke="#4F46E5" strokeWidth="3" strokeDasharray="4 2" strokeLinecap="round"/>
  </svg>
);

// 77. TETRO-LEARNING (Puzzle Blocks)
const LogoTetroLearn = ({ className }: { className?: string }) => (
  <svg viewBox="0 0 100 100" fill="none" className={className}>
    {/* The 'L' Piece (Orange) - Falling */}
    <g transform="translate(0, 5)">
        <rect x="30" y="20" width="20" height="20" fill="#F59E0B" stroke="white" strokeWidth="2"/>
        <rect x="30" y="40" width="20" height="20" fill="#F59E0B" stroke="white" strokeWidth="2"/>
        <rect x="30" y="60" width="20" height="20" fill="#F59E0B" stroke="white" strokeWidth="2"/>
        <rect x="50" y="60" width="20" height="20" fill="#F59E0B" stroke="white" strokeWidth="2"/>
    </g>

    {/* The 'S' Piece (Green) - Grounded/Locked */}
    <rect x="50" y="80" width="20" height="20" fill="#10B981" stroke="white" strokeWidth="2"/>
    <rect x="70" y="80" width="20" height="20" fill="#10B981" stroke="white" strokeWidth="2"/>
    <rect x="70" y="60" width="20" height="20" fill="#10B981" stroke="white" strokeWidth="2"/>
    <rect x="90" y="60" width="20" height="20" fill="#10B981" stroke="white" strokeWidth="2"/>

    {/* A 'Ghost' outline showing where they fit */}
    <rect x="50" y="40" width="20" height="20" fill="none" stroke="#4F46E5" strokeWidth="2" strokeDasharray="4 4"/>
  </svg>
);

// 78. XP DASHBOARD HUD (Progress Bars)
const LogoXPDashboard = ({ className }: { className?: string }) => (
  <svg viewBox="0 0 100 100" fill="none" className={className}>
    {/* Profile Icon Box */}
    <rect x="10" y="20" width="25" height="25" rx="4" fill="#4F46E5"/>
    <circle cx="22.5" cy="32.5" r="6" fill="white"/>

    {/* HP Bar Container (Upper) */}
    <rect x="40" y="22" width="50" height="10" rx="2" fill="#1E293B"/>
    {/* HP Fill (Green Blocks) */}
    <rect x="42" y="24" width="10" height="6" rx="1" fill="#10B981"/>
    <rect x="54" y="24" width="10" height="6" rx="1" fill="#10B981"/>
    <rect x="66" y="24" width="10" height="6" rx="1" fill="#10B981"/>

    {/* XP Bar Container (Lower) */}
    <rect x="40" y="37" width="50" height="10" rx="2" fill="#1E293B"/>
    {/* XP Fill (Gold Blocks - Filling up) */}
    <rect x="42" y="39" width="10" height="6" rx="1" fill="#F59E0B"/>
    <rect x="54" y="39" width="10" height="6" rx="1" fill="#F59E0B"/>
    <rect x="66" y="39" width="5" height="6" rx="1" fill="#F59E0B" opacity="0.5"/> {/* Partial fill */}

    {/* Level Box */}
    <rect x="10" y="55" width="80" height="25" rx="4" fill="#F1F5F9" stroke="#CBD5E1"/>
    <text x="50" y="72" textAnchor="middle" fill="#475569" fontSize="14" fontWeight="bold">LEVEL 5</text>
  </svg>
);

// 79. BOSS FIGHT UI (Challenge vs Skills)
const LogoBossFight = ({ className }: { className?: string }) => (
  <svg viewBox="0 0 100 100" fill="none" className={className}>
    {/* The Boss (Big Red/Orange Box) */}
    <rect x="35" y="15" width="30" height="30" rx="4" fill="#B45309"/>
    {/* Boss Health Bar */}
    <rect x="35" y="10" width="30" height="4" rx="1" fill="#EF4444"/>

    {/* The Players/Skills (Small Blue Boxes) */}
    <rect x="20" y="65" width="15" height="15" rx="2" fill="#4F46E5"/>
    <rect x="42.5" y="65" width="15" height="15" rx="2" fill="#4F46E5"/>
    <rect x="65" y="65" width="15" height="15" rx="2" fill="#4F46E5"/>

    {/* Attack Lines (Projectiles) */}
    <path d="M27.5 65L40 45" stroke="#F59E0B" strokeWidth="2" strokeDasharray="4 2"/>
    <path d="M50 65L50 45" stroke="#10B981" strokeWidth="2" strokeDasharray="4 2"/>
    <path d="M72.5 65L60 45" stroke="#4F46E5" strokeWidth="2" strokeDasharray="4 2"/>

    {/* Impact Effect on Boss */}
    <circle cx="50" cy="30" r="15" stroke="white" strokeWidth="2" opacity="0.5" strokeDasharray="6 4"/>
  </svg>
);

// 80. KNOWLEDGE CRATE (Loot Box)
const LogoKnowledgeCrate = ({ className }: { className?: string }) => (
  <svg viewBox="0 0 100 100" fill="none" className={className}>
    {/* Crate Base (Perspective Box) */}
    <path d="M30 40L70 40L80 55L40 55L30 40Z" fill="#334155"/> {/* Top Rim */}
    <path d="M30 40L40 55V85L30 70V40Z" fill="#1E293B"/> {/* Left Side */}
    <path d="M40 55L80 55V85L40 85V55Z" fill="#475569"/> {/* Front Side */}

    {/* Crate Lid (Slightly Open) */}
    <path d="M30 35L70 35L80 50L40 50L30 35Z" fill="#4F46E5" stroke="#312E81" transform="translate(0, -5) rotate(-5 30 40)"/>

    {/* Light/Energy bursting out */}
    <path d="M45 35L40 10M55 35L55 5M65 35L75 10" stroke="#F59E0B" strokeWidth="3" strokeLinecap="round"/>
    <circle cx="55" cy="25" r="15" fill="#F59E0B" opacity="0.3" filter="blur(4px)"/>

    {/* Items Flying Out */}
    <rect x="48" y="15" width="8" height="10" fill="#white" rx="1" transform="rotate(-15)"/> {/* Book/Page */}
    <circle cx="65" cy="20" r="4" fill="#10B981"/> {/* Orb/Gem */}
  </svg>
);

// ==========================================
// PAGE COMPONENT
// ==========================================
export default function LogoGalleryPage() {
  const logos = [
    // 1-4 ORIGINAL
    { Comp: LogoCPA, title: "1. CPA Blocks", desc: "Metodologi, Terstruktur, Pondasi Kuat.", tags: ["Original", "Core"] },
    { Comp: LogoBars, title: "2. Level-Up Bars", desc: "Pertumbuhan, Statistik, Gamifikasi.", tags: ["Original", "Growth"] },
    { Comp: LogoGamePad, title: "3. Math Pad", desc: "Game Controller + Simbol Matematika.", tags: ["Original", "Fun"] },
    { Comp: LogoTangram, title: "4. Tangram Rocket", desc: "Bangun datar membentuk roket.", tags: ["Original", "Kids"] },
    
    // NEW CONCEPTS
    { Comp: LogoIsoBlockS, title: "5. Isometric S", desc: "Huruf S dari balok 3D (Concrete).", tags: ["Brand", "3D"] },
    { Comp: LogoFunctionS, title: "6. Function Curve", desc: "Grafik fungsi eksponensial membentuk S.", tags: ["Math", "Abstract"] },
    { Comp: LogoGoldenS, title: "7. Golden Ratio", desc: "Spiral Fibonacci (Estetika Matematika).", tags: ["Pro", "Nature"] },
    { Comp: LogoPixelSnake, title: "8. Pixel Snake", desc: "Game Retro Snake membentuk huruf S.", tags: ["Retro", "Game"] },
    { Comp: LogoSigmaShield, title: "9. Sigma Shield", desc: "Simbol Sigma dalam perisai Hero.", tags: ["Badge", "Reward"] },
    { Comp: LogoPercentCoin, title: "10. Percent Coin", desc: "Koin emas dengan simbol persen.", tags: ["Economy", "Visual"] },
    { Comp: LogoCubeMatrix, title: "11. Cube Matrix", desc: "Problem solving dalam grid matrix.", tags: ["Logic", "Tech"] },
    { Comp: LogoTarget, title: "12. Target Parabola", desc: "Akurasi jawaban dalam grafik.", tags: ["Goal", "Clean"] },
    { Comp: LogoVennPlay, title: "13. Venn Play", desc: "Irisan himpunan membentuk tombol Play.", tags: ["Smart", "Modern"] },
    { Comp: LogoDivisionQuest, title: "14. Division Quest", desc: "Simbol bagi sebagai elemen UI game.", tags: ["UI", "Direct"] },
    { Comp: LogoFractionPie, title: "15. Fraction Pie", desc: "Pecahan visual yang penuh warna.", tags: ["Pictorial", "Kids"] },
    { Comp: LogoBracketBox, title: "16. Bracket Box", desc: "Aljabar dan Koding (Kurung Kurawal).", tags: ["Code", "Algebra"] },
    { Comp: LogoInfinityPad, title: "17. Infinity Pad", desc: "Simbol tak hingga berbentuk stick game.", tags: ["Flow", "Game"] },
    { Comp: LogoTangramFly, title: "18. Tangram Fly", desc: "Variasi tangram dinamis.", tags: ["Geo", "Action"] },
    { Comp: LogoNodeNet, title: "19. Node Network", desc: "Koneksi node pengetahuan.", tags: ["Data", "Network"] },
    { Comp: LogoAbacus, title: "20. Abacus Slider", desc: "Alat hitung klasik dalam gaya UI modern.", tags: ["Classic", "Tool"] },
    { Comp: LogoTetroS, title: "21. Tetro S", desc: "Balok susun klasik (Puzzle Logic).", tags: ["Game", "Puzzle"] },
    { Comp: LogoLevelMap, title: "22. Level Map", desc: "Peta perjalanan belajar (Progression).", tags: ["Map", "Flow"] },
    { Comp: LogoCalcS, title: "23. Digi Calc", desc: "Tampilan kalkulator digital.", tags: ["Math", "Tech"] },
    { Comp: LogoDoubleCheck, title: "24. Double Check", desc: "Verifikasi ganda (Correctness).", tags: ["Success", "UI"] },
    { Comp: LogoMazeS, title: "25. Maze Runner", desc: "Labirin logika (Problem Solving).", tags: ["Logic", "Fun"] },
    { Comp: LogoBookStackS, title: "26. Book Stack", desc: "Tumpukan buku membentuk S.", tags: ["Library", "School"] },
    { Comp: LogoRocketTrail, title: "27. Rocket Trail", desc: "Jejak roket meluncur cepat.", tags: ["Action", "Speed"] },
    { Comp: LogoCircuitS, title: "28. Circuit S", desc: "Jalur PCB elektronik (Coding).", tags: ["Tech", "Code"] },
    { Comp: LogoOrigamiS, title: "29. Origami S", desc: "Lipatan kertas geometris.", tags: ["Art", "Geo"] },
    { Comp: LogoCursorS, title: "30. Cursor Click", desc: "Interaksi digital mouse.", tags: ["Computer", "Click"] },
    { Comp: LogoPencilCoaster, title: "31. Pencil Coaster", desc: "Pensil meluncur di trek kurva S.", tags: ["Fun", "School"] },
    { Comp: LogoOperatorSnake, title: "32. Math Snake", desc: "Simbol matematika seperti game Snake.", tags: ["Retro", "Math"] },
    { Comp: LogoConsoleBook, title: "33. Console Book", desc: "Buku pelajaran berbentuk handheld.", tags: ["Device", "Learn"] },
    { Comp: LogoFlexiRuler, title: "34. Flexi Ruler", desc: "Penggaris lentur membentuk jalan S.", tags: ["Tool", "Measure"] },
    { Comp: LogoMapRoute, title: "35. Map Route", desc: "Peta perjalanan menuju tujuan.", tags: ["Map", "Goal"] },
    { Comp: LogoXpScroll, title: "36. XP Scroll", desc: "Gulungan kertas kuno (Quest).", tags: ["RPG", "History"] },
    { Comp: LogoSwitchS, title: "37. Joy-S", desc: "Dua kontroler yang membentuk S.", tags: ["Modern", "Game"] },
    { Comp: LogoProtractorS, title: "38. Protractor Arc", desc: "Dua busur derajat geometri.", tags: ["Geo", "Smart"] },
    { Comp: LogoInventoryS, title: "39. Inventory Grid", desc: "Manajemen item dalam tas.", tags: ["UI", "Logic"] },
    { Comp: LogoKeycapS, title: "40. Keycap Flow", desc: "Tombol keyboard SIN (Sinau).", tags: ["PC", "Code"] },
    { Comp: LogoPenroseS, title: "41. Penrose Logic", desc: "Objek mustahil (Impossible Object).", tags: ["Smart", "Logic"] },
    { Comp: LogoOrbital, title: "42. Orbital Atom", desc: "Elektron mengelilingi inti pengetahuan.", tags: ["Science", "Core"] },
    { Comp: LogoHexaHive, title: "43. Hexa Hive", desc: "Struktur sarang lebah (Efisien).", tags: ["Nature", "Struct"] },
    { Comp: LogoGrowthBar, title: "44. Growth Bar", desc: "Grafik batang statistik kenaikan.", tags: ["Data", "Pro"] },
    { Comp: LogoCompass, title: "45. The Compass", desc: "Jangka geometri presisi.", tags: ["Tool", "Precision"] },
    { Comp: LogoPortal, title: "46. Portal Jump", desc: "Gerbang teleportasi gamifikasi.", tags: ["Game", "Magic"] },
    { Comp: LogoBrainCircuit, title: "47. Brain Circuit", desc: "Koneksi saraf dan sirkuit digital.", tags: ["AI", "Mind"] },
    { Comp: LogoLighthouse, title: "48. Lighthouse", desc: "Mercusuar pemandu belajar.", tags: ["Guide", "Hope"] },
    { Comp: LogoLayers, title: "49. Stack Layers", desc: "Lapisan pondasi pengetahuan (CPA).", tags: ["Depth", "Modern"] },
    { Comp: LogoSpark, title: "50. Sinau Spark", desc: "Percikan ide dan kecerdasan.", tags: ["Brand", "Icon"] },
    { Comp: LogoAnalogSlide, title: "51. Analog Slide", desc: "Tombol analog controller menggeser jalur S.", tags: ["Game", "Modern"] },
    { Comp: LogoPixelRamp, title: "52. Pixel Ramp", desc: "Karakter pixel meluncur di platform S.", tags: ["Retro", "Fun"] },
    { Comp: LogoUiSlider, title: "53. UI Slider", desc: "Elemen antarmuka bar penggeser.", tags: ["UI", "Clean"] },
    { Comp: LogoMarbleRun, title: "54. Marble Run", desc: "Lintasan kelereng fisik (CPA Toy).", tags: ["Toy", "Physics"] },
    { Comp: LogoArcadeSlot, title: "55. Coin Slot", desc: "Jalur masuk koin di mesin arcade.", tags: ["Arcade", "Retro"] },
    { Comp: LogoSciFiGlider, title: "56. Sci-Fi Glider", desc: "Kendaraan futuristik meninggalkan jejak S.", tags: ["Future", "Speed"] },
    { Comp: LogoDPadShift, title: "57. D-Pad Shift", desc: "Tombol arah yang bergeser posisi.", tags: ["Controller", "Tech"] },
    { Comp: LogoToggleS, title: "58. Toggle Switch", desc: "Dua saklar on/off membentuk alur S.", tags: ["UI", "Settings"] },
    { Comp: LogoAudioFader, title: "59. Audio Fader", desc: "Pengatur suara mixer berbentuk S.", tags: ["Media", "Sound"] },
    { Comp: LogoSwipeUnlock, title: "60. Swipe Unlock", desc: "Gestur 'geser untuk membuka' di HP.", tags: ["Mobile", "Touch"] },
    { Comp: LogoStackS, title: "61. Stacked S", desc: "Tumpukan kartu zig-zag (CPA Style).", tags: ["Cards", "Layout"] },
    { Comp: LogoLevelCards, title: "62. Level Path", desc: "Kartu level game berurutan.", tags: ["Game", "Map"] },
    { Comp: LogoCodeBlockS, title: "63. Code Blocks", desc: "Blok visual programming (Logic).", tags: ["Code", "Puzzle"] },
    { Comp: LogoFlashcardFan, title: "64. Flashcard Fan", desc: "Kipasan kartu belajar.", tags: ["Study", "Tool"] },
    { Comp: LogoInventoryGrid, title: "65. Inventory Grid", desc: "Grid item RPG membentuk S.", tags: ["Game", "UI"] },
    { Comp: LogoKanbanS, title: "66. Kanban Flow", desc: "Papan tugas progresif.", tags: ["Product", "Agile"] },
    { Comp: LogoIsoTiles, title: "67. Iso Map Tiles", desc: "Balok peta isometrik.", tags: ["3D", "Land"] },
    { Comp: LogoMemoryMatch, title: "68. Memory Match", desc: "Grid kartu memori yang terbuka.", tags: ["Game", "Brain"] },
    { Comp: LogoSlideStream, title: "69. Slide Stream", desc: "Alur presentasi slide.", tags: ["Media", "Story"] },
    { Comp: LogoDialogS, title: "70. Dialog Chain", desc: "Balon percakapan saling sahut.", tags: ["Chat", "Lang"] },
    { Comp: LogoTacticalGrid, title: "71. Tactical Grid", desc: "Peta strategi isometrik berbasis giliran.", tags: ["Strategy", "Map"] },
    { Comp: LogoInventoryHeroes, title: "72. Inventory UI", desc: "Slot inventaris RPG dengan item belajar.", tags: ["RPG", "UI"] },
    { Comp: LogoCardDuel, title: "73. Card Duel", desc: "Pertarungan kartu trading (TCG).", tags: ["Cards", "Battle"] },
    { Comp: LogoPixelBuilder, title: "74. Pixel Builder", desc: "Membangun struktur blok demi blok.", tags: ["Sandbox", "Create"] },
    { Comp: LogoControllerGrid, title: "75. Controller Grid", desc: "Kontroler dengan tombol berbentuk data grid.", tags: ["Device", "Data"] },
    { Comp: LogoDungeonMap, title: "76. Dungeon Path", desc: "Navigasi peta grid dungeon.", tags: ["Adventure", "Path"] },
    { Comp: LogoTetroLearn, title: "77. Tetro Blocks", desc: "Menyusun balok puzzle agar pas.", tags: ["Puzzle", "Logic"] },
    { Comp: LogoXPDashboard, title: "78. XP Dashboard", desc: "Tampilan status bar HP dan XP.", tags: ["HUD", "Progress"] },
    { Comp: LogoBossFight, title: "79. Boss Fight UI", desc: "Tantangan besar vs skill kecil.", tags: ["Action", "Challenge"] },
    { Comp: LogoKnowledgeCrate, title: "80. Loot Crate", desc: "Kotak harta karun berisi pengetahuan.", tags: ["Reward", "Surprise"] },
  ];

  return (
    <div className="min-h-screen bg-slate-50 font-sans py-16 px-4 md:px-8">
      <div className="max-w-7xl mx-auto space-y-12">
        
        <div className="text-center space-y-4">
            <h1 className="text-4xl font-black text-slate-900 tracking-tight">Sinau 20 Logo Concepts</h1>
            <p className="text-slate-500 text-lg max-w-2xl mx-auto">
                Koleksi lengkap 20 identitas visual. Menggabungkan CPA, Matematika, dan Gamifikasi.
            </p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-6">
            {logos.map((item, idx) => (
                <div key={idx} className="bg-white rounded-[2rem] p-5 shadow-sm border border-slate-100 hover:shadow-xl hover:scale-[1.05] transition-all group flex flex-col gap-3">
                    
                    {/* Visual Container */}
                    <div className="bg-slate-50 w-full aspect-square rounded-2xl flex items-center justify-center p-4 group-hover:bg-indigo-50 transition-colors relative overflow-hidden">
                        <item.Comp className="w-full h-full drop-shadow-md z-10" />
                        
                        {/* Background Deco */}
                        <div className="absolute top-0 right-0 w-16 h-16 bg-white opacity-20 rounded-bl-full z-0 transform translate-x-2 -translate-y-2" />
                    </div>

                    {/* Info */}
                    <div className="space-y-1">
                        <div className="flex flex-wrap gap-1 mb-1">
                            {item.tags.map(t => (
                                <span key={t} className={`text-[9px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-sm ${t === 'Original' ? 'bg-indigo-100 text-indigo-600' : 'bg-slate-100 text-slate-500'}`}>
                                    {t}
                                </span>
                            ))}
                        </div>
                        <h3 className="text-sm font-bold text-slate-800 leading-tight">{item.title}</h3>
                        <p className="text-[10px] text-slate-400 leading-relaxed line-clamp-2">{item.desc}</p>
                    </div>
                </div>
            ))}
        </div>

        <div className="text-center pt-10 border-t border-slate-200">
            <p className="text-slate-400 text-sm">Dikurasi untuk Sinau EdTech.</p>
        </div>

      </div>
    </div>
  )
}