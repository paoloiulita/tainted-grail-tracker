import { describe, expect, it } from 'vitest';
import { CHARACTER_ROSTERS } from './characterRoster';

describe('character rosters', () => {
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
