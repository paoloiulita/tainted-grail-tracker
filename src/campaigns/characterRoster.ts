import type { CampaignId } from '../types';

export const CHARACTER_NAMES = [
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
  'Duana',
  'Gerdwyn',
  'Elgan',
  'Iunis',
  'Osbert'
] as const;

export type CharacterName = typeof CHARACTER_NAMES[number];

export const CHARACTER_ROSTERS: Record<CampaignId, readonly CharacterName[]> = {
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
};
