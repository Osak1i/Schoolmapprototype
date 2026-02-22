import { Info, Map, Navigation, X } from 'lucide-react';
import { Button } from './ui/button';

interface MenuDrawerProps {
  isOpen: boolean;
  onClose: () => void;
}

export function MenuDrawer({ isOpen, onClose }: MenuDrawerProps) {
  if (!isOpen) return null;

  return (
    <div className="absolute inset-0 z-40 animate-in fade-in duration-200" onClick={onClose}>
      <div 
        className="absolute top-20 right-4 bg-white rounded-2xl shadow-2xl w-72 border-2 border-gray-200 animate-in slide-in-from-top duration-300"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="p-6">
          <div className="flex items-center justify-between mb-6">
            <h3 className="font-bold text-xl">Menu</h3>
            <Button
              variant="ghost"
              size="icon"
              onClick={onClose}
              className="h-8 w-8"
            >
              <X className="h-5 w-5" />
            </Button>
          </div>

          <div className="space-y-4">
            <div className="flex items-start gap-3 p-3 bg-[#FCE8E9] rounded-lg">
              <div className="bg-[#A82227] p-2 rounded-full">
                <Map className="h-5 w-5 text-white" />
              </div>
              <div>
                <p className="font-semibold text-sm">Interactive Map</p>
                <p className="text-xs text-gray-600">Tap any room to view details</p>
              </div>
            </div>

            <div className="flex items-start gap-3 p-3 bg-[#FCE8E9] rounded-lg">
              <div className="bg-[#A82227] p-2 rounded-full">
                <Navigation className="h-5 w-5 text-white" />
              </div>
              <div>
                <p className="font-semibold text-sm">Path Finder</p>
                <p className="text-xs text-gray-600">Set start and destination to find the shortest route</p>
              </div>
            </div>

            <div className="flex items-start gap-3 p-3 bg-[#FCE8E9] rounded-lg">
              <div className="bg-[#A82227] p-2 rounded-full">
                <Info className="h-5 w-5 text-white" />
              </div>
              <div>
                <p className="font-semibold text-sm">Room Information</p>
                <p className="text-xs text-gray-600">See teacher names and room purposes</p>
              </div>
            </div>
          </div>

          <div className="mt-6 pt-6 border-t border-gray-200">
            <p className="text-xs text-gray-500 text-center">
              RTK Navigation System v1.0
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}