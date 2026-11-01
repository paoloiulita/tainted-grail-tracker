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

export type CharacterDisplayColor = 'blue' | 'brown' | 'green' | 'grey' | 'red';

export const CHARACTER_DISPLAY_COLORS: Record<CharacterName, CharacterDisplayColor> = {
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
};

export const getCharacterDisplayColor = (characterName: string): CharacterDisplayColor => {
  const knownCharacterName = CHARACTER_NAMES.find(name => name === characterName);
  return knownCharacterName ? CHARACTER_DISPLAY_COLORS[knownCharacterName] : 'blue';
};

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
