import { Layers } from 'lucide-react';

interface FloorSelectorProps {
  currentFloor: number;
  floors: { level: number; name: string }[];
  onFloorChange: (floor: number) => void;
}

export function FloorSelector({ currentFloor, floors, onFloorChange }: FloorSelectorProps) {
  return (
    <div className="absolute right-3 top-1/2 -translate-y-1/2 z-20">
      <div className="flex flex-col gap-2">
        <div className="bg-[#A82227] text-white px-2 py-2 rounded-lg shadow-lg text-center">
          <Layers className="h-5 w-5 mx-auto mb-1" />
          <p className="text-[10px] font-bold">FLOOR</p>
        </div>
        
        {floors.slice().reverse().map((floor) => (
          <button
            key={floor.level}
            onClick={() => onFloorChange(floor.level)}
            className={`
              px-3 py-3 rounded-lg shadow-lg font-bold text-sm min-w-[48px] transition-all
              ${currentFloor === floor.level 
                ? 'bg-[#A82227] text-white scale-110' 
                : 'bg-white text-[#A82227] border-2 border-[#A5968A] hover:bg-[#FCE8E9]'
              }
            `}
          >
            {floor.name}
          </button>
        ))}
      </div>
    </div>
  );
}
