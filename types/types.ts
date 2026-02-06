// types.ts
export type VisualType = 'grid' | 'ten-frame' | 'card' | 'image';

export interface VisualData {
  type: VisualType;
  count?: number; // Untuk grid/ten-frame
  icon?: string;
  content?: string; // Untuk card
  subContent?: string;
  src?: string; // Untuk image
  size?: 'sm' | 'md' | 'lg';
}

export interface LessonSlide {
  id?: string;
  character: string;
  dialogue: string;
  visual: VisualData;
  progress?: number; // Gamification: 0-100
}

// FILE: types/index.ts



