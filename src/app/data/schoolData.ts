import { Room, Node, Edge } from '../types/map';

export const rooms: Room[] = [
  // Left wing
  {
    id: 'room-101',
    number: '101',
    name: 'Mathematics Classroom',
    teacher: 'Prof. Sarah Johnson',
    purpose: 'Advanced Mathematics',
    x: 50,
    y: 50,
    width: 120,
    height: 80,
    nodeId: 'node-101'
  },
  {
    id: 'room-102',
    number: '102',
    name: 'Physics Lab',
    teacher: 'Dr. Michael Chen',
    purpose: 'Physics Laboratory',
    x: 50,
    y: 160,
    width: 120,
    height: 80,
    nodeId: 'node-102'
  },
  {
    id: 'room-103',
    number: '103',
    name: 'Chemistry Lab',
    teacher: 'Dr. Emily Rodriguez',
    purpose: 'Chemistry Laboratory',
    x: 50,
    y: 270,
    width: 120,
    height: 80,
    nodeId: 'node-103'
  },
  // Center area
  {
    id: 'room-104',
    number: '104',
    name: 'Computer Science Lab',
    teacher: 'Prof. David Kim',
    purpose: 'Programming & CS',
    x: 300,
    y: 50,
    width: 120,
    height: 80,
    nodeId: 'node-104'
  },
  {
    id: 'room-105',
    number: '105',
    name: 'Library',
    teacher: 'Ms. Jennifer White',
    purpose: 'Study & Research',
    x: 300,
    y: 160,
    width: 120,
    height: 80,
    nodeId: 'node-105'
  },
  {
    id: 'room-106',
    number: '106',
    name: 'Art Studio',
    teacher: 'Mr. Alex Martinez',
    purpose: 'Visual Arts',
    x: 300,
    y: 270,
    width: 120,
    height: 80,
    nodeId: 'node-106'
  },
  // Right wing
  {
    id: 'room-107',
    number: '107',
    name: 'English Classroom',
    teacher: 'Prof. Lisa Anderson',
    purpose: 'Literature & Writing',
    x: 550,
    y: 50,
    width: 120,
    height: 80,
    nodeId: 'node-107'
  },
  {
    id: 'room-108',
    number: '108',
    name: 'History Classroom',
    teacher: 'Dr. Robert Taylor',
    purpose: 'World History',
    x: 550,
    y: 160,
    width: 120,
    height: 80,
    nodeId: 'node-108'
  },
  {
    id: 'room-109',
    number: '109',
    name: 'Music Room',
    teacher: 'Ms. Patricia Moore',
    purpose: 'Music Theory & Practice',
    x: 550,
    y: 270,
    width: 120,
    height: 80,
    nodeId: 'node-109'
  }
];

// Navigation nodes (including room entry points and hallway intersections)
export const nodes: Node[] = [
  // Room nodes
  { id: 'node-101', x: 170, y: 90, roomId: 'room-101' },
  { id: 'node-102', x: 170, y: 200, roomId: 'room-102' },
  { id: 'node-103', x: 170, y: 310, roomId: 'room-103' },
  { id: 'node-104', x: 300, y: 90, roomId: 'room-104' },
  { id: 'node-105', x: 300, y: 200, roomId: 'room-105' },
  { id: 'node-106', x: 300, y: 310, roomId: 'room-106' },
  { id: 'node-107', x: 550, y: 90, roomId: 'room-107' },
  { id: 'node-108', x: 550, y: 200, roomId: 'room-108' },
  { id: 'node-109', x: 550, y: 310, roomId: 'room-109' },
  
  // Hallway intersection nodes
  { id: 'hall-1', x: 230, y: 90 },
  { id: 'hall-2', x: 230, y: 200 },
  { id: 'hall-3', x: 230, y: 310 },
  { id: 'hall-4', x: 420, y: 90 },
  { id: 'hall-5', x: 420, y: 200 },
  { id: 'hall-6', x: 420, y: 310 },
  
  // Main entrance
  { id: 'entrance', x: 360, y: 400 }
];

// Create edges (connections between nodes)
export const edges: Edge[] = [
  // Left wing to hallway
  { from: 'node-101', to: 'hall-1', distance: 60 },
  { from: 'node-102', to: 'hall-2', distance: 60 },
  { from: 'node-103', to: 'hall-3', distance: 60 },
  
  // Center rooms to hallway
  { from: 'node-104', to: 'hall-1', distance: 70 },
  { from: 'node-104', to: 'hall-4', distance: 120 },
  { from: 'node-105', to: 'hall-2', distance: 70 },
  { from: 'node-105', to: 'hall-5', distance: 120 },
  { from: 'node-106', to: 'hall-3', distance: 70 },
  { from: 'node-106', to: 'hall-6', distance: 120 },
  
  // Right wing to hallway
  { from: 'node-107', to: 'hall-4', distance: 130 },
  { from: 'node-108', to: 'hall-5', distance: 130 },
  { from: 'node-109', to: 'hall-6', distance: 130 },
  
  // Vertical hallway connections (left)
  { from: 'hall-1', to: 'hall-2', distance: 110 },
  { from: 'hall-2', to: 'hall-3', distance: 110 },
  
  // Vertical hallway connections (right)
  { from: 'hall-4', to: 'hall-5', distance: 110 },
  { from: 'hall-5', to: 'hall-6', distance: 110 },
  
  // Horizontal connections
  { from: 'hall-1', to: 'hall-4', distance: 190 },
  { from: 'hall-2', to: 'hall-5', distance: 190 },
  { from: 'hall-3', to: 'hall-6', distance: 190 },
  
  // Entrance connections
  { from: 'entrance', to: 'hall-3', distance: 150 },
  { from: 'entrance', to: 'hall-6', distance: 150 }
];
