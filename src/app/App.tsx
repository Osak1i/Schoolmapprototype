import { useState } from 'react';
import { SchoolMap } from './components/SchoolMap';
import { RoomInfo } from './components/RoomInfo';
import { TopBar } from './components/TopBar';
import { BottomControls } from './components/BottomControls';
import { RoomSelector } from './components/RoomSelector';
import { MenuDrawer } from './components/MenuDrawer';
import { MapControls } from './components/MapControls';
import { rooms, nodes, edges } from './data/schoolData';
import { Room, PathSegment } from './types/map';
import { findShortestPath } from './utils/pathfinding';

type SelectorMode = 'start' | 'destination' | null;

const buildings = [
  { id: 'main', name: 'Main Building', shortName: 'A' },
  { id: 'annex', name: 'Annex Building', shortName: 'B' },
  { id: 'workshop', name: 'Workshop Building', shortName: 'C' },
];

const floors = [
  { level: 0, name: 'GF' },
  { level: 1, name: '1F' },
  { level: 2, name: '2F' },
  { level: 3, name: '3F' },
];

function App() {
  const [selectedRoom, setSelectedRoom] = useState<Room | null>(null);
  const [startRoom, setStartRoom] = useState<string | null>('entrance');
  const [destinationRoom, setDestinationRoom] = useState<string | null>(null);
  const [path, setPath] = useState<PathSegment[]>([]);
  const [selectorMode, setSelectorMode] = useState<SelectorMode>(null);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [currentBuilding, setCurrentBuilding] = useState('main');
  const [currentFloor, setCurrentFloor] = useState(1);
  const [mapScale, setMapScale] = useState(1);
  const [mapPosition, setMapPosition] = useState({ x: 0, y: 0 });

  const handleRoomClick = (room: Room) => {
    setSelectedRoom(room);
  };

  const handleCloseRoomInfo = () => {
    setSelectedRoom(null);
  };

  const handleNavigateToRoom = (roomId: string) => {
    setDestinationRoom(roomId);
    setSelectedRoom(null);
    calculatePath(startRoom, roomId);
  };

  const calculatePath = (start: string | null, destination: string | null) => {
    if (!start || !destination) {
      setPath([]);
      return;
    }

    // Get node IDs for start and destination
    const startNodeId = start === 'entrance' ? 'entrance' : rooms.find(r => r.id === start)?.nodeId;
    const destNodeId = rooms.find(r => r.id === destination)?.nodeId;

    if (startNodeId && destNodeId) {
      const shortestPath = findShortestPath(startNodeId, destNodeId, nodes, edges);
      setPath(shortestPath);
    }
  };

  const handleStartChange = (roomId: string) => {
    setStartRoom(roomId);
    calculatePath(roomId, destinationRoom);
  };

  const handleDestinationChange = (roomId: string) => {
    setDestinationRoom(roomId);
    calculatePath(startRoom, roomId);
  };

  const handleClearPath = () => {
    setPath([]);
    setStartRoom('entrance');
    setDestinationRoom(null);
  };

  const handleStartClick = () => {
    setSelectorMode('start');
    setSelectedRoom(null);
    setIsMenuOpen(false);
  };

  const handleDestinationClick = () => {
    setSelectorMode('destination');
    setSelectedRoom(null);
    setIsMenuOpen(false);
  };

  const handleSelectorSelect = (roomId: string) => {
    if (selectorMode === 'start') {
      handleStartChange(roomId);
    } else if (selectorMode === 'destination') {
      handleDestinationChange(roomId);
    }
    setSelectorMode(null);
  };

  const handleSelectorClose = () => {
    setSelectorMode(null);
  };

  const handleMenuToggle = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const handleBuildingChange = (buildingId: string) => {
    setCurrentBuilding(buildingId);
    setSelectedRoom(null);
    setPath([]);
  };

  const handleFloorChange = (floor: number) => {
    setCurrentFloor(floor);
    setSelectedRoom(null);
    setPath([]);
  };

  const handleZoomIn = () => {
    setMapScale(prev => Math.min(prev * 1.2, 3));
  };

  const handleZoomOut = () => {
    setMapScale(prev => Math.max(prev / 1.2, 0.5));
  };

  const handleZoomReset = () => {
    setMapScale(1);
    setMapPosition({ x: 0, y: 0 });
  };

  // Get highlighted rooms (start and destination)
  const highlightedRooms: string[] = [];
  if (startRoom && startRoom !== 'entrance') {
    highlightedRooms.push(startRoom);
  }
  if (destinationRoom) {
    highlightedRooms.push(destinationRoom);
  }

  return (
    <div className="w-screen h-screen relative overflow-hidden bg-gray-100">
      {/* Top Bar */}
      <TopBar 
        onMenuClick={handleMenuToggle} 
        isMenuOpen={isMenuOpen}
        currentBuilding={buildings.find(b => b.id === currentBuilding)?.shortName}
        currentFloor={floors.find(f => f.level === currentFloor)?.name}
      />

      {/* Map - Full Screen */}
      <div className="absolute inset-0 pt-20 pb-40">
        <SchoolMap
          rooms={rooms}
          nodes={nodes}
          selectedRoom={selectedRoom}
          onRoomClick={handleRoomClick}
          path={path}
          highlightedRooms={highlightedRooms}
          scale={mapScale}
          position={mapPosition}
          onScaleChange={setMapScale}
          onPositionChange={setMapPosition}
        />
      </div>

      {/* Bottom Controls */}
      <BottomControls
        rooms={rooms}
        startRoom={startRoom}
        destinationRoom={destinationRoom}
        hasActivePath={path.length > 0}
        onStartClick={handleStartClick}
        onDestinationClick={handleDestinationClick}
        onClearPath={handleClearPath}
      />

      {/* Room Info Panel (slides from bottom) */}
      {selectedRoom && (
        <RoomInfo
          room={selectedRoom}
          onClose={handleCloseRoomInfo}
          onNavigate={handleNavigateToRoom}
        />
      )}

      {/* Room Selector Modal */}
      {selectorMode && (
        <RoomSelector
          rooms={rooms}
          title={selectorMode === 'start' ? 'Select Starting Point' : 'Select Destination'}
          onSelect={handleSelectorSelect}
          onClose={handleSelectorClose}
          allowEntrance={selectorMode === 'start'}
        />
      )}

      {/* Menu Drawer */}
      <MenuDrawer isOpen={isMenuOpen} onClose={() => setIsMenuOpen(false)} />

      {/* Map Controls - Building, Floor, and Zoom */}
      <MapControls
        buildings={buildings}
        currentBuilding={currentBuilding}
        onBuildingChange={handleBuildingChange}
        floors={floors}
        currentFloor={currentFloor}
        onFloorChange={handleFloorChange}
        scale={mapScale}
        onZoomIn={handleZoomIn}
        onZoomOut={handleZoomOut}
        onZoomReset={handleZoomReset}
      />
    </div>
  );
}

export default App;