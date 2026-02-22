import { Room } from '../types/map';
import { X, MapPin, User, BookOpen, Navigation } from 'lucide-react';
import { Button } from './ui/button';

interface RoomInfoProps {
  room: Room | null;
  onClose: () => void;
  onNavigate: (roomId: string) => void;
}

export function RoomInfo({ room, onClose, onNavigate }: RoomInfoProps) {
  if (!room) return null;

  return (
    <div className="absolute bottom-0 left-0 right-0 bg-white rounded-t-3xl shadow-2xl border-t-2 border-[#A5968A] animate-in slide-in-from-bottom duration-300">
      <div className="w-12 h-1.5 bg-[#A5968A] rounded-full mx-auto mt-3 mb-4" />
      
      <div className="px-6 pb-6">
        <div className="flex justify-between items-start mb-4">
          <div>
            <div className="inline-block bg-[#A82227] text-white px-3 py-1 rounded-full text-sm font-bold mb-2">
              Room {room.number}
            </div>
            <h2 className="text-2xl font-bold">{room.name}</h2>
          </div>
          <Button
            variant="ghost"
            size="icon"
            onClick={onClose}
            className="h-10 w-10 rounded-full"
          >
            <X className="h-5 w-5" />
          </Button>
        </div>

        <div className="space-y-4 mb-6">
          <div className="flex items-center gap-3 bg-[#F5F1ED] p-3 rounded-lg">
            <div className="bg-[#FCE8E9] p-2 rounded-full">
              <User className="h-5 w-5 text-[#A82227]" />
            </div>
            <div>
              <p className="text-xs text-[#6B6159]">Teacher</p>
              <p className="font-semibold">{room.teacher}</p>
            </div>
          </div>

          <div className="flex items-center gap-3 bg-[#F5F1ED] p-3 rounded-lg">
            <div className="bg-[#FCE8E9] p-2 rounded-full">
              <BookOpen className="h-5 w-5 text-[#A82227]" />
            </div>
            <div>
              <p className="text-xs text-[#6B6159]">Purpose</p>
              <p className="font-semibold">{room.purpose}</p>
            </div>
          </div>

          <div className="flex items-center gap-3 bg-[#F5F1ED] p-3 rounded-lg">
            <div className="bg-[#FCE8E9] p-2 rounded-full">
              <MapPin className="h-5 w-5 text-[#A82227]" />
            </div>
            <div>
              <p className="text-xs text-[#6B6159]">Location</p>
              <p className="font-semibold">First Floor, Room {room.number}</p>
            </div>
          </div>
        </div>

        <Button
          onClick={() => onNavigate(room.id)}
          className="w-full h-14 text-lg rounded-xl bg-[#A82227] hover:bg-[#8B1C20]"
          size="lg"
        >
          <Navigation className="h-5 w-5 mr-2" />
          Navigate to this Room
        </Button>
      </div>
    </div>
  );
}