import { Node, Edge, PathSegment } from '../types/map';

interface GraphNode {
  id: string;
  distance: number;
  previous: string | null;
}

export function findShortestPath(
  startNodeId: string,
  endNodeId: string,
  nodes: Node[],
  edges: Edge[]
): PathSegment[] {
  // Build adjacency list
  const graph: Map<string, Array<{ nodeId: string; distance: number }>> = new Map();
  
  edges.forEach(edge => {
    if (!graph.has(edge.from)) graph.set(edge.from, []);
    if (!graph.has(edge.to)) graph.set(edge.to, []);
    
    graph.get(edge.from)!.push({ nodeId: edge.to, distance: edge.distance });
    graph.get(edge.to)!.push({ nodeId: edge.from, distance: edge.distance });
  });

  // Dijkstra's algorithm
  const distances: Map<string, number> = new Map();
  const previous: Map<string, string | null> = new Map();
  const unvisited: Set<string> = new Set();

  // Initialize
  nodes.forEach(node => {
    distances.set(node.id, node.id === startNodeId ? 0 : Infinity);
    previous.set(node.id, null);
    unvisited.add(node.id);
  });

  while (unvisited.size > 0) {
    // Find unvisited node with smallest distance
    let currentNode: string | null = null;
    let smallestDistance = Infinity;
    
    unvisited.forEach(nodeId => {
      const dist = distances.get(nodeId)!;
      if (dist < smallestDistance) {
        smallestDistance = dist;
        currentNode = nodeId;
      }
    });

    if (currentNode === null || smallestDistance === Infinity) break;
    if (currentNode === endNodeId) break;

    unvisited.delete(currentNode);

    // Update distances to neighbors
    const neighbors = graph.get(currentNode) || [];
    neighbors.forEach(({ nodeId, distance }) => {
      if (unvisited.has(nodeId)) {
        const newDistance = distances.get(currentNode!)! + distance;
        if (newDistance < distances.get(nodeId)!) {
          distances.set(nodeId, newDistance);
          previous.set(nodeId, currentNode);
        }
      }
    });
  }

  // Reconstruct path
  const path: string[] = [];
  let current: string | null = endNodeId;

  while (current !== null) {
    path.unshift(current);
    current = previous.get(current)!;
  }

  // Convert to PathSegments
  if (path.length < 2 || path[0] !== startNodeId) {
    return []; // No path found
  }

  const nodeMap = new Map(nodes.map(n => [n.id, n]));
  const segments: PathSegment[] = [];

  for (let i = 0; i < path.length - 1; i++) {
    const fromNode = nodeMap.get(path[i])!;
    const toNode = nodeMap.get(path[i + 1])!;
    segments.push({ from: fromNode, to: toNode });
  }

  return segments;
}
