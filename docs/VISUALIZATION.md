# Zeroth Visualization Guide

## Overview

The Zeroth visualization is a Three.js-based 3D interactive visualization of the living cryptographic economy. It displays hash nodes, block clusters, lineage connections, and decay animations in real-time.

## Architecture

### Frontend Stack

- **React 18** - UI framework
- **Vite** - Build tool and dev server
- **Three.js** - 3D graphics library
- **@react-three/fiber** - React renderer for Three.js
- **@react-three/drei** - Useful helpers for react-three/fiber

### Components

1. **App.jsx** - Main application component
2. **Scene/Field.jsx** - 3D field scene container
3. **Scene/HashNode.jsx** - Individual hash node visualization
4. **Scene/BlockCluster.jsx** - Block cluster visualization
5. **Scene/Lineage.jsx** - Lineage connection visualization
6. **Controls/Controls.jsx** - UI controls (play/pause, speed, filters)
7. **Hooks/useWebSocket.js** - WebSocket connection hook
8. **Hooks/useZerothState.js** - Zeroth state management hook
9. **API/client.js** - API client for REST endpoints

## Features

### Hash Nodes

- **Glowing Effect**: Hash nodes glow based on weight/price
- **Intensity**: Intensity proportional to economic weight
- **Color**: Color based on convergence state
- **Position**: Positioned in 3D space based on DNA hash

### Block Clusters

- **Clustering**: Hashes grouped by block
- **Tier Display**: Block tier shown visually
- **Convergence**: Convergence state displayed

### Lineage Connections

- **Parent-Child Links**: Lines connecting parent and child hashes
- **Color Coding**: Different colors for different lineage types
- **Animation**: Connections animate on creation

### Decay Animations

- **Weight Decay**: Visual representation of weight decay
- **Price Decay**: Visual representation of price decay
- **Convergence**: Visual representation of convergence

### Controls UI

- **Play/Pause**: Control VM iteration loop
- **Speed**: Adjust iteration speed
- **Filters**: Filter by tier, convergence, etc.
- **View Modes**: Switch between different visualization modes

## Setup

### Prerequisites

- Node.js 18+
- npm or yarn

### Installation

```bash
cd zeroth-web
npm install
```

### Development

```bash
npm run dev
```

Opens visualization at `http://localhost:3000` (proxies API to `http://localhost:101`).

### Build

```bash
npm run build
```

## API Integration

The visualization connects to the Zeroth Web API:

- **REST**: `http://localhost:101/api/*`
- **WebSocket**: `ws://localhost:101/ws` (if implemented)

### Data Flow

1. **Initial Load**: Fetch state via `/api/state`
2. **Real-time Updates**: Connect via WebSocket for live updates
3. **History**: Fetch history via `/api/history`
4. **Blocks**: Fetch blocks via `/api/blocks`
5. **Hashes**: Fetch hashes via `/api/hashes`

## Visualization Details

### Hash Node Rendering

- **Size**: Based on weight (larger = more weight)
- **Glow**: Based on price (brighter = higher price)
- **Color**: Based on convergence (red = low convergence, blue = high convergence)
- **Position**: 3D position derived from DNA hash

### Block Clustering

- **Grouping**: Hashes grouped by block ID
- **Visualization**: Blocks shown as clusters with connecting lines
- **Tier Display**: Block tier shown as ring around cluster

### Lineage Visualization

- **Connections**: Lines between parent and child hashes
- **Color**: Different colors for different lineage types
- **Thickness**: Based on reinforcement strength

### Decay Animation

- **Weight Decay**: Nodes shrink as weight decays
- **Price Decay**: Glow intensity decreases as price decays
- **Convergence**: Nodes fade as convergence increases

## Controls

### Play/Pause

- **Play**: Resume VM iteration loop
- **Pause**: Pause VM iteration loop

### Speed Control

- **Slow**: 1x speed (normal)
- **Medium**: 2x speed
- **Fast**: 4x speed

### Filters

- **Tier Filter**: Show only blocks of specific tier
- **Convergence Filter**: Show only hashes below convergence threshold
- **Price Filter**: Show only hashes above price threshold

### View Modes

- **Field View**: 3D field visualization
- **Block View**: Block-centric view
- **Lineage View**: Lineage-focused view
- **Convergence View**: Convergence-focused view

## Performance Considerations

- **Hash Limit**: Visualization limited to 1000 hashes for performance
- **Update Rate**: WebSocket updates throttled to 1Hz
- **LOD**: Level-of-detail rendering for distant objects
- **Culling**: Frustum culling for off-screen objects

## Customization

### Colors

Colors can be customized in component files:
- Hash node colors: `HashNode.jsx`
- Block cluster colors: `BlockCluster.jsx`
- Lineage colors: `Lineage.jsx`

### Layout

Layout algorithm can be customized:
- 3D positioning: `Field.jsx`
- Clustering: `BlockCluster.jsx`
- Spacing: Component props

## Troubleshooting

### Visualization Not Loading

1. Check Zeroth VM is running: `zeroth status`
2. Check Web API is accessible: `curl http://localhost:101/api/state`
3. Check browser console for errors

### No Updates

1. Check WebSocket connection (if implemented)
2. Check API endpoints are responding
3. Check VM is iterating: `zeroth observe`

### Performance Issues

1. Reduce hash limit in API calls
2. Increase update interval
3. Enable LOD rendering
4. Reduce number of visible objects

## Future Enhancements

- **VR Support**: Virtual reality visualization
- **AR Support**: Augmented reality overlay
- **Export**: Export visualization as video/image
- **Recording**: Record visualization sessions
- **Multi-Instance**: Visualize multiple VM instances
