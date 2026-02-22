import { Room } from '../types/map';
import { MapPin, Search } from 'lucide-react';
import { useState } from 'react';

interface RoomSelectorProps {
  rooms: Room[];
  title: string;
  onSelect: (roomId: string) => void;
  onClose: () => void;
  allowEntrance?: boolean;
}

export function RoomSelector({ rooms, title, onSelect, onClose, allowEntrance = false }: RoomSelectorProps) {
  const [searchTerm, setSearchTerm] = useState('');

  const filteredRooms = rooms.filter(room => 
    room.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    room.number.toLowerCase().includes(searchTerm.toLowerCase()) ||
    room.teacher.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleSelect = (roomId: string) => {
    onSelect(roomId);
    onClose();
  };

  return (
    <div className="absolute inset-0 bg-black/50 z-50 animate-in fade-in duration-200" onClick={onClose}>
      <div 
        className="absolute bottom-0 left-0 right-0 bg-white rounded-t-3xl max-h-[80vh] overflow-hidden animate-in slide-in-from-bottom duration-300"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="w-12 h-1.5 bg-[#A5968A] rounded-full mx-auto mt-3 mb-4" />
        
        <div className="px-6 pb-6">
          <h2 className="text-2xl font-bold mb-4 text-[#A82227]">{title}</h2>
          
          {/* Search */}
          <div className="relative mb-4">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
            <input
              type="text"
              placeholder="Search rooms..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-3 border-2 border-[#A5968A] rounded-xl focus:border-[#A82227] focus:outline-none"
            />
          </div>

          {/* Room List */}
          <div className="space-y-2 max-h-[50vh] overflow-y-auto">
            {allowEntrance && (
              <button
                onClick={() => handleSelect('entrance')}
                className="w-full flex items-center gap-3 p-4 bg-[#F5F1ED] border-2 border-[#A5968A] rounded-xl hover:bg-[#E8E1D9] active:bg-[#DDD5CB] transition-colors"
              >
                <div className="bg-[#A5968A] text-white px-3 py-1 rounded-full text-sm font-bold">
                  ENTRY
                </div>
                <div className="flex-1 text-left">
                  <p className="font-semibold">Main Entrance</p>
                  <p className="text-sm text-gray-600">School Entry Point</p>
                </div>
                <MapPin className="h-5 w-5 text-[#A5968A]" />
              </button>
            )}

            {filteredRooms.map((room) => (
              <button
                key={room.id}
                onClick={() => handleSelect(room.id)}
                className="w-full flex items-center gap-3 p-4 bg-gray-50 border-2 border-gray-200 rounded-xl hover:bg-[#FCE8E9] hover:border-[#A82227] active:bg-[#F8D4D5] transition-colors"
              >
                <div className="bg-[#A82227] text-white px-3 py-1 rounded-full text-sm font-bold">
                  {room.number}
                </div>
                <div className="flex-1 text-left">
                  <p className="font-semibold">{room.name}</p>
                  <p className="text-sm text-gray-600">{room.teacher}</p>
                </div>
                <MapPin className="h-5 w-5 text-[#A82227]" />
              </button>
            ))}

            {filteredRooms.length === 0 && (
              <div className="text-center py-8 text-gray-500">
                <p>No rooms found</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}