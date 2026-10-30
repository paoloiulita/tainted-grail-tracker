import { describe, expect, it } from 'vitest';
import en from '../../locales/en.json';
import {
  createInitialStatusProgress,
  FALL_OF_AVALON_STATUS_DEFINITIONS
} from './statusDefinitions';

const statusNames = Object.keys(FALL_OF_AVALON_STATUS_DEFINITIONS).sort();
const nonEnumeratedStatuses = [
  'Helping the Knights',
  'Redemption',
  'Something is Watching',
  'Supplying the Revolt',
  'Tuathan Exploration'
].sort();

describe('Fall of Avalon status definitions', () => {
  it('has a translation for every status in English', () => {
    expect(statusNames).toHaveLength(71);
    expect(Object.keys(en.fallOfAvalon.statuses.names).sort()).toEqual(statusNames);
    expect(JSON.stringify(en.fallOfAvalon.statuses)).not.toContain('"steps"');
  });

  it('initializes progress independently from static status definitions', () => {
    const progress = createInitialStatusProgress();

    expect(Object.keys(progress).sort()).toEqual(statusNames);
    expect(Object.values(progress).every(({ completed }) => completed.length === 0)).toBe(true);
  });

  it('matches the printed box counts and non-enumerated statuses', () => {
    expect(FALL_OF_AVALON_STATUS_DEFINITIONS['Burning Mystery'].steps).toBe(9);
    expect(FALL_OF_AVALON_STATUS_DEFINITIONS['General Directions'].steps).toBe(1);
    expect(FALL_OF_AVALON_STATUS_DEFINITIONS.Tracker.steps).toBe(1);
    expect(FALL_OF_AVALON_STATUS_DEFINITIONS.Traveler.steps).toBe(3);
    expect(
      Object.entries(FALL_OF_AVALON_STATUS_DEFINITIONS)
        .filter(([, definition]) => definition.enumerated === false)
        .map(([name]) => name)
        .sort()
    ).toEqual(nonEnumeratedStatuses);
  });

  it('matches the captions printed on the campaign sheet', () => {
    expect(en.fallOfAvalon.statuses.captions).toEqual({
      'Fall of Chivalry': 'When you have any six parts of this status, go to BoS, Verse 525',
      'Fate of the Expedition': 'When you have parts 1-8 of this status, go to BoS, Verse 405',
      'Restoring the Order': 'When you have any six parts of this status, go to BoS, Verse 512',
      'Something is Watching': 'When you have all four parts of this status, resolve Special Event C'
    });
  });
});
