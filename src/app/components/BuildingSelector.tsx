import { Building2 } from 'lucide-react';

interface BuildingSelectorProps {
  currentBuilding: string;
  buildings: { id: string; name: string; shortName: string }[];
  onBuildingChange: (buildingId: string) => void;
}

export function BuildingSelector({ currentBuilding, buildings, onBuildingChange }: BuildingSelectorProps) {
  return (
    <div className="absolute left-3 top-1/2 -translate-y-1/2 z-20">
      <div className="flex flex-col gap-2">
        <div className="bg-[#A82227] text-white px-2 py-2 rounded-lg shadow-lg text-center">
          <Building2 className="h-5 w-5 mx-auto mb-1" />
          <p className="text-[10px] font-bold">BUILDING</p>
        </div>
        
        {buildings.map((building) => (
          <button
            key={building.id}
            onClick={() => onBuildingChange(building.id)}
            className={`
              px-3 py-3 rounded-lg shadow-lg font-bold text-sm transition-all
              ${currentBuilding === building.id 
                ? 'bg-[#A82227] text-white scale-110' 
                : 'bg-white text-[#A82227] border-2 border-[#A5968A] hover:bg-[#FCE8E9]'
              }
            `}
          >
            {building.shortName}
          </button>
        ))}
      </div>
    </div>
  );
}
