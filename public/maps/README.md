# Floor Maps Directory

This directory contains SVG floor plan files for the school navigation system.

## File Naming Convention

Use the following naming pattern:
```
{building}-floor-{floor}.svg
```

Examples:
- `main-floor-0.svg` - Main Building, Ground Floor
- `main-floor-1.svg` - Main Building, Floor 1
- `annex-floor-2.svg` - Annex Building, Floor 2
- `workshop-floor-1.svg` - Workshop Building, Floor 1

## Buildings

- **main** - Main Building (A)
- **annex** - Annex Building (B)
- **workshop** - Workshop Building (C)

## Floors

- **0** - Ground Floor (GF)
- **1** - First Floor (1F)
- **2** - Second Floor (2F)
- **3** - Third Floor (3F)

## Example

See `example-floor-map.svg` for a reference SVG structure.

## Configuration

After adding SVG files here, update `/src/app/data/floorMaps.ts` to reference them.

## Recommended Specifications

- **Dimensions**: 720px × 450px
- **ViewBox**: "0 0 720 450"
- **Format**: SVG 1.1 or 2.0
- **File Size**: < 100KB per file (optimized)
- **Colors**: Use neutral grays for hallways and walls

For detailed instructions, see `/FLOOR_MAPS_GUIDE.md` in the project root.
