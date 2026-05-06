# RTK School Navigation App - Features

## Core Features

### 1. Interactive Map Navigation
- Full-screen, touch-enabled map interface
- Pan and zoom controls (mouse wheel, touch pinch)
- Clickable rooms showing detailed information
- Visual pathfinding with animated route display

### 2. Multi-Building & Multi-Floor Support
- 3 Buildings: Main (A), Annex (B), Workshop (C)
- 4 Floors per building: Ground (0), 1st, 2nd, 3rd
- Easy building and floor switching via dropdown controls
- Automatic filtering of rooms and paths by selected floor

### 3. Pathfinding System
- Shortest path calculation between any two points
- Visual path highlighting on the map
- Start point and destination selection
- Entrance as default starting point
- Clear route functionality

### 4. Room Information
- Detailed room cards with:
  - Room number and name
  - Teacher assigned
  - Room purpose/subject
  - Floor location
  - "Navigate Here" button
- Slide-up panel interface

### 5. SVG Floor Map Import
- Custom SVG floor plans for each building/floor
- Dynamic map loading per floor
- Fallback to default design if no SVG imported
- Coordinate-based room and node positioning
- See `FLOOR_MAPS_GUIDE.md` for details

### 6. Node Editor Mode ⭐ NEW
- **Visual node placement tool**
- Click on map to add navigation nodes
- Drag nodes to reposition them
- Real-time coordinate display
- Node selection and editing
- Export options:
  - Copy as JSON for backup
  - Copy as TypeScript code for integration
- Works per building/floor
- Color-coded nodes (red for hallways, blue for rooms)
- See `NODE_EDITOR_GUIDE.md` for complete guide

### 7. Bilingual Support (English/Latvian)
- Full interface translation
- Language switcher in menu
- All UI elements translated:
  - Navigation controls
  - Room information
  - Map controls
  - Instructions and labels

### 8. RTK Branding
- Custom color scheme:
  - Primary Red: #A82227
  - Secondary Beige: #A5968A
- School logo integration
- Consistent brand identity throughout

### 9. Mobile-First Design
- Optimized for phone screens
- Touch-friendly controls
- Responsive layout
- Compact control buttons
- Full-screen map experience

### 10. Map Controls
- **Building Selector** (Top Left)
  - Dropdown menu with building options
  - Shows current building
  
- **Floor Selector** (Top Right)
  - Dropdown menu with floor options
  - Shows current floor level
  
- **Zoom Controls** (Bottom Right)
  - Zoom in/out buttons
  - Reset view to default
  - Current zoom percentage display

### 11. Search & Selection
- Room search functionality
- Filter by room number, name, or teacher
- Separate selectors for start/destination
- Main entrance option for starting point

## Technical Features

### Data Structure
- Rooms with coordinates, metadata, and building/floor assignment
- Navigation nodes for pathfinding
- Weighted edges for path calculation
- Floor map configurations

### Performance
- On-demand SVG loading per floor
- Efficient rendering with React
- Smooth animations and transitions
- Optimized pathfinding algorithm

### Developer Tools
- **Node Editor Mode** - Visual configuration tool
- Export functionality for saving configurations
- TypeScript for type safety
- Modular component architecture

## Usage Modes

### 1. Navigation Mode (Default)
- Browse rooms
- Select start and destination
- View calculated paths
- Access room information

### 2. Node Editor Mode
- Click "Node Editor" button to activate
- Place and configure navigation nodes
- Export node data for integration
- Visual feedback with color-coded nodes

## Customization

The app is designed to be customizable:

1. **Import floor maps** - Add your own SVG floor plans
2. **Configure nodes** - Use Node Editor to place navigation points
3. **Update room data** - Edit `schoolData.ts` with your rooms
4. **Adjust branding** - Modify colors and logos
5. **Translate text** - Add/modify translations in `translations.ts`

## Future Enhancement Ideas

- Edge editor mode (visual connection creation)
- Multi-floor path visualization
- User location tracking
- QR code room linking
- Analytics and usage tracking
- Accessibility improvements
- Offline mode support
- Admin dashboard for data management

## Getting Started

1. **For Users:**
   - Open the app
   - Select your building and floor
   - Click on rooms to see information
   - Set start and destination to find paths

2. **For Administrators:**
   - Import SVG floor maps (see `FLOOR_MAPS_GUIDE.md`)
   - Use Node Editor to configure navigation (see `NODE_EDITOR_GUIDE.md`)
   - Update room data in `schoolData.ts`
   - Test navigation paths

## Documentation

- `FLOOR_MAPS_GUIDE.md` - SVG floor map import guide
- `NODE_EDITOR_GUIDE.md` - Node editor detailed documentation
- `FEATURES.md` - This file, feature overview
- Inline code comments for technical details

## Version

**v2.0** - Multi-floor SVG import + Node Editor Mode
- Added SVG floor map support
- Implemented visual Node Editor
- Full bilingual support
- Enhanced mobile experience
