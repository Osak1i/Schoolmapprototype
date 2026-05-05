# Floor Maps Import Guide

This guide explains how to import and configure SVG floor maps for the school navigation system.

## Overview

The navigation system supports importing custom SVG floor plans for each building and floor combination. Each floor map can be a unique SVG file that serves as the background for the interactive navigation interface.

## Supported Configurations

The system supports maps for:
- **Buildings**: Main, Annex, Workshop
- **Floors**: 0 (Ground Floor), 1, 2, 3

## How to Import SVG Floor Maps

### Step 1: Prepare Your SVG Files

1. Create or export your floor plan as an SVG file
2. Recommended dimensions: 720px × 450px (or maintain similar aspect ratio)
3. Ensure the SVG is clean and optimized
4. Save your SVG files with descriptive names (e.g., `main-floor-1.svg`)

### Step 2: Add SVG Files to the Project

Place your SVG files in the `public/maps/` directory:

```
public/
  maps/
    main-floor-0.svg
    main-floor-1.svg
    main-floor-2.svg
    main-floor-3.svg
    annex-floor-0.svg
    annex-floor-1.svg
    ... (and so on)
```

### Step 3: Update Floor Map Configuration

Open `/src/app/data/floorMaps.ts` and uncomment/update the `svgPath` for each floor:

```typescript
export const floorMaps: FloorMap[] = [
  {
    building: 'main',
    floor: 1,
    viewBox: '0 0 720 450',
    width: 720,
    height: 450,
    svgPath: '/maps/main-floor-1.svg' // Uncomment and update this line
  },
  // ... repeat for other floors
];
```

### Step 4: Coordinate Room and Node Positions

After importing your SVG map, you need to position rooms and navigation nodes to match your floor plan:

1. Open `/src/app/data/schoolData.ts`
2. Update the `x`, `y` coordinates for each room to match locations on your SVG map
3. Update node positions (hallway intersections, entry points) accordingly
4. Ensure each room and node has the correct `building` and `floor` properties

Example:
```typescript
{
  id: 'room-101',
  number: '101',
  name: 'Mathematics Classroom',
  teacher: 'Prof. Sarah Johnson',
  purpose: 'Advanced Mathematics',
  x: 50,        // Match SVG coordinates
  y: 50,        // Match SVG coordinates
  width: 120,
  height: 80,
  nodeId: 'node-101',
  building: 'main',  // Building identifier
  floor: 1           // Floor number
}
```

## SVG Best Practices

### Coordinate System
- The SVG viewBox defines the coordinate space (e.g., `0 0 720 450`)
- All room/node coordinates reference this coordinate system
- Origin (0,0) is at the top-left corner

### Layer Structure (Recommended)
Organize your SVG with these layers:
1. **Background** - Walls, structural elements
2. **Hallways** - Corridors and walkways
3. **Room outlines** - Room boundaries (can be hidden if overlaid by interactive rooms)
4. **Labels** - Room numbers, signs (optional, as the app adds these dynamically)

### SVG Optimization
- Remove unnecessary metadata
- Simplify paths where possible
- Use relative units
- Keep file size under 100KB per floor

### Colors
- Use neutral colors for backgrounds
- Ensure good contrast for accessibility
- Hallways: `#e5e7eb` (light gray)
- Walls: `#d1d5db` (medium gray)
- Background: `#fafafa` (off-white)

## Multi-Floor Navigation

### Connecting Floors
To enable navigation between floors (e.g., via stairs or elevators):

1. Create stairwell/elevator nodes on each floor at the same location
2. Add edges connecting these nodes between floors
3. Update the pathfinding logic if needed for multi-floor routes

Example:
```typescript
// Stairwell on Floor 1
{ id: 'stairs-1-f1', x: 360, y: 225, building: 'main', floor: 1 },

// Stairwell on Floor 2 (same x,y position)
{ id: 'stairs-1-f2', x: 360, y: 225, building: 'main', floor: 2 },

// Connect them
{ from: 'stairs-1-f1', to: 'stairs-1-f2', distance: 20, building: 'main', floor: 1 }
```

## Testing Your Floor Map

After importing:

1. Select the building and floor in the app
2. Verify the SVG map loads correctly
3. Click on rooms to ensure they're positioned correctly
4. Test navigation paths between rooms
5. Check that all interactive elements align with the visual map

## Troubleshooting

### SVG Not Loading
- Check the file path in `floorMaps.ts`
- Ensure the SVG file is in the `public/maps/` directory
- Check browser console for errors

### Misaligned Rooms/Nodes
- Verify the SVG viewBox matches the configured dimensions
- Double-check x,y coordinates in `schoolData.ts`
- Use browser dev tools to inspect SVG coordinate space

### Performance Issues
- Optimize SVG file size
- Simplify complex paths
- Remove unnecessary elements

## Example Workflow

1. Export floor plan from CAD software as SVG
2. Optimize SVG using tools like SVGO
3. Place in `public/maps/main-floor-1.svg`
4. Update `floorMaps.ts`:
   ```typescript
   svgPath: '/maps/main-floor-1.svg'
   ```
5. Measure room positions on the SVG
6. Update room coordinates in `schoolData.ts`
7. Test in the app and adjust as needed

## Advanced: Dynamic Map Loading

For larger schools with many floors, consider implementing dynamic map loading to improve performance. Maps can be loaded on-demand when users switch floors instead of loading all maps at once.

This is already partially implemented - maps are loaded via `fetch()` when the floor changes, so only the active floor's SVG is in memory.

## Support

For additional help or questions about floor map configuration, refer to the project documentation or contact the development team.
