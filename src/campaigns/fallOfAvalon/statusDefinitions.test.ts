import { describe, expect, it } from 'vitest';
import en from '../../locales/en.json';
import itLocale from '../../locales/it.json';
import {
  createInitialStatusProgress,
  FALL_OF_AVALON_STATUS_DEFINITIONS
} from './statusDefinitions';

const statusNames = Object.keys(FALL_OF_AVALON_STATUS_DEFINITIONS).sort();

const getLocaleKeyPaths = (value: unknown, prefix = ''): string[] => {
  if (typeof value !== 'object' || value === null || Array.isArray(value)) {
    return [];
  }

  return Object.entries(value).flatMap(([key, child]) => {
    const path = prefix ? `${prefix}.${key}` : key;
    return [path, ...getLocaleKeyPaths(child, path)];
  }).sort();
};

describe('Fall of Avalon status definitions', () => {
  it.each([
    ['English', en],
    ['Italian', itLocale]
  ])('has a translation for every status in %s', (_language, locale) => {
    expect(Object.keys(locale.fallOfAvalon.statuses.names).sort()).toEqual(statusNames);
    expect(JSON.stringify(locale.fallOfAvalon.statuses)).not.toContain('"steps"');
  });

  it('initializes progress independently from static status definitions', () => {
    const progress = createInitialStatusProgress();

    expect(Object.keys(progress).sort()).toEqual(statusNames);
    expect(Object.values(progress).every(({ completed }) => completed.length === 0)).toBe(true);
  });

  it('keeps English and Italian localization keys in sync', () => {
    expect(getLocaleKeyPaths(itLocale)).toEqual(getLocaleKeyPaths(en));
  });
});
