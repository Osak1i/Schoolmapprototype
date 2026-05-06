import { useState } from 'react';
import { SchoolMap } from './components/SchoolMap';
import { RoomInfo } from './components/RoomInfo';
import { TopBar } from './components/TopBar';
import { BottomControls } from './components/BottomControls';
import { RoomSelector } from './components/RoomSelector';
import { MenuDrawer } from './components/MenuDrawer';
import { MapControls } from './components/MapControls';
import { NodeEditor } from './components/NodeEditor';
import { rooms, nodes, edges } from './data/schoolData';
import { getFloorMap } from './data/floorMaps';
import { Room, PathSegment, Node } from './types/map';
import { findShortestPath } from './utils/pathfinding';
import { getTranslation } from './utils/translations';

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
  const [language, setLanguage] = useState<'en' | 'lv'>('en');
  const [nodeEditorMode, setNodeEditorMode] = useState(false);
  const [editableNodes, setEditableNodes] = useState<Node[]>(nodes);
  const [selectedNodeId, setSelectedNodeId] = useState<string | null>(null);
  const [nodeCounter, setNodeCounter] = useState(1);

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
      const shortestPath = findShortestPath(startNodeId, destNodeId, editableNodes, edges);
      setPath(shortestPath);
    }
  };

  const handleStartChange = (roomId: string) => {
    setStartRoom(roomId);
    if (destinationRoom) {
      const startNodeId = roomId === 'entrance' ? 'entrance' : rooms.find(r => r.id === roomId)?.nodeId;
      const destNodeId = rooms.find(r => r.id === destinationRoom)?.nodeId;
      if (startNodeId && destNodeId) {
        const shortestPath = findShortestPath(startNodeId, destNodeId, editableNodes, edges);
        setPath(shortestPath);
      }
    }
  };

  const handleDestinationChange = (roomId: string) => {
    setDestinationRoom(roomId);
    if (startRoom) {
      const startNodeId = startRoom === 'entrance' ? 'entrance' : rooms.find(r => r.id === startRoom)?.nodeId;
      const destNodeId = rooms.find(r => r.id === roomId)?.nodeId;
      if (startNodeId && destNodeId) {
        const shortestPath = findShortestPath(startNodeId, destNodeId, editableNodes, edges);
        setPath(shortestPath);
      }
    }
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

  const handleNodeAdd = (x: number, y: number) => {
    const newNode: Node = {
      id: `node-${currentBuilding}-f${currentFloor}-${nodeCounter}`,
      x,
      y,
      building: currentBuilding,
      floor: currentFloor
    };
    setEditableNodes([...editableNodes, newNode]);
    setNodeCounter(nodeCounter + 1);
  };

  const handleNodeMove = (nodeId: string, x: number, y: number) => {
    setEditableNodes(editableNodes.map(node =>
      node.id === nodeId ? { ...node, x, y } : node
    ));
  };

  const handleNodeSelect = (nodeId: string) => {
    setSelectedNodeId(nodeId);
  };

  const handleToggleNodeEditor = () => {
    setNodeEditorMode(!nodeEditorMode);
    setSelectedNodeId(null);
  };

  // Get highlighted rooms (start and destination)
  const highlightedRooms: string[] = [];
  if (startRoom && startRoom !== 'entrance') {
    highlightedRooms.push(startRoom);
  }
  if (destinationRoom) {
    highlightedRooms.push(destinationRoom);
  }

  // Get current floor map
  const currentFloorMap = getFloorMap(currentBuilding, currentFloor);

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
          nodes={editableNodes}
          selectedRoom={selectedRoom}
          onRoomClick={handleRoomClick}
          path={path}
          highlightedRooms={highlightedRooms}
          scale={mapScale}
          position={mapPosition}
          onScaleChange={setMapScale}
          onPositionChange={setMapPosition}
          currentBuilding={currentBuilding}
          currentFloor={currentFloor}
          floorMap={currentFloorMap}
          nodeEditorMode={nodeEditorMode}
          onNodeAdd={handleNodeAdd}
          onNodeMove={handleNodeMove}
          onNodeSelect={handleNodeSelect}
          selectedNodeId={selectedNodeId}
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
        language={language}
      />

      {/* Room Info Panel (slides from bottom) */}
      {selectedRoom && (
        <RoomInfo
          room={selectedRoom}
          onClose={handleCloseRoomInfo}
          onNavigate={handleNavigateToRoom}
          language={language}
        />
      )}

      {/* Room Selector Modal */}
      {selectorMode && (
        <RoomSelector
          rooms={rooms}
          title={getTranslation(language, selectorMode === 'start' ? 'selectStartingPoint' : 'selectDestination')}
          onSelect={handleSelectorSelect}
          onClose={handleSelectorClose}
          allowEntrance={selectorMode === 'start'}
          language={language}
        />
      )}

      {/* Menu Drawer */}
      <MenuDrawer
        isOpen={isMenuOpen}
        onClose={() => setIsMenuOpen(false)}
        language={language}
        onLanguageChange={setLanguage}
      />

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
        language={language}
      />

      {/* Node Editor Toggle Button */}
      <button
        onClick={handleToggleNodeEditor}
        className={`absolute top-24 right-1/2 transform translate-x-1/2 z-20 px-4 py-2 rounded-xl shadow-lg font-bold transition-all ${
          nodeEditorMode
            ? 'bg-[#A82227] text-white border-2 border-[#8B1C20] animate-pulse'
            : 'bg-white text-[#A82227] border-2 border-[#A5968A] hover:bg-[#FCE8E9]'
        }`}
      >
        {nodeEditorMode ? '✓ Editor Active' : 'Node Editor'}
      </button>

      {/* Node Editor Panel */}
      {nodeEditorMode && (
        <NodeEditor
          nodes={editableNodes}
          onNodesChange={setEditableNodes}
          currentBuilding={currentBuilding}
          currentFloor={currentFloor}
          language={language}
          onClose={() => setNodeEditorMode(false)}
        />
      )}
    </div>
  );
}

export default App;