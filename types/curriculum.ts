// types/curriculum.ts

// 1. Tipe-tipe segmen yang tersedia
export type SegmentType = 
  | 'slide_concrete' 
  | 'slide_pictorial' 
  | 'slide_abstract' 
  | 'game_mini' 
  | 'game_boss';

// 2. Struktur untuk setiap Segmen
export interface LessonSegment {
  type: SegmentType;
  // Konten bisa fleksibel tergantung tipe
  content?: {
    image?: any;       // Bisa string url atau import image
    title?: string;
    question?: string;
    description?: string;
    audio?: string;
    symbol?: string;   // Khusus Abstract
  };
  // Config khusus untuk Game
  config?: {
    targetNumber?: number;
    spawnRate?: 'slow' | 'fast';
    bossHp?: number;
    questions?: number[];
  };
}

// 3. Struktur Bab (SubChapter)
export interface SubChapter {
  id: string;
  title: string;
  segments: LessonSegment[]; // Ini urutan mainnya (Slide -> Game -> Boss)
}

// 4. Struktur Kurikulum Utama
export interface CurriculumChapter {
  id: string;
  title: string;
  subChapters: SubChapter[];
}