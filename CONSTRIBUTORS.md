# Contributors Guide

This document provides detailed instructions for contributing to the Tainted Grail Save Sheet application, particularly for adding new languages and campaigns.

## Adding a New Language

The application supports multi-language functionality with static JSON translation files. Here's how to add a new language:

### Step 1: Create Translation JSON File

1. Navigate to the `src/locales/` directory
2. Create a new JSON file named after your language code (e.g., `fr.json` for French)
3. Use this template as your starting point:

```json
{
  "campaigns": {
    "fallOfAvalon": {
      "name": "Fall of Avalon",
      "description": "The first campaign in the Tainted Grail series..."
    },
    "lastKnight": {
      "name": "Last Knight",
      "description": "A standalone campaign..."
    },
    "ageOfLegends": {
      "name": "Age of Legends",
      "description": "An epic saga..."
    },
    "redDeath": {
      "name": "Red Death",
      "description": "A dark campaign..."
    },
    "kingsOfRuin": {
      "name": "Kings of Ruin",
      "description": "Post-apocalyptic adventures..."
    }
  },
  "common": {
    "loading": "Loading...",
    "save": "Save",
    "cancel": "Cancel",
    "confirm": "Confirm",
    "delete": "Delete",
    "restore": "Restore",
    "close": "Close",
    "next": "Next",
    "previous": "Previous",
    "select": "Select",
    "selected": "Selected",
    "yes": "Yes",
    "no": "No",
    "ok": "OK",
    "error": "Error",
    "warning": "Warning",
    "success": "Success",
    "search": "Search",
    "clear": "Clear",
    "saveChanges": "Save Changes",
    "discardChanges": "Discard Changes",
    "unsavedChanges": "You have unsaved changes",
    "confirmExit": "Are you sure you want to leave? Unsaved changes will be lost.",
    "copy": "Copy",
    "copied": "Copied",
    "edit": "Edit",
    "done": "Done",
    "add": "Add",
    "remove": "Remove",
    "editItem": "Edit Item",
    "deleteItem": "Delete Item"
  },
  "header": {
    "campaign": "Campaign",
    "language": "Language",
    "saveHistory": "Save History",
    "currentCampaign": "Current Campaign"
  },
  "home": {
    "title": "Select Campaign",
    "subtitle": "Choose a campaign to begin your Tainted Grail adventure"
  },
  "campaigns": {
    "select": "Select Campaign...",
    "selectToBegin": "Select a campaign to begin...",
    "placeholder": "This campaign is under development.",
    "comingSoon": "Coming soon!",
    "selected": "Selected",
    "implemented": "Implemented",
    "placeholder": "Placeholder",
    "planned": "Planned"
  },
  "snapshots": {
    "title": "Save History",
    "createNew": "Create New Save",
    "save": "Save",
    "namePlaceholder": "Enter save name...",
    "list": "Save Files",
    "empty": "No save files found.",
    "searchPlaceholder": "Search saves...",
    "confirmRestore": "Are you sure you want to restore this save? This will overwrite the current game state.",
    "confirmDelete": "Are you sure you want to delete this save? This action cannot be undone.",
    "successSave": "Save created successfully",
    "successRestore": "Save restored successfully",
    "successDelete": "Save deleted successfully"
  },
  "fallOfAvalon": {
    "tracker": {
      "campaign": "Campaign",
      "chapter": "Chapter",
      "day": "Day"
    },
    "menhirs": {
      "title": "Menhirs",
      "location": "Location",
      "dialValue": "Dial Value",
      "0": "Menhir 1",
      "1": "Menhir 2",
      "2": "Menhir 3"
    },
    "questDials": {
      "title": "Quest Dials",
      "location": "Location",
      "dialValue": "Dial Value",
      "0": "Quest Dial 1",
      "1": "Quest Dial 2"
    },
    "guardians": {
      "title": "Guardians",
      "location": "Location",
      "0": "Guardian 1",
      "1": "Guardian 2"
    },
    "playerNotes": {
      "title": "Player Notes",
      "placeholder": "Enter notes about your campaign..."
    },
    "players": {
      "title": "Players",
      "addPlayer": "Add Player",
      "editPlayer": "Edit Player",
      "deletePlayer": "Delete Player"
    },
    "attributes": {
      "aggression": "Aggression",
      "caution": "Caution",
      "courage": "Courage",
      "empathy": "Empathy",
      "practicality": "Practicality",
      "spirituality": "Spirituality"
    },
    "statuses": {
      // All 88 status entries with their step counts
      "Allies of Avalon": { "steps": 5 },
      "Black Cauldron": { "steps": 3 },
      "Burning Mystery": { "steps": 8 },
      "Call from Beyond": { "steps": 1 },
      "Charred Knowledge": { "steps": 1 },
      "Cherished Belongings": { "steps": 1 },
      "Cold Pyre": { "steps": 1 },
      "Cosuil": { "steps": 5 },
      "Deal Breaker": { "steps": 1 },
      "Deep Secret": { "steps": 1 },
      "Diplomat": { "steps": 3 },
      "Diplomatic Mission": { "steps": 6 },
      "Disturbing Information": { "steps": 3 },
      "Dreams and Prophecies": { "steps": 8 },
      "Enemies of Avalon": { "steps": 3 },
      "Escalation": { "steps": 3 },
      "Fael's Legacy": { "steps": 1 },
      "Fall of Chivalry": { "steps": 8 },
      "Farpoint Clues": { "steps": 5 },
      "Fate of the Expedition": { "steps": 9 },
      "Final Confrontations": { "steps": 7 },
      "Final Lesson": { "steps": 5 },
      "Fortunate Meetings": { "steps": 5 },
      "Gerraint's Successor": { "steps": 3 },
      "Glen Ritual": { "steps": 2 },
      "Guest of Honor": { "steps": 1 },
      "Halfway Intrigue": { "steps": 3 },
      "Helping Hand": { "steps": 6 },
      "Helping the Knights": { "steps": 1 },
      "Hidden Treasures": { "steps": 8 },
      "Hunter's Mark": { "steps": 1 },
      "Lady's Task": { "steps": 1 },
      "Last Haven": { "steps": 5 },
      "Left Behind": { "steps": 9 },
      "Lost and Fallen": { "steps": 7 },
      "Maggot's Redemption": { "steps": 1 },
      "Matricide": { "steps": 1 },
      "Monastery Discovered": { "steps": 1 },
      "Moonring Mission": { "steps": 1 },
      "Morgaine's Task": { "steps": 1 },
      "Mourning Song": { "steps": 2 },
      "Mystery Solved": { "steps": 1 },
      "Pathfinder": { "steps": 8 },
      "Peace in Borough": { "steps": 1 },
      "People's Champion": { "steps": 1 },
      "Pillager": { "steps": 5 },
      "Reclamation": { "steps": 1 },
      "Remedy": { "steps": 4 },
      "Remnants": { "steps": 5 },
      "Restoring the Order": { "steps": 8 },
      "End of the Road": { "steps": 1 },
      "Riddle of the Oldsteel": { "steps": 1 },
      "Saved by the Goddess": { "steps": 1 },
      "Scrounger": { "steps": 1 },
      "Secrets of the Forest": { "steps": 4 },
      "Shelter in the Storm": { "steps": 1 },
      "Shrine Secure": { "steps": 1 },
      "Something is Watching": { "steps": 1 },
      "Stonemason's Secret": { "steps": 1 },
      "Strange Encounters": { "steps": 8 },
      "Supplying the Revolt": { "steps": 1 },
      "Tangleroot Knowledge": { "steps": 2 },
      "Traveling Menhir": { "steps": 2 },
      "Tuathan Exploration": { "steps": 5 },
      "Underfern": { "steps": 5 },
      "War for Avalon": { "steps": 4 },
      "Winds of Wyrdness": { "steps": 1 }
    },
    "removedLocations": {
      "title": "Removed Locations",
      "boxPlaceholder": "Box"
    }
  },
  "ui": {
    "grid": "Grid",
    "list": "List",
    "expandAll": "Expand All",
    "collapseAll": "Collapse All",
    "showCompleted": "Show Completed",
    "hideCompleted": "Hide Completed",
    "filter": "Filter",
    "sort": "Sort",
    "export": "Export",
    "import": "Import",
    "preview": "Preview",
    "saveAs": "Save As",
    "version": "Version",
    "created": "Created",
    "lastModified": "Last Modified"
  }
}
```

### Step 2: Translation Key Mapping

You'll need to translate the following key patterns:

#### Campaign Level
- `campaigns.{campaignId}.name` - Campaign display name
- `campaigns.{campaignId}.description` - Campaign description

#### Common UI
- `common.{action}` - Actions like save, cancel, delete, etc.
- `common.{state}` - States like loading, error, success

#### Sections
- `fallOfAvalon.{section}.{field}` - Field labels and descriptions
- `fallOfAvalon.{section}.title` - Section titles

#### Statuses
- `fallOfAvalon.statuses.{statusName}` - Status entries

#### UI Controls
- `ui.{control}` - UI control labels

### Step 3: Validation

1. Ensure the JSON is valid using a JSON validator
2. Check for missing required keys
3. Test the translations in the application
4. Verify that all fields display correctly

### Step 4: Pull Request

1. Create a pull request with your translation file
2. Include a description of the language you're adding
3. Mention any cultural considerations or notes

## Adding a New Campaign

The application follows a modular approach for campaigns. Here's how to add a new campaign:

### Step 1: Create Campaign Directory

```bash
mkdir -p src/campaigns/{campaignId}
cd src/campaigns/{campaignId}
```

### Step 2: Create Campaign Component

Create a component file (e.g., `{CampaignId}Campaign.jsx`):

```javascript
import React, { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';

const {CampaignId}Campaign = () => {
  const { t } = useTranslation();
  const [state, setState] = useState({
    // Initial campaign state
  });

  // Campaign-specific logic

  return (
    <div className="campaign-container">
      {/* Campaign UI */}
    </div>
  );
};

export default {CampaignId}Campaign;
```

### Step 3: Update Campaign Registry

Update the `CAMPAIGN_REGISTRY` in `src/hooks/useAppState.js`:

```javascript
{campaignId}: {
  id: '{campaignId}',
  name: t('campaigns.{campaignId}.name'),
  version: '0.1',
  description: t('campaigns.{campaignId}.description'),
  component: () => import('@/campaigns/{campaignId}/{CampaignId}Campaign'),
  status: 'placeholder', // or 'implemented'
  defaultState: {} // Initial campaign state
}
```

### Step 4: Add Translations

Add campaign-specific translations to the appropriate JSON files:

```json
{
  "campaigns": {
    "{campaignId}": {
      "name": "{Campaign Name in English}",
      "description": "{Campaign Description in English}"
    }
  },
  "{campaignId}": {
    "tracker": {
      "campaign": "Campaign",
      "chapter": "Chapter",
      "day": "Day"
    }
    // Add all other section translations
  }
}
```

### Step 5: Test and Deploy

1. Test the campaign in the application
2. Ensure all translations are properly integrated
3. Update the campaign status from `placeholder` to `implemented` when complete
4. Create a pull request

## Project Structure Overview

```
src/
├── components/           # Reusable UI components
│   ├── CampaignSelector.jsx
│   ├── Header.jsx
│   ├── LanguageSelector.jsx
│   ├── SnapshotManager.jsx
│   ├── SnapshotManagerButton.jsx
│   ├── LoadingSpinner.jsx
│   └── ErrorBoundary.jsx
│
├── contexts/             # React contexts
│   ├── CampaignContext.js
│   └── LanguageContext.js
│
├── hooks/                # Custom hooks
│   └── useAppState.js
│
├── campaigns/            # Campaign implementations
│   ├── fallOfAvalon/      # Fall of Avalon campaign
│   │   └── FallOfAvalonCampaign.jsx
│   ├── lastKnight/       # Placeholder campaign
│   ├── ageOfLegends/      # Placeholder campaign
│   ├── redDeath/          # Placeholder campaign
│   └── kingsOfRuin/       # Placeholder campaign
│
├── styles/               # Sass styling
│   └── main.scss
│
├── locales/              # Translation files
│   ├── en.json
│   └── it.json
│
├── services/             # Business logic and utilities
│   └── index.js
│
├── assets/               # Static assets
│   └── attribute-icons/  # Player attribute icons
│
├── App.jsx              # Main application component
├── main.jsx             # Application entry point
└── index.css            # Global styles
```

## Development Workflow

1. **Fork the repository** and clone it locally
2. **Create a new branch** for your changes
3. **Make your changes** following the guidelines
4. **Test thoroughly** - both functionality and translations
5. **Create a pull request** with a clear description
6. **Address feedback** from reviewers
7. **Merge** once approved

## Code Quality Standards

- Follow the existing code style and patterns
- Use TypeScript for type safety
- Write clean, readable, and maintainable code
- Include comprehensive tests
- Ensure accessibility compliance
- Follow responsive design principles
- Maintain consistent naming conventions

## Getting Help

If you have questions or need assistance:

1. Check the existing issues in the repository
2. Look at the project documentation
3. Search for similar contributions
4. If still stuck, create a new issue with:
   - Clear problem description
   - Steps to reproduce
   - Error messages
   - System information

## Acknowledgments

Thank you for contributing to the Tainted Grail Save Sheet application! Your help makes this project better for all Tainted Grail players.

The application aims to provide a comprehensive digital replacement for physical save sheets, with full support for multiple campaigns and languages.

---

**Note:** This project is open-source and welcomes contributions from the community. All contributions are subject to the project's code of conduct.