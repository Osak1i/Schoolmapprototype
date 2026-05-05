export interface Room {
  id: string;
  number: string;
  name: string;
  teacher: string;
  purpose: string;
  x: number;
  y: number;
  width: number;
  height: number;
  nodeId: string; // Connection point for pathfinding
  building: string;
  floor: number;
}

export interface Node {
  id: string;
  x: number;
  y: number;
  roomId?: string;
  building: string;
  floor: number;
}

export interface Edge {
  from: string;
  to: string;
  distance: number;
  building: string;
  floor: number;
}

export interface PathSegment {
  from: Node;
  to: Node;
}

export interface FloorMap {
  building: string;
  floor: number;
  svgPath?: string; // Path to imported SVG file
  viewBox: string; // SVG viewBox dimensions (e.g., "0 0 720 450")
  width: number;
  height: number;
}
