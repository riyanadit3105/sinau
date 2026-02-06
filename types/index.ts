// types/index.ts

export type VisualType = 
  | 'image' 
  | 'video' 
  | 'chart_place_value' 
  | 'equation' 
  | 'animation_shift_decimal';

export interface VisualData {
  type: VisualType;
  // Properti dinamis (bisa apa saja tergantung type)
  src?: string;       // Untuk image
  caption?: string;   // Untuk image
  content?: string;   // Untuk equation
  color?: string;     // Untuk equation
  data?: any;         // Untuk chart
  highlight?: string[]; // Untuk chart
  number?: number;    // Untuk animation
  operation?: string; // Untuk animation
  result?: number;    // Untuk animation
}

// FILE: types/index.ts

export interface User {
  // --- Properti Wajib ---
  id: string;
  name: string; // Ubah jadi wajib jika di DB selalu ada
  email: string;
  role: "student" | "teacher" | "school";

  // --- Properti Sekolah/Kelas ---
  schoolId?: string | null;
  classId?: string | null;
  className?: string | null; // <--- INI YANG BIKIN ERROR DI TV

  // --- Properti Gamifikasi (Student) ---
  xp?: number;
  completedLevels?: string[];
  
  // --- Properti Lain ---
  password?: string;
}