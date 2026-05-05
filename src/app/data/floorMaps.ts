import { FloorMap } from '../types/map';

// Floor map configurations for each building and floor
export const floorMaps: FloorMap[] = [
  {
    building: 'main',
    floor: 0,
    viewBox: '0 0 720 450',
    width: 720,
    height: 450,
    // svgPath: '/maps/main-floor-0.svg' // Uncomment and add path when SVG is imported
  },
  {
    building: 'main',
    floor: 1,
    viewBox: '0 0 720 450',
    width: 720,
    height: 450,
    // svgPath: '/maps/main-floor-1.svg'
  },
  {
    building: 'main',
    floor: 2,
    viewBox: '0 0 720 450',
    width: 720,
    height: 450,
    // svgPath: '/maps/main-floor-2.svg'
  },
  {
    building: 'main',
    floor: 3,
    viewBox: '0 0 720 450',
    width: 720,
    height: 450,
    // svgPath: '/maps/main-floor-3.svg'
  },
  {
    building: 'annex',
    floor: 0,
    viewBox: '0 0 720 450',
    width: 720,
    height: 450,
    // svgPath: '/maps/annex-floor-0.svg'
  },
  {
    building: 'annex',
    floor: 1,
    viewBox: '0 0 720 450',
    width: 720,
    height: 450,
    // svgPath: '/maps/annex-floor-1.svg'
  },
  {
    building: 'annex',
    floor: 2,
    viewBox: '0 0 720 450',
    width: 720,
    height: 450,
    // svgPath: '/maps/annex-floor-2.svg'
  },
  {
    building: 'annex',
    floor: 3,
    viewBox: '0 0 720 450',
    width: 720,
    height: 450,
    // svgPath: '/maps/annex-floor-3.svg'
  },
  {
    building: 'workshop',
    floor: 0,
    viewBox: '0 0 720 450',
    width: 720,
    height: 450,
    // svgPath: '/maps/workshop-floor-0.svg'
  },
  {
    building: 'workshop',
    floor: 1,
    viewBox: '0 0 720 450',
    width: 720,
    height: 450,
    // svgPath: '/maps/workshop-floor-1.svg'
  },
  {
    building: 'workshop',
    floor: 2,
    viewBox: '0 0 720 450',
    width: 720,
    height: 450,
    // svgPath: '/maps/workshop-floor-2.svg'
  },
  {
    building: 'workshop',
    floor: 3,
    viewBox: '0 0 720 450',
    width: 720,
    height: 450,
    // svgPath: '/maps/workshop-floor-3.svg'
  },
];

export function getFloorMap(building: string, floor: number): FloorMap | undefined {
  return floorMaps.find(map => map.building === building && map.floor === floor);
}
