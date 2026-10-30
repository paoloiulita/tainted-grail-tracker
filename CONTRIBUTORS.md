# Contributors Guide

This guide describes the current codebase and how to work on it. The app is a React, TypeScript, and Vite project; use the existing TypeScript patterns and keep campaign-specific data separate from shared UI.

## Current product scope

- Fall of Avalon is implemented and playable.
- Other campaign buttons are intentionally disabled and marked “Coming soon.” Enable one only when its campaign implementation is ready.
- English is the only active translation for the first release. i18next remains in use, and the language selector is currently hidden.
- Campaign progress and save snapshots are stored in browser `localStorage`.

## Set up and validate

Requirements: Node.js `^20.19.0` or `>=22.12.0`.

```sh
npm ci
npm run dev
```

Before submitting a change, run the checks relevant to it:

```sh
npm run lint
npm run type-check
npm test
npm run build
```

The GitHub Actions workflow runs all four checks and builds on pull requests and pushes to `main`. A push to `main` deploys to GitHub Pages when Pages is configured for GitHub Actions.

## Where to make changes

- `src/campaigns/fallOfAvalon/FallOfAvalonCampaign.tsx` contains the Fall of Avalon interface and campaign interactions.
- `src/campaigns/fallOfAvalon/statusDefinitions.ts` is the canonical source for status box counts and non-enumerated statuses. Keep step counts out of locale files.
- `src/hooks/useAppState.ts` defines the campaign registry, initial campaign state, and snapshot behavior.
- `src/types.ts` contains shared campaign and save-state types.
- `src/components/` contains shared UI, including the campaign selector, header, character notes, and save manager.
- `src/locales/en.json` contains the active English interface and status captions.
- `src/localStorageBackup.ts` handles JSON backup validation and replacement of browser storage.
- `public/assets/` contains images, icons, and fonts used by the interface.

Add or update tests alongside the related feature. Status tests should cover the canonical definitions, translation coverage, and any behavior affected by status metadata.

## Adding a translation

The Italian locale is not currently included in the repository. To add a language after its translation is ready:

1. Add a locale JSON file under `src/locales/`, following the key structure in `en.json`.
2. Register it in the `resources` passed to `i18n.init` in `src/main.tsx`.
3. Add its code to the `Language` type in `src/types.ts`.
4. Wire the language into `LanguageSelector.tsx` and expose the selector by updating the `.language-selector` rule in `src/index.css`.
5. Translate all user-facing interface strings, status names, and captions. Do not put status step counts or enumeration flags in translations; those belong in `statusDefinitions.ts`.
6. Add tests that check locale key parity and translation coverage, then run all project checks.

## Adding a campaign

Campaign support touches several shared surfaces. Keep the campaign unavailable until its implementation is complete:

1. Add the campaign ID and any campaign-specific state types to `src/types.ts`.
2. Add the campaign's name and default save state to `CAMPAIGN_REGISTRY` in `src/hooks/useAppState.ts`.
3. Add its artwork to `public/assets/campaign-backgrounds/` and map it in `src/components/CampaignSelector.tsx`.
4. Implement its campaign UI under `src/campaigns/<campaign>/`.
5. Add campaign-specific localization keys to `src/locales/en.json`.
6. Add its route/component handling in `src/App.tsx`.
7. Enable the campaign in `CampaignSelector.tsx` only when it is ready to use.
8. Add tests for initial state, persistence, and campaign behavior.

Campaign saves should remain isolated by campaign ID. Preserve existing save compatibility when changing stored data, and update migration logic and tests when a schema change requires it.

## Pull requests

Keep changes focused, follow existing naming and formatting, and include tests for behavior changes. In the pull request description, summarize the user-visible change and list the checks you ran. Do not commit generated build output from `dist/`.

## License

Contributions to the application source code are subject to the [MIT License](./LICENSE). Third-party assets are excluded and remain the property of their respective owners.
