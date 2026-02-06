import MaterialLayout from "./MaterialLayout";
// Import semua Game Layout disini
import GameGuessLayout from "../games/GameGuessLayout";
import GameDragDropLayout from "../games/GameDragDropLayout";
import GameFillBlankLayout from "@/components/games/GameFillBlankLayout";
import GameSortingLayout from "../games/GameSortingLayout";

interface SegmentManagerProps {
  segment: any;
  userRole?: string;
  currentUser?: any;
  classStudents?: any[];
  onNext: () => void;
  onXpUpdate?: (amount: number) => void;
}

export function SegmentManager({ segment, userRole, currentUser, classStudents, onNext, onXpUpdate }: SegmentManagerProps) {
  
  if (!segment) return <div>Error: Segment Data Missing</div>;

  switch (segment.type) {
    
    // 1. TIPE MATERI (SLIDE BELAJAR)
    // MaterialLayout akan memanggil VisualRenderer di dalamnya
    case 'material':
      return <MaterialLayout data={segment} onNext={onNext} />;

    // 2. TIPE GAME: TEBAK ANGKA
    case 'game_guess':
      return (
        <GameGuessLayout 
            data={segment}
            userRole={(userRole as "student" | "teacher") || 'student'}
            currentUser={currentUser}
            classList={classStudents}
            onComplete={onNext}
            onXpUpdate={onXpUpdate}
        />
      );

    // 3. TIPE GAME: DRAG DROP
    case 'game_drag_drop':
      return (
        <GameDragDropLayout 
            data={segment} // Kirim data config game dari JSON
            userRole={(userRole as "student" | "teacher") || 'student'}
            currentUser={currentUser}
            classList={classStudents}
            onComplete={onNext}
            onXpUpdate={onXpUpdate}
        />
      );

    case 'game_fill_blank':
    return (
        <GameFillBlankLayout 
          data={segment} // Config (opsional)
          userRole={(userRole as "student" | "teacher") || 'student'}
          currentUser={currentUser}
          classList={classStudents}
          onComplete={onNext}
          onXpUpdate={onXpUpdate}
        />
    );

    case 'game_sorting':
    return <GameSortingLayout 
              userRole={userRole} 
              currentUser={currentUser} 
              classList={classStudents}
              onComplete={onNext} 
              onXpUpdate={onXpUpdate} 
          />;

    // 4. TIPE GAME: BOSS

    // DEFAULT
    default:
      return (
        <div className="flex items-center justify-center h-full text-white font-bold">
            Tipe Segment "{segment.type}" belum didukung oleh SegmentManager.
        </div>
      );
  }
}