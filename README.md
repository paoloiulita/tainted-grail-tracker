# Tainted Grail Save Sheet

A complete digital save sheet application for the Tainted Grail board game series, designed to be used as an interactive tracking tool during gameplay.

## Overview

This application provides a comprehensive digital replacement for physical save sheets, featuring modular campaign architecture, robust state persistence, and a grimdark fantasy UI design that matches the Tainted Grail aesthetic.

## Features

- **Multi-Campaign Support**: Fall of Avalon (complete), plus framework for Last Knight, Age of Legends, Red Death, and Kings of Ruin
- **Complete Save Sheet**: All sections from the official Tainted Grail save sheet PDF
- **State Persistence**: LocalStorage autosave with manual snapshot system
- **Mobile-Responsive**: Optimized for tablets and smartphones at the gaming table
- **Multi-Language**: English and Italian with extensible JSON-based i18n
- **GitHub Actions CI/CD**: Automated deployment to GitHub Pages

## Tech Stack

- **Framework**: React + Vite + TypeScript (strict mode)
- **UI Library**: Material-UI (MUI)
- **Styling**: Sass with custom dark theme
- **State Management**: React + localStorage
- **Internationalization**: react-i18next

## Quick Start

Requires Node.js 20.19+ or 22.12+.

```bash
# Clone the repository
cp /d/Documents/tainted-grail-tracker ~/projects/tainted-grail-tracker

# Install dependencies
cd tainted-grail-tracker
npm install

# Run the development server
npm run dev

# Run checks
npm run lint
npm run type-check
npm test

# Build for production
npm run build
```

## Application Structure

```
src/
├── components/           # Reusable UI components
│   ├── CampaignSelector.tsx
│   ├── Header.tsx
│   ├── LanguageSelector.tsx
│   ├── SnapshotManager.tsx
│   ├── SnapshotManagerButton.tsx
│   ├── LoadingSpinner.tsx
│   └── ErrorBoundary.tsx
│
├── contexts/             # React contexts
│   ├── CampaignContext.tsx
│   ├── CampaignContext.test.tsx
│   └── LanguageContext.tsx
│
├── hooks/                # Custom hooks
│   └── useAppState.ts
│
├── campaigns/            # Campaign implementations
│   ├── fallOfAvalon/     # Fall of Avalon campaign
│   │   └── FallOfAvalonCampaign.tsx
│   ├── lastKnight/      # Placeholder campaign
│   ├── ageOfLegends/     # Placeholder campaign
│   ├── redDeath/         # Placeholder campaign
│   └── kingsOfRuin/      # Placeholder campaign
│
├── styles/               # Sass styling
│   └── main.scss
│
├── locales/              # Translation files
│   ├── en.json
│   └── it.json
│
├── types.ts              # Shared application types
├── App.tsx               # Main application component
├── main.tsx              # Application entry point
└── index.css            # Global styles
├── .github/workflows/    # GitHub Actions configuration
├── CONTRIBUTING.md       # Contribution guidelines
└── CONSTRIBUTORS.md      # Detailed contribution instructions
```

## Key Features

### Campaign System
- Select/switch between different Tainted Grail campaigns
- Isolated state management per campaign
- Campaign-aware snapshots and version history

### Fall of Avalon Save Sheet
- Campaign, Chapter, and Day tracking
- 3 Menhir status tracking (Location, Dial Value)
- 2 Quest Dial status tracking
- 2 Guardian status tracking
- 4 Character save sheets with all attributes
- 88 Statuses with step tracking
- Removed locations grid (15 pairs)
- Character notes area

### State Management
- Autosave to localStorage
- Manual snapshot system with custom names
- Version history with restore/delete capabilities
- JSON import/export for backups

### Internationalization
- English and Italian support
- Runtime language switching
- Extensible JSON translation system

### Responsive Design
- Mobile-optimized for tablets and smartphones
- Dark theme with aged parchment accents
- High readability on all screen sizes

## Screenshots

[Include screenshots of the application UI]

## Contributing

Please see [CONTRIBUTING.md](CONTRIBUTING.md) for guidelines on contributing to this project.

## License

This project is licensed under the terms specified in LICENSE.

## Acknowledgments

Special thanks to the Tainted Grail board game community for their valuable feedback and contributions.

## Support

For issues, feature requests, or questions, please visit the project's issue tracker.

---

*Built with ❤️ for Tainted Grail adventurers*