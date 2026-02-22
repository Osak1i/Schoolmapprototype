import { Room } from '../types/map';
import { MapPin, Navigation, Locate, X } from 'lucide-react';
import { Button } from './ui/button';

interface BottomControlsProps {
  rooms: Room[];
  startRoom: string | null;
  destinationRoom: string | null;
  hasActivePath: boolean;
  onStartClick: () => void;
  onDestinationClick: () => void;
  onClearPath: () => void;
}

export function BottomControls({
  rooms,
  startRoom,
  destinationRoom,
  hasActivePath,
  onStartClick,
  onDestinationClick,
  onClearPath
}: BottomControlsProps) {
  const startRoomData = startRoom === 'entrance' 
    ? { number: 'Entry', name: 'Main Entrance' }
    : rooms.find(r => r.id === startRoom);
    
  const destRoomData = rooms.find(r => r.id === destinationRoom);

  return (
    <div className="absolute bottom-0 left-0 right-0 bg-white border-t-2 border-[#A5968A] px-4 py-3 shadow-2xl">
      <div className="space-y-2">
        {/* Start Location */}
        <button
          onClick={onStartClick}
          className="w-full flex items-center gap-3 bg-[#F5F1ED] border-2 border-[#A5968A] rounded-xl p-3 active:bg-[#E8E1D9] transition-colors"
        >
          <div className="bg-[#A5968A] p-2 rounded-full">
            <Locate className="h-4 w-4 text-white" />
          </div>
          <div className="flex-1 text-left">
            <p className="text-xs text-[#6B6159] font-medium">Starting Point</p>
            <p className="font-semibold text-gray-900">
              {startRoomData ? `${startRoomData.number} - ${startRoomData.name}` : 'Select start'}
            </p>
          </div>
          <div className="text-[#A5968A]">
            <MapPin className="h-5 w-5" />
          </div>
        </button>

        {/* Destination */}
        <button
          onClick={onDestinationClick}
          className="w-full flex items-center gap-3 bg-[#FCE8E9] border-2 border-[#A82227] rounded-xl p-3 active:bg-[#F8D4D5] transition-colors"
        >
          <div className="bg-[#A82227] p-2 rounded-full">
            <Navigation className="h-4 w-4 text-white" />
          </div>
          <div className="flex-1 text-left">
            <p className="text-xs text-[#8B1C20] font-medium">Destination</p>
            <p className="font-semibold text-gray-900">
              {destRoomData ? `${destRoomData.number} - ${destRoomData.name}` : 'Select destination'}
            </p>
          </div>
          <div className="text-[#A82227]">
            <MapPin className="h-5 w-5" />
          </div>
        </button>

        {/* Clear Path Button */}
        {hasActivePath && (
          <Button
            onClick={onClearPath}
            variant="outline"
            className="w-full h-12 rounded-xl border-2 border-[#A5968A] text-[#A82227] hover:bg-[#F5F1ED]"
          >
            <X className="h-4 w-4 mr-2" />
            Clear Route
          </Button>
        )}
      </div>
    </div>
  );
}