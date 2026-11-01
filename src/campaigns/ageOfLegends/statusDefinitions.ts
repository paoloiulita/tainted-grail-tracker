import type { CampaignStatusDefinition, CampaignStatusProgress } from '../../types';

export const AGE_OF_LEGENDS_STATUS_DEFINITIONS: Record<string, CampaignStatusDefinition> = {
  Arbiter: { steps: 9 },
  Adversaries: { steps: 6 },
  'Astounding Discoveries': { steps: 9 },
  'Astounding Reports': { steps: 9 },
  'Building the Future': { steps: 9 },
  Borderlands: { steps: 9 },
  'Case Solved': { steps: 3 },
  'Civil War': { steps: 5, enumerated: false },
  'Concerned Citizens': { steps: 7 },
  Conquest: { steps: 8 },
  'Dangers of Avalon': { steps: 8 },
  'Defence of Tintagel': { steps: 5 },
  Dreamquest: { steps: 8 },
  'Dream Master': { steps: 4, enumerated: false },
  'Enemy Territory': { steps: 8 },
  'Eternal Rest': { steps: 4 },
  'Fall from Grace': { steps: 9 },
  'Forgotten Prisoner': { steps: 3 },
  'Giant’s Wisdom': { steps: 5, enumerated: false },
  'Grave Robber': { steps: 5, enumerated: false },
  'Grave Wound': { steps: 1, enumerated: false },
  'Grizzled Veteran': { steps: 1, enumerated: false },
  'Helpful Tricks': { steps: 8 },
  'Hopeful Signs': { steps: 10 },
  Huntsmen: { steps: 7 },
  'Idols of the Old World': { steps: 4 },
  Inquiries: { steps: 9 },
  'King’s Favor': { steps: 6 },
  Legacy: { steps: 9 },
  'Long Campaign': { steps: 6, enumerated: false },
  Loyalists: { steps: 9 },
  'Marked Trails': { steps: 4, enumerated: false },
  'Observation Posts': { steps: 2 },
  'Odds and Ends': { steps: 5 },
  'Outpost Strength': { steps: 6 },
  Pillars: { steps: 5 },
  Plunderer: { steps: 9 },
  'Price of Power': { steps: 3 },
  'Ports of Avalon': { steps: 7 },
  Prospectors: { steps: 9 },
  Reconciliation: { steps: 8 },
  Rebels: { steps: 9 },
  'Reputation: Stiltwood': { steps: 5 },
  Sabotage: { steps: 6 },
  'Saved by the Goddess': { steps: 1, enumerated: false },
  Scrounger: { steps: 8 },
  'Secrets of the Forest': { steps: 4 },
  Spy: { steps: 8, enumerated: false },
  Survivors: { steps: 8 },
  'Strange Encounters': { steps: 10 },
  'Supernatural Events': { steps: 9 },
  Tactician: { steps: 3 },
  'Traveler’s Knowledge': { steps: 7 },
  Trials: { steps: 5 },
  Undercastle: { steps: 2 },
  'Unwelcome Guest': { steps: 2 },
  'Valiant Defeat': { steps: 9 },
  Victories: { steps: 6 },
  Weaponry: { steps: 3 }
};

export const AGE_OF_LEGENDS_REMOVED_LOCATION_COUNT = 16;

export function createInitialStatusProgress(
  definitions: Record<string, CampaignStatusDefinition> = AGE_OF_LEGENDS_STATUS_DEFINITIONS
): Record<string, CampaignStatusProgress> {
  return Object.fromEntries(
    Object.keys(definitions).map(statusName => [statusName, { completed: [] }])
  );
}
