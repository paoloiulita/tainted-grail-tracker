Act as an expert frontend React developer and UI/UX designer. Your task is to build a complete, production-ready, single-page web application that serves as a digital, interactive save sheet for the entire **Tainted Grail** board game series.

### Multi-Campaign Architecture & Extensibility
The app must be designed from the ground up to support multiple campaigns across the Tainted Grail universe, as each campaign features unique save sheets, mechanics, and tracking needs.

1. **Campaign Registry & Selector:**
   - Implement a modular system for campaign definitions.
   - The app must support the following campaigns in its architecture:
     - **Fall of Avalon** (Initial active implementation)
     - **Last Knight** (Placeholder / structure ready)
     - **Age of Legends** (Placeholder / structure ready)
     - **Red Death** (Placeholder / structure ready)
     - **Kings of Ruin** (Placeholder / structure ready)
   - Allow the user to select or switch the active campaign from a main menu or header menu.

2. **Phase 1 Focus — Fall of Avalon:**
   - We will start by building the fully detailed save sheet specifically for **Fall of Avalon**.
   - The layout, data structures, and fields for Fall of Avalon will be provided below.
   - The codebase must keep campaign-specific UI components and state schemas isolated (e.g., inside `src/campaigns/fallOfAvalon/`), making it effortless to add the remaining campaigns later using custom JSON/component definitions without refactoring core engine logic.

3. **Campaign-Aware State Persistence:**
   - Every saved game snapshot and autosave must be explicitly linked to its corresponding campaign.
   - Filtering & Organization: The version history and saved snapshots list must allow filtering by campaign, ensuring that snapshots for *Fall of Avalon* remain separate from future campaigns like *Kings of Ruin*. See below about saving campaigns.

Please structure the application state, project folders, and core components to seamlessly accommodate this multi-campaign design while prioritizing the complete implementation of *Fall of Avalon*.

### Tech Stack & Architecture
- **Framework:** React (using Vite for bundling).
- **UI Library:** Material UI (MUI) for core components, inputs, layout grids, and modals.
- **Styling:** Sass (`.scss`) combined with MUI's theme customization to create a dark, immersive, grimdark fantasy board game aesthetic matching Tainted Grail's visual tone (aged parchment accents, deep slate/charcoal tones, high readability).
- **State Persistence:** React state combined with `localStorage` so that all campaign progress, character stats, trackers, and notes are automatically saved and persist across browser sessions. Support manual JSON export/import for campaign backups.
- **CI/CD & Deployment:** Configured with **GitHub Actions** for automated building and deployment to **GitHub Pages**.

### Core Functional Requirements for the phase 1
1. **Save Sheet Sections:** Replicate all sections present in the Tainted Grail save sheet PDF. See detailed Fall of Avalon requirements and structure below.
2. **Responsive Design:** Fully responsive layout optimized for tablets and smartphones, allowing players to use a mobile device comfortably at the gaming table.
3. **Project Structure & Files:**
   - Provide the complete folder structure and modular component files (`components/`, `hooks/`, `styles/`, etc.).
   - Configure `vite.config.ts` with the correct `base` path for GitHub Pages.
   - Provide the exact GitHub Actions workflow YAML file inside `.github/workflows/` to handle building and deploying to GitHub Pages automatically.
4. **Game State History & Saved Snapshots**
	- Manual Save / Snapshot System: Provide a prominent "Save" button that captures a complete snapshot of the current game state at that exact moment.
	- Named Save States: Allow users to assign custom, descriptive names/titles to these snapshots (e.g., "End of Chapter 2", "Before boss fight at Location 104").
	- Version History List & Restoration: Maintain a manageable list of all saved snapshots stored in `localStorage`. Players must be able to view this list, inspect snapshot details, restore/load any previous version into the active save sheet, or delete obsolete snapshots.
5. **Multi-Language Support (i18n)**
	- Static JSON Localization: Implement multi-language support (e.g., using `react-i18next` or a lightweight custom i18n hook) powered by external, static JSON translation files (e.g., `locales/en.json`, `locales/it.json`).
	- Language Selector: Add an intuitive UI element (such as a dropdown or flag selector) in the app header/settings to easily switch languages at runtime.
	- Extensible Schema: Ensure all UI labels, section titles, and tooltips draw their content directly from these JSON files, making it simple to add or edit translation keys later.
   - When released the app will be localized in English and Italian only. Subsequent languages will be added by other users with PRs. Please create a `CONSTRIBUTORS.md` file where you explain exactly how to add a new language and how to provide localized strings.

### Fall of Avalon Save Sheet
- Campaign, Chapter and Day tracker.
   - 3 Menhir status. For every Menhir:
      - Location
      - Dial Value
   - 2 Quest Dial status. For every Quest Dial:
      - Location
      - Dial Value
   - 2 Guardian status. For every Guardian:
      - Location
   - Player Notes: An open text area where players can input whatever they want
   - 4 Player Save sheet Box. For each one:
      - Name
      - Location
      - Dial
      - Health
      - Energy
      - Terror
      - Experience
      - Reputation
      - Magic
      - Food
      - Wealth
      - 6 attributes - Assume attribute icons are placed in `public/assets/attribute-icons/` (e.g., aggression.svg, caution.svg, etc.). Provide SVG placeholders or fallback icons if missing.
         - Aggression
         - Caution
         - Courage
         - Empathy
         - Practicality
         - Spirituality
   - Statuses and steps: throughout the campaign, players receive statuses which may be represented by a variable number of steps. See details below.
      - The app should give the user the possibility to mark which step is reached for every status.
      - Steps are **NOT** to be considered consecutive. Render them as separate clickable boxes numbered from 1 to N (where N is the number of steps for that specific status). Every one of those can be checked or unchecked independently.
      - A status can also have a caption text. Render it only if present
   - Removed Locations: Render a grid of 15 pairs of numeric inputs formatted as [ Box ] ➔ [ Box ] to track replaced/removed map locations

#### Fall of Avalon Statuses

| Status | Steps | Caption |
| :--- | :---: | :---: |
| **Allies of Avalon** | 5 | |
| **Black Cauldron** | 3 | |
| **Burning Mystery** | 8 | |
| **Call from Beyond** | 1 | |
| **Charred Knowledge** | 1 | |
| **Cherished Belongings** | 1 | |
| **Cold Pyre** | 1 | |
| **Cosuil** | 5 | |
| **Deal Breaker** | 1 | |
| **Deep Secret** | 1 | |
| **Diplomat** | 3 | |
| **Diplomatic Mission** | 6 | |
| **Disturbing Information** | 3 | |
| **Dreams and Prophecies** | 8 | |
| **Enemies of Avalon** | 3 | |
| **Escalation** | 3 | |
| **Fael's Legacy** | 1 | |
| **Fall of Chivalry** | 8 | When you have any six parts of this status, go to BoS, Verse 525 |
| **Farpoint Clues** | 5 | |
| **Fate of the Expedition** | 9 | When you have parts 1-8 of this status, go to BoS, Verse 405 |
| **Final Confrontations** | 7 | |
| **Final Lesson** | 5 | |
| **Fortunate Meetings** | 5 | |
| **Gerraint's Successor** | 3 | |
| **Glen Ritual** | 2 | |
| **Guest of Honor** | 1 | |
| **Halfway Intrigue** | 3 | |
| **Helping Hand** | 6 | |
| **Helping the Knights** | 1 | |
| **Hidden Treasures** | 8 | |
| **Hunter's Mark** | 1 | |
| **Lady's Task** | 1 | |
| **Last Haven** | 5 | |
| **Left Behind** | 9 | |
| **Lost and Fallen** | 7 | |
| **Maggot's Redemption** | 1 | |
| **Matricide** | 1 | |
| **Monastery Discovered** | 1 | |
| **Moonring Mission** | 1 | |
| **Morgaine's Task** | 1 | |
| **Mourning Song** | 2 | |
| **Mystery Solved** | 1 | |
| **Pathfinder** | 8 | |
| **Peace in Borough** | 1 | |
| **People's Champion** | 1 | |
| **Pillager** | 5 | |
| **Reclamation** | 1 | |
| **Remedy** | 4 | |
| **Remnants** | 5 | |
| **Restoring the Order** | 8 | When you have any six parts of this status, go to BoS, Verse 512 |
| **End of the Road** | 1 | |
| **Riddle of the Oldsteel** | 1 | |
| **Saved by the Goddess** | 1 | |
| **Scrounger** | 1 | |
| **Secrets of the Forest** | 4 | |
| **Shelter in the Storm** | 1 | |
| **Shrine Secure** | 1 | |
| **Something is Watching** | 1 | When you have all four parts of this status, resolve Special Event C |
| **Stonemason's Secret** | 1 | |
| **Strange Encounters** | 8 | |
| **Supplying the Revolt** | 1 | |
| **Tangleroot Knowledge** | 2 | |
| **Traveling Menhir** | 2 | |
| **Tuathan Exploration** | 5 | |
| **Underfern** | 5 | |
| **War for Avalon** | 4 | |
| **Winds of Wyrdness** | 1 | |

Please generate the complete codebase, configuration files, and setup instructions.