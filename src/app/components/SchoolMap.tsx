import { Room, Node, PathSegment } from '../types/map';
import { useState, useRef, useEffect } from 'react';

interface SchoolMapProps {
  rooms: Room[];
  nodes: Node[];
  selectedRoom: Room | null;
  onRoomClick: (room: Room) => void;
  path: PathSegment[];
  highlightedRooms: string[];
  scale: number;
  position: { x: number; y: number };
  onScaleChange: (scale: number) => void;
  onPositionChange: (position: { x: number; y: number }) => void;
}

export function SchoolMap({ 
  rooms, 
  nodes, 
  selectedRoom, 
  onRoomClick, 
  path,
  highlightedRooms,
  scale,
  position,
  onScaleChange,
  onPositionChange
}: SchoolMapProps) {
  const [isDragging, setIsDragging] = useState(false);
  const [dragStart, setDragStart] = useState({ x: 0, y: 0 });
  const containerRef = useRef<HTMLDivElement>(null);
  const lastTouchDistance = useRef<number | null>(null);

  // Handle wheel zoom
  const handleWheel = (e: React.WheelEvent) => {
    e.preventDefault();
    const delta = e.deltaY > 0 ? 0.9 : 1.1;
    const newScale = Math.min(Math.max(0.5, scale * delta), 3);
    onScaleChange(newScale);
  };

  // Handle mouse/touch start
  const handlePointerDown = (e: React.MouseEvent | React.TouchEvent) => {
    if ('touches' in e && e.touches.length === 2) {
      // Pinch zoom start
      const touch1 = e.touches[0];
      const touch2 = e.touches[1];
      const distance = Math.hypot(
        touch2.clientX - touch1.clientX,
        touch2.clientY - touch1.clientY
      );
      lastTouchDistance.current = distance;
      return;
    }

    setIsDragging(true);
    const clientX = 'touches' in e ? e.touches[0].clientX : e.clientX;
    const clientY = 'touches' in e ? e.touches[0].clientY : e.clientY;
    setDragStart({
      x: clientX - position.x,
      y: clientY - position.y
    });
  };

  // Handle mouse/touch move
  const handlePointerMove = (e: React.MouseEvent | React.TouchEvent) => {
    if ('touches' in e && e.touches.length === 2) {
      // Pinch zoom
      e.preventDefault();
      const touch1 = e.touches[0];
      const touch2 = e.touches[1];
      const distance = Math.hypot(
        touch2.clientX - touch1.clientX,
        touch2.clientY - touch1.clientY
      );
      
      if (lastTouchDistance.current) {
        const delta = distance / lastTouchDistance.current;
        const newScale = Math.min(Math.max(0.5, scale * delta), 3);
        onScaleChange(newScale);
      }
      
      lastTouchDistance.current = distance;
      return;
    }

    if (!isDragging) return;
    
    e.preventDefault();
    const clientX = 'touches' in e ? e.touches[0].clientX : e.clientX;
    const clientY = 'touches' in e ? e.touches[0].clientY : e.clientY;
    
    onPositionChange({
      x: clientX - dragStart.x,
      y: clientY - dragStart.y
    });
  };

  // Handle mouse/touch end
  const handlePointerUp = () => {
    setIsDragging(false);
    lastTouchDistance.current = null;
  };

  // Handle room click - prevent if dragging
  const handleRoomClickInternal = (room: Room, e: React.MouseEvent) => {
    if (isDragging) {
      e.stopPropagation();
      return;
    }
    onRoomClick(room);
  };

  useEffect(() => {
    const handleMouseUp = () => setIsDragging(false);
    window.addEventListener('mouseup', handleMouseUp);
    window.addEventListener('touchend', handleMouseUp);
    return () => {
      window.removeEventListener('mouseup', handleMouseUp);
      window.removeEventListener('touchend', handleMouseUp);
    };
  }, []);
  
  return (
    <div
      className="w-full h-full flex items-center justify-center bg-gray-100 overflow-hidden"
      ref={containerRef}
      onWheel={handleWheel}
      onMouseDown={handlePointerDown}
      onMouseMove={handlePointerMove}
      onMouseUp={handlePointerUp}
      onTouchStart={handlePointerDown}
      onTouchMove={handlePointerMove}
      onTouchEnd={handlePointerUp}
      style={{ touchAction: 'none' }}
    >
      <div
        style={{
          transform: `translate(${position.x}px, ${position.y}px) scale(${scale})`,
          transformOrigin: 'center',
          transition: isDragging ? 'none' : 'transform 0.1s ease-out',
        }}
      >
        <svg
          viewBox="0 0 720 450"
          className="w-full h-full"
          style={{ 
            width: '720px', 
            height: '450px',
            cursor: isDragging ? 'grabbing' : 'grab'
          }}
        >
          {/* Floor/Background */}
          <rect x="0" y="0" width="720" height="450" fill="#fafafa" />
          
          {/* Hallways */}
          {/* Vertical hallway - left */}
          <rect x="210" y="40" width="40" height="320" fill="#e5e7eb" stroke="#d1d5db" strokeWidth="2" />
          
          {/* Vertical hallway - right */}
          <rect x="400" y="40" width="40" height="320" fill="#e5e7eb" stroke="#d1d5db" strokeWidth="2" />
          
          {/* Horizontal hallways */}
          <rect x="210" y="70" width="230" height="40" fill="#e5e7eb" stroke="#d1d5db" strokeWidth="2" />
          <rect x="210" y="180" width="230" height="40" fill="#e5e7eb" stroke="#d1d5db" strokeWidth="2" />
          <rect x="210" y="290" width="230" height="40" fill="#e5e7eb" stroke="#d1d5db" strokeWidth="2" />
          
          {/* Entrance hallway */}
          <rect x="340" y="360" width="40" height="60" fill="#e5e7eb" stroke="#d1d5db" strokeWidth="2" />
          
          {/* Path visualization */}
          {path.map((segment, index) => (
            <line
              key={index}
              x1={segment.from.x}
              y1={segment.from.y}
              x2={segment.to.x}
              y2={segment.to.y}
              stroke="#A82227"
              strokeWidth="6"
              strokeLinecap="round"
              className="animate-pulse"
            />
          ))}
          
          {/* Path nodes */}
          {path.length > 0 && path.flatMap(segment => [segment.from, segment.to]).map((node, index, arr) => {
            // Remove duplicates by checking if this is the first occurrence
            const isUnique = arr.findIndex(n => n.id === node.id) === index;
            if (!isUnique) return null;
            
            return (
              <circle
                key={node.id}
                cx={node.x}
                cy={node.y}
                r="8"
                fill="#A82227"
                stroke="white"
                strokeWidth="3"
              />
            );
          })}
          
          {/* Rooms */}
          {rooms.map(room => {
            const isSelected = selectedRoom?.id === room.id;
            const isHighlighted = highlightedRooms.includes(room.id);
            
            return (
              <g
                key={room.id}
                onClick={(e) => handleRoomClickInternal(room, e)}
                className="cursor-pointer transition-all"
              >
                <rect
                  x={room.x}
                  y={room.y}
                  width={room.width}
                  height={room.height}
                  fill={isSelected ? '#FCE8E9' : isHighlighted ? '#F8D4D5' : 'white'}
                  stroke={isSelected ? '#A82227' : isHighlighted ? '#D93943' : '#9ca3af'}
                  strokeWidth={isSelected ? '4' : isHighlighted ? '3' : '2'}
                  rx="6"
                />
                
                {/* Room number badge */}
                <rect
                  x={room.x + 8}
                  y={room.y + 8}
                  width="35"
                  height="24"
                  fill="#A82227"
                  rx="4"
                />
                <text
                  x={room.x + 25.5}
                  y={room.y + 24}
                  textAnchor="middle"
                  fill="white"
                  fontSize="14"
                  fontWeight="bold"
                >
                  {room.number}
                </text>
                
                {/* Room name */}
                <text
                  x={room.x + room.width / 2}
                  y={room.y + room.height / 2 + 2}
                  textAnchor="middle"
                  fill="#1f2937"
                  fontSize="13"
                  fontWeight="600"
                >
                  {room.name.length > 16 ? room.name.substring(0, 16) + '...' : room.name}
                </text>
                
                {/* Teacher name */}
                <text
                  x={room.x + room.width / 2}
                  y={room.y + room.height / 2 + 18}
                  textAnchor="middle"
                  fill="#6b7280"
                  fontSize="11"
                >
                  {room.teacher.split(' ').slice(-1)[0]}
                </text>
                
                {/* Info icon */}
                <circle
                  cx={room.x + room.width - 18}
                  cy={room.y + room.height - 18}
                  r="10"
                  fill="#A82227"
                  opacity="0.9"
                />
                <text
                  x={room.x + room.width - 18}
                  y={room.y + room.height - 13}
                  textAnchor="middle"
                  fill="white"
                  fontSize="12"
                  fontWeight="bold"
                >
                  i
                </text>
              </g>
            );
          })}
          
          {/* Entrance */}
          <g>
            <rect
              x="335"
              y="405"
              width="50"
              height="35"
              fill="#A5968A"
              stroke="#8B7E73"
              strokeWidth="3"
              rx="6"
            />
            <text
              x="360"
              y="427"
              textAnchor="middle"
              fill="white"
              fontSize="12"
              fontWeight="bold"
            >
              ENTRY
            </text>
          </g>
        </svg>
      </div>
    </div>
  );
}