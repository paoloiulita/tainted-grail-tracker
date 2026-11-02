import { describe, expect, it } from 'vitest';
import en from '../../locales/en.json';
import { CHARACTER_ROSTERS } from '../characterRoster';
import { CAMPAIGN_REGISTRY } from '../../hooks/useAppState';
import { LAST_KNIGHT_STATUS_DEFINITIONS, createInitialStatusProgress } from './statusDefinitions';

const expectedBoxCounts: Record<string, number> = {
  'Allfather’s Blessing': 1,
  Carving: 4,
  'Chalk Horse': 5,
  Clues: 9,
  'Cracked Sanctuary': 7,
  Darkness: 8,
  'Darkness Gift': 1,
  Decision: 5,
  Dismay: 9,
  'Fallen Wyrdhunters': 3,
  Friends: 8,
  Gifts: 7,
  'Great Deed': 5,
  'Hidden Caches': 9,
  Horrors: 9,
  Initiation: 5,
  Keeper: 3,
  Legacy: 17,
  'Lessons of the Past': 1,
  Liberation: 7,
  'Lost Apprentice': 3,
  'Lost Treasures': 9,
  'Means of Survival': 9,
  Missions: 9,
  Murder: 1,
  'Mysteries and Visions': 9,
  'Needed Supplies': 4,
  'Parting Gift': 1,
  Past: 3,
  'Pillars Magic': 2,
  'Resentful Goddess': 1,
  Retracing: 4,
  'Riches of the Past': 8,
  'Saved by the Goddess': 1,
  'Secrets of the Forest': 7,
  'Shifting Menhir': 2,
  Strangeness: 8,
  Time: 1,
  Truth: 4,
  Tuathan: 1,
  'Wilderness Encounters': 9
};

const nonEnumeratedStatuses = [
  'Allfather’s Blessing',
  'Darkness Gift',
  'Lessons of the Past',
  'Murder',
  'Parting Gift',
  'Pillars Magic',
  'Resentful Goddess',
  'Saved by the Goddess',
  'Time',
  'Tuathan'
].sort();

describe('Last Knight status definitions', () => {
  it('has a localized name for each PDF status', () => {
    const statusNames = Object.keys(LAST_KNIGHT_STATUS_DEFINITIONS).sort();

    expect(statusNames).toHaveLength(41);
    expect(Object.keys(en.lastKnight.statuses.names).sort()).toEqual(statusNames);
    expect(JSON.stringify(en.lastKnight.statuses)).not.toContain('"steps"');
  });

  it('matches every PDF box count and numbered or unnumbered status', () => {
    expect(Object.fromEntries(
      Object.entries(LAST_KNIGHT_STATUS_DEFINITIONS).map(([name, definition]) => [name, definition.steps])
    )).toEqual(expectedBoxCounts);
    expect(
      Object.entries(LAST_KNIGHT_STATUS_DEFINITIONS)
        .filter(([, definition]) => definition.enumerated === false)
        .map(([name]) => name)
        .sort()
    ).toEqual(nonEnumeratedStatuses);
  });

  it('matches the single caption printed under Dismay', () => {
    expect(en.lastKnight.statuses.captions).toEqual({
      Dismay: 'When you have any six parts of this status, go to BoS, Verse 724'
    });
  });

  it('initializes progress for all statuses', () => {
    const progress = createInitialStatusProgress();

    expect(Object.keys(progress).sort()).toEqual(Object.keys(expectedBoxCounts).sort());
    expect(Object.values(progress).every(({ completed }) => completed.length === 0)).toBe(true);
  });

  it('uses the existing character roster and Fall of Avalon tracker defaults', () => {
    expect(CHARACTER_ROSTERS.lastKnight).toEqual(['Mabd', 'Dagan', 'Sloan', 'Fyul', 'Niamh']);
    const state = CAMPAIGN_REGISTRY.lastKnight.defaultState;

    expect(state.menhirs).toHaveLength(3);
    expect(state.menhirs.every(menhir => menhir.dialValue === 0)).toBe(true);
    expect(state.questDials).toHaveLength(2);
    expect(state.guardians).toHaveLength(2);
    expect(state.removedLocations).toHaveLength(20);
    expect(Object.keys(state.statuses).sort()).toEqual(Object.keys(expectedBoxCounts).sort());
  });
});
