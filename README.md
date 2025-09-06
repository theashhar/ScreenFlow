# ScreenLoom

An all-in-one screen recorder software built with Electron and React. ScreenLoom provides a modern, cross-platform solution for capturing your screen with high-quality video output.

## What is ScreenLoom + Features

ScreenLoom is a desktop application that allows you to:

- **Screen Recording**: Capture your entire screen or specific windows
- **High-Quality Output**: Record in WebM format with VP9 codec for optimal quality
- **Cross-Platform**: Works on Windows, macOS, and Linux
- **Real-time Preview**: See what you're recording before starting
- **Easy File Management**: Automatically saves recordings to your Videos folder
- **Menu Integration**: Start/stop recording from the application menu
- **Modern UI**: Clean, intuitive interface built with React

### Key Features:
- Select specific screens or windows to record
- Live preview of selected source
- Recording timer with real-time display
- Automatic file naming with timestamps
- Quick access to recordings folder
- Cross-platform compatibility

## Installation

### Prerequisites
- Node.js >= 14.x
- npm >= 7.x

### Development Setup
```bash
# Clone the repository
git clone https://github.com/theashhar/SalesFlow.git
cd ScreenLoom

# Install dependencies
npm install

# Start development server
npm start
```

### Production Build
```bash
# Package for your platform
npm run package
```

## Tech Stack Used

### Core Technologies
- **Electron** - Cross-platform desktop application framework
- **React 18** - UI library for building user interfaces
- **TypeScript** - Type-safe JavaScript development
- **Webpack** - Module bundler and build tool

### Key Dependencies
- **electron-updater** - Auto-update functionality
- **electron-log** - Logging system
- **react-router-dom** - Client-side routing
- **@electron/notarize** - macOS app notarization

### Development Tools
- **ESLint** - Code linting
- **Prettier** - Code formatting
- **Jest** - Testing framework
- **Sass** - CSS preprocessor

## Folder Structure

```
src/
├── main/                      # Main process (Electron backend)
│   ├── main.ts               # Main process entry point
│   ├── menu.ts               # Application menu configuration
│   ├── preload.ts            # Preload script for security
│   └── util.ts               # Utility functions
│
├── renderer/                  # Renderer process (UI)
│   ├── components/            # Reusable React components
│   │   ├── RecordingControls.tsx
│   │   ├── RecordingStatus.tsx
│   │   ├── SourceSelector.tsx
│   │   └── VideoPreview.tsx
│   │
│   ├── hooks/                 # Custom React hooks
│   │   ├── index.ts
│   │   └── useScreenRecording.ts
│   │
│   ├── types/                 # TypeScript type definitions
│   │   └── index.ts
│   │
│   ├── App.css               # Main application styles
│   ├── index.ejs             # HTML template for Electron
│   ├── index.tsx             # React entry point
│   └── App.tsx               # Main React component
│
├── __tests__/                # Unit and integration tests
│   └── App.test.tsx
│
└── assets/                   # Application assets
    ├── icon.icns             # macOS icon
    ├── icon.ico              # Windows icon
    ├── icon.png              # PNG icon
    └── icons/                # Various icon sizes
```

## Maintainers

- [Ashhar Ali Ahmed](https://github.com/theashhar)
