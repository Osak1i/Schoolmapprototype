# Node Editor Mode Guide

The Node Editor Mode allows you to visually place and configure navigation nodes on your floor maps. This is essential for setting up the pathfinding system for your school navigation app.

## Overview

Navigation nodes are the points that define where paths can go in your building. They include:
- **Room entry points** - Connections to individual rooms
- **Hallway intersections** - Points where corridors meet
- **Stairwell/elevator nodes** - Connections between floors
- **Special locations** - Entrances, exits, etc.

## Accessing Node Editor Mode

1. Click the **"Node Editor"** button at the top center of the screen
2. The button will turn red and pulse when editor mode is active
3. A panel will appear at the bottom showing current nodes

## Editor Mode Interface

### Visual Indicators

When in Node Editor Mode, you'll see:

- **Red circles** - Hallway/intersection nodes
- **Blue circles** - Room entry nodes (nodes with a roomId)
- **Yellow highlight** - Selected node
- **Crosshairs** - Precise positioning guides on selected nodes
- **Labels** - Node IDs and coordinates displayed above/below each node
- **Crosshair cursor** - Indicates you can click to add nodes

### Bottom Panel

The editor panel at the bottom shows:
- Current building and floor
- Number of nodes on this floor
- List of all nodes with coordinates
- Export buttons
- Instructions

## Using the Editor

### Adding Nodes

1. **Enter Node Editor Mode** - Click "Node Editor" button
2. **Select the correct floor** - Use the floor selector (top right)
3. **Click on the map** - Click anywhere to add a new node
4. **New node appears** - Automatically named (e.g., `node-main-f1-1`)

### Moving Nodes

1. **Click and hold** on any existing node
2. **Drag** to the desired position
3. **Release** to place the node
4. Coordinates update in real-time

### Selecting Nodes

- **Click** on a node to select it
- Selected nodes show yellow highlighting and crosshairs
- Selected node appears highlighted in the bottom panel list

### Deleting Nodes

1. Find the node in the bottom panel list
2. Click the **trash icon** (🗑️) next to the node
3. Confirm the deletion

## Node Properties

Each node has these properties:

```typescript
{
  id: string;           // Unique identifier (e.g., "hall-1", "node-101")
  x: number;            // X coordinate on the map
  y: number;            // Y coordinate on the map
  building: string;     // Building ID (e.g., "main", "annex")
  floor: number;        // Floor number (0-3)
  roomId?: string;      // Optional: links node to a room
}
```

### Node Naming Conventions

**Hallway Intersections:**
```
hall-1, hall-2, hall-3, etc.
```

**Room Entry Points:**
```
node-101, node-102, node-103, etc.
(matching room numbers)
```

**Special Locations:**
```
entrance, exit-north, stairs-1-f1, elevator-main, etc.
```

**Auto-generated (Editor Mode):**
```
node-main-f1-1, node-main-f1-2, etc.
(building-floor-counter format)
```

## Exporting Your Work

The Node Editor provides two export options:

### 1. Copy as JSON

**Purpose:** Quick backup, sharing, or documentation

**Output:**
```json
[
  {
    "id": "hall-1",
    "x": 230,
    "y": 90,
    "building": "main",
    "floor": 1
  },
  ...
]
```

**How to use:**
1. Click **"Copy as JSON"**
2. Paste into a text file for backup
3. Share with team members

### 2. Copy as Code

**Purpose:** Ready to paste into `schoolData.ts`

**Output:**
```typescript
// Export for main - Floor 1
export const nodes: Node[] = [
  { id: 'hall-1', x: 230, y: 90, building: 'main', floor: 1 },
  { id: 'hall-2', x: 230, y: 200, building: 'main', floor: 1 },
  ...
];
```

**How to use:**
1. Click **"Copy as Code"**
2. Open `/src/app/data/schoolData.ts`
3. Find the `nodes` array for your floor
4. Replace with the copied code
5. Ensure all nodes across all floors are properly merged

## Best Practices

### Node Placement Strategy

1. **Start with room entry points**
   - Place nodes at the door of each room
   - Match the node position to the visual room location
   - Name them clearly (e.g., `node-101` for Room 101)

2. **Add hallway intersections**
   - Place nodes where hallways meet
   - Ensure good path coverage
   - Use consistent spacing

3. **Connect floors**
   - Add stairwell nodes at the same x,y on each floor
   - Add elevator nodes similarly
   - Name them consistently (e.g., `stairs-1-f1`, `stairs-1-f2`)

4. **Test coverage**
   - Ensure every room is reachable
   - Verify paths make logical sense
   - Check for isolated nodes

### Coordinate Precision

- Nodes snap to whole numbers automatically
- Coordinates are in SVG units (typically pixels)
- Match your SVG viewBox coordinate system
- Standard maps use `0 0 720 450` viewBox

### Working Across Floors

1. Complete one floor at a time
2. Export and save each floor separately
3. Keep a master list of all nodes
4. Maintain consistency in naming
5. Align vertical connections (stairs, elevators)

## Workflow Example

### Setting Up Floor 1

1. **Preparation**
   - Import your SVG floor map
   - Identify room locations
   - Plan hallway paths

2. **Node Placement**
   - Enter Node Editor Mode
   - Select "Main Building" and "Floor 1"
   - Click to add nodes at each room entrance
   - Add hallway intersection nodes
   - Add entrance/stairwell nodes

3. **Refinement**
   - Drag nodes to precise positions
   - Align with visual map elements
   - Ensure logical spacing

4. **Export**
   - Click "Copy as Code"
   - Paste into `schoolData.ts`
   - Update the nodes array

5. **Create Edges**
   - Open `schoolData.ts`
   - Add edge connections between nodes
   - Define distances

6. **Test**
   - Exit Node Editor Mode
   - Try navigation between rooms
   - Verify paths are correct

## Connecting Nodes with Edges

After placing nodes, you need to create edges (connections) between them:

```typescript
export const edges: Edge[] = [
  // Room to hallway
  { from: 'node-101', to: 'hall-1', distance: 60, building: 'main', floor: 1 },
  
  // Hallway to hallway
  { from: 'hall-1', to: 'hall-2', distance: 110, building: 'main', floor: 1 },
  
  // Cross-floor (stairs)
  { from: 'stairs-1-f1', to: 'stairs-1-f2', distance: 20, building: 'main', floor: 1 },
];
```

**Important:**
- Edges are bidirectional (pathfinding works both ways)
- Distance can be approximate (affects path calculation)
- Ensure every node is connected to at least one other node

## Troubleshooting

### Nodes Not Appearing
- Verify you're on the correct floor
- Check the building selector
- Ensure Node Editor Mode is active (red button)

### Can't Click to Add Nodes
- Make sure Node Editor Mode is enabled
- Don't click on existing nodes (they'll be selected instead)
- Click on empty map areas

### Nodes Won't Move
- Click and hold before dragging
- Ensure you're clicking on the node circle
- Try selecting the node first

### Export Not Working
- Check browser clipboard permissions
- Try clicking the button again
- Check browser console for errors

## Tips & Tricks

1. **Zoom In** - Use zoom controls for precise placement
2. **Work Systematically** - Do one section of the floor at a time
3. **Save Often** - Export after each major change
4. **Document** - Keep notes on your node naming scheme
5. **Test Paths** - Exit editor mode periodically to test navigation
6. **Use Grid** - If your SVG has a grid, align nodes to it

## Multi-Floor Navigation Setup

For complete multi-floor navigation:

1. **Create stairwell nodes on each floor**
   ```typescript
   // Floor 1
   { id: 'stairs-1-f1', x: 360, y: 225, building: 'main', floor: 1 }
   
   // Floor 2
   { id: 'stairs-1-f2', x: 360, y: 225, building: 'main', floor: 2 }
   ```

2. **Connect them with edges**
   ```typescript
   { from: 'stairs-1-f1', to: 'stairs-1-f2', distance: 20, building: 'main', floor: 1 }
   ```

3. **Update pathfinding logic** if needed to handle floor transitions

## Keyboard Shortcuts

Currently, the editor uses click-based interaction. Future updates may include:
- Delete key to remove selected node
- Arrow keys to nudge node position
- Ctrl+Z for undo
- Ctrl+C / Ctrl+V for copy/paste

## Data Persistence

**Important:** Changes in Node Editor Mode are only saved when you export and manually update the code.

The editor works with temporary state. To persist your changes:

1. Use "Copy as Code" button
2. Paste into `/src/app/data/schoolData.ts`
3. Save the file
4. Refresh the application

This ensures your navigation data is committed to the codebase and won't be lost.

## Next Steps

After setting up nodes:

1. **Create edges** - Define connections between nodes
2. **Set distances** - Specify path lengths
3. **Test navigation** - Try finding paths between rooms
4. **Adjust as needed** - Refine node positions and connections
5. **Document** - Update your project documentation

## Support

For questions or issues with Node Editor Mode:
- Check the browser console for error messages
- Verify your SVG map is loaded correctly
- Ensure building/floor data is configured
- Review the `FLOOR_MAPS_GUIDE.md` for SVG setup

Happy node editing!
