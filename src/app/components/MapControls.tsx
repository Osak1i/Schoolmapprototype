import { useState } from 'react';
import { Building2, Layers, ZoomIn, ZoomOut, Maximize2, ChevronDown } from 'lucide-react';
import { Button } from './ui/button';

interface MapControlsProps {
  // Building controls
  buildings: { id: string; name: string; shortName: string }[];
  currentBuilding: string;
  onBuildingChange: (buildingId: string) => void;
  
  // Floor controls
  floors: { level: number; name: string }[];
  currentFloor: number;
  onFloorChange: (floor: number) => void;
  
  // Zoom controls
  scale: number;
  onZoomIn: () => void;
  onZoomOut: () => void;
  onZoomReset: () => void;
}

export function MapControls({
  buildings,
  currentBuilding,
  onBuildingChange,
  floors,
  currentFloor,
  onFloorChange,
  scale,
  onZoomIn,
  onZoomOut,
  onZoomReset
}: MapControlsProps) {
  const [buildingMenuOpen, setBuildingMenuOpen] = useState(false);
  const [floorMenuOpen, setFloorMenuOpen] = useState(false);
  const [zoomMenuOpen, setZoomMenuOpen] = useState(false);

  const currentBuildingData = buildings.find(b => b.id === currentBuilding);
  const currentFloorData = floors.find(f => f.level === currentFloor);

  return (
    <>
      {/* Building Control - Top Left */}
      <div className="absolute top-24 left-4 z-20">
        <div className="relative">
          <button
            onClick={() => {
              setBuildingMenuOpen(!buildingMenuOpen);
              setFloorMenuOpen(false);
              setZoomMenuOpen(false);
            }}
            className="bg-white rounded-xl shadow-lg px-4 py-3 flex items-center gap-3 border-2 border-[#A5968A] hover:bg-[#FCE8E9] transition-all"
          >
            <div className="bg-[#A82227] p-2 rounded-lg">
              <Building2 className="h-5 w-5 text-white" />
            </div>
            <div className="text-left">
              <p className="text-[10px] text-[#A5968A] font-semibold uppercase">Building</p>
              <p className="text-sm font-bold text-[#A82227]">{currentBuildingData?.shortName} - {currentBuildingData?.name}</p>
            </div>
            <ChevronDown className={`h-4 w-4 text-[#A82227] transition-transform ${buildingMenuOpen ? 'rotate-180' : ''}`} />
          </button>

          {/* Building Dropdown */}
          {buildingMenuOpen && (
            <div className="absolute top-full left-0 mt-2 bg-white rounded-xl shadow-xl border-2 border-[#A5968A] p-2 min-w-full">
              {buildings.map((building) => (
                <button
                  key={building.id}
                  onClick={() => {
                    onBuildingChange(building.id);
                    setBuildingMenuOpen(false);
                  }}
                  className={`
                    w-full text-left px-4 py-3 rounded-lg transition-all mb-1 last:mb-0
                    ${currentBuilding === building.id 
                      ? 'bg-[#A82227] text-white font-bold' 
                      : 'hover:bg-[#FCE8E9] text-[#A82227]'
                    }
                  `}
                >
                  <div className="flex items-center gap-2">
                    <span className="font-bold text-lg">{building.shortName}</span>
                    <span className="text-sm">{building.name}</span>
                  </div>
                </button>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Floor Control - Top Right */}
      <div className="absolute top-24 right-4 z-20">
        <div className="relative">
          <button
            onClick={() => {
              setFloorMenuOpen(!floorMenuOpen);
              setBuildingMenuOpen(false);
              setZoomMenuOpen(false);
            }}
            className="bg-white rounded-xl shadow-lg px-4 py-3 flex items-center gap-3 border-2 border-[#A5968A] hover:bg-[#FCE8E9] transition-all"
          >
            <div className="bg-[#A82227] p-2 rounded-lg">
              <Layers className="h-5 w-5 text-white" />
            </div>
            <div className="text-left">
              <p className="text-[10px] text-[#A5968A] font-semibold uppercase">Floor</p>
              <p className="text-sm font-bold text-[#A82227]">{currentFloorData?.name} - Floor {currentFloor}</p>
            </div>
            <ChevronDown className={`h-4 w-4 text-[#A82227] transition-transform ${floorMenuOpen ? 'rotate-180' : ''}`} />
          </button>

          {/* Floor Dropdown */}
          {floorMenuOpen && (
            <div className="absolute top-full right-0 mt-2 bg-white rounded-xl shadow-xl border-2 border-[#A5968A] p-2 min-w-[160px]">
              {floors.slice().reverse().map((floor) => (
                <button
                  key={floor.level}
                  onClick={() => {
                    onFloorChange(floor.level);
                    setFloorMenuOpen(false);
                  }}
                  className={`
                    w-full text-left px-4 py-3 rounded-lg transition-all mb-1 last:mb-0
                    ${currentFloor === floor.level 
                      ? 'bg-[#A82227] text-white font-bold' 
                      : 'hover:bg-[#FCE8E9] text-[#A82227]'
                    }
                  `}
                >
                  <div className="flex items-center justify-between">
                    <span className="font-bold">{floor.name}</span>
                    <span className="text-sm opacity-80">Level {floor.level}</span>
                  </div>
                </button>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Zoom Control - Bottom Right */}
      <div className="absolute bottom-44 right-4 z-20">
        <div className="relative">
          <button
            onClick={() => {
              setZoomMenuOpen(!zoomMenuOpen);
              setBuildingMenuOpen(false);
              setFloorMenuOpen(false);
            }}
            className="bg-white rounded-xl shadow-lg px-4 py-3 flex items-center gap-3 border-2 border-[#A5968A] hover:bg-[#FCE8E9] transition-all"
          >
            <div className="bg-[#A82227] p-2 rounded-lg">
              <Maximize2 className="h-5 w-5 text-white" />
            </div>
            <div className="text-left">
              <p className="text-[10px] text-[#A5968A] font-semibold uppercase">Zoom</p>
              <p className="text-sm font-bold text-[#A82227]">{Math.round(scale * 100)}%</p>
            </div>
            <ChevronDown className={`h-4 w-4 text-[#A82227] transition-transform ${zoomMenuOpen ? 'rotate-180' : ''}`} />
          </button>

          {/* Zoom Dropdown */}
          {zoomMenuOpen && (
            <div className="absolute bottom-full right-0 mb-2 bg-white rounded-xl shadow-xl border-2 border-[#A5968A] p-3 min-w-[200px]">
              <div className="space-y-2">
                <Button
                  onClick={() => {
                    onZoomIn();
                  }}
                  className="w-full bg-white border-2 border-[#A5968A] text-[#A82227] hover:bg-[#FCE8E9] font-bold"
                >
                  <ZoomIn className="h-4 w-4 mr-2" />
                  Zoom In
                </Button>
                
                <Button
                  onClick={() => {
                    onZoomOut();
                  }}
                  className="w-full bg-white border-2 border-[#A5968A] text-[#A82227] hover:bg-[#FCE8E9] font-bold"
                >
                  <ZoomOut className="h-4 w-4 mr-2" />
                  Zoom Out
                </Button>
                
                <div className="border-t-2 border-[#A5968A] pt-2">
                  <Button
                    onClick={() => {
                      onZoomReset();
                    }}
                    className="w-full bg-[#A82227] text-white hover:bg-[#8B1C20] font-bold"
                  >
                    <Maximize2 className="h-4 w-4 mr-2" />
                    Reset View
                  </Button>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Overlay to close menus when clicking outside */}
      {(buildingMenuOpen || floorMenuOpen || zoomMenuOpen) && (
        <div 
          className="fixed inset-0 z-10" 
          onClick={() => {
            setBuildingMenuOpen(false);
            setFloorMenuOpen(false);
            setZoomMenuOpen(false);
          }}
        />
      )}
    </>
  );
}
