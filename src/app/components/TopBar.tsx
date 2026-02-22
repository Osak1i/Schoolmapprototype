import { Menu, X } from 'lucide-react';
import { Button } from './ui/button';
import logo from 'figma:asset/b8657e9ca782a70d48929db5c3dbd121aad8d827.png';

interface TopBarProps {
  onMenuClick: () => void;
  isMenuOpen: boolean;
  currentBuilding?: string;
  currentFloor?: string;
}

export function TopBar({ onMenuClick, isMenuOpen, currentBuilding, currentFloor }: TopBarProps) {
  return (
    <div className="absolute top-0 left-0 right-0 bg-gradient-to-b from-[#A82227] to-[#8B1C20] text-white px-4 py-3 shadow-lg z-10">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="bg-white p-1.5 rounded-full">
            <img src={logo} alt="RTK Logo" className="w-10 h-10 object-contain" />
          </div>
          <div>
            <h1 className="font-bold text-lg">RTK Navigator</h1>
            <div className="flex items-center gap-2">
              <p className="text-xs text-red-100">Rīgas Tehniskā Koledža</p>
              {currentBuilding && currentFloor && (
                <>
                  <span className="text-red-200">•</span>
                  <span className="text-xs bg-white/20 px-2 py-0.5 rounded-full font-semibold">
                    {currentBuilding} - {currentFloor}
                  </span>
                </>
              )}
            </div>
          </div>
        </div>
        <Button
          variant="ghost"
          size="icon"
          onClick={onMenuClick}
          className="h-10 w-10 text-white hover:bg-white/20"
        >
          {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
        </Button>
      </div>
    </div>
  );
}