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
}

export interface Node {
  id: string;
  x: number;
  y: number;
  roomId?: string;
}

export interface Edge {
  from: string;
  to: string;
  distance: number;
}

export interface PathSegment {
  from: Node;
  to: Node;
}
