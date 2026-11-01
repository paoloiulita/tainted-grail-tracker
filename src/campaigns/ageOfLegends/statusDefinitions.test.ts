import { describe, expect, it } from 'vitest';
import en from '../../locales/en.json';
import { CAMPAIGN_REGISTRY } from '../../hooks/useAppState';
import {
  AGE_OF_LEGENDS_REMOVED_LOCATION_COUNT,
  AGE_OF_LEGENDS_STATUS_DEFINITIONS,
  createInitialStatusProgress
} from './statusDefinitions';

const statusNames = Object.keys(AGE_OF_LEGENDS_STATUS_DEFINITIONS).sort();
const nonEnumeratedStatuses = [
  'Civil War',
  'Dream Master',
  'Giant’s Wisdom',
  'Grave Robber',
  'Grave Wound',
  'Grizzled Veteran',
  'Long Campaign',
  'Marked Trails',
  'Saved by the Goddess',
  'Spy'
].sort();

const expectedBoxCounts: Record<string, number> = {
  Arbiter: 9,
  Adversaries: 6,
  'Astounding Discoveries': 9,
  'Astounding Reports': 9,
  'Building the Future': 9,
  Borderlands: 9,
  'Case Solved': 3,
  'Civil War': 5,
  'Concerned Citizens': 7,
  Conquest: 8,
  'Dangers of Avalon': 8,
  'Defence of Tintagel': 5,
  Dreamquest: 8,
  'Dream Master': 4,
  'Enemy Territory': 8,
  'Eternal Rest': 4,
  'Fall from Grace': 9,
  'Forgotten Prisoner': 3,
  'Giant’s Wisdom': 5,
  'Grave Robber': 5,
  'Grave Wound': 1,
  'Grizzled Veteran': 1,
  'Helpful Tricks': 8,
  'Hopeful Signs': 10,
  Huntsmen: 7,
  'Idols of the Old World': 4,
  Inquiries: 9,
  'King’s Favor': 6,
  Legacy: 9,
  'Long Campaign': 6,
  Loyalists: 9,
  'Marked Trails': 4,
  'Observation Posts': 2,
  'Odds and Ends': 5,
  'Outpost Strength': 6,
  Pillars: 5,
  Plunderer: 9,
  'Price of Power': 3,
  'Ports of Avalon': 7,
  Prospectors: 9,
  Reconciliation: 8,
  Rebels: 9,
  'Reputation: Stiltwood': 5,
  Sabotage: 6,
  'Saved by the Goddess': 1,
  Scrounger: 8,
  'Secrets of the Forest': 4,
  Spy: 8,
  Survivors: 8,
  'Strange Encounters': 10,
  'Supernatural Events': 9,
  Tactician: 3,
  'Traveler’s Knowledge': 7,
  Trials: 5,
  Undercastle: 2,
  'Unwelcome Guest': 2,
  'Valiant Defeat': 9,
  Victories: 6,
  Weaponry: 3
};

describe('Age of Legends status definitions', () => {
  it('has a translation for every status in English', () => {
    expect(statusNames).toHaveLength(59);
    expect(Object.keys(en.ageOfLegends.statuses.names).sort()).toEqual(statusNames);
    expect(JSON.stringify(en.ageOfLegends.statuses)).not.toContain('"steps"');
  });

  it('initializes progress independently from static status definitions', () => {
    const progress = createInitialStatusProgress();

    expect(Object.keys(progress).sort()).toEqual(statusNames);
    expect(Object.values(progress).every(({ completed }) => completed.length === 0)).toBe(true);
  });

  it('matches the printed box counts and unnumbered statuses', () => {
    expect(Object.fromEntries(
      Object.entries(AGE_OF_LEGENDS_STATUS_DEFINITIONS).map(([name, definition]) => [name, definition.steps])
    )).toEqual(expectedBoxCounts);
    expect(
      Object.entries(AGE_OF_LEGENDS_STATUS_DEFINITIONS)
        .filter(([, definition]) => definition.enumerated === false)
        .map(([name]) => name)
        .sort()
    ).toEqual(nonEnumeratedStatuses);
  });

  it('matches the only caption and selected Removed Locations count', () => {
    expect(en.ageOfLegends.statuses.captions).toEqual({
      'Odds and Ends': 'Whenever you have all parts of this status, go to BoS 134'
    });
    expect(AGE_OF_LEGENDS_REMOVED_LOCATION_COUNT).toBe(16);
  });

  it('starts with the campaign-specific tracker fields', () => {
    const state = CAMPAIGN_REGISTRY.ageOfLegends.defaultState;

    expect(state.menhirs).toEqual([
      { location: '', markers: '' },
      { location: '', markers: '' },
      { location: '', markers: '' }
    ]);
    expect(state.enemyArmies).toEqual([{ location: '', units: '' }]);
    expect(state.removedLocations).toHaveLength(16);
    expect(Object.keys(state.statuses).sort()).toEqual(statusNames);
  });
});
