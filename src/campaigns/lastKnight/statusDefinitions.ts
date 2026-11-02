import type { CampaignStatusDefinition, CampaignStatusProgress } from '../../types';

export const LAST_KNIGHT_STATUS_DEFINITIONS: Record<string, CampaignStatusDefinition> = {
  'Allfather’s Blessing': { steps: 1, enumerated: false },
  Carving: { steps: 4 },
  'Chalk Horse': { steps: 5 },
  Clues: { steps: 9 },
  'Cracked Sanctuary': { steps: 7 },
  Darkness: { steps: 8 },
  'Darkness Gift': { steps: 1, enumerated: false },
  Decision: { steps: 5 },
  Dismay: { steps: 9 },
  'Fallen Wyrdhunters': { steps: 3 },
  Friends: { steps: 8 },
  Gifts: { steps: 7 },
  'Great Deed': { steps: 5 },
  'Hidden Caches': { steps: 9 },
  Horrors: { steps: 9 },
  Initiation: { steps: 5 },
  Keeper: { steps: 3 },
  Legacy: { steps: 17 },
  'Lessons of the Past': { steps: 1, enumerated: false },
  Liberation: { steps: 7 },
  'Lost Apprentice': { steps: 3 },
  'Lost Treasures': { steps: 9 },
  'Means of Survival': { steps: 9 },
  Missions: { steps: 9 },
  Murder: { steps: 1, enumerated: false },
  'Mysteries and Visions': { steps: 9 },
  'Needed Supplies': { steps: 4 },
  'Parting Gift': { steps: 1, enumerated: false },
  Past: { steps: 3 },
  'Pillars Magic': { steps: 2, enumerated: false },
  'Resentful Goddess': { steps: 1, enumerated: false },
  Retracing: { steps: 4 },
  'Riches of the Past': { steps: 8 },
  'Saved by the Goddess': { steps: 1, enumerated: false },
  'Secrets of the Forest': { steps: 7 },
  'Shifting Menhir': { steps: 2 },
  Strangeness: { steps: 8 },
  Time: { steps: 1, enumerated: false },
  Truth: { steps: 4 },
  Tuathan: { steps: 1, enumerated: false },
  'Wilderness Encounters': { steps: 9 }
};

export const LAST_KNIGHT_REMOVED_LOCATION_COUNT = 20;

export function createInitialStatusProgress(): Record<string, CampaignStatusProgress> {
  return Object.fromEntries(
    Object.keys(LAST_KNIGHT_STATUS_DEFINITIONS).map(statusName => [statusName, { completed: [] }])
  );
}
