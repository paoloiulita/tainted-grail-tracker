import { describe, expect, it } from 'vitest';
import {
  CHARACTER_DISPLAY_COLORS,
  CHARACTER_ROSTERS,
  getCharacterDisplayColor
} from './characterRoster';

describe('character rosters', () => {
  it('assigns a display color to every character independently of campaign and localization', () => {
    expect(CHARACTER_DISPLAY_COLORS).toEqual({
      Beor: 'blue',
      Ailei: 'green',
      Arev: 'grey',
      Maggot: 'brown',
      Niamh: 'red',
      Mabd: 'brown',
      Dagan: 'blue',
      Sloan: 'grey',
      Fyul: 'green',
      Naazer: 'green',
      Thebalt: 'grey',
      Caolin: 'blue',
      Duana: 'brown',
      Gerdwyn: 'blue',
      Elgan: 'blue',
      Iunis: 'blue',
      Osbert: 'blue'
    });
  });

  it('uses blue for unknown legacy character names', () => {
    expect(getCharacterDisplayColor('Unknown')).toBe('blue');
  });

  it('matches the characters available in each campaign', () => {
    expect(CHARACTER_ROSTERS).toEqual({
      fallOfAvalon: ['Beor', 'Ailei', 'Arev', 'Maggot', 'Niamh'],
      lastKnight: ['Mabd', 'Dagan', 'Sloan', 'Fyul', 'Niamh'],
      ageOfLegends: ['Naazer', 'Thebalt', 'Caolin', 'Duana', 'Niamh'],
      redDeath: [
        'Beor',
        'Ailei',
        'Arev',
        'Maggot',
        'Niamh',
        'Mabd',
        'Dagan',
        'Sloan',
        'Fyul',
        'Naazer',
        'Thebalt',
        'Caolin',
        'Duana'
      ],
      kingsOfRuin: ['Gerdwyn', 'Elgan', 'Iunis', 'Osbert']
    });
  });

  it('does not repeat a preset character within a campaign roster', () => {
    Object.values(CHARACTER_ROSTERS).forEach(roster => {
      expect(new Set(roster).size).toBe(roster.length);
    });
  });
});
