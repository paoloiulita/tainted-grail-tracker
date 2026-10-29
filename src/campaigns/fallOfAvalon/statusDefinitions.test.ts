import { describe, expect, it } from 'vitest';
import en from '../../locales/en.json';
import {
  createInitialStatusProgress,
  FALL_OF_AVALON_STATUS_DEFINITIONS
} from './statusDefinitions';

const statusNames = Object.keys(FALL_OF_AVALON_STATUS_DEFINITIONS).sort();

describe('Fall of Avalon status definitions', () => {
  it('has a translation for every status in English', () => {
    expect(Object.keys(en.fallOfAvalon.statuses.names).sort()).toEqual(statusNames);
    expect(JSON.stringify(en.fallOfAvalon.statuses)).not.toContain('"steps"');
  });

  it('initializes progress independently from static status definitions', () => {
    const progress = createInitialStatusProgress();

    expect(Object.keys(progress).sort()).toEqual(statusNames);
    expect(Object.values(progress).every(({ completed }) => completed.length === 0)).toBe(true);
  });
});
